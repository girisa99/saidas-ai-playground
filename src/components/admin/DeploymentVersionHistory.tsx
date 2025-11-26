import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  getDeploymentVersionHistory, 
  createDeploymentVersion, 
  activateDeployment,
  type GenieDeployment 
} from '@/services/deploymentService';
import { 
  History, 
  GitBranch, 
  RotateCcw, 
  FileText, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

interface DeploymentVersionHistoryProps {
  deployment: GenieDeployment;
  onVersionCreated?: () => void;
}

export function DeploymentVersionHistory({ deployment, onVersionCreated }: DeploymentVersionHistoryProps) {
  const [versions, setVersions] = useState<GenieDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingVersion, setCreatingVersion] = useState(false);
  const [newVersionName, setNewVersionName] = useState('');
  const [changelog, setChangelog] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadVersionHistory();
  }, [deployment.id]);

  const loadVersionHistory = async () => {
    try {
      setLoading(true);
      const history = await getDeploymentVersionHistory(deployment.name);
      setVersions(history);
    } catch (error) {
      console.error('Error loading version history:', error);
      toast({
        title: "Error",
        description: "Failed to load version history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVersion = async () => {
    if (!newVersionName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a version name",
        variant: "destructive"
      });
      return;
    }

    try {
      setCreatingVersion(true);
      await createDeploymentVersion(
        deployment.id,
        newVersionName,
        deployment.configuration,
        changelog
      );
      
      toast({
        title: "Success",
        description: "New version created successfully"
      });
      
      setShowCreateDialog(false);
      setNewVersionName('');
      setChangelog('');
      await loadVersionHistory();
      onVersionCreated?.();
    } catch (error) {
      console.error('Error creating version:', error);
      toast({
        title: "Error",
        description: "Failed to create new version",
        variant: "destructive"
      });
    } finally {
      setCreatingVersion(false);
    }
  };

  const handleRollback = async (version: GenieDeployment) => {
    try {
      await activateDeployment(version.id);
      toast({
        title: "Success",
        description: `Rolled back to version ${version.version}`
      });
      await loadVersionHistory();
      onVersionCreated?.();
    } catch (error) {
      console.error('Error rolling back:', error);
      toast({
        title: "Error",
        description: "Failed to rollback to this version",
        variant: "destructive"
      });
    }
  };

  const getVersionBadge = (version: GenieDeployment) => {
    if (version.is_active) {
      return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Active</Badge>;
    }
    if (version.deployment_status === 'archived') {
      return <Badge variant="outline">Archived</Badge>;
    }
    return <Badge variant="secondary">Inactive</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Version History
            </CardTitle>
            <CardDescription>
              Track changes and rollback to previous configurations
            </CardDescription>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <GitBranch className="w-4 h-4 mr-2" />
                Create Version
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Version</DialogTitle>
                <DialogDescription>
                  Save the current configuration as a new version
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="version-name">Version Name</Label>
                  <Input
                    id="version-name"
                    placeholder="e.g., v2.0 - Enhanced RAG"
                    value={newVersionName}
                    onChange={(e) => setNewVersionName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="changelog">Changelog (Optional)</Label>
                  <Textarea
                    id="changelog"
                    placeholder="Describe what changed in this version..."
                    value={changelog}
                    onChange={(e) => setChangelog(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={handleCreateVersion} 
                  disabled={creatingVersion}
                  className="w-full"
                >
                  {creatingVersion ? 'Creating...' : 'Create Version'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {versions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No version history available</p>
              </div>
            ) : (
              versions.map((version, index) => (
                <div key={version.id}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        version.is_active 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {version.is_active ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {index < versions.length - 1 && (
                        <div className="w-0.5 h-full min-h-[60px] bg-border mt-2" />
                      )}
                    </div>
                    
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{version.name}</h4>
                            {getVersionBadge(version)}
                            <Badge variant="outline" className="text-xs">
                              v{version.version}
                            </Badge>
                          </div>
                          
                          {version.description && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {version.description}
                            </p>
                          )}
                          
                          {version.changelog && (
                            <div className="bg-muted/50 rounded-lg p-3 mt-2">
                              <div className="flex items-start gap-2">
                                <FileText className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div className="flex-1">
                                  <p className="text-xs font-medium mb-1">Changelog</p>
                                  <p className="text-xs text-muted-foreground whitespace-pre-wrap">
                                    {version.changelog}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {format(new Date(version.created_at), 'MMM d, yyyy HH:mm')}
                            </div>
                            {version.deployed_at && (
                              <div className="flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Deployed {format(new Date(version.deployed_at), 'MMM d, yyyy')}
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                            <div className="bg-muted/50 rounded p-2">
                              <p className="text-muted-foreground mb-1">Conversations</p>
                              <p className="font-semibold">{version.total_conversations}</p>
                            </div>
                            <div className="bg-muted/50 rounded p-2">
                              <p className="text-muted-foreground mb-1">Tokens Used</p>
                              <p className="font-semibold">{version.total_tokens_used.toLocaleString()}</p>
                            </div>
                            <div className="bg-muted/50 rounded p-2">
                              <p className="text-muted-foreground mb-1">Avg Confidence</p>
                              <p className="font-semibold">
                                {version.avg_confidence_score 
                                  ? `${(version.avg_confidence_score * 100).toFixed(1)}%`
                                  : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {!version.is_active && version.deployment_status !== 'archived' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRollback(version)}
                          >
                            <RotateCcw className="w-3 h-3 mr-2" />
                            Rollback
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
