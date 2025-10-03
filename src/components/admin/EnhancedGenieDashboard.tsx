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
  PieChart,
  Server,
  Cpu,
  Timer,
  Plus,
  Edit,
  Tag
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { VisitorAnalyticsDashboard } from './VisitorAnalyticsDashboard';

interface ConversationRecord {
  id: string;
  user_id?: string;
  conversation_id?: string;
  session_id?: string;
  session_name?: string;
  messages?: any;
  conversation_data?: any;
  configuration_snapshot?: any;
  is_active?: boolean;
  status?: string;
  created_at: string;
  updated_at: string;
  context?: string;
  agent_id?: string;
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
  const [knowledgeEntries, setKnowledgeEntries] = useState<any[]>([]);
  const [genieConversations, setGenieConversations] = useState<any[]>([]);
  const [modelUsageData, setModelUsageData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newKnowledgeEntry, setNewKnowledgeEntry] = useState({
    title: '',
    content: '',
    category: 'technology',
    tags: '',
    inputType: 'text', // text, url, html, file
    url: '',
    html: ''
  });
  const [showAddKnowledge, setShowAddKnowledge] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
    modelBreakdown: {} as Record<string, number>,
    
    // Website Visitor Analytics (from visitor_analytics table)
    websitePageViews: 0,
    websiteUniqueVisitors: 0,
    websiteAvgTimeOnPage: 0,
    websitePagesVisited: 0
  });

  // Performance & Capacity Metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    currentConcurrentSessions: 0,
    maxConcurrentCapacity: 1000, // Supabase default
    avgResponseTime: 0,
    peakResponseTime: 0,
    hourlyRequestVolume: 0,
    dailyRequestVolume: 0,
    successRate: 0,
    errorRate: 0,
    databaseConnections: 0,
    maxDatabaseConnections: 100,
    edgeFunctionInvocations: 0
  });

  const [capacityLimits] = useState({
    rateLimits: {
      conversationsPerHour: 10,
      messagesPerConversation: 50,
      tokensPerHour: 10000,
      ipBasedLimit: 2
    },
    systemLimits: {
      maxConcurrentConversations: 1000,
      maxDatabaseConnections: 100,
      maxEdgeFunctionConcurrency: 50,
      maxStorageGB: 8,
      maxBandwidthGB: 250
    },
    performanceThresholds: {
      maxResponseTimeMs: 5000,
      targetSuccessRate: 99.5,
      maxErrorRate: 0.5
    }
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load Genie AI popup conversations
      const { data: genieConvData, error: genieConvError } = await supabase
        .from('genie_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (genieConvError) {
        console.error('Genie conversations error:', genieConvError);
      }
      
      console.log('📊 LOADED GENIE CONVERSATIONS (Popup):', genieConvData?.length || 0);
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
      console.log('🤖 EXTRACTED MODEL USAGE:', models.length);
      setModelUsageData(models);
      
      // Load main site agent conversations
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('agent_conversations')
        .select('*')
        .order('created_at', { ascending: false });

      if (conversationsError) {
        console.log('Agent conversations error (may not exist):', conversationsError);
      } else {
        console.log('📊 LOADED AGENT CONVERSATIONS (Main Site):', conversationsData?.length || 0);
      }
      
      setConversations(conversationsData || []);

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

      // Load knowledge base entries (if available)
      const { data: knowledgeData } = await supabase
        .from('knowledge_base')
        .select('*')
        .order('created_at', { ascending: false });

      // Load visitor analytics summary for the same time period as conversations
      // Use 30 days to match the default conversation filter
      const { data: visitorAnalyticsRawData, error: visitorError } = await supabase
        .rpc('get_visitor_analytics_summary', { days_back: 7 }); // Match the 7-day filter

      if (visitorError) {
        console.error('Error loading visitor analytics:', visitorError);
      }

      console.log('Visitor Analytics Raw Data (7 days):', visitorAnalyticsRawData);

      // Transform the visitor analytics data to match the expected format for WebsiteAnalyticsSection
      const visitorAnalyticsData = visitorAnalyticsRawData ? {
        summary: {
          total_views: (visitorAnalyticsRawData as any).total_page_views || 0,
          unique_visitors: (visitorAnalyticsRawData as any).total_visitors || 0,
          avg_time_on_page_seconds: Math.round((visitorAnalyticsRawData as any).avg_time_on_page || 0),
          unique_pages: (visitorAnalyticsRawData as any).unique_countries || 0
        },
        locations: ((visitorAnalyticsRawData as any).geographic_distribution || []).map((geo: any) => ({
          country: geo.country || 'Unknown',
          region: geo.region || geo.city || null,
          visitor_count: geo.visitors || 0
        })),
        top_pages: [], // Not yet available in the current function
        session_journeys: [] // Not yet available in the current function
      } : null;

      // Set data
      console.log('========== DATA LOADING DEBUG ==========');
      console.log('Genie Conversations (Popup):', genieConvData?.length || 0, 'records');
      console.log('Agent Conversations (Main Site):', conversationsData?.length || 0, 'records');
      console.log('Access Requests loaded:', accessRequestsData?.length || 0, 'records');
      console.log('User Profiles loaded:', profilesData?.length || 0, 'records');
      console.log('Knowledge Entries loaded:', knowledgeData?.length || 0, 'records');
      console.log('Model Usage Records:', models.length);
      console.log('Transformed Visitor Analytics:', visitorAnalyticsData);
      console.log('=========================================');
      
      setAccessRequests(accessRequestsData || []);
      setUserProfiles(profilesData || []);
      setKnowledgeEntries(knowledgeData || []);

      // Calculate stats including visitor analytics and genie conversations
      calculateStats(
        genieConvData || [],
        conversationsData || [],
        accessRequestsData || [],
        profilesData || [],
        visitorAnalyticsData || null
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
    genieConvs: any[],
    convs: ConversationRecord[],
    requests: AccessRequest[],
    profiles: UserProfile[],
    visitorAnalytics: any = null
  ) => {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    // Combined conversation stats from both genie_conversations and agent_conversations
    const totalConversations = (genieConvs?.length || 0) + (convs?.length || 0);
    const activeConversations = (genieConvs?.filter((c: any) => c.is_active).length || 0) + (convs?.filter((c: any) => c.is_active || c.status === 'active').length || 0);
    const completedConversations = (genieConvs?.filter((c: any) => !c.is_active).length || 0) + (convs?.filter((c: any) => !c.is_active && c.status !== 'active').length || 0);
    const recentConversations = (genieConvs?.filter((c: any) => new Date(c.created_at) > dayAgo).length || 0) + (convs?.filter((c: any) => new Date(c.created_at) > dayAgo).length || 0);
    
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
    
    // Process genie conversations (popup data)
    genieConvs?.forEach((conv: any) => {
      if (conv.messages && Array.isArray(conv.messages)) {
        totalMessages += conv.messages.length;
      }
      
      // Extract context analytics from genie conversations
      const context = conv.context || 'general';
      if (context.includes('tech')) technologyContexts++;
      else if (context.includes('health')) healthcareContexts++;
      else generalContexts++;
    });
    
    // Process agent conversations (main site data)
    convs?.forEach((conv: any) => {
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

    // Extract visitor analytics data and log for debugging
    console.log('========== VISITOR ANALYTICS DEBUG ==========');
    console.log('Full visitor analytics object:', JSON.stringify(visitorAnalytics, null, 2));
    console.log('Summary object:', visitorAnalytics?.summary);
    
    const websitePageViews = visitorAnalytics?.summary?.total_views || 0;
    const websiteUniqueVisitors = visitorAnalytics?.summary?.unique_visitors || 0;
    const websiteAvgTimeOnPage = visitorAnalytics?.summary?.avg_time_on_page_seconds || 0;
    const websitePagesVisited = visitorAnalytics?.summary?.unique_pages || 0;
    
    console.log('Extracted values:', {
      pageViews: websitePageViews,
      uniqueVisitors: websiteUniqueVisitors,
      avgTime: websiteAvgTimeOnPage,
      pagesVisited: websitePagesVisited,
      rawTotal: visitorAnalytics?.summary?.total_views,
      rawUnique: visitorAnalytics?.summary?.unique_visitors
    });
    console.log('=============================================');

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
      modelCombinations,
      websitePageViews,
      websiteUniqueVisitors,
      websiteAvgTimeOnPage,
      websitePagesVisited
    });

    // Calculate performance metrics
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
    
    const hourlyConversations = convs.filter(conv => 
      new Date(conv.created_at) > oneHourAgo
    );
    
    const dailyConversationsList = convs.filter(conv => 
      new Date(conv.created_at) > oneDayAgo
    );

    // Calculate response times and success rates
    const responseTimes = hourlyConversations.map(conv => {
      const messages = conv.messages || [];
      return Array.isArray(messages) && messages.length > 0 ? messages.length * 1000 : 2000; // Estimate
    });

    const avgResponse = responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;

    const peakResponse = responseTimes.length > 0 
      ? Math.max(...responseTimes) 
      : 0;

    const successfulConversations = convs.filter(conv => 
      !conv.is_active && Array.isArray(conv.messages) && conv.messages.length > 0
    );

    const successRate = convs.length > 0 
      ? (successfulConversations.length / convs.length) * 100 
      : 100;

    setPerformanceMetrics(prev => ({
      ...prev,
      currentConcurrentSessions: hourlyConversations.filter(conv => conv.is_active).length,
      avgResponseTime: Math.round(avgResponse),
      peakResponseTime: Math.round(peakResponse),
      hourlyRequestVolume: hourlyConversations.length,
      dailyRequestVolume: dailyConversationsList.length,
      successRate: Math.round(successRate * 100) / 100,
      errorRate: Math.round((100 - successRate) * 100) / 100,
      databaseConnections: Math.min(convs.length, 100),
      edgeFunctionInvocations: convs.reduce((total, conv) => 
        total + (Array.isArray(conv.messages) ? conv.messages.length : 0), 0
      )
    }));
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

  const handleAddKnowledgeEntry = async () => {
    if (!newKnowledgeEntry.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    // Validate based on input type
    if (newKnowledgeEntry.inputType === 'text' && !newKnowledgeEntry.content) {
      toast({
        title: "Error",
        description: "Content is required for text input",
        variant: "destructive",
      });
      return;
    }

    if (newKnowledgeEntry.inputType === 'url' && !newKnowledgeEntry.url) {
      toast({
        title: "Error",
        description: "URL is required for URL input",
        variant: "destructive",
      });
      return;
    }

    if (newKnowledgeEntry.inputType === 'html' && !newKnowledgeEntry.html) {
      toast({
        title: "Error",
        description: "HTML content is required for HTML input",
        variant: "destructive",
      });
      return;
    }

    if (newKnowledgeEntry.inputType === 'file' && !selectedFile) {
      toast({
        title: "Error",
        description: "File is required for file input",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      let filePath = null;
      let fileName = null;
      let fileSize = null;
      let fileType = null;
      let processedContent = '';

      // Handle file upload
      if (newKnowledgeEntry.inputType === 'file' && selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const timestamp = Date.now();
        filePath = `${timestamp}-${selectedFile.name}`;
        fileName = selectedFile.name;
        fileSize = selectedFile.size;
        fileType = selectedFile.type;

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from('knowledge-files')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        // For text-based files, read content directly
        if (selectedFile.type.startsWith('text/') || 
            selectedFile.type === 'application/json' ||
            selectedFile.name.endsWith('.sql') ||
            selectedFile.name.endsWith('.md')) {
          const fileContent = await selectedFile.text();
          processedContent = fileContent;
        } else {
          // For complex documents, we would need to implement parsing
          processedContent = `File uploaded: ${fileName} (${fileType})`;
        }
      }

      // Prepare insert data
      const insertData: any = {
        name: newKnowledgeEntry.title,
        category: newKnowledgeEntry.category,
        healthcare_tags: newKnowledgeEntry.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        status: 'approved',
        source_type: 'admin_created',
        is_active: true,
        is_static: false
      };

      // Set content based on input type
      switch (newKnowledgeEntry.inputType) {
        case 'text':
          insertData.description = newKnowledgeEntry.content;
          insertData.processed_content = newKnowledgeEntry.content;
          break;
        case 'url':
          insertData.content_url = newKnowledgeEntry.url;
          insertData.description = `Content from URL: ${newKnowledgeEntry.url}`;
          // We could fetch and process the URL content here
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

      const { error } = await supabase
        .from('knowledge_base')
        .insert(insertData);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Knowledge entry added successfully",
      });

      setNewKnowledgeEntry({ 
        title: '', 
        content: '', 
        category: 'technology', 
        tags: '', 
        inputType: 'text',
        url: '',
        html: ''
      });
      setSelectedFile(null);
      setShowAddKnowledge(false);
      loadDashboardData();
    } catch (error) {
      console.error('Error adding knowledge entry:', error);
      toast({
        title: "Error",
        description: "Failed to add knowledge entry",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (20MB limit)
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 20MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  // Get static knowledge base entries from existing components with accurate counts
  const getStaticKnowledgeEntries = () => {
    // Technology Knowledge Base entries - comprehensive list
    const techEntries = [
      // Market Landscape (Big Tech)
      { title: "OpenAI - GPT Models & ChatGPT", category: "technology", tags: ["AI", "LLM", "OpenAI"] },
      { title: "Anthropic - Claude & Constitutional AI", category: "technology", tags: ["AI", "safety", "Claude"] },
      { title: "Google/Alphabet - Gemini & Bard", category: "technology", tags: ["Google", "Gemini", "search"] },
      { title: "Microsoft - Copilot & Azure AI", category: "technology", tags: ["Microsoft", "Copilot", "Azure"] },
      { title: "Meta - Llama & Open Source AI", category: "technology", tags: ["Meta", "Llama", "open-source"] },
      
      // Enterprise Platforms
      { title: "Oracle - Database AI & Cloud", category: "technology", tags: ["Oracle", "database", "cloud"] },
      { title: "Salesforce - Einstein AI & CRM", category: "technology", tags: ["Salesforce", "CRM", "Einstein"] },
      { title: "SAP - Business AI & ERP", category: "technology", tags: ["SAP", "ERP", "business"] },
      { title: "ServiceNow - IT Service AI", category: "technology", tags: ["ServiceNow", "ITSM", "workflow"] },
      { title: "Veeva - Life Sciences AI", category: "technology", tags: ["Veeva", "pharma", "clinical"] },
      
      // Emerging Platforms
      { title: "AI Development Platforms", category: "technology", tags: ["Hugging Face", "Replicate", "deployment"] },
      { title: "Agentic AI Platforms", category: "technology", tags: ["LangChain", "CrewAI", "agents"] },
      { title: "No-Code AI Builders", category: "technology", tags: ["Bubble", "Zapier", "no-code"] },
      { title: "Development Tools Revolution", category: "technology", tags: ["Cursor", "GitHub Copilot", "coding"] },
      { title: "No-Code/Low-Code Platforms", category: "technology", tags: ["Lovable", "Bolt", "visual development"] },
      
      // Language Models
      { title: "Large Language Models (LLMs)", category: "technology", tags: ["GPT-4", "Claude", "Gemini"] },
      { title: "Small Language Models (SLMs)", category: "technology", tags: ["Phi-3", "Gemma", "edge AI"] },
      { title: "Model Context Protocol (MCP)", category: "technology", tags: ["Anthropic", "data integration", "security"] },
      
      // Security & Compliance
      { title: "AI Security Tools", category: "technology", tags: ["Robust Intelligence", "Protect AI", "security"] },
      { title: "GDPR & Privacy Tools", category: "technology", tags: ["OneTrust", "TrustArc", "privacy"] },
      { title: "Vulnerability Assessment", category: "technology", tags: ["Veracode", "Checkmarx", "security testing"] },
      
      // Workflow Tools
      { title: "Project Management Evolution", category: "technology", tags: ["Monday.com", "Notion", "Airtable"] },
      { title: "Communication Platforms", category: "technology", tags: ["Slack", "Teams", "Discord"] },
      { title: "Analytics & Business Intelligence", category: "technology", tags: ["Tableau", "Power BI", "Looker"] },
      
      // Integration Evolution
      { title: "API Management Platforms", category: "technology", tags: ["Postman", "Insomnia", "API testing"] },
      { title: "Cloud Infrastructure", category: "technology", tags: ["AWS", "Azure", "GCP"] },
      { title: "Container & Orchestration", category: "technology", tags: ["Docker", "Kubernetes", "DevOps"] },
      
      // Industry Trends
      { title: "Digital Transformation", category: "technology", tags: ["transformation", "automation", "AI adoption"] },
      { title: "Cybersecurity Evolution", category: "technology", tags: ["zero trust", "AI security", "threat detection"] },
      { title: "Quantum Computing", category: "technology", tags: ["quantum", "IBM", "Google Quantum"] },
      
      // Upcoming Conferences
      { title: "Tech Conference Calendar 2025", category: "technology", tags: ["conferences", "events", "networking"] },
      { title: "AI/ML Conference Schedule", category: "technology", tags: ["NeurIPS", "ICML", "AI events"] },
      
      // Digital Health Devices (Tech perspective)
      { title: "Wearable Technology Integration", category: "technology", tags: ["Apple Watch", "Fitbit", "IoT"] },
      { title: "Health Monitoring APIs", category: "technology", tags: ["HealthKit", "Google Fit", "integration"] }
    ];

    // Healthcare Knowledge Base entries - comprehensive list
    const healthcareEntries = [
      // Emotional Support & Communication
      { title: "Empathetic Patient Communication", category: "healthcare", tags: ["communication", "empathy", "patient care"] },
      { title: "Healthcare Navigation Support", category: "healthcare", tags: ["navigation", "insurance", "guidance"] },
      { title: "Patient Advocacy Responses", category: "healthcare", tags: ["advocacy", "support", "empowerment"] },
      
      // Visual References & Process Guides
      { title: "Pre-Infusion Preparation Guide", category: "healthcare", tags: ["infusion", "preparation", "patient education"] },
      { title: "During Infusion Care Protocols", category: "healthcare", tags: ["infusion", "monitoring", "safety"] },
      { title: "Post-Infusion Recovery Process", category: "healthcare", tags: ["infusion", "recovery", "follow-up"] },
      
      // Product Education
      { title: "Oncology Immunotherapy Options", category: "healthcare", tags: ["oncology", "immunotherapy", "cancer treatment"] },
      { title: "Targeted Therapy Guidelines", category: "healthcare", tags: ["targeted therapy", "precision medicine", "oncology"] },
      { title: "Cell & Gene Therapy Overview", category: "healthcare", tags: ["cell therapy", "gene therapy", "regenerative medicine"] },
      
      // Digital Therapeutics
      { title: "Digital Therapeutics Categories", category: "healthcare", tags: ["DTx", "digital health", "apps"] },
      { title: "Mental Health Digital Solutions", category: "healthcare", tags: ["mental health", "apps", "therapy"] },
      { title: "Chronic Disease Management DTx", category: "healthcare", tags: ["chronic disease", "diabetes", "management"] },
      { title: "DTx Reimbursement Landscape", category: "healthcare", tags: ["reimbursement", "DTx", "coverage"] },
      
      // Therapy Categories
      { title: "Cell & Gene Therapy Challenges", category: "healthcare", tags: ["CAR-T", "gene therapy", "manufacturing"] },
      { title: "Oncology Treatment Support Programs", category: "healthcare", tags: ["oncology", "patient support", "access"] },
      
      // Reimbursement Processes
      { title: "Prior Authorization Process", category: "healthcare", tags: ["prior auth", "insurance", "approval"] },
      { title: "Claims Submission Guidelines", category: "healthcare", tags: ["claims", "billing", "CPT codes"] },
      { title: "Digital Health Claims Processing", category: "healthcare", tags: ["digital health", "telehealth", "billing"] },
      
      // Payer Programs
      { title: "Medicare Digital Health Coverage", category: "healthcare", tags: ["Medicare", "digital health", "coverage"] },
      { title: "Medicaid State Variations", category: "healthcare", tags: ["Medicaid", "state programs", "coverage"] },
      { title: "Commercial Payer Trends", category: "healthcare", tags: ["commercial insurance", "value-based care", "trends"] },
      
      // Support Services
      { title: "Patient Assistance Programs", category: "healthcare", tags: ["patient assistance", "copay", "access"] },
      { title: "Provider Support Services", category: "healthcare", tags: ["provider support", "prior auth", "appeals"] },
      { title: "Digital Health Support Programs", category: "healthcare", tags: ["DTx support", "onboarding", "training"] },
      
      // Pricing Ecosystem
      { title: "340B Drug Pricing Program", category: "healthcare", tags: ["340B", "pricing", "safety net"] },
      { title: "WAC Pricing Structure", category: "healthcare", tags: ["WAC", "wholesale", "pricing"] },
      { title: "Group Purchasing Organizations", category: "healthcare", tags: ["GPO", "contracting", "procurement"] },
      
      // Claims Processing
      { title: "Inpatient vs Outpatient Claims", category: "healthcare", tags: ["claims", "inpatient", "outpatient"] },
      { title: "Claims Denial Prevention", category: "healthcare", tags: ["denial prevention", "claims management", "coding"] }
    ];

    return [...techEntries, ...healthcareEntries];
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

      <Tabs value={activeTab} onValueChange={(value) => {
        console.log('Tab changed to:', value);
        console.log('Current data counts:', {
          conversations: conversations.length,
          userProfiles: userProfiles.length,
          accessRequests: accessRequests.length,
          knowledgeEntries: knowledgeEntries.length
        });
        setActiveTab(value);
      }} className="space-y-4">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Analytics</TabsTrigger>
          <TabsTrigger value="context">Context</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Unified Analytics Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Unified Analytics Dashboard</h2>
            <p className="text-muted-foreground">Combined metrics for genieaiexperimentationhub.tech website and Genie AI chatbot</p>
          </div>

          {/* Website Analytics (from visitor_analytics table) */}
          <Card className="border-2 border-blue-500/20 bg-blue-50/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Website Traffic Analytics (genieaiexperimentationhub.tech)
              </CardTitle>
              <CardDescription>Data from visitor_analytics table - Last 7 days (matches conversation filter)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Page Views</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.websitePageViews}</p>
                    <p className="text-xs text-muted-foreground">All website pageviews</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
                    <p className="text-3xl font-bold text-green-600">{stats.websiteUniqueVisitors}</p>
                    <p className="text-xs text-muted-foreground">Unique sessions</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Time on Page</p>
                    <p className="text-3xl font-bold text-purple-600">{Math.floor(stats.websiteAvgTimeOnPage / 60)}m {stats.websiteAvgTimeOnPage % 60}s</p>
                    <p className="text-xs text-muted-foreground">Per page view</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pages Visited</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.websitePagesVisited}</p>
                    <p className="text-xs text-muted-foreground">Unique pages</p>
                  </div>
                  <Globe className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Genie AI Conversation Analytics (from genie_conversations table) */}
          <Card className="border-2 border-purple-500/20 bg-purple-50/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                Genie AI Chatbot Analytics
              </CardTitle>
              <CardDescription>Data from genie_conversations table - Conversational AI interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                    <p className="text-3xl font-bold text-primary">{stats.totalConversations}</p>
                    <p className="text-xs text-muted-foreground">{stats.recentConversations} in last 24h</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Chatbot Users</p>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                    <p className="text-xs text-muted-foreground">{stats.registeredUsers} registered</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                    <p className="text-3xl font-bold text-green-600">{stats.activeConversations}</p>
                    <p className="text-xs text-muted-foreground">{stats.recentConversations} started today</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Sessions</p>
                    <p className="text-3xl font-bold text-purple-600">{stats.completedConversations}</p>
                    <p className="text-xs text-muted-foreground">Avg: {stats.averageSessionLength} min</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Access Requests</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pendingAccessRequests}</p>
                    <p className="text-xs text-muted-foreground">{stats.approvedAccessRequests} approved</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
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

        {/* Visitor Analytics Tab */}
        <TabsContent value="visitors" className="space-y-6">
          <VisitorAnalyticsDashboard />
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

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-6">
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

          {/* Add Knowledge Entry Modal */}
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

                {/* Content based on input type */}
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
                    setNewKnowledgeEntry({ 
                      title: '', 
                      content: '', 
                      category: 'technology', 
                      tags: '', 
                      inputType: 'text',
                      url: '',
                      html: ''
                    });
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
                    <p className="text-2xl font-bold text-blue-600">60+</p>
                    <p className="text-xs text-muted-foreground">
                      Built-in knowledge
                    </p>
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
                    <p className="text-2xl font-bold text-green-600">
                      {knowledgeEntries.length}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Admin managed
                    </p>
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
                      {knowledgeEntries.filter(entry => entry.category === 'technology').length + 32}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tech knowledge
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
                    <p className="text-sm font-medium text-muted-foreground">Healthcare</p>
                    <p className="text-2xl font-bold text-red-600">
                      {knowledgeEntries.filter(entry => entry.category === 'healthcare').length + 28}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Medical knowledge
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Static vs Dynamic Explanation */}
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Static</Badge>
                    Built-in Knowledge
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Hardcoded entries from TechnologyKnowledgeBase.tsx and HealthcareKnowledgeBase.tsx files. 
                    These are predefined knowledge entries built into the application code and cannot be modified through the admin interface.
                  </p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• AI Market Landscape</li>
                    <li>• Enterprise Tech Giants</li>
                    <li>• Healthcare Reimbursement</li>
                    <li>• Digital Therapeutics</li>
                    <li>• ...and more</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge variant="default">Dynamic</Badge>
                    Database-managed Knowledge
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Entries stored in the database that can be added, edited, and managed through this admin interface. 
                    Supports multiple input types including text, URLs, HTML, and file uploads.
                  </p>
                  <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                    <li>• Text content entries</li>
                    <li>• URL-based knowledge</li>
                    <li>• HTML content</li>
                    <li>• File uploads (PDF, Word, etc.)</li>
                    <li>• Admin-created entries</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Base Entries */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Technology Knowledge Base */}
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
                    {/* Static Technology Entries */}
                    {getStaticKnowledgeEntries()
                      .filter(entry => entry.category === 'technology')
                      .map((entry, index) => (
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
                    
                    {/* Dynamic Technology Entries */}
                    {knowledgeEntries
                      .filter(entry => entry.category === 'technology')
                      .map((entry) => (
                      <Card key={entry.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{entry.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {entry.description?.substring(0, 100)}...
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {entry.healthcare_tags?.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge variant="default" className="text-xs">Dynamic</Badge>
                            {entry.status && (
                              <Badge variant={entry.status === 'approved' ? 'default' : 'secondary'} className="text-xs">
                                {entry.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Healthcare Knowledge Base */}
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
                    {/* Static Healthcare Entries */}
                    {getStaticKnowledgeEntries()
                      .filter(entry => entry.category === 'healthcare')
                      .map((entry, index) => (
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
                    
                    {/* Dynamic Healthcare Entries */}
                    {knowledgeEntries
                      .filter(entry => entry.category === 'healthcare')
                      .map((entry) => (
                      <Card key={entry.id} className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{entry.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {entry.description?.substring(0, 100)}...
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {entry.healthcare_tags?.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge variant="default" className="text-xs">Dynamic</Badge>
                            {entry.status && (
                              <Badge variant={entry.status === 'approved' ? 'default' : 'secondary'} className="text-xs">
                                {entry.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
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
                      {userProfiles.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                            No registered users found. User profiles will appear here once users register.
                          </TableCell>
                        </TableRow>
                      ) : (
                        userProfiles.map((user) => (
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
                        ))
                      )}
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
                    {conversations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          No conversations found. Conversations with Genie AI will appear here.
                        </TableCell>
                      </TableRow>
                    ) : (
                      conversations.map((conv) => {
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
                      })
                    )}
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
                    {accessRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No access requests found. Access requests will appear here when users request access.
                        </TableCell>
                      </TableRow>
                    ) : (
                      accessRequests.map((request) => (
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
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance & Capacity Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Server className="h-4 w-4" />
                  Concurrent Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.currentConcurrentSessions}
                </div>
                <div className="text-xs text-muted-foreground">
                  Max: {performanceMetrics.maxConcurrentCapacity}
                </div>
                <Progress 
                  value={(performanceMetrics.currentConcurrentSessions / performanceMetrics.maxConcurrentCapacity) * 100} 
                  className="mt-2 h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((performanceMetrics.currentConcurrentSessions / performanceMetrics.maxConcurrentCapacity) * 100)}% capacity
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.avgResponseTime}ms
                </div>
                <div className="text-xs text-muted-foreground">
                  Peak: {performanceMetrics.peakResponseTime}ms
                </div>
                <Progress 
                  value={(performanceMetrics.avgResponseTime / capacityLimits.performanceThresholds.maxResponseTimeMs) * 100} 
                  className="mt-2 h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Target: &lt;{capacityLimits.performanceThresholds.maxResponseTimeMs}ms
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {performanceMetrics.successRate}%
                </div>
                <div className="text-xs text-muted-foreground">
                  Error Rate: {performanceMetrics.errorRate}%
                </div>
                <Progress 
                  value={performanceMetrics.successRate} 
                  className="mt-2 h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Target: &gt;{capacityLimits.performanceThresholds.targetSuccessRate}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  DB Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {performanceMetrics.databaseConnections}
                </div>
                <div className="text-xs text-muted-foreground">
                  Max: {performanceMetrics.maxDatabaseConnections}
                </div>
                <Progress 
                  value={(performanceMetrics.databaseConnections / performanceMetrics.maxDatabaseConnections) * 100} 
                  className="mt-2 h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.round((performanceMetrics.databaseConnections / performanceMetrics.maxDatabaseConnections) * 100)}% used
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Current Rate Limits
                </CardTitle>
                <CardDescription>
                  Demo environment rate limiting configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Conversations/Hour</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {capacityLimits.rateLimits.conversationsPerHour}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Messages/Conversation</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {capacityLimits.rateLimits.messagesPerConversation}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tokens/Hour</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {capacityLimits.rateLimits.tokensPerHour.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">IP-Based Limit</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {capacityLimits.rateLimits.ipBasedLimit}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  System Capacity Limits
                </CardTitle>
                <CardDescription>
                  Maximum system capacity and infrastructure limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Max Concurrent Conversations</span>
                    <Badge variant="outline">
                      {capacityLimits.systemLimits.maxConcurrentConversations}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Max Database Connections</span>
                    <Badge variant="outline">
                      {capacityLimits.systemLimits.maxDatabaseConnections}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Edge Function Concurrency</span>
                    <Badge variant="outline">
                      {capacityLimits.systemLimits.maxEdgeFunctionConcurrency}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Storage Limit</span>
                    <Badge variant="outline">
                      {capacityLimits.systemLimits.maxStorageGB} GB
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bandwidth Limit</span>
                    <Badge variant="outline">
                      {capacityLimits.systemLimits.maxBandwidthGB} GB/month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Scalability Analysis
              </CardTitle>
              <CardDescription>
                Performance projections and scaling recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-600">✅ Current Capacity</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• ~1,000 concurrent users</li>
                    <li>• ~10,000 conversations/day</li>
                    <li>• ~500K messages/day</li>
                    <li>• ~2-5 second response time</li>
                    <li>• 99.5%+ uptime</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-yellow-600">⚠️ Bottlenecks</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Rate limiting (demo mode)</li>
                    <li>• AI API quotas</li>
                    <li>• Database connection pool</li>
                    <li>• Edge function cold starts</li>
                    <li>• Session storage limits</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-600">🚀 Scaling Options</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Supabase Pro/Team plan</li>
                    <li>• Redis session storage</li>
                    <li>• CDN for static assets</li>
                    <li>• Connection pooling</li>
                    <li>• Multi-region deployment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Traffic Handling Estimates
              </CardTitle>
              <CardDescription>
                Estimated capacity for website and Genie popup traffic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Website Traffic</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Concurrent visitors</span>
                      <Badge>~5,000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Page views/hour</span>
                      <Badge>~50,000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">API requests/hour</span>
                      <Badge>~100,000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Static assets served</span>
                      <Badge>~500,000/hour</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Genie Popup Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Concurrent conversations</span>
                      <Badge>~1,000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Messages/hour</span>
                      <Badge>~25,000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AI API calls/hour</span>
                      <Badge>~10,000</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Database queries/hour</span>
                      <Badge>~75,000</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};