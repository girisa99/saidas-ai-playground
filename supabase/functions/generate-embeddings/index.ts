import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables (OPENAI_API_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    const { text, knowledge_base_id, batch_size = 10 } = await req.json();

    // If text provided, generate single embedding
    if (text) {
      console.log('Generating embedding for text:', text.substring(0, 100));
      
      const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-3-small',
          input: text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('OpenAI API error:', response.status, errorText);
        throw new Error(`Failed to generate embedding: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const embedding = data.data[0].embedding;

      // If knowledge_base_id provided, update the record
      if (knowledge_base_id) {
        const { error: updateError } = await supabase
          .from('universal_knowledge_base')
          .update({ embedding: embedding })
          .eq('id', knowledge_base_id);

        if (updateError) {
          console.error('Error updating knowledge base:', updateError);
          throw updateError;
        }

        console.log('Updated knowledge base entry with embedding');
      }

      return new Response(JSON.stringify({ embedding }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Batch processing: Generate embeddings for all knowledge base entries without embeddings
    console.log('Starting batch embedding generation...');
    
    const { data: entries, error: fetchError } = await supabase
      .from('universal_knowledge_base')
      .select('id, finding_name, description, clinical_context')
      .is('embedding', null)
      .eq('is_approved', true)
      .limit(batch_size);

    if (fetchError) {
      console.error('Error fetching knowledge entries:', fetchError);
      throw fetchError;
    }

    if (!entries || entries.length === 0) {
      return new Response(JSON.stringify({ 
        message: 'No entries need embeddings',
        processed: 0 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${entries.length} entries...`);
    
    let processed = 0;
    let errors = 0;

    for (const entry of entries) {
      try {
        // Combine text fields for embedding
        const textToEmbed = [
          entry.finding_name,
          entry.description,
          entry.clinical_context
        ].filter(Boolean).join(' | ');

        // Generate embedding using OpenAI API
        const response = await fetch('https://api.openai.com/v1/embeddings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'text-embedding-3-small',
            input: textToEmbed,
          }),
        });

        if (!response.ok) {
          console.error(`Failed to generate embedding for ${entry.id}`);
          errors++;
          continue;
        }

        const data = await response.json();
        const embedding = data.data[0].embedding;

        // Update the knowledge base entry
        const { error: updateError } = await supabase
          .from('universal_knowledge_base')
          .update({ embedding: embedding })
          .eq('id', entry.id);

        if (updateError) {
          console.error(`Error updating ${entry.id}:`, updateError);
          errors++;
          continue;
        }

        processed++;
        console.log(`Processed ${processed}/${entries.length}`);
        
        // Rate limiting: small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error processing entry ${entry.id}:`, error);
        errors++;
      }
    }

    return new Response(JSON.stringify({ 
      message: 'Batch processing complete',
      processed,
      errors,
      total: entries.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-embeddings function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});