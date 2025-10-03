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

    // Use direct table queries instead of RPC to avoid type mismatch issues
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    // Count IP-based conversations (last 24 hours)
    const { count: ipDailyCount } = await supabase
      .from('conversation_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip_address)
      .gte('started_at', oneDayAgo.toISOString())

    // Count IP-based conversations (last hour)
    const { count: ipHourlyCount } = await supabase
      .from('conversation_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', ip_address)
      .gte('started_at', oneHourAgo.toISOString())

    // Count email-based conversations if email provided
    let emailDailyCount = 0
    if (user_email) {
      const { count } = await supabase
        .from('conversation_tracking')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', user_email)
        .gte('started_at', oneDayAgo.toISOString())
      
      emailDailyCount = count || 0
    }

    // Define limits
    const DAILY_IP_LIMIT = 10
    const HOURLY_IP_LIMIT = 5
    const DAILY_EMAIL_LIMIT = 20

    const allowed = (ipDailyCount || 0) < DAILY_IP_LIMIT && 
                    (ipHourlyCount || 0) < HOURLY_IP_LIMIT && 
                    (!user_email || emailDailyCount < DAILY_EMAIL_LIMIT)

    const limitCheck = {
      allowed,
      daily_count: ipDailyCount || 0,
      daily_limit: DAILY_IP_LIMIT,
      hourly_count: ipHourlyCount || 0,
      hourly_limit: HOURLY_IP_LIMIT,
      email_daily_count: emailDailyCount,
      email_daily_limit: DAILY_EMAIL_LIMIT,
      reset_time: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
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