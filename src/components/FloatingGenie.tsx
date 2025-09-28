import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Sparkles, Brain, Lightbulb, Bot, Zap, Star, Flame, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PublicGenieInterface } from './public-genie/PublicGenieInterface';
import genieBottle from '@/assets/genie-bottle.png';

interface FloatingGenieProps {
  className?: string;
}

const getPageSpecificMessages = (pathname: string) => {
  const baseMessages = [
    {
      text: "🧞‍♂️ *Poof!* Your AI guide appears!",
      description: "Like a genie from a bottle, I'm here to grant your tech wishes! Well, almost... 😉",
      icon: Sparkles,
      humor: "No rubbing required!"
    },
    {
      text: "🌟 Three wishes? I can do better!",
      description: "Unlimited AI insights, tech magic, and maybe some dad jokes. What more could you want?",
      icon: Star,
      humor: "Plot twist: I'm funnier than Aladdin!"
    }
  ];

  const pageMessages = {
    '/': [
      {
        text: "🏠 Welcome home, tech explorer!",
        description: "Ready to dive into the AI rabbit hole? I promise it's more fun than Alice's adventure!",
        icon: Bot,
        humor: "Home is where the AI is!"
      },
      {
        text: "🚀 Houston, we have innovation!",
        description: "Mission Control says: 'Explore our experimentation hub!' I say: 'Let's blast off together!'",
        icon: Zap,
        humor: "T-minus fun seconds!"
      }
    ],
    '/about': [
      {
        text: "📖 Story time with Genie!",
        description: "Want the real scoop? I know ALL the behind-the-scenes AI drama! 🍿",
        icon: Brain,
        humor: "Better than Netflix!"
      },
      {
        text: "🎭 Plot twist: I'm part of the story!",
        description: "From humble code to your digital companion. It's like a tech fairy tale!",
        icon: Lightbulb,
        humor: "Once upon a time..."
      }
    ],
    '/technology-stack': [
      {
        text: "🛠️ Welcome to my workshop!",
        description: "Tech stacks are like LEGO blocks, but way cooler and with more acronyms!",
        icon: Bot,
        humor: "Some assembly required!"
      },
      {
        text: "⚡ Power tools for digital wizards!",
        description: "These aren't your grandpa's tools... unless your grandpa was into AI! 🧙‍♂️",
        icon: Zap,
        humor: "Magic wand not included!"
      }
    ],
    '/business-use-cases': [
      {
        text: "💼 Business meets magic!",
        description: "Turning boring spreadsheets into AI-powered profit machines. Abracadabra!",
        icon: Star,
        humor: "ROI > Hocus Pocus!"
      },
      {
        text: "📈 Success stories incoming!",
        description: "Real companies, real results, real impressed executives. No fairy dust involved!*",
        icon: Brain,
        humor: "*Maybe a little dust..."
      }
    ],
    '/journey': [
      {
        text: "🗺️ Adventure awaits!",
        description: "Every great journey starts with a single step... or in our case, a single click!",
        icon: Sparkles,
        humor: "GPS not required!"
      },
      {
        text: "🎢 Buckle up for the AI ride!",
        description: "It's more thrilling than a rollercoaster and with fewer screams of terror!",
        icon: Zap,
        humor: "Height restrictions: None!"
      }
    ],
    '/case-studies': [
      {
        text: "🔍 Detective Genie on the case!",
        description: "Real mysteries solved with AI! Sherlock Holmes would be so jealous.",
        icon: Brain,
        humor: "Elementary, my dear user!"
      },
      {
        text: "📚 Success stories that don't suck!",
        description: "Unlike your college textbooks, these case studies are actually interesting!",
        icon: Lightbulb,
        humor: "No pop quiz, promise!"
      }
    ],
    '/contact': [
      {
        text: "📞 Ring ring! Genie hotline!",
        description: "Got questions? I've got answers! Got jokes? I've got better ones! 😄",
        icon: MessageCircle,
        humor: "Customer service with style!"
      },
      {
        text: "💌 Send us your thoughts!",
        description: "We read every message! Well, I do. The humans just pretend to.",
        icon: Bot,
        humor: "Humans: overrated!"
      }
    ],
    '/faq': [
      {
        text: "❓ FAQ: Frequently Awesome Questions!",
        description: "All your burning questions answered! Fire extinguisher not included.",
        icon: Brain,
        humor: "No question too silly!"
      },
      {
        text: "🤔 Thinking cap required!",
        description: "Deep thoughts about AI, life, and why printers never work when you need them.",
        icon: Lightbulb,
        humor: "Printers are not AI!"
      }
    ]
  };

  const resolvedKey = pageMessages[pathname] ? pathname : (pathname === '/technology' ? '/technology-stack' : '/');
  return [...baseMessages, ...(pageMessages[resolvedKey] || pageMessages['/'])];
};

export const FloatingGenie: React.FC<FloatingGenieProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isGenieOpen, setIsGenieOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  
  // Update current path when location changes (works with React Router)
  useEffect(() => {
    const updatePath = () => setCurrentPath(window.location.pathname);

    // Patch history to emit a custom event on push/replace
    const origPushState = history.pushState;
    const origReplaceState = history.replaceState;
    // @ts-ignore - variadic signature
    history.pushState = function(...args) {
      const ret = origPushState.apply(history, args as any);
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    } as typeof history.pushState;
    // @ts-ignore - variadic signature
    history.replaceState = function(...args) {
      const ret = origReplaceState.apply(history, args as any);
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    } as typeof history.replaceState;

    updatePath(); // Set initial path
    window.addEventListener('popstate', updatePath);
    window.addEventListener('locationchange', updatePath);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.removeEventListener('locationchange', updatePath);
      history.pushState = origPushState;
      history.replaceState = origReplaceState;
    };
  }, []);
  
  const pageMessages = getPageSpecificMessages(currentPath);

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
    // Rotate messages every 6 seconds when tooltip is visible
    if (showTooltip && !hasInteracted) {
      const timer = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % pageMessages.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [showTooltip, hasInteracted, pageMessages.length]);

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

  const currentMessage = pageMessages[currentMessageIndex];

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
          className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[99999] ${className}`}
          style={{ 
            position: 'fixed',
            isolation: 'isolate'
          }}
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
                  className="absolute right-16 md:right-20 top-1/2 -translate-y-1/2 max-w-[280px] md:max-w-xs"
                >
                  {/* Genie Speech Bubble */}
                  <motion.div
                    className="relative bg-gradient-to-br from-primary/95 to-secondary/95 text-primary-foreground rounded-2xl p-3 md:p-4 shadow-2xl border border-primary/20 backdrop-blur-sm"
                    key={currentMessageIndex}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {/* Magic fumes around the bubble */}
                    <motion.div
                      className="absolute -top-2 -left-2 w-4 h-4 text-yellow-300/60"
                      animate={{
                        y: [0, -10, 0],
                        x: [0, 5, 0],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Wind className="w-full h-full" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-1 right-2 w-3 h-3 text-yellow-200/40"
                      animate={{
                        y: [0, -8, 0],
                        x: [0, -3, 0],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <Wind className="w-full h-full" />
                    </motion.div>

                    <motion.h4 
                      className="font-bold text-sm md:text-base mb-2 text-white"
                      animate={{ 
                        textShadow: [
                          "0 0 4px rgba(255,255,255,0.5)",
                          "0 0 8px rgba(255,255,255,0.8)",
                          "0 0 4px rgba(255,255,255,0.5)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentMessage.text}
                    </motion.h4>
                    <p className="text-xs md:text-sm text-primary-foreground/90 mb-2 leading-relaxed">
                      {currentMessage.description}
                    </p>
                    <motion.p 
                      className="text-xs text-yellow-200 font-medium italic"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      💡 {currentMessage.humor}
                    </motion.p>

                    {/* Speech bubble tail */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                      <div className="w-0 h-0 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Genie Bottle Button */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleGenieClick}
              animate={!hasInteracted ? {
                scale: [1, 1.08, 1],
                rotate: [0, 3, -3, 0],
                y: [0, -2, 0]
              } : {}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Genie Bottle Container */}
              <div className="w-16 h-20 md:w-20 md:h-24 relative flex flex-col items-center">
                
                {/* Bottle Image (transparent) */}
                <motion.img
                  src={genieBottle}
                  alt="Genie bottle icon"
                  className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-xl"
                  animate={{
                    y: [0, -2, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Magic fumes/smoke from bottle neck */}
                <motion.div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-gradient-to-t from-blue-200/60 via-purple-200/40 to-transparent rounded-full"
                      style={{
                        left: `${(i - 1.5) * 6}px`,
                        top: `${-i * 3}px`
                      }}
                      animate={{
                        y: [0, -15, -30],
                        opacity: [0.7, 0.4, 0],
                        scale: [0.3, 0.8, 0.2],
                        x: [0, Math.sin(i) * 4, Math.sin(i) * 8]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </motion.div>

                {/* Magical sparkles around the bottle */}
                <motion.div className="absolute inset-0 z-15 pointer-events-none">
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 text-yellow-300"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Sparkles className="w-full h-full" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-1 -left-2 w-2 h-2 text-yellow-400"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, -180, -360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                  >
                    <Star className="w-full h-full" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -right-3 w-2 h-2 text-yellow-200"
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, 10, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                  >
                    <Flame className="w-full h-full" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Magic energy rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-400/40"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-amber-300/30"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            {/* Magical aura for attention */}
            {!hasInteracted && (
              <motion.div
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-yellow-300/20 via-amber-400/20 to-yellow-300/20 blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4],
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 6,
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
              className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-[100000]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-2 h-2 md:w-3 md:h-3" />
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