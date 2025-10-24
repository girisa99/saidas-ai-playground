-- Fix rate limiter upsert error by adding required unique indexes
-- 1) Ensure unique index on conversation_sessions.ip_address for ON CONFLICT usage
CREATE UNIQUE INDEX IF NOT EXISTS idx_conversation_sessions_ip
ON public.conversation_sessions (ip_address);

-- 2) Ensure session_id uniqueness for tracking to prevent duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_conversation_tracking_session
ON public.conversation_tracking (session_id);
