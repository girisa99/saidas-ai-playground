-- Create tables for conversation tracking and IP-based restrictions
CREATE TABLE public.conversation_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  ip_address INET NOT NULL,
  user_email TEXT,
  user_name TEXT,
  conversation_count INTEGER NOT NULL DEFAULT 1,
  first_conversation_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_conversation_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_restricted BOOLEAN NOT NULL DEFAULT false,
  restriction_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for tracking individual conversations
CREATE TABLE public.conversation_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  ip_address INET NOT NULL,
  user_email TEXT,
  context TEXT NOT NULL, -- 'technology' or 'healthcare'
  message_count INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for usage limits and configurations
CREATE TABLE public.usage_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  limit_type TEXT NOT NULL, -- 'daily_conversations', 'hourly_conversations', 'messages_per_conversation'
  limit_value INTEGER NOT NULL,
  time_window_hours INTEGER NOT NULL DEFAULT 24,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default usage limits
INSERT INTO public.usage_limits (limit_type, limit_value, time_window_hours) VALUES
('daily_conversations_per_ip', 5, 24),
('hourly_conversations_per_ip', 2, 1),
('messages_per_conversation', 20, 1),
('daily_sessions_per_email', 3, 24);

-- Enable Row Level Security
ALTER TABLE public.conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_limits ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public-facing feature)
CREATE POLICY "Allow public read access to conversation_sessions" 
ON public.conversation_sessions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to conversation_sessions" 
ON public.conversation_sessions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to conversation_sessions" 
ON public.conversation_sessions 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read access to conversation_tracking" 
ON public.conversation_tracking 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public insert to conversation_tracking" 
ON public.conversation_tracking 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public update to conversation_tracking" 
ON public.conversation_tracking 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow public read access to usage_limits" 
ON public.usage_limits 
FOR SELECT 
USING (true);

-- Create indexes for performance
CREATE INDEX idx_conversation_sessions_ip ON public.conversation_sessions(ip_address);
CREATE INDEX idx_conversation_sessions_email ON public.conversation_sessions(user_email);
CREATE INDEX idx_conversation_sessions_created_at ON public.conversation_sessions(created_at);
CREATE INDEX idx_conversation_tracking_ip ON public.conversation_tracking(ip_address);
CREATE INDEX idx_conversation_tracking_session ON public.conversation_tracking(session_id);
CREATE INDEX idx_conversation_tracking_started_at ON public.conversation_tracking(started_at);

-- Create function to check conversation limits
CREATE OR REPLACE FUNCTION public.check_conversation_limits(
  p_ip_address INET,
  p_user_email TEXT DEFAULT NULL
) RETURNS JSON AS $$
DECLARE
  daily_limit INTEGER;
  hourly_limit INTEGER;
  daily_count INTEGER;
  hourly_count INTEGER;
  email_daily_count INTEGER;
  email_daily_limit INTEGER;
  result JSON;
BEGIN
  -- Get limits
  SELECT limit_value INTO daily_limit 
  FROM public.usage_limits 
  WHERE limit_type = 'daily_conversations_per_ip' AND is_active = true;
  
  SELECT limit_value INTO hourly_limit 
  FROM public.usage_limits 
  WHERE limit_type = 'hourly_conversations_per_ip' AND is_active = true;
  
  SELECT limit_value INTO email_daily_limit 
  FROM public.usage_limits 
  WHERE limit_type = 'daily_sessions_per_email' AND is_active = true;
  
  -- Count conversations from this IP in last 24 hours
  SELECT COUNT(*) INTO daily_count
  FROM public.conversation_tracking
  WHERE ip_address = p_ip_address 
  AND started_at > now() - interval '24 hours';
  
  -- Count conversations from this IP in last hour
  SELECT COUNT(*) INTO hourly_count
  FROM public.conversation_tracking
  WHERE ip_address = p_ip_address 
  AND started_at > now() - interval '1 hour';
  
  -- Count conversations from this email in last 24 hours (if email provided)
  IF p_user_email IS NOT NULL THEN
    SELECT COUNT(*) INTO email_daily_count
    FROM public.conversation_tracking
    WHERE user_email = p_user_email 
    AND started_at > now() - interval '24 hours';
  ELSE
    email_daily_count := 0;
  END IF;
  
  -- Build result
  result := json_build_object(
    'allowed', (daily_count < daily_limit AND hourly_count < hourly_limit AND (p_user_email IS NULL OR email_daily_count < email_daily_limit)),
    'daily_count', daily_count,
    'daily_limit', daily_limit,
    'hourly_count', hourly_count,
    'hourly_limit', hourly_limit,
    'email_daily_count', email_daily_count,
    'email_daily_limit', email_daily_limit,
    'reset_time', (now() + interval '1 hour')::timestamp
  );
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_conversation_sessions_updated_at
BEFORE UPDATE ON public.conversation_sessions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_usage_limits_updated_at
BEFORE UPDATE ON public.usage_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();