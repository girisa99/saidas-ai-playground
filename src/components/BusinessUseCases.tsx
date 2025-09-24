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
    time: "Day 1",
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
    time: "Day 2-3",
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
    time: "Day 3-5",
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
    time: "Day 5-7",
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
    time: "Day 7",
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
    time: "Day 7-10",
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
    time: "Ongoing",
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
    time: "Post-treatment",
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
];

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
  const [selectedScenario, setSelectedScenario] = useState("sarah");
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showDecisionFramework, setShowDecisionFramework] = useState(false);

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
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-genie-primary to-genie-secondary bg-clip-text text-transparent leading-tight">
          Business Use Cases
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
          Strategic technology selection for oncology workflows - choosing between automation and agentic AI
        </p>
      </div>

      {/* Journey Map Section */}
      <Card className="w-full mx-auto max-w-7xl">
        <CardHeader className="px-4 sm:px-6 lg:px-8">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl text-center mb-2 sm:mb-4 leading-tight">
            Patient Journey Through Oncology Care
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-4 lg:px-6">
          <div className="relative w-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] bg-gradient-to-br from-background via-muted/30 to-background rounded-lg p-2 sm:p-4 lg:p-8 overflow-x-auto">
            <svg
              viewBox="0 0 100 40"
              className="w-full h-full min-w-[320px] sm:min-w-[600px] lg:min-w-[800px]"
              preserveAspectRatio="xMidYMid meet"
            >
              {journeySteps.map((step, index) => {
                const nextStep = journeySteps[index + 1];
                return (
                  <g key={step.id}>
                    {/* Connection Line */}
                    {nextStep && (
                      <line
                        x1={step.position.x + 1.8}
                        y1={step.position.y + 1.5}
                        x2={nextStep.position.x - 1.8}
                        y2={nextStep.position.y + 1.5}
                        stroke="hsl(var(--border))"
                        strokeWidth="0.15"
                        strokeDasharray="none"
                      />
                    )}
                    
                    {/* Step Circle */}
                    <circle
                      cx={step.position.x}
                      cy={step.position.y + 1.5}
                      r="1.8"
                      fill={selectedStep === step.id ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                      stroke={selectedStep === step.id ? "hsl(var(--primary))" : "hsl(var(--border))"}
                      strokeWidth="0.15"
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                    />
                    
                    {/* Step Number */}
                    <text
                      x={step.position.x}
                      y={step.position.y + 2}
                      textAnchor="middle"
                      className="text-[1px] sm:text-[0.9px] font-semibold fill-primary-foreground pointer-events-none"
                    >
                      {step.id}
                    </text>
                    
                    {/* Step Title and Time */}
                    <g className="cursor-pointer" onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}>
                      <text
                        x={step.position.x}
                        y={step.position.y - 0.3}
                        textAnchor="middle"
                        className="text-[0.9px] sm:text-[0.8px] font-semibold fill-foreground pointer-events-none"
                      >
                        {step.title}
                      </text>
                      <text
                        x={step.position.x}
                        y={step.position.y + 0.2}
                        textAnchor="middle"
                        className="text-[0.7px] sm:text-[0.6px] fill-muted-foreground pointer-events-none"
                      >
                        {step.time}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
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
                    </div>

                    {selectedStep && scenarioDetails.sarah[selectedStep] && (
                      <div className="space-y-2 sm:space-y-3">
                        <h5 className="font-medium text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <span>Step {selectedStep}: {journeySteps.find(s => s.id === selectedStep)?.title}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {journeySteps.find(s => s.id === selectedStep)?.time}
                          </Badge>
                        </h5>
                        <div className="bg-background border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                          {scenarioDetails.sarah[selectedStep]?.map((detail: any, index: number) => (
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
                          <span>Step {selectedStep}: {journeySteps.find(s => s.id === selectedStep)?.title}</span>
                          <Badge variant="outline" className="text-xs w-fit">
                            {journeySteps.find(s => s.id === selectedStep)?.time}
                          </Badge>
                        </h5>
                        <div className="bg-background border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                          {scenarioDetails.michael[selectedStep]?.map((detail: any, index: number) => (
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
                          {journeySteps.find(s => s.id === selectedStep)?.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {journeySteps.find(s => s.id === selectedStep)?.description}
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
                              {journeySteps.find(s => s.id === selectedStep)?.roi}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2 sm:space-y-3 pt-0">
                          <p className="text-xs sm:text-sm text-green-700 font-medium leading-relaxed">
                            {journeySteps.find(s => s.id === selectedStep)?.whyAutomation}
                          </p>
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-green-800">Key Tasks:</h5>
                            <ul className="space-y-1">
                              {journeySteps.find(s => s.id === selectedStep)?.automationTasks.map((task: string, index: number) => (
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
                            {journeySteps.find(s => s.id === selectedStep)?.whyAI}
                          </p>
                          <div className="space-y-2">
                            <h5 className="text-xs sm:text-sm font-semibold text-blue-800">AI Capabilities:</h5>
                            <ul className="space-y-1">
                              {journeySteps.find(s => s.id === selectedStep)?.aiTasks.map((task: string, index: number) => (
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
                          {journeySteps.find(s => s.id === selectedStep)?.phases.map((phase: string, index: number) => (
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
                  {[
                    "Approx. 40% of patients experience delays in initial appointment scheduling due to manual processing",
                    "Staff productivity reduced by estimated 25% due to repetitive administrative tasks", 
                    "Approx. 30% increase in errors during data collection and record management",
                    "Patient satisfaction scores averaging 6.2/10 due to communication gaps and delays",
                    "Healthcare provider burnout increased by approx. 35% due to administrative burden"
                  ].map((issue, index) => (
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
                  {[
                    "Approx. 85% reduction in appointment scheduling time with automated referral processing",
                    "Staff efficiency increased by estimated 60% through AI-assisted workflow optimization",
                    "Data accuracy improved to approx. 98% with automated validation and AI error detection", 
                    "Patient satisfaction projected to reach 8.7/10 with personalized communication and faster response times",
                    "Healthcare provider satisfaction increased by approx. 45% due to reduced administrative burden and improved patient outcomes"
                  ].map((improvement, index) => (
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