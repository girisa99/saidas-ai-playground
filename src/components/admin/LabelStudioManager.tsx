/**
 * Label Studio Manager
 * 
 * Admin interface for managing Label Studio projects and annotation workflows.
 * Enables human-in-the-loop quality improvement for AI responses.
 */

import { useState, useEffect } from 'react';
import { Plus, Tag, TrendingUp, Settings, Trash2, RefreshCw } from 'lucide-react';
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
import {
  getActiveLabelStudioProjects,
  createLabelStudioProject,
  updateLabelStudioProject,
  deleteLabelStudioProject,
  syncAnnotationsFromLabelStudio,
  getProjectAnnotationStats,
  type LabelStudioProject
} from '@/services/labelStudioService';

interface ProjectStats {
  total: number;
  annotated: number;
  approved_for_training: number;
  average_quality: number;
}

export function LabelStudioManager() {
  const [projects, setProjects] = useState<LabelStudioProject[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<LabelStudioProject | null>(null);
  const [stats, setStats] = useState<Record<string, ProjectStats>>({});
  const [loading, setLoading] = useState(false);
  const [syncingProjects, setSyncingProjects] = useState<Set<string>>(new Set());

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
    try {
      setLoading(true);
      const data = await getActiveLabelStudioProjects();
      setProjects(data);
      
      // Load statistics for each project
      const statsPromises = data.map(async (project) => {
        const projectStats = await getProjectAnnotationStats(project.id);
        return { id: project.id, stats: projectStats };
      });
      
      const statsResults = await Promise.all(statsPromises);
      const statsMap = statsResults.reduce((acc, { id, stats }) => {
        acc[id] = stats;
        return acc;
      }, {} as Record<string, ProjectStats>);
      
      setStats(statsMap);
      toast.success('Label Studio projects loaded successfully');
    } catch (error) {
      console.error('Failed to load Label Studio projects:', error);
      toast.error('Failed to load Label Studio projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const projectData = {
        name: formData.name,
        project_id: formData.project_id,
        api_url: formData.api_url,
        description: formData.description || undefined,
        domain: formData.domain || undefined,
        is_active: formData.is_active,
        auto_log_conversations: formData.auto_log_conversations,
        quality_threshold: formData.quality_threshold,
        annotation_config: {}
      };

      if (editingProject) {
        const success = await updateLabelStudioProject(editingProject.id, projectData);
        if (success) {
          toast.success('Label Studio project updated successfully');
          await loadProjects();
        } else {
          toast.error('Failed to update Label Studio project');
        }
      } else {
        const newProject = await createLabelStudioProject(projectData as any);
        if (newProject) {
          toast.success('Label Studio project created successfully');
          await loadProjects();
        } else {
          toast.error('Failed to create Label Studio project');
        }
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving Label Studio project:', error);
      toast.error('Failed to save Label Studio project');
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this Label Studio project?')) {
      return;
    }

    try {
      const success = await deleteLabelStudioProject(projectId);
      if (success) {
        toast.success('Label Studio project deleted successfully');
        await loadProjects();
      } else {
        toast.error('Failed to delete Label Studio project');
      }
    } catch (error) {
      console.error('Error deleting Label Studio project:', error);
      toast.error('Failed to delete Label Studio project');
    }
  };

  const handleSyncAnnotations = async (project: LabelStudioProject) => {
    try {
      setSyncingProjects(prev => new Set(prev).add(project.id));
      toast.info('Syncing annotations from Label Studio...');
      
      const result = await syncAnnotationsFromLabelStudio(project.project_id);
      
      if (result.synced > 0) {
        toast.success(`Synced ${result.synced} annotations successfully`);
        
        // Refresh stats for this project
        const projectStats = await getProjectAnnotationStats(project.id);
        setStats(prev => ({
          ...prev,
          [project.id]: projectStats
        }));
      } else if (result.errors > 0) {
        toast.error(`Failed to sync annotations (${result.errors} errors)`);
      } else {
        toast.info('No new annotations to sync');
      }
    } catch (error) {
      console.error('Error syncing annotations:', error);
      toast.error('Failed to sync annotations');
    } finally {
      setSyncingProjects(prev => {
        const next = new Set(prev);
        next.delete(project.id);
        return next;
      });
    }
  };

  const handleRefreshStats = async (projectId: string) => {
    try {
      const projectStats = await getProjectAnnotationStats(projectId);
      setStats(prev => ({
        ...prev,
        [projectId]: projectStats
      }));
      toast.success('Statistics refreshed');
    } catch (error) {
      console.error('Error refreshing stats:', error);
      toast.error('Failed to refresh statistics');
    }
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
    setEditingProject(null);
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
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? 'Edit Label Studio Project' : 'Add Label Studio Project'}
                </DialogTitle>
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
                  {editingProject ? 'Update Project' : 'Add Project'}
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
              <Tag className="w-12 h-12 mx-auto mb-4 opacity-50 animate-pulse" />
              <p>Loading Label Studio projects...</p>
            </div>
          ) : projects.length === 0 ? (
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
              const isSyncing = syncingProjects.has(project.id);

              return (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{project.name}</h4>
                            <Badge variant={project.is_active ? 'default' : 'secondary'}>
                              {project.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            {project.auto_log_conversations && (
                              <Badge variant="outline">Auto-logging</Badge>
                            )}
                            {project.domain && (
                              <Badge variant="outline">{project.domain}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Project ID: {project.project_id}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {project.api_url}
                          </p>
                          {project.description && (
                            <p className="text-sm mt-2">{project.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRefreshStats(project.id)}
                            title="Refresh Statistics"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSyncAnnotations(project)}
                            disabled={isSyncing}
                            title="Sync Annotations"
                          >
                            <TrendingUp className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                            {isSyncing ? 'Syncing...' : 'Sync'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingProject(project);
                              setFormData({
                                name: project.name,
                                project_id: project.project_id,
                                api_url: project.api_url,
                                description: project.description || '',
                                domain: project.domain || '',
                                auto_log_conversations: project.auto_log_conversations,
                                quality_threshold: project.quality_threshold,
                                is_active: project.is_active
                              });
                              setIsDialogOpen(true);
                            }}
                            title="Edit Project"
                          >
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
                            {projectStats.average_quality > 0 
                              ? (projectStats.average_quality * 100).toFixed(0) + '%'
                              : 'N/A'}
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

                      {/* Training Approval Progress */}
                      {projectStats.annotated > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Training Approval</span>
                            <span>{Math.round((projectStats.approved_for_training / projectStats.annotated) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(projectStats.approved_for_training / projectStats.annotated) * 100}
                            className="h-2"
                          />
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
