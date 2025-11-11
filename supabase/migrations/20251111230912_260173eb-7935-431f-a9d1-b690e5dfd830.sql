-- Create hybrid search function using CTEs instead of arrays
CREATE OR REPLACE FUNCTION search_knowledge_hybrid(
  search_query text,
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_domain text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  finding_name text,
  description text,
  clinical_context text,
  clinical_significance text,
  domain text,
  content_type text,
  metadata jsonb,
  similarity float,
  search_method text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH semantic_search AS (
    SELECT
      kb.id,
      kb.finding_name,
      kb.description,
      kb.clinical_context,
      kb.clinical_significance,
      kb.domain,
      kb.content_type,
      kb.metadata,
      (1 - (kb.embedding <=> query_embedding))::float as similarity,
      'semantic'::text as search_method,
      1 as priority
    FROM universal_knowledge_base kb
    WHERE 
      kb.embedding IS NOT NULL
      AND kb.is_approved = true
      AND (filter_domain IS NULL OR kb.domain = filter_domain)
      AND 1 - (kb.embedding <=> query_embedding) > match_threshold
    ORDER BY kb.embedding <=> query_embedding
    LIMIT match_count
  ),
  keyword_search AS (
    SELECT
      kb.id,
      kb.finding_name,
      kb.description,
      kb.clinical_context,
      kb.clinical_significance,
      kb.domain,
      kb.content_type,
      kb.metadata,
      0.5::float as similarity,
      'keyword'::text as search_method,
      2 as priority
    FROM universal_knowledge_base kb
    WHERE 
      kb.is_approved = true
      AND (filter_domain IS NULL OR kb.domain = filter_domain)
      AND (
        kb.finding_name ILIKE '%' || search_query || '%' OR
        kb.description ILIKE '%' || search_query || '%'
      )
      AND NOT EXISTS (SELECT 1 FROM semantic_search s WHERE s.id = kb.id)
    ORDER BY kb.updated_at DESC
    LIMIT match_count
  )
  SELECT 
    s.id,
    s.finding_name,
    s.description,
    s.clinical_context,
    s.clinical_significance,
    s.domain,
    s.content_type,
    s.metadata,
    s.similarity,
    s.search_method
  FROM (
    SELECT * FROM semantic_search
    UNION ALL
    SELECT * FROM keyword_search
  ) s
  ORDER BY s.priority ASC, s.similarity DESC
  LIMIT match_count;
END;
$$;