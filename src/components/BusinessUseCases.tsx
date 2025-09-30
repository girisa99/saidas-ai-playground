import { useState, useMemo } from "react";
import { businessCases, journeySteps, scenarioDetails, scenarioImpactAnalysis } from "@/data/businessUseCasesData";
import { GenieIntegrationShowcase } from "@/components/business-cases/GenieIntegrationShowcase";
import { BusinessCaseSelector } from "@/components/business-cases/BusinessCaseSelector";
import { ExperimentStatusCards } from "@/components/business-cases/ExperimentStatusCards";
import { BusinessCaseDetails } from "@/components/business-cases/BusinessCaseDetails";
import { JourneyMapSection } from "@/components/business-cases/JourneyMapSection";
import { DecisionFrameworkModal } from "@/components/business-cases/DecisionFrameworkModal";
import { BusinessUseCasesHero } from "@/components/business-cases/BusinessUseCasesHero";
import { PatientScenariosSection } from "@/components/business-cases/PatientScenariosSection";
import { TechnologyAnalysisSection } from "@/components/business-cases/TechnologyAnalysisSection";
import { ImpactAnalysisSection } from "@/components/business-cases/ImpactAnalysisSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JourneyStepsFlow } from "@/components/JourneyStepsFlow";
import { 
  Settings, 
  Bot, 
  Zap, 
  FileText, 
  Users, 
  Shield, 
  Calendar, 
  ClipboardCheck,
  Stethoscope,
  Dna,
  MessageCircle,
  ChevronRight,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Star,
  ArrowUp,
  ArrowDown,
  User,
  Heart,
  Brain,
  Smartphone,
  Monitor,
  Database,
  Workflow,
  Activity,
  Layers,
  Network,
  Wrench,
  Cog,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Frown,
  Briefcase,
  Search,
  UserCheck
} from "lucide-react";

// Business Use Cases Data Structure - imported from external file

// Data is now imported from external files

const BusinessUseCases = () => {
  const [selectedBusinessCase, setSelectedBusinessCase] = useState("oncology");
  const [selectedScenario, setSelectedScenario] = useState("sarah");
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showDecisionFramework, setShowDecisionFramework] = useState(false);

  // Get current business case data - memoized to prevent re-creation
  const currentCase = useMemo(() => 
    businessCases[selectedBusinessCase as keyof typeof businessCases], 
    [selectedBusinessCase]
  );
  
  const currentJourneySteps = useMemo(() => 
    journeySteps[selectedBusinessCase as keyof typeof journeySteps], 
    [selectedBusinessCase]
  );
  
  const currentScenarioDetails = useMemo(() => 
    scenarioDetails[selectedBusinessCase as keyof typeof scenarioDetails], 
    [selectedBusinessCase]
  );
  
  const currentScenarioImpacts = useMemo(() => 
    scenarioImpactAnalysis[selectedBusinessCase as keyof typeof scenarioImpactAnalysis], 
    [selectedBusinessCase]
  );

  // Transform scenario data for JourneyStepsFlow
  const getPatientScenariosForStep = (stepId: number) => {
    if (!selectedStep || selectedStep !== stepId) return [];
    
    const scenarios = [];
    
    // Sarah scenario
    if (currentScenarioDetails.sarah[stepId]) {
      scenarios.push({
        name: currentCase.scenarioTitles.sarah,
        description: currentCase.scenarioDescriptions.sarah,
        complexity: "routine" as const,
        substeps: currentScenarioDetails.sarah[stepId],
        impact: (currentScenarioImpacts as any)?.sarah?.stepImpacts?.[stepId] || {},
        cumulativeImpact: (currentScenarioImpacts as any)?.sarah?.cumulativeBenefits?.find((b: any) => b.step === stepId) || {}
      });
    }
    
    // Michael scenario  
    if (currentScenarioDetails.michael[stepId]) {
      scenarios.push({
        name: currentCase.scenarioTitles.michael,
        description: currentCase.scenarioDescriptions.michael,
        complexity: "complex" as const,
        substeps: currentScenarioDetails.michael[stepId],
        impact: (currentScenarioImpacts as any)?.michael?.stepImpacts?.[stepId] || {},
        cumulativeImpact: (currentScenarioImpacts as any)?.michael?.cumulativeBenefits?.find((b: any) => b.step === stepId) || {}
      });
    }
    
    return scenarios;
  };

  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation":
        return "bg-primary/10 text-primary border-primary/30";
      case "agentic":
        return "bg-accent/10 text-accent border-accent/30";
      case "hybrid":
        return "bg-secondary/10 text-secondary-foreground border-secondary/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive":
        return "bg-success/10 text-success border-success/30";
      case "neutral":
        return "bg-warning/10 text-warning border-warning/30";
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BusinessUseCasesHero 
        onViewExperiments={() => {
          const useCasesSection = document.querySelector('[data-section="use-cases"]');
          useCasesSection?.scrollIntoView({ behavior: 'smooth' });
        }}
        showDecisionFramework={showDecisionFramework}
        onToggleFramework={() => setShowDecisionFramework(!showDecisionFramework)}
      />

      <DecisionFrameworkModal 
        showDecisionFramework={showDecisionFramework}
        onClose={() => setShowDecisionFramework(false)}
      />

      <div data-section="use-cases" className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">

      {/* Business Case Selection */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl text-center font-bold">Select Business Use Case</CardTitle>
          <p className="text-center text-muted-foreground">Choose an experiment to explore implementation details, learnings, and outcomes</p>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto mb-6">
            <BusinessCaseSelector 
              businessCases={businessCases}
              selectedBusinessCase={selectedBusinessCase}
              onBusinessCaseChange={setSelectedBusinessCase}
            />
          </div>
          <ExperimentStatusCards 
            businessCases={businessCases}
            selectedBusinessCase={selectedBusinessCase}
            onBusinessCaseSelect={setSelectedBusinessCase}
          />

          {/* Business Case Details */}
          {selectedBusinessCase && (
            <BusinessCaseDetails currentCase={currentCase} />
          )}
        </CardContent>
      </Card>

      <JourneyMapSection 
        currentCase={currentCase}
        currentJourneySteps={currentJourneySteps}
        selectedStep={selectedStep}
        onStepClick={(stepId) => setSelectedStep(selectedStep === stepId ? null : stepId)}
        getPatientScenariosForStep={getPatientScenariosForStep}
        currentScenarioImpacts={currentScenarioImpacts}
      />

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <Tabs defaultValue="patient-scenarios" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="patient-scenarios" className="text-xs sm:text-sm px-2 py-2 sm:py-3">
              Patient Scenarios
            </TabsTrigger>
            <TabsTrigger value="technology-analysis" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">
              Technology Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient-scenarios" className="space-y-4 sm:space-y-6">
            <PatientScenariosSection 
              currentCase={currentCase}
              selectedScenario={selectedScenario}
              onScenarioChange={setSelectedScenario}
              currentJourneySteps={currentJourneySteps}
              selectedStep={selectedStep}
              onStepClick={(stepId) => setSelectedStep(selectedStep === stepId ? null : stepId)}
              currentScenarioDetails={currentScenarioDetails}
              getPatientScenariosForStep={getPatientScenariosForStep}
            />
          </TabsContent>

          <TabsContent value="technology-analysis" className="space-y-4 sm:space-y-6">
            <TechnologyAnalysisSection 
              selectedStep={selectedStep}
              currentJourneySteps={currentJourneySteps}
            />
          </TabsContent>
        </Tabs>

        {/* Impact Analysis */}
        <ImpactAnalysisSection currentCase={currentCase} />
      </div>

      {/* Genie AI Integration Showcase - Hybrid Approach */}
      <GenieIntegrationShowcase selectedUseCase={selectedBusinessCase} />
      </div>
    </div>
  );
};

export default BusinessUseCases;
