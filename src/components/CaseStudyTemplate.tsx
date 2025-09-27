import { useState, useEffect } from "react";
import { CaseStudyData, CaseStudyStep } from "@/data/caseStudies";
import { patientOnboardingCaseStudy } from "@/data/patientOnboardingCaseStudy";
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
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");


  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation": return "bg-blue-100 text-blue-800 border-blue-200";
      case "agentic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "hybrid": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const IconComponent = caseStudyData.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-br from-genie-primary/10 to-genie-secondary/10 border border-genie-primary/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-genie-primary/20 rounded-xl">
            <IconComponent className="w-8 h-8 text-genie-primary" />
          </div>
          <div>
            <Badge className={`mb-2 ${caseStudyData.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {caseStudyData.industry} • {caseStudyData.status === 'live' ? 'Live Production' : 'Mixed Implementation'}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{caseStudyData.title}</h1>
            <p className="text-xl text-muted-foreground mt-2">{caseStudyData.subtitle}</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">{caseStudyData.description}</p>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <TrendingUp className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.efficiency}</div>
            <div className="text-sm text-muted-foreground">Efficiency Gain</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <Target className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.accuracy}</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <DollarSign className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.cost}</div>
            <div className="text-sm text-muted-foreground">Annual Savings</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
            <Star className="w-6 h-6 text-genie-primary mx-auto mb-2" />
            <div className="font-bold text-genie-primary">{caseStudyData.metrics.satisfaction}</div>
            <div className="text-sm text-muted-foreground">Patient Rating</div>
          </div>
        </div>
      </div>

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Challenge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.challenge}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Current Issues:</h4>
                  <ul className="space-y-1">
                    {caseStudyData.businessValue.current.map((issue, index) => (
                      <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                        <ArrowDown className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.solution}</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Target Outcomes:</h4>
                  <ul className="space-y-1">
                    {caseStudyData.businessValue.target.map((target, index) => (
                      <li key={index} className="text-sm text-green-600 flex items-start gap-2">
                        <ArrowUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {target}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Impact & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.impact}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseStudyData.overview.timeline}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journey" className="mt-8">
          {/* Visual Journey Steps */}
          <div className="space-y-8">
            {caseStudyData.steps.map((step, index) => {
              const StepIcon = step.icon;
              const EmotionIcon = step.emotionIcon;
              
              return (
                <Card key={step.id} className={`relative overflow-hidden ${activeStep === index ? 'ring-2 ring-genie-primary' : ''}`}>
                  {/* Progress Connector */}
                  {index < caseStudyData.steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-16 bg-genie-primary/30 z-10"></div>
                  )}
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      {/* Step Number & Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-genie-primary/20 rounded-full flex items-center justify-center relative">
                          <StepIcon className="w-8 h-8 text-genie-primary" />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border">
                            <span className="text-xs font-bold text-genie-primary">{step.id}</span>
                          </div>
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={`border ${getApproachColor(step.approach)}`}>
                            {step.approach === 'automation' && <Settings className="w-3 h-3 mr-1" />}
                            {step.approach === 'agentic' && <Bot className="w-3 h-3 mr-1" />}
                            {step.approach === 'hybrid' && <Zap className="w-3 h-3 mr-1" />}
                            {step.approach}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <EmotionIcon className={`w-4 h-4 ${
                              step.emotion === 'critical' ? 'text-red-500' : 
                              step.emotion === 'positive' ? 'text-green-500' : 'text-gray-500'
                            }`} />
                            <span className="text-xs capitalize">{step.emotion}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        
                        {step.statusNote && (
                          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                            <strong>Status:</strong> {step.statusNote}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Expandable Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Current Issues & Improvement */}
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Current Issues
                        </h4>
                        <ul className="space-y-1 mb-4">
                          {step.currentIssues.map((issue, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <ArrowDown className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                        
                        <div className="p-3 bg-green-50 border border-green-200 rounded">
                          <h5 className="font-semibold text-green-700 text-sm mb-1">Improvement Achieved</h5>
                          <p className="text-sm text-green-600">{step.improvement}</p>
                        </div>
                      </div>

                      {/* Technology Stack */}
                      {step.technologyStack && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            Technology Stack
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-medium text-blue-600 mb-1">Automation</h5>
                              <div className="flex flex-wrap gap-1">
                                {step.technologyStack.automation.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-purple-600 mb-1">AI/ML</h5>
                              <div className="flex flex-wrap gap-1">
                                {step.technologyStack.ai.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-green-600 mb-1">Integration</h5>
                              <div className="flex flex-wrap gap-1">
                                {step.technologyStack.integration.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gartner Value Exchange */}
                    {step.gartnerValue && (
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          Gartner Value Exchange
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-3 bg-red-50 border border-red-200 rounded">
                            <h5 className="font-medium text-red-700 text-sm mb-2">Value Creation (Give)</h5>
                            <ul className="space-y-1">
                              {step.gartnerValue.give.map((item, idx) => (
                                <li key={idx} className="text-xs text-red-600 flex items-center gap-1">
                                  <ArrowDown className="w-3 h-3" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-green-50 border border-green-200 rounded">
                            <h5 className="font-medium text-green-700 text-sm mb-2">Value Realization (Get)</h5>
                            <ul className="space-y-1">
                              {step.gartnerValue.get.map((item, idx) => (
                                <li key={idx} className="text-xs text-green-600 flex items-center gap-1">
                                  <ArrowUp className="w-3 h-3" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Why Automation vs AI */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            Why Automation?
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.whyAutomation}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-600 mb-2 flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            Why AI?
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.whyAI}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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