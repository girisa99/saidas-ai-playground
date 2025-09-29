import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Users, Activity, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ConversationRecord {
  id: string;
  user_id?: string;
  conversation_id: string;
  session_name?: string;
  messages: any;
  configuration_snapshot?: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const GenieConversationDashboard = () => {
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('conversations');
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalConversations: 0,
    activeConversations: 0,
    totalMessages: 0,
    recentConversations: 0
  });

  useEffect(() => {
    loadConversationData();
  }, []);

  const loadConversationData = async () => {
    setLoading(true);
    try {
      // Load actual conversations using the correct table structure
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('genie_conversations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (conversationsError) {
        console.error('Conversations error:', conversationsError);
        throw conversationsError;
      }

      setConversations(conversationsData || []);

      // Calculate stats
      const totalConversations = conversationsData?.length || 0;
      const activeConversations = conversationsData?.filter(conv => conv.is_active).length || 0;
      
      // Count total messages
      let totalMessages = 0;
      conversationsData?.forEach(conv => {
        if (conv.messages && Array.isArray(conv.messages)) {
          totalMessages += conv.messages.length;
        }
      });
      
      // Recent conversations (last 24 hours)
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const recentConversations = conversationsData?.filter(conv => conv.created_at > dayAgo).length || 0;

      setStats({
        totalConversations,
        activeConversations,
        totalMessages,
        recentConversations
      });

    } catch (error) {
      console.error('Error loading conversation data:', error);
      toast({
        title: "Error",
        description: "Failed to load conversation data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const renderMessages = (messages: any) => {
    if (!messages) return 'No messages';
    
    try {
      const messageArray = Array.isArray(messages) ? messages : [];
      if (messageArray.length === 0) return 'No messages';
      
      return (
        <div className="space-y-2 max-w-md">
          {messageArray.slice(-3).map((msg: any, idx: number) => (
            <div key={idx} className="text-sm p-2 bg-muted rounded">
              <strong>{msg.role || 'unknown'}:</strong> {
                typeof msg.content === 'string' 
                  ? msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : '')
                  : JSON.stringify(msg.content || {}).substring(0, 100) + '...'
              }
            </div>
          ))}
          {messageArray.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{messageArray.length - 3} more messages
            </div>
          )}
        </div>
      );
    } catch (error) {
      return 'Error parsing messages';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Genie Conversation Backend Dashboard</h1>
          <p className="text-muted-foreground">
            View and monitor all Genie AI conversations from the backend
          </p>
        </div>
        <Button onClick={loadConversationData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold">{stats.totalConversations}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeConversations}</p>
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
                <p className="text-2xl font-bold">{stats.totalMessages}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent (24h)</p>
                <p className="text-2xl font-bold">{stats.recentConversations}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversation Data */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="conversations">All Conversations</TabsTrigger>
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="recent">Recent (24h)</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Conversations</CardTitle>
              <CardDescription>
                Complete list of Genie conversations with message content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Conversation ID</TableHead>
                      <TableHead>Session Name</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Preview</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conversations.map((conv) => (
                      <TableRow key={conv.id}>
                        <TableCell className="font-mono text-xs">
                          {conv.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {conv.conversation_id}
                        </TableCell>
                        <TableCell>
                          {conv.session_name || 'Unnamed Session'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {Array.isArray(conv.messages) ? conv.messages.length : 0}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {conv.is_active ? (
                            <Badge variant="default" className="bg-green-600">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Ended</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs">
                          {formatDate(conv.created_at)}
                        </TableCell>
                        <TableCell className="text-xs">
                          {formatDate(conv.updated_at)}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            {renderMessages(conv.messages)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Conversations</CardTitle>
              <CardDescription>
                Currently active Genie conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {conversations.filter(conv => conv.is_active).map((conv) => (
                    <Card key={conv.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="default" className="bg-green-600">Active</Badge>
                          <Badge variant="outline">ID: {conv.id.substring(0, 12)}...</Badge>
                          <Badge variant="secondary">
                            {Array.isArray(conv.messages) ? conv.messages.length : 0} messages
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Started: {formatDate(conv.created_at)}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong className="text-sm">Session:</strong> {conv.session_name || 'Unnamed'}
                      </div>
                      
                      <div>
                        <strong className="text-sm">Recent Messages:</strong>
                        {renderMessages(conv.messages)}
                      </div>
                    </Card>
                  ))}
                  {conversations.filter(conv => conv.is_active).length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      No active conversations
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations (24h)</CardTitle>
              <CardDescription>
                Conversations from the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {conversations
                    .filter(conv => {
                      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                      return new Date(conv.created_at) > dayAgo;
                    })
                    .map((conv) => (
                    <Card key={conv.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant={conv.is_active ? "default" : "secondary"}>
                            {conv.is_active ? "Active" : "Ended"}
                          </Badge>
                          <Badge variant="outline">ID: {conv.id.substring(0, 12)}...</Badge>
                          <Badge variant="secondary">
                            {Array.isArray(conv.messages) ? conv.messages.length : 0} messages
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(conv.created_at)}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <strong className="text-sm">Session:</strong> {conv.session_name || 'Unnamed'}
                      </div>
                      
                      <div>
                        <strong className="text-sm">Messages:</strong>
                        {renderMessages(conv.messages)}
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};