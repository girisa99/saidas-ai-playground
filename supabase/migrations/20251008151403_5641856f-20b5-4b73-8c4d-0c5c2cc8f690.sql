-- Create table for tracking Genie configuration analytics
CREATE TABLE IF NOT EXISTS public.genie_configuration_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  session_id UUID,
  mode TEXT NOT NULL CHECK (mode IN ('default', 'single', 'multi-agent')),
  selected_models JSONB,
  features_enabled JSONB,
  context TEXT CHECK (context IN ('technology', 'healthcare')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.genie_configuration_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting analytics (public can insert)
CREATE POLICY "Anyone can insert configuration analytics"
ON public.genie_configuration_analytics
FOR INSERT
WITH CHECK (true);

-- Create policy for reading analytics (admin only - would need auth setup)
CREATE POLICY "Service role can read configuration analytics"
ON public.genie_configuration_analytics
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_genie_config_analytics_email ON public.genie_configuration_analytics(user_email);
CREATE INDEX idx_genie_config_analytics_created_at ON public.genie_configuration_analytics(created_at DESC);
CREATE INDEX idx_genie_config_analytics_mode ON public.genie_configuration_analytics(mode);

-- Create table for A/B testing milestone configurations
CREATE TABLE IF NOT EXISTS public.genie_ab_test_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  variant_name TEXT NOT NULL UNIQUE,
  milestones INTEGER[] NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight INTEGER NOT NULL DEFAULT 50 CHECK (weight > 0 AND weight <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.genie_ab_test_config ENABLE ROW LEVEL SECURITY;

-- Create policy for reading A/B test config (public can read)
CREATE POLICY "Anyone can read AB test config"
ON public.genie_ab_test_config
FOR SELECT
USING (is_active = true);

-- Insert default A/B test variants
INSERT INTO public.genie_ab_test_config (variant_name, milestones, is_active, weight) VALUES
('variant_a', ARRAY[3, 5, 7], true, 50),
('variant_b', ARRAY[4, 8, 12], true, 50)
ON CONFLICT (variant_name) DO NOTHING;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_genie_ab_test_config_updated_at
BEFORE UPDATE ON public.genie_ab_test_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();