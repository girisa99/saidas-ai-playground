import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Brain, 
  Target, 
  Network,
  Zap,
  ArrowRight,
  Clock,
  CheckCircle,
  Play
} from "lucide-react";
import { Link } from "react-router-dom";

export const AIJourneyInfographic = () => {
  const [selectedPhase, setSelectedPhase] = useState(0);

  const journeyPhases = [
    {
      id: 1,
      title: "The Spark",
      subtitle: "Initial curiosity ignited",
      period: "May 2025",
      duration: "Weekend conversation",
      icon: Lightbulb,
      color: "primary",
      bgGradient: "from-primary/10 to-primary/5",
      description: "A weekend conversation that changed everything - the moment AI potential became clear",
      keyAchievements: [
        "Transformative conversation with community",
        "Recognition of AI's paradigm shift",
        "Ignited deep curiosity for exploration"
      ]
    },
    {
      id: 2,
      title: "Deep Dive",
      subtitle: "45-day intensive exploration",
      period: "May-June 2025",
      duration: "45 days",
      icon: Brain,
      color: "genie-teal",
      bgGradient: "from-genie-teal/10 to-genie-teal/5",
      description: "Intensive hands-on experimentation across multiple AI models and frameworks",
      keyAchievements: [
        "Personal AI lab with model comparison",
        "GPT, Claude, Gemini exploration",
        "Built prototypes with Bolt, Loveable",
        "API integrations with real workflows"
      ]
    },
    {
      id: 3,
      title: "Breakthrough",
      subtitle: "From utility to creative partner",
      period: "June-July 2025",
      duration: "30 days",
      icon: Zap,
      color: "genie-cyan",
      bgGradient: "from-genie-cyan/10 to-genie-cyan/5",
      description: "Pivotal shift to viewing AI as creative partner, not just utility",
      keyAchievements: [
        "AI-native development with Cursor IDE",
        "Visual design tool integration",
        "Resilient architectures with error handling",
        "Vector databases for semantic search"
      ]
    },
    {
      id: 4,
      title: "Scalable Foundation",
      subtitle: "MVP to production-ready",
      period: "July-August 2025",
      duration: "60 days",
      icon: Target,
      color: "purple-500",
      bgGradient: "from-purple-500/10 to-purple-500/5",
      description: "Transforming learnings into enterprise-grade, scalable foundations",
      keyAchievements: [
        "TypeScript-database schema alignment",
        "Intelligent guardrail systems",
        "Security frameworks with RLS policies",
        "Enterprise CI/CD pipelines"
      ]
    },
    {
      id: 5,
      title: "Resilient Hub",
      subtitle: "Stable healthcare AI platform",
      period: "August-September 2025",
      duration: "Ongoing",
      icon: Network,
      color: "emerald-500",
      bgGradient: "from-emerald-500/10 to-emerald-500/5",
      description: "Production-ready AI platform for healthcare experimentation",
      keyAchievements: [
        "Healthcare systems integration (NPI, CMS, FDA)",
        "Multi-agent orchestration",
        "94% hallucination reduction",
        "HIPAA-compliant architecture"
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        text: "text-primary",
        bg: "bg-primary",
        border: "border-primary",
        icon: "text-primary"
      },
      "genie-teal": {
        text: "text-genie-teal",
        bg: "bg-genie-teal",
        border: "border-genie-teal",
        icon: "text-genie-teal"
      },
      "genie-cyan": {
        text: "text-genie-cyan",
        bg: "bg-genie-cyan",
        border: "border-genie-cyan",
        icon: "text-genie-cyan"
      },
      "purple-500": {
        text: "text-purple-500",
        bg: "bg-purple-500",
        border: "border-purple-500",
        icon: "text-purple-500"
      },
      "emerald-500": {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        border: "border-emerald-500",
        icon: "text-emerald-500"
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(var(--primary),0.3),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(var(--genie-teal),0.3),transparent)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium border-primary/20">
            <Clock className="w-4 h-4 mr-2" />
            My AI Journey
          </Badge>
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            From Spark to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-genie-teal to-genie-cyan">AI Excellence</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A 5-phase transformation journey from initial curiosity to building a resilient healthcare AI experimentation platform
          </p>
        </div>

        {/* Journey Visualization */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-primary via-genie-teal via-genie-cyan via-purple-500 to-emerald-500 rounded-full"></div>
              
              {/* Phase Nodes */}
              <div className="flex justify-between items-start">
                {journeyPhases.map((phase, index) => {
                  const IconComponent = phase.icon;
                  const colors = getColorClasses(phase.color);
                  const isSelected = selectedPhase === index;
                  
                  return (
                    <div 
                      key={phase.id} 
                      className="flex flex-col items-center cursor-pointer group"
                      onClick={() => setSelectedPhase(index)}
                    >
                      {/* Icon Node */}
                      <div className={`relative z-10 w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                        isSelected ? 'scale-110 shadow-2xl' : ''
                      }`}>
                        <IconComponent className="w-8 h-8 text-white" />
                        {isSelected && (
                          <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20"></div>
                        )}
                      </div>
                      
                      {/* Phase Info */}
                      <div className="text-center max-w-32">
                        <h3 className={`font-bold text-sm mb-1 ${colors.text}`}>{phase.title}</h3>
                        <p className="text-xs text-muted-foreground mb-1">{phase.period}</p>
                        <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {journeyPhases.map((phase, index) => {
              const IconComponent = phase.icon;
              const colors = getColorClasses(phase.color);
              const isSelected = selectedPhase === index;
              
              return (
                <div 
                  key={phase.id}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isSelected ? `bg-gradient-to-r ${phase.bgGradient} border-2 ${colors.border}` : 'bg-muted/20 hover:bg-muted/40'
                  }`}
                  onClick={() => setSelectedPhase(index)}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${colors.text}`}>{phase.title}</h3>
                    <p className="text-sm text-muted-foreground">{phase.period}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">{phase.duration}</Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Details */}
        <div className="max-w-4xl mx-auto">
          {(() => {
            const phase = journeyPhases[selectedPhase];
            const colors = getColorClasses(phase.color);
            const IconComponent = phase.icon;
            
            return (
              <Card className={`p-8 lg:p-12 bg-gradient-to-br ${phase.bgGradient} border-2 ${colors.border} relative overflow-hidden animate-fade-in`}>
                <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                  <div className={`w-12 h-12 ${colors.bg}/20 rounded-full flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`${colors.bg} text-white`}>Phase {phase.id}</Badge>
                    <Badge variant="outline">{phase.period}</Badge>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{phase.title}</h3>
                  <p className={`text-lg ${colors.text} font-medium mb-4`}>{phase.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed">{phase.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle className={`w-5 h-5 ${colors.icon}`} />
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {phase.keyAchievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className={`w-2 h-2 ${colors.bg} rounded-full mt-2 flex-shrink-0`}></div>
                          <span className="text-sm text-muted-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-end">
                    <div className="text-center md:text-right">
                      <div className={`text-3xl font-bold ${colors.text} mb-2`}>
                        {phase.duration}
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">Duration</div>
                      <Link to="/journey">
                        <Button variant="outline" className="group">
                          View Full Journey
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })()}
        </div>

        {/* Journey Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Days of Experimentation</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-genie-teal/10 to-genie-teal/5 border-genie-teal/20">
            <div className="w-12 h-12 bg-genie-teal/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-genie-teal" />
            </div>
            <div className="text-2xl font-bold text-genie-teal mb-2">94%</div>
            <div className="text-sm text-muted-foreground">Hallucination Reduction</div>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Network className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-500 mb-2">Multi-Agent</div>
            <div className="text-sm text-muted-foreground">Healthcare Platform</div>
          </Card>
        </div>
      </div>
    </section>
  );
};