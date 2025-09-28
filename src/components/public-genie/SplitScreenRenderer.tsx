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
  // Separate user messages from AI responses
  const userMessages = messages.filter(m => m.role === 'user');
  const aiResponses = messages.filter(m => m.role === 'assistant');

  // Group AI responses by their model/source
  const primaryResponses = aiResponses.filter(m => 
    m.model === primaryModel || (!m.model && aiResponses.indexOf(m) % 2 === 0)
  );
  const secondaryResponses = aiResponses.filter(m => 
    m.model === secondaryModel || (!m.model && aiResponses.indexOf(m) % 2 === 1)
  );

  const renderMessageList = (messages: SplitMessage[], modelId: string, isLoadingModel: boolean) => (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <div key={`${modelId}-${index}`} className="flex justify-start">
          <div className="max-w-[90%] p-3 rounded-lg bg-accent">
            <RichResponseRenderer content={message.content} />
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
    <div className="grid grid-cols-2 gap-4 h-full">
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
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3">
          {/* Render user messages in both columns */}
          {userMessages.map((message, index) => (
            <div key={`user-primary-${index}`} className="flex justify-end">
              <div className="max-w-[80%] p-3 rounded-lg bg-primary text-primary-foreground">
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Render AI responses for primary model */}
          {renderMessageList(primaryResponses, primaryModel, loadingStates.primary)}
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
        
        <div className="flex-1 p-3 overflow-y-auto space-y-3">
          {/* Render user messages in both columns */}
          {userMessages.map((message, index) => (
            <div key={`user-secondary-${index}`} className="flex justify-end">
              <div className="max-w-[80%] p-3 rounded-lg bg-primary text-primary-foreground">
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Render AI responses for secondary model */}
          {renderMessageList(secondaryResponses, secondaryModel, loadingStates.secondary)}
        </div>
      </Card>
    </div>
  );
};