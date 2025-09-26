-- Fix remaining Security Definer functions - Phase 2
-- Remove SECURITY DEFINER from remaining role-checking functions

-- Fix is_admin_user_safe function
CREATE OR REPLACE FUNCTION public.is_admin_user_safe(check_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE 
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = check_user_id
    AND r.name IN ('superAdmin', 'onboardingTeam')
  );
$function$;

-- Fix is_demo_user function  
CREATE OR REPLACE FUNCTION public.is_demo_user(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE 
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = check_user_id
    AND r.name = 'demoUser'
  );
$function$;

-- Fix is_demo_user_or_admin function
CREATE OR REPLACE FUNCTION public.is_demo_user_or_admin(check_user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE 
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = check_user_id
    AND r.name IN ('superAdmin', 'onboardingTeam', 'demoUser')
  );
$function$;

-- Comment: These functions now also rely on RLS policies instead of SECURITY DEFINER
-- They will respect the same user_roles RLS policies that allow users to see their own roles