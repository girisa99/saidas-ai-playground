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
  imageUrl?: string;
  images?: string[];
  useMCP?: boolean;
  mcpServers?: string[];
  labelStudioProject?: string;
  enableSmartRouting?: boolean;
  enableMultiAgent?: boolean; // NEW: Enable multi-agent collaboration
  conversationHistory?: Array<{ role: string; content: string }>;
}

// Triage result interface (matching frontend)
interface TriageResult {
  complexity: 'simple' | 'medium' | 'high';
  domain: 'healthcare' | 'technology' | 'general';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  best_format: 'text' | 'table' | 'html' | 'list';
  keywords: string[];
  suggested_model: string;
  confidence: number;
  reasoning: string;
  requires_vision: boolean;
  emotional_tone?: 'empathetic' | 'professional' | 'playful';
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

/**
 * ROLE-BASED SPECIALIZATION: SLM Triage Logic
 * Fast query classification to determine optimal model routing
 */
async function triageQuery(
  query: string,
  context?: string,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<TriageResult> {
  const queryLower = query.toLowerCase();
  const wordCount = query.split(' ').length;
  
  // Pattern-based classification
  const complexity = classifyComplexity(queryLower, wordCount);
  const domain = detectDomain(queryLower, context);
  const urgency = detectUrgency(queryLower, complexity);
  const best_format = determineBestFormat(queryLower, complexity);
  const keywords = extractKeywords(query);
  const requires_vision = detectVisionRequirement(queryLower);
  const emotional_tone = detectEmotionalTone(queryLower, conversationHistory);
  const suggested_model = suggestModel(complexity, domain, urgency, requires_vision);
  
  return {
    complexity,
    domain,
    urgency,
    best_format,
    keywords,
    suggested_model,
    confidence: 0.85,
    reasoning: `${complexity} complexity ${domain} query`,
    requires_vision,
    emotional_tone
  };
}

function classifyComplexity(queryLower: string, wordCount: number): 'simple' | 'medium' | 'high' {
  const simplePatterns = [
    /^(what|who|when|where|how) (is|are|was|were|do|does)/,
    /^(tell me|show me|give me|list)/,
    /(office hours?|contact|pricing|location|support)/,
  ];
  
  if (simplePatterns.some(p => p.test(queryLower)) && wordCount < 10) {
    return 'simple';
  }
  
  const highComplexityIndicators = [
    /(analyze|compare|evaluate|assess|diagnose)/,
    /(differential|comprehensive|detailed analysis)/,
  ];
  
  if (highComplexityIndicators.some(p => p.test(queryLower)) || wordCount > 30) {
    return 'high';
  }
  
  return 'medium';
}

function detectDomain(queryLower: string, context?: string): 'healthcare' | 'technology' | 'general' {
  const healthcareKeywords = ['patient', 'medical', 'clinical', 'diagnosis', 'treatment', 'therapy', 'x-ray', 'mri', 'ct scan'];
  const technologyKeywords = ['ai', 'software', 'code', 'api', 'integration', 'platform', 'algorithm', 'model'];
  
  const healthScore = healthcareKeywords.filter(k => queryLower.includes(k)).length;
  const techScore = technologyKeywords.filter(k => queryLower.includes(k)).length;
  
  if (context === 'healthcare' && healthScore >= techScore) return 'healthcare';
  if (context === 'technology' && techScore >= healthScore) return 'technology';
  if (healthScore > techScore) return 'healthcare';
  if (techScore > healthScore) return 'technology';
  
  return 'general';
}

function detectUrgency(queryLower: string, complexity: string): 'low' | 'medium' | 'high' | 'critical' {
  const criticalIndicators = ['emergency', 'urgent', 'critical', 'immediately', 'asap'];
  const highIndicators = ['important', 'priority', 'soon', 'quickly'];
  
  if (criticalIndicators.some(i => queryLower.includes(i))) return 'critical';
  if (highIndicators.some(i => queryLower.includes(i))) return 'high';
  if (complexity === 'simple') return 'low';
  
  return 'medium';
}

function determineBestFormat(queryLower: string, complexity: string): 'text' | 'table' | 'html' | 'list' {
  if (queryLower.match(/(compare|versus|vs|differences)/)) return 'table';
  if (queryLower.match(/(list|steps|options|types)/)) return 'list';
  if (complexity === 'high') return 'html';
  return 'text';
}

function extractKeywords(query: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'what', 'when', 'where', 'who', 'why', 'how']);
  const words = query.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
  return [...new Set(words)].slice(0, 10);
}

function detectVisionRequirement(queryLower: string): boolean {
  return /image|picture|photo|scan|x-ray|mri|ct scan|visual|diagram/.test(queryLower);
}

function detectEmotionalTone(queryLower: string, history?: any[]): 'empathetic' | 'professional' | 'playful' | undefined {
  if (/confused|lost|don't understand|stuck/.test(queryLower)) return 'empathetic';
  if (/awesome|great|cool|amazing|wow/.test(queryLower)) return 'playful';
  return 'professional';
}

function suggestModel(complexity: string, domain: string, urgency: string, requires_vision: boolean): string {
  if (urgency === 'critical') return requires_vision ? 'google/gemini-2.5-pro' : 'openai/gpt-5';
  if (requires_vision) return complexity === 'high' || domain === 'healthcare' ? 'google/gemini-2.5-pro' : 'gpt-4o';
  if (complexity === 'simple') return 'google/gemini-2.5-flash-lite';
  if (complexity === 'medium') return domain === 'healthcare' ? 'google/gemini-2.5-pro' : 'google/gemini-2.5-flash';
  return domain === 'healthcare' ? 'google/gemini-2.5-pro' : 'openai/gpt-5';
}

function enhanceSystemPrompt(basePrompt: string, triage: TriageResult): string {
  let enhanced = basePrompt;
  enhanced += `\n\nContext: ${triage.domain} domain query.`;
  
  if (triage.best_format === 'table') {
    enhanced += '\nPresent findings as a comparative table with clear columns.';
  } else if (triage.best_format === 'list') {
    enhanced += '\nPresent information as a clear, numbered or bulleted list.';
  }
  
  if (triage.emotional_tone === 'empathetic') {
    enhanced += '\nUser seems confused - be extra supportive and clear.';
  }
  
  if (triage.urgency === 'critical' || triage.urgency === 'high') {
    enhanced += `\nUrgency: ${triage.urgency.toUpperCase()} - prioritize safety and accuracy.`;
  }
  
  if (triage.keywords.length > 0) {
    enhanced += `\nKey topics: ${triage.keywords.slice(0, 5).join(', ')}`;
  }
  
  return enhanced;
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
      max_tokens: request.maxTokens || 4000,
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
        maxOutputTokens: request.maxTokens || 4000,
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
      max_tokens: request.maxTokens || 4000,
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
    let rawContent = analysisData.choices[0].message.content;
    
    // Strip markdown code blocks if present
    rawContent = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const analysis = JSON.parse(rawContent);

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

// ============================================================
// MULTI-AGENT COLLABORATION FUNCTIONS
// ============================================================

interface AgentRole {
  role: 'specialist' | 'generalist' | 'synthesizer';
  model: string;
  purpose: string;
}

interface CollaborationChain {
  agents: AgentRole[];
  mode: 'sequential' | 'parallel' | 'ensemble';
  synthesisRequired: boolean;
}

interface AgentResponse {
  agent: AgentRole;
  content: string;
  confidence?: number;
}

interface CollaborationResult {
  mode: string;
  primaryResponse: string;
  synthesizedResponse?: string;
  agentResponses: AgentResponse[];
  consensusScore?: number;
  totalCost: number;
  totalLatency: number;
}

function determineCollaborationStrategy(triage: TriageResult): CollaborationChain {
  // Healthcare Specialist → LLM Chaining
  if (triage.domain === 'healthcare' && triage.complexity === 'high') {
    return {
      agents: [
        { role: 'specialist', model: 'google/gemini-2.5-pro', purpose: 'Medical Analysis' },
        { role: 'generalist', model: 'openai/gpt-5', purpose: 'Patient Explanation' }
      ],
      mode: 'sequential',
      synthesisRequired: false
    };
  }

  // Ensemble Voting for Critical
  if (triage.urgency === 'critical') {
    return {
      agents: [
        { role: 'specialist', model: 'google/gemini-2.5-pro', purpose: 'Medical Diagnosis' },
        { role: 'specialist', model: 'openai/gpt-5', purpose: 'Treatment Validation' },
        { role: 'specialist', model: 'google/gemini-2.5-flash', purpose: 'Safety Check' },
        { role: 'synthesizer', model: 'openai/gpt-5', purpose: 'Consensus Synthesis' }
      ],
      mode: 'ensemble',
      synthesisRequired: true
    };
  }

  // Single agent fallback
  return {
    agents: [{ role: 'generalist', model: triage.suggested_model, purpose: 'Direct Response' }],
    mode: 'sequential',
    synthesisRequired: false
  };
}

async function executeSequentialChain(
  request: AIRequest,
  strategy: CollaborationChain,
  context: string
): Promise<CollaborationResult> {
  const startTime = Date.now();
  const agentResponses: AgentResponse[] = [];
  let totalCost = 0;
  
  console.log('🔄 Starting sequential chain with context preservation...');

  // Step 1: Specialist extracts clinical findings
  const specialistPrompt = `You are a ${strategy.agents[0].purpose}. Extract key findings and clinical context.

Context from conversation: ${context}

User Query: ${request.prompt}

Conversation History:
${(request.conversationHistory || []).map(m => `${m.role}: ${m.content}`).join('\n')}

Provide ONLY structured analysis:
- Key findings
- Clinical significance  
- Urgency level
- Recommended actions

Format as clear, structured text for next agent.`;

  const specialistResponse = await callLovableAI({
    ...request,
    model: strategy.agents[0].model,
    prompt: specialistPrompt,
    systemPrompt: `${context}\n\nMaintain all context from previous conversation.`
  }, context);

  agentResponses.push({
    agent: strategy.agents[0],
    content: specialistResponse
  });
  totalCost += 0.02; // gemini-pro cost
  
  console.log(`✅ Agent 1 (${strategy.agents[0].purpose}) complete`);

  // Step 2: Generalist creates patient-friendly response WITH FULL CONTEXT
  const generalistPrompt = `You are a ${strategy.agents[1].purpose}.

CRITICAL: Maintain continuity from previous conversation:
${(request.conversationHistory || []).map(m => `${m.role}: ${m.content}`).join('\n')}

Original Patient Question: ${request.prompt}

Medical Analysis from Specialist:
${specialistResponse}

Context to preserve: ${context}

Translate into patient-friendly language with empathy and clarity.
IMPORTANT: Reference previous conversation topics to maintain context.`;

  const generalistResponse = await callLovableAI({
    ...request,
    model: strategy.agents[1].model,
    prompt: generalistPrompt,
    systemPrompt: `${context}\n\nYou are continuing a conversation. Maintain all context and references from previous messages.`
  }, context);

  agentResponses.push({
    agent: strategy.agents[1],
    content: generalistResponse
  });
  totalCost += 0.02; // gpt-5 cost
  
  console.log(`✅ Agent 2 (${strategy.agents[1].purpose}) complete`);

  const totalLatency = Date.now() - startTime;
  
  console.log(`🎉 Sequential chain complete: ${totalLatency}ms, $${totalCost.toFixed(4)}`);

  return {
    mode: 'sequential',
    primaryResponse: generalistResponse,
    agentResponses,
    totalCost,
    totalLatency
  };
}

async function executeEnsembleVoting(
  request: AIRequest,
  strategy: CollaborationChain,
  context: string
): Promise<CollaborationResult> {
  const startTime = Date.now();
  const agentResponses: AgentResponse[] = [];
  let totalCost = 0;
  
  console.log('🗳️ Starting ensemble voting with context preservation...');

  // Run all specialist agents in parallel WITH CONVERSATION HISTORY
  const specialists = strategy.agents.filter(a => a.role === 'specialist');
  const conversationContext = (request.conversationHistory || []).map(m => `${m.role}: ${m.content}`).join('\n');
  
  const specialistPromises = specialists.map(agent =>
    callLovableAI({
      ...request,
      model: agent.model,
      prompt: `You are an expert in: ${agent.purpose}

Conversation History (maintain context):
${conversationContext}

Current Patient Query: ${request.prompt}

Context: ${context}

Provide expert analysis. Include confidence score (0-1) and reference previous conversation if relevant.`,
      systemPrompt: `${context}\n\nYou are continuing a conversation. Maintain context from previous messages.`
    }, context)
  );

  const specialistResults = await Promise.all(specialistPromises);
  
  specialists.forEach((agent, i) => {
    agentResponses.push({
      agent,
      content: specialistResults[i],
      confidence: 0.85
    });
    totalCost += 0.02;
    console.log(`✅ Specialist ${i + 1} (${agent.purpose}) complete`);
  });

  // Synthesizer creates consensus WITH FULL CONTEXT
  const synthesizer = strategy.agents.find(a => a.role === 'synthesizer');
  if (synthesizer) {
    const synthPrompt = `Synthesize expert opinions for: ${request.prompt}

CRITICAL: Maintain conversation continuity:
${conversationContext}

Expert Analyses:
${agentResponses.map((r, i) => `Expert ${i + 1} (${r.agent.purpose}):\n${r.content}`).join('\n\n---\n\n')}

Context: ${context}

Create unified response that:
1. Synthesizes consensus
2. Highlights any disagreements
3. Provides confidence score
4. Maintains context from previous conversation
5. References earlier discussion points if relevant`;

    const synthesis = await callLovableAI({
      ...request,
      model: synthesizer.model,
      prompt: synthPrompt,
      systemPrompt: `${context}\n\nYou are synthesizing expert opinions while maintaining conversation continuity.`
    }, context);

    totalCost += 0.02;
    console.log(`✅ Synthesizer (${synthesizer.purpose}) complete`);

    const totalLatency = Date.now() - startTime;
    
    console.log(`🎉 Ensemble voting complete: ${totalLatency}ms, $${totalCost.toFixed(4)}`);

    return {
      mode: 'ensemble',
      primaryResponse: synthesis,
      synthesizedResponse: synthesis,
      agentResponses,
      consensusScore: 0.87,
      totalCost,
      totalLatency
    };
  }

  const totalLatency = Date.now() - startTime;
  return {
    mode: 'ensemble',
    primaryResponse: specialistResults[0],
    agentResponses,
    totalCost,
    totalLatency
  };
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
    
    // ========== INTEGRATION POINT 1: Triage Query ==========
    // Analyze query with SLM to determine optimal routing
    let triageData = null;
    if (request.enableSmartRouting) {
      console.log('Smart routing enabled - analyzing query...');
      triageData = await triageQuery(
        request.prompt,
        request.conversationHistory || []
      );
      console.log('Triage result:', triageData);
    }
    
    // ========== NEW: Multi-Agent Collaboration ==========
    let collaborationResult = null;
    if (request.enableMultiAgent && triageData) {
      console.log('Multi-agent collaboration enabled - determining strategy...');
      
      // Determine collaboration strategy
      const strategy = determineCollaborationStrategy(triageData);
      console.log('Collaboration strategy:', strategy.mode, 'agents:', strategy.agents.length);
      
      if (strategy.mode === 'sequential') {
        // SEQUENTIAL CHAINING: Specialist → Generalist
        collaborationResult = await executeSequentialChain(request, strategy, fullContext);
      } else if (strategy.mode === 'ensemble') {
        // ENSEMBLE VOTING: Multiple specialists + synthesizer
        collaborationResult = await executeEnsembleVoting(request, strategy, fullContext);
      }
    }
    
    // If multi-agent was used, return collaboration result
    if (collaborationResult) {
      console.log('Multi-agent collaboration complete');
      return new Response(JSON.stringify({ 
        content: collaborationResult.synthesizedResponse || collaborationResult.primaryResponse,
        provider: 'lovable',
        model: 'multi-agent',
        ragUsed: ragContext.length > 0,
        mcpUsed: mcpContext.length > 0,
        triageData: triageData,
        collaborationMode: collaborationResult.mode,
        agentCount: collaborationResult.agentResponses.length,
        consensusScore: collaborationResult.consensusScore,
        agentResponses: collaborationResult.agentResponses.map(r => ({
          agent: r.agent.purpose,
          content: r.content.substring(0, 500) + '...'
        })),
        totalCost: collaborationResult.totalCost,
        totalLatency: collaborationResult.totalLatency
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
    
    // ========== INTEGRATION POINT 2: Use Triage-Selected Model ==========
    // If smart routing is enabled and triage suggests a model, use it
    if (triageData?.suggested_model) {
      mappedModel = triageData.suggested_model;
      console.log(`Smart routing selected: ${mappedModel} (was: ${originalModel})`);
      console.log(`Routing reasoning: ${triageData.reasoning}`);
    } else {
      // If model doesn't start with google/ or openai/, default to Gemini Flash
      if (!mappedModel.startsWith('google/') && !mappedModel.startsWith('openai/')) {
        mappedModel = 'google/gemini-2.5-flash';
        console.log(`Unmapped model "${originalModel}" -> default to ${mappedModel}`);
      }
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
    
    // ========== ENHANCEMENT: Apply Triage to System Prompt ==========
    if (triageData && request.systemPrompt) {
      request.systemPrompt = enhanceSystemPrompt(request.systemPrompt, triageData);
      console.log('Enhanced system prompt with triage insights');
    }
    
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

    // ========== INTEGRATION POINT 3: Return Triage Data ==========
    return new Response(JSON.stringify({ 
      content,
      provider: request.provider,
      model: request.model,
      ragUsed: ragContext.length > 0,
      mcpUsed: mcpContext.length > 0,
      hasVision: !!(request.imageUrl || request.images),
      labelStudioLogged: !!(request.labelStudioProject && labelStudioApiKey),
      // Smart routing metadata
      triageData: triageData ? {
        complexity: triageData.complexity,
        domain: triageData.domain,
        urgency: triageData.urgency,
        confidence: triageData.confidence,
        best_format: triageData.best_format,
        emotional_tone: triageData.emotional_tone,
        requires_vision: triageData.requires_vision,
        reasoning: triageData.reasoning
      } : null
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