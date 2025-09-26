-- PostgreSQL Upgrade Compatibility Fixes
-- Fix all compatibility issues before PostgreSQL version upgrade

-- 1. Fix functions with deprecated request.headers pattern and unsafe inet casting
-- These functions need safer header access patterns that won't break in newer PostgreSQL versions

CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  header_value text;
  safe_ip inet;
BEGIN
  -- Safely extract IP address with error handling
  BEGIN
    header_value := current_setting('request.headers', true)::json->>'x-forwarded-for';
    IF header_value IS NOT NULL AND header_value ~ '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$' THEN
      safe_ip := header_value::inet;
    ELSE
      safe_ip := NULL;
    END IF;
  EXCEPTION
    WHEN OTHERS THEN
      safe_ip := NULL;
  END;

  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    ip_address
  )
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW) 
         WHEN TG_OP = 'UPDATE' THEN to_jsonb(NEW) 
         ELSE NULL END,
    safe_ip
  );
  RETURN COALESCE(NEW, OLD);
EXCEPTION
  WHEN OTHERS THEN
    -- If there's any error with the audit log, don't block the main operation
    RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_onboarding_audit(p_onboarding_id uuid, p_action_type text, p_action_description text, p_section_affected text DEFAULT NULL::text, p_old_values jsonb DEFAULT NULL::jsonb, p_new_values jsonb DEFAULT NULL::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  header_value text;
  safe_ip inet;
  safe_user_agent text;
BEGIN
  -- Safely extract IP address and user agent
  BEGIN
    header_value := current_setting('request.headers', true)::json->>'x-forwarded-for';
    IF header_value IS NOT NULL AND header_value ~ '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$' THEN
      safe_ip := header_value::inet;
    ELSE
      safe_ip := NULL;
    END IF;
    
    safe_user_agent := current_setting('request.headers', true)::json->>'user-agent';
  EXCEPTION
    WHEN OTHERS THEN
      safe_ip := NULL;
      safe_user_agent := NULL;
  END;

  INSERT INTO public.onboarding_audit_trail (
    onboarding_id,
    user_id,
    action_type,
    action_description,
    section_affected,
    old_values,
    new_values,
    ip_address,
    user_agent
  ) VALUES (
    p_onboarding_id,
    auth.uid(),
    p_action_type,
    p_action_description,
    p_section_affected,
    p_old_values,
    p_new_values,
    safe_ip,
    safe_user_agent
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_security_event(p_user_id uuid, p_event_type text, p_severity text, p_description text, p_metadata jsonb DEFAULT '{}'::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  header_value text;
  safe_ip inet;
  safe_user_agent text;
BEGIN
  -- Safely extract IP address and user agent
  BEGIN
    header_value := current_setting('request.headers', true)::json->>'x-forwarded-for';
    IF header_value IS NOT NULL AND header_value ~ '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$' THEN
      safe_ip := header_value::inet;
    ELSE
      safe_ip := NULL;
    END IF;
    
    safe_user_agent := current_setting('request.headers', true)::json->>'user-agent';
  EXCEPTION
    WHEN OTHERS THEN
      safe_ip := NULL;
      safe_user_agent := NULL;
  END;

  INSERT INTO public.security_events (
    user_id,
    event_type,
    severity,
    description,
    metadata,
    ip_address,
    user_agent
  )
  VALUES (
    p_user_id,
    p_event_type,
    p_severity,
    p_description,
    p_metadata,
    safe_ip,
    safe_user_agent
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_user_activity(p_user_id uuid, p_activity_type text, p_activity_description text, p_module_name text DEFAULT NULL::text, p_metadata jsonb DEFAULT '{}'::jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  header_value text;
  safe_ip inet;
  safe_user_agent text;
BEGIN
  -- Safely extract IP address and user agent
  BEGIN
    header_value := current_setting('request.headers', true)::json->>'x-forwarded-for';
    IF header_value IS NOT NULL AND header_value ~ '^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$' THEN
      safe_ip := header_value::inet;
    ELSE
      safe_ip := NULL;
    END IF;
    
    safe_user_agent := current_setting('request.headers', true)::json->>'user-agent';
  EXCEPTION
    WHEN OTHERS THEN
      safe_ip := NULL;
      safe_user_agent := NULL;
  END;

  INSERT INTO public.user_activity_logs (
    user_id,
    activity_type,
    activity_description,
    module_name,
    metadata,
    ip_address,
    user_agent
  )
  VALUES (
    p_user_id,
    p_activity_type,
    p_activity_description,
    p_module_name,
    p_metadata,
    safe_ip,
    safe_user_agent
  );
END;
$function$;