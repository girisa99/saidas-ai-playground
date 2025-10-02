import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, TrendingUp, Shield, Brain, Zap, Database, Target, Award, Rocket, ArrowRight, Book, Map, Sparkles, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { VisualTextBlock } from "./VisualTextBlock";
import healthcareImpact from "@/assets/healthcare-solutions-impact.png";

export const ValueProposition = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simplified Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 px-2">
            Strategic AI Implementation Framework
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
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

        {/* Enhanced Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-5xl mx-auto px-2">
          <Card className="text-center p-4 sm:p-6 bg-gradient-to-br from-genie-primary/5 to-genie-primary/10 border-genie-primary/20 hover:shadow-lg transition-all duration-300">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 bg-genie-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-genie-primary" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-genie-primary mb-1 sm:mb-2">70%</div>
            <div className="text-xs sm:text-sm font-medium text-foreground mb-0.5 sm:mb-1">Business Value</div>
            <div className="text-fluid-xs text-muted-foreground">Average Increase</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-genie-secondary/5 to-genie-secondary/10 border-genie-secondary/20 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-genie-secondary/10 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-genie-secondary" />
            </div>
            <div className="text-3xl font-bold text-genie-secondary mb-2">$1.3B</div>
            <div className="text-sm font-medium text-foreground mb-1">Market Size</div>
            <div className="text-xs text-muted-foreground">Global AI Revenue</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-genie-accent/5 to-genie-accent/10 border-genie-accent/20 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-genie-accent/10 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-genie-accent" />
            </div>
            <div className="text-3xl font-bold text-genie-accent mb-2">25%</div>
            <div className="text-sm font-medium text-foreground mb-1">Productivity</div>
            <div className="text-xs text-muted-foreground">Performance Boost</div>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-genie-primary/5 to-genie-accent/5 border-genie-primary/20 hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-genie-primary/10 to-genie-accent/10 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-3xl font-bold text-genie-primary mb-2">88%</div>
            <div className="text-sm font-medium text-foreground mb-1">Executive Buy-in</div>
            <div className="text-xs text-muted-foreground">Leadership Support</div>
          </Card>
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

        {/* Enhanced Technology Highlights */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <VisualTextBlock
            badge="AI CORE"
            title="Advanced AI & LLMs"
            subtitle="Next-Gen Intelligence"
            description="Multi-agent systems powered by GPT-4, Claude 3, and autonomous reasoning capabilities for enterprise-scale decision making."
            highlights={[
              "Multi-modal AI processing",
              "Real-time learning systems",
              "Custom model fine-tuning"
            ]}
            icon={<Brain className="h-6 w-6" />}
            variant="gradient"
          />

          <VisualTextBlock
            badge="INFRASTRUCTURE"
            title="Enterprise Cloud"
            subtitle="Scalable & Secure"
            description="Production-ready architecture with Docker, Kubernetes, and Supabase delivering 99.9% uptime and enterprise security."
            highlights={[
              "Auto-scaling infrastructure",
              "Zero-downtime deployments", 
              "Multi-region redundancy"
            ]}
            icon={<Database className="h-6 w-6" />}
            variant="default"
          />

          <VisualTextBlock
            badge="SECURITY"
            title="Compliance Ready"
            subtitle="Enterprise Grade"
            description="Advanced RAG implementation achieving 94% accuracy with comprehensive security frameworks and audit trails."
            highlights={[
              "HIPAA/GDPR compliance",
              "End-to-end encryption",
              "Advanced threat detection"
            ]}
            icon={<Shield className="h-6 w-6" />}
            variant="accent"
          />
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