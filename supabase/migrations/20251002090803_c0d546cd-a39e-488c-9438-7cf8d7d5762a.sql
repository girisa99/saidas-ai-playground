-- Fix check_conversation_limits function with SET search_path
CREATE OR REPLACE FUNCTION public.check_conversation_limits(p_ip_address text, p_user_email text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
DECLARE
  daily_count INT;
  hourly_count INT;
  email_daily_count INT;
  daily_limit INT := 10;
  hourly_limit INT := 5;
  email_daily_limit INT := 20;
  is_allowed BOOLEAN := TRUE;
  reset_time TIMESTAMP WITH TIME ZONE;
BEGIN
  SELECT COUNT(*) INTO daily_count
  FROM conversation_tracking
  WHERE ip_address = p_ip_address AND started_at >= NOW() - INTERVAL '24 hours';
  
  SELECT COUNT(*) INTO hourly_count
  FROM conversation_tracking
  WHERE ip_address = p_ip_address AND started_at >= NOW() - INTERVAL '1 hour';
  
  IF p_user_email IS NOT NULL THEN
    SELECT COUNT(*) INTO email_daily_count
    FROM conversation_tracking
    WHERE user_email = p_user_email AND started_at >= NOW() - INTERVAL '24 hours';
  ELSE
    email_daily_count := 0;
  END IF;
  
  IF daily_count >= daily_limit OR hourly_count >= hourly_limit OR 
     (p_user_email IS NOT NULL AND email_daily_count >= email_daily_limit) THEN
    is_allowed := FALSE;
  END IF;
  
  reset_time := NOW() + INTERVAL '1 hour';
  
  RETURN jsonb_build_object(
    'allowed', is_allowed,
    'daily_count', daily_count,
    'daily_limit', daily_limit,
    'hourly_count', hourly_count,
    'hourly_limit', hourly_limit,
    'email_daily_count', email_daily_count,
    'email_daily_limit', email_daily_limit,
    'reset_time', reset_time
  );
END;
$function$;

-- Document public educational content
COMMENT ON TABLE public.modalities IS 'PUBLIC EDUCATIONAL CONTENT: Treatment modality reference data. Intentionally public.';
COMMENT ON TABLE public.services IS 'PUBLIC EDUCATIONAL CONTENT: Healthcare service reference data. Intentionally public.';
COMMENT ON TABLE public.service_providers IS 'PUBLIC DIRECTORY: Healthcare provider directory. Intentionally public.';