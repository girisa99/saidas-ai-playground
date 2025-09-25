import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  TrendingUp,
  DollarSign, 
  Clock,
  Users,
  Brain,
  Zap,
  Target,
  Award,
  BarChart3,
  Rocket,
  Shield,
  CheckCircle,
  ArrowRight,
  Building,
  Stethoscope,
  Factory,
  UserCheck,
  Heart,
  MessageCircle,
  ShoppingCart,
  Package,
  Activity,
  Bot,
  Phone,
  FileSignature,
  Mic,
  MessageSquare,
  Database,
  Network,
  Search,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

export const BusinessImpactInfographic = () => {
  const statusConfig = {
    live: { label: "Live", color: "bg-green-500", textColor: "text-green-700" },
    testing: { label: "Testing", color: "bg-yellow-500", textColor: "text-yellow-700" },
    development: { label: "Development", color: "bg-blue-500", textColor: "text-blue-700" }
  };

  const landscapeExperiments = [
    {
      landscape: "Healthcare Innovation",
      icon: Heart,
      color: "genie-primary",
      description: "AI-driven transformation in patient care and healthcare operations",
      useCases: [
        {
          id: "patient-enrollment",
          title: "Patient Onboarding & Enrollment",
          description: "Comprehensive healthcare patient journey with AI-assisted clinical workflows",
          status: "testing",
          roi: "75% efficiency gain",
          outcomes: [
            "Streamlined enrollment reducing time by 75%",
            "99% accurate provider NPI verification",
            "85% improvement in patient satisfaction scores"
          ],
          technologies: [
            "Provider NPI Verification Agents",
            "MCP Stepwise Update Agents",
            "Clinical Decision Support",
            "Insurance Verification APIs"
          ],
          journeySteps: [
            "Automated referral processing",
            "AI-powered triage and routing",
            "Real-time insurance verification",
            "Clinical review assistance"
          ],
          integrations: ["HIE Networks", "Insurance APIs", "Clinical Systems"]
        }
      ]
    },
    {
      landscape: "Customer Experience",
      icon: MessageCircle,
      color: "genie-teal",
      description: "Revolutionizing customer service and engagement through intelligent automation",
      useCases: [
        {
          id: "customer-onboarding",
          title: "Customer Onboarding & Engagement",
          description: "AI-powered customer journey optimization with intelligent touchpoint management",
          status: "live",
          roi: "65% faster onboarding",
          outcomes: [
            "Reduced onboarding time from 7 days to 2.5 days",
            "95% completion rate with AI guidance",
            "60% reduction in support tickets during onboarding"
          ],
          technologies: [
            "Genie Conversational AI",
            "Multi-model RAG",
            "Workflow Automation",
            "Sentiment Analysis"
          ],
          journeySteps: [
            "AI-driven welcome sequence",
            "Intelligent form pre-population", 
            "Real-time validation and guidance",
            "Automated verification processes"
          ],
          integrations: ["Twilio SMS/Email", "DocuSign", "CRM Systems"]
        },
        {
          id: "contact-center",
          title: "Contact Center AI Transformation",
          description: "Multi-channel AI-powered customer support with intelligent routing and response",
          status: "live",
          roi: "70% efficiency increase",
          outcomes: [
            "80% reduction in hold times",
            "90% first-call resolution rate",
            "Multi-channel context preservation"
          ],
          technologies: [
            "Genie Conversational Platform",
            "Voice Biometrics",
            "NLP Processing",
            "Sentiment Analysis"
          ],
          journeySteps: [
            "Smart IVR with natural language",
            "Instant identity verification",
            "Unified customer view",
            "AI-powered case management"
          ],
          integrations: [
            "Twilio (WhatsApp, Voice, Email, SMS)",
            "Google Text-to-Speech & Speech-to-Text",
            "CRM Integration"
          ]
        }
      ]
    },
    {
      landscape: "Operations & Manufacturing",
      icon: ShoppingCart,
      color: "genie-cyan",
      description: "Transforming operational efficiency through intelligent automation and optimization",
      useCases: [
        {
          id: "order-management",
          title: "Order Management & Tracking",
          description: "Real-time order processing with intelligent batch optimization and tracking",
          status: "development",
          roi: "50% process optimization",
          outcomes: [
            "Real-time order status visibility",
            "Automated batch processing optimization",
            "Predictive delivery timeline accuracy"
          ],
          technologies: [
            "Batch Process Automation",
            "Real-time Tracking Systems",
            "Predictive Analytics",
            "Supply Chain AI"
          ],
          journeySteps: [
            "Intelligent order validation",
            "Automated batch scheduling",
            "Real-time status updates",
            "Predictive issue resolution"
          ],
          integrations: ["ERP Systems", "Logistics APIs", "Inventory Management"]
        }
      ]
    }
  ];

  const experimentationInsights = [
    {
      insight: "Pattern Recognition",
      description: "AI experimentation reveals emerging transformation patterns across industries",
      icon: Brain,
      color: "genie-primary"
    },
    {
      insight: "Disruption Mapping",
      description: "Understanding how AI fundamentally changes traditional operational approaches",
      icon: Zap,
      color: "genie-teal"
    },
    {
      insight: "Collective Learning",
      description: "Shared experimentation builds comprehensive understanding of AI potential",
      icon: Target,
      color: "genie-cyan"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-genie-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            Genie AI Experimentation Hub
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Exploring AI Transformation <span className="text-genie-primary">Across Landscapes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Through hands-on experimentation and proven implementations, we're discovering how AI reshapes various industry landscapes. 
            Each use case reveals new patterns and possibilities for transformation.
          </p>
        </div>

        {/* Landscape Experiments with Use Cases */}
        <div className="space-y-12 mb-16">
          {landscapeExperiments.map((landscape, index) => {
            const IconComponent = landscape.icon;
            
            return (
              <Card key={index} className={`p-8 border-${landscape.color}/20 bg-gradient-to-br from-${landscape.color}/5 to-background`}>
                <div className="flex items-start gap-6 mb-8">
                  <div className={`w-16 h-16 bg-${landscape.color}/10 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-8 h-8 text-${landscape.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold text-${landscape.color} mb-2`}>
                      {landscape.landscape}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {landscape.description}
                    </p>
                  </div>
                </div>

                {/* Use Cases Carousel */}
                <div className="relative">
                  <Carousel 
                    className="w-full" 
                    opts={{ 
                      align: "start", 
                      loop: landscape.useCases.length > 1
                    }}
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      {landscape.useCases.map((useCase) => {
                        const status = statusConfig[useCase.status as keyof typeof statusConfig];
                        
                        return (
                          <CarouselItem key={useCase.id} className="pl-2 md:pl-4 basis-full lg:basis-1/2">
                            <Card className="h-full border-border/50 bg-background/50 hover:shadow-lg transition-all duration-300">
                              <CardHeader className="pb-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex flex-col gap-2">
                                    <Badge className={`${status.color} text-white text-xs w-fit`}>
                                      {status.label}
                                    </Badge>
                                    <Badge variant="outline" className={`border-${landscape.color} text-${landscape.color} text-xs font-semibold w-fit`}>
                                      {useCase.roi}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <CardTitle className="text-xl font-bold text-foreground leading-tight">
                                  {useCase.title}
                                </CardTitle>
                                
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {useCase.description}
                                </p>
                              </CardHeader>
                              
                              <CardContent className="pt-0 space-y-4">
                                {/* Key Outcomes */}
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    Key Outcomes
                                  </h4>
                                  <ul className="space-y-1">
                                    {useCase.outcomes.slice(0, 2).map((outcome, i) => (
                                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                        <CheckCircle className={`w-3 h-3 text-${landscape.color} mt-1 flex-shrink-0`} />
                                        <span className="text-xs">{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technologies */}
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                    <Brain className="w-4 h-4" />
                                    Core Technologies
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {useCase.technologies.slice(0, 3).map((tech, i) => (
                                      <Badge key={i} variant="secondary" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                    {useCase.technologies.length > 3 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{useCase.technologies.length - 3} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {/* Journey Steps */}
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                    <Activity className="w-4 h-4" />
                                    Journey Highlights
                                  </h4>
                                  <div className="space-y-1">
                                    {useCase.journeySteps.slice(0, 2).map((step, i) => (
                                      <div key={i} className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 bg-${landscape.color} rounded-full`} />
                                        <span className="text-xs text-muted-foreground">{step}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Integrations */}
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                                    <Network className="w-4 h-4" />
                                    Key Integrations
                                  </h4>
                                  <div className="flex flex-wrap gap-1">
                                    {useCase.integrations.slice(0, 2).map((integration, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {integration}
                                      </Badge>
                                    ))}
                                    {useCase.integrations.length > 2 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{useCase.integrations.length - 2}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                    
                    {/* Show navigation only if there are multiple use cases */}
                    {landscape.useCases.length > 1 && (
                      <>
                        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4" />
                        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4" />
                      </>
                    )}
                  </Carousel>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Experimentation Insights */}
        <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-background mb-16">
          <div className="text-center mb-8">
            <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Experimentation Insights
            </Badge>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              What We're Learning Through <span className="text-genie-primary">AI Exploration</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {experimentationInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              
              return (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-background to-muted/20 rounded-lg border border-border/50">
                  <div className={`w-16 h-16 bg-${insight.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 text-${insight.color}`} />
                  </div>
                  <h4 className={`text-lg font-bold text-${insight.color} mb-2`}>
                    {insight.insight}
                  </h4>
                  <p className="text-sm text-foreground">
                    {insight.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-genie-primary/10 to-genie-teal/10 rounded-lg border border-genie-primary/20">
              <p className="text-muted-foreground mb-4">
                Ready to explore comprehensive business applications and detailed use case analysis?
              </p>
              <Link to="/business-use-cases">
                <Button variant="outline" className="border-genie-primary text-genie-primary hover:bg-genie-primary hover:text-white">
                  Explore Detailed Use Case Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-genie-primary/20 to-genie-teal/20 rounded-lg border border-genie-primary/30">
              <p className="text-muted-foreground mb-4">
                Continue exploring our technology journey and development approach.
              </p>
              <Link to="/journey">
                <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white">
                  Continue Technology Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};