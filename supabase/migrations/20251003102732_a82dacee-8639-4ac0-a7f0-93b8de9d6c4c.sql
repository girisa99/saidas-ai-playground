-- Create table for Genie AI popup analytics tracking
CREATE TABLE IF NOT EXISTS public.genie_popup_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}'::jsonb,
  user_email TEXT,
  context TEXT,
  ip_address TEXT,
  user_agent TEXT,
  page_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_genie_popup_analytics_event_type ON public.genie_popup_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_genie_popup_analytics_user_email ON public.genie_popup_analytics(user_email);
CREATE INDEX IF NOT EXISTS idx_genie_popup_analytics_created_at ON public.genie_popup_analytics(created_at DESC);

-- Enable RLS
ALTER TABLE public.genie_popup_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert analytics events
CREATE POLICY "Anyone can insert popup analytics"
  ON public.genie_popup_analytics
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Only admins can view analytics
CREATE POLICY "Admins can view popup analytics"
  ON public.genie_popup_analytics
  FOR SELECT
  TO authenticated
  USING (is_admin_user_safe(auth.uid()));

COMMENT ON TABLE public.genie_popup_analytics IS 'Tracks all Genie AI popup interaction events for analytics';
