-- Fix security vulnerabilities by restricting public access to conversation and email data

-- 1. Fix conversation_sessions policies to restrict access based on IP/session only
DROP POLICY IF EXISTS "Allow public read access to conversation_sessions" ON public.conversation_sessions;
DROP POLICY IF EXISTS "Allow public update to conversation_sessions" ON public.conversation_sessions;
DROP POLICY IF EXISTS "Allow public insert to conversation_sessions" ON public.conversation_sessions;

CREATE POLICY "Users can access only their IP-based sessions" 
ON public.conversation_sessions 
FOR ALL 
TO public
USING (
  -- For public users, allow access only to their own IP-based sessions
  (auth.uid() IS NULL AND ip_address = inet_client_addr()) OR
  -- For authenticated users, allow access to sessions with matching email
  (auth.uid() IS NOT NULL AND user_email IS NOT NULL AND 
   EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = conversation_sessions.user_email))
);

-- 2. Fix conversation_tracking policies to restrict access based on IP/session only
DROP POLICY IF EXISTS "Allow public read access to conversation_tracking" ON public.conversation_tracking;
DROP POLICY IF EXISTS "Allow public update to conversation_tracking" ON public.conversation_tracking;
DROP POLICY IF EXISTS "Allow public insert to conversation_tracking" ON public.conversation_tracking;

CREATE POLICY "Users can access only their IP-based tracking" 
ON public.conversation_tracking 
FOR ALL 
TO public
USING (
  -- For public users, allow access only to their own IP-based tracking
  (auth.uid() IS NULL AND ip_address = inet_client_addr()) OR
  -- For authenticated users, allow access to their email-based tracking
  (auth.uid() IS NOT NULL AND user_email IS NOT NULL AND 
   EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND email = conversation_tracking.user_email))
);

-- 3. Fix email_logs to prevent public access to email addresses
DROP POLICY IF EXISTS "Public can view email logs" ON public.email_logs;
DROP POLICY IF EXISTS "System can log emails" ON public.email_logs;

CREATE POLICY "Only admins can view email logs" 
ON public.email_logs 
FOR SELECT 
TO authenticated
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "System can log emails for tracking" 
ON public.email_logs 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- 4. Fix received_emails to prevent exposure of email content
DROP POLICY IF EXISTS "Authenticated users can view received emails" ON public.received_emails;
DROP POLICY IF EXISTS "Authenticated users can update received emails" ON public.received_emails;
DROP POLICY IF EXISTS "System can insert received emails" ON public.received_emails;

CREATE POLICY "Only admins can manage received emails" 
ON public.received_emails 
FOR ALL 
TO authenticated
USING (is_admin_user_safe(auth.uid()));

-- 5. Fix public_conversations to be session-specific
DROP POLICY IF EXISTS "Public conversations accessible" ON public.public_conversations;

CREATE POLICY "Session-specific public conversations" 
ON public.public_conversations 
FOR ALL 
TO public
USING (
  -- Allow access only to conversations from the same IP/session
  ip_address = inet_client_addr()
);