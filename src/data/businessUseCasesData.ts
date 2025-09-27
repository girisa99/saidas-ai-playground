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
      approach: "hybrid",
      description: "Immediate digital referral processing with AI-powered triage and routing",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
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
      whyAutomation: "High-volume referral processing benefits from consistent digital workflows and automated validation",
      whyAI: "Complex triage decisions require intelligent assessment of clinical urgency and appropriate specialist routing",
      phases: [
        "Implement digital referral processing automation",
        "Deploy AI for intelligent triage and routing", 
        "Integrate predictive resource planning"
      ],
      currentIssues: [
        "Manual fax processing causing delays",
        "Inconsistent referral completeness checking",
        "Limited triage capabilities during high volumes"
      ],
      improvement: "Streamlined digital intake with intelligent routing reduces processing time from 24-48 hours to 2-4 hours"
    },
    {
      id: 2,
      title: "Patient Contact",
      icon: Phone,
      time: "Day 1-3",
      emotion: "neutral",
      emotionIcon: Info,
      approach: "hybrid",
      description: "Automated outreach with personalized AI-driven communication",
      automationPrimary: true,
      roi: "≈ 60% efficiency gain",
      implementationStatus: "testing",
      statusNote: "Pilot program with select patient cohorts",
      automationTasks: [
        "Automated appointment scheduling calls",
        "SMS reminder notifications",
        "Email confirmation workflows",
        "Basic insurance verification",
        "Standard pre-appointment instructions"
      ],
      aiTasks: [
        "Personalized communication tone and timing",
        "Intelligent response to patient questions",
        "Dynamic scheduling optimization",
        "Predictive no-show prevention",
        "Multilingual support and cultural adaptation"
      ],
      whyAutomation: "Consistent patient outreach requires systematic follow-up and standardized communication",
      whyAI: "Each patient has unique needs, preferences, and communication styles requiring personalized approaches",
      phases: [
        "Deploy automated scheduling and reminders",
        "Implement AI for personalized communication",
        "Add predictive analytics for optimization"
      ],
      currentIssues: [
        "Manual calling consuming significant staff time",
        "Inconsistent patient communication",
        "High no-show rates due to poor engagement"
      ],
      improvement: "AI-driven personalized outreach increases appointment attendance from 75% to 90%"
    },
    {
      id: 3,
      title: "Insurance Verification",
      icon: Shield,
      time: "Day 2-5",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Real-time insurance verification with AI-powered benefit analysis",
      automationPrimary: true,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "live",
      statusNote: "Integrated with major insurance providers",
      automationTasks: [
        "Automated eligibility verification",
        "Benefit coverage determination",
        "Prior authorization status checking",
        "Copay and deductible calculation",
        "Financial assistance screening"
      ],
      aiTasks: [
        "Intelligent benefit interpretation",
        "Predictive approval likelihood assessment",
        "Personalized financial counseling recommendations",
        "Alternative coverage option identification",
        "Pre-authorization optimization strategies"
      ],
      whyAutomation: "Insurance verification requires systematic checking of multiple data points and policies",
      whyAI: "Complex benefit structures require intelligent interpretation and personalized financial guidance",
      phases: [
        "Automate basic eligibility verification",
        "Deploy AI for benefit interpretation",
        "Implement predictive approval analysis"
      ],
      currentIssues: [
        "Manual verification causing 25% approval delays",
        "Inconsistent benefit interpretation",
        "Limited financial assistance identification"
      ],
      improvement: "AI-enhanced verification eliminates approval delays and identifies 60% more financial assistance opportunities"
    },
    {
      id: 4,
      title: "Specialist Assignment",
      icon: Users,
      time: "Day 3-7",
      emotion: "positive",
      emotionIcon: Target,
      approach: "agentic",
      description: "AI-powered specialist matching with predictive care coordination",
      automationPrimary: false,
      roi: "≈ 75% efficiency gain",
      implementationStatus: "testing",
      statusNote: "AI matching algorithms under evaluation",
      automationTasks: [
        "Provider availability checking",
        "Appointment slot management",
        "Basic care team assembly",
        "Standard referral documentation",
        "Communication workflow triggers"
      ],
      aiTasks: [
        "Intelligent specialist matching based on case complexity",
        "Predictive care pathway optimization",
        "Multi-specialty coordination planning",
        "Outcome-based provider recommendations",
        "Dynamic care team formation"
      ],
      whyAutomation: "Systematic specialist assignment ensures consistent care team formation",
      whyAI: "Optimal specialist matching requires analysis of case complexity, provider expertise, and historical outcomes",
      phases: [
        "Automate provider availability and scheduling",
        "Deploy AI for intelligent matching",
        "Implement predictive coordination planning"
      ],
      currentIssues: [
        "Suboptimal specialist assignment in 30% of cases",
        "Limited care coordination planning",
        "Inconsistent provider matching criteria"
      ],
      improvement: "AI-powered matching improves care coordination accuracy by 85% and reduces time-to-specialist by 50%"
    },
    {
      id: 5,
      title: "Pre-appointment Preparation",
      icon: ClipboardCheck,
      time: "Day 5-14",
      emotion: "positive",
      emotionIcon: Lightbulb,
      approach: "hybrid",
      description: "Personalized patient preparation with AI-guided education",
      automationPrimary: true,
      roi: "≈ 65% efficiency gain",
      implementationStatus: "development",
      statusNote: "Personalization engine in development",
      automationTasks: [
        "Standard pre-appointment instructions",
        "Medication list compilation",
        "Lab work scheduling",
        "Transportation assistance coordination",
        "Reminder notification workflows"
      ],
      aiTasks: [
        "Personalized education content generation",
        "Anxiety and concern prediction",
        "Culturally appropriate communication",
        "Learning style adaptation",
        "Optimal preparation timeline optimization"
      ],
      whyAutomation: "Comprehensive preparation requires systematic coordination of multiple preparation tasks",
      whyAI: "Effective patient education requires personalization based on individual needs, concerns, and learning preferences",
      phases: [
        "Automate standard preparation workflows",
        "Deploy AI for personalized education",
        "Implement adaptive preparation optimization"
      ],
      currentIssues: [
        "35% of patients arrive unprepared",
        "Generic preparation instructions",
        "High patient anxiety due to uncertainty"
      ],
      improvement: "AI-guided preparation achieves 95% patient readiness and reduces appointment anxiety by 70%"
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
      title: "Initial Contact",
      icon: Phone,
      time: "Immediate",
      emotion: "critical",
      emotionIcon: AlertTriangle,
      approach: "hybrid",
      description: "Intelligent call routing and triage with immediate response capability",
      automationPrimary: false,
      roi: "≈ 85% efficiency gain",
      implementationStatus: "live",
      statusNote: "24/7 intelligent routing operational",
      automationTasks: [
        "Automated call routing and queuing",
        "Basic caller authentication",
        "Standard information capture",
        "Appointment scheduling automation",
        "Follow-up workflow triggers"
      ],
      aiTasks: [
        "Intelligent intent recognition and categorization",
        "Dynamic priority assessment",
        "Real-time sentiment analysis",
        "Personalized response generation",
        "Proactive escalation management"
      ],
      whyAutomation: "Consistent call handling ensures all patients receive standardized service and proper routing",
      whyAI: "Each patient call has unique context, urgency, and emotional needs requiring intelligent assessment",
      phases: [
        "Deploy automated routing and basic triage",
        "Implement AI for intelligent assessment and response",
        "Add predictive analytics for proactive support"
      ],
      currentIssues: [
        "Long hold times during peak hours",
        "Inconsistent triage and routing",
        "Limited after-hours support capability"
      ],
      improvement: "AI-powered contact management reduces average response time from 8 minutes to 45 seconds"
    },
    {
      id: 2,
      title: "Patient Authentication",
      icon: Shield,
      time: "0-2 minutes",
      emotion: "neutral",
      emotionIcon: Info,
      approach: "hybrid",
      description: "Multi-factor authentication with AI-powered identity verification",
      automationPrimary: true,
      roi: "≈ 75% efficiency gain",
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
        "Dynamic security question selection"
      ],
      whyAutomation: "Consistent security protocols ensure HIPAA compliance and data protection",
      whyAI: "Advanced authentication requires intelligent analysis of voice patterns and behavioral indicators",
      phases: [
        "Implement automated verification workflows",
        "Deploy voice biometric authentication",
        "Add behavioral analysis and fraud detection"
      ],
      currentIssues: [
        "Manual verification taking 2-3 minutes",
        "15% authentication failure rates",
        "Security vulnerabilities with manual processes"
      ],
      improvement: "AI-powered authentication reduces verification time to under 30 seconds with 99% accuracy"
    },
    {
      id: 3,
      title: "Information Gathering",
      icon: Database,
      time: "2-5 minutes",
      emotion: "neutral",
      emotionIcon: Clock,
      approach: "hybrid",
      description: "Unified patient view with AI-enhanced data synthesis",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      implementationStatus: "development",
      statusNote: "Unified patient dashboard in progress",
      automationTasks: [
        "Automated record retrieval across systems",
        "Standard information consolidation",
        "Recent activity timeline generation",
        "Insurance and billing status updates",
        "Appointment history compilation"
      ],
      aiTasks: [
        "Intelligent data synthesis and prioritization",
        "Contextual information highlighting",
        "Predictive information needs assessment",
        "Smart summary generation",
        "Personalized interaction recommendations"
      ],
      whyAutomation: "Comprehensive information gathering requires systematic data aggregation",
      whyAI: "Complex patient histories need intelligent analysis to surface relevant information quickly",
      phases: [
        "Automate multi-system data retrieval",
        "Deploy AI for intelligent data synthesis",
        "Implement predictive information surfacing"
      ],
      currentIssues: [
        "Agents navigating 3-5 different systems",
        "5-8 minute delays for information gathering",
        "Inconsistent information prioritization"
      ],
      improvement: "Unified AI-powered view reduces information gathering time by 80% with complete context"
    },
    {
      id: 4,
      title: "Issue Resolution",
      icon: Wrench,
      time: "5-15 minutes",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      description: "AI-assisted problem solving with intelligent escalation management",
      automationPrimary: false,
      roi: "≈ 70% efficiency gain",
      implementationStatus: "planned",
      statusNote: "Advanced AI resolution engine planned",
      automationTasks: [
        "Standard resolution workflow automation",
        "Documentation and case creation",
        "Follow-up task scheduling",
        "Customer satisfaction survey deployment",
        "Resolution confirmation workflows"
      ],
      aiTasks: [
        "Intelligent solution recommendation",
        "Dynamic escalation decision making",
        "Personalized communication strategy",
        "Outcome prediction and optimization",
        "Real-time coaching for agents"
      ],
      whyAutomation: "Consistent resolution processes ensure quality and compliance",
      whyAI: "Complex patient issues require intelligent analysis and personalized solution strategies",
      phases: [
        "Automate standard resolution workflows",
        "Deploy AI for solution recommendation",
        "Implement intelligent escalation management"
      ],
      currentIssues: [
        "Inconsistent resolution approaches",
        "High escalation rates for complex issues",
        "Limited real-time guidance for agents"
      ],
      improvement: "AI-assisted resolution increases first-call resolution by 85% and improves satisfaction scores by 40%"
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