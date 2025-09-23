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
  Database
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

// Journey touchpoints with emotional mapping
interface JourneyTouchpoint {
  id: number;
  time: string;
  title: string;
  description: string;
  emotion: "positive" | "neutral" | "negative" | "critical";
  step: number;
  recommendations: string[];
  currentPainPoints: string[];
  improvementOpportunity: string;
}

const journeyTouchpoints: JourneyTouchpoint[] = [
  {
    id: 1,
    time: "Day 0",
    title: "Referral Received",
    description: "Physician sends cancer referral - patient anxiety begins",
    emotion: "critical",
    step: 1,
    recommendations: [
      "Implement instant acknowledgment automation",
      "Send immediate patient communication within 2 hours",
      "Auto-assign case manager for high-risk cases"
    ],
    currentPainPoints: [
      "Referrals sit in queue for 24-48 hours",
      "No patient communication about next steps",
      "Manual data entry delays processing"
    ],
    improvementOpportunity: "Reduce patient anxiety through immediate response and clear next steps"
  },
  {
    id: 2,
    time: "Day 1",
    title: "Initial Contact Attempt",
    description: "Navigator calls patient for first time - often reaches voicemail",
    emotion: "negative",
    step: 2,
    recommendations: [
      "AI-powered multi-channel outreach (SMS, email, phone)",
      "Personalized messaging based on referral urgency",
      "Intelligent scheduling with patient preferences"
    ],
    currentPainPoints: [
      "Multiple failed contact attempts",
      "Patients don't recognize hospital numbers",
      "No preference tracking for contact times"
    ],
    improvementOpportunity: "Increase contact success rate from 45% to 85% on first attempt"
  },
  {
    id: 3,
    time: "Day 2-3",
    title: "Data Collection",
    description: "Patient provides demographics and insurance - often incomplete",
    emotion: "neutral",
    step: 3,
    recommendations: [
      "Smart form pre-population from EHR data",
      "Real-time insurance verification",
      "Progressive disclosure to reduce form abandonment"
    ],
    currentPainPoints: [
      "Patients overwhelmed by lengthy forms",
      "Insurance verification delays",
      "Missing required documentation"
    ],
    improvementOpportunity: "Reduce data collection time from 45 minutes to 15 minutes"
  },
  {
    id: 4,
    time: "Day 4-7",
    title: "Records Chase",
    description: "Waiting for medical records from multiple providers",
    emotion: "negative",
    step: 4,
    recommendations: [
      "Automated record requests to common providers",
      "AI-powered document analysis and summarization",
      "Predictive timeline communication to patients"
    ],
    currentPainPoints: [
      "Records requests sit for weeks",
      "No visibility into collection progress",
      "Patients feel forgotten in the system"
    ],
    improvementOpportunity: "Reduce records collection time from 2 weeks to 3 days"
  },
  {
    id: 5,
    time: "Day 8-10",
    title: "Insurance Authorization",
    description: "Benefit verification and pre-authorization process",
    emotion: "critical",
    step: 5,
    recommendations: [
      "AI-powered medical necessity letter generation",
      "Predictive approval modeling",
      "Automated appeals for denials"
    ],
    currentPainPoints: [
      "High denial rates for complex cases",
      "Manual appeals process takes weeks",
      "Patients fear financial burden"
    ],
    improvementOpportunity: "Increase approval rate from 72% to 90% with faster processing"
  },
  {
    id: 6,
    time: "Day 11-14",
    title: "Clinical Review",
    description: "Oncologist reviews case and determines treatment plan",
    emotion: "positive",
    step: 6,
    recommendations: [
      "AI-powered case summaries for physicians",
      "Risk stratification and urgency scoring",
      "Treatment pathway recommendations"
    ],
    currentPainPoints: [
      "Physicians spend 30+ minutes reviewing cases",
      "Incomplete clinical picture",
      "Delayed treatment decisions"
    ],
    improvementOpportunity: "Reduce physician review time by 60% while improving decision quality"
  },
  {
    id: 7,
    time: "Day 15-18",
    title: "Genomic Testing Authorization",
    description: "Specialized testing requires additional pre-authorization",
    emotion: "neutral",
    step: 7,
    recommendations: [
      "Automated test ordering based on tumor type",
      "AI-generated clinical justification",
      "Real-time approval tracking"
    ],
    currentPainPoints: [
      "Complex prior authorization requirements",
      "Delays in test ordering",
      "Unclear coverage policies"
    ],
    improvementOpportunity: "Reduce testing delays from 1 week to 2 days"
  },
  {
    id: 8,
    time: "Day 19-21",
    title: "Appointment Scheduling",
    description: "First appointment scheduled - relief and anticipation",
    emotion: "positive",
    step: 8,
    recommendations: [
      "AI-optimized scheduling based on urgency and preferences",
      "Automated appointment preparation",
      "Predictive no-show prevention"
    ],
    currentPainPoints: [
      "Limited appointment availability",
      "Patients unprepared for visits",
      "High no-show rates for new patients"
    ],
    improvementOpportunity: "Reduce time to first appointment from 3 weeks to 1 week"
  },
  {
    id: 9,
    time: "Day 22-25",
    title: "Pre-Visit Preparation",
    description: "Patient receives visit preparation materials and instructions",
    emotion: "positive",
    step: 9,
    recommendations: [
      "Personalized education based on diagnosis",
      "Interactive preparation checklists",
      "AI-powered anxiety management support"
    ],
    currentPainPoints: [
      "Generic, overwhelming information packets",
      "Patients arrive unprepared",
      "High anxiety levels before first visit"
    ],
    improvementOpportunity: "Improve patient preparedness scores from 60% to 95%"
  }
];

const scenarios = [
  {
    id: 1,
    title: "High-Urgency Leukemia Referral",
    description: "45-year-old patient with suspected acute leukemia",
    timeline: "Critical - 48 hour target",
    challenges: ["Complex insurance", "Multiple comorbidities", "High anxiety"],
    outcome: "Patient seen within 36 hours with AI-optimized workflow"
  },
  {
    id: 2,
    title: "Routine Breast Cancer Screening Follow-up",
    description: "62-year-old patient with abnormal mammogram",
    timeline: "Standard - 14 day target",
    challenges: ["Prior authorization needed", "Records from 3 providers"],
    outcome: "Automated workflow completed in 8 days"
  },
  {
    id: 3,
    title: "Pediatric Oncology Complex Case",
    description: "8-year-old with rare tumor requiring specialized care",
    timeline: "Urgent - 72 hour target",
    challenges: ["Rare condition", "Specialized insurance", "Family coordination"],
    outcome: "AI-powered case routing and family support coordination"
  }
];

const BusinessUseCases = () => {
  const [activeView, setActiveView] = useState<"journey" | "scenarios" | "recommendations">("journey");
  const [activeStep, setActiveStep] = useState(1);
  const [activeTouchpoint, setActiveTouchpoint] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

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

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive": return "bg-green-100 border-green-300 text-green-800";
      case "neutral": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "negative": return "bg-orange-100 border-orange-300 text-orange-800";
      case "critical": return "bg-red-100 border-red-300 text-red-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case "positive": return <Star className="h-4 w-4" />;
      case "neutral": return <Clock className="h-4 w-4" />;
      case "negative": return <ArrowDown className="h-4 w-4" />;
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4 animate-scale-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Patient Journey & Technology Strategy
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Visual Journey Mapping with Scenarios, Touchpoints & Strategic Recommendations
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="journey" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Journey Flow
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Use Case Scenarios
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Recommendations
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Journey Flow View */}
      {activeView === "journey" && (
        <div className="space-y-8">
          {/* Emotional Journey Map */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Patient Emotional Journey
              </CardTitle>
              <p className="text-muted-foreground">Track patient experience and identify improvement opportunities</p>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Journey Timeline */}
                <div className="flex justify-between items-center mb-8 overflow-x-auto">
                  {journeyTouchpoints.map((touchpoint, index) => (
                    <div 
                      key={touchpoint.id}
                      className="flex flex-col items-center min-w-32 cursor-pointer group"
                      onClick={() => setActiveTouchpoint(touchpoint.id)}
                    >
                      {/* Timeline Node */}
                      <div className={`
                        w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300
                        ${activeTouchpoint === touchpoint.id ? 'scale-110 shadow-lg' : 'group-hover:scale-105'}
                        ${getEmotionColor(touchpoint.emotion)}
                      `}>
                        {getEmotionIcon(touchpoint.emotion)}
                      </div>
                      
                      {/* Time Label */}
                      <div className="text-xs font-medium mt-2 text-center">
                        {touchpoint.time}
                      </div>
                      
                      {/* Title */}
                      <div className="text-xs text-muted-foreground text-center max-w-24">
                        {touchpoint.title}
                      </div>
                      
                      {/* Connection Line */}
                      {index < journeyTouchpoints.length - 1 && (
                        <div className="absolute top-8 left-1/2 w-full h-1 bg-gradient-to-r from-gray-300 to-gray-300 -z-10" 
                             style={{ left: `${(index + 0.5) * (100 / journeyTouchpoints.length)}%`, width: `${100 / journeyTouchpoints.length}%` }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Touchpoint Details */}
                {activeTouchpoint && (
                  <Card className={`mt-6 animate-scale-in ${getEmotionColor(journeyTouchpoints.find(t => t.id === activeTouchpoint)?.emotion || "neutral")}`}>
                    <CardContent className="p-6">
                      {(() => {
                        const touchpoint = journeyTouchpoints.find(t => t.id === activeTouchpoint);
                        if (!touchpoint) return null;
                        
                        return (
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-xl font-bold">{touchpoint.title}</h3>
                              <p className="text-sm opacity-90">{touchpoint.description}</p>
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-4">
                              <Card className="bg-red-50 border-red-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    Current Pain Points
                                  </h4>
                                  <ul className="space-y-1 text-sm text-red-700">
                                    {touchpoint.currentPainPoints.map((pain, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                        {pain}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4" />
                                    Recommendations
                                  </h4>
                                  <ul className="space-y-1 text-sm text-blue-700">
                                    {touchpoint.recommendations.map((rec, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                                        {rec}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-green-50 border-green-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4" />
                                    Improvement Opportunity
                                  </h4>
                                  <p className="text-sm text-green-700">{touchpoint.improvementOpportunity}</p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scenarios View */}
      {activeView === "scenarios" && (
        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-blue-500" />
                Real-World Use Case Scenarios
              </CardTitle>
              <p className="text-muted-foreground">How different patient cases flow through the optimized system</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id} className="hover-scale transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <h3 className="font-bold text-lg mb-2">{scenario.title}</h3>
                          <p className="text-sm text-muted-foreground">{scenario.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-blue-700">Timeline</h4>
                          <Badge variant="outline">{scenario.timeline}</Badge>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-orange-700">Challenges</h4>
                          <ul className="space-y-1">
                            {scenario.challenges.map((challenge, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                                {challenge}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-green-700">Outcome</h4>
                          <p className="text-sm text-green-600 flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {scenario.outcome}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recommendations View */}
      {activeView === "recommendations" && (
        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Brain className="h-6 w-6 text-purple-500" />
                Strategic Technology Recommendations
              </CardTitle>
              <p className="text-muted-foreground">Prioritized implementation roadmap for maximum impact</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* High Impact Quick Wins */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-green-700">🚀 High Impact Quick Wins (0-3 months)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          Automated Patient Communication
                        </h4>
                        <p className="text-sm mb-3">Implement multi-channel outreach with SMS, email, and phone integration</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600">ROI: 300%</span>
                          <span className="text-gray-600">Implementation: 4-6 weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Database className="h-4 w-4" />
                          Insurance Verification Automation
                        </h4>
                        <p className="text-sm mb-3">Real-time API integration for eligibility and benefit verification</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600">ROI: 250%</span>
                          <span className="text-gray-600">Implementation: 6-8 weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Medium Term Strategic Improvements */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-700">⚡ Strategic Improvements (3-9 months)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          AI-Powered Document Processing
                        </h4>
                        <p className="text-sm mb-3">Intelligent extraction and analysis of unstructured medical records</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-blue-600">ROI: 400%</span>
                          <span className="text-gray-600">Implementation: 12-16 weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Predictive Risk Stratification
                        </h4>
                        <p className="text-sm mb-3">AI models for patient urgency assessment and resource allocation</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-blue-600">ROI: 350%</span>
                          <span className="text-gray-600">Implementation: 16-20 weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Long Term Transformational */}
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-700">🎯 Transformational Initiatives (9+ months)</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          Integrated Care Orchestration
                        </h4>
                        <p className="text-sm mb-3">End-to-end AI agents managing entire patient journey</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-600">ROI: 500%</span>
                          <span className="text-gray-600">Implementation: 24+ weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-purple-50 border-purple-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Predictive Analytics Platform
                        </h4>
                        <p className="text-sm mb-3">Machine learning for outcome prediction and resource optimization</p>
                        <div className="flex justify-between text-xs">
                          <span className="text-purple-600">ROI: 600%</span>
                          <span className="text-gray-600">Implementation: 30+ weeks</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BusinessUseCases;