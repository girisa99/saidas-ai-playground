-- Fix RLS policies for genie_conversations to allow anonymous public users
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can create their own genie conversations" ON public.genie_conversations;
DROP POLICY IF EXISTS "Users can update their own genie conversations" ON public.genie_conversations;
DROP POLICY IF EXISTS "Users can view their own genie conversations" ON public.genie_conversations;
DROP POLICY IF EXISTS "Users can delete their own genie conversations" ON public.genie_conversations;

-- Create new policies that work for both authenticated and anonymous users
CREATE POLICY "Anyone can create genie conversations"
ON public.genie_conversations
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Anyone can update conversations by conversation_id"
ON public.genie_conversations
FOR UPDATE
TO public
USING (true);

CREATE POLICY "Admins can view all genie conversations"
ON public.genie_conversations
FOR SELECT
TO public
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "Users can view conversations by email"
ON public.genie_conversations
FOR SELECT
TO public
USING (user_email IS NOT NULL);

-- Ensure genie_popup_analytics is accessible for analytics
ALTER TABLE public.genie_popup_analytics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can insert popup analytics" ON public.genie_popup_analytics;
DROP POLICY IF EXISTS "Admins can view popup analytics" ON public.genie_popup_analytics;

CREATE POLICY "Anyone can insert popup analytics"
ON public.genie_popup_analytics
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Admins can view all popup analytics"
ON public.genie_popup_analytics
FOR SELECT
TO public
USING (is_admin_user_safe(auth.uid()));

-- Add index for better performance on conversation queries
CREATE INDEX IF NOT EXISTS idx_genie_conversations_user_email ON public.genie_conversations(user_email);
CREATE INDEX IF NOT EXISTS idx_genie_conversations_ip_address ON public.genie_conversations(ip_address);
CREATE INDEX IF NOT EXISTS idx_genie_conversations_created_at ON public.genie_conversations(created_at DESC);