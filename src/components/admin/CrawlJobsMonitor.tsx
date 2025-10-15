import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, ExternalLink, Database, FileText, Video } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CrawlJob {
  id: string;
  job_name: string;
  start_url: string;
  status: string;
  pages_total: number;
  pages_crawled: number;
  created_at: string;
  completed_at: string | null;
  configuration: any;
  error_message: string | null;
}

interface JobStats {
  jobId: string;
  jobName: string;
  knowledgeEntries: number;
  treatmentCenters: number;
  contentTypes: { [key: string]: number };
  status: string;
  pagesProcessed: number;
  createdAt: string;
}

export const CrawlJobsMonitor = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<CrawlJob[]>([]);
  const [jobStats, setJobStats] = useState<{ [key: string]: JobStats }>({});
  const [isLoading, setIsLoading] = useState(true);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      // Get recent crawl jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('knowledge_crawl_jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (jobsError) throw jobsError;

      setJobs(jobsData || []);

      // Load stats for each job
      const stats: { [key: string]: JobStats } = {};
      
      for (const job of jobsData || []) {
        // Count knowledge base entries from this crawl
        const { count: kbCount } = await supabase
          .from('universal_knowledge_base')
          .select('*', { count: 'exact', head: true })
          .eq('metadata->>crawled_at', job.created_at);

        // Count treatment centers extracted
        const { count: centerCount } = await supabase
          .from('treatment_centers')
          .select('*', { count: 'exact', head: true })
          .eq('metadata->>extraction_date', job.created_at);

        // Get content type breakdown
        const { data: kbEntries } = await supabase
          .from('universal_knowledge_base')
          .select('content_type, metadata')
          .eq('metadata->>crawled_at', job.created_at);

        const contentTypes: { [key: string]: number } = {};
        (kbEntries || []).forEach((entry) => {
          const metadata = entry.metadata as any;
          const types = metadata?.content_types || [entry.content_type];
          (Array.isArray(types) ? types : [types]).forEach((type: string) => {
            contentTypes[type] = (contentTypes[type] || 0) + 1;
          });
        });

        stats[job.id] = {
          jobId: job.id,
          jobName: job.job_name,
          knowledgeEntries: kbCount || 0,
          treatmentCenters: centerCount || 0,
          contentTypes,
          status: job.status,
          pagesProcessed: job.pages_crawled || 0,
          createdAt: job.created_at
        };
      }

      setJobStats(stats);
    } catch (error) {
      console.error('Error loading crawl jobs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load crawl job data',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      completed: 'default',
      running: 'secondary',
      failed: 'destructive',
      pending: 'outline'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const getContentTypeIcon = (type: string) => {
    if (type.includes('video') || type.includes('multimedia')) return <Video className="w-4 h-4" />;
    if (type.includes('clinical') || type.includes('trial')) return <Database className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crawl Jobs Monitor</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Crawl Jobs Monitor</CardTitle>
            <CardDescription>View crawl job results and extracted data</CardDescription>
          </div>
          <Button onClick={loadJobs} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No crawl jobs found. Start a crawl to see results here.
            </p>
          ) : (
            jobs.map((job) => {
              const stats = jobStats[job.id];
              return (
                <div key={job.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{job.job_name}</h4>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <a
                      href={job.start_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {job.error_message && (
                    <div className="bg-destructive/10 text-destructive text-sm p-2 rounded">
                      {job.error_message}
                    </div>
                  )}

                  {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Pages Processed</p>
                        <p className="text-lg font-semibold">{stats.pagesProcessed}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Knowledge Entries</p>
                        <p className="text-lg font-semibold">{stats.knowledgeEntries}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Treatment Centers</p>
                        <p className="text-lg font-semibold">{stats.treatmentCenters}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Content Types</p>
                        <p className="text-lg font-semibold">{Object.keys(stats.contentTypes).length}</p>
                      </div>
                    </div>
                  )}

                  {stats && Object.keys(stats.contentTypes).length > 0 && (
                    <div className="pt-2 border-t">
                      <p className="text-xs font-medium mb-2">Content Breakdown</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(stats.contentTypes).map(([type, count]) => (
                          <Badge key={type} variant="outline" className="gap-1">
                            {getContentTypeIcon(type)}
                            <span className="capitalize">{type.replace(/_/g, ' ')}</span>
                            <span className="ml-1 text-muted-foreground">({count})</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};
