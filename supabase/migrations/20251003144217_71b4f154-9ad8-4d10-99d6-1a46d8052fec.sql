-- Fix RPC functions to use correct column names

-- Update visitor analytics summary function
CREATE OR REPLACE FUNCTION public.get_visitor_analytics_summary(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'total_visitors', COALESCE(COUNT(DISTINCT session_id), 0),
    'total_page_views', COALESCE(COUNT(*), 0),
    'avg_time_on_page', COALESCE(AVG(time_on_page_seconds), 0),
    'unique_countries', COALESCE(COUNT(DISTINCT country) FILTER (WHERE country IS NOT NULL), 0),
    'geographic_distribution', COALESCE(
      (
        SELECT jsonb_agg(geo_data)
        FROM (
          SELECT 
            jsonb_build_object(
              'country', country,
              'region', region,
              'city', city,
              'visitors', COUNT(DISTINCT session_id)
            ) as geo_data
          FROM public.visitor_analytics
          WHERE visit_timestamp > now() - (days_back || ' days')::interval
          AND country IS NOT NULL
          GROUP BY country, region, city
          ORDER BY COUNT(DISTINCT session_id) DESC
        ) as geo_agg
      ),
      '[]'::jsonb
    )
  ) INTO result
  FROM public.visitor_analytics
  WHERE visit_timestamp > now() - (days_back || ' days')::interval;
  
  RETURN COALESCE(result, '{"total_visitors": 0, "total_page_views": 0, "avg_time_on_page": 0, "unique_countries": 0, "geographic_distribution": []}'::jsonb);
END;
$$;

-- Update genie conversations overview function
CREATE OR REPLACE FUNCTION public.get_genie_conversations_overview(days_back integer DEFAULT 7, limit_count integer DEFAULT 200)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT COALESCE(jsonb_agg(row_to_json(t)::jsonb), '[]'::jsonb) INTO result
  FROM (
    SELECT 
      id,
      user_email,
      user_name,
      conversation_id,
      session_name,
      messages,
      configuration_snapshot,
      is_active,
      context,
      ip_address,
      created_at,
      updated_at,
      session_start,
      session_end
    FROM public.genie_conversations
    WHERE created_at > now() - (days_back || ' days')::interval
    ORDER BY created_at DESC
    LIMIT limit_count
  ) t;
  
  RETURN result;
END;
$$;

-- Update recent popup events function
CREATE OR REPLACE FUNCTION public.get_recent_popup_events(days_back integer DEFAULT 7, limit_count integer DEFAULT 200)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT COALESCE(jsonb_agg(row_to_json(t)::jsonb), '[]'::jsonb) INTO result
  FROM (
    SELECT 
      id,
      event_type,
      user_email,
      event_data->>'user_name' as user_name,
      ip_address,
      event_data->>'geo_location' as geo_location,
      event_data as metadata,
      created_at
    FROM public.genie_popup_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    ORDER BY created_at DESC
    LIMIT limit_count
  ) t;
  
  RETURN result;
END;
$$;

-- Update genie model usage function
CREATE OR REPLACE FUNCTION public.get_genie_model_usage(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'model_provider', configuration_snapshot->>'provider',
        'model_name', configuration_snapshot->>'model',
        'usage_count', COUNT(*),
        'avg_tokens', AVG((metadata->>'tokens_used')::integer)
      )
    ) FILTER (WHERE configuration_snapshot->>'provider' IS NOT NULL),
    '[]'::jsonb
  ) INTO result
  FROM public.genie_conversations
  WHERE created_at > now() - (days_back || ' days')::interval
  GROUP BY configuration_snapshot->>'provider', configuration_snapshot->>'model';
  
  RETURN result;
END;
$$;