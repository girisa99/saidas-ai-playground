import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Lightbulb, Rocket, Users } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About the <span className="text-primary">Visionary</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet the mind behind the AI Experimentation Hub - a journey from curiosity to transformational impact
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Journey */}
          <Card className="p-8 h-full bg-card/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold">Saidas - AI Innovation Leader</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  25+ years in healthcare technology culminated in a transformative realization: 
                  AI could revolutionize how we approach digital health, therapeutic innovation, 
                  and patient care solutions from the ground up.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-ai-secondary" />
                  The Spark of Discovery
                </h4>
                <p className="text-muted-foreground">
                  This sparked an intensive exploration into AI's potential for healthcare transformation. 
                  What began as process optimization evolved into revolutionary approaches to digital 
                  therapeutics and enterprise health solutions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-ai-accent" />
                  The Breakthrough Moment
                </h4>
                <p className="text-muted-foreground">
                  The breakthrough: AI could empower healthcare professionals and business users directly. 
                  This became about democratizing health innovation and making advanced AI accessible 
                  to those closest to patient care.
                </p>
              </div>
            </div>
          </Card>

          {/* Journey Highlights */}
          <div className="space-y-6">
            {/* AI Innovation & Knowledge Sharing - Top Position */}
            <Card className="p-6 bg-gradient-to-r from-genie-accent/10 to-genie-teal/10 border-genie-accent/20">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="h-8 w-8 text-genie-accent" />
                <div>
                  <h4 className="font-bold text-xl text-genie-accent">AI Innovation & Knowledge Sharing</h4>
                  <p className="text-sm text-muted-foreground">GenieAI Experimentation Hub • Personal Initiative</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-sm mb-2 flex items-center">
                    <Rocket className="h-4 w-4 mr-2 text-genie-accent" />
                    Focus Areas
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Democratizing AI possibilities through practical experimentation and knowledge sharing
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-sm mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-genie-accent" />
                    Key Achievements
                  </h5>
                  <p className="text-muted-foreground text-sm">
                    Creating comprehensive AI application frameworks demonstrating healthcare transformation potential
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-sm mb-2 flex items-center">
                    <Rocket className="h-4 w-4 mr-2 text-genie-accent" />
                    2 Live Implementations Launched
                  </h5>
                  <p className="text-muted-foreground text-sm mb-3">
                    <strong>1) GenieAI Experimentation Hub Site:</strong> Knowledge sharing platform with framework documentation and business use cases.<br/>
                    <strong>2) Genie Conversation Feature:</strong> Advanced conversational AI with 80+ knowledge contexts, split-screen mode, and multi-model intelligence. Production-ready with 1,000 concurrent conversations capacity, {"<"}2.5s response time, and 99.9% uptime.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">2 Live Features</Badge>
                    <Badge variant="secondary" className="text-xs">10+ In Pipeline</Badge>
                    <Badge variant="secondary" className="text-xs">Production Ready</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-primary/10 to-ai-secondary/10 border-primary/20">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-primary" />
                Value-Driven Experimentation Framework
              </h4>
              <p className="text-muted-foreground mb-4">
                Systematic approach turning curiosity into proven value through rigorous experimentation and validation. 
                <strong>2 live implementations launched</strong> with <strong>10+ experiments across pipeline</strong> demonstrating measurable business impact.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">2 Live Features</Badge>
                <Badge variant="secondary">10+ Experiments</Badge>
                <Badge variant="secondary">Proven Value Creation</Badge>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-r from-ai-secondary/10 to-ai-accent/10 border-ai-secondary/20">
              <h4 className="font-bold text-lg mb-4">Technology Stack Mastery</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">AI Platforms:</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p>• OpenAI GPT Series</p>
                    <p>• Anthropic Claude</p>
                    <p>• Google Gemini</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Development:</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p>• TypeScript/React</p>
                    <p>• Node.js/NestJS</p>
                    <p>• PostgreSQL/pgvector</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-r from-ai-accent/10 to-primary/10 border-ai-accent/20">
              <h4 className="font-bold text-lg mb-4">Personal Impact</h4>
              <div className="space-y-3 text-muted-foreground">
                <p>• Accelerated personal development by 40-60%</p>
                <p>• Built AI expertise that sets you apart</p>
                <p>• Enabled autonomous learning and innovation</p>
                <p>• Created secure, scalable personal AI projects</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};