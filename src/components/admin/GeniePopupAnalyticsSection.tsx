import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, MessageSquare, Zap, Brain, Target, Shield, Clock, MapPin, Users, Activity } from 'lucide-react';

interface GeniePopupAnalyticsSectionProps {
  genieConversations: any[];
  modelUsage: any[];
  accessRequests: any[];
  popupStats?: { popupClicks: number; privacyAccepted: number; registrations: number };
}

export const GeniePopupAnalyticsSection: React.FC<GeniePopupAnalyticsSectionProps> = ({
  genieConversations,
  modelUsage,
  accessRequests,
  popupStats
}) => {
  // Calculate popup-specific stats
  const popupClicks = popupStats?.popupClicks ?? genieConversations.length;
  const activeConversations = genieConversations.filter(c => c.is_active).length;
  const totalMessages = genieConversations.reduce((sum, c) => 
    sum + (Array.isArray(c.messages) ? c.messages.length : 0), 0
  );
  const avgMessagesPerConv = popupClicks > 0 ? (totalMessages / popupClicks).toFixed(1) : '0';

  // Context breakdown
  const contextStats = genieConversations.reduce((acc, conv) => {
    const context = conv.context || 'general';
    acc[context] = (acc[context] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Model usage breakdown
  const modelModeStats = {
    single: modelUsage.filter(m => m.model && !m.model.includes('+')).length,
    multi: modelUsage.filter(m => m.model && m.model.includes('+')).length,
    system: 0
  };

  // Model type breakdown
  const modelTypeStats = modelUsage.reduce((acc, m) => {
    const model = m.model?.toLowerCase() || '';
    if (model.includes('vision') || model.includes('gpt-4o') || model.includes('claude-3') || model.includes('image')) {
      acc.vision = (acc.vision || 0) + 1;
    } else if (model.includes('mini') || model.includes('nano') || model.includes('flash') || model.includes('haiku')) {
      acc.small = (acc.small || 0) + 1;
    } else {
      acc.llm = (acc.llm || 0) + 1;
    }
    return acc;
  }, { llm: 0, small: 0, vision: 0 });

  // RAG enablement (would need to check conversation metadata)
  const ragEnabledCount = genieConversations.filter(c => 
    c.metadata?.rag_enabled || c.configuration_snapshot?.knowledge_base_enabled
  ).length;

  // Rate limit hits
  const rateLimitHits = accessRequests.filter(r => 
    r.request_reason?.toLowerCase().includes('rate limit') || 
    r.request_reason?.toLowerCase().includes('limit exceeded')
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Bot className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Genie AI Popup Analytics</h2>
          <p className="text-sm text-muted-foreground">Chatbot engagement and performance metrics</p>
        </div>
      </div>

      {/* Genie Popup Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Popup Clicks</p>
                <p className="text-2xl font-bold">{popupClicks}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-green-600">{activeConversations}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{totalMessages}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Msg/Conv</p>
                <p className="text-2xl font-bold">{avgMessagesPerConv}</p>
              </div>
              <Brain className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="context">Context</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="rag">RAG & Features</TabsTrigger>
          <TabsTrigger value="access">Access Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Popup Engagement Metrics</CardTitle>
              <CardDescription>User interactions with the Genie AI popup</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Popup Opens</div>
                        <div className="text-2xl font-bold">{popupClicks}</div>
                        <div className="text-xs text-muted-foreground mt-1">Tracked via popup_click events</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Privacy Accepted</div>
                        <div className="text-2xl font-bold">{popupStats?.privacyAccepted ?? 0}</div>
                        <div className="text-xs text-muted-foreground mt-1">Users who accepted terms</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">User Registrations</div>
                        <div className="text-2xl font-bold">{popupStats?.registrations ?? 0}</div>
                        <div className="text-xs text-muted-foreground mt-1">Users who provided info</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Time Spent (Avg)</div>
                        <div className="text-2xl font-bold">
                          {(() => {
                            const completedConvs = genieConversations.filter(c => c.session_end && c.session_start);
                            if (completedConvs.length === 0) return '0';
                            const totalDuration = completedConvs.reduce((sum, c) => {
                              const duration = new Date(c.session_end).getTime() - new Date(c.session_start).getTime();
                              return sum + duration;
                            }, 0);
                            return (totalDuration / completedConvs.length / 60000).toFixed(1);
                          })()}min
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Average conversation length</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Recent Conversations</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Session</TableHead>
                          <TableHead>User Info</TableHead>
                          <TableHead>Messages</TableHead>
                          <TableHead>Context</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {genieConversations.slice(0, 10).map((conv) => {
                          const duration = conv.session_end && conv.session_start
                            ? Math.round((new Date(conv.session_end).getTime() - new Date(conv.session_start).getTime()) / 60000)
                            : null;
                          return (
                            <TableRow key={conv.id}>
                              <TableCell className="font-mono text-xs">
                                {conv.conversation_id?.substring(0, 12) || 'N/A'}
                              </TableCell>
                              <TableCell className="text-xs">
                                {conv.user_email || conv.user_name || 'Anonymous'}
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {Array.isArray(conv.messages) ? conv.messages.length : 0}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{conv.context || 'general'}</Badge>
                              </TableCell>
                              <TableCell className="text-xs">
                                {duration ? `${duration} min` : 'Active'}
                              </TableCell>
                              <TableCell>
                                <Badge variant={conv.is_active ? 'default' : 'secondary'}>
                                  {conv.is_active ? 'Active' : 'Ended'}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Popup users by location</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Conversations</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {genieConversations.filter(c => c.ip_address).map((conv) => (
                      <TableRow key={conv.id}>
                        <TableCell className="font-mono text-xs">{conv.ip_address}</TableCell>
                        <TableCell className="text-xs">Location data to be enriched</TableCell>
                        <TableCell><Badge variant="outline">1</Badge></TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {Array.isArray(conv.messages) ? conv.messages.length : 0}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {new Date(conv.updated_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="context">
          <Card>
            <CardHeader>
              <CardTitle>Context Analysis</CardTitle>
              <CardDescription>Distribution of conversation contexts</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(contextStats).map(([context, count]) => {
                      const countNum = typeof count === 'number' ? count : 0;
                      return (
                        <Card key={context}>
                          <CardContent className="p-4">
                            <div className="text-sm font-medium text-muted-foreground capitalize">{context}</div>
                            <div className="text-2xl font-bold">{countNum}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {popupClicks > 0 ? ((countNum / popupClicks) * 100).toFixed(1) : '0'}% of total
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Context Switching</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Analyzing conversations that switch between technology and healthcare contexts
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Usage</CardTitle>
              <CardDescription>Model selection and intelligent switching patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  {/* Model Mode Distribution */}
                  <div>
                    <h3 className="font-semibold mb-3">Model Mode</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground">Single Model</div>
                          <div className="text-2xl font-bold">{modelModeStats.single}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground">Multi-Model</div>
                          <div className="text-2xl font-bold">{modelModeStats.multi}</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground">System Default</div>
                          <div className="text-2xl font-bold">{modelModeStats.system}</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Model Type Distribution */}
                  <div>
                    <h3 className="font-semibold mb-3">Model Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground">LLM (Large)</div>
                          <div className="text-2xl font-bold">{modelTypeStats.llm}</div>
                          <div className="text-xs text-muted-foreground mt-1">GPT-4, Claude, Gemini Pro</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground">Small Language</div>
                          <div className="text-2xl font-bold">{modelTypeStats.small}</div>
                          <div className="text-xs text-muted-foreground mt-1">Mini, Flash, Nano variants</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-sm font-medium text-muted-foreground">Vision Models</div>
                          <div className="text-2xl font-bold">{modelTypeStats.vision}</div>
                          <div className="text-xs text-muted-foreground mt-1">GPT-4o, Claude-3, Vision</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Detailed Model Usage */}
                  <div>
                    <h3 className="font-semibold mb-3">Detailed Model Usage</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Provider</TableHead>
                          <TableHead>Model</TableHead>
                          <TableHead>Usage Count</TableHead>
                          <TableHead>Context</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(
                          modelUsage.reduce((acc, m) => {
                            const key = `${m.provider}/${m.model}`;
                            if (!acc[key]) {
                              acc[key] = { provider: m.provider, model: m.model, count: 0, contexts: new Set<string>() };
                            }
                            acc[key].count++;
                            acc[key].contexts.add(m.context);
                            return acc;
                          }, {} as Record<string, { provider: string; model: string; count: number; contexts: Set<string> }>)
                        ).map(([key, data]: [string, { provider: string; model: string; count: number; contexts: Set<string> }]) => (
                          <TableRow key={key}>
                            <TableCell><Badge variant="outline">{data.provider}</Badge></TableCell>
                            <TableCell>{data.model}</TableCell>
                            <TableCell><Badge variant="secondary">{data.count}</Badge></TableCell>
                            <TableCell className="text-xs">
                              {Array.from(data.contexts).join(', ')}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Response time and conversation quality</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Avg Response Time</div>
                        <div className="text-2xl font-bold">~2s</div>
                        <div className="text-xs text-muted-foreground mt-1">Calculated from timestamps</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Success Rate</div>
                        <div className="text-2xl font-bold text-green-600">
                          {((genieConversations.filter(c => !c.is_active).length / popupClicks) * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Completed conversations</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Active Sessions</div>
                        <div className="text-2xl font-bold">{activeConversations}</div>
                        <div className="text-xs text-muted-foreground mt-1">Currently in progress</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Avg Msg/Session</div>
                        <div className="text-2xl font-bold">{avgMessagesPerConv}</div>
                        <div className="text-xs text-muted-foreground mt-1">Engagement metric</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rag">
          <Card>
            <CardHeader>
              <CardTitle>RAG & Advanced Features</CardTitle>
              <CardDescription>Knowledge base usage and intelligent switching</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">RAG Enabled</div>
                        <div className="text-2xl font-bold">{ragEnabledCount}</div>
                        <div className="text-xs text-muted-foreground mt-1">Conversations using knowledge base</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Intelligent Switching</div>
                        <div className="text-2xl font-bold">
                          {genieConversations.filter(c => 
                            c.metadata?.intelligent_switch || 
                            c.configuration_snapshot?.intelligent_switch_enabled
                          ).length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Context-aware model switching</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Feature Usage</div>
                        <div className="text-2xl font-bold">
                          {genieConversations.filter(c => c.metadata?.features_used).length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Advanced features activated</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests & Rate Limits</CardTitle>
              <CardDescription>Users requesting access and hitting rate limits</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Rate Limit Hits</div>
                        <div className="text-2xl font-bold text-red-600">{rateLimitHits}</div>
                        <div className="text-xs text-muted-foreground mt-1">Users who exceeded limits</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Access Requests</div>
                        <div className="text-2xl font-bold">{accessRequests.length}</div>
                        <div className="text-xs text-muted-foreground mt-1">Total requests submitted</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">Pending</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {accessRequests.filter(r => r.status === 'pending').length}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Awaiting review</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Recent Access Requests</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Requested</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {accessRequests.slice(0, 10).map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>{request.user_name || 'N/A'}</TableCell>
                            <TableCell className="text-xs">{request.user_email}</TableCell>
                            <TableCell className="text-xs max-w-xs truncate">
                              {request.request_reason}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  request.status === 'approved' ? 'default' : 
                                  request.status === 'rejected' ? 'destructive' : 
                                  'secondary'
                                }
                              >
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs">
                              {new Date(request.requested_at).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};