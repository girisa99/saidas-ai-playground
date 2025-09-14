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
            My Story
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            What is <span className="text-genie-primary">Genie AI Experimentation HUB</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Born from a conversation with my colleague Prashant, this journey began with a transformative question: 
            "What if AI didn't just assist us, but truly transformed how we built solutions from the ground up?"
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
              What started as pure curiosity quickly transformed into an all-consuming personal mission. After two decades 
              in this industry, I thought I'd seen every innovation imaginable, but the potential of AI felt profoundly 
              different. This wasn't just about efficiency anymore; it was about unleashing innovation across the entire enterprise.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              I immediately set about establishing my own personal AI experimentation hub, involving countless hours of 
              experimentation with foundational AI models, fine-tuning, and analyzing output across diverse use cases. 
              This became my personal laboratory for methodical AI exploration and learning.
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
              I discovered the profound potential for AI to empower business users directly—not just developers—and it was 
              an absolute 'aha moment' that reshaped my entire perspective. The rigid technical barriers that once confined 
              creation to specialized developers were simply dissolving.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Through methodical experimentation with various tools and platforms, I'm building comprehensive frameworks 
              that transform abstract AI concepts into tangible, impactful solutions. This is my personal log of technical 
              exploration and the tools that enabled it.
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