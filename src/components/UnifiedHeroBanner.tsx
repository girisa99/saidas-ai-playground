import { Bot, Sparkles, ArrowRight, Calendar, MessageCircle, Trophy, Target, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import genieAnimated from "@/assets/genie-animated.png";
import genieLamp from "@/assets/genie-lamp.png";
import aiJourneyBg from "@/assets/hero-ai-journey.jpg";
import { useState, useEffect, useMemo } from "react";

export const UnifiedHeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const genieImages = [genieAnimated, genieLamp];

  const particles = useMemo(
    () => Array.from({ length: 20 }, () => ({
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${3 + Math.random() * 3}s`,
    })),
    []
  );

  // Preload images to avoid flicker
  useEffect(() => {
    genieImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Rotate every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % genieImages.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [genieImages.length]);

  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aiJourneyBg})` }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80" />

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute bg-genie-accent/40 rounded-full animate-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6">
            Experiment. Validate. Deploy.
            <span className="block text-genie-accent mt-2">Faster AI Innovation Without Bureaucracy</span>
          </h1>
          <div className="w-24 h-1 bg-genie-accent mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
            45 Days of Learning → GenieAI Experimentation Hub Launch
          </p>
        </div>

        {/* Two-Tile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          
          {/* Left Tile - Experimentation Journey */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-genie-accent to-genie-teal text-genie-dark">
                  <Trophy className="w-4 h-4 mr-1" />
                  Proven Results
                </Badge>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                My AI Democratization Journey
              </h2>
              
              <p className="text-white/80 text-lg leading-relaxed">
                Learn the practical approach from business idea to working AI application through proven technology stacks and real examples.
              </p>

              {/* Framework Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Trophy className="h-6 w-6 text-genie-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">Experiment</h3>
                  <p className="text-white/70 text-xs">Test AI tools without barriers</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-genie-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">Validate</h3>
                  <p className="text-white/70 text-xs">Prove concepts with real results</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Rocket className="h-6 w-6 text-genie-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">Deploy</h3>
                  <p className="text-white/70 text-xs">Launch working solutions</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">25+</div>
                  <div className="text-white/70 text-xs">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">95%</div>
                  <div className="text-white/70 text-xs">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">8+</div>
                  <div className="text-white/70 text-xs">AI Solutions</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold flex-1"
                >
                  <Link to="/journey" className="flex items-center justify-center gap-2">
                    See How It Works
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-white/50 text-white bg-transparent hover:bg-white hover:text-genie-dark backdrop-blur-sm flex-1"
                >
                  <Link to="/case-studies">
                    View Examples
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Tile - Genie AI Announcement */}
          <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary/30">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-none">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Now Available
                </Badge>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Calendar className="w-4 h-4" />
                  <span>September 2025</span>
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Introducing Genie AI
                <span className="block text-genie-accent mt-1 text-xl lg:text-2xl font-semibold">
                  First Feature: Advanced Conversational AI
                </span>
                <span className="block text-white/90 mt-1 text-lg font-medium">
                  80+ Knowledge Contexts • More Experiments Coming Soon
                </span>
              </h2>
              
              <p className="text-white/80 text-lg leading-relaxed">
                Beyond experimentation guidance - a comprehensive AI system with specialized knowledge spanning healthcare, enterprise technology stacks, and advanced deployment strategies across 80+ curated knowledge contexts.
              </p>

              {/* Genie Core Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 text-white/80">
                  <MessageCircle className="w-5 h-5 text-genie-accent flex-shrink-0" />
                  <span>80+ Knowledge Contexts</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Bot className="w-5 h-5 text-genie-accent flex-shrink-0" />
                  <span>Advanced RAG Architecture</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Sparkles className="w-5 h-5 text-genie-accent flex-shrink-0" />
                  <span>Multi-Domain Intelligence</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Target className="w-5 h-5 text-genie-accent flex-shrink-0" />
                  <span>Enterprise-Grade Insights</span>
                </div>
              </div>

              {/* Advanced Knowledge Base Features */}
              <div className="bg-white/5 rounded-lg p-4 border border-genie-accent/20">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-genie-accent" />
                  Live Experimentation Showcase
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="text-white/70">• Single & Multi-Model Intelligence</div>
                  <div className="text-white/70">• Split-Screen Conversations</div>
                  <div className="text-white/70">• Model Comparison Mode</div>
                  <div className="text-white/70">• Unified Context Management</div>
                  <div className="text-white/70">• RAG-Enhanced Knowledge Base</div>
                  <div className="text-white/70">• Healthcare Domain Expertise</div>
                </div>
              </div>

              {/* Genie Visual */}
              <div className="relative py-6">
                <div className="absolute inset-0 bg-gradient-to-r from-genie-accent/20 to-genie-teal/20 rounded-full blur-3xl"></div>
                <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto">
                  <img 
                    src={genieImages[currentImageIndex]} 
                    alt="Genie AI Assistant" 
                    className="w-full h-full object-contain animate-float transition-all duration-1000"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <Badge variant="secondary" className="bg-background/90 text-foreground border border-genie-accent/20">
                    <Sparkles className="w-3 h-3 mr-1 text-genie-accent" />
                    AI-Powered
                  </Badge>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-genie-accent to-genie-teal hover:from-genie-accent/90 hover:to-genie-teal/90 text-genie-dark font-semibold flex-1"
                  onClick={() => {
                    // Open Genie popup - you can customize this to your popup implementation
                    const event = new CustomEvent('openGeniePopup');
                    window.dispatchEvent(event);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Try Genie Now
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-white/50 text-white bg-transparent hover:bg-white hover:text-genie-dark backdrop-blur-sm flex-1"
                >
                  <Link to="/business-use-cases">
                    Business Use Cases
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};