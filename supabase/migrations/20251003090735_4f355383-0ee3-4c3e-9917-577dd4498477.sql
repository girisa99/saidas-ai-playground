-- Fix nested aggregate error in analytics function
CREATE OR REPLACE FUNCTION public.get_visitor_analytics_summary(days_back integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  result JSONB;
  start_date TIMESTAMPTZ;
BEGIN
  start_date := NOW() - (days_back || ' days')::INTERVAL;

  WITH views_only AS (
    SELECT *
    FROM visitor_analytics
    WHERE visit_timestamp >= start_date
      AND time_on_page_seconds IS NULL
  ),
  time_events AS (
    SELECT session_id, page_path, SUM(time_on_page_seconds)::int AS time_on_page
    FROM visitor_analytics
    WHERE visit_timestamp >= start_date
      AND time_on_page_seconds IS NOT NULL
    GROUP BY session_id, page_path
  ),
  avg_time_calc AS (
    SELECT ROUND(AVG(time_on_page))::int AS avg_time
    FROM time_events
  ),
  analytics AS (
    SELECT
      COUNT(*) AS total_views,
      COUNT(DISTINCT session_id) AS unique_sessions,
      COUNT(DISTINCT COALESCE(ip_address::text, session_id)) AS unique_visitors,
      COUNT(DISTINCT page_path) AS unique_pages,
      COUNT(CASE WHEN visit_timestamp > NOW() - INTERVAL '24 hours' THEN 1 END) AS views_last_24h,
      COUNT(DISTINCT CASE WHEN visit_timestamp > NOW() - INTERVAL '24 hours' THEN session_id END) AS sessions_last_24h
    FROM views_only
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
      ) FILTER (WHERE rn <= 10) AS pages
    FROM (
      SELECT
        page_path,
        MAX(page_title) AS page_title,
        COUNT(*) AS view_count,
        ROW_NUMBER() OVER (ORDER BY COUNT(*) DESC) AS rn
      FROM views_only
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
      ) FILTER (WHERE country IS NOT NULL AND rn <= 20) AS locations
    FROM (
      SELECT
        country,
        region,
        COUNT(DISTINCT session_id) AS visitor_count,
        ROW_NUMBER() OVER (ORDER BY COUNT(DISTINCT session_id) DESC) AS rn
      FROM views_only
      WHERE country IS NOT NULL
      GROUP BY country, region
    ) ranked
  ),
  session_journeys AS (
    SELECT
      jsonb_agg(
        jsonb_build_object(
          'session_id', s.session_id,
          'first_visit', s.first_visit,
          'last_visit', s.last_visit,
          'total_time_seconds', s.total_time_seconds,
          'pages_visited', s.pages_visited,
          'country', s.country,
          'region', s.region,
          'page_journey', s.page_journey
        )
        ORDER BY s.first_visit DESC
      ) FILTER (WHERE s.rn <= 50) AS journeys
    FROM (
      SELECT
        v.session_id,
        MIN(v.visit_timestamp) AS first_visit,
        MAX(v.visit_timestamp) AS last_visit,
        COALESCE(SUM(te2.time_on_page), 0)::int AS total_time_seconds,
        COUNT(*) AS pages_visited,
        MAX(v.country) AS country,
        MAX(v.region) AS region,
        jsonb_agg(
          jsonb_build_object(
            'page_path', v.page_path,
            'page_title', v.page_title,
            'visit_time', v.visit_timestamp,
            'time_on_page', COALESCE(te2.time_on_page, 0)
          )
          ORDER BY v.visit_timestamp ASC
        ) AS page_journey,
        ROW_NUMBER() OVER (ORDER BY MIN(v.visit_timestamp) DESC) AS rn
      FROM views_only v
      LEFT JOIN time_events te2
        ON te2.session_id = v.session_id AND te2.page_path = v.page_path
      GROUP BY v.session_id
    ) s
  ),
  hourly_distribution AS (
    SELECT
      jsonb_object_agg(hour::text, view_count) AS distribution
    FROM (
      SELECT EXTRACT(HOUR FROM visit_timestamp) AS hour, COUNT(*) AS view_count
      FROM views_only
      GROUP BY EXTRACT(HOUR FROM visit_timestamp)
      ORDER BY hour
    ) h
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
      ) AS trend
    FROM (
      SELECT
        DATE(visit_timestamp) AS visit_date,
        COUNT(*) AS view_count,
        COUNT(DISTINCT session_id) AS unique_sessions
      FROM views_only
      GROUP BY DATE(visit_timestamp)
    ) d
  )
  SELECT jsonb_build_object(
    'summary', jsonb_build_object(
      'total_views', COALESCE(a.total_views, 0),
      'unique_sessions', COALESCE(a.unique_sessions, 0),
      'unique_visitors', COALESCE(a.unique_visitors, 0),
      'unique_pages', COALESCE(a.unique_pages, 0),
      'avg_time_on_page_seconds', COALESCE(atc.avg_time, 0),
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
  CROSS JOIN avg_time_calc atc
  CROSS JOIN top_pages tp
  CROSS JOIN location_data ld
  CROSS JOIN session_journeys sj
  CROSS JOIN hourly_distribution hd
  CROSS JOIN daily_trend dt;

  RETURN COALESCE(result, '{}'::jsonb);
END;
$function$;