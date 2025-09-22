import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap, Target, Shield, Activity } from "lucide-react";

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "AI-Powered Patient Management System",
      category: "Healthcare Digital Transformation",
      impact: "300% ROI in 6 months",
      description: "Implemented RAG architecture achieving 94% accuracy in patient data processing and automated workflow management for treatment centers.",
      tags: ["RAG Architecture", "Healthcare AI", "Automation"],
      icon: Activity,
      metrics: [
        { label: "Accuracy Rate", value: "94%" },
        { label: "Processing Speed", value: "5x faster" },
        { label: "ROI", value: "300%" }
      ]
    },
    {
      id: 2,
      title: "Multi-Agent Healthcare Ecosystem",
      category: "Enterprise AI Solutions",
      impact: "Streamlined 15+ AI models",
      description: "Built dynamic multi-agent systems integrating 15+ AI models for comprehensive healthcare workflow automation and decision support.",
      tags: ["Multi-Agent Systems", "LLM Integration", "Enterprise Scale"],
      icon: Users,
      metrics: [
        { label: "Models Integrated", value: "15+" },
        { label: "Workflow Efficiency", value: "85%" },
        { label: "Decision Accuracy", value: "92%" }
      ]
    },
    {
      id: 3,
      title: "Manufacturing Process Optimization",
      category: "Industrial AI Implementation",
      impact: "Reduced downtime by 60%",
      description: "Applied AI frameworks to manufacturing workflows, demonstrating cross-industry applicability of healthcare-proven solutions.",
      tags: ["Process Optimization", "Predictive Analytics", "Cross-Industry"],
      icon: Target,
      metrics: [
        { label: "Downtime Reduction", value: "60%" },
        { label: "Process Efficiency", value: "78%" },
        { label: "Cost Savings", value: "$2.3M" }
      ]
    },
    {
      id: 4,
      title: "Digital Therapeutics Platform",
      category: "Healthcare Innovation",
      impact: "Improved patient outcomes",
      description: "Developed AI-driven digital therapeutics solutions with measurable healthcare transformation and patient engagement metrics.",
      tags: ["Digital Health", "Patient Engagement", "Outcome Measurement"],
      icon: Shield,
      metrics: [
        { label: "Patient Engagement", value: "89%" },
        { label: "Outcome Improvement", value: "67%" },
        { label: "Treatment Adherence", value: "84%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-genie-teal/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Real-World Impact
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                AI Success <span className="text-genie-primary">Stories</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Proven results from implementing AI solutions across healthcare, manufacturing, 
                and enterprise environments. Real metrics, honest insights, and measurable impact.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => {
                const IconComponent = study.icon;
                return (
                  <Card key={study.id} className="p-8 border-genie-primary/20 hover:border-genie-primary/40 transition-colors">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-genie-primary/10 rounded-lg">
                        <IconComponent className="w-6 h-6 text-genie-primary" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {study.category}
                        </Badge>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {study.title}
                        </h3>
                        <p className="text-genie-primary font-semibold mb-4">
                          {study.impact}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {study.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-genie-primary/5 rounded-lg">
                      {study.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center">
                          <div className="text-lg font-bold text-genie-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full border-genie-primary/30 text-genie-primary hover:bg-genie-primary/10"
                    >
                      Learn More About This Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Impact Summary */}
        <section className="py-16 bg-gradient-to-b from-genie-dark/5 to-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Collective Impact Metrics
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Measurable results across all AI implementation projects
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <Card className="p-6">
                <Zap className="w-8 h-8 text-genie-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-genie-primary mb-2">15+</div>
                <div className="text-muted-foreground">AI Models Deployed</div>
              </Card>
              <Card className="p-6">
                <TrendingUp className="w-8 h-8 text-genie-teal mx-auto mb-4" />
                <div className="text-3xl font-bold text-genie-teal mb-2">300%</div>
                <div className="text-muted-foreground">Average ROI</div>
              </Card>
              <Card className="p-6">
                <Target className="w-8 h-8 text-genie-cyan mx-auto mb-4" />
                <div className="text-3xl font-bold text-genie-cyan mb-2">94%</div>
                <div className="text-muted-foreground">Peak Accuracy Rate</div>
              </Card>
              <Card className="p-6">
                <Shield className="w-8 h-8 text-genie-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-genie-primary mb-2">100%</div>
                <div className="text-muted-foreground">Enterprise Compliance</div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;