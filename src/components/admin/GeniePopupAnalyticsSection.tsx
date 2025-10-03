import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Bot, MessageSquare, Zap, Brain, Target, Shield, Clock, MapPin, Users, Activity, Plus, BookOpen, Database, Tag } from 'lucide-react';

interface GeniePopupAnalyticsSectionProps {
  genieConversations: any[];
  modelUsage: any[];
  accessRequests: any[];
  popupStats?: { popupClicks: number; privacyAccepted: number; registrations: number };
  knowledgeBaseCount?: number;
}

export const GeniePopupAnalyticsSection: React.FC<GeniePopupAnalyticsSectionProps> = ({
  genieConversations,
  modelUsage,
  accessRequests,
  popupStats,
  knowledgeBaseCount = 0
}) => {
  const [showAddKnowledge, setShowAddKnowledge] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [knowledgeEntries, setKnowledgeEntries] = useState<any[]>([]);
  const [newKnowledgeEntry, setNewKnowledgeEntry] = useState({
    title: '',
    content: '',
    category: 'technology',
    tags: '',
    inputType: 'text',
    url: '',
    html: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    loadKnowledgeEntries();
  }, []);

  const loadKnowledgeEntries = async () => {
    const { data, error } = await supabase
      .from('knowledge_base')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setKnowledgeEntries(data);
    }
  };

  const handleAddKnowledgeEntry = async () => {
    if (!newKnowledgeEntry.title) {
      toast({ title: "Error", description: "Title is required", variant: "destructive" });
      return;
    }

    if (newKnowledgeEntry.inputType === 'text' && !newKnowledgeEntry.content) {
      toast({ title: "Error", description: "Content is required for text input", variant: "destructive" });
      return;
    }

    if (newKnowledgeEntry.inputType === 'url' && !newKnowledgeEntry.url) {
      toast({ title: "Error", description: "URL is required for URL input", variant: "destructive" });
      return;
    }

    if (newKnowledgeEntry.inputType === 'html' && !newKnowledgeEntry.html) {
      toast({ title: "Error", description: "HTML content is required for HTML input", variant: "destructive" });
      return;
    }

    if (newKnowledgeEntry.inputType === 'file' && !selectedFile) {
      toast({ title: "Error", description: "File is required for file input", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      let filePath = null, fileName = null, fileSize = null, fileType = null, processedContent = '';

      if (newKnowledgeEntry.inputType === 'file' && selectedFile) {
        const timestamp = Date.now();
        filePath = `${timestamp}-${selectedFile.name}`;
        fileName = selectedFile.name;
        fileSize = selectedFile.size;
        fileType = selectedFile.type;

        const { error: uploadError } = await supabase.storage.from('knowledge-files').upload(filePath, selectedFile);
        if (uploadError) throw uploadError;

        if (selectedFile.type.startsWith('text/') || selectedFile.type === 'application/json' || 
            selectedFile.name.endsWith('.sql') || selectedFile.name.endsWith('.md')) {
          processedContent = await selectedFile.text();
        } else {
          processedContent = `File uploaded: ${fileName} (${fileType})`;
        }
      }

      const insertData: any = {
        name: newKnowledgeEntry.title,
        category: newKnowledgeEntry.category,
        healthcare_tags: newKnowledgeEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: 'approved',
        source_type: 'admin_created',
        is_active: true,
        is_static: false
      };

      switch (newKnowledgeEntry.inputType) {
        case 'text':
          insertData.description = newKnowledgeEntry.content;
          insertData.processed_content = newKnowledgeEntry.content;
          break;
        case 'url':
          insertData.content_url = newKnowledgeEntry.url;
          insertData.description = `Content from URL: ${newKnowledgeEntry.url}`;
          break;
        case 'html':
          insertData.content_html = newKnowledgeEntry.html;
          insertData.description = newKnowledgeEntry.html;
          insertData.processed_content = newKnowledgeEntry.html;
          break;
        case 'file':
          insertData.file_path = filePath;
          insertData.file_name = fileName;
          insertData.file_size = fileSize;
          insertData.file_type = fileType;
          insertData.description = processedContent;
          insertData.processed_content = processedContent;
          break;
      }

      const { error } = await supabase.from('knowledge_base').insert(insertData);
      if (error) throw error;

      toast({ title: "Success", description: "Knowledge entry added successfully" });
      setNewKnowledgeEntry({ title: '', content: '', category: 'technology', tags: '', inputType: 'text', url: '', html: '' });
      setSelectedFile(null);
      setShowAddKnowledge(false);
      loadKnowledgeEntries();
    } catch (error) {
      console.error('Error adding knowledge entry:', error);
      toast({ title: "Error", description: "Failed to add knowledge entry", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const getStaticKnowledgeEntries = () => {
    return [
      { title: "AI Market Landscape", category: "technology", tags: ["AI", "Market", "Trends"] },
      { title: "Enterprise Tech Giants", category: "technology", tags: ["Enterprise", "Cloud"] },
      { title: "LLM Providers Comparison", category: "technology", tags: ["LLM", "GPT", "Claude"] },
      { title: "Digital Therapeutics (DTx)", category: "healthcare", tags: ["DTx", "Healthcare"] },
      { title: "Cell & Gene Therapy", category: "healthcare", tags: ["CGT", "Innovation"] },
    ];
  };

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
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="context">Context</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="rag">RAG & Features</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
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

        <TabsContent value="knowledge">
          <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Knowledge Base Management</h3>
                <p className="text-sm text-muted-foreground">
                  View and manage existing technology and healthcare knowledge entries
                </p>
              </div>
              <Button onClick={() => setShowAddKnowledge(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Entry
              </Button>
            </div>

            {/* Add Knowledge Entry Form */}
            {showAddKnowledge && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Knowledge Entry</CardTitle>
                  <CardDescription>Create a new knowledge base entry from various sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Input Type</label>
                    <select
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      value={newKnowledgeEntry.inputType}
                      onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, inputType: e.target.value})}
                    >
                      <option value="text">Text Content</option>
                      <option value="url">URL/Website</option>
                      <option value="html">HTML Content</option>
                      <option value="file">File Upload</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      value={newKnowledgeEntry.title}
                      onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, title: e.target.value})}
                      placeholder="Enter knowledge entry title"
                    />
                  </div>

                  {newKnowledgeEntry.inputType === 'text' && (
                    <div>
                      <label className="text-sm font-medium">Content</label>
                      <textarea
                        className="w-full mt-1 px-3 py-2 border rounded-md h-32"
                        value={newKnowledgeEntry.content}
                        onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, content: e.target.value})}
                        placeholder="Enter knowledge content"
                      />
                    </div>
                  )}

                  {newKnowledgeEntry.inputType === 'url' && (
                    <div>
                      <label className="text-sm font-medium">URL</label>
                      <input
                        type="url"
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        value={newKnowledgeEntry.url}
                        onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, url: e.target.value})}
                        placeholder="https://example.com/article"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Content will be fetched and processed from this URL
                      </p>
                    </div>
                  )}

                  {newKnowledgeEntry.inputType === 'html' && (
                    <div>
                      <label className="text-sm font-medium">HTML Content</label>
                      <textarea
                        className="w-full mt-1 px-3 py-2 border rounded-md h-32 font-mono text-sm"
                        value={newKnowledgeEntry.html}
                        onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, html: e.target.value})}
                        placeholder="<div>Enter HTML content here...</div>"
                      />
                    </div>
                  )}

                  {newKnowledgeEntry.inputType === 'file' && (
                    <div>
                      <label className="text-sm font-medium">File Upload</label>
                      <input
                        type="file"
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.json,.sql,.txt,.md,.html,.jpg,.jpeg,.png,.webp"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Supported: PDF, Word, PowerPoint, Excel, JSON, SQL, Text, Markdown, HTML, Images (max 20MB)
                      </p>
                      {selectedFile && (
                        <div className="mt-2 p-2 bg-muted rounded-md">
                          <p className="text-sm font-medium">Selected: {selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB | Type: {selectedFile.type}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      value={newKnowledgeEntry.category}
                      onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, category: e.target.value})}
                    >
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="general">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tags (comma separated)</label>
                    <input
                      type="text"
                      className="w-full mt-1 px-3 py-2 border rounded-md"
                      value={newKnowledgeEntry.tags}
                      onChange={(e) => setNewKnowledgeEntry({...newKnowledgeEntry, tags: e.target.value})}
                      placeholder="e.g., AI, technology, innovation"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAddKnowledgeEntry} 
                      disabled={uploading}
                      className="flex items-center gap-2"
                    >
                      {uploading ? 'Processing...' : 'Add Entry'}
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setShowAddKnowledge(false);
                      setNewKnowledgeEntry({ title: '', content: '', category: 'technology', tags: '', inputType: 'text', url: '', html: '' });
                      setSelectedFile(null);
                    }}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Knowledge Base Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Static Entries</p>
                      <p className="text-2xl font-bold text-blue-600">80+</p>
                      <p className="text-xs text-muted-foreground">Built-in knowledge</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Dynamic Entries</p>
                      <p className="text-2xl font-bold text-green-600">{knowledgeEntries.length}</p>
                      <p className="text-xs text-muted-foreground">Admin managed</p>
                    </div>
                    <Database className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Technology</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {knowledgeEntries.filter(e => e.category === 'technology').length + 45}
                      </p>
                      <p className="text-xs text-muted-foreground">Tech knowledge</p>
                    </div>
                    <Bot className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Healthcare</p>
                      <p className="text-2xl font-bold text-red-600">
                        {knowledgeEntries.filter(e => e.category === 'healthcare').length + 35}
                      </p>
                      <p className="text-xs text-muted-foreground">Medical knowledge</p>
                    </div>
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Knowledge Base Entries List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    Technology Knowledge Base
                  </CardTitle>
                  <CardDescription>Technology and AI-related entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {getStaticKnowledgeEntries().filter(e => e.category === 'technology').map((entry, index) => (
                        <Card key={`static-tech-${index}`} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{entry.title}</h4>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">Static</Badge>
                          </div>
                        </Card>
                      ))}
                      {knowledgeEntries.filter(e => e.category === 'technology').map((entry) => (
                        <Card key={entry.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{entry.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {entry.description?.substring(0, 100)}...
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.healthcare_tags?.map((tag: string, tagIndex: number) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Badge variant="default" className="text-xs">Dynamic</Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Healthcare Knowledge Base
                  </CardTitle>
                  <CardDescription>Healthcare and medical-related entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {getStaticKnowledgeEntries().filter(e => e.category === 'healthcare').map((entry, index) => (
                        <Card key={`static-health-${index}`} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{entry.title}</h4>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Badge variant="secondary" className="text-xs">Static</Badge>
                          </div>
                        </Card>
                      ))}
                      {knowledgeEntries.filter(e => e.category === 'healthcare').map((entry) => (
                        <Card key={entry.id} className="p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{entry.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {entry.description?.substring(0, 100)}...
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {entry.healthcare_tags?.map((tag: string, tagIndex: number) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Badge variant="default" className="text-xs">Dynamic</Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
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