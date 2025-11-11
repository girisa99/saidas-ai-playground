import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const KnowledgeEmbeddingsManager: React.FC = () => {
  const [stats, setStats] = useState({
    total: 0,
    withEmbeddings: 0,
    needsEmbeddings: 0,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState<{
    processed: number;
    errors: number;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // Get total count
      const { count: total, error: totalError } = await supabase
        .from('universal_knowledge_base')
        .select('*', { count: 'exact', head: true });

      if (totalError) throw totalError;

      // Get count with embeddings
      const { count: withEmbeddings, error: embeddingsError } = await supabase
        .from('universal_knowledge_base')
        .select('*', { count: 'exact', head: true })
        .not('embedding', 'is', null);

      if (embeddingsError) throw embeddingsError;

      setStats({
        total: total || 0,
        withEmbeddings: withEmbeddings || 0,
        needsEmbeddings: (total || 0) - (withEmbeddings || 0),
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch embeddings statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const generateEmbeddings = async (batchSize: number = 50) => {
    setIsGenerating(true);
    setProgress(null);

    try {
      toast.info('Starting embeddings generation...');

      // Call the edge function to generate embeddings
      const { data, error } = await supabase.functions.invoke(
        'generate-knowledge-embeddings-batch',
        {
          body: {
            batch_size: batchSize,
          },
        }
      );

      if (error) {
        throw error;
      }

      setProgress({
        processed: data.success_count || 0,
        errors: data.error_count || 0,
        message: data.message || 'Completed',
      });

      if (data.success_count > 0) {
        toast.success(
          `Successfully generated ${data.success_count} embeddings!${
            data.error_count > 0 ? ` (${data.error_count} errors)` : ''
          }`
        );
      } else {
        toast.info('No new embeddings needed. All entries are up to date!');
      }

      // Refresh stats
      await fetchStats();
    } catch (error) {
      console.error('Error generating embeddings:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to generate embeddings'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAllEmbeddings = async () => {
    if (stats.needsEmbeddings === 0) {
      toast.info('All entries already have embeddings!');
      return;
    }

    const confirmed = window.confirm(
      `This will generate embeddings for ${stats.needsEmbeddings} knowledge base entries. Continue?`
    );

    if (!confirmed) return;

    setIsGenerating(true);
    setProgress({ processed: 0, errors: 0, message: 'Starting...' });

    let totalProcessed = 0;
    let totalErrors = 0;
    const batchSize = 50;

    try {
      // Generate embeddings in batches until all are done
      while (totalProcessed < stats.needsEmbeddings) {
        const { data, error } = await supabase.functions.invoke(
          'generate-knowledge-embeddings-batch',
          {
            body: {
              batch_size: batchSize,
            },
          }
        );

        if (error) {
          throw error;
        }

        totalProcessed += data.success_count || 0;
        totalErrors += data.error_count || 0;

        setProgress({
          processed: totalProcessed,
          errors: totalErrors,
          message: `Processing batch... ${totalProcessed}/${stats.needsEmbeddings}`,
        });

        // If no entries were processed, we're done
        if ((data.success_count || 0) === 0) {
          break;
        }

        // Small delay between batches to avoid rate limits
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      toast.success(
        `Completed! Generated ${totalProcessed} embeddings${
          totalErrors > 0 ? ` (${totalErrors} errors)` : ''
        }`
      );

      // Refresh stats
      await fetchStats();
    } catch (error) {
      console.error('Error generating embeddings:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to generate embeddings'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const embeddingsPercentage =
    stats.total > 0 ? (stats.withEmbeddings / stats.total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Knowledge Base Embeddings
        </CardTitle>
        <CardDescription>
          Generate vector embeddings for semantic search capabilities using OpenAI's
          text-embedding-3-small model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Embeddings Progress</span>
                <span className="text-muted-foreground">
                  {stats.withEmbeddings} / {stats.total} entries
                </span>
              </div>
              <Progress value={embeddingsPercentage} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{embeddingsPercentage.toFixed(1)}% complete</span>
                <span>{stats.needsEmbeddings} remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-2xl font-bold">{stats.total}</div>
                      <p className="text-xs text-muted-foreground">Total Entries</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold">{stats.withEmbeddings}</div>
                      <p className="text-xs text-muted-foreground">With Embeddings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold">{stats.needsEmbeddings}</div>
                      <p className="text-xs text-muted-foreground">Needs Embeddings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {progress && (
              <Alert>
                <Sparkles className="w-4 h-4" />
                <AlertDescription>
                  <div className="space-y-1">
                    <p className="font-medium">{progress.message}</p>
                    <p className="text-sm text-muted-foreground">
                      Processed: {progress.processed} | Errors: {progress.errors}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => generateEmbeddings(50)}
                disabled={isGenerating || stats.needsEmbeddings === 0}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Batch (50)
                  </>
                )}
              </Button>

              <Button
                onClick={generateAllEmbeddings}
                disabled={isGenerating || stats.needsEmbeddings === 0}
                variant="secondary"
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 mr-2" />
                    Generate All ({stats.needsEmbeddings})
                  </>
                )}
              </Button>
            </div>

            <Alert>
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-xs">
                <strong>Note:</strong> Embeddings generation uses OpenAI's API and incurs
                costs. Each entry costs approximately $0.00002. Estimated cost for{' '}
                {stats.needsEmbeddings} entries: ~$
                {(stats.needsEmbeddings * 0.00002).toFixed(4)}
              </AlertDescription>
            </Alert>

            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Benefits of Embeddings</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>
                    <strong>Semantic Search:</strong> Find relevant content based on meaning,
                    not just keywords
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>
                    <strong>Better RAG:</strong> Retrieve more contextually relevant knowledge
                    for AI responses
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-0.5 text-green-500 flex-shrink-0" />
                  <span>
                    <strong>Similarity Matching:</strong> Find related content automatically
                  </span>
                </li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
