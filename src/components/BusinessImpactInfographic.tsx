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

  // Updated use cases with 3-phase structure
  const allUseCases = [
    {
      landscape: "Healthcare Innovation",
      landscapeIcon: Heart,
      landscapeColor: "genie-primary",
      landscapeDescription: "AI-driven transformation in patient care and healthcare operations",
      id: "patient-enrollment",
      title: "Patient Onboarding & Enrollment",
      description: "Comprehensive healthcare patient journey with AI-assisted clinical workflows",
      experiment: {
        title: "EXPERIMENT",
        activities: ["Initial healthcare workflow analysis", "AI model testing for patient data", "Prototype development with basic forms"],
        technologies: ["React.js", "GPT Models", "Basic API Integration"]
      },
      validate: {
        title: "VALIDATE", 
        activities: ["Insurance verification system testing", "Clinical review workflow validation", "HIPAA compliance assessment"],
        technologies: ["TypeScript", "Supabase", "Healthcare APIs", "Validation Systems"]
      },
      deploy: {
        title: "DEPLOY",
        activities: ["Full CMS integration deployment", "Multi-agent orchestration live", "Real-time insurance verification"],
        technologies: ["CMS Credentialing", "FDA APIs", "ICD 9/10", "Multi-Agent Systems"]
      },
      outcomes: [
        "Streamlined enrollment process",
        "Accurate provider verification", 
        "Enhanced patient satisfaction"
      ],
      integrations: ["CMS Verification & Credentialing", "DocuSign", "Insurance APIs", "ICD", "FDA", "Twilio WhatsApp/SMS/Email"]
    },
    {
      landscape: "Customer Onboarding",
      landscapeIcon: UserCheck,
      landscapeColor: "genie-secondary",
      landscapeDescription: "Streamlining customer acquisition and initial engagement through intelligent automation",
      id: "customer-onboarding",
      title: "Customer Onboarding & Engagement",
      description: "AI-powered customer journey optimization with intelligent touchpoint management",
      experiment: {
        title: "EXPERIMENT",
        activities: ["Customer journey mapping", "AI chatbot prototyping", "Data import testing (JSON, Excel)"],
        technologies: ["React.js", "Basic AI Models", "Form Processing"]
      },
      validate: {
        title: "VALIDATE",
        activities: ["Welcome sequence optimization", "Real-time validation testing", "User experience refinement"],
        technologies: ["TypeScript", "Supabase", "Advanced AI Gateway", "Validation Middleware"]
      },
      deploy: {
        title: "DEPLOY", 
        activities: ["Automated verification deployment", "AI-driven guidance live", "Multi-channel communication"],
        technologies: ["Experian API", "CMS Verification", "Twilio SMS/Email", "Production AI Systems"]
      },
      outcomes: [
        "Faster onboarding experience",
        "Higher completion rates with AI guidance",
        "Reduced support burden during onboarding"
      ],
      integrations: ["Experian API check", "CMS verification", "Twilio SMS/Email"]
    },
    {
      landscape: "Customer Support",
      landscapeIcon: Phone,
      landscapeColor: "genie-accent",
      landscapeDescription: "Transforming customer service through AI-powered multi-channel support systems",
      id: "contact-center",
      title: "Contact Center AI Transformation",
      description: "Multi-channel AI-powered customer support with intelligent routing and response",
      experiment: {
        title: "EXPERIMENT",
        activities: ["Natural language IVR testing", "AI response prototyping", "Multi-channel integration trials"],
        technologies: ["Basic Twilio", "LLM Models", "Voice Processing"]
      },
      validate: {
        title: "VALIDATE",
        activities: ["Identity verification system testing", "Unified customer view validation", "Response accuracy assessment"],
        technologies: ["Advanced Twilio", "Customer Data APIs", "AI Gateway", "Real-time Processing"]
      },
      deploy: {
        title: "DEPLOY",
        activities: ["Smart IVR production deployment", "AI case management live", "Multi-channel orchestration"],
        technologies: ["Twilio WhatsApp/Voice/Email/SMS", "MCP", "Arize", "Production AI Systems"]
      },
      outcomes: [
        "Reduced customer wait times",
        "Improved first-call resolution",
        "Seamless multi-channel experience"
      ],
      integrations: ["Twilio (WhatsApp, Voice, Email, SMS)", "MCP", "Arize"]
    },
    {
      landscape: "Operations Management",
      landscapeIcon: Package,
      landscapeColor: "genie-primary",
      landscapeDescription: "Transforming operational efficiency through intelligent automation and optimization",
      id: "order-management",
      title: "Order Management & Tracking",
      description: "Real-time order processing with intelligent batch optimization and tracking",
      experiment: {
        title: "EXPERIMENT",
        activities: ["Order validation logic testing", "Batch optimization algorithms", "Basic tracking implementation"],
        technologies: ["React.js", "Basic APIs", "Scheduling Logic"]
      },
      validate: {
        title: "VALIDATE",
        activities: ["Batch scheduling optimization", "Real-time status system testing", "Predictive analytics validation"],
        technologies: ["TypeScript", "Supabase", "Advanced Scheduling", "Analytics APIs"]
      },
      deploy: {
        title: "DEPLOY", 
        activities: ["Intelligent validation live", "Automated batch scheduling", "Predictive issue resolution"],
        technologies: ["ERP Integrations", "MCP", "Production Optimization Systems", "Real-time Analytics"]
      },
      outcomes: [
        "Enhanced order visibility",
        "Optimized batch processing",
        "Improved delivery predictions"
      ],
      integrations: ["ERP integrations (under review)", "MCP"]
    }
  ];

  const experimentationInsights = [
    {
      insight: "Pattern Recognition",
      description: "AI experimentation reveals emerging transformation patterns across industries - discovering repeatable frameworks that work",
      icon: Brain,
      color: "genie-primary"
    },
    {
      insight: "Disruption Mapping", 
      description: "Understanding how AI fundamentally reshapes traditional workflows and creates entirely new operational possibilities",
      icon: Zap,
      color: "genie-secondary"
    },
    {
      insight: "Future Context Integration",
      description: "Learning to anticipate and prepare for emerging AI capabilities while building adaptable, forward-compatible systems",
      icon: Target,
      color: "genie-accent"
    },
    {
      insight: "Hands-on Discovery",
      description: "Real-world experimentation teaches practical limitations and unexpected opportunities that theory cannot predict",
      icon: Activity,
      color: "genie-teal"
    },
    {
      insight: "Multi-Agent Orchestration",
      description: "Exploring how different AI agents can collaborate effectively to solve complex, multi-step business challenges",
      icon: Network,
      color: "genie-primary"
    },
    {
      insight: "Iterative Learning Cycles",
      description: "Each AI experiment builds knowledge for the next - creating compound learning effects and accelerated innovation",
      icon: BarChart3,
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
                  className={`w-80 sm:w-96 flex-shrink-0 snap-start border-2 border-${useCase.landscapeColor}/30 bg-gradient-to-br from-${useCase.landscapeColor}/10 to-${useCase.landscapeColor}/5 hover:shadow-2xl hover:shadow-${useCase.landscapeColor}/20 transition-all duration-300 hover:scale-[1.03] hover:border-${useCase.landscapeColor}/50`}
                >
                  {/* Landscape Header */}
                  <div className={`p-4 bg-gradient-to-r from-${useCase.landscapeColor}/20 to-${useCase.landscapeColor}/10 border-b-2 border-${useCase.landscapeColor}/30`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 bg-gradient-to-br from-${useCase.landscapeColor}/30 to-${useCase.landscapeColor}/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <LandscapeIcon className={`w-6 h-6 text-${useCase.landscapeColor} drop-shadow-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-xl font-black text-${useCase.landscapeColor} truncate drop-shadow-sm`}>
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

                    {/* Remove old technologies section - now in 3-phase structure above */}

                    {/* Three Phase Structure */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
                        <Brain className="w-4 h-4" />
                        Experiment → Validate → Deploy
                      </h4>
                      <div className="space-y-2">
                        {/* Experiment Phase */}
                        <div className="border rounded p-2 bg-background/50">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-genie-primary text-white flex items-center justify-center text-xs font-bold">E</div>
                            <span className="text-xs font-medium">{useCase.experiment.title}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {useCase.experiment.technologies.slice(0, 3).map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-genie-primary/10 text-genie-primary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Validate Phase */}
                        <div className="border rounded p-2 bg-background/50">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-genie-teal text-white flex items-center justify-center text-xs font-bold">V</div>
                            <span className="text-xs font-medium">{useCase.validate.title}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {useCase.validate.technologies.slice(0, 3).map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-genie-teal/10 text-genie-teal">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Deploy Phase */}
                        <div className="border rounded p-2 bg-background/50">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 rounded-full bg-genie-cyan text-white flex items-center justify-center text-xs font-bold">D</div>
                            <span className="text-xs font-medium">{useCase.deploy.title}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {useCase.deploy.technologies.slice(0, 3).map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-genie-cyan/10 text-genie-cyan">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Journey Steps */}
                    {/* Journey steps are now integrated in the 3-phase structure above */}

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
              What I'm Learning Through <span className="text-genie-primary">AI Experimentation & Exploration</span>
            </h3>
          </div>

          {/* Horizontal Scrollable Insights Cards */}
          <div className="relative mb-8">
            <div 
              id="insights-scroll" 
              className="flex space-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
            >
              {experimentationInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                
                return (
                  <div key={index} className={`w-80 flex-shrink-0 snap-start text-center p-8 bg-gradient-to-br from-${insight.color}/10 to-background border-2 border-${insight.color}/20 rounded-xl shadow-lg hover:shadow-xl hover:shadow-${insight.color}/10 transition-all duration-300 hover:scale-105`}>
                    <div className={`w-20 h-20 bg-gradient-to-br from-${insight.color}/20 to-${insight.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <IconComponent className={`w-10 h-10 text-${insight.color} drop-shadow-sm`} />
                    </div>
                    <h4 className={`text-xl font-black text-${insight.color} mb-3 drop-shadow-sm`}>
                      {insight.insight}
                    </h4>
                    <p className="text-sm text-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls for Insights */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const container = document.getElementById('insights-scroll');
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
                {experimentationInsights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const container = document.getElementById('insights-scroll');
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
                  const container = document.getElementById('insights-scroll');
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