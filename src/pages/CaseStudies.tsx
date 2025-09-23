import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { GammaIntegrationWidget } from "@/components/GammaIntegrationWidget";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap, Target, Shield, Activity, ArrowLeft, Award, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import successStoriesBg from "@/assets/hero-success-stories.jpg";

const CaseStudies = () => {
  useEffect(() => {
    document.title = "Case Studies - Genie AI Experimentation HUB";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real AI implementation success stories - proven results across healthcare, manufacturing, and enterprise environments.');
    }
  }, []);

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
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${successStoriesBg})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-genie-dark/90 via-genie-primary/75 to-genie-secondary/80" />
        
        {/* Success Metrics Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-genie-accent/30 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 6 + 3}px`,
                height: `${Math.random() * 6 + 3}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6 sm:mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="max-w-5xl">
            <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30 mb-3 sm:mb-4">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Learning Outcomes
            </Badge>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              What I <span className="text-genie-accent">Built</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-6 sm:mb-8 px-2">
              Real applications and experiments showcasing how AI tools enable rapid development 
              and innovation - from healthcare solutions to business applications.
            </p>
            
            {/* Impact Metrics Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Development Speed</h3>
                <p className="text-white/80 text-xs">10x faster with AI tools</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Learning Curve</h3>
                <p className="text-white/80 text-xs">Accessible to non-developers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Experimentation</h3>
                <p className="text-white/80 text-xs">Rapid prototyping enabled</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-genie-accent mb-2" />
                <h3 className="font-semibold text-white text-xs sm:text-sm">Knowledge Sharing</h3>
                <p className="text-white/80 text-xs">Open source insights</p>
              </div>
            </div>
            
            {/* Action Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 px-2">
              <Button 
                variant="default"
                size="lg"
                className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Explore My Projects
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 w-full sm:w-auto"
                asChild
              >
                <Link to="/journey">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  See My Learning Path
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <main>
        {/* Case Studies Grid */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Gamma Integration Widget for Case Studies */}
            <div className="mb-12 max-w-md mx-auto">
              <GammaIntegrationWidget
                contentType="case-study"
                title="Case Studies Presentation"
                description="Generate professional presentation showcasing AI implementation success stories with metrics and outcomes"
                data={caseStudies}
              />
            </div>
            
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
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {study.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Key Metrics</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {study.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                            <div className="text-xl font-bold text-genie-primary">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-br from-genie-primary/5 to-genie-secondary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how these proven AI strategies can be adapted for your organization's unique challenges and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/journey">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Start Your Journey
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/technology">
                  <Zap className="w-4 h-4 mr-2" />
                  Explore Technology
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudies;