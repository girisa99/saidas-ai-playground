-- Restore comprehensive visitor analytics RPC with all required fields for admin dashboard
CREATE OR REPLACE FUNCTION public.get_visitor_analytics_summary(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
  summary_data jsonb;
  locations_data jsonb;
  top_pages_data jsonb;
  session_journeys_data jsonb;
  daily_trend_data jsonb;
  hourly_distribution_data jsonb;
BEGIN
  -- Build summary statistics
  SELECT jsonb_build_object(
    'total_visitors', COALESCE(COUNT(DISTINCT session_id), 0),
    'total_page_views', COALESCE(COUNT(*), 0),
    'avg_time_on_page', COALESCE(ROUND(AVG(time_on_page_seconds)), 0),
    'unique_countries', COALESCE(COUNT(DISTINCT country) FILTER (WHERE country IS NOT NULL), 0)
  ) INTO summary_data
  FROM public.visitor_analytics
  WHERE visit_timestamp > now() - (days_back || ' days')::interval;

  -- Build geographic distribution
  SELECT COALESCE(jsonb_agg(geo_data ORDER BY visitors DESC), '[]'::jsonb) INTO locations_data
  FROM (
    SELECT jsonb_build_object(
      'country', COALESCE(country, 'Unknown'),
      'region', region,
      'city', city,
      'visitor_count', COUNT(DISTINCT session_id)
    ) as geo_data,
    COUNT(DISTINCT session_id) as visitors
    FROM public.visitor_analytics
    WHERE visit_timestamp > now() - (days_back || ' days')::interval
    GROUP BY country, region, city
    LIMIT 100
  ) as geo_agg;

  -- Build top pages
  SELECT COALESCE(jsonb_agg(page_data ORDER BY view_count DESC), '[]'::jsonb) INTO top_pages_data
  FROM (
    SELECT jsonb_build_object(
      'page_path', page_path,
      'page_title', COALESCE(page_title, ''),
      'view_count', COUNT(*)
    ) as page_data,
    COUNT(*) as view_count
    FROM public.visitor_analytics
    WHERE visit_timestamp > now() - (days_back || ' days')::interval
    GROUP BY page_path, page_title
    LIMIT 100
  ) as pages_agg;

  -- Build session journeys
  SELECT COALESCE(jsonb_agg(session_data), '[]'::jsonb) INTO session_journeys_data
  FROM (
    SELECT jsonb_build_object(
      'session_id', session_id,
      'country', COALESCE(MAX(country), 'Unknown'),
      'region', MAX(region),
      'pages_visited', COUNT(*),
      'total_time_seconds', COALESCE(SUM(time_on_page_seconds), 0),
      'page_journey', jsonb_agg(
        jsonb_build_object(
          'page_path', page_path,
          'page_title', COALESCE(page_title, ''),
          'time_on_page', COALESCE(time_on_page_seconds, 0)
        ) ORDER BY visit_timestamp
      )
    ) as session_data
    FROM public.visitor_analytics
    WHERE visit_timestamp > now() - (days_back || ' days')::interval
    GROUP BY session_id
    LIMIT 200
  ) as sessions_agg;

  -- Build daily trend
  SELECT COALESCE(jsonb_agg(daily_data ORDER BY trend_date), '[]'::jsonb) INTO daily_trend_data
  FROM (
    SELECT 
      DATE(visit_timestamp) as trend_date,
      jsonb_build_object(
        'date', DATE(visit_timestamp),
        'visitors', COUNT(DISTINCT session_id),
        'page_views', COUNT(*)
      ) as daily_data
    FROM public.visitor_analytics
    WHERE visit_timestamp > now() - (days_back || ' days')::interval
    GROUP BY DATE(visit_timestamp)
  ) as daily_agg;

  -- Build hourly distribution
  SELECT COALESCE(jsonb_agg(hourly_data ORDER BY hour), '[]'::jsonb) INTO hourly_distribution_data
  FROM (
    SELECT 
      EXTRACT(HOUR FROM visit_timestamp) as hour,
      jsonb_build_object(
        'hour', EXTRACT(HOUR FROM visit_timestamp),
        'visitors', COUNT(DISTINCT session_id),
        'page_views', COUNT(*)
      ) as hourly_data
    FROM public.visitor_analytics
    WHERE visit_timestamp > now() - (days_back || ' days')::interval
    GROUP BY EXTRACT(HOUR FROM visit_timestamp)
  ) as hourly_agg;

  -- Combine all data into final result
  result := jsonb_build_object(
    'summary', summary_data,
    'locations', locations_data,
    'top_pages', top_pages_data,
    'session_journeys', session_journeys_data,
    'daily_trend', daily_trend_data,
    'hourly_distribution', hourly_distribution_data,
    'period_days', days_back
  );

  RETURN result;
END;
$$;