import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const StorySection = () => {
  return (
    <section id="story" className="py-16 lg:py-24 bg-gradient-to-b from-genie-dark/5 to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-genie-primary/10 px-4 py-2 rounded-full text-genie-primary text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            What is Genie AI Hub?
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            AI Innovation Made <span className="text-genie-primary">Accessible</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A personal journey to democratize AI experimentation, transforming how enterprises 
            approach digital health innovation and technology solutions.
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Business Impact Card */}
          <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-genie-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div className="p-3 bg-genie-primary/10 rounded-lg">
                <Rocket className="w-6 h-6 text-genie-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Strategic Genesis</h3>
                <p className="text-muted-foreground">Accelerating innovation through AI experimentation</p>
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-primary rounded-full"></div>
                <span className="text-foreground/80">Self-service AI creation for business users</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-primary rounded-full"></div>
                <span className="text-foreground/80">Faster time-to-market for AI solutions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-primary rounded-full"></div>
                <span className="text-foreground/80">Reduced dependency on IT resources</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-primary rounded-full"></div>
                <span className="text-foreground/80">Direct access to AI insights for decision-making</span>
              </div>
            </div>
          </Card>

          {/* Technical Excellence Card */}
          <Card className="p-8 border-genie-teal/20 bg-gradient-to-br from-genie-teal/5 to-genie-cyan/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-genie-teal/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="flex items-start gap-4 mb-6 relative z-10">
              <div className="p-3 bg-genie-teal/10 rounded-lg">
                <Users className="w-6 h-6 text-genie-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Technical Vision</h3>
                <p className="text-muted-foreground">Empowering developers with AI-assisted frameworks</p>
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                <span className="text-foreground/80">AI-assisted coding for developer productivity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                <span className="text-foreground/80">Standardized development frameworks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                <span className="text-foreground/80">Enhanced security through built-in governance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-genie-teal rounded-full"></div>
                <span className="text-foreground/80">Scalable infrastructure for enterprise deployment</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Market Opportunity Section */}
        <div className="bg-gradient-to-r from-genie-primary/10 to-genie-teal/10 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Why AI Experimentation Hub Now?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Strategic AI integration is no longer optional. The competitive edge demands rapid AI adoption.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-genie-primary" />
                Seizing Market Opportunity
              </h4>
              <div className="space-y-3">
                {[
                  "Operational Efficiency: Automate tasks & optimize workflows",
                  "Enhanced Decision-Making: Data-driven strategic insights",
                  "New Revenue Streams: Innovative AI-powered products",
                  "Superior Customer Experience: Personalized interactions"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-genie-primary rounded-full mt-2"></div>
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Rocket className="w-5 h-5 text-genie-teal" />
                Competitive Advantage
              </h4>
              <div className="space-y-3">
                {[
                  "Accelerated Innovation: Rapid AI prototype deployment",
                  "Data-Driven Edge: Leverage proprietary data capabilities",
                  "Talent Attraction: Leading AI development positioning",
                  "Industry Leadership: Define standards & disrupt markets"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-genie-teal rounded-full mt-2"></div>
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-genie-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-genie-primary" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Experimentation First</h4>
            <p className="text-muted-foreground">
              I believe in learning through doing. Every AI initiative starts with controlled experimentation.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-genie-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-genie-teal" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Human-Centered</h4>
            <p className="text-muted-foreground">
              Technology serves people. My solutions enhance human capabilities rather than replace them.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-genie-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-genie-cyan" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Scalable Impact</h4>
            <p className="text-muted-foreground">
              From proof-of-concept to enterprise deployment, I ensure solutions grow with evolving needs.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to explore the complete journey behind my AI experimentation platform?
          </p>
          <Link to="/journey">
            <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4 text-lg font-semibold genie-glow">
              Discover My Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};