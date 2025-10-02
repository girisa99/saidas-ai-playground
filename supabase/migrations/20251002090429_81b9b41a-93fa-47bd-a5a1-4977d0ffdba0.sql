-- ============================================================================
-- SECURITY FIX: Lock Down Public Data Exposure (Phase 2 - Final)
-- ============================================================================

-- ============================================================================
-- CRITICAL ERROR 1: Newsletter Subscribers - Prevent Email Harvesting
-- ============================================================================
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Public can view active subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can view all subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can update subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can delete subscribers" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "Admins can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "Admins can delete subscribers"
ON public.newsletter_subscribers
FOR DELETE
USING (is_admin_user_safe(auth.uid()));


-- ============================================================================
-- CRITICAL ERROR 2: Genie Brand Configs - Secure Healthcare Configuration
-- ============================================================================
DROP POLICY IF EXISTS "Authenticated users can view genie brand configs" ON public.genie_brand_configs;
DROP POLICY IF EXISTS "Public can view active brand configs" ON public.genie_brand_configs;
DROP POLICY IF EXISTS "Users can view their own brand configs" ON public.genie_brand_configs;
DROP POLICY IF EXISTS "Users can create their own brand configs" ON public.genie_brand_configs;
DROP POLICY IF EXISTS "Users can update their own brand configs" ON public.genie_brand_configs;
DROP POLICY IF EXISTS "Users can delete their own brand configs" ON public.genie_brand_configs;

CREATE POLICY "Users can view their own brand configs"
ON public.genie_brand_configs
FOR SELECT
USING (
  auth.uid() = created_by OR 
  is_admin_user_safe(auth.uid())
);

CREATE POLICY "Users can create their own brand configs"
ON public.genie_brand_configs
FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own brand configs"
ON public.genie_brand_configs
FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own brand configs"
ON public.genie_brand_configs
FOR DELETE
USING (auth.uid() = created_by);


-- ============================================================================
-- CRITICAL ERROR 3: Domain Verifications - Secure Verification Tokens
-- ============================================================================
DROP POLICY IF EXISTS "Authenticated users can view domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Public can view domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can view their own domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can create domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can update their own domain verifications" ON public.genie_domain_verifications;
DROP POLICY IF EXISTS "Users can delete their own domain verifications" ON public.genie_domain_verifications;

-- Domain verifications belong to brand configs, so restrict by brand config ownership
CREATE POLICY "Users can view their domain verifications"
ON public.genie_domain_verifications
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND (genie_brand_configs.created_by = auth.uid() OR is_admin_user_safe(auth.uid()))
  )
);

CREATE POLICY "Users can create domain verifications"
ON public.genie_domain_verifications
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND genie_brand_configs.created_by = auth.uid()
  )
);

CREATE POLICY "Users can update their domain verifications"
ON public.genie_domain_verifications
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.genie_brand_configs
    WHERE genie_brand_configs.id = genie_domain_verifications.brand_config_id
    AND genie_brand_configs.created_by = auth.uid()
  )
);

CREATE POLICY "Users can delete their domain verifications"
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
-- WARNING: Usage Limits - Secure Rate Limiting Configuration
-- ============================================================================
DROP POLICY IF EXISTS "Public can view usage limits" ON public.usage_limits;
DROP POLICY IF EXISTS "Anyone can view usage limits" ON public.usage_limits;
DROP POLICY IF EXISTS "Admins can view usage limits" ON public.usage_limits;
DROP POLICY IF EXISTS "Admins can manage usage limits" ON public.usage_limits;

CREATE POLICY "Admins can view usage limits"
ON public.usage_limits
FOR SELECT
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "Admins can manage usage limits"
ON public.usage_limits
FOR ALL
USING (is_admin_user_safe(auth.uid()));


-- ============================================================================
-- Educational Content - Confirm Public Access is Intentional
-- ============================================================================
COMMENT ON TABLE public.services IS 'Educational content - Public reference data for healthcare services. Public access is intentional.';
COMMENT ON TABLE public.modalities IS 'Educational content - Public reference data for treatment modalities. Public access is intentional.';
COMMENT ON TABLE public.therapies IS 'Educational content - Public reference data for therapy types. Public access is intentional.';