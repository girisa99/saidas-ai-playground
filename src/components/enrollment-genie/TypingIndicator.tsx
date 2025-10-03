import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import genieThinking from '@/assets/genie-thinking.png';

const humorousMessages = [
  "🧞‍♂️ Consulting my magical knowledge scrolls...",
  "✨ Mixing up some AI magic for you...",
  "🔮 Peering into the crystal ball of wisdom...",
  "💫 Rubbing the lamp for brilliant insights...",
  "🎭 Channeling my inner genius genie...",
  "🌟 Brewing up a perfect response potion...",
  "🎪 Performing some computational wizardry...",
  "💭 Deep in thought... and it's getting crowded in here!",
  "🎨 Painting you a masterpiece of information...",
  "🚀 Zooming through the knowledge universe..."
];

export const TypingIndicator: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(humorousMessages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % humorousMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentMessage(humorousMessages[messageIndex]);
  }, [messageIndex]);

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