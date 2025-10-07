import React from 'react';
import { X, Sparkles, TrendingUp, MessageCircle, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface TopicSuggestion {
  topic: string;
  category: string;
  icon?: string;
}

interface TopicSuggestionPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: TopicSuggestion[];
  context: 'technology' | 'healthcare';
  mood?: 'empathetic' | 'playful' | 'excited' | 'helpful';
  onTopicSelect: (topic: string) => void;
  onContextSwitch?: (newContext: 'technology' | 'healthcare') => void;
}

export const TopicSuggestionPopover: React.FC<TopicSuggestionPopoverProps> = ({
  isOpen,
  onClose,
  suggestions,
  context,
  mood = 'helpful',
  onTopicSelect,
  onContextSwitch
}) => {
  const getMoodEmoji = () => {
    switch (mood) {
      case 'empathetic': return '💙';
      case 'playful': return '✨';
      case 'excited': return '🚀';
      default: return '💡';
    }
  };

  const getMoodMessage = () => {
    switch (mood) {
      case 'empathetic': return "I'm here to help you explore these topics";
      case 'playful': return "Let's dive into something interesting!";
      case 'excited': return "So many exciting topics to explore!";
      default: return "Here are some topics you might find helpful";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'clinical': 'bg-blue-100 text-blue-700 border-blue-300',
      'administrative': 'bg-purple-100 text-purple-700 border-purple-300',
      'technical': 'bg-green-100 text-green-700 border-green-300',
      'financial': 'bg-orange-100 text-orange-700 border-orange-300',
      'general': 'bg-gray-100 text-gray-700 border-gray-300'
    };
    return colors[category.toLowerCase()] || colors['general'];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-24 left-4 right-4 z-[9999]"
        >
          <Card className="bg-gradient-to-br from-background to-muted/30 border-2 border-primary/20 shadow-xl backdrop-blur-sm">
            <div className="p-4 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getMoodEmoji()}</span>
                  <div>
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Suggested {context} topics:
                    </h3>
                    <p className="text-sm text-muted-foreground">{getMoodMessage()}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Topic Suggestions */}
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      onTopicSelect(suggestion.topic);
                      onClose();
                    }}
                    className={`px-3 py-2 rounded-full text-sm font-medium border transition-all hover:scale-105 hover:shadow-md ${getCategoryColor(suggestion.category)}`}
                  >
                    {suggestion.icon && <span className="mr-1">{suggestion.icon}</span>}
                    {suggestion.topic}
                  </motion.button>
                ))}
              </div>

              {/* Context Switch Option */}
              {onContextSwitch && (
                <div className="pt-2 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onContextSwitch(context === 'healthcare' ? 'technology' : 'healthcare');
                      onClose();
                    }}
                    className="w-full text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ArrowRight className="w-3 h-3 mr-1" />
                    Switch to {context === 'healthcare' ? 'technology' : 'healthcare'} topics
                  </Button>
                </div>
              )}

              {/* Footer Note */}
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <span className="font-semibold">Note:</span> This is a technology demonstration. 
                Always consult with your healthcare provider for medical decisions and verify coverage with your insurance.
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
