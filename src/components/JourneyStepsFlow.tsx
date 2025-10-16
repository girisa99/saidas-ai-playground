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
  implementationStatus?: "live" | "testing" | "development" | "planned";
  statusNote?: string;
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
  impact?: any;
  cumulativeImpact?: any;
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
  scenarioImpacts?: any;
  showLegend?: boolean;
}

export const JourneyStepsFlow = ({ 
  steps, 
  selectedStep, 
  onStepClick, 
  patientScenarios = [],
  scenarioImpacts,
  showLegend = true 
}: JourneyStepsFlowProps) => {
  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation":
        return "bg-primary/10 text-primary border-primary/30";
      case "agentic":
        return "bg-genie-secondary/10 text-genie-secondary border-genie-secondary/30";
      case "hybrid":
        return "bg-accent/10 text-accent border-accent/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive":
        return "text-success";
      case "critical":
        return "text-destructive";
      case "neutral":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const legendItems: LegendItem[] = [
    {
      icon: Database,
      label: "Patient Data Collection",
      description: "Demographics, insurance, medical history, symptoms",
      color: "text-genie-primary"
    },
    {
      icon: Share2,
      label: "Cross-Departmental Sharing",
      description: "Data exchange between departments and systems",
      color: "text-genie-secondary"
    },
    {
      icon: Shield,
      label: "Verification & Compliance",
      description: "Insurance verification, provider credentialing, HIPAA compliance",
      color: "text-success"
    },
    {
      icon: FileText,
      label: "Clinical Documentation",
      description: "Medical records, test results, treatment plans, notes",
      color: "text-warning"
    },
    {
      icon: Users,
      label: "Care Team Coordination",
      description: "Provider assignments, specialist referrals, team communication",
      color: "text-accent"
    },
    {
      icon: Workflow,
      label: "Process Orchestration",
      description: "Workflow automation, scheduling, notifications, tracking",
      color: "text-primary"
    }
  ];

  const dataFlowConnections = [
    {
      from: "Patient Data Collection",
      to: "Cross-Departmental Sharing",
      description: "Demographics and insurance data flows to all departments"
    },
    {
      from: "Clinical Documentation", 
      to: "Care Team Coordination",
      description: "Medical records inform specialist assignments and treatment planning"
    },
    {
      from: "Verification & Compliance",
      to: "Process Orchestration", 
      description: "Verification results trigger automated workflows and approvals"
    }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Information Collection Legend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              Data Flow & Cross-Functional Information Sharing
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Understanding information flow patterns across journey steps to identify optimization and consolidation opportunities
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
            <Separator className="my-4" />
            
            {/* Data Flow Connections */}
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Key Data Flow Connections
              </h4>
              <div className="space-y-2">
                {dataFlowConnections.map((connection, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs p-2 bg-muted/30 rounded">
                    <span className="font-medium text-genie-primary">{connection.from}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <span className="font-medium text-genie-secondary">{connection.to}</span>
                    <span className="text-muted-foreground ml-2">{connection.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />
            
            {/* Optimization Opportunities */}
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-accent" />
                Step Consolidation Opportunities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-2 bg-accent/10 border border-accent/20 rounded">
                  <span className="font-medium text-accent">Data Collection Steps:</span>
                  <p className="text-muted-foreground mt-1">Steps 4-6 share similar verification processes - consolidation potential</p>
                </div>
                <div className="p-2 bg-genie-secondary/10 border border-genie-secondary/20 rounded">
                  <span className="font-medium text-genie-secondary">Coordination Steps:</span>
                  <p className="text-muted-foreground mt-1">Steps 7-8 both involve care team assembly - optimization opportunity</p>
                </div>
              </div>
            </div>

            <Separator className="my-4" />
            
            {/* Technology Approach Legend */}
            <div>
              <h4 className="font-medium text-sm mb-2">Technology Approach Legend</h4>
              <div className="flex flex-wrap gap-4 text-xs">
                <div className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Automation</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-genie-secondary" />
                  <span className="text-muted-foreground">Agentic AI</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Hybrid</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Step Flow Grid with Data Flow Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const EmotionIcon = step.emotionIcon;
          const isSelected = selectedStep === step.id;
          
          // Determine data flow indicators for this step
          const getStepDataTypes = (stepId: number) => {
            const dataTypes = [];
            if ([1, 2, 4].includes(stepId)) dataTypes.push("Patient Data Collection");
            if ([2, 3, 7, 8].includes(stepId)) dataTypes.push("Cross-Departmental Sharing");
            if ([3, 6].includes(stepId)) dataTypes.push("Verification & Compliance");
            if ([1, 5, 7].includes(stepId)) dataTypes.push("Clinical Documentation");
            if ([7, 8, 9].includes(stepId)) dataTypes.push("Care Team Coordination");
            if ([1, 2, 8, 9].includes(stepId)) dataTypes.push("Process Orchestration");
            return dataTypes;
          };
          
          const stepDataTypes = getStepDataTypes(step.id);
          
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
                   <div className="flex items-center gap-1">
                     <EmotionIcon className={`h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 ${getEmotionColor(step.emotion)}`} />
                      {step.implementationStatus && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ml-1 ${
                            step.implementationStatus === 'live' ? 'border-green-500 text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400' :
                            step.implementationStatus === 'testing' ? 'border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400' :
                            step.implementationStatus === 'development' ? 'border-orange-500 text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400' :
                            'border-gray-500 text-gray-600 bg-gray-50 dark:bg-gray-950 dark:text-gray-400'
                          }`}
                        >
                          {step.implementationStatus === 'live' ? '✅ Live' :
                           step.implementationStatus === 'testing' ? '🔬 Testing' :
                           step.implementationStatus === 'development' ? '🚧 Dev' : '📋 Planned'}
                        </Badge>
                      )}
                   </div>
                 </div>
                 
                 <h4 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
                   {step.title}
                 </h4>

                 {step.statusNote && (
                   <p className="text-xs text-muted-foreground mb-2 line-clamp-2 leading-relaxed">
                     {step.statusNote}
                   </p>
                 )}
                
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
                
                {/* Data Flow Indicators */}
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {stepDataTypes.slice(0, 2).map((dataType, idx) => (
                      <span key={idx} className="text-xs px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
                        {legendItems.find(item => item.label === dataType)?.label.split(' ')[0] || dataType.split(' ')[0]}
                      </span>
                    ))}
                    {stepDataTypes.length > 2 && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground">
                        +{stepDataTypes.length - 2}
                      </span>
                    )}
                  </div>
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
                            <span className="text-primary mt-1">•</span>
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
                            <span className="text-genie-secondary mt-1">•</span>
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

                  {/* Patient Scenarios with Impact Analysis */}
                  {patientScenarios.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Scenario-Specific Impact Analysis
                      </h4>
                      <div className="grid grid-cols-1 gap-6">
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
                              
                              {/* Step Impact Metrics */}
                              {scenario.impact && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <h6 className="font-medium text-blue-800 text-sm mb-2">Step Impact</h6>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    {Object.entries(scenario.impact).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-blue-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                        <span className="font-medium text-blue-900">{value as string}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Cumulative Impact */}
                              {scenario.cumulativeImpact && (
                                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <h6 className="font-medium text-green-800 text-sm mb-2">Cumulative Benefits (Through Step {selectedStep})</h6>
                                  <div className="grid grid-cols-1 gap-1 text-xs">
                                    {Object.entries(scenario.cumulativeImpact).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-green-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                        <span className="font-medium text-green-900">{value as string}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Process Steps */}
                              {scenario.substeps && scenario.substeps.length > 0 ? (
                                <div className="space-y-2">
                                  <h6 className="font-medium text-indigo-700 text-sm">Process Breakdown</h6>
                                  {scenario.substeps.map((substep, subIdx) => (
                                    <div key={subIdx} className="border border-border rounded p-2">
                                      <h6 className="font-medium text-xs text-foreground mb-1">{substep.substep}</h6>
                                      <p className="text-xs text-muted-foreground">{substep.process}</p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-3 bg-muted rounded-lg">
                                  <p className="text-xs text-muted-foreground italic">
                                    No detailed process breakdown available for this step. This step uses standard {step.approach} approaches as outlined in the main tasks above.
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {/* Comparative Analysis */}
                      {patientScenarios.length === 2 && scenarioImpacts && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
                          <h6 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Scenario Comparison: {patientScenarios[0].name} vs {patientScenarios[1].name}
                          </h6>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="text-center p-3 bg-white rounded border">
                              <div className="font-medium text-blue-700">Time Reduction</div>
                              <div className="text-lg font-bold text-blue-900">
                                {scenarioImpacts.sarah.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.totalTimeSaved || 'N/A'}
                              </div>
                              <div className="text-xs text-blue-600">Routine Case</div>
                              <div className="mt-1 text-lg font-bold text-orange-900">
                                {scenarioImpacts.michael.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.totalTimeSaved || 'N/A'}
                              </div>
                              <div className="text-xs text-orange-600">Complex Case</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded border">
                              <div className="font-medium text-green-700">Error Reduction</div>
                              <div className="text-lg font-bold text-green-900">
                                {scenarioImpacts.sarah.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.totalErrorReduction || 'N/A'}
                              </div>
                              <div className="text-xs text-green-600">Routine Case</div>
                              <div className="mt-1 text-lg font-bold text-orange-900">
                                {scenarioImpacts.michael.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.totalErrorReduction || 'N/A'}
                              </div>
                              <div className="text-xs text-orange-600">Complex Case</div>
                            </div>
                            <div className="text-center p-3 bg-white rounded border">
                              <div className="font-medium text-purple-700">Quality Score</div>
                              <div className="text-lg font-bold text-purple-900">
                                {scenarioImpacts.sarah.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.patientExperience || 
                                 scenarioImpacts.sarah.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.careQuality || 'N/A'}
                              </div>
                              <div className="text-xs text-purple-600">Routine Case</div>
                              <div className="mt-1 text-lg font-bold text-orange-900">
                                {scenarioImpacts.michael.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.patientExperience || 
                                 scenarioImpacts.michael.cumulativeBenefits.find((b: any) => b.step === selectedStep)?.careQuality || 'N/A'}
                              </div>
                              <div className="text-xs text-orange-600">Complex Case</div>
                            </div>
                          </div>
                        </div>
                      )}
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