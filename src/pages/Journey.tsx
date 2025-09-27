import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import VerticalJourneyInfographic from "@/components/VerticalJourneyInfographic";
import { BusinessImpactInfographic } from "@/components/BusinessImpactInfographic";


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Lightbulb, Cog, Rocket, Target, TrendingUp, Award, Brain, Database, Code2, Network, Zap, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import journeyInfographicBg from "@/assets/journey-infographic-bg.jpg";
import timelineVisual from "@/assets/timeline-visual.png";

const Journey = () => {
  useEffect(() => {
    document.title = "Our Journey - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the journey behind Genie AI Experimentation HUB - from concept to enterprise AI transformation platform.');
    }
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <Breadcrumbs />
      <main className="pt-16 sm:pt-20 lg:pt-24">{" "}
      {/* Enhanced Hero Section - Consistent with other pages */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${journeyInfographicBg})` }}
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
              Strategic Genesis & Experimentation
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              From Spark to <span className="text-genie-accent">Resilient AI Hub</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              A comprehensive 5-phase transformation journey from initial AI curiosity to building a stable, 
              resilient healthcare AI experimentation platform - featuring breakthrough moments, scalable architectures, 
              and enterprise-grade multi-agent orchestration systems.
            </p>
            
            {/* Journey Highlights Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Innovation Journey</h3>
                <p className="text-white/80 text-xs">5-phase transformation since May 2025</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Democratizing AI</h3>
                <p className="text-white/80 text-xs">Making AI accessible to everyone</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Enterprise Impact</h3>
                <p className="text-white/80 text-xs">Healthcare technology transformation</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Strategic Genesis</h3>
                <p className="text-white/80 text-xs">Accelerating innovation through AI</p>
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
                  <Calendar className="w-4 h-4 mr-2" />
                  Explore business use cases
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm w-full sm:w-auto"
                asChild
              >
                <Link to="/about">
                  <Award className="w-4 h-4 mr-2" />
                  About me
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

        {/* Vertical Journey Infographic */}
        <VerticalJourneyInfographic />

        {/* Business Impact Analysis */}
        <BusinessImpactInfographic />

      </main>

      <Footer />
    </div>
  );
};

export default Journey;