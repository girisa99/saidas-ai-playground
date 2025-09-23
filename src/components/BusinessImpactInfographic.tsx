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
        { value: "150-300%", label: "Average ROI", timeframe: "12-18 months" },
        { value: "35-50%", label: "Annual Cost Savings", timeframe: "Customer service automation" },
        { value: "70%", label: "Development Cost Reduction", timeframe: "AI-accelerated processes" }
      ]
    },
    {
      category: "Operational Efficiency", 
      icon: Clock,
      color: "genie-teal",
      metrics: [
        { value: "60%", label: "Automated Inquiries", timeframe: "Reducing support workload" },
        { value: "15-20%", label: "Employee Time Savings", timeframe: "Across departments" },
        { value: "30%", label: "Research Time Reduction", timeframe: "With 25% accuracy improvement" }
      ]
    },
    {
      category: "Innovation Speed",
      icon: Rocket,
      color: "genie-cyan", 
      metrics: [
        { value: "2x", label: "Faster Development", timeframe: "vs traditional methods" },
        { value: "Weeks", label: "Not Months", timeframe: "Time to market" },
        { value: "94%", label: "Accuracy Rate", timeframe: "Hallucination reduction" }
      ]
    }
  ];

  const realWorldCases = [
    {
      industry: "Healthcare",
      icon: Stethoscope,
      color: "genie-primary",
      title: "Patient Management Revolution",
      description: "Comprehensive healthcare solution deployment",
      outcomes: [
        "Automated patient onboarding workflows",
        "Secure data handling and compliance",
        "Treatment center operational optimization", 
        "Real-time care coordination"
      ],
      impact: "300% ROI within 18 months"
    },
    {
      industry: "Manufacturing",
      icon: Factory,
      color: "genie-teal", 
      title: "Production Process Automation",
      description: "Manufacturing partner integration and automation",
      outcomes: [
        "Streamlined partner onboarding",
        "Automated quality control processes",
        "Supply chain optimization",
        "Predictive maintenance protocols"
      ],
      impact: "60% operational efficiency gain"
    },
    {
      industry: "Enterprise",
      icon: Building,
      color: "genie-cyan",
      title: "Digital Transformation Platform",
      description: "Enterprise-wide AI adoption framework",
      outcomes: [
        "Cross-departmental automation",
        "Intelligent decision support systems",
        "Workforce augmentation tools",
        "Scalable AI infrastructure"
      ],
      impact: "25% decision accuracy improvement"
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
            Proven Business Impact: <span className="text-genie-primary">Real-World Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Demonstrable outcomes from systematic AI implementation across healthcare, manufacturing, 
            and enterprise sectors with quantifiable ROI and operational improvements.
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

        {/* Real-World Case Studies */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Real-World Case Studies & Implementations
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Actual deployments across diverse industries demonstrating the versatility 
              and effectiveness of AI experimentation hub methodologies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {realWorldCases.map((caseStudy, index) => {
              const IconComponent = caseStudy.icon;
              
              return (
                <Card key={index} className={`p-8 border-${caseStudy.color}/20 hover:border-${caseStudy.color}/40 transition-all duration-300 bg-gradient-to-br from-${caseStudy.color}/5 to-background group`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 bg-${caseStudy.color}/10 rounded-lg`}>
                      <IconComponent className={`w-6 h-6 text-${caseStudy.color}`} />
                    </div>
                    <div>
                      <Badge className={`bg-${caseStudy.color}/20 text-${caseStudy.color} border-${caseStudy.color}/30 mb-2`}>
                        {caseStudy.industry}
                      </Badge>
                      <h4 className={`text-lg font-bold text-${caseStudy.color}`}>
                        {caseStudy.title}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {caseStudy.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {caseStudy.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 text-${caseStudy.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm text-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 bg-${caseStudy.color}/10 rounded-lg border border-${caseStudy.color}/20`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className={`w-4 h-4 text-${caseStudy.color}`} />
                      <span className="text-sm font-semibold text-foreground">Key Impact:</span>
                    </div>
                    <div className={`text-sm font-bold text-${caseStudy.color}`}>
                      {caseStudy.impact}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
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