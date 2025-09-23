import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
  TrendingUp
} from "lucide-react";

interface WorkflowStep {
  id: number;
  title: string;
  approach: "automation" | "ai" | "both";
  primary: "automation" | "ai" | "both";
  icon: any;
  automationFeatures: string[];
  aiFeatures: string[];
  implementation: string[];
  roi: string;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Referral Receipt",
    approach: "both",
    primary: "automation",
    icon: FileText,
    automationFeatures: [
      "Digital intake forms - Structured data collection",
      "API integrations - System-to-system data transfer",
      "Data validation - Format checking, required field verification",
      "Automatic routing - Rule-based assignment to departments"
    ],
    aiFeatures: [
      "Unstructured document processing - Extracting data from physician notes, faxes",
      "Intelligent routing - Complex decision-making for specialist assignment",
      "Quality enhancement - Understanding context and filling gaps"
    ],
    implementation: [
      "Phase 1: Automation foundation (digital forms, APIs)",
      "Phase 2: AI overlay for unstructured content processing",
      "Phase 3: AI-driven intelligent routing and quality checks"
    ],
    roi: "Immediate efficiency gains, reduced manual labor"
  },
  {
    id: 2,
    title: "Initial Patient Outreach",
    approach: "both",
    primary: "ai",
    icon: MessageCircle,
    automationFeatures: [
      "Multi-channel messaging - SMS, email delivery systems",
      "Appointment scheduling - Calendar integration and booking",
      "Reminder systems - Scheduled follow-up communications",
      "Contact tracking - Logging attempts and responses"
    ],
    aiFeatures: [
      "Personalized communication - Adapting tone and content to patient needs",
      "Conversation management - Understanding patient responses and context",
      "Emotional intelligence - Detecting anxiety, confusion, or urgency",
      "Dynamic scheduling - Optimizing based on multiple patient and provider factors"
    ],
    implementation: [
      "Phase 1: Automated messaging infrastructure",
      "Phase 2: AI-powered personalization and conversation management",
      "Phase 3: Advanced emotional intelligence and predictive outreach"
    ],
    roi: "Enhanced patient experience, reduced no-shows"
  },
  {
    id: 3,
    title: "Demographic & Insurance Data Collection",
    approach: "automation",
    primary: "automation",
    icon: ClipboardCheck,
    automationFeatures: [
      "Digital forms - Structured data collection",
      "EHR integration - Direct data synchronization",
      "Real-time validation - Immediate error checking",
      "Insurance verification - API-based eligibility checking"
    ],
    aiFeatures: [
      "Predictive pre-fill - Using historical data patterns",
      "Form optimization - Dynamic form adaptation",
      "Anomaly detection - Identifying unusual data patterns"
    ],
    implementation: [
      "Phase 1: Full automation implementation (highest ROI)",
      "Phase 2: Consider AI enhancements if significant data quality issues persist"
    ],
    roi: "Highest ROI with full automation"
  },
  {
    id: 4,
    title: "Medical Records Acquisition",
    approach: "both",
    primary: "ai",
    icon: Stethoscope,
    automationFeatures: [
      "HIE connections - Electronic record exchange",
      "Automated requests - System-generated record requests",
      "Digital consolidation - Aggregating records in central location",
      "Status tracking - Real-time progress monitoring"
    ],
    aiFeatures: [
      "Document analysis - Understanding diverse medical document formats",
      "Information extraction - Pulling relevant clinical data",
      "Medical timeline creation - Synthesizing chronological patient story",
      "Gap identification - Recognizing missing critical information"
    ],
    implementation: [
      "Phase 1: Automation for record acquisition and aggregation",
      "Phase 2: AI for document processing and analysis",
      "Phase 3: Advanced AI for predictive analysis and clinical insights"
    ],
    roi: "Improved clinical understanding, better outcomes"
  },
  {
    id: 5,
    title: "Eligibility & Benefit Verification",
    approach: "both",
    primary: "automation",
    icon: Shield,
    automationFeatures: [
      "Real-time API verification - Direct insurance system queries",
      "Benefit calculation - Automated cost estimation",
      "Coverage tracking - Monitoring benefit changes",
      "Standard reporting - Generating coverage summaries"
    ],
    aiFeatures: [
      "Approval prediction - Analyzing historical patterns for coverage likelihood",
      "Appeal generation - Creating compelling medical necessity arguments",
      "Alternative identification - Finding better coverage options",
      "Financial assistance matching - Identifying applicable programs"
    ],
    implementation: [
      "Phase 1: Automation for standard verification (80% of cases)",
      "Phase 2: AI for complex cases, denials, and appeals (20% of cases)",
      "Phase 3: Predictive analytics to prevent denials"
    ],
    roi: "Reduced denials, faster approvals"
  },
  {
    id: 6,
    title: "Clinical Review & Triage",
    approach: "both",
    primary: "ai",
    icon: Target,
    automationFeatures: [
      "Data aggregation - Collecting all patient information",
      "Alert systems - Flagging critical values",
      "Workflow routing - Moving cases through review process",
      "Documentation templates - Structured note creation"
    ],
    aiFeatures: [
      "Clinical analysis - Understanding complex medical data",
      "Risk stratification - Calculating personalized risk scores",
      "Treatment recommendations - Suggesting optimal care pathways",
      "Decision support - Providing evidence-based guidance"
    ],
    implementation: [
      "Phase 1: Automation for data aggregation and basic alerts",
      "Phase 2: AI for clinical analysis and risk assessment",
      "Phase 3: Advanced AI for treatment optimization and outcome prediction"
    ],
    roi: "Better clinical decisions, improved patient outcomes"
  },
  {
    id: 7,
    title: "Genomic Test Pre-authorization",
    approach: "both",
    primary: "both",
    icon: Dna,
    automationFeatures: [
      "Digital submission - Electronic form processing",
      "Status tracking - Real-time approval monitoring",
      "Document management - Organizing supporting materials",
      "Workflow automation - Moving requests through approval process"
    ],
    aiFeatures: [
      "Medical necessity writing - Creating compelling clinical narratives",
      "Approval prediction - Analyzing likelihood of coverage",
      "Appeal automation - Generating evidence-based appeals",
      "Clinical correlation - Connecting genomic tests to treatment options"
    ],
    implementation: [
      "Phase 1: Automation for submission and tracking infrastructure",
      "Phase 2: AI for documentation generation and approval prediction",
      "Phase 3: Integrated system with AI-powered appeals and optimization"
    ],
    roi: "Higher approval rates, faster processing"
  },
  {
    id: 8,
    title: "Appointment Scheduling & Coordination",
    approach: "both",
    primary: "automation",
    icon: Calendar,
    automationFeatures: [
      "Online scheduling - Self-service appointment booking",
      "Calendar integration - Real-time availability checking",
      "Automated reminders - SMS/email confirmations",
      "Resource coordination - Room and equipment booking"
    ],
    aiFeatures: [
      "Intelligent scheduling - Optimizing based on multiple factors",
      "Preference learning - Adapting to patient and provider patterns",
      "Predictive modeling - Anticipating no-shows and conflicts",
      "Dynamic optimization - Real-time schedule adjustments"
    ],
    implementation: [
      "Phase 1: Full automation implementation (immediate efficiency gains)",
      "Phase 2: AI optimization layer (enhanced patient satisfaction)",
      "Phase 3: Predictive analytics for proactive management"
    ],
    roi: "Improved efficiency, reduced no-shows"
  },
  {
    id: 9,
    title: "Pre-Visit Preparation & Communication",
    approach: "both",
    primary: "ai",
    icon: CheckCircle,
    automationFeatures: [
      "Content delivery - Sending materials via multiple channels",
      "Progress tracking - Monitoring completion of tasks",
      "Reminder scheduling - Automated follow-up communications",
      "Checklist management - Tracking required pre-visit tasks"
    ],
    aiFeatures: [
      "Personalized education - Adapting content to patient understanding",
      "Interactive guidance - Conversational support for preparation",
      "Anxiety management - Emotional support and reassurance",
      "Dynamic adaptation - Adjusting based on patient engagement"
    ],
    implementation: [
      "Phase 1: Automation for content delivery and tracking",
      "Phase 2: AI for personalization and interactive support",
      "Phase 3: Advanced AI for emotional intelligence and behavioral insights"
    ],
    roi: "Better prepared patients, improved outcomes"
  }
];

const BusinessUseCases = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [activePhase, setActivePhase] = useState("overview");

  const getApproachIcon = (approach: string, primary: string) => {
    if (approach === "both") {
      return (
        <div className="flex items-center gap-1">
          <Zap className="h-4 w-4 text-blue-500" />
          <Bot className="h-4 w-4 text-purple-500" />
        </div>
      );
    } else if (approach === "automation") {
      return <Settings className="h-4 w-4 text-blue-500" />;
    } else {
      return <Bot className="h-4 w-4 text-purple-500" />;
    }
  };

  const getApproachColor = (approach: string, primary: string) => {
    if (approach === "both") {
      return primary === "automation" ? "border-blue-200 bg-blue-50" : "border-purple-200 bg-purple-50";
    } else if (approach === "automation") {
      return "border-blue-200 bg-blue-50";
    } else {
      return "border-purple-200 bg-purple-50";
    }
  };

  const currentStep = workflowSteps.find(step => step.id === activeStep);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Automation vs Agentic AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Strategic Technology Selection for Oncology Workflows - Patient Onboarding & Referral Use Cases
        </p>
      </div>

      <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Decision Framework</TabsTrigger>
          <TabsTrigger value="journey">Journey Flow</TabsTrigger>
          <TabsTrigger value="detailed">Step Details</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Decision Framework */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Settings className="h-5 w-5" />
                  When to Use Automation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Structured, predictable processes with clear rules
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    High-volume, repetitive tasks
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Data transfer and validation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Time-sensitive processes
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Bot className="h-5 w-5" />
                  When to Use Agentic AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    Complex decision-making requiring reasoning
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    Unstructured data processing
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    Personalization and adaptation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    Human-like interaction
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gradient bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gradient">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <Bot className="h-5 w-5 text-purple-600" />
                  Hybrid Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Complex workflows with mixed elements
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    Multi-step processes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    Quality assurance workflows
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    Scalable solutions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          {/* Journey Flow Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Onboarding & Referral Journey</CardTitle>
              <p className="text-muted-foreground">Interactive workflow showing technology selection for each step</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        activeStep === step.id 
                          ? `${getApproachColor(step.approach, step.primary)} ring-2 ring-blue-400` 
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setActiveStep(step.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <step.icon className="h-5 w-5" />
                            <span className="font-medium text-sm">Step {step.id}</span>
                          </div>
                          {getApproachIcon(step.approach, step.primary)}
                        </div>
                        <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                        <Badge variant="outline">
                          {step.primary === "automation" ? "Automation Primary" : 
                           step.primary === "ai" ? "AI Primary" : "Equal Partnership"}
                        </Badge>
                      </CardContent>
                    </Card>
                    {index < workflowSteps.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground absolute -right-2 top-1/2 transform -translate-y-1/2 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Journey Progress</span>
                  <span>{Math.round((activeStep / workflowSteps.length) * 100)}%</span>
                </div>
                <Progress value={(activeStep / workflowSteps.length) * 100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          {/* Detailed Step View */}
          {currentStep && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <currentStep.icon className="h-6 w-6" />
                  Step {currentStep.id}: {currentStep.title}
                  {getApproachIcon(currentStep.approach, currentStep.primary)}
                </CardTitle>
                <Badge variant="outline">
                  {currentStep.primary === "automation" ? "Automation Primary" : 
                   currentStep.primary === "ai" ? "AI Primary" : "Equal Partnership"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Automation Features
                    </h4>
                    <ul className="space-y-2">
                      {currentStep.automationFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      AI Features
                    </h4>
                    <ul className="space-y-2">
                      {currentStep.aiFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Implementation Strategy
                  </h4>
                  <div className="space-y-2">
                    {currentStep.implementation.map((phase, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        {phase}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Expected ROI</h5>
                  <p className="text-green-700 text-sm">{currentStep.roi}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
              disabled={activeStep === 1}
            >
              Previous Step
            </Button>
            <Button 
              onClick={() => setActiveStep(Math.min(workflowSteps.length, activeStep + 1))}
              disabled={activeStep === workflowSteps.length}
            >
              Next Step
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          {/* Implementation Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Strategic Implementation Timeline</CardTitle>
              <p className="text-muted-foreground">Phased approach to maximize ROI and minimize risk</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-blue-700">Phase 1: Automation Foundation (Months 1-6)</h3>
                  <p className="text-sm text-muted-foreground mb-2">Focus on high-volume, structured processes</p>
                  <ul className="text-sm space-y-1">
                    <li>• Digital forms and data collection</li>
                    <li>• API integrations and data transfer</li>
                    <li>• Basic workflow automation</li>
                    <li>• Automated reminders and notifications</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">ROI: Immediate efficiency gains</Badge>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-purple-700">Phase 2: Selective AI Implementation (Months 6-12)</h3>
                  <p className="text-sm text-muted-foreground mb-2">Add AI where human-like reasoning adds most value</p>
                  <ul className="text-sm space-y-1">
                    <li>• Document processing and analysis</li>
                    <li>• Clinical decision support</li>
                    <li>• Patient communication and education</li>
                    <li>• Complex case handling</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">ROI: Improved quality, enhanced patient experience</Badge>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-green-700">Phase 3: Advanced AI Integration (Months 12-18)</h3>
                  <p className="text-sm text-muted-foreground mb-2">Implement sophisticated AI capabilities</p>
                  <ul className="text-sm space-y-1">
                    <li>• Predictive analytics</li>
                    <li>• Emotional intelligence</li>
                    <li>• Complex optimization</li>
                    <li>• Continuous learning systems</li>
                  </ul>
                  <Badge variant="outline" className="mt-2">ROI: Competitive advantage, clinical outcome improvements</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessUseCases;