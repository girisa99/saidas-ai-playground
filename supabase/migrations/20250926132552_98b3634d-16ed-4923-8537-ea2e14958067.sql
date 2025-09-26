-- PostgreSQL upgrade compatibility - fix overloaded functions manually
-- Handle functions with same names but different parameter lists

-- Fix the overloaded generate_role_based_test_cases functions
CREATE OR REPLACE FUNCTION public.generate_role_based_test_cases(target_role text DEFAULT NULL::text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  test_cases_created INTEGER := 0;
  role_filter TEXT := COALESCE(target_role, 'all');
  batch_id UUID := gen_random_uuid();
BEGIN
  -- Generate test cases based on role
  IF role_filter = 'onboardingTeam' OR role_filter = 'all' THEN
    INSERT INTO comprehensive_test_cases (
      test_suite_type, test_category, test_name, test_description,
      related_functionality, validation_level, module_name, 
      coverage_area, business_function, auto_generated
    ) VALUES 
    ('system', 'onboarding_workflow', 'Onboarding User Registration Test', 
     'Test user registration and profile creation for onboarding team', 
     'user_registration', 'PQ', 'User Management', 'Core Functionality', 
     'User Onboarding', true),
    ('integration', 'facility_setup', 'Facility Configuration Test',
     'Test facility setup and configuration workflow',
     'facility_management', 'OQ', 'Facility Management', 'Governance & Compliance',
     'Facility Operations', true);
    
    test_cases_created := test_cases_created + 2;
  END IF;

  RETURN jsonb_build_object(
    'test_cases_created', test_cases_created,
    'batch_id', batch_id,
    'role_filter', role_filter,
    'timestamp', now()
  );
END;
$function$;

-- Fix other critical functions manually
CREATE OR REPLACE FUNCTION public.check_user_has_role(p_user_id uuid, p_role_name text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = p_user_id 
    AND r.name = p_role_name::user_role
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.cleanup_agent_sessions()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  deleted_count integer;
BEGIN
  -- Delete agent sessions older than 30 days
  DELETE FROM public.agent_sessions 
  WHERE updated_at < now() - interval '30 days';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  RETURN jsonb_build_object(
    'deleted_sessions', deleted_count,
    'timestamp', now()
  );
END;
$function$;

-- Fix financial risk calculation function
CREATE OR REPLACE FUNCTION public.calculate_financial_risk_score(p_enrollment_id uuid)
RETURNS numeric
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  risk_score numeric := 0;
  enrollment_record RECORD;
BEGIN
  -- Get enrollment details
  SELECT * INTO enrollment_record
  FROM public.enrollments
  WHERE id = p_enrollment_id;
  
  IF NOT FOUND THEN
    RETURN 0;
  END IF;
  
  -- Simple risk scoring based on enrollment status and completion
  CASE enrollment_record.status
    WHEN 'active' THEN risk_score := 10;
    WHEN 'paused' THEN risk_score := 25;
    WHEN 'completed' THEN risk_score := 5;
    WHEN 'deactivated' THEN risk_score := 50;
    ELSE risk_score := 30;
  END CASE;
  
  RETURN risk_score;
END;
$function$;