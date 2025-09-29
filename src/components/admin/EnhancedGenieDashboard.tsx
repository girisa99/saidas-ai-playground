import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  Users, 
  Activity, 
  Clock, 
  Mail, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  UserPlus,
  TrendingUp,
  UserCheck,
  Globe,
  Phone,
  MapPin
} from 'lucide-react';
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

interface AccessRequest {
  id: string;
  user_name?: string;
  user_email: string;
  request_reason: string;
  status: string;
  requested_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
  admin_notes?: string;
  ip_address: string;
}

interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  phone?: string;
}

export const EnhancedGenieDashboard = () => {
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const [stats, setStats] = useState({
    // Conversation Stats
    totalConversations: 0,
    activeConversations: 0,
    completedConversations: 0,
    totalMessages: 0,
    recentConversations: 0,
    
    // User Stats
    totalUsers: 0,
    registeredUsers: 0,
    anonymousUsers: 0,
    newUsersToday: 0,
    
    // Access Request Stats
    pendingAccessRequests: 0,
    approvedAccessRequests: 0,
    rejectedAccessRequests: 0,
    
    // Session Stats
    averageSessionLength: 0,
    peakHours: '',
    userRetentionRate: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('genie_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (conversationsError) throw conversationsError;

      // Load access requests
      const { data: accessRequestsData, error: accessRequestsError } = await supabase
        .from('access_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (accessRequestsError) throw accessRequestsError;

      // Load user profiles (if available)
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      // Set data
      setConversations(conversationsData || []);
      setAccessRequests(accessRequestsData || []);
      setUserProfiles(profilesData || []);

      // Calculate stats
      calculateStats(
        conversationsData || [],
        accessRequestsData || [],
        profilesData || []
      );

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

  const calculateStats = (
    convs: ConversationRecord[],
    requests: AccessRequest[],
    profiles: UserProfile[]
  ) => {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Conversation stats
    const totalConversations = convs.length;
    const activeConversations = convs.filter(c => c.is_active).length;
    const completedConversations = convs.filter(c => !c.is_active).length;
    const recentConversations = convs.filter(c => new Date(c.created_at) > dayAgo).length;
    
    let totalMessages = 0;
    let totalSessionDuration = 0;
    convs.forEach(conv => {
      if (conv.messages && Array.isArray(conv.messages)) {
        totalMessages += conv.messages.length;
      }
      // Calculate session duration if not active
      if (!conv.is_active) {
        const start = new Date(conv.created_at);
        const end = new Date(conv.updated_at);
        totalSessionDuration += (end.getTime() - start.getTime()) / 60000; // minutes
      }
    });

    const averageSessionLength = completedConversations > 0 ? 
      Math.round(totalSessionDuration / completedConversations) : 0;

    // User stats
    const uniqueUserIds = new Set([
      ...convs.filter(c => c.user_id).map(c => c.user_id),
      ...profiles.map(p => p.id)
    ]);
    const totalUsers = uniqueUserIds.size;
    const registeredUsers = profiles.length;
    const anonymousUsers = totalUsers - registeredUsers;
    const newUsersToday = profiles.filter(p => new Date(p.created_at) > dayAgo).length;

    // Access request stats
    const pendingAccessRequests = requests.filter(r => r.status === 'pending').length;
    const approvedAccessRequests = requests.filter(r => r.status === 'approved').length;
    const rejectedAccessRequests = requests.filter(r => r.status === 'rejected').length;

    // Calculate peak hours
    const hourCounts = new Array(24).fill(0);
    convs.forEach(conv => {
      const hour = new Date(conv.created_at).getHours();
      hourCounts[hour]++;
    });
    const peakHour = hourCounts.indexOf(Math.max(...hourCounts));
    const peakHours = `${peakHour}:00 - ${peakHour + 1}:00`;

    // User retention (users who had conversations in last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const activeUsers = convs.filter(c => new Date(c.created_at) > weekAgo).length;
    const userRetentionRate = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

    setStats({
      totalConversations,
      activeConversations,
      completedConversations,
      totalMessages,
      recentConversations,
      totalUsers,
      registeredUsers,
      anonymousUsers,
      newUsersToday,
      pendingAccessRequests,
      approvedAccessRequests,
      rejectedAccessRequests,
      averageSessionLength,
      peakHours,
      userRetentionRate
    });
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
          {messageArray.slice(-2).map((msg: any, idx: number) => (
            <div key={idx} className="text-sm p-2 bg-muted rounded">
              <strong>{msg.role || 'unknown'}:</strong> {
                typeof msg.content === 'string' 
                  ? msg.content.substring(0, 80) + (msg.content.length > 80 ? '...' : '')
                  : JSON.stringify(msg.content || {}).substring(0, 80) + '...'
              }
            </div>
          ))}
          {messageArray.length > 2 && (
            <div className="text-xs text-muted-foreground">
              +{messageArray.length - 2} more messages
            </div>
          )}
        </div>
      );
    } catch (error) {
      return 'Error parsing messages';
    }
  };

  const getSessionStatus = (conv: ConversationRecord) => {
    if (conv.is_active) return 'active';
    
    const messageCount = Array.isArray(conv.messages) ? conv.messages.length : 0;
    if (messageCount === 0) return 'abandoned';
    if (messageCount < 3) return 'incomplete';
    return 'completed';
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
          <h1 className="text-3xl font-bold">Enhanced Genie Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Complete view of users, conversations, session analytics, access requests, and engagement metrics
          </p>
        </div>
        <Button onClick={loadDashboardData} variant="outline">
          <Activity className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users & Sessions</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="access">Access Requests</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.registeredUsers} registered, {stats.anonymousUsers} anonymous
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold text-green-600">{stats.activeConversations}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.recentConversations} started today
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Sessions</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.completedConversations}</p>
                    <p className="text-xs text-muted-foreground">
                      Avg: {stats.averageSessionLength} min
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Access Requests</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pendingAccessRequests}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.approvedAccessRequests} approved
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                    <p className="text-2xl font-bold">{stats.totalMessages}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Peak Hours</p>
                    <p className="text-2xl font-bold">{stats.peakHours}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">User Retention</p>
                    <p className="text-2xl font-bold">{stats.userRetentionRate}%</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Session Status Overview</CardTitle>
              <CardDescription>Breakdown of conversation completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Completed Sessions</span>
                  <span className="font-bold">{stats.completedConversations}</span>
                </div>
                <Progress 
                  value={(stats.completedConversations / Math.max(stats.totalConversations, 1)) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between items-center">
                  <span>Active Sessions</span>
                  <span className="font-bold">{stats.activeConversations}</span>
                </div>
                <Progress 
                  value={(stats.activeConversations / Math.max(stats.totalConversations, 1)) * 100} 
                  className="h-3"
                />
                <div className="text-sm text-muted-foreground">
                  Total: {stats.totalConversations} conversations tracked
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users & Sessions Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>Users with profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userProfiles.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            {user.first_name && user.last_name 
                              ? `${user.first_name} ${user.last_name}` 
                              : 'Not provided'
                            }
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="text-xs">
                            {formatDate(user.created_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Latest conversation sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {conversations
                      .filter(conv => {
                        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                        return new Date(conv.created_at) > dayAgo;
                      })
                      .slice(0, 10)
                      .map((conv) => (
                      <Card key={conv.id} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={
                                getSessionStatus(conv) === 'active' ? 'default' :
                                getSessionStatus(conv) === 'completed' ? 'default' :
                                getSessionStatus(conv) === 'incomplete' ? 'outline' : 'secondary'
                              }
                              className={
                                getSessionStatus(conv) === 'active' ? 'bg-green-600' :
                                getSessionStatus(conv) === 'completed' ? 'bg-blue-600' :
                                getSessionStatus(conv) === 'incomplete' ? 'border-orange-600' : ''
                              }
                            >
                              {getSessionStatus(conv)}
                            </Badge>
                            <Badge variant="outline">
                              {Array.isArray(conv.messages) ? conv.messages.length : 0} messages
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(conv.created_at)}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <strong className="text-sm">Session:</strong> {conv.session_name || conv.conversation_id.substring(0, 12)}
                        </div>
                        
                        {conv.user_id && (
                          <div className="mb-3">
                            <strong className="text-sm">User ID:</strong> {conv.user_id.substring(0, 8)}...
                          </div>
                        )}
                        
                        <div>
                          <strong className="text-sm">Latest Messages:</strong>
                          {renderMessages(conv.messages)}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Conversations with User Session Data</CardTitle>
              <CardDescription>Complete conversation history with user information and session analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Session Info</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Preview</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conversations.map((conv) => {
                      const sessionDuration = !conv.is_active ? 
                        Math.round((new Date(conv.updated_at).getTime() - new Date(conv.created_at).getTime()) / 60000) 
                        : null;
                      
                      return (
                        <TableRow key={conv.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-mono text-xs">
                                {conv.session_name || conv.conversation_id.substring(0, 12)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                ID: {conv.id.substring(0, 8)}...
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {conv.user_id ? (
                                <div className="font-medium text-xs">User ID: {conv.user_id.substring(0, 8)}...</div>
                              ) : (
                                <div className="text-xs text-muted-foreground">Anonymous</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {Array.isArray(conv.messages) ? conv.messages.length : 0}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                getSessionStatus(conv) === 'active' ? 'default' :
                                getSessionStatus(conv) === 'completed' ? 'default' :
                                getSessionStatus(conv) === 'incomplete' ? 'outline' : 'secondary'
                              }
                              className={
                                getSessionStatus(conv) === 'active' ? 'bg-green-600' :
                                getSessionStatus(conv) === 'completed' ? 'bg-blue-600' :
                                getSessionStatus(conv) === 'incomplete' ? 'border-orange-600' : ''
                              }
                            >
                              {getSessionStatus(conv)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs">
                            {sessionDuration ? `${sessionDuration} min` : 'Ongoing'}
                          </TableCell>
                          <TableCell className="text-xs">
                            {formatDate(conv.created_at)}
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs">
                              {renderMessages(conv.messages)}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Requests Tab */}
        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests Management</CardTitle>
              <CardDescription>Users requesting additional access or permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Request Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Requested</TableHead>
                      <TableHead>Reviewed</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="space-y-1">
                            {request.user_name && (
                              <div className="font-medium">{request.user_name}</div>
                            )}
                            <div className="text-xs text-muted-foreground">{request.user_email}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {request.ip_address}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm">{request.request_reason}</div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              request.status === 'pending' ? 'default' :
                              request.status === 'approved' ? 'default' : 'destructive'
                            }
                            className={
                              request.status === 'pending' ? 'bg-yellow-600' :
                              request.status === 'approved' ? 'bg-green-600' : ''
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {formatDate(request.requested_at)}
                        </TableCell>
                        <TableCell className="text-xs">
                          {request.reviewed_at ? formatDate(request.reviewed_at) : 'Pending'}
                        </TableCell>
                        <TableCell className="max-w-xs text-xs">
                          {request.admin_notes || 'No notes'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Analytics</CardTitle>
                <CardDescription>Advanced conversation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Completion Rate</span>
                      <span className="text-sm font-bold">
                        {Math.round((stats.completedConversations / Math.max(stats.totalConversations, 1)) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(stats.completedConversations / Math.max(stats.totalConversations, 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">User Retention (7 days)</span>
                      <span className="text-sm font-bold">{stats.userRetentionRate}%</span>
                    </div>
                    <Progress value={stats.userRetentionRate} className="h-2" />
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Average Session Length</span>
                        <span className="text-xs font-medium">{stats.averageSessionLength} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Peak Activity Hours</span>
                        <span className="text-xs font-medium">{stats.peakHours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Messages per Session</span>
                        <span className="text-xs font-medium">
                          {stats.totalConversations > 0 ? Math.round(stats.totalMessages / stats.totalConversations) : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>User behavior and interaction patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Registered Users</span>
                      <span className="text-sm font-bold">{stats.registeredUsers}</span>
                    </div>
                    <Progress 
                      value={(stats.registeredUsers / Math.max(stats.totalUsers, 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Anonymous Users</span>
                      <span className="text-sm font-bold">{stats.anonymousUsers}</span>
                    </div>
                    <Progress 
                      value={(stats.anonymousUsers / Math.max(stats.totalUsers, 1)) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Growth Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">New Users Today</span>
                        <span className="text-xs font-medium">{stats.newUsersToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">New Sessions Today</span>
                        <span className="text-xs font-medium">{stats.recentConversations}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Pending Access Requests</span>
                        <span className="text-xs font-medium">{stats.pendingAccessRequests}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};