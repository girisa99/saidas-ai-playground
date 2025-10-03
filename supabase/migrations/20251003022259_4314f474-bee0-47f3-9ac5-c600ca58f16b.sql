-- Add location tracking fields to visitor_analytics
ALTER TABLE visitor_analytics 
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS latitude NUMERIC,
ADD COLUMN IF NOT EXISTS longitude NUMERIC;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_visitor_analytics_session_time 
ON visitor_analytics(session_id, visit_timestamp);

CREATE INDEX IF NOT EXISTS idx_visitor_analytics_country 
ON visitor_analytics(country) WHERE country IS NOT NULL;

-- Update the analytics function to include session journeys and location data
CREATE OR REPLACE FUNCTION public.get_visitor_analytics_summary(days_back integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
  location_data AS (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'country', country,
          'region', region,
          'visitor_count', visitor_count
        )
        ORDER BY visitor_count DESC
      ) FILTER (WHERE country IS NOT NULL AND rn <= 20) as locations
    FROM (
      SELECT
        country,
        region,
        COUNT(DISTINCT session_id) as visitor_count,
        ROW_NUMBER() OVER (ORDER BY COUNT(DISTINCT session_id) DESC) as rn
      FROM visitor_analytics
      WHERE visit_timestamp >= start_date
        AND country IS NOT NULL
      GROUP BY country, region
    ) ranked
  ),
  session_journeys AS (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'session_id', session_id,
          'first_visit', first_visit,
          'last_visit', last_visit,
          'total_time_seconds', total_time_seconds,
          'pages_visited', pages_visited,
          'page_journey', page_journey,
          'country', country,
          'region', region
        )
        ORDER BY first_visit DESC
      ) FILTER (WHERE rn <= 50) as journeys
    FROM (
      SELECT
        session_id,
        MIN(visit_timestamp) as first_visit,
        MAX(visit_timestamp) as last_visit,
        SUM(COALESCE(time_on_page_seconds, 0)) as total_time_seconds,
        COUNT(*) as pages_visited,
        MAX(country) as country,
        MAX(region) as region,
        jsonb_agg(
          jsonb_build_object(
            'page_path', page_path,
            'page_title', page_title,
            'visit_time', visit_timestamp,
            'time_on_page', COALESCE(time_on_page_seconds, 0)
          )
          ORDER BY visit_timestamp ASC
        ) as page_journey,
        ROW_NUMBER() OVER (ORDER BY MIN(visit_timestamp) DESC) as rn
      FROM visitor_analytics
      WHERE visit_timestamp >= start_date
      GROUP BY session_id
    ) sessions
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
    'locations', COALESCE(ld.locations, '[]'::jsonb),
    'session_journeys', COALESCE(sj.journeys, '[]'::jsonb),
    'hourly_distribution', COALESCE(hd.distribution, '{}'::jsonb),
    'daily_trend', COALESCE(dt.trend, '[]'::jsonb),
    'period_days', days_back
  ) INTO result
  FROM analytics a
  CROSS JOIN top_pages tp
  CROSS JOIN location_data ld
  CROSS JOIN session_journeys sj
  CROSS JOIN hourly_distribution hd
  CROSS JOIN daily_trend dt;
  
  RETURN COALESCE(result, '{}'::jsonb);
END;
$function$;