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
  const landscapeExperiments = [
    {
      landscape: "Healthcare Innovation",
      icon: Stethoscope,
      color: "genie-primary",
      description: "Exploring AI-driven transformation in patient care and healthcare operations",
      experiments: [
        {
          title: "Patient Onboarding Automation",
          status: "Active Testing",
          description: "Streamlining patient registration and initial assessment workflows"
        },
        {
          title: "Referral Process Optimization",
          status: "Pilot Phase",
          description: "Enhancing coordination between healthcare providers and specialists"
        },
        {
          title: "Oncology Workflow Innovation",
          status: "Research Phase",
          description: "Testing automation vs agentic AI for specialized care operations"
        }
      ]
    },
    {
      landscape: "Customer Experience",
      icon: Building,
      color: "genie-teal",
      description: "Revolutionizing customer service and engagement through intelligent automation",
      experiments: [
        {
          title: "Contact Center AI Integration",
          status: "Proof of Concept",
          description: "Building intelligent customer service capabilities and response systems"
        },
        {
          title: "Automated Inquiry Handling",
          status: "Testing",
          description: "Developing smart routing and resolution for customer queries"
        },
        {
          title: "Agent Productivity Enhancement",
          status: "Early Testing",
          description: "Tools to augment human agents with AI-powered insights"
        }
      ]
    },
    {
      landscape: "Financial Services",
      icon: DollarSign,
      color: "genie-cyan",
      description: "Investigating AI applications in financial operations and customer experience",
      experiments: [
        {
          title: "Automated Financial Advisory",
          status: "Conceptual",
          description: "Prototyping personalized financial guidance systems"
        },
        {
          title: "Risk Assessment Innovation",
          status: "Research",
          description: "Developing intelligent risk evaluation algorithms"
        },
        {
          title: "Customer Onboarding Streamlining",
          status: "Early Development",
          description: "Simplifying account setup and verification processes"
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
            Through hands-on experimentation and shared learning, we're discovering how AI reshapes various industry landscapes. 
            Each experiment reveals new patterns and possibilities for transformation.
          </p>
        </div>

        {/* Landscape Experiments */}
        <div className="space-y-8 mb-16">
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

                <div className="grid md:grid-cols-3 gap-6">
                  {landscape.experiments.map((experiment, expIndex) => (
                    <div key={expIndex} className="p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className={`text-${landscape.color} border-${landscape.color}/30`}>
                          {experiment.status}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {experiment.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {experiment.description}
                      </p>
                    </div>
                  ))}
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
                Ready to explore comprehensive business applications and proven use cases?
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