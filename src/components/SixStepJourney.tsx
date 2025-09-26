import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  BarChart3, 
  Lightbulb, 
  Scale, 
  Target, 
  Rocket,
  ArrowDown,
  CheckCircle
} from "lucide-react";

export const SixStepJourney = () => {
  const steps = [
    {
      number: 1,
      title: "Listen & Sense",
      description: "Understanding stakeholder priorities and market demands",
      icon: Eye,
      color: "blue",
      details: [
        "Stakeholder interviews and surveys",
        "Market trend analysis",
        "Competitive landscape assessment",
        "Internal capability audit"
      ]
    },
    {
      number: 2,
      title: "Assess Materiality",
      description: "Evaluating business impact and resource requirements",
      icon: BarChart3,
      color: "teal",
      details: [
        "ROI impact modeling",
        "Resource requirement analysis",
        "Risk assessment framework",
        "Business case development"
      ]
    },
    {
      number: 3,
      title: "Develop Options",
      description: "Creating strategic AI implementation pathways",
      icon: Lightbulb,
      color: "cyan",
      details: [
        "Solution architecture design",
        "Technology stack evaluation",
        "Implementation roadmap",
        "Pilot project identification"
      ]
    },
    {
      number: 4,
      title: "Assess Trade-Offs",
      description: "Balancing innovation speed with risk management",
      icon: Scale,
      color: "purple",
      details: [
        "Cost-benefit analysis",
        "Risk vs. reward evaluation",
        "Timeline optimization",
        "Resource allocation planning"
      ]
    },
    {
      number: 5,
      title: "Measure Gap",
      description: "Tracking actual value delivery vs. expectations",
      icon: Target,
      color: "orange",
      details: [
        "KPI definition and tracking",
        "Performance monitoring",
        "Gap analysis reporting",
        "Continuous feedback loops"
      ]
    },
    {
      number: 6,
      title: "Adjust & Iterate",
      description: "Continuous optimization and scaling successful models",
      icon: Rocket,
      color: "emerald",
      details: [
        "Strategy refinement",
        "Scaling successful pilots",
        "Process optimization",
        "Knowledge sharing"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30",
        border: "border-blue-200 dark:border-blue-800",
        text: "text-blue-600 dark:text-blue-400",
        accent: "bg-blue-500"
      },
      teal: {
        bg: "from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/30",
        border: "border-teal-200 dark:border-teal-800",
        text: "text-teal-600 dark:text-teal-400",
        accent: "bg-teal-500"
      },
      cyan: {
        bg: "from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/30",
        border: "border-cyan-200 dark:border-cyan-800",
        text: "text-cyan-600 dark:text-cyan-400",
        accent: "bg-cyan-500"
      },
      purple: {
        bg: "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30",
        border: "border-purple-200 dark:border-purple-800",
        text: "text-purple-600 dark:text-purple-400",
        accent: "bg-purple-500"
      },
      orange: {
        bg: "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30",
        border: "border-orange-200 dark:border-orange-800",
        text: "text-orange-600 dark:text-orange-400",
        accent: "bg-orange-500"
      },
      emerald: {
        bg: "from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30",
        border: "border-emerald-200 dark:border-emerald-800",
        text: "text-emerald-600 dark:text-emerald-400",
        accent: "bg-emerald-500"
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-background via-primary/5 to-genie-teal/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20">
            <Rocket className="w-4 h-4 mr-2" />
            Implementation Journey
          </Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
            6-Step <span className="text-primary">Enterprise Value Framework</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A systematic approach to AI experimentation and enterprise transformation
          </p>
        </div>

        {/* Journey Flow */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const colors = getColorClasses(step.color);
              const IconComponent = step.icon;
              
              return (
                <div key={step.number} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 z-0">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary/40 to-primary/20"></div>
                      <ArrowDown className="w-6 h-6 text-primary/60 mx-auto -mt-2" />
                    </div>
                  )}
                  
                  {/* Step Card */}
                  <Card className={`relative p-8 bg-gradient-to-br ${colors.bg} ${colors.border} hover:shadow-xl transition-all duration-500 group overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-6">
                        {/* Step Number */}
                        <div className={`w-16 h-16 ${colors.accent} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                          {step.number}
                        </div>
                        
                        {/* Icon */}
                        <div className={`w-12 h-12 ${colors.text} flex items-center justify-center`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        
                        {/* Title & Description */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                          <p className="text-muted-foreground text-lg">{step.description}</p>
                        </div>
                      </div>
                      
                      {/* Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-22">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-3">
                            <CheckCircle className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                            <span className="text-sm text-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-genie-teal/10 to-genie-cyan/10 rounded-2xl p-8 lg:p-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Framework Success Metrics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Stakeholder Alignment</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-genie-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-genie-teal" />
              </div>
              <div className="text-3xl font-bold text-genie-teal mb-2">60%</div>
              <div className="text-sm text-muted-foreground">Faster Time-to-Market</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-genie-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-genie-cyan" />
              </div>
              <div className="text-3xl font-bold text-genie-cyan mb-2">3x</div>
              <div className="text-sm text-muted-foreground">ROI Improvement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};