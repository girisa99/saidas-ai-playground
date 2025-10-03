import React, { useState, useEffect } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { WebsiteAnalyticsSection } from '@/components/admin/WebsiteAnalyticsSection';
import { GeniePopupAnalyticsSection } from '@/components/admin/GeniePopupAnalyticsSection';
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

      // Fallback enrichment: if RPC didn't include top_pages/session_journeys, derive them from visitor_analytics table (last 7 days)
      if (transformedVisitorData && (
        (transformedVisitorData.top_pages?.length ?? 0) === 0 ||
        (transformedVisitorData.session_journeys?.length ?? 0) === 0
      )) {
        try {
          const sinceIso = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
          const { data: vaRows, error: vaErr } = await supabase
            .from('visitor_analytics')
            .select('session_id,country,region,page_path,page_title,time_on_page_seconds,visit_timestamp')
            .gte('visit_timestamp', sinceIso)
            .order('visit_timestamp', { ascending: true })
            .limit(5000);

          if (!vaErr && Array.isArray(vaRows)) {
            // Derive Top Pages
            if ((transformedVisitorData.top_pages?.length ?? 0) === 0) {
              const pageCountMap = new Map<string, { page_path: string; page_title: string; view_count: number }>();
              for (const row of vaRows) {
                const key = `${row.page_path}__${row.page_title ?? ''}`;
                if (!pageCountMap.has(key)) {
                  pageCountMap.set(key, {
                    page_path: row.page_path,
                    page_title: row.page_title ?? '',
                    view_count: 0,
                  });
                }
                pageCountMap.get(key)!.view_count += 1;
              }
              transformedVisitorData.top_pages = Array.from(pageCountMap.values())
                .sort((a, b) => b.view_count - a.view_count)
                .slice(0, 100);
            }

            // Derive Session Journeys
            if ((transformedVisitorData.session_journeys?.length ?? 0) === 0) {
              const sessionsMap = new Map<string, any[]>();
              for (const row of vaRows) {
                if (!sessionsMap.has(row.session_id)) sessionsMap.set(row.session_id, []);
                sessionsMap.get(row.session_id)!.push(row);
              }

              transformedVisitorData.session_journeys = Array.from(sessionsMap.entries()).map(([session_id, rows]) => {
                const first = rows[0];
                const total_time_seconds = rows.reduce((sum, r) => sum + (Number(r.time_on_page_seconds ?? 0)), 0);
                return {
                  session_id,
                  country: first?.country ?? 'Unknown',
                  region: first?.region ?? null,
                  pages_visited: rows.length,
                  total_time_seconds,
                  page_journey: rows.map(r => ({
                    page_path: r.page_path,
                    page_title: r.page_title ?? '',
                    time_on_page: Number(r.time_on_page_seconds ?? 0),
                  })),
                };
              });
            }
          }
        } catch (e) {
          console.error('Fallback enrichment from visitor_analytics failed:', e);
        }
      }
      
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

      // Load knowledge base count
      const { count: kbCount, error: kbError } = await supabase
        .from('knowledge_base')
        .select('*', { count: 'exact', head: true });
      
      if (!kbError && kbCount !== null) {
        setKnowledgeBaseCount(kbCount);
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="website">Website Analytics</TabsTrigger>
            <TabsTrigger value="genie">Genie AI Popup Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="website">
            <WebsiteAnalyticsSection visitorAnalytics={visitorAnalytics} />
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;