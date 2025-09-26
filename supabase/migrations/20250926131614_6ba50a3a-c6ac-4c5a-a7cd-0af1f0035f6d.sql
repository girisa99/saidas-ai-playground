-- Fix Security Definer View findings by switching views to SECURITY INVOKER
-- This ensures views execute with the caller's privileges and respect RLS
-- PostgreSQL 15+ syntax for setting security mode on views

-- Check and update consolidated_node_catalog view
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'consolidated_node_catalog'
  ) THEN
    EXECUTE 'ALTER VIEW public.consolidated_node_catalog SET (security_invoker = on)';
    COMMENT ON VIEW public.consolidated_node_catalog IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
  END IF;
END$$;

-- Check and update index_usage_stats view  
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'index_usage_stats'
  ) THEN
    EXECUTE 'ALTER VIEW public.index_usage_stats SET (security_invoker = on)';
    COMMENT ON VIEW public.index_usage_stats IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
  END IF;
END$$;

-- Check and update unused_index_candidates view
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'unused_index_candidates'
  ) THEN
    EXECUTE 'ALTER VIEW public.unused_index_candidates SET (security_invoker = on)';
    COMMENT ON VIEW public.unused_index_candidates IS 'SECURITY INVOKER: executes with caller privileges to respect RLS';
  END IF;
END$$;