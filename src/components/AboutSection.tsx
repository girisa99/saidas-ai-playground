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
                  Two decades in technology led to a pivotal conversation with my brilliant colleague Prashant, 
                  who posed a transformative question: <em>"What if AI didn't just assist us, but truly transformed 
                  how we built solutions from the ground up?"</em>
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-ai-secondary" />
                  The Spark of Discovery
                </h4>
                <p className="text-muted-foreground">
                  That question ignited a deep, buzzing curiosity that pulled me into a personal quest 
                  to uncover the revolutionary power of AI in development. What began as focused exploration 
                  into streamlining daily processes evolved into something far more profound.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-ai-accent" />
                  The Breakthrough Moment
                </h4>
                <p className="text-muted-foreground">
                  The real shift happened when I discovered AI's potential to empower business users directly—not just developers. 
                  This wasn't about efficiency anymore; it was about unleashing innovation across entire enterprises.
                </p>
              </div>
            </div>
          </Card>

          {/* Journey Highlights */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-ai-secondary/10 border-primary/20">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2 text-primary" />
                45+ Days of Intensive Learning
              </h4>
              <p className="text-muted-foreground mb-4">
                Dedicated intensive exploration bringing entire development environments to stable, 
                reliable states through systematic experimentation.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">LLM Experimentation</Badge>
                <Badge variant="secondary">Prompt Engineering</Badge>
                <Badge variant="secondary">AI Architecture</Badge>
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
              <h4 className="font-bold text-lg mb-4">Enterprise Impact</h4>
              <div className="space-y-3 text-muted-foreground">
                <p>• Accelerated application development by 40-60%</p>
                <p>• Reduced operational costs by 60-80%</p>
                <p>• Enabled autonomous business user innovation</p>
                <p>• Built secure, scalable AI governance frameworks</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};