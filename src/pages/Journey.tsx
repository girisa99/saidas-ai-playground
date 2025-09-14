import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Users, Lightbulb, Cog, Rocket, Target, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Journey = () => {
  useEffect(() => {
    document.title = "Our Journey - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover the journey behind Genie AI Experimentation HUB - from concept to enterprise AI transformation platform.');
    }
  }, []);

  const milestones = [
    {
      year: "The Spark",
      phase: "Discovery",
      icon: Lightbulb,
      title: "The Conversation That Changed Everything",
      description: "A typical Tuesday afternoon coffee with my colleague Prashant sparked a revolutionary question: 'What if AI didn't just assist us, but truly transformed how we built solutions from the ground up?' That single question hit me like lightning.",
      achievements: [
        "Initial curiosity ignited by transformative conversation",
        "Recognized profound shift beyond incremental innovation", 
        "Committed to personal quest for AI-driven development"
      ],
      color: "genie-primary"
    },
    {
      year: "Foundation",
      phase: "AI Engine Exploration", 
      icon: Cog,
      title: "Building My Personal AI Laboratory",
      description: "Established my personal AI experimentation hub with intensive exploration of foundational AI models - OpenAI's GPT series, Anthropic's Claude, and Google's Gemini. This involved countless hours of prompt engineering and analyzing output quality.",
      achievements: [
        "Systematically experimented with major LLMs",
        "Discovered nuances of each model's architecture",
        "Developed prompt engineering expertise"
      ],
      color: "genie-teal"
    },
    {
      year: "Visualization", 
      phase: "Conceptualization",
      icon: Target,
      title: "Mapping Complex AI Architectures",
      description: "Overcame the complexity challenge through visualization tools like Visio, draw.io, Miro, and Figma. These became my trusted companions, transforming abstract AI concepts into tangible plans and making navigation through the intellectual complexity achievable.",
      achievements: [
        "Mastered AI workflow visualization techniques",
        "Transformed abstract concepts into actionable plans",
        "Built foundation for systematic experimentation"
      ],
      color: "genie-cyan"
    },
    {
      year: "Infrastructure",
      phase: "Development",
      icon: Rocket,
      title: "Building Unshakeable Foundations",
      description: "Focused on building robust infrastructure using Cursor IDE, Replit, Docker, V0 by Vercel, and frameworks like Bolt, Loveable, and Solid with TypeScript. Established Supabase and PostgreSQL for data management with GitHub integrations.",
      achievements: [
        "Established versatile development environments",
        "Mastered containerization with Docker",
        "Built scalable TypeScript-based architecture"
      ],
      color: "genie-primary"
    },
    {
      year: "Resilience",
      phase: "Advanced Systems",
      icon: TrendingUp,
      title: "Building Resilient AI Systems",
      description: "Tackled critical challenges: single source of truth architecture, duplicate detection, hallucination reduction, and multi-tenant stability. Implemented robust change protection mechanisms and external integrations with DocuSign and Twilio.",
      achievements: [
        "Solved data consistency and noise problems",
        "Implemented hallucination reduction techniques", 
        "Built multi-tenant environment stability"
      ],
      color: "genie-teal"
    },
    {
      year: "Agentic AI",
      phase: "Revolution",
      icon: Award,
      title: "Multi-Agent Platform Innovation",
      description: "Achieved breakthrough in agentic AI by building a dynamic multi-agent platform where AI agents are generated and orchestrated on-the-fly through intelligent prompt engineering. Real-time workflow configuration with specialized agents working in perfect concert.",
      achievements: [
        "Built dynamic agent creation system",
        "Achieved seamless multi-agent orchestration",
        "Demonstrated real-world healthcare solutions at lightning speed"
      ],
      color: "genie-cyan"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-genie-dark via-genie-navy to-genie-primary/20 text-white overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-genie-cyan/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-4xl">
            <Badge className="bg-genie-primary/20 text-genie-cyan border-genie-cyan/30 mb-4">
              Our Journey
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              From Vision to <span className="text-genie-cyan">Reality</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              The chronological adventure through technical discoveries, unexpected hurdles, pivotal 'aha moments', 
              and where this incredible journey of methodical AI experimentation is still heading.
            </p>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                My AI Journey: From Curiosity to Breakthrough
              </h2>
              <p className="text-xl text-muted-foreground">
                The methodical experimentation journey that transformed how I build intelligent solutions
              </p>
            </div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="hidden lg:flex items-center justify-center w-4 h-4 bg-genie-primary rounded-full relative">
                      <div className="absolute w-8 h-8 bg-genie-primary/20 rounded-full animate-pulse" />
                    </div>
                    
                    {/* Content card */}
                    <Card className={`flex-1 p-8 border-${milestone.color}/20 bg-gradient-to-br from-${milestone.color}/5 to-${milestone.color}/10`}>
                      <div className="flex items-start gap-6">
                        <div className={`p-4 bg-${milestone.color}/10 rounded-lg`}>
                          <IconComponent className={`w-8 h-8 text-${milestone.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <Badge variant="outline" className={`border-${milestone.color} text-${milestone.color}`}>
                              {milestone.year}
                            </Badge>
                            <Badge className={`bg-${milestone.color}/20 text-${milestone.color}`}>
                              {milestone.phase}
                            </Badge>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-foreground mb-3">
                            {milestone.title}
                          </h3>
                          
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {milestone.description}
                          </p>
                          
                          <div>
                            <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                            <ul className="space-y-2">
                              {milestone.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                  <div className={`w-2 h-2 bg-${milestone.color} rounded-full`} />
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-gradient-to-b from-genie-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                My Impact Today
              </h2>
              <p className="text-xl text-muted-foreground">
                The tangible results of my experimentation journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-primary mb-2">20+</div>
                <div className="text-muted-foreground">AI Tools Mastered</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-teal mb-2">45+</div>
                <div className="text-muted-foreground">Days of Intensive Learning</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-cyan mb-2">3</div>
                <div className="text-muted-foreground">Major LLMs Explored</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-genie-primary mb-2">Healthcare</div>
                <div className="text-muted-foreground">Real-World Solutions</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Ready to Join My Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Explore the methodologies, learn from my experiments, and start your own AI experimentation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                  Explore My Solutions
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-genie-primary text-genie-primary hover:bg-genie-primary/10 px-8 py-4">
                Connect With Me
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Journey;