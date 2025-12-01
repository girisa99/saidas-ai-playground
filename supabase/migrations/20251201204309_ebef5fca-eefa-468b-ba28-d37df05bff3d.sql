-- Add optional agent_id to genie_deployments for hybrid architecture
-- This allows deployments to optionally inherit agent capabilities

ALTER TABLE genie_deployments
ADD COLUMN agent_id UUID REFERENCES agents(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX idx_genie_deployments_agent_id ON genie_deployments(agent_id);

-- Add comment explaining the hybrid approach
COMMENT ON COLUMN genie_deployments.agent_id IS 
  'Optional link to an agent. If NULL, deployment uses standalone conversational AI. 
   If set, deployment inherits agent actions, workflows, and advanced capabilities.';

-- Update trigger to handle agent-linked deployments
CREATE OR REPLACE FUNCTION update_deployment_with_agent_context()
RETURNS TRIGGER AS $$
BEGIN
  -- If agent_id is set, sync relevant agent configuration
  IF NEW.agent_id IS NOT NULL THEN
    -- Add agent reference to configuration metadata
    NEW.configuration = jsonb_set(
      COALESCE(NEW.configuration, '{}'::jsonb),
      '{linked_agent}',
      jsonb_build_object(
        'agent_id', NEW.agent_id,
        'linked_at', now(),
        'inheritance_mode', 'full'
      )
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_deployment_agent_context
  BEFORE INSERT OR UPDATE OF agent_id ON genie_deployments
  FOR EACH ROW
  WHEN (NEW.agent_id IS NOT NULL)
  EXECUTE FUNCTION update_deployment_with_agent_context();