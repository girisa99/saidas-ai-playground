import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Sparkles, Brain, Lightbulb, Bot, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicGenieInterface } from './public-genie/PublicGenieInterface';
import genieFloating from '@/assets/genie-floating.png';

interface FloatingGenieProps {
  className?: string;
}

const rotatingMessages = [
  {
    text: "Hi! I'm Genie AI 🧞‍♂️",
    description: "I can support and discuss with you on Experimentation Hub Technology and Healthcare concepts",
    icon: Bot,
    badges: [
      { text: "AI Innovation", icon: Brain },
      { text: "Tech Stack", icon: Lightbulb }
    ]
  },
  {
    text: "Explore AI with me! ✨",
    description: "Discover Gartner Value Framework, emerging technologies, and healthcare solutions",
    icon: Sparkles,
    badges: [
      { text: "Gartner Framework", icon: Star },
      { text: "Healthcare AI", icon: Zap }
    ]
  },
  {
    text: "Ready to innovate? 🚀",
    description: "Learn about multi-agent systems, edge AI, and digital transformation strategies",
    icon: Zap,
    badges: [
      { text: "Multi-Agent", icon: Bot },
      { text: "Edge AI", icon: Brain }
    ]
  }
];

export const FloatingGenie: React.FC<FloatingGenieProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isGenieOpen, setIsGenieOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Show tooltip after 2 seconds if user hasn't interacted
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTooltip(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasInteracted]);

  useEffect(() => {
    // Rotate messages every 8 seconds when tooltip is visible
    if (showTooltip && !hasInteracted) {
      const timer = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [showTooltip, hasInteracted]);

  useEffect(() => {
    // Hide tooltip after 30 seconds of no interaction
    if (showTooltip && !isHovered) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip, isHovered]);

  const handleGenieClick = () => {
    setHasInteracted(true);
    setShowTooltip(false);
    setIsGenieOpen(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const currentMessage = rotatingMessages[currentMessageIndex];

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
          className={`fixed bottom-6 right-6 z-[9999] ${className}`}
          style={{ position: 'fixed' }}
        >
          {/* Floating Action Button */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
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
                  <Card className="p-4 max-w-xs shadow-xl border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
                    <motion.div 
                      className="flex items-start gap-3"
                      key={currentMessageIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <currentMessage.icon className="w-4 h-4 text-primary" />
                      </motion.div>
                      <div>
                        <motion.h4 
                          className="font-semibold text-foreground mb-1"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          {currentMessage.text}
                        </motion.h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {currentMessage.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {currentMessage.badges.map((badge, index) => (
                            <motion.div
                              key={index}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Badge variant="secondary" className="text-xs">
                                <badge.icon className="w-3 h-3 mr-1" />
                                {badge.text}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                        <motion.p 
                          className="text-xs text-muted-foreground"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Click to start exploring! ✨
                        </motion.p>
                      </div>
                    </motion.div>
                    {/* Tooltip Arrow */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                      <div className="w-0 h-0 border-l-8 border-l-border border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Genie Button */}
            <motion.div
              className="relative"
              animate={!hasInteracted ? {
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Button
                onClick={handleGenieClick}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-primary via-primary/90 to-secondary hover:from-primary/90 hover:via-primary/80 hover:to-secondary/90 shadow-2xl border-3 border-white/30 relative overflow-hidden"
                size="icon"
              >
                {/* Multiple animated background layers */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/40 via-secondary/30 to-primary/40 rounded-full"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-l from-secondary/30 via-primary/20 to-secondary/30 rounded-full"
                  animate={{
                    rotate: -360,
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
                  className="w-14 h-14 relative z-10"
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Enhanced sparkle effects */}
                <motion.div
                  className="absolute inset-0 z-20"
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 absolute top-1 right-1 text-white/90" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, -180, -360]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 absolute bottom-2 left-2 text-white/70" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Star className="w-2 h-2 absolute top-3 left-1 text-white/60" />
                  </motion.div>
                </motion.div>
              </Button>
            </motion.div>

            {/* Multiple pulse rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/40"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-secondary/30"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* Attention-grabbing outer glow */}
            {!hasInteracted && (
              <motion.div
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

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