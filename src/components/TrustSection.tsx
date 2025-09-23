import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Briefcase, GraduationCap, Brain } from "lucide-react";

export const TrustSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Experimentation",
      description: "Hands-on exploration of cutting-edge AI technologies",
      highlight: "Learning by Doing"
    },
    {
      icon: Award,
      title: "Knowledge Sharing",
      description: "Documenting learnings and insights from AI experiments",
      highlight: "Open Learning"
    },
    {
      icon: Briefcase,
      title: "Healthcare Focus",
      description: "Exploring AI applications in healthcare contexts",
      highlight: "Domain Passion"
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Always exploring new AI tools, models, and techniques",
      highlight: "Growth Mindset"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* What is Geni AI */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What is Geni AI Experimentation Hub?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            A personal learning space where an AI enthusiast explores, experiments with, and shares insights about 
            artificial intelligence implementation. This hub documents the journey of discovering practical AI applications, 
            with a special focus on healthcare innovations through hands-on experimentation and knowledge sharing.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 text-center border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4" />
                  <Badge variant="secondary" className="mb-3">
                    {feature.highlight}
                  </Badge>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};