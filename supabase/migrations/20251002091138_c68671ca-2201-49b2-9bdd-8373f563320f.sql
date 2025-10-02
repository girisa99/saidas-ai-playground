-- ============================================================================
-- SECURITY FIX: Protect Sensitive Business Data - Services & Providers
-- ============================================================================

COMMENT ON TABLE public.services IS 'Healthcare services with tiered access. Public: basic info only. Auth: full details including pricing.';

-- Clean up services policies
DROP POLICY IF EXISTS "Public can view services" ON public.services;
DROP POLICY IF EXISTS "Anyone can view services" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can view services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Public can view basic service info" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can view full service details" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services secure" ON public.services;
DROP POLICY IF EXISTS "Authenticated users can view services secure" ON public.services;
DROP POLICY IF EXISTS "Only admins can manage services" ON public.services;
DROP POLICY IF EXISTS "Only authorized users can access service data" ON public.services;
DROP POLICY IF EXISTS "services_admin_management" ON public.services;
DROP POLICY IF EXISTS "services_authenticated_read_only" ON public.services;
DROP POLICY IF EXISTS "services_restricted_access" ON public.services;

-- New tiered access policies for services
CREATE POLICY "anon_view_services"
ON public.services
FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "auth_view_services"
ON public.services
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "admin_manage_services"
ON public.services
FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- Public view WITHOUT pricing/SLA
CREATE OR REPLACE VIEW public.services_public AS
SELECT 
  id, service_type, name, description, 
  geographic_coverage, capabilities, is_active
FROM public.services WHERE is_active = true;

GRANT SELECT ON public.services_public TO anon, authenticated;

-- Full view for authenticated
CREATE OR REPLACE VIEW public.services_full AS
SELECT * FROM public.services;
GRANT SELECT ON public.services_full TO authenticated;


-- ============================================================================
-- Service Providers Protection
-- ============================================================================

COMMENT ON TABLE public.service_providers IS 'Service provider directory. Public: basic info. Auth: contact details.';

DROP POLICY IF EXISTS "Public can view service providers" ON public.service_providers;
DROP POLICY IF EXISTS "Anyone can view service providers" ON public.service_providers;
DROP POLICY IF EXISTS "Authenticated users can view service providers" ON public.service_providers;
DROP POLICY IF EXISTS "Admins can manage providers" ON public.service_providers;
DROP POLICY IF EXISTS "Public can view basic provider info" ON public.service_providers;
DROP POLICY IF EXISTS "Authenticated users can view full provider details" ON public.service_providers;

CREATE POLICY "anon_view_providers"
ON public.service_providers
FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "auth_view_providers"
ON public.service_providers
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "admin_manage_providers"
ON public.service_providers
FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- Public view for providers (basic info only)
CREATE OR REPLACE VIEW public.service_providers_public AS
SELECT 
  id, provider_type, name, description, is_active
FROM public.service_providers WHERE is_active = true;

GRANT SELECT ON public.service_providers_public TO anon, authenticated;