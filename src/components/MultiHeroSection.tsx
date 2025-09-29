import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Trophy, Wrench, Rocket, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import aiJourneyBg from "@/assets/hero-ai-journey.jpg";
import successStoriesBg from "@/assets/hero-success-stories.jpg";
import aiToolsBg from "@/assets/hero-ai-tools.jpg";
import techRoadmapBg from "@/assets/hero-tech-roadmap.jpg";
import genieAnimated from "@/assets/genie-animated.png";


const heroSections = [
  {
    id: 1,
    icon: MapPin,
    title: "🧞‍♂️ Genie Conversational AI",
    subtitle: "My Experimentation Journey's Breakthrough",
    description: "After years of experimenting with AI tools and democratization, I'm introducing Genie - the conversational engine that guides you through our proven 3-Phase Framework using Gartner value methodology.",
    ctaPrimary: "Experience Genie",
    ctaSecondary: "Coming Feb 2025",
    bgImage: aiJourneyBg,
    isGenie: true
  },
  {
    id: 2,
    icon: Trophy,
    title: "🚀 What Works (& What Doesn't)",
    subtitle: "Real Experimentation Results",
    description: "Honest results from testing AI development tools - the breakthroughs, failures, and insights that led to Genie's conversational approach to democratizing AI development.",
    ctaPrimary: "Experiment Results", 
    ctaSecondary: "Learn More",
    bgImage: successStoriesBg
  },
  {
    id: 3,
    icon: Wrench,
    title: "🔮 3-Phase Framework in Action",
    subtitle: "Experiment → Validate → Deploy",
    description: "The proven methodology that Genie uses to guide business experts through AI development - no coding required, just conversation and domain knowledge.",
    ctaPrimary: "Framework Deep Dive",
    ctaSecondary: "See Process",
    bgImage: aiToolsBg
  },
  {
    id: 4,
    icon: Rocket,
    title: "🎯 AI Democratization Vision",
    subtitle: "Business Knowledge Becomes AI Power",
    description: "The future Genie enables: where business professionals and domain experts build enterprise AI solutions through natural conversation, not code.",
    ctaPrimary: "Future Vision",
    ctaSecondary: "Join the Movement",
    bgImage: techRoadmapBg
  }
];

export const MultiHeroSection = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const primaryCtaPathMap: Record<number, string> = {
    1: "/journey",
    2: "/case-studies",
    3: "/technology", 
    4: "/journey",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSections.length);
    }, 12000); // Increased from 5000ms to 12000ms (12 seconds)

    return () => clearInterval(interval);
  }, []);

  const currentSection = heroSections[currentHero];
  const IconComponent = currentSection.icon;

  return (
    <section className="relative text-white py-12 sm:py-16 md:py-20 lg:py-32 transition-all duration-2000 ease-in-out overflow-hidden min-h-screen">
      {/* Background Image with Smoother Transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-2000 ease-in-out"
        style={{ backgroundImage: `url(${currentSection.bgImage})` }}
      />
      
      {/* Consistent Dark Gradient Overlay with Smoother Transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80 transition-opacity duration-2000 ease-in-out" />

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-genie-accent/40 rounded-full animate-float`}
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
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Dynamic Hero Content */}
          <div className="mb-4 sm:mb-6">
            <IconComponent className="h-12 w-12 sm:h-16 sm:w-16 text-genie-accent mx-auto mb-4" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 animate-fade-in text-center text-white">
            {currentSection.title}
          </h1>
          
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-genie-accent mx-auto mb-6 sm:mb-8"></div>
          
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 sm:mb-6 font-medium max-w-4xl mx-auto px-2">
            {currentSection.subtitle}
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-2">
            {currentSection.description}
          </p>

          {/* Special Genie visual for first hero */}
          {currentSection.isGenie && (
            <div className="mb-8 sm:mb-12">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-genie-primary/20 to-genie-accent/20 rounded-full blur-3xl"></div>
                <img 
                  src={genieAnimated} 
                  alt="Genie AI Assistant" 
                  className="relative w-32 h-32 sm:w-48 sm:h-48 object-contain mx-auto animate-float"
                />
              </div>
            </div>
          )}
          
          {/* Experiment → Validate → Deploy Framework for all sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-genie-accent mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Experiment</h3>
              <p className="text-white/80 text-xs sm:text-sm">Test AI tools and platforms without technical barriers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-genie-accent mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Validate</h3>
              <p className="text-white/80 text-xs sm:text-sm">Prove concepts with real-world use cases and results</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 sm:col-span-2 md:col-span-1">
              <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-genie-accent mx-auto mb-2 sm:mb-3" />
              <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Deploy</h3>
              <p className="text-white/80 text-xs sm:text-sm">Launch working solutions that solve real problems</p>
            </div>
          </div>

          {/* Dynamic CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in justify-center px-2">
            <Button 
              variant="default"
              size="lg" 
              className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              asChild
            >
              <Link to={primaryCtaPathMap[currentHero + 1] || "/journey"}>
                {currentSection.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/50 text-white bg-transparent hover:bg-white hover:text-genie-dark backdrop-blur-sm w-full sm:w-auto transition-all duration-300"
              asChild
            >
              <Link to="/business-use-cases">
                {currentSection.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>

        {/* Professional Stats with Mobile Responsive Styling */}
        <div className="border-t border-white/20 pt-8 sm:pt-12 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl font-bold text-genie-accent mb-1 sm:mb-2">25+</div>
              <div className="text-white/80 text-sm sm:text-base">Years Experience</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl font-bold text-genie-accent mb-1 sm:mb-2">95%</div>
              <div className="text-white/80 text-sm sm:text-base">Project Success Rate</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-2xl sm:text-3xl font-bold text-genie-accent mb-1 sm:mb-2">Global</div>
              <div className="text-white/80 text-sm sm:text-base">Impact & Reach</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Genie-themed Decorative Elements */}
      <div className="absolute top-32 left-20 w-3 h-3 bg-genie-teal/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-60 right-32 w-2 h-2 bg-genie-primary/70 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 left-32 w-4 h-4 bg-genie-cyan/50 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-60 right-20 w-3 h-3 bg-genie-teal/60 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Neural Network Pattern Overlay */}
      <div className="absolute inset-0 neural-pattern opacity-10" />
    </section>
  );
};