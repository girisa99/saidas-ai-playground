-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embedding column to universal_knowledge_base for vector search
ALTER TABLE public.universal_knowledge_base 
ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- Create index for vector similarity search (using cosine distance)
CREATE INDEX IF NOT EXISTS universal_knowledge_embedding_idx 
ON public.universal_knowledge_base 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create function for semantic search using vector similarity
CREATE OR REPLACE FUNCTION search_knowledge_semantic(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  finding_name text,
  description text,
  clinical_context text,
  domain text,
  content_type text,
  metadata jsonb,
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
    kb.finding_name,
    kb.description,
    kb.clinical_context,
    kb.domain,
    kb.content_type,
    kb.metadata,
    1 - (kb.embedding <=> query_embedding) as similarity
  FROM universal_knowledge_base kb
  WHERE kb.is_approved = true
    AND kb.embedding IS NOT NULL
    AND 1 - (kb.embedding <=> query_embedding) > match_threshold
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create helper function to combine keyword and semantic search
CREATE OR REPLACE FUNCTION search_knowledge_hybrid(
  search_query text,
  query_embedding vector(1536) DEFAULT NULL,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  finding_name text,
  description text,
  clinical_context text,
  domain text,
  content_type text,
  metadata jsonb,
  similarity float,
  search_type text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sanitized_query text;
BEGIN
  -- Sanitize query for keyword search
  sanitized_query := regexp_replace(
    regexp_replace(search_query, 'https?://\S+', '', 'g'),
    '[^\p{L}\p{N}\s]',
    ' ',
    'g'
  );
  sanitized_query := lower(substring(sanitized_query from 1 for 120));

  -- If embedding provided, do hybrid search (semantic + keyword)
  IF query_embedding IS NOT NULL THEN
    RETURN QUERY
    WITH semantic_results AS (
      SELECT * FROM search_knowledge_semantic(query_embedding, 0.7, match_count)
    ),
    keyword_results AS (
      SELECT 
        kb.id,
        kb.finding_name,
        kb.description,
        kb.clinical_context,
        kb.domain,
        kb.content_type,
        kb.metadata,
        0.5::float as similarity,
        'keyword'::text as search_type
      FROM universal_knowledge_base kb
      WHERE kb.is_approved = true
        AND (
          kb.finding_name ILIKE '%' || sanitized_query || '%'
          OR kb.description ILIKE '%' || sanitized_query || '%'
        )
      LIMIT match_count
    )
    SELECT 
      COALESCE(s.id, k.id) as id,
      COALESCE(s.finding_name, k.finding_name) as finding_name,
      COALESCE(s.description, k.description) as description,
      COALESCE(s.clinical_context, k.clinical_context) as clinical_context,
      COALESCE(s.domain, k.domain) as domain,
      COALESCE(s.content_type, k.content_type) as content_type,
      COALESCE(s.metadata, k.metadata) as metadata,
      COALESCE(s.similarity, k.similarity) as similarity,
      CASE WHEN s.id IS NOT NULL THEN 'semantic' ELSE 'keyword' END as search_type
    FROM semantic_results s
    FULL OUTER JOIN keyword_results k ON s.id = k.id
    ORDER BY similarity DESC
    LIMIT match_count;
  ELSE
    -- Fallback to keyword-only search
    RETURN QUERY
    SELECT 
      kb.id,
      kb.finding_name,
      kb.description,
      kb.clinical_context,
      kb.domain,
      kb.content_type,
      kb.metadata,
      0.5::float as similarity,
      'keyword'::text as search_type
    FROM universal_knowledge_base kb
    WHERE kb.is_approved = true
      AND (
        kb.finding_name ILIKE '%' || sanitized_query || '%'
        OR kb.description ILIKE '%' || sanitized_query || '%'
      )
    ORDER BY kb.created_at DESC
    LIMIT match_count;
  END IF;
END;
$$;