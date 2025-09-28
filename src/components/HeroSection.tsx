import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Zap, Target, BookOpen, User, Lightbulb, Wrench, Map } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-ai-background.jpg";

export const HeroSection = () => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            Genie AI Experimentation HUB
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-primary-foreground/90 mb-6 sm:mb-8 leading-relaxed">
            Strategic AI implementation and enterprise transformation solutions. 
            Empowering organizations to harness AI's full potential through proven frameworks and expert guidance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold"
              asChild
            >
              <Link to="/journey">
                <Map className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                AI Journey
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold"
              asChild
            >
              <Link to="/about">
                <User className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                My Story
              </Link>
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold"
              asChild
            >
              <Link to="/technology">
                <Wrench className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                AI Tools
              </Link>
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-semibold"
              asChild
            >
              <Link to="/case-studies">
                <Lightbulb className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Professional Stats/Highlights */}
      <div className="mt-12 sm:mt-16 border-t border-primary-foreground/20 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">15+</div>
              <div className="text-primary-foreground/80 text-sm sm:text-base">Years in Technology</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">10+</div>
              <div className="text-primary-foreground/80 text-sm sm:text-base">AI Tools Integrated</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-2">Enterprise</div>
              <div className="text-primary-foreground/80 text-sm sm:text-base">Scale Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};