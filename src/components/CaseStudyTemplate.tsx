import { useState, useEffect } from "react";
import { CaseStudyData, CaseStudyStep } from "@/data/caseStudies";
import { patientOnboardingCaseStudy } from "@/data/patientOnboardingCaseStudy";
import { StatusBadge } from "@/components/case-study/StatusBadge";
import { MetricCard } from "@/components/case-study/MetricCard";
import { EmotionIconDisplay } from "@/components/case-study/EmotionIcon";
import { OverviewCard } from "@/components/case-study/OverviewCard";
import { CaseStudyHeader } from "@/components/case-study/CaseStudyHeader";
import { JourneySteps } from "@/components/case-study/JourneySteps";
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journey">Step-by-Step Journey</TabsTrigger>
          <TabsTrigger value="gartner">Gartner Framework</TabsTrigger>
          <TabsTrigger value="blueprint">Integration Blueprint</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
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
          <div className="grid md:grid-cols-2 gap-8">
            {/* Value Creation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <ArrowDown className="w-5 h-5" />
                  Value Creation (Give)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Listen & Sense</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.listen.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Design</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.design.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Build</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.build.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deliver</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueCreation.deliver.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Value Realization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ArrowUp className="w-5 h-5" />
                  Value Realization (Get)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Efficiency</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.efficiency.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Experience</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.experience.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Growth</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.growth.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Innovation</h4>
                    <ul className="space-y-1">
                      {caseStudyData.gartnerFramework.valueRealization.innovation.map((item, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blueprint" className="mt-8">
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Integration Blueprint</h2>
              <p className="text-muted-foreground">Three-phase implementation approach for scalable deployment</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    Foundation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudyData.integrationBlueprint.phase1.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Phase 2 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudyData.integrationBlueprint.phase2.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Phase 3 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {caseStudyData.integrationBlueprint.phase3.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lessons Learned */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Lessons Learned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {caseStudyData.lessonsLearned.map((lesson, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-yellow-600">{idx + 1}</span>
                      </div>
                      {lesson}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-green-500" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {caseStudyData.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-green-600">{idx + 1}</span>
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
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