import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Cpu, 
  Network, 
  Zap, 
  Rocket, 
  Sparkles,
  ArrowRight,
  Clock,
  TrendingUp,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

export const AIEvolutionTimeline = () => {
  const aiEvolution = [
    {
      period: "1950s-1970s",
      title: "Foundations",
      description: "Early theories, problem-solving, and symbolic AI",
      examples: "ELIZA, General Problem Solver",
      icon: Brain,
      color: "genie-primary",
      impact: "Conceptual frameworks established"
    },
    {
      period: "1980s-1990s", 
      title: "Expert Systems",
      description: "Rise of specialized AI for diagnosis and configuration",
      examples: "MYCIN, XCON for medical diagnosis",
      icon: Cpu,
      color: "genie-teal",
      impact: "First practical applications"
    },
    {
      period: "2000s",
      title: "Machine Learning",
      description: "Statistical methods, SVMs, and early neural networks",
      examples: "Spam filtering, recommendation systems",
      icon: Network,
      color: "genie-cyan",
      impact: "Consumer-facing AI emerges"
    },
    {
      period: "2010s",
      title: "Deep Learning",
      description: "Vast datasets, GPUs, and advanced neural networks",
      examples: "Computer vision, NLP breakthroughs",
      icon: Zap,
      color: "genie-primary",
      impact: "AI performance surpasses humans"
    },
    {
      period: "2020s",
      title: "Generative AI & LLMs",
      description: "Groundbreaking models enabling content creation",
      examples: "GPT, Gemini, Claude - Conversational AI",
      icon: Sparkles,
      color: "genie-teal",
      impact: "Democratization of AI power"
    },
    {
      period: "2025+",
      title: "Agentic AI Revolution",
      description: "Multi-agent systems with autonomous reasoning",
      examples: "Dynamic orchestration, enterprise automation",
      icon: Rocket,
      color: "genie-cyan",
      impact: "AI transforms business operations"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-genie-dark/5 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Clock className="w-4 h-4 mr-2" />
            AI Evolution Journey
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            The AI Journey: <span className="text-genie-primary">From Vision to Value</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Understanding AI's evolutionary path helps us appreciate the revolutionary moment we're experiencing today - 
            where generative AI and agentic systems are delivering immediate business growth and unprecedented opportunities.
          </p>
        </div>

        {/* Evolution Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-genie-primary via-genie-teal to-genie-cyan transform -translate-x-1/2 opacity-30" />
          
          <div className="space-y-12">
            {aiEvolution.map((era, index) => {
              const IconComponent = era.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8`}>
                  {/* Timeline dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-background border-4 border-genie-primary rounded-full items-center justify-center shadow-lg z-10">
                    <IconComponent className={`w-8 h-8 text-${era.color}`} />
                  </div>
                  
                  {/* Content card */}
                  <Card className={`flex-1 p-8 border-${era.color}/20 bg-gradient-to-br from-${era.color}/5 to-background hover:shadow-xl transition-all duration-300 hover:scale-105 group`}>
                    <div className="flex items-start gap-6">
                      <div className={`lg:hidden p-4 bg-${era.color}/10 rounded-xl`}>
                        <IconComponent className={`w-8 h-8 text-${era.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className={`bg-${era.color}/20 text-${era.color} border-${era.color}/30 font-bold text-lg px-4 py-2`}>
                            {era.period}
                          </Badge>
                          <h3 className={`text-2xl font-bold text-${era.color}`}>
                            {era.title}
                          </h3>
                        </div>
                        
                        <p className="text-foreground text-lg mb-4">
                          {era.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-semibold text-muted-foreground mb-2">Key Examples:</h4>
                            <p className="text-sm text-muted-foreground italic">
                              {era.examples}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-muted-foreground mb-2">Impact:</h4>
                            <p className="text-sm text-muted-foreground italic">
                              {era.impact}
                            </p>
                          </div>
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="flex items-center gap-2 mt-4">
                          <div className={`h-2 bg-${era.color}/20 rounded-full flex-1`}>
                            <div 
                              className={`h-full bg-${era.color} rounded-full transition-all duration-1000 group-hover:w-full`}
                              style={{ width: `${((index + 1) / aiEvolution.length) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-medium text-${era.color}`}>
                            {Math.round(((index + 1) / aiEvolution.length) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current State Highlight */}
        <Card className="mt-16 p-8 border-genie-primary/20 bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-16 h-16 bg-genie-primary/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-genie-primary" />
              </div>
              <div className="w-16 h-16 bg-genie-teal/20 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-genie-teal" />
              </div>
              <div className="w-16 h-16 bg-genie-cyan/20 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-genie-cyan" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Where We Are Today: The AI Transformation Moment
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-genie-primary mb-2">150-300%</div>
                <div className="text-sm font-medium text-foreground">Average ROI</div>
                <div className="text-xs text-muted-foreground">Within 12-18 months</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-genie-teal mb-2">60%</div>
                <div className="text-sm font-medium text-foreground">Automated Processes</div>
                <div className="text-xs text-muted-foreground">Reducing operational costs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-genie-cyan mb-2">25%</div>
                <div className="text-sm font-medium text-foreground">Decision Accuracy</div>
                <div className="text-xs text-muted-foreground">Improvement via AI insights</div>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-3xl mx-auto mb-6">
              AI's rapid evolution, especially with generative models, now delivers immediate business growth and new opportunities. 
              This is the defining moment for organizations to embrace AI-driven transformation or risk being left behind.
            </p>
            
            <Link to="/journey">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                Explore My Personal AI Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
};