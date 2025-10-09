import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { checkRateLimit, getClientIP, getRateLimitHeaders } from "../_shared/rateLimiter.ts";
import { AIRequestSchema, createValidationErrorResponse } from "../_shared/validation.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
const claudeApiKey = Deno.env.get('CLAUDE_API_KEY');
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const lovableApiKey = Deno.env.get('LOVABLE_API_KEY'); // For small language models
const labelStudioApiKey = Deno.env.get('LABEL_STUDIO_API_KEY');
const labelStudioUrl = Deno.env.get('LABEL_STUDIO_URL');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AIRequest {
  provider: 'openai' | 'claude' | 'gemini' | 'lovable';
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  context?: string;
  useRAG?: boolean;
  imageUrl?: string; // For vision models
  images?: string[]; // For multiple images
  useMCP?: boolean; // Model Context Protocol
  mcpServers?: string[]; // MCP server endpoints
  labelStudioProject?: string; // For data annotation/management
}

async function searchKnowledgeBase(query: string, context?: string) {
  try {
    // Extract only the user's main question and sanitize to avoid PostgREST OR parser issues
    const base = (query || '')
      .split(/\n\n|\nContext:|\nAI Config:|\nUser:/i)[0] // take first paragraph before metadata
      .replace(/https?:\/\/\S+/g, '') // remove urls
      .replace(/[^\p{L}\p{N}\s]/gu, ' ') // keep letters/numbers/spaces only
      .replace(/\s+/g, ' ') // collapse whitespace
      .trim()
      .toLowerCase();

    const sanitized = base.slice(0, 120); // keep it short for LIKE

    if (!sanitized) return [];

    console.log('Searching universal knowledge base for (sanitized):', sanitized);
    
    const { data: results, error } = await supabase
      .from('universal_knowledge_base')
      .select('finding_name, description, clinical_context, clinical_significance, domain, content_type, metadata')
      .eq('is_approved', true)
      .or(`finding_name.ilike.%${sanitized}%,description.ilike.%${sanitized}%`)
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
  const messages: any[] = [
    { role: 'system', content: request.systemPrompt || 'You are a helpful AI assistant.' }
  ];

  if (ragContext) {
    messages.push({
      role: 'system',
      content: `Relevant context from knowledge base: ${ragContext}`
    });
  }

  // Handle vision models with images
  if (request.imageUrl || request.images) {
    const content: any[] = [{ type: 'text', text: request.prompt }];
    
    if (request.imageUrl) {
      content.push({
        type: 'image_url',
        image_url: { url: request.imageUrl }
      });
    }
    
    if (request.images) {
      request.images.forEach(img => {
        content.push({
          type: 'image_url',
          image_url: { url: img }
        });
      });
    }
    
    messages.push({ role: 'user', content });
  } else {
    messages.push({ role: 'user', content: request.prompt });
  }

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
    console.error('OpenAI API error:', data);
    throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
}

async function callClaude(request: AIRequest, ragContext?: string) {
  let systemContent = request.systemPrompt || 'You are a helpful AI assistant.';
  
  if (ragContext) {
    systemContent += `\n\nRelevant context from knowledge base: ${ragContext}`;
  }

  const messages: any[] = [];

  // Handle vision models with images
  if (request.imageUrl || request.images) {
    const content: any[] = [{ type: 'text', text: request.prompt }];
    
    if (request.imageUrl) {
      // Fetch and convert image to base64 for Claude
      const imageResponse = await fetch(request.imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
      const mediaType = imageResponse.headers.get('content-type') || 'image/jpeg';
      
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Image
        }
      });
    }
    
    messages.push({ role: 'user', content });
  } else {
    messages.push({ role: 'user', content: request.prompt });
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
      messages,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Claude API error:', data);
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

  const parts: any[] = [{ text: prompt }];

  // Handle vision models with images
  if (request.imageUrl || request.images) {
    const imageUrls = [
      ...(request.imageUrl ? [request.imageUrl] : []),
      ...(request.images || [])
    ];

    for (const imgUrl of imageUrls) {
      const imageResponse = await fetch(imgUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
      const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Image
        }
      });
    }
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${request.model}:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts
      }],
      generationConfig: {
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxTokens || 1500,
      },
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Gemini API error:', data);
    throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.candidates[0].content.parts[0].text;
}

async function callLovableAI(request: AIRequest, ragContext?: string) {
  // Use Lovable AI Gateway for small language models
  const messages: any[] = [
    { role: 'system', content: request.systemPrompt || 'You are a helpful AI assistant.' }
  ];

  if (ragContext) {
    messages.push({
      role: 'system',
      content: `Relevant context from knowledge base: ${ragContext}`
    });
  }

  // Handle vision models
  if (request.imageUrl || request.images) {
    const content: any[] = [{ type: 'text', text: request.prompt }];
    
    if (request.imageUrl) {
      content.push({
        type: 'image_url',
        image_url: { url: request.imageUrl }
      });
    }
    
    if (request.images) {
      request.images.forEach(img => {
        content.push({
          type: 'image_url',
          image_url: { url: img }
        });
      });
    }
    
    messages.push({ role: 'user', content });
  } else {
    messages.push({ role: 'user', content: request.prompt });
  }

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: request.model, // e.g., google/gemini-2.5-flash, openai/gpt-5-mini
      messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.maxTokens || 1500,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Lovable AI error:', data);
    throw new Error(`Lovable AI error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
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

async function callMCPServer(serverUrl: string, prompt: string, context?: string): Promise<any> {
  // Model Context Protocol integration
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'tools/call',
        params: {
          name: 'process_context',
          arguments: {
            prompt,
            context: context || ''
          }
        }
      })
    });

    if (!response.ok) {
      console.error(`MCP server error: ${serverUrl}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to call MCP server ${serverUrl}:`, error);
    return null;
  }
}

async function logToLabelStudio(request: AIRequest, response: string, ragContext?: string) {
  if (!labelStudioApiKey || !labelStudioUrl || !request.labelStudioProject) {
    return;
  }

  try {
    // Create annotation task in Label Studio
    await fetch(`${labelStudioUrl}/api/projects/${request.labelStudioProject}/import`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${labelStudioApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{
        data: {
          text: request.prompt,
          model: request.model,
          provider: request.provider,
          response: response,
          rag_context: ragContext || '',
          has_images: !!(request.imageUrl || request.images),
          timestamp: new Date().toISOString()
        }
      }])
    });

    console.log('Logged to Label Studio project:', request.labelStudioProject);
  } catch (error) {
    console.error('Failed to log to Label Studio:', error);
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    const rateLimitResult = await checkRateLimit(clientIP, 'ai-universal-processor');
    const rateLimitHeaders = getRateLimitHeaders(rateLimitResult, 'ai-universal-processor');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a minute.',
          resetAt: rateLimitResult.resetAt 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            ...rateLimitHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    // Parse and validate request
    const rawData = await req.json();
    let request: AIRequest;
    
    try {
      request = AIRequestSchema.parse(rawData) as AIRequest;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createValidationErrorResponse(error, corsHeaders);
      }
      throw error;
    }
    
    // CRITICAL: Route ALL requests through Lovable AI Gateway for reliability
    // Map any model selection to appropriate Lovable AI model
    const originalModel = (request.model || '').toLowerCase();
    
    // Model mapping to Lovable AI Gateway format
    const modelMapping: Record<string, string> = {
      // Healthcare/Clinical models -> Gemini Pro for best medical reasoning
      'clinical-bert': 'google/gemini-2.5-pro',
      'bioclinicalbert': 'google/gemini-2.5-pro',
      'biobert': 'google/gemini-2.5-pro',
      'medicalbert': 'google/gemini-2.5-pro',
      
      // Claude models
      'claude-3-haiku': 'openai/gpt-5-mini', // Fast, efficient
      'claude-3-5-haiku': 'openai/gpt-5-mini',
      'claude-3-opus': 'openai/gpt-5', // Most capable
      'claude-3-5-opus': 'openai/gpt-5',
      'claude-3-sonnet': 'google/gemini-2.5-flash', // Balanced
      'claude-3-5-sonnet': 'google/gemini-2.5-flash',
      
      // OpenAI models (map to Lovable AI equivalents)
      'gpt-4o': 'openai/gpt-5',
      'gpt-4o-mini': 'openai/gpt-5-mini',
      'gpt-4': 'openai/gpt-5',
      'gpt-3.5-turbo': 'openai/gpt-5-nano',
      
      // Gemini models (ensure correct format)
      'gemini-2.5-pro': 'google/gemini-2.5-pro',
      'gemini-2.5-flash': 'google/gemini-2.5-flash',
      'gemini-2.5-flash-lite': 'google/gemini-2.5-flash-lite',
      'gemini-pro': 'google/gemini-2.5-pro',
      'gemini-flash': 'google/gemini-2.5-flash',
      
      // Image generation
      'dall-e-3': 'google/gemini-2.5-flash-image-preview',
      'imagen': 'google/gemini-2.5-flash-image-preview',
      'stable-diffusion': 'google/gemini-2.5-flash-image-preview',
    };
    
    // Apply model mapping
    let mappedModel = modelMapping[originalModel] || request.model;
    
    // If model doesn't start with google/ or openai/, default to Gemini Flash
    if (!mappedModel.startsWith('google/') && !mappedModel.startsWith('openai/')) {
      mappedModel = 'google/gemini-2.5-flash';
      console.log(`Unmapped model "${originalModel}" -> default to ${mappedModel}`);
    }
    
    request.model = mappedModel;
    request.provider = 'lovable'; // Force all through Lovable AI Gateway
    
    console.log('Processing AI request:', {
      original: originalModel,
      mapped: mappedModel,
      provider: request.provider
    });

    let ragContext = '';
    
    // Use RAG if enabled (default to true)
    if (request.useRAG !== false) {
      const knowledgeResults = await searchKnowledgeBase(request.prompt, request.context);
      ragContext = knowledgeResults.map(result => 
        `${result.finding_name}: ${result.description}`
      ).join('\n\n');
      console.log('RAG context found:', ragContext.length > 0);
    }

    // Process MCP servers if enabled
    let mcpContext = '';
    if (request.useMCP && request.mcpServers && request.mcpServers.length > 0) {
      console.log('Processing MCP servers:', request.mcpServers.length);
      const mcpResults = await Promise.all(
        request.mcpServers.map(server => callMCPServer(server, request.prompt, request.context))
      );
      
      const validResults = mcpResults.filter(r => r !== null);
      if (validResults.length > 0) {
        mcpContext = validResults.map(r => JSON.stringify(r)).join('\n\n');
        console.log('MCP context generated');
      }
    }

    // Combine RAG and MCP context
    const fullContext = [ragContext, mcpContext].filter(c => c).join('\n\n---\n\n');
    
    let content = '';

    // Route to appropriate AI provider
    switch (request.provider) {
      case 'openai':
        if (!openaiApiKey) throw new Error('OpenAI API key not configured');
        content = await callOpenAI(request, fullContext);
        break;
      case 'claude':
        if (!claudeApiKey) throw new Error('Claude API key not configured');
        content = await callClaude(request, fullContext);
        break;
      case 'gemini':
        if (!geminiApiKey) throw new Error('Gemini API key not configured');
        content = await callGemini(request, fullContext);
        break;
      case 'lovable':
        if (!lovableApiKey) throw new Error('Lovable AI API key not configured');
        content = await callLovableAI(request, fullContext);
        break;
      default:
        throw new Error(`Unsupported provider: ${request.provider}`);
    }

    // Log conversation, suggest knowledge updates, and log to Label Studio
    await Promise.all([
      logConversation(request, content, ragContext.length > 0),
      suggestKnowledgeUpdates(request.prompt, content, request.context),
      logToLabelStudio(request, content, fullContext)
    ]);

    return new Response(JSON.stringify({ 
      content,
      provider: request.provider,
      model: request.model,
      ragUsed: ragContext.length > 0,
      mcpUsed: mcpContext.length > 0,
      hasVision: !!(request.imageUrl || request.images),
      labelStudioLogged: !!(request.labelStudioProject && labelStudioApiKey)
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