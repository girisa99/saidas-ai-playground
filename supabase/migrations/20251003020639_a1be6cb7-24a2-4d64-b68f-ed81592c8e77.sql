-- Create visitor analytics table to track page views and site visits
CREATE TABLE IF NOT EXISTS public.visitor_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  page_path TEXT NOT NULL,
  page_title TEXT,
  visit_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_on_page_seconds INTEGER,
  user_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_session ON public.visitor_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_page_path ON public.visitor_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_timestamp ON public.visitor_analytics(visit_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_ip ON public.visitor_analytics(ip_address);
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_user ON public.visitor_analytics(user_id);

-- Enable RLS
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can view all analytics
CREATE POLICY "Admins can view visitor analytics"
  ON public.visitor_analytics
  FOR SELECT
  USING (is_admin_user_safe(auth.uid()));

-- Policy: System can insert analytics (public endpoint)
CREATE POLICY "System can insert visitor analytics"
  ON public.visitor_analytics
  FOR INSERT
  WITH CHECK (true);

-- Add visitor count to site_stats if not exists
INSERT INTO public.site_stats (stat_name, stat_value)
VALUES ('total_page_views', 0)
ON CONFLICT (stat_name) DO NOTHING;

INSERT INTO public.site_stats (stat_name, stat_value)
VALUES ('unique_visitors', 0)
ON CONFLICT (stat_name) DO NOTHING;

-- Create function to get visitor analytics summary
CREATE OR REPLACE FUNCTION public.get_visitor_analytics_summary(
  days_back INTEGER DEFAULT 30
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSONB;
  start_date TIMESTAMP WITH TIME ZONE;
BEGIN
  start_date := NOW() - (days_back || ' days')::INTERVAL;
  
  WITH analytics AS (
    SELECT
      COUNT(*) as total_views,
      COUNT(DISTINCT session_id) as unique_sessions,
      COUNT(DISTINCT ip_address) as unique_ips,
      COUNT(DISTINCT page_path) as unique_pages,
      ROUND(AVG(time_on_page_seconds)) as avg_time_on_page,
      COUNT(CASE WHEN visit_timestamp > NOW() - INTERVAL '24 hours' THEN 1 END) as views_last_24h,
      COUNT(DISTINCT CASE WHEN visit_timestamp > NOW() - INTERVAL '24 hours' THEN session_id END) as sessions_last_24h
    FROM visitor_analytics
    WHERE visit_timestamp >= start_date
  ),
  top_pages AS (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'page_path', page_path,
          'page_title', page_title,
          'view_count', view_count
        )
        ORDER BY view_count DESC
      ) FILTER (WHERE rn <= 10) as pages
    FROM (
      SELECT
        page_path,
        MAX(page_title) as page_title,
        COUNT(*) as view_count,
        ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) as rn
      FROM visitor_analytics
      WHERE visit_timestamp >= start_date
      GROUP BY page_path
    ) ranked
  ),
  hourly_distribution AS (
    SELECT
      jsonb_object_agg(
        hour::TEXT,
        view_count
      ) as distribution
    FROM (
      SELECT
        EXTRACT(HOUR FROM visit_timestamp) as hour,
        COUNT(*) as view_count
      FROM visitor_analytics
      WHERE visit_timestamp >= start_date
      GROUP BY EXTRACT(HOUR FROM visit_timestamp)
      ORDER BY hour
    ) hours
  ),
  daily_trend AS (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'date', visit_date,
          'views', view_count,
          'unique_sessions', unique_sessions
        )
        ORDER BY visit_date DESC
      ) as trend
    FROM (
      SELECT
        DATE(visit_timestamp) as visit_date,
        COUNT(*) as view_count,
        COUNT(DISTINCT session_id) as unique_sessions
      FROM visitor_analytics
      WHERE visit_timestamp >= start_date
      GROUP BY DATE(visit_timestamp)
    ) daily
  )
  SELECT jsonb_build_object(
    'summary', jsonb_build_object(
      'total_views', COALESCE(a.total_views, 0),
      'unique_sessions', COALESCE(a.unique_sessions, 0),
      'unique_visitors', COALESCE(a.unique_ips, 0),
      'unique_pages', COALESCE(a.unique_pages, 0),
      'avg_time_on_page_seconds', COALESCE(a.avg_time_on_page, 0),
      'views_last_24h', COALESCE(a.views_last_24h, 0),
      'sessions_last_24h', COALESCE(a.sessions_last_24h, 0)
    ),
    'top_pages', COALESCE(tp.pages, '[]'::jsonb),
    'hourly_distribution', COALESCE(hd.distribution, '{}'::jsonb),
    'daily_trend', COALESCE(dt.trend, '[]'::jsonb),
    'period_days', days_back
  ) INTO result
  FROM analytics a
  CROSS JOIN top_pages tp
  CROSS JOIN hourly_distribution hd
  CROSS JOIN daily_trend dt;
  
  RETURN COALESCE(result, '{}'::jsonb);
END;
$$;