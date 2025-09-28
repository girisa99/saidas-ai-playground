import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IntegratedTechnologyExploration } from "@/components/IntegratedTechnologyExploration";
import { CTASection } from "@/components/CTASection";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Brain, Database, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import techRoadmapBg from "@/assets/hero-tech-roadmap.jpg";

const TechnologyStack = () => {
  useEffect(() => {
    document.title = "3-Phase Technology Journey - Experiment → Validate → Deploy Tech Stack";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '3-phase technology arsenal powering the Experiment → Validate → Deploy framework. From Spark & Curiosity tools to Scalable MVP infrastructure - sharing healthcare AI technology knowledge.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <Breadcrumbs />
      <main className="pt-16 sm:pt-20 lg:pt-24">{" "}
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${techRoadmapBg})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/80 to-genie-secondary/70" />
        
        {/* Animated Tech Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-genie-accent/40 rounded-full animate-float"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6 sm:mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-5xl">
            <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-3 sm:mb-4">
              <Code2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Experiment → Validate → Deploy Tech Stack
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              <span className="text-genie-accent">3-Phase</span> Technology Journey
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              Technology arsenal powering the Experiment → Validate → Deploy framework. From <span className="text-genie-accent font-semibold">Spark & Curiosity</span> tools 
              through <span className="text-genie-accent font-semibold">Breakthrough Innovation</span> platforms to <span className="text-genie-accent font-semibold">Scalable MVP</span> infrastructure — 
              sharing deep knowledge on healthcare AI technology stacks.
            </p>
            
            {/* 3-Phase Tech Highlights Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">EXPERIMENT</h3>
                <p className="text-white/80 text-xs">GPT, Claude, Cursor IDE</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">VALIDATE</h3>
                <p className="text-white/80 text-xs">Loveable, Bolt, TypeScript</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">DEPLOY</h3>
                <p className="text-white/80 text-xs">Supabase, Docker, CI/CD</p>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
              <Button 
                variant="default"
                size="lg"
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <Database className="w-4 h-4 mr-2" />
                Explore 3-Phase Tech Stack
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
                asChild
              >
                <Link to="/journey">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  See Framework Journey
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
        
        <IntegratedTechnologyExploration />
        
        {/* Strategic navigation flow */}
        <CTASection currentPage="technology" />
      </main>
      <Footer />
    </div>
  );
};

export default TechnologyStack;