-- Create site_stats table for tracking likes and subscriber count
CREATE TABLE public.site_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_name TEXT NOT NULL UNIQUE,
  stat_value INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  name TEXT,
  feedback_type TEXT NOT NULL, -- 'general', 'feature_request', 'bug_report', 'testimonial'
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public access policies for site stats (read-only)
CREATE POLICY "Anyone can view site stats" 
ON public.site_stats 
FOR SELECT 
TO anon, authenticated
USING (true);

-- Public access policies for feedback (insert only)
CREATE POLICY "Anyone can submit feedback" 
ON public.feedback 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can view public feedback" 
ON public.feedback 
FOR SELECT 
TO anon, authenticated
USING (feedback_type = 'testimonial');

-- Initialize default stats
INSERT INTO public.site_stats (stat_name, stat_value) VALUES 
('total_subscribers', 0),
('total_likes', 0),
('total_dislikes', 0)
ON CONFLICT (stat_name) DO NOTHING;

-- Create function to update stats
CREATE OR REPLACE FUNCTION public.update_site_stat(stat_name_param TEXT, increment_value INTEGER DEFAULT 1)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Create trigger to update subscriber count
CREATE OR REPLACE FUNCTION public.update_subscriber_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Attach trigger to newsletter_subscribers table
CREATE TRIGGER update_subscriber_count_trigger
  AFTER INSERT OR UPDATE ON public.newsletter_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_subscriber_count();

-- Create function to update feedback timestamp
CREATE OR REPLACE FUNCTION public.update_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for feedback timestamp updates
CREATE TRIGGER update_feedback_updated_at
  BEFORE UPDATE ON public.feedback
  FOR EACH ROW
  EXECUTE FUNCTION public.update_feedback_updated_at();