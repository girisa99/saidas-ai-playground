import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Plus, Archive, Copy, GitBranch, Play, Pause, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import {
  getUserDeployments,
  createDeployment,
  activateDeployment,
  archiveDeployment,
  deleteDeployment,
  cloneDeployment,
  getDeploymentVersionHistory,
  GenieDeployment,
} from '@/services/deploymentService';

export const DeploymentManager: React.FC = () => {
  const [deployments, setDeployments] = useState<GenieDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newDeploymentName, setNewDeploymentName] = useState('');
  const [newDeploymentDesc, setNewDeploymentDesc] = useState('');

  useEffect(() => {
    loadDeployments();
  }, []);

  const loadDeployments = async () => {
    setLoading(true);
    try {
      const data = await getUserDeployments();
      setDeployments(data);
    } catch (error) {
      toast.error('Failed to load deployments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDeployment = async () => {
    if (!newDeploymentName.trim()) {
      toast.error('Please enter a deployment name');
      return;
    }

    setCreating(true);
    try {
      await createDeployment({
        name: newDeploymentName,
        description: newDeploymentDesc,
        configuration: {}, // TODO: Capture current Genie configuration
      });
      toast.success('Deployment created successfully');
      setNewDeploymentName('');
      setNewDeploymentDesc('');
      await loadDeployments();
    } catch (error) {
      toast.error('Failed to create deployment');
    } finally {
      setCreating(false);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await activateDeployment(id);
      toast.success('Deployment activated');
      await loadDeployments();
    } catch (error) {
      toast.error('Failed to activate deployment');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveDeployment(id);
      toast.success('Deployment archived');
      await loadDeployments();
    } catch (error) {
      toast.error('Failed to archive deployment');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This cannot be undone.')) return;
    
    try {
      await deleteDeployment(id);
      toast.success('Deployment deleted');
      await loadDeployments();
    } catch (error) {
      toast.error('Failed to delete deployment');
    }
  };

  const handleClone = async (id: string, name: string) => {
    const newName = prompt(`Clone "${name}" as:`, `${name} (Copy)`);
    if (!newName) return;

    try {
      await cloneDeployment(id, newName);
      toast.success('Deployment cloned');
      await loadDeployments();
    } catch (error) {
      toast.error('Failed to clone deployment');
    }
  };

  const activeDeployments = deployments.filter(d => d.deployment_status === 'active');
  const draftDeployments = deployments.filter(d => d.deployment_status === 'draft');
  const archivedDeployments = deployments.filter(d => d.deployment_status === 'archived');

  const DeploymentCard = ({ deployment }: { deployment: GenieDeployment }) => (
    <Card key={deployment.id} className="relative">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {deployment.name}
              <Badge variant={deployment.is_active ? 'default' : 'secondary'} className="text-xs">
                v{deployment.version}
              </Badge>
              {deployment.is_active && <Badge variant="default" className="text-xs">Active</Badge>}
            </CardTitle>
            <CardDescription className="mt-1">
              {deployment.description || 'No description'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {new Date(deployment.created_at).toLocaleDateString()}
          </div>
          <div>
            {deployment.total_conversations} conversations
          </div>
          <div>
            {deployment.total_tokens_used.toLocaleString()} tokens
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {!deployment.is_active && deployment.deployment_status === 'draft' && (
            <Button size="sm" onClick={() => handleActivate(deployment.id)} className="gap-1">
              <Play className="w-3 h-3" />
              Activate
            </Button>
          )}
          
          {deployment.is_active && (
            <Button size="sm" variant="secondary" onClick={() => handleArchive(deployment.id)} className="gap-1">
              <Pause className="w-3 h-3" />
              Pause
            </Button>
          )}

          <Button size="sm" variant="outline" onClick={() => handleClone(deployment.id, deployment.name)} className="gap-1">
            <Copy className="w-3 h-3" />
            Clone
          </Button>

          {deployment.deployment_status !== 'active' && (
            <>
              <Button size="sm" variant="outline" onClick={() => handleArchive(deployment.id)} className="gap-1">
                <Archive className="w-3 h-3" />
                Archive
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(deployment.id)} className="gap-1">
                <Trash2 className="w-3 h-3" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Genie Deployments
            </CardTitle>
            <CardDescription>
              Save, version, and manage your Genie AI configurations
            </CardDescription>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Deployment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Deployment</DialogTitle>
                <DialogDescription>
                  Save your current Genie configuration as a new deployment
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deployment Name</label>
                  <Input
                    placeholder="e.g., Production v1"
                    value={newDeploymentName}
                    onChange={(e) => setNewDeploymentName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe this deployment..."
                    value={newDeploymentDesc}
                    onChange={(e) => setNewDeploymentDesc(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateDeployment} disabled={creating} className="w-full">
                  {creating ? 'Creating...' : 'Create Deployment'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-muted-foreground py-8">Loading deployments...</p>
        ) : (
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active ({activeDeployments.length})</TabsTrigger>
              <TabsTrigger value="draft">Drafts ({draftDeployments.length})</TabsTrigger>
              <TabsTrigger value="archived">Archived ({archivedDeployments.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeDeployments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active deployments</p>
              ) : (
                activeDeployments.map(d => <DeploymentCard key={d.id} deployment={d} />)
              )}
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              {draftDeployments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No draft deployments</p>
              ) : (
                draftDeployments.map(d => <DeploymentCard key={d.id} deployment={d} />)
              )}
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              {archivedDeployments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No archived deployments</p>
              ) : (
                archivedDeployments.map(d => <DeploymentCard key={d.id} deployment={d} />)
              )}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
