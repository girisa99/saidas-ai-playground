import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import genieThinking from '@/assets/genie-thinking.png';
import { genieMessaging } from '@/services/genieMessagingService';

interface TypingIndicatorProps {
  query?: string; // Optional: to detect domain for contextual messages
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ query }) => {
  const [currentMessage, setCurrentMessage] = useState(() => 
    genieMessaging.getMessage('thinking', query)
  );

  useEffect(() => {
    // Rotate messages every 3 seconds for variety
    const interval = setInterval(() => {
      setCurrentMessage(genieMessaging.getMessage('thinking', query));
    }, 3000);

    return () => clearInterval(interval);
  }, [query]);

  return (
    <div className="flex gap-3 justify-start">
      <div className="flex-shrink-0 relative">
        {/* Genie avatar with glow effect */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative overflow-hidden">
          <img 
            src={genieThinking} 
            alt="Genie thinking" 
            className="w-8 h-8 object-contain animate-pulse"
          />
          {/* Sparkle effect */}
          <div className="absolute inset-0 animate-spin-slow">
            <Sparkles className="w-3 h-3 text-primary absolute top-0 right-0 animate-pulse" />
            <Sparkles className="w-2 h-2 text-purple-400 absolute bottom-1 left-0 animate-pulse [animation-delay:0.3s]" />
          </div>
        </div>
        {/* Magical aura ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
      </div>
      
      <div className="bg-gradient-to-r from-muted to-muted/50 rounded-lg px-4 py-3 border border-primary/10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
          </div>
          <span className="text-xs text-foreground font-medium animate-fade-in">
            {currentMessage}
          </span>
        </div>
      </div>
    </div>
  );
};