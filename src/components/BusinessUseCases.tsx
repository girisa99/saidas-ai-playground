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

// Business Use Cases Data Structure
const businessCases = {
  oncology: {
    id: "oncology",
    title: "Oncology Care Workflow",
    description: "Strategic technology selection for oncology workflows - choosing between automation and agentic AI",
    icon: Heart,
    currentIssues: [
      "Approx. 40% of patients experience delays in initial appointment scheduling due to manual processing",
      "Staff productivity reduced by estimated 25% due to repetitive administrative tasks", 
      "Approx. 30% increase in errors during data collection and record management",
      "Patient satisfaction scores averaging 6.2/10 due to communication gaps and delays",
      "Healthcare provider burnout increased by approx. 35% due to administrative burden"
    ],
    expectedImprovements: [
      "Approx. 85% reduction in appointment scheduling time with automated referral processing",
      "Staff efficiency increased by estimated 60% through AI-assisted workflow optimization",
      "Data accuracy improved to approx. 98% with automated validation and AI error detection", 
      "Patient satisfaction projected to reach 8.7/10 with personalized communication and faster response times",
      "Healthcare provider satisfaction increased by approx. 45% due to reduced administrative burden and improved patient outcomes"
    ],
    scenarioTitles: {
      sarah: "Sarah - Routine Screening",
      michael: "Michael - Complex Case"
    },
    scenarioDescriptions: {
      sarah: "45-year-old with family history, requires follow-up imaging after abnormal mammogram",
      michael: "67-year-old with multiple comorbidities requiring coordinated care across specialties"
    }
  },
  referral: {
    id: "referral",
    title: "Patient Referral & Onboarding",
    description: "Specialized oncology patient referral and onboarding process flow with granular automation and AI opportunities",
    icon: UserCheck,
    currentIssues: [
      "Manual fax/phone referral processing leads to 4-6 hour delays and 15% data entry errors",
      "Insurance verification bottlenecks cause 25% of patients to experience approval delays",
      "Inconsistent specialist assignment results in 30% suboptimal care coordination",
      "Generic patient preparation leads to 35% arriving unprepared for appointments",
      "Manual pre-authorization processes have 40% initial denial rates requiring appeals"
    ],
    expectedImprovements: [
      "AI-powered referral processing reduces response time to under 30 minutes with 95% accuracy",
      "Real-time insurance verification eliminates approval delays and identifies financial assistance",
      "Intelligent specialist matching improves care coordination accuracy by 85%", 
      "Personalized preparation achieves 95% patient readiness with AI-guided education",
      "AI-generated pre-authorization documentation increases approval rates by 70%"
    ],
    scenarioTitles: {
      sarah: "Maria - Urgent Referral",
      michael: "Robert - Complex Onboarding"
    },
    scenarioDescriptions: {
      sarah: "62-year-old urgent pancreatic cancer referral requiring immediate specialist coordination",
      michael: "58-year-old with multiple prior treatments needing comprehensive genomic testing and care team assembly"
    }
  },
  retail: {
    id: "retail", 
    title: "Retail Customer Experience",
    description: "AI-powered customer journey optimization from discovery to post-purchase support",
    icon: Briefcase,
    currentIssues: [
      "High cart abandonment rates due to complex checkout processes",
      "Generic product recommendations missing customer preferences",
      "Delayed customer service responses affecting satisfaction",
      "Inventory management inefficiencies leading to stockouts",
      "Limited personalization across customer touchpoints"
    ],
    expectedImprovements: [
      "Streamlined checkout process reduces abandonment by 40%",
      "AI-powered recommendations increase conversion rates by 60%",
      "Real-time customer service improves satisfaction scores by 50%",
      "Predictive inventory management reduces stockouts by 75%",
      "Personalized experiences increase customer lifetime value by 35%"
    ],
    scenarioTitles: {
      sarah: "Emma - First-time Buyer",
      michael: "David - Loyalty Customer"
    },
    scenarioDescriptions: {
      sarah: "28-year-old discovering brand through social media, needs guidance through purchase decision",
      michael: "45-year-old repeat customer with specific preferences seeking efficient reorder experience"
    }
  }
};

const journeySteps = {
  referral: [
    {
      id: 1,
      title: "Referral Receipt",
      icon: FileText,
      time: "0-30 minutes",
      position: { x: 10, y: 15 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Immediate digital referral processing with AI-powered triage",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
      automationTasks: [
        "Digital intake form parsing from fax/portal",
        "Automated data extraction and validation",
        "Basic referral completeness checking",
        "Standard acknowledgment notifications"
      ],
      aiTasks: [
        "Intelligent referral routing based on urgency",
        "Smart data extraction from unstructured documents",
        "AI-powered clinical priority assessment",
        "Predictive resource allocation for complex cases"
      ],
      whyAutomation: "High-volume referral processing benefits from consistent digital workflows and automated validation",
      whyAI: "Complex triage decisions require intelligent assessment of clinical urgency and appropriate specialist routing",
      phases: [
        "Implement digital referral processing automation",
        "Deploy AI for intelligent triage and routing",
        "Integrate predictive resource planning"
      ],
      currentIssues: [
        "Manual fax processing leads to 4-6 hour delays",
        "15% data entry errors in manual transcription",
        "Inconsistent urgency assessment across staff"
      ],
      improvement: "AI-powered processing reduces response time to under 30 minutes with 95% accuracy in data extraction."
    }
  ],
  oncology: [
    {
      id: 1,
      title: "Referral Receipt",
      icon: FileText,
      time: "Day 0 - approx. 2 hours",
      position: { x: 10, y: 15 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Initial referral received and triaged for urgency and completeness",
      automationPrimary: true,
      roi: "≈ 60% efficiency gain",
      automationTasks: [
        "Automated intake form parsing and data extraction",
        "Insurance eligibility verification via API calls",
        "Basic medical history review and flagging",
        "Appointment slot identification based on urgency protocols",
        "Standard communication templates for common scenarios"
      ],
      aiTasks: [
        "Complex case pattern recognition and risk stratification",
        "Personalized communication generation for unique situations",
        "Care team coordination and specialist matching based on case complexity",
        "Predictive timeline estimation considering patient-specific factors",
        "Intelligent routing to appropriate feedback loops when incomplete data detected"
      ],
      whyAutomation: "High-volume, standardized intake processes benefit from consistent automation for speed and accuracy in basic verification tasks",
      whyAI: "Complex decision-making around care coordination, risk assessment, and determining when feedback loops are needed requires contextual intelligence",
      phases: [
        "Implement basic automation for data parsing and verification",
        "Deploy AI for complex case analysis and risk assessment",
        "Integrate with existing EHR systems for seamless data flow"
      ],
      currentIssues: [
        "Approx. 15% manual data entry errors leading to rework",
        "Delayed response times averaging 4-6 hours",
        "Inconsistent triage decisions across staff members"
      ],
      improvement: "Automated processing reduces response time to under 30 minutes with approx. 95% accuracy in data extraction and consistent AI-driven triage decisions."
    }
  ],
  retail: []
};

// Patient scenario details with detailed process breakdowns
const scenarioDetails = {
  referral: {
    sarah: {
      1: [
        {
          substep: "Urgent Referral Processing",
          process: "Maria's pancreatic cancer referral flagged as urgent (pain score 8/10, weight loss 20lbs). AI immediately prioritizes for same-day specialist review."
        },
        {
          substep: "Specialist Matching",
          process: "AI routes to Dr. Patel (pancreatic oncology specialist) based on case type and immediate availability for urgent consultations."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Complex Case Recognition",
          process: "Robert's referral with prior treatments (surgery, chemo, radiation) flagged for comprehensive genomic workup and multi-disciplinary approach."
        },
        {
          substep: "Genomic Testing Coordination",
          process: "AI automatically initiates genomic testing pre-authorization based on prior treatment history and current clinical status."
        }
      ]
    }
  },
  oncology: {
    sarah: {
      1: [
        {
          substep: "Routine Screening Setup",
          process: "Sarah's referral processed through standard oncology workflow with family history flagging for genetic counseling."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Complex Case Coordination",
          process: "Michael's multiple comorbidities trigger multi-disciplinary team assembly for coordinated care planning."
        }
      ]
    }
  },
  retail: {
    sarah: {},
    michael: {}
  }
};

const BusinessUseCases = () => {
  const [selectedBusinessCase, setSelectedBusinessCase] = useState("oncology");
  const [selectedScenario, setSelectedScenario] = useState("sarah");
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showDecisionFramework, setShowDecisionFramework] = useState(false);

  // Get current business case data
  const currentCase = businessCases[selectedBusinessCase as keyof typeof businessCases];
  const currentJourneySteps = journeySteps[selectedBusinessCase as keyof typeof journeySteps] || journeySteps.oncology;
  const currentScenarioDetails = scenarioDetails[selectedBusinessCase as keyof typeof scenarioDetails] || scenarioDetails.oncology;

  const getApproachColor = (approach: string) => {
    switch (approach) {
      case 'automation':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'agentic':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hybrid':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'positive':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Business Case Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-center">Business Use Case Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedBusinessCase} onValueChange={setSelectedBusinessCase}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {Object.values(businessCases).map((businessCase) => (
                <TabsTrigger key={businessCase.id} value={businessCase.id} className="text-xs sm:text-sm">
                  <businessCase.icon className="w-4 h-4 mr-2" />
                  {businessCase.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {Object.values(businessCases).map((businessCase) => (
              <TabsContent key={businessCase.id} value={businessCase.id}>
                <div className="text-center space-y-4">
                  <h2 className="text-lg sm:text-xl font-semibold">{businessCase.title}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">{businessCase.description}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Journey Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">
            {currentCase.title} - Journey Map
          </CardTitle>
          <div className="text-center text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Click on journey steps below to view detailed scenarios and analysis
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="relative w-full overflow-x-auto">
            <svg
              viewBox="0 0 100 50"
              className="w-full h-auto min-h-[300px] sm:min-h-[400px] border rounded-lg bg-gradient-to-br from-background to-muted/20"
              style={{ aspectRatio: '2/1' }}
            >
              {currentJourneySteps.map((step: any, index: number) => {
                const stepColor = step.approach === 'automation' 
                  ? { bg: '#dcfce7', border: '#16a34a', text: '#15803d' }
                  : step.approach === 'agentic'
                  ? { bg: '#dbeafe', border: '#2563eb', text: '#1d4ed8' }
                  : { bg: '#f3e8ff', border: '#9333ea', text: '#7c3aed' };

                const nextStep = currentJourneySteps[index + 1];
                
                return (
                  <g key={step.id}>
                    {/* Connection line to next step */}
                    {nextStep && (
                      <line
                        x1={step.position.x}
                        y1={step.position.y}
                        x2={nextStep.position.x}
                        y2={nextStep.position.y}
                        stroke="hsl(var(--border))"
                        strokeWidth="0.3"
                        strokeDasharray="none"
                      />
                    )}

                    {/* Focus ring for selected */}
                    {selectedStep === step.id && (
                      <circle
                        cx={step.position.x}
                        cy={step.position.y}
                        r="3.2"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.6"
                      />
                    )}

                    {/* Hover indication - pulsing ring */}
                    <circle
                      cx={step.position.x}
                      cy={step.position.y}
                      r="2.9"
                      fill="none"
                      stroke={stepColor.border}
                      strokeWidth="0.2"
                      opacity="0.5"
                      className="cursor-pointer animate-pulse"
                    />

                    {/* Step Circle */}
                    <circle
                      cx={step.position.x}
                      cy={step.position.y}
                      r="2.6"
                      fill={selectedStep === step.id ? "hsl(var(--primary))" : stepColor.bg}
                      stroke={selectedStep === step.id ? "hsl(var(--primary))" : stepColor.border}
                      strokeWidth="0.3"
                      className="cursor-pointer transition-all duration-200 hover:scale-110"
                      onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                    />

                    {/* Step Icon */}
                    <g 
                      transform={`translate(${step.position.x - 1.2}, ${step.position.y - 1.2}) scale(0.1)`}
                      className="cursor-pointer"
                      onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                    >
                      <step.icon 
                        size={24}
                        color={selectedStep === step.id ? "white" : stepColor.text}
                        className="pointer-events-none"
                      />
                    </g>

                    {/* Step Title and Time */}
                    <g className="cursor-pointer" onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}>
                      <text
                        x={step.position.x}
                        y={step.position.y - 3.4}
                        textAnchor="middle"
                        fontSize="1.7"
                        className="font-semibold fill-foreground pointer-events-none"
                      >
                        {step.title}
                      </text>
                      <text
                        x={step.position.x}
                        y={step.position.y + 4.2}
                        textAnchor="middle"
                        fontSize="1.3"
                        className="fill-muted-foreground pointer-events-none"
                      >
                        {step.time}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-medium">Approach:</span>
              <span className={`text-xs px-2 py-1 rounded border ${getApproachColor('automation')}`}>Automation</span>
              <span className={`text-xs px-2 py-1 rounded border ${getApproachColor('agentic')}`}>Agentic AI</span>
              <span className={`text-xs px-2 py-1 rounded border ${getApproachColor('hybrid')}`}>Hybrid</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-medium">Status:</span>
              <span className={`text-xs px-2 py-1 rounded border ${getEmotionColor('positive')}`}>Positive</span>
              <span className={`text-xs px-2 py-1 rounded border ${getEmotionColor('neutral')}`}>Neutral</span>
              <span className={`text-xs px-2 py-1 rounded border ${getEmotionColor('critical')}`}>Critical</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <Tabs defaultValue="patient-scenarios" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="patient-scenarios" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">
              Patient Scenarios
            </TabsTrigger>
            <TabsTrigger value="technology-analysis" className="text-xs sm:text-sm px-2 py-2 sm:py-2.5">
              Technology Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient-scenarios" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Patient Scenarios & Process Breakdowns
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                <Tabs value={selectedScenario} onValueChange={setSelectedScenario}>
                  <TabsList className="grid grid-cols-2 w-full mb-4 sm:mb-6 h-auto">
                    <TabsTrigger value="sarah" className="text-xs sm:text-sm px-2 py-2">
                      {currentCase.scenarioTitles.sarah}
                    </TabsTrigger>
                    <TabsTrigger value="michael" className="text-xs sm:text-sm px-2 py-2">
                      {currentCase.scenarioTitles.michael}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="sarah" className="space-y-3 sm:space-y-4">
                    <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                        <currentCase.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        {currentCase.scenarioTitles.sarah} Journey
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
                        {currentCase.scenarioDescriptions.sarah}
                      </p>
                    </div>

                    {selectedStep && currentScenarioDetails.sarah[selectedStep] && (
                      <div className="space-y-2 sm:space-y-3">
                        <h5 className="font-medium text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span>Step {selectedStep}: {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {currentJourneySteps.find((s: any) => s.id === selectedStep)?.time}
                          </Badge>
                        </h5>
                        <div className="bg-background border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                          {currentScenarioDetails.sarah[selectedStep]?.map((detail: any, index: number) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-2 sm:pl-3">
                              <h6 className="font-medium text-xs sm:text-sm text-primary mb-1">{detail.substep}</h6>
                              <p className="text-xs text-muted-foreground leading-relaxed">{detail.process}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!selectedStep && (
                      <div className="text-center py-6 sm:py-8 text-muted-foreground">
                        <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                        <p className="text-sm sm:text-base">Click on a journey step above to see detailed process breakdown</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="michael" className="space-y-3 sm:space-y-4">
                    <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        {currentCase.scenarioTitles.michael} Journey
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
                        {currentCase.scenarioDescriptions.michael}
                      </p>
                    </div>

                    {selectedStep && currentScenarioDetails.michael[selectedStep] && (
                      <div className="space-y-2 sm:space-y-3">
                        <h5 className="font-medium text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span>Step {selectedStep}: {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {currentJourneySteps.find((s: any) => s.id === selectedStep)?.time}
                          </Badge>
                        </h5>
                        <div className="bg-background border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                          {currentScenarioDetails.michael[selectedStep]?.map((detail: any, index: number) => (
                            <div key={index} className="border-l-2 border-primary/20 pl-2 sm:pl-3">
                              <h6 className="font-medium text-xs sm:text-sm text-primary mb-1">{detail.substep}</h6>
                              <p className="text-xs text-muted-foreground leading-relaxed">{detail.process}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!selectedStep && (
                      <div className="text-center py-6 sm:py-8 text-muted-foreground">
                        <MessageCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                        <p className="text-sm sm:text-base">Click on a journey step above to see detailed process breakdown</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technology-analysis" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  Technology Stack Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6">
                {selectedStep ? (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm sm:text-base">{selectedStep}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg leading-tight">
                          {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {currentJourneySteps.find((s: any) => s.id === selectedStep)?.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                      <Card className="border-green-200 bg-green-50/50">
                        <CardHeader className="pb-2 sm:pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center gap-2">
                              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                              <h4 className="font-semibold text-green-800 text-sm sm:text-base">Automation Focus</h4>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs w-fit">
                              {currentJourneySteps.find((s: any) => s.id === selectedStep)?.roi}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 pt-0">
                          <p className="text-xs sm:text-sm text-green-700 font-medium leading-relaxed">
                            {currentJourneySteps.find((s: any) => s.id === selectedStep)?.whyAutomation}
                          </p>
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-green-800">Key Tasks:</h5>
                            <ul className="space-y-1">
                              {currentJourneySteps.find((s: any) => s.id === selectedStep)?.automationTasks.map((task: string, index: number) => (
                                <li key={index} className="text-xs text-green-700 flex items-start gap-1 sm:gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-blue-200 bg-blue-50/50">
                        <CardHeader className="pb-2 sm:pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center gap-2">
                              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                              <h4 className="font-semibold text-blue-800 text-sm sm:text-base">AI Intelligence</h4>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs w-fit">
                              Advanced Decision Making
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 pt-0">
                          <p className="text-xs sm:text-sm text-blue-700 font-medium leading-relaxed">
                            {currentJourneySteps.find((s: any) => s.id === selectedStep)?.whyAI}
                          </p>
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-blue-800">AI Capabilities:</h5>
                            <ul className="space-y-1">
                              {currentJourneySteps.find((s: any) => s.id === selectedStep)?.aiTasks.map((task: string, index: number) => (
                                <li key={index} className="text-xs text-blue-700 flex items-start gap-1 sm:gap-2">
                                  <Lightbulb className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                  <span className="leading-relaxed">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-orange-200 bg-orange-50/50 lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-800 text-base sm:text-lg">
                          <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
                          Implementation Phases
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 sm:space-y-3">
                          {currentJourneySteps.find((s: any) => s.id === selectedStep)?.phases.map((phase: string, index: number) => (
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
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12 text-muted-foreground">
                    <Settings className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm sm:text-base">Select a journey step above to see detailed technology analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Impact Analysis */}
        <Card className="w-full mx-auto max-w-7xl">
          <CardHeader className="px-4 sm:px-6 lg:px-8">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">Overall Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Current Issues
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {currentCase.currentIssues.map((issue, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{issue}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  Expected Improvements
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {currentCase.expectedImprovements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-green-700 leading-relaxed">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessUseCases;