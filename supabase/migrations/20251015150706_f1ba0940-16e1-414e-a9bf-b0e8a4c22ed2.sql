-- Fix: Drop trigger first, then function
DROP TRIGGER IF EXISTS trigger_update_citation_count ON public.knowledge_citations;
DROP FUNCTION IF EXISTS public.update_citation_count();

CREATE OR REPLACE FUNCTION public.update_citation_count()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.universal_knowledge_base
  SET 
    citation_count = citation_count + 1,
    last_cited_at = now()
  WHERE id = NEW.knowledge_base_id;
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER trigger_update_citation_count
  AFTER INSERT ON public.knowledge_citations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_citation_count();