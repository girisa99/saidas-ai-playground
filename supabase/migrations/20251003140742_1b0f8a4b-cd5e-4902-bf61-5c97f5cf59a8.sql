-- Drop the existing function first
DROP FUNCTION IF EXISTS public.log_genie_popup_event(text, jsonb, text, text, text);

-- Recreate the function with proper return type
CREATE OR REPLACE FUNCTION public.log_genie_popup_event(
  p_event_type text,
  p_event_data jsonb DEFAULT '{}'::jsonb,
  p_user_email text DEFAULT NULL,
  p_context text DEFAULT NULL,
  p_ip_address text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _id uuid;
BEGIN
  INSERT INTO public.genie_popup_analytics (
    event_type,
    event_data,
    user_email,
    context,
    ip_address
  ) VALUES (
    p_event_type,
    COALESCE(p_event_data, '{}'::jsonb),
    p_user_email,
    p_context,
    p_ip_address
  )
  RETURNING id INTO _id;

  RETURN _id;
END;
$$;