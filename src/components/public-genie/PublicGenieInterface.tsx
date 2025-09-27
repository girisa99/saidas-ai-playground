/**
 * PUBLIC GENIE INTERFACE
 * Same powerful multi-model system as GenieConversationInterface but for public use
 * Supports: LLM, Small Language, Vision, MCP, RAG, Knowledge Base with cross-functional selection
 * Context: Technology & Healthcare focused
 */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  X, 
  Send,
  Loader2,
  Settings,
  MessageSquare,
  Shield,
  Clock,
  User,
  Move,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Core AI and conversation hooks (adapted for public use)
import { useUniversalAI } from '@/hooks/useUniversalAI';
import { useConversationState } from '@/hooks/useConversationState';

// UI Components (reuse existing ones)
import { ConversationMessage as MessageComponent } from '../enrollment-genie/ConversationMessage';
import { TypingIndicator } from '../enrollment-genie/TypingIndicator';
import { SelectedModelConfig } from '@/components/ai';

// Public-specific components
import { PublicPrivacyBanner } from './PublicPrivacyBanner';
import { HumanEscalationForm } from './HumanEscalationForm';

// Assets
import genieLogoImg from '@/assets/genie-logo.png';
import genieAnimatedImg from '@/assets/genie-animated.png';

interface UserInfo {
  firstName: string;
  lastName?: string;
  email: string;
  contextType: 'technology' | 'healthcare';
}

interface PublicGenieInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  initialContextType?: 'technology' | 'healthcare';
  mode?: 'system' | 'single' | 'multi';
  onModeChange?: (mode: 'system' | 'single' | 'multi') => void;
}

export const PublicGenieInterface: React.FC<PublicGenieInterfaceProps> = ({
  isOpen,
  onClose,
  initialContextType = 'technology',
  mode = 'system',
  onModeChange
}) => {
  // Drag functionality
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State management
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [sessionId] = useState(() => `public_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  
  // Privacy and user info
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [contextType, setContextType] = useState<'technology' | 'healthcare'>('technology');
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [requestsUsed, setRequestsUsed] = useState(0);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  
  // Model and feature configuration (same as authenticated version)
  const [selectedModels, setSelectedModels] = useState<SelectedModelConfig[]>([
    {
      provider: 'openai',
      model: 'gpt-4o-mini',
      category: 'llm',
      role: 'primary',
      name: 'GPT-4o Mini',
      weight: 1.0
    }
  ]);
  const [enabledFeatures, setEnabledFeatures] = useState<string[]>(['rag']);
  const [selectedMCPTools, setSelectedMCPTools] = useState<string[]>([]);
  const [ragEnabled, setRAGEnabled] = useState(true);
  
  // Hooks
  const { generateResponse } = useUniversalAI();
  const { state, addMessage, updateConversationConfig, switchMode, resetConversation } = useConversationState();
  const { toast } = useToast();
  
  const currentMode = (state?.selectedMode as any) || mode;

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || isMaximized) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 200;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Privacy acceptance handler
  const handlePrivacyAccept = (userData: UserInfo) => {
    setUserInfo(userData);
    setContextType(userData.contextType);
    setPrivacyAccepted(true);
    
    toast({
      title: `Welcome ${userData.firstName}!`,
      description: `GENIE AI is now configured for ${userData.contextType} expertise.`,
    });
  };

  // Context-specific system prompts
  const buildSystemPrompt = useCallback(() => {
    let systemPrompt = 'You are GENIE AI, a comprehensive AI assistant specializing in ';
    
    if (contextType === 'technology') {
      systemPrompt += `technology, AI, and innovation. Your expertise includes:
      
      **Technology & AI:**
      - Large Language Models (LLMs), Small Language Models (SLMs), Vision Language Models
      - Model Context Protocol (MCP), AI automation, and AI/ML workflows
      - Recent AI developments, model releases, and technical advancements
      - Market trends in AI/ML, recent acquisitions, mergers, and funding rounds
      - New platform launches, API releases, and developer tools
      
      **Context Guidelines:**
      - Provide technical depth while remaining accessible
      - Reference recent developments and industry trends
      - Suggest practical applications and implementations
      - Be current with AI/ML news and developments`;
      
    } else {
      systemPrompt += `healthcare, biotech, and pharmaceutical industries. Your expertise includes:
      
      **Healthcare & Biotech:**
      - Oncology treatments, CAR-T therapy, cell and gene therapy
      - Treatment centers operations, cardiology, and specialized care
      - Government pricing structures, WAC pricing, 340B programs
      - Insurance coverage, copay assistance, alternative funding options
      - Patient travel logistics, reimbursement programs, financial assistance
      - Clinical trials, regulatory pathways (FDA, EMA), drug development
      
      **Context Guidelines:**
      - Always recommend consulting with Healthcare Providers (HCPs)
      - Provide accurate, evidence-based information
      - Include relevant regulatory and compliance considerations
      - Mention recent developments in biotech and pharmaceutical sectors`;
    }
    
    if (ragEnabled && enabledFeatures.includes('rag')) {
      systemPrompt += '\n\nYou have access to specialized knowledge databases and can provide enhanced contextual responses using RAG (Retrieval-Augmented Generation).';
    }
    
    if (selectedMCPTools.length > 0) {
      systemPrompt += `\n\nYou have access to these tools: ${selectedMCPTools.join(', ')}.`;
    }
    
    systemPrompt += `\n\n**IMPORTANT DISCLAIMERS:**
    - This is a public demo of AI capabilities
    - All responses are AI-generated and should be verified with experts
    - For medical information, always consult qualified Healthcare Providers
    - This conversation may be monitored for quality and safety purposes`;
    
    return systemPrompt;
  }, [contextType, ragEnabled, selectedMCPTools, enabledFeatures]);

  // Update conversation state when configuration changes
  useEffect(() => {
    updateConversationConfig({
      selectedMode: mode as any,
      selectedModel: selectedModels[0]?.model || 'gpt-4o-mini',
      selectedModelType: (selectedModels[0]?.category === 'small' ? 'slm' : 
                         selectedModels[0]?.category === 'vision' ? 'vlm' : 'llm') as 'llm' | 'slm' | 'vlm',
      enabledFeatures,
      selectedMCPTools
    });
  }, [mode, selectedModels, enabledFeatures, selectedMCPTools, updateConversationConfig]);

  const handleModeChange = useCallback((newMode: 'system' | 'single' | 'multi') => {
    switchMode(newMode as any);
    onModeChange?.(newMode);
    if (newMode === 'multi' && selectedModels.length < 2) {
      setShowModelSelector(true);
    }
  }, [switchMode, onModeChange, selectedModels]);

  // Rate limiting check (simplified for demo)
  const checkRateLimit = useCallback(async () => {
    try {
      // For now, use simple localStorage-based rate limiting
      const rateKey = `genie_rate_limit_${new Date().getHours()}`;
      const currentCount = parseInt(localStorage.getItem(rateKey) || '0');
      
      if (currentCount >= 10) {
        setRateLimitExceeded(true);
        setRequestsUsed(currentCount);
        return false;
      }
      
      setRequestsUsed(currentCount);

      return true;
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return true; // Allow on error to prevent blocking legitimate users
    }
  }, []);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    if (!privacyAccepted) {
      toast({
        title: "Privacy Agreement Required",
        description: "Please accept the privacy policy to continue using GENIE AI.",
        variant: "destructive",
      });
      return;
    }

    // Check rate limiting
    const canProceed = await checkRateLimit();
    if (!canProceed) {
      toast({
        title: "Rate Limit Exceeded",
        description: "You've reached the hourly limit. Please try again later or contact support.",
        variant: "destructive",
      });
      return;
    }

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      // Add user message to conversation
      addMessage({
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
        provider: (selectedModels[0]?.provider as 'openai' | 'claude' | 'gemini') || 'openai',
        model: selectedModels[0]?.model || 'gpt-4o-mini'
      });

      // Enhanced prompt with context
      let enhancedPrompt = userMessage;
      
      // Add context-specific enhancement
      if (contextType === 'technology') {
        enhancedPrompt = `[Technology/AI Context] ${enhancedPrompt}`;
      } else {
        enhancedPrompt = `[Healthcare/Biotech Context] ${enhancedPrompt}`;
      }

      // Generate AI response using the shared API
      const primaryModel = selectedModels.find(m => m.role === 'primary') || selectedModels[0];
      const resp = await generateResponse({
        provider: (primaryModel?.provider as 'openai' | 'claude' | 'gemini') || 'openai',
        model: primaryModel?.model || 'gpt-4o-mini',
        prompt: enhancedPrompt,
        systemPrompt: buildSystemPrompt(),
        temperature: 0.7,
        maxTokens: 1500
      });

      if (resp && resp.content) {
        addMessage({
          role: 'assistant',
          content: resp.content,
          timestamp: new Date().toISOString(),
          provider: (primaryModel?.provider as 'openai' | 'claude' | 'gemini') || 'openai',
          model: primaryModel?.model || 'gpt-4o-mini',
          metadata: { 
            contextType,
            publicSession: true
          }
        });
      }

      // Update rate limits
      const rateKey = `genie_rate_limit_${new Date().getHours()}`;
      const newCount = requestsUsed + 1;
      localStorage.setItem(rateKey, newCount.toString());
      setRequestsUsed(newCount);
      
      // Show escalation option after 5 messages
      if (state.messages.length >= 8) {
        toast({
          title: "Need Human Assistance?",
          description: "You can connect with a human expert if needed.",
          action: (
            <Button variant="outline" size="sm" onClick={() => setShowEscalationForm(true)}>
              Contact Human
            </Button>
          ),
        });
      }

    } catch (error: any) {
      console.error('Error generating response:', error);
      const friendly = error?.message?.includes('Failed to fetch')
        ? 'AI service is not reachable. Please try again later.'
        : (error instanceof Error ? error.message : 'Unknown error');
      
      toast({
        title: "Failed to generate response",
        description: friendly,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        ref={dragRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
          transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)`,
        }}
        className={`fixed z-50 bg-background border shadow-2xl flex flex-col transition-all duration-300 ${
          isMaximized 
            ? 'inset-0 w-full h-full rounded-none' 
            : isMinimized 
              ? 'bottom-4 right-4 w-80 h-16 rounded-lg' 
              : 'bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[600px] rounded-lg'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Privacy Banner - Embedded */}
          {!privacyAccepted && (
            <PublicPrivacyBanner
              onAccept={handlePrivacyAccept}
              onDecline={onClose}
            />
          )}

          {/* Header with Drag Handle */}
          {privacyAccepted && (
            <div 
              className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-primary/5 to-secondary/5 cursor-move"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded-lg">
                  <img 
                    src={genieLogoImg} 
                    alt="GENIE" 
                    className="h-8 w-auto object-contain"
                    loading="eager"
                    onError={(e) => {
                      console.warn('GENIE logo failed to load');
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      GENIE AI
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      PUBLIC
                    </Badge>
                    {userInfo && (
                      <Badge variant="outline" className="text-xs">
                        {userInfo.firstName}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''} • {currentMode} mode • {contextType}
                  </p>
                </div>
                <Move className="h-4 w-4 text-muted-foreground ml-2" />
              </div>
              
              <div className="flex items-center gap-1">
                {/* Context Toggle - Now inside popup */}
                <Select value={contextType} onValueChange={(value: 'technology' | 'healthcare') => {
                  setContextType(value);
                  if (userInfo) {
                    setUserInfo({ ...userInfo, contextType: value });
                  }
                  toast({
                    title: "Context Switched",
                    description: `Now focused on ${value} expertise`,
                  });
                }}>
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Tech</SelectItem>
                    <SelectItem value="healthcare">Health</SelectItem>
                  </SelectContent>
                </Select>

                {/* Model Selection */}
                <Select value={currentMode} onValueChange={handleModeChange}>
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="multi">Multi</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Rate Limit Indicator */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{requestsUsed}/10</span>
                </div>
                
                {/* Action Buttons */}
                <Button variant="ghost" size="sm" onClick={() => {
                  resetConversation();
                  toast({
                    title: "New conversation started",
                    description: "Your previous conversation is cleared",
                  });
                }} title="New Conversation">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowModelSelector(true)} title="Settings">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowEscalationForm(true)} title="Contact Human">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsMaximized(!isMaximized)} title={isMaximized ? "Restore" : "Maximize"}>
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)} title="Minimize">
                  <span className="text-sm">_</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose} title="Close">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Rate Limit Warning */}
          {privacyAccepted && rateLimitExceeded && (
            <Alert className="m-2" variant="destructive">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Rate limit exceeded ({requestsUsed}/10 requests used). Please try again in an hour or contact support.
              </AlertDescription>
            </Alert>
          )}

          {/* Messages Area */}
          {privacyAccepted && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <img 
                    src={genieAnimatedImg} 
                    alt="GENIE AI" 
                    className="h-16 w-auto mx-auto mb-4 opacity-60"
                    loading="lazy"
                  />
                  <p className="text-lg font-medium mb-2">
                    Welcome to GENIE AI - Public Demo
                  </p>
                  <p className="text-sm">
                    Experience our powerful multi-model AI system with specialized {contextType} knowledge.
                  </p>
                  <p className="text-xs mt-2 text-muted-foreground">
                    {requestsUsed}/10 requests used this hour
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {state.messages.map((msg, index) => (
                  <MessageComponent
                    key={index}
                    message={msg}
                  />
                ))}
              </AnimatePresence>
              
              {isLoading && <TypingIndicator />}
            </div>
          )}

          {/* Input Area */}
          {privacyAccepted && (
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={`Ask about ${contextType}...`}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    disabled={isLoading || rateLimitExceeded}
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !message.trim() || rateLimitExceeded}
                    size="sm"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Model Selector Dialog - Simplified for demo */}
      {showModelSelector && (
        <Dialog open={showModelSelector} onOpenChange={setShowModelSelector}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configure AI Models & Features</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure your AI models and features for this conversation.
              </p>
              {/* Simplified model selector for demo */}
              <div className="text-center text-muted-foreground">
                Model configuration interface would go here
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Human Escalation Form */}
      {showEscalationForm && userInfo && (
        <HumanEscalationForm
          isOpen={showEscalationForm}
          onClose={() => setShowEscalationForm(false)}
          conversationId={sessionId}
          contextType={contextType}
        />
      )}
    </>
  );
};
