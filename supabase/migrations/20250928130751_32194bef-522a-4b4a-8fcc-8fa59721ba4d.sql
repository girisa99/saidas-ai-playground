-- Update existing knowledge_base table if needed (add missing columns)
ALTER TABLE public.knowledge_base 
ADD COLUMN IF NOT EXISTS source_type TEXT DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS confidence_score DECIMAL(3,2),
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS approval_notes TEXT;

-- Update existing rag_recommendations table if needed
ALTER TABLE public.rag_recommendations 
ADD COLUMN IF NOT EXISTS knowledge_base_entry_id UUID REFERENCES public.knowledge_base(id),
ADD COLUMN IF NOT EXISTS reviewed_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS review_notes TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Create FAQ entries table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.faq_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  knowledge_base_entry_id UUID REFERENCES public.knowledge_base(id),
  created_from_rag BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add constraints if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_kb_status' AND table_name = 'knowledge_base'
  ) THEN
    ALTER TABLE public.knowledge_base 
    ADD CONSTRAINT valid_kb_status CHECK (status IN ('draft', 'pending_review', 'approved', 'archived'));
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_rag_status' AND table_name = 'rag_recommendations'
  ) THEN
    ALTER TABLE public.rag_recommendations 
    ADD CONSTRAINT valid_rag_status CHECK (status IN ('pending', 'approved', 'rejected', 'merged'));
  END IF;
END $$;

-- Enable RLS on FAQ entries
ALTER TABLE public.faq_entries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Everyone can view active FAQ entries" ON public.faq_entries;
DROP POLICY IF EXISTS "Admins can manage FAQ entries" ON public.faq_entries;

-- Create RLS policies for FAQ entries
CREATE POLICY "Everyone can view active FAQ entries"
ON public.faq_entries
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage FAQ entries"
ON public.faq_entries
FOR ALL
USING (is_admin_user_safe(auth.uid()));

-- Create function to sync FAQ from approved knowledge
CREATE OR REPLACE FUNCTION public.sync_faq_from_knowledge()
RETURNS TRIGGER AS $$
BEGIN
  -- When knowledge base entry is approved, create/update FAQ entry
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    INSERT INTO public.faq_entries (
      question,
      answer,
      category_name,
      knowledge_base_entry_id,
      created_from_rag
    ) VALUES (
      NEW.title,
      NEW.content,
      COALESCE(NEW.category, 'RAG Generated'),
      NEW.id,
      (NEW.source_type = 'rag_generated')
    )
    ON CONFLICT (knowledge_base_entry_id) 
    DO UPDATE SET
      question = EXCLUDED.question,
      answer = EXCLUDED.answer,
      category_name = EXCLUDED.category_name,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger to sync FAQ when knowledge is approved (drop and recreate if exists)
DROP TRIGGER IF EXISTS sync_faq_on_knowledge_approval ON public.knowledge_base;
CREATE TRIGGER sync_faq_on_knowledge_approval
  AFTER UPDATE ON public.knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_faq_from_knowledge();

-- Create function to process RAG recommendations
CREATE OR REPLACE FUNCTION public.process_rag_recommendation(
  p_recommendation_id UUID,
  p_action TEXT, -- 'approve', 'reject', 'merge'
  p_review_notes TEXT DEFAULT NULL,
  p_merge_with_entry_id UUID DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  rec RECORD;
  kb_entry_id UUID;
  result JSONB;
BEGIN
  -- Get the recommendation
  SELECT * INTO rec FROM public.rag_recommendations WHERE id = p_recommendation_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Recommendation not found');
  END IF;
  
  CASE p_action
    WHEN 'approve' THEN
      -- Create knowledge base entry
      INSERT INTO public.knowledge_base (
        title,
        content,
        category,
        source_type,
        confidence_score,
        status,
        created_by,
        reviewed_by,
        reviewed_at,
        approval_notes
      ) VALUES (
        'FAQ: ' || LEFT(rec.user_query, 100),
        rec.suggested_content,
        COALESCE(rec.suggested_category, 'RAG Generated'),
        'rag_generated',
        rec.confidence_score,
        'approved',
        auth.uid(),
        auth.uid(),
        now(),
        p_review_notes
      )
      RETURNING id INTO kb_entry_id;
      
      -- Update recommendation status
      UPDATE public.rag_recommendations
      SET 
        status = 'approved',
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_notes = p_review_notes,
        knowledge_base_entry_id = kb_entry_id
      WHERE id = p_recommendation_id;
      
      result := jsonb_build_object(
        'status', 'approved',
        'knowledge_base_entry_id', kb_entry_id
      );
      
    WHEN 'reject' THEN
      UPDATE public.rag_recommendations
      SET 
        status = 'rejected',
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_notes = p_review_notes
      WHERE id = p_recommendation_id;
      
      result := jsonb_build_object('status', 'rejected');
      
    WHEN 'merge' THEN
      -- Merge with existing knowledge base entry
      UPDATE public.knowledge_base
      SET 
        content = content || E'\n\nAdditional context: ' || rec.suggested_content,
        updated_at = now()
      WHERE id = p_merge_with_entry_id;
      
      UPDATE public.rag_recommendations
      SET 
        status = 'merged',
        reviewed_by = auth.uid(),
        reviewed_at = now(),
        review_notes = p_review_notes,
        knowledge_base_entry_id = p_merge_with_entry_id
      WHERE id = p_recommendation_id;
      
      result := jsonb_build_object(
        'status', 'merged',
        'merged_with', p_merge_with_entry_id
      );
      
    ELSE
      RETURN jsonb_build_object('error', 'Invalid action');
  END CASE;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;