import { Heart, UserCheck, FileText, Users, Shield, Calendar, ClipboardCheck, Stethoscope, Dna, MessageCircle, Clock, Target, TrendingUp, Brain, Smartphone, Monitor, Database, Workflow, Activity, Layers, Network, Wrench, Cog, ArrowRight, Play, Pause, RotateCcw, ThumbsUp, ThumbsDown, Meh, Frown, Briefcase, Search, CheckCircle, AlertTriangle, Lightbulb, Star, ArrowUp, ArrowDown, User, Bot, Zap, Settings } from "lucide-react";
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

// Journey steps data (placeholder - should be populated with actual data)
export const journeySteps = {
  referral: [],
  oncology: [],
  contact: []
};

// Scenario details data (placeholder - should be populated with actual data)
export const scenarioDetails = {
  referral: {
    sarah: {},
    michael: {}
  },
  oncology: {
    sarah: {},
    michael: {}
  },
  contact: {
    sarah: {},
    michael: {}
  }
};

// Scenario impact analysis data (placeholder - should be populated with actual data)
export const scenarioImpactAnalysis = {
  referral: {
    sarah: {},
    michael: {}
  },
  oncology: {
    sarah: {},
    michael: {}
  },
  contact: {
    sarah: {},
    michael: {}
  }
};