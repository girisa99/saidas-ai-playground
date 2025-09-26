-- Create newsletter subscribers table (no auth required)
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscription_source TEXT DEFAULT 'website',
  preferences JSONB DEFAULT '{"frequency": "weekly", "topics": []}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter campaigns table
CREATE TABLE public.newsletter_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_name TEXT NOT NULL,
  template_data JSONB DEFAULT '{}'::jsonb,
  sent_at TIMESTAMP WITH TIME ZONE,
  total_subscribers INTEGER DEFAULT 0,
  total_sent INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email logs table
CREATE TABLE public.email_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES public.newsletter_subscribers(id),
  campaign_id UUID REFERENCES public.newsletter_campaigns(id),
  email_type TEXT NOT NULL, -- 'welcome', 'newsletter', 'unsubscribe_confirmation'
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent', -- 'sent', 'failed', 'bounced'
  error_message TEXT,
  template_used TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but make tables publicly accessible
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Public access policies (no authentication required)
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update their subscription" 
ON public.newsletter_subscribers 
FOR UPDATE 
TO anon, authenticated
USING (true);

CREATE POLICY "Anyone can view active subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Public access to campaigns" 
ON public.newsletter_campaigns 
FOR SELECT 
TO anon, authenticated
USING (true);

CREATE POLICY "System can log emails" 
ON public.email_logs 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can view email logs" 
ON public.email_logs 
FOR SELECT 
TO anon, authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_newsletter_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_newsletter_subscribers_updated_at
  BEFORE UPDATE ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_newsletter_updated_at();

CREATE TRIGGER update_newsletter_campaigns_updated_at
  BEFORE UPDATE ON public.newsletter_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION public.update_newsletter_updated_at();