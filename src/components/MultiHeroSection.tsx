import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import aiNeuralBg from "@/assets/hero-ai-neural.jpg";
import enterpriseBg from "@/assets/hero-enterprise.jpg";
import growthBg from "@/assets/hero-growth.jpg";
import ecosystemBg from "@/assets/hero-ecosystem.jpg";
import genieAnimated from "@/assets/genie-animated.png";


const heroSections = [
  {
    id: 1,
    icon: Sparkles,
    title: "From Curiosity to Reality",
    subtitle: "Transforming AI Vision into Business Impact",
    description: "Navigate the complete journey from AI experimentation to enterprise-scale deployment with proven frameworks and strategic guidance.",
    ctaPrimary: "Start Your AI Journey",
    ctaSecondary: "View Success Stories",
    bgImage: aiNeuralBg
  },
  {
    id: 2,
    icon: Target,
    title: "The AI Imperative",
    subtitle: "Empowering Every Team Across Your Enterprise",
    description: "Unlock AI's transformative potential across all business functions with comprehensive implementation strategies and governance frameworks.",
    ctaPrimary: "Empower Your Teams",
    ctaSecondary: "Enterprise Solutions",
    bgImage: enterpriseBg
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Unlocking AI's Business Potential",
    subtitle: "Measurable Impact & Strategic ROI",
    description: "Drive sustainable growth through AI initiatives that deliver quantifiable results and competitive advantage in today's market.",
    ctaPrimary: "Calculate Your ROI",
    ctaSecondary: "Impact Case Studies",
    bgImage: growthBg
  },
  {
    id: 4,
    icon: Zap,
    title: "Navigating the AI Ecosystem",
    subtitle: "Tools, Trends & Transformation",
    description: "Master the comprehensive AI landscape with expert insights into emerging technologies, implementation best practices, and future-ready strategies.",
    ctaPrimary: "Explore AI Tools",
    ctaSecondary: "Technology Roadmap",
    bgImage: ecosystemBg
  }
];

export const MultiHeroSection = () => {
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentSection = heroSections[currentHero];
  const IconComponent = currentSection.icon;

  return (
    <section className="relative text-white py-24 lg:py-32 transition-all duration-1000 overflow-hidden bg-gradient-to-br from-genie-dark via-genie-navy to-genie-primary/20">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-genie-cyan/60 rounded-full animate-float genie-glow`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* DNA Strands */}
      <div className="absolute top-20 right-10 w-8 h-8 border-2 border-genie-cyan/50 rounded-full animate-dna" />
      <div className="absolute bottom-20 left-10 w-6 h-6 border-2 border-genie-teal/50 rounded-full animate-dna" style={{ animationDelay: '2s' }} />
      
      {/* Floating Smoke Effects */}
      <div className="absolute bottom-10 left-1/4 w-4 h-4 bg-genie-primary/30 rounded-full animate-smoke" />
      <div className="absolute bottom-10 right-1/4 w-3 h-3 bg-genie-cyan/30 rounded-full animate-smoke" style={{ animationDelay: '1s' }} />
      
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-20"
        style={{ backgroundImage: `url(${currentSection.bgImage})` }}
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-genie-dark/40 via-transparent to-genie-navy/60" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Brand Title */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4 animate-fade-in text-center">
              Genie AI Experimentation HUB
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>

          {/* Animated Genie Character */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src={genieAnimated} 
                alt="Genie AI Technology Navigator" 
                className="w-48 h-48 lg:w-64 lg:h-64 animate-pulse-glow object-contain"
              />
              {/* Glowing Aura */}
              <div className="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-genie-cyan/20 blur-xl animate-pulse-glow" />
            </div>
          </div>

          {/* Section Content */}
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 animate-fade-in">
            {currentSection.title}
          </h2>
          <h3 className="text-xl lg:text-2xl text-white/90 mb-6 font-medium animate-fade-in">
            {currentSection.subtitle}
          </h3>
          <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-4xl mx-auto animate-fade-in">
            {currentSection.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in justify-center">
            <Button size="lg" className="bg-genie-primary text-white hover:bg-genie-teal px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 genie-glow">
              {currentSection.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-genie-cyan text-genie-cyan hover:bg-genie-cyan/10 px-8 py-4 text-lg font-semibold transition-all duration-300">
              {currentSection.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="flex justify-center space-x-3 mb-8">
          {heroSections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHero(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHero 
                  ? 'bg-genie-cyan scale-125 genie-glow' 
                  : 'bg-genie-cyan/40 hover:bg-genie-cyan/60'
              }`}
              aria-label={`Go to hero section ${index + 1}`}
            />
          ))}
        </div>

        {/* Professional Stats with Genie Theme */}
        <div className="border-t border-genie-cyan/30 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-genie-cyan mb-2 genie-teal-glow">25+</div>
              <div className="text-genie-cyan/80">Years Experience</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-genie-cyan mb-2 genie-teal-glow">95%</div>
              <div className="text-genie-cyan/80">Success Rate</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-genie-cyan mb-2 genie-teal-glow">Global</div>
              <div className="text-genie-cyan/80">Impact & Reach</div>
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