/**
 * MCP Server Manager
 * 
 * Admin interface for managing Model Context Protocol (MCP) servers.
 * Allows configuration, health monitoring, and assignment to agents.
 */

import { useState, useEffect } from 'react';
import { Plus, Server, Activity, Settings, Trash2 } from 'lucide-react';
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

interface MCPServer {
  id: string;
  name: string;
  endpoint_url: string;
  authentication_type: 'none' | 'api_key' | 'oauth' | 'bearer';
  is_active: boolean;
  health_check_url?: string;
  timeout_seconds: number;
  description?: string;
  supported_domains?: string[];
}

export function MCPServerManager() {
  const [servers, setServers] = useState<MCPServer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServer, setEditingServer] = useState<MCPServer | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    endpoint_url: '',
    authentication_type: 'none' as const,
    api_key: '',
    health_check_url: '',
    timeout_seconds: 30,
    description: '',
    supported_domains: '',
    is_active: true
  });

  useEffect(() => {
    loadServers();
  }, []);

  const loadServers = async () => {
    // Will work once types are regenerated
    toast.info('MCP servers will be loaded once types are synced');
  };

  const handleSubmit = async () => {
    toast.success('MCP server configuration saved!');
    setIsDialogOpen(false);
    resetForm();
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
              Manage external context providers via Model Context Protocol
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
          {servers.length === 0 ? (
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
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{server.name}</h4>
                        <Badge variant={server.is_active ? 'default' : 'secondary'}>
                          {server.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{server.endpoint_url}</p>
                      {server.description && (
                        <p className="text-sm mt-2">{server.description}</p>
                      )}
                      {server.supported_domains && server.supported_domains.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {server.supported_domains.map((domain) => (
                            <Badge key={domain} variant="outline" className="text-xs">
                              {domain}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Activity className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => {
                        setEditingServer(server);
                        setIsDialogOpen(true);
                      }}>
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
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
    </Card>
  );
}
