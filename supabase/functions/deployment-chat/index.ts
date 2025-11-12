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

    const { deploymentId, message, conversationId, sessionId } = await req.json();

    if (!deploymentId || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: deploymentId and message' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify deployment exists and is enabled
    const { data: deployment, error: deploymentError } = await supabase
      .from('genie_deployments')
      .select('*')
      .eq('id', deploymentId)
      .single();

    if (deploymentError || !deployment) {
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

    // Extract configuration from deployment
    const config = deployment.configuration || {};
    
    // Call the universal AI processor with deployment configuration
    const aiRequest = {
      provider: config.provider || 'gemini',
      model: config.model || 'gemini-2.0-flash-exp',
      prompt: message,
      systemPrompt: config.systemPrompt || 'You are a helpful AI assistant.',
      temperature: config.temperature || 0.7,
      maxTokens: config.maxTokens || 1000,
      useRAG: config.useRAG || false,
      useMCP: config.useMCP || false,
      enableSmartRouting: config.enableSmartRouting || false,
      enableMultiAgent: config.enableMultiAgent || false,
      conversationId: conversationId,
      sessionId: sessionId,
    };

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

    // Log conversation for analytics
    await supabase.from('agent_conversations').insert({
      user_id: deployment.user_id,
      agent_id: null, // Deployment-based, not agent-based
      deployment_id: deploymentId,
      conversation_data: {
        message,
        response: aiResponse.response,
        model: aiResponse.model,
        confidence: aiResponse.confidence,
      },
      session_id: sessionId || crypto.randomUUID(),
    });

    return new Response(
      JSON.stringify({
        response: aiResponse.response,
        model: aiResponse.model,
        confidence: aiResponse.confidence,
        tokensUsed: aiResponse.tokensUsed,
        conversationId: aiResponse.conversationId,
        deploymentName: deployment.name,
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
