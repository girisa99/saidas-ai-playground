-- Fix RPC function to show all conversations for admins
-- This replaces the existing function with admin bypass
CREATE OR REPLACE FUNCTION public.get_genie_conversations_overview(days_back integer DEFAULT 7, limit_count integer DEFAULT 200)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE result jsonb;
BEGIN
  -- Return all conversations for admin dashboard (bypass RLS via SECURITY DEFINER)
  SELECT COALESCE(jsonb_agg(row_to_json(t)::jsonb), '[]'::jsonb) INTO result
  FROM (
    SELECT 
      gc.id,
      gc.conversation_id,
      gc.user_email,
      gc.user_name,
      gc.session_name,
      gc.context,
      gc.messages,
      gc.is_active,
      gc.session_start,
      gc.session_end,
      gc.ip_address,
      gc.updated_at,
      gc.created_at,
      gc.metadata,
      gc.configuration_snapshot
    FROM public.genie_conversations gc
    WHERE gc.created_at > now() - (days_back || ' days')::interval
    ORDER BY gc.created_at DESC
    LIMIT limit_count
  ) t;
  RETURN result;
END;
$$;

-- Also create a function to get recent popup events for better tracking
CREATE OR REPLACE FUNCTION public.get_recent_popup_events(days_back integer DEFAULT 7, limit_count integer DEFAULT 200)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE result jsonb;
BEGIN
  SELECT COALESCE(jsonb_agg(row_to_json(t)::jsonb), '[]'::jsonb) INTO result
  FROM (
    SELECT 
      id,
      event_type,
      user_email,
      ip_address,
      context,
      event_data,
      created_at
    FROM public.genie_popup_analytics
    WHERE created_at > now() - (days_back || ' days')::interval
    ORDER BY created_at DESC
    LIMIT limit_count
  ) t;
  RETURN result;
END;
$$;