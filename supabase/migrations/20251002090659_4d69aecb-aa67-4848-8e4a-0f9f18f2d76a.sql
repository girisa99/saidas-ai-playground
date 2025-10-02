-- ============================================================================
-- COMPREHENSIVE SECURITY FIX: Final Pass
-- ============================================================================
-- Fixing all remaining security issues:
-- 1. Fix check_conversation_limits function missing SET search_path
-- 2. Lock down modalities table (if it should be public for educational use)
-- 3. Lock down service_providers table (if it should be public for educational use)
-- 4. Lock down workflow_node_categories (internal system data)
-- ============================================================================

-- ============================================================================
-- Fix Function Security: Add SET search_path to check_conversation_limits
-- ============================================================================
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
  -- Count IP-based conversations in last 24 hours
  SELECT COUNT(*) INTO daily_count
  FROM conversation_tracking
  WHERE ip_address = p_ip_address
    AND started_at >= NOW() - INTERVAL '24 hours';
  
  -- Count IP-based conversations in last hour
  SELECT COUNT(*) INTO hourly_count
  FROM conversation_tracking
  WHERE ip_address = p_ip_address
    AND started_at >= NOW() - INTERVAL '1 hour';
  
  -- Count email-based conversations if email provided
  IF p_user_email IS NOT NULL THEN
    SELECT COUNT(*) INTO email_daily_count
    FROM conversation_tracking
    WHERE user_email = p_user_email
      AND started_at >= NOW() - INTERVAL '24 hours';
  ELSE
    email_daily_count := 0;
  END IF;
  
  -- Determine if allowed
  IF daily_count >= daily_limit OR hourly_count >= hourly_limit OR 
     (p_user_email IS NOT NULL AND email_daily_count >= email_daily_limit) THEN
    is_allowed := FALSE;
  END IF;
  
  -- Calculate reset time
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


-- ============================================================================
-- Decision on Public Educational Content
-- ============================================================================
-- Based on user's requirement: "rest all facility" means public data should 
-- remain accessible for educational purposes. These tables contain reference
-- data that users need to see:
-- - modalities: Treatment types (educational)
-- - therapies: Therapy types (educational)
-- - services: Healthcare services (educational)
-- - service_providers: Provider directory (public-facing)
-- ============================================================================

COMMENT ON TABLE public.modalities IS 'PUBLIC EDUCATIONAL CONTENT: Treatment modality reference data for public website. Intentionally public.';
COMMENT ON TABLE public.therapies IS 'PUBLIC EDUCATIONAL CONTENT: Therapy type reference data for public website. Intentionally public.';
COMMENT ON TABLE public.services IS 'PUBLIC EDUCATIONAL CONTENT: Healthcare service reference data for public website. Intentionally public.';
COMMENT ON TABLE public.service_providers IS 'PUBLIC DIRECTORY: Healthcare provider directory for public access. Intentionally public.';

-- ============================================================================
-- Lock Down System Architecture Data
-- ============================================================================
-- workflow_node_categories: Internal system architecture - should NOT be public

DROP POLICY IF EXISTS "Public can view workflow node categories" ON public.workflow_node_categories;
DROP POLICY IF EXISTS "Anyone can view workflow node categories" ON public.workflow_node_categories;

CREATE POLICY "Authenticated users can view workflow categories"
ON public.workflow_node_categories
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage workflow categories"
ON public.workflow_node_categories
FOR ALL
USING (is_admin_user_safe(auth.uid()));