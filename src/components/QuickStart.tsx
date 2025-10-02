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
      value: "2",
      label: "Live Features Deployed",
      color: "text-green-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: "10+",
      label: "Experiments Across Pipeline", 
      color: "text-blue-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      value: "80+",
      label: "Knowledge Contexts",
      color: "text-purple-600"
    }
  ];

  const proofPoints = [
    {
      title: "Genie Conversational AI Experiment",
      subtitle: "🌟 LIVE: Sharing Real Outcomes from 80+ Knowledge Contexts",
      description: "Active AI experimentation with documented results demonstrating how AI transforms development. Shared case studies include: multi-model intelligence (Gemini 2.5, GPT-5), split-screen conversations, sophisticated RAG architecture. Published learnings: successfully handling 1,000+ concurrent scenarios, achieving <2.5s response times, proven system design patterns. Thought leadership through hands-on experimentation.",
      icon: <Code className="h-8 w-8" />,
      link: "/case-studies",
      status: "Active Experiment",
      highlight: "Personal AI Learning",
      statusColor: "bg-genie-accent/20 text-genie-accent border-genie-accent/30",
      color: "from-genie-accent/20 to-genie-primary/20",
      iconBg: "bg-genie-accent",
      borderColor: "border-genie-accent/30"
    },
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
            Value Delivered
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven <span className="text-primary">Value Creation</span> Framework
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <strong>2 Live Features with Documented Outcomes:</strong> GenieAI Hub Platform & Genie Conversational AI with 80+ knowledge contexts. 
            Sharing real learnings and case studies proving how AI disrupts development - proven results in scalability (1,000+ concurrent conversations), performance optimization (&lt;2.5s response times), and system reliability (99.9% uptime).
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

        {/* Learning Path Navigation */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-background border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Gartner Value Creation in Action</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              See how our AI experimentation framework delivers measurable business value across all stakeholder groups through systematic implementation and validation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/journey">
                <Button size="lg" className="w-full sm:w-auto">
                  <Target className="w-4 h-4 mr-2" />
                  My Learning Journey
                </Button>
              </Link>
              <Link to="/technology-stack">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Code className="w-4 h-4 mr-2" />
                  Technology Stack
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};