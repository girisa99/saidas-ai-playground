import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';

export const TreatmentCenterImporter = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [clearExisting, setClearExisting] = useState(false);
  const [importStats, setImportStats] = useState<{
    inserted: number;
    errors: number;
    geocoded: number;
    total: number;
  } | null>(null);

  const handleImportFromFile = async () => {
    setIsImporting(true);
    setImportStats(null);

    try {
      // Fetch the CSV file from public folder (using enhanced version with all data)
      const response = await fetch('/data/treatment-centers-enhanced.csv');
      if (!response.ok) {
        throw new Error('Failed to fetch treatment centers CSV file');
      }

      const csvData = await response.text();
      console.log('Loaded CSV file, size:', csvData.length);

      // Call the import edge function
      const { data, error } = await supabase.functions.invoke('import-treatment-centers', {
        body: { csvData, clearExisting }
      });

      if (error) throw error;

      setImportStats(data);
      
      toast({
        title: 'Import Completed',
        description: `Successfully imported ${data.inserted} treatment centers (${data.geocoded} geocoded)`,
      });
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: 'Import Failed',
        description: error instanceof Error ? error.message : 'Failed to import treatment centers',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Treatment Centers Database Importer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
          <h4 className="font-medium">Database Overview</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• 500+ Treatment Centers</li>
            <li>• All 50 US States + International</li>
            <li>• CAR-T, Gene Therapy, BMT, MS, Cardiology</li>
            <li>• Complete provider, trial, and service information</li>
            <li>• Geocoded locations for map integration</li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="clearExisting"
            checked={clearExisting}
            onCheckedChange={(checked) => setClearExisting(checked as boolean)}
          />
          <label
            htmlFor="clearExisting"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Clear existing treatment centers before import
          </label>
        </div>

        <Button
          onClick={handleImportFromFile}
          disabled={isImporting}
          className="w-full"
          size="lg"
        >
          {isImporting ? (
            <>
              <Upload className="h-4 w-4 mr-2 animate-spin" />
              Importing... (this may take several minutes)
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Import 500+ Treatment Centers
            </>
          )}
        </Button>

        {importStats && (
          <div className="p-4 border rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Import Successful</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <div>
                <span className="text-muted-foreground">Total Records:</span>
                <span className="ml-2 font-medium">{importStats.total}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Inserted:</span>
                <span className="ml-2 font-medium text-green-600">{importStats.inserted}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Geocoded:</span>
                <span className="ml-2 font-medium text-blue-600">{importStats.geocoded}</span>
              </div>
              {importStats.errors > 0 && (
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-amber-500" />
                  <span className="text-muted-foreground">Errors:</span>
                  <span className="ml-1 font-medium text-amber-600">{importStats.errors}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <strong>Note:</strong> Import includes automatic geocoding using OpenStreetMap.
          This process may take 5-10 minutes due to rate limiting (1 request/second).
          The data will be immediately available in Genie AI and the treatment center map.
        </div>
      </CardContent>
    </Card>
  );
};
