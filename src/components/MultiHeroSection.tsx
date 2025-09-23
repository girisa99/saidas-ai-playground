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
    title: "🌟 From Traditional to AI-Powered Development",
    subtitle: "My Personal Discovery Journey",
    description: "How I discovered that AI tools are democratizing software development, making it accessible to anyone willing to experiment and learn.",
    ctaPrimary: "Learning Journey",
    ctaSecondary: "My Discovery",
    bgImage: aiJourneyBg
  },
  {
    id: 2,
    icon: Trophy,
    title: "🚀 What Works (& What Doesn't)",
    subtitle: "Honest Experimentation Results",
    description: "Real results from testing AI development tools - the breakthroughs, the failures, and the surprising insights I gained along the way.",
    ctaPrimary: "Experiment Results", 
    ctaSecondary: "Learn More",
    bgImage: successStoriesBg
  },
  {
    id: 3,
    icon: Wrench,
    title: "🔮 AI Tools That Actually Work",
    subtitle: "No-Code to Advanced Development",
    description: "Exploring how AI tools are bridging the gap between business ideas and working software, no computer science degree required.",
    ctaPrimary: "Tool Exploration",
    ctaSecondary: "My Findings",
    bgImage: aiToolsBg
  },
  {
    id: 4,
    icon: Rocket,
    title: "🎯 The Future is Accessible",
    subtitle: "AI-Powered Development for Everyone",
    description: "Sharing insights on how AI is making software development accessible to business professionals and domain experts worldwide.",
    ctaPrimary: "Future Insights",
    ctaSecondary: "Accessibility Vision",
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
    <section className="relative text-white py-12 sm:py-16 md:py-20 lg:py-32 transition-all duration-1000 overflow-hidden min-h-screen">
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
            {/* Clear Value Proposition */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 animate-fade-in text-center text-white">
              AI Development <span className="text-genie-accent">Experimentation</span>
            </h1>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-genie-accent mx-auto mb-6 sm:mb-8"></div>
            
            {/* Clear Purpose Statement */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 sm:mb-6 font-medium max-w-4xl mx-auto px-2">
              Sharing How AI is Democratizing Software Development for Everyone
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-2">
              Join my exploration of how AI tools are making software development accessible to business professionals 
              with little to no coding experience. Real experiments, honest discoveries, and practical insights.
            </p>
            
            {/* What You'll Discover - Knowledge focused */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-genie-accent mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Learning Journey</h3>
                <p className="text-white/80 text-xs sm:text-sm">Follow my step-by-step exploration of AI development tools</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-genie-accent mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Real Experiments</h3>
                <p className="text-white/80 text-xs sm:text-sm">Honest results from testing no-code and AI-powered platforms</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 sm:col-span-2 md:col-span-1">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-genie-accent mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Accessible Tools</h3>
                <p className="text-white/80 text-xs sm:text-sm">Discover AI tools that require minimal technical background</p>
              </div>
            </div>

          {/* Primary CTA - Learning focused */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in justify-center px-2">
            <Button 
              variant="default"
              size="lg" 
              className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              onClick={() => navigate('/journey')}
            >
              Explore My Learning Path
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm w-full sm:w-auto"
              onClick={() => navigate('/about')}
            >
              About My Background
            </Button>
          </div>
        </div>

        {/* Enhanced Hero Navigation Indicators - Mobile Responsive */}
        <div className="flex justify-center mb-6 sm:mb-8 px-2">
          <div className="flex items-center space-x-2 sm:space-x-3 bg-white/10 backdrop-blur-md rounded-full px-3 sm:px-6 py-2 sm:py-3 border border-white/20">
            {heroSections.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                className={`transition-all duration-300 rounded-full border-2 ${
                  index === currentHero 
                    ? 'w-8 sm:w-12 h-3 sm:h-4 bg-genie-accent border-genie-accent scale-110' 
                    : 'w-3 sm:w-4 h-3 sm:h-4 bg-genie-accent/40 border-genie-accent/50 hover:bg-genie-accent/60 hover:border-genie-accent'
                }`}
                aria-label={`Go to hero section ${index + 1}: ${heroSections[index].title}`}
              />
            ))}
          </div>
        </div>
        
        {/* Hero Section Thumbnails - Mobile Responsive */}
        <div className="flex justify-center flex-wrap gap-2 mb-6 sm:mb-8 px-2">
          {heroSections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all duration-300 ${
                index === currentHero
                  ? 'bg-genie-accent text-genie-dark font-medium'
                  : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm border border-white/20'
              }`}
            >
              {section.ctaPrimary}
            </button>
          ))}
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