import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Rocket, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const StorySection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-genie-dark/5 to-background">
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

        {/* Story Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Main Story Card */}
          <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-genie-teal/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-genie-primary/10 rounded-lg">
                <Rocket className="w-6 h-6 text-genie-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">The Genesis</h3>
                <p className="text-muted-foreground">Where innovation meets experimentation</p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-6">
              21+ years in healthcare technology led to a pivotal realization: AI could revolutionize not just digital health, 
              but fundamentally transform how we approach complex business challenges across healthcare and enterprise systems. 
              This isn't about replacing human expertise—it's about amplifying our capacity to solve previously impossible problems.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Through systematic 6-month experimentation journey, I've developed breakthrough frameworks that transform AI concepts 
              into practical solutions: from patient management systems to manufacturing workflows, achieving 300% ROI and 
              demonstrating real-world healthcare impact at enterprise scale.
            </p>
          </Card>

          {/* Vision Card */}
          <Card className="p-8 border-genie-teal/20 bg-gradient-to-br from-genie-teal/5 to-genie-cyan/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-genie-teal/10 rounded-lg">
                <Users className="w-6 h-6 text-genie-teal" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">My Vision</h3>
                <p className="text-muted-foreground">Democratizing AI through personal experimentation</p>
              </div>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-6">
              The breakthrough came when I witnessed AI experimentation translate directly into solving real-world business challenges. 
              From mastering 15+ AI models to building dynamic multi-agent systems—traditional development barriers were not just dissolving, 
              they were being revolutionized through systematic innovation.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              This hub documents my journey from AI curiosity to enterprise-grade solutions: achieving 94% accuracy through RAG architecture, 
              building patient management systems, treatment center workflows, and demonstrating measurable healthcare transformation—
              making advanced AI accessible and practical for business leaders.
            </p>
          </Card>
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