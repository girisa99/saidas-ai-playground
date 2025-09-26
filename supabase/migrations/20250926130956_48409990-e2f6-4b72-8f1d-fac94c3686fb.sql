-- Restore SECURITY DEFINER for public functions that need elevated privileges
-- These functions need SECURITY DEFINER because they're called from public contexts
-- (newsletter subscriptions, site analytics) without user authentication

-- Restore SECURITY DEFINER for update_site_stat function
CREATE OR REPLACE FUNCTION public.update_site_stat(stat_name_param text, increment_value integer DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.site_stats 
  SET 
    stat_value = stat_value + increment_value,
    updated_at = now()
  WHERE stat_name = stat_name_param;
  
  -- If no row was updated, insert a new one
  IF NOT FOUND THEN
    INSERT INTO public.site_stats (stat_name, stat_value) 
    VALUES (stat_name_param, GREATEST(0, increment_value));
  END IF;
END;
$function$;

-- Restore SECURITY DEFINER for update_subscriber_count function
CREATE OR REPLACE FUNCTION public.update_subscriber_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.is_active = true THEN
    PERFORM public.update_site_stat('total_subscribers', 1);
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_active = false AND NEW.is_active = true THEN
      PERFORM public.update_site_stat('total_subscribers', 1);
    ELSIF OLD.is_active = true AND NEW.is_active = false THEN
      PERFORM public.update_site_stat('total_subscribers', -1);
    END IF;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$function$;

-- Comment: These functions need SECURITY DEFINER because:
-- 1. update_site_stat is called by anonymous users for site analytics
-- 2. update_subscriber_count is triggered by newsletter subscriptions from anonymous users
-- They operate on public data (site_stats, newsletter_subscribers) that doesn't require user authentication