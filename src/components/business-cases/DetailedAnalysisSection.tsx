import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BusinessCase } from "@/data/businessUseCases";

interface DetailedAnalysisSectionProps {
  currentCase: BusinessCase;
  selectedScenario: string;
  onScenarioChange: (value: string) => void;
  currentScenarioDetails: any;
  currentScenarioImpacts: any;
}

export const DetailedAnalysisSection = ({ 
  currentCase, 
  selectedScenario, 
  onScenarioChange, 
  currentScenarioDetails, 
  currentScenarioImpacts 
}: DetailedAnalysisSectionProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <Tabs defaultValue="patient-scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-auto">
          <TabsTrigger value="patient-scenarios" className="text-xs sm:text-sm px-2 py-2 sm:py-3">
            Patient Scenarios
          </TabsTrigger>
          <TabsTrigger value="impact-analysis" className="text-xs sm:text-sm px-2 py-2 sm:py-3">
            Impact Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="patient-scenarios" className="mt-4">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <h3 className="text-base sm:text-lg font-semibold">Scenario Selection:</h3>
              <Select value={selectedScenario} onValueChange={onScenarioChange}>
                <SelectTrigger className="w-full sm:w-auto min-w-[200px]">
                  <SelectValue placeholder="Select scenario..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">
                    {currentCase.scenarioTitles?.sarah || "Sarah - Default Scenario"}
                  </SelectItem>
                  <SelectItem value="michael">
                    {currentCase.scenarioTitles?.michael || "Michael - Default Scenario"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedScenario === "sarah" 
                ? currentCase.scenarioDescriptions?.sarah 
                : currentCase.scenarioDescriptions?.michael}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="impact-analysis" className="mt-4">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Current vs. Expected Impact</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">Current Issues:</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {currentCase.currentIssues?.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">Expected Improvements:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  {currentCase.expectedImprovements?.map((improvement, index) => (
                    <li key={index}>• {improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};