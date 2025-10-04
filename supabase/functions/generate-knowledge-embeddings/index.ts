import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const { domain, batchSize = 50 } = await req.json();
    
    console.log(`Starting embedding generation for domain: ${domain || 'all'}`);

    // Get knowledge base entries without embeddings
    let query = supabase
      .from('universal_knowledge_base')
      .select('id, finding_name, description, clinical_significance, domain, content_type')
      .is('embedding', null)
      .eq('is_approved', true)
      .limit(batchSize);

    if (domain) {
      query = query.eq('domain', domain);
    }

    const { data: entries, error: fetchError } = await query;

    if (fetchError) {
      throw new Error(`Failed to fetch entries: ${fetchError.message}`);
    }

    if (!entries || entries.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No entries need embeddings',
          processed: 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${entries.length} entries to process`);

    let processed = 0;
    let failed = 0;
    const errors: string[] = [];

    // Process entries in batches
    for (const entry of entries) {
      try {
        // Combine text for embedding
        const textToEmbed = [
          entry.finding_name,
          entry.description,
          entry.clinical_significance || '',
          `Domain: ${entry.domain}`,
          `Type: ${entry.content_type}`
        ].filter(Boolean).join('\n\n');

        // Generate embedding using OpenAI
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: textToEmbed,
          }),
        });

        if (!embeddingResponse.ok) {
          const errorText = await embeddingResponse.text();
          throw new Error(`OpenAI API error: ${embeddingResponse.status} - ${errorText}`);
        }

        const embeddingData = await embeddingResponse.json();
        const embedding = embeddingData.data[0].embedding;

        // Update knowledge base entry with embedding
        const { error: updateError } = await supabase
          .from('universal_knowledge_base')
          .update({ 
            embedding: embedding,
            updated_at: new Date().toISOString()
          })
          .eq('id', entry.id);

        if (updateError) {
          throw new Error(`Failed to update entry ${entry.id}: ${updateError.message}`);
        }

        processed++;
        
        // Log progress every 10 entries
        if (processed % 10 === 0) {
          console.log(`Processed ${processed}/${entries.length} embeddings...`);
        }

      } catch (error) {
        failed++;
        const errorMsg = `Entry ${entry.id}: ${error instanceof Error ? error.message : 'Unknown error'}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    const result = {
      success: true,
      processed,
      failed,
      total: entries.length,
      errors: errors.slice(0, 5), // Return first 5 errors
      message: `Successfully generated ${processed} embeddings${failed > 0 ? `, ${failed} failed` : ''}`
    };

    console.log('Embedding generation completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Embedding generation error:', error);
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
