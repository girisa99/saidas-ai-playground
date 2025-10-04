-- Fix the get_genie_model_usage function to avoid nested aggregates
DROP FUNCTION IF EXISTS get_genie_model_usage(integer);

CREATE OR REPLACE FUNCTION get_genie_model_usage(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- First aggregate by model/provider, then build the final result
  WITH model_stats AS (
    SELECT 
      COALESCE(configuration_snapshot->>'model_name', 'unknown') as model_name,
      COALESCE(configuration_snapshot->>'model_provider', 'unknown') as provider,
      COUNT(*) as usage_count
    FROM genie_conversation_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    GROUP BY 
      COALESCE(configuration_snapshot->>'model_name', 'unknown'),
      COALESCE(configuration_snapshot->>'model_provider', 'unknown')
  )
  SELECT COALESCE(jsonb_agg(
    jsonb_build_object(
      'model', model_name,
      'provider', provider,
      'count', usage_count
    )
  ), '[]'::jsonb) INTO result
  FROM model_stats;
  
  RETURN result;
END;
$$;

-- Add function to get session analytics data
CREATE OR REPLACE FUNCTION get_session_analytics(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
  total_sessions integer;
BEGIN
  -- Calculate session metrics
  SELECT COUNT(DISTINCT session_id) INTO total_sessions
  FROM visitor_analytics
  WHERE created_at > now() - (days_back || ' days')::interval;

  WITH session_durations AS (
    SELECT 
      session_id,
      SUM(time_on_page) as total_duration
    FROM visitor_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    GROUP BY session_id
  ),
  duration_buckets AS (
    SELECT 
      CASE 
        WHEN total_duration < 30 THEN '0-30s'
        WHEN total_duration < 60 THEN '30-60s'
        WHEN total_duration < 180 THEN '1-3min'
        WHEN total_duration < 300 THEN '3-5min'
        ELSE '5min+'
      END as duration_range,
      COUNT(*) as session_count
    FROM session_durations
    GROUP BY duration_range
  ),
  hourly_sessions AS (
    SELECT 
      EXTRACT(HOUR FROM created_at) as hour,
      COUNT(DISTINCT session_id) as sessions
    FROM visitor_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    GROUP BY EXTRACT(HOUR FROM created_at)
    ORDER BY hour
  )
  SELECT jsonb_build_object(
    'total_sessions', total_sessions,
    'duration_distribution', COALESCE((SELECT jsonb_agg(jsonb_build_object(
      'range', duration_range,
      'count', session_count,
      'percentage', ROUND((session_count::numeric / NULLIF(total_sessions, 0) * 100)::numeric, 1)
    )) FROM duration_buckets), '[]'::jsonb),
    'hourly_distribution', COALESCE((SELECT jsonb_agg(jsonb_build_object(
      'hour', hour,
      'sessions', sessions
    )) FROM hourly_sessions), '[]'::jsonb)
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Add function to get user retention analytics
CREATE OR REPLACE FUNCTION get_retention_analytics(days_back integer DEFAULT 30)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  WITH visitor_frequency AS (
    SELECT 
      ip_address,
      COUNT(DISTINCT DATE(created_at)) as visit_days,
      MIN(created_at) as first_visit,
      MAX(created_at) as last_visit
    FROM visitor_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    GROUP BY ip_address
  )
  SELECT jsonb_build_object(
    'new_visitors', (SELECT COUNT(*) FROM visitor_frequency WHERE visit_days = 1),
    'returning_visitors', (SELECT COUNT(*) FROM visitor_frequency WHERE visit_days > 1),
    'total_unique_visitors', (SELECT COUNT(*) FROM visitor_frequency),
    'retention_rate', ROUND(
      (SELECT COUNT(*)::numeric FROM visitor_frequency WHERE visit_days > 1) / 
      NULLIF((SELECT COUNT(*)::numeric FROM visitor_frequency), 0) * 100, 
      1
    ),
    'avg_visits_per_user', ROUND(
      (SELECT AVG(visit_days) FROM visitor_frequency), 
      1
    )
  ) INTO result;
  
  RETURN result;
END;
$$;