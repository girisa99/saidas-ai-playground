import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Database, 
  Share2, 
  Shield, 
  FileText, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Workflow,
  Target
} from "lucide-react";

interface JourneyStep {
  id: number;
  title: string;
  icon: LucideIcon;
  time: string;
  emotion: string;
  emotionIcon: LucideIcon;
  approach: string;
  description: string;
  roi: string;
  automationTasks: string[];
  aiTasks: string[];
  whyAutomation: string;
  whyAI: string;
  currentIssues: string[];
  improvement: string;
  phases?: string[];
}

interface PatientScenario {
  name: string;
  description: string;
  complexity: "routine" | "complex" | "critical";
  substeps: {
    substep: string;
    process: string;
  }[];
}

interface LegendItem {
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
}

interface JourneyStepsFlowProps {
  steps: JourneyStep[];
  selectedStep: number | null;
  onStepClick: (stepId: number) => void;
  patientScenarios?: PatientScenario[];
  showLegend?: boolean;
}

export const JourneyStepsFlow = ({ 
  steps, 
  selectedStep, 
  onStepClick, 
  patientScenarios = [],
  showLegend = true 
}: JourneyStepsFlowProps) => {
  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation":
        return "bg-blue-500/20 text-blue-700 border-blue-300";
      case "agentic":
        return "bg-purple-500/20 text-purple-700 border-purple-300";
      case "hybrid":
        return "bg-green-500/20 text-green-700 border-green-300";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-300";
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive":
        return "text-green-600";
      case "critical":
        return "text-red-600";
      case "neutral":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const legendItems: LegendItem[] = [
    {
      icon: Database,
      label: "Data Collection",
      description: "Patient information gathering and verification",
      color: "text-blue-600"
    },
    {
      icon: Share2,
      label: "Cross-Functional Sharing",
      description: "Inter-departmental data exchange and collaboration",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      label: "Security & Compliance",
      description: "HIPAA-compliant secure data handling",
      color: "text-green-600"
    },
    {
      icon: FileText,
      label: "Documentation",
      description: "Clinical records and administrative documents",
      color: "text-orange-600"
    },
    {
      icon: Users,
      label: "Stakeholder Coordination",
      description: "Care team and patient communication",
      color: "text-teal-600"
    },
    {
      icon: Workflow,
      label: "Process Automation",
      description: "Automated workflows and decision points",
      color: "text-indigo-600"
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Information Collection Legend */}
      {showLegend && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              Information Collection & Data Flow Legend
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Understanding what data is collected and how it flows across departments at each step
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {legendItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <IconComponent className={`h-5 w-5 mt-0.5 ${item.color}`} />
                    <div>
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const EmotionIcon = step.emotionIcon;
          const isSelected = selectedStep === step.id;
          
          return (
            <Card 
              key={step.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onStepClick(step.id)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <StepIcon className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Step {step.id}
                    </span>
                  </div>
                  <EmotionIcon className={`h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 ${getEmotionColor(step.emotion)}`} />
                </div>
                
                <h4 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                  {step.title}
                </h4>
                
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getApproachColor(step.approach)}`}
                  >
                    {step.approach}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {step.time}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-3 mb-2 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="text-xs font-medium text-green-600">
                  {step.roi}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Step Details */}
      {selectedStep && (
        <div className="mt-6 sm:mt-8">
          {(() => {
            const step = steps.find(s => s.id === selectedStep);
            if (!step) return null;
            
            const StepIcon = step.icon;
            const EmotionIcon = step.emotionIcon;
            
            return (
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-full bg-primary/10 flex-shrink-0">
                      <StepIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-semibold leading-tight">{step.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={getApproachColor(step.approach)}
                        >
                          {step.approach}
                        </Badge>
                        <EmotionIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${getEmotionColor(step.emotion)}`} />
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm">
                        <span className="text-muted-foreground">⏱️ {step.time}</span>
                        <span className="text-green-600 font-medium">📈 {step.roi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2 text-sm sm:text-base">
                        🤖 Automation Tasks
                      </h4>
                      <ul className="space-y-2">
                        {step.automationTasks.map((task, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        💡 {step.whyAutomation}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                        🧠 AI Tasks
                      </h4>
                      <ul className="space-y-2">
                        {step.aiTasks.map((task, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        💡 {step.whyAI}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                        ⚠️ Current Issues
                      </h4>
                      <ul className="space-y-2">
                        {step.currentIssues.map((issue, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                        🎯 Expected Improvement
                      </h4>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">{step.improvement}</p>
                      </div>
                    </div>
                  </div>

                  {/* Implementation Phases */}
                  {step.phases && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-purple-600 mb-3 flex items-center gap-2">
                        <Workflow className="h-4 w-4" />
                        Implementation Phases
                      </h4>
                      <div className="space-y-2">
                        {step.phases.map((phase, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-purple-800">{phase}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Patient Scenarios */}
                  {patientScenarios.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Patient Scenario Breakdown
                      </h4>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {patientScenarios.map((scenario, idx) => (
                          <Card key={idx} className="border-l-4 border-l-indigo-400">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <h5 className="font-medium text-indigo-700">{scenario.name}</h5>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    scenario.complexity === "routine" 
                                      ? "border-green-300 text-green-700"
                                      : scenario.complexity === "complex"
                                      ? "border-yellow-300 text-yellow-700"
                                      : "border-red-300 text-red-700"
                                  }
                                >
                                  {scenario.complexity}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-3">{scenario.description}</p>
                              <div className="space-y-2">
                                {scenario.substeps.map((substep, subIdx) => (
                                  <div key={subIdx} className="border border-border rounded p-2">
                                    <h6 className="font-medium text-xs text-foreground mb-1">{substep.substep}</h6>
                                    <p className="text-xs text-muted-foreground">{substep.process}</p>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })()}
        </div>
      )}
    </div>
  );
};