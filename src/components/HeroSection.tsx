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
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent">
                Genie AI
              </span>
              <br />
              <span className="text-foreground">Experimentation</span>
              <br />
              <span className="text-primary">HUB</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Empowering organizations with AI-driven innovation and strategic implementation. 
              Professional expertise in enterprise AI transformation and experimentation frameworks.
            </p>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 bg-card/70 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Strategic AI Implementation</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-grade AI solutions with proven frameworks for LLMs, automation, and intelligent systems
              </p>
            </Card>
            
            <Card className="p-8 bg-card/70 backdrop-blur-sm border-border hover:border-ai-secondary/30 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-ai-secondary/10 rounded-lg">
                  <Zap className="h-7 w-7 text-ai-secondary" />
                </div>
                <h3 className="text-xl font-semibold">Accelerated Development</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Transform concepts into production-ready solutions with proven methodologies and best practices
              </p>
            </Card>
            
            <Card className="p-8 bg-card/70 backdrop-blur-sm border-border hover:border-ai-accent/30 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-ai-accent/10 rounded-lg">
                  <Target className="h-7 w-7 text-ai-accent" />
                </div>
                <h3 className="text-xl font-semibold">Enterprise Excellence</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive governance, security protocols, and scalable architecture for business success
              </p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Explore AI Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-border hover:border-primary/50 hover:bg-primary/5 text-foreground px-10 py-4 text-lg font-semibold transition-all duration-300">
              View Research Papers
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