-- ============================================================================
-- SECURITY FIX: Remove All Public Data Exposure - Complete Cleanup
-- ============================================================================

-- ============================================================================
-- Newsletter Subscribers: Remove public SELECT policies
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can view active subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can update their subscription" ON public.newsletter_subscribers;

-- ============================================================================
-- Genie Brand Configs: Remove redundant "manage" policy
-- ============================================================================
DROP POLICY IF EXISTS "Users can manage their own brand configs" ON public.genie_brand_configs;

-- ============================================================================
-- Genie Domain Verifications: Remove ALL existing policies and recreate properly
-- ============================================================================
DROP POLICY IF EXISTS "Admins can manage all domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can manage their domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can view domains for their brand configs" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can view their domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can create domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can update their domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can delete their domain verifications" ON public.genie_domain_verifications;

-- Recreate domain verification policies with proper ownership check
CREATE POLICY "Owner can view domain verifications"
ON public.genie_domain_verifications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND (genie_brand_configs.created_by = auth.uid() OR is_admin_user_safe(auth.uid()))
  )
);

CREATE POLICY "Owner can create domain verifications"
ON public.genie_domain_verifications
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND genie_brand_configs.created_by = auth.uid()
  )
);

CREATE POLICY "Owner can update domain verifications"
ON public.genie_domain_verifications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND genie_brand_configs.created_by = auth.uid()
  )
);

CREATE POLICY "Owner can delete domain verifications"
ON public.genie_domain_verifications
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND genie_brand_configs.created_by = auth.uid()
  )
);

-- ============================================================================
-- Usage Limits: Remove public read access
-- ============================================================================
DROP POLICY IF EXISTS "Allow public read access to usage_limits" ON public.usage_limits;