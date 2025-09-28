import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';
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
      text: "🧞 I am your Genie!",
      description: "Tap to chat: privacy first, then magic begins.",
      icon: Sparkles,
      humor: "No wish limits!"
    },
    {
      text: "🧞‍♂️ *Poof!* AI guide here!",
      description: "Ready to grant tech wishes! Well, almost... 😉",
      icon: Sparkles,
      humor: "No rubbing needed!"
    },
    {
      text: "🌟 Unlimited AI insights!",
      description: "Better than 3 wishes: endless tech magic & jokes!",
      icon: Star,
      humor: "Funnier than Aladdin!"
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
  const dragRef = useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('floatingGenieX');
      return saved ? parseFloat(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [dragY, setDragY] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('floatingGenieY');
      return saved ? parseFloat(saved) : 0;
    } catch {
      return 0;
    }
  });
  const [dragBounds, setDragBounds] = useState<{ top: number; bottom: number; left: number; right: number }>({ top: -300, bottom: 0, left: -300, right: 0 });
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
    // Rotate messages every 10 seconds when tooltip is visible (increased from 6s)
    if (showTooltip && !hasInteracted) {
      const timer = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % pageMessages.length);
      }, 10000); // Increased to reduce CPU usage
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

  // Compute drag bounds based on viewport
  useEffect(() => {
    const computeBounds = () => {
      const visibleHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      const visibleWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      // Approximate bottle size and margins - ensure it stays within viewport
      const verticalTop = -Math.max(0, visibleHeight - 200);
      const horizontalLeft = -Math.max(0, visibleWidth - 150);
      setDragBounds({ top: verticalTop, bottom: 0, left: horizontalLeft, right: 0 });
    };
    computeBounds();
    window.addEventListener('resize', computeBounds);
    return () => window.removeEventListener('resize', computeBounds);
  }, []);

  const handleGenieClick = () => {
    console.debug('[FloatingGenie] Bottle clicked');
    setHasInteracted(true);
    setShowTooltip(false);
    setIsGenieOpen(true);
  };

  // Removed hard-close; Genie stays docked and always available

  const currentMessage = pageMessages[currentMessageIndex];

  return (
    <>
      <AnimatePresence>
        <Draggable
          axis="both"
          nodeRef={dragRef}
          bounds={dragBounds}
          defaultPosition={{ x: dragX, y: dragY }}
          onStop={(e, data) => {
            setDragX(data.x);
            setDragY(data.y);
            try { 
              localStorage.setItem('floatingGenieX', String(data.x));
              localStorage.setItem('floatingGenieY', String(data.y));
            } catch {}
          }}
        >
          <motion.div
            ref={dragRef}
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
              isolation: 'isolate',
              maxWidth: 'calc(100vw - 2rem)',
              maxHeight: 'calc(100vh - 2rem)'
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
            {/* Tooltip with smart positioning */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-full right-0 mb-3 w-64 md:w-72 max-w-[calc(100vw-6rem)]"
                >
                  {/* Genie Speech Bubble */}
                  <motion.div
                    className="relative bg-gradient-to-br from-primary/95 to-secondary/95 text-primary-foreground rounded-2xl p-2 md:p-3 shadow-2xl border border-primary/20 backdrop-blur-sm"
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
                      className="font-bold text-xs md:text-sm mb-1 text-white leading-tight"
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
                    <p className="text-[10px] md:text-xs text-primary-foreground/90 mb-1 leading-snug line-clamp-2">
                      {currentMessage.description}
                    </p>
                    <motion.p 
                      className="text-[9px] md:text-[10px] text-yellow-200 font-medium italic"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      💡 {currentMessage.humor}
                    </motion.p>

                    {/* Speech bubble tail */}
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-t-8 border-t-primary border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
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

                {/* Fumes teaser only when tooltip is hidden */}
                {!showTooltip && !hasInteracted && (
                  <motion.div 
                    className="absolute -top-8 left-1/2 -translate-x-1/2 z-30"
                    animate={{
                      y: [0, -5, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white text-xs px-3 py-1 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                      💨 I am your Genie...
                    </div>
                  </motion.div>
                )}
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
              className="absolute inset-0 rounded-full border-2 border-yellow-400/40 pointer-events-none"
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
              className="absolute inset-0 rounded-full border-2 border-amber-300/30 pointer-events-none"
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
                className="absolute -inset-6 rounded-full bg-gradient-to-r from-yellow-300/20 via-amber-400/20 to-yellow-300/20 blur-xl pointer-events-none"
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

            </motion.div>
          </motion.div>
        </Draggable>
      </AnimatePresence>

      {/* Genie Interface Modal */}
      <PublicGenieInterface
        isOpen={isGenieOpen}
        onClose={() => setIsGenieOpen(false)}
      />
    </>
  );
};