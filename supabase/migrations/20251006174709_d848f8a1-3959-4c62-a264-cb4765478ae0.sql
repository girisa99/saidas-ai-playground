-- ============================================================================
-- Fix Critical Security Issues - Add RLS Policies to Public Tables
-- ============================================================================

-- 1. Fix genie_conversations - Restrict to conversation owners
ALTER TABLE genie_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own conversations"
ON genie_conversations FOR SELECT
USING (user_email = auth.email() OR is_admin_user_safe(auth.uid()));

CREATE POLICY "Users manage own conversations"
ON genie_conversations FOR ALL
USING (user_email = auth.email() OR is_admin_user_safe(auth.uid()));

-- 2. Fix therapies - Restrict to authenticated users
ALTER TABLE therapies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view therapies"
ON therapies FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage therapies"
ON therapies FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- 3. Fix service_providers - Restrict to authenticated users
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view service providers"
ON service_providers FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage service providers"
ON service_providers FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- 4. Fix services - Restrict to authenticated users
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view services"
ON services FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage services"
ON services FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- 5. Fix modalities - Restrict to authenticated healthcare professionals
ALTER TABLE modalities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view modalities"
ON modalities FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage modalities"
ON modalities FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- 6. Fix medical_imaging_knowledge - Restrict to authenticated users
ALTER TABLE medical_imaging_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view medical knowledge"
ON medical_imaging_knowledge FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage medical knowledge"
ON medical_imaging_knowledge FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- 7. Fix universal_knowledge_base - Restrict to authenticated users
ALTER TABLE universal_knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view universal knowledge"
ON universal_knowledge_base FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage universal knowledge"
ON universal_knowledge_base FOR ALL
USING (is_admin_user_safe(auth.uid()));