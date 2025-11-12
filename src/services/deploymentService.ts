import { supabase } from "@/integrations/supabase/client";

export interface GenieDeployment {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  version: number;
  is_active: boolean;
  is_enabled: boolean; // Whether deployment can accept requests
  api_key?: string; // API key for external authentication
  configuration: any;
  knowledge_base_snapshot?: any;
  mcp_servers_snapshot?: any;
  model_config?: any;
  deployment_status: 'draft' | 'active' | 'archived';
  deployed_at?: string;
  archived_at?: string;
  last_used_at?: string; // Last time deployment was used
  parent_deployment_id?: string;
  changelog?: string;
  total_conversations: number;
  avg_confidence_score?: number;
  total_tokens_used: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get all deployments for the current user
 */
export async function getUserDeployments(
  status?: 'draft' | 'active' | 'archived'
): Promise<GenieDeployment[]> {
  let query = supabase
    .from('genie_deployments')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('deployment_status', status);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching deployments:', error);
    throw error;
  }

  return (data || []) as GenieDeployment[];
}

/**
 * Get a specific deployment by ID
 */
export async function getDeployment(deploymentId: string): Promise<GenieDeployment | null> {
  const { data, error } = await supabase
    .from('genie_deployments')
    .select('*')
    .eq('id', deploymentId)
    .single();

  if (error) {
    console.error('Error fetching deployment:', error);
    return null;
  }

  return data as GenieDeployment;
}

/**
 * Get the active deployment for the current user
 */
export async function getActiveDeployment(): Promise<GenieDeployment | null> {
  const { data, error } = await supabase
    .from('genie_deployments')
    .select('*')
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No active deployment found
      return null;
    }
    console.error('Error fetching active deployment:', error);
    return null;
  }

  return data as GenieDeployment;
}

/**
 * Create a new deployment
 */
export async function createDeployment(deployment: {
  name: string;
  description?: string;
  configuration: any;
  knowledge_base_snapshot?: any;
  mcp_servers_snapshot?: any;
  model_config?: any;
}): Promise<GenieDeployment | null> {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user?.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('genie_deployments')
    .insert({
      user_id: user.user.id,
      name: deployment.name,
      description: deployment.description,
      configuration: deployment.configuration,
      knowledge_base_snapshot: deployment.knowledge_base_snapshot,
      mcp_servers_snapshot: deployment.mcp_servers_snapshot,
      model_config: deployment.model_config,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating deployment:', error);
    throw error;
  }

  return data as GenieDeployment;
}

/**
 * Update a deployment
 */
export async function updateDeployment(
  deploymentId: string,
  updates: Partial<Omit<GenieDeployment, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<GenieDeployment | null> {
  const { data, error} = await supabase
    .from('genie_deployments')
    .update(updates)
    .eq('id', deploymentId)
    .select()
    .single();

  if (error) {
    console.error('Error updating deployment:', error);
    throw error;
  }

  return data as GenieDeployment;
}

/**
 * Activate a deployment (deactivates all others)
 */
export async function activateDeployment(deploymentId: string): Promise<boolean> {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user?.user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase.rpc('activate_genie_deployment', {
    p_deployment_id: deploymentId,
    p_user_id: user.user.id,
  });

  if (error) {
    console.error('Error activating deployment:', error);
    throw error;
  }

  return (data as any)?.success || false;
}

/**
 * Create a new version of a deployment
 */
export async function createDeploymentVersion(
  parentId: string,
  name: string,
  configuration: any,
  changelog?: string
): Promise<string | null> {
  const { data, error } = await supabase.rpc('create_deployment_version', {
    p_parent_id: parentId,
    p_name: name,
    p_configuration: configuration,
    p_changelog: changelog,
  });

  if (error) {
    console.error('Error creating deployment version:', error);
    throw error;
  }

  return data;
}

/**
 * Archive a deployment
 */
export async function archiveDeployment(deploymentId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('archive_deployment', {
    p_deployment_id: deploymentId,
  });

  if (error) {
    console.error('Error archiving deployment:', error);
    throw error;
  }

  return data || false;
}

/**
 * Delete a deployment
 */
export async function deleteDeployment(deploymentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('genie_deployments')
    .delete()
    .eq('id', deploymentId);

  if (error) {
    console.error('Error deleting deployment:', error);
    throw error;
  }

  return true;
}

/**
 * Get deployment version history
 */
export async function getDeploymentVersionHistory(
  deploymentName: string
): Promise<GenieDeployment[]> {
  const { data, error } = await supabase
    .from('genie_deployments')
    .select('*')
    .eq('name', deploymentName)
    .order('version', { ascending: false });

  if (error) {
    console.error('Error fetching version history:', error);
    throw error;
  }

  return (data || []) as GenieDeployment[];
}

/**
 * Get deployment analytics
 */
export async function getDeploymentAnalytics(
  deploymentId: string
): Promise<{
  total_conversations: number;
  avg_confidence_score: number;
  total_tokens_used: number;
} | null> {
  const { data, error } = await supabase
    .from('genie_deployments')
    .select('total_conversations, avg_confidence_score, total_tokens_used')
    .eq('id', deploymentId)
    .single();

  if (error) {
    console.error('Error fetching deployment analytics:', error);
    return null;
  }

  return data;
}

/**
 * Clone a deployment
 */
export async function cloneDeployment(
  deploymentId: string,
  newName: string
): Promise<GenieDeployment | null> {
  const original = await getDeployment(deploymentId);
  
  if (!original) {
    throw new Error('Deployment not found');
  }

  return createDeployment({
    name: newName,
    description: `Cloned from ${original.name}`,
    configuration: original.configuration,
    knowledge_base_snapshot: original.knowledge_base_snapshot,
    mcp_servers_snapshot: original.mcp_servers_snapshot,
    model_config: original.model_config,
  });
}
