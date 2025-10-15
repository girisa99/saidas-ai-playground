-- Fix get_genie_model_usage and get_session_analytics to use existing columns

-- Fix get_genie_model_usage: use metadata instead of configuration_snapshot
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
  -- Extract model usage from metadata field instead of configuration_snapshot
  WITH model_stats AS (
    SELECT 
      COALESCE(metadata->>'model_name', 'unknown') as model_name,
      COALESCE(metadata->>'model_provider', 'unknown') as provider,
      COUNT(*) as usage_count
    FROM genie_conversation_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    GROUP BY 
      COALESCE(metadata->>'model_name', 'unknown'),
      COALESCE(metadata->>'model_provider', 'unknown')
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

-- Fix get_session_analytics: remove time_on_page references
DROP FUNCTION IF EXISTS get_session_analytics(integer);

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
  -- Calculate session metrics without time_on_page
  SELECT COUNT(DISTINCT session_id) INTO total_sessions
  FROM visitor_analytics
  WHERE created_at > now() - (days_back || ' days')::interval;

  WITH hourly_sessions AS (
    SELECT 
      EXTRACT(HOUR FROM created_at) as hour,
      COUNT(DISTINCT session_id) as sessions
    FROM visitor_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    GROUP BY EXTRACT(HOUR FROM created_at)
    ORDER BY hour
  ),
  page_views AS (
    SELECT 
      COUNT(*) as total_views,
      COUNT(DISTINCT session_id) as unique_sessions
    FROM visitor_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
  )
  SELECT jsonb_build_object(
    'total_sessions', total_sessions,
    'total_page_views', (SELECT total_views FROM page_views),
    'avg_pages_per_session', ROUND((SELECT total_views::numeric / NULLIF(unique_sessions, 0) FROM page_views), 1),
    'hourly_distribution', COALESCE((SELECT jsonb_agg(jsonb_build_object(
      'hour', hour,
      'sessions', sessions
    )) FROM hourly_sessions), '[]'::jsonb)
  ) INTO result;
  
  RETURN result;
END;
$$;