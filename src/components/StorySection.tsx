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
            Born from my curiosity and driven by personal innovation, this journey began with a simple question: 
            "How can I bridge the gap between AI research and practical business applications?"
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
              Genie AI Experimentation HUB emerged from my years of hands-on experience in enterprise AI transformation. 
              I recognized that while AI technology was advancing rapidly, many organizations struggled to translate 
              theoretical potential into tangible business value.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              My mission became clear: create a comprehensive personal ecosystem that empowers me to experiment, learn, 
              and implement AI solutions with confidence and strategic precision, then share this knowledge with others.
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
              I envision a world where AI adoption is not limited by technical barriers or organizational silos. 
              Every individual, regardless of their technical background, should have access to AI tools and methodologies 
              that enhance their capabilities.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Through my structured experimentation, proven frameworks, and continuous learning, I'm building 
              the bridge between AI possibility and business reality, sharing insights along the way.
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