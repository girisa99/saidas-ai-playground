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
    const CRAWL4AI_URL = Deno.env.get('CRAWL4AI_URL');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!FIRECRAWL_API_KEY && !CRAWL4AI_URL) {
      throw new Error('Either FIRECRAWL_API_KEY or CRAWL4AI_URL must be configured');
    }

    console.log(`Starting treatment center crawl for ${url} (${centerType})`);

    // Create crawl job
    const { data: jobData, error: jobError } = await supabaseClient
      .from('knowledge_crawl_jobs')
      .insert({
        job_name: `Treatment Centers: ${sourceName}`,
        start_url: url,
        source_url: url,
        crawl_type: 'treatment_centers',
        status: 'running',
        pages_total: maxPages,
        configuration: {
          center_type: centerType,
          content_types: contentTypes,
          max_pages: maxPages,
        },
      })
      .select()
      .single();

    if (jobError) throw jobError;

    let results: any[] = [];
    let usedService = 'firecrawl';
    let shouldFallback = false;

    // Try Firecrawl first if API key exists
    if (FIRECRAWL_API_KEY) {
      console.log('Attempting crawl with Firecrawl...');
      
      const crawlResponse = await fetch('https://api.firecrawl.dev/v1/crawl', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          limit: maxPages,
          scrapeOptions: {
            formats: ['markdown', 'html']
          }
        })
      });

      // Check for 402 (insufficient credits) - trigger fallback
      if (crawlResponse.status === 402) {
        console.log('Firecrawl returned 402 (insufficient credits)');
        shouldFallback = true;
      } else if (!crawlResponse.ok) {
        const errorText = await crawlResponse.text();
        console.error('Firecrawl API error:', errorText);
        
        if (CRAWL4AI_URL) {
          console.log('Firecrawl failed, falling back to Crawl4AI...');
          shouldFallback = true;
        } else {
          // No fallback available, mark as failed
          await supabaseClient
            .from('knowledge_crawl_jobs')
            .update({
              status: 'failed',
              error_message: `Firecrawl ${crawlResponse.status}: ${errorText}`,
              completed_at: new Date().toISOString()
            })
            .eq('id', jobData.id);

          return new Response(
            JSON.stringify({ success: false, error: `Firecrawl error ${crawlResponse.status}` }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } else {
        // Firecrawl succeeded
        const crawlStart = await crawlResponse.json();
        console.log('Firecrawl response received', JSON.stringify(crawlStart).substring(0, 500));

        // Handle both immediate data and job-based responses
        if (Array.isArray(crawlStart.data)) {
          results = crawlStart.data;
        } else if (crawlStart.id && crawlStart.url) {
          // Poll job status
          const statusUrl: string = crawlStart.url;
          const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
          let attempt = 0;
          const maxAttempts = Math.max(45, Math.ceil((maxPages || 50) / 2));
          let status = 'running';

          while (attempt < maxAttempts) {
            const statusRes = await fetch(statusUrl, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}` }
            });
            
            if (!statusRes.ok) {
              console.error('Firecrawl status check failed:', statusRes.status);
              break;
            }
            
            const statusJson = await statusRes.json();
            console.log('Firecrawl job status:', JSON.stringify(statusJson).substring(0, 300));
            status = statusJson.status || statusJson.state || status;

            if (status === 'completed' || status === 'finished' || 
                (statusJson.completed && statusJson.total && statusJson.completed >= statusJson.total)) {
              // Fetch results
              const dataUrl = `${statusUrl}/data`;
              let dataRes = await fetch(dataUrl, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}` }
              });

              if (!dataRes.ok && dataRes.status === 404) {
                console.warn('Firecrawl /data 404, retrying...');
                for (let i = 0; i < 5 && (!dataRes.ok || dataRes.status === 404); i++) {
                  await sleep(2000);
                  dataRes = await fetch(dataUrl, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}` }
                  });
                }
              }

              if (dataRes.ok) {
                const dataJson = await dataRes.json();
                results = Array.isArray(dataJson.data) ? dataJson.data : dataJson.data ? [dataJson.data] : [];
                console.log('Firecrawl data fetched:', results.length, 'results');
              } else {
                console.error('Failed to fetch Firecrawl results:', dataRes.status);
              }
              break;
            }

            if (status === 'failed' || status === 'error') {
              console.error('Firecrawl job failed');
              break;
            }

            attempt++;
            await sleep(2000);
          }
        }
      }
    } else {
      // No Firecrawl key, use Crawl4AI if available
      shouldFallback = true;
    }

    // Fallback to Crawl4AI if needed
    if (shouldFallback && CRAWL4AI_URL) {
      console.log('Using Crawl4AI for crawling...');
      usedService = 'crawl4ai';

      const crawl4aiResponse = await fetch(`${CRAWL4AI_URL}/crawl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: url,
          max_depth: 2,
          max_pages: maxPages,
          extraction_config: {
            type: 'basic',
          },
        }),
      });

      if (!crawl4aiResponse.ok) {
        const errorText = await crawl4aiResponse.text();
        console.error('Crawl4AI API error:', errorText);
        
        await supabaseClient
          .from('knowledge_crawl_jobs')
          .update({
            status: 'failed',
            error_message: `Crawl4AI ${crawl4aiResponse.status}: ${errorText}`,
            completed_at: new Date().toISOString()
          })
          .eq('id', jobData.id);

        return new Response(
          JSON.stringify({ success: false, error: `Crawl4AI error ${crawl4aiResponse.status}` }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const crawl4aiData = await crawl4aiResponse.json();
      console.log('Crawl4AI response:', JSON.stringify(crawl4aiData).substring(0, 500));
      
      // Crawl4AI returns results in a different format
      results = crawl4aiData.results || [];
    }

    if (!results || results.length === 0) {
      console.warn('No results from crawl');
      await supabaseClient
        .from('knowledge_crawl_jobs')
        .update({
          status: 'completed',
          pages_crawled: 0,
          completed_at: new Date().toISOString(),
          metadata: {
            crawl_service_used: usedService,
            note: 'No pages crawled'
          }
        })
        .eq('id', jobData.id);

      return new Response(
        JSON.stringify({ success: true, jobId: jobData.id, pagesProcessed: 0, centersExtracted: 0, serviceUsed: usedService }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${results.length} crawled pages from ${usedService}...`);

    // Process results and extract treatment centers
    let extractedCenters = 0;

    for (const page of results) {
      const pageUrl = page.url || page.metadata?.sourceURL || url;
      const pageTitle = page.metadata?.title || page.title || 'Untitled';
      const markdown = page.markdown || '';
      const htmlContent = page.html || page.content || '';

      // Extract comprehensive metadata
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

      // Determine content type
      let determinedContentType = 'general';
      const lowerContent = markdown.toLowerCase() + ' ' + pageTitle.toLowerCase();
      
      if (lowerContent.includes('treatment center') || lowerContent.includes('medical center') || 
          lowerContent.includes('hospital') || lowerContent.includes('clinic')) {
        determinedContentType = 'treatment_center';
      } else if (lowerContent.includes('clinical trial') || lowerContent.includes('study')) {
        determinedContentType = 'clinical_trial';
      } else if (lowerContent.includes('dataset') || lowerContent.includes('data repository')) {
        determinedContentType = 'dataset';
      } else if (lowerContent.includes('research') || lowerContent.includes('publication')) {
        determinedContentType = 'research_paper';
      }

      // Insert into universal knowledge base
      const { error: knowledgeError } = await supabaseClient
        .from('universal_knowledge_base')
        .insert({
          title: pageTitle,
          content: markdown || htmlContent.substring(0, 10000),
          source_url: pageUrl,
          source_type: 'crawled_website',
          category: centerType,
          content_type: determinedContentType,
          metadata: {
            crawled_at: new Date().toISOString(),
            center_type: centerType,
            source_name: sourceName,
            html_available: !!htmlContent,
            crawl_service: usedService,
          },
          status: 'approved',
        });

      if (knowledgeError) {
        console.error('Error inserting knowledge:', knowledgeError);
      }

      // Extract treatment center data using AI if available
      if (LOVABLE_API_KEY && (determinedContentType === 'treatment_center' || lowerContent.includes('gene therapy'))) {
        try {
          const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash',
              messages: [
                {
                  role: 'system',
                  content: 'You are a medical data extraction assistant. Extract treatment center information from the provided text. Return only valid JSON.'
                },
                {
                  role: 'user',
                  content: `Extract treatment center information from this text. Return a JSON object with: name, address, phone, email, website, specialties (array), diseases_treated (array). If any field is not found, use null.\n\nText: ${markdown.substring(0, 4000)}`
                }
              ],
            }),
          });

          if (aiResponse.ok) {
            const aiData = await aiResponse.json();
            const extractedText = aiData.choices?.[0]?.message?.content || '';
            
            // Try to parse JSON from response
            try {
              const jsonMatch = extractedText.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const centerData = JSON.parse(jsonMatch[0]);
                
                if (centerData.name) {
                  const { error: centerError } = await supabaseClient
                    .from('treatment_centers')
                    .insert({
                      name: centerData.name,
                      address: centerData.address,
                      phone: centerData.phone,
                      email: centerData.email,
                      website: centerData.website || pageUrl,
                      specialties: centerData.specialties || [],
                      diseases_treated: centerData.diseases_treated || [],
                      center_type: centerType,
                      verified: false,
                      metadata: {
                        source_url: pageUrl,
                        extracted_at: new Date().toISOString(),
                        extraction_method: 'ai_crawl',
                        crawl_service: usedService,
                      },
                    });

                  if (!centerError) {
                    extractedCenters++;
                    console.log(`Extracted treatment center: ${centerData.name}`);
                  } else {
                    console.error('Error inserting treatment center:', centerError);
                  }
                }
              }
            } catch (parseError) {
              console.error('Failed to parse AI response:', parseError);
            }
          }
        } catch (aiError) {
          console.error('AI extraction error:', aiError);
        }
      }
    }

    // Update job status
    await supabaseClient
      .from('knowledge_crawl_jobs')
      .update({
        status: 'completed',
        pages_crawled: results.length,
        completed_at: new Date().toISOString(),
        metadata: {
          center_type: centerType,
          content_types: contentTypes,
          max_pages: maxPages,
          crawl_service_used: usedService,
          crawl_duration: Date.now() - new Date(jobData.created_at).getTime(),
        },
      })
      .eq('id', jobData.id);

    console.log(`Crawl completed: ${results.length} pages processed, ${extractedCenters} centers extracted using ${usedService}`);

    return new Response(JSON.stringify({ 
      success: true,
      jobId: jobData.id,
      pagesProcessed: results.length,
      centersExtracted: extractedCenters,
      serviceUsed: usedService
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Crawl error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
