import { useState, useEffect } from "react";
import { CaseStudyData, CaseStudyStep } from "@/data/caseStudies";
import { patientOnboardingCaseStudy } from "@/data/patientOnboardingCaseStudy";
import { StatusBadge } from "@/components/case-study/StatusBadge";
import { MetricCard } from "@/components/case-study/MetricCard";
import { EmotionIconDisplay } from "@/components/case-study/EmotionIcon";
import { OverviewCard } from "@/components/case-study/OverviewCard";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { JourneySteps } from "@/components/case-study/JourneySteps";
import { GartnerFramework } from "@/components/case-study/GartnerFramework";
import { IntegrationBlueprint } from "@/components/case-study/IntegrationBlueprint";
import { InsightsTab } from "@/components/case-study/InsightsTab";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  ArrowDown, 
  ArrowUp,
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp, 
  Users, 
  Settings, 
  Bot, 
  Zap, 
  Shield, 
  Database, 
  Network,
  Activity,
  Star,
  Lightbulb,
  Briefcase,
  Heart,
  Brain,
  MessageCircle,
  FileText,
  ClipboardCheck,
  Stethoscope,
  UserCheck,
  AlertTriangle,
  ThumbsUp,
  Meh,
  Award,
  BarChart3,
  DollarSign,
  Calendar,
  Layers,
  Workflow
} from "lucide-react";

// Interfaces imported from external file

// Patient Onboarding Case Study Template Data
// Data imported from external file

interface CaseStudyTemplateProps {
  caseStudyData: CaseStudyData;
}

const CaseStudyTemplate = ({ caseStudyData }: CaseStudyTemplateProps) => {
  const [activeTab, setActiveTab] = useState("overview");


  // Helper functions moved to individual components

  const IconComponent = caseStudyData.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <CaseStudyHeader caseStudyData={caseStudyData} />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 h-auto p-1">
          <TabsTrigger value="overview" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="journey" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Step-by-Step Journey
          </TabsTrigger>
          <TabsTrigger value="gartner" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Gartner Framework
          </TabsTrigger>
          <TabsTrigger value="blueprint" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Integration Blueprint
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Challenge & Solution */}
            <OverviewCard
              icon={AlertTriangle}
              title="Challenge"
              content={caseStudyData.overview.challenge}
              items={caseStudyData.businessValue.current}
              itemType="current"
              iconColor="text-red-500"
            />

            <OverviewCard
              icon={Lightbulb}
              title="Solution"
              content={caseStudyData.overview.solution}
              items={caseStudyData.businessValue.target}
              itemType="target"
              iconColor="text-yellow-500"
            />

            {/* Impact & Timeline */}
            <OverviewCard
              icon={TrendingUp}
              title="Impact"
              content={caseStudyData.overview.impact}
              iconColor="text-green-500"
            />

            <OverviewCard
              icon={Clock}
              title="Timeline"
              content={caseStudyData.overview.timeline}
              iconColor="text-blue-500"
            />
          </div>
        </TabsContent>

        <TabsContent value="journey" className="mt-8">
          {/* Visual Journey Steps */}
          <JourneySteps steps={caseStudyData.steps} />
        </TabsContent>

        <TabsContent value="gartner" className="mt-8">
          <GartnerFramework gartnerFramework={caseStudyData.gartnerFramework} />
        </TabsContent>

        <TabsContent value="blueprint" className="mt-8">
          <IntegrationBlueprint integrationBlueprint={caseStudyData.integrationBlueprint} />
        </TabsContent>

        <TabsContent value="insights" className="mt-8">
          <InsightsTab 
            lessonsLearned={caseStudyData.lessonsLearned} 
            nextSteps={caseStudyData.nextSteps} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Main component that uses the template
const PatientOnboardingCaseStudy = () => {
  return <CaseStudyTemplate caseStudyData={patientOnboardingCaseStudy} />;
};

export { CaseStudyTemplate, PatientOnboardingCaseStudy, type CaseStudyData };
export default PatientOnboardingCaseStudy;