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
      category: "Financial Impact",
      icon: DollarSign,
      color: "genie-primary",
      metrics: [
        { value: "Potential", label: "ROI Through Experimentation", timeframe: "12-18 months" },
        { value: "10%+", label: "Annual Cost Reduction", timeframe: "Addressing YoY pressure" },
        { value: "Significant", label: "Development Cost Savings", timeframe: "AI-accelerated processes" }
      ]
    },
    {
      category: "Operational Efficiency", 
      icon: Clock,
      color: "genie-teal",
      metrics: [
        { value: "High", label: "Automation Potential", timeframe: "Reducing operational workload" },
        { value: "Substantial", label: "Employee Time Savings", timeframe: "Focus on innovation areas" },
        { value: "Enhanced", label: "Core Business Focus", timeframe: "Through process automation" }
      ]
    },
    {
      category: "Innovation Speed",
      icon: Rocket,
      color: "genie-cyan", 
      metrics: [
        { value: "2x", label: "Faster Development", timeframe: "vs traditional methods" },
        { value: "Weeks", label: "Not Months", timeframe: "Time to market" },
        { value: "Focus", label: "On Innovation", timeframe: "Employee time reallocation" }
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

  const competitiveAdvantages = [
    {
      advantage: "First-Mover Advantage",
      description: "AI-powered competitors out-innovate and out-deliver",
      risk: "10-15% annual market share loss for delayed adopters",
      icon: Target,
      color: "genie-primary"
    },
    {
      advantage: "Operational Excellence", 
      description: "Streamlined processes vs manual, outdated workflows",
      risk: "20-30% higher operational costs for non-adopters",
      icon: Zap,
      color: "genie-teal"
    },
    {
      advantage: "Future Relevance",
      description: "AI-driven methodologies for sustainable growth", 
      risk: "Risk of irrelevance within 3-5 years",
      icon: Brain,
      color: "genie-cyan"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-genie-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Business Impact Analysis
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Business Impact Possibilities: <span className="text-genie-primary">Real-World Results Potential</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experimentation hub insights show strong potential for development cost reduction, addressing 10% YoY operational cost pressure, 
            and achieving ROI through automation that frees employees to focus on innovation and core business areas.
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


        {/* Competitive Advantage Analysis */}
        <Card className="p-8 border-genie-primary/20 bg-gradient-to-r from-genie-primary/10 via-genie-teal/10 to-genie-cyan/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              The Cost of Hesitation vs. AI Adoption
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Organizations that delay AI adoption face rapid erosion of market position, 
              while early adopters gain sustainable competitive advantages.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {competitiveAdvantages.map((item, index) => {
              const IconComponent = item.icon;
              
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-${item.color}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 text-${item.color}`} />
                  </div>
                  <h4 className={`text-lg font-bold text-${item.color} mb-2`}>
                    {item.advantage}
                  </h4>
                  <p className="text-sm text-foreground mb-3">
                    {item.description}
                  </p>
                  <div className="text-xs text-red-600 font-medium p-2 bg-red-50 rounded border border-red-200">
                    Risk: {item.risk}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-genie-primary/20 to-genie-teal/20 rounded-lg border border-genie-primary/30">
            <h4 className="text-xl font-bold text-foreground mb-4">
              Strategic Decision Point: Act Now or Fall Behind
            </h4>
            <p className="text-muted-foreground mb-6">
              A clear distinction is forming: AI-empowered organizations are set for exponential growth, 
              while those maintaining the status quo risk stagnation and irrelevance.
            </p>
            <Link to="/journey">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                Explore Implementation Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
};