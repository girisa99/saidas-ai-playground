import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Briefcase, GraduationCap, Brain } from "lucide-react";

export const TrustSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Experimentation",
      description: "Hands-on exploration of cutting-edge AI technologies",
      highlight: "Learning by Doing",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-purple-600/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-600",
      badgeVariant: "default" as const
    },
    {
      icon: Award,
      title: "Knowledge Sharing",
      description: "Documenting learnings and insights from AI experiments",
      highlight: "Open Learning",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-blue-600/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-600",
      badgeVariant: "secondary" as const
    },
    {
      icon: Briefcase,
      title: "Healthcare Focus",
      description: "Exploring AI applications in healthcare contexts",
      highlight: "Domain Passion",
      bgColor: "bg-gradient-to-br from-green-500/10 to-green-600/20",
      borderColor: "border-green-500/30",
      iconColor: "text-green-600",
      badgeVariant: "outline" as const
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Always exploring new AI tools, models, and techniques",
      highlight: "Growth Mindset",
      bgColor: "bg-gradient-to-br from-orange-500/10 to-orange-600/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-600",
      badgeVariant: "destructive" as const
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
                <Card key={index} className={`p-6 text-center border ${feature.borderColor} ${feature.bgColor} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  <div className={`${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <Badge variant={feature.badgeVariant} className="mb-3">
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