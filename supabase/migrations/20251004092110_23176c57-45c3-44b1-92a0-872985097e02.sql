-- Universal Knowledge Base System for All Use Cases
-- Supports: Medical Imaging, Patient Onboarding, Clinical Risk Assessment, GenieAI Conversations, etc.

-- 1. Universal Knowledge Repositories Table (from re3data, Kaggle, etc.)
CREATE TABLE IF NOT EXISTS universal_knowledge_repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_platform TEXT NOT NULL, -- 're3data', 'kaggle', 'data.gov', 'manual'
  source_id TEXT UNIQUE NOT NULL, -- repository ID from source platform
  repository_name TEXT NOT NULL,
  repository_url TEXT,
  description TEXT,
  domain TEXT NOT NULL, -- 'medical_imaging', 'patient_onboarding', 'clinical_risk', 'conversational'
  subject_areas TEXT[],
  content_types TEXT[], -- 'images', 'clinical_data', 'genomics', 'forms', 'guidelines'
  access_type TEXT, -- 'open', 'restricted', 'closed'
  certificates TEXT[], -- 'CoreTrustSeal', 'ISO', etc.
  data_upload_types TEXT[],
  database_access_types TEXT[],
  software_used TEXT[],
  quality_score INTEGER CHECK (quality_score BETWEEN 0 AND 100),
  fair_compliant BOOLEAN DEFAULT FALSE,
  is_medical_imaging BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for efficient filtering
CREATE INDEX idx_repositories_domain ON universal_knowledge_repositories(domain, is_active);
CREATE INDEX idx_repositories_quality ON universal_knowledge_repositories(quality_score DESC);
CREATE INDEX idx_repositories_source ON universal_knowledge_repositories(source_platform, source_id);

-- 2. Universal Knowledge Base (unified findings, guidelines, templates)
CREATE TABLE IF NOT EXISTS universal_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT NOT NULL, -- 'medical_imaging', 'patient_onboarding', 'clinical_risk', 'conversational'
  source_repository_id UUID REFERENCES universal_knowledge_repositories(id) ON DELETE SET NULL,
  content_type TEXT NOT NULL, -- 'finding', 'guideline', 'template', 'protocol', 'faq'
  finding_name TEXT NOT NULL,
  modality TEXT, -- For medical imaging
  body_part TEXT, -- For medical imaging
  finding_category TEXT,
  description TEXT NOT NULL,
  clinical_significance TEXT,
  clinical_context JSONB DEFAULT '{}'::jsonb,
  key_features JSONB DEFAULT '{}'::jsonb,
  differential_diagnosis TEXT[] DEFAULT ARRAY[]::TEXT[],
  dataset_source TEXT,
  embedding VECTOR(1536), -- For RAG similarity search
  quality_score INTEGER CHECK (quality_score BETWEEN 0 AND 100),
  usage_count INTEGER DEFAULT 0,
  positive_feedback_count INTEGER DEFAULT 0,
  negative_feedback_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX idx_knowledge_domain ON universal_knowledge_base(domain, is_approved);
CREATE INDEX idx_knowledge_content_type ON universal_knowledge_base(content_type);
CREATE INDEX idx_knowledge_usage ON universal_knowledge_base(usage_count DESC);
CREATE INDEX idx_knowledge_feedback ON universal_knowledge_base(positive_feedback_count DESC);

-- 3. Conversation Learning & Feedback Table
CREATE TABLE IF NOT EXISTS conversation_learning_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES agent_conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  message_index INTEGER NOT NULL, -- Which message in the conversation
  feedback_type TEXT NOT NULL, -- 'helpful', 'not_helpful', 'inaccurate', 'outdated', 'suggestion'
  feedback_score INTEGER CHECK (feedback_score BETWEEN 1 AND 5),
  feedback_text TEXT,
  knowledge_base_ids UUID[], -- Which knowledge base entries were used
  suggested_correction TEXT,
  domain TEXT, -- Which domain this applies to
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_feedback_conversation ON conversation_learning_feedback(conversation_id);
CREATE INDEX idx_feedback_domain ON conversation_learning_feedback(domain);
CREATE INDEX idx_feedback_type ON conversation_learning_feedback(feedback_type);

-- 4. Knowledge Usage Analytics
CREATE TABLE IF NOT EXISTS knowledge_usage_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_base_id UUID REFERENCES universal_knowledge_base(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  use_case TEXT NOT NULL, -- 'image_analysis', 'patient_onboarding', 'risk_assessment', 'chat'
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  query_text TEXT,
  was_helpful BOOLEAN,
  response_quality_score INTEGER CHECK (response_quality_score BETWEEN 1 AND 5),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_usage_knowledge ON knowledge_usage_analytics(knowledge_base_id);
CREATE INDEX idx_usage_domain_usecase ON knowledge_usage_analytics(domain, use_case);
CREATE INDEX idx_usage_helpful ON knowledge_usage_analytics(was_helpful);

-- 5. Migrate existing medical_imaging_knowledge to universal schema
INSERT INTO universal_knowledge_base (
  domain,
  content_type,
  finding_name,
  modality,
  body_part,
  finding_category,
  description,
  clinical_significance,
  key_features,
  differential_diagnosis,
  dataset_source,
  embedding,
  metadata,
  is_approved,
  created_at,
  updated_at
)
SELECT 
  'medical_imaging' as domain,
  'finding' as content_type,
  finding_name,
  modality,
  body_part,
  finding_category,
  description,
  clinical_significance,
  key_features,
  differential_diagnosis,
  dataset_source,
  embedding,
  metadata,
  true as is_approved, -- Existing data is pre-approved
  created_at,
  updated_at
FROM medical_imaging_knowledge
WHERE NOT EXISTS (
  SELECT 1 FROM universal_knowledge_base ukb 
  WHERE ukb.finding_name = medical_imaging_knowledge.finding_name
  AND ukb.dataset_source = medical_imaging_knowledge.dataset_source
);

-- 6. Helper Functions

-- Function to increment usage count
CREATE OR REPLACE FUNCTION increment_knowledge_usage(knowledge_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE universal_knowledge_base 
  SET usage_count = usage_count + 1,
      updated_at = NOW()
  WHERE id = knowledge_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to update feedback scores
CREATE OR REPLACE FUNCTION update_knowledge_feedback(
  knowledge_id UUID,
  is_positive BOOLEAN
)
RETURNS VOID AS $$
BEGIN
  IF is_positive THEN
    UPDATE universal_knowledge_base 
    SET positive_feedback_count = positive_feedback_count + 1,
        updated_at = NOW()
    WHERE id = knowledge_id;
  ELSE
    UPDATE universal_knowledge_base 
    SET negative_feedback_count = negative_feedback_count + 1,
        updated_at = NOW()
    WHERE id = knowledge_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to search universal knowledge base
CREATE OR REPLACE FUNCTION search_universal_knowledge(
  query_domain TEXT,
  query_content_type TEXT DEFAULT NULL,
  query_text TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  finding_name TEXT,
  description TEXT,
  domain TEXT,
  content_type TEXT,
  quality_score INTEGER,
  usage_count INTEGER,
  feedback_ratio NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ukb.id,
    ukb.finding_name,
    ukb.description,
    ukb.domain,
    ukb.content_type,
    ukb.quality_score,
    ukb.usage_count,
    CASE 
      WHEN (ukb.positive_feedback_count + ukb.negative_feedback_count) > 0 
      THEN ROUND(ukb.positive_feedback_count::NUMERIC / (ukb.positive_feedback_count + ukb.negative_feedback_count), 2)
      ELSE 0
    END as feedback_ratio
  FROM universal_knowledge_base ukb
  WHERE ukb.domain = query_domain
    AND ukb.is_approved = true
    AND (query_content_type IS NULL OR ukb.content_type = query_content_type)
    AND (query_text IS NULL OR ukb.finding_name ILIKE '%' || query_text || '%' 
         OR ukb.description ILIKE '%' || query_text || '%')
  ORDER BY ukb.usage_count DESC, feedback_ratio DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to get top performing knowledge by domain
CREATE OR REPLACE FUNCTION get_top_knowledge_by_domain(
  query_domain TEXT,
  limit_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  finding_name TEXT,
  usage_count INTEGER,
  positive_feedback INTEGER,
  negative_feedback INTEGER,
  quality_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ukb.finding_name,
    ukb.usage_count,
    ukb.positive_feedback_count,
    ukb.negative_feedback_count,
    ukb.quality_score
  FROM universal_knowledge_base ukb
  WHERE ukb.domain = query_domain
    AND ukb.is_approved = true
  ORDER BY ukb.usage_count DESC, ukb.positive_feedback_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- RLS Policies

-- Universal Knowledge Repositories - Read access for authenticated users
ALTER TABLE universal_knowledge_repositories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active repositories"
ON universal_knowledge_repositories FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage repositories"
ON universal_knowledge_repositories FOR ALL
USING (is_admin_user_safe(auth.uid()))
WITH CHECK (is_admin_user_safe(auth.uid()));

-- Universal Knowledge Base - Read access for all, write for admins
ALTER TABLE universal_knowledge_base ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved knowledge"
ON universal_knowledge_base FOR SELECT
USING (is_approved = true);

CREATE POLICY "Admins can manage knowledge base"
ON universal_knowledge_base FOR ALL
USING (is_admin_user_safe(auth.uid()))
WITH CHECK (is_admin_user_safe(auth.uid()));

-- Conversation Learning Feedback - Users can add feedback, admins can view all
ALTER TABLE conversation_learning_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can add their own feedback"
ON conversation_learning_feedback FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can view their own feedback"
ON conversation_learning_feedback FOR SELECT
USING (auth.uid() = user_id OR is_admin_user_safe(auth.uid()));

CREATE POLICY "Admins can manage all feedback"
ON conversation_learning_feedback FOR ALL
USING (is_admin_user_safe(auth.uid()))
WITH CHECK (is_admin_user_safe(auth.uid()));

-- Knowledge Usage Analytics - Track usage, admins can view
ALTER TABLE knowledge_usage_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System can log usage"
ON knowledge_usage_analytics FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view their own analytics"
ON knowledge_usage_analytics FOR SELECT
USING (auth.uid() = user_id OR is_admin_user_safe(auth.uid()));

CREATE POLICY "Admins can manage analytics"
ON knowledge_usage_analytics FOR ALL
USING (is_admin_user_safe(auth.uid()));