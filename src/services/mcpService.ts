/**
 * MCP (Model Context Protocol) Service
 * 
 * Manages MCP server configurations, health monitoring, and context retrieval.
 * Uses official MCP SDK for proper protocol implementation.
 */

import { supabase } from '@/integrations/supabase/client';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

// Default local MCP servers that come pre-configured
export const DEFAULT_MCP_SERVERS = [
  {
    name: 'Filesystem MCP (Local)',
    endpoint_url: 'local://filesystem',
    authentication_type: 'none' as const,
    timeout_seconds: 30,
    description: 'Access local filesystem for file operations and knowledge retrieval',
    supported_domains: ['filesystem', 'documents', 'local_data'],
    is_active: false,
    metadata: {
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/tmp/mcp-data']
    }
  },
  {
    name: 'Memory MCP (Local)',
    endpoint_url: 'local://memory',
    authentication_type: 'none' as const,
    timeout_seconds: 30,
    description: 'In-memory key-value store for temporary context',
    supported_domains: ['memory', 'cache', 'session'],
    is_active: false,
    metadata: {
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-memory']
    }
  },
  {
    name: 'Postgres MCP (Supabase)',
    endpoint_url: 'local://postgres',
    authentication_type: 'none' as const,
    timeout_seconds: 30,
    description: 'Connect to Supabase Postgres database for structured data access',
    supported_domains: ['database', 'sql', 'structured_data'],
    is_active: false,
    metadata: {
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres']
    }
  }
];

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
      .from('mcp_servers' as any)
      .select('*')
      .eq('is_active', true);

    if (domain) {
      query = query.contains('supported_domains', [domain]);
    }

    const { data, error } = await query.order('name');

    if (error) throw error;
    return (data as any[]) || [];
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
      .from('agent_mcp_assignments' as any)
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
      .from('mcp_servers' as any)
      .insert(server as any)
      .select()
      .single();

    if (error) throw error;
    return data as any;
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
      .from('mcp_servers' as any)
      .update(updates as any)
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
      .from('mcp_servers' as any)
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
      .from('agent_mcp_assignments' as any)
      .insert({
        agent_id: agentId,
        mcp_server_id: mcpServerId,
        priority,
        is_enabled: true
      } as any);

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
      .from('agent_mcp_assignments' as any)
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
    await supabase.from('mcp_server_health' as any).insert({
      mcp_server_id: server.id,
      status,
      response_time_ms: responseTime
    } as any);

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
    await supabase.from('mcp_server_health' as any).insert({
      mcp_server_id: server.id,
      status: 'down',
      response_time_ms: responseTime,
      error_message: errorMessage
    } as any);

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
      .from('mcp_server_health' as any)
      .select('*')
      .eq('mcp_server_id', serverId)
      .order('checked_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data as any[]) || [];
  } catch (error) {
    console.error('Failed to fetch MCP health history:', error);
    return [];
  }
}

/**
 * Create MCP client for local servers using SDK
 */
async function createMCPClient(server: MCPServer): Promise<Client | null> {
  try {
    // Check if it's a local MCP server
    if (server.endpoint_url.startsWith('local://') && server.metadata?.transport === 'stdio') {
      const transport = new StdioClientTransport({
        command: server.metadata.command,
        args: server.metadata.args
      });

      const client = new Client(
        {
          name: server.name,
          version: '1.0.0'
        },
        {
          capabilities: {}
        }
      );

      await client.connect(transport);
      return client;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to create MCP client:', error);
    return null;
  }
}

/**
 * Retrieve context from an MCP server using SDK or HTTP
 */
export async function callMCPServer(
  server: MCPServer,
  query: string,
  context?: string
): Promise<MCPContextResult> {
  const startTime = Date.now();
  
  try {
    // Try SDK-based connection for local servers
    if (server.endpoint_url.startsWith('local://')) {
      const client = await createMCPClient(server);
      
      if (client) {
        try {
          // List available resources
          const resources = await client.listResources();
          
          // Call tools if available
          const tools = await client.listTools();
          
          const responseTime = Date.now() - startTime;
          
          return {
            server_id: server.id,
            server_name: server.name,
            context: {
              resources: resources.resources,
              tools: tools.tools,
              query,
              timestamp: new Date().toISOString()
            },
            response_time_ms: responseTime,
            success: true
          };
        } finally {
          await client.close();
        }
      }
    }

    // Fallback to HTTP for remote servers
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

/**
 * Initialize default MCP servers if not already created
 */
export async function initializeDefaultMCPServers(): Promise<void> {
  try {
    for (const defaultServer of DEFAULT_MCP_SERVERS) {
      // Check if server already exists
      const { data: existing } = await supabase
        .from('mcp_servers' as any)
        .select('id')
        .eq('name', defaultServer.name)
        .single();

      if (!existing) {
        await createMCPServer(defaultServer as any);
        console.log(`Created default MCP server: ${defaultServer.name}`);
      }
    }
  } catch (error) {
    console.error('Failed to initialize default MCP servers:', error);
  }
}
