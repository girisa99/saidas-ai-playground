-- Create a table for storing application configuration (optional centralized config)
CREATE TABLE IF NOT EXISTS public.app_configuration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key TEXT NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  config_type TEXT NOT NULL DEFAULT 'string',
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_configuration ENABLE ROW LEVEL SECURITY;

-- Only admins can manage configuration
CREATE POLICY "Admins can manage app configuration"
  ON public.app_configuration
  FOR ALL
  USING (is_admin_user_safe(auth.uid()));

-- Public configs can be read by anyone
CREATE POLICY "Anyone can read public configurations"
  ON public.app_configuration
  FOR SELECT
  USING (is_public = true);

-- Insert Mapbox public token placeholder (you can update this value in the database)
INSERT INTO public.app_configuration (config_key, config_value, config_type, description, is_public)
VALUES (
  'mapbox_public_token',
  '',
  'string',
  'Mapbox public access token for interactive maps (pk.*)',
  true
)
ON CONFLICT (config_key) DO NOTHING;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_app_configuration_key ON public.app_configuration(config_key);

COMMENT ON TABLE public.app_configuration IS 'Centralized application configuration storage. Public configs are accessible to all users, private configs require admin access.';