-- Fix remaining search path security issues for PostgreSQL upgrade compatibility
-- Phase 2: Add missing search_path settings to all functions without them

-- Fix functions missing search_path settings to prevent SQL injection and ensure proper schema resolution

CREATE OR REPLACE FUNCTION public._table_exists(p_table text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema='public' AND table_name = p_table
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.assign_default_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE 
  _role uuid;
BEGIN
  SELECT id INTO _role
  FROM public.roles
  WHERE is_default = true
  LIMIT 1;

  IF _role IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role_id)
    VALUES (NEW.id, _role)
    ON CONFLICT (user_id, role_id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.assign_user_role(p_user_id uuid, p_role_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  role_uuid uuid;
BEGIN
  -- Get the role ID for the role name
  SELECT id INTO role_uuid 
  FROM public.roles 
  WHERE name = p_role_name::user_role;
  
  IF role_uuid IS NULL THEN
    RAISE EXCEPTION 'Role % not found', p_role_name;
  END IF;
  
  -- Insert the user role assignment
  INSERT INTO public.user_roles (user_id, role_id)
  VALUES (p_user_id, role_uuid)
  ON CONFLICT (user_id, role_id) DO NOTHING;
END;
$function$;

CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    -- Log role assignment changes
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.user_activity_logs (
            user_id,
            activity_type,
            description,
            metadata
        ) VALUES (
            NEW.user_id,
            'role_assigned',
            'Role assigned to user',
            jsonb_build_object(
                'role_id', NEW.role_id,
                'assigned_by', NEW.assigned_by,
                'timestamp', now()
            )
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO public.user_activity_logs (
            user_id,
            activity_type,
            description,
            metadata
        ) VALUES (
            OLD.user_id,
            'role_removed',
            'Role removed from user',
            jsonb_build_object(
                'role_id', OLD.role_id,
                'removed_by', auth.uid(),
                'timestamp', now()
            )
        );
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.auto_generate_tests_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Only trigger for new uncovered functionality
  IF NEW.test_coverage_status = 'uncovered' AND (OLD.test_coverage_status IS NULL OR OLD.test_coverage_status != 'uncovered') THEN
    -- Asynchronously generate test cases for this specific functionality
    PERFORM pg_notify('generate_tests', NEW.id::text);
  END IF;
  
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.block_demo_user_writes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  -- Block write operations for demo users
  IF is_demo_user(auth.uid()) AND TG_OP IN ('INSERT', 'UPDATE', 'DELETE') THEN
    RAISE EXCEPTION 'Demo users cannot perform write operations';
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

CREATE OR REPLACE FUNCTION public.bulk_deactivate_patient_enrollments(p_facility_id uuid, p_deactivation_reason text DEFAULT 'bulk_deactivation'::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  affected_count integer := 0;
BEGIN
  -- Deactivate all active enrollments for the facility
  UPDATE public.enrollments 
  SET 
    status = 'deactivated',
    deactivation_reason = p_deactivation_reason,
    deactivated_at = now(),
    updated_at = now()
  WHERE facility_id = p_facility_id 
    AND status = 'active';
  
  GET DIAGNOSTICS affected_count = ROW_COUNT;
  
  RETURN jsonb_build_object(
    'success', true,
    'affected_enrollments', affected_count,
    'facility_id', p_facility_id,
    'deactivation_reason', p_deactivation_reason,
    'timestamp', now()
  );
END;
$function$;