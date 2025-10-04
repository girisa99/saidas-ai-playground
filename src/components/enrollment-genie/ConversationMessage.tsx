import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, Sparkles } from 'lucide-react';
import genieFloating from '@/assets/genie-floating.png';
import { MessageFeedback } from './MessageFeedback';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  provider?: string;
  model?: string;
  metadata?: any;
}

interface ConversationMessageProps {
  message: ConversationMessage;
  messageIndex?: number;
  conversationId?: string;
  domain?: string;
  knowledgeBaseIds?: string[];
  showFeedback?: boolean;
}

export const ConversationMessage: React.FC<ConversationMessageProps> = ({ 
  message, 
  messageIndex,
  conversationId,
  domain = 'conversational',
  knowledgeBaseIds = [],
  showFeedback = true
}) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 relative group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center relative overflow-hidden hover:scale-110 transition-transform">
            <img 
              src={genieFloating} 
              alt="GENIE" 
              className="w-6 h-6 object-contain"
            />
            <Sparkles className="w-2 h-2 text-primary absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-muted'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        
        <div className={`mt-1 space-y-1`}>
          <div className={`flex items-center gap-2 text-xs text-muted-foreground ${
            isUser ? 'justify-end' : 'justify-start'
          }`}>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            {message.model && (
              <Badge variant="outline" className="text-xs">
                {message.model}
              </Badge>
            )}
          </div>
          
          {!isUser && showFeedback && conversationId && messageIndex !== undefined && (
            <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
              <MessageFeedback
                conversationId={conversationId}
                messageIndex={messageIndex}
                domain={domain}
                knowledgeBaseIds={knowledgeBaseIds}
              />
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
            <User className="h-4 w-4 text-secondary" />
          </div>
        </div>
      )}
    </div>
  );
};
