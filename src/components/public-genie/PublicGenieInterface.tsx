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
import { NewsletterService } from '@/services/newsletterService';
import { ContactService } from '@/services/publicContactService';
import genieLogoPopup from '@/assets/genie-logo-popup.png';

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
  'Agentic AI',
  'Large Language Models (LLMs)',
  'Small Language Models (SLMs)',
  'Model Context Protocol (MCP)',
  'RAG & Knowledge Bases',
  'Automation (UiPath, Power Automate, n8n)',
  'AI Observability (Langfuse/Langwatch)',
  'Data Labeling (Label Studio)',
  'Cloud & Platforms (OpenAI, Claude, Gemini, Meta, Azure)',
  'New Models & Hugging Face',
  'Contact Center AI Trends',
  'M&A and Market Trends'
];

const healthcareTopics = [
  'Digital Health',
  'Telemedicine',
  'Health Analytics',
  'Medical AI',
  'Clinical Trials',
  'Patient Care',
  'Health Technology',
  'Wellness Programs',
  'Medical Research',
  'Healthcare Innovation'
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
  const [aiConfig, setAIConfig] = useState<AIConfig>({
    mode: 'default',
    ragEnabled: false,
    knowledgeBaseEnabled: false,
    mcpEnabled: false,
    selectedModel: 'gpt-4o-mini',
    splitScreenEnabled: false,
    contextualSuggestions: true,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { generateResponse, isLoading } = useUniversalAI();
  const { state, addMessage, resetConversation } = useConversationState();
  const messages = state.messages;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handlePrivacyAccept = async (info: UserInfo, selectedContext: Context, topic: string) => {
    setUserInfo(info);
    setContext(selectedContext);
    setSelectedTopic(topic);
    setShowPrivacyBanner(false);

    // Subscribe user to newsletter (public edge function)
    try {
      const res = await NewsletterService.subscribe({
        email: info.email,
        firstName: info.firstName,
        lastName: info.lastName,
        interests: [selectedContext, topic]
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
    
    // Add welcome message with personality
    const personalityGreetings = {
      technology: [
        `Hello ${info.firstName}! 👋 I'm your Genie AI assistant, ready to dive into the exciting world of ${topic} with you! What tech challenge can I help you conquer today?`,
        `Hey there ${info.firstName}! 🤖 Your tech genie is here and fully charged for ${topic} discussions! What digital adventure shall we embark on?`,
        `Welcome ${info.firstName}! ⚡ I'm your AI companion for all things ${topic}. Let's turn your questions into solutions!`
      ],
      healthcare: [
        `Hello ${info.firstName}! 🩺 I'm your Genie AI assistant, here to support your ${topic} journey with thoughtful guidance. How can I help you today?`,
        `Welcome ${info.firstName}! 💊 Your healthcare genie is ready to assist with ${topic} insights. What's on your mind?`,
        `Hi ${info.firstName}! 🏥 I'm here to provide helpful ${topic} guidance with empathy and understanding. How may I assist you?`
      ]
    };
    
    const greetings = personalityGreetings[selectedContext];
    const welcomeMessage = greetings[Math.floor(Math.random() * greetings.length)];
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !context || !selectedTopic) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Mark that conversation has started
    if (!hasStartedConversation) {
      setHasStartedConversation(true);
    }
    
    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });

    // Show intermediate response
    const intermediateMsg = generateIntermediateResponse();
    addMessage({
      role: 'assistant',
      content: intermediateMsg,
      timestamp: new Date().toISOString()
    });

    try {
      const contextPrompt = `You are a helpful AI assistant specializing in ${context}, specifically in ${selectedTopic}.
      Be conversational, helpful, and ${conversationPersonality}. Use concise, high-signal answers.
      If context is "technology", bias content toward Agentic AI, LLMs/SLMs, MCP, RAG/knowledge bases, automation tools (UiPath, Power Automate, n8n),
      observability (Langfuse/Langwatch), data labeling (Label Studio), cloud/platform updates (OpenAI, Claude, Gemini, Meta, Azure), Hugging Face models,
      and contact-center AI trends, including notable market trends, launches, and M&A when relevant.
      If the user mentions healthcare, explicitly ask to switch context to healthcare and continue accordingly.
      Format with markdown where useful and always finish with a helpful follow-up question inviting next steps or a topic pivot.`;

      const response = await generateResponse({
        prompt: userMessage,
        systemPrompt: contextPrompt,
        model: aiConfig.selectedModel.includes('gpt') ? aiConfig.selectedModel as any : 'gpt-4o-mini',
        provider: aiConfig.selectedModel.includes('claude') ? 'claude' : 
                  aiConfig.selectedModel.includes('gemini') ? 'gemini' : 'openai'
      });

      if (response) {
        // Remove the intermediate message and add the real response
        const personalizedResponse = addPersonalityToResponse(response.content);
        addMessage({
          role: 'assistant',
          content: personalizedResponse,
          timestamp: new Date().toISOString()
        });
        
        // Randomly change conversation personality to keep it dynamic
        if (Math.random() > 0.8) {
          const personalities: Array<'formal' | 'casual' | 'empathetic'> = ['formal', 'casual', 'empathetic'];
          setConversationPersonality(personalities[Math.floor(Math.random() * personalities.length)]);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Would you like to speak with a human agent instead? 🤝',
        timestamp: new Date().toISOString()
      });
      setShowHumanEscalation(true);
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
      const transcript = messages
        .map((msg, idx) => `${idx + 1}. ${msg.role === 'user' ? 'User' : 'Genie AI'}: ${msg.content}`)
        .join('\n\n');

      const conversationSummary = {
        userInfo: `${userInfo!.firstName} ${userInfo!.lastName || ''} (${userInfo!.email})`,
        context: context,
        topic: selectedTopic,
        aiConfig: aiConfig,
        messageCount: messages.length,
        conversationDuration: `Started: ${messages[0]?.timestamp || 'Unknown'}`,
        transcript: transcript
      };

      await ContactService.submitContactForm({
        name: 'Genie AI System',
        email: 'genieaiexpermentationhub@gmail.com',
        subject: `[TRANSCRIPT] Conversation with ${userInfo!.firstName} - ${context}/${selectedTopic}`,
        message: `Conversation Transcript:

User: ${conversationSummary.userInfo}
Context: ${conversationSummary.context}
Topic: ${conversationSummary.topic}
AI Configuration: ${JSON.stringify(conversationSummary.aiConfig, null, 2)}
Messages: ${conversationSummary.messageCount}
${conversationSummary.conversationDuration}

--- FULL TRANSCRIPT ---
${conversationSummary.transcript}

--- END TRANSCRIPT ---

This transcript was automatically generated when the user closed the conversation.`
      } as any);

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
          className={`fixed ${isMaximized ? 'inset-4' : isMinimized ? 'bottom-4 right-4 w-80 h-16' : 'bottom-4 right-4 w-96 h-[600px]'} z-50`}
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
                    <div className="border-b bg-muted/10">
                      <AdvancedAISettings 
                        currentConfig={aiConfig}
                        onConfigChange={setAIConfig}
                      />
                    </div>
                  )}

                  {/* Messages */}
                  <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${aiConfig.splitScreenEnabled ? 'grid grid-cols-2 gap-4' : ''}`}>
                    <div className={aiConfig.splitScreenEnabled ? 'space-y-2' : ''}>
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
                      {isLoading && <TypingIndicator />}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Input */}
                  {selectedTopic && (
                    <div className="p-4 border-t bg-background/50">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder={`Ask me about ${selectedTopic}...`}
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
                       <div className="flex justify-between items-center mt-2">
                         <p className="text-xs text-muted-foreground flex items-center gap-2">
                           <span>Powered by Genie AI • {conversationPersonality} mode</span>
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
                          {isLiveAgentAvailable ? '🟢 Live Agent' : 'Need human help?'}
                        </Button>
                      </div>
                    </div>
                  )}
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
