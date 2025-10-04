-- Setup weekly re3data.org sync cron job and embedding generation
-- Requires pg_cron and pg_net extensions

-- Enable required extensions if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule weekly re3data sync (every Sunday at 2 AM UTC)
SELECT cron.schedule(
  'weekly-re3data-sync',
  '0 2 * * 0', -- Every Sunday at 2:00 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://ithspbabhmdntioslfqe.supabase.co/functions/v1/sync-re3data-repositories',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0aHNwYmFiaG1kbnRpb3NsZnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjU5OTMsImV4cCI6MjA2MjUwMTk5M30.yUZZHsz2wIHboVuWWfqXeAH5oHRxzJIz20NWSUmHPhw"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);

-- Schedule daily embedding generation (every day at 3 AM UTC)
SELECT cron.schedule(
  'daily-embedding-generation',
  '0 3 * * *', -- Every day at 3:00 AM UTC
  $$
  SELECT
    net.http_post(
        url:='https://ithspbabhmdntioslfqe.supabase.co/functions/v1/generate-knowledge-embeddings',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0aHNwYmFiaG1kbnRpb3NsZnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MjU5OTMsImV4cCI6MjA2MjUwMTk5M30.yUZZHsz2wIHboVuWWfqXeAH5oHRxzJIz20NWSUmHPhw"}'::jsonb,
        body:='{"batchSize": 100}'::jsonb
    ) as request_id;
  $$
);

-- Create a view to monitor cron job status
CREATE OR REPLACE VIEW cron_job_status AS
SELECT 
  jobid,
  schedule,
  command,
  nodename,
  nodeport,
  database,
  username,
  active,
  jobname
FROM cron.job
WHERE jobname IN ('weekly-re3data-sync', 'daily-embedding-generation')
ORDER BY jobname;

-- Grant select on the view to authenticated users
GRANT SELECT ON cron_job_status TO authenticated;