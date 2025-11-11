-- Fix search_path for security definer functions created in previous migration
DROP FUNCTION IF EXISTS update_token_usage(uuid, integer);
CREATE OR REPLACE FUNCTION update_token_usage(
  p_conversation_id uuid,
  p_tokens_used integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE genie_token_budgets
  SET 
    used_tokens = used_tokens + p_tokens_used,
    updated_at = now()
  WHERE conversation_id = p_conversation_id;
END;
$$;

DROP FUNCTION IF EXISTS search_knowledge_semantic(vector, float, int, text);
CREATE OR REPLACE FUNCTION search_knowledge_semantic(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_domain text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  description text,
  content_summary text,
  domain text,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.description,
    kb.content_summary,
    kb.domain,
    1 - (kb.embedding <=> query_embedding) as similarity
  FROM universal_knowledge_base kb
  WHERE 
    kb.embedding IS NOT NULL
    AND (filter_domain IS NULL OR kb.domain = filter_domain)
    AND 1 - (kb.embedding <=> query_embedding) > match_threshold
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Move pgvector extension to extensions schema (best practice)
-- Note: This is a warning, pgvector in public is acceptable for now
-- but we document it for future optimization