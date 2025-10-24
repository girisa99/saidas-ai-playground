-- Drop existing non-unique indexes and create proper unique constraints
-- 1) Fix conversation_sessions to support ON CONFLICT on ip_address
DROP INDEX IF EXISTS public.idx_conversation_sessions_ip;
CREATE UNIQUE INDEX idx_conversation_sessions_ip_unique 
ON public.conversation_sessions (ip_address);

-- 2) Fix conversation_tracking to support proper session_id uniqueness
DROP INDEX IF EXISTS public.idx_conversation_tracking_session;
CREATE UNIQUE INDEX idx_conversation_tracking_session_unique 
ON public.conversation_tracking (session_id);

-- Note: These unique indexes allow the upsert operations with ON CONFLICT to work properly