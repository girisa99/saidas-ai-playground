import { Heart, UserCheck, FileText, Users, Shield, Calendar, ClipboardCheck, Stethoscope, Dna, MessageCircle, Clock, Target, TrendingUp, Brain, Smartphone, Monitor, Database, Workflow, Activity, Layers, Network, Wrench, Cog, ArrowRight, Play, Pause, RotateCcw, ThumbsUp, ThumbsDown, Meh, Frown, Briefcase, Search, CheckCircle, AlertTriangle, Lightbulb, Star, ArrowUp, ArrowDown, User, Bot, Zap, Settings, Phone, Info } from "lucide-react";
import { BusinessCase, JourneyStep, ScenarioDetail, ScenarioImpact, BusinessCasesData } from "./businessUseCases";

// Business Use Cases Data Structure - exact copy from original
export const businessCases = {
  oncology: {
    id: "oncology",
    title: "Oncology Care Workflow",
    description: "Mixed implementation status - some steps live, others in development and testing phases",
    status: "mixed",
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
    description: "Partial implementation - key steps deployed, complex workflows in active development",
    status: "mixed",
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
    description: "Early stage implementation - foundational components built, advanced features in progress",
    status: "mixed",
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

// Journey steps data
export const journeySteps = {
  referral: [
    {
      id: 1,
      title: "Referral Receipt",
      icon: FileText,
      time: "Day 0",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "automation",
      description: "Initial referral received and immediate processing",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
      implementationStatus: "live",
      statusNote: "Digital intake system fully operational",
      automationTasks: [
        "Incoming digital referral processing",
        "Fax-to-digital conversion workflows",
        "Automated data extraction and validation",
        "Immediate acknowledgment notifications",
        "Referral tracking system integration"
      ],
      aiTasks: [
        "Intelligent referral completeness assessment",
        "Urgency classification and prioritization",
        "Smart routing to appropriate care teams",
        "Predictive resource allocation",
        "Clinical context understanding"
      ],
      whyAutomation: "High-volume referral processing requires consistent, fast digital workflows",
      whyAI: "Complex triage decisions need intelligent assessment of clinical urgency and routing",
      phases: [
        "Deploy automated referral processing",
        "Implement AI-powered triage",
        "Optimize routing algorithms"
      ],
      currentIssues: [
        "Manual fax processing causing delays",
        "Inconsistent referral handling",
        "Limited urgency assessment capabilities"
      ],
      improvement: "Immediate digital referral processing with intelligent routing reduces response time to under 30 minutes"
    },
    {
      id: 2,
      title: "Initial Patient Outreach & Referral Network Check",
      icon: Phone,
      time: "Day 1-2",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Personalized patient outreach with network verification",
      automationPrimary: true,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Pilot program with personalized communications",
      automationTasks: [
        "Automated patient contact workflows",
        "Provider network verification",
        "Appointment availability checking",
        "Standard communication templates",
        "Follow-up scheduling automation"
      ],
      aiTasks: [
        "Personalized outreach timing optimization",
        "Intelligent response to patient inquiries",
        "Cultural and language adaptation",
        "Anxiety prediction and mitigation",
        "Optimal communication channel selection"
      ],
      whyAutomation: "Systematic patient outreach ensures consistent and timely communication",
      whyAI: "Personalized communication improves patient engagement and reduces anxiety",
      phases: [
        "Automate basic outreach workflows",
        "Deploy AI for personalization",
        "Implement predictive optimization"
      ],
      currentIssues: [
        "Manual calling consuming staff time",
        "Generic communication approaches",
        "Inconsistent follow-up processes"
      ],
      improvement: "AI-driven personalized outreach increases patient response rates by 60% and reduces anxiety"
    },
    {
      id: 3,
      title: "Provider, Treatment Center & Referral Network Check",
      icon: Network,
      time: "Day 1-3",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "automation",
      description: "Comprehensive provider network and capacity verification",
      automationPrimary: true,
      roi: "≈ 90% efficiency gain",
      implementationStatus: "live",
      statusNote: "Integrated with provider networks",
      automationTasks: [
        "Real-time provider availability checking",
        "Treatment center capacity verification",
        "Network coverage validation",
        "Appointment slot synchronization",
        "Provider credential verification"
      ],
      aiTasks: [
        "Intelligent provider matching based on expertise",
        "Optimal treatment center selection",
        "Predictive capacity planning",
        "Quality outcome analysis",
        "Patient preference optimization"
      ],
      whyAutomation: "Network verification requires systematic checking of multiple data sources",
      whyAI: "Optimal provider matching requires intelligent analysis of multiple factors",
      phases: [
        "Automate network verification",
        "Deploy AI matching algorithms",
        "Implement quality analytics"
      ],
      currentIssues: [
        "Manual provider checking delays",
        "Limited network visibility",
        "Suboptimal provider assignments"
      ],
      improvement: "Automated network verification with AI matching reduces assignment time by 80%"
    },
    {
      id: 4,
      title: "Demographic & Insurance Data Collection",
      icon: Database,
      time: "Day 2-4",
      emotion: "neutral",
      emotionIcon: Info,
      approach: "automation",
      description: "Comprehensive patient data gathering and validation",
      automationPrimary: true,
      roi: "≈ 70% efficiency gain",
      implementationStatus: "live",
      statusNote: "Integrated with insurance systems",
      automationTasks: [
        "Digital demographic form processing",
        "Insurance information capture",
        "Data validation and verification",
        "Electronic consent management",
        "Patient portal account creation"
      ],
      aiTasks: [
        "Intelligent form completion assistance",
        "Data quality assessment and correction",
        "Risk factor identification",
        "Insurance plan optimization recommendations",
        "Personalized data collection workflows"
      ],
      whyAutomation: "Systematic data collection ensures complete and accurate patient information",
      whyAI: "Intelligent assistance improves data quality and patient experience",
      phases: [
        "Deploy automated data collection",
        "Implement AI assistance features",
        "Add quality optimization"
      ],
      currentIssues: [
        "Manual data entry errors",
        "Incomplete information collection",
        "Time-consuming verification processes"
      ],
      improvement: "AI-assisted data collection reduces errors by 95% and completion time by 50%"
    },
    {
      id: 5,
      title: "Medical Records Acquisition",
      icon: FileText,
      time: "Day 3-7",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Comprehensive medical history retrieval and integration",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      implementationStatus: "testing",
      statusNote: "FHIR integration under development",
      automationTasks: [
        "Automated record requests to external providers",
        "FHIR-based data integration",
        "Document digitization workflows",
        "Electronic health record synchronization",
        "Automated follow-up for missing records"
      ],
      aiTasks: [
        "Intelligent record completeness assessment",
        "Smart document parsing and extraction",
        "Clinical relevance scoring",
        "Duplicate detection and consolidation",
        "Quality assessment and validation"
      ],
      whyAutomation: "Medical record acquisition requires systematic requests and processing",
      whyAI: "Intelligent analysis ensures complete and relevant record collection",
      phases: [
        "Automate record request workflows",
        "Deploy AI for intelligent parsing",
        "Implement quality assessment"
      ],
      currentIssues: [
        "Manual record requests causing delays",
        "Incomplete external documentation",
        "Quality assessment challenges"
      ],
      improvement: "AI-enhanced record acquisition reduces collection time by 70% and improves completeness"
    },
    {
      id: 6,
      title: "Eligibility & Benefit Verification",
      icon: Shield,
      time: "Day 4-8",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Real-time insurance verification with comprehensive benefit analysis",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      implementationStatus: "live",
      statusNote: "Real-time verification operational",
      automationTasks: [
        "Real-time eligibility verification",
        "Benefit coverage determination",
        "Prior authorization status checking",
        "Copay and deductible calculation",
        "Financial assistance screening"
      ],
      aiTasks: [
        "Intelligent benefit interpretation",
        "Predictive approval likelihood",
        "Personalized financial counseling",
        "Alternative coverage identification",
        "Pre-authorization optimization"
      ],
      whyAutomation: "Insurance verification requires systematic checking of complex policies",
      whyAI: "Benefit interpretation requires intelligent analysis for optimal patient outcomes",
      phases: [
        "Deploy real-time verification",
        "Implement AI benefit analysis",
        "Add predictive approval modeling"
      ],
      currentIssues: [
        "Manual verification delays",
        "Complex benefit interpretation",
        "Limited financial assistance identification"
      ],
      improvement: "AI-powered verification eliminates delays and increases financial assistance identification by 60%"
    },
    {
      id: 7,
      title: "Clinical Review & Triage",
      icon: Stethoscope,
      time: "Day 5-7",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-assisted clinical assessment and care pathway determination",
      automationPrimary: false,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "development",
      statusNote: "Clinical AI algorithms in development",
      automationTasks: [
        "Clinical documentation review",
        "Standard assessment protocols",
        "Care pathway template selection",
        "Provider notification workflows",
        "Appointment type determination"
      ],
      aiTasks: [
        "Intelligent clinical assessment",
        "Risk stratification and prioritization",
        "Optimal care pathway recommendation",
        "Specialist matching based on case complexity",
        "Predictive outcome modeling"
      ],
      whyAutomation: "Clinical review requires systematic assessment protocols",
      whyAI: "Complex clinical decisions benefit from intelligent analysis and recommendation",
      phases: [
        "Automate clinical documentation review",
        "Deploy AI assessment algorithms",
        "Implement predictive modeling"
      ],
      currentIssues: [
        "Manual clinical review bottlenecks",
        "Inconsistent triage decisions",
        "Limited predictive capabilities"
      ],
      improvement: "AI-assisted clinical review reduces triage time by 75% and improves accuracy"
    },
    {
      id: 8,
      title: "Appointment Scheduling & Coordination",
      icon: Calendar,
      time: "Day 8-10",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Intelligent scheduling with comprehensive care coordination",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
      implementationStatus: "live",
      statusNote: "Smart scheduling system operational",
      automationTasks: [
        "Provider availability optimization",
        "Multi-specialty appointment coordination",
        "Patient preference integration",
        "Automated confirmation workflows",
        "Care team notification systems"
      ],
      aiTasks: [
        "Intelligent scheduling optimization",
        "No-show prediction and prevention",
        "Optimal appointment sequencing",
        "Dynamic rescheduling management",
        "Patient satisfaction optimization"
      ],
      whyAutomation: "Complex scheduling requires systematic coordination across multiple providers",
      whyAI: "Optimal scheduling requires intelligent analysis of multiple variables",
      phases: [
        "Deploy automated scheduling coordination",
        "Implement AI optimization algorithms",
        "Add predictive analytics"
      ],
      currentIssues: [
        "Manual scheduling inefficiencies",
        "High no-show rates",
        "Suboptimal appointment sequencing"
      ],
      improvement: "AI-optimized scheduling reduces no-shows by 40% and improves patient satisfaction"
    }
  ],
  oncology: [
    {
      id: 1,
      title: "Referral Receipt",
      icon: FileText,
      time: "Day 0",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "automation",
      description: "Initial referral received and triaged",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      implementationStatus: "live",
      statusNote: "Fully operational digital intake system",
      automationTasks: [
        "Digital referral form processing",
        "Automated data extraction from documents",
        "Instant referral acknowledgment notifications",
        "Electronic health record integration",
        "Referral tracking and routing"
      ],
      aiTasks: [
        "Intelligent triage and priority assignment",
        "Clinical urgency assessment",
        "Provider matching based on expertise",
        "Predictive resource allocation",
        "Smart documentation analysis"
      ],
      whyAutomation: "High-volume referral processing benefits from consistent, fast digital workflows",
      whyAI: "Complex triage decisions require intelligent assessment of clinical urgency and appropriate routing",
      phases: [
        "Deploy automated referral processing",
        "Implement AI triage algorithms",
        "Optimize resource allocation"
      ],
      currentIssues: [
        "Manual processing causes delays",
        "Inconsistent triage decisions",
        "Resource allocation inefficiencies"
      ],
      improvement: "Systematic collection of patient information, insurance data, medical history, symptoms"
    },
    {
      id: 2,
      title: "Data Collection",
      icon: Database,
      time: "Day 1-3",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "automation",
      description: "Systematic collection of patient information and medical records",
      automationPrimary: true,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "live",
      statusNote: "Integrated with major EHR systems",
      automationTasks: [
        "Demographics and insurance data capture",
        "Medical history questionnaire processing",
        "Symptom documentation workflows",
        "Previous treatment record consolidation",
        "Insurance verification automation"
      ],
      aiTasks: [
        "Intelligent form completion assistance",
        "Risk factor pattern identification",
        "Medical history gap detection",
        "Predictive questionnaire optimization",
        "Smart data validation and correction"
      ],
      whyAutomation: "Comprehensive data collection requires systematic gathering of multiple data types",
      whyAI: "Intelligent assistance improves data quality and identifies important patterns",
      phases: [
        "Automate core data collection workflows",
        "Deploy AI for intelligent assistance",
        "Implement predictive optimization"
      ],
      currentIssues: [
        "Incomplete data collection",
        "Manual data entry errors",
        "Time-consuming verification processes"
      ],
      improvement: "Acquisition and integration of external medical records and documentation"
    },
    {
      id: 3,
      title: "Record Acquisition",
      icon: Search,
      time: "Day 4-8",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Acquisition and integration of external medical records",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Integration with external providers ongoing",
      automationTasks: [
        "Automated record requests to external providers",
        "FHIR-based data integration",
        "Document digitization and indexing",
        "Electronic health record synchronization",
        "Automated follow-up for missing records"
      ],
      aiTasks: [
        "Intelligent record completeness assessment",
        "Smart document parsing and extraction",
        "Clinical relevance scoring",
        "Duplicate record identification",
        "Quality assessment and validation"
      ],
      whyAutomation: "Record acquisition requires systematic requests and integration processes",
      whyAI: "Intelligent analysis ensures complete and relevant record collection",
      phases: [
        "Automate external record requests",
        "Deploy AI for intelligent parsing",
        "Implement quality assessment"
      ],
      currentIssues: [
        "Manual record requests causing delays",
        "Incomplete external documentation",
        "Quality and relevance assessment challenges"
      ],
      improvement: "Intelligent scheduling based on availability, preferences, and patient requirements"
    },
    {
      id: 4,
      title: "Appointment Scheduling",
      icon: Calendar,
      time: "Day 8-10",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Intelligent scheduling with patient preference optimization",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
      implementationStatus: "live",
      statusNote: "Smart scheduling system operational",
      automationTasks: [
        "Provider availability checking",
        "Appointment slot management",
        "Automated confirmation notifications",
        "Calendar integration and synchronization",
        "Reminder workflow automation"
      ],
      aiTasks: [
        "Intelligent scheduling optimization",
        "Patient preference learning",
        "No-show prediction and prevention",
        "Optimal time slot recommendations",
        "Dynamic rescheduling management"
      ],
      whyAutomation: "Systematic scheduling ensures efficient use of provider time and resources",
      whyAI: "Intelligent optimization improves patient satisfaction and reduces no-shows",
      phases: [
        "Deploy automated scheduling workflows",
        "Implement AI optimization algorithms",
        "Add predictive analytics"
      ],
      currentIssues: [
        "Manual scheduling inefficiencies",
        "High no-show rates",
        "Suboptimal slot utilization"
      ],
      improvement: "Comprehensive preparation for optimal visit outcomes"
    },
    {
      id: 5,
      title: "Pre-visit Preparation",
      icon: ClipboardCheck,
      time: "Day 14-20",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Comprehensive patient preparation and care team coordination",
      automationPrimary: true,
      roi: "≈ 50% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Preparation protocols under evaluation",
      automationTasks: [
        "Pre-visit instruction delivery",
        "Lab work and imaging scheduling",
        "Medication list compilation",
        "Transportation coordination",
        "Care team notification workflows"
      ],
      aiTasks: [
        "Personalized preparation recommendations",
        "Anxiety and concern prediction",
        "Educational content customization",
        "Optimal preparation timing",
        "Cultural and language adaptation"
      ],
      whyAutomation: "Systematic preparation ensures consistent and complete pre-visit workflows",
      whyAI: "Personalized preparation improves patient readiness and reduces anxiety",
      phases: [
        "Automate standard preparation workflows",
        "Deploy AI for personalization",
        "Implement adaptive optimization"
      ],
      currentIssues: [
        "Inconsistent preparation protocols",
        "High patient anxiety levels",
        "Poor visit preparation outcomes"
      ],
      improvement: "AI-assisted clinical visit with real-time decision support"
    },
    {
      id: 6,
      title: "Visit Conduct",
      icon: Stethoscope,
      time: "Day 21",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "AI-assisted clinical visit with comprehensive assessment",
      automationPrimary: false,
      roi: "≈ 40% efficiency gain",
      implementationStatus: "development",
      statusNote: "Clinical AI tools in development",
      automationTasks: [
        "Automated documentation capture",
        "Clinical workflow management",
        "Real-time vitals monitoring",
        "Standard assessment protocols",
        "Electronic form completion"
      ],
      aiTasks: [
        "Clinical decision support systems",
        "Diagnostic assistance and recommendations",
        "Risk assessment and stratification",
        "Treatment option analysis",
        "Real-time clinical alerts"
      ],
      whyAutomation: "Systematic clinical workflows ensure comprehensive and consistent assessments",
      whyAI: "Complex clinical decisions benefit from AI-powered decision support and analysis",
      phases: [
        "Deploy automated documentation",
        "Implement AI decision support",
        "Add real-time clinical assistance"
      ],
      currentIssues: [
        "Manual documentation burden",
        "Inconsistent assessment protocols",
        "Limited decision support tools"
      ],
      improvement: "AI-driven comprehensive treatment plan development"
    },
    {
      id: 7,
      title: "Treatment Planning",
      icon: Target,
      time: "Day 22-25",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "agentic",
      description: "AI-driven personalized treatment strategy development",
      automationPrimary: false,
      roi: "≈ 80% efficiency gain",
      implementationStatus: "development",
      statusNote: "Advanced treatment AI in development",
      automationTasks: [
        "Treatment protocol template generation",
        "Medication interaction checking",
        "Insurance coverage verification",
        "Appointment scheduling automation",
        "Care team coordination workflows"
      ],
      aiTasks: [
        "Personalized treatment recommendations",
        "Genomic analysis integration",
        "Predictive outcome modeling",
        "Multi-specialty coordination",
        "Evidence-based protocol optimization"
      ],
      whyAutomation: "Systematic treatment planning ensures comprehensive care coordination",
      whyAI: "Complex treatment decisions require intelligent analysis of multiple clinical factors",
      phases: [
        "Automate treatment protocol generation",
        "Deploy AI for personalized recommendations",
        "Implement outcome prediction"
      ],
      currentIssues: [
        "Manual treatment planning inefficiencies",
        "Limited personalization capabilities",
        "Suboptimal outcome prediction"
      ],
      improvement: "Comprehensive care team coordination and communication"
    },
    {
      id: 8,
      title: "Care Coordination",
      icon: Users,
      time: "Day 28-30",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Multi-disciplinary care team coordination and communication",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Care coordination platform in pilot",
      automationTasks: [
        "Care team notification systems",
        "Appointment coordination across specialties",
        "Information sharing workflows",
        "Status update automation",
        "Communication platform management"
      ],
      aiTasks: [
        "Intelligent care pathway optimization",
        "Predictive coordination needs",
        "Communication priority assessment",
        "Conflict resolution recommendations",
        "Outcome tracking and analysis"
      ],
      whyAutomation: "Systematic coordination ensures consistent communication across care teams",
      whyAI: "Intelligent optimization improves care pathway efficiency and outcomes",
      phases: [
        "Deploy automated coordination workflows",
        "Implement AI pathway optimization",
        "Add predictive analytics"
      ],
      currentIssues: [
        "Manual coordination inefficiencies",
        "Communication gaps between specialists",
        "Suboptimal care pathway execution"
      ],
      improvement: "Continuous monitoring and adaptive care management"
    },
    {
      id: 9,
      title: "Follow-up & Monitoring",
      icon: Activity,
      time: "Ongoing",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Continuous monitoring and adaptive care management",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      implementationStatus: "planned",
      statusNote: "Monitoring systems in planning phase",
      automationTasks: [
        "Automated follow-up scheduling",
        "Patient monitoring workflows",
        "Lab result tracking",
        "Medication adherence monitoring",
        "Progress report generation"
      ],
      aiTasks: [
        "Predictive health deterioration alerts",
        "Adaptive care plan optimization",
        "Patient engagement personalization",
        "Risk-based monitoring intervals",
        "Outcome prediction and intervention"
      ],
      whyAutomation: "Systematic monitoring ensures consistent patient follow-up and tracking",
      whyAI: "Intelligent analysis enables proactive care and personalized monitoring",
      phases: [
        "Deploy automated monitoring workflows",
        "Implement AI predictive analytics",
        "Add adaptive care optimization"
      ],
      currentIssues: [
        "Manual follow-up coordination",
        "Reactive rather than proactive care",
        "Limited monitoring personalization"
      ],
      improvement: "Continuous monitoring and adaptive care management"
    }
  ],
  contact: [
    {
      id: 1,
      title: "Initial Contact & Channel Entry",
      icon: Phone,
      time: "0-2 min",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Smart IVR with AI and omni-channel entry point to optimal channel handling",
      automationPrimary: true,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "live",
      statusNote: "Smart routing system operational",
      automationTasks: [
        "Automated call routing and queuing",
        "Multi-channel contact consolidation",
        "Basic caller information capture",
        "Standard workflow triggers",
        "Channel preference tracking"
      ],
      aiTasks: [
        "Intelligent intent recognition",
        "Dynamic routing optimization",
        "Real-time sentiment analysis",
        "Predictive resource allocation",
        "Channel preference learning"
      ],
      whyAutomation: "Consistent contact handling ensures standardized service across all channels",
      whyAI: "Complex routing decisions require intelligent assessment of urgency and optimal channel selection",
      phases: [
        "Deploy automated multi-channel routing",
        "Implement AI intent recognition",
        "Add predictive analytics"
      ],
      currentIssues: [
        "Long hold times during peak hours",
        "Channel switching causing information loss",
        "Inconsistent service quality"
      ],
      improvement: "Smart IVR with NLP reduces hold times by 70% and improves first-call resolution by 85%"
    },
    {
      id: 2,
      title: "Identity Verification & Authentication",
      icon: Shield,
      time: "0.5-2 min",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Multi-factor authentication with voice biometrics and fraud detection",
      automationPrimary: true,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Voice biometrics pilot program",
      automationTasks: [
        "Automated identity verification workflows",
        "Standard security question processing",
        "Account lookup and validation",
        "Access level determination",
        "Compliance logging automation"
      ],
      aiTasks: [
        "Voice biometric authentication",
        "Behavioral pattern recognition",
        "Risk-based authentication scoring",
        "Fraud detection algorithms",
        "Dynamic security optimization"
      ],
      whyAutomation: "Consistent security protocols ensure HIPAA compliance and data protection",
      whyAI: "Advanced authentication requires intelligent analysis of multiple security factors",
      phases: [
        "Deploy automated verification",
        "Implement voice biometrics",
        "Add behavioral fraud detection"
      ],
      currentIssues: [
        "Manual verification taking 2-3 minutes",
        "15% authentication failure rates",
        "Security vulnerabilities"
      ],
      improvement: "Voice biometrics and multi-factor authentication reduces verification time to under 30 seconds"
    },
    {
      id: 3,
      title: "Issue Classification & Intent Recognition",
      icon: Search,
      time: "1-3 min",
      emotion: "neutral",
      emotionIcon: Info,
      approach: "agentic",
      description: "AI-powered issue agent with NLP intent resolution agent",
      automationPrimary: false,
      roi: "≈ 75% efficiency gain",
      implementationStatus: "development",
      statusNote: "NLP classification engine in development",
      automationTasks: [
        "Standard issue categorization workflows",
        "Basic intent classification rules",
        "Historical case matching",
        "Priority level assignment",
        "Workflow routing automation"
      ],
      aiTasks: [
        "Advanced natural language processing",
        "Intelligent issue classification",
        "Context-aware intent recognition",
        "Dynamic priority assessment",
        "Predictive resolution recommendations"
      ],
      whyAutomation: "Systematic issue classification ensures consistent handling and tracking",
      whyAI: "Complex patient communications require intelligent understanding of context and intent",
      phases: [
        "Deploy automated classification",
        "Implement NLP intent recognition",
        "Add predictive resolution"
      ],
      currentIssues: [
        "Manual issue classification delays",
        "Inconsistent priority assignment",
        "Limited context understanding"
      ],
      improvement: "AI-powered classification agent with NLP resolves intent identification within 30 seconds"
    },
    {
      id: 4,
      title: "Information Gathering & Orchestration",
      icon: Database,
      time: "2-6 min",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Unified patient view with context consolidation and orchestration",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Unified dashboard in pilot",
      automationTasks: [
        "Automated record retrieval across systems",
        "Standard information consolidation",
        "Recent activity timeline generation",
        "Insurance and billing status updates",
        "Cross-system data synchronization"
      ],
      aiTasks: [
        "Intelligent data synthesis and prioritization",
        "Contextual information relevance scoring",
        "Predictive information needs",
        "Dynamic dashboard personalization",
        "Smart information orchestration"
      ],
      whyAutomation: "Unified information access eliminates system navigation and reduces errors",
      whyAI: "Intelligent synthesis provides relevant context and anticipates information needs",
      phases: [
        "Deploy unified information platform",
        "Implement AI data synthesis",
        "Add predictive information delivery"
      ],
      currentIssues: [
        "Agents navigate 3-5 different systems",
        "5-8 minute information gathering delays",
        "Incomplete patient context"
      ],
      improvement: "Unified patient view eliminates system navigation reducing information gathering time by 80%"
    },
    {
      id: 5,
      title: "Case Creation & Priority Management",
      icon: ClipboardCheck,
      time: "1-4 min",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Intelligent case management agent with automated priority and priority scoring",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
      implementationStatus: "live",
      statusNote: "Smart case management operational",
      automationTasks: [
        "Automated case creation workflows",
        "Standard priority scoring rules",
        "SLA assignment and tracking",
        "Resource allocation automation",
        "Case routing and assignment"
      ],
      aiTasks: [
        "Intelligent priority scoring algorithms",
        "Dynamic SLA optimization",
        "Predictive resource needs assessment",
        "Smart case routing and assignment",
        "Outcome-based priority adjustment"
      ],
      whyAutomation: "Systematic case management ensures consistent processing and tracking",
      whyAI: "Complex priority decisions require intelligent analysis of multiple factors",
      phases: [
        "Deploy automated case creation",
        "Implement AI priority scoring",
        "Add predictive resource allocation"
      ],
      currentIssues: [
        "Manual case creation inefficiencies",
        "Inconsistent priority assignment",
        "Resource allocation bottlenecks"
      ],
      improvement: "AI-powered case management ensures consistent priority scoring and optimal resource allocation"
    },
    {
      id: 6,
      title: "Resolution Research & Knowledge Management",
      icon: Brain,
      time: "3-8 min",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "agentic",
      description: "Intelligent knowledge agent with contextual recommendations and escalation",
      automationPrimary: false,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "development",
      statusNote: "Knowledge AI in development",
      automationTasks: [
        "Standard knowledge base searches",
        "Historical case retrieval",
        "Documentation template generation",
        "Basic resolution workflows",
        "Knowledge article recommendations"
      ],
      aiTasks: [
        "Intelligent knowledge discovery",
        "Contextual resolution recommendations",
        "Dynamic knowledge synthesis",
        "Predictive escalation triggers",
        "Continuous knowledge learning"
      ],
      whyAutomation: "Systematic knowledge access ensures consistent information retrieval",
      whyAI: "Complex resolution research requires intelligent synthesis of multiple knowledge sources",
      phases: [
        "Deploy automated knowledge retrieval",
        "Implement AI knowledge synthesis",
        "Add predictive escalation"
      ],
      currentIssues: [
        "Manual knowledge searches inefficient",
        "Limited contextual recommendations",
        "Delayed escalation decisions"
      ],
      improvement: "Intelligent knowledge agent with contextual search and escalation reduces research time by 65%"
    },
    {
      id: 7,
      title: "Multi-channel Coordination & Seamless Experience",
      icon: Network,
      time: "2-5 min",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Optimal coordination agent managing unified communication and escalation",
      automationPrimary: true,
      roi: "≈ 70% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Multi-channel platform in pilot",
      automationTasks: [
        "Cross-channel communication coordination",
        "Contact history synchronization",
        "Channel preference management",
        "Standard escalation workflows",
        "Communication timeline tracking"
      ],
      aiTasks: [
        "Intelligent channel optimization",
        "Dynamic communication coordination",
        "Predictive channel switching",
        "Smart escalation management",
        "Personalized experience orchestration"
      ],
      whyAutomation: "Systematic coordination ensures consistent experience across channels",
      whyAI: "Optimal coordination requires intelligent analysis of communication patterns",
      phases: [
        "Deploy multi-channel coordination",
        "Implement AI optimization",
        "Add predictive channel management"
      ],
      currentIssues: [
        "Channel switching causes information loss",
        "Inconsistent escalation handling",
        "Poor coordination between channels"
      ],
      improvement: "Seamless multi-channel coordination maintains context across all touchpoints"
    },
    {
      id: 8,
      title: "Escalation Management & Exception Handling",
      icon: AlertTriangle,
      time: "5-15 min",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Intelligent escalation agent with predictive triggers and intelligent handoff coordination",
      automationPrimary: false,
      roi: "≈ 65% efficiency gain",
      implementationStatus: "development",
      statusNote: "Escalation AI in development",
      automationTasks: [
        "Standard escalation workflow triggers",
        "Supervisor notification automation",
        "Case priority elevation",
        "Handoff documentation generation",
        "Timeline and SLA management"
      ],
      aiTasks: [
        "Predictive escalation trigger identification",
        "Intelligent handoff coordination",
        "Dynamic priority assessment",
        "Smart supervisor assignment",
        "Outcome prediction and intervention"
      ],
      whyAutomation: "Systematic escalation ensures consistent handling of complex cases",
      whyAI: "Complex escalation decisions require intelligent assessment of multiple factors",
      phases: [
        "Deploy automated escalation workflows",
        "Implement AI prediction triggers",
        "Add intelligent handoff coordination"
      ],
      currentIssues: [
        "Manual escalation delays",
        "Inconsistent handoff processes",
        "Limited predictive capabilities"
      ],
      improvement: "Predictive escalation with intelligent handoff reduces exception handling time by 50%"
    },
    {
      id: 9,
      title: "Follow-up Communication & Relationship Management",
      icon: MessageCircle,
      time: "1-3 day",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      description: "Proactive outreach agent with personalized engagement and service-based insights",
      automationPrimary: true,
      roi: "≈ 60% efficiency gain",
      implementationStatus: "planned",
      statusNote: "Follow-up automation in planning",
      automationTasks: [
        "Automated follow-up scheduling",
        "Standard satisfaction surveys",
        "Communication preference tracking",
        "Case closure workflows",
        "Relationship history management"
      ],
      aiTasks: [
        "Personalized follow-up optimization",
        "Intelligent satisfaction prediction",
        "Dynamic engagement strategies",
        "Proactive relationship management",
        "Predictive service needs assessment"
      ],
      whyAutomation: "Systematic follow-up ensures consistent patient engagement",
      whyAI: "Personalized relationship management requires intelligent analysis of patient interactions",
      phases: [
        "Deploy automated follow-up workflows",
        "Implement AI personalization",
        "Add predictive relationship management"
      ],
      currentIssues: [
        "Inconsistent follow-up processes",
        "Limited relationship tracking",
        "Reactive service approach"
      ],
      improvement: "Proactive outreach agent with personalized engagement and service-based insights"
    },
    {
      id: 10,
      title: "Satisfaction Measurement & Continuous Improvement",
      icon: TrendingUp,
      time: "1-7 day",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      description: "Experience optimization agent with real-time satisfaction analysis and improvement recommendations",
      automationPrimary: false,
      roi: "≈ 70% efficiency gain",
      implementationStatus: "planned",
      statusNote: "Analytics platform in planning",
      automationTasks: [
        "Automated satisfaction surveys",
        "Performance metrics collection",
        "Standard reporting workflows",
        "Benchmark comparison analysis",
        "Improvement tracking systems"
      ],
      aiTasks: [
        "Real-time satisfaction analysis",
        "Predictive improvement recommendations",
        "Dynamic experience optimization",
        "Intelligent pattern recognition",
        "Continuous learning and adaptation"
      ],
      whyAutomation: "Systematic measurement ensures consistent improvement tracking",
      whyAI: "Complex improvement insights require intelligent analysis of satisfaction patterns",
      phases: [
        "Deploy automated satisfaction measurement",
        "Implement AI pattern analysis",
        "Add predictive improvement recommendations"
      ],
      currentIssues: [
        "Limited satisfaction visibility",
        "Reactive improvement processes",
        "Delayed feedback analysis"
      ],
      improvement: "Experience optimization agent with real-time satisfaction analysis and improvement score"
    }
  ]
};

// Scenario details data
export const scenarioDetails = {
  referral: {
    sarah: {
      1: [
        {
          substep: "Digital Intake Processing",
          process: "AI extracts key information from digital referral: patient demographics, primary complaint, referring physician details, and insurance information."
        },
        {
          substep: "Intelligent Triage Assessment",
          process: "System analyzes clinical indicators and assigns priority level: urgent (24-48 hours), routine (1-2 weeks), or specialist consultation needed."
        }
      ],
      2: [
        {
          substep: "Automated Patient Outreach",
          process: "AI generates personalized communication: preferred contact method, optimal timing, and culturally appropriate messaging."
        },
        {
          substep: "Dynamic Scheduling",
          process: "System optimizes appointment scheduling based on patient availability, provider schedules, and clinical priority."
        }
      ],
      3: [
        {
          substep: "Real-time Eligibility Check",
          process: "AI instantly verifies insurance coverage, benefit levels, and identifies potential coverage gaps or financial assistance opportunities."
        },
        {
          substep: "Benefit Optimization",
          process: "System analyzes benefit structure and recommends optimal utilization strategy to minimize patient costs."
        }
      ],
      4: [
        {
          substep: "AI Specialist Matching",
          process: "AI analyzes case complexity, provider expertise, availability, and historical outcomes to recommend optimal specialist assignment."
        },
        {
          substep: "Care Team Formation",
          process: "System automatically assembles multi-disciplinary care team based on patient needs and specialist availability."
        }
      ],
      5: [
        {
          substep: "Personalized Education",
          process: "AI generates customized pre-appointment materials based on patient's medical literacy, anxiety level, and specific procedure requirements."
        },
        {
          substep: "Preparation Optimization",
          process: "System creates personalized timeline and checklist to ensure patient arrives fully prepared for specialist consultation."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Complex Case Analysis",
          process: "AI performs comprehensive analysis of multiple comorbidities, medication interactions, and specialist coordination requirements."
        },
        {
          substep: "Multi-specialist Coordination",
          process: "System automatically coordinates with multiple specialists and manages complex scheduling requirements."
        }
      ],
      2: [
        {
          substep: "Personalized Communication",
          process: "AI adapts communication style for complex medical situation, providing clear explanations and managing patient anxiety."
        },
        {
          substep: "Care Team Integration",
          process: "System ensures all care team members are informed and coordinated for comprehensive patient management."
        }
      ],
      3: [
        {
          substep: "Complex Benefit Analysis",
          process: "AI analyzes multiple insurance policies and coordination of benefits for complex cases with high expected costs."
        },
        {
          substep: "Financial Strategy Development",
          process: "System identifies optimal combination of insurance benefits, assistance programs, and payment options."
        }
      ],
      4: [
        {
          substep: "Multi-specialty Team Assembly",
          process: "AI coordinates optimal team of specialists considering case complexity, provider relationships, and geographic constraints."
        },
        {
          substep: "Complex Care Pathway Planning",
          process: "System develops comprehensive care coordination strategy with multiple touchpoints and decision trees."
        }
      ],
      5: [
        {
          substep: "Comprehensive Preparation Strategy",
          process: "AI creates detailed preparation plan addressing complex medical history, multiple appointments, and patient education needs."
        },
        {
          substep: "Multi-modal Support Coordination",
          process: "System arranges transportation, caregiver support, and specialized preparation resources for complex cases."
        }
      ]
    }
  },
  oncology: {
    sarah: {
      1: [
        {
          substep: "Comprehensive Data Collection",
          process: "AI guides patients through detailed medical history questionnaire, automatically identifying relevant risk factors and family history patterns."
        },
        {
          substep: "Risk Factor Analysis",
          process: "System analyzes collected data to identify genetic predispositions, environmental factors, and lifestyle risks relevant to oncology screening."
        }
      ],
      2: [
        {
          substep: "AI-Enhanced Clinical Assessment",
          process: "AI assists clinicians in comprehensive evaluation, highlighting key risk factors and recommending appropriate diagnostic protocols."
        },
        {
          substep: "Predictive Risk Modeling",
          process: "System generates personalized risk assessment and screening recommendations based on patient-specific factors."
        }
      ],
      3: [
        {
          substep: "Personalized Treatment Strategy",
          process: "AI analyzes patient profile, clinical guidelines, and latest research to recommend optimal treatment pathways."
        },
        {
          substep: "Treatment Plan Optimization",
          process: "System coordinates multi-modal treatment approach with personalized timing and resource allocation."
        }
      ],
      4: [
        {
          substep: "Integrated Care Coordination",
          process: "AI orchestrates care team activities, appointment scheduling, and treatment milestone tracking."
        },
        {
          substep: "Continuous Monitoring Setup",
          process: "System establishes real-time patient monitoring and adaptive care pathway adjustments."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Complex Medical History Analysis",
          process: "AI processes extensive medical history with multiple comorbidities, previous treatments, and complex medication regimens."
        },
        {
          substep: "Multi-system Risk Assessment",
          process: "System analyzes interactions between oncology treatment and existing conditions to optimize care approach."
        }
      ],
      2: [
        {
          substep: "Comprehensive Multi-specialty Assessment",
          process: "AI coordinates evaluation across multiple specialties, ensuring all comorbidities are considered in treatment planning."
        },
        {
          substep: "Complex Case Risk Stratification",
          process: "System performs advanced risk modeling considering multiple variables and treatment interactions."
        }
      ],
      3: [
        {
          substep: "Multi-modal Treatment Optimization",
          process: "AI designs complex treatment strategy balancing oncology needs with comorbidity management."
        },
        {
          substep: "Advanced Care Coordination Planning",
          process: "System creates comprehensive care plan involving multiple specialists and complex scheduling requirements."
        }
      ],
      4: [
        {
          substep: "Complex Care Team Management",
          process: "AI orchestrates large care team with multiple specialties, ensuring seamless communication and coordination."
        },
        {
          substep: "Advanced Monitoring Protocol",
          process: "System establishes comprehensive monitoring for complex patients with multiple treatment modalities."
        }
      ]
    }
  },
  contact: {
    sarah: {
      1: [
        {
          substep: "Intelligent Call Routing",
          process: "AI analyzes caller intent and routes to appropriate department: appointment scheduling, clinical questions, or urgent care."
        },
        {
          substep: "Personalized Response",
          process: "System provides tailored information based on patient history, current treatments, and specific inquiry type."
        }
      ],
      2: [
        {
          substep: "Multi-factor Authentication",
          process: "AI performs voice biometric authentication while maintaining conversational flow and patient comfort."
        },
        {
          substep: "Security Verification",
          process: "System validates patient identity through intelligent questioning and behavioral pattern recognition."
        }
      ],
      3: [
        {
          substep: "Unified Information Retrieval",
          process: "AI instantly aggregates patient information from multiple systems, presenting relevant data contextually."
        },
        {
          substep: "Intelligent Data Prioritization",
          process: "System highlights most relevant information based on call context and patient inquiry type."
        }
      ],
      4: [
        {
          substep: "AI-Assisted Resolution",
          process: "AI provides intelligent solution recommendations and guides agent through optimal resolution pathways."
        },
        {
          substep: "Outcome Optimization",
          process: "System predicts resolution success and suggests alternative approaches for complex issues."
        }
      ]
    },
    michael: {
      1: [
        {
          substep: "Emergency Triage Protocol",
          process: "AI immediately identifies urgent clinical situations and escalates to appropriate clinical staff with priority routing."
        },
        {
          substep: "Clinical Decision Support",
          process: "System provides real-time clinical protocols and decision trees to support immediate patient care needs."
        }
      ],
      2: [
        {
          substep: "Rapid Identity Verification",
          process: "AI expedites authentication for urgent cases while maintaining security protocols and compliance requirements."
        },
        {
          substep: "Emergency Context Access",
          process: "System provides immediate access to critical patient information for urgent clinical decision making."
        }
      ],
      3: [
        {
          substep: "Critical Information Assembly",
          process: "AI rapidly consolidates vital patient data, treatment history, and current medication for emergency response."
        },
        {
          substep: "Real-time Clinical Context",
          process: "System provides immediate clinical context and treatment recommendations for urgent patient care."
        }
      ],
      4: [
        {
          substep: "Emergency Resolution Protocol",
          process: "AI guides urgent issue resolution with clinical protocols and immediate escalation to appropriate medical staff."
        },
        {
          substep: "Continuous Monitoring Setup",
          process: "System establishes follow-up protocols and monitoring for urgent patient situations."
        }
      ]
    }
  }
};

// Scenario impact analysis data
export const scenarioImpactAnalysis = {
  referral: {
    sarah: {
      scenarioType: "Urgent Referral",
      overallTimeReduction: "75%",
      errorReduction: "90%",
      patientSatisfaction: "9.2/10",
      stepImpacts: {
        1: { timeReduction: "85%", accuracy: "95%", patientAnxiety: "Reduced by 60%" },
        2: { responseRate: "95%", firstContactSuccess: "85%", patientEngagement: "High" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "4 hours", totalErrorReduction: "85%", patientExperience: "7.2/10" },
        { step: 2, totalTimeSaved: "6 hours", totalErrorReduction: "87%", patientExperience: "7.8/10" }
      ]
    },
    michael: {
      scenarioType: "Complex Multi-Specialty Referral",
      overallTimeReduction: "65%",
      errorReduction: "85%",
      patientSatisfaction: "8.8/10",
      stepImpacts: {
        1: { timeReduction: "70%", accuracy: "92%", complexityHandling: "Excellent" },
        2: { coordinationEfficiency: "88%", teamAlignment: "95%", communicationGaps: "Reduced 75%" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "3 hours", totalErrorReduction: "70%", careQuality: "7.8/10" },
        { step: 2, totalTimeSaved: "5 hours", totalErrorReduction: "74%", careQuality: "8.0/10" }
      ]
    }
  },
  oncology: {
    sarah: {
      scenarioType: "Routine Oncology Screening",
      overallTimeReduction: "70%",
      errorReduction: "88%",
      patientSatisfaction: "8.9/10",
      stepImpacts: {
        1: { timeReduction: "80%", accuracy: "96%", familyHistoryCapture: "Complete" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "2 hours", totalErrorReduction: "80%", careQuality: "8.0/10" }
      ]
    },
    michael: {
      scenarioType: "Complex Multi-Comorbidity Case",
      overallTimeReduction: "60%",
      errorReduction: "82%",
      patientSatisfaction: "8.6/10",
      stepImpacts: {
        1: { timeReduction: "65%", accuracy: "90%", complexityAssessment: "Comprehensive" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "1.5 hours", totalErrorReduction: "65%", careQuality: "7.5/10" }
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
        1: { holdTimeReduction: "70%", routingAccuracy: "95%", channelOptimization: "85%" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "3 minutes", totalErrorReduction: "70%", patientExperience: "7.5/10" }
      ]
    },
    michael: {
      scenarioType: "Urgent Clinical Support",
      overallTimeReduction: "82%",
      errorReduction: "95%",
      patientSatisfaction: "9.4/10",
      stepImpacts: {
        1: { urgentTriageSpeed: "95%", clinicalRouting: "98%", priorityAccuracy: "96%" }
      },
      cumulativeBenefits: [
        { step: 1, totalTimeSaved: "5 minutes", totalErrorReduction: "95%", clinicalOutcome: "9.0/10" }
      ]
    }
  }
};