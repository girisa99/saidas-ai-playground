-- Fix Security Definer functions by removing SECURITY DEFINER where RLS policies are sufficient
-- This addresses the security linter findings about SECURITY DEFINER views/functions

-- Fix has_role function - remove SECURITY DEFINER since RLS policies allow users to see their own roles
CREATE OR REPLACE FUNCTION public.has_role(user_id uuid, role_name user_role)
RETURNS boolean
LANGUAGE sql
STABLE 
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.roles r ON r.id = ur.role_id
    WHERE ur.user_id = user_id
    AND r.name = role_name
  );
$function$;

-- Fix get_user_roles function - remove SECURITY DEFINER since RLS policies allow users to see their own roles
CREATE OR REPLACE FUNCTION public.get_user_roles(check_user_id uuid)
RETURNS TABLE(role_name text)
LANGUAGE sql
SET search_path TO 'public'
AS $function$
  SELECT r.name::text
  FROM user_roles ur
  JOIN roles r ON r.id = ur.role_id
  WHERE ur.user_id = check_user_id;
$function$;

-- Fix is_admin_user function - remove SECURITY DEFINER since RLS policies allow users to see their own roles
CREATE OR REPLACE FUNCTION public.is_admin_user(check_user_id uuid)
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

-- Update has_role_optimized function as well
CREATE OR REPLACE FUNCTION public.has_role_optimized(_user_id uuid, _role_name user_role)
RETURNS boolean
LANGUAGE sql
STABLE 
SET search_path TO 'public'
AS $function$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles ur
        JOIN public.roles r ON r.id = ur.role_id
        WHERE ur.user_id = _user_id
        AND r.name = _role_name
    );
$function$;

-- Comment: These functions now rely on RLS policies instead of SECURITY DEFINER
-- The existing RLS policies on user_roles and roles tables provide the necessary access control:
-- - Users can see their own roles via user_roles_select_own policy
-- - All authenticated users can view roles via roles SELECT policy
-- This is more secure as it respects the RLS security model rather than bypassing it