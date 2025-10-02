-- ============================================================================
-- SECURITY FIX: Remove All Public Data Exposure - Final Cleanup
-- ============================================================================

-- Newsletter Subscribers: Remove public SELECT policies
DROP POLICY IF EXISTS "Anyone can view active subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can update their subscription" ON public.newsletter_subscribers;

-- Usage Limits: Remove public read access
DROP POLICY IF EXISTS "Allow public read access to usage_limits" ON public.usage_limits;

-- Genie Brand Configs: Remove redundant policy
DROP POLICY IF EXISTS "Users can manage their own brand configs" ON public.genie_brand_configs;