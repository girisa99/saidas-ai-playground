/**
 * MCP (Model Context Protocol) Service
 * 
 * Manages MCP server configurations, health monitoring, and context retrieval.
 * Enables AI models to access external context from various sources.
 */

import { supabase } from '@/integrations/supabase/client';

export interface MCPServer {
  id: string;
  name: string;
  endpoint_url: string;
  authentication_type: 'none' | 'api_key' | 'oauth' | 'bearer';
  api_key?: string;
  is_active: boolean;
  health_check_url?: string;
  timeout_seconds: number;
  description?: string;
  supported_domains?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface MCPHealthStatus {
  server_id: string;
  status: 'healthy' | 'degraded' | 'down';
  response_time_ms: number;
  error_message?: string;
  checked_at: string;
}

export interface MCPContextResult {
  server_id: string;
  server_name: string;
  context: any;
  response_time_ms: number;
  success: boolean;
  error?: string;
}

/**
 * Fetch all active MCP servers
 */
export async function getActiveMCPServers(domain?: string): Promise<MCPServer[]> {
  try {
    let query = supabase
      .from('mcp_servers')
      .select('*')
      .eq('is_active', true);

    if (domain) {
      query = query.contains('supported_domains', [domain]);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch MCP servers:', error);
    return [];
  }
}

/**
 * Get MCP servers assigned to a specific agent
 */
export async function getAgentMCPServers(agentId: string): Promise<MCPServer[]> {
  try {
    const { data, error } = await supabase
      .from('agent_mcp_assignments')
      .select(`
        mcp_server:mcp_servers(*)
      `)
      .eq('agent_id', agentId)
      .eq('is_enabled', true)
      .order('priority');

    if (error) throw error;
    
    return data?.map((d: any) => d.mcp_server).filter(Boolean) || [];
  } catch (error) {
    console.error('Failed to fetch agent MCP servers:', error);
    return [];
  }
}

/**
 * Create a new MCP server configuration
 */
export async function createMCPServer(server: Omit<MCPServer, 'id' | 'created_at' | 'updated_at'>): Promise<MCPServer | null> {
  try {
    const { data, error } = await supabase
      .from('mcp_servers')
      .insert(server)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to create MCP server:', error);
    return null;
  }
}

/**
 * Update an existing MCP server
 */
export async function updateMCPServer(id: string, updates: Partial<MCPServer>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('mcp_servers')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to update MCP server:', error);
    return false;
  }
}

/**
 * Delete an MCP server
 */
export async function deleteMCPServer(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('mcp_servers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to delete MCP server:', error);
    return false;
  }
}

/**
 * Assign an MCP server to an agent
 */
export async function assignMCPToAgent(
  agentId: string,
  mcpServerId: string,
  priority: number = 1
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('agent_mcp_assignments')
      .insert({
        agent_id: agentId,
        mcp_server_id: mcpServerId,
        priority,
        is_enabled: true
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to assign MCP to agent:', error);
    return false;
  }
}

/**
 * Remove MCP server assignment from agent
 */
export async function removeMCPFromAgent(agentId: string, mcpServerId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('agent_mcp_assignments')
      .delete()
      .eq('agent_id', agentId)
      .eq('mcp_server_id', mcpServerId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to remove MCP from agent:', error);
    return false;
  }
}

/**
 * Check health status of an MCP server
 */
export async function checkMCPServerHealth(server: MCPServer): Promise<MCPHealthStatus> {
  const startTime = Date.now();
  
  try {
    const healthUrl = server.health_check_url || `${server.endpoint_url}/health`;
    const headers: Record<string, string> = {};
    
    if (server.authentication_type === 'api_key' && server.api_key) {
      headers['Authorization'] = `Bearer ${server.api_key}`;
    }

    const response = await fetch(healthUrl, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(server.timeout_seconds * 1000)
    });

    const responseTime = Date.now() - startTime;
    const status = response.ok ? 'healthy' : 'degraded';

    // Log health check
    await supabase.from('mcp_server_health').insert({
      mcp_server_id: server.id,
      status,
      response_time_ms: responseTime
    });

    return {
      server_id: server.id,
      status,
      response_time_ms: responseTime,
      checked_at: new Date().toISOString()
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Log failed health check
    await supabase.from('mcp_server_health').insert({
      mcp_server_id: server.id,
      status: 'down',
      response_time_ms: responseTime,
      error_message: errorMessage
    });

    return {
      server_id: server.id,
      status: 'down',
      response_time_ms: responseTime,
      error_message: errorMessage,
      checked_at: new Date().toISOString()
    };
  }
}

/**
 * Get recent health history for an MCP server
 */
export async function getMCPHealthHistory(serverId: string, limit: number = 10): Promise<MCPHealthStatus[]> {
  try {
    const { data, error } = await supabase
      .from('mcp_server_health')
      .select('*')
      .eq('mcp_server_id', serverId)
      .order('checked_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to fetch MCP health history:', error);
    return [];
  }
}

/**
 * Retrieve context from an MCP server (called by edge function)
 */
export async function callMCPServer(
  server: MCPServer,
  query: string,
  context?: string
): Promise<MCPContextResult> {
  const startTime = Date.now();
  
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    if (server.authentication_type === 'api_key' && server.api_key) {
      headers['Authorization'] = `Bearer ${server.api_key}`;
    } else if (server.authentication_type === 'bearer' && server.api_key) {
      headers['Authorization'] = `Bearer ${server.api_key}`;
    }

    const response = await fetch(server.endpoint_url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        context,
        metadata: server.metadata
      }),
      signal: AbortSignal.timeout(server.timeout_seconds * 1000)
    });

    const responseTime = Date.now() - startTime;

    if (!response.ok) {
      throw new Error(`MCP server returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      server_id: server.id,
      server_name: server.name,
      context: data,
      response_time_ms: responseTime,
      success: true
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    console.error(`MCP server ${server.name} call failed:`, errorMessage);

    return {
      server_id: server.id,
      server_name: server.name,
      context: null,
      response_time_ms: responseTime,
      success: false,
      error: errorMessage
    };
  }
}
