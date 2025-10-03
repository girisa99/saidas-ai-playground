import React, { useState, useEffect } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { WebsiteAnalyticsSection } from '@/components/admin/WebsiteAnalyticsSection';
import { GeniePopupAnalyticsSection } from '@/components/admin/GeniePopupAnalyticsSection';
import { EnhancedGenieDashboard } from '@/components/admin/EnhancedGenieDashboard';
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
      setVisitorAnalytics(visitorData);

      // Load Genie AI popup conversations via RPC (bypass RLS)
      const { data: genieConvJson, error: genieConvError } = await supabase
        .rpc('get_genie_conversations_overview', { days_back: 7, limit_count: 200 });

      if (genieConvError) {
        console.error('Genie conversations RPC error:', genieConvError);
      }
      setGenieConversations(Array.isArray(genieConvJson) ? genieConvJson : []);

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="website">Website Analytics</TabsTrigger>
            <TabsTrigger value="genie">Genie AI Popup Analytics</TabsTrigger>
            <TabsTrigger value="enhanced">Knowledge Base Management</TabsTrigger>
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
              knowledgeBaseCount={knowledgeBaseCount}
            />
          </TabsContent>

          <TabsContent value="enhanced">
            <EnhancedGenieDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;