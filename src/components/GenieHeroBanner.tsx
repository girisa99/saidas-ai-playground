import { Bot, Sparkles, ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import genieAnimated from "@/assets/genie-animated.png";

export const GenieHeroBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 border-b border-primary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left side - Genie messaging */}
          <div className="flex-1 text-center lg:text-left space-y-4 lg:space-y-6">
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-none">
                <Sparkles className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>February 2025</span>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                Genie Conversational AI
                <span className="block text-primary mt-1">
                  Your Experimentation Hub Guide
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
                The conversational engine that guides you through our 3-Phase Framework 
                (Experiment → Validate → Deploy) using Gartner value methodology to democratize AI development.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span>Guides you through Framework phases</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span>Gartner-aligned value methodology</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              >
                <Link to="/business-use-cases" className="flex items-center gap-2">
                  Experience the Framework
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-primary/30 hover:bg-primary/5"
              >
                <Link to="/journey">
                  My AI Democratization Journey
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Genie visual */}
          <div className="flex-shrink-0 lg:w-80">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <img 
                src={genieAnimated} 
                alt="Genie AI Assistant" 
                className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain mx-auto animate-float"
              />
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                <Badge variant="secondary" className="bg-background/90 text-foreground border border-primary/20">
                  <Sparkles className="w-3 h-3 mr-1 text-primary" />
                  AI-Powered Conversations
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};