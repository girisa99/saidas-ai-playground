-- Create missing RPC functions for admin analytics

-- Function to get visitor analytics summary
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
    'total_visitors', COALESCE(COUNT(DISTINCT visitor_id), 0),
    'total_page_views', COALESCE(COUNT(*), 0),
    'avg_time_on_page', COALESCE(AVG(EXTRACT(EPOCH FROM (updated_at - created_at))), 0),
    'unique_countries', COALESCE(COUNT(DISTINCT geo_location->>'country'), 0),
    'geographic_distribution', COALESCE(
      jsonb_agg(
        jsonb_build_object(
          'country', geo_location->>'country',
          'region', geo_location->>'region',
          'city', geo_location->>'city',
          'visitors', COUNT(DISTINCT visitor_id)
        )
      ) FILTER (WHERE geo_location IS NOT NULL),
      '[]'::jsonb
    )
  ) INTO result
  FROM public.visitor_analytics
  WHERE created_at > now() - (days_back || ' days')::interval;
  
  RETURN COALESCE(result, '{}'::jsonb);
END;
$$;

-- Function to get genie conversations overview
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
      conversation_id,
      session_name,
      messages,
      ai_model_provider,
      ai_model_name,
      conversation_status,
      created_at,
      updated_at
    FROM public.genie_conversations
    WHERE created_at > now() - (days_back || ' days')::interval
    ORDER BY created_at DESC
    LIMIT limit_count
  ) t;
  
  RETURN result;
END;
$$;

-- Function to get recent popup events
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
      user_name,
      ip_address,
      geo_location,
      metadata,
      created_at
    FROM public.genie_popup_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    ORDER BY created_at DESC
    LIMIT limit_count
  ) t;
  
  RETURN result;
END;
$$;

-- Function to get genie model usage
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
        'model_provider', ai_model_provider,
        'model_name', ai_model_name,
        'usage_count', COUNT(*),
        'avg_tokens', AVG((metadata->>'tokens_used')::integer)
      )
    ),
    '[]'::jsonb
  ) INTO result
  FROM public.genie_conversations
  WHERE created_at > now() - (days_back || ' days')::interval
  AND ai_model_provider IS NOT NULL
  GROUP BY ai_model_provider, ai_model_name;
  
  RETURN result;
END;
$$;