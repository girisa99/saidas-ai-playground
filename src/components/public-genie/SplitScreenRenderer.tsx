import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Cpu, Users } from 'lucide-react';
import { RichResponseRenderer } from './RichResponseRenderer';
import { TypingIndicator } from '../enrollment-genie/TypingIndicator';

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
  'gpt-4o-mini': 'GPT-4o Mini',
  'gpt-4o': 'GPT-4o',
  'claude-3-haiku': 'Claude 3 Haiku',
  'claude-3-sonnet': 'Claude 3 Sonnet',
  'gemini-pro': 'Gemini Pro',
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

  const renderMessageList = (messages: SplitMessage[], modelId: string, isLoadingModel: boolean) => (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div key={`${modelId}-${index}`} className="flex justify-start">
          <div className="max-w-[90%] p-3 rounded-lg bg-accent">
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
      ))}
      {isLoadingModel && <TypingIndicator />}
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4 h-full min-h-[400px]">
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
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-[350px]">
          {/* Show user messages and primary model responses */}
          {messages
            .filter(m => m.role === 'user' || (m.role === 'assistant' && (m.model === primaryModel || m.provider === 'primary')))
            .map((message, index) => (
              <div key={`primary-${message.timestamp}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg ${
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
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-[350px]">
          {/* Show user messages and secondary model responses */}
          {messages
            .filter(m => m.role === 'user' || (m.role === 'assistant' && (m.model === secondaryModel || m.provider === 'secondary')))
            .map((message, index) => (
              <div key={`secondary-${message.timestamp}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg ${
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
  );
};