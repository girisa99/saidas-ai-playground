import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Sparkles, Brain, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicGenieInterface } from './public-genie/PublicGenieInterface';
import genieFloating from '@/assets/genie-floating.png';

interface FloatingGenieProps {
  className?: string;
}

export const FloatingGenie: React.FC<FloatingGenieProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isGenieOpen, setIsGenieOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  useEffect(() => {
    // Hide tooltip after 10 seconds
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const handleGenieClick = () => {
    setHasInteracted(true);
    setShowTooltip(false);
    setIsGenieOpen(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 1 
          }}
          className={`fixed bottom-6 right-6 z-50 ${className}`}
        >
          {/* Floating Action Button */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-20 top-1/2 -translate-y-1/2"
                >
                  <Card className="p-4 max-w-xs shadow-xl border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Hi! I'm Genie AI 🧞‍♂️
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          I can support and discuss with you on Experimentation Hub Technology and Healthcare concepts
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            <Brain className="w-3 h-3 mr-1" />
                            AI Innovation
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Lightbulb className="w-3 h-3 mr-1" />
                            Tech Stack
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Click to start exploring! ✨
                        </p>
                      </div>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                      <div className="w-0 h-0 border-l-8 border-l-border border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Genie Button */}
            <Button
              onClick={handleGenieClick}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg border-2 border-white/20 relative overflow-hidden"
              size="icon"
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Genie Icon */}
              <motion.img
                src={genieFloating}
                alt="Genie AI"
                className="w-10 h-10 relative z-10"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Sparkle effects */}
              <motion.div
                className="absolute inset-0 z-20"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-4 h-4 absolute top-1 right-1 text-white/80" />
                <Sparkles className="w-3 h-3 absolute bottom-2 left-2 text-white/60" />
              </motion.div>
            </Button>

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Close button (appears on hover) */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Genie Interface Modal */}
      <PublicGenieInterface
        isOpen={isGenieOpen}
        onClose={() => setIsGenieOpen(false)}
      />
    </>
  );
};