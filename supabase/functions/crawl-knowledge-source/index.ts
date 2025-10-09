import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CrawlRequest {
  url: string;
  domain: string;
  contentType: string;
  maxPages?: number;
  recursive?: boolean;
  tags?: string[];
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

    const { url, domain, contentType, maxPages = 100, recursive = false, tags = [] }: CrawlRequest = await req.json();

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) {
      throw new Error('FIRECRAWL_API_KEY not configured');
    }

    console.log(`Starting crawl for ${url} (max ${maxPages} pages, recursive: ${recursive})`);

    // Create crawl job record
    const { data: jobData, error: jobError } = await supabaseClient
      .from('knowledge_crawl_jobs')
      .insert({
        job_name: `Crawl ${new URL(url).hostname}`,
        start_url: url,
        status: 'running',
        pages_total: maxPages,
        configuration: {
          domain,
          contentType,
          recursive,
          tags,
          maxPages
        }
      })
      .select()
      .single();

    if (jobError) throw jobError;

    // Call Firecrawl API
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
          includeTags: ['article', 'main', 'content', 'p', 'h1', 'h2', 'h3'],
          excludeTags: ['nav', 'footer', 'header', 'aside'],
        }
      })
    });

    if (!crawlResponse.ok) {
      const errorText = await crawlResponse.text();
      console.error('Firecrawl API error:', errorText);
      throw new Error(`Firecrawl API error: ${crawlResponse.status} - ${errorText}`);
    }

    const crawlData = await crawlResponse.json();
    console.log('Firecrawl response:', JSON.stringify(crawlData).substring(0, 200));

    // Check if we need to poll for results
    if (crawlData.id) {
      // Job is async, return job ID for polling
      await supabaseClient
        .from('knowledge_crawl_jobs')
        .update({
          status: 'processing',
          configuration: {
            ...jobData.configuration,
            firecrawlJobId: crawlData.id
          }
        })
        .eq('id', jobData.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Crawl job started',
          jobId: jobData.id,
          firecrawlJobId: crawlData.id,
          status: 'processing'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process immediate results
    const results = crawlData.data || [];
    let processedCount = 0;

    for (const page of results) {
      try {
        const { error: insertError } = await supabaseClient
          .from('universal_knowledge_base')
          .insert({
            finding_name: page.metadata?.title || page.url || 'Untitled',
            description: page.markdown || page.content || '',
            domain: domain,
            content_type: contentType,
            metadata: {
              source_type: 'crawl',
              source_url: page.url,
              crawled_at: new Date().toISOString(),
              tags: tags,
              html: page.html,
              links: page.links || [],
              firecrawl_metadata: page.metadata
            },
            clinical_context: {},
            quality_score: 75,
            is_approved: true
          });

        if (insertError) {
          console.error('Error inserting page:', page.url, insertError);
        } else {
          processedCount++;
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

    console.log(`Crawl completed: ${processedCount} pages processed`);

    return new Response(
      JSON.stringify({
        success: true,
        jobId: jobData.id,
        pagesProcessed: processedCount,
        totalPages: results.length,
        status: 'completed'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in crawl-knowledge-source:', error);
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
