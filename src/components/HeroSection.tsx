import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Zap, Target } from "lucide-react";
import heroBackground from "@/assets/hero-ai-background.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-background/80 neural-pattern" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent">
                Genie AI
              </span>
              <br />
              <span className="text-foreground">Experimentation</span>
              <br />
              <span className="text-primary animate-pulse-glow">HUB</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transform your development workflow with AI-accelerated solutions. 
              From curiosity to reality - building the future of intelligent development.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all ai-glow">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">AI-Driven Innovation</h3>
              </div>
              <p className="text-muted-foreground">
                Harness the power of LLMs, agentic AI, and intelligent automation
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-ai-secondary/20 hover:border-ai-secondary/40 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <Zap className="h-8 w-8 text-ai-secondary" />
                <h3 className="text-lg font-semibold">Rapid Experimentation</h3>
              </div>
              <p className="text-muted-foreground">
                From concept to deployment in weeks, not months
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-ai-accent/20 hover:border-ai-accent/40 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <Target className="h-8 w-8 text-ai-accent" />
                <h3 className="text-lg font-semibold">Enterprise Ready</h3>
              </div>
              <p className="text-muted-foreground">
                Security, governance, and scalability built-in
              </p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg ai-glow">
              Explore the Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary text-foreground px-8 py-4 text-lg">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-ai-secondary rounded-full animate-pulse opacity-40" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-ai-accent rounded-full animate-pulse opacity-50" />
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-primary rounded-full animate-pulse opacity-30" />
    </section>
  );
};