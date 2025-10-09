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
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Populating universal_knowledge_base from re3data repositories...');

    // Fetch all approved re3data repositories
    const { data: repositories, error: repoError } = await supabase
      .from('universal_knowledge_repositories')
      .select('*')
      .eq('source_platform', 're3data')
      .eq('is_active', true)
      .gte('quality_score', 70) // Only high-quality repositories
      .limit(100);

    if (repoError) {
      throw new Error(`Failed to fetch repositories: ${repoError.message}`);
    }

    if (!repositories || repositories.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        message: 'No re3data repositories found. Run sync-re3data-repositories first.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    console.log(`Found ${repositories.length} repositories to process`);

    let populatedCount = 0;
    const errors: string[] = [];

    for (const repo of repositories) {
      try {
        // Create knowledge base entry from repository metadata
        const knowledgeEntry = {
          finding_name: `${repo.repository_name} - Healthcare Data Repository`,
          description: `${repo.description || 'Healthcare data repository'}\n\n` +
            `Access Type: ${repo.access_type}\n` +
            `Subjects: ${(repo.subject_areas || []).join(', ')}\n` +
            `Content Types: ${(repo.content_types || []).join(', ')}\n` +
            `Certificates: ${(repo.certificates || []).join(', ')}\n` +
            `FAIR Compliant: ${repo.fair_compliant ? 'Yes' : 'No'}\n` +
            `Quality Score: ${repo.quality_score}/100\n\n` +
            `Repository URL: ${repo.repository_url}`,
          domain: repo.domain as string,
          content_type: 'educational_content' as string,
          source_repository_id: repo.id,
          quality_score: repo.quality_score,
          is_approved: true,
          clinical_context: {},
          metadata: {
            source_type: 're3data_repository',
            repository_id: repo.source_id,
            repository_url: repo.repository_url,
            subject_areas: repo.subject_areas,
            content_types: repo.content_types,
            access_type: repo.access_type,
            certificates: repo.certificates,
            fair_compliant: repo.fair_compliant,
            tags: [
              'repository',
              're3data',
              repo.domain,
              ...(repo.is_medical_imaging ? ['medical_imaging'] : []),
              ...(repo.fair_compliant ? ['fair_compliant'] : []),
              repo.access_type
            ].filter(Boolean)
          }
        };

        // Check if entry already exists
        const { data: existing } = await supabase
          .from('universal_knowledge_base')
          .select('id')
          .eq('source_repository_id', repo.id)
          .single();

        if (existing) {
          console.log(`Skipping ${repo.repository_name} - already exists`);
          continue;
        }

        // Insert knowledge entry
        const { error: insertError } = await supabase
          .from('universal_knowledge_base')
          .insert(knowledgeEntry);

        if (insertError) {
          console.error(`Error inserting ${repo.repository_name}:`, insertError);
          errors.push(`${repo.repository_name}: ${insertError.message}`);
        } else {
          populatedCount++;
          console.log(`Added knowledge entry for: ${repo.repository_name}`);
        }

      } catch (error) {
        console.error(`Error processing repository ${repo.repository_name}:`, error);
        errors.push(`${repo.repository_name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    const result = {
      success: true,
      summary: {
        repositories_processed: repositories.length,
        knowledge_entries_created: populatedCount,
        errors: errors.length
      },
      errors: errors.slice(0, 10),
      message: `Successfully populated ${populatedCount} knowledge entries from re3data repositories`
    };

    console.log('Population completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Population error:', error);
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