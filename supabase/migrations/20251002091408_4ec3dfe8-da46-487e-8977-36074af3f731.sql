-- Drop existing views first
DROP VIEW IF EXISTS public.services_public CASCADE;
DROP VIEW IF EXISTS public.services_full CASCADE;
DROP VIEW IF EXISTS public.service_providers_public CASCADE;
DROP VIEW IF EXISTS public.service_providers_full CASCADE;

-- Create services public view (NO sensitive data)
CREATE VIEW public.services_public AS
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

GRANT SELECT ON public.services_public TO anon, authenticated;

-- Create services full view (WITH sensitive data - auth only)
CREATE VIEW public.services_full AS
SELECT *
FROM public.services;

GRANT SELECT ON public.services_full TO authenticated;

-- Create providers public view (NO sensitive data)
CREATE VIEW public.service_providers_public AS
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

GRANT SELECT ON public.service_providers_public TO anon, authenticated;

-- Create providers full view (WITH sensitive data - auth only)
CREATE VIEW public.service_providers_full AS
SELECT *
FROM public.service_providers;

GRANT SELECT ON public.service_providers_full TO authenticated;