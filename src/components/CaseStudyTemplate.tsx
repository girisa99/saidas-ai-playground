import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  Settings, 
  Bot, 
  Zap, 
  Shield, 
  Database, 
  Network,
  Activity,
  Star,
  Lightbulb,
  Briefcase,
  Heart,
  Brain,
  MessageCircle,
  FileText,
  ClipboardCheck,
  Stethoscope,
  UserCheck,
  AlertTriangle,
  ThumbsUp,
  Meh,
  Award,
  BarChart3,
  DollarSign,
  Calendar,
  Layers,
  Workflow
} from "lucide-react";

// Dynamic Case Study Data Interface
interface CaseStudyStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  time: string;
  emotion: 'critical' | 'positive' | 'neutral';
  emotionIcon: any;
  approach: 'automation' | 'agentic' | 'hybrid';
  automationPrimary: boolean;
  roi: string;
  implementationStatus: 'live' | 'testing' | 'development' | 'planned';
  statusNote?: string;
  automationTasks: string[];
  aiTasks: string[];
  whyAutomation: string;
  whyAI: string;
  phases: string[];
  currentIssues: string[];
  improvement: string;
  technologyStack?: {
    automation: string[];
    ai: string[];
    integration: string[];
  };
  gartnerValue?: {
    give: string[];
    get: string[];
  };
}

interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  industry: string;
  status: 'live' | 'mixed' | 'development';
  icon: any;
  heroImage?: string;
  overview: {
    challenge: string;
    solution: string;
    impact: string;
    timeline: string;
  };
  metrics: {
    efficiency: string;
    accuracy: string;
    cost: string;
    satisfaction: string;
  };
  businessValue: {
    current: string[];
    target: string[];
  };
  steps: CaseStudyStep[];
  gartnerFramework: {
    valueCreation: {
      listen: string[];
      design: string[];
      build: string[];
      deliver: string[];
    };
    valueRealization: {
      efficiency: string[];
      experience: string[];
      growth: string[];
      innovation: string[];
    };
  };
  integrationBlueprint: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
  };
  lessonsLearned: string[];
  nextSteps: string[];
}

// Patient Onboarding Case Study Template Data
const patientOnboardingCaseStudy: CaseStudyData = {
  id: "patient-onboarding",
  title: "AI-Powered Patient Onboarding System",
  subtitle: "Transforming Healthcare Access Through Intelligent Automation",
  description: "A comprehensive case study demonstrating rapid AI-powered development of a fully functional patient enrollment application built in 3 days with 90% accuracy, saving over 70% development costs.",
  industry: "Healthcare",
  status: "mixed",
  icon: UserCheck,
  overview: {
    challenge: "Manual patient onboarding processes were causing 4-6 hour delays, 15% data entry errors, and poor patient experience with multiple touchpoints and communication gaps.",
    solution: "Designed and developed a comprehensive patient enrollment system integrating automation workflows with Agentic AI for intelligent process verification, provider verification and credentialing, patient credentialing validation, and ICD code processing to optimize the entire patient onboarding journey.",
    impact: "Achieved functional application development in 3 days with 90% system accuracy and over 70% development cost savings.",
    timeline: "Less than 3 weeks for continuous optimization to production-ready deployment"
  },
  metrics: {
    efficiency: "3 days to design, build & test",
    accuracy: "90% system accuracy",
    cost: ">70% dev cost saved",
    satisfaction: "9.2/10 tech rating"
  },
  businessValue: {
    current: [
      "40% of patients experience scheduling delays",
      "25% staff productivity loss due to manual tasks",
      "30% increase in administrative errors",
      "6.2/10 patient satisfaction scores",
      "35% increase in provider burnout"
    ],
    target: [
      "Rapid design-to-deployment patient enrollment system",
      "Automated credentialing and verification workflows", 
      "Agentic AI for ICD code processing and validation",
      "Integrated testing framework for accuracy assurance",
      "Production-ready system with continuous optimization"
    ]
  },
  steps: [
    {
      id: 1,
      title: "Referral Receipt & Digital Intake",
      description: "Immediate digital referral processing with AI-powered triage and intelligent routing to appropriate specialists",
      icon: FileText,
      time: "Day 0 (0-30 minutes)",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      automationPrimary: true,
      roi: "75% efficiency gain",
      implementationStatus: "live",
      statusNote: "Digital intake and basic validation operational",
      automationTasks: [
        "Digital intake form parsing from fax/portal",
        "Automated data extraction and validation",
        "Basic referral completeness checking",
        "Standard acknowledgment notifications",
        "Automated referral tracking and logging"
      ],
      aiTasks: [
        "Intelligent referral routing based on urgency and specialty",
        "Smart data extraction from unstructured documents", 
        "AI-powered clinical priority assessment",
        "Predictive resource allocation for complex cases",
        "Natural language processing for clinical notes"
      ],
      whyAutomation: "Digital intake systems provide consistent data collection and validation for rapid prototype development",
      whyAI: "Agentic AI enables intelligent document processing, triage decisions, and adaptive routing based on complex healthcare requirements",
      phases: [
        "Rapid prototype development using AI-assisted coding tools",
        "Deploy Agentic AI for intelligent document processing and triage", 
        "Integrate experimental validation and continuous feedback loops"
      ],
      currentIssues: [
        "Traditional development cycles take weeks for basic functionality",
        "Manual document processing creates significant development overhead",
        "Complex healthcare requirements need intelligent interpretation",
        "Testing cycles require extensive manual validation"
      ],
      improvement: "AI-assisted development delivers functional prototype in 3 days with 90% system accuracy in automated processing.",
      technologyStack: {
        automation: ["RPA for fax processing", "Form validation APIs", "Workflow orchestration"],
        ai: ["NLP for document parsing", "Clinical decision trees", "Predictive routing algorithms"],
        integration: ["FHIR APIs", "HL7 messaging", "EHR connectors"]
      },
      gartnerValue: {
        give: ["Digital infrastructure investment", "Staff training time", "Integration effort"],
        get: ["30 min response time", "95% accuracy", "Predictable workflows"]
      }
    },
    {
      id: 2,
      title: "Intelligent Patient Outreach",
      description: "Personalized AI-driven patient communication with multi-channel support and intelligent conversation flows",
      icon: MessageCircle,
      time: "Day 0-1 (within 2 hours)",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      automationPrimary: false,
      roi: "60% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Basic communication workflows deployed, AI personalization in testing",
      automationTasks: [
        "Automated SMS/email welcome messages",
        "Basic appointment availability checking",
        "Standard patient portal account setup",
        "Routine reminder scheduling"
      ],
      aiTasks: [
        "Personalized communication based on patient profile",
        "Intelligent FAQ chatbot for initial questions",
        "AI-powered sentiment analysis and escalation",
        "Dynamic conversation flow based on patient responses",
        "Multi-language support for diverse patient populations"
      ],
      whyAutomation: "Standard communication workflows benefit from consistent automated delivery",
      whyAI: "Patient interactions require personalized communication and intelligent response to individual needs",
      phases: [
        "Deploy automated communication workflows",
        "Implement AI chatbot for initial screening",
        "Integrate sentiment analysis for escalation"
      ],
      currentIssues: [
        "Manual phone calls create delays and missed connections",
        "Generic communication leads to patient confusion",
        "Staff overwhelmed with routine questions",
        "Language barriers affect patient engagement"
      ],
      improvement: "AI-driven communication achieves 85% first-contact success with personalized messaging.",
      technologyStack: {
        automation: ["CRM integration", "SMS/Email platforms", "Calendar APIs"],
        ai: ["Conversational AI", "Sentiment analysis", "Language translation"],
        integration: ["Patient portal APIs", "Communication channels", "Escalation workflows"]
      },
      gartnerValue: {
        give: ["AI platform licensing", "Communication infrastructure", "Training resources"],
        get: ["85% contact success", "Personalized experience", "Multi-language support"]
      }
    },
    {
      id: 3,
      title: "Provider Network Verification",
      description: "Comprehensive verification of provider credentials, network participation, and treatment center validation",
      icon: Network,
      time: "Day 1-2 (real-time)",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      automationPrimary: true,
      roi: "85% efficiency gain",
      implementationStatus: "live",
      automationTasks: [
        "NPI database lookups and verification",
        "Automated credentialing status checks",
        "Network participation validation",
        "Provider directory updates"
      ],
      aiTasks: [
        "Intelligent provider matching based on specialty and location",
        "AI-powered credentialing status prediction",
        "Smart network optimization recommendations",
        "Predictive provider availability analysis"
      ],
      whyAutomation: "Provider verification workflows benefit from standardized API integration and automated database lookups",
      whyAI: "Agentic AI excels at complex credentialing analysis, network optimization, and intelligent provider matching across multiple healthcare systems",
      phases: [
        "Rapid development of automated verification APIs using AI-assisted coding",
        "Deploy Agentic AI for complex credentialing analysis and validation",
        "Integrate experimental learning algorithms for continuous improvement"
      ],
      currentIssues: [
        "Traditional verification system development requires extensive manual coding",
        "Complex credentialing rules need intelligent interpretation and automation",
        "Provider network optimization requires advanced analytical capabilities"
      ],
      improvement: "AI-enhanced development achieves production-ready verification system with Agentic AI providing 99% accurate provider matching.",
      technologyStack: {
        automation: ["NPI registry APIs", "Credentialing databases", "Network directories"],
        ai: ["Matching algorithms", "Predictive analytics", "Optimization engines"],
        integration: ["Provider networks", "Credentialing systems", "Directory services"]
      },
      gartnerValue: {
        give: ["API integration costs", "Database subscriptions", "Verification protocols"],
        get: ["99% matching accuracy", "Real-time verification", "Optimal provider selection"]
      }
    },
    {
      id: 4,
      title: "Smart Insurance Verification",
      description: "Real-time insurance eligibility verification with AI-powered benefit interpretation and financial assistance matching",
      icon: Shield,
      time: "Day 2-3 (real-time)",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      automationPrimary: true,
      roi: "80% efficiency gain",
      implementationStatus: "live",
      automationTasks: [
        "Real-time API-based verification with payers",
        "Automated benefit summaries generation",
        "Standard pre-authorization tracking",
        "Routine eligibility status updates"
      ],
      aiTasks: [
        "Predictive approval likelihood based on policy rules",
        "Intelligent identification of coverage gaps",
        "AI-driven financial assistance program matching",
        "Smart appeals strategy development"
      ],
      whyAutomation: "Insurance verification involves repetitive API calls and data processing",
      whyAI: "Complex benefit interpretation and financial assistance matching require intelligent analysis",
      phases: [
        "Deploy real-time insurance verification APIs",
        "Implement AI for benefit interpretation",
        "Integrate predictive approval analytics"
      ],
      currentIssues: [
        "Manual calls to payers create delays and errors",
        "Complex benefit structures difficult to interpret",
        "Missed opportunities for coverage optimization"
      ],
      improvement: "AI-enhanced verification reduces processing time to real-time with 95% accuracy.",
      technologyStack: {
        automation: ["Payer APIs", "Eligibility engines", "Pre-auth systems"],
        ai: ["Policy interpretation", "Risk assessment", "Financial matching"],
        integration: ["Insurance networks", "Benefit platforms", "Assistance programs"]
      },
      gartnerValue: {
        give: ["API licensing fees", "Integration complexity", "Compliance requirements"],
        get: ["Real-time verification", "95% accuracy", "Financial optimization"]
      }
    },
    {
      id: 5,
      title: "AI-Assisted Clinical Review",
      description: "Intelligent clinical assessment with AI-powered risk stratification and specialist matching",
      icon: Stethoscope,
      time: "Day 3-5 (2-4 hours)",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      automationPrimary: false,
      roi: "50% efficiency gain",
      implementationStatus: "development",
      statusNote: "Core clinical flagging live, AI assessment in development",
      automationTasks: [
        "Automated flagging of critical data points",
        "Standard protocol checklist generation",
        "Basic risk stratification algorithms",
        "Routine specialist availability checking"
      ],
      aiTasks: [
        "AI-driven symptom assessment and risk stratification",
        "Intelligent specialist matching based on profiles",
        "Predictive treatment pathway recommendations",
        "Smart care team coordination"
      ],
      whyAutomation: "Basic clinical data flagging and checklists benefit from standardized automation",
      whyAI: "Complex clinical decision-making and specialist matching require advanced intelligence",
      phases: [
        "Implement automated clinical flagging systems",
        "Deploy AI for specialist matching and risk assessment",
        "Integrate predictive treatment planning"
      ],
      currentIssues: [
        "Manual review creates bottlenecks and delays",
        "Inconsistent specialist assignment decisions",
        "Variable risk assessment across providers"
      ],
      improvement: "AI-assisted review reduces assessment time by 50% with consistent specialist matching.",
      technologyStack: {
        automation: ["Clinical protocols", "Flagging systems", "Availability checkers"],
        ai: ["Risk stratification", "Specialist matching", "Treatment prediction"],
        integration: ["EHR systems", "Clinical databases", "Specialist networks"]
      },
      gartnerValue: {
        give: ["Clinical AI investment", "Specialist network integration", "Training requirements"],
        get: ["50% faster review", "Consistent matching", "Predictive insights"]
      }
    },
    {
      id: 6,
      title: "Personalized Appointment Scheduling",
      description: "AI-optimized scheduling with patient preferences, provider availability, and treatment requirements",
      icon: Calendar,
      time: "Day 5-7 (same day)",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      automationPrimary: false,
      roi: "65% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Basic scheduling live, AI optimization in testing",
      automationTasks: [
        "Real-time availability checking",
        "Automated appointment confirmation",
        "Standard reminder scheduling",
        "Basic conflict resolution"
      ],
      aiTasks: [
        "Intelligent scheduling optimization",
        "Patient preference analysis",
        "Predictive no-show prevention",
        "Dynamic rescheduling suggestions"
      ],
      whyAutomation: "Appointment scheduling involves standard calendar management and confirmations",
      whyAI: "Optimization requires intelligent analysis of multiple variables and preferences",
      phases: [
        "Deploy automated scheduling workflows",
        "Implement AI optimization algorithms",
        "Integrate predictive analytics"
      ],
      currentIssues: [
        "Manual scheduling creates delays",
        "Suboptimal appointment timing",
        "High no-show rates"
      ],
      improvement: "AI-driven scheduling achieves 90% optimal appointment placement with 25% reduction in no-shows.",
      technologyStack: {
        automation: ["Calendar APIs", "Confirmation systems", "Reminder platforms"],
        ai: ["Optimization algorithms", "Preference learning", "Predictive models"],
        integration: ["Scheduling systems", "Patient preferences", "Provider calendars"]
      },
      gartnerValue: {
        give: ["Scheduling platform costs", "AI development effort", "Integration complexity"],
        get: ["90% optimal placement", "25% fewer no-shows", "Patient satisfaction"]
      }
    }
  ],
  gartnerFramework: {
    valueCreation: {
      listen: [
        "Patient feedback on manual process pain points",
        "Staff reports of administrative burden",
        "Provider input on workflow inefficiencies",
        "Data analysis of current process bottlenecks"
      ],
      design: [
        "Hybrid automation-AI approach design",
        "Patient-centric communication workflows", 
        "Real-time verification system architecture",
        "Personalized scheduling optimization framework"
      ],
      build: [
        "Digital intake and triage systems",
        "AI-powered communication platforms",
        "Automated verification workflows",
        "Intelligent scheduling optimization"
      ],
      deliver: [
        "Phased rollout with continuous monitoring",
        "Staff training and change management",
        "Patient education and adoption support",
        "Performance optimization and refinement"
      ]
    },
    valueRealization: {
      efficiency: [
        "Rapid development cycles through AI-assisted coding",
        "Automated testing and deployment pipelines", 
        "Streamlined provider verification workflows",
        "Real-time system accuracy monitoring"
      ],
      experience: [
        "Enhanced user interface design through iterative testing",
        "Personalized patient enrollment journeys",
        "Multi-modal communication channels",
        "Continuous feedback integration loops"
      ],
      growth: [
        "Scalable architecture supporting experimental features",
        "Modular system design for rapid feature addition",
        "Data-driven insights for process optimization",
        "Platform extensibility for future use cases"
      ],
      innovation: [
        "Agentic AI for autonomous process optimization",
        "Experimental hybrid automation approaches", 
        "Advanced credentialing verification systems",
        "Continuous learning from implementation outcomes"
      ]
    }
  },
  integrationBlueprint: {
    phase1: [
      "Rapid prototype development using AI-assisted coding",
      "Core enrollment workflow automation design",
      "Provider verification API integration setup",
      "Initial testing framework implementation"
    ],
    phase2: [
      "Agentic AI deployment for credentialing workflows",
      "ICD code processing automation integration",
      "Patient journey optimization algorithms",
      "Iterative testing and feedback integration"
    ],
    phase3: [
      "Advanced AI model fine-tuning for accuracy",
      "Scalable architecture optimization for production",
      "Continuous learning system deployment",
      "Production readiness validation and monitoring"
    ]
  },
  lessonsLearned: [
    "AI-assisted development accelerates prototype to production timeline",
    "Agentic AI excels at complex verification and credentialing tasks",
    "Iterative testing approach ensures high system accuracy",
    "Modular architecture enables rapid feature experimentation",
    "Provider verification automation significantly reduces manual overhead",
    "Continuous feedback loops essential for AI model optimization"
  ],
  nextSteps: [
    "Expand Agentic AI capabilities to additional healthcare workflows",
    "Integrate advanced learning models for predictive analytics",
    "Develop reusable template framework for rapid deployment",
    "Explore multi-agent collaboration for complex care coordination",
    "Implement advanced monitoring and observability systems",
    "Scale experimental approach to enterprise healthcare platforms"
  ]
};

interface CaseStudyTemplateProps {
  caseStudyData: CaseStudyData;
}

const CaseStudyTemplate = ({ caseStudyData }: CaseStudyTemplateProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");


  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation": return "bg-blue-100 text-blue-800 border-blue-200";
      case "agentic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "hybrid": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const IconComponent = caseStudyData.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-br from-genie-primary/10 to-genie-secondary/10 border border-genie-primary/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-genie-primary/20 rounded-xl">
            <IconComponent className="w-8 h-8 text-genie-primary" />
          </div>
          <div>
            <Badge className={`mb-2 ${caseStudyData.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {caseStudyData.industry} • {caseStudyData.status === 'live' ? 'Live Production' : 'Mixed Implementation'}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{caseStudyData.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{caseStudyData.subtitle}</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">{caseStudyData.description}</p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <TrendingUp className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.efficiency}</div>
            <div className="text-sm text-muted-foreground">Efficiency Gain</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <Target className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.accuracy}</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <DollarSign className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.cost}</div>
            <div className="text-sm text-muted-foreground">Annual Savings</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <Star className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.satisfaction}</div>
            <div className="text-sm text-muted-foreground">Patient Rating</div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journey">Step-by-Step Journey</TabsTrigger>
          <TabsTrigger value="gartner">Gartner Framework</TabsTrigger>
          <TabsTrigger value="blueprint">Integration Blueprint</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenge & Solution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.challenge}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Current Issues:</h4>
                  <ul className="space-y-1">
                    {caseStudyData.businessValue.current.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                        <ArrowDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.solution}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Target Outcomes:</h4>
                  <ul className="space-y-1">
                    {caseStudyData.businessValue.target.map((target, index) => (
                      <li key={index} className="text-sm text-green-600 flex items-start gap-2">
                        <ArrowUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {target}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Impact & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.impact}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.timeline}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journey" className="mt-8">
          {/* Visual Journey Steps */}
          <div className="space-y-8">
            {caseStudyData.steps.map((step, index) => {
              const StepIcon = step.icon;
              const EmotionIcon = step.emotionIcon;
              
              return (
                <Card key={step.id} className={`relative overflow-hidden ${activeStep === index ? 'ring-2 ring-genie-primary' : ''}`}>
                  {/* Progress Connector */}
                  {index < caseStudyData.steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-genie-primary/30 z-10"></div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      {/* Step Number & Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-genie-primary/20 rounded-full flex items-center justify-center relative">
                          <StepIcon className="w-8 h-8 text-genie-primary" />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border">
                            <span className="text-xs font-bold text-genie-primary">{step.id}</span>
                          </div>
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={`border ${getApproachColor(step.approach)}`}>
                            {step.approach === 'automation' && <Settings className="w-3 h-3 mr-1" />}
                            {step.approach === 'agentic' && <Bot className="w-3 h-3 mr-1" />}
                            {step.approach === 'hybrid' && <Zap className="w-3 h-3 mr-1" />}
                            {step.approach}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <EmotionIcon className={`w-4 h-4 ${
                              step.emotion === 'critical' ? 'text-red-500' : 
                              step.emotion === 'positive' ? 'text-green-500' : 'text-gray-500'
                            }`} />
                            <span className="text-xs capitalize">{step.emotion}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        
                        {step.statusNote && (
                          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                            <strong>Status:</strong> {step.statusNote}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Expandable Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Current Issues & Improvement */}
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Current Issues
                        </h4>
                        <ul className="space-y-1 mb-4">
                          {step.currentIssues.map((issue, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ArrowDown className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                          <h5 className="font-semibold text-green-700 text-sm mb-1">Improvement Achieved</h5>
                          <p className="text-sm text-green-600">{step.improvement}</p>
                        </div>
                      </div>

                      {/* Technology Stack */}
                      {step.technologyStack && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Technology Stack
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-medium text-blue-600 mb-1">Automation</h5>
                              <div className="flex flex-wrap gap-1">
                                {step.technologyStack.automation.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-purple-600 mb-1">AI/ML</h5>
                              <div className="flex flex-wrap gap-1">
                                {step.technologyStack.ai.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-green-600 mb-1">Integration</h5>
                              <div className="flex flex-wrap gap-1">
                                {step.technologyStack.integration.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gartner Value Exchange */}
                    {step.gartnerValue && (
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Gartner Value Exchange
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-3 bg-red-50 border border-red-200 rounded">
                            <h5 className="font-medium text-red-700 text-sm mb-2">Value Creation (Give)</h5>
                            <ul className="space-y-1">
                              {step.gartnerValue.give.map((item, idx) => (
                                <li key={idx} className="text-xs text-red-600 flex items-center gap-1">
                                  <ArrowDown className="w-3 h-3" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-green-50 border border-green-200 rounded">
                            <h5 className="font-medium text-green-700 text-sm mb-2">Value Realization (Get)</h5>
                            <ul className="space-y-1">
                              {step.gartnerValue.get.map((item, idx) => (
                                <li key={idx} className="text-xs text-green-600 flex items-center gap-1">
                                  <ArrowUp className="w-3 h-3" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Why Automation vs AI */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Why Automation?
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.whyAutomation}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Why AI?
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.whyAI}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="gartner" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Value Creation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <ArrowDown className="w-5 h-5" />
                  Value Creation (Give)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Listen & Sense</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.listen.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Design</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.design.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Build</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.build.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deliver</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.deliver.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Value Realization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ArrowUp className="w-5 h-5" />
                  Value Realization (Get)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Efficiency</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.efficiency.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.experience.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Growth</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.growth.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Innovation</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.innovation.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blueprint" className="mt-8">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Integration Blueprint</h2>
              <p className="text-muted-foreground">Three-phase implementation approach for scalable deployment</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    Foundation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudyData.integrationBlueprint.phase1.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Phase 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudyData.integrationBlueprint.phase2.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Phase 3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudyData.integrationBlueprint.phase3.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lessons Learned */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Lessons Learned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {caseStudyData.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-yellow-600">{idx + 1}</span>
                      </div>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-green-500" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {caseStudyData.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-600">{idx + 1}</span>
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main component that uses the template
const PatientOnboardingCaseStudy = () => {
  return <CaseStudyTemplate caseStudyData={patientOnboardingCaseStudy} />;
};

export { CaseStudyTemplate, PatientOnboardingCaseStudy, type CaseStudyData };
export default PatientOnboardingCaseStudy;