-- Enable pgvector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Add embeddings column to universal_knowledge_base
ALTER TABLE universal_knowledge_base 
ADD COLUMN IF NOT EXISTS embedding vector(1536),
ADD COLUMN IF NOT EXISTS embedding_model text DEFAULT 'text-embedding-3-small',
ADD COLUMN IF NOT EXISTS last_embedded_at timestamptz;

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS universal_knowledge_embedding_idx 
ON universal_knowledge_base 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create query analysis table for AI Intelligence
CREATE TABLE IF NOT EXISTS genie_query_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES genie_conversations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  query_text text NOT NULL,
  detected_intent text,
  detected_domain text,
  complexity_score numeric(3,2) CHECK (complexity_score >= 0 AND complexity_score <= 1),
  requires_rag boolean DEFAULT false,
  requires_mcp boolean DEFAULT false,
  recommended_model text,
  token_estimate integer,
  analyzed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create confidence tracking table
CREATE TABLE IF NOT EXISTS genie_response_confidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES genie_conversations(id) ON DELETE CASCADE,
  message_index integer NOT NULL,
  confidence_score numeric(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning_quality numeric(3,2),
  factual_accuracy numeric(3,2),
  completeness_score numeric(3,2),
  sources_used jsonb,
  model_used text,
  token_usage jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(conversation_id, message_index)
);

-- Create token budget tracking table
CREATE TABLE IF NOT EXISTS genie_token_budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id uuid REFERENCES genie_conversations(id) ON DELETE CASCADE,
  allocated_tokens integer NOT NULL,
  used_tokens integer DEFAULT 0,
  remaining_tokens integer GENERATED ALWAYS AS (allocated_tokens - used_tokens) STORED,
  budget_period text DEFAULT 'conversation',
  reset_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE genie_query_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE genie_response_confidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE genie_token_budgets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for query analysis
CREATE POLICY "Users can view their own query analysis"
ON genie_query_analysis FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "System can insert query analysis"
ON genie_query_analysis FOR INSERT
WITH CHECK (true);

-- RLS Policies for confidence tracking
CREATE POLICY "Users can view confidence scores for their conversations"
ON genie_response_confidence FOR SELECT
USING (
  conversation_id IN (
    SELECT id FROM genie_conversations WHERE user_id = auth.uid()
  )
);

CREATE POLICY "System can insert confidence scores"
ON genie_response_confidence FOR INSERT
WITH CHECK (true);

-- RLS Policies for token budgets
CREATE POLICY "Users can view their own token budgets"
ON genie_token_budgets FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own token budgets"
ON genie_token_budgets FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can insert token budgets"
ON genie_token_budgets FOR INSERT
WITH CHECK (true);

-- Function to update token usage
CREATE OR REPLACE FUNCTION update_token_usage(
  p_conversation_id uuid,
  p_tokens_used integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE genie_token_budgets
  SET 
    used_tokens = used_tokens + p_tokens_used,
    updated_at = now()
  WHERE conversation_id = p_conversation_id;
END;
$$;

-- Function for semantic search
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