import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Users, Zap, Clock, MessageSquare, Target, AlertCircle } from 'lucide-react';
import { GenieDeployment, getDeploymentAnalytics } from '@/services/deploymentService';
import { supabase } from '@/integrations/supabase/client';

interface DeploymentAnalyticsProps {
  deployments: GenieDeployment[];
}

interface ConversationStats {
  date: string;
  conversations: number;
  tokens: number;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export const DeploymentAnalytics: React.FC<DeploymentAnalyticsProps> = ({ deployments }) => {
  const [loading, setLoading] = useState(true);
  const [selectedDeploymentId, setSelectedDeploymentId] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<ConversationStats[]>([]);
  const [detailedAnalytics, setDetailedAnalytics] = useState<any>(null);

  const selectedDeployment = deployments.find(d => d.id === selectedDeploymentId);

  useEffect(() => {
    if (deployments.length > 0 && !selectedDeploymentId) {
      setSelectedDeploymentId(deployments[0].id);
    }
  }, [deployments, selectedDeploymentId]);

  useEffect(() => {
    if (selectedDeploymentId) {
      loadAnalytics();
    }
  }, [selectedDeploymentId]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Get detailed analytics for selected deployment
      const analytics = await getDeploymentAnalytics(selectedDeploymentId);
      setDetailedAnalytics(analytics);

      // Get conversation history (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: conversations, error } = await supabase
        .from('agent_conversations')
        .select('created_at, conversation_data')
        .eq('deployment_id', selectedDeploymentId)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      if (!error && conversations) {
        // Group by date
        const grouped = conversations.reduce((acc: Record<string, ConversationStats>, conv) => {
          const date = new Date(conv.created_at).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = { date, conversations: 0, tokens: 0 };
          }
          acc[date].conversations++;
          acc[date].tokens += (conv.conversation_data as any)?.tokensUsed || 0;
          return acc;
        }, {});

        setConversationHistory(Object.values(grouped));
      }
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate deployment comparison data
  const deploymentComparisonData = deployments
    .filter(d => d.total_conversations > 0)
    .map(d => ({
      name: d.name,
      conversations: d.total_conversations,
      tokens: d.total_tokens_used,
      avgConfidence: d.avg_confidence_score || 0,
    }));

  // Calculate status distribution
  const statusDistribution = [
    { name: 'Active', value: deployments.filter(d => d.deployment_status === 'active').length },
    { name: 'Draft', value: deployments.filter(d => d.deployment_status === 'draft').length },
    { name: 'Archived', value: deployments.filter(d => d.deployment_status === 'archived').length },
  ].filter(s => s.value > 0);

  const totalConversations = deployments.reduce((sum, d) => sum + d.total_conversations, 0);
  const totalTokens = deployments.reduce((sum, d) => sum + d.total_tokens_used, 0);
  const avgConfidence = deployments.length > 0
    ? deployments.reduce((sum, d) => sum + (d.avg_confidence_score || 0), 0) / deployments.length
    : 0;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {deployments.filter(d => d.is_enabled !== false).length} enabled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all deployments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Used</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalTokens / 1000).toFixed(1)}K</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalTokens.toLocaleString()} tokens
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(avgConfidence * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Overall performance
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Status Distribution</CardTitle>
                <CardDescription>Breakdown by deployment status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Deployments by Usage</CardTitle>
                <CardDescription>Most active deployments</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {deployments
                      .sort((a, b) => b.total_conversations - a.total_conversations)
                      .slice(0, 10)
                      .map((deployment, index) => (
                        <div key={deployment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">
                              #{index + 1}
                            </Badge>
                            <div>
                              <div className="font-medium text-sm">{deployment.name}</div>
                              <div className="text-xs text-muted-foreground">
                                v{deployment.version} • {deployment.deployment_status}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">{deployment.total_conversations}</div>
                            <div className="text-xs text-muted-foreground">conversations</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Comparison</CardTitle>
              <CardDescription>Compare performance across deployments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={deploymentComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="conversations" fill="#3b82f6" name="Conversations" />
                  <Bar yAxisId="right" dataKey="tokens" fill="#8b5cf6" name="Tokens (scaled)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Deployment for Detailed Analytics</CardTitle>
              <CardDescription>View detailed metrics for a specific deployment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {deployments.map(deployment => (
                  <Badge
                    key={deployment.id}
                    variant={selectedDeploymentId === deployment.id ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedDeploymentId(deployment.id)}
                  >
                    {deployment.name}
                  </Badge>
                ))}
              </div>

              {selectedDeployment && (
                <>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Conversations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedDeployment.total_conversations}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Tokens Used</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{selectedDeployment.total_tokens_used.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Avg Confidence</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {selectedDeployment.avg_confidence_score 
                            ? `${(selectedDeployment.avg_confidence_score * 100).toFixed(1)}%` 
                            : 'N/A'}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {conversationHistory.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>30-Day Conversation Trend</CardTitle>
                        <CardDescription>Daily conversation and token usage</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={conversationHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line 
                              yAxisId="left" 
                              type="monotone" 
                              dataKey="conversations" 
                              stroke="#3b82f6" 
                              name="Conversations"
                            />
                            <Line 
                              yAxisId="right" 
                              type="monotone" 
                              dataKey="tokens" 
                              stroke="#8b5cf6" 
                              name="Tokens"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
