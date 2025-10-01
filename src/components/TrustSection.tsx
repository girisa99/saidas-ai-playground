import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Briefcase, GraduationCap, Brain, Shield, Rocket } from "lucide-react";

export const TrustSection = () => {
  const timelinePhases = [
    {
      phase: "Day 0-45",
      title: "Guardrails & Foundation",
      subtitle: "Building Safe Experimentation Framework",
      description: "Establish security protocols, privacy standards, and ethical AI guidelines. Create your safe playground for learning and experimentation.",
      icon: Shield,
      color: "from-purple-500/20 to-purple-500/10",
      iconBg: "bg-purple-500",
      borderColor: "border-purple-500/30",
      features: [
        "Security & privacy setup",
        "Ethical AI framework",
        "Tool evaluation criteria",
        "Safe experimentation protocols"
      ]
    },
    {
      phase: "Day 45-90",
      title: "Implementation & Results",
      subtitle: "Launching First AI Solutions",
      description: "Deploy validated experiments into production. GenieAI Hub Platform and Genie Conversation live—demonstrating the journey from learning to leadership.",
      icon: Rocket,
      color: "from-green-500/20 to-green-500/10",
      iconBg: "bg-green-500",
      borderColor: "border-green-500/30",
      features: [
        "2 Live features deployed",
        "Real user engagement",
        "Documented outcomes",
        "Change agent positioning"
      ]
    }
  ];

  const frameworkSteps = [
    {
      number: "01",
      title: "Experiment",
      subtitle: "Personal Learning & Discovery",
      description: "Build hands-on experience with AI tools through systematic experimentation. Learn what works through practical trials on your own playground.",
      icon: Brain,
      color: "from-primary/20 to-primary/10",
      iconBg: "bg-primary",
      borderColor: "border-primary/30"
    },
    {
      number: "02", 
      title: "Validate",
      subtitle: "Build Credible Expertise",
      description: "Document real results and create proven case studies. Build a track record of AI successes that establishes your credibility as an expert.",
      icon: CheckCircle,
      color: "from-green-500/20 to-green-500/10",
      iconBg: "bg-green-500",
      borderColor: "border-green-500/30"
    },
    {
      number: "03",
      title: "Lead to Deploy",
      subtitle: "Drive Implementation",
      description: "Use your validated expertise to lead and deploy real AI solutions. Guide teams through implementation using your proven knowledge and experience.",
      icon: Briefcase,
      color: "from-blue-500/20 to-blue-500/10", 
      iconBg: "bg-blue-500",
      borderColor: "border-blue-500/30"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* 90-Day Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge className="bg-genie-accent/20 text-genie-primary border-genie-accent/30 mb-4">
              <GraduationCap className="w-4 h-4 mr-2" />
              90-Day AI Democratization Journey
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              From <span className="text-purple-500">Guardrails</span> to <span className="text-green-500">Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              <strong>May 2025 Start:</strong> Anyone with a laptop can begin their AI transformation journey. Two distinct phases building foundation to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {timelinePhases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <Card key={index} className={`p-8 border-2 ${phase.borderColor} bg-gradient-to-br ${phase.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 ${phase.iconBg} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground mb-1">{phase.phase}</div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">{phase.title}</h3>
                      <p className="text-sm font-medium text-muted-foreground">{phase.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Framework Overview */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <GraduationCap className="w-4 h-4 mr-2" />
            The Framework
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">Experiment → Validate → Lead to Deploy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12">
            A proven 3-step approach that transforms individuals into AI change agents. 
            Build personal expertise through systematic experimentation, then influence organizational transformation.
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
          <h3 className="text-2xl font-bold text-center mb-8">Personal AI Leadership Development Principles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Individual Learning Approach:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Build AI capabilities through hands-on experimentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Develop expertise that makes you indispensable</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Learn from real implementations and documented outcomes</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-primary">Change Agent Benefits:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Position yourself as an AI innovation leader</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Influence organizational strategy through proven results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500"></CheckCircle>
                  <span>Stay ahead of disruption with cutting-edge skills</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};