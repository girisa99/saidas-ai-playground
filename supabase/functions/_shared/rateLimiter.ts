import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  'ai-universal-processor': { requests: 10, window: 60000 }, // 10/min
  'send-contact-email': { requests: 3, window: 300000 },     // 3/5min
  'newsletter-subscribe': { requests: 2, window: 3600000 },  // 2/hour
  'newsletter-unsubscribe': { requests: 5, window: 300000 }, // 5/5min
  'receive-email': { requests: 20, window: 60000 },          // 20/min
  'analyze-medical-image': { requests: 5, window: 60000 }    // 5/min
};

export interface RateLimitResult {
  allowed: boolean;
  remaining?: number;
  resetAt?: number;
}

export async function checkRateLimit(
  ip: string, 
  endpoint: keyof typeof RATE_LIMITS
): Promise<RateLimitResult> {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
  
  const { requests, window } = RATE_LIMITS[endpoint];
  const now = Date.now();
  
  try {
    const { data, error } = await supabase
      .from('rate_limit_tracking')
      .select('request_count, window_start')
      .eq('ip_address', ip)
      .eq('endpoint', endpoint)
      .maybeSingle();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Rate limit check error:', error);
      // FAIL OPEN: Never block users due to infrastructure issues
      // This ensures the security layer doesn't become a point of failure
      return { allowed: true };
    }
    
    // New window or no existing data
    if (!data || (now - data.window_start > window)) {
      await supabase.from('rate_limit_tracking').upsert({
        ip_address: ip,
        endpoint: endpoint,
        request_count: 1,
        window_start: now,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'ip_address,endpoint'
      });
      
      return { 
        allowed: true, 
        remaining: requests - 1,
        resetAt: now + window
      };
    }
    
    // Rate limit exceeded
    if (data.request_count >= requests) {
      // Log security event
      await logSecurityEvent(
        supabase,
        'rate_limit_exceeded',
        'warning',
        ip,
        endpoint,
        { request_count: data.request_count, limit: requests }
      );
      
      return { 
        allowed: false, 
        remaining: 0,
        resetAt: data.window_start + window
      };
    }
    
    // Increment counter
    await supabase.from('rate_limit_tracking')
      .update({ 
        request_count: data.request_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('ip_address', ip)
      .eq('endpoint', endpoint);
    
    return { 
      allowed: true, 
      remaining: requests - data.request_count - 1,
      resetAt: data.window_start + window
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    // Fail open on unexpected errors
    return { allowed: true };
  }
}

async function logSecurityEvent(
  supabase: ReturnType<typeof createClient>,
  eventType: string,
  severity: 'info' | 'warning' | 'error' | 'critical',
  ipAddress: string,
  endpoint: string,
  details: Record<string, any>
) {
  try {
    await supabase.rpc('log_security_event', {
      p_event_type: eventType,
      p_severity: severity,
      p_ip_address: ipAddress,
      p_endpoint: endpoint,
      p_details: details
    });
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}

export function getRateLimitHeaders(result: RateLimitResult, endpoint: keyof typeof RATE_LIMITS): Record<string, string> {
  const headers: Record<string, string> = {};
  
  if (result.remaining !== undefined) {
    headers['X-RateLimit-Limit'] = RATE_LIMITS[endpoint].requests.toString();
    headers['X-RateLimit-Remaining'] = result.remaining.toString();
  }
  
  if (result.resetAt !== undefined) {
    headers['X-RateLimit-Reset'] = Math.ceil(result.resetAt / 1000).toString();
    headers['Retry-After'] = Math.ceil((result.resetAt - Date.now()) / 1000).toString();
  }
  
  return headers;
}

export function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}
