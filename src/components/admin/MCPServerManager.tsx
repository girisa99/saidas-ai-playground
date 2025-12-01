/**
 * MCP Server Manager
 * 
 * Admin interface for managing Model Context Protocol (MCP) servers.
 * Allows configuration, health monitoring, and assignment to agents.
 */

import { useState, useEffect } from 'react';
import { Plus, Server, Activity, Settings, Trash2, Play, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  getActiveMCPServers,
  createMCPServer,
  updateMCPServer,
  deleteMCPServer,
  checkMCPServerHealth,
  callMCPServer,
  initializeDefaultMCPServers,
  DEFAULT_MCP_SERVERS,
  type MCPServer,
  type MCPHealthStatus
} from '@/services/mcpService';

export function MCPServerManager() {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<MCPServer | null>(null);
  const [testingServer, setTestingServer] = useState<MCPServer | null>(null);
  const [healthStatus, setHealthStatus] = useState<Record<string, MCPHealthStatus>>({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    endpoint_url: '',
    authentication_type: 'none' as 'none' | 'api_key' | 'oauth' | 'bearer',
    api_key: '',
    health_check_url: '',
    timeout_seconds: 30,
    description: '',
    supported_domains: '',
    is_active: true
  });

  const [testFormData, setTestFormData] = useState({
    query: '',
    context: '',
    result: null as any,
    error: null as string | null,
    loading: false
  });

  useEffect(() => {
    initializeDefaults();
  }, []);

  const initializeDefaults = async () => {
    await initializeDefaultMCPServers();
    await loadServers();
  };

  const loadServers = async () => {
    try {
      setLoading(true);
      const data = await getActiveMCPServers();
      setServers(data);
      toast.success('MCP servers loaded successfully');
    } catch (error) {
      console.error('Failed to load MCP servers:', error);
      toast.error('Failed to load MCP servers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const serverData = {
        name: formData.name,
        endpoint_url: formData.endpoint_url,
        authentication_type: formData.authentication_type,
        api_key: formData.api_key || undefined,
        health_check_url: formData.health_check_url || undefined,
        timeout_seconds: formData.timeout_seconds,
        description: formData.description || undefined,
        supported_domains: formData.supported_domains 
          ? formData.supported_domains.split(',').map(d => d.trim()).filter(Boolean)
          : undefined,
        is_active: formData.is_active,
        metadata: {}
      };

      if (editingServer) {
        const success = await updateMCPServer(editingServer.id, serverData);
        if (success) {
          toast.success('MCP server updated successfully');
          await loadServers();
        } else {
          toast.error('Failed to update MCP server');
        }
      } else {
        const newServer = await createMCPServer(serverData as any);
        if (newServer) {
          toast.success('MCP server created successfully');
          await loadServers();
        } else {
          toast.error('Failed to create MCP server');
        }
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving MCP server:', error);
      toast.error('Failed to save MCP server');
    }
  };

  const handleDelete = async (serverId: string) => {
    if (!confirm('Are you sure you want to delete this MCP server?')) {
      return;
    }

    try {
      const success = await deleteMCPServer(serverId);
      if (success) {
        toast.success('MCP server deleted successfully');
        await loadServers();
      } else {
        toast.error('Failed to delete MCP server');
      }
    } catch (error) {
      console.error('Error deleting MCP server:', error);
      toast.error('Failed to delete MCP server');
    }
  };

  const handleHealthCheck = async (server: MCPServer) => {
    try {
      toast.info('Checking server health...');
      const status = await checkMCPServerHealth(server);
      setHealthStatus(prev => ({ ...prev, [server.id]: status }));
      
      if (status.status === 'healthy') {
        toast.success(`Server is healthy (${status.response_time_ms}ms)`);
      } else if (status.status === 'degraded') {
        toast.warning(`Server is degraded (${status.response_time_ms}ms)`);
      } else {
        toast.error(`Server is down: ${status.error_message}`);
      }
    } catch (error) {
      console.error('Error checking health:', error);
      toast.error('Failed to check server health');
    }
  };

  const handleTestServer = async () => {
    if (!testingServer) return;

    try {
      setTestFormData(prev => ({ ...prev, loading: true, error: null, result: null }));
      
      const result = await callMCPServer(
        testingServer,
        testFormData.query,
        testFormData.context || undefined
      );

      if (result.success) {
        setTestFormData(prev => ({ 
          ...prev, 
          result: result.context,
          loading: false 
        }));
        toast.success(`Server responded in ${result.response_time_ms}ms`);
      } else {
        setTestFormData(prev => ({ 
          ...prev, 
          error: result.error || 'Unknown error',
          loading: false 
        }));
        toast.error(result.error || 'Server call failed');
      }
    } catch (error) {
      console.error('Error testing server:', error);
      setTestFormData(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false 
      }));
      toast.error('Failed to test server');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      endpoint_url: '',
      authentication_type: 'none',
      api_key: '',
      health_check_url: '',
      timeout_seconds: 30,
      description: '',
      supported_domains: '',
      is_active: true
    });
    setEditingServer(null);
  };

  const openTestDialog = (server: MCPServer) => {
    setTestingServer(server);
    setTestFormData({
      query: '',
      context: '',
      result: null,
      error: null,
      loading: false
    });
    setIsTestDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              MCP Server Configuration
            </CardTitle>
            <CardDescription>
              Configure MCP servers using the official SDK. Default local servers (Filesystem, Memory, Postgres) are pre-configured.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add MCP Server
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingServer ? 'Edit MCP Server' : 'Add New MCP Server'}
                </DialogTitle>
                <DialogDescription>
                  Configure an external Model Context Protocol server for AI context enrichment
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Server Name *</Label>
                  <Input
                    id="name"
                    placeholder="Clinical Trials MCP"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint_url">Endpoint URL *</Label>
                  <Input
                    id="endpoint_url"
                    placeholder="https://mcp-server.example.com/context"
                    value={formData.endpoint_url}
                    onChange={(e) => setFormData({ ...formData, endpoint_url: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth_type">Authentication Type *</Label>
                    <Select
                      value={formData.authentication_type}
                      onValueChange={(value: any) => setFormData({ ...formData, authentication_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="api_key">API Key</SelectItem>
                        <SelectItem value="bearer">Bearer Token</SelectItem>
                        <SelectItem value="oauth">OAuth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={formData.timeout_seconds}
                      onChange={(e) => setFormData({ ...formData, timeout_seconds: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                {formData.authentication_type !== 'none' && (
                  <div className="space-y-2">
                    <Label htmlFor="api_key">API Key / Token</Label>
                    <Input
                      id="api_key"
                      type="password"
                      placeholder="Enter API key or token"
                      value={formData.api_key}
                      onChange={(e) => setFormData({ ...formData, api_key: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="health_check">Health Check URL (optional)</Label>
                  <Input
                    id="health_check"
                    placeholder="https://mcp-server.example.com/health"
                    value={formData.health_check_url}
                    onChange={(e) => setFormData({ ...formData, health_check_url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domains">Supported Domains (comma-separated)</Label>
                  <Input
                    id="domains"
                    placeholder="healthcare, clinical_trials, medical_research"
                    value={formData.supported_domains}
                    onChange={(e) => setFormData({ ...formData, supported_domains: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provides real-time clinical trial data and research context..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Server Active</Label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingServer ? 'Update Server' : 'Add Server'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <Server className="w-12 h-12 mx-auto mb-4 opacity-50 animate-pulse" />
              <p>Loading MCP servers...</p>
            </div>
          ) : servers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Server className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No MCP servers configured yet</p>
              <p className="text-sm">Add your first MCP server to enable external context enrichment</p>
            </div>
          ) : (
            servers.map((server) => (
              <Card key={server.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{server.name}</h4>
                        <Badge variant={server.is_active ? 'default' : 'secondary'}>
                          {server.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        {healthStatus[server.id] && (
                          <Badge 
                            variant={
                              healthStatus[server.id].status === 'healthy' ? 'default' :
                              healthStatus[server.id].status === 'degraded' ? 'secondary' : 'destructive'
                            }
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {healthStatus[server.id].response_time_ms}ms
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{server.endpoint_url}</p>
                      {server.description && (
                        <p className="text-sm mt-2">{server.description}</p>
                      )}
                      {server.supported_domains && server.supported_domains.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {server.supported_domains.map((domain) => (
                            <Badge key={domain} variant="outline" className="text-xs">
                              {domain}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openTestDialog(server)}
                        title="Test Server"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleHealthCheck(server)}
                        title="Health Check"
                      >
                        <Activity className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setEditingServer(server);
                          setFormData({
                            name: server.name,
                            endpoint_url: server.endpoint_url,
                            authentication_type: server.authentication_type,
                            api_key: '',
                            health_check_url: server.health_check_url || '',
                            timeout_seconds: server.timeout_seconds,
                            description: server.description || '',
                            supported_domains: server.supported_domains?.join(', ') || '',
                            is_active: server.is_active
                          });
                          setIsDialogOpen(true);
                        }}
                        title="Edit Server"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(server.id)}
                        title="Delete Server"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>

      {/* Test MCP Server Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Test MCP Server: {testingServer?.name}</DialogTitle>
            <DialogDescription>
              Send a test query to the MCP server and view the response
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test_query">Query *</Label>
              <Textarea
                id="test_query"
                placeholder="What are the latest clinical trials for diabetes treatment?"
                value={testFormData.query}
                onChange={(e) => setTestFormData({ ...testFormData, query: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test_context">Additional Context (optional)</Label>
              <Textarea
                id="test_context"
                placeholder='{"patient_age": 45, "condition": "type_2_diabetes"}'
                value={testFormData.context}
                onChange={(e) => setTestFormData({ ...testFormData, context: e.target.value })}
                rows={3}
              />
            </div>

            {testFormData.result && (
              <div className="space-y-2">
                <Label>Response</Label>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-64">
                  {JSON.stringify(testFormData.result, null, 2)}
                </pre>
              </div>
            )}

            {testFormData.error && (
              <div className="space-y-2">
                <Label className="text-destructive">Error</Label>
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
                  {testFormData.error}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsTestDialogOpen(false)}
            >
              Close
            </Button>
            <Button 
              onClick={handleTestServer}
              disabled={!testFormData.query || testFormData.loading}
            >
              {testFormData.loading ? 'Testing...' : 'Test Server'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
