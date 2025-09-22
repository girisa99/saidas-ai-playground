import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Briefcase, GraduationCap, Brain } from "lucide-react";

export const TrustSection = () => {
  const features = [
    {
      icon: Briefcase,
      title: "AI Strategy Consulting",
      description: "Expert guidance on AI implementation roadmaps",
      highlight: "Strategic Planning"
    },
    {
      icon: Award,
      title: "Proof of Concept Development",
      description: "Rapid prototyping and validation of AI solutions",
      highlight: "MVP Development"
    },
    {
      icon: Brain,
      title: "Healthcare-Focused AI",
      description: "Specialized solutions for healthcare organizations",
      highlight: "Domain Expertise"
    },
    {
      icon: GraduationCap,
      title: "Training & Workshops",
      description: "Upskill your team with hands-on AI training",
      highlight: "Knowledge Transfer"
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
            A specialized consulting platform that helps healthcare organizations and enterprises 
            experiment with, implement, and scale AI solutions. We bridge the gap between AI potential 
            and practical healthcare applications through expert guidance and hands-on experimentation.
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

        {/* Security & Compliance */}
        <div className="text-center">
          <Card className="p-8 bg-primary/5 border border-primary/20">
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-semibold">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-semibold">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="font-semibold">Enterprise Security</span>
              </div>
            </div>
            <p className="text-muted-foreground">
              Your data privacy and security are paramount. All implementations follow healthcare industry standards.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};