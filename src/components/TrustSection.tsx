import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Briefcase, GraduationCap, Brain } from "lucide-react";

export const TrustSection = () => {
  const frameworkSteps = [
    {
      number: "01",
      title: "Experiment",
      subtitle: "Rapid Prototyping & Testing",
      description: "Test AI tools and frameworks quickly without long commitments. Validate concepts through hands-on experimentation with real use cases.",
      icon: Brain,
      color: "from-primary/20 to-primary/10",
      iconBg: "bg-primary",
      borderColor: "border-primary/30"
    },
    {
      number: "02", 
      title: "Validate",
      subtitle: "Real-World Business Cases",
      description: "Prove value through documented business cases and measurable outcomes. Build confidence with stakeholders through demonstrated results.",
      icon: CheckCircle,
      color: "from-green-500/20 to-green-500/10",
      iconBg: "bg-green-500",
      borderColor: "border-green-500/30"
    },
    {
      number: "03",
      title: "Deploy",
      subtitle: "Scale What Works",
      description: "Implement proven solutions at scale. Share learnings and best practices to accelerate adoption across the organization.",
      icon: Briefcase,
      color: "from-blue-500/20 to-blue-500/10", 
      iconBg: "bg-blue-500",
      borderColor: "border-blue-500/30"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Framework Overview */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            The Framework
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Experiment → Validate → Deploy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            A proven 3-step approach to AI innovation that minimizes risk while maximizing speed to value. 
            Learn from real implementations and documented failures to accelerate your AI journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {frameworkSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className={`p-8 text-center border-2 ${step.borderColor} bg-gradient-to-br ${step.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}>
                  <div className={`w-16 h-16 ${step.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-muted-foreground mb-2">{step.number}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="font-medium text-muted-foreground mb-4">{step.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Experimentation Framework Principles */}
        <div className="bg-gradient-to-r from-primary/5 to-background/50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Core Experimentation Framework Principles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Rapid Iteration Mindset:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Small, focused experiments with clear success criteria</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Fail fast and learn from each iteration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Document both successes and failures for learning</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Framework Benefits:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Reduces risk through incremental validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Builds stakeholder confidence with tangible results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Accelerates learning and knowledge transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};