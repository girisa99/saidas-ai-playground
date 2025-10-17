import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Cpu, Users } from 'lucide-react';
import { RichResponseRenderer } from './RichResponseRenderer';
import { TypingIndicator } from '../enrollment-genie/TypingIndicator';
import { InteractiveTreatmentCenterMap } from './InteractiveTreatmentCenterMap';
import { HowToUseGuide } from './HowToUseGuide';
import { RoutingOptimizationBadge } from './RoutingOptimizationBadge';

interface SplitMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  provider?: string;
}

interface SplitScreenRendererProps {
  messages: SplitMessage[];
  primaryModel: string;
  secondaryModel: string;
  isLoading: boolean;
  loadingStates: {
    primary: boolean;
    secondary: boolean;
  };
}

const modelDisplayNames: Record<string, string> = {
  // OpenAI
  'openai/gpt-5': 'GPT-5',
  'openai/gpt-5-mini': 'GPT-5 Mini',
  'openai/gpt-5-nano': 'GPT-5 Nano',
  'gpt-4o': 'GPT-4o',
  'gpt-4o-mini': 'GPT-4o Mini',

  // Google Gemini 2.5
  'google/gemini-2.5-pro': 'Gemini 2.5 Pro',
  'google/gemini-2.5-flash': 'Gemini 2.5 Flash',
  'google/gemini-2.5-flash-lite': 'Gemini 2.5 Flash Lite',
  'gemini-pro': 'Gemini Pro',

  // Anthropic Claude
  'anthropic/claude-3-haiku': 'Claude 3 Haiku',
  'anthropic/claude-3-sonnet': 'Claude 3 Sonnet',
  'claude-3-haiku': 'Claude 3 Haiku',
  'claude-3-sonnet': 'Claude 3 Sonnet',

  // Others
  'phi-3-mini': 'Phi-3 Mini',
};

export const SplitScreenRenderer: React.FC<SplitScreenRendererProps> = ({
  messages,
  primaryModel,
  secondaryModel,
  isLoading,
  loadingStates
}) => {
  // Group AI responses by their model/source
  const primaryResponses = messages.filter(m => 
    m.role === 'assistant' && (m.model === primaryModel || m.provider === 'primary')
  );
  const secondaryResponses = messages.filter(m => 
    m.role === 'assistant' && (m.model === secondaryModel || m.provider === 'secondary')
  );

  // Check if any message has treatment map metadata
  const shouldShowMap = messages.some(m => 
    (m as any).metadata?.showTreatmentMap || (m as any).metadata?.triageData?.best_format === 'map'
  );
  
  // Get map metadata from the most recent assistant message with map data
  const mapMessage = messages.slice().reverse().find(m => 
    m.role === 'assistant' && ((m as any).metadata?.showTreatmentMap || (m as any).metadata?.triageData?.best_format === 'map')
  );

  const renderMessageList = (messages: SplitMessage[], modelId: string, isLoadingModel: boolean) => (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div key={`${modelId}-${index}`} className="flex flex-col gap-2">
          <div className="flex justify-start">
            <div className="max-w-[90%] p-3 rounded-lg bg-accent overflow-hidden">
              <RichResponseRenderer content={message.content} oncologyProducts={(message as any).metadata?.oncologyProducts} />
              {message.timestamp && (
                <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Bot className="h-3 w-3" />
                  {modelDisplayNames[modelId] || modelId}
                  <span>•</span>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
          
          {/* Smart Routing Optimization Badge for Split-Screen */}
          <RoutingOptimizationBadge
            triageData={(message as any).metadata?.triageData}
            routingReasoning={(message as any).metadata?.routingReasoning}
            estimatedCost={(message as any).metadata?.estimatedCost}
            estimatedLatency={(message as any).metadata?.estimatedLatency}
            modelUsed={message.model}
            smartRoutingOptimization={(message as any).metadata?.smartRoutingOptimization}
          />
        </div>
      ))}
      {isLoadingModel && <div className="px-1"><TypingIndicator /></div>}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Treatment Center Map - shown above split screen when detected */}
      {shouldShowMap && mapMessage && (
        <div className="space-y-4">
          <HowToUseGuide />
          {(() => {
            const lastUser = messages.slice().reverse().find(m => m.role === 'user')?.content || '';
            const metadata = (mapMessage as any).metadata || {};
            const productGuess = metadata.product || (/kymriah/i.test(lastUser) ? 'Kymriah' : undefined);
            const cityGuess = metadata.city || ((lastUser.match(/\b(Boston|Atlanta|New York|San Francisco|Los Angeles|Chicago|Houston|Seattle|Miami)\b/i)?.[0]) as string | undefined);
            const stateMap: Record<string, string> = {
              'georgia':'GA','ga':'GA','massachusetts':'MA','ma':'MA','california':'CA','ca':'CA','new york':'NY','ny':'NY','texas':'TX','tx':'TX','florida':'FL','fl':'FL'
            };
            const foundKey = Object.keys(stateMap).find(k => new RegExp(`\\b${k}\\b`, 'i').test(lastUser));
            const stateGuess = metadata.state || (foundKey ? stateMap[foundKey] : undefined);
            const zipMatch = lastUser.match(/\b(\d{5})\b/);
            const zipGuess = metadata.zipCode || (zipMatch ? zipMatch[1] : undefined);
            return (
              <InteractiveTreatmentCenterMap 
                filterByType={metadata.centerType}
                searchQuery={metadata.searchQuery}
                therapeuticArea={metadata.therapeuticArea}
                product={productGuess}
                manufacturer={metadata.manufacturer}
                clinicalTrial={metadata.clinicalTrial}
                state={stateGuess}
                city={cityGuess}
                zipCode={zipGuess}
              />
            );
          })()}
        </div>
      )}
      
      {/* Split Screen Comparison */}
      <div className="grid grid-cols-2 gap-4 h-[55vh] md:h-[60vh] min-h-0">
        {/* Primary Model Column */}
        <Card className="flex flex-col h-full">
        <div className="p-3 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">{modelDisplayNames[primaryModel] || primaryModel}</span>
            </div>
            <Badge variant="default" className="text-xs">Primary</Badge>
          </div>
        </div>
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3 min-h-0">
          {/* Show user messages and primary model responses */}
          {messages
            .filter(m => m.role === 'user' || (m.role === 'assistant' && (m.model === primaryModel || m.provider === 'primary')))
            .map((message, index) => (
              <div key={`primary-${message.timestamp}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg overflow-hidden ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent'
                }`}>
                  {message.role === 'assistant' ? (
                    <RichResponseRenderer content={message.content} oncologyProducts={(message as any).metadata?.oncologyProducts} />
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  {message.role === 'assistant' && message.timestamp && (
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Bot className="h-3 w-3" />
                      {modelDisplayNames[primaryModel] || primaryModel}
                      <span>•</span>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          {loadingStates.primary && <TypingIndicator />}
        </div>
      </Card>

      {/* Secondary Model Column */}
      <Card className="flex flex-col h-full">
        <div className="p-3 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="font-medium text-sm">{modelDisplayNames[secondaryModel] || secondaryModel}</span>
            </div>
            <Badge variant="secondary" className="text-xs">Secondary</Badge>
          </div>
        </div>
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3 min-h-0">
          {/* Show user messages and secondary model responses */}
          {messages
            .filter(m => m.role === 'user' || (m.role === 'assistant' && (m.model === secondaryModel || m.provider === 'secondary')))
            .map((message, index) => (
              <div key={`secondary-${message.timestamp}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg overflow-hidden ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-accent'
                }`}>
                  {message.role === 'assistant' ? (
                    <RichResponseRenderer content={message.content} oncologyProducts={(message as any).metadata?.oncologyProducts} />
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  {message.role === 'assistant' && message.timestamp && (
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <Bot className="h-3 w-3" />
                      {modelDisplayNames[secondaryModel] || secondaryModel}
                      <span>•</span>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          {loadingStates.secondary && <TypingIndicator />}
        </div>
      </Card>
      </div>
    </div>
  );
};