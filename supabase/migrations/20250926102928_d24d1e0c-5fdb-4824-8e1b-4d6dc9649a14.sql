-- Create email management tables for complete email system

-- Table for storing email templates
CREATE TABLE public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  template_variables JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Table for storing sent emails
CREATE TABLE public.sent_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email TEXT NOT NULL,
  to_emails TEXT[] NOT NULL,
  cc_emails TEXT[],
  bcc_emails TEXT[],
  subject TEXT NOT NULL,
  html_content TEXT,
  text_content TEXT,
  template_id UUID REFERENCES email_templates(id),
  template_variables JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE,
  delivery_status TEXT,
  error_message TEXT,
  external_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table for storing received emails
CREATE TABLE public.received_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email TEXT NOT NULL,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  html_content TEXT,
  text_content TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  headers JSONB DEFAULT '{}',
  raw_email TEXT,
  message_id TEXT UNIQUE,
  in_reply_to TEXT,
  thread_id TEXT,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  processed_at TIMESTAMP WITH TIME ZONE,
  processing_status TEXT DEFAULT 'pending'
);

-- Table for email conversations/threads
CREATE TABLE public.email_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  participants TEXT[] NOT NULL,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  message_count INTEGER DEFAULT 0,
  is_archived BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sent_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.received_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for email_templates
CREATE POLICY "Users can view all email templates" ON public.email_templates
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create email templates" ON public.email_templates
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their email templates" ON public.email_templates
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their email templates" ON public.email_templates
  FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for sent_emails
CREATE POLICY "Users can view their sent emails" ON public.sent_emails
  FOR SELECT USING (auth.uid() = user_id OR is_admin_user_safe(auth.uid()));

CREATE POLICY "Users can create sent email records" ON public.sent_emails
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their sent emails" ON public.sent_emails
  FOR UPDATE USING (auth.uid() = user_id OR is_admin_user_safe(auth.uid()));

-- RLS Policies for received_emails
CREATE POLICY "Authenticated users can view received emails" ON public.received_emails
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "System can insert received emails" ON public.received_emails
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update received emails" ON public.received_emails
  FOR UPDATE USING (auth.uid() IS NOT NULL);

-- RLS Policies for email_conversations
CREATE POLICY "Authenticated users can view email conversations" ON public.email_conversations
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "System can manage email conversations" ON public.email_conversations
  FOR ALL USING (true);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON public.email_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sent_emails_updated_at
    BEFORE UPDATE ON public.sent_emails
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_conversations_updated_at
    BEFORE UPDATE ON public.email_conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_sent_emails_user_id ON public.sent_emails(user_id);
CREATE INDEX idx_sent_emails_status ON public.sent_emails(status);
CREATE INDEX idx_received_emails_to_email ON public.received_emails(to_email);
CREATE INDEX idx_received_emails_thread_id ON public.received_emails(thread_id);
CREATE INDEX idx_email_conversations_thread_id ON public.email_conversations(thread_id);