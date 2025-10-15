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
  contentTypes?: string[];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { url, centerType, sourceName, maxPages = 50, contentTypes = ['treatment_center'] }: TreatmentCenterCrawlRequest = await req.json();

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
          contentType: contentTypes[0] || 'treatment_center',
          contentTypes,
          centerType,
          sourceName,
          maxPages
        }
      })
      .select()
      .single();

    if (jobError) throw jobError;

    // Call Firecrawl API with enhanced metadata extraction
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
          formats: ['markdown', 'html', 'rawHtml'],
          includeTags: ['article', 'main', 'content', 'table', 'div', 'p', 'h1', 'h2', 'h3', 'meta', 'link'],
          excludeTags: ['nav', 'footer', 'header', 'aside', 'script', 'style'],
          onlyMainContent: false, // Get full page to extract metadata
          waitFor: 2000, // Wait for dynamic content
          headers: true, // Capture response headers
          includeMetadata: true,
          screenshot: false
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
        // Extract comprehensive metadata
        const pageUrl = page.url?.toLowerCase() || '';
        const pageContent = (page.markdown || page.content || '').toLowerCase();
        const rawHtml = page.rawHtml || page.html || '';
        
        // Extract Open Graph and meta tags
        const extractMetaTags = (html: string) => {
          const metaTags: any = {};
          
          // Open Graph tags
          const ogMatches = html.matchAll(/<meta\s+property=["']og:([^"']+)["']\s+content=["']([^"']+)["']/gi);
          for (const match of ogMatches) {
            metaTags[`og_${match[1]}`] = match[2];
          }
          
          // Standard meta tags
          const metaMatches = html.matchAll(/<meta\s+name=["']([^"']+)["']\s+content=["']([^"']+)["']/gi);
          for (const match of metaMatches) {
            metaTags[match[1]] = match[2];
          }
          
          // JSON-LD structured data
          const jsonLdMatches = html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
          const structuredData = [];
          for (const match of jsonLdMatches) {
            try {
              structuredData.push(JSON.parse(match[1]));
            } catch (e) {
              // Invalid JSON-LD, skip
            }
          }
          if (structuredData.length > 0) {
            metaTags.structured_data = structuredData;
          }
          
          return metaTags;
        };
        
        const extractedMeta = extractMetaTags(rawHtml);
        
        // Determine content type based on page content and URL
        let detectedContentTypes = [...contentTypes];
        
        // Clinical trials
        if (pageUrl.includes('trial') || pageContent.includes('clinical trial') || 
            pageContent.includes('nct') || extractedMeta.keywords?.includes('clinical trial')) {
          detectedContentTypes.push('clinical_trial_data');
        }
        
        // Patient education
        if (pageUrl.includes('education') || pageUrl.includes('patient') || 
            pageContent.includes('patient education') || pageContent.includes('learn about')) {
          detectedContentTypes.push('patient_education');
        }
        
        // Gene therapy specific
        if (pageContent.includes('gene therapy') || pageContent.includes('cell therapy') ||
            extractedMeta.keywords?.includes('gene therapy')) {
          detectedContentTypes.push('gene_therapy_education');
        }
        
        // BMT/Transplant
        if (pageContent.includes('transplant') || pageContent.includes('bmt') || 
            pageContent.includes('gvhd') || pageContent.includes('bone marrow')) {
          detectedContentTypes.push('transplant_education');
        }
        
        // Videos/Multimedia
        if (pageContent.includes('video') || pageContent.includes('watch') || 
            rawHtml.includes('<video') || rawHtml.includes('youtube')) {
          detectedContentTypes.push('multimedia');
        }
        
        // Support resources
        if (pageContent.includes('support') || pageContent.includes('peer') || 
            pageContent.includes('caregiver') || pageContent.includes('resources')) {
          detectedContentTypes.push('support_resources');
        }
        
        // Research/Publications
        if (pageContent.includes('research') || pageContent.includes('publication') || 
            pageContent.includes('study')) {
          detectedContentTypes.push('research_data');
        }
        
        // Disease treatment
        if (pageContent.includes('treatment') || pageContent.includes('therapy') || 
            pageContent.includes('disease')) {
          detectedContentTypes.push('disease_treatment');
        }
        
        // Insert knowledge base entry with comprehensive metadata
        const { data: knowledgeEntry, error: insertError } = await supabaseClient
          .from('universal_knowledge_base')
          .insert({
            finding_name: page.metadata?.title || extractedMeta.og_title || extractedMeta.title || `${sourceName} - ${page.url}`,
            description: page.markdown || page.content || '',
            domain: 'patient_onboarding',
            content_type: detectedContentTypes[0] || 'educational_content',
            metadata: {
              source_type: 'healthcare_crawl',
              source_url: page.url,
              source_name: sourceName,
              crawled_at: new Date().toISOString(),
              content_types: [...new Set(detectedContentTypes)],
              tags: [centerType, ...detectedContentTypes, sourceName],
              center_type: centerType,
              
              // Page metadata
              page_title: page.metadata?.title || extractedMeta.title,
              page_description: extractedMeta.description || extractedMeta.og_description,
              page_keywords: extractedMeta.keywords,
              page_author: extractedMeta.author,
              page_published: extractedMeta.published_time || extractedMeta.article_published_time,
              page_modified: extractedMeta.modified_time || extractedMeta.article_modified_time,
              
              // Open Graph metadata
              og_title: extractedMeta.og_title,
              og_description: extractedMeta.og_description,
              og_type: extractedMeta.og_type,
              og_image: extractedMeta.og_image,
              og_site_name: extractedMeta.og_site_name,
              
              // Healthcare-specific metadata
              medical_specialty: extractedMeta.medical_specialty,
              disease_condition: extractedMeta.disease_condition,
              treatment_type: extractedMeta.treatment_type,
              
              // Structured data
              structured_data: extractedMeta.structured_data,
              
              // Original metadata from Firecrawl
              html: page.html,
              raw_html: page.rawHtml,
              firecrawl_metadata: page.metadata,
              
              // Citation information
              citation: {
                url: page.url,
                title: page.metadata?.title || extractedMeta.og_title || sourceName,
                source: sourceName,
                accessed_date: new Date().toISOString(),
                description: extractedMeta.description || extractedMeta.og_description,
                author: extractedMeta.author,
                published_date: extractedMeta.published_time
              }
            },
            clinical_context: {
              center_type: centerType,
              source: sourceName,
              content_categories: [...new Set(detectedContentTypes)],
              medical_domain: extractedMeta.medical_specialty || 'general_healthcare',
              is_peer_reviewed: extractedMeta.article_peer_reviewed === 'true',
              publication_type: extractedMeta.og_type || 'web_page'
            },
            quality_score: 85,
            source_credibility_score: 90,
            is_approved: true,
            is_public: true
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
