-- Consolidate ALL knowledge bases into universal_knowledge_base
-- This migration consolidates knowledge_base, rag_recommendations, and removes duplicates

-- Step 1: Migrate data from knowledge_base table (using correct column names)
INSERT INTO universal_knowledge_base (
  domain,
  source_repository_id,
  content_type,
  finding_name,
  description,
  clinical_context,
  metadata,
  quality_score,
  is_approved,
  created_at,
  updated_at
)
SELECT 
  COALESCE(category, 'conversational') as domain,
  NULL as source_repository_id,
  COALESCE(content_type, 'faq') as content_type,
  name as finding_name,
  COALESCE(description, processed_content, raw_content) as description,
  jsonb_build_object(
    'healthcare_tags', healthcare_tags,
    'modality_type', modality_type,
    'treatment_category', treatment_category,
    'regulatory_status', regulatory_status,
    'source_type', source_type,
    'source_url', source_url,
    'source', 'knowledge_base'
  ) as clinical_context,
  COALESCE(metadata, '{}'::jsonb) as metadata,
  LEAST(100, GREATEST(0, (COALESCE(confidence_score, 0.8) * 100)::integer)) as quality_score,
  COALESCE(status = 'approved', is_active, true) as is_approved,
  created_at,
  updated_at
FROM knowledge_base
WHERE NOT EXISTS (
  SELECT 1 FROM universal_knowledge_base ukb
  WHERE ukb.finding_name = knowledge_base.name
  AND ukb.domain = COALESCE(knowledge_base.category, 'conversational')
);

-- Step 2: Migrate data from rag_recommendations table
INSERT INTO universal_knowledge_base (
  domain,
  source_repository_id,
  content_type,
  finding_name,
  description,
  clinical_context,
  metadata,
  quality_score,
  is_approved,
  created_at,
  updated_at
)
SELECT 
  'conversational' as domain,
  NULL as source_repository_id,
  'recommendation' as content_type,
  LEFT(query_context, 200) as finding_name,
  query_context as description,
  jsonb_build_object(
    'recommendations', recommendations,
    'next_best_actions', next_best_actions,
    'healthcare_context', healthcare_context,
    'treatment_recommendations', treatment_recommendations,
    'clinical_insights', clinical_insights,
    'conversation_id', conversation_id,
    'source', 'rag_recommendations'
  ) as clinical_context,
  '{}'::jsonb as metadata,
  LEAST(100, GREATEST(0, (COALESCE(confidence_score, 0.5) * 100)::integer)) as quality_score,
  COALESCE(status = 'approved', confidence_score >= 0.7, false) as is_approved,
  created_at,
  created_at as updated_at
FROM rag_recommendations
WHERE query_context IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM universal_knowledge_base ukb
  WHERE ukb.finding_name = LEFT(rag_recommendations.query_context, 200)
  AND ukb.domain = 'conversational'
);

-- Step 3: Remove exact duplicates from universal_knowledge_base (keep the most recent)
DELETE FROM universal_knowledge_base a
USING universal_knowledge_base b
WHERE a.id < b.id
  AND a.finding_name = b.finding_name
  AND a.domain = b.domain
  AND a.description = b.description;

-- Step 4: Create indexes for better performance on universal_knowledge_base
CREATE INDEX IF NOT EXISTS idx_ukb_embedding_search ON universal_knowledge_base USING ivfflat (embedding vector_cosine_ops)
WHERE embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_ukb_text_search ON universal_knowledge_base 
USING GIN (to_tsvector('english', finding_name || ' ' || COALESCE(description, '')));

-- Step 5: Create a function to search universal knowledge base with vector similarity
CREATE OR REPLACE FUNCTION search_universal_knowledge_vector(
  query_embedding VECTOR(1536),
  query_domain TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  finding_name TEXT,
  description TEXT,
  domain TEXT,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ukb.id,
    ukb.finding_name,
    ukb.description,
    ukb.domain,
    1 - (ukb.embedding <=> query_embedding) as similarity
  FROM universal_knowledge_base ukb
  WHERE ukb.embedding IS NOT NULL
    AND ukb.is_approved = true
    AND (query_domain IS NULL OR ukb.domain = query_domain)
  ORDER BY ukb.embedding <=> query_embedding
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 6: Schedule Kaggle sync (weekly on Saturdays at 3 AM UTC)
SELECT cron.schedule(
  'weekly-kaggle-sync',
  '0 3 * * 6', -- Every Saturday at 3:00 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://ithspbabhmdntioslfqe.supabase.co/functions/v1/sync-kaggle-datasets',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0aHNwYmFiaG1kbnRpb3NsZnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjU5OTMsImV4cCI6MjA2MjUwMTk5M30.yUZZHsz2wIHboVuWWfqXeAH5oHRxzJIz20NWSUmHPhw"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Step 7: Grant necessary permissions
GRANT SELECT ON universal_knowledge_base TO authenticated;
GRANT SELECT ON universal_knowledge_repositories TO authenticated;

-- Step 8: Add comments documenting the consolidation
COMMENT ON TABLE universal_knowledge_base IS 'Consolidated knowledge base containing data from medical_imaging_knowledge, knowledge_base, and rag_recommendations. This is the single source of truth for all knowledge content.';

COMMENT ON TABLE knowledge_base IS 'DEPRECATED: Data migrated to universal_knowledge_base. This table will be removed in a future migration.';

COMMENT ON TABLE rag_recommendations IS 'DEPRECATED: Data migrated to universal_knowledge_base. This table will be removed in a future migration.';

COMMENT ON TABLE medical_imaging_knowledge IS 'DEPRECATED: Data migrated to universal_knowledge_base. This table will be removed in a future migration.';