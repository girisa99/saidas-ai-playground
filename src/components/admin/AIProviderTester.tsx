import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProviderResult {
  configured: boolean;
  working: boolean;
  error: string | null;
}

interface TestResults {
  total_providers: number;
  configured: number;
  working: number;
  results: {
    openai: ProviderResult;
    claude: ProviderResult;
    gemini: ProviderResult;
    lovable: ProviderResult;
  };
  recommendations: string[];
}

export const AIProviderTester = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const { toast } = useToast();

  const testProviders = async () => {
    setTesting(true);
    setResults(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('test-ai-providers');
      
      if (error) throw error;
      
      setResults(data);
      
      const allWorking = data.working === data.configured;
      toast({
        title: allWorking ? 'All providers working!' : 'Some providers need attention',
        description: `${data.working}/${data.configured} configured providers are working`,
        variant: allWorking ? 'default' : 'destructive',
      });
    } catch (error) {
      console.error('Test error:', error);
      toast({
        title: 'Test failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setTesting(false);
    }
  };

  const getProviderIcon = (provider: ProviderResult) => {
    if (!provider.configured) return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    if (provider.working) return <CheckCircle className="h-5 w-5 text-green-600" />;
    return <XCircle className="h-5 w-5 text-destructive" />;
  };

  const getProviderStatus = (provider: ProviderResult) => {
    if (!provider.configured) return <Badge variant="outline">Not Configured</Badge>;
    if (provider.working) return <Badge variant="default" className="bg-green-600">Working</Badge>;
    return <Badge variant="destructive">Error</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Provider Status</CardTitle>
        <CardDescription>
          Test all configured AI providers (OpenAI, Claude, Gemini, Lovable AI)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={testProviders} 
          disabled={testing}
          className="w-full"
        >
          {testing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Testing Providers...
            </>
          ) : (
            'Test All Providers'
          )}
        </Button>

        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Total Providers</div>
                <div className="text-2xl font-bold">{results.total_providers}</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Configured</div>
                <div className="text-2xl font-bold">{results.configured}</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Working</div>
                <div className="text-2xl font-bold text-green-600">{results.working}</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-sm text-muted-foreground">Issues</div>
                <div className="text-2xl font-bold text-destructive">
                  {results.configured - results.working}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Provider Details</h3>
              
              {/* OpenAI */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getProviderIcon(results.results.openai)}
                  <div>
                    <div className="font-medium">OpenAI (ChatGPT)</div>
                    <div className="text-sm text-muted-foreground">
                      GPT-5, GPT-4o models
                    </div>
                    {results.results.openai.error && (
                      <div className="text-xs text-destructive mt-1">
                        {results.results.openai.error}
                      </div>
                    )}
                  </div>
                </div>
                {getProviderStatus(results.results.openai)}
              </div>

              {/* Claude */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getProviderIcon(results.results.claude)}
                  <div>
                    <div className="font-medium">Claude (Anthropic)</div>
                    <div className="text-sm text-muted-foreground">
                      Claude Sonnet, Haiku models
                    </div>
                    {results.results.claude.error && (
                      <div className="text-xs text-destructive mt-1">
                        {results.results.claude.error}
                      </div>
                    )}
                  </div>
                </div>
                {getProviderStatus(results.results.claude)}
              </div>

              {/* Gemini */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getProviderIcon(results.results.gemini)}
                  <div>
                    <div className="font-medium">Google Gemini</div>
                    <div className="text-sm text-muted-foreground">
                      Gemini 1.5 models
                    </div>
                    {results.results.gemini.error && (
                      <div className="text-xs text-destructive mt-1">
                        {results.results.gemini.error}
                      </div>
                    )}
                  </div>
                </div>
                {getProviderStatus(results.results.gemini)}
              </div>

              {/* Lovable AI */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getProviderIcon(results.results.lovable)}
                  <div>
                    <div className="font-medium">Lovable AI Gateway</div>
                    <div className="text-sm text-muted-foreground">
                      SLMs, vision models (auto-configured)
                    </div>
                    {results.results.lovable.error && (
                      <div className="text-xs text-destructive mt-1">
                        {results.results.lovable.error}
                      </div>
                    )}
                  </div>
                </div>
                {getProviderStatus(results.results.lovable)}
              </div>
            </div>

            {results.recommendations.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold mb-2">Recommendations:</div>
                  <ul className="list-disc list-inside space-y-1">
                    {results.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
