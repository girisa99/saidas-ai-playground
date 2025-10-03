-- RPCs for Admin Dashboard Popup Analytics

-- 1) Conversations overview
CREATE OR REPLACE FUNCTION public.get_genie_conversations_overview(days_back integer DEFAULT 7, limit_count integer DEFAULT 200)
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
      gc.metadata
    FROM public.genie_conversations gc
    WHERE gc.created_at > now() - (days_back || ' days')::interval
    ORDER BY gc.created_at DESC
    LIMIT limit_count
  ) t;
  RETURN result;
END;
$$;

-- 2) Access requests recent
CREATE OR REPLACE FUNCTION public.get_access_requests_recent(days_back integer DEFAULT 30, limit_count integer DEFAULT 200)
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
      ar.id,
      ar.user_email,
      ar.user_name,
      ar.request_reason,
      ar.status,
      ar.requested_at,
      ar.reviewed_at,
      ar.reviewed_by,
      ar.ip_address,
      ar.admin_notes,
      ar.updated_at,
      ar.created_at
    FROM public.access_requests ar
    WHERE ar.requested_at > now() - (days_back || ' days')::interval
    ORDER BY ar.requested_at DESC
    LIMIT limit_count
  ) t;
  RETURN result;
END;
$$;

-- 3) Model usage extracted from conversation messages
CREATE OR REPLACE FUNCTION public.get_genie_model_usage(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE result jsonb;
BEGIN
  SELECT COALESCE(jsonb_agg(obj), '[]'::jsonb) INTO result
  FROM (
    SELECT jsonb_build_object(
      'conversation_id', s.conversation_id,
      'provider', m.value->>'provider',
      'model', m.value->>'model',
      'timestamp', m.value->>'timestamp',
      'context', s.context,
      'session_name', s.session_name
    ) AS obj
    FROM (
      SELECT conversation_id, context, session_name, messages
      FROM public.genie_conversations
      WHERE created_at > now() - (days_back || ' days')::interval
    ) s,
    LATERAL jsonb_array_elements(s.messages) AS m(value)
    WHERE (m.value ? 'provider') AND (m.value ? 'model')
  ) sub;
  RETURN result;
END;
$$;

-- 4) Registration details from popup analytics
CREATE OR REPLACE FUNCTION public.get_genie_registration_details(days_back integer DEFAULT 30)
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
      gpa.user_email,
      COALESCE(gpa.event_data->>'user_name', NULL) AS user_name,
      COALESCE(gpa.context, gpa.event_data->>'context') AS context,
      COALESCE(gpa.ip_address, gpa.event_data->>'ip_address') AS ip_address,
      gpa.created_at
    FROM public.genie_popup_analytics gpa
    WHERE gpa.event_type = 'user_registered'
      AND gpa.created_at > now() - (days_back || ' days')::interval
    ORDER BY gpa.created_at DESC
  ) t;
  RETURN result;
END;
$$;

-- 5) Generic logger for popup events (avoids client-side RLS)
CREATE OR REPLACE FUNCTION public.log_genie_popup_event(
  p_event_type text,
  p_event_data jsonb,
  p_user_email text DEFAULT NULL,
  p_context text DEFAULT NULL,
  p_ip_address text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.genie_popup_analytics(event_type, event_data, user_email, context, ip_address, created_at)
  VALUES (p_event_type, COALESCE(p_event_data, '{}'::jsonb), p_user_email, p_context, p_ip_address, now());
END;
$$;