-- Create treatment_centers table for structured location data
CREATE TABLE IF NOT EXISTS public.treatment_centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  center_type TEXT NOT NULL, -- 'gene_therapy', 'bmt', 'oncology', etc.
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  phone TEXT,
  website TEXT,
  email TEXT,
  specialties TEXT[],
  accreditations TEXT[],
  metadata JSONB DEFAULT '{}',
  knowledge_base_id UUID REFERENCES public.universal_knowledge_base(id),
  source_url TEXT,
  source_name TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_treatment_centers_type ON public.treatment_centers(center_type);
CREATE INDEX IF NOT EXISTS idx_treatment_centers_state ON public.treatment_centers(state);
CREATE INDEX IF NOT EXISTS idx_treatment_centers_location ON public.treatment_centers(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_treatment_centers_knowledge ON public.treatment_centers(knowledge_base_id);

-- Enable RLS
ALTER TABLE public.treatment_centers ENABLE ROW LEVEL SECURITY;

-- Public read access for treatment centers
CREATE POLICY "Treatment centers are publicly viewable"
  ON public.treatment_centers
  FOR SELECT
  USING (true);

-- Only authenticated admins can insert/update
CREATE POLICY "Only admins can manage treatment centers"
  ON public.treatment_centers
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      JOIN public.roles r ON r.id = ur.role_id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('superAdmin', 'onboardingTeam')
    )
  );

-- Add citation tracking to universal_knowledge_base
ALTER TABLE public.universal_knowledge_base 
ADD COLUMN IF NOT EXISTS citation_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_cited_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS source_credibility_score INTEGER DEFAULT 50 CHECK (source_credibility_score >= 0 AND source_credibility_score <= 100);

-- Create citation_log table to track when sources are used
CREATE TABLE IF NOT EXISTS public.knowledge_citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  knowledge_base_id UUID REFERENCES public.universal_knowledge_base(id) ON DELETE CASCADE,
  conversation_id UUID,
  cited_in_response TEXT,
  citation_context JSONB DEFAULT '{}',
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_citations_knowledge ON public.knowledge_citations(knowledge_base_id);
CREATE INDEX IF NOT EXISTS idx_citations_conversation ON public.knowledge_citations(conversation_id);

-- Enable RLS
ALTER TABLE public.knowledge_citations ENABLE ROW LEVEL SECURITY;

-- Public can view citations
CREATE POLICY "Citations are publicly viewable"
  ON public.knowledge_citations
  FOR SELECT
  USING (true);

-- System can insert citations
CREATE POLICY "System can log citations"
  ON public.knowledge_citations
  FOR INSERT
  WITH CHECK (true);

-- Function to update citation count
CREATE OR REPLACE FUNCTION update_citation_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.universal_knowledge_base
  SET 
    citation_count = citation_count + 1,
    last_cited_at = now()
  WHERE id = NEW.knowledge_base_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-update citation count
DROP TRIGGER IF EXISTS trigger_update_citation_count ON public.knowledge_citations;
CREATE TRIGGER trigger_update_citation_count
  AFTER INSERT ON public.knowledge_citations
  FOR EACH ROW
  EXECUTE FUNCTION update_citation_count();

COMMENT ON TABLE public.treatment_centers IS 'Structured storage for healthcare treatment centers with geographic data';
COMMENT ON TABLE public.knowledge_citations IS 'Tracks when knowledge base entries are cited in AI responses';