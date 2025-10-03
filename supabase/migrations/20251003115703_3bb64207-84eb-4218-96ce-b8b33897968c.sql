-- Grant insert privileges for analytics table
GRANT INSERT ON public.genie_popup_analytics TO anon, authenticated;

-- Create RPC to fetch aggregated popup stats without exposing raw events
CREATE OR REPLACE FUNCTION public.get_genie_popup_stats(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE stats jsonb;
BEGIN
  SELECT jsonb_build_object(
    'popupClicks', COUNT(*) FILTER (WHERE event_type = 'popup_click' AND created_at > now() - (days_back || ' days')::interval),
    'privacyAccepted', COUNT(*) FILTER (WHERE event_type = 'privacy_accepted' AND created_at > now() - (days_back || ' days')::interval),
    'registrations', COUNT(*) FILTER (WHERE event_type = 'user_registered' AND created_at > now() - (days_back || ' days')::interval)
  ) INTO stats
  FROM public.genie_popup_analytics;

  RETURN COALESCE(stats, '{"popupClicks":0,"privacyAccepted":0,"registrations":0}'::jsonb);
END;
$$;