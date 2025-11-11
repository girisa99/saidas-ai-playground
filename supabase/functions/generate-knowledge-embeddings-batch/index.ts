import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

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
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { knowledge_ids, batch_size = 50 } = await req.json();
    
    console.log(`Starting embeddings generation for ${knowledge_ids?.length || 'all'} entries`);
    
    // Get knowledge base entries that need embeddings
    let query = supabase
      .from('universal_knowledge_base')
      .select('id, description, content_summary, tags, domain');
    
    if (knowledge_ids && knowledge_ids.length > 0) {
      query = query.in('id', knowledge_ids);
    } else {
      // Only process entries without embeddings
      query = query.is('embedding', null);
    }
    
    query = query.limit(batch_size);
    
    const { data: entries, error: fetchError } = await query;
    
    if (fetchError) {
      throw fetchError;
    }
    
    if (!entries || entries.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No entries need embeddings',
          processed: 0 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    console.log(`Processing ${entries.length} entries`);
    
    let successCount = 0;
    let errorCount = 0;
    const errors: any[] = [];
    
    // Process entries in batches
    for (const entry of entries) {
      try {
        // Combine text for embedding
        const textToEmbed = [
          entry.description,
          entry.content_summary,
          entry.tags?.join(', '),
          `Domain: ${entry.domain}`
        ].filter(Boolean).join('\n');
        
        // Generate embedding using OpenAI
        const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openaiApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: textToEmbed,
            encoding_format: 'float'
          }),
        });
        
        if (!embeddingResponse.ok) {
          const errorText = await embeddingResponse.text();
          throw new Error(`OpenAI API error: ${embeddingResponse.status} - ${errorText}`);
        }
        
        const embeddingData = await embeddingResponse.json();
        const embedding = embeddingData.data[0].embedding;
        
        // Update the entry with the embedding
        const { error: updateError } = await supabase
          .from('universal_knowledge_base')
          .update({
            embedding: embedding,
            embedding_model: 'text-embedding-3-small',
            last_embedded_at: new Date().toISOString()
          })
          .eq('id', entry.id);
        
        if (updateError) {
          throw updateError;
        }
        
        successCount++;
        console.log(`Successfully embedded entry ${entry.id}`);
        
      } catch (error) {
        errorCount++;
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errors.push({
          entry_id: entry.id,
          error: errorMessage
        });
        console.error(`Error embedding entry ${entry.id}:`, errorMessage);
      }
    }
    
    return new Response(
      JSON.stringify({
        message: `Processed ${entries.length} entries`,
        success_count: successCount,
        error_count: errorCount,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Embedding generation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
