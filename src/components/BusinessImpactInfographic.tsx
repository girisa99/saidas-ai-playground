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
  const impactMetrics = [
    {
      category: "Learning Insights",
      icon: Brain,
      color: "genie-primary",
      metrics: [
        { value: "Validated", label: "Transformation Patterns", timeframe: "Through experimentation" },
        { value: "Documented", label: "Success Frameworks", timeframe: "Real-world testing" },
        { value: "Shared", label: "Knowledge Base", timeframe: "Community learning" }
      ]
    },
    {
      category: "Disruption Patterns", 
      icon: Zap,
      color: "genie-teal",
      metrics: [
        { value: "Rapid", label: "Industry Changes", timeframe: "Accelerating adoption" },
        { value: "Fundamental", label: "Process Shifts", timeframe: "Traditional → AI-driven" },
        { value: "Exponential", label: "Capability Growth", timeframe: "Technology advancement" }
      ]
    },
    {
      category: "Future Landscape",
      icon: Target,
      color: "genie-cyan", 
      metrics: [
        { value: "Emerging", label: "New Opportunities", timeframe: "AI-native approaches" },
        { value: "Evolving", label: "Skill Requirements", timeframe: "Human-AI collaboration" },
        { value: "Transforming", label: "Work Paradigms", timeframe: "Continuous adaptation" }
      ]
    }
  ];

  const currentWorkHighlights = [
    {
      area: "Patient Management",
      icon: Stethoscope,
      color: "genie-primary",
      title: "Healthcare AI Transformation",
      description: "Experimenting with patient onboarding and referral workflows",
      status: "Mixed Implementation",
      highlights: [
        "Patient onboarding automation experiments",
        "Referral process optimization",
        "Treatment center workflow improvements", 
        "Care coordination system testing"
      ],
      stage: "Active experimentation with some live implementations"
    },
    {
      area: "Oncology Workflows",
      icon: Factory,
      color: "genie-teal", 
      title: "Specialized Care Process Innovation",
      description: "Exploring automation vs agentic AI for oncology operations",
      status: "Development Phase",
      highlights: [
        "Technology selection framework development",
        "Oncology-specific workflow analysis",
        "Patient journey optimization studies",
        "Clinical decision support exploration"
      ],
      stage: "Research and development with pilot testing"
    },
    {
      area: "Customer Contact Center",
      icon: Building,
      color: "genie-cyan",
      title: "Contact Center AI Integration",
      description: "Building intelligent customer service capabilities",
      status: "Experimentation",
      highlights: [
        "Automated inquiry handling systems",
        "Customer service workflow optimization",
        "Response accuracy improvement testing",
        "Agent productivity enhancement tools"
      ],
      stage: "Proof of concept with expanding scope"
    }
  ];

  const disruptionInsights = [
    {
      insight: "Learning Through Experimentation",
      description: "Testing AI applications across various domains reveals transformation patterns",
      discovery: "Knowledge sharing accelerates understanding",
      icon: Brain,
      color: "genie-primary"
    },
    {
      insight: "Validated Disruption Patterns", 
      description: "Documenting how AI fundamentally changes traditional approaches",
      discovery: "Evidence-based insights shape future strategies",
      icon: Zap,
      color: "genie-teal"
    },
    {
      insight: "Collaborative Evolution",
      description: "Individual exploration combined with community knowledge builds collective wisdom", 
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
            How AI is Reshaping Our World: <span className="text-genie-primary">Validated Learning & Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Through experimentation and knowledge sharing, we're documenting how AI is fundamentally disrupting industries. 
            These insights come from hands-on testing, learning, and validating real-world applications across various sectors.
          </p>
        </div>

        {/* Impact Metrics Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {impactMetrics.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <Card key={index} className={`p-8 border-${category.color}/20 bg-gradient-to-br from-${category.color}/5 to-background hover:shadow-xl transition-all duration-300`}>
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-${category.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 text-${category.color}`} />
                  </div>
                  <h3 className={`text-xl font-bold text-${category.color} mb-2`}>
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {category.metrics.map((metric, i) => (
                    <div key={i} className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className={`text-3xl font-bold text-${category.color} mb-1`}>
                        {metric.value}
                      </div>
                      <div className="font-semibold text-foreground mb-1">
                        {metric.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.timeframe}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>


        {/* AI Disruption Insights */}
        <Card className="p-8 border-genie-primary/20 bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Validating the AI Transformation: What We're Learning
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Through hands-on experimentation and knowledge sharing, we're documenting how AI is fundamentally 
              reshaping industries and creating new paradigms for innovation and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {disruptionInsights.map((item, index) => {
              const IconComponent = item.icon;
              
              return (
                <div key={index} className="text-center">
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
                    Discovery: {item.discovery}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-genie-primary/20 to-genie-teal/20 rounded-lg border border-genie-primary/30">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Join the Learning Journey: Explore & Experiment Together
            </h4>
            <p className="text-muted-foreground mb-6">
              This exploration is ongoing - through individual experimentation and collective knowledge sharing, 
              we're building a deeper understanding of how AI continues to reshape our world.
            </p>
            <Link to="/journey">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                Continue to Explore Tech Exploration
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
};