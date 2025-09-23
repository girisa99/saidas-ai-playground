import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, TrendingUp, Shield, Brain, Zap, Database, Target, Award, Rocket, ArrowRight, Book, Map } from "lucide-react";
import { Link } from "react-router-dom";
import healthcareImpact from "@/assets/healthcare-solutions-impact.png";

export const ValueProposition = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Simplified Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Strategic AI Implementation Framework
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Transform your organization with our proven 4-phase AI implementation roadmap. 
            From assessment to full transformation in 6 months.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link to="/journey">
                <Map className="mr-2 h-5 w-5" />
                Explore the Journey
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/technology">
                <Book className="mr-2 h-5 w-5" />
                Technology Stack
              </Link>
            </Button>
          </div>
        </div>

        {/* Compact Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-genie-primary mb-1">70%</div>
            <div className="text-sm text-muted-foreground">Business Value Increase</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-genie-teal mb-1">$1.3B</div>
            <div className="text-sm text-muted-foreground">Global AI Market</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-genie-cyan mb-1">25%</div>
            <div className="text-sm text-muted-foreground">Productivity Boost</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-2xl font-bold text-genie-primary mb-1">88%</div>
            <div className="text-sm text-muted-foreground">Executive Agreement</div>
          </div>
        </div>


        {/* Streamlined Implementation Overview */}
        <Card className="p-8 mb-12 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5 border-genie-primary/20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Implementation Steps */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">4-Phase Implementation Roadmap</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-genie-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Assess & Plan</h4>
                    <p className="text-sm text-muted-foreground">Evaluate current capabilities and opportunities</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-genie-teal text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Pilot & Validate</h4>
                    <p className="text-sm text-muted-foreground">Test AI concepts with focused experiments</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-genie-cyan text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Scale & Integrate</h4>
                    <p className="text-sm text-muted-foreground">Expand successful solutions across operations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-genie-primary text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-foreground">Transform & Innovate</h4>
                    <p className="text-sm text-muted-foreground">Build AI-first culture for continuous innovation</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right - Key Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">Strategic Benefits</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-genie-primary" />
                  <span className="text-sm font-medium">Rapid Innovation</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-genie-teal" />
                  <span className="text-sm font-medium">Competitive Edge</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-genie-cyan" />
                  <span className="text-sm font-medium">Business Value</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-genie-primary" />
                  <span className="text-sm font-medium">Risk Mitigation</span>
                </div>
              </div>
              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link to="/journey">
                    Learn More About Our Approach
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Technology Highlights */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-genie-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-genie-primary" />
              </div>
              <h3 className="font-semibold text-genie-primary">Advanced AI & LLMs</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Multi-agent systems with GPT-4, Claude 3, and autonomous reasoning capabilities.
            </p>
            <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
              <Link to="/technology" className="text-genie-primary hover:text-genie-primary/80">
                Learn More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 border-genie-teal/20 hover:border-genie-teal/40 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-genie-teal/10 rounded-lg">
                <Database className="h-6 w-6 text-genie-teal" />
              </div>
              <h3 className="font-semibold text-genie-teal">Enterprise Infrastructure</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Docker, Kubernetes, Supabase with enterprise-grade scalability and security.
            </p>
            <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
              <Link to="/technology" className="text-genie-teal hover:text-genie-teal/80">
                Learn More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </Card>

          <Card className="p-6 border-genie-cyan/20 hover:border-genie-cyan/40 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-genie-cyan/10 rounded-lg">
                <Shield className="h-6 w-6 text-genie-cyan" />
              </div>
              <h3 className="font-semibold text-genie-cyan">Security & Compliance</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Advanced RAG implementation with 94% accuracy and enterprise security frameworks.
            </p>
            <Button asChild variant="ghost" size="sm" className="p-0 h-auto">
              <Link to="/technology" className="text-genie-cyan hover:text-genie-cyan/80">
                Learn More <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </Card>
        </div>

        {/* Success Stories Preview */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5 border-genie-primary/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">Real-World Impact</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From healthcare transformation to enterprise AI strategy, see how our framework delivers measurable results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-genie-primary mb-2">150-300%</div>
              <div className="text-sm font-medium text-foreground mb-1">ROI Achievement</div>
              <div className="text-xs text-muted-foreground">Within 12-18 months</div>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border">
              <div className="text-3xl font-bold text-genie-teal mb-2">94%</div>
              <div className="text-sm font-medium text-foreground mb-1">Accuracy Rate</div>
              <div className="text-xs text-muted-foreground">RAG implementation</div>
            </div>
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline">
              <Link to="/case-studies">
                View Detailed Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

      </div>
    </section>
  );
};