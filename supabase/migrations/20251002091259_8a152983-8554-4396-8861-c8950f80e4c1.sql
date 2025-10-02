-- Create PUBLIC VIEWS with limited columns (no sensitive business data)
DROP VIEW IF EXISTS public.services_public CASCADE;
CREATE VIEW public.services_public AS
SELECT 
  id, service_type, name, description,
  geographic_coverage, capabilities, is_active
FROM public.services
WHERE is_active = true;

DROP VIEW IF EXISTS public.service_providers_public CASCADE;
CREATE VIEW public.service_providers_public AS
SELECT 
  id, provider_type, name, description,
  geographic_coverage, specializations, is_active
FROM public.service_providers
WHERE is_active = true;

GRANT SELECT ON public.services_public TO anon, authenticated;
GRANT SELECT ON public.service_providers_public TO anon, authenticated;

COMMENT ON TABLE public.services IS 'SECURED: Use services_public view for public access. Pricing/SLA data requires authentication.';
COMMENT ON TABLE public.service_providers IS 'SECURED: Use service_providers_public view for public access. Contact info requires authentication.';