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
  MapPin,
  Brain,
  Zap,
  Database,
  ArrowRightLeft,
  Bot,
  BookOpen,
  Target,
  BarChart3,
  PieChart
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
    userRetentionRate: 0,

    // Advanced Context Analytics
    technologyContexts: 0,
    healthcareContexts: 0,
    generalContexts: 0,
    contextSwitches: 0,
    techToHealthSwitches: 0,
    healthToTechSwitches: 0,
    
    // Model Usage Analytics
    singleModelUsage: 0,
    multiModelUsage: 0,
    defaultModelUsage: 0,
    systemModelUsage: 0,
    
    // Detailed Model Breakdowns
    singleModelBreakdown: {} as Record<string, number>,
    multiModelBreakdown: {} as Record<string, number>,
    llmBreakdown: {} as Record<string, number>,
    smallLMBreakdown: {} as Record<string, number>,
    visionLMBreakdown: {} as Record<string, number>,
    modelCombinations: {} as Record<string, number>,
    
    // Knowledge Base Analytics
    knowledgeBaseEnabled: 0,
    knowledgeBaseDisabled: 0,
    ragQueries: 0,
    
    // Human Escalation Analytics
    humanEscalationRequests: 0,
    escalationSuccessful: 0,
    escalationPending: 0,
    
    // Topic Distribution
    topicsBreakdown: {} as Record<string, number>,
    modelBreakdown: {} as Record<string, number>
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
    
    // Advanced Analytics
    let technologyContexts = 0;
    let healthcareContexts = 0;
    let generalContexts = 0;
    let contextSwitches = 0;
    let techToHealthSwitches = 0;
    let healthToTechSwitches = 0;
    
    let singleModelUsage = 0;
    let multiModelUsage = 0;
    let defaultModelUsage = 0;
    let systemModelUsage = 0;
    
    let knowledgeBaseEnabled = 0;
    let knowledgeBaseDisabled = 0;
    let ragQueries = 0;
    
    let humanEscalationRequests = 0;
    let escalationSuccessful = 0;
    let escalationPending = 0;
    
    const topicsBreakdown: Record<string, number> = {};
    const modelBreakdown: Record<string, number> = {};
    
    // Detailed model analytics
    const singleModelBreakdown: Record<string, number> = {};
    const multiModelBreakdown: Record<string, number> = {};
    const llmBreakdown: Record<string, number> = {};
    const smallLMBreakdown: Record<string, number> = {};
    const visionLMBreakdown: Record<string, number> = {};
    const modelCombinations: Record<string, number> = {};
    
    convs.forEach(conv => {
      if (conv.messages && Array.isArray(conv.messages)) {
        totalMessages += conv.messages.length;
        
        // Analyze conversation context and topics
        const conversationText = conv.messages
          .map((msg: any) => typeof msg.content === 'string' ? msg.content.toLowerCase() : '')
          .join(' ');
        
        // Detect technology vs healthcare context
        const technologyKeywords = ['software', 'technology', 'coding', 'programming', 'computer', 'app', 'website', 'digital', 'ai', 'machine learning', 'data'];
        const healthcareKeywords = ['health', 'medical', 'patient', 'doctor', 'clinic', 'treatment', 'diagnosis', 'medicine', 'healthcare', 'hospital'];
        
        const hasTechnology = technologyKeywords.some(keyword => conversationText.includes(keyword));
        const hasHealthcare = healthcareKeywords.some(keyword => conversationText.includes(keyword));
        
        if (hasTechnology && hasHealthcare) {
          contextSwitches++;
          // Analyze order to determine switch direction
          const firstTechIndex = Math.min(...technologyKeywords.map(k => conversationText.indexOf(k)).filter(i => i !== -1));
          const firstHealthIndex = Math.min(...healthcareKeywords.map(k => conversationText.indexOf(k)).filter(i => i !== -1));
          
          if (firstTechIndex < firstHealthIndex) {
            techToHealthSwitches++;
          } else {
            healthToTechSwitches++;
          }
        } else if (hasTechnology) {
          technologyContexts++;
        } else if (hasHealthcare) {
          healthcareContexts++;
        } else {
          generalContexts++;
        }
        
        // Check for human escalation requests
        const escalationKeywords = ['human', 'live agent', 'speak to person', 'transfer', 'escalate', 'real person'];
        const hasEscalationRequest = escalationKeywords.some(keyword => conversationText.includes(keyword));
        if (hasEscalationRequest) {
          humanEscalationRequests++;
          // Check if escalation was handled (based on message patterns)
          const hasEscalationResponse = conversationText.includes('connecting you') || conversationText.includes('transferring');
          if (hasEscalationResponse) {
            escalationSuccessful++;
          } else {
            escalationPending++;
          }
        }
        
        // Check for RAG/Knowledge base usage
        const hasKnowledgeQuery = conversationText.includes('knowledge') || conversationText.includes('search') || conversationText.includes('find information');
        if (hasKnowledgeQuery) {
          ragQueries++;
        }
      }
      
      // Analyze configuration for model usage and knowledge base
      if (conv.configuration_snapshot) {
        const config = conv.configuration_snapshot;
        
        // Enhanced model usage analysis
        const analyzeModelConfiguration = (config: any) => {
          const models = [];
          let modelType = 'default';
          
          // Extract model information from various config fields
          if (config.model_name) models.push(config.model_name);
          if (config.primary_model) models.push(config.primary_model);
          if (config.models && Array.isArray(config.models)) models.push(...config.models);
          if (config.ai_model) models.push(config.ai_model);
          if (config.model_provider) {
            if (config.model_id) {
              models.push(`${config.model_provider}/${config.model_id}`);
            } else {
              models.push(config.model_provider);
            }
          }
          
          // Determine model type from configuration
          if (config.model_type) {
            modelType = config.model_type.toLowerCase();
          } else if (models.length > 1) {
            modelType = 'multi';
          } else if (models.length === 1) {
            modelType = 'single';
          }
          
          return { models, modelType };
        };
        
        const { models, modelType: detectedModelType } = analyzeModelConfiguration(config);
        
        // Categorize models
        const categorizeModel = (modelName: string) => {
          const model = modelName.toLowerCase();
          
          // Large Language Models
          const llmPatterns = [
            'gpt-4', 'gpt-3.5', 'claude', 'gemini-pro', 'palm-2', 'llama-2-70b', 
            'claude-opus', 'claude-sonnet', 'gpt-5', 'gemini-2.5-pro'
          ];
          
          // Small Language Models
          const smallLMPatterns = [
            'gpt-3.5-turbo', 'claude-haiku', 'gemini-flash', 'llama-2-7b', 'llama-2-13b',
            'phi-3', 'mistral-7b', 'gemini-2.5-flash', 'gpt-5-mini', 'gpt-5-nano'
          ];
          
          // Vision Language Models
          const visionLMPatterns = [
            'gpt-4-vision', 'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku',
            'gemini-pro-vision', 'gpt-4o', 'claude-4', 'gemini-2.5-flash-image'
          ];
          
          if (visionLMPatterns.some(pattern => model.includes(pattern))) {
            return 'vision';
          } else if (smallLMPatterns.some(pattern => model.includes(pattern))) {
            return 'small';
          } else if (llmPatterns.some(pattern => model.includes(pattern))) {
            return 'llm';
          }
          return 'other';
        };
        
        // Process models based on type
        if (detectedModelType.includes('single') && models.length > 0) {
          singleModelUsage++;
          const primaryModel = models[0];
          singleModelBreakdown[primaryModel] = (singleModelBreakdown[primaryModel] || 0) + 1;
          
          const category = categorizeModel(primaryModel);
          if (category === 'llm') {
            llmBreakdown[primaryModel] = (llmBreakdown[primaryModel] || 0) + 1;
          } else if (category === 'small') {
            smallLMBreakdown[primaryModel] = (smallLMBreakdown[primaryModel] || 0) + 1;
          } else if (category === 'vision') {
            visionLMBreakdown[primaryModel] = (visionLMBreakdown[primaryModel] || 0) + 1;
          }
        } else if (detectedModelType.includes('multi') && models.length > 1) {
          multiModelUsage++;
          const combination = models.sort().join(' + ');
          multiModelBreakdown[combination] = (multiModelBreakdown[combination] || 0) + 1;
          modelCombinations[combination] = (modelCombinations[combination] || 0) + 1;
          
          // Categorize each model in the combination
          models.forEach(model => {
            const category = categorizeModel(model);
            if (category === 'llm') {
              llmBreakdown[model] = (llmBreakdown[model] || 0) + 1;
            } else if (category === 'small') {
              smallLMBreakdown[model] = (smallLMBreakdown[model] || 0) + 1;
            } else if (category === 'vision') {
              visionLMBreakdown[model] = (visionLMBreakdown[model] || 0) + 1;
            }
          });
        } else if (detectedModelType.includes('system')) {
          systemModelUsage++;
        } else {
          defaultModelUsage++;
        }
        
        // General model breakdown
        models.forEach(model => {
          modelBreakdown[model] = (modelBreakdown[model] || 0) + 1;
        });
        if (models.length === 0) {
          modelBreakdown['default'] = (modelBreakdown['default'] || 0) + 1;
        }
        
        // Knowledge base analysis
        if (config.knowledge_base_enabled === true || config.rag_enabled === true) {
          knowledgeBaseEnabled++;
        } else {
          knowledgeBaseDisabled++;
        }
        
        // Topics analysis
        if (config.topics && Array.isArray(config.topics)) {
          config.topics.forEach((topic: string) => {
            topicsBreakdown[topic] = (topicsBreakdown[topic] || 0) + 1;
          });
        }
      } else {
        // No configuration means default settings
        defaultModelUsage++;
        knowledgeBaseDisabled++;
        modelBreakdown['default'] = (modelBreakdown['default'] || 0) + 1;
        singleModelBreakdown['default'] = (singleModelBreakdown['default'] || 0) + 1;
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
      userRetentionRate,
      technologyContexts,
      healthcareContexts,
      generalContexts,
      contextSwitches,
      techToHealthSwitches,
      healthToTechSwitches,
      singleModelUsage,
      multiModelUsage,
      defaultModelUsage,
      systemModelUsage,
      knowledgeBaseEnabled,
      knowledgeBaseDisabled,
      ragQueries,
      humanEscalationRequests,
      escalationSuccessful,
      escalationPending,
      topicsBreakdown,
      modelBreakdown,
      singleModelBreakdown,
      multiModelBreakdown,
      llmBreakdown,
      smallLMBreakdown,
      visionLMBreakdown,
      modelCombinations
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="context">Context Analytics</TabsTrigger>
          <TabsTrigger value="models">Model Usage</TabsTrigger>
          <TabsTrigger value="users">Users & Sessions</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="access">Access Requests</TabsTrigger>
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

        {/* Context Analytics Tab */}
        <TabsContent value="context" className="space-y-6">
          {/* Context Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Technology Context</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.technologyContexts}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.technologyContexts / Math.max(stats.totalConversations, 1)) * 100)}% of conversations
                    </p>
                  </div>
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Healthcare Context</p>
                    <p className="text-2xl font-bold text-green-600">{stats.healthcareContexts}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.healthcareContexts / Math.max(stats.totalConversations, 1)) * 100)}% of conversations
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">General Context</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.generalContexts}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.generalContexts / Math.max(stats.totalConversations, 1)) * 100)}% of conversations
                    </p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Context Switching Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Context Switching Analysis</CardTitle>
                <CardDescription>Conversations that switched between topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Total Context Switches</span>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {stats.contextSwitches}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tech → Healthcare</span>
                      <span className="text-sm font-bold text-green-600">{stats.techToHealthSwitches}</span>
                    </div>
                    <Progress 
                      value={(stats.techToHealthSwitches / Math.max(stats.contextSwitches, 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Healthcare → Tech</span>
                      <span className="text-sm font-bold text-blue-600">{stats.healthToTechSwitches}</span>
                    </div>
                    <Progress 
                      value={(stats.healthToTechSwitches / Math.max(stats.contextSwitches, 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Human Escalation Analytics</CardTitle>
                <CardDescription>Requests for live human assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium">Escalation Requests</span>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {stats.humanEscalationRequests}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Successfully Connected</span>
                      <span className="text-sm font-bold text-green-600">{stats.escalationSuccessful}</span>
                    </div>
                    <Progress 
                      value={(stats.escalationSuccessful / Math.max(stats.humanEscalationRequests, 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending/Failed</span>
                      <span className="text-sm font-bold text-orange-600">{stats.escalationPending}</span>
                    </div>
                    <Progress 
                      value={(stats.escalationPending / Math.max(stats.humanEscalationRequests, 1)) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Topics Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Topics Distribution</CardTitle>
              <CardDescription>Most discussed topics across conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {Object.entries(stats.topicsBreakdown)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 10)
                    .map(([topic, count]) => (
                    <div key={topic} className="flex items-center justify-between p-2 rounded bg-muted">
                      <span className="text-sm font-medium capitalize">{topic}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{count}</Badge>
                        <div className="w-16">
                          <Progress 
                            value={(count / Math.max(stats.totalConversations, 1)) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {Object.keys(stats.topicsBreakdown).length === 0 && (
                    <div className="text-center text-muted-foreground py-4">
                      No topic data available
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Model Usage Tab */}
        <TabsContent value="models" className="space-y-6">
          {/* Model Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Single Model</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.singleModelUsage}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.singleModelUsage / Math.max(stats.totalConversations, 1)) * 100)}%
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Multi Model</p>
                    <p className="text-2xl font-bold text-green-600">{stats.multiModelUsage}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.multiModelUsage / Math.max(stats.totalConversations, 1)) * 100)}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">System Default</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.systemModelUsage}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.systemModelUsage / Math.max(stats.totalConversations, 1)) * 100)}%
                    </p>
                  </div>
                  <Bot className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Default Config</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.defaultModelUsage}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((stats.defaultModelUsage / Math.max(stats.totalConversations, 1)) * 100)}%
                    </p>
                  </div>
                  <PieChart className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Knowledge Base Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Usage</CardTitle>
                <CardDescription>RAG and knowledge base enablement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Knowledge Base Enabled</span>
                      <span className="text-sm font-bold text-green-600">{stats.knowledgeBaseEnabled}</span>
                    </div>
                    <Progress 
                      value={(stats.knowledgeBaseEnabled / Math.max(stats.totalConversations, 1)) * 100} 
                      className="h-3"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Knowledge Base Disabled</span>
                      <span className="text-sm font-bold text-gray-600">{stats.knowledgeBaseDisabled}</span>
                    </div>
                    <Progress 
                      value={(stats.knowledgeBaseDisabled / Math.max(stats.totalConversations, 1)) * 100} 
                      className="h-3"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">RAG Queries Detected</span>
                      </div>
                      <Badge variant="outline" className="text-lg font-bold">
                        {stats.ragQueries}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Model Usage Breakdown</CardTitle>
                <CardDescription>Specific models used within single and multi configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="single" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="single">Single Models</TabsTrigger>
                    <TabsTrigger value="multi">Multi Models</TabsTrigger>
                    <TabsTrigger value="llm">Large LLMs</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="single" className="space-y-4">
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {Object.entries(stats.singleModelBreakdown)
                          .sort(([,a], [,b]) => b - a)
                          .map(([model, count]) => (
                          <div key={model} className="flex items-center justify-between p-2 rounded bg-muted">
                            <span className="text-sm font-medium">{model}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{count}</Badge>
                              <div className="w-16">
                                <Progress 
                                  value={(count / Math.max(stats.singleModelUsage, 1)) * 100} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {Object.keys(stats.singleModelBreakdown).length === 0 && (
                          <div className="text-center text-muted-foreground py-4">
                            No single model data available
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="multi" className="space-y-4">
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {Object.entries(stats.multiModelBreakdown)
                          .sort(([,a], [,b]) => b - a)
                          .map(([combination, count]) => (
                          <div key={combination} className="flex items-center justify-between p-2 rounded bg-muted">
                            <span className="text-xs font-medium">{combination}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{count}</Badge>
                              <div className="w-16">
                                <Progress 
                                  value={(count / Math.max(stats.multiModelUsage, 1)) * 100} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {Object.keys(stats.multiModelBreakdown).length === 0 && (
                          <div className="text-center text-muted-foreground py-4">
                            No multi-model combinations available
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="llm" className="space-y-4">
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {Object.entries(stats.llmBreakdown)
                          .sort(([,a], [,b]) => b - a)
                          .map(([model, count]) => (
                          <div key={model} className="flex items-center justify-between p-2 rounded bg-muted">
                            <span className="text-sm font-medium">{model}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{count}</Badge>
                              <div className="w-16">
                                <Progress 
                                  value={(count / Math.max(Object.values(stats.llmBreakdown).reduce((a,b) => a+b, 0), 1)) * 100} 
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {Object.keys(stats.llmBreakdown).length === 0 && (
                          <div className="text-center text-muted-foreground py-4">
                            No Large LLM usage detected
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="categories" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Large Language Models</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-2xl font-bold text-blue-600">
                            {Object.values(stats.llmBreakdown).reduce((a,b) => a+b, 0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            GPT-4, Claude, Gemini Pro
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Small Language Models</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-2xl font-bold text-green-600">
                            {Object.values(stats.smallLMBreakdown).reduce((a,b) => a+b, 0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Haiku, Flash, Mini models
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Vision Language Models</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="text-2xl font-bold text-purple-600">
                            {Object.values(stats.visionLMBreakdown).reduce((a,b) => a+b, 0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Vision-enabled models
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Small Language Models Detail</h4>
                        <ScrollArea className="h-32">
                          <div className="space-y-1">
                            {Object.entries(stats.smallLMBreakdown)
                              .sort(([,a], [,b]) => b - a)
                              .map(([model, count]) => (
                              <div key={model} className="flex justify-between text-sm">
                                <span>{model}</span>
                                <Badge variant="outline">{count}</Badge>
                              </div>
                            ))}
                            {Object.keys(stats.smallLMBreakdown).length === 0 && (
                              <div className="text-xs text-muted-foreground">No small LM usage detected</div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Vision Language Models Detail</h4>
                        <ScrollArea className="h-32">
                          <div className="space-y-1">
                            {Object.entries(stats.visionLMBreakdown)
                              .sort(([,a], [,b]) => b - a)
                              .map(([model, count]) => (
                              <div key={model} className="flex justify-between text-sm">
                                <span>{model}</span>
                                <Badge variant="outline">{count}</Badge>
                              </div>
                            ))}
                            {Object.keys(stats.visionLMBreakdown).length === 0 && (
                              <div className="text-xs text-muted-foreground">No vision LM usage detected</div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
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

        {/* Advanced Analytics Tab - Removed and integrated into other tabs */}
      </Tabs>
    </div>
  );
};