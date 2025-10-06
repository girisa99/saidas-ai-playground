-- ============================================================================
-- Fix All Security Definer Functions - Add SET search_path = public
-- ============================================================================

CREATE OR REPLACE FUNCTION public.user_has_facility_access(p_user_id uuid, p_facility_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM user_facility_access WHERE user_id = p_user_id AND facility_id = p_facility_id AND (expires_at IS NULL OR expires_at > now()));
$$;

CREATE OR REPLACE FUNCTION public.update_connection_analytics_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_enrollment_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_npi_verification_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_security_alerts_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_workflow_builder_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_whatsapp_consent_sessions_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_universal_save_sessions_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_framework_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_feedback_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_access_requests_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_genie_conversation_analytics()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_genie_rate_limits()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_genie_ip_tracking()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); NEW.last_seen_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_genie_deployments()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_genie_domain_verifications()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_genie_deployment_options()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_agent_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_agent_session_tasks_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_comprehensive_test_updated_at()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;

CREATE OR REPLACE FUNCTION public.update_import_timestamp()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $function$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $function$;