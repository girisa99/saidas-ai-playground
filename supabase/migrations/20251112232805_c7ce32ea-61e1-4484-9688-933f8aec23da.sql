-- Add is_enabled and api_key columns to genie_deployments table
ALTER TABLE genie_deployments
ADD COLUMN IF NOT EXISTS is_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS api_key TEXT UNIQUE;

-- Create index on api_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_genie_deployments_api_key ON genie_deployments(api_key);

-- Add deployment_id column to agent_conversations for tracking deployment usage
ALTER TABLE agent_conversations
ADD COLUMN IF NOT EXISTS deployment_id UUID REFERENCES genie_deployments(id) ON DELETE CASCADE;

-- Create index for deployment analytics
CREATE INDEX IF NOT EXISTS idx_agent_conversations_deployment_id ON agent_conversations(deployment_id);

COMMENT ON COLUMN genie_deployments.is_enabled IS 'Whether this deployment is enabled and can accept requests';
COMMENT ON COLUMN genie_deployments.api_key IS 'Unique API key for external authentication';
COMMENT ON COLUMN agent_conversations.deployment_id IS 'Reference to deployment if conversation came from deployed widget';