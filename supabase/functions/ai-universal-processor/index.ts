import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AIRequest {
  provider: 'openai' | 'claude' | 'gemini';
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  context?: string;
  useRAG?: boolean;
}

async function searchKnowledgeBase(query: string, context?: string) {
  try {
    console.log('Searching universal knowledge base for:', query);
    
    // Search the consolidated universal_knowledge_base table
    const { data: results, error } = await supabase
      .from('universal_knowledge_base')
      .select('finding_name, description, clinical_context, clinical_significance, domain, content_type, metadata')
      .eq('is_approved', true)
      .or(`finding_name.ilike.%${query}%, description.ilike.%${query}%`)
      .limit(5);

    if (error) {
      console.error('Universal knowledge base search error:', error);
      return [];
    }

    console.log(`Found ${results?.length || 0} relevant knowledge entries`);
    return results || [];
  } catch (error) {
    console.error('Search knowledge base error:', error);
    return [];
  }
}

async function callOpenAI(request: AIRequest, ragContext?: string) {
  const messages = [
    { role: 'system', content: request.systemPrompt || 'You are a helpful AI assistant.' }
  ];

  if (ragContext) {
    messages.push({
      role: 'system',
      content: `Relevant context from knowledge base: ${ragContext}`
    });
  }

  messages.push({ role: 'user', content: request.prompt });

  const body: any = {
    model: request.model,
    messages,
  };

  // Handle newer vs legacy models
  const newerModels = ['gpt-5', 'gpt-4.1', 'o3', 'o4'];
  const isNewerModel = newerModels.some(model => request.model.includes(model));

  if (isNewerModel) {
    if (request.maxTokens) {
      body.max_completion_tokens = request.maxTokens;
    }
    // Don't include temperature for newer models
  } else {
    if (request.maxTokens) {
      body.max_tokens = request.maxTokens;
    }
    if (request.temperature !== undefined) {
      body.temperature = request.temperature;
    }
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
}

async function callClaude(request: AIRequest, ragContext?: string) {
  let systemContent = request.systemPrompt || 'You are a helpful AI assistant.';
  
  if (ragContext) {
    systemContent += `\n\nRelevant context from knowledge base: ${ragContext}`;
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': claudeApiKey!,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: request.model,
      max_tokens: request.maxTokens || 1500,
      temperature: request.temperature || 0.7,
      system: systemContent,
      messages: [
        { role: 'user', content: request.prompt }
      ],
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Claude API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.content[0].text;
}

async function callGemini(request: AIRequest, ragContext?: string) {
  let prompt = request.prompt;
  
  if (request.systemPrompt) {
    prompt = `${request.systemPrompt}\n\n${prompt}`;
  }
  
  if (ragContext) {
    prompt = `Context: ${ragContext}\n\n${prompt}`;
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${request.model}:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxTokens || 1500,
      },
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.candidates[0].content.parts[0].text;
}

async function logConversation(request: AIRequest, response: string, ragUsed: boolean) {
  try {
    // Log the conversation for potential knowledge base improvements
    await supabase.from('conversation_logs').insert({
      provider: request.provider,
      model: request.model,
      prompt: request.prompt,
      response: response,
      context: request.context,
      rag_used: ragUsed,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log conversation:', error);
  }
}

async function suggestKnowledgeUpdates(prompt: string, response: string, context?: string) {
  try {
    // Analyze if this conversation suggests a knowledge gap
    const gapAnalysis = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `Analyze if this conversation reveals a knowledge gap that should be added to the knowledge base. 
          Respond with JSON: {"hasGap": boolean, "suggestedContent": string, "priority": "low"|"medium"|"high", "tags": string[]}`
        }, {
          role: 'user',
          content: `User asked: ${prompt}\nAI responded: ${response}\nContext: ${context || 'none'}`
        }],
        temperature: 0.3,
        max_tokens: 500
      }),
    });

    const analysisData = await gapAnalysis.json();
    const analysis = JSON.parse(analysisData.choices[0].message.content);

    if (analysis.hasGap) {
      // Store the suggestion for approval
      await supabase.from('knowledge_suggestions').insert({
        suggested_content: analysis.suggestedContent,
        priority: analysis.priority,
        tags: analysis.tags,
        source_prompt: prompt,
        source_response: response,
        context: context,
        status: 'pending_approval',
        created_at: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Failed to suggest knowledge updates:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const request: AIRequest = await req.json();
    console.log('Processing AI request:', request.provider, request.model);

    let ragContext = '';
    
    // Use RAG if enabled (default to true)
    if (request.useRAG !== false) {
      const knowledgeResults = await searchKnowledgeBase(request.prompt, request.context);
      ragContext = knowledgeResults.map(result => result.content).join('\n\n');
      console.log('RAG context found:', ragContext.length > 0);
    }

    let content = '';

    // Route to appropriate AI provider
    switch (request.provider) {
      case 'openai':
        if (!openaiApiKey) throw new Error('OpenAI API key not configured');
        content = await callOpenAI(request, ragContext);
        break;
      case 'claude':
        if (!claudeApiKey) throw new Error('Claude API key not configured');
        content = await callClaude(request, ragContext);
        break;
      case 'gemini':
        if (!geminiApiKey) throw new Error('Gemini API key not configured');
        content = await callGemini(request, ragContext);
        break;
      default:
        throw new Error(`Unsupported provider: ${request.provider}`);
    }

    // Log conversation and suggest knowledge updates
    await Promise.all([
      logConversation(request, content, ragContext.length > 0),
      suggestKnowledgeUpdates(request.prompt, content, request.context)
    ]);

    return new Response(JSON.stringify({ 
      content,
      provider: request.provider,
      model: request.model,
      ragUsed: ragContext.length > 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI processor error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});