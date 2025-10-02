import { Bot, Sparkles, ArrowRight, Calendar, MessageCircle, Trophy, Target, Rocket, Zap, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import genieAnimated from "@/assets/genie-animated.png";
import genieLamp from "@/assets/genie-lamp.png";
import aiJourneyBg from "@/assets/hero-ai-journey.jpg";
import { useState, useEffect, useMemo } from "react";
import { LazyImage } from "@/components/LazyImage";

export const UnifiedHeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rightTileIndex, setRightTileIndex] = useState(0);
  const genieImages = [genieAnimated, genieLamp];

  const particles = useMemo(
    () => Array.from({ length: 15 }, () => ({
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

  // Rotate every 6 seconds for better UX
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % genieImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [genieImages.length]);

  // Rotate right tile content every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRightTileIndex((prev) => (prev + 1) % 2);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

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
          <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4 text-base px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Democratization Through Personal Experimentation
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6">
            Experiment. Validate. Lead.
            <span className="block text-genie-accent mt-2">90-Day AI Transformation Journey</span>
          </h1>
          <div className="w-24 h-1 bg-genie-accent mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-4">
            <strong>May 2025 Launch:</strong> Building AI expertise through systematic personal experimentation and validation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-genie-accent" />
              <span><strong>Day 0-45:</strong> Guardrails & Foundation</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-genie-accent" />
              <span><strong>Day 45-90:</strong> Implementation & Results</span>
            </div>
          </div>
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
                Genie AI Experimentation Hub
              </h2>
              
              <p className="text-white/80 text-lg leading-relaxed">
                Personal AI experimentation laboratory demonstrating systematic methodologies and proven frameworks that drive organizational AI adoption and change.
              </p>

              {/* Framework Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Trophy className="h-6 w-6 text-genie-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">Experiment</h3>
                  <p className="text-white/70 text-xs">Learn through practical trials</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Target className="h-6 w-6 text-genie-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">Validate</h3>
                  <p className="text-white/70 text-xs">Build credible case studies</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <Rocket className="h-6 w-6 text-genie-accent mx-auto mb-2" />
                  <h3 className="font-semibold text-white text-sm">Lead to Deploy</h3>
                  <p className="text-white/70 text-xs">Drive implementation with expertise</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">2</div>
                  <div className="text-white/70 text-xs">Live Features</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">10+</div>
                  <div className="text-white/70 text-xs">In Experimentation</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-genie-accent">25+</div>
                  <div className="text-white/70 text-xs">Years Experience</div>
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

          {/* Right Tile - Rotating Content */}
          <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-primary/30">
            {rightTileIndex === 0 ? (
              // Content 1: Genie AI Conversation
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
                  Experimentation with Real Outcomes: Hands-on AI project demonstrating how modern AI is transforming development. Sharing proven results through documented case studies and learnings in conversation intelligence and scalable system design.
                </p>

                {/* Shared Learnings & Real Outcomes */}
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Lightbulb className="w-4 h-4 text-purple-400" />
                    Shared Learnings & Real Outcomes
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="text-purple-300">
                      <div className="font-bold text-white">1,000+</div>
                      <div className="text-white/70">Proven concurrent handling</div>
                    </div>
                    <div className="text-purple-300">
                      <div className="font-bold text-white">{"<"}2.5s</div>
                      <div className="text-white/70">Documented response times</div>
                    </div>
                    <div className="text-purple-300">
                      <div className="font-bold text-white">99.9%</div>
                      <div className="text-white/70">Achieved reliability</div>
                    </div>
                  </div>
                </div>

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
                    <LazyImage 
                      src={genieImages[currentImageIndex]} 
                      alt="Genie AI Assistant" 
                      className="w-full h-full object-contain"
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
            ) : (
              // Content 2: GenieAI Hub Site Capabilities
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start gap-3">
                  <Badge className="bg-gradient-to-r from-genie-accent to-genie-cyan text-genie-dark border-none">
                    <Zap className="w-4 h-4 mr-1" />
                    Live Platform
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <Calendar className="w-4 h-4" />
                    <span>Launched August 2025</span>
                  </div>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  GenieAI Experimentation Hub
                  <span className="block text-genie-cyan mt-1 text-xl lg:text-2xl font-semibold">
                    Full-Stack Demonstration Platform
                  </span>
                  <span className="block text-white/90 mt-1 text-lg font-medium">
                    Built in 2 Weeks • Showcasing 80-90 Days of Platform Development
                  </span>
                </h2>
                
                <p className="text-white/80 text-lg leading-relaxed">
                  This live website demonstrates rapid AI-powered development and modern full-stack capabilities. A showcase website built in just 2 weeks to demonstrate the platform's capabilities, which took 80-90 days to develop and refine.
                </p>

                {/* Platform Stats */}
                <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Rocket className="w-4 h-4 text-cyan-400" />
                    Platform Development Metrics
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div className="text-cyan-300">
                      <div className="font-bold text-white">2 weeks</div>
                      <div className="text-white/70">Showcase website build</div>
                    </div>
                    <div className="text-cyan-300">
                      <div className="font-bold text-white">80-90 days</div>
                      <div className="text-white/70">Platform development</div>
                    </div>
                    <div className="text-cyan-300">
                      <div className="font-bold text-white">10+ features</div>
                      <div className="text-white/70">In experimentation</div>
                    </div>
                  </div>
                </div>

                {/* Site Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 text-white/80">
                    <Zap className="w-5 h-5 text-genie-cyan flex-shrink-0" />
                    <span>AI-Powered Development</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Rocket className="w-5 h-5 text-genie-cyan flex-shrink-0" />
                    <span>Modern Tech Stack</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Target className="w-5 h-5 text-genie-cyan flex-shrink-0" />
                    <span>Responsive Design</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Bot className="w-5 h-5 text-genie-cyan flex-shrink-0" />
                    <span>Supabase Backend</span>
                  </div>
                </div>

                {/* Technical Showcase Features */}
                <div className="bg-white/5 rounded-lg p-4 border border-genie-cyan/20">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-genie-cyan" />
                    Technical Capabilities Demonstrated
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="text-white/70">• React + TypeScript Frontend</div>
                    <div className="text-white/70">• Supabase Integration</div>
                    <div className="text-white/70">• Edge Functions Backend</div>
                    <div className="text-white/70">• Real-time Features</div>
                    <div className="text-white/70">• Email Service Integration</div>
                    <div className="text-white/70">• Admin Dashboard</div>
                  </div>
                </div>

                {/* Platform Visual */}
                <div className="relative py-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-genie-cyan/20 to-genie-teal/20 rounded-full blur-3xl"></div>
                  <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto">
                    <LazyImage 
                      src={genieImages[currentImageIndex]} 
                      alt="Genie AI Platform" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge variant="secondary" className="bg-background/90 text-foreground border border-genie-cyan/20">
                      <Rocket className="w-3 h-3 mr-1 text-genie-cyan" />
                      Live Platform
                    </Badge>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-gradient-to-r from-genie-cyan to-genie-teal hover:from-genie-cyan/90 hover:to-genie-teal/90 text-genie-dark font-semibold flex-1"
                  >
                    <Link to="/journey">
                      <Rocket className="w-4 h-4 mr-2" />
                      Explore the Journey
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg"
                    className="border-white/50 text-white bg-transparent hover:bg-white hover:text-genie-dark backdrop-blur-sm flex-1"
                  >
                    <Link to="/technology">
                      Technology Stack
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};