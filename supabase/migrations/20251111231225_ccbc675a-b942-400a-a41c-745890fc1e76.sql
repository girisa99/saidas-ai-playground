-- Phase 3A: User-Scoped Deployment Management
-- Drop existing table if it exists
DROP TABLE IF EXISTS genie_deployments CASCADE;

-- Create genie_deployments table for saving and versioning Genie configurations
CREATE TABLE genie_deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  version integer NOT NULL DEFAULT 1,
  is_active boolean DEFAULT false,
  
  -- Configuration snapshots
  configuration jsonb NOT NULL,
  knowledge_base_snapshot jsonb,
  mcp_servers_snapshot jsonb,
  model_config jsonb,
  
  -- Deployment metadata
  deployment_status text DEFAULT 'draft' CHECK (deployment_status IN ('draft', 'active', 'archived')),
  deployed_at timestamptz,
  archived_at timestamptz,
  
  -- Version control
  parent_deployment_id uuid REFERENCES genie_deployments(id) ON DELETE SET NULL,
  changelog text,
  
  -- Performance metrics
  total_conversations integer DEFAULT 0,
  avg_confidence_score numeric(3,2),
  total_tokens_used bigint DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(user_id, name, version)
);

-- Enable RLS
ALTER TABLE genie_deployments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own deployments"
ON genie_deployments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own deployments"
ON genie_deployments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own deployments"
ON genie_deployments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own deployments"
ON genie_deployments FOR DELETE
USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_genie_deployments_user_id ON genie_deployments(user_id);
CREATE INDEX idx_genie_deployments_status ON genie_deployments(deployment_status);
CREATE INDEX idx_genie_deployments_active ON genie_deployments(user_id, is_active) WHERE is_active = true;

-- Trigger function for updated_at
CREATE OR REPLACE FUNCTION update_genie_deployments_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger
CREATE TRIGGER update_genie_deployments_updated_at
BEFORE UPDATE ON genie_deployments
FOR EACH ROW
EXECUTE FUNCTION update_genie_deployments_timestamp();

-- Activate deployment function
CREATE OR REPLACE FUNCTION activate_genie_deployment(
  p_deployment_id uuid,
  p_user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deployment RECORD;
BEGIN
  SELECT * INTO v_deployment
  FROM genie_deployments
  WHERE id = p_deployment_id AND user_id = p_user_id;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Deployment not found');
  END IF;
  
  UPDATE genie_deployments
  SET is_active = false
  WHERE user_id = p_user_id AND id != p_deployment_id;
  
  UPDATE genie_deployments
  SET 
    is_active = true,
    deployment_status = 'active',
    deployed_at = now()
  WHERE id = p_deployment_id;
  
  RETURN jsonb_build_object(
    'success', true,
    'deployment_id', p_deployment_id
  );
END;
$$;

-- Create version function
CREATE OR REPLACE FUNCTION create_deployment_version(
  p_parent_id uuid,
  p_name text,
  p_configuration jsonb,
  p_changelog text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_parent RECORD;
  v_new_version integer;
  v_new_id uuid;
BEGIN
  SELECT * INTO v_parent
  FROM genie_deployments
  WHERE id = p_parent_id AND user_id = auth.uid();
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Parent deployment not found';
  END IF;
  
  SELECT COALESCE(MAX(version), 0) + 1 INTO v_new_version
  FROM genie_deployments
  WHERE user_id = auth.uid() AND name = p_name;
  
  INSERT INTO genie_deployments (
    user_id,
    name,
    description,
    version,
    configuration,
    knowledge_base_snapshot,
    mcp_servers_snapshot,
    model_config,
    parent_deployment_id,
    changelog
  )
  VALUES (
    auth.uid(),
    p_name,
    v_parent.description,
    v_new_version,
    p_configuration,
    v_parent.knowledge_base_snapshot,
    v_parent.mcp_servers_snapshot,
    v_parent.model_config,
    p_parent_id,
    p_changelog
  )
  RETURNING id INTO v_new_id;
  
  RETURN v_new_id;
END;
$$;

-- Archive function
CREATE OR REPLACE FUNCTION archive_deployment(
  p_deployment_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE genie_deployments
  SET 
    deployment_status = 'archived',
    is_active = false,
    archived_at = now()
  WHERE id = p_deployment_id AND user_id = auth.uid();
  
  RETURN FOUND;
END;
$$;