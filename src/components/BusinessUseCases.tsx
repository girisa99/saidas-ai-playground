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

// Journey steps data
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
    description: "Initial referral received and triaged for urgency and completeness",
    automationPrimary: true,
    roi: "60% efficiency gain",
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
      { id: 1, title: "Referral Document Receipt", description: "Physical or electronic referral document arrives from referring physician", technology: "Document management system with OCR capabilities" },
      { id: 2, title: "Initial Data Extraction", description: "Extract patient demographics, insurance info, and clinical summary", technology: "AI-powered document parsing and data extraction" },
      { id: 3, title: "Insurance Verification", description: "Verify patient insurance eligibility and coverage", technology: "Automated insurance API integration" },
      { id: 4, title: "Medical Urgency Assessment", description: "Analyze clinical indicators to determine urgency level", technology: "AI triage algorithms with clinical decision support" },
      { id: 5, title: "Specialist Assignment", description: "Route to appropriate oncology specialist based on cancer type", technology: "Intelligent routing based on specialty matching" },
      { id: 6, title: "Initial Appointment Scheduling", description: "Schedule initial consultation within appropriate timeframe", technology: "Automated scheduling with urgency-based prioritization" }
    ]
  },
  {
    id: 2,
    title: "Data Collection",
    icon: ClipboardCheck,
    time: "Day 1",
    position: { x: 30, y: 15 },
    emotion: "neutral",
    emotionIcon: Meh,
    approach: "automation",
    description: "Systematic collection of patient information and medical history",
    automationPrimary: true,
    roi: "75% time reduction",
    automationTasks: [
      "Digital form pre-population from referral data",
      "Automated reminder sequences for incomplete forms",
      "Integration with patient portals for seamless submission",
      "Real-time validation and error checking"
    ],
    aiTasks: [
      "Intelligent form customization based on condition type",
      "Natural language processing of patient narratives",
      "Risk factor identification from unstructured data",
      "Personalized follow-up scheduling recommendations"
    ],
    whyAutomation: "Standardized data collection processes benefit from consistent, error-free automation",
    whyAI: "Dynamic form adaptation and complex data interpretation require intelligent decision-making",
    phases: [
      "Deploy automated form systems with basic validation",
      "Implement AI for dynamic form customization",
      "Integrate advanced NLP for narrative analysis"
    ],
    currentIssues: [
      "Paper-based forms causing approx. 2-day processing delays",
      "Approx. 30% incomplete submissions requiring multiple follow-ups",
      "Staff spending roughly 40% of time on data entry tasks"
    ],
    improvement: "Digital automation reduces processing time from 2 days to approx. 2 hours, with AI ensuring ~95% form completion rates through intelligent prompting.",
    detailedSubsteps: [
      { id: 1, title: "Digital Form Generation", description: "Create customized intake forms based on referral information", technology: "Dynamic form builder with conditional logic" },
      { id: 2, title: "Patient Portal Access", description: "Send secure portal credentials and form links to patient", technology: "Patient engagement platform with SMS/email notifications" },
      { id: 3, title: "Guided Form Completion", description: "Patient completes forms with real-time validation and help", technology: "Interactive forms with AI-powered assistance" },
      { id: 4, title: "Medical History Integration", description: "Auto-populate known medical history from previous records", technology: "EHR integration with data mapping algorithms" },
      { id: 5, title: "Quality Review", description: "Automated review for completeness and accuracy", technology: "AI-powered form validation and error detection" },
      { id: 6, title: "Follow-up Management", description: "Automated reminders for incomplete or missing information", technology: "Workflow automation with personalized messaging" }
    ]
  },
  {
    id: 3,
    title: "Records Acquisition",
    icon: Stethoscope,
    time: "Day 2-5",
    position: { x: 50, y: 15 },
    emotion: "negative",
    emotionIcon: ThumbsDown,
    approach: "hybrid",
    description: "Obtaining comprehensive medical records from multiple sources",
    automationPrimary: false,
    roi: "50% faster acquisition",
    automationTasks: [
      "Automated record requests to common healthcare systems",
      "Digital fax and secure messaging coordination",
      "Document status tracking and follow-up reminders",
      "OCR processing for scanned documents"
    ],
    aiTasks: [
      "Intelligent prioritization of critical records",
      "Complex healthcare network navigation",
      "Medical record summarization and key finding extraction",
      "Quality assessment of received documentation"
    ],
    whyAutomation: "Routine communication and document processing tasks that follow standard protocols",
    whyAI: "Complex decision-making about record prioritization and quality assessment requires contextual understanding",
    phases: [
      "Automate basic record request workflows",
      "Deploy AI for record prioritization and quality assessment",
      "Implement advanced summarization capabilities"
    ],
    currentIssues: [
      "Manual follow-ups causing approx. 5-7 day delays",
      "Roughly 25% of records received are incomplete or poor quality",
      "Staff unable to identify critical information quickly"
    ],
    improvement: "Automated requests with AI prioritization reduce acquisition time by approx. 50% while ensuring ~90% completeness through intelligent quality checks.",
    detailedSubsteps: [
      { id: 1, title: "Records Request Generation", description: "Automatically generate comprehensive records requests to all relevant providers", technology: "Template-based request generation with provider directory integration" },
      { id: 2, title: "Multi-Channel Communication", description: "Send requests via fax, secure email, and patient portal simultaneously", technology: "Multi-modal communication platform with delivery tracking" },
      { id: 3, title: "Follow-up Scheduling", description: "Automated follow-up sequences based on urgency and response patterns", technology: "Workflow automation with escalation protocols" },
      { id: 4, title: "Document Receipt Processing", description: "Process incoming records and validate completeness", technology: "AI-powered document classification and completeness checking" },
      { id: 5, title: "Quality Assessment", description: "Evaluate record quality and identify missing critical information", technology: "AI quality scoring with clinical relevance algorithms" },
      { id: 6, title: "Clinical Summarization", description: "Generate concise clinical summaries highlighting key findings", technology: "Natural language processing for medical document summarization" }
    ]
  },
  {
    id: 4,
    title: "Insurance Authorization",
    icon: Shield,
    time: "Day 3-7",
    position: { x: 70, y: 15 },
    emotion: "critical",
    emotionIcon: AlertTriangle,
    approach: "hybrid",
    description: "Securing insurance approvals and managing prior authorizations",
    automationPrimary: true,
    roi: "≈ 40% approval rate increase",
    automationTasks: [
      "Automated prior authorization form completion",
      "Real-time insurance eligibility verification",
      "Standardized appeal letter generation",
      "Status tracking and deadline monitoring"
    ],
    aiTasks: [
      "Complex case documentation and justification",
      "Appeal strategy optimization based on historical data",
      "Personalized communication with insurance representatives",
      "Predictive approval likelihood assessment"
    ],
    whyAutomation: "Form submission and status tracking follow standard insurance protocols, but automation must trigger feedback loops to Data Collection when missing information is detected",
    whyAI: "Complex case justification and appeal strategies require understanding of medical necessity, plus intelligent coordination with Clinical Review for additional documentation when needed",
    phases: [
      "Implement automated form submission systems",
      "Deploy AI for case documentation and appeal strategies",
      "Integrate predictive analytics for approval optimization"
    ],
    currentIssues: [
      "Approx. 40% initial denial rate due to incomplete documentation",
      "Appeal process taking approx. 2–3 weeks with manual intervention",
      "Staff unable to predict approval likelihood accurately"
    ],
    improvement: "AI-optimized documentation increases initial approval rates to approx. 75%, while automated appeals reduce processing time to ~5–7 days.",
    detailedSubsteps: [
      { id: 1, title: "PA Requirement Detection", description: "Identify prior authorization and coverage rules for ordered services", technology: "Payer rules engine + eligibility APIs" },
      { id: 2, title: "Form Auto-Completion", description: "Populate payer-specific PA forms with available clinical and demographic data", technology: "Form automation with EHR data mapping" },
      { id: 3, title: "Clinical Justification Draft", description: "Assemble medical necessity language and attach supporting documents", technology: "AI justification generator + document assembler" },
      { id: 4, title: "Submission & Tracking", description: "Submit PA and track status across payer portals/channels", technology: "Workflow automation with status webhooks" },
      { id: 5, title: "Exception Handling", description: "Detect missing data and trigger feedback loop to Data Collection", technology: "Rules + AI-driven checklist validation" },
      { id: 6, title: "Appeals Preparation", description: "Generate appeal packages when denials occur, re-submit with enhancements", technology: "AI appeal strategy + template library" }
    ]
  },
  {
    id: 5,
    title: "Clinical Review",
    icon: Target,
    time: "Day 7-10",
    position: { x: 90, y: 15 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "agentic",
    description: "Comprehensive clinical assessment and treatment planning",
    automationPrimary: false,
    roi: "30% improved outcomes",
    automationTasks: [
      "Clinical data aggregation and standardization",
      "Guideline compliance checking",
      "Risk score calculations",
      "Report template generation"
    ],
    aiTasks: [
      "Complex case analysis and differential diagnosis support",
      "Personalized treatment plan recommendations",
      "Multi-disciplinary care coordination",
      "Evidence-based therapy selection optimization"
    ],
    whyAutomation: "Data aggregation and standard compliance checks that follow established clinical protocols",
    whyAI: "Complex clinical reasoning and personalized treatment planning that require deep medical knowledge",
    phases: [
      "Automate data aggregation and basic compliance checking",
      "Deploy AI for clinical decision support",
      "Implement advanced treatment optimization algorithms"
    ],
    currentIssues: [
      "Manual chart review taking 3-4 hours per case",
      "Inconsistent treatment recommendations across providers",
      "Limited consideration of patient-specific factors"
    ],
    improvement: "AI-assisted clinical review reduces time to 1 hour while improving treatment personalization and consistency across care teams."
  },
  {
    id: 6,
    title: "Genomic Testing",
    icon: Dna,
    time: "Day 10-15",
    position: { x: 10, y: 55 },
    emotion: "neutral",
    emotionIcon: Meh,
    approach: "hybrid",
    description: "Coordinating genetic testing and biomarker analysis",
    automationPrimary: true,
    roi: "25% cost reduction",
    automationTasks: [
      "Test ordering and sample tracking",
      "Results processing and quality control",
      "Insurance coverage verification",
      "Laboratory communication coordination"
    ],
    aiTasks: [
      "Intelligent test selection based on clinical presentation",
      "Complex genomic data interpretation",
      "Treatment matching based on biomarker profiles",
      "Family history analysis for hereditary risk assessment"
    ],
    whyAutomation: "Laboratory coordination and sample tracking processes that follow standardized protocols",
    whyAI: "Complex genomic interpretation and treatment matching that require specialized knowledge",
    phases: [
      "Automate test ordering and tracking systems",
      "Deploy AI for genomic data interpretation",
      "Implement advanced treatment matching algorithms"
    ],
    currentIssues: [
      "Manual test selection leading to 20% inappropriate orders",
      "Result interpretation taking 2-3 days",
      "Limited integration between genomic and clinical data"
    ],
    improvement: "AI-guided test selection reduces inappropriate orders by 80%, while automated interpretation provides results in 4-6 hours."
  },
  {
    id: 7,
    title: "Appointment Scheduling",
    icon: Calendar,
    time: "Day 12-18",
    position: { x: 30, y: 55 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "hybrid",
    description: "Coordinating multi-disciplinary appointments and care timeline",
    automationPrimary: true,
    roi: "60% scheduling efficiency",
    automationTasks: [
      "Availability checking across multiple providers",
      "Automated appointment confirmation and reminders",
      "Resource allocation and room scheduling",
      "Transportation and logistics coordination"
    ],
    aiTasks: [
      "Intelligent scheduling optimization for care continuity",
      "Personalized appointment timing based on patient preferences",
      "Complex multi-provider coordination",
      "Predictive scheduling for follow-up care needs"
    ],
    whyAutomation: "Calendar management and confirmation processes that can be standardized and scaled",
    whyAI: "Complex optimization problems and personalized scheduling that require intelligent coordination",
    phases: [
      "Implement automated scheduling and confirmation systems",
      "Deploy AI for optimization and personalization",
      "Integrate predictive scheduling for care coordination"
    ],
    currentIssues: [
      "Manual scheduling causing 2-week delays",
      "30% no-show rate due to poor timing",
      "Inefficient provider utilization and resource allocation"
    ],
    improvement: "AI-optimized scheduling reduces delays to 3-5 days while improving show rates to 85% through personalized timing."
  },
  {
    id: 8,
    title: "Pre-Visit Preparation",
    icon: CheckCircle,
    time: "Day 15-20",
    position: { x: 50, y: 55 },
    emotion: "positive",
    emotionIcon: Star,
    approach: "agentic",
    description: "Comprehensive preparation for patient consultation",
    automationPrimary: false,
    roi: "45% visit productivity",
    automationTasks: [
      "Document preparation and chart organization",
      "Patient education material compilation",
      "Consent form preparation and e-signature",
      "Pre-visit questionnaire processing"
    ],
    aiTasks: [
      "Personalized education content curation",
      "Complex case summarization for providers",
      "Intelligent question generation for consultation",
      "Risk assessment and discussion point prioritization"
    ],
    whyAutomation: "Document preparation and standard questionnaire processing that follow established workflows",
    whyAI: "Personalized content curation and complex case analysis that require contextual understanding",
    phases: [
      "Automate document preparation and questionnaire processing",
      "Deploy AI for personalized content and case summarization",
      "Implement intelligent consultation planning tools"
    ],
    currentIssues: [
      "Manual preparation taking 2-3 hours per patient",
      "Generic education materials with poor engagement",
      "Providers unprepared for complex case discussions"
    ],
    improvement: "AI-driven preparation reduces time to 30 minutes while increasing patient engagement by 70% through personalized materials."
  },
  {
    id: 9,
    title: "Care Coordination",
    icon: Users,
    time: "Day 18-25",
    position: { x: 70, y: 55 },
    emotion: "positive",
    emotionIcon: ThumbsUp,
    approach: "agentic",
    description: "Orchestrating ongoing care across multiple specialties",
    automationPrimary: false,
    roi: "≈ 35% coordination efficiency",
    automationTasks: [
      "Communication routing and tracking",
      "Task assignment and deadline monitoring",
      "Status reporting and dashboard updates",
      "Basic care plan distribution"
    ],
    aiTasks: [
      "Intelligent care team assembly based on Clinical Review insights",
      "Dynamic care plan optimization using Genomic Testing results",
      "Complex communication prioritization across multiple care touchpoints",
      "Proactive issue identification by monitoring all connected workflow steps",
      "Synthesis of information from Appointment Scheduling and Pre-Visit Preparation for seamless care transitions"
    ],
    whyAutomation: "Communication routing and task tracking across multiple departments can be systematized, but must integrate data from Clinical Review, Genomic Testing, and Scheduling steps",
    whyAI: "Strategic care orchestration requires intelligent synthesis of information from multiple workflow connections (Clinical Review insights, Genomic results, scheduling data) to make complex coordination decisions",
    phases: [
      "Automate communication routing and task tracking",
      "Deploy AI for care team optimization",
      "Implement proactive care management capabilities"
    ],
    currentIssues: [
      "Poor communication causing approx. 25% care delays",
      "Fragmented care plans with limited coordination",
      "Reactive approach to patient issues and complications"
    ],
    improvement: "AI-orchestrated care coordination reduces delays by approx. 60% while enabling proactive issue resolution through predictive analytics.",
    detailedSubsteps: [
      { id: 1, title: "Team Assembly", description: "Identify and invite the right participants across specialties", technology: "Role graph + availability" },
      { id: 2, title: "Task Routing", description: "Create and route tasks with SLAs and owners", technology: "Workflow + queueing" },
      { id: 3, title: "Handoffs", description: "Structure handoffs between steps with checklists", technology: "Standardized handoff templates" },
      { id: 4, title: "Follow-ups", description: "Schedule follow-ups and ensure closure", technology: "Automated tracking + reminders" },
      { id: 5, title: "Issue Triage", description: "Detect and escalate risks proactively", technology: "Signal monitoring + AI triage" },
      { id: 6, title: "Outcome Tracking", description: "Track outcomes and feed learnings back into process", technology: "Analytics + feedback loops" }
    ]
  },
];

// Visual scenarios data
const visualScenarios = [
  {
    id: 1,
    avatar: "👩‍⚕️",
    title: "Sarah Chen - Routine Breast Cancer",
    patientType: "Early-stage breast cancer, otherwise healthy",
    complexity: "low",
    timeline: "18 days",
    technologyMix: { automation: 75, ai: 25 },
    journeyPath: [1, 2, 4, 5, 7, 8],
    keyDecisions: [
      { step: 1, decision: "Automation-Primary", reason: "Standard referral processing", detailedExplanation: "Sarah's referral contains standard breast cancer screening results. Automation handles intake form parsing, insurance verification, and basic triage. No complex comorbidities require AI intervention at this stage." },
      { step: 2, decision: "Automation-Standard", reason: "Routine data collection", detailedExplanation: "Digital forms auto-populate with referral data. Standard breast cancer questionnaire deployed. Patient completes forms easily online. No adaptive questioning needed due to straightforward presentation." },
      { step: 4, decision: "Automation-Insurance", reason: "Standard authorization process", detailedExplanation: "Breast cancer treatment protocols are well-established with insurance. Automated prior authorization submission using standard templates. High approval likelihood (85%) based on clear guidelines." },
      { step: 5, decision: "AI-Standard", reason: "Treatment planning benefits from personalization", detailedExplanation: "While straightforward, AI personalizes treatment sequence based on patient age, lifestyle, and preferences. Recommends optimal surgery timing and adjuvant therapy options tailored to Sarah's specific tumor characteristics." },
      { step: 7, decision: "Automation-Simple", reason: "Straightforward scheduling", detailedExplanation: "Oncology and surgery appointments scheduled automatically. Clear availability patterns. Patient preferences (mornings) easily accommodated. No complex multi-specialist coordination required." },
      { step: 8, decision: "AI-Education", reason: "Personalized patient education", detailedExplanation: "AI curates education materials based on Sarah's professional background (teacher), learning preferences, and specific treatment plan. Generates personalized pre-visit checklist and family communication guide." }
    ],
    outcome: "Completed journey in 18 days with high patient satisfaction and efficient resource utilization."
  },
  {
    id: 2,
    avatar: "👨‍💼",
    title: "Michael Rodriguez - Complex Pancreatic",
    patientType: "Advanced pancreatic cancer with comorbidities",
    complexity: "high",
    timeline: "25 days",
    technologyMix: { automation: 40, ai: 60 },
    journeyPath: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    keyDecisions: [
      { step: 1, decision: "AI-Complex", reason: "Multi-comorbidity assessment", detailedExplanation: "Michael's case involves pancreatic cancer with diabetes and cardiac issues. AI analyzes complex interaction patterns, identifies critical care sequencing needs, and flags urgent coordination requirements between oncology, endocrinology, and cardiology." },
      { step: 2, decision: "AI-Adaptive", reason: "Complex medical history", detailedExplanation: "AI dynamically adjusts intake forms based on multiple conditions. Generates specialized questionnaires for drug interactions, treatment tolerance concerns, and quality of life priorities. Identifies potential contraindications early." },
      { step: 3, decision: "AI-Priority", reason: "Critical record prioritization", detailedExplanation: "AI prioritizes cardiac function tests, diabetes management records, and previous cancer treatments. Identifies gaps in multi-specialty records and triggers urgent requests to cardiology for recent stress test results." },
      { step: 4, decision: "AI-Appeal", reason: "Complex case justification needed", detailedExplanation: "Insurance initially denies advanced immunotherapy due to comorbidities. AI generates comprehensive case justification highlighting treatment benefits vs. risks, creates compelling medical necessity documentation." },
      { step: 5, decision: "AI-Multi", reason: "Multi-disciplinary planning", detailedExplanation: "AI facilitates virtual tumor board coordination between oncology, cardiology, and endocrinology. Analyzes treatment interaction impacts, optimal sequencing of interventions, and creates integrated care timeline." },
      { step: 6, decision: "AI-Genomic", reason: "Advanced biomarker analysis", detailedExplanation: "AI analyzes complex genomic profile in context of comorbidities. Identifies targeted therapy options that avoid cardiac toxicity. Provides drug interaction analysis with diabetes medications." },
      { step: 7, decision: "AI-Coordinate", reason: "Multi-specialist scheduling", detailedExplanation: "AI coordinates appointments across three departments, optimizing for treatment sequencing, Michael's work schedule, and clinical requirements. Ensures cardiac clearance before each treatment cycle." },
      { step: 8, decision: "AI-Complex", reason: "Extensive preparation needed", detailedExplanation: "AI generates comprehensive pre-visit materials covering cancer treatment, diabetes management during therapy, cardiac monitoring requirements, and family caregiver instructions. Creates integrated medication schedule." },
      { step: 9, decision: "AI-Orchestrate", reason: "Complex care coordination", detailedExplanation: "AI continuously monitors treatment responses across all conditions, coordinates care adjustments between specialties, manages drug interactions, and proactively identifies emerging issues requiring multi-disciplinary intervention." }
    ],
    outcome: "Successfully navigated complex care pathway with optimized treatment plan and coordinated multi-specialty care."
  },
  {
    id: 3,
    avatar: "👶",
    title: "Emma Thompson - Pediatric Leukemia",
    patientType: "7-year-old with acute lymphoblastic leukemia",
    complexity: "high",
    timeline: "22 days",
    technologyMix: { automation: 30, ai: 70 },
    journeyPath: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    keyDecisions: [
      { step: 1, decision: "AI-Pediatric", reason: "Specialized pediatric protocols", detailedExplanation: "Emma's case requires pediatric oncology expertise and family-centered approach. AI identifies specialized pediatric protocols, coordinates with child life services, and ensures age-appropriate communication strategies." },
      { step: 2, decision: "AI-Family", reason: "Family-centered data collection", detailedExplanation: "AI adapts forms for pediatric context, generates parent/guardian questionnaires, creates child-friendly assessment tools, and coordinates family availability for comprehensive intake. Addresses school coordination needs." },
      { step: 3, decision: "AI-Pediatric", reason: "Specialized records needed", detailedExplanation: "AI prioritizes pediatric growth charts, vaccination records, school health information, and previous developmental assessments. Coordinates with pediatrician for growth trajectory analysis and treatment impact predictions." },
      { step: 4, decision: "AI-Heavy", reason: "Specialist record analysis", detailedExplanation: "AI navigates complex pediatric coverage requirements, coordinates with insurance for specialized children's hospital authorization, and ensures coverage for child life services, family accommodation, and educational support." },
      { step: 6, decision: "AI-Expert", reason: "Multi-disciplinary planning", detailedExplanation: "AI coordinates with pediatric oncology team, child life specialists, and nutritionists. Develops age-appropriate treatment plan considering Emma's developmental stage, school schedule, and family dynamics." },
      { step: 7, decision: "AI-Complex", reason: "Specialized pediatric testing", detailedExplanation: "AI coordinates gentle testing approaches, minimal blood draw protocols, and child life support during procedures. Analyzes genomic results in context of pediatric physiology and growth considerations." },
      { step: 8, decision: "AI-Coordinated", reason: "Multi-specialist scheduling", detailedExplanation: "AI optimizes scheduling around school hours, coordinates with hospital teachers, arranges family accommodation, and ensures treatments align with Emma's energy patterns and developmental needs." },
      { step: 9, decision: "AI-Family", reason: "Age-appropriate education and family support", detailedExplanation: "AI generates age-appropriate treatment explanations for Emma, comprehensive guides for parents, sibling support resources, and school communication templates. Creates visual treatment calendars and reward systems." }
    ],
    outcome: "Delivered family-centered care with age-appropriate communication and comprehensive support systems."
  }
];

const BusinessUseCases = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [showDecisionFramework, setShowDecisionFramework] = useState(true);

  // Connection definitions (fromStep -> toStep)
  const sequentialEdges: [number, number][] = [
    [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9]
  ];
  const feedbackEdges: [number, number][] = [
    [4,2], // Insurance Authorization requests more info from Data Collection
    [5,3]  // Clinical Review requests records from Records Acquisition
  ];
  const resultsEdges: [number, number][] = [
    [6,5]  // Genomic Testing results to Clinical Review
  ];
  const coordinationEdges: [number, number][] = [
    [5,9], // Clinical Review to Care Coordination
    [6,9], // Genomic Testing to Care Coordination
    [7,9], // Appointment Scheduling to Care Coordination
    [8,9]  // Pre-Visit Preparation to Care Coordination
  ];

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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low": return "bg-green-100 border-green-300 text-green-800";
      case "medium": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "high": return "bg-red-100 border-red-300 text-red-800";
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
              <Target className="h-6 w-6 text-blue-500" />
              Strategic Technology Decision Framework
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDecisionFramework(!showDecisionFramework)}
              className="flex items-center gap-2"
            >
              {showDecisionFramework ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
              {showDecisionFramework ? "Hide" : "Show"} Framework
            </Button>
          </div>
          <p className="text-muted-foreground">
            Core principles for choosing between automation and agentic AI approaches in healthcare workflows
          </p>
        </CardHeader>
        {showDecisionFramework && (
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Automation-First Scenarios",
                  icon: Cog,
                  color: "blue",
                  criteria: [
                    "High-volume, repetitive tasks",
                    "Standardized workflows with clear rules",
                    "Data entry and validation processes",
                    "Scheduled communications and reminders",
                    "Basic compliance and guideline checking"
                  ]
                },
                {
                  title: "AI-First Scenarios", 
                  icon: Brain,
                  color: "purple",
                  criteria: [
                    "Complex decision-making with multiple variables",
                    "Personalized patient interactions",
                    "Clinical reasoning and diagnostic support",
                    "Dynamic care plan optimization",
                    "Unstructured data analysis and interpretation"
                  ]
                },
                {
                  title: "Hybrid Approaches",
                  icon: Layers,
                  color: "indigo", 
                  criteria: [
                    "Workflows requiring both efficiency and intelligence",
                    "Processes with standard and exception paths",
                    "Quality assurance with automated checking + AI oversight",
                    "Patient engagement with automation + personalization",
                    "Care coordination with task automation + strategic AI"
                  ]
                }
              ].map((category) => (
                <Card key={category.title} className={`bg-${category.color}-50 border-${category.color}-200`}>
                  <CardContent className="p-4">
                    <h3 className={`font-semibold text-${category.color}-800 mb-3 flex items-center gap-2`}>
                      <category.icon className="h-5 w-5" />
                      {category.title}
                    </h3>
                    <ul className={`space-y-2 text-sm text-${category.color}-700`}>
                      {category.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className={`h-3 w-3 text-${category.color}-500 mt-1 flex-shrink-0`} />
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

      {/* Visual Journey Flow */}
      <div className="space-y-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Network className="h-6 w-6 text-blue-500" />
              Interactive Patient Journey Map
            </CardTitle>
            <p className="text-muted-foreground">Click on any step to see detailed technology analysis and scenarios</p>
            <p className="text-xs text-muted-foreground mt-1">All times, percentages, and improvements shown are approximate estimations for illustration.</p>
          </CardHeader>
          <CardContent>
            {/* Non-linear Journey Visualization */}
            <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 overflow-visible">{/* Changed overflow to visible */}
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 5 }}>
                <defs>
                  <marker id="arrow-primary" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" fill="#3b82f6">
                    <polygon points="0 0, 8 3, 0 6" />
                  </marker>
                  <marker id="arrow-feedback" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto" fill="#f59e0b">
                    <polygon points="0 0, 12 4, 0 8" />
                  </marker>
                  <marker id="arrow-coordination" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto" fill="#8b5cf6">
                    <polygon points="0 0, 12 4, 0 8" />
                  </marker>
                  <marker id="arrow-results" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto" fill="#10b981">
                    <polygon points="0 0, 12 4, 0 8" />
                  </marker>
                  <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#ffffff" flood-opacity="0.9" />
                  </filter>
                </defs>

                <g className="text-muted-foreground/50">
                  {/* Simple sequential flow only - thin connectors */}
                  {sequentialEdges.map(([from, to]) => {
                    const a = journeySteps.find(s => s.id === from)?.position;
                    const b = journeySteps.find(s => s.id === to)?.position;
                    if (!a || !b) return null;
                    return (
                      <line
                        key={`seq-${from}-${to}`}
                        x1={`${a.x}%`}
                        y1={`${a.y}%`}
                        x2={`${b.x}%`}
                        y2={`${b.y}%`}
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </g>
              </svg>
              

              {/* Journey Steps */}
              {journeySteps.map((step) => (
                <div 
                  key={step.id}
                  className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                    selectedStep === step.id ? 'scale-110 z-30' : 'z-20'
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
                      <div className="text-xs text-muted-foreground mb-2">≈ {step.time}</div>
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


            {/* Step Details with Tabs */}
            {selectedStep && (
              <Card className="mt-8 animate-scale-in">
                <CardContent className="p-6">
                  {(() => {
                    const step = journeySteps.find(s => s.id === selectedStep);
                    if (!step) return null;

                    return (
                      <div className="space-y-6">
                        {/* Step Header */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                              <step.icon className="h-8 w-8 text-primary" />
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
                            <div className="text-xs text-muted-foreground mt-1">Approx. {step.roi}</div>
                          </div>
                        </div>

                        {/* Connections impacting this step */}
                        <div className="flex flex-wrap gap-2">
                          {(() => {
                            const items: {label: string; className: string}[] = [];
                            switch (selectedStep) {
                              case 4:
                                items.push({label:'Feedback to Data Collection', className:'bg-amber-100 text-amber-800 border border-amber-300'});
                                break;
                              case 5:
                                items.push({label:'Feedback to Records Acquisition', className:'bg-amber-100 text-amber-800 border border-amber-300'});
                                items.push({label:'Receives Results from Genomic Testing', className:'bg-emerald-100 text-emerald-800 border border-emerald-300'});
                                items.push({label:'Coordinates with Care Coordination', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                break;
                              case 6:
                                items.push({label:'Sends Results to Clinical Review', className:'bg-emerald-100 text-emerald-800 border border-emerald-300'});
                                items.push({label:'Coordinates with Care Coordination', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                break;
                              case 7:
                              case 8:
                                items.push({label:'Coordinates with Care Coordination', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                break;
                              case 9:
                                items.push({label:'Receives from Clinical Review', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                items.push({label:'Receives from Genomic Testing', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                items.push({label:'Receives from Appointment Scheduling', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                items.push({label:'Receives from Pre-Visit Preparation', className:'bg-purple-100 text-purple-800 border border-purple-300'});
                                break;
                            }
                            return items.map((it, idx) => (
                              <span key={idx} className={`px-2 py-1 rounded-full text-xs font-medium ${it.className}`}>{it.label}</span>
                            ));
                          })()}
                        </div>

                        {/* Technology Analysis Tabs */}
                          <Tabs defaultValue="scenarios" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="scenarios" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Patient Scenarios
                              </TabsTrigger>
                              <TabsTrigger value="analysis" className="flex items-center gap-2">
                                <Wrench className="h-4 w-4" />
                                Technology Analysis
                              </TabsTrigger>
                            </TabsList>

                          <TabsContent value="analysis" className="space-y-6 mt-6">
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

                            {/* Detailed Substeps */}
                            <Card className="bg-gray-50 border-gray-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                  <Target className="h-4 w-4" />
                                  Detailed Process Breakdown
                                </h4>
                                <div className="space-y-3">
                                  {step.detailedSubsteps?.map((substep, index) => (
                                    <div key={substep.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                                      <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                          {substep.id}
                                        </div>
                                        <div className="flex-1">
                                          <h5 className="font-medium text-gray-800 mb-1">{substep.title}</h5>
                                          <p className="text-sm text-gray-600 mb-2">{substep.description}</p>
                                          <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1">
                                            <span className="text-xs font-medium text-blue-800">Tech: </span>
                                            <span className="text-xs text-blue-700">{substep.technology}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )) || (
                                    <p className="text-sm text-gray-500 italic">Detailed substeps will be added for this journey step.</p>
                                  )}
                                </div>
                              </CardContent>
                            </Card>

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
                          </TabsContent>

                          <TabsContent value="scenarios" className="space-y-6 mt-6">
                            {/* Patient Scenarios for this step */}
                            <div className="space-y-6">
                              {visualScenarios
                                .filter(scenario => scenario.journeyPath.includes(selectedStep))
                                .map((scenario) => (
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
                                            <div className="text-lg font-bold">≈ {scenario.timeline}</div>
                                          </CardContent>
                                        </Card>
                                        
                                        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-indigo-200">
                                          <CardContent className="p-4 text-center">
                                            <h4 className="font-semibold mb-2">Technology Mix</h4>
                                            <div className="flex justify-between text-xs">
                                              <span>Auto: ≈{scenario.technologyMix.automation}%</span>
                                              <span>AI: ≈{scenario.technologyMix.ai}%</span>
                                            </div>
                                            <Progress value={scenario.technologyMix.automation} className="mt-2" />
                                          </CardContent>
                                        </Card>
                                      </div>

                                      {/* Specific decision for this step */}
                                      {selectedScenario === scenario.id && (() => {
                                        const stepDecision = scenario.keyDecisions.find(d => d.step === selectedStep);
                                        if (!stepDecision) return null;
                                        
                                        return (
                                          <div className="animate-scale-in space-y-4">
                                            <Separator />
                                            <Card className="bg-amber-50 border-amber-200">
                                              <CardContent className="p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                  <step.icon className="h-4 w-4" />
                                                  <span className="font-semibold text-sm">Decision for {step.title}</span>
                                                </div>
                                                <div className="space-y-2">
                                                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                                    stepDecision.decision.includes('AI') ? 'bg-purple-100 text-purple-800' : 
                                                    stepDecision.decision.includes('Automation') ? 'bg-blue-100 text-blue-800' :
                                                    'bg-indigo-100 text-indigo-800'
                                                  }`}>
                                                    {stepDecision.decision}
                                                  </div>
                                                  <p className="text-xs text-amber-700 mb-2">{stepDecision.reason}</p>
                                                  {(stepDecision as any).detailedExplanation && (
                                                    <div className="mt-2 p-2 bg-amber-25 rounded text-xs">
                                                      <strong>Detailed Analysis:</strong>
                                                      <p className="mt-1 text-amber-800">{(stepDecision as any).detailedExplanation}</p>
                                                    </div>
                                                  )}
                                                </div>
                                              </CardContent>
                                            </Card>

                                            <Card className="bg-green-50 border-green-200">
                                              <CardContent className="p-4">
                                                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                                  <CheckCircle className="h-4 w-4" />
                                                  Expected Outcome for this Patient Type
                                                </h4>
                                                <p className="text-sm text-green-700">{scenario.outcome}</p>
                                              </CardContent>
                                            </Card>
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                              
                              {visualScenarios.filter(scenario => scenario.journeyPath.includes(selectedStep)).length === 0 && (
                                <Card className="bg-gray-50 border-gray-200">
                                  <CardContent className="p-8 text-center">
                                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">No Specific Scenarios</h3>
                                    <p className="text-sm text-gray-500">This step doesn't have specific patient scenarios defined yet.</p>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessUseCases;
