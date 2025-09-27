import { UserCheck, FileText, MessageCircle, Network, Shield, Stethoscope, Calendar, AlertTriangle, ThumbsUp } from "lucide-react";

export interface CaseStudyStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  time: string;
  emotion: "critical" | "positive" | "neutral";
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
  technologyStack: {
    automation: string[];
    ai: string[];
    integration: string[];
  };
  gartnerValue: {
    give: string[];
    get: string[];
  };
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  industry: string;
  status: "live" | "mixed" | "development";
  icon: any;
  heroImage?: string;
  overview: {
    challenge: string;
    solution: string;
    impact: string;
    timeline: string;
  };
  metrics: {
    efficiency: string;
    accuracy: string;
    cost: string;
    satisfaction: string;
  };
  businessValue: {
    current: string[];
    target: string[];
  };
  steps: CaseStudyStep[];
  gartnerFramework: {
    valueCreation: {
      listen: string[];
      design: string[];
      build: string[];
      deliver: string[];
    };
    valueRealization: {
      efficiency: string[];
      experience: string[];
      growth: string[];
      innovation: string[];
    };
  };
  integrationBlueprint: {
    phase1: string[];
    phase2: string[];
    phase3: string[];
  };
  lessonsLearned: string[];
  nextSteps: string[];
}