import { useState, useMemo } from "react";
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

// Business Use Cases Data Structure - moved outside component to prevent re-creation
const businessCases = {
  oncology: {
    id: "oncology",
    title: "Oncology Care Workflow",
    description: "✅ IMPLEMENTED: Strategic technology selection for oncology workflows - real deployment learnings and outcomes",
    status: "implemented",
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
    description: "🔬 EXPERIMENTING: Specialized oncology patient referral process - active testing and optimization",
    status: "experimenting",
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
  contact: {
    id: "contact",
    title: "Digital Contact Center Transformation",
    description: "🚧 IN DEVELOPMENT: Patient communication hub - addressing current contact center challenges",
    status: "development",
    icon: MessageCircle,
    currentIssues: [
      "80% of contacts through phone create 4-7 minute hold times and inefficient resource allocation",
      "Manual identity verification takes 2-3 minutes with 15% failure rate requiring supervisor intervention",
      "Agents navigate 3-5 different systems causing 5-8 minute information gathering delays",
      "Manual case creation and routing leads to inconsistent SLA application and priority assignment",
      "Channel switching causes information loss and patient frustration with repeated requests"
    ],
    expectedImprovements: [
      "Smart IVR with NLP reduces hold times by 70% and improves first-call resolution by 85%",
      "Voice biometrics and multi-factor authentication reduces verification time to under 30 seconds",
      "Unified patient view eliminates system navigation reducing information gathering time by 80%",
      "AI-powered case management ensures consistent priority scoring and optimal resource allocation",
      "Seamless multi-channel coordination maintains context across all touchpoints"
    ],
    scenarioTitles: {
      sarah: "Jennifer - Treatment Inquiry",
      michael: "David - Urgent Support"
    },
    scenarioDescriptions: {
      sarah: "First-time cancer patient seeking treatment options across multiple channels",
      michael: "Active patient experiencing side effects during radiation therapy requiring urgent consultation"
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
      id: 5,
      title: "Medical Records Acquisition",
      icon: Database,
      time: "Day 2-5",
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
      id: 6,
      title: "Eligibility & Benefit Verification",
      icon: Shield,
      time: "Day 3-4",
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
      id: 7,
      title: "Clinical Review & Triage",
      icon: Stethoscope,
      time: "Day 5-7",
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
      id: 8,
      title: "Appointment Scheduling & Coordination",
      icon: Calendar,
      time: "Day 7-10",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "hybrid",
      description: "Intelligent appointment scheduling with care team coordination",
      automationPrimary: true,
      roi: "≈ 60% efficiency gain",
      automationTasks: [
        "Automated appointment slot availability checking",
        "Standard scheduling confirmation messages",
        "Routine calendar integration and updates",
        "Basic appointment reminder sequences"
      ],
      aiTasks: [
        "AI-driven optimal scheduling based on patient and provider preferences",
        "Intelligent care team coordination and sequencing",
        "Predictive rescheduling for anticipated conflicts",
        "Smart resource allocation and room assignment"
      ],
      whyAutomation: "Standard scheduling workflows benefit from automated availability checking and confirmations",
      whyAI: "Complex multi-provider coordination and optimization requires intelligent planning",
      phases: [
        "Deploy automated scheduling systems",
        "Implement AI for optimal appointment coordination",
        "Integrate predictive scheduling optimization"
      ],
      currentIssues: [
        "Manual scheduling creates delays and conflicts",
        "Poor coordination between multiple specialists",
        "Inefficient use of provider time and resources"
      ],
      improvement: "AI-enhanced scheduling reduces appointment wait times by 40% with optimized care coordination."
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
  contact: [
    {
      id: 1,
      title: "Initial Contact & Channel Entry",
      icon: MessageCircle,
      time: "0-2 min",
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "hybrid",
      description: "Smart IVR with NLP and virtual triage agent for optimal channel routing",
      automationPrimary: true,
      roi: "≈ 70% efficiency gain",
      automationTasks: [
        "Smart IVR with voice-to-text conversion",
        "Callback technology with queue management",
        "Channel deflection to faster digital options",
        "Pre-call data loading for agent preparation",
        "Automated sentiment detection from voice"
      ],
      aiTasks: [
        "Virtual Triage Agent with NLP intent recognition",
        "Clinical risk algorithm assessment for urgency",
        "Intelligent routing to appropriate specialists",
        "Preliminary guidance while routing",
        "Continuous learning from outcomes"
      ],
      whyAutomation: "High-volume contact entry benefits from consistent IVR workflows and automated queue management",
      whyAI: "Complex triage decisions require intelligent assessment of patient needs and optimal routing",
      phases: [
        "Deploy smart IVR with NLP capabilities",
        "Implement virtual triage agent",
        "Integrate predictive routing optimization"
      ],
      currentIssues: [
        "80% of contacts through phone create 4-7 minute hold times",
        "IVR menu with 6+ options confuses patients",
        "25% of calls require transfer to another agent",
        "Manual transfer processes lose context"
      ],
      improvement: "Smart IVR reduces hold times by 70% and improves first-call resolution by 85%."
    },
    {
      id: 2,
      title: "Identity Verification & Authentication",
      icon: Shield,
      time: "0.5-3 min",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "Multi-factor authentication with voice biometrics and identity validation agent",
      automationPrimary: false,
      roi: "≈ 85% efficiency gain",
      automationTasks: [
        "Voice biometrics for passive authentication",
        "Multi-factor authentication via SMS/Email",
        "Biometric integration for mobile users",
        "SSO integration across USON systems",
        "Automated fraud detection scoring"
      ],
      aiTasks: [
        "Identity Validation Agent combining multiple factors",
        "Adaptive authentication based on request sensitivity",
        "Suspicious pattern flagging and analysis",
        "Security optimization while maintaining UX",
        "Continuous learning from fraud patterns"
      ],
      whyAutomation: "Consistent authentication workflows benefit from standardized verification processes",
      whyAI: "Complex identity validation requires intelligent risk assessment and adaptive security measures",
      phases: [
        "Implement voice biometrics system",
        "Deploy identity validation agent",
        "Integrate adaptive security protocols"
      ],
      currentIssues: [
        "Manual verification takes 2-3 minutes on average",
        "15% failure rate requiring supervisor intervention",
        "Cross-references with multiple systems manually",
        "Inconsistent verification standards across agents"
      ],
      improvement: "Voice biometrics reduces verification time to under 30 seconds with 99% accuracy."
    },
    {
      id: 3,
      title: "Issue Classification & Intent Recognition",
      icon: Search,
      time: "1-3 min",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "AI-powered issue resolution agent with real-time NLP and context analysis",
      automationPrimary: false,
      roi: "≈ 65% efficiency gain",
      automationTasks: [
        "Real-time NLP processing of conversations",
        "Dynamic form population from speech",
        "Suggested classifications from AI analysis",
        "Conversation analytics and sentiment tracking",
        "Knowledge article suggestions for agents"
      ],
      aiTasks: [
        "Issue Resolution Agent analyzing context in real-time",
        "Prediction of most likely resolution paths",
        "Proactive escalation prevention suggestions",
        "Dynamic scripting and response templates",
        "Classification accuracy refinement through feedback"
      ],
      whyAutomation: "Consistent classification benefits from standardized NLP processing workflows",
      whyAI: "Complex intent recognition requires intelligent context analysis and predictive insights",
      phases: [
        "Deploy real-time NLP processing",
        "Implement issue resolution agent",
        "Integrate predictive resolution pathways"
      ],
      currentIssues: [
        "Manual categorization depends on agent experience",
        "Inconsistent classification across agents",
        "Post-call manual review and recategorization required",
        "Limited real-time guidance for agents"
      ],
      improvement: "AI-powered classification achieves 95% accuracy with real-time agent guidance."
    },
    {
      id: 4,
      title: "Information Gathering & Context Compilation",
      icon: Database,
      time: "2-8 min",
      emotion: "neutral",
      emotionIcon: Meh,
      approach: "hybrid",
      description: "Unified patient view with context intelligence agent for comprehensive data compilation",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      automationTasks: [
        "Unified patient dashboard aggregation",
        "Smart forms adapting based on issue type",
        "Data pre-population from existing systems",
        "Real-time system integration and sync",
        "Mobile-responsive interface design"
      ],
      aiTasks: [
        "Context Intelligence Agent compiling comprehensive patient context",
        "Information gap identification and question suggestions",
        "Priority-based information collection by urgency",
        "Predictive insights from patient history",
        "Context maintenance across channel switches"
      ],
      whyAutomation: "Data aggregation benefits from consistent system integration and automated form population",
      whyAI: "Complex context compilation requires intelligent prioritization and gap analysis",
      phases: [
        "Implement unified patient view dashboard",
        "Deploy context intelligence agent",
        "Integrate predictive context analysis"
      ],
      currentIssues: [
        "Agents navigate 3-5 different systems manually",
        "Patients repeat information already in systems",
        "Average data gathering time: 5-8 minutes",
        "Frequent system timeouts and login issues"
      ],
      improvement: "Unified patient view reduces information gathering time by 80% with complete context."
    },
    {
      id: 5,
      title: "Case Creation & Priority Management",
      icon: ClipboardCheck,
      time: "2-5 min",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Intelligent case management agent with automated routing and priority scoring",
      automationPrimary: false,
      roi: "≈ 75% efficiency gain",
      automationTasks: [
        "Intelligent case generation with structured data",
        "Priority scoring algorithm for consistency",
        "Automated routing to best-fit agents/teams",
        "SLA monitoring with escalation triggers",
        "Workflow orchestration for approvals"
      ],
      aiTasks: [
        "Case Management Agent analyzing complexity and resources",
        "Resolution time prediction from historical patterns",
        "Workload balancing across agents and teams",
        "Multi-departmental coordination identification",
        "Proactive escalation based on risk factors"
      ],
      whyAutomation: "Case creation benefits from consistent priority scoring and automated routing workflows",
      whyAI: "Complex case management requires intelligent resource allocation and predictive analysis",
      phases: [
        "Implement intelligent case generation",
        "Deploy case management agent",
        "Integrate predictive workload balancing"
      ],
      currentIssues: [
        "Manual ticket creation in ServiceNow",
        "Priority assignment based on personal judgment",
        "Limited integration with clinical systems",
        "Inconsistent SLA application across cases"
      ],
      improvement: "AI-powered case management ensures consistent priority scoring and optimal resource allocation."
    },
    {
      id: 6,
      title: "Resolution Research & Knowledge Management",
      icon: Lightbulb,
      time: "3-15 min",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Solution discovery agent with intelligent knowledge search and resolution strategies",
      automationPrimary: false,
      roi: "≈ 60% efficiency gain",
      automationTasks: [
        "Intelligent knowledge search with AI-powered discovery",
        "Contextual article suggestions in real-time",
        "Automated content updates and maintenance",
        "Integration APIs for external systems",
        "Pre-configured resolution workflow templates"
      ],
      aiTasks: [
        "Solution Discovery Agent analyzing case context",
        "Learning from successful resolution patterns",
        "Step-by-step guidance for specific situations",
        "Human expertise identification and warm handoffs",
        "Knowledge base updates from resolution outcomes"
      ],
      whyAutomation: "Knowledge search benefits from consistent AI-powered content discovery and template workflows",
      whyAI: "Complex solution discovery requires intelligent pattern recognition and adaptive guidance",
      phases: [
        "Deploy intelligent knowledge search",
        "Implement solution discovery agent",
        "Integrate continuous learning systems"
      ],
      currentIssues: [
        "Manual knowledge base searches with limited functionality",
        "Outdated content and trial-and-error approaches",
        "Consultation with supervisors causes delays",
        "Inconsistent resolution quality across agents"
      ],
      improvement: "AI-powered solution discovery improves resolution accuracy by 90% with step-by-step guidance."
    },
    {
      id: 7,
      title: "Multi-Channel Coordination & Seamless Handoffs",
      icon: Network,
      time: "1-5 min",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Channel orchestration agent managing unified communication across all touchpoints",
      automationPrimary: false,
      roi: "≈ 85% efficiency gain",
      automationTasks: [
        "Unified communication platform across channels",
        "Context preservation during transfers",
        "Channel optimization suggestions by issue type",
        "Seamless handoffs with automated briefing",
        "Mobile-first design optimization"
      ],
      aiTasks: [
        "Channel Orchestration Agent optimizing communication paths",
        "Context continuity management across transitions",
        "Optimal channel prediction for issue resolution",
        "Multi-agent interaction coordination for complex cases",
        "Channel effectiveness pattern learning"
      ],
      whyAutomation: "Channel coordination benefits from consistent context preservation and automated handoff workflows",
      whyAI: "Complex orchestration requires intelligent channel optimization and context management",
      phases: [
        "Implement unified communication platform",
        "Deploy channel orchestration agent",
        "Integrate predictive channel optimization"
      ],
      currentIssues: [
        "Patients restart conversations when switching channels",
        "No unified conversation history across touchpoints",
        "Manual transfer processes with information loss",
        "Inconsistent experience across channels"
      ],
      improvement: "Seamless multi-channel coordination maintains context across all touchpoints with zero information loss."
    },
    {
      id: 8,
      title: "Escalation Management & Exception Handling",
      icon: TrendingUp,
      time: "5-30 min",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "Escalation management agent with predictive triggers and intelligent resource allocation",
      automationPrimary: false,
      roi: "≈ 70% efficiency gain",
      automationTasks: [
        "Predictive escalation triggers with AI assessment",
        "Automatic supervisor notification with context",
        "Escalation workflow automation and standardization",
        "Intelligent resource allocation for senior staff",
        "Real-time escalation metrics and trending"
      ],
      aiTasks: [
        "Escalation Management Agent predicting cases requiring escalation",
        "Proactive intervention suggestions to prevent escalation",
        "Escalation workflow and resource allocation management",
        "Pattern analysis for prevention strategy improvement",
        "Cross-functional team coordination for complex cases"
      ],
      whyAutomation: "Escalation workflows benefit from consistent trigger mechanisms and automated notification systems",
      whyAI: "Complex escalation management requires intelligent prediction and proactive intervention strategies",
      phases: [
        "Implement predictive escalation triggers",
        "Deploy escalation management agent",
        "Integrate cross-functional coordination"
      ],
      currentIssues: [
        "Subjective escalation decisions by agents",
        "Manual supervisor notification causes delays",
        "No standardized escalation triggers",
        "Reactive approach to complex issues"
      ],
      improvement: "Predictive escalation management prevents 60% of potential escalations through proactive intervention."
    },
    {
      id: 9,
      title: "Follow-up Communication & Relationship Management",
      icon: Heart,
      time: "5-15 min",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Relationship management agent with personalized engagement and journey-based triggers",
      automationPrimary: false,
      roi: "≈ 65% efficiency gain",
      automationTasks: [
        "Intelligent follow-up scheduling with timing optimization",
        "Personalized communication with dynamic content",
        "Multi-channel follow-up coordination",
        "Outcome tracking and effectiveness measurement",
        "Journey-based triggers aligned with milestones"
      ],
      aiTasks: [
        "Relationship Management Agent developing personalized strategies",
        "Follow-up timing optimization based on behavior patterns",
        "Communication preference and channel effectiveness prediction",
        "Long-term relationship building throughout treatment journey",
        "Proactive support and intervention opportunity identification"
      ],
      whyAutomation: "Follow-up scheduling benefits from consistent timing optimization and multi-channel coordination",
      whyAI: "Complex relationship management requires personalized strategies and predictive engagement",
      phases: [
        "Implement intelligent follow-up scheduling",
        "Deploy relationship management agent",
        "Integrate journey-based personalization"
      ],
      currentIssues: [
        "Manual follow-up scheduling in agent calendars",
        "Generic follow-up scripts and templates",
        "No proactive outreach based on patient journey",
        "Limited tracking of follow-up effectiveness"
      ],
      improvement: "AI-driven relationship management improves patient engagement by 75% with personalized outreach."
    },
    {
      id: 10,
      title: "Satisfaction Measurement & Continuous Improvement",
      icon: Star,
      time: "2-10 min",
      emotion: "positive",
      emotionIcon: ThumbsUp,
      approach: "agentic",
      description: "Experience optimization agent with real-time satisfaction monitoring and improvement loops",
      automationPrimary: false,
      roi: "≈ 80% efficiency gain",
      automationTasks: [
        "Real-time sentiment analysis during interactions",
        "Dynamic survey generation based on interaction type",
        "Multi-modal feedback collection (voice, text, visual)",
        "Automated analysis of feedback data patterns",
        "Closed-loop improvement with automatic updates"
      ],
      aiTasks: [
        "Experience Optimization Agent monitoring satisfaction real-time",
        "Pain point and improvement opportunity identification",
        "Satisfaction outcome prediction before case closure",
        "Immediate intervention recommendations for at-risk interactions",
        "Continuous improvement through pattern analysis"
      ],
      whyAutomation: "Satisfaction measurement benefits from consistent real-time monitoring and automated feedback collection",
      whyAI: "Complex experience optimization requires intelligent analysis and predictive intervention capabilities",
      phases: [
        "Implement real-time sentiment analysis",
        "Deploy experience optimization agent",
        "Integrate predictive satisfaction modeling"
      ],
      currentIssues: [
        "Email surveys sent 24 hours after case closure",
        "Low response rates (8-12%) limit insights",
        "Generic survey questions provide limited value",
        "Manual analysis delays improvement implementation"
      ],
      improvement: "Real-time satisfaction monitoring with predictive intervention improves patient experience scores by 85%."
    }
  ]
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
      2: [
        {
          substep: "Family History Documentation",
          process: "AI documents detailed family history of breast and ovarian cancers across maternal line."
        },
        {
          substep: "Genetic Counseling Referral",
          process: "Automated referral to genetic counselor for BRCA testing discussion and risk assessment."
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
  contact: {
    sarah: {
      1: [
        {
          substep: "Smart Channel Entry",
          process: "Jennifer calls main number, smart IVR recognizes 'treatment options' intent, immediately routes to oncology triage while loading her profile."
        },
        {
          substep: "Virtual Triage Assessment",
          process: "AI analyzes: first-time caller, treatment inquiry, moderate anxiety level - suggests phone consultation with option to switch to video call."
        }
      ],
      2: [
        {
          substep: "Voice Authentication",
          process: "System recognizes Jennifer's voice pattern while she speaks, completes authentication in 15 seconds without interrupting conversation flow."
        },
        {
          substep: "Security Confirmation",
          process: "AI confirms identity with 99.2% confidence, enables full access to oncology systems and consultation capabilities."
        }
      ],
      3: [
        {
          substep: "Intent Classification",
          process: "NLP processing identifies: 'treatment options inquiry + insurance concerns + anxiety about diagnosis' - routes to specialized oncology financial counselor."
        },
        {
          substep: "Context Building",
          process: "AI compiles: recent diagnosis details, insurance information, family support system, communication preferences for comprehensive consultation."
        }
      ],
      4: [
        {
          substep: "Unified Information View",
          process: "Agent receives complete context: medical history, insurance details, provider network, previous inquiries - no questions needed from Jennifer."
        },
        {
          substep: "Proactive Data Population",
          process: "AI pre-fills consultation forms with available information, identifies specific questions needed about treatment preferences."
        }
      ],
      5: [
        {
          substep: "Priority Case Creation",
          process: "AI creates case: Priority 2 (treatment consultation), assigns to specialized oncology team, estimates 45-minute consultation needed."
        },
        {
          substep: "Resource Coordination",
          process: "Automatically schedules follow-up with financial counselor, reserves appointment slots with recommended oncologists."
        }
      ],
      6: [
        {
          substep: "Treatment Options Research",
          process: "AI provides agent with personalized treatment option summary based on Jennifer's specific cancer type, stage, and insurance coverage."
        },
        {
          substep: "Financial Guidance Preparation",
          process: "System prepares insurance coverage analysis, out-of-pocket estimates, and financial assistance program eligibility."
        }
      ],
      7: [
        {
          substep: "Seamless Channel Transition",
          process: "Jennifer requests to switch to video call for visual materials, system maintains full context and connects immediately."
        },
        {
          substep: "Enhanced Consultation",
          process: "Video call enables sharing of treatment timelines, facility tours, and educational materials while maintaining conversation continuity."
        }
      ],
      8: [
        {
          substep: "Proactive Follow-up Scheduling",
          process: "AI suggests optimal follow-up timing based on Jennifer's emotional state and information processing needs."
        },
        {
          substep: "Care Team Assembly",
          process: "System coordinates initial appointments with recommended oncologist, financial counselor, and patient navigator."
        }
      ],
      9: [
        {
          substep: "Personalized Communication Plan",
          process: "AI creates follow-up schedule: email summary in 2 hours, check-in call in 2 days, appointment reminders via preferred SMS."
        },
        {
          substep: "Emotional Support Connection",
          process: "System connects Jennifer with peer support group and provides contact information for patient navigator."
        }
      ],
      10: [
        {
          substep: "Real-time Satisfaction Monitoring",
          process: "AI detects positive resolution: reduced anxiety in voice, engagement with follow-up plan, expressed confidence in next steps."
        },
        {
          substep: "Continuous Improvement Input",
          process: "System captures successful resolution pattern: first-time caller + treatment inquiry + financial concerns = specialized counselor + video option."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Urgent Medical Triage",
          process: "David calls reporting severe nausea during radiation, AI immediately flags as 'urgent clinical' and routes to on-call radiation oncology nurse."
        },
        {
          substep: "Clinical Priority Routing",
          process: "System prioritizes call to front of queue, loads David's treatment schedule, current medications, and side effect history."
        }
      ],
      2: [
        {
          substep: "Rapid Authentication",
          process: "Voice biometrics confirms David's identity in 8 seconds during description of symptoms, enabling immediate medical consultation."
        },
        {
          substep: "Emergency Access Authorization",
          process: "AI grants immediate access to clinical systems, medication protocols, and emergency consultation capabilities."
        }
      ],
      3: [
        {
          substep: "Symptom Analysis",
          process: "AI analyzes: 'severe nausea + radiation therapy day 8 + specific medication regimen' - flags as Grade 3 toxicity requiring immediate intervention."
        },
        {
          substep: "Clinical Decision Support",
          process: "System provides nurse with protocol recommendations, medication adjustment options, and escalation triggers."
        }
      ],
      4: [
        {
          substep: "Complete Clinical Picture",
          process: "Nurse receives: current treatment plan, today's radiation dose, antiemetic schedule, previous side effects, lab values - comprehensive view ready."
        },
        {
          substep: "Real-time Protocol Access",
          process: "AI provides NCCN guidelines for Grade 3 nausea management specific to David's radiation regimen and medical history."
        }
      ],
      5: [
        {
          substep: "Urgent Case Management",
          process: "AI creates Priority 1 case: clinical emergency, assigns to radiation oncology team, estimates need for possible treatment hold."
        },
        {
          substep: "Multi-team Coordination",
          process: "System alerts radiation oncologist, pharmacy for medication adjustments, and schedules urgent assessment appointment."
        }
      ],
      6: [
        {
          substep: "Evidence-based Protocol",
          process: "AI provides nurse with step-by-step symptom management protocol: immediate antiemetic, hydration assessment, treatment hold criteria."
        },
        {
          substep: "Physician Consultation Bridge",
          process: "System enables immediate consultation with radiation oncologist while maintaining David on the line for real-time decisions."
        }
      ],
      7: [
        {
          substep: "Multi-modal Care Coordination",
          process: "Nurse connects David to secure video call with physician, maintaining phone connection for wife who will manage medications."
        },
        {
          substep: "Family Caregiver Integration",
          process: "System extends consultation to include David's wife with medication management instructions and warning signs to monitor."
        }
      ],
      8: [
        {
          substep: "Clinical Decision Documentation",
          process: "AI documents: treatment hold for 2 days, antiemetic protocol change, urgent lab work needed, follow-up in 24 hours."
        },
        {
          substep: "Care Plan Activation",
          process: "System automatically schedules lab work, adjusts radiation schedule, sends new medication orders to pharmacy."
        }
      ],
      9: [
        {
          substep: "Immediate Action Plan",
          process: "AI generates: 24-hour check-in call, medication pickup instructions, emergency contact protocols, symptom monitoring guide."
        },
        {
          substep: "Caregiver Support Setup",
          process: "System provides David's wife with medication schedule, warning signs, direct nurse line access, and emergency protocols."
        }
      ],
      10: [
        {
          substep: "Clinical Outcome Tracking",
          process: "AI monitors resolution: symptom improvement over 24 hours, successful treatment modification, patient confidence in management plan."
        },
        {
          substep: "Protocol Optimization",
          process: "System updates clinical protocols: rapid escalation for Grade 3+ toxicity, improved caregiver integration, optimized medication timing."
        }
      ]
    }
  }
};

// Scenario-specific impact analysis
const scenarioImpactAnalysis = {
  referral: {
    sarah: {
      scenarioType: "Urgent Referral",
      overallTimeReduction: "75%",
      errorReduction: "90%",
      patientSatisfaction: "9.2/10",
      stepImpacts: {
        1: { timeReduction: "85%", accuracy: "95%", patientAnxiety: "Reduced by 60%" },
        2: { responseRate: "95%", firstContactSuccess: "85%", patientEngagement: "High" },
        3: { verificationTime: "Real-time", errorRate: "2%", approvalRate: "98%" },
        4: { completionTime: "30 min", accuracy: "99%", missingData: "5%" },
        5: { retrievalTime: "24 hours", completeness: "95%", relevance: "High" },
        6: { verificationTime: "Real-time", approvalRate: "92%", denialsReduced: "70%" },
        7: { assessmentTime: "2 hours", specialistMatch: "98%", riskAccuracy: "95%" },
        8: { schedulingTime: "15 min", coordinationEfficiency: "90%", conflicts: "Reduced 80%" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "4 hours", totalErrorReduction: "85%", patientExperience: "7.2/10" },
        { step: 2, totalTimeSaved: "6 hours", totalErrorReduction: "87%", patientExperience: "7.8/10" },
        { step: 3, totalTimeSaved: "8 hours", totalErrorReduction: "89%", patientExperience: "8.2/10" },
        { step: 4, totalTimeSaved: "10 hours", totalErrorReduction: "90%", patientExperience: "8.6/10" },
        { step: 5, totalTimeSaved: "12 hours", totalErrorReduction: "91%", patientExperience: "8.8/10" },
        { step: 6, totalTimeSaved: "14 hours", totalErrorReduction: "92%", patientExperience: "9.0/10" },
        { step: 7, totalTimeSaved: "16 hours", totalErrorReduction: "93%", patientExperience: "9.1/10" },
        { step: 8, totalTimeSaved: "18 hours", totalErrorReduction: "94%", patientExperience: "9.2/10" }
      ]
    },
    michael: {
      scenarioType: "Complex Onboarding",
      overallTimeReduction: "65%",
      errorReduction: "85%",
      patientSatisfaction: "8.8/10",
      stepImpacts: {
        1: { timeReduction: "70%", accuracy: "92%", complexityHandling: "Excellent" },
        2: { coordinationEfficiency: "88%", teamAlignment: "95%", communicationGaps: "Reduced 75%" },
        3: { dataIntegration: "98%", crossSystemSync: "95%", completeness: "97%" },
        4: { comprehensiveness: "96%", timelineAccuracy: "94%", clinicalRelevance: "High" },
        5: { coverageOptimization: "93%", financialPlanning: "Excellent", approvalLikelihood: "88%" },
        6: { coordinationQuality: "95%", trialMatching: "87%", decisionSpeed: "75% faster" },
        7: { authorizationSuccess: "90%", trialEnrollment: "85%", complexApprovals: "88%" },
        8: { multiProviderCoord: "92%", resourceOptimization: "89%", conflictReduction: "85%" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "3 hours", totalErrorReduction: "70%", careQuality: "7.8/10" },
        { step: 2, totalTimeSaved: "5 hours", totalErrorReduction: "74%", careQuality: "8.0/10" },
        { step: 3, totalTimeSaved: "7 hours", totalErrorReduction: "77%", careQuality: "8.2/10" },
        { step: 4, totalTimeSaved: "9 hours", totalErrorReduction: "80%", careQuality: "8.4/10" },
        { step: 5, totalTimeSaved: "11 hours", totalErrorReduction: "82%", careQuality: "8.5/10" },
        { step: 6, totalTimeSaved: "13 hours", totalErrorReduction: "83%", careQuality: "8.6/10" },
        { step: 7, totalTimeSaved: "15 hours", totalErrorReduction: "84%", careQuality: "8.7/10" },
        { step: 8, totalTimeSaved: "17 hours", totalErrorReduction: "85%", careQuality: "8.8/10" }
      ]
    }
  },
  oncology: {
    sarah: {
      scenarioType: "Routine Screening",
      overallTimeReduction: "70%",
      errorReduction: "88%",
      patientSatisfaction: "8.9/10",
      stepImpacts: {
        1: { timeReduction: "80%", accuracy: "96%", familyHistoryCapture: "Complete" },
        2: { geneticReferralSpeed: "Same day", counselingAccess: "100%", riskAssessment: "Comprehensive" },
        3: { dataCompleteness: "98%", geneticHistoryAccuracy: "99%", riskFactorCapture: "Complete" },
        4: { recordIntegration: "95%", imagingCoordination: "98%", historyComparison: "Automated" },
        5: { preparationQuality: "96%", educationEffectiveness: "92%", complianceRate: "94%" },
        6: { assessmentAccuracy: "97%", riskStratification: "Precise", surveillancePlanning: "Optimal" },
        7: { treatmentPrecision: "94%", trialEligibility: "Assessed", personalizedCare: "High" },
        8: { coordinationEfficiency: "93%", timelineOptimization: "91%", patientPreferences: "Integrated" },
        9: { monitoringPrecision: "95%", adherenceSupport: "Excellent", outcomeTracking: "Comprehensive" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "2 hours", totalErrorReduction: "80%", careQuality: "8.0/10" },
        { step: 2, totalTimeSaved: "3 hours", totalErrorReduction: "82%", careQuality: "8.2/10" },
        { step: 3, totalTimeSaved: "4 hours", totalErrorReduction: "84%", careQuality: "8.3/10" },
        { step: 4, totalTimeSaved: "5 hours", totalErrorReduction: "85%", careQuality: "8.4/10" },
        { step: 5, totalTimeSaved: "6 hours", totalErrorReduction: "86%", careQuality: "8.5/10" },
        { step: 6, totalTimeSaved: "7 hours", totalErrorReduction: "87%", careQuality: "8.6/10" },
        { step: 7, totalTimeSaved: "8 hours", totalErrorReduction: "87.5%", careQuality: "8.7/10" },
        { step: 8, totalTimeSaved: "9 hours", totalErrorReduction: "88%", careQuality: "8.8/10" },
        { step: 9, totalTimeSaved: "10 hours", totalErrorReduction: "88%", careQuality: "8.9/10" }
      ]
    },
    michael: {
      scenarioType: "Complex Multi-Comorbidity",
      overallTimeReduction: "60%",
      errorReduction: "82%",
      patientSatisfaction: "8.6/10",
      stepImpacts: {
        1: { timeReduction: "65%", accuracy: "90%", complexityAssessment: "Comprehensive" },
        2: { teamCoordination: "85%", specialistAlignment: "92%", communicationEfficiency: "88%" },
        3: { dataIntegration: "94%", crossSpecialtyInfo: "96%", comorbidityMapping: "Complete" },
        4: { multiSystemCoord: "88%", treatmentFeasibility: "Assessed", riskEvaluation: "Thorough" },
        5: { multiSystemPrep: "90%", coordinationQuality: "87%", medicationReview: "Comprehensive" },
        6: { integratedAssessment: "91%", collaborativePlanning: "89%", riskMitigation: "Excellent" },
        7: { complexPlanning: "88%", safetyProtocols: "Enhanced", interactionChecking: "Automated" },
        8: { integratedCare: "86%", resourceOptimization: "84%", multiSpecialtyCoord: "Seamless" },
        9: { comprehensiveMonitoring: "87%", integratedFollowup: "85%", outcomeOptimization: "High" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "1.5 hours", totalErrorReduction: "65%", careQuality: "7.5/10" },
        { step: 2, totalTimeSaved: "2.5 hours", totalErrorReduction: "68%", careQuality: "7.7/10" },
        { step: 3, totalTimeSaved: "3.5 hours", totalErrorReduction: "71%", careQuality: "7.9/10" },
        { step: 4, totalTimeSaved: "4.5 hours", totalErrorReduction: "74%", careQuality: "8.0/10" },
        { step: 5, totalTimeSaved: "5.5 hours", totalErrorReduction: "76%", careQuality: "8.1/10" },
        { step: 6, totalTimeSaved: "6.5 hours", totalErrorReduction: "78%", careQuality: "8.2/10" },
        { step: 7, totalTimeSaved: "7.5 hours", totalErrorReduction: "80%", careQuality: "8.3/10" },
        { step: 8, totalTimeSaved: "8.5 hours", totalErrorReduction: "81%", careQuality: "8.5/10" },
        { step: 9, totalTimeSaved: "9.5 hours", totalErrorReduction: "82%", careQuality: "8.6/10" }
      ]
    }
  },
  contact: {
    sarah: {
      scenarioType: "Treatment Inquiry - Multi-Channel",
      overallTimeReduction: "78%",
      errorReduction: "92%",
      patientSatisfaction: "9.1/10",
      stepImpacts: {
        1: { holdTimeReduction: "70%", routingAccuracy: "95%", channelOptimization: "85%" },
        2: { authenticationTime: "15 seconds", accuracyRate: "99.2%", userExperience: "Excellent" },
        3: { intentAccuracy: "96%", contextCapture: "98%", resolutionPrediction: "87%" },
        4: { informationCompleteness: "97%", systemNavigationTime: "80% reduction", dataAccuracy: "99%" },
        5: { priorityAccuracy: "94%", resourceAllocation: "Optimal", caseQuality: "High" },
        6: { resolutionSpeed: "75% faster", knowledgeAccuracy: "96%", agentConfidence: "High" },
        7: { channelContinuity: "100%", contextPreservation: "Complete", userSatisfaction: "9.0/10" },
        8: { escalationPrevention: "85%", proactiveSupport: "92%", resourceOptimization: "88%" },
        9: { engagementQuality: "93%", followUpSuccess: "89%", relationshipBuilding: "Excellent" },
        10: { satisfactionAccuracy: "Real-time", improvementSpeed: "75% faster", patientExperience: "9.1/10" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "3 minutes", totalErrorReduction: "70%", patientExperience: "7.5/10" },
        { step: 2, totalTimeSaved: "5 minutes", totalErrorReduction: "75%", patientExperience: "8.0/10" },
        { step: 3, totalTimeSaved: "8 minutes", totalErrorReduction: "80%", patientExperience: "8.2/10" },
        { step: 4, totalTimeSaved: "15 minutes", totalErrorReduction: "85%", patientExperience: "8.4/10" },
        { step: 5, totalTimeSaved: "20 minutes", totalErrorReduction: "87%", patientExperience: "8.6/10" },
        { step: 6, totalTimeSaved: "30 minutes", totalErrorReduction: "89%", patientExperience: "8.7/10" },
        { step: 7, totalTimeSaved: "35 minutes", totalErrorReduction: "90%", patientExperience: "8.8/10" },
        { step: 8, totalTimeSaved: "40 minutes", totalErrorReduction: "91%", patientExperience: "8.9/10" },
        { step: 9, totalTimeSaved: "45 minutes", totalErrorReduction: "91.5%", patientExperience: "9.0/10" },
        { step: 10, totalTimeSaved: "47 minutes", totalErrorReduction: "92%", patientExperience: "9.1/10" }
      ]
    },
    michael: {
      scenarioType: "Urgent Clinical Support",
      overallTimeReduction: "82%",
      errorReduction: "95%",
      patientSatisfaction: "9.4/10",
      stepImpacts: {
        1: { urgentTriageSpeed: "95%", clinicalRouting: "98%", priorityAccuracy: "96%" },
        2: { rapidAuthentication: "8 seconds", emergencyAccess: "Immediate", securityMaintenance: "100%" },
        3: { symptomAnalysis: "97%", clinicalDecisionSupport: "95%", protocolAccuracy: "98%" },
        4: { clinicalDataCompleteness: "99%", protocolAccess: "Real-time", decisionSpeed: "85% faster" },
        5: { urgentCaseManagement: "96%", teamCoordination: "94%", resourceAllocation: "Optimal" },
        6: { protocolAdherence: "98%", clinicalOutcomes: "Improved", physicianConsultation: "Seamless" },
        7: { familyCaregiverIntegration: "92%", multiModalSupport: "Excellent", communicationContinuity: "100%" },
        8: { clinicalDocumentation: "Automated", carePlanActivation: "Immediate", coordinationEfficiency: "95%" },
        9: { actionPlanClarity: "97%", caregiverSupport: "Comprehensive", emergencyPreparedness: "Complete" },
        10: { clinicalOutcomeTracking: "Real-time", protocolOptimization: "Continuous", emergencyResponse: "Enhanced" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "5 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.0/10" },
        { step: 2, totalTimeSaved: "7 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.1/10" },
        { step: 3, totalTimeSaved: "10 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.1/10" },
        { step: 4, totalTimeSaved: "15 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.2/10" },
        { step: 5, totalTimeSaved: "20 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.2/10" },
        { step: 6, totalTimeSaved: "22 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.3/10" },
        { step: 7, totalTimeSaved: "25 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.3/10" },
        { step: 8, totalTimeSaved: "27 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.3/10" },
        { step: 9, totalTimeSaved: "29 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.4/10" },
        { step: 10, totalTimeSaved: "30 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.4/10" }
      ]
    }
  }
};

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
        impact: currentScenarioImpacts.sarah.stepImpacts[stepId],
        cumulativeImpact: currentScenarioImpacts.sarah.cumulativeBenefits.find(b => b.step === stepId)
      });
    }
    
    // Michael scenario  
    if (currentScenarioDetails.michael[stepId]) {
      scenarios.push({
        name: currentCase.scenarioTitles.michael,
        description: currentCase.scenarioDescriptions.michael,
        complexity: "complex" as const,
        substeps: currentScenarioDetails.michael[stepId],
        impact: currentScenarioImpacts.michael.stepImpacts[stepId],
        cumulativeImpact: currentScenarioImpacts.michael.cumulativeBenefits.find(b => b.step === stepId)
      });
    }
    
    return scenarios;
  };

  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation":
        return "bg-green-100 text-green-700 border-green-300";
      case "agentic":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "hybrid":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive":
        return "bg-green-100 text-green-700 border-green-300";
      case "neutral":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "critical":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/src/assets/hero-ai-background.jpg')` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/80 to-genie-secondary/70" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-genie-accent/40 rounded-full animate-float"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-3 sm:mb-4">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Strategic Analysis
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              Genie AI <span className="text-genie-accent">Experimentation Hub</span>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-2 font-normal text-white/90">
                Real Implementation Stories & Learnings
              </div>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              Explore real-world implementations from our experimentation lab. Discover what we've successfully deployed, 
              current learnings from active experiments, and challenges we're addressing in healthcare AI transformation.
            </p>
            
            {/* Key Features Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Implemented Solutions</h3>
                <p className="text-white/80 text-xs">Live & Operational</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Active Experiments</h3>
                <p className="text-white/80 text-xs">Learning & Iterating</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">In Development</h3>
                <p className="text-white/80 text-xs">Building & Testing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Challenges Addressed</h3>
                <p className="text-white/80 text-xs">Problem-solving focus</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
              <Button 
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark"
                onClick={() => {
                  const useCasesSection = document.querySelector('[data-section="use-cases"]');
                  useCasesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <ArrowDown className="w-4 h-4 mr-2" />
                View Our Experiments
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => setShowDecisionFramework(!showDecisionFramework)}
              >
                <FileText className="w-4 h-4 mr-2" />
                {showDecisionFramework ? 'Hide' : 'View'} Experiment Framework
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Framework Modal/Section */}
      {showDecisionFramework && (
        <Card className="max-w-7xl mx-auto m-4 border-2 border-genie-accent/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-genie-primary/10 to-genie-accent/10 border-b border-genie-accent/20">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl sm:text-2xl font-bold text-genie-primary flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Strategic Analysis Framework
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDecisionFramework(false)}
                className="text-genie-primary hover:text-genie-accent"
              >
                <Lightbulb className="w-4 h-4" />
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-genie-primary">Decision Matrix</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      Choose Automation When:
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• High-volume, repetitive tasks</li>
                      <li>• Well-defined, standardized processes</li>
                      <li>• Minimal decision complexity</li>
                      <li>• Immediate ROI requirements</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Choose Agentic AI When:
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Complex decision-making required</li>
                      <li>• Variable, personalized processes</li>
                      <li>• Continuous learning benefits</li>
                      <li>• Long-term optimization goals</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-genie-primary">Implementation Phases</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-genie-accent/20 flex items-center justify-center">
                      <span className="text-genie-accent font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Assessment & Mapping</p>
                      <p className="text-xs text-muted-foreground">Current process analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-genie-accent/20 flex items-center justify-center">
                      <span className="text-genie-accent font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Technology Selection</p>
                      <p className="text-xs text-muted-foreground">Automation vs AI decision</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-genie-accent/20 flex items-center justify-center">
                      <span className="text-genie-accent font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Pilot Implementation</p>
                      <p className="text-xs text-muted-foreground">Controlled testing phase</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-genie-accent/20 flex items-center justify-center">
                      <span className="text-genie-accent font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-medium">Scale & Optimize</p>
                      <p className="text-xs text-muted-foreground">Full deployment & refinement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div data-section="use-cases" className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6">

      {/* Business Case Selection */}
      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-xl sm:text-2xl text-center font-bold">Select Business Use Case</CardTitle>
          <p className="text-center text-muted-foreground">Choose an experiment to explore implementation details, learnings, and outcomes</p>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto mb-6">
            <Select value={selectedBusinessCase} onValueChange={setSelectedBusinessCase}>
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select a business use case..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(businessCases).map(([key, businessCase]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-3">
                      <businessCase.icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {businessCase.title}
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              businessCase.status === 'implemented' ? 'border-green-500 text-green-600' :
                              businessCase.status === 'experimenting' ? 'border-blue-500 text-blue-600' :
                              'border-orange-500 text-orange-600'
                            }`}
                          >
                            {businessCase.status === 'implemented' ? '✅ Live' :
                             businessCase.status === 'experimenting' ? '🔬 Testing' : '🚧 Building'}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{businessCase.description.substring(0, 60)}...</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experiment Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(businessCases).map(([key, businessCase]) => (
              <Card 
                key={key} 
                className={`cursor-pointer transition-all duration-200 ${
                  selectedBusinessCase === key 
                    ? 'ring-2 ring-primary shadow-lg scale-105' 
                    : 'hover:shadow-md hover:scale-102'
                } ${
                  businessCase.status === 'implemented' ? 'border-green-200 bg-green-50/50' :
                  businessCase.status === 'experimenting' ? 'border-blue-200 bg-blue-50/50' :
                  'border-orange-200 bg-orange-50/50'
                }`}
                onClick={() => setSelectedBusinessCase(key)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <businessCase.icon className="w-12 h-12 text-primary mr-3" />
                    <Badge 
                      className={`${
                        businessCase.status === 'implemented' ? 'bg-green-100 text-green-700 border-green-300' :
                        businessCase.status === 'experimenting' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                        'bg-orange-100 text-orange-700 border-orange-300'
                      }`}
                    >
                      {businessCase.status === 'implemented' ? '✅ Implemented' :
                       businessCase.status === 'experimenting' ? '🔬 Experimenting' : '🚧 In Development'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{businessCase.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {businessCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Case Details */}
          {selectedBusinessCase && (
            <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              <div className="text-center space-y-2 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-semibold">{currentCase.title}</h2>
                <p className="text-sm sm:text-base text-muted-foreground">{currentCase.description}</p>
              </div>
            </div>
          )}
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
            Click on journey steps to view detailed scenarios and analysis
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6">
          <JourneyStepsFlow 
            steps={currentJourneySteps}
            selectedStep={selectedStep}
            onStepClick={(stepId) => setSelectedStep(selectedStep === stepId ? null : stepId)}
            patientScenarios={selectedStep ? getPatientScenariosForStep(selectedStep) : []}
            scenarioImpacts={currentScenarioImpacts}
            showLegend={true}
          />
        </CardContent>
      </Card>

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
                     <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border border-purple-200">
                       <h4 className="font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
                         <currentCase.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                         {currentCase.scenarioTitles.sarah} - Detailed Process Flow
                       </h4>
                       <p className="text-sm sm:text-base text-purple-700 mb-4 leading-relaxed">
                         {currentCase.scenarioDescriptions.sarah}
                       </p>
                       
                       {/* Journey Step Navigator */}
                       <div className="mb-4">
                         <h5 className="text-sm font-medium mb-2 text-purple-800">Journey Steps:</h5>
                         <div className="flex flex-wrap gap-2">
                           {currentJourneySteps?.map((step: any) => (
                             <Button
                               key={step.id}
                               variant={selectedStep === step.id ? "default" : "outline"}
                               size="sm"
                               onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                               className="text-xs"
                             >
                               {step.id}. {step.title}
                             </Button>
                           ))}
                         </div>
                       </div>
                     </div>

                     {selectedStep && currentScenarioDetails.sarah[selectedStep] && (
                       <div className="space-y-4">
                         <Card className="border-purple-200">
                           <CardHeader className="pb-3">
                             <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                 <span className="text-purple-600 font-bold text-sm">{selectedStep}</span>
                               </div>
                               {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title}
                               <Badge variant="outline" className="ml-auto">
                                 {currentJourneySteps.find((s: any) => s.id === selectedStep)?.time}
                               </Badge>
                             </CardTitle>
                           </CardHeader>
                           <CardContent>
                             {/* Detailed Process Flow */}
                             <div className="space-y-4">
                               <h6 className="font-semibold text-purple-800 mb-3">Detailed Process Flow:</h6>
                               {currentScenarioDetails.sarah[selectedStep]?.map((detail: any, index: number) => (
                                 <div key={index} className="bg-white border border-purple-100 rounded-lg p-4">
                                   <div className="flex items-start gap-3">
                                     <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                                       <span className="text-purple-600 font-bold text-xs">{index + 1}</span>
                                     </div>
                                     <div className="flex-1">
                                       <h6 className="font-medium text-sm text-purple-800 mb-2">{detail.substep}</h6>
                                       <p className="text-xs text-gray-600 leading-relaxed mb-3">{detail.process}</p>
                                       
                                       {/* Technology Integration */}
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                         <div className="bg-green-50 border border-green-200 rounded p-3">
                                           <div className="flex items-center gap-2 mb-2">
                                             <Bot className="w-4 h-4 text-green-600" />
                                             <span className="text-xs font-medium text-green-800">Automation</span>
                                           </div>
                                           <ul className="text-xs text-green-700 space-y-1">
                                             {detail.automation?.map((task: string, i: number) => (
                                               <li key={i} className="flex items-start gap-1">
                                                 <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                 {task}
                                               </li>
                                             ))}
                                           </ul>
                                         </div>
                                         
                                         <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                           <div className="flex items-center gap-2 mb-2">
                                             <Brain className="w-4 h-4 text-blue-600" />
                                             <span className="text-xs font-medium text-blue-800">AI Intelligence</span>
                                           </div>
                                           <ul className="text-xs text-blue-700 space-y-1">
                                             {detail.ai?.map((task: string, i: number) => (
                                               <li key={i} className="flex items-start gap-1">
                                                 <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                 {task}
                                               </li>
                                             ))}
                                           </ul>
                                         </div>
                                       </div>
                                       
                                       {/* Expected Outcome */}
                                       {detail.outcome && (
                                         <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                                           <div className="flex items-center gap-2 mb-1">
                                             <Target className="w-4 h-4 text-yellow-600" />
                                             <span className="text-xs font-medium text-yellow-800">Expected Outcome</span>
                                           </div>
                                           <p className="text-xs text-yellow-700">{detail.outcome}</p>
                                         </div>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </CardContent>
                         </Card>
                       </div>
                     )}

                     {!selectedStep && (
                       <div className="text-center py-8 text-muted-foreground">
                         <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                         <p className="text-base mb-2">Select a journey step to view detailed process flow</p>
                         <p className="text-sm">Each step shows automation opportunities, AI integration, and expected outcomes</p>
                       </div>
                     )}
                   </TabsContent>

                   <TabsContent value="michael" className="space-y-3 sm:space-y-4">
                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-200">
                       <h4 className="font-semibold text-lg sm:text-xl mb-3 flex items-center gap-2">
                         <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                         {currentCase.scenarioTitles.michael} - Detailed Process Flow
                       </h4>
                       <p className="text-sm sm:text-base text-blue-700 mb-4 leading-relaxed">
                         {currentCase.scenarioDescriptions.michael}
                       </p>
                       
                       {/* Journey Step Navigator */}
                       <div className="mb-4">
                         <h5 className="text-sm font-medium mb-2 text-blue-800">Journey Steps:</h5>
                         <div className="flex flex-wrap gap-2">
                           {currentJourneySteps?.map((step: any) => (
                             <Button
                               key={step.id}
                               variant={selectedStep === step.id ? "default" : "outline"}
                               size="sm"
                               onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                               className="text-xs"
                             >
                               {step.id}. {step.title}
                             </Button>
                           ))}
                         </div>
                       </div>
                     </div>

                     {selectedStep && currentScenarioDetails.michael[selectedStep] && (
                       <div className="space-y-4">
                         <Card className="border-blue-200">
                           <CardHeader className="pb-3">
                             <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                 <span className="text-blue-600 font-bold text-sm">{selectedStep}</span>
                               </div>
                               {currentJourneySteps.find((s: any) => s.id === selectedStep)?.title}
                               <Badge variant="outline" className="ml-auto">
                                 {currentJourneySteps.find((s: any) => s.id === selectedStep)?.time}
                               </Badge>
                             </CardTitle>
                           </CardHeader>
                           <CardContent>
                             {/* Detailed Process Flow */}
                             <div className="space-y-4">
                               <h6 className="font-semibold text-blue-800 mb-3">Detailed Process Flow:</h6>
                               {currentScenarioDetails.michael[selectedStep]?.map((detail: any, index: number) => (
                                 <div key={index} className="bg-white border border-blue-100 rounded-lg p-4">
                                   <div className="flex items-start gap-3">
                                     <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                       <span className="text-blue-600 font-bold text-xs">{index + 1}</span>
                                     </div>
                                     <div className="flex-1">
                                       <h6 className="font-medium text-sm text-blue-800 mb-2">{detail.substep}</h6>
                                       <p className="text-xs text-gray-600 leading-relaxed mb-3">{detail.process}</p>
                                       
                                       {/* Technology Integration */}
                                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                                         <div className="bg-green-50 border border-green-200 rounded p-3">
                                           <div className="flex items-center gap-2 mb-2">
                                             <Bot className="w-4 h-4 text-green-600" />
                                             <span className="text-xs font-medium text-green-800">Automation</span>
                                           </div>
                                           <ul className="text-xs text-green-700 space-y-1">
                                             {detail.automation?.map((task: string, i: number) => (
                                               <li key={i} className="flex items-start gap-1">
                                                 <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                 {task}
                                               </li>
                                             ))}
                                           </ul>
                                         </div>
                                         
                                         <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                           <div className="flex items-center gap-2 mb-2">
                                             <Brain className="w-4 h-4 text-blue-600" />
                                             <span className="text-xs font-medium text-blue-800">AI Intelligence</span>
                                           </div>
                                           <ul className="text-xs text-blue-700 space-y-1">
                                             {detail.ai?.map((task: string, i: number) => (
                                               <li key={i} className="flex items-start gap-1">
                                                 <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                 {task}
                                               </li>
                                             ))}
                                           </ul>
                                         </div>
                                       </div>
                                       
                                       {/* Expected Outcome */}
                                       {detail.outcome && (
                                         <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                                           <div className="flex items-center gap-2 mb-1">
                                             <Target className="w-4 h-4 text-yellow-600" />
                                             <span className="text-xs font-medium text-yellow-800">Expected Outcome</span>
                                           </div>
                                           <p className="text-xs text-yellow-700">{detail.outcome}</p>
                                         </div>
                                       )}
                                     </div>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </CardContent>
                         </Card>
                       </div>
                     )}

                     {!selectedStep && (
                       <div className="text-center py-8 text-muted-foreground">
                         <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                         <p className="text-base mb-2">Select a journey step to view detailed process flow</p>
                         <p className="text-sm">Each step shows automation opportunities, AI integration, and expected outcomes</p>
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
    </div>
  );
};

export default BusinessUseCases;
