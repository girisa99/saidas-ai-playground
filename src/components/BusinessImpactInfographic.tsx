import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Factory
} from "lucide-react";
import { Link } from "react-router-dom";

export const BusinessImpactInfographic = () => {
  const experimentalUseCases = [
    {
      area: "Patient Management",
      icon: Stethoscope,
      color: "genie-primary",
      title: "Healthcare AI Experimentation",
      description: "Exploring patient onboarding and referral workflow automation",
      status: "Mixed Implementation",
      highlights: [
        "Patient onboarding automation experiments",
        "Referral process optimization testing",
        "Treatment center workflow exploration", 
        "Care coordination system prototyping"
      ],
      stage: "Active experimentation with pilot implementations"
    },
    {
      area: "Oncology Workflows",
      icon: Factory,
      color: "genie-teal", 
      title: "Specialized Care Process Innovation",
      description: "Testing automation vs agentic AI for oncology operations",
      status: "Development Phase",
      highlights: [
        "Technology selection framework exploration",
        "Oncology-specific workflow analysis",
        "Patient journey optimization experiments",
        "Clinical decision support testing"
      ],
      stage: "Research and development with concept validation"
    },
    {
      area: "Customer Contact Center",
      icon: Building,
      color: "genie-cyan",
      title: "Contact Center AI Integration",
      description: "Building intelligent customer service capabilities",
      status: "Experimentation",
      highlights: [
        "Automated inquiry handling experiments",
        "Customer service workflow testing",
        "Response accuracy improvement pilots",
        "Agent productivity enhancement trials"
      ],
      stage: "Proof of concept with expanding scope"
    },
    {
      area: "Financial Services",
      icon: DollarSign,
      color: "genie-primary",
      title: "FinTech AI Exploration",
      description: "Investigating AI applications in financial operations and customer experience",
      status: "Early Exploration",
      highlights: [
        "Automated financial advisory prototyping",
        "Risk assessment algorithm testing",
        "Customer onboarding streamlining experiments",
        "Fraud detection mechanism exploration"
      ],
      stage: "Conceptual development with market research"
    }
  ];

  const disruptionInsights = [
    {
      insight: "Learning Through Exploration",
      description: "Testing AI applications across various domains reveals emerging transformation patterns",
      discovery: "Individual insights shared with community",
      icon: Brain,
      color: "genie-primary"
    },
    {
      insight: "Disruption Possibilities", 
      description: "Observing how AI might fundamentally change traditional approaches",
      discovery: "Patterns suggest new paradigms emerging",
      icon: Zap,
      color: "genie-teal"
    },
    {
      insight: "Collective Exploration",
      description: "Individual experimentation combined with shared knowledge builds understanding", 
      discovery: "Shared experiences drive innovation",
      icon: Target,
      color: "genie-cyan"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-genie-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Landscape Disruption Analysis
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How AI is Reshaping <span className="text-genie-primary">Various Landscapes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Through individual experimentation and knowledge sharing, exploring how AI is fundamentally transforming industries. 
            These insights emerge from hands-on testing and learning across various sectors. What patterns do you see emerging?
          </p>
        </div>

        {/* Combined AI Landscape Exploration Section */}
        <Card className="p-8 border-genie-primary/20 bg-gradient-to-br from-genie-primary/5 to-background mb-16">
          <div className="text-center mb-12">
            <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
              <BarChart3 className="w-4 h-4 mr-2" />
              AI Landscape Exploration
            </Badge>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              How AI is Reshaping <span className="text-genie-primary">Various Landscapes</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Through individual experimentation and knowledge sharing, exploring how AI is fundamentally transforming industries. 
              These insights emerge from hands-on testing and learning across various sectors. What patterns do you see emerging?
            </p>
          </div>

          {/* Experimental Use Cases Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {experimentalUseCases.map((useCase, index) => {
              const IconComponent = useCase.icon;
              
              return (
                <Card key={index} className={`p-6 border-${useCase.color}/20 bg-gradient-to-br from-${useCase.color}/5 to-background hover:shadow-lg transition-all duration-300`}>
                  <div className="mb-4">
                    <div className={`w-12 h-12 bg-${useCase.color}/10 rounded-lg flex items-center justify-center mb-3`}>
                      <IconComponent className={`w-6 h-6 text-${useCase.color}`} />
                    </div>
                    <Badge variant="outline" className={`text-${useCase.color} border-${useCase.color}/30 mb-2`}>
                      {useCase.status}
                    </Badge>
                    <h4 className={`text-lg font-bold text-${useCase.color} mb-2`}>
                      {useCase.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {useCase.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {useCase.highlights.slice(0, 3).map((highlight, i) => (
                      <div key={i} className="flex items-start text-sm">
                        <CheckCircle className={`w-4 h-4 text-${useCase.color} mr-2 mt-0.5 flex-shrink-0`} />
                        <span className="text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`text-xs text-${useCase.color} font-medium p-2 bg-${useCase.color}/10 rounded border border-${useCase.color}/20`}>
                    Stage: {useCase.stage}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Exploration Insights */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {disruptionInsights.map((item, index) => {
              const IconComponent = item.icon;
              
              return (
                <div key={index} className="text-center p-6 bg-gradient-to-br from-background to-muted/20 rounded-lg border border-border/50">
                  <div className={`w-16 h-16 bg-${item.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 text-${item.color}`} />
                  </div>
                  <h4 className={`text-lg font-bold text-${item.color} mb-2`}>
                    {item.insight}
                  </h4>
                  <p className="text-sm text-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="text-xs text-genie-primary font-medium p-2 bg-genie-primary/10 rounded border border-genie-primary/20">
                    {item.discovery}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gradient-to-r from-genie-primary/10 to-genie-teal/10 rounded-lg border border-genie-primary/20">
              <p className="text-muted-foreground mb-4">
                Interested in exploring more comprehensive business applications and use cases?
              </p>
              <Link to="/business-use-cases">
                <Button variant="outline" className="border-genie-primary text-genie-primary hover:bg-genie-primary hover:text-white">
                  Explore Business Use Cases
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-r from-genie-primary/20 to-genie-teal/20 rounded-lg border border-genie-primary/30">
              <p className="text-muted-foreground mb-4">
                This exploration continues - through individual experimentation and shared insights, building understanding of how AI might reshape various landscapes.
              </p>
              <Link to="/journey">
                <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white">
                  Continue to Explore Tech Exploration
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