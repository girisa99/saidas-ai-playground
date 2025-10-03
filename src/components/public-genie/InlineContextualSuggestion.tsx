import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Lightbulb, Heart, Smile, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InlineContextualSuggestionProps {
  type: 'topic' | 'context-switch' | 'insight' | 'encouragement';
  message: string;
  suggestions?: Array<{
    label: string;
    emoji?: string;
    description?: string;
  }>;
  mood?: 'helpful' | 'playful' | 'empathetic' | 'excited';
  onSelect?: (suggestion: string) => void;
  onDismiss?: () => void;
}

export const InlineContextualSuggestion: React.FC<InlineContextualSuggestionProps> = ({
  type,
  message,
  suggestions = [],
  mood = 'helpful',
  onSelect,
  onDismiss
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    setTimeout(() => onDismiss?.(), 300);
  };

  const handleSelect = (suggestion: string) => {
    onSelect?.(suggestion);
    handleDismiss();
  };

  const getIcon = () => {
    switch (type) {
      case 'topic':
        return <Lightbulb className="h-4 w-4" />;
      case 'context-switch':
        return <Zap className="h-4 w-4" />;
      case 'insight':
        return <Sparkles className="h-4 w-4" />;
      case 'encouragement':
        return mood === 'playful' ? <Smile className="h-4 w-4" /> : <Heart className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'playful':
        return 'from-purple-500/10 to-pink-500/10 border-purple-300/30';
      case 'empathetic':
        return 'from-blue-500/10 to-cyan-500/10 border-blue-300/30';
      case 'excited':
        return 'from-orange-500/10 to-yellow-500/10 border-orange-300/30';
      default:
        return 'from-primary/10 to-primary/5 border-primary/30';
    }
  };

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="my-3"
        >
          <Card className={`relative p-4 bg-gradient-to-br ${getMoodColor()} border backdrop-blur-sm`}>
            {/* Dismiss Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="absolute top-2 right-2 h-6 w-6 p-0 opacity-60 hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </Button>

            {/* Icon and Message */}
            <div className="flex items-start gap-3 mb-3">
              <div className="mt-0.5 text-primary opacity-80">
                {getIcon()}
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {message}
                </p>
              </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSelect(suggestion.label)}
                      className="group relative overflow-hidden bg-background/50 hover:bg-primary/10 border-primary/20 hover:border-primary/40 transition-all duration-200"
                    >
                      <span className="flex items-center gap-2 text-xs">
                        {suggestion.emoji && <span>{suggestion.emoji}</span>}
                        <span className="font-medium">{suggestion.label}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Sparkle decoration */}
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-1 -right-1 text-primary/30"
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};