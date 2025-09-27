import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { JourneyStepsFlow } from "@/components/JourneyStepsFlow";
import { BusinessCase } from "@/data/businessUseCases";

interface JourneyMapSectionProps {
  currentCase: BusinessCase;
  currentJourneySteps: any[];
  selectedStep: number | null;
  onStepClick: (stepId: number) => void;
  getPatientScenariosForStep: (stepId: number) => any[];
  currentScenarioImpacts: any;
}

export const JourneyMapSection = ({ 
  currentCase, 
  currentJourneySteps, 
  selectedStep, 
  onStepClick, 
  getPatientScenariosForStep, 
  currentScenarioImpacts 
}: JourneyMapSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">
          {currentCase.title} - Journey Map
        </CardTitle>
        <div className="text-center text-sm text-muted-foreground">
          <MessageCircle className="w-4 h-4 inline mr-2" />
          Click on journey steps to view detailed scenarios and analysis
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <JourneyStepsFlow 
          steps={currentJourneySteps}
          selectedStep={selectedStep}
          onStepClick={onStepClick}
          patientScenarios={selectedStep ? getPatientScenariosForStep(selectedStep) : []}
          scenarioImpacts={currentScenarioImpacts}
          showLegend={true}
        />
      </CardContent>
    </Card>
  );
};