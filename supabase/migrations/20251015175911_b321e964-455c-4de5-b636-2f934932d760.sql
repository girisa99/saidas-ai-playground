-- Align knowledge_crawl_jobs schema with edge function usage
ALTER TABLE public.knowledge_crawl_jobs
  ADD COLUMN IF NOT EXISTS job_name TEXT,
  ADD COLUMN IF NOT EXISTS start_url TEXT,
  ADD COLUMN IF NOT EXISTS pages_total INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS configuration JSONB DEFAULT '{}'::jsonb;

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_knowledge_crawl_jobs_start_url ON public.knowledge_crawl_jobs(start_url);
