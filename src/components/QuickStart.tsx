import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Search, 
  Code, 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Stethoscope,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

export const QuickStart = () => {
  const successMetrics = [
    {
      icon: <Target className="h-6 w-6" />,
      value: "4+",
      label: "Business Cases Documented",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "2",
      label: "Case Studies Completed", 
      color: "text-blue-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "1",
      label: "Live Implementation",
      color: "text-purple-600"
    }
  ];

  const proofPoints = [
    {
      title: "Patient Onboarding Automation",
      subtitle: "Healthcare AI Implementation",
      description: "Complete transformation of patient enrollment process using automation and agentic AI. Documented every step from business case to implementation.",
      icon: <Stethoscope className="h-8 w-8" />,
      link: "/case-studies",
      status: "Case Study Available",
      statusColor: "bg-green-100 text-green-700",
      color: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-green-500",
      borderColor: "border-green-500/30"
    },
    {
      title: "Business Use Cases Framework", 
      subtitle: "Automation vs Agentic AI Decision Model",
      description: "Strategic analysis of when to use automation versus agentic AI across multiple healthcare scenarios. Interactive journey mapping included.",
      icon: <Briefcase className="h-8 w-8" />,
      link: "/business-use-cases",
      status: "Interactive Analysis",
      statusColor: "bg-blue-100 text-blue-700",
      color: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500", 
      borderColor: "border-blue-500/30"
    },
    {
      title: "Technology Stack Deep Dive",
      subtitle: "No-Code to Full-Stack Implementation",
      description: "Comprehensive analysis of 20+ AI tools and platforms. From no-code solutions to full development stacks with real implementation examples.",
      icon: <Code className="h-8 w-8" />,
      link: "/technology-stack",
      status: "Technology Analysis",
      statusColor: "bg-purple-100 text-purple-700",
      color: "from-purple-500/20 to-indigo-500/20",
      iconBg: "bg-purple-500",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <CheckCircle className="w-4 h-4 mr-2" />
            Learning Outcomes
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real <span className="text-primary">Learning</span> From Real <span className="text-primary">Experiments</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build your AI expertise through documented experiments and proven methodologies. 
            Learn what works, what doesn't, and position yourself as a change agent in your field.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {successMetrics.map((stat, index) => (
            <Card key={index} className="p-6 text-center bg-gradient-to-br from-background to-primary/5 border-primary/20">
              <div className={`w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Proof Points */}
        <div className="space-y-8">
          {proofPoints.map((proof, index) => (
            <Card key={index} className={`p-8 bg-gradient-to-br ${proof.color} ${proof.borderColor} border-2 hover:scale-105 transition-all duration-300 group`}>
              <div className="flex items-start space-x-6">
                <div className={`flex-shrink-0 p-4 ${proof.iconBg}/10 rounded-xl`}>
                  <div className={`${proof.iconBg.replace('bg-', 'text-')}`}>
                    {proof.icon}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {proof.title}
                      </h3>
                      <p className="text-lg font-medium text-muted-foreground mb-2">
                        {proof.subtitle}
                      </p>
                    </div>
                    <Badge className={proof.statusColor}>
                      {proof.status}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {proof.description}
                  </p>
                  
                  <Link to={proof.link}>
                    <Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Explore Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-background border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to See More?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Dive deeper into specific implementations, explore the decision frameworks, 
              or learn about the technology stacks that made these successes possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/business-use-cases">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore All Business Cases
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};