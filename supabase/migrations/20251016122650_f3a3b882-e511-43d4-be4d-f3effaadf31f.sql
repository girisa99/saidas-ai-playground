-- Create app_configuration table for storing application-level settings
CREATE TABLE IF NOT EXISTS public.app_configuration (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key TEXT NOT NULL UNIQUE,
  config_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_configuration ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read public configuration
CREATE POLICY "Anyone can read app configuration"
  ON public.app_configuration
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can insert/update configuration
CREATE POLICY "Authenticated users can manage app configuration"
  ON public.app_configuration
  FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_app_configuration_key 
  ON public.app_configuration(config_key);

-- Add trigger to update updated_at
CREATE OR REPLACE FUNCTION update_app_configuration_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER app_configuration_updated_at
  BEFORE UPDATE ON public.app_configuration
  FOR EACH ROW
  EXECUTE FUNCTION update_app_configuration_updated_at();