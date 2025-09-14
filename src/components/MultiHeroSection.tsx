import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import aiNeuralBg from "@/assets/hero-ai-neural.jpg";
import enterpriseBg from "@/assets/hero-enterprise.jpg";
import growthBg from "@/assets/hero-growth.jpg";
import ecosystemBg from "@/assets/hero-ecosystem.jpg";

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
    <section className="relative text-white py-24 lg:py-32 transition-all duration-1000 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${currentSection.bgImage})` }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* Main Brand Title */}
          <div className="mb-8">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-2 animate-fade-in">
              Genie AI Experimentation HUB
            </h1>
            <div className="w-24 h-1 bg-primary mb-6"></div>
          </div>

          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <IconComponent className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Section Content */}
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 animate-fade-in">
            {currentSection.title}
          </h2>
          <h3 className="text-xl lg:text-2xl text-white/90 mb-6 font-medium animate-fade-in">
            {currentSection.subtitle}
          </h3>
          <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-4xl animate-fade-in">
            {currentSection.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              {currentSection.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold transition-all duration-300">
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
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to hero section ${index + 1}`}
            />
          ))}
        </div>

        {/* Professional Stats */}
        <div className="border-t border-white/20 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/80">AI Implementations</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-white mb-2">Enterprise</div>
              <div className="text-white/80">Scale Solutions</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-white mb-2">Global</div>
              <div className="text-white/80">Impact & Reach</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-white/30 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-white/40 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-white/25 rounded-full animate-pulse" />
    </section>
  );
};