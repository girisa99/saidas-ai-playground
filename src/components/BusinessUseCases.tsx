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

// Enhanced journey touchpoints with technology recommendations
interface JourneyTouchpoint {
  id: number;
  time: string;
  title: string;
  description: string;
  emotion: "positive" | "neutral" | "negative" | "critical";
  step: number;
  recommendedApproach: "automation" | "agentic" | "hybrid";
  whyThisApproach: string;
  automationBenefits: string[];
  agenticBenefits: string[];
  hybridStrategy?: string;
  implementationSteps: string[];
  currentPainPoints: string[];
  improvementOpportunity: string;
  roiImpact: string;
}

const journeyTouchpoints: JourneyTouchpoint[] = [
  {
    id: 1,
    time: "Day 0 - 2 hours",
    title: "Referral Received & Initial Processing",
    description: "Physician sends cancer referral - immediate processing begins",
    emotion: "critical",
    step: 1,
    recommendedApproach: "hybrid",
    whyThisApproach: "Structured data needs automation speed, but unstructured physician notes require AI interpretation",
    automationBenefits: [
      "Instant digital form processing",
      "Automatic data validation",
      "Real-time routing to appropriate department",
      "Immediate acknowledgment to referring physician"
    ],
    agenticBenefits: [
      "Extract key information from fax/PDF referrals",
      "Understand clinical urgency from physician notes",
      "Intelligent routing based on cancer type and complexity",
      "Generate personalized patient communication"
    ],
    hybridStrategy: "Automation handles structured intake, AI processes unstructured content and makes intelligent routing decisions",
    implementationSteps: [
      "Phase 1: Deploy digital intake automation (2-4 weeks)",
      "Phase 2: Add AI document processing (4-6 weeks)", 
      "Phase 3: Implement intelligent routing (2-3 weeks)"
    ],
    currentPainPoints: [
      "Referrals sit in queue for 24-48 hours",
      "Manual data entry delays processing",
      "No immediate patient communication"
    ],
    improvementOpportunity: "Reduce processing time from 48 hours to 2 hours",
    roiImpact: "250% ROI through reduced labor costs and faster patient engagement"
  },
  {
    id: 2,
    time: "Day 0 - 4 hours",
    title: "Patient Outreach & Initial Contact",
    description: "First attempt to contact patient about their referral",
    emotion: "negative",
    step: 2,
    recommendedApproach: "agentic",
    whyThisApproach: "Requires personalization, emotional intelligence, and adaptive communication strategies",
    automationBenefits: [
      "Multi-channel messaging delivery",
      "Scheduled follow-up reminders",
      "Contact attempt logging"
    ],
    agenticBenefits: [
      "Personalized messaging based on cancer type and patient profile",
      "Adaptive communication style based on patient responses",
      "Emotional support and anxiety management",
      "Intelligent scheduling based on patient preferences and availability",
      "Real-time conversation management"
    ],
    hybridStrategy: "Automation handles message delivery infrastructure, AI manages personalization and conversation flow",
    implementationSteps: [
      "Phase 1: Set up automated messaging infrastructure (3-4 weeks)",
      "Phase 2: Deploy AI conversation management (6-8 weeks)",
      "Phase 3: Add emotional intelligence features (4-6 weeks)"
    ],
    currentPainPoints: [
      "45% contact failure rate on first attempt",
      "Patients don't recognize hospital numbers",
      "Generic messaging increases anxiety"
    ],
    improvementOpportunity: "Increase successful contact rate from 45% to 85%",
    roiImpact: "300% ROI through reduced no-shows and faster onboarding"
  },
  {
    id: 3,
    time: "Day 1",
    title: "Demographics & Insurance Collection",
    description: "Patient provides personal and insurance information",
    emotion: "neutral",
    step: 3,
    recommendedApproach: "automation",
    whyThisApproach: "Highly structured process with clear validation rules - perfect for automation",
    automationBenefits: [
      "Digital forms with real-time validation",
      "EHR integration for data pre-population",
      "Instant insurance eligibility verification",
      "Automatic error checking and correction prompts"
    ],
    agenticBenefits: [
      "Predictive form completion",
      "Adaptive questioning based on responses",
      "Anomaly detection for unusual patterns"
    ],
    implementationSteps: [
      "Phase 1: Deploy digital forms with validation (2-3 weeks)",
      "Phase 2: Integrate with EHR systems (3-4 weeks)",
      "Phase 3: Add real-time insurance verification (2-3 weeks)"
    ],
    currentPainPoints: [
      "45-minute average completion time",
      "High form abandonment rate",
      "Insurance verification delays"
    ],
    improvementOpportunity: "Reduce completion time from 45 to 15 minutes",
    roiImpact: "400% ROI - highest impact automation opportunity"
  },
  {
    id: 4,
    time: "Day 2-5",
    title: "Medical Records Acquisition",
    description: "Collecting comprehensive medical history from multiple providers",
    emotion: "negative",
    step: 4,
    recommendedApproach: "hybrid",
    whyThisApproach: "Record requests can be automated, but document analysis requires AI interpretation",
    automationBenefits: [
      "Automated record requests to common providers",
      "Digital document aggregation",
      "Status tracking and follow-up reminders",
      "Provider portal integrations"
    ],
    agenticBenefits: [
      "Intelligent document analysis and summarization",
      "Medical timeline creation from diverse sources",
      "Gap identification and targeted follow-up",
      "Clinical relevance scoring"
    ],
    hybridStrategy: "Automation requests and aggregates records, AI analyzes and creates actionable clinical summaries",
    implementationSteps: [
      "Phase 1: Automate record requests (4-5 weeks)",
      "Phase 2: Deploy AI document processing (8-10 weeks)",
      "Phase 3: Create clinical summary generation (4-6 weeks)"
    ],
    currentPainPoints: [
      "2-week average collection time",
      "Incomplete record sets",
      "Manual review bottlenecks"
    ],
    improvementOpportunity: "Reduce collection time from 2 weeks to 3 days",
    roiImpact: "350% ROI through faster clinical decisions and reduced labor"
  },
  {
    id: 5,
    time: "Day 3-7",
    title: "Insurance Authorization & Benefits",
    description: "Verifying coverage and obtaining necessary pre-authorizations",
    emotion: "critical",
    step: 5,
    recommendedApproach: "hybrid",
    whyThisApproach: "Standard verifications suit automation, but complex appeals require AI reasoning",
    automationBenefits: [
      "Real-time eligibility verification APIs",
      "Standard pre-authorization submissions",
      "Coverage calculation and cost estimation",
      "Automated status tracking"
    ],
    agenticBenefits: [
      "Medical necessity letter generation",
      "Approval probability prediction",
      "Intelligent appeal creation for denials",
      "Alternative coverage pathway identification"
    ],
    hybridStrategy: "Automation handles 80% of standard cases, AI manages complex cases and appeals",
    implementationSteps: [
      "Phase 1: Deploy automated verification (3-4 weeks)",
      "Phase 2: Add AI for complex cases (6-8 weeks)",
      "Phase 3: Implement predictive appeals (4-5 weeks)"
    ],
    currentPainPoints: [
      "72% initial approval rate",
      "3-week appeal process",
      "High patient anxiety about costs"
    ],
    improvementOpportunity: "Increase approval rate from 72% to 90%",
    roiImpact: "280% ROI through faster approvals and reduced denials"
  },
  {
    id: 6,
    time: "Day 7-10",
    title: "Clinical Review & Treatment Planning",
    description: "Oncologist reviews case and determines optimal treatment approach",
    emotion: "positive",
    step: 6,
    recommendedApproach: "agentic",
    whyThisApproach: "Complex medical decision-making requires AI reasoning and clinical intelligence",
    automationBenefits: [
      "Data aggregation from all sources",
      "Alert generation for critical values",
      "Template-based documentation",
      "Workflow routing"
    ],
    agenticBenefits: [
      "Comprehensive case summarization",
      "Risk stratification and prognostic modeling",
      "Treatment pathway recommendations",
      "Clinical decision support with evidence",
      "Personalized treatment plan generation"
    ],
    implementationSteps: [
      "Phase 1: Automate data aggregation (2-3 weeks)",
      "Phase 2: Deploy AI clinical analysis (10-12 weeks)",
      "Phase 3: Add treatment recommendations (6-8 weeks)"
    ],
    currentPainPoints: [
      "30+ minutes per case review",
      "Incomplete clinical picture",
      "Delayed treatment decisions"
    ],
    improvementOpportunity: "Reduce physician review time by 60% while improving decision quality",
    roiImpact: "450% ROI through physician efficiency and better outcomes"
  }
];

const enhancedScenarios = [
  {
    id: 1,
    title: "High-Urgency Leukemia Referral",
    description: "45-year-old patient with suspected acute leukemia requiring immediate intervention",
    timeline: "Critical - 24 hour target",
    urgencyLevel: "critical",
    recommendedStrategy: "AI-First Hybrid",
    challenges: [
      "Complex insurance requiring pre-auth",
      "Multiple comorbidities affecting treatment",
      "High patient anxiety and family concerns",
      "Need for immediate specialist consultation"
    ],
    technologyApproach: {
      automation: "40%",
      agentic: "60%",
      reasoning: "High-stakes decisions require AI reasoning, but automation handles urgent processing"
    },
    stepByStepFlow: [
      {
        step: "Referral Processing",
        approach: "Hybrid",
        detail: "AI immediately prioritizes based on clinical indicators, automation handles routing"
      },
      {
        step: "Patient Contact",
        approach: "Agentic AI",
        detail: "AI provides emotional support and urgent scheduling with empathetic communication"
      },
      {
        step: "Insurance Auth",
        approach: "AI-Powered",
        detail: "AI generates compelling medical necessity with urgency documentation"
      },
      {
        step: "Clinical Review",
        approach: "AI-Assisted",
        detail: "AI provides risk stratification and treatment urgency recommendations"
      }
    ],
    outcome: "Patient seen within 18 hours with 95% insurance approval rate",
    roiImpact: "500% ROI through life-saving rapid response and optimized resource allocation"
  },
  {
    id: 2,
    title: "Routine Breast Cancer Follow-up",
    description: "62-year-old patient with abnormal mammogram requiring oncology consultation",
    timeline: "Standard - 10 day target",
    urgencyLevel: "standard",
    recommendedStrategy: "Automation-First Hybrid",
    challenges: [
      "Standard insurance requiring documentation",
      "Records from multiple imaging centers",
      "Patient preference for specific appointment times",
      "Coordination with imaging schedule"
    ],
    technologyApproach: {
      automation: "70%",
      agentic: "30%",
      reasoning: "Standard workflow with predictable steps, AI adds personalization and optimization"
    },
    stepByStepFlow: [
      {
        step: "Referral Processing",
        approach: "Automation",
        detail: "Standard digital processing with automatic routing to breast oncology"
      },
      {
        step: "Patient Contact",
        approach: "Hybrid",
        detail: "Automated outreach with AI personalization based on patient anxiety levels"
      },
      {
        step: "Records Collection",
        approach: "Automation",
        detail: "Automated requests to imaging centers with digital aggregation"
      },
      {
        step: "Scheduling",
        approach: "AI-Optimized",
        detail: "AI optimizes scheduling based on patient preferences and imaging coordination"
      }
    ],
    outcome: "Complete workflow in 6 days with 98% patient satisfaction",
    roiImpact: "320% ROI through streamlined automation and reduced manual touchpoints"
  },
  {
    id: 3,
    title: "Complex Pediatric Oncology Case",
    description: "8-year-old with rare tumor requiring multidisciplinary care coordination",
    timeline: "Urgent - 48 hour target",
    urgencyLevel: "urgent",
    recommendedStrategy: "AI-Driven Coordination",
    challenges: [
      "Rare condition requiring specialist expertise",
      "Complex family dynamics and emotional support needs",
      "Specialized pediatric insurance requirements",
      "Coordination with multiple subspecialists",
      "Educational material for age-appropriate communication"
    ],
    technologyApproach: {
      automation: "30%",
      agentic: "70%",
      reasoning: "Complex case requiring AI reasoning for coordination and family support"
    },
    stepByStepFlow: [
      {
        step: "Referral Triage",
        approach: "AI-Powered",
        detail: "AI recognizes rare condition and automatically escalates to pediatric oncology team"
      },
      {
        step: "Family Communication",
        approach: "Agentic AI",
        detail: "AI provides age-appropriate explanations and emotional support coordination"
      },
      {
        step: "Specialist Coordination",
        approach: "AI-Orchestrated",
        detail: "AI coordinates schedules across multiple subspecialists for comprehensive care"
      },
      {
        step: "Treatment Planning",
        approach: "AI-Assisted",
        detail: "AI aggregates rare disease protocols and suggests optimal treatment pathways"
      }
    ],
    outcome: "Comprehensive care plan within 36 hours with coordinated family support",
    roiImpact: "400% ROI through optimized specialist coordination and improved family experience"
  }
];

const BusinessUseCases = () => {
  const [activeView, setActiveView] = useState<"journey" | "scenarios" | "recommendations">("journey");
  const [activeStep, setActiveStep] = useState(1);
  const [activeTouchpoint, setActiveTouchpoint] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getApproachIcon = (approach: string) => {
    switch (approach) {
      case "automation": return <Settings className="h-4 w-4 text-blue-500" />;
      case "agentic": return <Bot className="h-4 w-4 text-purple-500" />;
      case "hybrid": return (
        <div className="flex items-center gap-1">
          <Zap className="h-4 w-4 text-blue-500" />
          <Bot className="h-4 w-4 text-purple-500" />
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "border-red-300 bg-red-50";
      case "urgent": return "border-orange-300 bg-orange-50";  
      case "standard": return "border-green-300 bg-green-50";
      default: return "border-gray-300 bg-gray-50";
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
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full max-w-xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="journey" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Journey Flow & Steps
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Use Case Scenarios
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

                {activeTouchpoint && (
                  <Card className={`mt-6 animate-scale-in`}>
                    <CardContent className="p-6">
                      {(() => {
                        const touchpoint = journeyTouchpoints.find(t => t.id === activeTouchpoint);
                        if (!touchpoint) return null;
                        
                        return (
                          <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">{touchpoint.title}</h3>
                                <p className="text-muted-foreground mb-4">{touchpoint.description}</p>
                                
                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getApproachColor(touchpoint.recommendedApproach)}`}>
                                  {getApproachIcon(touchpoint.recommendedApproach)}
                                  <span className="capitalize">{touchpoint.recommendedApproach} Approach</span>
                                </div>
                              </div>
                              
                              <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold text-blue-800 mb-2">Why This Approach?</h4>
                                  <p className="text-sm text-blue-700">{touchpoint.whyThisApproach}</p>
                                  <div className="mt-3 text-xs text-blue-600">
                                    <strong>ROI Impact:</strong> {touchpoint.roiImpact}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Technology Benefits Comparison */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                    <Settings className="h-4 w-4" />
                                    Automation Benefits
                                  </h4>
                                  <ul className="space-y-2 text-sm text-blue-700">
                                    {touchpoint.automationBenefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                              
                              <Card className="bg-purple-50 border-purple-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                    <Bot className="h-4 w-4" />
                                    Agentic AI Benefits
                                  </h4>
                                  <ul className="space-y-2 text-sm text-purple-700">
                                    {touchpoint.agenticBenefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-3 w-3 text-purple-500 mt-1 flex-shrink-0" />
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Hybrid Strategy */}
                            {touchpoint.hybridStrategy && (
                              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-indigo-200">
                                <CardContent className="p-4">
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-blue-600" />
                                    <Bot className="h-4 w-4 text-purple-600" />
                                    Hybrid Strategy
                                  </h4>
                                  <p className="text-sm">{touchpoint.hybridStrategy}</p>
                                </CardContent>
                              </Card>
                            )}

                            {/* Implementation Timeline */}
                            <Card className="bg-green-50 border-green-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  Implementation Steps
                                </h4>
                                <div className="space-y-2">
                                  {touchpoint.implementationSteps.map((step, index) => (
                                    <div key={index} className="flex items-start gap-2 text-sm text-green-700">
                                      <div className="w-5 h-5 rounded-full bg-green-200 text-green-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                        {index + 1}
                                      </div>
                                      {step}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                            
                            {/* Current vs Future State */}
                            <div className="grid md:grid-cols-2 gap-4">
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

      {/* Enhanced Scenarios View */}
      {activeView === "scenarios" && (
        <div className="space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-blue-500" />
                Real-World Use Case Scenarios with Technology Strategy
              </CardTitle>
              <p className="text-muted-foreground">Detailed analysis of different patient cases and optimal technology approaches</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {enhancedScenarios.map((scenario) => (
                  <Card key={scenario.id} className="hover-scale transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Scenario Header */}
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-xl">{scenario.title}</h3>
                              <Badge className={`${getUrgencyColor(scenario.urgencyLevel)} text-xs`}>
                                {scenario.timeline}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{scenario.description}</p>
                          </div>
                          
                          <Card className={`${getApproachColor(scenario.recommendedStrategy.includes('AI') ? 'agentic' : scenario.recommendedStrategy.includes('Automation') ? 'automation' : 'hybrid')}`}>
                            <CardContent className="p-4 text-center">
                              <h4 className="font-semibold mb-2">Recommended Strategy</h4>
                              <div className="text-lg font-bold">{scenario.recommendedStrategy}</div>
                              <div className="text-xs mt-2 space-y-1">
                                <div>Automation: {scenario.technologyApproach.automation}</div>
                                <div>Agentic AI: {scenario.technologyApproach.agentic}</div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Technology Approach Reasoning */}
                        <Card className="bg-amber-50 border-amber-200">
                          <CardContent className="p-4">
                            <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              Why This Technology Mix?
                            </h4>
                            <p className="text-sm text-amber-700">{scenario.technologyApproach.reasoning}</p>
                          </CardContent>
                        </Card>

                        {/* Step-by-Step Flow */}
                        <div>
                          <h4 className="font-semibold mb-4 text-lg">Step-by-Step Technology Implementation</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {scenario.stepByStepFlow.map((step, index) => (
                              <Card key={index} className={`${getApproachColor(step.approach.toLowerCase().includes('hybrid') ? 'hybrid' : step.approach.toLowerCase().includes('ai') ? 'agentic' : 'automation')}`}>
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-semibold">{step.step}</h5>
                                    <div className="flex items-center gap-1">
                                      {getApproachIcon(step.approach.toLowerCase().includes('hybrid') ? 'hybrid' : step.approach.toLowerCase().includes('ai') ? 'agentic' : 'automation')}
                                      <span className="text-xs font-medium">{step.approach}</span>
                                    </div>
                                  </div>
                                  <p className="text-sm">{step.detail}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>

                        {/* Challenges and Outcome */}
                        <div className="grid md:grid-cols-2 gap-4">
                          <Card className="bg-orange-50 border-orange-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Key Challenges
                              </h4>
                              <ul className="space-y-2">
                                {scenario.challenges.map((challenge, index) => (
                                  <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                                    <div className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                    {challenge}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-green-50 border-green-200">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Achieved Outcome
                              </h4>
                              <p className="text-sm text-green-700 mb-3">{scenario.outcome}</p>
                              <div className="text-xs text-green-600 font-semibold">
                                {scenario.roiImpact}
                              </div>
                            </CardContent>
                          </Card>
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
    </div>
  );
};

export default BusinessUseCases;