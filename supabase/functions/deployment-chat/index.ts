import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { checkRateLimit, getClientIP, getRateLimitHeaders } from "../_shared/rateLimiter.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const clientIP = getClientIP(req);
    
    // Apply same rate limiting as ai-universal-processor (10 req/min)
    const rateLimitResult = await checkRateLimit(clientIP, 'ai-universal-processor');
    
    if (!rateLimitResult.allowed) {
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          resetAt: rateLimitResult.resetAt 
        }),
        { 
          status: 429, 
          headers: {
            ...corsHeaders,
            ...getRateLimitHeaders(rateLimitResult, 'ai-universal-processor'),
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const { deploymentId, message, conversationId, sessionId, currentContext } = await req.json();

    if (!deploymentId || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: deploymentId and message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('📨 Deployment chat request:', { 
      deploymentId, 
      conversationId, 
      sessionId,
      currentContext,
      messageLength: message.length 
    });

    // Verify deployment exists and is enabled
    const { data: deployment, error: deploymentError } = await supabase
      .from('genie_deployments')
      .select('*, agents(*)')
      .eq('id', deploymentId)
      .single();

    if (deploymentError || !deployment) {
      console.error('Deployment fetch error:', deploymentError);
      return new Response(
        JSON.stringify({ error: 'Invalid deployment ID' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (deployment.is_enabled === false) {
      return new Response(
        JSON.stringify({ error: 'This deployment is currently disabled' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Deployment loaded:', {
      name: deployment.name,
      hasAgent: !!deployment.agent_id,
      agentName: deployment.agents?.name
    });

    // Extract configuration from deployment
    const config = deployment.configuration || {};
    const modelConfig = deployment.model_config || {};
    const linkedAgent = deployment.agents; // Agent data if linked (hybrid mode)
    
    // If agent is linked, merge agent configuration with deployment config
    if (linkedAgent) {
      console.log('🔗 Agent linked to deployment:', linkedAgent.name);
      
      // Agent system prompt takes precedence
      if (linkedAgent.system_prompt) {
        modelConfig.systemPrompt = linkedAgent.system_prompt;
      }
      
      // Merge agent configuration with deployment config
      if (linkedAgent.configuration) {
        Object.assign(config, linkedAgent.configuration);
      }
    }
    
    // Fetch conversation history for context persistence
    let conversationHistory: Array<{ role: string; content: string }> = [];
    
    if (conversationId) {
      console.log('🔍 Fetching conversation history for:', conversationId);
      
      const { data: existingConversation } = await supabase
        .from('agent_conversations')
        .select('conversation_data')
        .eq('id', conversationId)
        .single();
      
      if (existingConversation?.conversation_data?.messages) {
        conversationHistory = existingConversation.conversation_data.messages.slice(-10); // Last 10 messages
        console.log('✅ Loaded conversation history:', conversationHistory.length, 'messages');
      }
    }
    
    // Fetch KB/RAG topics for context-aware suggestions
    const knowledgeBaseIds = config.knowledgeBaseIds || [];
    let availableTopics: string[] = [];
    
    if (knowledgeBaseIds.length > 0 && modelConfig.enable_smart_routing) {
      console.log('📚 Fetching KB topics for suggestions...');
      
      const { data: kbEntries } = await supabase
        .from('universal_knowledge_base')
        .select('finding_name, domain, content_type')
        .in('id', knowledgeBaseIds)
        .limit(50);
      
      if (kbEntries) {
        availableTopics = kbEntries
          .map(e => e.finding_name)
          .filter(Boolean)
          .slice(0, 20);
        console.log('✅ Loaded', availableTopics.length, 'KB topics for suggestions');
      }
    }
    
    // Call the universal AI processor with deployment configuration
    const aiRequest = {
      provider: config.provider || 'gemini',
      model: modelConfig.model || config.model || 'google/gemini-2.5-flash',
      prompt: message,
      systemPrompt: config.systemPrompt || 'You are a helpful AI assistant.',
      temperature: modelConfig.temperature || config.temperature || 0.7,
      maxTokens: modelConfig.max_tokens || config.maxTokens || 1000,
      useRAG: config.useRAG || knowledgeBaseIds.length > 0,
      knowledgeBase: knowledgeBaseIds.length > 0,
      useMCP: config.useMCP || (config.mcpServerIds?.length > 0),
      mcpServers: config.mcpServerIds || [],
      enableSmartRouting: modelConfig.enable_smart_routing !== false, // Default TRUE
      enableMultiAgent: modelConfig.ai_mode === 'multi',
      aiMode: modelConfig.ai_mode || 'default',
      conversationId: conversationId,
      sessionId: sessionId,
      conversationHistory: conversationHistory, // Full context persistence
      context: currentContext || 'general', // Context switching support
      availableTopics: availableTopics, // KB-aware topic suggestions
    };
    
    console.log('🚀 Calling AI processor with:', {
      model: aiRequest.model,
      aiMode: aiRequest.aiMode,
      smartRouting: aiRequest.enableSmartRouting,
      useRAG: aiRequest.useRAG,
      historyLength: conversationHistory.length,
      topicsCount: availableTopics.length
    });

    // Invoke ai-universal-processor
    const { data: aiResponse, error: aiError } = await supabase.functions.invoke(
      'ai-universal-processor',
      { body: aiRequest }
    );

    if (aiError) {
      console.error('AI processor error:', aiError);
      return new Response(
        JSON.stringify({ error: 'AI processing failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Track deployment usage
    await supabase
      .from('genie_deployments')
      .update({
        total_conversations: deployment.total_conversations + 1,
        total_tokens_used: deployment.total_tokens_used + (aiResponse.tokensUsed || 0),
        last_used_at: new Date().toISOString(),
      })
      .eq('id', deploymentId);

    // Update or create conversation record with full history
    const updatedHistory = [
      ...conversationHistory,
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse.content || aiResponse.response }
    ];
    
    if (conversationId) {
      // Update existing conversation
      await supabase
        .from('agent_conversations')
        .update({
          conversation_data: {
            messages: updatedHistory,
            currentContext: currentContext,
            metadata: aiResponse.metadata,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', conversationId);
      
      console.log('✅ Updated conversation history:', conversationId);
    } else {
      // Create new conversation
      const { data: newConvo } = await supabase
        .from('agent_conversations')
        .insert({
          user_id: deployment.user_id,
          agent_id: null,
          deployment_id: deploymentId,
          conversation_data: {
            messages: updatedHistory,
            currentContext: currentContext,
            metadata: aiResponse.metadata,
          },
          session_id: sessionId || crypto.randomUUID(),
        })
        .select('id')
        .single();
      
      console.log('✅ Created new conversation:', newConvo?.id);
    }

    return new Response(
      JSON.stringify({
        response: aiResponse.content || aiResponse.response,
        model: aiResponse.modelUsed || aiResponse.model,
        confidence: aiResponse.confidence,
        tokensUsed: aiResponse.tokensUsed,
        conversationId: conversationId || aiResponse.conversationId,
        deploymentName: deployment.name,
        // Smart routing & optimization metadata
        smartRoutingOptimization: aiResponse.metadata?.smartRoutingOptimization,
        triageData: aiResponse.metadata?.triageData,
        routingReasoning: aiResponse.routingReasoning || aiResponse.metadata?.routingReasoning,
        estimatedCost: aiResponse.estimatedCost || aiResponse.metadata?.estimatedCost,
        estimatedLatency: aiResponse.estimatedLatency || aiResponse.metadata?.estimatedLatency,
        // Multi-agent metadata
        collaborationMode: aiResponse.collaborationMode || aiResponse.metadata?.collaborationMode,
        agentCount: aiResponse.agentCount || aiResponse.metadata?.agentCount,
        consensusScore: aiResponse.consensusScore || aiResponse.metadata?.consensusScore,
        // Context switching & topic suggestions
        detectedContext: aiResponse.metadata?.detectedContext || currentContext,
        suggestedTopics: availableTopics.length > 0 ? availableTopics.slice(0, 5) : [],
        contextSwitchDetected: aiResponse.metadata?.contextSwitchDetected,
        // All metadata for rich features
        metadata: aiResponse.metadata,
      }),
      { 
        status: 200, 
        headers: {
          ...corsHeaders,
          ...getRateLimitHeaders(rateLimitResult, 'ai-universal-processor'),
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error) {
    console.error('Deployment chat error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
