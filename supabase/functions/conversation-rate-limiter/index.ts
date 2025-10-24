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
  user_agent?: string; // Browser fingerprint
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role for full access
    )

    const { ip_address, user_email, user_name, context, action, session_id, message_count, user_agent } = await req.json() as ConversationLimitRequest

    // Resolve client IP robustly: prefer header if body missing or fallback value
    const forwarded = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''
    const headerIP = forwarded.split(',')[0]?.trim() || ''
    const clientIP = (ip_address && ip_address !== '0.0.0.0') ? ip_address : (headerIP || '0.0.0.0')

    // Detect environment: preview (lovableproject.com) vs production (other domains)
    const origin = req.headers.get('origin') || ''
    const isPreview = origin.includes('lovableproject.com')
    console.log(`🌍 Environment: ${isPreview ? 'PREVIEW' : 'PRODUCTION'} (origin: ${origin})`)

    // Generate browser fingerprint hash for multi-factor detection
    const browserFingerprint = user_agent ? 
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(user_agent))
        .then(hash => Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16))
      : null

    // Use direct table queries instead of RPC to avoid type mismatch issues
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    // Count IP-based conversations (last 24 hours)
    const { count: ipDailyCount } = await supabase
      .from('conversation_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('started_at', oneDayAgo.toISOString())

    // Count IP-based conversations (last hour)
    const { count: ipHourlyCount } = await supabase
      .from('conversation_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('started_at', oneHourAgo.toISOString())

    // Multi-factor abuse detection
    let emailDailyCount = 0
    let emailHourlyCount = 0
    let existingEmailUsers: any[] = []
    let ipEmailComboCount = 0
    let suspiciousActivity = false
    let abuseFlags: string[] = []
    
    if (user_email) {
      // Check daily email usage
      const { count: emailDaily } = await supabase
        .from('conversation_tracking')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', user_email)
        .gte('started_at', oneDayAgo.toISOString())
      
      emailDailyCount = emailDaily || 0

      // Check hourly email usage
      const { count: emailHourly } = await supabase
        .from('conversation_tracking')
        .select('*', { count: 'exact', head: true })
        .eq('user_email', user_email)
        .gte('started_at', oneHourAgo.toISOString())
      
      emailHourlyCount = emailHourly || 0

      // Check IP + Email combo (stricter limit for specific combinations)
      const { count: comboCount } = await supabase
        .from('conversation_tracking')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', clientIP)
        .eq('user_email', user_email)
        .gte('started_at', oneDayAgo.toISOString())
      
      ipEmailComboCount = comboCount || 0

      // Check if this email is used from multiple IP addresses (potential abuse)
      const { data: emailIPs } = await supabase
        .from('conversation_tracking')
        .select('ip_address, user_email')
        .eq('user_email', user_email)
        .gte('started_at', oneDayAgo.toISOString())
      
      existingEmailUsers = emailIPs || []
      
      // Detect if same email is being used from multiple IPs
      const uniqueIPs = new Set(existingEmailUsers.map(record => record.ip_address))
      if (uniqueIPs.size > 5) {
        suspiciousActivity = true
        abuseFlags.push(`Email used from ${uniqueIPs.size} IPs in 24h`)
        console.warn(`⚠️ ABUSE DETECTED: Email ${user_email} used from ${uniqueIPs.size} different IP addresses`)
      }

      // Check for rapid-fire requests (same IP+email combo in <5 min)
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
      const { count: rapidCount } = await supabase
        .from('conversation_tracking')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', clientIP)
        .eq('user_email', user_email)
        .gte('started_at', fiveMinutesAgo.toISOString())
      
      if ((rapidCount || 0) > 3) {
        suspiciousActivity = true
        abuseFlags.push('Rapid-fire requests detected')
        console.warn(`⚠️ RATE ABUSE: ${rapidCount} requests in 5 minutes from IP ${clientIP}`)
      }
    }

    // Define limits based on environment and suspicious activity
    // Preview: 50/hour for testing, Production: 30/hour for real users
    const BASE_HOURLY_LIMIT = isPreview ? 50 : 30
    const DAILY_IP_LIMIT = suspiciousActivity ? 3 : 10
    const HOURLY_IP_LIMIT = suspiciousActivity ? 2 : BASE_HOURLY_LIMIT
    const DAILY_EMAIL_LIMIT = suspiciousActivity ? 5 : 20
    const HOURLY_EMAIL_LIMIT = suspiciousActivity ? 3 : (isPreview ? 100 : 60)
    const IP_EMAIL_COMBO_LIMIT = 8 // Stricter limit for specific IP+email combos
    
    console.log(`📊 Applied limits - Hourly: ${HOURLY_IP_LIMIT}, Daily: ${DAILY_IP_LIMIT} (suspicious: ${suspiciousActivity})`)

    // Multi-factor limit check: IP, email, AND combo must be within limits
    const ipAllowed = (ipDailyCount || 0) < DAILY_IP_LIMIT && 
                     (ipHourlyCount || 0) < HOURLY_IP_LIMIT
    
    const emailAllowed = !user_email || 
                        (emailDailyCount < DAILY_EMAIL_LIMIT && 
                         emailHourlyCount < HOURLY_EMAIL_LIMIT)
    
    const comboAllowed = !user_email || ipEmailComboCount < IP_EMAIL_COMBO_LIMIT

    // Block if ANY limit exceeded OR suspicious activity detected
    const allowed = ipAllowed && emailAllowed && comboAllowed && !suspiciousActivity

    let restrictionReason = null
    if (suspiciousActivity) {
      restrictionReason = `Suspicious activity detected: ${abuseFlags.join(', ')}. Access temporarily restricted.`
    } else if (!comboAllowed) {
      restrictionReason = `Too many requests from this IP+email combination (${ipEmailComboCount}/${IP_EMAIL_COMBO_LIMIT} daily).`
    } else if (!ipAllowed) {
      restrictionReason = `IP address limit exceeded. You've made ${ipHourlyCount} requests in the last hour (limit: ${HOURLY_IP_LIMIT}) and ${ipDailyCount} requests today (limit: ${DAILY_IP_LIMIT}).`
    } else if (!emailAllowed) {
      restrictionReason = `Email limit exceeded. ${user_email} has made ${emailHourlyCount} requests in the last hour (limit: ${HOURLY_EMAIL_LIMIT}) and ${emailDailyCount} requests today (limit: ${DAILY_EMAIL_LIMIT}).`
    }

    const limitCheck = {
      allowed,
      daily_count: ipDailyCount || 0,
      daily_limit: DAILY_IP_LIMIT,
      hourly_count: ipHourlyCount || 0,
      hourly_limit: HOURLY_IP_LIMIT,
      email_daily_count: emailDailyCount,
      email_daily_limit: DAILY_EMAIL_LIMIT,
      email_hourly_count: emailHourlyCount,
      email_hourly_limit: HOURLY_EMAIL_LIMIT,
      ip_email_combo_count: ipEmailComboCount,
      ip_email_combo_limit: IP_EMAIL_COMBO_LIMIT,
      reset_time: new Date(now.getTime() + 60 * 60 * 1000).toISOString(), // Fixed: 1 hour from now
      restriction_reason: restrictionReason,
      duplicate_email_ips: existingEmailUsers.length > 0 ? existingEmailUsers.length : 0,
      suspicious_activity: suspiciousActivity,
      abuse_flags: abuseFlags,
      browser_fingerprint: browserFingerprint
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
            email_daily_limit: limitCheck.email_daily_limit,
            email_hourly_count: limitCheck.email_hourly_count,
            email_hourly_limit: limitCheck.email_hourly_limit,
            duplicate_email_ips: limitCheck.duplicate_email_ips,
            ip_email_combo_count: limitCheck.ip_email_combo_count,
            ip_email_combo_limit: limitCheck.ip_email_combo_limit,
            suspicious_activity: limitCheck.suspicious_activity,
            abuse_flags: limitCheck.abuse_flags
          },
          reset_time: limitCheck.reset_time,
          restriction_reason: limitCheck.restriction_reason,
          is_returning_user: user_email && emailDailyCount > 0
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
            session_id: session_id || `${clientIP}_${Date.now()}`,
            ip_address: clientIP,
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
            session_id: session_id || `${clientIP}_${Date.now()}`,
            ip_address: clientIP,
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
            session_id: session_id || `${clientIP}_${Date.now()}`,
            message: 'Conversation started successfully',
            limits: limitCheck // Include limits in response for client display
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