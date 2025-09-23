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
  Frown
} from "lucide-react";

// Decision Framework Data
const decisionFramework = {
  automation: {
    title: "When to Use Automation",
    icon: Wrench,
    color: "blue",
    criteria: [
      "Structured, predictable processes with clear rules",
      "High-volume, repetitive tasks that follow consistent patterns", 
      "Data transfer and validation where accuracy is paramount",
      "Time-sensitive processes requiring immediate response",
      "Cost-effective solutions for straightforward problems"
    ]
  },
  agentic: {
    title: "When to Use Agentic AI",
    icon: Bot,
    color: "purple", 
    criteria: [
      "Complex decision-making requiring reasoning and context",
      "Unstructured data processing (natural language, images, documents)",
      "Personalization and adaptation based on individual circumstances",
      "Learning and improvement from patterns and outcomes",
      "Human-like interaction requiring empathy and understanding"
    ]
  },
  hybrid: {
    title: "When to Use Both (Hybrid Approach)",
    icon: Layers,
    color: "indigo",
    criteria: [
      "Complex workflows with both structured and unstructured elements",
      "Multi-step processes requiring different capabilities at each stage",
      "Quality assurance where automation handles routine tasks and AI provides oversight",
      "Scalable solutions that can grow in sophistication over time"
    ]
  }
};

// Visual Journey Steps with detailed analysis
const journeySteps = [
  {
    id: 1,
    title: "Referral Receipt",
    icon: FileText,
    time: "Day 0 - 2 hours",
    position: { x: 10, y: 15 },
    emotion: "critical",
    emotionIcon: AlertTriangle,
    approach: "hybrid",
    automationPrimary: true,
    description: "Physician sends cancer referral - immediate processing begins",
    automationTasks: [
      "Digital intake forms - Structured data collection",
      "API integrations - System-to-system data transfer", 
      "Data validation - Format checking, required field verification",
      "Automatic routing - Rule-based assignment to departments"
    ],
    aiTasks: [
      "Unstructured document processing - Extracting data from physician notes, faxes",
      "Intelligent routing - Complex decision-making for specialist assignment",
      "Quality enhancement - Understanding context and filling gaps"
    ],
    whyAutomation: "High-volume, structured data transfer with clear validation rules",
    whyAI: "Handles the messiness of real-world medical documents and complex routing decisions",
    phases: [
      "Phase 1: Automation foundation (digital forms, APIs)",
      "Phase 2: AI overlay for unstructured content processing", 
      "Phase 3: AI-driven intelligent routing and quality checks"
    ],
    currentIssues: ["Referrals sit in queue for 24-48 hours", "Manual data entry delays processing"],
    improvement: "Reduce processing time from 48 hours to 2 hours",
    roi: "250% ROI through reduced labor costs and faster patient engagement"
  },
  {
    id: 2,
    title: "Patient Outreach",
    icon: MessageCircle,
    time: "Day 0 - 4 hours", 
    position: { x: 30, y: 15 },
    emotion: "negative",
    emotionIcon: Frown,
    approach: "hybrid",
    automationPrimary: false,
    description: "First attempt to contact patient about their referral",
    automationTasks: [
      "Multi-channel messaging - SMS, email delivery systems",
      "Appointment scheduling - Calendar integration and booking",
      "Reminder systems - Scheduled follow-up communications",
      "Contact tracking - Logging attempts and responses"
    ],
    aiTasks: [
      "Personalized communication - Adapting tone and content to patient needs",
      "Conversation management - Understanding patient responses and context",
      "Emotional intelligence - Detecting anxiety, confusion, or urgency",
      "Dynamic scheduling - Optimizing based on multiple patient and provider factors"
    ],
    whyAutomation: "Reliable delivery mechanisms and scheduling infrastructure",
    whyAI: "Patient communication requires empathy, personalization, and complex reasoning",
    phases: [
      "Phase 1: Automated messaging infrastructure",
      "Phase 2: AI-powered personalization and conversation management",
      "Phase 3: Advanced emotional intelligence and predictive outreach"
    ],
    currentIssues: ["45% contact failure rate on first attempt", "Patients don't recognize hospital numbers"],
    improvement: "Increase successful contact rate from 45% to 85%",
    roi: "300% ROI through reduced no-shows and faster onboarding"
  },
  {
    id: 3,
    title: "Data Collection",
    icon: ClipboardCheck,
    time: "Day 1",
    position: { x: 50, y: 15 },
    emotion: "neutral",
    emotionIcon: Meh,
    approach: "automation",
    automationPrimary: true,
    description: "Patient provides personal and insurance information",
    automationTasks: [
      "Digital forms - Structured data collection",
      "EHR integration - Direct data synchronization",
      "Real-time validation - Immediate error checking",
      "Insurance verification - API-based eligibility checking"
    ],
    aiTasks: [
      "Predictive pre-fill - Using historical data patterns",
      "Form optimization - Dynamic form adaptation",
      "Anomaly detection - Identifying unusual data patterns"
    ],
    whyAutomation: "Highly structured process with clear data formats and validation rules",
    whyAI: "The structured nature of this process doesn't require complex AI reasoning",
    phases: [
      "Phase 1: Full automation implementation (highest ROI)",
      "Phase 2: Consider AI enhancements if significant data quality issues persist"
    ],
    currentIssues: ["45-minute average completion time", "High form abandonment rate"],
    improvement: "Reduce completion time from 45 to 15 minutes",
    roi: "400% ROI - highest impact automation opportunity"
  },
  {
    id: 4,
    title: "Records Acquisition",
    icon: Stethoscope,
    time: "Day 2-5",
    position: { x: 70, y: 15 },
    emotion: "negative",
    emotionIcon: ThumbsDown,
    approach: "hybrid", 
    automationPrimary: true,
    description: "Collecting comprehensive medical history from multiple providers",
    automationTasks: [
      "HIE connections - Electronic record exchange",
      "Automated requests - System-generated record requests",
      "Digital consolidation - Aggregating records in central location",
      "Status tracking - Real-time progress monitoring"
    ],
    aiTasks: [
      "Document analysis - Understanding diverse medical document formats",
      "Information extraction - Pulling relevant clinical data",
      "Medical timeline creation - Synthesizing chronological patient story",
      "Gap identification - Recognizing missing critical information"
    ],
    whyAutomation: "Structured request processes and data movement",
    whyAI: "Medical records are highly unstructured and require clinical understanding",
    phases: [
      "Phase 1: Automation for record acquisition and aggregation",
      "Phase 2: AI for document processing and analysis",
      "Phase 3: Advanced AI for predictive analysis and clinical insights"
    ],
    currentIssues: ["2-week average collection time", "Incomplete record sets"],
    improvement: "Reduce collection time from 2 weeks to 3 days",
    roi: "350% ROI through faster clinical decisions and reduced labor"
  },
  {
    id: 5,
    title: "Insurance Authorization",
    icon: Shield,
    time: "Day 3-7",
    position: { x: 90, y: 15 },
    emotion: "critical",
    emotionIcon: AlertTriangle,
    approach: "hybrid",
    automationPrimary: true,
    description: "Verifying coverage and obtaining necessary pre-authorizations",
    automationTasks: [
      "Real-time API verification - Direct insurance system queries",
      "Benefit calculation - Automated cost estimation",
      "Coverage tracking - Monitoring benefit changes",
      "Standard reporting - Generating coverage summaries"
    ],
    aiTasks: [
      "Approval prediction - Analyzing historical patterns for coverage likelihood",
      "Appeal generation - Creating compelling medical necessity arguments",
      "Alternative identification - Finding better coverage options",
      "Financial assistance matching - Identifying applicable programs"
    ],
    whyAutomation: "Insurance verification follows structured rules and APIs",
    whyAI: "Most cases are straightforward; AI adds value for denials and complex situations",
    phases: [
      "Phase 1: Automation for standard verification (80% of cases)",
      "Phase 2: AI for complex cases, denials, and appeals (20% of cases)",
      "Phase 3: Predictive analytics to prevent denials"
    ],
    currentIssues: ["72% initial approval rate", "3-week appeal process"],
    improvement: "Increase approval rate from 72% to 90%",
    roi: "280% ROI through faster approvals and reduced denials"
  },
  {
    id: 6,
    title: "Clinical Review",
    icon: Target,
    time: "Day 7-10",
    position: { x: 10, y: 55 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "agentic",
    automationPrimary: false,
    description: "Oncologist reviews case and determines optimal treatment approach",
    automationTasks: [
      "Data aggregation - Collecting all patient information",
      "Alert systems - Flagging critical values",
      "Workflow routing - Moving cases through review process",
      "Documentation templates - Structured note creation"
    ],
    aiTasks: [
      "Clinical analysis - Understanding complex medical data",
      "Risk stratification - Calculating personalized risk scores",
      "Treatment recommendations - Suggesting optimal care pathways",
      "Decision support - Providing evidence-based guidance"
    ],
    whyAutomation: "Infrastructure for data management and workflow",
    whyAI: "Clinical decision-making requires medical knowledge, reasoning, and pattern recognition",
    phases: [
      "Phase 1: Automation for data aggregation and basic alerts",
      "Phase 2: AI for clinical analysis and risk assessment",
      "Phase 3: Advanced AI for treatment optimization and outcome prediction"
    ],
    currentIssues: ["30+ minutes per case review", "Incomplete clinical picture"],
    improvement: "Reduce physician review time by 60% while improving decision quality",
    roi: "450% ROI through physician efficiency and better outcomes"
  },
  {
    id: 7,
    title: "Genomic Testing",
    icon: Dna,
    time: "Day 10-15",
    position: { x: 30, y: 55 },
    emotion: "neutral",
    emotionIcon: Meh,
    approach: "hybrid",
    automationPrimary: true,
    description: "Specialized testing requires additional pre-authorization",
    automationTasks: [
      "Digital submission - Electronic form processing",
      "Status tracking - Real-time approval monitoring",
      "Document management - Organizing supporting materials",
      "Workflow automation - Moving requests through approval process"
    ],
    aiTasks: [
      "Medical necessity writing - Creating compelling clinical narratives",
      "Approval prediction - Analyzing likelihood of coverage",
      "Appeal automation - Generating evidence-based appeals",
      "Clinical correlation - Connecting genomic tests to treatment options"
    ],
    whyAutomation: "Structured submission processes and tracking",
    whyAI: "Combines structured process management with complex medical reasoning",
    phases: [
      "Phase 1: Automation for submission and tracking infrastructure",
      "Phase 2: AI for documentation generation and approval prediction",
      "Phase 3: Integrated system with AI-powered appeals and optimization"
    ],
    currentIssues: ["Complex prior authorization requirements", "Delays in test ordering"],
    improvement: "Reduce testing delays from 1 week to 2 days",
    roi: "320% ROI through faster testing and higher approval rates"
  },
  {
    id: 8,
    title: "Appointment Scheduling",
    icon: Calendar,
    time: "Day 12-18",
    position: { x: 50, y: 55 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "hybrid",
    automationPrimary: true,
    description: "First appointment scheduled - relief and anticipation",
    automationTasks: [
      "Online scheduling - Self-service appointment booking",
      "Calendar integration - Real-time availability checking",
      "Automated reminders - SMS/email confirmations",
      "Resource coordination - Room and equipment booking"
    ],
    aiTasks: [
      "Intelligent scheduling - Optimizing based on multiple factors",
      "Preference learning - Adapting to patient and provider patterns",
      "Predictive modeling - Anticipating no-shows and conflicts",
      "Dynamic optimization - Real-time schedule adjustments"
    ],
    whyAutomation: "Scheduling follows logical rules and constraints",
    whyAI: "Optimization requires complex reasoning about multiple variables",
    phases: [
      "Phase 1: Full automation implementation (immediate efficiency gains)",
      "Phase 2: AI optimization layer (enhanced patient satisfaction)",
      "Phase 3: Predictive analytics for proactive management"
    ],
    currentIssues: ["Limited appointment availability", "High no-show rates for new patients"],
    improvement: "Reduce time to first appointment from 3 weeks to 1 week",
    roi: "380% ROI through improved efficiency and reduced no-shows"
  },
  {
    id: 9,
    title: "Pre-Visit Preparation",
    icon: CheckCircle,
    time: "Day 15-20",
    position: { x: 70, y: 55 },
    emotion: "positive",
    emotionIcon: Star,
    approach: "agentic",
    automationPrimary: false,
    description: "Patient receives visit preparation materials and instructions",
    automationTasks: [
      "Content delivery - Sending materials via multiple channels",
      "Progress tracking - Monitoring completion of tasks",
      "Reminder scheduling - Automated follow-up communications",
      "Checklist management - Tracking required pre-visit tasks"
    ],
    aiTasks: [
      "Personalized education - Adapting content to patient understanding",
      "Interactive guidance - Conversational support for preparation",
      "Anxiety management - Emotional support and reassurance",
      "Dynamic adaptation - Adjusting based on patient engagement"
    ],
    whyAutomation: "Reliable delivery and tracking infrastructure",
    whyAI: "Patient education and support require empathy and personalization",
    phases: [
      "Phase 1: Automation for content delivery and tracking",
      "Phase 2: AI for personalization and interactive support",
      "Phase 3: Advanced AI for emotional intelligence and behavioral insights"
    ],
    currentIssues: ["Generic, overwhelming information packets", "Patients arrive unprepared"],
    improvement: "Improve patient preparedness scores from 60% to 95%",
    roi: "280% ROI through better prepared patients and improved outcomes"
  }
];

// Visual scenario data with patient personas
const visualScenarios = [
  {
    id: 1,
    title: "Critical Leukemia Case",
    patientType: "High-Urgency",
    avatar: "👨‍⚕️",
    timeline: "24 hours",
    complexity: "high",
    technologyMix: { automation: 40, ai: 60 },
    outcome: "Success: 18-hour resolution",
    journeyPath: [1, 2, 5, 6, 7],
    keyDecisions: [
      { step: 1, decision: "AI Priority", reason: "Urgent clinical triage needed" },
      { step: 2, decision: "AI-Led", reason: "Emotional support critical" },
      { step: 5, decision: "AI-Enhanced", reason: "Complex approval required" },
      { step: 6, decision: "AI-Primary", reason: "Clinical complexity assessment" },
      { step: 7, decision: "AI-Enhanced", reason: "Complex genomic testing authorization" }
    ]
  },
  {
    id: 2,
    title: "Routine Breast Cancer",
    patientType: "Standard Process",
    avatar: "👩‍🦳",
    timeline: "10 days",
    complexity: "medium",
    technologyMix: { automation: 70, ai: 30 },
    outcome: "Success: 6-day completion",
    journeyPath: [1, 2, 3, 4, 5, 8, 9],
    keyDecisions: [
      { step: 1, decision: "Automation", reason: "Standard referral processing" },
      { step: 2, decision: "Hybrid", reason: "Personalized but predictable" },
      { step: 3, decision: "Automation", reason: "Structured data collection" },
      { step: 4, decision: "Automation", reason: "Standard record requests" },
      { step: 8, decision: "Automation+", reason: "Efficient scheduling with AI optimization" },
      { step: 9, decision: "AI-Enhanced", reason: "Personalized preparation materials" }
    ]
  },
  {
    id: 3,
    title: "Pediatric Complex Case",
    patientType: "Specialized Care",
    avatar: "👶",
    timeline: "48 hours",
    complexity: "high",
    technologyMix: { automation: 30, ai: 70 },
    outcome: "Success: 36-hour coordination",
    journeyPath: [1, 2, 4, 6, 7, 8, 9],
    keyDecisions: [
      { step: 1, decision: "AI-Enhanced", reason: "Rare condition recognition" },
      { step: 2, decision: "AI-Primary", reason: "Family support coordination" },
      { step: 4, decision: "AI-Heavy", reason: "Specialist record analysis" },
      { step: 6, decision: "AI-Expert", reason: "Multi-disciplinary planning" },
      { step: 7, decision: "AI-Complex", reason: "Specialized pediatric testing" },
      { step: 8, decision: "AI-Coordinated", reason: "Multi-specialist scheduling" },
      { step: 9, decision: "AI-Family", reason: "Age-appropriate education and family support" }
    ]
  }
];

const BusinessUseCases = () => {
  const [activeView, setActiveView] = useState<"journey" | "scenarios">("journey");
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [showDecisionFramework, setShowDecisionFramework] = useState(true);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive": return "bg-green-100 border-green-300 text-green-800";
      case "neutral": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "negative": return "bg-orange-100 border-orange-300 text-orange-800";
      case "critical": return "bg-red-100 border-red-300 text-red-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getApproachIcon = (approach: string) => {
    switch (approach) {
      case "automation": return <Wrench className="h-4 w-4 text-blue-500" />;
      case "agentic": return <Bot className="h-4 w-4 text-purple-500" />;
      case "hybrid": return (
        <div className="flex items-center gap-1">
          <Wrench className="h-3 w-3 text-blue-500" />
          <Bot className="h-3 w-3 text-purple-500" />
        </div>
      );
      default: return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation": return "border-blue-200 bg-blue-50";
      case "agentic": return "border-purple-200 bg-purple-50";
      case "hybrid": return "border-indigo-200 bg-gradient-to-br from-blue-50 to-purple-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "high": return "border-red-300 bg-red-50";
      case "medium": return "border-orange-300 bg-orange-50";  
      case "low": return "border-green-300 bg-green-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 animate-scale-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Visual Journey & Technology Experimentation
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Interactive Patient Journey with Visual Decision Framework & Real-World Scenarios
        </p>
      </div>

      {/* Decision Framework (Collapsible) */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-indigo-500" />
              Technology Selection Framework
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDecisionFramework(!showDecisionFramework)}
            >
              {showDecisionFramework ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        {showDecisionFramework && (
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(decisionFramework).map(([key, framework]) => (
                <Card key={key} className={`hover-scale transition-all duration-300 ${getApproachColor(key)}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <framework.icon className="h-8 w-8" />
                      <h3 className="text-lg font-bold">{framework.title}</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                      {framework.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-600" />
                          {criterion}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full max-w-xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="journey" className="flex items-center gap-2">
              <Workflow className="h-4 w-4" />
              Visual Journey Flow
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Patient Scenarios
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Visual Journey Flow */}
      {activeView === "journey" && (
        <div className="space-y-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Network className="h-6 w-6 text-blue-500" />
                Interactive Patient Journey Map
              </CardTitle>
              <p className="text-muted-foreground">Click on any step to see detailed technology analysis</p>
            </CardHeader>
            <CardContent>
              {/* Non-linear Journey Visualization */}
              <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 overflow-hidden">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  {journeySteps.map((step, index) => {
                    if (index < journeySteps.length - 1) {
                      const nextStep = journeySteps[index + 1];
                      return (
                        <line
                          key={`line-${step.id}`}
                          x1={`${step.position.x}%`}
                          y1={`${step.position.y}%`}
                          x2={`${nextStep.position.x}%`}
                          y2={`${nextStep.position.y}%`}
                          stroke="#e5e7eb"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                      );
                    }
                    return null;
                  })}
                </svg>

                {/* Journey Steps */}
                {journeySteps.map((step) => (
                  <div 
                    key={step.id}
                    className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                      selectedStep === step.id ? 'scale-110 z-20' : 'z-10'
                    }`}
                    style={{
                      left: `${step.position.x}%`,
                      top: `${step.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  >
                    <Card className={`w-32 ${getApproachColor(step.approach)} ${
                      selectedStep === step.id ? 'ring-2 ring-blue-400 shadow-xl' : 'shadow-md'
                    }`}>
                      <CardContent className="p-3 text-center">
                        <div className="flex justify-center mb-2">
                          <step.icon className="h-6 w-6" />
                        </div>
                        <div className="text-xs font-medium mb-1">{step.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">{step.time}</div>
                        <div className="flex justify-center items-center gap-1">
                          {getApproachIcon(step.approach)}
                          <step.emotionIcon className={`h-3 w-3 ${
                            step.emotion === 'positive' ? 'text-green-500' :
                            step.emotion === 'negative' ? 'text-orange-500' :
                            step.emotion === 'critical' ? 'text-red-500' : 'text-yellow-500'
                          }`} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>

              {/* Selected Step Details */}
              {selectedStep && (
                <Card className="mt-6 animate-scale-in">
                  <CardContent className="p-6">
                    {(() => {
                      const step = journeySteps.find(s => s.id === selectedStep);
                      if (!step) return null;
                      
                      return (
                        <div className="space-y-6">
                          {/* Step Header */}
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-2xl font-bold flex items-center gap-3">
                                <step.icon className="h-8 w-8" />
                                {step.title}
                              </h3>
                              <p className="text-muted-foreground mt-1">{step.description}</p>
                            </div>
                            <div className="text-right">
                              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getApproachColor(step.approach)}`}>
                                {getApproachIcon(step.approach)}
                                <span className="capitalize">{step.approach} Approach</span>
                                {step.automationPrimary ? " (Automation Primary)" : " (AI Primary)"}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{step.roi}</div>
                            </div>
                          </div>

                          {/* Technology Analysis */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-blue-50 border-blue-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                  <Wrench className="h-4 w-4" />
                                  Automation Tasks
                                </h4>
                                <ul className="space-y-2 text-sm text-blue-700">
                                  {step.automationTasks.map((task, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <Cog className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
                                  <strong>Why Automation:</strong> {step.whyAutomation}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-purple-50 border-purple-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                  <Bot className="h-4 w-4" />
                                  Agentic AI Tasks
                                </h4>
                                <ul className="space-y-2 text-sm text-purple-700">
                                  {step.aiTasks.map((task, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <Brain className="h-3 w-3 text-purple-500 mt-1 flex-shrink-0" />
                                      {task}
                                    </li>
                                  ))}
                                </ul>
                                <div className="mt-3 p-2 bg-purple-100 rounded text-xs">
                                  <strong>Why AI:</strong> {step.whyAI}
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Implementation Phases */}
                          <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Implementation Strategy
                              </h4>
                              <div className="space-y-2">
                                {step.phases.map((phase, index) => (
                                  <div key={index} className="flex items-start gap-3 text-sm text-green-700">
                                    <div className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                      {index + 1}
                                    </div>
                                    {phase}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Current vs Future */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card className="bg-red-50 border-red-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4" />
                                  Current Issues
                                </h4>
                                <ul className="space-y-1 text-sm text-red-700">
                                  {step.currentIssues.map((issue, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                      {issue}
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-green-50 border-green-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4" />
                                  Expected Improvement
                                </h4>
                                <p className="text-sm text-green-700">{step.improvement}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Patient Scenarios View */}
      {activeView === "scenarios" && (
        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                Patient Journey Scenarios with Technology Decisions
              </CardTitle>
              <p className="text-muted-foreground">See how different patient types navigate the journey with optimal technology approaches</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {visualScenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className={`hover-scale transition-all duration-300 cursor-pointer ${
                      selectedScenario === scenario.id ? 'ring-2 ring-blue-400 shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedScenario(selectedScenario === scenario.id ? null : scenario.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Scenario Header */}
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="text-4xl">{scenario.avatar}</div>
                              <div>
                                <h3 className="font-bold text-xl">{scenario.title}</h3>
                                <p className="text-sm text-muted-foreground">{scenario.patientType}</p>
                              </div>
                            </div>
                          </div>
                          
                          <Card className={`${getComplexityColor(scenario.complexity)}`}>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-semibold mb-1">Timeline</h4>
                              <div className="text-lg font-bold">{scenario.timeline}</div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-indigo-200">
                            <CardContent className="p-4 text-center">
                              <h4 className="font-semibold mb-2">Technology Mix</h4>
                              <div className="flex justify-between text-xs">
                                <span>Auto: {scenario.technologyMix.automation}%</span>
                                <span>AI: {scenario.technologyMix.ai}%</span>
                              </div>
                              <Progress value={scenario.technologyMix.automation} className="mt-2" />
                            </CardContent>
                          </Card>
                        </div>

                        {/* Journey Path Visualization */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold mb-3">Patient Journey Path</h4>
                          <div className="flex items-center gap-2 overflow-x-auto">
                            {scenario.journeyPath.map((stepId, index) => {
                              const step = journeySteps.find(s => s.id === stepId);
                              if (!step) return null;
                              
                              return (
                                <div key={stepId} className="flex items-center gap-2">
                                  <Card className={`${getApproachColor(step.approach)} min-w-24`}>
                                    <CardContent className="p-2 text-center">
                                      <step.icon className="h-4 w-4 mx-auto mb-1" />
                                      <div className="text-xs font-medium">{step.title}</div>
                                    </CardContent>
                                  </Card>
                                  {index < scenario.journeyPath.length - 1 && (
                                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {selectedScenario === scenario.id && (
                          <div className="animate-scale-in space-y-4">
                            <Separator />
                            
                            {/* Key Technology Decisions */}
                            <div>
                              <h4 className="font-semibold mb-4">Key Technology Decisions at Each Step</h4>
                              <div className="grid md:grid-cols-2 gap-4">
                                {scenario.keyDecisions.map((decision, index) => {
                                  const step = journeySteps.find(s => s.id === decision.step);
                                  if (!step) return null;
                                  
                                  return (
                                    <Card key={index} className="bg-amber-50 border-amber-200">
                                      <CardContent className="p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                          <step.icon className="h-4 w-4" />
                                          <span className="font-semibold text-sm">{step.title}</span>
                                        </div>
                                        <div className="space-y-2">
                                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                            decision.decision.includes('AI') ? 'bg-purple-100 text-purple-800' : 
                                            decision.decision.includes('Automation') ? 'bg-blue-100 text-blue-800' :
                                            'bg-indigo-100 text-indigo-800'
                                          }`}>
                                            {decision.decision}
                                          </div>
                                          <p className="text-xs text-amber-700">{decision.reason}</p>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Outcome */}
                            <Card className="bg-green-50 border-green-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  Achieved Outcome
                                </h4>
                                <p className="text-sm text-green-700">{scenario.outcome}</p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BusinessUseCases;