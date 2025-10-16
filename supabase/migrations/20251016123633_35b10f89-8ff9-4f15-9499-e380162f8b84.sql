-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can manage app configuration" ON public.app_configuration;

-- Create separate policies for better control
CREATE POLICY "Anyone can upsert public configuration"
  ON public.app_configuration
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update public configuration"
  ON public.app_configuration
  FOR UPDATE
  USING (true)
  WITH CHECK (true);