import { Heart, UserCheck, FileText, Users, Shield, Calendar, ClipboardCheck, Stethoscope, Dna, MessageCircle, Clock, Target, TrendingUp, Brain, Smartphone, Monitor, Database, Workflow, Activity, Layers, Network, Wrench, Cog, ArrowRight, Play, Pause, RotateCcw, ThumbsUp, ThumbsDown, Meh, Frown, Briefcase, Search } from "lucide-react";

export interface BusinessCase {
  id: string;
  title: string;
  description: string;
  status: string; // Allow any string for flexibility
  icon: any;
  currentIssues: string[];
  expectedImprovements: string[];
  scenarioTitles: {
    sarah: string;
    michael: string;
  };
  scenarioDescriptions: {
    sarah: string;
    michael: string;
  };
}

export interface JourneyStep {
  id: number;
  title: string;
  icon: any;
  time: string;
  emotion: "positive" | "neutral" | "critical";
  emotionIcon: any;
  approach: "automation" | "agentic" | "hybrid";
  automationPrimary: boolean;
  roi: string;
  implementationStatus: "live" | "testing" | "development" | "planned";
  statusNote?: string;
  automationTasks: string[];
  aiTasks: string[];
  whyAutomation: string;
  whyAI: string;
  phases: string[];
  currentIssues: string[];
  improvement: string;
}

export interface ScenarioDetail {
  substep: string;
  process: string;
}

export interface StepImpact {
  step: number;
  totalTimeSaved: string;
  totalErrorReduction: string;
  clinicalOutcome: string;
}

export interface ScenarioImpact {
  scenarioType: string;
  overallTimeReduction: string;
  errorReduction: string;
  patientSatisfaction: string;
  stepImpacts: Record<number, any>;
  cumulativeBenefits: StepImpact[];
}

export interface BusinessCasesData {
  businessCases: Record<string, BusinessCase>;
  journeySteps: Record<string, JourneyStep[]>;
  scenarioDetails: Record<string, Record<string, Record<number, ScenarioDetail[]>>>;
  scenarioImpactAnalysis: Record<string, Record<string, ScenarioImpact>>;
}