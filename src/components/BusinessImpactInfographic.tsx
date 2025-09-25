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
  // Removed status config as requested by user

  // Flatten all use cases with their landscape context for unified scrollable cards
  const allUseCases = [
    {
      landscape: "Healthcare Innovation",
      landscapeIcon: Heart,
      landscapeColor: "genie-primary",
      landscapeDescription: "AI-driven transformation in patient care and healthcare operations",
      id: "patient-enrollment",
      title: "Patient Onboarding & Enrollment",
      description: "Comprehensive healthcare patient journey with AI-assisted clinical workflows",
      outcomes: [
        "Streamlined enrollment process",
        "Accurate provider verification",
        "Enhanced patient satisfaction"
      ],
      technologies: [
        "React.js + TypeScript",
        "Supabase with PostgreSQL", 
        "Tailwind CSS + Vite",
        "API Service Middleware"
      ],
      journeySteps: [
        "Automated referral processing",
        "AI-powered triage and routing",
        "Real-time insurance verification",
        "Clinical review assistance"
      ],
      integrations: ["Prompt Engineering & AI Gateway", "Technical APIs: LLM, Small Language Models, MCP n8n, Arize, LangWatch, Labeling Studio", "Business APIs: CMS Verification & Credentialing, DocuSign, Insurance APIs, ICD, FDA"]
    },
    {
      landscape: "Customer Experience",
      landscapeIcon: MessageCircle,
      landscapeColor: "genie-teal",
      landscapeDescription: "Revolutionizing customer service and engagement through intelligent automation",
      id: "customer-onboarding",
      title: "Customer Onboarding & Engagement",
      description: "AI-powered customer journey optimization with intelligent touchpoint management",
      outcomes: [
        "Faster onboarding experience",
        "Higher completion rates with AI guidance",
        "Reduced support burden during onboarding"
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
      landscape: "Customer Experience",
      landscapeIcon: MessageCircle,
      landscapeColor: "genie-teal",
      landscapeDescription: "Revolutionizing customer service and engagement through intelligent automation",
      id: "contact-center",
      title: "Contact Center AI Transformation",
      description: "Multi-channel AI-powered customer support with intelligent routing and response",
      outcomes: [
        "Reduced customer wait times",
        "Improved first-call resolution",
        "Seamless multi-channel experience"
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
    },
    {
      landscape: "Operations & Manufacturing",
      landscapeIcon: ShoppingCart,
      landscapeColor: "genie-cyan",
      landscapeDescription: "Transforming operational efficiency through intelligent automation and optimization",
      id: "order-management",
      title: "Order Management & Tracking",
      description: "Real-time order processing with intelligent batch optimization and tracking",
      outcomes: [
        "Enhanced order visibility",
        "Optimized batch processing",
        "Improved delivery predictions"
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

        {/* Unified Scrollable Use Case Cards */}
        <div className="relative mb-16">
          <div 
            id="use-cases-scroll" 
            className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          >
            {allUseCases.map((useCase) => {
              const LandscapeIcon = useCase.landscapeIcon;
              
              return (
                <Card 
                  key={useCase.id} 
                  className={`w-80 sm:w-96 flex-shrink-0 snap-start border-${useCase.landscapeColor}/20 bg-gradient-to-br from-${useCase.landscapeColor}/5 to-background hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
                >
                  {/* Landscape Header */}
                  <div className={`p-4 bg-gradient-to-r from-${useCase.landscapeColor}/10 to-${useCase.landscapeColor}/5 border-b border-${useCase.landscapeColor}/20`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 bg-${useCase.landscapeColor}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <LandscapeIcon className={`w-5 h-5 text-${useCase.landscapeColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-bold text-${useCase.landscapeColor} truncate`}>
                          {useCase.landscape}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {useCase.landscapeDescription}
                    </p>
                  </div>

                  {/* Use Case Content */}
                  <CardHeader className="pb-3">
                    
                    <CardTitle className="text-xl font-bold text-foreground leading-tight mb-2">
                      {useCase.title}
                    </CardTitle>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
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
                        {useCase.outcomes.slice(0, 3).map((outcome, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle className={`w-3 h-3 text-${useCase.landscapeColor} mt-1 flex-shrink-0`} />
                            <span className="text-xs leading-relaxed">{outcome}</span>
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
                        {useCase.technologies.slice(0, 2).map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {useCase.technologies.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{useCase.technologies.length - 2} more
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
                        {useCase.journeySteps.slice(0, 3).map((step, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 bg-${useCase.landscapeColor} rounded-full mt-2 flex-shrink-0`} />
                            <span className="text-xs text-muted-foreground leading-relaxed">{step}</span>
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
                        {useCase.integrations.slice(0, 3).map((integration, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                        ))}
                        {useCase.integrations.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{useCase.integrations.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const container = document.getElementById('use-cases-scroll');
                if (container) {
                  container.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {allUseCases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const container = document.getElementById('use-cases-scroll');
                    if (container) {
                      const cardWidth = 400; // Approximate card width including gap
                      container.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
                    }
                  }}
                  className="w-2 h-2 bg-muted hover:bg-genie-primary rounded-full transition-colors"
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const container = document.getElementById('use-cases-scroll');
                if (container) {
                  container.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
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