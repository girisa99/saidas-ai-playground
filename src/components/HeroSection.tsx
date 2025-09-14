import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Zap, Target } from "lucide-react";
import heroBackground from "@/assets/hero-ai-background.jpg";

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-24 lg:py-32">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Genie AI Experimentation HUB
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
            Strategic AI implementation and enterprise transformation solutions. 
            Empowering organizations to harness AI's full potential through proven frameworks and expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
              View Research
            </Button>
          </div>
        </div>
      </div>
      
      {/* Professional Stats/Highlights */}
      <div className="mt-16 border-t border-white/20 pt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-blue-100">Years in Technology</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">AI Implementations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Enterprise</div>
              <div className="text-blue-100">Scale Solutions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};