import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const KAGGLE_API_BASE = "https://www.kaggle.com/api/v1";

// Healthcare and medical-related keywords for filtering
const HEALTHCARE_KEYWORDS = [
  'medical', 'health', 'clinical', 'patient', 'imaging', 'radiology',
  'diagnosis', 'pathology', 'oncology', 'cardiology', 'genomics',
  'pharmaceutical', 'therapy', 'disease', 'treatment', 'healthcare',
  'hospital', 'drug', 'surgery', 'anatomy', 'biology', 'neurology'
];

interface KaggleDataset {
  ref: string;
  title: string;
  subtitle: string;
  creatorName: string;
  totalBytes: number;
  url: string;
  lastUpdated: string;
  downloadCount: number;
  voteCount: number;
  usabilityRating: number;
  tags: string[];
}

function calculateQualityScore(dataset: KaggleDataset): number {
  let score = 0;
  
  // High usability rating
  if (dataset.usabilityRating >= 0.9) score += 30;
  else if (dataset.usabilityRating >= 0.7) score += 20;
  else if (dataset.usabilityRating >= 0.5) score += 10;
  
  // Popular datasets
  if (dataset.downloadCount > 10000) score += 20;
  else if (dataset.downloadCount > 1000) score += 15;
  else if (dataset.downloadCount > 100) score += 10;
  
  // Community validation
  if (dataset.voteCount > 100) score += 20;
  else if (dataset.voteCount > 50) score += 15;
  else if (dataset.voteCount > 10) score += 10;
  
  // Well documented
  if (dataset.subtitle && dataset.subtitle.length > 50) score += 10;
  
  // Tags indicate good metadata
  if (dataset.tags && dataset.tags.length > 3) score += 10;
  
  return Math.min(score, 100);
}

function determineDomain(dataset: KaggleDataset): string[] {
  const domains: string[] = [];
  const combinedText = `${dataset.title} ${dataset.subtitle} ${dataset.tags?.join(' ')}`.toLowerCase();
  
  if (combinedText.match(/imaging|radiology|mri|ct|x-ray|dicom|scan|ultrasound/i)) {
    domains.push('medical_imaging');
  }
  
  if (combinedText.match(/patient|enrollment|onboarding|admission|intake|registration/i)) {
    domains.push('patient_onboarding');
  }
  
  if (combinedText.match(/risk|outcome|prognosis|prediction|mortality|complication|adverse/i)) {
    domains.push('clinical_risk');
  }
  
  if (combinedText.match(/conversation|chat|dialogue|qa|question|answer|faq/i)) {
    domains.push('conversational');
  }
  
  // Default if no specific match but healthcare-related
  if (domains.length === 0) {
    domains.push('conversational');
  }
  
  return domains;
}

function isHealthcareRelated(dataset: KaggleDataset): boolean {
  const searchText = `${dataset.title} ${dataset.subtitle} ${dataset.tags?.join(' ')}`.toLowerCase();
  return HEALTHCARE_KEYWORDS.some(keyword => searchText.includes(keyword));
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const kaggleUsername = Deno.env.get('KAGGLE_USERNAME');
    const kaggleKey = Deno.env.get('KAGGLE_KEY');
    
    if (!kaggleUsername || !kaggleKey) {
      throw new Error('Kaggle credentials not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const auth = btoa(`${kaggleUsername}:${kaggleKey}`);
    
    console.log('Starting Kaggle dataset sync...');

    // Search for healthcare datasets
    const searchQueries = ['medical', 'healthcare', 'clinical', 'patient', 'imaging'];
    let allDatasets: KaggleDataset[] = [];

    for (const query of searchQueries) {
      try {
        const response = await fetch(
          `${KAGGLE_API_BASE}/datasets/list?search=${query}&sortBy=hottest&page=1&pageSize=20`,
          {
            headers: {
              'Authorization': `Basic ${auth}`,
            },
          }
        );

        if (!response.ok) {
          console.warn(`Failed to fetch Kaggle datasets for "${query}": ${response.statusText}`);
          continue;
        }

        const datasets: KaggleDataset[] = await response.json();
        allDatasets = [...allDatasets, ...datasets];
      } catch (error) {
        console.error(`Error fetching datasets for query "${query}":`, error);
      }
    }

    // Remove duplicates
    const uniqueDatasets = Array.from(
      new Map(allDatasets.map(d => [d.ref, d])).values()
    );

    console.log(`Found ${uniqueDatasets.length} unique datasets`);

    let processedCount = 0;
    let healthcareCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    for (const dataset of uniqueDatasets) {
      try {
        // Filter for healthcare-related datasets
        if (!isHealthcareRelated(dataset)) {
          skippedCount++;
          continue;
        }

        const qualityScore = calculateQualityScore(dataset);
        const domains = determineDomain(dataset);

        // Insert for each applicable domain
        for (const domain of domains) {
          const { error } = await supabase
            .from('universal_knowledge_repositories')
            .upsert({
              source_platform: 'kaggle',
              source_id: `kaggle_${dataset.ref}_${domain}`,
              repository_name: dataset.title,
              repository_url: `https://www.kaggle.com${dataset.url}`,
              description: dataset.subtitle || dataset.title,
              domain: domain,
              subject_areas: dataset.tags || [],
              content_types: ['datasets', 'csv', 'images', 'text'],
              access_type: 'open',
              quality_score: qualityScore,
              fair_compliant: qualityScore >= 60,
              is_medical_imaging: domain === 'medical_imaging',
              is_active: true,
              metadata: {
                creator: dataset.creatorName,
                downloads: dataset.downloadCount,
                votes: dataset.voteCount,
                usability_rating: dataset.usabilityRating,
                size_bytes: dataset.totalBytes,
                last_updated: dataset.lastUpdated,
                kaggle_ref: dataset.ref
              },
              last_synced_at: new Date().toISOString()
            }, { 
              onConflict: 'source_id' 
            });

          if (error) {
            console.error(`Error upserting dataset ${dataset.ref} for domain ${domain}:`, error);
            errors.push(`${dataset.ref}: ${error.message}`);
          }
        }

        healthcareCount++;
        processedCount++;

        if (processedCount % 10 === 0) {
          console.log(`Processed ${processedCount} healthcare datasets...`);
        }

      } catch (error) {
        console.error(`Error processing dataset ${dataset.ref}:`, error);
        errors.push(`${dataset.ref}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        skippedCount++;
      }
    }

    const result = {
      success: true,
      summary: {
        total_checked: uniqueDatasets.length,
        healthcare_datasets: healthcareCount,
        processed: processedCount,
        skipped: skippedCount,
        errors: errors.length
      },
      errors: errors.slice(0, 10),
      message: `Successfully synced ${healthcareCount} healthcare datasets from Kaggle`
    };

    console.log('Kaggle sync completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Kaggle sync error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
