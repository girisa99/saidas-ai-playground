import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MedicalImageAnalysisRequest {
  imageData: string; // base64 encoded
  modality?: string; // CT, MRI, X-Ray, etc.
  bodyPart?: string;
  clinicalContext?: string;
  userEmail?: string;
  sessionId?: string;
  aiModel?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const claudeApiKey = Deno.env.get('ANTHROPIC_API_KEY');

    if (!geminiApiKey && !openaiApiKey && !claudeApiKey) {
      throw new Error('No AI API key configured (GEMINI_API_KEY, OPENAI_API_KEY, or ANTHROPIC_API_KEY required)');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const request: MedicalImageAnalysisRequest = await req.json();

    console.log('Medical image analysis request:', {
      modality: request.modality,
      bodyPart: request.bodyPart,
      hasImage: !!request.imageData
    });

    // Step 1: Generate embedding for RAG search
    const queryText = `${request.modality || 'medical image'} ${request.bodyPart || ''} ${request.clinicalContext || ''}`.trim();
    
    let queryEmbedding: number[] = [];
    
    if (openaiApiKey) {
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'text-embedding-ada-002',
          input: queryText
        })
      });

      if (embeddingResponse.ok) {
        const embeddingData = await embeddingResponse.json();
        queryEmbedding = embeddingData.data[0].embedding;
      } else {
        console.warn('Failed to generate embedding, proceeding without RAG');
      }
    }

    // Step 2: Retrieve relevant medical knowledge (RAG)
    let ragContext = '';
    let retrievedKnowledge: any[] = [];

    if (queryEmbedding.length > 0) {
      const { data: knowledgeData, error: knowledgeError } = await supabase.rpc(
        'search_medical_imaging_knowledge',
        {
          query_embedding: queryEmbedding,
          filter_modality: request.modality || null,
          match_threshold: 0.7,
          match_count: 5
        }
      );

      if (!knowledgeError && knowledgeData && knowledgeData.length > 0) {
        retrievedKnowledge = knowledgeData;
        
        ragContext = `\n\n## AUTHORITATIVE MEDICAL IMAGING KNOWLEDGE (from validated datasets):\n\n`;
        ragContext += knowledgeData.map((item: any, index: number) => 
          `${index + 1}. **${item.finding_name}** (${item.modality})\n` +
          `   - Description: ${item.description}\n` +
          `   - Clinical Significance: ${item.clinical_significance}\n` +
          `   - Key Features: ${JSON.stringify(item.key_features)}\n` +
          `   - Dataset Source: ${item.dataset_source}\n` +
          `   - Similarity Score: ${(item.similarity * 100).toFixed(1)}%\n`
        ).join('\n');

        console.log(`Retrieved ${knowledgeData.length} relevant knowledge entries from RAG`);
      }
    }

    // Step 3: Construct enhanced system prompt
    const systemPrompt = `You are an educational medical imaging AI assistant with access to authoritative medical imaging datasets (TCIA, ADNI, NIH ChestX-ray14, MIMIC-CXR, CheXpert, DDSM, MIAS, BCDR, PTB-XL, etc.).

**CRITICAL DISCLAIMERS** (always include):
- This is an EDUCATIONAL tool only, NOT for clinical diagnosis
- Observations are based on image characteristics and reference datasets
- All findings MUST be verified by licensed healthcare professionals
- This does NOT replace medical expertise or professional evaluation
- Images may contain PHI (automatically redacted in reports)

**Your Role**:
1. Analyze the medical image using computer vision capabilities
2. Compare findings with authoritative dataset knowledge provided below
3. Describe visible structures, patterns, and characteristics
4. Provide educational context about what features typically indicate
5. Reference similar cases from validated medical imaging datasets
6. ALWAYS emphasize this is educational, not diagnostic

${ragContext}

**Response Format**:
Provide a structured educational analysis including:
- Image Modality & Quality Assessment
- Visible Anatomical Structures
- Notable Image Characteristics
- Comparison with Reference Dataset Findings (cite dataset sources)
- Educational Learning Points
- Important Clinical Context (from authoritative sources)
- Differential Considerations (educational only)
- CRITICAL DISCLAIMERS`;

    // Step 4: Call vision model with RAG-enhanced prompt
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: request.clinicalContext || 
              `Please provide an educational analysis of this ${request.modality || 'medical'} image${request.bodyPart ? ` of the ${request.bodyPart}` : ''}. Compare findings with the authoritative dataset knowledge provided.`
          },
          {
            type: "image_url",
            image_url: {
              url: request.imageData
            }
          }
        ]
      }
    ];

    let analysisResult = '';

    // Priority: Gemini (best for vision), then OpenAI, then Claude
    if (geminiApiKey) {
      const aiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [
                { text: messages[0].content },
                { inlineData: { mimeType: 'image/jpeg', data: request.imageData.split(',')[1] } }
              ]
            }]
          })
        }
      );

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('Gemini API error:', aiResponse.status, errorText);
        throw new Error(`AI analysis failed: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      analysisResult = aiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (openaiApiKey) {
      const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-5-2025-08-07',
          messages,
          max_completion_tokens: 2000
        })
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('OpenAI API error:', aiResponse.status, errorText);
        throw new Error(`AI analysis failed: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      analysisResult = aiData.choices?.[0]?.message?.content || '';
    } else if (claudeApiKey) {
      const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 2000,
          messages
        })
      });

      if (!aiResponse.ok) {
        const errorText = await aiResponse.text();
        console.error('Claude API error:', aiResponse.status, errorText);
        throw new Error(`AI analysis failed: ${aiResponse.status}`);
      }

      const aiData = await aiResponse.json();
      analysisResult = aiData.content?.[0]?.text || '';
    }

    if (!analysisResult) {
      throw new Error('No analysis result from AI');
    }

    // Retrieve relevant knowledge
    const retrievedKnowledge = await retrieveRelevantKnowledge(
      supabase,
      analysisResult,
      request.modality,
      request.clinicalContext
    );

    // Store analysis log
    const { error: logError } = await supabase
      .from('medical_image_analysis_log')
      .insert({
        session_id: request.sessionId,
        user_email: request.userEmail,
        modality: request.modality,
        body_part: request.bodyPart,
        clinical_context: request.clinicalContext,
        rag_context_used: {
          num_retrieved: retrievedKnowledge.length,
          top_findings: retrievedKnowledge.slice(0, 3).map(k => ({
            finding: k.finding_name,
            dataset: k.dataset_source,
            similarity: k.similarity
          }))
        },
        ai_model: request.aiModel || (geminiApiKey ? 'gemini-2.0-flash-exp' : (openaiApiKey ? 'gpt-5' : 'claude-sonnet-4-5')),
        analysis_result: analysisResult
      });

    if (logError) {
      console.error('Failed to log analysis:', logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        analysis: analysisResult,
        ragContext: {
          retrievedCount: retrievedKnowledge.length,
          datasets: [...new Set(retrievedKnowledge.map(k => k.dataset_source))],
          topFindings: retrievedKnowledge.slice(0, 3).map(k => k.finding_name)
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Medical image analysis error:', error);
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
