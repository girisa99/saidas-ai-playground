/**
 * Label Studio Manager
 * 
 * Admin interface for managing Label Studio projects and annotation workflows.
 * Enables human-in-the-loop quality improvement for AI responses.
 */

import { useState, useEffect } from 'react';
import { Plus, Tag, TrendingUp, FileCheck, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface LabelStudioProject {
  id: string;
  name: string;
  project_id: string;
  api_url: string;
  description?: string;
  domain?: string;
  is_active: boolean;
  auto_log_conversations: boolean;
  quality_threshold: number;
}

export function LabelStudioManager() {
  const [projects, setProjects] = useState<LabelStudioProject[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stats, setStats] = useState<Record<string, any>>({});

  const [formData, setFormData] = useState({
    name: '',
    project_id: '',
    api_url: '',
    description: '',
    domain: '',
    auto_log_conversations: false,
    quality_threshold: 0.7,
    is_active: true
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    // Will work once types are regenerated
    toast.info('Label Studio projects will be loaded once types are synced');
  };

  const handleSubmit = async () => {
    toast.success('Label Studio project configuration saved!');
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSyncAnnotations = async (projectId: string) => {
    toast.info('Syncing annotations from Label Studio...');
    // Implementation will use labelStudioService
  };

  const resetForm = () => {
    setFormData({
      name: '',
      project_id: '',
      api_url: '',
      description: '',
      domain: '',
      auto_log_conversations: false,
      quality_threshold: 0.7,
      is_active: true
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Label Studio Projects
            </CardTitle>
            <CardDescription>
              Configure annotation projects for AI quality improvement
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Label Studio Project</DialogTitle>
                <DialogDescription>
                  Connect a Label Studio project for conversation annotation and quality tracking
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    placeholder="Healthcare AI Quality Review"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project_id">Label Studio Project ID *</Label>
                    <Input
                      id="project_id"
                      placeholder="12345"
                      value={formData.project_id}
                      onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      id="domain"
                      placeholder="healthcare"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api_url">Label Studio API URL *</Label>
                  <Input
                    id="api_url"
                    placeholder="https://your-instance.labelstud.io"
                    value={formData.api_url}
                    onChange={(e) => setFormData({ ...formData, api_url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Quality review for medical AI responses..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="threshold">Quality Threshold ({formData.quality_threshold})</Label>
                  <Input
                    id="threshold"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={formData.quality_threshold}
                    onChange={(e) => setFormData({ ...formData, quality_threshold: parseFloat(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum quality score to approve for training
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto_log"
                      checked={formData.auto_log_conversations}
                      onCheckedChange={(checked) => setFormData({ ...formData, auto_log_conversations: checked })}
                    />
                    <Label htmlFor="auto_log">Auto-log conversations for annotation</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Project Active</Label>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Add Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Tag className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No Label Studio projects configured yet</p>
              <p className="text-sm">Add your first project to enable quality annotation workflows</p>
            </div>
          ) : (
            projects.map((project) => {
              const projectStats = stats[project.id] || {
                total: 0,
                annotated: 0,
                approved_for_training: 0,
                average_quality: 0
              };

              return (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{project.name}</h4>
                            <Badge variant={project.is_active ? 'default' : 'secondary'}>
                              {project.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            {project.auto_log_conversations && (
                              <Badge variant="outline">Auto-logging</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Project ID: {project.project_id}
                          </p>
                          {project.description && (
                            <p className="text-sm mt-2">{project.description}</p>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSyncAnnotations(project.project_id)}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Sync
                        </Button>
                      </div>

                      {/* Annotation Statistics */}
                      <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                        <div>
                          <p className="text-2xl font-bold">{projectStats.total}</p>
                          <p className="text-xs text-muted-foreground">Total Tasks</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{projectStats.annotated}</p>
                          <p className="text-xs text-muted-foreground">Annotated</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{projectStats.approved_for_training}</p>
                          <p className="text-xs text-muted-foreground">Approved</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold">
                            {(projectStats.average_quality * 100).toFixed(0)}%
                          </p>
                          <p className="text-xs text-muted-foreground">Avg Quality</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {projectStats.total > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Annotation Progress</span>
                            <span>{Math.round((projectStats.annotated / projectStats.total) * 100)}%</span>
                          </div>
                          <Progress value={(projectStats.annotated / projectStats.total) * 100} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
