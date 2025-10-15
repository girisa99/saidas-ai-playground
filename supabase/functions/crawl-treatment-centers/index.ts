import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TreatmentCenterCrawlRequest {
  url: string;
  centerType: 'gene_therapy' | 'bmt' | 'oncology' | 'general';
  sourceName: string;
  maxPages?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { url, centerType, sourceName, maxPages = 50 }: TreatmentCenterCrawlRequest = await req.json();

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    console.log(`Starting treatment center crawl for ${url} (${centerType})`);

    // Create crawl job
    const { data: jobData, error: jobError } = await supabaseClient
      .from('knowledge_crawl_jobs')
      .insert({
        job_name: `Treatment Centers: ${sourceName}`,
        start_url: url,
        status: 'running',
        pages_total: maxPages,
        configuration: {
          domain: 'patient_onboarding',
          contentType: 'treatment_center',
          centerType,
          sourceName,
          maxPages
        }
      })
      .select()
      .single();

    if (jobError) throw jobError;

    // Call Firecrawl API with enhanced extraction
    const crawlResponse = await fetch('https://api.firecrawl.dev/v1/crawl', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        limit: maxPages,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          includeTags: ['article', 'main', 'content', 'table', 'div', 'p', 'h1', 'h2', 'h3'],
          excludeTags: ['nav', 'footer', 'header', 'aside', 'script'],
          onlyMainContent: true
        }
      })
    });

    if (!crawlResponse.ok) {
      const errorText = await crawlResponse.text();
      console.error('Firecrawl API error:', errorText);
      throw new Error(`Firecrawl API error: ${crawlResponse.status}`);
    }

    const crawlData = await crawlResponse.json();
    console.log('Firecrawl response received');

    const results = crawlData.data || [];
    let processedCount = 0;
    let centersExtracted = 0;

    for (const page of results) {
      try {
        // Insert knowledge base entry
        const { data: knowledgeEntry, error: insertError } = await supabaseClient
          .from('universal_knowledge_base')
          .insert({
            finding_name: page.metadata?.title || `${sourceName} - Treatment Centers`,
            description: page.markdown || page.content || '',
            domain: 'patient_onboarding',
            content_type: 'educational_content',
            metadata: {
              source_type: 'treatment_center_crawl',
              source_url: page.url,
              source_name: sourceName,
              crawled_at: new Date().toISOString(),
              tags: [centerType, 'treatment_center', sourceName],
              html: page.html,
              firecrawl_metadata: page.metadata
            },
            clinical_context: {
              center_type: centerType,
              source: sourceName
            },
            quality_score: 80,
            source_credibility_score: 85,
            is_approved: true
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error inserting page:', page.url, insertError);
          continue;
        }

        processedCount++;

        // Use AI to extract structured treatment center data
        if (LOVABLE_API_KEY && (page.markdown || page.content)) {
          try {
            const extractionPrompt = `Extract treatment center information from this content. Return a JSON array of treatment centers with these fields:
- name (required)
- address
- city  
- state
- zip_code
- phone
- website
- email
- specialties (array)
- accreditations (array)

Content:
${(page.markdown || page.content).substring(0, 4000)}

Return ONLY valid JSON array, no markdown formatting.`;

            const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${LOVABLE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                messages: [
                  { role: 'system', content: 'You are a medical data extraction assistant. Extract treatment center information accurately.' },
                  { role: 'user', content: extractionPrompt }
                ],
                temperature: 0.1
              })
            });

            if (aiResponse.ok) {
              const aiData = await aiResponse.json();
              const extractedText = aiData.choices?.[0]?.message?.content || '[]';
              
              // Clean and parse JSON
              let centers = [];
              try {
                const jsonMatch = extractedText.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                  centers = JSON.parse(jsonMatch[0]);
                }
              } catch (parseError) {
                console.error('Error parsing AI response:', parseError);
              }

              // Insert extracted centers
              for (const center of centers) {
                if (center.name) {
                  await supabaseClient
                    .from('treatment_centers')
                    .insert({
                      name: center.name,
                      center_type: centerType,
                      address: center.address,
                      city: center.city,
                      state: center.state,
                      zip_code: center.zip_code,
                      phone: center.phone,
                      website: center.website,
                      email: center.email,
                      specialties: center.specialties || [],
                      accreditations: center.accreditations || [],
                      metadata: {
                        extracted_from: page.url,
                        extraction_date: new Date().toISOString()
                      },
                      knowledge_base_id: knowledgeEntry.id,
                      source_url: page.url,
                      source_name: sourceName,
                      is_verified: false
                    });
                  
                  centersExtracted++;
                }
              }
            }
          } catch (aiError) {
            console.error('AI extraction error:', aiError);
          }
        }

      } catch (pageError) {
        console.error('Error processing page:', page.url, pageError);
      }
    }

    // Update crawl job
    await supabaseClient
      .from('knowledge_crawl_jobs')
      .update({
        status: 'completed',
        pages_crawled: processedCount,
        completed_at: new Date().toISOString()
      })
      .eq('id', jobData.id);

    console.log(`Crawl completed: ${processedCount} pages processed, ${centersExtracted} centers extracted`);

    return new Response(
      JSON.stringify({
        success: true,
        jobId: jobData.id,
        pagesProcessed: processedCount,
        centersExtracted,
        totalPages: results.length,
        status: 'completed'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in crawl-treatment-centers:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
