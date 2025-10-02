-- ============================================================================
-- SECURITY FIX: Add SECURITY INVOKER to Views to Respect RLS Policies
-- ============================================================================
-- Fix the views to use SECURITY INVOKER instead of default SECURITY DEFINER

-- Drop and recreate services views with SECURITY INVOKER
DROP VIEW IF EXISTS public.services_public CASCADE;
DROP VIEW IF EXISTS public.services_full CASCADE;

CREATE VIEW public.services_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  service_type,
  name,
  description,
  geographic_coverage,
  capabilities,
  is_active
FROM public.services 
WHERE is_active = true;

COMMENT ON VIEW public.services_public IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
GRANT SELECT ON public.services_public TO anon, authenticated;

CREATE VIEW public.services_full
WITH (security_invoker = true) AS
SELECT *
FROM public.services;

COMMENT ON VIEW public.services_full IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
GRANT SELECT ON public.services_full TO authenticated;

-- Drop and recreate service_providers views with SECURITY INVOKER
DROP VIEW IF EXISTS public.service_providers_public CASCADE;
DROP VIEW IF EXISTS public.service_providers_full CASCADE;

CREATE VIEW public.service_providers_public
WITH (security_invoker = true) AS
SELECT 
  id,
  provider_type,
  name,
  description,
  capabilities,
  geographic_coverage,
  is_active
FROM public.service_providers 
WHERE is_active = true;

COMMENT ON VIEW public.service_providers_public IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
GRANT SELECT ON public.service_providers_public TO anon, authenticated;

CREATE VIEW public.service_providers_full
WITH (security_invoker = true) AS
SELECT *
FROM public.service_providers;

COMMENT ON VIEW public.service_providers_full IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
GRANT SELECT ON public.service_providers_full TO authenticated;