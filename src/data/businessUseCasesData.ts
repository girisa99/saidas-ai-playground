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
    }
  ],
  oncology: [
    {
      id: 1,
      title: "Patient History Collection",
      icon: UserCheck,
      time: "Day 0",
      emotion: "neutral",
      emotionIcon: Info,
      approach: "hybrid",
      description: "Comprehensive patient data gathering with AI-enhanced analysis",
      automationPrimary: true,
      roi: "≈ 80% efficiency gain",
      implementationStatus: "live",
      statusNote: "Integrated with EHR systems",
      automationTasks: [
        "Digital forms and questionnaire automation",
        "Medical record retrieval and consolidation",
        "Insurance verification workflows",
        "Appointment scheduling automation",
        "Standard consent form processing"
      ],
      aiTasks: [
        "Intelligent risk factor identification",
        "Family history pattern analysis",
        "Genetic predisposition assessment",
        "Comorbidity risk evaluation",
        "Personalized screening recommendations"
      ],
      whyAutomation: "Standardized data collection ensures comprehensive and consistent patient information gathering",
      whyAI: "Complex medical histories require intelligent analysis to identify patterns and risk factors",
      phases: [
        "Implement digital data collection automation",
        "Deploy AI for pattern recognition and risk assessment",
        "Integrate predictive screening recommendations"
      ],
      currentIssues: [
        "Paper-based forms causing delays",
        "Incomplete medical histories",
        "Manual risk assessment inconsistencies"
      ],
      improvement: "AI-enhanced history collection identifies 40% more risk factors and reduces collection time by 60%"
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
      ]
    },
    michael: {
      1: [
        {
          substep: "Complex Medical History Integration",
          process: "AI consolidates multiple medical records, identifying patterns across different healthcare systems and providers."
        },
        {
          substep: "Multidisciplinary Care Planning",
          process: "System coordinates with multiple specialists to develop comprehensive treatment approach for complex oncology case."
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