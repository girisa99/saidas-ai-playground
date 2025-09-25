import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { 
  Lightbulb, 
  Code2, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  PlayCircle,
  Zap,
  Target,
  Users,
  BarChart3,
  Cog,
  Clock
} from "lucide-react";

export const DevelopmentJourneyMap = () => {
  const journeySteps = [
    {
      step: 1,
      title: "Define Idea",
      description: "Concept development and strategic planning phase",
      icon: Lightbulb,
      color: "genie-primary",
      details: [
        "AI opportunity identification",
        "Business case development", 
        "Stakeholder alignment",
        "Success metrics definition"
      ],
      duration: "1-2 weeks",
      outcome: "Clear AI strategy roadmap"
    },
    {
      step: 2,
      title: "Rapid Prototyping",
      description: "Fast iteration and proof-of-concept development",
      icon: Code2,
      color: "genie-teal",
      details: [
        "No-code/low-code implementation",
        "Core functionality validation",
        "User experience testing",
        "Technical feasibility assessment"
      ],
      duration: "2-4 weeks",
      outcome: "Working prototype with validated concepts"
    },
    {
      step: 3,
      title: "AI Integration",
      description: "Advanced AI capabilities and model integration",
      icon: Zap,
      color: "genie-cyan",
      details: [
        "LLM and agentic AI implementation",
        "RAG architecture deployment",
        "Multi-agent system orchestration",
        "Performance optimization"
      ],
      duration: "3-6 weeks", 
      outcome: "AI-powered solution with 94% accuracy"
    },
    {
      step: 4,
      title: "User Testing",
      description: "Real-world validation and iterative improvement",
      icon: Users,
      color: "genie-primary",
      details: [
        "User acceptance testing",
        "Feedback collection and analysis",
        "Performance monitoring",
        "Security validation"
      ],
      duration: "2-3 weeks",
      outcome: "User-validated, production-ready system"
    },
    {
      step: 5,
      title: "Deployment",
      description: "Enterprise-grade deployment and scaling",
      icon: Rocket,
      color: "genie-teal",
      details: [
        "Production environment setup",
        "Scalability configuration",
        "Monitoring and alerting",
        "Documentation and training"
      ],
      duration: "1-2 weeks",
      outcome: "Live system serving real users"
    },
    {
      step: 6,
      title: "Optimization",
      description: "Continuous improvement and feature enhancement",
      icon: BarChart3,
      color: "genie-cyan",
      details: [
        "Performance analytics",
        "Cost optimization",
        "Feature enhancements",
        "ROI measurement"
      ],
      duration: "Ongoing",
      outcome: "Measurable business value and ROI"
    }
  ];

  const complexToSimple = [
    {
      year: "2020",
      type: "Complex AI",
      description: "Deep expertise & coding required",
      challenges: ["Specialized knowledge needed", "High development costs", "Long implementation cycles"],
      color: "red-500"
    },
    {
      year: "2022", 
      type: "Simpler Tools",
      description: "Accessible APIs & pre-trained models",
      improvements: ["Reduced technical barriers", "Faster development", "Lower costs"],
      color: "yellow-500"
    },
    {
      year: "2024",
      type: "Instant Deployment", 
      description: "Automated pipelines, one-click solutions",
      benefits: ["Immediate deployment", "Automated scaling", "Enterprise-ready"],
      color: "green-500"
    },
    {
      year: "2025",
      type: "Conversational AI",
      description: "Natural language, no coding required",
      revolution: ["Voice-driven development", "Non-technical accessibility", "AI-powered automation"],
      color: "genie-primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* AI Evolution: Complex to Simple */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
              AI Evolution
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The AI Evolution: <span className="text-genie-primary">From Complex to Simple</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Witness the dramatic simplification of AI development - what once required deep expertise 
              now empowers everyone through intuitive, conversational interfaces.
            </p>
          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {complexToSimple.map((phase, index) => (
              <Card key={index} className={`p-6 border-${phase.color === 'genie-primary' ? 'genie-primary' : 'border'}/20 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-${phase.color === 'genie-primary' ? 'genie-primary' : 'background'}/5 to-background`}>
                <div className="text-center">
                  <Badge className={`mb-4 ${phase.color === 'genie-primary' ? 'bg-genie-primary/20 text-genie-primary border-genie-primary/30' : 'bg-gray-100 text-gray-600'}`}>
                    {phase.year}
                  </Badge>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {phase.type}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {phase.description}
                  </p>
                  
                  <div className="text-left space-y-1">
                    {phase.challenges && phase.challenges.map((item, i) => (
                      <div key={i} className="text-xs text-red-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-red-500 rounded-full" />
                        {item}
                      </div>
                    ))}
                    {phase.improvements && phase.improvements.map((item, i) => (
                      <div key={i} className="text-xs text-yellow-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                        {item}
                      </div>
                    ))}
                    {phase.benefits && phase.benefits.map((item, i) => (
                      <div key={i} className="text-xs text-green-600 flex items-center gap-2">
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        {item}
                      </div>
                    ))}
                    {phase.revolution && phase.revolution.map((item, i) => (
                      <div key={i} className="text-xs text-genie-primary flex items-center gap-2">
                        <div className="w-1 h-1 bg-genie-primary rounded-full" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Evolution Arrow */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 p-4 bg-gradient-to-r from-genie-primary/10 to-genie-teal/10 rounded-full border border-genie-primary/20">
              <span className="text-sm font-medium text-genie-primary">Evolution Direction</span>
              <ArrowRight className="w-5 h-5 text-genie-primary" />
              <span className="text-sm font-medium text-genie-teal">Increasing Accessibility</span>
            </div>
          </div>
        </div>

        {/* Development Journey Steps */}
        <div className="text-center mb-16">
          <Badge className="bg-genie-teal/20 text-genie-teal border-genie-teal/30 mb-4">
            <Cog className="w-4 h-4 mr-2" />
            Development Process
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Development & <span className="text-genie-teal">Deployment Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Systematic approach to transforming AI concepts into production-ready solutions 
            with measurable business impact and enterprise-grade reliability.
          </p>
        </div>


        {/* Journey Steps */}
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-genie-primary via-genie-teal to-genie-cyan opacity-30" />
          
          <div className="grid lg:grid-cols-3 gap-8">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <Card key={index} className={`p-8 border-${step.color}/20 hover:border-${step.color}/40 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-${step.color}/5 to-background group relative`}>
                  {/* Step number */}
                  <div className={`absolute -top-4 left-6 w-8 h-8 bg-${step.color} text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg z-10`}>
                    {step.step}
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 bg-${step.color}/10 rounded-lg`}>
                        <IconComponent className={`w-6 h-6 text-${step.color}`} />
                      </div>
                      <h3 className={`text-xl font-bold text-${step.color}`}>
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className={`w-4 h-4 text-${step.color} flex-shrink-0`} />
                          <span className="text-sm text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Duration: {step.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          <span>Step {step.step}/6</span>
                        </div>
                      </div>
                      <div className={`text-sm font-medium text-${step.color}`}>
                        Outcome: {step.outcome}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Total Timeline Summary */}
        <Card className="mt-16 p-8 border-genie-primary/20 bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Complete Development Cycle: 8-16 Weeks
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mb-6">
              <div>
                <div className="text-3xl font-bold text-genie-primary mb-2">2x</div>
                <div className="text-sm font-medium text-foreground">Faster Development</div>
                <div className="text-xs text-muted-foreground">vs traditional approaches</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-genie-teal mb-2">70%</div>
                <div className="text-sm font-medium text-foreground">Cost Reduction</div>
                <div className="text-xs text-muted-foreground">Through AI automation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-genie-cyan mb-2">94%</div>
                <div className="text-sm font-medium text-foreground">Success Rate</div>
                <div className="text-xs text-muted-foreground">Production deployments</div>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Systematic approach ensuring rapid, reliable delivery of AI solutions from concept to production, 
              with continuous optimization and measurable business impact.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};