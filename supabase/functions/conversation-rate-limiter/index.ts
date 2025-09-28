import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ConversationLimitRequest {
  ip_address: string;
  user_email?: string;
  user_name?: string;
  context: string;
  action: 'check' | 'start' | 'end' | 'message';
  session_id?: string;
  message_count?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { ip_address, user_email, user_name, context, action, session_id, message_count } = await req.json() as ConversationLimitRequest

    // Check conversation limits using the database function
    const { data: limitCheck, error: limitError } = await supabase
      .rpc('check_conversation_limits', {
        p_ip_address: ip_address,
        p_user_email: user_email
      })

    if (limitError) {
      throw limitError
    }

    // If action is just checking limits, return the status
    if (action === 'check') {
      return new Response(
        JSON.stringify({
          allowed: limitCheck.allowed,
          limits: {
            daily_count: limitCheck.daily_count,
            daily_limit: limitCheck.daily_limit,
            hourly_count: limitCheck.hourly_count,
            hourly_limit: limitCheck.hourly_limit,
            email_daily_count: limitCheck.email_daily_count,
            email_daily_limit: limitCheck.email_daily_limit
          },
          reset_time: limitCheck.reset_time,
          restriction_reason: !limitCheck.allowed ? 'Rate limit exceeded' : null
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Handle different actions
    switch (action) {
      case 'start':
        if (!limitCheck.allowed) {
          return new Response(
            JSON.stringify({
              allowed: false,
              message: 'Conversation limit exceeded. Please try again later.',
              reset_time: limitCheck.reset_time,
              limits: limitCheck
            }),
            { 
              status: 429,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        // Create or update conversation session
        const { data: sessionData, error: sessionError } = await supabase
          .from('conversation_sessions')
          .upsert({
            session_id: session_id || `${ip_address}_${Date.now()}`,
            ip_address,
            user_email,
            user_name,
            conversation_count: 1,
            last_conversation_at: new Date().toISOString()
          }, {
            onConflict: 'ip_address',
            ignoreDuplicates: false
          })
          .select()

        if (sessionError) {
          console.error('Session error:', sessionError)
        }

        // Create conversation tracking record
        const { error: trackingError } = await supabase
          .from('conversation_tracking')
          .insert({
            session_id: session_id || `${ip_address}_${Date.now()}`,
            ip_address,
            user_email,
            context,
            message_count: 0,
            started_at: new Date().toISOString()
          })

        if (trackingError) {
          console.error('Tracking error:', trackingError)
        }

        return new Response(
          JSON.stringify({
            allowed: true,
            session_id: session_id || `${ip_address}_${Date.now()}`,
            message: 'Conversation started successfully'
          }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )

      case 'message':
        // Update message count
        if (session_id) {
          const { error: updateError } = await supabase
            .from('conversation_tracking')
            .update({
              message_count: message_count || 1
            })
            .eq('session_id', session_id)

          if (updateError) {
            console.error('Message update error:', updateError)
          }
        }

        return new Response(
          JSON.stringify({ success: true }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )

      case 'end':
        // End conversation
        if (session_id) {
          const { error: endError } = await supabase
            .from('conversation_tracking')
            .update({
              ended_at: new Date().toISOString(),
              is_completed: true,
              duration_minutes: message_count ? Math.ceil(message_count * 0.5) : 1 // Estimate duration
            })
            .eq('session_id', session_id)

          if (endError) {
            console.error('End conversation error:', endError)
          }
        }

        return new Response(
          JSON.stringify({ success: true, message: 'Conversation ended' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})