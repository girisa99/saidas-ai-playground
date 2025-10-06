-- ============================================================================
-- SECURE PROPRIETARY TABLES - Restrict to Authenticated Healthcare Professionals
-- ============================================================================

-- ============================================================================
-- 1. THERAPIES TABLE - Therapy Pipeline Information
-- ============================================================================
ALTER TABLE public.therapies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated healthcare professionals can view therapies" ON public.therapies;
DROP POLICY IF EXISTS "Admins can manage therapies" ON public.therapies;

CREATE POLICY "Authenticated healthcare professionals can view therapies"
ON public.therapies FOR SELECT
USING (
  auth.uid() IS NOT NULL AND (
    is_admin_user_safe(auth.uid()) OR
    has_role_optimized(auth.uid(), 'onboardingTeam') OR
    has_role_optimized(auth.uid(), 'patientCaregiver')
  )
);

CREATE POLICY "Admins can manage therapies"
ON public.therapies FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- ============================================================================
-- 2. SERVICE_PROVIDERS TABLE - Partner Information
-- ============================================================================
ALTER TABLE public.service_providers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view service providers" ON public.service_providers;
DROP POLICY IF EXISTS "Admins can manage service providers" ON public.service_providers;

CREATE POLICY "Authenticated users can view service providers"
ON public.service_providers FOR SELECT
USING (
  auth.uid() IS NOT NULL AND (
    is_admin_user_safe(auth.uid()) OR
    has_role_optimized(auth.uid(), 'onboardingTeam') OR
    has_role_optimized(auth.uid(), 'patientCaregiver')
  )
);

CREATE POLICY "Admins can manage service providers"
ON public.service_providers FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- ============================================================================
-- 3. SERVICES TABLE - Pricing and Capabilities
-- ============================================================================
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view services" ON public.services;
DROP POLICY IF EXISTS "Admins can manage services" ON public.services;

CREATE POLICY "Authenticated users can view services"
ON public.services FOR SELECT
USING (
  auth.uid() IS NOT NULL AND (
    is_admin_user_safe(auth.uid()) OR
    has_role_optimized(auth.uid(), 'onboardingTeam') OR
    has_role_optimized(auth.uid(), 'patientCaregiver')
  )
);

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- ============================================================================
-- 4. MODALITIES TABLE - Manufacturing Processes
-- ============================================================================
ALTER TABLE public.modalities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Healthcare professionals can view modalities" ON public.modalities;
DROP POLICY IF EXISTS "Admins can manage modalities" ON public.modalities;

CREATE POLICY "Healthcare professionals can view modalities"
ON public.modalities FOR SELECT
USING (
  auth.uid() IS NOT NULL AND (
    is_admin_user_safe(auth.uid()) OR
    has_role_optimized(auth.uid(), 'onboardingTeam') OR
    has_role_optimized(auth.uid(), 'patientCaregiver')
  )
);

CREATE POLICY "Admins can manage modalities"
ON public.modalities FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================
SELECT 
  'Proprietary tables secured' as status,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'therapies') as therapies_policies,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'service_providers') as service_providers_policies,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'services') as services_policies,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'modalities') as modalities_policies;