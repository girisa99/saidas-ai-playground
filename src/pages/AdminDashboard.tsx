import React, { useState, useEffect } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { WebsiteAnalyticsSection } from '@/components/admin/WebsiteAnalyticsSection';
import { GeniePopupAnalyticsSection } from '@/components/admin/GeniePopupAnalyticsSection';
import { KnowledgeBaseMigration } from '@/components/admin/KnowledgeBaseMigration';
import { KnowledgeCrawlManager } from '@/components/admin/KnowledgeCrawlManager';
import { KnowledgeEmbeddingsManager } from '@/components/admin/KnowledgeEmbeddingsManager';
import { DeploymentManager } from '@/components/admin/DeploymentManager';
import { MapboxTokenManager } from '@/components/admin/MapboxTokenManager';
import { TreatmentCenterImporter } from '@/components/admin/TreatmentCenterImporter';
import { ProductPricingImporter } from '@/components/admin/ProductPricingImporter';
import { DataVerificationPanel } from '@/components/admin/DataVerificationPanel';
import { PricingKnowledgeSyncButton } from '@/components/admin/PricingKnowledgeSyncButton';
import { MCPServerManager } from '@/components/admin/MCPServerManager';
import { LabelStudioManager } from '@/components/admin/LabelStudioManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [visitorAnalytics, setVisitorAnalytics] = useState<any>(null);
  const [genieConversations, setGenieConversations] = useState<any[]>([]);
  const [modelUsage, setModelUsage] = useState<any[]>([]);
  const [accessRequests, setAccessRequests] = useState<any[]>([]);
  const [popupEvents, setPopupEvents] = useState<any[]>([]);
  const [popupStats, setPopupStats] = useState<{ popupClicks: number; privacyAccepted: number; registrations: number }>({ popupClicks: 0, privacyAccepted: 0, registrations: 0 });
  const [knowledgeBaseCount, setKnowledgeBaseCount] = useState<number>(0);
  const [sessionAnalytics, setSessionAnalytics] = useState<any>(null);
  const [retentionAnalytics, setRetentionAnalytics] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load website visitor analytics
      const { data: visitorData, error: visitorError } = await supabase
        .rpc('get_visitor_analytics_summary', { days_back: 7 });

      if (visitorError) {
        console.error('Error loading visitor analytics:', visitorError);
      }

      // Transform the data to match expected structure and handle multiple RPC shapes
      const summarySource: any = visitorData && (visitorData as any).summary ? (visitorData as any).summary : (visitorData as any);

      // Start with whatever the RPC returns
      let transformedVisitorData = visitorData ? {
        summary: {
          total_views: Number(summarySource?.total_page_views ?? summarySource?.total_views ?? 0),
          unique_visitors: Number(summarySource?.total_visitors ?? summarySource?.unique_visitors ?? 0),
          avg_time_on_page_seconds: Math.round(Number(summarySource?.avg_time_on_page_seconds ?? summarySource?.avg_time_on_page ?? 0)),
          unique_pages: Number(summarySource?.unique_pages ?? summarySource?.unique_countries ?? 0)
        },
        locations: (
          (visitorData as any).locations ?? (visitorData as any).geographic_distribution ?? []
        ).map((geo: any) => ({
          country: geo?.country ?? 'Unknown',
          region: geo?.region ?? geo?.city ?? null,
          visitor_count: Number(geo?.visitors ?? geo?.visitor_count ?? geo?.count ?? 0)
        })),
        top_pages: (
          (visitorData as any).top_pages ?? []
        ).map((p: any) => ({
          page_path: p?.page_path ?? p?.path ?? '',
          page_title: p?.page_title ?? p?.title ?? '',
          view_count: Number(p?.view_count ?? p?.views ?? 0)
        })),
        session_journeys: (
          (visitorData as any).session_journeys ?? []
        ).map((s: any) => ({
          session_id: s?.session_id ?? '',
          country: s?.country ?? 'Unknown',
          region: s?.region ?? s?.city ?? null,
          pages_visited: Number(s?.pages_visited ?? s?.page_count ?? (Array.isArray(s?.page_journey) ? s.page_journey.length : 0)),
          total_time_seconds: Number(s?.total_time_seconds ?? s?.total_time ?? 0),
          page_journey: Array.isArray(s?.page_journey) ? s.page_journey.map((pj: any) => ({
            page_path: pj?.page_path ?? pj?.path ?? '',
            page_title: pj?.page_title ?? pj?.title ?? '',
            time_on_page: Number(pj?.time_on_page ?? pj?.time ?? 0)
          })) : []
        }))
      } : null;

      // No fallback enrichment from visitor_analytics table to avoid RLS/empty results.
      // The RPC now returns all required fields (summary, locations, top_pages, session_journeys, daily_trend, hourly_distribution).
      // If needed in the future, consider adding a server-side view or RPC instead of direct table access.
      
      
      setVisitorAnalytics(transformedVisitorData);

      // Load Genie AI popup conversations via RPC (bypass RLS)
      const { data: genieConvJson, error: genieConvError } = await supabase
        .rpc('get_genie_conversations_overview', { days_back: 7, limit_count: 200 });

      if (genieConvError) {
        console.error('Genie conversations RPC error:', genieConvError);
      }
      setGenieConversations(Array.isArray(genieConvJson) ? genieConvJson : []);

      // Load popup events via new RPC
      const { data: popupEventsJson, error: popupEventsError } = await supabase
        .rpc('get_recent_popup_events', { days_back: 7, limit_count: 200 });
      if (popupEventsError) {
        console.error('Popup events RPC error:', popupEventsError);
      }
      setPopupEvents(Array.isArray(popupEventsJson) ? popupEventsJson : []);

      // Load popup analytics via RPC (avoids RLS on raw table)
      const { data: popupStatsData, error: popupStatsErr } = await supabase
        .rpc('get_genie_popup_stats', { days_back: 7 });
      if (popupStatsErr) {
        console.error('Popup stats RPC error:', popupStatsErr);
      } else {
        const stats: any = popupStatsData || {};
        setPopupStats({
          popupClicks: Number(stats.popupClicks ?? 0),
          privacyAccepted: Number(stats.privacyAccepted ?? 0),
          registrations: Number(stats.registrations ?? 0),
        });
      }
      
      // Load model usage via RPC
      const { data: modelUsageJson, error: modelUsageErr } = await supabase
        .rpc('get_genie_model_usage', { days_back: 7 });
      if (modelUsageErr) {
        console.error('Model usage RPC error:', modelUsageErr);
      }
      setModelUsage(Array.isArray(modelUsageJson) ? modelUsageJson : []);

      // Load access requests via RPC (bypass RLS)
      const { data: accessRequestsJson, error: accessRequestsError } = await supabase
        .rpc('get_access_requests_recent', { days_back: 30, limit_count: 200 });

      if (accessRequestsError) {
        console.error('Access requests RPC error:', accessRequestsError);
      }
      setAccessRequests(Array.isArray(accessRequestsJson) ? accessRequestsJson : []);

      // Load universal knowledge base count
      const { count: kbCount, error: kbError } = await supabase
        .from('universal_knowledge_base')
        .select('*', { count: 'exact', head: true });
      
      if (!kbError && kbCount !== null) {
        setKnowledgeBaseCount(kbCount);
      }

      // Load session analytics
      const { data: sessionData, error: sessionError } = await supabase
        .rpc('get_session_analytics', { days_back: 7 });
      
      if (sessionError) {
        console.error('Session analytics error:', sessionError);
      } else {
        setSessionAnalytics(sessionData);
      }

      // Load retention analytics
      const { data: retentionData, error: retentionError } = await supabase
        .rpc('get_retention_analytics', { days_back: 30 });
      
      if (retentionError) {
        console.error('Retention analytics error:', retentionError);
      } else {
        setRetentionAnalytics(retentionData);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics for website visitors and Genie AI popup
            </p>
          </div>
          <Button onClick={loadDashboardData} variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="website" className="space-y-4">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="website">Website Analytics</TabsTrigger>
            <TabsTrigger value="genie">Genie AI Popup Analytics</TabsTrigger>
            <TabsTrigger value="migration">Knowledge Base Migration</TabsTrigger>
            <TabsTrigger value="crawler">Knowledge Crawler</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="ai-config">MCP & Label Studio</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="website">
            <WebsiteAnalyticsSection 
              visitorAnalytics={visitorAnalytics} 
              sessionAnalytics={sessionAnalytics}
              retentionAnalytics={retentionAnalytics}
            />
          </TabsContent>

          <TabsContent value="genie">
            <GeniePopupAnalyticsSection 
              genieConversations={genieConversations}
              modelUsage={modelUsage}
              accessRequests={accessRequests}
              popupStats={popupStats}
              popupEvents={popupEvents}
              knowledgeBaseCount={knowledgeBaseCount}
            />
          </TabsContent>

          <TabsContent value="migration">
            <KnowledgeBaseMigration />
          </TabsContent>

          <TabsContent value="crawler">
            <div className="space-y-6">
              <KnowledgeEmbeddingsManager />
              <KnowledgeCrawlManager />
            </div>
          </TabsContent>

          <TabsContent value="deployments">
            <DeploymentManager />
          </TabsContent>

          <TabsContent value="ai-config">
            <div className="space-y-6">
              <MCPServerManager />
              <LabelStudioManager />
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <DataVerificationPanel />
              <PricingKnowledgeSyncButton />
              <ProductPricingImporter />
              <TreatmentCenterImporter />
              <MapboxTokenManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;