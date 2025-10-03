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

      // Load Genie AI popup conversations
      const { data: genieConvData, error: genieConvError } = await supabase
        .from('genie_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (genieConvError) {
        console.error('Genie conversations error:', genieConvError);
      }
      
      setGenieConversations(genieConvData || []);
      
      // Extract model usage from messages
      const models: any[] = [];
      genieConvData?.forEach((conv: any) => {
        if (conv.messages && Array.isArray(conv.messages)) {
          conv.messages.forEach((msg: any) => {
            if (msg.provider && msg.model) {
              models.push({
                conversation_id: conv.conversation_id,
                provider: msg.provider,
                model: msg.model,
                timestamp: msg.timestamp,
                context: conv.context || 'general',
                session_name: conv.session_name
              });
            }
          });
        }
      });
      setModelUsage(models);

      // Load access requests
      const { data: accessRequestsData, error: accessRequestsError } = await supabase
        .from('access_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (accessRequestsError) {
        console.error('Access requests error:', accessRequestsError);
      }
      setAccessRequests(accessRequestsData || []);

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
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;