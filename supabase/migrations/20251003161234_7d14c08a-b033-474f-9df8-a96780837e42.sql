-- Fix RPC ambiguity causing 500 errors in conversation-rate-limiter
-- Drop the overloaded function using inet that conflicts with the text version
DROP FUNCTION IF EXISTS public.check_conversation_limits(p_ip_address inet, p_user_email text);