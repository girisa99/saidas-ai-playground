import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { TechnologyStackSection } from "@/components/TechnologyStackSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code2, Brain, Database, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import techRoadmapBg from "@/assets/hero-tech-roadmap.jpg";

const TechnologyStack = () => {
  useEffect(() => {
    document.title = "Technology Stack - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive AI technology stack - from no-code platforms to enterprise infrastructure. Explore our proven tech arsenal.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-5xl">
            <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-4">
              <Code2 className="w-4 h-4 mr-2" />
              Technology Arsenal
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white">
              AI Technology <span className="text-genie-accent">Stack</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
              From no-code platforms to enterprise infrastructure - discover the comprehensive 
              technology arsenal powering our AI innovations and transformations.
            </p>
            
            {/* Tech Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Brain className="h-6 w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-sm">AI Models</h3>
                <p className="text-white/80 text-xs">GPT-4, Claude 3, Gemini</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Database className="h-6 w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-sm">Infrastructure</h3>
                <p className="text-white/80 text-xs">Docker, Kubernetes, Cloud</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Shield className="h-6 w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-sm">Security</h3>
                <p className="text-white/80 text-xs">Enterprise-grade, Compliant</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Zap className="h-6 w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-sm">Performance</h3>
                <p className="text-white/80 text-xs">High-speed, Scalable</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default"
                size="lg"
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl"
              >
                <Database className="w-4 h-4 mr-2" />
                Explore Stack
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                asChild
              >
                <Link to="/case-studies">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  See Results
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main>
        <TechnologyStackSection />
      </main>
      <Footer />
    </div>
  );
};

export default TechnologyStack;