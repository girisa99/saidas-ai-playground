import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Trophy, Wrench, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import aiJourneyBg from "@/assets/hero-ai-journey.jpg";
import successStoriesBg from "@/assets/hero-success-stories.jpg";
import aiToolsBg from "@/assets/hero-ai-tools.jpg";
import techRoadmapBg from "@/assets/hero-tech-roadmap.jpg";
import genieAnimated from "@/assets/genie-animated.png";


const heroSections = [
  {
    id: 1,
    icon: MapPin,
    title: "🧭 Lost in AI Land? Let's Navigate Together!",
    subtitle: "From 'What's AI?' to 'Wow, That's AI!'",
    description: "Join the adventure from AI newbie to AI ninja! I'll be your personal AI sherpa, guiding you through the mystical mountains of machine learning without the technical jargon headaches.",
    ctaPrimary: "AI Journey",
    ctaSecondary: "Start Adventure",
    bgImage: aiJourneyBg
  },
  {
    id: 2,
    icon: Trophy,
    title: "🏆 Tales of AI Triumph (No Robots Were Harmed!)",
    subtitle: "Real Stories, Real Results, Real Fun",
    description: "Discover how ordinary businesses became AI superheroes! From healthcare heroes to finance wizards - these success stories will make you believe in AI magic (and maybe chuckle a bit).",
    ctaPrimary: "View Success Stories",
    ctaSecondary: "Read Adventures",
    bgImage: successStoriesBg
  },
  {
    id: 3,
    icon: Wrench,
    title: "🔧 AI Tools That Don't Bite (Promise!)",
    subtitle: "Your AI Toolkit for World Domination",
    description: "Explore the coolest AI tools in the galaxy! From chatty ChatGPTs to artistic AI Picassos - find your perfect AI sidekick without breaking the bank (or your brain).",
    ctaPrimary: "Explore AI Tools",
    ctaSecondary: "Tool Safari",
    bgImage: aiToolsBg
  },
  {
    id: 4,
    icon: Rocket,
    title: "🚀 The Future Called - It Wants Your Tech Roadmap!",
    subtitle: "Building Tomorrow, One Algorithm at a Time",
    description: "Chart your course to AI awesomeness! Our roadmap turns complex tech evolution into a fun journey - like GPS for your digital transformation (but way cooler).",
    ctaPrimary: "Technology Roadmap",
    ctaSecondary: "Launch Mission",
    bgImage: techRoadmapBg
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

          {/* Animated Genie Character with Magical Fumes */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img 
                src={genieAnimated} 
                alt="Genie AI Technology Navigator" 
                className="w-48 h-48 lg:w-64 lg:h-64 animate-bounce-gentle object-contain relative z-10"
              />
              
              {/* Magical Fumes Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Floating magical particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-genie-cyan/60 rounded-full animate-float-particles"
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  />
                ))}
                
                {/* Swirling fumes */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-genie-primary/40 rounded-full animate-smoke blur-sm" />
                  <div className="w-6 h-6 bg-genie-teal/30 rounded-full animate-smoke blur-sm" style={{ animationDelay: '1s' }} />
                  <div className="w-4 h-4 bg-genie-cyan/20 rounded-full animate-smoke blur-sm" style={{ animationDelay: '2s' }} />
                </div>
              </div>
              
              {/* Glowing Aura */}
              <div className="absolute inset-0 w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-genie-cyan/20 blur-xl animate-pulse-glow" />
              
              {/* Magic Circle */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-genie-primary/10 rounded-full blur-md animate-pulse" />
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