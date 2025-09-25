import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JourneyStepsFlow } from "@/components/JourneyStepsFlow";
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
  Frown,
  Briefcase,
  Search,
  UserCheck
} from "lucide-react";

// Business Use Cases Data Structure - moved outside component to prevent re-creation
const businessCases = {
  customerOnboarding: {
    id: "customerOnboarding",
    title: "Customer Onboarding & Engagement",
    description: "Comprehensive onboarding platform with Genie conversational AI and multi-channel support",
    status: "development",
    icon: Users,
    currentIssues: [
      "Manual onboarding processes lead to 60% customer drop-off rates",
      "Generic communication results in 40% customer confusion about next steps",
      "Limited support channels cause 35% of customers to abandon the process",
      "Lack of real-time progress tracking frustrates 50% of new customers",
      "Document collection delays onboarding by average 5-7 days"
    ],
    expectedImprovements: [
      "95% reduction in onboarding time with Genie AI guided workflows",
      "Customer completion rates increased to 85% through personalized journeys",
      "Multi-channel support (WhatsApp, Voice, Email, SMS) via Twilio integration",
      "Real-time progress tracking and notifications improve satisfaction to 9.2/10",
      "DocuSign integration enables instant document processing and e-signatures"
    ],
    scenarioTitles: {
      corporate: "Corporate Client - Complex Setup",
      individual: "Individual Customer - Quick Start"
    },
    scenarioDescriptions: {
      corporate: "Enterprise client requiring multi-user setup, compliance verification, and custom configurations",
      individual: "Individual customer seeking streamlined onboarding with minimal documentation"
    }
  },
  patientEnrollment: {
    id: "patientEnrollment",
    title: "Patient Onboarding & Enrollment",
    description: "AI-powered enrollment with MCP agents for stepwise updates and provider verification",
    status: "active",
    icon: ClipboardCheck,
    currentIssues: [
      "Manual enrollment processes create 48-hour delays in patient access",
      "Provider NPI verification takes 3-5 days causing care delays",
      "Insurance credentialing bottlenecks affect 40% of new patient enrollments",
      "Incomplete documentation requires 60% rework and patient re-contact",
      "Manual follow-ups result in 25% patient abandonment during enrollment"
    ],
    expectedImprovements: [
      "Automated enrollment reduces processing time to 2-4 hours",
      "AI-powered Provider NPI verification agent completes checks in 30 minutes",
      "MCP agents provide stepwise enrollment updates with 98% accuracy",
      "Genie conversational platform guides patients through complex forms",
      "Real-time credentialing status updates via multi-channel notifications"
    ],
    scenarioTitles: {
      newPatient: "New Patient - First Visit",
      specialist: "Specialist Referral - Urgent Care"
    },
    scenarioDescriptions: {
      newPatient: "First-time patient requiring comprehensive enrollment, insurance verification, and care plan setup",
      specialist: "Urgent specialist referral needing expedited enrollment and provider credentialing"
    }
  },
  orderManagement: {
    id: "orderManagement",
    title: "Order Management & Tracking",
    description: "Real-time order processing with batch operations and intelligent tracking systems",
    status: "active",
    icon: Briefcase,
    currentIssues: [
      "Manual order processing creates 24-48 hour fulfillment delays",
      "Batch processing errors affect 20% of orders requiring manual intervention",
      "Limited real-time tracking leads to 45% customer service inquiries",
      "Inventory synchronization issues cause 15% order cancellations",
      "Complex multi-vendor orders have 30% coordination failures"
    ],
    expectedImprovements: [
      "Automated order processing reduces fulfillment time to 2-4 hours",
      "AI-powered batch operations achieve 99.5% accuracy rate",
      "Real-time tracking via Genie platform reduces inquiries by 80%",
      "Intelligent inventory management prevents 95% of stock-out cancellations",
      "Multi-vendor coordination through AI agents improves success rate to 98%"
    ],
    scenarioTitles: {
      bulk: "Bulk Order - Multiple Vendors",
      urgent: "Urgent Order - Same Day Delivery"
    },
    scenarioDescriptions: {
      bulk: "Large volume order requiring coordination across multiple vendors and complex logistics",
      urgent: "Time-sensitive order requiring immediate processing and expedited fulfillment"
    }
  },
  contactCenter: {
    id: "contactCenter",
    title: "Contact Center AI Transformation",
    description: "Comprehensive AI platform integrating Twilio, Google services, and conversational AI",
    status: "active", 
    icon: MessageCircle,
    currentIssues: [
      "Average call resolution time of 8-12 minutes with 60% requiring escalation",
      "Multi-channel inquiries (phone, email, chat, SMS) create fragmented experiences",
      "Limited language support affects 30% of customer interactions",
      "Manual documentation creates 4-5 minute post-call work per interaction",
      "Inconsistent responses across channels lead to 25% customer dissatisfaction"
    ],
    expectedImprovements: [
      "Genie conversational AI reduces resolution time to 3-5 minutes",
      "Unified Twilio integration provides seamless WhatsApp, Voice, Email, SMS experience",
      "Google Text-to-Speech and Speech-to-Text enable real-time multilingual support",
      "AI-powered documentation reduces post-call work to 30 seconds",
      "Consistent AI responses across all channels improve satisfaction to 9.1/10"
    ],
    scenarioTitles: {
      technical: "Technical Support - Complex Issue",
      billing: "Billing Inquiry - Multi-Account"
    },
    scenarioDescriptions: {
      technical: "Complex technical support request requiring multi-step troubleshooting and escalation",
      billing: "Multi-account billing inquiry requiring cross-system data retrieval and explanation"
    }
  },
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
      "Automated referral processing reduces delays to 15-30 minutes with 99% accuracy",
      "Real-time insurance verification prevents 90% of approval delays",
      "AI-powered specialist matching optimizes care coordination to 95% success rate",
      "Personalized preparation protocols reduce unprepared arrivals to 5%",
      "Intelligent pre-authorization increases approval rates to 85% on first submission"
    ],
    scenarioTitles: {
      routine: "Routine Specialist Referral",
      urgent: "Urgent Care Coordination"
    },
    scenarioDescriptions: {
      routine: "Standard specialist referral for non-urgent condition requiring coordination and preparation",
      urgent: "Time-sensitive referral requiring immediate specialist access and expedited processing"
    }
  }
};

const BusinessUseCases = () => {
  const [selectedCase, setSelectedCase] = useState<string>("customerOnboarding");
  const [selectedScenario, setSelectedScenario] = useState<string>("corporate");
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const currentCase = useMemo(() => businessCases[selectedCase as keyof typeof businessCases], [selectedCase]);

  // Update selected scenario when case changes
  useState(() => {
    const firstScenarioKey = Object.keys(currentCase.scenarioTitles)[0];
    setSelectedScenario(firstScenarioKey);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
              AI-Driven Business Use Cases
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Explore comprehensive AI transformation strategies across healthcare, customer service, and operational workflows. 
              Each use case showcases the integration of cutting-edge technologies including Genie conversational AI, 
              Twilio multi-channel communication, Google services, and intelligent automation platforms.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <Bot className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Genie AI Platform Integration</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <MessageCircle className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Multi-Channel Communication</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                <Workflow className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium">Intelligent Process Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Analysis Framework */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Strategic Analysis Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Technology Integration</h4>
                  <p className="text-xs text-muted-foreground mt-1">AI, automation, and platform convergence</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">User Experience</h4>
                  <p className="text-xs text-muted-foreground mt-1">Journey optimization and satisfaction</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Operational Excellence</h4>
                  <p className="text-xs text-muted-foreground mt-1">Efficiency, accuracy, and scalability</p>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Business Impact</h4>
                  <p className="text-xs text-muted-foreground mt-1">ROI, growth, and competitive advantage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Business Use Cases Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Tabs value={selectedCase} onValueChange={setSelectedCase}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar with Use Case List */}
              <div className="lg:w-1/4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Business Use Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TabsList className="flex flex-col h-auto p-1 space-y-1">
                      {Object.entries(businessCases).map(([key, useCase]) => (
                        <TabsTrigger
                          key={key}
                          value={key}
                          className="w-full justify-start text-left p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <div className="flex items-start gap-3">
                            <useCase.icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-sm">{useCase.title}</div>
                              <div className="text-xs opacity-70 mt-1">{useCase.description}</div>
                            </div>
                          </div>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:w-3/4">
                {Object.entries(businessCases).map(([key, useCase]) => (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="space-y-6">
                      {/* Use Case Overview */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <useCase.icon className="w-6 h-6" />
                            {useCase.title}
                            <Badge variant={useCase.status === 'active' ? 'default' : useCase.status === 'mixed' ? 'secondary' : 'outline'}>
                              {useCase.status}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-6">{useCase.description}</p>
                          
                          {/* Key Technology Integrations */}
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">Key Technology Integrations</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <Bot className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium">Genie Conversational AI</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                <MessageCircle className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium">Twilio Multi-Channel</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
                                <Smartphone className="w-4 h-4 text-purple-600" />
                                <span className="text-sm font-medium">Google AI Services</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <FileText className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium">DocuSign Integration</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
                                <Shield className="w-4 h-4 text-red-600" />
                                <span className="text-sm font-medium">MCP Agents</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <Workflow className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm font-medium">Provider NPI Verification</span>
                              </div>
                            </div>
                          </div>

                          {/* Current vs Expected */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-red-700">Current Issues</h4>
                              <ul className="space-y-2">
                                {useCase.currentIssues.map((issue, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    {issue}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 text-green-700">Expected Improvements</h4>
                              <ul className="space-y-2">
                                {useCase.expectedImprovements.map((improvement, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                    {improvement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Patient Scenarios */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Scenario Analysis & Process Breakdown
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Tabs value={selectedScenario} onValueChange={setSelectedScenario}>
                            <TabsList className="grid grid-cols-2 w-full mb-6">
                              {Object.entries(useCase.scenarioTitles).map(([key, title]) => (
                                <TabsTrigger key={key} value={key} className="text-sm">
                                  {title}
                                </TabsTrigger>
                              ))}
                            </TabsList>

                            {Object.entries(useCase.scenarioTitles).map(([scenarioKey, scenarioTitle], index) => (
                              <TabsContent key={scenarioKey} value={scenarioKey}>
                                <div className={`bg-gradient-to-r ${index === 0 ? 'from-blue-50 to-indigo-50 border-blue-200' : 'from-purple-50 to-pink-50 border-purple-200'} p-6 rounded-lg border`}>
                                  <h4 className="font-semibold text-xl mb-3 flex items-center gap-2">
                                    <useCase.icon className={`w-6 h-6 ${index === 0 ? 'text-blue-600' : 'text-purple-600'}`} />
                                    {scenarioTitle} - Process Flow
                                  </h4>
                                  <p className={`text-base ${index === 0 ? 'text-blue-700' : 'text-purple-700'} mb-4`}>
                                    {useCase.scenarioDescriptions[scenarioKey]}
                                  </p>
                                  
                                  <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg">
                                    <p className="text-center text-muted-foreground">
                                      <Lightbulb className="w-6 h-6 mx-auto mb-2" />
                                      This scenario demonstrates the integration of Genie AI platform with multiple touchpoints 
                                      including Twilio communication channels, Google AI services, and automated workflow orchestration.
                                    </p>
                                  </div>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </CardContent>
                      </Card>

                      {/* Call to Action */}
                      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <h3 className="text-xl font-semibold mb-3">Ready to Explore Implementation?</h3>
                            <p className="text-muted-foreground mb-4">
                              Dive deeper into the technical implementation and journey mapping for this use case.
                            </p>
                            <Button asChild>
                              <a href="/business-use-cases" className="inline-flex items-center gap-2">
                                Explore Detailed Journey Maps
                                <ArrowRight className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BusinessUseCases;