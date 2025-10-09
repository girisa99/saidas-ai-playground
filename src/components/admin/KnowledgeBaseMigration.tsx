import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database, RefreshCw, Download, CheckCircle, AlertCircle } from 'lucide-react';

export const KnowledgeBaseMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [populating, setPopulating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleClearHardcoded = async () => {
    if (!window.confirm('This will delete all hardcoded migration entries. Continue?')) return;
    
    setMigrating(true);
    try {
      const { error } = await supabase
        .from('universal_knowledge_base')
        .delete()
        .match({ 'metadata->>source_type': 'hardcoded_migration' });
      
      if (error) throw error;
      
      toast({
        title: "Cleared Successfully",
        description: "Removed all previously migrated hardcoded knowledge",
      });
    } catch (error) {
      console.error('Clear error:', error);
      toast({
        title: "Clear Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setMigrating(false);
    }
  };

  const handleMigrateHardcoded = async () => {
    setMigrating(true);
    try {
      const { data, error } = await supabase.functions.invoke('migrate-knowledge-to-universal');
      
      if (error) throw error;
      
      setResults(data);
      toast({
        title: "Migration Successful",
        description: `Migrated ${data.summary?.total_migrated || 0} knowledge entries`,
      });
    } catch (error) {
      console.error('Migration error:', error);
      toast({
        title: "Migration Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setMigrating(false);
    }
  };

  const handleSyncRe3Data = async () => {
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke('sync-re3data-repositories');
      
      if (error) throw error;
      
      setResults(data);
      toast({
        title: "Re3data Sync Successful",
        description: `Synced ${data.summary?.healthcare_repositories || 0} healthcare repositories`,
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  const handlePopulateFromRe3Data = async () => {
    setPopulating(true);
    try {
      const { data, error } = await supabase.functions.invoke('populate-knowledge-from-re3data');
      
      if (error) throw error;
      
      setResults(data);
      toast({
        title: "Population Successful",
        description: `Created ${data.summary?.knowledge_entries_created || 0} knowledge entries from repositories`,
      });
    } catch (error) {
      console.error('Population error:', error);
      toast({
        title: "Population Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setPopulating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Knowledge Base Migration & Population</h3>
        <p className="text-sm text-muted-foreground">
          Migrate hardcoded knowledge and populate from external sources
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              Step 1: Migrate Hardcoded
            </CardTitle>
            <CardDescription>
              Migrate all hardcoded knowledge from genieKnowledgeBase.ts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                onClick={handleMigrateHardcoded} 
                disabled={migrating}
                className="w-full"
              >
                {migrating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Migrating...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Migrate Hardcoded Knowledge
                  </>
                )}
              </Button>
              <Button 
                onClick={handleClearHardcoded} 
                disabled={migrating}
                className="w-full"
                variant="outline"
                size="sm"
              >
                Clear Old Migration
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Re-run to update with latest knowledge (16 entries). Clear first to avoid duplicates.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-600" />
              Step 2: Sync Re3data
            </CardTitle>
            <CardDescription>
              Fetch healthcare repositories from re3data.org
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleSyncRe3Data} 
              disabled={syncing}
              className="w-full"
              variant="secondary"
            >
              {syncing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Re3data Repositories
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Syncs healthcare research repositories to universal_knowledge_repositories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-5 w-5 text-purple-600" />
              Step 3: Populate Knowledge
            </CardTitle>
            <CardDescription>
              Create knowledge entries from synced repositories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handlePopulateFromRe3Data} 
              disabled={populating}
              className="w-full"
              variant="outline"
            >
              {populating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Populating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Populate from Re3data
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Creates knowledge base entries from repository metadata
            </p>
          </CardContent>
        </Card>
      </div>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {results.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              Operation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(results.summary || {}).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <p className="text-xs text-muted-foreground capitalize">
                    {key.replace(/_/g, ' ')}
                  </p>
                  <p className="text-2xl font-bold">{value as string}</p>
                </div>
              ))}
            </div>

            {results.message && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">{results.message}</p>
              </div>
            )}

            {results.errors && results.errors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Errors ({results.errors.length}):</p>
                {results.errors.map((error: string, idx: number) => (
                  <Badge key={idx} variant="destructive" className="text-xs">
                    {error}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};