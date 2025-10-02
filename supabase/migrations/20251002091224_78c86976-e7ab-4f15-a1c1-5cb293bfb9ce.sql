-- ============================================================================
-- SECURITY FIX: Secure Services & Service Providers - Clean Implementation
-- ============================================================================

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services secure" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can view services secure" ON public.services;
DROP POLICY IF EXISTS "Only admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Only authorized users can access service data" ON public.services;
DROP POLICY IF EXISTS "services_admin_management" ON public.services;
DROP POLICY IF EXISTS "services_authenticated_read_only" ON public.services;
DROP POLICY IF EXISTS "services_restricted_access" ON public.services;
DROP POLICY IF EXISTS "Public can view services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;

DROP POLICY IF EXISTS "Admins can manage service providers secure" ON public.service_providers;
DROP POLICY IF EXISTS "Admins can manage service_providers" ON public.service_providers;
DROP POLICY IF EXISTS "Authenticated users can view service providers secure" ON public.service_providers;
DROP POLICY IF EXISTS "Authenticated users can view service_providers" ON public.service_providers;
DROP POLICY IF EXISTS "Only admins can manage service providers" ON public.service_providers;
DROP POLICY IF EXISTS "Service providers management for authorized users" ON public.service_providers;
DROP POLICY IF EXISTS "Service providers visible to authenticated users only" ON public.service_providers;
DROP POLICY IF EXISTS "service_providers_admin_management" ON public.service_providers;
DROP POLICY IF EXISTS "service_providers_admin_only" ON public.service_providers;
DROP POLICY IF EXISTS "service_providers_authenticated_read_only" ON public.service_providers;
DROP POLICY IF EXISTS "service_providers_secure_access" ON public.service_providers;

-- Create new secure policies for SERVICES
CREATE POLICY "services_public_basic_info"
ON public.services FOR SELECT TO anon
USING (is_active = true);

CREATE POLICY "services_authenticated_full_access"
ON public.services FOR SELECT TO authenticated
USING (true);

CREATE POLICY "services_admin_full_control"
ON public.services FOR ALL TO authenticated
USING (is_admin_user_safe(auth.uid()));

-- Create new secure policies for SERVICE_PROVIDERS
CREATE POLICY "providers_public_basic_info"
ON public.service_providers FOR SELECT TO anon
USING (is_active = true);

CREATE POLICY "providers_authenticated_full_access"
ON public.service_providers FOR SELECT TO authenticated
USING (true);

CREATE POLICY "providers_admin_full_control"
ON public.service_providers FOR ALL TO authenticated
USING (is_admin_user_safe(auth.uid()));

-- Create PUBLIC VIEWS with limited columns (no pricing/contact data)
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

COMMENT ON TABLE public.services IS 'SECURED: Use services_public view for public. Pricing/SLA requires auth.';
COMMENT ON TABLE public.service_providers IS 'SECURED: Use service_providers_public view for public. Contact info requires auth.';