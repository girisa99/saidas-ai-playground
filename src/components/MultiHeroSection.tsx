import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Trophy, Wrench, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import aiJourneyBg from "@/assets/hero-ai-journey.jpg";
import successStoriesBg from "@/assets/hero-success-stories.jpg";
import aiToolsBg from "@/assets/hero-ai-tools.jpg";
import techRoadmapBg from "@/assets/hero-tech-roadmap.jpg";
import genieAnimated from "@/assets/genie-animated.png";


const heroSections = [
  {
    id: 1,
    icon: MapPin,
    title: "🌟 From Skeptic to AI Believer",
    subtitle: "My 21-Year Digital Health Journey",
    description: "Discover how I went from traditional healthcare to AI innovation through real experiments and breakthrough moments.",
    ctaPrimary: "AI Journey",
    ctaSecondary: "My Story",
    bgImage: aiJourneyBg
  },
  {
    id: 2,
    icon: Trophy,
    title: "🚀 What Actually Worked (& Failed)",
    subtitle: "Honest Lessons from the Trenches",
    description: "Real wins, epic fails, and surprising insights from implementing AI in healthcare and beyond.",
    ctaPrimary: "View Success Stories",
    ctaSecondary: "Learn More",
    bgImage: successStoriesBg
  },
  {
    id: 3,
    icon: Wrench,
    title: "🔮 My AI Tool Arsenal",
    subtitle: "Personal Favorites That Stuck",
    description: "After testing hundreds of AI tools, these game-changers transformed my workflow and thinking.",
    ctaPrimary: "Explore AI Tools",
    ctaSecondary: "My Picks",
    bgImage: aiToolsBg
  },
  {
    id: 4,
    icon: Rocket,
    title: "🎯 Building Tomorrow Together",
    subtitle: "My Vision for AI's Future",
    description: "Where AI is taking us next - based on real experiments and emerging possibilities.",
    ctaPrimary: "Technology Roadmap",
    ctaSecondary: "Future Vision",
    bgImage: techRoadmapBg
  }
];

export const MultiHeroSection = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const navigate = useNavigate();
  const primaryCtaPathMap: Record<number, string> = {
    1: "/journey",
    2: "/case-studies",
    3: "/technology",
    4: "/journey",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSection = heroSections[currentHero];
  const IconComponent = currentSection.icon;

  return (
    <section className="relative text-white py-24 lg:py-32 transition-all duration-1000 overflow-hidden">
      {/* Background Image with Transition */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${currentSection.bgImage})` }}
      />
      
      {/* Consistent Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80" />

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
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Clear Value Proposition */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in text-center text-white">
              Genie AI Experimentation <span className="text-genie-accent">HUB</span>
            </h1>
            <div className="w-24 h-1 bg-genie-accent mx-auto mb-8"></div>
            
            {/* Clear Purpose Statement */}
            <h2 className="text-2xl lg:text-3xl text-white/90 mb-6 font-medium max-w-4xl mx-auto">
              Transform Your Business with Proven AI Implementation Strategies
            </h2>
            <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-4xl mx-auto">
              21 years of healthcare technology expertise condensed into actionable AI strategies. 
              Learn from real implementations, avoid costly mistakes, and accelerate your AI journey.
            </p>
            
            {/* What You'll Get - Consistent with other pages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <MapPin className="h-8 w-8 text-genie-accent mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Proven Roadmaps</h3>
                <p className="text-white/80 text-sm">Step-by-step guides from real AI implementations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Trophy className="h-8 w-8 text-genie-accent mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Real Case Studies</h3>
                <p className="text-white/80 text-sm">Honest wins, failures, and lessons learned</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Wrench className="h-8 w-8 text-genie-accent mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Tested AI Tools</h3>
                <p className="text-white/80 text-sm">Curated arsenal of tools that actually work</p>
              </div>
            </div>
          </div>

          {/* Primary CTA - Consistent styling */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in justify-center">
            <Button 
              variant="default"
              size="xl" 
              className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/journey')}
            >
              Start Your AI Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              onClick={() => navigate('/about')}
            >
              Learn My Story
            </Button>
          </div>
        </div>

        {/* Enhanced Hero Navigation Indicators - Consistent styling */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            {heroSections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                className={`transition-all duration-300 rounded-full border-2 ${
                  index === currentHero 
                    ? 'w-12 h-4 bg-genie-accent border-genie-accent scale-110' 
                    : 'w-4 h-4 bg-genie-accent/40 border-genie-accent/50 hover:bg-genie-accent/60 hover:border-genie-accent'
                }`}
                aria-label={`Go to hero section ${index + 1}: ${heroSections[index].title}`}
              />
            ))}
          </div>
        </div>
        
        {/* Hero Section Thumbnails - Consistent styling */}
        <div className="flex justify-center space-x-2 mb-8">
          {heroSections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                index === currentHero
                  ? 'bg-genie-accent text-genie-dark font-medium'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              {section.ctaPrimary}
            </button>
          ))}
        </div>

        {/* Professional Stats with Consistent Styling */}
        <div className="border-t border-white/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-genie-accent mb-2">25+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-genie-accent mb-2">95%</div>
              <div className="text-white/80">Project Success Rate</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-genie-accent mb-2">Global</div>
              <div className="text-white/80">Impact & Reach</div>
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