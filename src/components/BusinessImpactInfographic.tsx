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
  const visionHighlights = [
    {
      category: "Innovation Leadership",
      icon: Rocket,
      color: "genie-primary",
      gradient: "from-genie-primary/20 to-genie-primary/5",
      vision: "Pioneering AI experimentation that transforms healthcare workflows",
      impact: "Leading the future of intelligent healthcare automation"
    },
    {
      category: "Experimentation Excellence", 
      icon: Brain,
      color: "genie-teal",
      gradient: "from-genie-teal/20 to-genie-teal/5",
      vision: "Building bridges between cutting-edge AI and real-world applications",
      impact: "Turning complex AI concepts into practical healthcare solutions"
    },
    {
      category: "Technology Navigation",
      icon: Target,
      color: "genie-cyan", 
      gradient: "from-genie-cyan/20 to-genie-cyan/5",
      vision: "Your guide through the rapidly evolving AI landscape",
      impact: "Empowering teams to make confident technology decisions"
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
    <section className="py-20 bg-gradient-to-b from-background via-genie-dark/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-6 animate-pulse">
            <BarChart3 className="w-4 h-4 mr-2" />
            Experimentation Hub Impact
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-genie-primary via-genie-teal to-genie-cyan bg-clip-text text-transparent">
            Transforming Vision into <span className="italic">Reality</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Where cutting-edge AI experimentation meets real-world healthcare challenges. 
            Experience the journey from concept to implementation in our living laboratory of innovation.
          </p>
        </div>

        {/* Vision Highlights */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {visionHighlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            
            return (
              <Card key={index} className={`group p-8 border-${highlight.color}/20 bg-gradient-to-br ${highlight.gradient} hover:shadow-2xl hover:shadow-${highlight.color}/10 transition-all duration-500 hover:scale-105 relative overflow-hidden`}>
                {/* Floating Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${highlight.color}/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br from-${highlight.color}/20 to-${highlight.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500`}>
                      <IconComponent className={`w-10 h-10 text-${highlight.color} group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className={`text-2xl font-bold text-${highlight.color} mb-4 group-hover:text-${highlight.color} transition-colors duration-300`}>
                      {highlight.category}
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-background/60 rounded-xl border border-${highlight.color}/10 backdrop-blur-sm">
                      <div className="text-lg font-bold text-foreground mb-3 leading-relaxed">
                        {highlight.vision}
                      </div>
                      <div className={`text-sm text-${highlight.color} font-medium`}>
                        {highlight.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Current Work Highlights */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Current Experimentation Hub Highlights
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Active experiments and implementations across healthcare, oncology, and customer service sectors. 
              Exploring various AI scenarios with mixed implementation statuses as part of our ongoing experimentation initiatives.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {currentWorkHighlights.map((workArea, index) => {
              const IconComponent = workArea.icon;
              
              return (
                <Card key={index} className={`p-8 border-${workArea.color}/20 hover:border-${workArea.color}/40 transition-all duration-300 bg-gradient-to-br from-${workArea.color}/5 to-background group`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 bg-${workArea.color}/10 rounded-lg`}>
                      <IconComponent className={`w-6 h-6 text-${workArea.color}`} />
                    </div>
                    <div>
                      <Badge className={`bg-${workArea.color}/20 text-${workArea.color} border-${workArea.color}/30 mb-2`}>
                        {workArea.status}
                      </Badge>
                      <h4 className={`text-lg font-bold text-${workArea.color}`}>
                        {workArea.title}
                      </h4>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {workArea.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {workArea.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 text-${workArea.color} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm text-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 bg-${workArea.color}/10 rounded-lg border border-${workArea.color}/20`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className={`w-4 h-4 text-${workArea.color}`} />
                      <span className="text-sm font-semibold text-foreground">Current Stage:</span>
                    </div>
                    <div className={`text-sm font-bold text-${workArea.color}`}>
                      {workArea.stage}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Link to detailed use cases */}
          <div className="text-center mt-12">
            <Link to="/business-use-cases">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                Explore Detailed Use Case Explorations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Experimentation Philosophy */}
        <Card className="p-12 border-genie-primary/20 bg-gradient-to-r from-genie-primary/5 via-genie-teal/5 to-genie-cyan/5 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-genie-primary/10 via-transparent to-genie-cyan/10 animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-genie-primary/20 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-genie-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">
                  The Power of Strategic AI Experimentation
                </h3>
                <div className="w-12 h-12 bg-genie-cyan/20 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-genie-cyan" />
                </div>
              </div>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                In healthcare's rapidly evolving landscape, the difference between leading and following lies in how we approach AI innovation. 
                Our experimentation hub isn't just about testing technologies—it's about crafting the future of patient care.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-genie-primary mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Why Experimentation Matters
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-background/60 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-genie-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Risk-Free Innovation</div>
                      <div className="text-sm text-muted-foreground">Test concepts before full implementation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-background/60 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-genie-teal mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Evidence-Based Decisions</div>
                      <div className="text-sm text-muted-foreground">Data-driven technology selection</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-background/60 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-genie-cyan mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Rapid Iteration</div>
                      <div className="text-sm text-muted-foreground">Quick learning and adaptation cycles</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-genie-teal mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6" />
                  Our Unique Approach
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-background/60 rounded-lg">
                    <Award className="w-5 h-5 text-genie-primary mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Healthcare-First Design</div>
                      <div className="text-sm text-muted-foreground">Built specifically for healthcare workflows</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-background/60 rounded-lg">
                    <Award className="w-5 h-5 text-genie-teal mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Real-World Testing</div>
                      <div className="text-sm text-muted-foreground">Authentic scenarios, measurable outcomes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-background/60 rounded-lg">
                    <Award className="w-5 h-5 text-genie-cyan mt-1" />
                    <div>
                      <div className="font-semibold text-foreground">Collaborative Innovation</div>
                      <div className="text-sm text-muted-foreground">Working together to shape the future</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-r from-genie-primary/20 to-genie-teal/20 rounded-xl border border-genie-primary/30">
              <h4 className="text-2xl font-bold text-foreground mb-4">
                Ready to Explore the Possibilities?
              </h4>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Dive deeper into our experimentation journey and discover how we're transforming healthcare through intelligent AI implementation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/business-use-cases">
                  <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4 group">
                    Explore Use Case Experiments
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/journey">
                  <Button variant="outline" size="lg" className="border-genie-primary/30 text-genie-primary hover:bg-genie-primary/10 px-8 py-4">
                    View Innovation Journey
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};