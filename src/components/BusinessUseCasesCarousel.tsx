import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { 
  Users, 
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
  Shield,
  Zap,
  Brain,
  Network,
  Search,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  ExternalLink
} from "lucide-react";

const businessUseCases = [
  {
    id: "customer-onboarding",
    title: "Customer Onboarding & Engagement",
    description: "AI-powered customer journey optimization with intelligent touchpoint management",
    status: "live",
    icon: Users,
    color: "genie-primary",
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
    id: "patient-enrollment",
    title: "Patient Onboarding & Enrollment",
    description: "Comprehensive healthcare patient journey with AI-assisted clinical workflows",
    status: "testing", 
    icon: Heart,
    color: "genie-teal",
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
  },
  {
    id: "order-management",
    title: "Order Management & Tracking",
    description: "Real-time order processing with intelligent batch optimization and tracking",
    status: "development",
    icon: ShoppingCart,
    color: "genie-cyan",
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
  },
  {
    id: "contact-center",
    title: "Contact Center AI Transformation", 
    description: "Multi-channel AI-powered customer support with intelligent routing and response",
    status: "live",
    icon: MessageCircle,
    color: "genie-accent",
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
];

const statusConfig = {
  live: { label: "Live", color: "bg-green-500", textColor: "text-green-700" },
  testing: { label: "Testing", color: "bg-yellow-500", textColor: "text-yellow-700" },
  development: { label: "Development", color: "bg-blue-500", textColor: "text-blue-700" }
};

export const BusinessUseCasesCarousel = () => {
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-3 sm:mb-4">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Proven Business Use Cases & Outcomes
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Current Experimentation Hub <span className="text-genie-accent">Highlights</span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Active experiments and implementations across healthcare, oncology, and customer service sectors. 
            Exploring various AI scenarios with mixed implementation statuses as part of our ongoing experimentation initiatives.
          </p>
        </div>

        {/* Responsive Carousel */}
        <div className="relative">
          <Carousel 
            className="w-full" 
            opts={{ 
              align: "start", 
              loop: true,
              slidesToScroll: 1
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {businessUseCases.map((useCase) => {
                const IconComponent = useCase.icon;
                const status = statusConfig[useCase.status as keyof typeof statusConfig];
                
                return (
                  <CarouselItem key={useCase.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <Card className={`h-full border-${useCase.color}/20 bg-gradient-to-br from-${useCase.color}/5 to-${useCase.color}/10 hover:shadow-xl transition-all duration-300 hover:scale-105`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 bg-${useCase.color}/10 rounded-xl shadow-sm`}>
                            <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 text-${useCase.color}`} />
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${status.color} text-white text-xs`}>
                              {status.label}
                            </Badge>
                            <Badge variant="outline" className={`border-${useCase.color} text-${useCase.color} text-xs font-semibold`}>
                              {useCase.roi}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardTitle className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                          {useCase.title}
                        </CardTitle>
                        
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
                                <CheckCircle className={`w-3 h-3 text-${useCase.color} mt-1 flex-shrink-0`} />
                                <span className="text-xs sm:text-sm">{outcome}</span>
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

                        {/* Journey Steps Preview */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
                            <Activity className="w-4 h-4" />
                            Journey Highlights
                          </h4>
                          <div className="space-y-1">
                            {useCase.journeySteps.slice(0, 2).map((step, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 bg-${useCase.color} rounded-full`} />
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
            
            {/* Navigation Buttons - Positioned outside for better visibility */}
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-gray-50 border border-gray-200" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-gray-50 border border-gray-200" />
          </Carousel>
          
          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2 sm:hidden">
            {businessUseCases.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-gray-300 data-[active=true]:bg-genie-primary" 
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 lg:mt-12">
          <Button asChild size="lg" className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold">
            <Link to="/business-use-cases">
              <Search className="w-4 h-4 mr-2" />
              Explore Detailed Use Case Analysis
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground mt-3">
            Deep dive into implementation strategies, technical architectures, and ROI calculations
          </p>
        </div>
      </div>
    </section>
  );
};