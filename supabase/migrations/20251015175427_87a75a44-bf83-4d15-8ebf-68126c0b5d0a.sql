-- Create knowledge_crawl_jobs table for tracking crawl operations
CREATE TABLE IF NOT EXISTS public.knowledge_crawl_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  crawl_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  pages_crawled INTEGER DEFAULT 0,
  items_extracted INTEGER DEFAULT 0,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.knowledge_crawl_jobs ENABLE ROW LEVEL SECURITY;

-- Admin users can view all crawl jobs
CREATE POLICY "Admins can view crawl jobs"
  ON public.knowledge_crawl_jobs
  FOR SELECT
  USING (is_admin_user_safe(auth.uid()));

-- Admin users can manage crawl jobs
CREATE POLICY "Admins can manage crawl jobs"
  ON public.knowledge_crawl_jobs
  FOR ALL
  USING (is_admin_user_safe(auth.uid()));

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_knowledge_crawl_jobs_status ON public.knowledge_crawl_jobs(status);
CREATE INDEX IF NOT EXISTS idx_knowledge_crawl_jobs_created_at ON public.knowledge_crawl_jobs(created_at DESC);