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
    ]
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
    ]
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
    ]
  }
};

const journeySteps = {
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
    improvement: "Automated processing reduces response time to under 30 minutes with approx. 95% accuracy in data extraction and consistent AI-driven triage decisions.",
    detailedSubsteps: [
      {
        substep: "Referral Document Intake",
        process: "Automated OCR scanning and parsing of referral documents with intelligent field extraction"
      },
      {
        substep: "Insurance Verification",
        process: "Real-time API calls to insurance databases for eligibility and authorization checks"
      },
      {
        substep: "Medical History Analysis",
        process: "AI-powered review of patient history for risk factors and urgency determination"
      },
      {
        substep: "Provider Matching",
        process: "Intelligent routing to appropriate specialists based on case complexity and availability"
      }
    ]
  },
  {
    id: 2,
    title: "Data Collection",
    icon: ClipboardCheck,
    time: "Day 1-3",
    position: { x: 30, y: 15 },
    emotion: "neutral",
    emotionIcon: Meh,
    approach: "automation",
    description: "Systematic collection of patient information and medical records",
    automationPrimary: true,
    roi: "≈ 45% efficiency gain",
    automationTasks: [
      "Digital form pre-population from existing records",
      "Automated reminder sequences for incomplete submissions",
      "Real-time validation of required fields and formats",
      "Integration with external medical record systems",
      "Standardized data formatting and storage protocols"
    ],
    aiTasks: [
      "Smart form adaptation based on patient responses and complexity",
      "Intelligent follow-up question generation for incomplete data",
      "Risk-based prioritization of data collection sequences",
      "Natural language processing for unstructured patient input",
      "Predictive identification of missing critical information"
    ],
    whyAutomation: "Standardized data collection processes benefit from consistent automation to ensure completeness and reduce manual entry errors",
    whyAI: "Complex cases require adaptive questioning and intelligent prioritization based on patient responses and clinical context",
    phases: [
      "Deploy automated form systems with basic validation",
      "Implement AI for adaptive questioning and response analysis",
      "Integrate predictive models for completeness optimization"
    ],
    currentIssues: [
      "Approx. 20% incomplete forms requiring manual follow-up",
      "Average 2-3 day delay for complete data collection",
      "High patient frustration with repetitive information requests"
    ],
    improvement: "AI-driven adaptive forms reduce completion time to same-day with approx. 90% completeness rate on first submission.",
    detailedSubsteps: [
      {
        substep: "Digital Form Generation",
        process: "Automated creation of patient-specific forms based on referral information and medical history"
      },
      {
        substep: "Patient Portal Integration",
        process: "Seamless integration with patient portals for secure data submission and tracking"
      },
      {
        substep: "Data Validation",
        process: "Real-time validation of submitted information with intelligent error detection and correction suggestions"
      },
      {
        substep: "Follow-up Coordination",
        process: "Automated follow-up sequences for incomplete submissions with personalized messaging"
      }
    ]
  },
  {
    id: 3,
    title: "Record Acquisition",
    icon: Database,
    time: "Day 4-8",
    position: { x: 50, y: 15 },
    emotion: "neutral",
    emotionIcon: Meh,
    approach: "hybrid",
    description: "Acquisition and integration of external medical records and imaging",
    automationPrimary: true,
    roi: "≈ 55% efficiency gain",
    automationTasks: [
      "Automated requests to external healthcare providers",
      "Electronic medical record retrieval via secure APIs",
      "Document scanning and digital conversion processes",
      "Standardized filing and categorization systems",
      "Automated status tracking and follow-up sequences"
    ],
    aiTasks: [
      "Intelligent prioritization of record requests based on clinical relevance",
      "Smart document classification and clinical significance assessment",
      "Predictive identification of missing critical records",
      "Natural language processing for unstructured medical notes",
      "Risk assessment based on incomplete record scenarios"
    ],
    whyAutomation: "Record retrieval involves many standardized processes that benefit from systematic automation and consistent follow-up",
    whyAI: "Clinical judgment is needed to prioritize record requests and assess the significance of missing information for care decisions",
    phases: [
      "Implement automated record request and tracking systems",
      "Deploy AI for document analysis and prioritization",
      "Integrate predictive models for missing record impact assessment"
    ],
    currentIssues: [
      "Approx. 25% of records received incomplete or delayed",
      "Manual tracking leads to lost requests and delays",
      "Difficulty prioritizing critical vs. routine record needs"
    ],
    improvement: "AI-driven record management achieves approx. 95% completion rate with intelligent prioritization reducing critical delays by 80%.",
    detailedSubsteps: [
      {
        substep: "External Provider Contact",
        process: "Automated secure communication with external healthcare providers for record requests"
      },
      {
        substep: "Document Processing",
        process: "Intelligent document scanning, OCR processing, and digital conversion with quality validation"
      },
      {
        substep: "Clinical Review",
        process: "AI-assisted clinical document review with flagging of critical information and gaps"
      },
      {
        substep: "Integration & Storage",
        process: "Secure integration into patient records with standardized categorization and indexing"
      }
    ]
  },
  {
    id: 4,
    title: "Appointment Scheduling",
    icon: Calendar,
    time: "Day 8-12",
    position: { x: 70, y: 15 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "hybrid",
    description: "Intelligent scheduling based on urgency, availability, and patient preferences",
    automationPrimary: false,
    roi: "≈ 70% efficiency gain",
    automationTasks: [
      "Real-time calendar integration and availability checking",
      "Automated appointment confirmation and reminder systems",
      "Insurance pre-authorization processing",
      "Standard scheduling protocol implementation",
      "Automated waitlist management and optimization"
    ],
    aiTasks: [
      "Intelligent urgency assessment and priority scheduling",
      "Personalized appointment timing based on patient factors",
      "Predictive scheduling to minimize cancellations and no-shows",
      "Dynamic resource allocation based on case complexity",
      "Smart conflict resolution for scheduling complications"
    ],
    whyAutomation: "Basic scheduling functions like availability checking and confirmations benefit from reliable automation",
    whyAI: "Complex scheduling decisions require consideration of multiple factors including urgency, patient needs, and resource optimization",
    phases: [
      "Deploy automated scheduling systems with basic intelligence",
      "Implement AI for complex scheduling decisions and optimization",
      "Integrate predictive models for no-show prevention and resource planning"
    ],
    currentIssues: [
      "Approx. 18% appointment cancellation rate due to poor scheduling",
      "Average 7-10 day wait times for non-urgent appointments",
      "Frequent scheduling conflicts requiring manual resolution"
    ],
    improvement: "AI-optimized scheduling reduces wait times to 3-5 days with approx. 8% cancellation rate through intelligent patient-provider matching.",
    detailedSubsteps: [
      {
        substep: "Urgency Assessment",
        process: "AI-driven analysis of case urgency and clinical priority for optimal scheduling timing"
      },
      {
        substep: "Provider Matching",
        process: "Intelligent matching of patients to providers based on expertise, availability, and case complexity"
      },
      {
        substep: "Calendar Optimization",
        process: "Automated calendar management with dynamic scheduling to maximize efficiency and minimize gaps"
      },
      {
        substep: "Patient Communication",
        process: "Personalized appointment confirmations and reminders with preparation instructions"
      }
    ]
  },
  {
    id: 5,
    title: "Pre-visit Preparation",
    icon: ClipboardCheck,
    time: "Day 14-20",
    position: { x: 10, y: 25 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "agentic",
    description: "Comprehensive preparation for optimal visit outcomes",
    automationPrimary: false,
    roi: "≈ 50% efficiency gain",
    automationTasks: [
      "Automated pre-visit checklist generation and distribution",
      "Standard preparation instruction delivery",
      "Insurance verification and co-pay calculation",
      "Basic medication reconciliation from pharmacy records",
      "Automated reminder sequences for preparation tasks"
    ],
    aiTasks: [
      "Personalized preparation plans based on individual patient factors",
      "Intelligent medication interaction checking and optimization",
      "Predictive identification of potential visit complications",
      "Adaptive communication based on patient understanding and compliance",
      "Smart resource allocation for complex cases requiring additional preparation"
    ],
    whyAutomation: "Standard preparation tasks like checklists and reminders benefit from consistent automated delivery",
    whyAI: "Personalized preparation requires understanding of individual patient needs, risks, and optimal communication strategies",
    phases: [
      "Implement automated standard preparation workflows",
      "Deploy AI for personalized preparation planning",
      "Integrate predictive models for complication prevention"
    ],
    currentIssues: [
      "Approx. 30% of patients arrive unprepared for visits",
      "Frequent medication errors and interactions discovered during visits",
      "Generic preparation instructions lead to confusion and non-compliance"
    ],
    improvement: "AI-personalized preparation achieves approx. 92% patient readiness with significant reduction in visit delays and medication errors.",
    detailedSubsteps: [
      {
        substep: "Preparation Planning",
        process: "AI-generated personalized preparation plans based on patient history, procedure type, and individual factors"
      },
      {
        substep: "Medication Review",
        process: "Comprehensive medication reconciliation with AI-powered interaction checking and optimization recommendations"
      },
      {
        substep: "Patient Education",
        process: "Personalized educational materials and instructions delivered through preferred communication channels"
      },
      {
        substep: "Readiness Verification",
        process: "Automated readiness confirmation with intelligent follow-up for preparation gaps"
      }
    ]
  },
  {
    id: 6,
    title: "Visit Conduct",
    icon: Stethoscope,
    time: "Day 21",
    position: { x: 30, y: 25 },
    emotion: "critical",
    emotionIcon: AlertTriangle,
    approach: "agentic",
    description: "AI-assisted clinical visit with real-time decision support",
    automationPrimary: false,
    roi: "≈ 40% efficiency gain",
    automationTasks: [
      "Automated vital sign recording and basic data entry",
      "Standard protocol adherence checking and reminders",
      "Real-time clinical guideline reference and alerts",
      "Automated documentation template generation",
      "Basic scheduling for follow-up procedures"
    ],
    aiTasks: [
      "Real-time clinical decision support and differential diagnosis assistance",
      "Intelligent care plan generation based on visit findings",
      "Personalized treatment recommendation optimization",
      "Predictive risk assessment for treatment complications",
      "Adaptive communication support for complex patient interactions"
    ],
    whyAutomation: "Basic data recording and protocol adherence benefit from systematic automation and consistency",
    whyAI: "Clinical decision-making requires sophisticated analysis of complex factors and personalized treatment optimization",
    phases: [
      "Deploy automated documentation and basic decision support",
      "Implement AI for advanced clinical decision assistance",
      "Integrate predictive models for personalized care optimization"
    ],
    currentIssues: [
      "Approx. 25% of visits result in delayed or suboptimal treatment decisions",
      "High documentation burden reducing time for patient interaction",
      "Inconsistent adherence to best practice guidelines"
    ],
    improvement: "AI-assisted visits improve diagnostic accuracy by approx. 85% while reducing documentation time by 60% and ensuring consistent guideline adherence.",
    detailedSubsteps: [
      {
        substep: "Clinical Assessment",
        process: "AI-enhanced clinical evaluation with real-time decision support and differential diagnosis assistance"
      },
      {
        substep: "Treatment Planning",
        process: "Intelligent treatment plan generation based on evidence-based guidelines and patient-specific factors"
      },
      {
        substep: "Documentation",
        process: "Automated clinical documentation with AI-powered narrative generation and coding assistance"
      },
      {
        substep: "Care Coordination",
        process: "Real-time coordination with other providers and services based on visit outcomes and treatment plans"
      }
    ]
  },
  {
    id: 7,
    title: "Treatment Planning",
    icon: Activity,
    time: "Day 21-25",
    position: { x: 50, y: 25 },
    emotion: "critical",
    emotionIcon: AlertTriangle,
    approach: "agentic",
    description: "Personalized treatment plan development with AI optimization",
    automationPrimary: false,
    roi: "≈ 65% efficiency gain",
    automationTasks: [
      "Standard treatment protocol template generation",
      "Automated drug interaction and allergy checking",
      "Basic insurance coverage verification for treatments",
      "Standard scheduling for treatment phases",
      "Automated generation of patient education materials"
    ],
    aiTasks: [
      "Personalized treatment optimization based on patient factors and outcomes data",
      "Predictive modeling for treatment success and side effect risk",
      "Intelligent sequencing of treatment phases for optimal outcomes",
      "Adaptive care plan modification based on patient response patterns",
      "Smart resource allocation and multidisciplinary team coordination"
    ],
    whyAutomation: "Standard treatment protocols and safety checks benefit from consistent automated verification",
    whyAI: "Personalized treatment optimization requires analysis of complex patient factors and predictive modeling for best outcomes",
    phases: [
      "Implement automated standard treatment protocols",
      "Deploy AI for personalized treatment optimization",
      "Integrate predictive models for outcome optimization"
    ],
    currentIssues: [
      "Approx. 20% of treatment plans require modification due to suboptimal initial design",
      "High variability in treatment outcomes across similar cases",
      "Delayed identification of treatment complications or ineffectiveness"
    ],
    improvement: "AI-optimized treatment planning achieves approx. 90% first-attempt success rate with improved outcomes and reduced complications.",
    detailedSubsteps: [
      {
        substep: "Evidence Review",
        process: "AI-powered analysis of latest clinical evidence and best practices for condition-specific treatment"
      },
      {
        substep: "Personalization",
        process: "Intelligent customization of treatment plans based on patient genetics, comorbidities, and preferences"
      },
      {
        substep: "Risk Assessment",
        process: "Predictive modeling for treatment risks, side effects, and success probability"
      },
      {
        substep: "Team Coordination",
        process: "Automated coordination with multidisciplinary team members and resource scheduling"
      }
    ]
  },
  {
    id: 8,
    title: "Follow-up Monitoring",
    icon: Activity,
    time: "Day 25+ (ongoing)",
    position: { x: 70, y: 25 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "hybrid",
    description: "Continuous monitoring and adaptive care management",
    automationPrimary: true,
    roi: "≈ 55% efficiency gain",
    automationTasks: [
      "Automated appointment scheduling for follow-up visits",
      "Standard monitoring protocol implementation and reminders",
      "Basic lab result processing and normal value flagging",
      "Automated patient satisfaction surveys and feedback collection",
      "Standard progress reporting to referring providers"
    ],
    aiTasks: [
      "Intelligent monitoring frequency optimization based on patient risk and response",
      "Predictive early warning systems for treatment complications",
      "Adaptive care plan modification based on progress indicators",
      "Personalized patient engagement strategies for compliance optimization",
      "Smart escalation protocols for concerning changes in patient status"
    ],
    whyAutomation: "Routine monitoring tasks benefit from consistent automated tracking and standard protocol adherence",
    whyAI: "Adaptive monitoring requires intelligent analysis of patient progress and predictive identification of complications",
    phases: [
      "Deploy automated routine monitoring and scheduling systems",
      "Implement AI for predictive monitoring and early warning systems",
      "Integrate adaptive care modification based on AI insights"
    ],
    currentIssues: [
      "Approx. 15% of complications detected later than optimal intervention window",
      "High patient non-compliance with follow-up schedules",
      "Reactive rather than proactive approach to care adjustments"
    ],
    improvement: "AI-driven monitoring achieves approx. 95% early detection of complications with improved patient engagement and proactive care optimization.",
    detailedSubsteps: [
      {
        substep: "Progress Tracking",
        process: "Automated collection and analysis of patient progress indicators with intelligent trend analysis"
      },
      {
        substep: "Risk Monitoring",
        process: "AI-powered early warning systems for treatment complications and patient deterioration"
      },
      {
        substep: "Care Adaptation",
        process: "Intelligent modification of care plans based on patient response and emerging risk factors"
      },
      {
        substep: "Patient Engagement",
        process: "Personalized patient engagement strategies to optimize compliance and satisfaction"
      }
    ]
  },
  {
    id: 9,
    title: "Outcome Analysis",
    icon: TrendingUp,
    time: "Post-treatment analysis",
    position: { x: 90, y: 25 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "agentic",
    description: "Comprehensive outcome evaluation and learning integration",
    automationPrimary: false,
    roi: "≈ 45% efficiency gain",
    automationTasks: [
      "Automated outcome data collection and standardized reporting",
      "Basic statistical analysis of treatment results",
      "Standard quality metrics calculation and benchmarking",
      "Automated reporting to quality improvement programs",
      "Basic patient satisfaction score compilation"
    ],
    aiTasks: [
      "Advanced outcome analysis with predictive modeling for future cases",
      "Intelligent identification of care improvement opportunities",
      "Personalized outcome prediction and risk stratification for similar patients",
      "Smart learning integration to improve future treatment decisions",
      "Advanced pattern recognition for systematic care optimization"
    ],
    whyAutomation: "Standard outcome measurement and reporting benefit from consistent automated data collection",
    whyAI: "Complex outcome analysis and learning integration require sophisticated pattern recognition and predictive modeling",
    phases: [
      "Implement automated outcome tracking and basic reporting",
      "Deploy AI for advanced analysis and predictive modeling",
      "Integrate machine learning for continuous care improvement"
    ],
    currentIssues: [
      "Approx. 30% of outcome data lost due to manual tracking limitations",
      "Limited ability to identify improvement opportunities from outcome patterns",
      "Reactive approach to quality improvement rather than predictive optimization"
    ],
    improvement: "AI-driven outcome analysis achieves approx. 98% data capture with intelligent identification of improvement opportunities and predictive optimization for future cases.",
    detailedSubsteps: [
      {
        substep: "Data Integration",
        process: "Comprehensive collection and integration of outcome data from multiple sources and timepoints"
      },
      {
        substep: "Pattern Analysis",
        process: "AI-powered analysis of outcome patterns to identify success factors and improvement opportunities"
      },
      {
        substep: "Predictive Modeling",
        process: "Development of predictive models for future case outcomes and optimization strategies"
      },
      {
        substep: "Learning Integration",
        process: "Integration of outcome insights into future care decisions and protocol improvements"
      }
    ]
  }
  ],
  referral: [
    {
      id: 1,
      title: "Referral Receipt",
      icon: FileText,
      time: "Day 0",
      position: { x: 10, y: 15 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Fax/phone/portal-based referrals processed with AI-powered data extraction",
      automationPrimary: false,
      roi: "≈ 70% efficiency gain",
      automationTasks: [
        "Digital intake forms with automated validation",
        "API integration with referring provider systems",
        "Automated data entry and error checking",
        "Standard communication templates for acknowledgments"
      ],
      aiTasks: [
        "Smart routing of referrals based on content analysis",
        "AI-powered data extraction from unstructured documents",
        "Intelligent prioritization based on clinical indicators",
        "Natural language processing of physician notes and faxes"
      ],
      whyAutomation: "Standardized data processing and routing benefit from consistent automation",
      whyAI: "Complex document analysis and intelligent routing require contextual understanding",
      phases: [
        "Implement digital intake automation",
        "Deploy AI for document analysis and routing",
        "Integrate with existing provider networks"
      ],
      currentIssues: [
        "Manual fax processing leads to data entry errors",
        "Delayed referral acknowledgment and routing",
        "Inconsistent prioritization across staff"
      ],
      improvement: "AI-powered processing reduces referral processing time from 4-6 hours to under 30 minutes with 95% accuracy.",
      detailedSubsteps: [
        {
          substep: "Document Reception",
          process: "Automated intake of referrals via multiple channels with intelligent document classification"
        },
        {
          substep: "Data Extraction",
          process: "AI-powered extraction of key information from structured and unstructured referral documents"
        },
        {
          substep: "Initial Triage",
          process: "Intelligent routing and prioritization based on clinical indicators and urgency markers"
        }
      ]
    },
    {
      id: 2,
      title: "Initial Patient Outreach",
      icon: Users,
      time: "Day 0-1",
      position: { x: 30, y: 15 },
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "hybrid",
      description: "Automated communication for scheduling with AI-powered personalization",
      automationPrimary: true,
      roi: "≈ 60% efficiency gain",
      automationTasks: [
        "Automated SMS and email outreach sequences",
        "Self-service patient portal access provisioning",
        "Standardized appointment scheduling workflows",
        "Basic FAQ responses and information delivery"
      ],
      aiTasks: [
        "Personalized AI assistant for initial patient contact",
        "Intelligent chatbot for complex questions and screening",
        "Adaptive communication based on patient responses",
        "Predictive scheduling optimization based on patient preferences"
      ],
      whyAutomation: "High-volume initial outreach benefits from consistent automated messaging",
      whyAI: "Complex patient interactions and personalized communication require intelligent responses",
      phases: [
        "Deploy automated outreach and scheduling systems",
        "Implement AI chatbot for patient interactions",
        "Integrate personalization engines for adaptive communication"
      ],
      currentIssues: [
        "Manual phone calls create delays and inconsistency",
        "High volume of basic questions overwhelming staff",
        "Missed connections requiring multiple callback attempts"
      ],
      improvement: "AI-powered outreach achieves 85% successful first contact with 24/7 availability and personalized responses.",
      detailedSubsteps: [
        {
          substep: "Contact Initiation",
          process: "Automated multi-channel outreach with preferred communication method detection"
        },
        {
          substep: "Interactive Screening",
          process: "AI-powered chatbot handles initial questions and basic information gathering"
        },
        {
          substep: "Scheduling Coordination",
          process: "Intelligent scheduling assistant optimizes appointment timing based on multiple factors"
        }
      ]
    },
    {
      id: 3,
      title: "Demographic & Insurance Data Collection",
      icon: ClipboardCheck,
      time: "Day 1-2",
      position: { x: 50, y: 15 },
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "automation",
      description: "Digital forms with automated validation and AI-powered pre-fill capabilities",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      automationTasks: [
        "Digital patient forms with real-time validation",
        "Direct EHR/CRM synchronization",
        "Automated data capture and verification",
        "Insurance eligibility API integration"
      ],
      aiTasks: [
        "Predictive pre-fill using existing patient data",
        "Real-time insurance eligibility verification with alerts",
        "Intelligent form optimization based on patient responses",
        "Automated detection of missing or inconsistent information"
      ],
      whyAutomation: "Standardized data collection processes benefit from systematic automation",
      whyAI: "Complex form optimization and predictive data entry require intelligent analysis",
      phases: [
        "Implement digital forms with basic validation",
        "Deploy AI for predictive pre-fill and optimization",
        "Integrate real-time verification systems"
      ],
      currentIssues: [
        "Paper forms lead to data entry errors and delays",
        "Manual insurance verification creates bottlenecks",
        "Incomplete submissions requiring multiple follow-ups"
      ],
      improvement: "AI-enhanced digital forms achieve 90% completion rate on first submission with real-time verification.",
      detailedSubsteps: [
        {
          substep: "Form Generation",
          process: "Automated creation of patient-specific forms with intelligent pre-population"
        },
        {
          substep: "Real-time Validation",
          process: "Continuous validation and error prevention during form completion"
        },
        {
          substep: "Insurance Verification",
          process: "Automated eligibility checking with immediate feedback and alerts"
        }
      ]
    },
    {
      id: 4,
      title: "Medical Records Acquisition",
      icon: Database,
      time: "Day 2-5",
      position: { x: 70, y: 15 },
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "hybrid",
      description: "Automated record requests with AI-powered document analysis and summarization",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      automationTasks: [
        "Automated record requests to external providers",
        "Digital record exchange via secure APIs",
        "Standardized document processing and filing",
        "Automated status tracking and follow-up"
      ],
      aiTasks: [
        "AI-powered data extraction from diverse document formats",
        "Intelligent summarization of complex medical records",
        "Identification of critical clinical information and gaps",
        "Predictive assessment of record completeness"
      ],
      whyAutomation: "Record retrieval processes benefit from systematic automation and tracking",
      whyAI: "Document analysis and clinical significance assessment require intelligent interpretation",
      phases: [
        "Implement automated record request systems",
        "Deploy AI for document analysis and extraction",
        "Integrate intelligent summarization capabilities"
      ],
      currentIssues: [
        "Manual record requests via fax create significant delays",
        "Difficulty prioritizing critical vs. routine records",
        "Time-consuming manual review of complex documents"
      ],
      improvement: "AI-powered record management reduces acquisition time by 70% with intelligent prioritization and summarization.",
      detailedSubsteps: [
        {
          substep: "Record Request",
          process: "Automated secure communication with external providers for comprehensive record retrieval"
        },
        {
          substep: "Document Processing",
          process: "AI-powered analysis and extraction of key clinical information from diverse formats"
        },
        {
          substep: "Clinical Summarization",
          process: "Intelligent summarization highlighting critical information and identifying gaps"
        }
      ]
    },
    {
      id: 5,
      title: "Eligibility & Benefit Verification",
      icon: Shield,
      time: "Day 3-4",
      position: { x: 10, y: 25 },
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "hybrid",
      description: "Real-time API verification with AI-powered benefit analysis and financial assistance matching",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
      automationTasks: [
        "Real-time API-based insurance verification",
        "Automated benefit summary generation",
        "Standard coverage checking workflows",
        "Digital documentation and tracking"
      ],
      aiTasks: [
        "Predictive approval likelihood analysis",
        "Intelligent financial assistance program matching",
        "Personalized coverage optimization recommendations",
        "Risk assessment for coverage denials"
      ],
      whyAutomation: "Standard verification processes benefit from real-time automated checking",
      whyAI: "Complex benefit analysis and financial assistance matching require intelligent evaluation",
      phases: [
        "Deploy real-time verification systems",
        "Implement AI for benefit analysis and recommendations",
        "Integrate financial assistance program databases"
      ],
      currentIssues: [
        "Manual insurance calls create delays and errors",
        "Missed opportunities for financial assistance",
        "Inconsistent benefit verification across staff"
      ],
      improvement: "AI-enhanced verification provides immediate results with personalized financial assistance recommendations.",
      detailedSubsteps: [
        {
          substep: "Real-time Verification",
          process: "Automated API-based checking of insurance eligibility and benefits"
        },
        {
          substep: "Benefit Analysis",
          process: "AI-powered analysis of coverage details and identification of potential gaps"
        },
        {
          substep: "Financial Assistance",
          process: "Intelligent matching with available assistance programs and grant opportunities"
        }
      ]
    },
    {
      id: 6,
      title: "Clinical Review & Triage",
      icon: Stethoscope,
      time: "Day 5-7",
      position: { x: 30, y: 25 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-assisted clinical review with intelligent specialist matching and risk stratification",
      automationPrimary: false,
      roi: "≈ 50% efficiency gain",
      automationTasks: [
        "Automated flagging of critical data points",
        "Standard clinical guideline checking",
        "Basic risk factor identification",
        "Template-based clinical summaries"
      ],
      aiTasks: [
        "AI-driven symptom assessment and pattern recognition",
        "Intelligent specialist matching based on clinical profiles",
        "Preliminary risk stratification and urgency scoring",
        "Predictive clinical pathway recommendations"
      ],
      whyAutomation: "Basic clinical data flagging benefits from consistent automated processing",
      whyAI: "Complex clinical decision-making requires sophisticated analysis and pattern recognition",
      phases: [
        "Implement automated clinical data flagging",
        "Deploy AI for specialist matching and risk assessment",
        "Integrate predictive clinical pathway models"
      ],
      currentIssues: [
        "Manual clinical review creates bottlenecks",
        "Inconsistent specialist assignment decisions",
        "Delayed recognition of high-risk cases"
      ],
      improvement: "AI-assisted review reduces processing time by 60% while improving specialist matching accuracy by 85%.",
      detailedSubsteps: [
        {
          substep: "Clinical Data Analysis",
          process: "AI-powered analysis of collected clinical and genomic data for pattern recognition"
        },
        {
          substep: "Risk Stratification",
          process: "Intelligent assessment of case complexity and urgency for appropriate prioritization"
        },
        {
          substep: "Specialist Matching",
          process: "AI-driven matching with appropriate specialists based on clinical profile and availability"
        }
      ]
    },
    {
      id: 7,
      title: "Genomic Test Pre-authorization",
      icon: Dna,
      time: "Day 7-10",
      position: { x: 50, y: 25 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-generated comprehensive PA documentation with predictive approval analysis",
      automationPrimary: false,
      roi: "≈ 85% efficiency gain",
      automationTasks: [
        "Automated PA request submission",
        "Digital status tracking and notifications",
        "Standard documentation template completion",
        "Basic appeals process initiation"
      ],
      aiTasks: [
        "AI-generated comprehensive PA documentation",
        "Predictive approval likelihood assessment",
        "Intelligent appeals documentation generation",
        "Personalized approval strategy optimization"
      ],
      whyAutomation: "Standard PA submission processes benefit from automated workflows",
      whyAI: "Complex documentation generation and approval strategy require intelligent analysis",
      phases: [
        "Implement automated PA submission workflows",
        "Deploy AI for documentation generation and approval prediction",
        "Integrate intelligent appeals management"
      ],
      currentIssues: [
        "Manual PA documentation is time-consuming and inconsistent",
        "High denial rates due to incomplete documentation",
        "Lengthy appeals processes for denied requests"
      ],
      improvement: "AI-generated documentation increases approval rates by 70% with predictive appeal strategies reducing processing time.",
      detailedSubsteps: [
        {
          substep: "Documentation Generation",
          process: "AI-powered creation of comprehensive pre-authorization requests with supporting evidence"
        },
        {
          substep: "Approval Prediction",
          process: "Intelligent analysis of approval likelihood with recommendation optimization"
        },
        {
          substep: "Appeals Management",
          process: "Automated appeals documentation and strategy development for denied requests"
        }
      ]
    },
    {
      id: 8,
      title: "Appointment Scheduling & Coordination",
      icon: Calendar,
      time: "Day 10-12",
      position: { x: 70, y: 25 },
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "AI-optimized scheduling with intelligent conflict resolution and patient preference matching",
      automationPrimary: false,
      roi: "≈ 70% efficiency gain",
      automationTasks: [
        "Online self-scheduling portal access",
        "Automated appointment reminders and confirmations",
        "Basic calendar management and availability checking",
        "Standard rescheduling workflows"
      ],
      aiTasks: [
        "Optimized scheduling based on multiple preference factors",
        "Intelligent conflict resolution for complex scheduling",
        "Predictive no-show prevention and optimization",
        "AI-driven resource allocation and coordination"
      ],
      whyAutomation: "Basic scheduling functions benefit from reliable automated processes",
      whyAI: "Complex scheduling optimization requires intelligent analysis of multiple factors",
      phases: [
        "Deploy automated scheduling and reminder systems",
        "Implement AI for optimization and conflict resolution",
        "Integrate predictive analytics for resource planning"
      ],
      currentIssues: [
        "Manual calendar coordination creates conflicts and delays",
        "High cancellation rates due to poor scheduling optimization",
        "Difficult coordination between multiple providers"
      ],
      improvement: "AI-optimized scheduling reduces cancellations by 40% while improving patient satisfaction and resource utilization.",
      detailedSubsteps: [
        {
          substep: "Schedule Optimization",
          process: "AI-powered optimization considering physician availability, patient preferences, and treatment urgency"
        },
        {
          substep: "Conflict Resolution",
          process: "Intelligent resolution of scheduling conflicts with automated alternative suggestions"
        },
        {
          substep: "Resource Coordination",
          process: "AI-driven coordination of multiple providers and resources for comprehensive care"
        }
      ]
    },
    {
      id: 9,
      title: "Pre-Visit Preparation & Communication",
      icon: MessageCircle,
      time: "Day 12-14",
      position: { x: 10, y: 35 },
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Personalized AI assistant for patient education and interactive preparation guidance",
      automationPrimary: false,
      roi: "≈ 80% efficiency gain",
      automationTasks: [
        "Automated digital packet delivery",
        "Standard preparation reminders and checklists",
        "Basic educational material distribution",
        "Automated pre-visit task tracking"
      ],
      aiTasks: [
        "Personalized AI assistant for patient education",
        "Interactive preparation guides with adaptive content",
        "AI-driven compliance tracking and personalized nudges",
        "Intelligent preparation optimization based on individual needs"
      ],
      whyAutomation: "Standard preparation tasks benefit from consistent automated delivery",
      whyAI: "Personalized education and adaptive guidance require intelligent patient interaction",
      phases: [
        "Implement automated preparation workflows",
        "Deploy AI assistant for personalized education",
        "Integrate adaptive compliance tracking"
      ],
      currentIssues: [
        "Generic preparation instructions lead to confusion",
        "Poor patient compliance with preparation requirements",
        "Manual delivery of materials creates delays"
      ],
      improvement: "AI-personalized preparation achieves 95% patient readiness with interactive guidance and real-time support.",
      detailedSubsteps: [
        {
          substep: "Personalized Education",
          process: "AI-generated educational content tailored to individual patient needs and comprehension level"
        },
        {
          substep: "Interactive Preparation",
          process: "AI assistant guides patients through preparation steps with real-time support"
        },
        {
          substep: "Compliance Tracking",
          process: "Intelligent monitoring and personalized nudges to ensure preparation completeness"
        }
      ]
    }
  ]
};

// Patient scenario details with detailed process breakdowns
const scenarioDetails = {
  sarah: {
    1: [
      {
        substep: "Initial Contact & Triage",
        process: "Sarah's referral arrives via secure portal at 2:15 PM. Automated OCR extracts key data: 45F, family history breast cancer, abnormal mammogram results, insurance: Blue Cross Premier. AI flags 'family history + abnormal screening' = moderate urgency, schedules within 72 hours."
      },
      {
        substep: "Insurance Verification",
        process: "Real-time API check confirms active coverage, $25 copay, prior authorization not required for consultation. System automatically reserves consultation slot and generates preliminary cost estimate."
      },
      {
        substep: "Risk Stratification",
        process: "AI reviews family history (maternal breast cancer age 52, paternal aunt ovarian cancer age 48) + current abnormal mammogram. Risk score: 7.2/10. Flags for genetic counseling consideration and expedited pathology review."
      },
      {
        substep: "Care Team Assignment",
        process: "Based on risk score and location preference, system assigns Dr. Martinez (breast specialist, 15-year experience) with preferred appointment times Tuesday/Thursday mornings per patient portal preferences."
      }
    ],
    2: [
      {
        substep: "Adaptive Form Generation",
        process: "System creates customized intake form pre-populated with referral data. Adds family history questions specific to breast/ovarian cancer, lifestyle factors, and previous screening history. Estimated completion time: 12 minutes."
      },
      {
        substep: "Patient Portal Engagement",
        process: "Sarah receives secure email at 3:45 PM with personalized message: 'Hi Sarah, Dr. Martinez is looking forward to meeting with you. Please complete this brief form to help us provide the best care.' Form includes progress bar and save/resume functionality."
      },
      {
        substep: "Real-time Validation",
        process: "As Sarah completes form, system validates entries: flags potential medication spelling error ('Lipator' suggests 'Lipitor'), confirms family history timeline, and requests clarification on previous biopsy dates."
      },
      {
        substep: "Intelligent Follow-up",
        process: "Sarah saves form 80% complete at 6:30 PM. System automatically sends gentle reminder next morning: 'Just a few more questions to complete your preparation for Thursday's appointment with Dr. Martinez.'"
      }
    ],
    3: [
      {
        substep: "Record Request Prioritization",
        process: "AI prioritizes requests: #1 Previous mammogram images from Radiology Associates (critical for comparison), #2 Primary care records from Dr. Johnson (medical history), #3 Previous biopsy pathology from 2019 (moderate priority)."
      },
      {
        substep: "Automated Communications",
        process: "System sends secure requests to all three providers at 9:00 AM. Radiology Associates responds within 2 hours (digital images via secure portal). Dr. Johnson's office acknowledges, estimates 24-48 hours for records compilation."
      },
      {
        substep: "Document Processing",
        process: "Mammogram images automatically processed and flagged areas of concern highlighted for radiologist review. Previous biopsy shows 'atypical ductal hyperplasia' - AI flags increased cancer risk and suggests genetic testing discussion."
      },
      {
        substep: "Gap Analysis",
        process: "AI identifies missing MRI results mentioned in primary care notes. System automatically requests clarification from Dr. Johnson's office and alerts Dr. Martinez of potential missing imaging for more complete picture."
      }
    ],
    4: [
      {
        substep: "Appointment Optimization",
        process: "Based on urgency score (7.2/10) and availability, system schedules Sarah for Thursday 10:30 AM - Dr. Martinez's preferred time for complex cases. Blocks 45 minutes (vs standard 30) anticipating genetic counseling discussion."
      },
      {
        substep: "Pre-authorization Check",
        process: "System verifies no prior auth needed for consultation but identifies potential need for genetic testing (BRCA1/2). Initiates preliminary authorization request with insurance, estimated approval within 48 hours."
      },
      {
        substep: "Resource Coordination",
        process: "AI anticipates 65% probability of same-day ultrasound request based on case factors. Automatically places soft hold on ultrasound slot for Thursday 11:30 AM. Genetic counselor Dr. Kim flagged for potential consultation."
      },
      {
        substep: "Confirmation & Preparation",
        process: "Sarah receives confirmation call Tuesday evening with personalized script: 'Hi Sarah, confirming Thursday 10:30 AM with Dr. Martinez. Please bring list of medications and avoid caffeine morning of appointment. Parking validation available at front desk.'"
      }
    ],
    5: [
      {
        substep: "Personalized Preparation Plan",
        process: "AI generates Sarah's custom preparation checklist: Bring previous mammogram disk (if not received digitally), list family cancer history with ages at diagnosis, current medications including vitamins/supplements, and comfortable two-piece outfit for potential same-day imaging."
      },
      {
        substep: "Educational Material Customization",
        process: "System selects age-appropriate educational materials about breast cancer screening, genetic testing options (given family history), and what to expect during consultation. Materials sent in preferred format (email) with easy-to-understand language level."
      },
      {
        substep: "Medication Reconciliation",
        process: "AI reviews Sarah's medications against upcoming procedures: Lipitor (continue), multivitamin (continue), occasional ibuprofen (avoid 48 hours before potential biopsy). Generates clear medication instructions with reasoning."
      },
      {
        substep: "Anxiety Management",
        process: "Based on patient portal responses indicating 'very worried,' system includes anxiety management resources: meditation app recommendations, what questions to ask doctor, and contact information for patient navigator if needed for additional support."
      }
    ]
  },
  michael: {
    1: [
      {
        substep: "Complex Case Recognition",
        process: "Michael's referral arrives with multiple flags: 67M, diabetes type 2, hypertension, chronic kidney disease, suspicious lung mass on CT, weight loss 15 lbs/3 months. AI immediately flags as 'high complexity' requiring multidisciplinary approach and expedited scheduling."
      },
      {
        substep: "Insurance & Authorization",
        process: "Medicare Advantage plan verified with complex authorization requirements for oncology services. System initiates multiple prior authorization requests anticipating PET scan, biopsy, and potential treatment needs. Estimated processing time: 5-7 business days."
      },
      {
        substep: "Comorbidity Analysis",
        process: "AI analyzes Michael's conditions: diabetes well-controlled (HbA1c 7.1%), CKD stage 3 (affects contrast agent decisions), hypertension stable. Generates alerts for procedure modifications and coordinates with endocrinology and nephrology teams."
      },
      {
        substep: "Multidisciplinary Planning",
        process: "Based on case complexity, system automatically schedules tumor board review for next Tuesday. Flags need for pulmonologist, medical oncologist, radiation oncologist, and palliative care consultation. Care navigator Mrs. Rodriguez assigned for coordination."
      }
    ],
    2: [
      {
        substep: "Comprehensive Assessment Form",
        process: "System generates extensive intake addressing: detailed smoking history (pack-years), occupational exposures, family cancer history, functional status assessment, advance directive preferences, and caregiver support system evaluation."
      },
      {
        substep: "Caregiver Integration",
        process: "Michael indicates daughter Susan as primary caregiver. System automatically includes her in secure communications with patient consent. Generates separate caregiver information packet about lung cancer, what to expect, and resources for family support."
      },
      {
        substep: "Functional Status Evaluation",
        process: "AI-powered questionnaire assesses Michael's daily activities, energy levels, and symptoms. Identifies moderate fatigue, decreased appetite, and mild shortness of breath on exertion. Flags for performance status evaluation and symptom management."
      },
      {
        substep: "Social Determinants Screening",
        process: "Form includes transportation needs (daughter drives), financial concerns (fixed income), and social support. Identifies potential need for transportation assistance and connects with social work team for financial counseling resources."
      }
    ],
    3: [
      {
        substep: "Comprehensive Record Assembly",
        process: "AI prioritizes critical records: #1 Original CT images and radiology reports, #2 Complete diabetes management records (important for treatment planning), #3 Cardiology records (for surgical risk assessment), #4 Previous imaging for comparison."
      },
      {
        substep: "Clinical Timeline Construction",
        process: "System constructs detailed timeline: weight loss began 4 months ago, cough developed 2 months ago, CT scan 3 weeks ago showed 3.2cm right upper lobe mass. AI identifies concerning rapid progression pattern."
      },
      {
        substep: "Risk Factor Analysis",
        process: "Records reveal 40-pack-year smoking history (quit 5 years ago), asbestos exposure in Navy 1975-1979. AI calculates high lung cancer probability score and flags for aggressive diagnostic workup and veteran benefits eligibility."
      },
      {
        substep: "Medication Interaction Review",
        process: "Comprehensive medication list analyzed: metformin (continue but monitor during contrast procedures), lisinopril (continue), atorvastatin (continue). System flags potential interactions with future chemotherapy agents."
      }
    ]
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
  const currentScenarioDetails = scenarioDetails;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive": return "bg-green-100 border-green-300 text-green-800";
      case "neutral": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "negative": return "bg-orange-100 border-orange-300 text-orange-800";
      case "critical": return "bg-red-100 border-red-300 text-red-800";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation": return "bg-blue-100 border-blue-300 text-blue-800";
      case "agentic": return "bg-purple-100 border-purple-300 text-purple-800";
      case "hybrid": return "bg-indigo-100 border-indigo-300 text-indigo-800";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getApproachIcon = (approach: string) => {
    switch (approach) {
      case "automation": return <Cog className="h-3 w-3" />;
      case "agentic": return <Brain className="h-3 w-3" />;
      case "hybrid": return <Layers className="h-3 w-3" />;
      default: return <Settings className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-2 sm:px-4 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-3 sm:space-y-4 px-4">
        {/* Business Case Selector */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-muted/50 p-1 rounded-lg inline-flex">
            {Object.values(businessCases).map((businessCase) => {
              const Icon = businessCase.icon;
              return (
                <button
                  key={businessCase.id}
                  onClick={() => setSelectedBusinessCase(businessCase.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                    selectedBusinessCase === businessCase.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{businessCase.title}</span>
                  <span className="sm:hidden">{businessCase.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-genie-primary to-genie-secondary bg-clip-text text-transparent leading-tight">
          {currentCase.title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
          {currentCase.description}
        </p>
      </div>

      {/* Journey Map Section */}
      <Card className="w-full mx-auto max-w-7xl">
        <CardHeader className="px-4 sm:px-6 lg:px-8">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-center mb-2 sm:mb-4 leading-tight">
            {selectedBusinessCase === 'referral' ? 'Specialized Oncology Referral Process' : 
             selectedBusinessCase === 'retail' ? 'Customer Experience Journey' : 
             'Patient Journey Through Oncology Care'}
          </CardTitle>
          {/* Instructions for interaction */}
          <div className="text-center mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
              💡 <strong>Click on any step below</strong> to view detailed process breakdown and technology analysis
            </p>
            <div className="inline-flex items-center gap-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              <span className="animate-pulse">👆</span>
              <span>Interactive Journey Map</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:px-4 lg:px-6">
          <div className="relative w-full min-h-[360px] sm:min-h-[420px] lg:min-h-[480px] bg-gradient-to-br from-background via-muted/30 to-background rounded-lg p-2 sm:p-4 lg:p-6 overflow-x-auto">
            <svg
              viewBox="0 0 100 32"
              className="w-full h-full min-w-[340px] sm:min-w-[620px] lg:min-w-[880px]"
              preserveAspectRatio="xMidYMid meet"
            >
              {currentJourneySteps.map((step, index) => {
                const nextStep = currentJourneySteps[index + 1];
                // Define colors for each step
                const stepColors = [
                  { bg: "hsl(0, 70%, 50%)", border: "hsl(0, 70%, 40%)", text: "white" }, // Red
                  { bg: "hsl(30, 70%, 50%)", border: "hsl(30, 70%, 40%)", text: "white" }, // Orange
                  { bg: "hsl(60, 70%, 50%)", border: "hsl(60, 70%, 40%)", text: "black" }, // Yellow
                  { bg: "hsl(120, 70%, 50%)", border: "hsl(120, 70%, 40%)", text: "white" }, // Green
                  { bg: "hsl(200, 70%, 50%)", border: "hsl(200, 70%, 40%)", text: "white" }, // Blue
                  { bg: "hsl(270, 70%, 50%)", border: "hsl(270, 70%, 40%)", text: "white" }, // Purple
                  { bg: "hsl(300, 70%, 50%)", border: "hsl(300, 70%, 40%)", text: "white" }, // Magenta
                  { bg: "hsl(180, 70%, 50%)", border: "hsl(180, 70%, 40%)", text: "black" }, // Cyan
                  { bg: "hsl(40, 70%, 50%)", border: "hsl(40, 70%, 40%)", text: "black" } // Gold
                ];
                const stepColor = stepColors[index % stepColors.length];
                
                return (
                  <g key={step.id}>
                    {/* Connection Line */}
                    {nextStep && (
                      <line
                        x1={step.position.x + 3}
                        y1={step.position.y}
                        x2={nextStep.position.x - 3}
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
              <span className={`text-xs px-2 py-1 rounded border ${getApproachColor('automation')}`}>{/* icon */}<span className="inline-flex items-center gap-1"><span className="inline-block align-middle"><svg width="10" height="10"><circle cx="5" cy="5" r="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1"/></svg></span>Automation</span></span>
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
                      Sarah - Routine
                    </TabsTrigger>
                    <TabsTrigger value="michael" className="text-xs sm:text-sm px-2 py-2">
                      Michael - Complex
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="sarah" className="space-y-3 sm:space-y-4">
                    <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        Sarah's Journey - Routine Breast Cancer Screening Follow-up
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
                        45-year-old with family history, requires follow-up imaging after abnormal mammogram
                      </p>
                      {/* Legend for this scenario */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
                        <span className="font-medium">Legend:</span>
                        <span className={`px-2 py-1 rounded border ${getApproachColor('automation')}`}>Automation</span>
                        <span className={`px-2 py-1 rounded border ${getApproachColor('agentic')}`}>Agentic AI</span>
                        <span className={`px-2 py-1 rounded border ${getApproachColor('hybrid')}`}>Hybrid</span>
                        <span className={`px-2 py-1 rounded border ${getEmotionColor('positive')}`}>Positive</span>
                        <span className={`px-2 py-1 rounded border ${getEmotionColor('neutral')}`}>Neutral</span>
                        <span className={`px-2 py-1 rounded border ${getEmotionColor('critical')}`}>Critical</span>
                      </div>
                    </div>

                    {selectedStep && scenarioDetails.sarah[selectedStep] && (
                      <div className="space-y-2 sm:space-y-3">
                        <h5 className="font-medium text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span>Step {selectedStep}: {currentJourneySteps.find(s => s.id === selectedStep)?.title}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {currentJourneySteps.find(s => s.id === selectedStep)?.time}
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
                        <p className="text-sm sm:text-base">Click on a journey step above to see Sarah's detailed process breakdown</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="michael" className="space-y-3 sm:space-y-4">
                    <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold text-base sm:text-lg mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                        Michael's Journey - Complex Multi-Disciplinary Case
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 leading-relaxed">
                        67-year-old with multiple comorbidities requiring coordinated care across specialties
                      </p>
                    </div>

                    {selectedStep && scenarioDetails.michael[selectedStep] && (
                      <div className="space-y-2 sm:space-y-3">
                        <h5 className="font-medium text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span>Step {selectedStep}: {currentJourneySteps.find(s => s.id === selectedStep)?.title}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {currentJourneySteps.find(s => s.id === selectedStep)?.time}
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
                        <p className="text-sm sm:text-base">Click on a journey step above to see Michael's detailed process breakdown</p>
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
                          {currentJourneySteps.find(s => s.id === selectedStep)?.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {currentJourneySteps.find(s => s.id === selectedStep)?.description}
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
                              {currentJourneySteps.find(s => s.id === selectedStep)?.roi}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 pt-0">
                          <p className="text-xs sm:text-sm text-green-700 font-medium leading-relaxed">
                            {currentJourneySteps.find(s => s.id === selectedStep)?.whyAutomation}
                          </p>
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-green-800">Key Tasks:</h5>
                            <ul className="space-y-1">
                              {currentJourneySteps.find(s => s.id === selectedStep)?.automationTasks.map((task: string, index: number) => (
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
                            {currentJourneySteps.find(s => s.id === selectedStep)?.whyAI}
                          </p>
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-blue-800">AI Capabilities:</h5>
                            <ul className="space-y-1">
                              {currentJourneySteps.find(s => s.id === selectedStep)?.aiTasks.map((task: string, index: number) => (
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
                          {currentJourneySteps.find(s => s.id === selectedStep)?.phases.map((phase: string, index: number) => (
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
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
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