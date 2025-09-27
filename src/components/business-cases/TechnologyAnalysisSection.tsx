import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Settings, 
  Bot, 
  Zap, 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  AlertTriangle,
  Brain,
  Workflow,
  Activity
} from "lucide-react";

interface TechnologyAnalysisSectionProps {
  selectedStep: number | null;
  currentJourneySteps: any[];
}

export const TechnologyAnalysisSection = ({
  selectedStep,
  currentJourneySteps
}: TechnologyAnalysisSectionProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'live':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'testing':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'development':
        return <Settings className="w-4 h-4 text-orange-500" />;
      case 'planned':
        return <Clock className="w-4 h-4 text-gray-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'testing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'development':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'planned':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'live': return 100;
      case 'testing': return 75;
      case 'development': return 50;
      case 'planned': return 25;
      default: return 0;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          Technology Implementation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        {selectedStep ? (
          <div className="space-y-4 sm:space-y-6">
            {(() => {
              const step = currentJourneySteps.find((s: any) => s.id === selectedStep);
              if (!step) return null;

              return (
                <>
                  {/* Step Overview */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="font-bold text-blue-600">{step.id}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg text-blue-900">{step.title}</h4>
                          <p className="text-sm text-blue-700">{step.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.implementationStatus)}
                        <Badge className={`${getStatusColor(step.implementationStatus)} border font-medium`}>
                          {step.implementationStatus.charAt(0).toUpperCase() + step.implementationStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-blue-800">Implementation Progress</span>
                        <span className="text-sm font-medium text-blue-800">{getProgressValue(step.implementationStatus)}%</span>
                      </div>
                      <Progress value={getProgressValue(step.implementationStatus)} className="h-2" />
                    </div>

                    {step.statusNote && (
                      <div className="bg-white/60 p-3 rounded border border-blue-100">
                        <p className="text-sm text-blue-800">{step.statusNote}</p>
                      </div>
                    )}
                  </div>

                  {/* Automation vs AI Analysis */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Automation Tasks */}
                    <Card className="border-green-200 bg-green-50/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-green-800">
                          <Zap className="w-5 h-5" />
                          Automation Components
                          {step.automationPrimary && (
                            <Badge className="bg-green-100 text-green-700 text-xs">Primary</Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="bg-green-100/50 p-3 rounded-lg border border-green-200">
                            <h5 className="font-medium text-green-800 mb-2">Why Automation?</h5>
                            <p className="text-sm text-green-700">{step.whyAutomation}</p>
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium text-green-800">Automated Tasks:</h5>
                            {step.automationTasks?.map((task: string, index: number) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-white/80 rounded border border-green-100">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-green-700">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Tasks */}
                    <Card className="border-purple-200 bg-purple-50/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-purple-800">
                          <Brain className="w-5 h-5" />
                          AI Components
                          {!step.automationPrimary && (
                            <Badge className="bg-purple-100 text-purple-700 text-xs">Primary</Badge>
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="bg-purple-100/50 p-3 rounded-lg border border-purple-200">
                            <h5 className="font-medium text-purple-800 mb-2">Why AI?</h5>
                            <p className="text-sm text-purple-700">{step.whyAI}</p>
                          </div>
                          <div className="space-y-2">
                            <h5 className="font-medium text-purple-800">AI-Powered Tasks:</h5>
                            {step.aiTasks?.map((task: string, index: number) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-white/80 rounded border border-purple-100">
                                <Brain className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-purple-700">{task}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* ROI and Current Issues */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <Card className="border-blue-200 bg-blue-50/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-blue-800">
                          <TrendingUp className="w-5 h-5" />
                          Expected ROI & Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="bg-blue-100/50 p-4 rounded-lg border border-blue-200 text-center">
                            <div className="text-2xl font-bold text-blue-900 mb-1">{step.roi}</div>
                            <div className="text-sm text-blue-700">Projected Efficiency Gain</div>
                          </div>
                          <div className="bg-green-100/50 p-3 rounded-lg border border-green-200">
                            <h5 className="font-medium text-green-800 mb-2">Expected Improvement:</h5>
                            <p className="text-sm text-green-700">{step.improvement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 bg-red-50/30">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-red-800">
                          <AlertTriangle className="w-5 h-5" />
                          Current Challenges
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {step.currentIssues?.map((issue: string, index: number) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-white/80 rounded border border-red-100">
                              <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-red-700">{issue}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Implementation Phases */}
                  <Card className="border-orange-200 bg-orange-50/30">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base sm:text-lg flex items-center gap-2 text-orange-800">
                        <Workflow className="w-5 h-5" />
                        Implementation Phases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 sm:space-y-3">
                        {step.phases?.map((phase: string, index: number) => (
                          <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-100/50 rounded-lg">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-orange-700">{index + 1}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-orange-700 leading-relaxed">{phase}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              );
            })()}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 text-muted-foreground">
            <Settings className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
            <p className="text-sm sm:text-base">Select a journey step above to see detailed technology analysis</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};