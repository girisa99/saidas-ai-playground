-- ============================================================================
-- Security Enhancement: Rate Limiting Infrastructure
-- ============================================================================

-- Create rate limit tracking table
CREATE TABLE IF NOT EXISTS public.rate_limit_tracking (
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (ip_address, endpoint)
);

-- Add index for efficient cleanup queries
CREATE INDEX IF NOT EXISTS idx_rate_limit_window ON public.rate_limit_tracking(window_start);
CREATE INDEX IF NOT EXISTS idx_rate_limit_created ON public.rate_limit_tracking(created_at);

-- Enable RLS on rate limit tracking
ALTER TABLE public.rate_limit_tracking ENABLE ROW LEVEL SECURITY;

-- Allow service role to manage rate limits (used by edge functions)
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limit_tracking FOR ALL
USING (true);

-- Create cleanup function for old rate limit entries
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limit_tracking 
  WHERE window_start < EXTRACT(EPOCH FROM NOW() - INTERVAL '2 hours')::BIGINT * 1000;
END;
$$;

-- Create security event logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  ip_address TEXT,
  user_agent TEXT,
  endpoint TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for security event queries
CREATE INDEX IF NOT EXISTS idx_security_events_type ON public.security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON public.security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON public.security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON public.security_events(ip_address);

-- Enable RLS on security events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Admins can view all security events
CREATE POLICY "Admins can view security events"
ON public.security_events FOR SELECT
USING (is_admin_user_safe(auth.uid()));

-- Service role can insert security events
CREATE POLICY "Service can log security events"
ON public.security_events FOR INSERT
WITH CHECK (true);

-- Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type TEXT,
  p_severity TEXT,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_endpoint TEXT DEFAULT NULL,
  p_details JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO public.security_events (
    event_type,
    severity,
    ip_address,
    user_agent,
    endpoint,
    details
  ) VALUES (
    p_event_type,
    p_severity,
    p_ip_address,
    p_user_agent,
    p_endpoint,
    p_details
  ) RETURNING id INTO event_id;
  
  RETURN event_id;
END;
$$;