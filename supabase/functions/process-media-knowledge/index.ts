import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MediaProcessRequest {
  url: string;
  mediaType: 'image' | 'video' | 'pdf';
  domain: string;
  contentType: string;
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

    const { url, mediaType, domain, contentType, tags = [] }: MediaProcessRequest = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

    console.log(`Processing ${mediaType} from ${url}`);

    let processedContent: any = {};

    // Process based on media type
    switch (mediaType) {
      case 'image': {
        if (!OPENAI_API_KEY) {
          throw new Error('OPENAI_API_KEY not configured for image analysis');
        }
        
        // Use GPT-5 Vision for image analysis (best for vision)
        if (OPENAI_API_KEY) {
          const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-5-2025-08-07',
              messages: [{
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `Analyze this image comprehensively:
1. Describe what you see in detail
2. Extract any text visible in the image
3. Identify key concepts, objects, or information
4. Suggest relevant tags and categories
5. Provide a summary suitable for knowledge base indexing`
                  },
                  {
                    type: 'image_url',
                    image_url: { url: url }
                  }
                ]
              }],
              max_completion_tokens: 1000
            })
          });

          const visionData = await visionResponse.json();
          processedContent = {
            aiDescription: visionData.choices?.[0]?.message?.content || '',
            imageUrl: url,
            analysisModel: 'gpt-5-vision'
          };
        }
        break;
      }

      case 'video': {
        // Extract video ID and get transcript
        const videoId = extractVideoId(url);
        
        // Try to get YouTube transcript
        let transcript = '';
        try {
          const transcriptResponse = await fetch(
            `https://youtube-transcript-api.lovable.workers.dev/${videoId}`
          );
          const transcriptData = await transcriptResponse.json();
          transcript = transcriptData.transcript?.map((t: any) => t.text).join(' ') || '';
        } catch (e) {
          console.log('Could not fetch transcript, will use AI summarization');
        }

        // Summarize with Gemini AI
        if (!GEMINI_API_KEY) {
          throw new Error('GEMINI_API_KEY not configured for video summarization');
        }
        
        if (GEMINI_API_KEY) {
          const summaryResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{
                  role: 'user',
                  parts: [{
                    text: transcript 
                      ? `Summarize this video transcript and extract key insights:\n\n${transcript.substring(0, 10000)}`
                      : `Analyze this video URL and provide context: ${url}`
                  }]
                }]
              })
            }
          );

          const summaryData = await summaryResponse.json();
          processedContent = {
            videoUrl: url,
            videoId: videoId,
            transcript: transcript,
            summary: summaryData.candidates?.[0]?.content?.parts?.[0]?.text || '',
            platform: detectVideoPlatform(url)
          };
        }
        break;
      }

      case 'pdf': {
        // For PDFs, we'd need to download and parse
        // This is a placeholder for future implementation
        processedContent = {
          pdfUrl: url,
          note: 'PDF processing requires download and text extraction - implement with pdf-parse'
        };
        break;
      }
    }

    // Store in universal_knowledge_base
    const { data: knowledgeData, error: knowledgeError } = await supabaseClient
      .from('universal_knowledge_base')
      .insert({
        finding_name: `${mediaType} from ${new URL(url).hostname}`,
        description: JSON.stringify(processedContent, null, 2),
        domain: domain,
        content_type: contentType,
        metadata: {
          source_type: mediaType,
          source_url: url,
          processed_at: new Date().toISOString(),
          tags: tags,
          media_type: mediaType,
          ...processedContent
        },
        quality_score: 75,
        is_approved: true
      })
      .select()
      .single();

    if (knowledgeError) throw knowledgeError;

    // Store media asset reference
    await supabaseClient
      .from('knowledge_media_assets')
      .insert({
        knowledge_id: knowledgeData.id,
        media_type: mediaType,
        media_url: url,
        metadata: processedContent
      });

    return new Response(
      JSON.stringify({
        success: true,
        knowledgeId: knowledgeData.id,
        processedContent: processedContent
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in process-media-knowledge:', error);
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

function extractVideoId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
    /vimeo\.com\/(\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return '';
}

function detectVideoPlatform(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('vimeo.com')) return 'vimeo';
  return 'unknown';
}
