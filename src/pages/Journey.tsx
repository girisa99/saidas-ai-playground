import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";

import { CTASection } from "@/components/CTASection";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Lightbulb, Cog, Rocket, Target, TrendingUp, Award, Brain, Database, Code2, Network, Zap, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import journeyInfographicBg from "@/assets/journey-infographic-bg.jpg";
import timelineVisual from "@/assets/timeline-visual.png";

// Lazy load heavy components
const VerticalJourneyInfographic = lazy(() => import("@/components/VerticalJourneyInfographic"));
const BusinessImpactInfographic = lazy(() => import("@/components/BusinessImpactInfographic").then(module => ({ default: module.BusinessImpactInfographic })));

// Loading skeleton for heavy components
const ComponentSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="space-y-8">
      <Skeleton className="h-8 w-64 mx-auto" />
      <div className="grid gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Journey = () => {
  useEffect(() => {
    document.title = "Experiment → Validate → Lead to Deploy AI Framework - Genie AI HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the proven Experiment → Validate → Lead to Deploy AI framework - from 45-day experimentation to production-ready healthcare AI solutions with enterprise-grade reliability.');
    }
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-16 sm:pt-20 lg:pt-24">
      {/* Enhanced Hero Section - Consistent with other pages */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image with loading optimization */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{ 
            backgroundImage: `url(${journeyInfographicBg})`
          }}
        />
        
        {/* Dark Gradient Overlay - matching other pages */}
        <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80" />
        
        {/* Journey-themed floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-genie-accent/30 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
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
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Experiment → Validate → Lead to Deploy Framework
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              <span className="text-genie-accent">Experiment → Validate → Lead to Deploy</span> AI Framework
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              A proven 3-phase methodology transforming AI curiosity into production-ready healthcare solutions. 
              From <span className="text-genie-accent font-semibold">Spark & Curiosity</span> through <span className="text-genie-accent font-semibold">Breakthrough Innovation</span> to <span className="text-genie-accent font-semibold">Scalable MVP Foundation</span> — 
              sharing deep knowledge on healthcare workflows with enterprise-grade AI platforms.
            </p>
            
            {/* Journey Highlights Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">EXPERIMENT</h3>
                <p className="text-white/80 text-xs">Spark & curiosity combined exploration</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">VALIDATE</h3>
                <p className="text-white/80 text-xs">Code to creativity breakthrough</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Network className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">LEAD to DEPLOY</h3>
                <p className="text-white/80 text-xs">45-day lessons to production MVP</p>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
               <Button 
                variant="default"
                size="lg"
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
                asChild
              >
                <Link to="/business-use-cases">
                  <Rocket className="w-4 h-4 mr-2" />
                  See Framework in Action
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link to="/about">
                  <Brain className="w-4 h-4 mr-2" />
                  Framework Creator
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status & Progressive Launch - NEW HIGHLIGHT SECTION */}
      <section className="py-16 bg-gradient-to-br from-genie-cyan/5 via-background to-genie-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-genie-cyan/20 text-genie-cyan border-genie-cyan/30 mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              Framework in Action
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              From Framework to <span className="text-genie-cyan">Live Implementation</span>
            </h2>
             <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
               Demonstrating the Experiment → Validate → Lead to Deploy framework through real applications and progressive feature releases.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 border-genie-cyan/20 bg-gradient-to-br from-genie-cyan/5 to-background">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-genie-cyan/10 rounded-xl">
                  <Zap className="w-8 h-8 text-genie-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-genie-cyan">NOW LIVE</h3>
                  <p className="text-sm text-muted-foreground">Experimentation Platform</p>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-3">GenieAI Hub Website</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Knowledge sharing platform launched</li>
                <li>• Framework documentation live</li>
                <li>• Business use cases and case studies available</li>
                <li>• Progressive experiment showcase</li>
              </ul>
              
              {/* Highlighted Genie Feature */}
              <div className="mt-6 p-4 bg-background border-2 border-genie-accent rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-genie-accent text-background text-xs font-bold px-2 py-1">✨ FEATURED</Badge>
                </div>
                <h5 className="font-bold text-genie-accent text-lg mb-3">Genie Conversation Feature</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-genie-accent rounded-full"></div>
                    <span className="text-foreground"><strong>80+ Knowledge Contexts</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-genie-accent rounded-full"></div>
                    <span className="text-foreground"><strong>Multi-Model Intelligence</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-genie-accent rounded-full"></div>
                    <span className="text-foreground"><strong>Split-Screen Conversations</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-genie-accent rounded-full"></div>
                    <span className="text-foreground"><strong>Model Comparison Mode</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-genie-accent rounded-full"></div>
                    <span className="text-foreground"><strong>Advanced RAG Architecture</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-genie-accent rounded-full"></div>
                    <span className="text-foreground"><strong>Context Switching</strong></span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-background">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-genie-primary/10 rounded-xl">
                  <Calendar className="w-8 h-8 text-genie-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-genie-primary">NEXT 2-3 WEEKS</h3>
                  <p className="text-sm text-muted-foreground">Progressive Releases</p>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-3">Additional Experiments</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Incremental feature rollouts</li>
                <li>• New AI experiment showcases</li>
                <li>• Enhanced framework demonstrations</li>
                <li>• Extended use case examples</li>
              </ul>
            </Card>

            <Card className="p-8 border-genie-teal/20 bg-gradient-to-br from-genie-teal/5 to-background">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-genie-teal/10 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-genie-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-genie-teal">ONGOING</h3>
                  <p className="text-sm text-muted-foreground">Continuous Innovation</p>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-3">Active Experimentation</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Framework refinement</li>
                <li>• New technology integration</li>
                <li>• Knowledge base expansion</li>
                <li>• Community feedback integration</li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
             <p className="text-lg text-muted-foreground mb-6">
               This progressive launch strategy demonstrates the <strong className="text-genie-cyan">Experiment → Validate → Lead to Deploy</strong> framework in real-time.
             </p>
            <Button asChild size="lg" className="bg-genie-cyan hover:bg-genie-cyan/90 text-background">
              <Link to="/business-use-cases">
                <Target className="w-4 h-4 mr-2" />
                Explore Current Experiments
              </Link>
            </Button>
          </div>
        </div>
      </section>

        {/* Vertical Journey Infographic - Lazy loaded */}
        <Suspense fallback={<ComponentSkeleton />}>
          <VerticalJourneyInfographic />
        </Suspense>

        {/* Business Impact Analysis - Lazy loaded */}
        <Suspense fallback={<ComponentSkeleton />}>
          <BusinessImpactInfographic />
        </Suspense>

        {/* Clear next steps */}
        <CTASection currentPage="journey" />

      </main>

      <Footer />
    </div>
  );
};

export default Journey;