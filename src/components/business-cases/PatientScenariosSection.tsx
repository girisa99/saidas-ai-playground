import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Star, Clock, AlertTriangle } from "lucide-react";
import { BusinessCase } from "@/data/businessUseCases";

interface PatientScenariosSectionProps {
  currentCase: BusinessCase;
  selectedScenario: string;
  onScenarioChange: (value: string) => void;
  currentJourneySteps: any[];
  selectedStep: number | null;
  onStepClick: (stepId: number) => void;
  currentScenarioDetails: any;
  getPatientScenariosForStep: (stepId: number) => any[];
}

export const PatientScenariosSection = ({
  currentCase,
  selectedScenario,
  onScenarioChange,
  currentJourneySteps,
  selectedStep,
  onStepClick,
  currentScenarioDetails,
  getPatientScenariosForStep
}: PatientScenariosSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          Patient Scenarios & Process Breakdowns
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <Tabs value={selectedScenario} onValueChange={onScenarioChange}>
          <TabsList className="grid grid-cols-2 w-full mb-4 sm:mb-6 h-auto">
            <TabsTrigger value="sarah" className="text-xs sm:text-sm px-2 py-2">
              {currentCase.scenarioTitles.sarah}
            </TabsTrigger>
            <TabsTrigger value="michael" className="text-xs sm:text-sm px-2 py-2">
              {currentCase.scenarioTitles.michael}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sarah" className="space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
                <currentCase.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                {currentCase.scenarioTitles.sarah} - Detailed Process Flow
              </h4>
              <p className="text-sm sm:text-base text-purple-700 mb-4 leading-relaxed">
                {currentCase.scenarioDescriptions.sarah}
              </p>
              
              {/* Journey Step Navigator */}
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2 text-purple-800">Journey Steps:</h5>
                <div className="flex flex-wrap gap-2">
                  {currentJourneySteps?.map((step: any) => (
                    <Button
                      key={step.id}
                      variant={selectedStep === step.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => onStepClick(step.id)}
                      className="text-xs"
                    >
                      {step.id}. {step.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {selectedStep && currentScenarioDetails.sarah[selectedStep] && (
              <div className="space-y-4">
                <Card className="border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-purple-600">{selectedStep}</span>
                      </div>
                      Step {selectedStep}: {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title} - Sarah's Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentScenarioDetails.sarah[selectedStep]?.map((detail: any, index: number) => (
                        <div key={index} className="bg-purple-50/50 rounded-lg p-3 border border-purple-100">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300 text-xs">
                                {detail.substep}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed flex-1">{detail.process}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Step-specific scenario data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {getPatientScenariosForStep(selectedStep).map((scenario: any, index: number) => (
                    <Card key={index} className="border-purple-200 bg-purple-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-purple-500" />
                          <h6 className="font-medium text-sm">{scenario.title}</h6>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{scenario.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {scenario.timeEstimate}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            {scenario.complexity}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="michael" className="space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-6 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
                <currentCase.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                {currentCase.scenarioTitles.michael} - Detailed Process Flow
              </h4>
              <p className="text-sm sm:text-base text-blue-700 mb-4 leading-relaxed">
                {currentCase.scenarioDescriptions.michael}
              </p>
              
              {/* Journey Step Navigator */}
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2 text-blue-800">Journey Steps:</h5>
                <div className="flex flex-wrap gap-2">
                  {currentJourneySteps?.map((step: any) => (
                    <Button
                      key={step.id}
                      variant={selectedStep === step.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => onStepClick(step.id)}
                      className="text-xs"
                    >
                      {step.id}. {step.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {selectedStep && currentScenarioDetails.michael[selectedStep] && (
              <div className="space-y-4">
                <Card className="border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">{selectedStep}</span>
                      </div>
                      Step {selectedStep}: {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title} - Michael's Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentScenarioDetails.michael[selectedStep]?.map((detail: any, index: number) => (
                        <div key={index} className="bg-blue-50/50 rounded-lg p-3 border border-blue-100">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 text-xs">
                                {detail.substep}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed flex-1">{detail.process}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Step-specific scenario data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {getPatientScenariosForStep(selectedStep).map((scenario: any, index: number) => (
                    <Card key={index} className="border-blue-200 bg-blue-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-blue-500" />
                          <h6 className="font-medium text-sm">{scenario.title}</h6>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{scenario.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            <Clock className="w-3 h-3 mr-1" />
                            {scenario.timeEstimate}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            {scenario.complexity}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};