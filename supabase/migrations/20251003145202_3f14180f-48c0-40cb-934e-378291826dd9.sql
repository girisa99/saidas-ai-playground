-- Align get_recent_popup_events shape with frontend expectations
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
      context,
      ip_address,
      user_agent,
      page_url,
      event_data,          -- keep original payload as event_data for UI
      created_at
    FROM public.genie_popup_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    ORDER BY created_at DESC
    LIMIT limit_count
  ) t;
  
  RETURN result;
END;
$$;