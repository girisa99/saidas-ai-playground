import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, MessageCircle, Send, User, Bot, AlertTriangle, Move, Users, Settings, Brain, ImagePlus, RefreshCw } from 'lucide-react';
import { enhanceResponseWithTriage, generateMilestoneSuggestions, addHumorIfAppropriate } from '@/services/richMediaEnhancer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useUniversalAI } from '@/hooks/useUniversalAI';
import { useConversationState } from '@/hooks/useConversationState';
import { ConversationMessage } from '../enrollment-genie/ConversationMessage';
import { TypingIndicator } from '../enrollment-genie/TypingIndicator';
import { PublicPrivacyBanner } from './PublicPrivacyBanner';
import { HumanEscalationForm } from './HumanEscalationForm';
import { RichResponseRenderer } from './RichResponseRenderer';
import { SourceCitations } from './SourceCitations';
import { AdvancedAISettings, AIConfig } from './AdvancedAISettings';
import { ConfigurationWizard } from './ConfigurationWizard';
import { SplitScreenRenderer } from './SplitScreenRenderer';
import { SessionManager } from './SessionManager';
import { ContextSwitcher } from './ContextSwitcher';
import { TopicSuggestionPopover } from './TopicSuggestionPopover';
import { MedicalImageUploader, UploadedImage } from './MedicalImageUploader';
import { VisionModelIndicator } from './VisionModelIndicator';
import { InteractiveTreatmentCenterMap } from './InteractiveTreatmentCenterMap';
import { ProductPricingOverview } from './ProductPricingOverview';
import { AIRecommendationsPanel } from './AIRecommendationsPanel';
import { HowToUseGuide } from './HowToUseGuide';
import { PricingComparisonCard } from './PricingComparisonCard';
import { PricingDisplay } from './PricingDisplay';
import { RoutingOptimizationBadge } from './RoutingOptimizationBadge';
import { parseProductPricingCSV, searchProductPricing } from '@/services/productPricingService';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { conversationIntelligence } from '@/utils/conversationIntelligence';
import { useUniversalKnowledgeTopics } from '@/hooks/useUniversalKnowledgeTopics';
import { useGeniePreferences } from '@/hooks/useGeniePreferences';
import { useABTestMilestones } from '@/hooks/useABTestMilestones';
import { ConversationLimitModal } from './ConversationLimitModal';
import { genieMessaging } from '@/services/genieMessagingService';

import { TechnologyKnowledgeBase, getTechnologyKnowledge } from '../comprehensive-knowledge/TechnologyKnowledgeBase';
import { HealthcareKnowledgeBase, getReimbursementInfo } from './HealthcareKnowledgeBase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { CapabilitiesPrompt, TopicSuggestions } from './ConversationUtils';
import { NewsletterService } from '@/services/newsletterService';
import { ContactService } from '@/services/publicContactService';
import { conversationLimitService, type ConversationLimits } from '@/services/conversationLimitService';
import { genieConversationService } from '@/services/genieConversationService';
import { supabase } from '@/integrations/supabase/client';
import genieLogoPopup from '@/assets/genie-logo-popup.png';
import genieThinking from '@/assets/genie-thinking.png';

interface UserInfo {
  firstName: string;
  lastName?: string;
  email: string;
}

type Context = 'technology' | 'healthcare';

// Determine provider from model name for direct API calls
const providerFromModel = (model?: string): 'openai' | 'claude' | 'gemini' => {
  const lower = (model || '').toLowerCase();
  if (lower.includes('gpt') || lower.includes('openai')) return 'openai';
  if (lower.includes('claude') || lower.includes('anthropic')) return 'claude';
  return 'gemini'; // Default to Gemini
};

// Get complementary model for split-screen comparisons
const getComplementaryModel = (primaryModel: string): string => {
  const lower = primaryModel.toLowerCase();
  
  // If primary is OpenAI, use Claude or Gemini as secondary
  if (lower.includes('gpt') || lower.includes('openai')) {
    return 'claude-sonnet-4-5';
  }
  
  // If primary is Claude, use GPT as secondary
  if (lower.includes('claude')) {
    return 'gpt-5-2025-08-07';
  }
  
  // If primary is Gemini, use GPT as secondary
  if (lower.includes('gemini') || lower.includes('google')) {
    return 'gpt-5-mini-2025-08-07';
  }
  
  // Default fallback: use GPT-5 as complementary
  return 'gpt-5-2025-08-07';
};

interface PublicGenieInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const technologyTopics = [
  'AI Democratization & Open Source',
  'Large Language Models (LLMs)',
  'Small Language Models (SLMs)', 
  'Agentic AI Platforms',
  'No-Code/Low-Code Revolution',
  'Big Tech AI Strategies',
  'Emerging AI Platforms',
  'Model Context Protocol (MCP)',
  'RAG & Knowledge Bases',
  'Automation Platforms (UiPath, n8n)',
  'AI Observability & Monitoring',
  'Edge AI & Local Models',
  'Multi-Agent Systems',
  'AI Development Tools',
  'Cloud AI Services (OpenAI, Claude, Gemini)',
  'Hugging Face Ecosystem',
  'Technology Conferences 2025',
  'AI Safety & Ethics',
  'Digital Health & Medical Devices',
  'Wearable Health Technology',
  'Digital Therapeutics (DTx)',
  'Remote Patient Monitoring',
  'Healthcare AI Applications',
  'Medical Device Innovation',
  'Health Tech Conferences',
  'Industry Consortiums',
  'M&A and Market Trends',
  'Venture Capital in AI',
  'Enterprise AI Adoption',
  'AI Regulation & Compliance'
];

const healthcareTopics = [
  'Reimbursement (Travel & Logistics)',
  'Oncology Therapies & Products',
  'Cardiology Treatments & Devices', 
  'Cell, Gene & Advanced Therapies',
  'Digital Therapeutics (DTx)',
  'Digital Health Solutions',
  'Infusion Process & Support',
  'Pre-Infusion Preparation',
  'Post-Infusion Care',
  '340B Drug Pricing Program',
  'WAC (Wholesale Acquisition Cost)',
  'Government Pricing Differences',
  'GPO (Group Purchasing Organizations)',
  'Claims Processing (Inpatient/Outpatient)',
  'In-Network vs Out-of-Network',
  'Prior Authorization Process',
  'Denial Prevention & Appeals',
  'Discount Coupons & Patient Assistance',
  'Radioland Therapies',
  'Treatment Centers & Networks',
  'Copay Assistance Programs',
  'Alternative Funding Programs',
  'Treatment Sharing & Access',
  'ICD Codes & Billing',
  'Product Information & Formularies',
  'Packaging & Distribution',
  'Authorized Treatment Centers by Therapy',
  'Treatment Centers by Zip Code',
  'Specialty Pharmacy Orders & Process',
  'Adverse Events (AE/SAE) Reporting',
  'Clinical Trials & Enrollment Process',
  'Competitor Analysis for Trials',
  'Commercial Product Competitors',
  'Insurance Coverage Verification',
  'Patient Financial Assistance',
  'Biosimilar & Generic Alternatives'
];

export const PublicGenieInterface: React.FC<PublicGenieInterfaceProps> = ({ isOpen, onClose }) => {
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(() => {
    try {
      // Check if user info exists (returning user) OR session privacy already accepted
      const savedUserInfo = localStorage.getItem('genie_user_info');
      const acceptedThisSession = sessionStorage.getItem('genie_privacy_accepted') === 'true';
      
      // If user info exists in localStorage, they're a returning user - don't show banner
      if (savedUserInfo) {
        sessionStorage.setItem('genie_privacy_accepted', 'true');
        return false;
      }
      
      return !acceptedThisSession;
    } catch {
      return true;
    }
  });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    // Try to load user info from localStorage for returning users
    try {
      const savedUserInfo = localStorage.getItem('genie_user_info');
      if (savedUserInfo) {
        const parsed = JSON.parse(savedUserInfo);
        // Auto-accept privacy if user info exists
        sessionStorage.setItem('genie_privacy_accepted', 'true');
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved user info:', e);
    }
    return null;
  });
  const [context, setContext] = useState<Context>(() => {
    try {
      const saved = sessionStorage.getItem('genie_context') as Context | null;
      return (saved as Context) || 'technology';
    } catch {
      return 'technology';
    }
  }); // Persisted context
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showHumanEscalation, setShowHumanEscalation] = useState(false);
  const [isLiveAgentAvailable, setIsLiveAgentAvailable] = useState(false);
  const [conversationPersonality, setConversationPersonality] = useState<'formal' | 'casual' | 'empathetic'>('casual');
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [showConfigWizard, setShowConfigWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  // Persist context across the session
  useEffect(() => {
    try { sessionStorage.setItem('genie_context', context); } catch {}
  }, [context]);
  
  // Topic popover state
  const [showTopicPopover, setShowTopicPopover] = useState(false);
  const [popoverSuggestions, setPopoverSuggestions] = useState<Array<{topic: string; category: string; icon?: string}>>([]);
  const [popoverMood, setPopoverMood] = useState<'empathetic' | 'playful' | 'excited' | 'helpful'>('helpful');
  
  // Hooks for enhancements
  const { milestones: abTestMilestones } = useABTestMilestones();
  
  // Conversation limit states - explicitly initialized
  const [showLimitModal, setShowLimitModal] = React.useState<boolean>(false);
  const [conversationLimits, setConversationLimits] = React.useState<ConversationLimits | null>(null);
  const [isConversationAllowed, setIsConversationAllowed] = React.useState<boolean>(true);
  const [loadingStates, setLoadingStates] = useState({
    primary: false,
    secondary: false
  });
  const [splitResponses, setSplitResponses] = useState<{
    primary: any[];
    secondary: any[];
  }>({
    primary: [],
    secondary: []
  });
  const [aiConfig, setAIConfig] = useState<AIConfig>(() => {
    // Check if user has saved configuration in this session
    const savedConfig = sessionStorage.getItem('genie_ai_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Failed to parse saved config:', e);
      }
    }
    // Default configuration
    return {
      mode: 'default',
      ragEnabled: false,
      knowledgeBase: false,
      knowledgeBaseEnabled: false,
      mcpEnabled: false,
      multiAgentEnabled: false,
      selectedModel: 'gpt-4o-mini',
      splitScreen: false,
      splitScreenEnabled: false,
      contextualSuggestions: true,
      visionEnabled: false,
      medicalImageMode: false,
    };
  });
  
  // Handle config changes with persistence and mode switch notification
  const handleConfigChange = (newConfig: AIConfig) => {
    const previousMode = aiConfig.mode;
    const previousSplitScreen = aiConfig.splitScreenEnabled || aiConfig.splitScreen;
    
    setAIConfig(newConfig);
    
    // Save to session storage
    try {
      sessionStorage.setItem('genie_ai_config', JSON.stringify(newConfig));
      sessionStorage.setItem('genie_config_timestamp', Date.now().toString());
    } catch (e) {
      console.error('Failed to save config:', e);
    }
    
    // Notify user of mode changes without losing conversation context
    if (previousMode !== newConfig.mode) {
      const modeNames = { default: 'Balanced', single: 'Focused', multi: 'Consensus' };
      toast({
        title: `Switched to ${modeNames[newConfig.mode]} Mode`,
        description: 'Conversation context preserved. All features active in new mode.',
        duration: 3000,
      });
      
      // Clear split responses ONLY when switching OUT of multi mode to single/default
      if (previousMode === 'multi' && newConfig.mode !== 'multi') {
        setSplitResponses({ primary: [], secondary: [] });
      }
    }
    
    // Handle split-screen toggle (independent of mode)
    const newSplitScreen = newConfig.splitScreenEnabled || newConfig.splitScreen;
    if (newSplitScreen !== previousSplitScreen) {
      if (!newSplitScreen) {
        // Switching split-screen OFF - clear split responses
        setSplitResponses({ primary: [], secondary: [] });
      }
    }
  };
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const { toast } = useToast();

  const { generateResponse, isLoading, error: aiError } = useUniversalAI();
  const { state, addMessage, resetConversation } = useConversationState();
  const messages = state.messages;

  // Surface AI errors consistently across modes
  useEffect(() => {
    if (!aiError) return;
    const msg = aiError.toLowerCase();
    if (msg.includes('payment') || msg.includes('credit') || msg.includes('402')) {
      toast({
        title: 'Payment required',
        description: 'Lovable AI credits are depleted. Please add credits to your workspace and try again.',
        variant: 'destructive',
      });
    } else if (msg.includes('rate limit') || msg.includes('429')) {
      toast({
        title: 'Rate limit exceeded',
        description: 'Too many requests. Please wait a minute and try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'AI error',
        description: aiError,
        variant: 'destructive',
      });
    }
  }, [aiError]);
  
  // Fetch dynamic topics from universal knowledge base
  const { topics: dynamicTopics } = useUniversalKnowledgeTopics(context);

// Memoized scroll to bottom effect
useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages.length]);

  // Check for contextual suggestions and context shifts after messages update
useEffect(() => {
  if (messages.length === 0 || !userInfo) return;
  
  // Check if conversation context has shifted (intelligent auto-detection)
  const contextShift = conversationIntelligence.detectContextShift(messages, context);
  
  if (contextShift.shifted && contextShift.newContext && contextShift.confidence > 0.6) {
    // Automatically switch context without notification to avoid repetition
    setContext(contextShift.newContext);
    conversationIntelligence.reset();
    return; // Don't show suggestions during auto-switch
  }
  
  // Count only user messages for milestone tracking
  const userMessageCount = messages.filter(m => m.role === 'user').length;
  
  // Show proactive topic suggestions at strategic conversation milestones (3, 5, 7 user messages)
  const milestones = [3, 5, 7];
  if (milestones.includes(userMessageCount)) {
    const suggestion = conversationIntelligence.shouldShowSuggestion(
      messages,
      context,
      selectedTopic
    );
    
    if (suggestion && suggestion.shouldShow && suggestion.suggestions) {
      const topics = dynamicTopics.length > 0
        ? dynamicTopics.slice(0, 6)
        : suggestion.suggestions.map(sug => ({
            topic: sug.label,
            category: context === 'healthcare' ? 'clinical' : 'technical',
            icon: sug.emoji || (context === 'healthcare' ? '🏥' : '💻')
          }));
      
      setPopoverSuggestions(topics);
      setPopoverMood(suggestion.mood || 'helpful');
      setShowTopicPopover(true);
    }
  }
}, [messages.length, context, selectedTopic, userInfo, dynamicTopics]);

  // Check conversation limits only when user info changes and is available
useEffect(() => {
  if (!userInfo) return;

  const checkLimits = async () => {
    try {
      const limits = await conversationLimitService.checkConversationLimits(
        userInfo.email,
        userInfo.firstName
      );
      setConversationLimits(limits);
      setIsConversationAllowed(limits.allowed);
      
      // Check if user has existing configuration for this session/IP
      const savedConfig = sessionStorage.getItem('genie_ai_config');
      const configTimestamp = sessionStorage.getItem('genie_config_timestamp');
      const currentTime = Date.now();
      const oneHour = 60 * 60 * 1000;
      
      // Skip wizard if config exists and is less than 1 hour old
      if (savedConfig && configTimestamp && (currentTime - parseInt(configTimestamp)) < oneHour) {
        setShowConfigWizard(false);
      }
      
      // Only show modal if conversation is not allowed and user tries to send message
      // Don't auto-show on context switch
    } catch (error) {
      console.error('Failed to check conversation limits:', error);
      setIsConversationAllowed(true);
    }
  };

  checkLimits();
}, [userInfo?.email]); // Only re-run when email changes

// Clean up conversation on component unmount
useEffect(() => {
  return () => {
    if (conversationLimitService.isConversationActive()) {
      conversationLimitService.endConversation();
    }
    if (genieConversationService.isConversationActive()) {
      genieConversationService.endConversation();
    }
  };
}, []);

// Lock page and close background menus when Genie opens
  useEffect(() => {
    if (isOpen) {
      try { document.body.classList.add('genie-open'); } catch {}
      // Close any open Radix dropdowns/popovers/selects
      const esc = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, bubbles: true } as any);
      window.dispatchEvent(esc);
      setTimeout(() => window.dispatchEvent(esc), 0);
      // Prevent background scroll/interaction behind Genie
      try { document.documentElement.style.overflow = 'hidden'; } catch {}
    } else {
      try { document.body.classList.remove('genie-open'); } catch {}
      try { document.documentElement.style.overflow = ''; } catch {}
    }
    return () => {
      try { document.body.classList.remove('genie-open'); } catch {}
      try { document.documentElement.style.overflow = ''; } catch {}
    };
  }, [isOpen]);

// Fetch IP address only once on mount
useEffect(() => {
  const fetchIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch {
      setIpAddress(null);
    }
  };
  
  fetchIP();
}, []);

  const handlePrivacyAccept = async (info: UserInfo) => {
    setUserInfo(info);
    setShowPrivacyBanner(false);

    // Mark accepted for this session
    try { sessionStorage.setItem('genie_privacy_accepted', 'true'); } catch {}

    // Also mark cookie consent accepted so the site-wide banner doesn't show behind Genie
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch {}
    
    // Save user info to localStorage for returning users (analytics) and session for current tab
    try {
      localStorage.setItem('genie_user_info', JSON.stringify(info));
      sessionStorage.setItem('genie_user_info_session', JSON.stringify(info));
    } catch (e) {
      console.error('Failed to persist user info:', e);
    }

    // Start tracking Genie conversation in database FIRST to get conversation ID
    let conversationId: string | undefined;
    try {
      const result = await genieConversationService.startConversation({
        userEmail: info.email,
        userName: info.firstName + (info.lastName ? ` ${info.lastName}` : ''),
        context: context || 'general',
        ipAddress: ipAddress || undefined
      });
      
      if (result.success) {
        conversationId = result.conversationId;
        // Conversation started - no sensitive data logged
      } else {
        // Failed to start conversation tracking
      }
    } catch (error) {
      // Error initializing conversation tracking
    }
    
    // Track user registration analytics
    try {
      const { genieAnalyticsService } = await import('@/services/genieAnalyticsService');
      await genieAnalyticsService.trackUserRegistration({
        user_email: info.email,
        user_name: info.firstName + (info.lastName ? ` ${info.lastName}` : ''),
        context: context || 'general',
        ip_address: ipAddress || undefined,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to track user registration:', error);
    }

    // Send Genie welcome email with conversation details
    try {
      const { data, error } = await supabase.functions.invoke('send-genie-welcome-email', {
        body: {
          email: info.email,
          firstName: info.firstName,
          lastName: info.lastName,
          context: context || 'general',
          ipAddress: ipAddress || undefined,
          conversationId: conversationId
        }
      });

      if (error) {
        toast({ 
          title: 'Note', 
          description: 'You\'re all set! Welcome email will arrive shortly.',
          variant: 'default'
        });
      } else {
        toast({ 
          title: 'Welcome! 🧞‍♂️', 
          description: 'Check your email for your personalized welcome message!',
        });
      }
    } catch (error) {
      // Email send failed - no sensitive data logged
    }
    
    // Check if user already has a configuration in this session
    const savedConfig = sessionStorage.getItem('genie_ai_config');
    const configTimestamp = sessionStorage.getItem('genie_config_timestamp');
    const currentTime = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    // If no recent config, open the configuration wizard; otherwise greet and continue
    if (!savedConfig || !configTimestamp || (currentTime - parseInt(configTimestamp)) >= oneHour) {
      setShowConfigWizard(true);
      setHasStartedConversation(false);
      return;
    }

    setShowConfigWizard(false);
    setHasStartedConversation(true);

    // Use dynamic welcome message from genie messaging service
    const welcomeMessage = genieMessaging.getMessage('welcome', undefined, info.firstName);

    addMessage({
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date().toISOString()
    });
  };

  const addPersonalityToResponse = (response: string): string => {
    const personalities = {
      formal: {
        starters: ['I would be happy to help you with that.', 'Let me provide you with a comprehensive answer.', 'Thank you for your question.'],
        transitions: ['Furthermore,', 'Additionally,', 'Moreover,', 'In addition to that,']
      },
      casual: {
        starters: ['Great question!', 'Oh, that\'s interesting!', 'I love helping with this!', 'Let me break this down for you!'],
        transitions: ['Also,', 'Plus,', 'And here\'s the cool part:', 'Oh, and another thing:']
      },
      empathetic: {
        starters: ['I understand this can be confusing.', 'That\'s a really thoughtful question.', 'I can see why you\'d want to know about this.'],
        transitions: ['I hope this helps,', 'Please know that', 'It\'s completely normal to wonder about this,']
      }
    };

    const currentPersonality = personalities[conversationPersonality];
    if (Math.random() > 0.7) {
      const starter = currentPersonality.starters[Math.floor(Math.random() * currentPersonality.starters.length)];
      response = `${starter} ${response}`;
    }

    return response;
  };

  const generateIntermediateResponse = () => {
    const intermediates = {
      technology: [
        'Let me process that for a moment... 🤔',
        'Hmm, that\'s an interesting tech angle to consider...',
        'I\'m thinking through the best technical approach...',
        'Great question! Let me break this down step by step...'
      ],
      healthcare: [
        'That\'s a really important health question... 💭',
        'Let me think about the best wellness approach here...',
        'I want to make sure I give you thoughtful health guidance...',
        'You\'ve touched on something really significant for your wellbeing...'
      ]
    };

    return intermediates[context!][Math.floor(Math.random() * intermediates[context!].length)];
  };

  const detectContextFromMessage = (message: string): Context | null => {
    const techKeywords = ['ai', 'technology', 'software', 'programming', 'code', 'automation', 'llm', 'model', 'api', 'cloud', 'data', 'platform', 'digital', 'innovation', 'stack'];
    const healthcareKeywords = ['health', 'medical', 'patient', 'clinical', 'wellness', 'treatment', 'diagnosis', 'healthcare', 'medicine', 'therapy', 'infusion', 'oncology', 'cardiology', 'reimbursement'];
    
    const lowerMessage = message.toLowerCase();
    const techMatches = techKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    const healthMatches = healthcareKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    
    if (techMatches > healthMatches && techMatches > 0) return 'technology';
    if (healthMatches > techMatches && healthMatches > 0) return 'healthcare';
    return null;
  };

  const suggestTopicsForContext = (detectedContext: Context): string[] => {
    return detectedContext === 'technology' ? technologyTopics.slice(0, 5) : healthcareTopics.slice(0, 5);
  };

  const handleContextSwitch = (newContext: Context) => {
    setContext(newContext);
    setSelectedTopic('');
    setShowTopicPopover(false);
    
    // Use dynamic topics from universal knowledge base if available
    const suggestions = dynamicTopics.length > 0
      ? dynamicTopics.slice(0, 6)
      : (newContext === 'technology' ? technologyTopics : healthcareTopics)
          .slice(0, 6)
          .map(topic => ({
            topic,
            category: newContext === 'healthcare' ? 'clinical' : 'technical',
            icon: newContext === 'healthcare' ? '🏥' : '💻'
          }));
    
    setPopoverSuggestions(suggestions);
    setPopoverMood('helpful');
    setShowTopicPopover(true);
    
    toast({
      title: `Switched to ${newContext}`,
      description: `I'm now specialized for ${newContext} topics!`,
    });
  };

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && uploadedImages.length === 0) || isLoading) return;
    if (sendingRef.current) return; // Prevent double-trigger
    sendingRef.current = true;

    // Check if conversation is allowed
    if (!isConversationAllowed) {
      setShowLimitModal(true);
      sendingRef.current = false;
      return;
    }

    // Start conversation tracking if this is the first message
    if (!conversationLimitService.isConversationActive()) {
      const startResult = await conversationLimitService.startConversation(
        context!,
        userInfo?.email,
        userInfo?.firstName
      ).catch(err => {
        console.error('Error starting conversation:', err);
        return { allowed: true, session_id: undefined, message: undefined, limits: undefined };
      });

      if (startResult && !startResult.allowed) {
        setShowLimitModal(true);
        setConversationLimits(startResult.limits || null);
        setIsConversationAllowed(false);
        return;
      }
    }

    // Start conversation in genieConversationService for persistence
    if (!genieConversationService.isConversationActive()) {
      const result = await genieConversationService.startConversation({
        userEmail: userInfo?.email,
        userName: userInfo?.firstName,
        context: context!
      });
      
      if (!result.success) {
        console.error('Failed to start conversation tracking:', result.error);
        toast({ title: 'Warning', description: 'Conversation may not be saved', variant: 'destructive' });
      }
    }

    // Update message count
    conversationLimitService.updateMessageCount().catch(err => {
      console.error('Error updating message count:', err);
    });

    const userMessage = inputMessage.trim();
    
    // Add to input history (keep last 10 prompts)
    if (userMessage) {
      setInputHistory(prev => {
        const newHistory = [userMessage, ...prev.filter(item => item !== userMessage)];
        return newHistory.slice(0, 10); // Keep only last 10 unique prompts
      });
      setHistoryIndex(-1); // Reset history navigation
    }
    
    // Note: Intelligent context switching is now handled by the useEffect hook
    // which uses conversationIntelligence.detectContextShift() for more accurate detection
    // This prevents constant context switch prompts and only triggers on genuine intent shifts
    
    setInputMessage('');

    // Process uploaded images
    const imageUrls = uploadedImages
      .filter(img => img.status === 'ready')
      .map(img => img.preview)
      .filter(Boolean) as string[];

    // Intelligent vision model auto-switching - ONLY when images are uploaded
    const messagesForAnalysis = [...messages, { role: 'user' as const, content: userMessage, timestamp: new Date().toISOString() }];
    const hasExplicitImageRequest = conversationIntelligence.detectVisionRequirement(messagesForAnalysis);
    const hasUploadedImages = imageUrls.length > 0;
    
    // Only auto-enable vision if: 
    // 1. User has uploaded images, OR
    // 2. User explicitly requests image analysis AND vision is not already disabled by user choice
    if (hasUploadedImages && !aiConfig.visionEnabled) {
      setAIConfig(prev => ({ ...prev, visionEnabled: true }));
      toast({
        title: "Vision Analysis Enabled",
        description: "I've detected uploaded images. Vision capabilities are now active! 👁️",
      });
    } else if (hasExplicitImageRequest && !aiConfig.visionEnabled && !hasUploadedImages) {
      // Don't auto-enable for text-only queries, just suggest it
      toast({
        title: "Tip: Vision Mode",
        description: "It looks like you want to analyze an image. Upload an image or enable Vision mode manually.",
        variant: "default",
      });
    }
    
    // Mark that conversation has started
    if (!hasStartedConversation) {
      setHasStartedConversation(true);
    }

    // Add user message ONCE to avoid duplicates
    const userMessageObj = {
      role: 'user' as const,
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    
    addMessage(userMessageObj);

    try {
      const systemPrompt = context ? 
        `You are Genie AI, an intelligent assistant specializing in ${context}${selectedTopic ? ` with focus on ${selectedTopic}` : ''}. 
        
        You have comprehensive knowledge about:
        - AI Innovation and Gartner Value Framework mapping to tech stacks
        - Healthcare business use cases, Digital Therapeutics (DTx), Cell & Gene therapies
        - Technology concepts, journey use cases, and case studies  
        - Security topics and compliance frameworks
        - Value creation and realization strategies
        - Experimentation hub methodologies
        
        Personality: ${conversationPersonality}. 
        Be engaging, helpful, and provide practical insights with specific examples.
        Draw from the comprehensive knowledge base including website content, case studies, and implementation guides.
        Keep responses informative but accessible.
        
        Advanced capabilities: I support different AI modes (default/single/multi-agent), RAG, knowledge bases, MCP tools, and split-screen comparisons.` :
        `You are Genie AI, a versatile assistant who can support and discuss Experimentation Hub Technology and Healthcare concepts.
        
        I have comprehensive knowledge about the entire website content including:
        - AI Innovation frameworks and value creation strategies  
        - Healthcare business use cases and reimbursement processes
        - Technology stack architectures and implementation guides
        - Journey mapping, case studies, and experimentation methodologies
        - Security, compliance, and best practices
        
        Be engaging, helpful, and intelligently guide users through complex topics.
        Adapt to technology, healthcare, or general inquiries with personalized insights.
        Mention my advanced features: different modes (default/single/multi-agent), RAG, knowledge bases, and split-screen analysis.`;

      const enhancedPrompt = `${userMessage}
        
        ${context ? `Context: ${context}` : 'Context: General inquiry - suggest relevant contexts'}
        ${selectedTopic ? `Topic Focus: ${selectedTopic}` : ''}
        User: ${userInfo?.firstName}
        AI Config: ${JSON.stringify(aiConfig)}
        
        Note: If no context is set, try to identify if this relates to technology or healthcare and suggest relevant topics.`;

      if (aiConfig.splitScreenEnabled && aiConfig.mode === 'multi') {
        // Handle split-screen multi-model responses with per-model resilience
        setLoadingStates({ primary: true, secondary: true });

        const primaryProvider = providerFromModel(aiConfig.selectedModel);
        // Use intelligent secondary model selection based on primary
        const secondaryModel = aiConfig.secondaryModel || getComplementaryModel(aiConfig.selectedModel);
        const secondaryProvider = providerFromModel(secondaryModel);
        
        console.log('🚀 Multi-mode request:', { 
          primary: aiConfig.selectedModel, 
          secondary: secondaryModel,
          userSelected: aiConfig.secondaryModel ? 'Yes' : 'Using fallback'
        });

        const results = await Promise.allSettled([
          generateResponse({
            provider: primaryProvider as any,
            model: aiConfig.selectedModel,
            prompt: enhancedPrompt,
            systemPrompt,
            temperature: 0.7,
            maxTokens: 4000,
            useRAG: aiConfig.ragEnabled,
            knowledgeBase: aiConfig.knowledgeBase || aiConfig.knowledgeBaseEnabled,
            useMCP: aiConfig.mcpEnabled,
            labelStudio: false, // Label Studio integration ready (needs project ID)
            context: context || 'general',
            enableSmartRouting: true, // ✅ Always enable for triage + rich features
            enableMultiAgent: false, // Multi-mode uses split-screen, not multi-agent
            conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
            ...(imageUrls.length > 0 && { images: imageUrls })
          } as any),
          generateResponse({
            provider: secondaryProvider as any,
            model: secondaryModel,
            prompt: enhancedPrompt,
            systemPrompt,
            temperature: 0.7,
            maxTokens: 4000,
            useRAG: aiConfig.ragEnabled,
            knowledgeBase: aiConfig.knowledgeBase || aiConfig.knowledgeBaseEnabled,
            useMCP: aiConfig.mcpEnabled,
            labelStudio: false,
            context: context || 'general',
            enableSmartRouting: true, // ✅ Always enable for triage + rich features
            enableMultiAgent: false,
            conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
            ...(imageUrls.length > 0 && { images: imageUrls })
          } as any)
        ]);

        const primaryRes = results[0].status === 'fulfilled' ? results[0].value : null;
        const secondaryRes = results[1].status === 'fulfilled' ? results[1].value : null;

        // Clear loading states after both requests complete
        setLoadingStates({ primary: false, secondary: false });

        // Log any failures
        if (results[0].status === 'rejected') {
          console.error('❌ Primary model failed:', results[0].reason);
        }
        if (results[1].status === 'rejected') {
          console.error('❌ Secondary model failed:', results[1].reason);
        }

      if (primaryRes && primaryRes.content) {
          // ========== RICH MEDIA ENHANCEMENT FOR PRIMARY ==========
          const enhancedPrimary = enhanceResponseWithTriage(
            primaryRes.content,
            primaryRes.triageData || null
          );
          
          let enhancedPrimaryContent = addHumorIfAppropriate(
            enhancedPrimary.content,
            primaryRes.triageData || null
          );
          
          // Generate milestone suggestions (3, 5, 7 messages)
          const userMessageCount = messages.filter(m => m.role === 'user').length;
          const milestoneSuggestions = generateMilestoneSuggestions(
            userMessageCount,
            messages.map(m => ({ role: m.role, content: m.content })),
            primaryRes.triageData || null
          );
          
          if (milestoneSuggestions.length > 0) {
            enhancedPrimaryContent += `\n\n**💡 You might also be interested in:**\n${milestoneSuggestions.map(s => `• ${s}`).join('\n')}`;
          }
          
          let personalizedPrimary = addPersonalityToResponse(enhancedPrimaryContent);
          
          // Add RAG/KB context indicators
          if (primaryRes.ragContext) {
            personalizedPrimary += `\n\n_📚 Response enhanced with knowledge base context_`;
          }
          if (primaryRes.knowledgeBaseResults) {
            personalizedPrimary += `\n\n_🔍 Used ${primaryRes.knowledgeBaseResults.length || 0} knowledge entries_`;
          }
          
          // ========== SMART ROUTING OPTIMIZATION DISPLAY (PRIMARY) ==========
          if (primaryRes.triageData) {
            console.log('📊 Primary Model - Displaying Smart Routing:', primaryRes.triageData);
            personalizedPrimary += `\n\n---\n\n### 🤖 AI Optimization (Primary Model)\n\n`;
            const optimizationDetails: string[] = [];
            
            // Model selection and optimization
            const userModel = aiConfig.selectedModel || 'gpt-4o-mini';
            const actualModel = primaryRes.model || primaryRes.triageData.suggested_model;
            optimizationDetails.push(`**🎯 Model Selection**:`);
            optimizationDetails.push(`• Requested: \`${userModel}\``);
            
            // Check if there was an optimization override
            const smartOpt = (primaryRes as any).smartRoutingOptimization || (primaryRes as any).metadata?.smartRoutingOptimization;
            if (smartOpt?.override && actualModel !== userModel) {
              optimizationDetails.push(`• **Optimized to**: \`${actualModel}\` ✨`);
              optimizationDetails.push(`• **💰 Cost Savings**: ${smartOpt.costSavingsPercent || 0}%`);
              optimizationDetails.push(`• **⚡ Latency Savings**: ${smartOpt.latencySavingsPercent || 0}%`);
              optimizationDetails.push(`• _Reason: ${smartOpt.reason || primaryRes.triageData.reasoning || 'Better performance'}_`);
            } else {
              optimizationDetails.push(`• **Used**: \`${actualModel}\` (Already optimal)`);
            }
            
            optimizationDetails.push(`\n**📊 Query Analysis**:`);
            optimizationDetails.push(`• Complexity: ${(primaryRes.triageData.complexity || 'medium').toUpperCase()}`);
            optimizationDetails.push(`• Domain: ${(primaryRes.triageData.domain || 'general').toUpperCase()}`);
            optimizationDetails.push(`• Urgency: ${(primaryRes.triageData.urgency || 'medium').toUpperCase()}`);
            
            const formatDisplay = primaryRes.triageData.best_format || 'text';
            const formatExplanations: Record<string, string> = {
              'table': '📊 Table (Structured data)',
              'html': '🌐 HTML (Rich content)',
              'text': '📝 Text (Narrative)',
              'list': '📋 List (Bullets/Numbers)',
              'map': '🗺️ Interactive Map (Geographic data)'
            };
            optimizationDetails.push(`• **Recommended Format**: ${formatExplanations[formatDisplay] || formatDisplay}`);
            
            if (primaryRes.triageData.emotional_tone) {
              const toneEmojis: Record<string, string> = {
                'empathetic': '💙 Empathetic',
                'professional': '💼 Professional',
                'playful': '✨ Playful'
              };
              optimizationDetails.push(`• **Tone Applied**: ${toneEmojis[primaryRes.triageData.emotional_tone] || primaryRes.triageData.emotional_tone}`);
            }
            
            if (primaryRes.triageData.requires_vision) {
              optimizationDetails.push(`• **Vision Analysis**: 👁️ Enabled`);
            }
            
            optimizationDetails.push(`\n_AI Routing Confidence: ${Math.round((primaryRes.triageData.confidence || 0) * 100)}%_`);
            
            personalizedPrimary += optimizationDetails.join('\n');
          }
          
          // ========== MULTI-AGENT COLLABORATION DISPLAY ==========
          if (primaryRes.collaborationMode) {
            const collabBadges: string[] = [];
            collabBadges.push(`🤖 ${primaryRes.agentCount || 0} Agents Collaborated`);
            collabBadges.push(`📊 Mode: ${primaryRes.collaborationMode}`);
            
            if (primaryRes.consensusScore) {
              collabBadges.push(`✅ Consensus: ${Math.round(primaryRes.consensusScore * 100)}%`);
            }
            
            personalizedPrimary += `\n\n_${collabBadges.join(' • ')}_`;
            
            // Show agent breakdown if available
            if (primaryRes.agentResponses && primaryRes.agentResponses.length > 0) {
              personalizedPrimary += '\n\n**Agent Collaboration Details:**\n';
              primaryRes.agentResponses.forEach((agent: any, idx: number) => {
                personalizedPrimary += `\n${idx + 1}. **${agent.agent}**: ${agent.content}\n`;
              });
            }
          }
          
          const primaryMessage = {
            role: 'assistant' as const,
            content: personalizedPrimary,
            timestamp: new Date().toISOString(),
            model: aiConfig.selectedModel,
            provider: 'primary',
            metadata: {
              ...(primaryRes.metadata || {}),
              triageSuggestedModel: primaryRes.triageData?.suggested_model,
              best_format: primaryRes.triageData?.best_format,
              oncologyProducts: primaryRes.oncologyProducts,
              smartRoutingOptimization: (primaryRes as any).smartRoutingOptimization,
              triageData: primaryRes.triageData,
              showTreatmentMap: primaryRes.showTreatmentMap
            }
          };
          
          // DON'T add to main messages in split-screen mode to avoid duplication
          // Only add to split responses
          setSplitResponses(prev => ({
            ...prev,
            primary: [...prev.primary, primaryMessage]
          }));
        } else {
          console.warn('⚠️ Primary model returned no content');
          toast({ 
            title: `${aiConfig.selectedModel} - No Response`, 
            description: 'The primary model did not return a response. Please try again.', 
            variant: 'destructive' 
          });
        }

        if (secondaryRes && secondaryRes.content) {
          // ========== RICH MEDIA ENHANCEMENT FOR SECONDARY ==========
          const enhancedSecondary = enhanceResponseWithTriage(
            secondaryRes.content,
            secondaryRes.triageData || null
          );
          
          let enhancedSecondaryContent = addHumorIfAppropriate(
            enhancedSecondary.content,
            secondaryRes.triageData || null
          );
          
          // Generate milestone suggestions for secondary model too (3, 5, 7 messages)
          const secondaryUserMessageCount = messages.filter(m => m.role === 'user').length + 1;
          const secondaryMilestoneSuggestions = generateMilestoneSuggestions(
            secondaryUserMessageCount,
            messages.map(m => ({ role: m.role, content: m.content })),
            secondaryRes.triageData || null
          );
          
          if (secondaryMilestoneSuggestions.length > 0 && [3, 5, 7].includes(secondaryUserMessageCount)) {
            enhancedSecondaryContent += `\n\n**💡 You might also be interested in:**\n${secondaryMilestoneSuggestions.map(s => `• ${s}`).join('\n')}`;
          }
          
          let personalizedSecondary = addPersonalityToResponse(enhancedSecondaryContent);
          
          // Add RAG/KB context indicators
          if (secondaryRes.ragContext) {
            personalizedSecondary += `\n\n_📚 Response enhanced with knowledge base context_`;
          }
          if (secondaryRes.knowledgeBaseResults) {
            personalizedSecondary += `\n\n_🔍 Used ${secondaryRes.knowledgeBaseResults.length || 0} knowledge entries_`;
          }
          
          // ========== SMART ROUTING OPTIMIZATION DISPLAY (SECONDARY) ==========
          if (secondaryRes.triageData) {
            console.log('📊 Secondary Model - Displaying Smart Routing:', secondaryRes.triageData);
            personalizedSecondary += `\n\n---\n\n### 🤖 AI Optimization (Secondary Model)\n\n`;
            const optimizationDetails: string[] = [];
            
            // Model selection and optimization
            const userModel = aiConfig.secondaryModel || 'gemini-pro';
            const actualModel = secondaryRes.model || secondaryRes.triageData.suggested_model;
            optimizationDetails.push(`**🎯 Model Selection**:`);
            optimizationDetails.push(`• Requested: \`${userModel}\``);
            
            // Check if there was an optimization override
            const smartOpt = (secondaryRes as any).smartRoutingOptimization || (secondaryRes as any).metadata?.smartRoutingOptimization;
            if (smartOpt?.override && actualModel !== userModel) {
              optimizationDetails.push(`• **Optimized to**: \`${actualModel}\` ✨`);
              optimizationDetails.push(`• **💰 Cost Savings**: ${smartOpt.costSavingsPercent || 0}%`);
              optimizationDetails.push(`• **⚡ Latency Savings**: ${smartOpt.latencySavingsPercent || 0}%`);
              optimizationDetails.push(`• _Reason: ${smartOpt.reason || secondaryRes.triageData.reasoning || 'Better performance'}_`);
            } else {
              optimizationDetails.push(`• **Used**: \`${actualModel}\` (Already optimal)`);
            }
            
            optimizationDetails.push(`\n**📊 Query Analysis**:`);
            optimizationDetails.push(`• Complexity: ${(secondaryRes.triageData.complexity || 'medium').toUpperCase()}`);
            optimizationDetails.push(`• Domain: ${(secondaryRes.triageData.domain || 'general').toUpperCase()}`);
            optimizationDetails.push(`• Urgency: ${(secondaryRes.triageData.urgency || 'medium').toUpperCase()}`);
            
            const formatDisplay = secondaryRes.triageData.best_format || 'text';
            const formatExplanations: Record<string, string> = {
              'table': '📊 Table (Structured data)',
              'html': '🌐 HTML (Rich content)',
              'text': '📝 Text (Narrative)',
              'list': '📋 List (Bullets/Numbers)',
              'map': '🗺️ Interactive Map (Geographic data)'
            };
            optimizationDetails.push(`• **Recommended Format**: ${formatExplanations[formatDisplay] || formatDisplay}`);
            
            if (secondaryRes.triageData.emotional_tone) {
              const toneEmojis: Record<string, string> = {
                'empathetic': '💙 Empathetic',
                'professional': '💼 Professional',
                'playful': '✨ Playful'
              };
              optimizationDetails.push(`• **Tone Applied**: ${toneEmojis[secondaryRes.triageData.emotional_tone] || secondaryRes.triageData.emotional_tone}`);
            }
            
            if (secondaryRes.triageData.requires_vision) {
              optimizationDetails.push(`• **Vision Analysis**: 👁️ Enabled`);
            }
            
            optimizationDetails.push(`\n_AI Routing Confidence: ${Math.round((secondaryRes.triageData.confidence || 0) * 100)}%_`);
            
            personalizedSecondary += optimizationDetails.join('\n');
          }
          
          // ========== MULTI-AGENT COLLABORATION DISPLAY ==========
          if (secondaryRes.collaborationMode) {
            const collabBadges: string[] = [];
            collabBadges.push(`🤖 ${secondaryRes.agentCount || 0} Agents Collaborated`);
            collabBadges.push(`📊 Mode: ${secondaryRes.collaborationMode}`);
            
            if (secondaryRes.consensusScore) {
              collabBadges.push(`✅ Consensus: ${Math.round(secondaryRes.consensusScore * 100)}%`);
            }
            
            personalizedSecondary += `\n\n_${collabBadges.join(' • ')}_`;
            
            // Show agent breakdown if available
            if (secondaryRes.agentResponses && secondaryRes.agentResponses.length > 0) {
              personalizedSecondary += '\n\n**Agent Collaboration Details:**\n';
              secondaryRes.agentResponses.forEach((agent: any, idx: number) => {
                personalizedSecondary += `\n${idx + 1}. **${agent.agent}**: ${agent.content}\n`;
              });
            }
          }
          
          const secondaryMessage = {
            role: 'assistant' as const,
            content: personalizedSecondary,
            timestamp: new Date().toISOString(),
            model: secondaryModel,
            provider: 'secondary',
            metadata: {
              ...(secondaryRes.metadata || {}),
              triageSuggestedModel: secondaryRes.triageData?.suggested_model,
              best_format: secondaryRes.triageData?.best_format,
              oncologyProducts: secondaryRes.oncologyProducts,
              smartRoutingOptimization: (secondaryRes as any).smartRoutingOptimization,
              triageData: secondaryRes.triageData,
              showTreatmentMap: secondaryRes.showTreatmentMap
            }
          };
          
          // DON'T add to main messages in split-screen mode to avoid duplication
          // Only add to split responses
          setSplitResponses(prev => ({
            ...prev,
            secondary: [...prev.secondary, secondaryMessage]
          }));
          
          // ========== MILESTONE SUGGESTIONS FOR MULTI-MODE ==========
          // Note: Milestone suggestions already added inline to both primary and secondary responses
        } else {
          console.warn('⚠️ Secondary model returned no content');
          toast({ 
            title: `${secondaryModel} - No Response`, 
            description: 'The secondary model did not return a response.', 
            variant: 'default' 
          });
        }
      } else {
        // Standard single response with RAG, Knowledge Base, MCP, Multi-Agent
        const response = await generateResponse({
          provider: providerFromModel(aiConfig.selectedModel) as any,
          model: aiConfig.selectedModel,
          prompt: enhancedPrompt,
          systemPrompt,
          temperature: 0.7,
          maxTokens: 4000,
          useRAG: aiConfig.ragEnabled,
          knowledgeBase: aiConfig.knowledgeBase || aiConfig.knowledgeBaseEnabled,
          useMCP: aiConfig.mcpEnabled,
          labelStudio: false,
          context: context || 'general',
          enableSmartRouting: true, // ✅ Always enable for triage + rich features
          enableMultiAgent: aiConfig.multiAgentEnabled || false,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
          ...(imageUrls.length > 0 && { images: imageUrls })
        } as any);

          if (response) {
            // ========== RICH MEDIA ENHANCEMENT ==========
            // Enhance response with triage data
            const enhanced = enhanceResponseWithTriage(
              response.content,
              response.triageData || null
            );
            
            // Add humor if appropriate
            let enhancedContent = addHumorIfAppropriate(
              enhanced.content,
              response.triageData || null
            );
            
            // Generate milestone suggestions (3, 5, 7 messages)
            const userMessageCount = messages.filter(m => m.role === 'user').length + 1;
            const milestoneSuggestions = generateMilestoneSuggestions(
              userMessageCount,
              messages.map(m => ({ role: m.role, content: m.content })),
              response.triageData || null
            );
            
            if (milestoneSuggestions.length > 0 && [3, 5, 7].includes(userMessageCount)) {
              enhancedContent += `\n\n**💡 You might also be interested in:**\n${milestoneSuggestions.map(s => `• ${s}`).join('\n')}`;
            }
            
            const personalizedResponse = addPersonalityToResponse(enhancedContent);
            
            // Add RAG context indicator if used
            let messageContent = personalizedResponse;
            if (response.ragContext) {
              messageContent += `\n\n_📚 Response enhanced with knowledge base context_`;
            }
            if (response.knowledgeBaseResults) {
              messageContent += `\n\n_🔍 Used ${response.knowledgeBaseResults.length || 0} knowledge entries_`;
            }
            
            // Add triage metadata badges if available
            if (response.triageData) {
              const badges: string[] = [];
              if (response.triageData.complexity === 'high') badges.push('🧠 Complex Analysis');
              if (response.triageData.urgency === 'critical') badges.push('🚨 Urgent');
              if (response.triageData.emotional_tone === 'empathetic') badges.push('💙 Supportive');
              if (response.triageData.best_format === 'table') badges.push('📊 Structured');
              
              if (badges.length > 0) {
                messageContent += `\n\n_${badges.join(' • ')}_`;
              }
            }
            
            // ========== MULTI-AGENT COLLABORATION DISPLAY ==========
            if (response.collaborationMode) {
              const collabBadges: string[] = [];
              collabBadges.push(`🤖 ${response.agentCount || 0} Agents Collaborated`);
              collabBadges.push(`📊 Mode: ${response.collaborationMode}`);
              
              if (response.consensusScore) {
                collabBadges.push(`✅ Consensus: ${Math.round(response.consensusScore * 100)}%`);
              }
              
              messageContent += `\n\n_${collabBadges.join(' • ')}_`;
              
              // Show agent breakdown if available
              if (response.agentResponses && response.agentResponses.length > 0) {
                messageContent += '\n\n**Agent Collaboration Details:**\n';
                response.agentResponses.forEach((agent: any, idx: number) => {
                  messageContent += `\n${idx + 1}. **${agent.agent}**: ${agent.content}\n`;
                });
              }
            }
            
            // ========== AI OPTIMIZATION TRANSPARENCY ==========
              if (response.triageData) {
                console.log('📊 Displaying AI Optimization:', response.triageData);
                messageContent += `\n\n---\n\n### 🤖 AI Optimization Details\n\n`;
                
                const optimizationDetails: string[] = [];
                
                // Show original vs optimized model with cost/latency savings
                optimizationDetails.push(`**🎯 Model Selection**:`);
                const originalModel = aiConfig.selectedModel || 'gpt-4o-mini';
                const selectedModel = response.model || response.triageData.suggested_model;
                
                optimizationDetails.push(`• Requested: \`${originalModel}\``);
                
                // Check for smart routing optimization
                const smartOpt = (response as any).smartRoutingOptimization || (response as any).metadata?.smartRoutingOptimization;
                if (smartOpt?.override && selectedModel !== originalModel) {
                  optimizationDetails.push(`• **Optimized to**: \`${selectedModel}\` ✨`);
                  optimizationDetails.push(`• **💰 Cost Savings**: ${smartOpt.costSavingsPercent || 0}%`);
                  optimizationDetails.push(`• **⚡ Latency Savings**: ${smartOpt.latencySavingsPercent || 0}%`);
                  optimizationDetails.push(`• _Reason: ${smartOpt.reason || response.triageData.reasoning || 'Better suited for this query'}_`);
                } else {
                  optimizationDetails.push(`• **Used**: \`${selectedModel || originalModel}\` (Already optimal)`);
                }
                
                // Show triage analysis
                optimizationDetails.push(`\n**📊 Query Analysis**:`);
                optimizationDetails.push(`• Complexity: ${(response.triageData.complexity || 'medium').toUpperCase()}`);
                optimizationDetails.push(`• Domain: ${(response.triageData.domain || 'general').toUpperCase()}`);
                optimizationDetails.push(`• Urgency: ${(response.triageData.urgency || 'medium').toUpperCase()}`);
                
                // Format recommendation with explanation
                const formatDisplay = response.triageData.best_format || 'text';
                const formatExplanations: Record<string, string> = {
                  'table': '📊 Table (Structured data with rows/columns)',
                  'html': '🌐 HTML (Rich formatted content with images/videos)',
                  'text': '📝 Text (Plain narrative)',
                  'list': '📋 List (Bullet points or numbered)',
                  'map': '🗺️ Interactive Map (Geographic/location data)'
                };
                optimizationDetails.push(`• **Recommended Format**: ${formatExplanations[formatDisplay] || formatDisplay}`);
                
                if (response.triageData.emotional_tone) {
                  const toneEmojis: Record<string, string> = {
                    'empathetic': '💙 Empathetic & Supportive',
                    'professional': '💼 Professional & Formal',
                    'playful': '✨ Playful & Engaging'
                  };
                  optimizationDetails.push(`• **Tone Applied**: ${toneEmojis[response.triageData.emotional_tone] || response.triageData.emotional_tone}`);
                }
                
                if (response.triageData.requires_vision) {
                  optimizationDetails.push(`• **Vision Analysis**: 👁️ Enabled (Image/Video capable)`);
                }
                
                // Show SLM optimization path
                optimizationDetails.push(`\n**⚡ Optimization Path**:`);
                optimizationDetails.push(`1. 🔍 Initial Query Analysis (SLM triage)`);
                optimizationDetails.push(`2. 🎯 Model Selection (Based on complexity & domain)`);
                if (response.triageData.requires_vision) {
                  optimizationDetails.push(`3. 👁️ Vision Model Routing (VLM for image analysis)`);
                }
                if (aiConfig.knowledgeBaseEnabled) {
                  optimizationDetails.push(`${response.triageData.requires_vision ? '4' : '3'}. 📚 Knowledge Base Integration (RAG)`);
                }
                optimizationDetails.push(`${response.triageData.requires_vision ? (aiConfig.knowledgeBaseEnabled ? '5' : '4') : (aiConfig.knowledgeBaseEnabled ? '4' : '3')}. 🤖 ${response.triageData.suggested_model || selectedModel || 'Selected LLM'} Processing`);
                
                optimizationDetails.push(`\n_AI Routing Confidence: ${Math.round((response.triageData.confidence || 0) * 100)}%_`);
                
                messageContent += optimizationDetails.join('\n');
              }
            
            addMessage({
              role: 'assistant',
              content: messageContent,
              timestamp: new Date().toISOString(),
              provider: response.provider,
              model: response.model,
              metadata: {
                triageSuggestedModel: response.triageData?.suggested_model,
                best_format: response.triageData?.best_format,
                oncologyProducts: response.oncologyProducts,
                knowledgeBaseResults: response.knowledgeBaseResults,
                showTreatmentMap: response.showTreatmentMap || (response.triageData?.best_format === 'map'),
                centerType: response.centerType,
                searchQuery: response.searchQuery,
                // NEW: Add routing optimization metadata
                triageData: response.triageData,
                routingReasoning: response.routingReasoning,
                estimatedCost: response.estimatedCost,
                estimatedLatency: response.estimatedLatency,
                collaborationMode: response.collaborationMode,
                agentCount: response.agentCount,
                consensusScore: response.consensusScore,
                smartRoutingOptimization: (response as any).smartRoutingOptimization || (response as any).metadata?.smartRoutingOptimization
              }
            });
            
            // ========== MILESTONE SUGGESTIONS ==========
            // Note: Milestone suggestions already added to message content above
            const milestones = [3, 5, 7];
            const currentUserMessageCount = messages.filter(m => m.role === 'user').length + 1;
            
            if (milestones.includes(currentUserMessageCount)) {
              // Suggestions already shown in message content above
            }
          }
      }

      // Clear uploaded images after sending
      if (imageUrls.length > 0) {
        setUploadedImages([]);
        setShowImageUploader(false);
      }
      
      // Randomly change conversation personality to keep it dynamic
      if (Math.random() > 0.8) {
        const personalities: Array<'formal' | 'casual' | 'empathetic'> = ['formal', 'casual', 'empathetic'];
        setConversationPersonality(personalities[Math.floor(Math.random() * personalities.length)]);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Check if it's a token/limit error
      if (error.message?.includes('token') || error.message?.includes('limit') || error.message?.includes('quota')) {
        addMessage({
          role: 'assistant',
          content: '⚠️ **Demo Limit Reached** \n\nI\'ve hit the token or conversation limit for this demonstration. This showcases the technology feasibility and experimentation capabilities. \n\nWould you like to connect with a human agent? 🤝',
          timestamp: new Date().toISOString()
        });
        setShowHumanEscalation(true);
      } else {
        addMessage({
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Would you like to speak with a human agent instead? 🤝',
          timestamp: new Date().toISOString()
        });
        setShowHumanEscalation(true);
      }
    } finally {
      sendingRef.current = false; // Always reset sending ref
    }
  };

  const handleHumanEscalation = async (request: any) => {
    try {
      const transcript = messages
        .slice(-5)
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n');

      const result = await ContactService.submitContactForm({
        name: `${request.firstName} ${request.lastName || ''}`.trim(),
        email: request.email,
        subject: `[${(request.urgency || 'medium').toUpperCase()}] Live agent request (${context})`,
        message: `${request.message}\n\nTopic: ${selectedTopic}\nContext: ${context}\n\nRecent conversation (last 5):\n${transcript}`,
      } as any);

      if (result.success) {
        toast({ title: 'Request Sent', description: "We'll connect you with a human agent soon!" });
        setShowHumanEscalation(false);
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    } catch (error: any) {
      console.error('Human escalation error', error);
      toast({ title: 'Error', description: 'Failed to send request. Please try again.', variant: 'destructive' });
    }
  };

  const handleConnectLiveAgent = () => {
    // Check if live agent is available
    if (isLiveAgentAvailable) {
      toast({
        title: "Connecting...",
        description: "Connecting you with a live agent now!"
      });
    } else {
      setShowHumanEscalation(true);
    }
  };

  const handleClose = async () => {
    // Send conversation transcript if user had a meaningful conversation
    if (hasStartedConversation && messages.length > 2 && userInfo) {
      await sendConversationTranscript();
    }
    onClose();
  };

  const handleResetSession = async () => {
    // Send transcript before resetting if there are messages
    if (messages.length > 0 && userInfo) {
      try {
        console.log('📧 Sending conversation transcript to user email...');
        const { error } = await supabase.functions.invoke('send-conversation-transcript', {
          body: {
            userInfo,
            context,
            topic: messages[0]?.content?.substring(0, 50) || 'General conversation',
            aiConfig,
            messages,
            sessionDuration: `${Math.round((Date.now() - new Date(messages[0]?.timestamp || Date.now()).getTime()) / 60000)} minutes`
          }
        });
        
        if (error) {
          console.error('Failed to send transcript:', error);
          toast({
            title: "Transcript not sent",
            description: "Could not email conversation history. Please save manually if needed.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Conversation saved!",
            description: `Transcript sent to ${userInfo.email}`,
          });
        }
      } catch (error) {
        console.error('Error sending transcript:', error);
      }
    }

    try {
      sessionStorage.removeItem('genie_ai_config');
      sessionStorage.removeItem('genie_config_timestamp');
      sessionStorage.removeItem('genie_privacy_accepted');
      sessionStorage.removeItem('genie_user_info_session');
      // DON'T remove localStorage user info - keep for returning users
      // localStorage.removeItem('genie_user_info');
    } catch {}
    resetConversation();
    if (conversationLimitService.isConversationActive()) {
      await conversationLimitService.endConversation();
    }
    if (genieConversationService.isConversationActive()) {
      await genieConversationService.endConversation();
    }
    setShowConfigWizard(false);
    setShowTopicPopover(false);
    // DON'T clear user info - keep for returning users
    // setUserInfo(null);
    setShowPrivacyBanner(true);
  };
  const sendConversationTranscript = async () => {
    try {
      // Limit transcript length to avoid validation errors
      const recentMessages = messages.slice(-10); // Only last 10 messages
      const transcript = recentMessages
        .map((msg, idx) => `${idx + 1}. ${msg.role === 'user' ? 'User' : 'Genie AI'}: ${msg.content.substring(0, 200)}${msg.content.length > 200 ? '...' : ''}`)
        .join('\n\n');

      const conversationSummary = {
        userInfo: `${userInfo!.firstName} ${userInfo!.lastName || ''} (${userInfo!.email})`,
        context: context,
        topic: selectedTopic,
        aiConfig: aiConfig,
        messageCount: messages.length,
        conversationDuration: `Started: ${messages[0]?.timestamp || 'Unknown'}`,
        transcript: transcript.substring(0, 1500) // Ensure under 2000 char limit
      };

      // Send to both user and admin email
      await Promise.all([
        // Send to user
        ContactService.submitContactForm({
          name: 'Genie AI System',
          email: userInfo!.email,
          subject: `Your Genie AI Conversation Summary - ${context}/${selectedTopic}`,
          message: `Hi ${userInfo!.firstName},

Thank you for exploring Genie AI! Here's a summary of our conversation:

Context: ${conversationSummary.context}
Topic: ${conversationSummary.topic}
Messages: ${conversationSummary.messageCount}
${conversationSummary.conversationDuration}

--- CONVERSATION HIGHLIGHTS ---
${conversationSummary.transcript}

--- END SUMMARY ---

This was a technology demonstration showcasing AI experimentation capabilities.

Best regards,
Genie AI Team`
        } as any),
        
        // Send to admin
        ContactService.submitContactForm({
          name: 'Genie AI System',
          email: 'genieaiexperimentationhub@gmail.com',
          subject: `[TRANSCRIPT] ${userInfo!.firstName} - ${context}/${selectedTopic}`,
          message: `User: ${conversationSummary.userInfo}
Context: ${conversationSummary.context}
Topic: ${conversationSummary.topic}
Config: ${JSON.stringify(conversationSummary.aiConfig, null, 2)}
Messages: ${conversationSummary.messageCount}

${conversationSummary.transcript}`
        } as any)
      ]);

    } catch (error) {
      console.error('Failed to send conversation transcript:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <TooltipProvider>
      <AnimatePresence>
        {isOpen && (
          <Draggable handle=".drag-handle" nodeRef={dragRef} disabled={isMaximized} cancel=".no-drag">
            <motion.div
              key="genie-main-popup"
              ref={dragRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`
          fixed z-[99997] flex flex-col bg-gradient-to-br from-background via-background to-primary/5
          ${isMaximized
            ? 'top-0 right-0 bottom-0 w-full md:w-3/4 lg:w-2/3 h-full rounded-none' 
            : 'top-4 right-4 w-[90vw] md:w-[500px] lg:w-[600px] h-[calc(100vh-2rem)] rounded-xl shadow-2xl border-2 border-primary/20'
          }
        `}
        style={{ isolation: 'isolate', backdropFilter: 'blur(12px)' }}
      >
          <Card className="h-full bg-gradient-to-br from-background to-muted border shadow-2xl">
            {/* Header */}
          <div className="drag-handle flex items-center justify-between p-3 border-b bg-gradient-to-r from-slate-900 to-slate-800 cursor-move select-none">
             <div className="flex items-center gap-2">
              <img src={genieLogoPopup} alt="Genie AI logo" className="h-8 w-auto object-contain drop-shadow" />
               <div className="flex-1">
                 <h3 className="font-semibold text-white text-sm">Genie AI</h3>
                 <p className="text-xs text-slate-300">Your Technology Navigator</p>
               </div>
            </div>
               <div className="flex items-center gap-1.5">
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => setShowConfigWizard(true)}
                        className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                     >
                       <Settings className="h-4 w-4" />
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Configure AI Settings</p>
                   </TooltipContent>
                  </Tooltip>
                  
                  {/* NEW: Pricing Catalog Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => document.getElementById('pricing-sheet-trigger')?.click()}
                        className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                      >
                        <Bot className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Product Pricing Catalog</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Session Refresh Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleResetSession}
                        className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                        aria-label="Reset session"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset session</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                       variant="ghost"
                       size="sm"
                       onClick={handleConnectLiveAgent}
                       className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                     >
                       <Users className="h-4 w-4" />
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Connect with human agent</p>
                   </TooltipContent>
                 </Tooltip>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => setIsMinimized(!isMinimized)}
                       className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                     >
                       <Minimize2 className="h-4 w-4" />
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Minimize chat window</p>
                   </TooltipContent>
                 </Tooltip>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={() => setIsMaximized(!isMaximized)}
                       className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                     >
                       <Maximize2 className="h-4 w-4" />
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>{isMaximized ? 'Exit fullscreen' : 'Fullscreen'} mode</p>
                   </TooltipContent>
                 </Tooltip>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <Button
                       variant="ghost"
                       size="sm"
                       onClick={handleClose}
                       className="no-drag h-7 w-7 p-0 text-white hover:bg-white/20 rounded"
                     >
                       <X className="h-4 w-4" />
                     </Button>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Close chat</p>
                   </TooltipContent>
                 </Tooltip>
               </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="flex flex-col h-full">
              {showPrivacyBanner ? (
                <div className="flex-1 p-4 flex items-center justify-center text-center text-sm text-muted-foreground">
                  Please review and accept the privacy terms to start chatting.
                </div>
              ) : (
                <React.Fragment>
                  {/* Dynamic Welcome Back Message for Returning Users */}
                  {userInfo && messages.length === 0 && (
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg border border-primary/20 mx-4 mt-4 shadow-sm">
                      <p className="text-sm font-medium">
                        {genieMessaging.getMessage('greeting', undefined, userInfo.firstName)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {genieMessaging.getMessage('ready')}
                      </p>
                    </div>
                  )}

                  {/* Configuration Banner */}
                  {hasStartedConversation && (
                    <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            💻🏥 Tech & Healthcare AI
                          </Badge>
                          <span className="text-xs text-muted-foreground">|</span>
                          <Badge variant="outline" className="text-xs">
                            {aiConfig.mode === 'default' ? '🤖 Auto-Select' : 
                             aiConfig.mode === 'single' ? '🎯 Single Model' : 
                             '🔀 Multi-Agent'}
                          </Badge>
                          <span className="text-xs text-muted-foreground">|</span>
                          <span className="text-xs text-muted-foreground">
                            {aiConfig.mode === 'default' 
                              ? 'Intelligent model selection'
                              : aiConfig.mode === 'single'
                              ? Object.entries(aiConfig)
                                  .filter(([key, val]) => key.endsWith('Model') && val && typeof val === 'string')
                                  .map(([_, model]) => model)
                                  .filter((m, i, arr) => arr.indexOf(m) === i)
                                  .join(', ')
                              : `${aiConfig.selectedModel}, ${aiConfig.secondaryModel || 'default'}`}
                          </span>
                          {aiConfig.ragEnabled && (
                            <>
                              <span className="text-xs text-muted-foreground">|</span>
                              <Badge variant="outline" className="text-xs">🔍 RAG</Badge>
                            </>
                          )}
                          {aiConfig.knowledgeBaseEnabled && (
                            <>
                              <span className="text-xs text-muted-foreground">|</span>
                              <Badge variant="outline" className="text-xs">📚 KB</Badge>
                            </>
                          )}
                          {aiConfig.visionEnabled && (
                            <>
                              <span className="text-xs text-muted-foreground">|</span>
                              <Badge variant="outline" className="text-xs">👁️ Vision</Badge>
                            </>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowConfigWizard(true)}
                          className="h-6 text-xs"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Reconfigure
                        </Button>
                      </div>
                    </div>
                  )}

                   {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 [--popup-vh:calc(100vh-8rem)]">
                    {/* Vision Model Indicator */}
                    {aiConfig.visionEnabled && (
                      <VisionModelIndicator
                        isVisionEnabled={aiConfig.visionEnabled}
                        isMedicalMode={aiConfig.medicalImageMode || false}
                        modelName={aiConfig.selectedModel}
                        className="mb-2"
                      />
                    )}
                    
                    {/* Show uploaded images status when there are images */}
                    {uploadedImages.length > 0 && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                        <p className="text-xs font-medium text-primary mb-1">
                          📷 {uploadedImages.length} image{uploadedImages.length > 1 ? 's' : ''} ready for analysis
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {aiConfig.medicalImageMode ? 'Medical imaging mode active - DICOM support enabled' : 'Standard image analysis mode'}
                        </p>
                      </div>
                    )}

                     {aiConfig.splitScreenEnabled && aiConfig.mode === 'multi' ? (
                       <SplitScreenRenderer
                          key="split-screen-renderer"
                          messages={[...messages, ...splitResponses.primary, ...splitResponses.secondary].sort((a, b) => new Date((a as any).timestamp || 0).getTime() - new Date((b as any).timestamp || 0).getTime())}
                          primaryModel={aiConfig.selectedModel}
                          secondaryModel={aiConfig.secondaryModel || getComplementaryModel(aiConfig.selectedModel)}
                          isLoading={isLoading}
                          loadingStates={loadingStates}
                        />
                     ) : (
                        <div className="space-y-2">
                          {messages.map((message, index) => (
                            <div key={`${message.timestamp}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-accent'
                            }`}>
                              {message.role === 'user' && (
                                <div className="flex items-center gap-2 mb-1">
                                  <User className="h-3 w-3" />
                                  <span className="text-xs font-medium">
                                    {userInfo?.firstName || 'You'}
                                  </span>
                                </div>
                              )}
                              {message.role === 'assistant' && (
                                <div className="flex items-center gap-2 mb-1">
                                  <img src={genieLogoPopup} alt="Genie" className="h-5 w-5 rounded-full" />
                                  <span className="text-xs font-medium">Genie AI</span>
                                </div>
                              )}
                              <div className="prose prose-sm max-w-none">
                                {message.role === 'assistant' ? (
                                  <>
                                    <RichResponseRenderer 
                                      content={message.content}
                                      oncologyProducts={(message as any).metadata?.oncologyProducts}
                                    />
                                    
                                    {/* Display AI Recommendations & Insights */}
                                    {((message as any).metadata?.aiRecommendations || (message as any).metadata?.contextualInsights) && (
                                      <div className="mt-4">
                                        <AIRecommendationsPanel
                                          recommendations={(message as any).metadata?.aiRecommendations || { suggestions: [], nextSteps: [], relatedQueries: [], displayHints: {} }}
                                          insights={(message as any).metadata?.contextualInsights || { summary: '', keyPoints: [], warnings: [], opportunities: [] }}
                                          onActionClick={(action) => {
                                            console.log('Action clicked:', action);
                                            // Handle action clicks - could trigger filters, navigation, etc.
                                          }}
                                          onRelatedQueryClick={(query) => {
                                            // Set input and trigger send
                                            const syntheticEvent = new Event('submit') as any;
                                            const tempInput = inputMessage;
                                            setInputMessage(query);
                                            setTimeout(() => handleSendMessage(), 100);
                                          }}
                                        />
                                      </div>
                                    )}
                                    
                                     {/* Display Treatment Center Map if relevant */}
                                    {((message as any).metadata?.showTreatmentMap || (message as any).metadata?.triageData?.best_format === 'map') && (
                                      <div className="mt-4 space-y-4">
                                        {/* ALWAYS show How To Use Guide for treatment center queries */}
                                        <HowToUseGuide />
                                        
{(() => {
  const lastUser = messages.slice().reverse().find(m => m.role === 'user')?.content || '';
  const productGuess = (message as any).metadata?.product || (/kymriah/i.test(lastUser) ? 'Kymriah' : undefined);
  const cityGuess = (message as any).metadata?.city || ((lastUser.match(/\b(Boston|Atlanta|New York|San Francisco|Los Angeles|Chicago|Houston|Seattle|Miami)\b/i)?.[0]) as string | undefined);
  const stateMap: Record<string, string> = {
    'georgia':'GA','ga':'GA','massachusetts':'MA','ma':'MA','california':'CA','ca':'CA','new york':'NY','ny':'NY','texas':'TX','tx':'TX','florida':'FL','fl':'FL'
  };
  const foundKey = Object.keys(stateMap).find(k => new RegExp(`\\b${k}\\b`, 'i').test(lastUser));
  const stateGuess = (message as any).metadata?.state || (foundKey ? stateMap[foundKey] : undefined);
  const zipMatch = lastUser.match(/\b(\d{5})\b/);
  const zipGuess = (message as any).metadata?.zipCode || (zipMatch ? zipMatch[1] : undefined);
  return (
    <InteractiveTreatmentCenterMap 
      filterByType={(message as any).metadata?.centerType}
      searchQuery={(message as any).metadata?.searchQuery}
      therapeuticArea={(message as any).metadata?.therapeuticArea}
      product={productGuess}
      manufacturer={(message as any).metadata?.manufacturer}
      clinicalTrial={(message as any).metadata?.clinicalTrial}
      state={stateGuess}
      city={cityGuess}
      zipCode={zipGuess}
    />
  );
})()}
                                        
                                        {/* Proactively show pricing if product mentioned and pricing query detected */}
                                        {(message as any).metadata?.product && 
                                         (message as any).metadata?.insuranceType && (
                                          <div className="mt-4">
                                            <PricingDisplay 
                                              product={(message as any).metadata?.product}
                                              insuranceType={(message as any).metadata?.insuranceType}
                                            />
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    
                                    {/* Display Knowledge Base Citations */}
                                    {(message as any).metadata?.knowledgeBaseResults && 
                                     (message as any).metadata.knowledgeBaseResults.length > 0 && (
                                      <SourceCitations 
                                        sources={(message as any).metadata.knowledgeBaseResults.map((kb: any) => ({
                                          id: kb.id || Math.random().toString(),
                                          title: kb.finding_name || kb.title || 'Knowledge Source',
                                          url: kb.metadata?.source_url || kb.metadata?.citation?.url,
                                          sourceName: kb.metadata?.source_name || kb.metadata?.citation?.source,
                                          domain: kb.domain,
                                          credibilityScore: kb.source_credibility_score || kb.metadata?.citation?.credibility,
                                          citationCount: kb.citation_count
                                        }))}
                                      />
                                    )}
                                    
                                    {/* NEW: Routing Optimization Badge */}
                                    <RoutingOptimizationBadge
                                      triageData={(message as any).metadata?.triageData}
                                      routingReasoning={(message as any).metadata?.routingReasoning}
                                      estimatedCost={(message as any).metadata?.estimatedCost}
                                      estimatedLatency={(message as any).metadata?.estimatedLatency}
                                      modelUsed={message.model}
                                      collaborationMode={(message as any).metadata?.collaborationMode}
                                      agentCount={(message as any).metadata?.agentCount}
                                      consensusScore={(message as any).metadata?.consensusScore}
                                      smartRoutingOptimization={(message as any).metadata?.smartRoutingOptimization}
                                    />
                                  </>
                                ) : (
                                  <p className="text-sm">{message.content}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex justify-start">
                            <div className="bg-accent p-3 rounded-lg max-w-[80%]">
                              <div className="flex items-center gap-2 mb-1">
                                <img src={genieThinking} alt="Genie" className="h-5 w-5 rounded-full animate-pulse" />
                                <span className="text-xs font-medium">Genie AI</span>
                              </div>
                              <TypingIndicator query={inputMessage} />
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}


                    {/* Session Manager */}

                    </div>

                      {/* Input Area */}
                      <div className="p-4 border-t bg-background/50 flex-shrink-0">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => {
                            setInputMessage(e.target.value);
                          }}
                          placeholder={
                            aiConfig.medicalImageMode && aiConfig.visionEnabled
                              ? "Upload medical images or ask a question..."
                              : selectedTopic 
                                ? `Ask me about ${selectedTopic}...` 
                                : "Ask me anything..."
                          }
                          onKeyDown={(e) => {
                            // Handle arrow key navigation for history
                            if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              if (inputHistory.length > 0) {
                                const newIndex = historyIndex < inputHistory.length - 1 
                                  ? historyIndex + 1 
                                  : historyIndex;
                                setHistoryIndex(newIndex);
                                setInputMessage(inputHistory[newIndex]);
                              }
                            } else if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              if (historyIndex > 0) {
                                const newIndex = historyIndex - 1;
                                setHistoryIndex(newIndex);
                                setInputMessage(inputHistory[newIndex]);
                              } else if (historyIndex === 0) {
                                setHistoryIndex(-1);
                                setInputMessage('');
                              }
                            } else if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            } else {
                              // Reset history navigation when user types any other key
                              if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Delete') {
                                setHistoryIndex(-1);
                              }
                            }
                          }}
                          disabled={isLoading}
                          className="flex-1"
                        />
                        
                        {/* Image Upload Button - Right of input */}
                        {aiConfig.visionEnabled && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowImageUploader(!showImageUploader)}
                                className="h-9 w-9 p-0 shrink-0"
                              >
                                <ImagePlus className="h-5 w-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{showImageUploader ? "Hide" : "Upload"} images or medical scans (DICOM supported)</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={handleSendMessage}
                              disabled={isLoading || (!inputMessage.trim() && uploadedImages.length === 0)}
                              size="sm"
                              className="shrink-0"
                            >
                              <Send className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send message (or press Enter)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    
                     {/* Simple status indicator */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">
                          {selectedTopic && `📍 ${selectedTopic}`}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>Genie AI</span>
                          {(aiConfig.ragEnabled || aiConfig.knowledgeBaseEnabled || aiConfig.mcpEnabled) && (
                            <div className="flex gap-1">
                              {aiConfig.ragEnabled && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="inline-flex">
                                      <Badge variant="outline" className="text-xs cursor-help">RAG</Badge>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs">Retrieval Augmented Generation: pulls relevant docs to ground answers</div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                              {aiConfig.knowledgeBaseEnabled && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="inline-flex">
                                      <Badge variant="outline" className="text-xs cursor-help">KB</Badge>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs">Knowledge Base: uses curated universal topics for context</div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                               {aiConfig.mcpEnabled && (
                                 <Tooltip>
                                   <TooltipTrigger asChild>
                                     <div className="inline-flex">
                                       <Badge variant="outline" className="text-xs cursor-help">🔌 MCP</Badge>
                                     </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="text-xs max-w-xs">Model Context Protocol: AI can access external tools, databases & APIs for enhanced capabilities</div>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => setShowHumanEscalation(true)}
                          className="text-xs p-0"
                        >
                          {isLiveAgentAvailable ? '🟢 Live Agent' : 'Need help?'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          )}

          {/* Minimized State */}
          {isMinimized && (
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={genieLogoPopup} alt="Genie AI logo" className="h-6 w-auto object-contain drop-shadow" />
                <span className="text-sm font-medium">Genie AI</span>
                {messages.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {messages.filter(m => m.role === 'user').length}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(false)}
                className="h-6 w-6 p-0"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
            </div>
          )}
          </Card>
            </motion.div>
          </Draggable>
        )}

        {/* Privacy Modal inside Genie container */}
        {isOpen && showPrivacyBanner && (
          <Dialog 
            key="privacy-dialog"
            open={showPrivacyBanner}
            onOpenChange={(open) => {
              if (!open) {
                setShowPrivacyBanner(false);
                onClose(); // allow users to close Genie without accepting
              }
            }}
          >
            <DialogContent aria-describedby={undefined} className="max-w-sm sm:max-w-md w-full p-0 z-[100001]">
              {/* Accessible title for screen readers + enables built-in close button semantics */}
              <DialogHeader className="sr-only">
                <DialogTitle>Welcome to Genie AI</DialogTitle>
              </DialogHeader>
              <PublicPrivacyBanner 
                onAccept={handlePrivacyAccept}
                onClose={() => { setShowPrivacyBanner(false); onClose(); }}
                technologyTopics={technologyTopics}
                healthcareTopics={healthcareTopics}
              />
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Image Uploader Drawer */}
      <Sheet open={showImageUploader && aiConfig.visionEnabled} onOpenChange={setShowImageUploader}>
        <SheetContent side="right" className="sm:max-w-md z-[100]">
          <SheetHeader>
            <SheetTitle>Upload Images for Analysis</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <MedicalImageUploader
              onImageUpload={(images) => {
                setUploadedImages(images);
                if (images.length > 0) {
                  toast({
                    title: "Images ready",
                    description: `${images.length} image(s) ready for analysis. Send your question to analyze.`,
                  });
                }
              }}
              medicalMode={aiConfig.medicalImageMode || false}
              maxFiles={5}
              userEmail={userInfo?.email}
              context={context || 'healthcare'}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Conversation Limit Modal - with proper z-index and close handler */}
      <ConversationLimitModal
        isOpen={showLimitModal}
        onClose={() => {
          setShowLimitModal(false);
          // Allow user to continue if they still have hourly quota
          if (conversationLimits && conversationLimits.hourly_count < conversationLimits.hourly_limit) {
            setIsConversationAllowed(true);
          }
        }}
        limits={conversationLimits || {
          allowed: false,
          daily_count: 0,
          daily_limit: 5,
          hourly_count: 0,
          hourly_limit: 2,
          reset_time: new Date(Date.now() + 3600000).toISOString()
        }}
        context={context || 'technology'}
      />
      
      {/* Experimentation Banner removed - all info now in privacy popup with legal dialog links */}
      
      {/* Configuration Wizard */}
      {showConfigWizard && (
        <ConfigurationWizard
          key="config-wizard"
          isOpen={showConfigWizard}
          portalContainer={dragRef.current}
          onComplete={(config) => {
            handleConfigChange(config);
            setShowConfigWizard(false);
            
            // Now add welcome message after configuration (only if no messages yet)
            if (messages.length === 0) {
              const capabilitiesMessage = `Hello ${userInfo?.firstName}! 🧞‍♂️ Welcome to Genie AI! 

I am Genie and I can support and discuss with you on Experimentation Hub Technology and Healthcare concepts.

💡 **My comprehensive knowledge includes:**
• 🚀 AI Innovation & Gartner Value Framework mapping to tech stacks
• 🏥 Healthcare business use cases, DTx, Cell & Gene therapies  
• 🔬 Technology stack concepts and journey use cases
• 📊 Case studies and implementation methodologies
• 🛡️ Security topics and compliance frameworks
• 🗺️ Value creation and realization strategies

I'm continuously updated with all website content and can intelligently guide you through complex topics with personalized insights!

${config.mode === 'default' ? '🤖 I\'ll automatically select the best AI model for each query.' : 
  config.mode === 'single' ? `🎯 Using ${config.selectedModel} as your specialized model.` : 
  `🔀 Running multi-agent mode with ${config.selectedModel} and ${config.secondaryModel}.`}

Ask me anything to get started!`;

              addMessage({
                role: 'assistant',
                content: capabilitiesMessage,
                timestamp: new Date().toISOString()
              });
            }
            
            toast({
              title: "Configuration Saved",
              description: config.mode !== aiConfig.mode ? "Mode switched - conversation continues seamlessly" : "Your AI preferences have been updated",
            });
          }}
          onCancel={() => setShowConfigWizard(false)}
        />
      )}
      
      {/* Human Escalation Form */}
      {showHumanEscalation && userInfo && (
        <HumanEscalationForm
          key="human-escalation"
          isOpen={showHumanEscalation}
          onClose={() => setShowHumanEscalation(false)}
          onSubmit={handleHumanEscalation}
          userInfo={userInfo}
          context={context!}
        />
      )}
    </TooltipProvider>
  );
};
