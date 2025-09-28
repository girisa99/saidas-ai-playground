-- Create access_requests table for users to request extended access
CREATE TABLE IF NOT EXISTS public.access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT,
  ip_address TEXT NOT NULL,
  request_reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_access_requests_status ON public.access_requests(status);
CREATE INDEX IF NOT EXISTS idx_access_requests_email ON public.access_requests(user_email);
CREATE INDEX IF NOT EXISTS idx_access_requests_ip ON public.access_requests(ip_address);

-- Enable RLS
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can manage access requests" 
ON public.access_requests 
FOR ALL 
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "Users can create access requests" 
ON public.access_requests 
FOR INSERT 
WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_access_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_access_requests_updated_at
  BEFORE UPDATE ON public.access_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_access_requests_updated_at();

-- Create approved_access_overrides table to track manual approvals
CREATE TABLE IF NOT EXISTS public.approved_access_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT,
  ip_address TEXT NOT NULL,
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  additional_quota JSONB DEFAULT '{"daily_conversations": 50, "hourly_conversations": 10}'::jsonb,
  reason TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_approved_access_ip ON public.approved_access_overrides(ip_address);
CREATE INDEX IF NOT EXISTS idx_approved_access_email ON public.approved_access_overrides(user_email);
CREATE INDEX IF NOT EXISTS idx_approved_access_active ON public.approved_access_overrides(is_active);

-- Enable RLS
ALTER TABLE public.approved_access_overrides ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can manage access overrides" 
ON public.approved_access_overrides 
FOR ALL 
USING (is_admin_user_safe(auth.uid()));

-- Function to check if user has access override
CREATE OR REPLACE FUNCTION public.check_access_override(p_ip_address TEXT, p_user_email TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  override_record RECORD;
  result JSONB;
BEGIN
  -- Check for active override by IP or email
  SELECT * INTO override_record
  FROM public.approved_access_overrides
  WHERE is_active = true
    AND (ip_address = p_ip_address OR (user_email IS NOT NULL AND user_email = p_user_email))
    AND (expires_at IS NULL OR expires_at > now())
  ORDER BY granted_at DESC
  LIMIT 1;
  
  IF override_record.id IS NOT NULL THEN
    result := jsonb_build_object(
      'has_override', true,
      'additional_quota', override_record.additional_quota,
      'expires_at', override_record.expires_at,
      'reason', override_record.reason
    );
  ELSE
    result := jsonb_build_object('has_override', false);
  END IF;
  
  RETURN result;
END;
$$;