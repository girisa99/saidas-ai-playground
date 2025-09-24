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
      time: "Day 0",
      position: { x: 12, y: 18 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Immediate digital referral processing with AI-powered triage and routing",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
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
        "Inconsistent urgency assessment across staff",
        "Lost referrals due to manual tracking"
      ],
      improvement: "AI-powered processing reduces response time to under 30 minutes with 95% accuracy in data extraction."
    },
    {
      id: 2,
      title: "Initial Patient Outreach",
      icon: MessageCircle,
      time: "Day 0-1",
      position: { x: 32, y: 18 },
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Personalized AI-driven patient communication and initial screening",
      automationPrimary: false,
      roi: "≈ 60% efficiency gain",
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
      improvement: "AI-driven communication achieves 85% first-contact success with personalized messaging."
    },
    {
      id: 3,
      title: "Provider, Treatment Center & Referral Network Check",
      icon: Network,
      time: "Day 1-2",
      position: { x: 52, y: 18 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Comprehensive verification of provider NPI, treatment center NPI, and credentialing status",
      automationPrimary: true,
      roi: "≈ 85% efficiency gain",
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
      whyAutomation: "Provider verification involves standardized database queries and status checks",
      whyAI: "Complex network optimization and provider matching require intelligent analysis",
      phases: [
        "Implement automated NPI verification systems",
        "Deploy AI for provider matching optimization",
        "Integrate predictive credentialing analytics"
      ],
      currentIssues: [
        "Manual NPI lookups cause significant delays",
        "Outdated credentialing information leads to rejections",
        "Suboptimal provider matching affects patient outcomes"
      ],
      improvement: "AI-enhanced verification ensures 99% accurate provider matching with real-time credentialing status."
    },
    {
      id: 4,
      title: "Demographic & Insurance Data Collection",
      icon: ClipboardCheck,
      time: "Day 2-3",
      position: { x: 72, y: 18 },
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "automation",
      description: "Systematic collection of patient information and insurance verification",
      automationPrimary: true,
      roi: "≈ 70% efficiency gain",
      automationTasks: [
        "Digital form pre-population from existing records",
        "Automated insurance eligibility verification",
        "Real-time validation of required fields",
        "Integration with external databases",
        "Automated demographic data cleansing"
      ],
      aiTasks: [
        "Smart form adaptation based on patient responses",
        "Predictive pre-fill of forms using existing data",
        "Real-time insurance eligibility verification with alerts",
        "Intelligent identification of financial assistance programs"
      ],
      whyAutomation: "Standardized data collection benefits from consistent automated workflows",
      whyAI: "Complex insurance verification and financial assistance matching requires intelligent analysis",
      phases: [
        "Deploy automated form systems with validation",
        "Implement AI for predictive data entry",
        "Integrate financial assistance program matching"
      ],
      currentIssues: [
        "Paper forms prone to inaccuracies and delays",
        "Manual insurance verification creates bottlenecks",
        "Missed opportunities for financial assistance"
      ],
      improvement: "AI-driven data collection achieves 95% accuracy with automated insurance verification."
    },
    {
      id: 4,
      title: "Medical Records Acquisition",
      icon: Database,
      time: "Day 2-5",
      position: { x: 72, y: 18 },
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "hybrid",
      description: "Acquisition and integration of external medical records",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      automationTasks: [
        "Automated requests to external providers via HIE",
        "Secure digital exchange of medical records",
        "Document scanning and digital conversion",
        "Automated status tracking and follow-up"
      ],
      aiTasks: [
        "AI-powered data extraction from diverse documents",
        "Intelligent prioritization based on clinical relevance",
        "Smart document classification and summarization",
        "Identification of critical clinical information"
      ],
      whyAutomation: "Record retrieval involves standardized processes that benefit from automation",
      whyAI: "Document analysis and prioritization require intelligent interpretation of clinical content",
      phases: [
        "Implement automated record request systems",
        "Deploy AI for document analysis and extraction",
        "Integrate clinical relevance prioritization"
      ],
      currentIssues: [
        "Manual requests via fax/mail cause significant delays",
        "Difficulty identifying critical vs routine information",
        "Lost requests and incomplete record collection"
      ],
      improvement: "AI-driven record management reduces acquisition time by 60% with intelligent prioritization."
    },
    {
      id: 5,
      title: "Eligibility & Benefit Verification",
      icon: Shield,
      time: "Day 3-4",
      position: { x: 12, y: 32 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Comprehensive insurance verification and benefit analysis",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
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
      improvement: "AI-enhanced verification reduces processing time to real-time with 95% accuracy."
    },
    {
      id: 6,
      title: "Clinical Review & Triage",
      icon: Stethoscope,
      time: "Day 5-7",
      position: { x: 32, y: 32 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-assisted clinical assessment and specialist matching",
      automationPrimary: false,
      roi: "≈ 50% efficiency gain",
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
      improvement: "AI-assisted review reduces assessment time by 50% with consistent specialist matching."
    },
    {
      id: 7,
      title: "Genomic Test Pre-authorization",
      icon: Dna,
      time: "Day 7-10",
      position: { x: 52, y: 32 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-generated comprehensive pre-authorization documentation",
      automationPrimary: false,
      roi: "≈ 70% efficiency gain",
      automationTasks: [
        "Automated submission of PA requests",
        "Digital status tracking and updates",
        "Standard documentation template generation",
        "Routine follow-up scheduling"
      ],
      aiTasks: [
        "AI-generated comprehensive PA documentation",
        "Predictive approval likelihood assessment",
        "Intelligent appeals documentation generation",
        "Smart approval strategy optimization"
      ],
      whyAutomation: "Standard PA submission processes benefit from automated workflows",
      whyAI: "Complex documentation generation and approval strategy require intelligent analysis",
      phases: [
        "Implement automated PA submission workflows",
        "Deploy AI for documentation generation",
        "Integrate predictive approval analytics"
      ],
      currentIssues: [
        "Manual PA documentation is time-consuming",
        "High denial rates due to incomplete submissions",
        "Lengthy appeals processes for denied requests"
      ],
      improvement: "AI-generated documentation increases approval rates by 70% with faster processing."
    },
    {
      id: 8,
      title: "Appointment Scheduling & Coordination",
      icon: Calendar,
      time: "Day 10-12",
      position: { x: 72, y: 32 },
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "AI-optimized scheduling with intelligent coordination",
      automationPrimary: false,
      roi: "≈ 65% efficiency gain",
      automationTasks: [
        "Online self-scheduling portal access",
        "Automated appointment reminders",
        "Basic calendar management",
        "Standard rescheduling workflows"
      ],
      aiTasks: [
        "Optimized scheduling based on urgency and preferences",
        "Intelligent conflict resolution",
        "Predictive no-show prevention",
        "AI-driven resource allocation"
      ],
      whyAutomation: "Basic scheduling functions benefit from reliable automated processes",
      whyAI: "Complex scheduling optimization requires intelligent analysis of multiple factors",
      phases: [
        "Deploy automated scheduling systems",
        "Implement AI for optimization and conflict resolution",
        "Integrate predictive analytics for resource planning"
      ],
      currentIssues: [
        "Manual coordination creates conflicts and delays",
        "High cancellation rates due to poor optimization",
        "Difficult coordination between multiple providers"
      ],
      improvement: "AI-optimized scheduling reduces cancellations by 40% with improved resource utilization."
    },
    {
      id: 9,
      title: "Pre-Visit Preparation & Communication",
      icon: MessageCircle,
      time: "Day 12-14",
      position: { x: 42, y: 46 },
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Personalized AI assistant for patient education and preparation",
      automationPrimary: false,
      roi: "≈ 55% efficiency gain",
      automationTasks: [
        "Automated digital packet delivery",
        "Standard preparation reminders",
        "Basic educational material distribution",
        "Routine compliance tracking"
      ],
      aiTasks: [
        "Personalized AI assistant for patient education",
        "Interactive preparation guides",
        "AI-driven compliance tracking and nudges",
        "Intelligent preparation optimization"
      ],
      whyAutomation: "Standard preparation tasks benefit from consistent automated delivery",
      whyAI: "Personalized education and preparation require intelligent adaptation to patient needs",
      phases: [
        "Implement automated preparation workflows",
        "Deploy AI for personalized education",
        "Integrate intelligent compliance tracking"
      ],
      currentIssues: [
        "Generic preparation leads to patient confusion",
        "High rates of unprepared patients",
        "Manual delivery of instructions is inefficient"
      ],
      improvement: "AI-personalized preparation achieves 95% patient readiness with interactive guidance."
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
      improvement: "AI-driven adaptive forms reduce completion time to same-day with approx. 90% completeness rate on first submission."
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
      improvement: "AI-driven record management achieves approx. 95% completion rate with intelligent prioritization reducing critical delays by 80%."
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
      improvement: "AI-optimized scheduling reduces wait times to 3-5 days with approx. 8% cancellation rate through intelligent patient-provider matching."
    },
    {
      id: 5,
      title: "Pre-visit Preparation",
      icon: ClipboardCheck,
      time: "Day 14-20",
      position: { x: 10, y: 30 },
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
      improvement: "AI-personalized preparation achieves approx. 92% patient readiness with significant reduction in visit delays and medication errors."
    },
    {
      id: 6,
      title: "Visit Conduct",
      icon: Stethoscope,
      time: "Day 21",
      position: { x: 30, y: 30 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-assisted clinical visit with real-time decision support",
      automationPrimary: false,
      roi: "≈ 40% efficiency gain",
      automationTasks: [
        "Automated documentation templates and note generation",
        "Standard clinical protocol implementation",
        "Real-time integration with EHR systems",
        "Automated lab order generation and scheduling",
        "Standard post-visit task automation"
      ],
      aiTasks: [
        "Real-time clinical decision support during visit",
        "Intelligent treatment plan generation based on patient factors",
        "Predictive risk assessment and intervention recommendations",
        "AI-powered documentation with clinical narrative generation",
        "Smart follow-up care coordination based on visit outcomes"
      ],
      whyAutomation: "Standard clinical workflows and documentation benefit from consistent automated processes",
      whyAI: "Complex clinical decision-making requires intelligent analysis of patient data and evidence-based treatment recommendations",
      phases: [
        "Implement automated documentation and workflow systems",
        "Deploy AI for clinical decision support and treatment planning",
        "Integrate predictive analytics for outcome optimization"
      ],
      currentIssues: [
        "Lengthy documentation time reduces patient interaction",
        "Variable treatment decisions based on provider experience",
        "Delayed follow-up coordination affecting continuity of care"
      ],
      improvement: "AI-assisted visits increase provider efficiency by 40% while improving treatment consistency and patient outcomes."
    },
    {
      id: 7,
      title: "Treatment Planning",
      icon: Brain,
      time: "Day 22-25",
      position: { x: 50, y: 30 },
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-driven comprehensive treatment plan development",
      automationPrimary: false,
      roi: "≈ 60% efficiency gain",
      automationTasks: [
        "Automated treatment protocol identification",
        "Standard guideline compliance checking",
        "Basic resource availability verification",
        "Routine appointment scheduling for treatment"
      ],
      aiTasks: [
        "Personalized treatment plan optimization",
        "Predictive outcome modeling for treatment options",
        "Intelligent resource allocation and scheduling",
        "AI-driven clinical trial matching and recommendations"
      ],
      whyAutomation: "Standard treatment protocols and scheduling benefit from consistent automated processes",
      whyAI: "Complex treatment optimization requires intelligent analysis of patient factors and outcome predictions",
      phases: [
        "Implement automated protocol identification",
        "Deploy AI for personalized treatment optimization",
        "Integrate predictive outcome modeling"
      ],
      currentIssues: [
        "Manual treatment planning is time-intensive",
        "Variable treatment decisions across providers",
        "Difficulty matching patients to optimal clinical trials"
      ],
      improvement: "AI-optimized treatment planning reduces planning time by 60% while improving outcome predictions."
    },
    {
      id: 8,
      title: "Care Coordination",
      icon: Network,
      time: "Day 26-30",
      position: { x: 70, y: 30 },
      emotion: "positive", 
      emotionIcon: ThumbsUp,
      approach: "hybrid",
      description: "Comprehensive care team coordination and communication",
      automationPrimary: true,
      roi: "≈ 55% efficiency gain",
      automationTasks: [
        "Automated care team notifications and updates",
        "Standard appointment scheduling across specialties",
        "Basic communication template distribution",
        "Routine status tracking and reporting"
      ],
      aiTasks: [
        "Intelligent care team coordination and communication",
        "Predictive scheduling optimization across providers",
        "AI-driven care gap identification and resolution",
        "Smart escalation and intervention recommendations"
      ],
      whyAutomation: "Standard coordination tasks benefit from reliable automated processes",
      whyAI: "Complex care coordination requires intelligent analysis of multiple provider schedules and patient needs",
      phases: [
        "Implement automated coordination workflows",
        "Deploy AI for intelligent scheduling and communication",
        "Integrate predictive care gap analysis"
      ],
      currentIssues: [
        "Manual coordination leads to communication gaps",
        "Difficulty scheduling across multiple providers",
        "Missed care coordination opportunities"
      ],
      improvement: "AI-enhanced coordination reduces gaps by 70% with optimized multi-provider scheduling."
    },
    {
      id: 9,
      title: "Follow-up & Monitoring",
      icon: Activity,
      time: "Ongoing",
      position: { x: 40, y: 45 },
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Continuous monitoring and adaptive care management",
      automationPrimary: false,
      roi: "≈ 65% efficiency gain",
      automationTasks: [
        "Automated follow-up appointment scheduling",
        "Standard monitoring protocol implementation",
        "Routine lab and imaging order generation",
        "Basic patient communication and reminders"
      ],
      aiTasks: [
        "Predictive monitoring and early intervention",
        "Intelligent adaptation of follow-up protocols",
        "AI-driven patient outcome prediction and optimization",
        "Smart patient engagement and adherence support"
      ],
      whyAutomation: "Standard follow-up tasks benefit from consistent automated delivery",
      whyAI: "Adaptive monitoring requires intelligent analysis of patient progress and outcome prediction",
      phases: [
        "Implement automated follow-up workflows",
        "Deploy AI for predictive monitoring",
        "Integrate intelligent outcome optimization"
      ],
      currentIssues: [
        "Manual follow-up scheduling creates delays",
        "Generic monitoring protocols miss individual needs",
        "Poor patient adherence to follow-up recommendations"
      ],
      improvement: "AI-adaptive monitoring improves patient outcomes by 40% with personalized follow-up optimization."
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
      ],
      2: [
        {
          substep: "Emergency Contact Protocol",
          process: "AI-generated urgent communication: 'Maria, we've received your referral. Dr. Patel can see you tomorrow at 2 PM. Please confirm immediately.'"
        },
        {
          substep: "Rapid Screening",
          process: "AI chatbot conducts rapid symptom assessment and preparation instructions for urgent consultation."
        }
      ],
      3: [
        {
          substep: "Expedited Data Collection",
          process: "AI pre-populates forms with available data, prioritizing critical fields for immediate completion."
        },
        {
          substep: "Insurance Fast-Track",
          process: "Automated urgent insurance verification with immediate approval for emergency consultation."
        }
      ],
      4: [
        {
          substep: "Priority Record Retrieval",
          process: "AI identifies and requests most critical records first - recent imaging, pathology reports, oncology notes."
        },
        {
          substep: "Fast-Track Processing",
          process: "Urgent request routing bypasses standard queues with immediate provider notification."
        }
      ],
      5: [
        {
          substep: "Emergency Verification",
          process: "Real-time insurance verification for urgent oncology consultation with immediate approval routing."
        },
        {
          substep: "Coverage Optimization",
          process: "AI identifies best coverage options for immediate treatment needs."
        }
      ],
      6: [
        {
          substep: "Urgent Clinical Review",
          process: "AI flags critical symptoms and routes to senior oncologist for immediate assessment."
        },
        {
          substep: "Specialist Assignment",
          process: "Immediate assignment to Dr. Patel based on expertise and urgent availability."
        }
      ],
      7: [
        {
          substep: "Emergency PA Processing",
          process: "AI generates comprehensive pre-authorization for genomic testing with urgent justification."
        },
        {
          substep: "Fast-Track Approval",
          process: "Emergency routing with clinical justification for immediate processing."
        }
      ],
      8: [
        {
          substep: "Priority Scheduling",
          process: "AI schedules urgent appointment within 24 hours, blocking necessary time and resources."
        },
        {
          substep: "Resource Coordination",
          process: "Automatic coordination of imaging, lab work, and consultation space."
        }
      ],
      9: [
        {
          substep: "Urgent Preparation",
          process: "AI generates urgent preparation checklist with immediate completion timeline."
        },
        {
          substep: "Emergency Support",
          process: "Connection to patient navigator for immediate assistance and emotional support."
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
      ],
      2: [
        {
          substep: "Care Team Assembly",
          process: "AI coordinates with molecular pathology, genetics counselor, and clinical trials team for comprehensive evaluation planning."
        },
        {
          substep: "Timeline Optimization",
          process: "AI optimizes scheduling to minimize delays between testing, results, and treatment planning meetings."
        }
      ],
      3: [
        {
          substep: "Comprehensive Data Gathering",
          process: "AI generates extensive intake forms covering genomic history, prior treatments, and current clinical status."
        },
        {
          substep: "Multi-Specialist Coordination",
          process: "Automated coordination between medical oncology, genetics, and clinical trials teams."
        }
      ],
      4: [
        {
          substep: "Complete Medical History",
          process: "AI prioritizes acquisition of all prior treatment records, imaging, and genomic testing results."
        },
        {
          substep: "Clinical Timeline Assembly",
          process: "Comprehensive timeline construction of all prior treatments and response patterns."
        }
      ],
      5: [
        {
          substep: "Complex Benefit Analysis",
          process: "AI analyzes coverage for genomic testing, clinical trials, and advanced treatment options."
        },
        {
          substep: "Financial Planning",
          process: "Comprehensive analysis of treatment costs and insurance coverage optimization."
        }
      ],
      6: [
        {
          substep: "Multi-Disciplinary Assessment",
          process: "AI coordinates review across multiple specialists for comprehensive treatment planning."
        },
        {
          substep: "Clinical Trial Screening",
          process: "Automated screening for relevant clinical trials based on genomic profile and treatment history."
        }
      ],
      7: [
        {
          substep: "Advanced Genomic Authorization",
          process: "AI generates complex pre-authorization for comprehensive genomic testing panel."
        },
        {
          substep: "Trial Enrollment Support",
          process: "Automated support for clinical trial enrollment documentation and approvals."
        }
      ],
      8: [
        {
          substep: "Complex Care Coordination",
          process: "AI coordinates multiple appointments across different departments and specialists."
        },
        {
          substep: "Treatment Planning Meeting",
          process: "Automated scheduling of multi-disciplinary team meeting for treatment planning."
        }
      ],
      9: [
        {
          substep: "Comprehensive Preparation",
          process: "AI generates detailed preparation guide covering genomic counseling, treatment options, and clinical trials."
        },
        {
          substep: "Educational Support",
          process: "Personalized educational materials about genomic testing, treatment options, and clinical trial participation."
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
        },
        {
          substep: "Risk Assessment",
          process: "AI analyzes family history (mother, sister with breast cancer) and flags for BRCA testing consideration."
        }
      ],
      3: [
        {
          substep: "Routine Data Collection",
          process: "AI generates comprehensive intake form including family history, lifestyle factors, and current symptoms."
        },
        {
          substep: "Genetic Counseling Referral",
          process: "Automatic referral to genetic counseling based on strong family history pattern."
        }
      ],
      4: [
        {
          substep: "Prior Records Review",
          process: "AI requests previous mammography results and compares with current findings for progression analysis."
        },
        {
          substep: "Imaging Coordination",
          process: "Coordination of additional imaging studies based on current findings and family history."
        }
      ],
      5: [
        {
          substep: "Routine Preparation",
          process: "AI generates standard preparation instructions including dietary restrictions and medication guidance."
        },
        {
          substep: "Educational Materials",
          process: "Personalized educational materials about genetic testing and family history implications."
        }
      ],
      6: [
        {
          substep: "Clinical Assessment",
          process: "Standard clinical examination with AI-assisted documentation and risk assessment."
        },
        {
          substep: "Treatment Planning",
          process: "Development of surveillance plan based on genetic testing results and family history."
        }
      ],
      7: [
        {
          substep: "Treatment Protocol Development",
          process: "AI-assisted development of personalized treatment plan based on genetic testing and clinical assessment."
        },
        {
          substep: "Clinical Trial Screening",
          process: "Automated screening for relevant clinical trials based on patient profile and treatment options."
        }
      ],
      8: [
        {
          substep: "Multi-Disciplinary Coordination",
          process: "AI coordinates care between oncology, genetics, and other relevant specialists for comprehensive care."
        },
        {
          substep: "Treatment Timeline Development",
          process: "Optimized treatment timeline considering all aspects of care and patient preferences."
        }
      ],
      9: [
        {
          substep: "Long-term Monitoring Plan",
          process: "AI develops comprehensive monitoring and follow-up plan based on treatment response and risk factors."
        },
        {
          substep: "Patient Education and Support",
          process: "Personalized education about long-term care requirements and support resources."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Complex Case Coordination",
          process: "Michael's multiple comorbidities trigger multi-disciplinary team assembly for coordinated care planning."
        },
        {
          substep: "Risk Stratification",
          process: "AI analyzes diabetes, hypertension, and kidney disease impact on cancer treatment options."
        }
      ],
      2: [
        {
          substep: "Comprehensive Assessment",
          process: "AI generates complex intake addressing all comorbidities and their management."
        },
        {
          substep: "Care Team Coordination",
          process: "Automatic coordination with endocrinology, cardiology, and nephrology teams."
        }
      ],
      3: [
        {
          substep: "Complete Medical History",
          process: "AI prioritizes acquisition of records from all specialists and primary care providers."
        },
        {
          substep: "Comorbidity Impact Analysis",
          process: "Analysis of how existing conditions affect treatment options and prognosis."
        }
      ],
      4: [
        {
          substep: "Complex Scheduling",
          process: "AI coordinates appointments across multiple specialties to optimize care delivery."
        },
        {
          substep: "Treatment Feasibility",
          process: "Assessment of treatment options considering all comorbid conditions."
        }
      ],
      5: [
        {
          substep: "Multi-System Preparation",
          process: "AI generates comprehensive preparation addressing all medical conditions and medications."
        },
        {
          substep: "Coordination Optimization",
          process: "Optimization of care coordination between oncology and other specialists."
        }
      ],
      6: [
        {
          substep: "Integrated Assessment",
          process: "Comprehensive evaluation considering cancer treatment impact on existing conditions."
        },
        {
          substep: "Collaborative Planning",
          process: "Multi-disciplinary treatment planning with input from all relevant specialists."
        }
      ],
      7: [
        {
          substep: "Complex Treatment Planning",
          process: "AI develops treatment plan considering all comorbidities and potential drug interactions."
        },
        {
          substep: "Safety Protocol Development",
          process: "Enhanced safety protocols for complex patient with multiple medical conditions."
        }
      ],
      8: [
        {
          substep: "Integrated Care Management",
          process: "AI coordinates care across all specialties ensuring comprehensive and safe treatment delivery."
        },
        {
          substep: "Resource Optimization",
          process: "Optimization of healthcare resources for complex patient requiring multi-specialty care."
        }
      ],
      9: [
        {
          substep: "Comprehensive Monitoring",
          process: "AI-enhanced monitoring considering cancer treatment effects on all existing medical conditions."
        },
        {
          substep: "Integrated Follow-up",
          process: "Coordinated follow-up across all specialties with AI-optimized scheduling and communication."
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