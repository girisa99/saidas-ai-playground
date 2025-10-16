import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const PricingKnowledgeSyncButton = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<{ success: boolean; count?: number; error?: string } | null>(null);
  const { toast } = useToast();

  const handleSync = async () => {
    setIsSyncing(true);
    setLastSync(null);

    try {
      const { data, error } = await supabase.functions.invoke('sync-pricing-to-knowledge');

      if (error) throw error;

      setLastSync({ success: true, count: data.syncedCount });
      toast({
        title: "✅ Pricing Data Synced",
        description: `Successfully synced ${data.syncedCount} pricing records to knowledge base. Genie can now answer pricing questions!`,
      });
    } catch (error) {
      console.error('Sync error:', error);
      setLastSync({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
      toast({
        title: "❌ Sync Failed",
        description: error instanceof Error ? error.message : 'Failed to sync pricing data',
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Sync Pricing to AI Knowledge Base
        </CardTitle>
        <CardDescription>
          Import product pricing data into Genie AI's knowledge base so it can answer pricing, insurance, and treatment journey questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            className="gap-2"
          >
            {isSyncing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4" />
                Sync Pricing Data
              </>
            )}
          </Button>
          
          {lastSync && (
            <div className="flex items-center gap-2 text-sm">
              {lastSync.success ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">
                    Synced {lastSync.count} records
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">
                    {lastSync.error || 'Sync failed'}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg text-sm space-y-2">
          <p className="font-medium">What gets synced:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>WAC, Government (340B), and Commercial pricing</li>
            <li>Patient assistance programs (PAP)</li>
            <li>Copay assistance availability</li>
            <li>Treatment journey phases and timelines</li>
            <li>Insurance coverage requirements</li>
            <li>Prior authorization requirements</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            Once synced, Genie can answer questions like "What's the cost of Kymriah with Medicare?" or "Show me CAR-T pricing options"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};