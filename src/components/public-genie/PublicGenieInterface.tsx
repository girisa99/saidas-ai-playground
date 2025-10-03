import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, MessageCircle, Send, User, Bot, AlertTriangle, Move, Users, Settings, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useUniversalAI } from '@/hooks/useUniversalAI';
import { useConversationState } from '@/hooks/useConversationState';
import { ConversationMessage } from '../enrollment-genie/ConversationMessage';
import { TypingIndicator } from '../enrollment-genie/TypingIndicator';
import { PublicPrivacyBanner } from './PublicPrivacyBanner';
import { HumanEscalationForm } from './HumanEscalationForm';
import { RichResponseRenderer } from './RichResponseRenderer';
import { AdvancedAISettings, AIConfig } from './AdvancedAISettings';
import { ConfigurationWizard } from './ConfigurationWizard';
import { SplitScreenRenderer } from './SplitScreenRenderer';
import { SessionManager } from './SessionManager';
import { ContextSwitcher } from './ContextSwitcher';
import { ContextualTopicSuggester } from './ContextualTopicSuggester';
import { ConversationLimitModal } from './ConversationLimitModal';
import { ExperimentationBanner } from './ExperimentationBanner';
import { ContactCenterOptimizer } from './ContactCenterOptimizer';
import { TechnologyKnowledgeBase, getTechnologyKnowledge } from '../comprehensive-knowledge/TechnologyKnowledgeBase';
import { HealthcareKnowledgeBase, getReimbursementInfo } from './HealthcareKnowledgeBase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { CapabilitiesPrompt, TopicSuggestions } from './ConversationUtils';
import { NewsletterService } from '@/services/newsletterService';
import { ContactService } from '@/services/publicContactService';
import { conversationLimitService, type ConversationLimits } from '@/services/conversationLimitService';
import { genieConversationService } from '@/services/genieConversationService';
import genieLogoPopup from '@/assets/genie-logo-popup.png';
import genieThinking from '@/assets/genie-thinking.png';

interface UserInfo {
  firstName: string;
  lastName?: string;
  email: string;
}

type Context = 'technology' | 'healthcare';

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
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [context, setContext] = useState<Context | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [inputMessage, setInputMessage] = useState('');
  const [showHumanEscalation, setShowHumanEscalation] = useState(false);
  const [isLiveAgentAvailable, setIsLiveAgentAvailable] = useState(false);
  const [conversationPersonality, setConversationPersonality] = useState<'formal' | 'casual' | 'empathetic'>('casual');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
  const [showConfigWizard, setShowConfigWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  
  // Conversation limit states - explicitly initialized
  const [showLimitModal, setShowLimitModal] = React.useState<boolean>(false);
  const [conversationLimits, setConversationLimits] = React.useState<ConversationLimits | null>(null);
  const [isConversationAllowed, setIsConversationAllowed] = React.useState<boolean>(true);
  const [showExperimentationBanner, setShowExperimentationBanner] = React.useState<boolean>(true);
  const [showSessionManager, setShowSessionManager] = useState(false);
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
  const [aiConfig, setAIConfig] = useState<AIConfig>({
    mode: 'default',
    ragEnabled: false,
    knowledgeBaseEnabled: false,
    mcpEnabled: false,
    selectedModel: 'gpt-4o-mini',
    secondaryModel: 'claude-3-haiku',
    splitScreenEnabled: false,
    contextualSuggestions: true,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { generateResponse, isLoading } = useUniversalAI();
  const { state, addMessage, resetConversation } = useConversationState();
  const messages = state.messages;

// Memoized scroll to bottom effect
useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages.length]);

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
      
      if (!limits.allowed) {
        setShowLimitModal(true);
      }
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

    // Subscribe user to newsletter (public edge function)
    try {
      const res = await NewsletterService.subscribe({
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        interests: ['AI Conversation']
      });
      if (res.success) {
        toast({ title: 'Subscribed', description: 'Welcome email sent. You can unsubscribe anytime.' });
      } else {
        toast({ title: 'Subscription issue', description: res.message, variant: 'destructive' });
      }
    } catch (e: any) {
      console.error('Subscription error', e);
      toast({ title: 'Subscription failed', description: 'Please try again later.', variant: 'destructive' });
    }
    
    // Start tracking Genie conversation in database
    try {
      const result = await genieConversationService.startConversation({
        userEmail: info.email,
        userName: info.firstName + (info.lastName ? ` ${info.lastName}` : ''),
        context: context || 'general',
        ipAddress: ipAddress || undefined
      });
      
      if (result.success) {
        console.log('✅ Genie conversation tracking started:', result.conversationId);
      } else {
        console.warn('⚠️ Failed to start conversation tracking:', result.error);
      }
    } catch (error) {
      console.error('Failed to initialize conversation tracking:', error);
    }
    
    // Add capabilities introduction message
    const capabilitiesMessage = `Hello ${info.firstName}! 🧞‍♂️ Welcome to Genie AI! 

I am Genie and I can support and discuss with you on Experimentation Hub Technology and Healthcare concepts.

💡 **My comprehensive knowledge includes:**
• 🚀 AI Innovation & Gartner Value Framework mapping to tech stacks
• 🏥 Healthcare business use cases, DTx, Cell & Gene therapies  
• 🔬 Technology stack concepts and journey use cases
• 📊 Case studies and implementation methodologies
• 🛡️ Security topics and compliance frameworks
• 🗺️ Value creation and realization strategies

I'm continuously updated with all website content and can intelligently guide you through complex topics with personalized insights!

Ask me anything to get started, or click below to explore my advanced features!`;

    addMessage({
      role: 'assistant',
      content: capabilitiesMessage,
      timestamp: new Date().toISOString()
    });

    // Show configuration wizard before starting conversation
    setShowConfigWizard(true);
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
    const techKeywords = ['ai', 'technology', 'software', 'programming', 'code', 'automation', 'llm', 'model', 'api', 'cloud', 'data'];
    const healthcareKeywords = ['health', 'medical', 'patient', 'clinical', 'wellness', 'treatment', 'diagnosis', 'healthcare', 'medicine'];
    
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Check if conversation is allowed
    if (!isConversationAllowed) {
      setShowLimitModal(true);
      return;
    }

    // Start conversation if this is the first message
    if (!conversationLimitService.isConversationActive()) {
      const startResult = await conversationLimitService.startConversation(
        context!,
        userInfo?.email,
        userInfo?.firstName
      );

      if (!startResult.allowed) {
        setShowLimitModal(true);
        setConversationLimits(startResult.limits || null);
        setIsConversationAllowed(false);
        return;
      }
    }

    // Update message count
    await conversationLimitService.updateMessageCount();

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Mark that conversation has started
    if (!hasStartedConversation) {
      setHasStartedConversation(true);
    }

    // Auto-detect context if not set
    if (!context) {
      const detectedContext = detectContextFromMessage(userMessage);
      if (detectedContext) {
        setContext(detectedContext);
        // Show topic suggestions
        setTimeout(() => {
          setShowTopicSuggestions(true);
          addMessage({
            role: 'assistant',
            content: `I detected you're interested in ${detectedContext}! 🎯 I can provide specialized assistance in this area. You can select a specific topic below or continue with your question.`,
            timestamp: new Date().toISOString()
          });
        }, 1000);
      }
    }
    
    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });

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
        // Handle split-screen multi-model responses
        setLoadingStates({ primary: true, secondary: true });

        const [primaryResponse, secondaryResponse] = await Promise.all([
          generateResponse({
            provider: 'openai',
            model: aiConfig.selectedModel,
            prompt: enhancedPrompt,
            systemPrompt,
            temperature: 0.7,
            maxTokens: 1000
          }),
          generateResponse({
            provider: 'claude',
            model: aiConfig.secondaryModel || 'claude-3-haiku',
            prompt: enhancedPrompt,
            systemPrompt,
            temperature: 0.7,
            maxTokens: 1000
          })
        ]);

        setLoadingStates({ primary: false, secondary: false });

        if (primaryResponse) {
          const personalizedPrimary = addPersonalityToResponse(primaryResponse.content);
          setSplitResponses(prev => ({
            ...prev,
            primary: [...prev.primary, {
              role: 'assistant',
              content: personalizedPrimary,
              timestamp: new Date().toISOString(),
              model: aiConfig.selectedModel
            }]
          }));
        }

        if (secondaryResponse) {
          const personalizedSecondary = addPersonalityToResponse(secondaryResponse.content);
          setSplitResponses(prev => ({
            ...prev,
            secondary: [...prev.secondary, {
              role: 'assistant',
              content: personalizedSecondary,
              timestamp: new Date().toISOString(),
              model: aiConfig.secondaryModel
            }]
          }));
        }
      } else {
        // Standard single response
        const response = await generateResponse({
          provider: 'openai',
          model: aiConfig.selectedModel,
          prompt: enhancedPrompt,
          systemPrompt,
          temperature: 0.7,
          maxTokens: 1000
        });

        if (response) {
          const personalizedResponse = addPersonalityToResponse(response.content);
          addMessage({
            role: 'assistant',
            content: personalizedResponse,
            timestamp: new Date().toISOString()
          });
        }
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
          content: '⚠️ **Demo Limit Reached** \n\nI\'ve hit the token or conversation limit for this demonstration. This showcases the technology feasibility and experimentation capabilities. \n\nWould you like to start a new session or connect with a human agent? 🤝',
          timestamp: new Date().toISOString()
        });
        setShowSessionManager(true);
      } else {
        addMessage({
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Would you like to speak with a human agent instead? 🤝',
          timestamp: new Date().toISOString()
        });
        setShowHumanEscalation(true);
      }
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
    <AnimatePresence>
      <Draggable
        handle=".drag-handle"
        disabled={isMaximized}
        nodeRef={dragRef}
      >
        <motion.div
          ref={dragRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`fixed ${isMaximized ? 'inset-4' : isMinimized ? 'bottom-4 right-4 w-80 h-16' : 'bottom-4 right-4 w-96 h-[600px]'} z-[100000]`}
        >
        <Card className="h-full bg-gradient-to-br from-background to-muted border shadow-2xl">
          {/* Header */}
          <div className="drag-handle flex items-center justify-between p-4 border-b bg-gradient-to-r from-slate-900 to-slate-800 cursor-move">
            <div className="flex items-center gap-3">
              <img src={genieLogoPopup} alt="Genie AI logo" className="h-10 w-auto object-contain drop-shadow" />
               <div>
                 <h3 className="font-semibold text-white">Genie AI Assistant</h3>
                 {context && selectedTopic && (
                   <div className="flex items-center gap-2">
                     <p className="text-xs text-slate-300">{selectedTopic} • {context}</p>
                     {aiConfig.mode !== 'default' && (
                       <Badge variant="secondary" className="text-xs px-1 py-0">
                         {aiConfig.mode.toUpperCase()}
                       </Badge>
                     )}
                   </div>
                 )}
               </div>
            </div>
             <div className="flex items-center gap-1">
               <Button
                 variant="ghost"
                 size="sm"
                 onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                 className="h-6 w-6 p-0 text-white hover:bg-white/20"
                 title="AI Settings"
               >
                 <Settings className="h-3 w-3" />
               </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleConnectLiveAgent}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                title="Connect with human agent"
              >
                <Users className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMaximized(!isMaximized)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="flex flex-col h-full">
              {showPrivacyBanner ? (
                <div className="flex-1 overflow-y-auto p-4">
                  <PublicPrivacyBanner 
                    onAccept={handlePrivacyAccept} 
                    technologyTopics={technologyTopics}
                    healthcareTopics={healthcareTopics}
                  />
                </div>
              ) : (
                <>
                  {/* Advanced Settings Panel */}
                  {showAdvancedSettings && (
                    <div className="border-b bg-muted/10 relative">
                      <div className="flex items-center justify-between p-2 border-b">
                        <h3 className="text-sm font-medium">AI Configuration</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAdvancedSettings(false)}
                          className="h-6 w-6 p-0"
                          title="Close Settings"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <AdvancedAISettings 
                        currentConfig={aiConfig}
                        onConfigChange={setAIConfig}
                      />
                    </div>
                  )}

                  {/* Messages */}
                  <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${showAdvancedSettings ? 'max-h-96' : ''}`}>
                    {aiConfig.splitScreenEnabled && aiConfig.mode === 'multi' ? (
                      <SplitScreenRenderer
                        messages={[...messages, ...splitResponses.primary, ...splitResponses.secondary]}
                        primaryModel={aiConfig.selectedModel}
                        secondaryModel={aiConfig.secondaryModel || 'claude-3-haiku'}
                        isLoading={isLoading}
                        loadingStates={loadingStates}
                      />
                    ) : (
                      <div className="space-y-2">
                        {messages.map((message, index) => (
                          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-accent'
                            }`}>
                              {message.role === 'assistant' ? (
                                <RichResponseRenderer content={message.content} />
                              ) : (
                                <p className="text-sm">{message.content}</p>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {/* Contact Center Intelligence (shows after meaningful conversation) */}
                        {messages.length >= 4 && (
                          <ContactCenterOptimizer
                            conversationHistory={messages}
                            onOptimizationSuggestion={(suggestion) => {
                              addMessage({
                                role: 'assistant',
                                content: suggestion,
                                timestamp: new Date().toISOString()
                              });
                            }}
                          />
                        )}
                        
                        {isLoading && (
                          <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg my-2">
                            <img 
                              src={genieThinking} 
                              alt="Genie thinking" 
                              className="w-12 h-12 animate-pulse"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground">Genie is thinking...</span>
                              <span className="text-xs text-muted-foreground">Analyzing your question with AI magic ✨</span>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                   {/* Contextual Topic Suggestions */}
                   {hasStartedConversation && !showAdvancedSettings && (
                     <ContextualTopicSuggester
                       conversationHistory={messages}
                       currentContext={context}
                       onTopicSelect={(response, isFollowUp) => {
                         if (isFollowUp) {
                           addMessage({
                             role: 'assistant',
                             content: response,
                             timestamp: new Date().toISOString()
                           });
                         } else {
                           setSelectedTopic(response);
                         }
                       }}
                       onContextSwitch={(newContext) => {
                         setContext(newContext);
                         addMessage({
                           role: 'assistant',
                           content: `Switched to ${newContext} context! 🔄 I'll now provide suggestions and insights tailored to ${newContext}. What would you like to explore?`,
                           timestamp: new Date().toISOString()
                         });
                       }}
                     />
                   )}

                   {/* Capabilities Prompt */}
                   {showCapabilities && !context && (
                     <CapabilitiesPrompt
                       onModeSelect={(mode) => {
                         setAIConfig(prev => ({ ...prev, mode }));
                         setShowCapabilities(false);
                       }}
                       onFeatureToggle={(feature) => {
                         const featureKey = feature.toLowerCase().replace(' ', '') + 'Enabled';
                         setAIConfig(prev => ({ ...prev, [featureKey]: !prev[featureKey as keyof AIConfig] }));
                       }}
                       currentConfig={aiConfig}
                     />
                   )}

                   {/* Topic Suggestions */}
                   {showTopicSuggestions && context && (
                     <TopicSuggestions
                       context={context}
                       topics={context === 'technology' ? technologyTopics.slice(0, 6) : healthcareTopics.slice(0, 6)}
                       onTopicSelect={(topic) => {
                         setSelectedTopic(topic);
                        setShowTopicSuggestions(false);
                        addMessage({
                          role: 'assistant',
                          content: `Great! I'm now focused on ${topic}. What specific questions do you have about this topic?`,
                          timestamp: new Date().toISOString()
                        });
                      }}
                    />
                  )}

                   {/* Session Manager */}
                   {showSessionManager && (
                     <SessionManager
                       ipAddress={ipAddress}
                       messageCount={messages.length}
                       onRestart={() => {
                         resetConversation();
                         setSplitResponses({ primary: [], secondary: [] });
                         setContext(null);
                         setSelectedTopic('');
                         setShowSessionManager(false);
                         setShowConfigWizard(true);
                       }}
                       onContinue={() => setShowSessionManager(false)}
                       showControls={hasStartedConversation}
                     />
                   )}

                   {/* Input */}
                   <div className="p-4 border-t bg-background/50">
                     {/* Context Switcher */}
                     {hasStartedConversation && (
                       <div className="mb-3">
                         <ContextSwitcher
                           currentContext={context}
                           onContextSwitch={(newContext) => {
                             setContext(newContext);
                             setSelectedTopic('');
                             addMessage({
                               role: 'assistant',
                               content: `Switched to ${newContext} context! 🔄 What would you like to explore?`,
                               timestamp: new Date().toISOString()
                             });
                           }}
                           onTopicSelect={(topic) => {
                             setSelectedTopic(topic);
                             addMessage({
                               role: 'assistant',
                               content: `Great! I'm now focused on ${topic}. What specific questions do you have?`,
                               timestamp: new Date().toISOString()
                             });
                           }}
                           availableTopics={{
                             technology: technologyTopics,
                             healthcare: healthcareTopics
                           }}
                         />
                       </div>
                     )}
                    <div className="flex gap-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={selectedTopic ? `Ask me about ${selectedTopic}...` : "Ask me anything..."}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputMessage.trim()}
                        size="sm"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Context and Topic Switcher */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        {context && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowTopicSuggestions(!showTopicSuggestions)}
                            className="text-xs h-6"
                          >
                            {context === 'technology' ? '🚀' : '🏥'} {selectedTopic || 'Choose Topic'}
                          </Button>
                        )}
                        {!context && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowCapabilities(!showCapabilities)}
                            className="text-xs h-6"
                          >
                            ⚙️ Configure AI
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>Genie AI</span>
                          {aiConfig.mode !== 'default' && (
                            <Badge variant="secondary" className="text-xs">
                              {aiConfig.mode.toUpperCase()}
                            </Badge>
                          )}
                          {(aiConfig.ragEnabled || aiConfig.knowledgeBaseEnabled || aiConfig.mcpEnabled) && (
                            <div className="flex gap-1">
                              {aiConfig.ragEnabled && <Badge variant="outline" className="text-xs">RAG</Badge>}
                              {aiConfig.knowledgeBaseEnabled && <Badge variant="outline" className="text-xs">KB</Badge>}
                              {aiConfig.mcpEnabled && <Badge variant="outline" className="text-xs">MCP</Badge>}
                            </div>
                          )}
                        </p>
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
                </>
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
        
        {/* Conversation Limit Modal */}
        <ConversationLimitModal
          isOpen={showLimitModal}
          onClose={() => {
            console.log('Closing limit modal');
            setShowLimitModal(false);
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
        
        {/* Experimentation Banner */}
        {showExperimentationBanner && context && (
          <ExperimentationBanner
            context={context}
            onDismiss={() => setShowExperimentationBanner(false)}
          />
        )}
        
        {/* Configuration Wizard */}
        <ConfigurationWizard
          isOpen={showConfigWizard}
          onComplete={(config) => {
            setAIConfig(config);
            setShowConfigWizard(false);
          }}
          onCancel={() => setShowConfigWizard(false)}
        />
        
        {/* Human Escalation Form */}
        <AnimatePresence>
          {showHumanEscalation && userInfo && (
            <HumanEscalationForm
              isOpen={showHumanEscalation}
              onClose={() => setShowHumanEscalation(false)}
              onSubmit={handleHumanEscalation}
              userInfo={userInfo}
              context={context!}
            />
          )}
        </AnimatePresence>
      </motion.div>
      </Draggable>
    </AnimatePresence>
  );
};
