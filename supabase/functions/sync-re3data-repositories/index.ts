import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RE3DATA_API = "https://www.re3data.org/api/beta";

// Medical imaging and healthcare-related subject areas
const HEALTHCARE_SUBJECTS = [
  "Medical Imaging",
  "Radiology",
  "Pathology",
  "Diagnostic Imaging",
  "Biomedical Engineering",
  "Clinical Medicine",
  "Public Health",
  "Epidemiology",
  "Genomics",
  "Pharmacology",
  "Health Services Research",
  "Medical Informatics",
  "Nursing",
  "Oncology",
  "Neurology"
];

interface Re3DataRepository {
  id: string;
  name: string;
  repositoryURL: string;
  description: string;
  subjects: string[];
  contentTypes: string[];
  dataAccess: {
    type: string;
  };
  certificates: string[];
  dataUpload: string[];
  databaseAccess: string[];
  software: string[];
  metadataStandards: string[];
  pidSystems: string[];
  apiType: string[];
}

function calculateQualityScore(repo: Re3DataRepository): number {
  let score = 0;
  
  // FAIR principles compliance
  if (repo.dataAccess?.type === 'open') score += 30;
  if (repo.certificates?.includes('CoreTrustSeal')) score += 20;
  if (repo.metadataStandards?.length > 0) score += 20;
  if (repo.pidSystems?.includes('DOI')) score += 15;
  if (repo.databaseAccess?.length > 0) score += 10;
  if (repo.apiType?.length > 0) score += 5;
  
  return Math.min(score, 100);
}

function determineDomain(subjects: string[]): string[] {
  const domains: string[] = [];
  
  const subjectText = subjects.join(' ').toLowerCase();
  
  if (subjectText.includes('imaging') || subjectText.includes('radiology') || 
      subjectText.includes('mri') || subjectText.includes('ct') || subjectText.includes('x-ray')) {
    domains.push('medical_imaging');
  }
  
  if (subjectText.includes('patient') || subjectText.includes('clinical') || 
      subjectText.includes('ehr') || subjectText.includes('health record')) {
    domains.push('patient_onboarding');
  }
  
  if (subjectText.includes('risk') || subjectText.includes('outcome') || 
      subjectText.includes('prognosis') || subjectText.includes('comorbid')) {
    domains.push('clinical_risk');
  }
  
  if (subjectText.includes('public health') || subjectText.includes('epidemiology') ||
      subjectText.includes('population health')) {
    domains.push('conversational');
  }
  
  // Default if no specific match
  if (domains.length === 0) {
    domains.push('conversational');
  }
  
  return domains;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Starting re3data.org repository sync...');

    // Step 1: Fetch list of all repository IDs (XML response)
    const listResponse = await fetch(`${RE3DATA_API}/repositories`);
    if (!listResponse.ok) {
      throw new Error(`Failed to fetch repository list: ${listResponse.statusText}`);
    }
    
    const listXml = await listResponse.text();
    
    // Parse XML to extract repository IDs - simplified extraction
    const repoIdMatches = listXml.matchAll(/<id>r3d(\d+)<\/id>/g);
    const repositoryIds = Array.from(repoIdMatches).map(match => `r3d${match[1]}`).slice(0, 50); // Limit to 50 for now
    
    console.log(`Found ${repositoryIds.length} repositories in re3data.org`);
    
    let processedCount = 0;
    let healthcareCount = 0;
    let skippedCount = 0;
    const errors: string[] = [];

    // Step 2: Process repositories in batches
    const batchSize = 10;
    for (let i = 0; i < Math.min(repositoryIds.length, 100); i += batchSize) {
      const batch = repositoryIds.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async (repoId: string) => {
        try {
          // Fetch detailed repository information (XML response)
          const detailsResponse = await fetch(`${RE3DATA_API}/repository/${repoId}`);
          if (!detailsResponse.ok) {
            console.warn(`Failed to fetch details for ${repoId}: ${detailsResponse.statusText}`);
            skippedCount++;
            return;
          }
          
          const detailsXml = await detailsResponse.text();
          
          // Parse XML - extract key fields
          const extractTag = (xml: string, tag: string): string => {
            const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'i'));
            return match ? match[1].trim() : '';
          };
          
          const extractAllTags = (xml: string, tag: string): string[] => {
            const regex = new RegExp(`<${tag}[^>]*>([^<]+)</${tag}>`, 'gi');
            const matches = Array.from(xml.matchAll(regex));
            return matches.map(m => m[1].trim());
          };
          
          const repoDetails: Re3DataRepository = {
            id: repoId,
            name: extractTag(detailsXml, 'repositoryName'),
            repositoryURL: extractTag(detailsXml, 'repositoryURL'),
            description: extractTag(detailsXml, 'description'),
            subjects: extractAllTags(detailsXml, 'subject'),
            contentTypes: extractAllTags(detailsXml, 'contentType'),
            dataAccess: { type: extractTag(detailsXml, 'dataAccessType') || 'unknown' },
            certificates: extractAllTags(detailsXml, 'certificate'),
            dataUpload: extractAllTags(detailsXml, 'dataUpload'),
            databaseAccess: extractAllTags(detailsXml, 'databaseAccess'),
            software: extractAllTags(detailsXml, 'software'),
            metadataStandards: extractAllTags(detailsXml, 'metadataStandard'),
            pidSystems: extractAllTags(detailsXml, 'pidSystem'),
            apiType: extractAllTags(detailsXml, 'api')
          };
          
          // Step 3: Filter for healthcare-related repositories
          const isHealthcare = repoDetails.subjects?.some((subject: string) => 
            HEALTHCARE_SUBJECTS.some(hs => subject.toLowerCase().includes(hs.toLowerCase()))
          );
          
          if (!isHealthcare) {
            skippedCount++;
            return;
          }
          
          // Step 4: Calculate quality score
          const qualityScore = calculateQualityScore(repoDetails);
          
          // Step 5: Determine applicable domains
          const domains = determineDomain(repoDetails.subjects || []);
          
          // Step 6: Upsert each domain-specific repository entry
          for (const domain of domains) {
            const { error } = await supabase
              .from('universal_knowledge_repositories')
              .upsert({
                source_platform: 're3data',
                source_id: `re3data_${repoId}_${domain}`,
                repository_name: repoDetails.name,
                repository_url: repoDetails.repositoryURL,
                description: repoDetails.description,
                domain: domain,
                subject_areas: repoDetails.subjects || [],
                content_types: repoDetails.contentTypes || [],
                access_type: repoDetails.dataAccess?.type || 'unknown',
                certificates: repoDetails.certificates || [],
                data_upload_types: repoDetails.dataUpload || [],
                database_access_types: repoDetails.databaseAccess || [],
                software_used: repoDetails.software || [],
                quality_score: qualityScore,
                fair_compliant: qualityScore >= 70,
                is_medical_imaging: domain === 'medical_imaging',
                is_active: true,
                metadata: {
                  metadata_standards: repoDetails.metadataStandards || [],
                  pid_systems: repoDetails.pidSystems || [],
                  api_type: repoDetails.apiType || [],
                  original_id: repoId
                },
                last_synced_at: new Date().toISOString()
              }, { 
                onConflict: 'source_id' 
              });
            
            if (error) {
              console.error(`Error upserting repository ${repoId} for domain ${domain}:`, error);
              errors.push(`${repoId}: ${error.message}`);
            }
          }
          
          healthcareCount++;
          processedCount++;
          
          if (processedCount % 10 === 0) {
            console.log(`Processed ${processedCount}/${repositoryIds.length} repositories...`);
          }
          
        } catch (error) {
          console.error(`Error processing repository ${repoId}:`, error);
          errors.push(`${repoId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          skippedCount++;
        }
      }));
    }

    const result = {
      success: true,
      summary: {
        total_checked: Math.min(repositoryIds.length, 100),
        healthcare_repositories: healthcareCount,
        processed: processedCount,
        skipped: skippedCount,
        errors: errors.length
      },
      errors: errors.slice(0, 10), // Only return first 10 errors
      message: `Successfully synced ${healthcareCount} healthcare repositories from re3data.org`
    };

    console.log('Sync completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('re3data sync error:', error);
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