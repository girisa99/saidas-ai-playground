import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GammaIntegrationWidget } from "@/components/GammaIntegrationWidget";
import { 
  Brain, 
  Database, 
  Zap, 
  Code2, 
  Network, 
  Shield, 
  Layers, 
  GitBranch,
  Cpu,
  Cloud,
  Lock,
  BarChart3,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const TechnologyStackSection = () => {
  const technologies = [
    {
      category: "No-Code/Low-Code Platforms",
      icon: Brain,
      color: "genie-primary",
      description: "Democratizing AI development with platforms that enable rapid innovation without deep technical expertise",
      items: [
        { name: "Loveable", type: "Full-Stack Development" },
        { name: "Bolt AI", type: "Rapid Prototyping" },
        { name: "Bubble", type: "Web Applications" },
        { name: "Softgen", type: "AI-Powered Building" },
        { name: "Horizons", type: "Business Applications" },
        { name: "V0 by Vercel", type: "UI Generation" }
      ]
    },
    {
      category: "Coding Platforms & Tools",
      icon: Code2,
      color: "genie-teal",
      description: "Advanced development platforms that streamline workflows and boost developer productivity by 30%",
      items: [
        { name: "Cursor IDE", type: "AI-Assisted Development" },
        { name: "Replit", type: "Collaborative Coding" },
        { name: "GitHub Copilot", type: "Code Suggestions" },
        { name: "TypeScript", type: "Type-Safe Development" },
        { name: "Docker", type: "Containerization" },
        { name: "Kubernetes", type: "Orchestration" }
      ]
    },
    {
      category: "Large Language Models (LLMs)",
      icon: Brain,
      color: "genie-cyan",
      description: "Core AI models revolutionizing content generation, summarization, and complex problem-solving",
      items: [
        { name: "GPT-4 Turbo", type: "OpenAI Language Model" },
        { name: "Claude 3 Opus", type: "Anthropic AI" },
        { name: "Gemini Pro", type: "Google AI" },
        { name: "Llama 3", type: "Meta AI" },
        { name: "Small Language Models", type: "Edge Optimization" },
        { name: "Fine-tuned Models", type: "Domain-Specific" }
      ]
    },
    {
      category: "Agentic AI & Orchestration",
      icon: Network,
      color: "genie-primary",
      description: "Autonomous systems that plan and execute complex tasks, reducing operational costs by up to 40%",
      items: [
        { name: "Multi-Agent Systems", type: "Task Orchestration" },
        { name: "Dynamic Agent Generation", type: "Specialized Roles" },
        { name: "Workflow Automation", type: "Process Intelligence" },
        { name: "Model Context Protocols", type: "Integration Layer" },
        { name: "Agent Communication", type: "Collaborative AI" },
        { name: "Decision Trees", type: "Logic Frameworks" }
      ]
    },
    {
      category: "Data Infrastructure & ML",
      icon: Database,
      color: "genie-teal",
      description: "Integrated machine learning development from data preparation to deployment with enterprise scalability",
      items: [
        { name: "Vertex AI", type: "Google ML Platform" },
        { name: "Vector Databases", type: "Embedding Storage" },
        { name: "RAG Architecture", type: "Retrieval-Augmented Generation" },
        { name: "Labeling Studio", type: "Data Annotation" },
        { name: "MLflow", type: "Model Management" },
        { name: "Apache Airflow", type: "Workflow Orchestration" }
      ]
    },
    {
      category: "Security & Compliance",
      icon: Shield,
      color: "genie-cyan",
      description: "Enterprise security frameworks ensuring ethical AI deployment and regulatory compliance",
      items: [
        { name: "Multi-tenant Isolation", type: "Security Architecture" },
        { name: "Ethical AI Guidelines", type: "Governance Framework" },
        { name: "Data Governance", type: "Privacy Protection" },
        { name: "Audit Trails", type: "Compliance Monitoring" },
        { name: "SOC 2 Compliance", type: "Security Standards" },
        { name: "GDPR Compliance", type: "Data Protection" }
      ]
    }
  ];

  return (
    <section id="technology" className="py-20 bg-gradient-to-b from-background to-genie-dark/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            Technology Stack
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            AI Experimentation Hub: <span className="text-genie-primary">Complete Technology Ecosystem</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive technology stack powering enterprise-grade AI solutions - from advanced language models 
            to production infrastructure, security frameworks, and integration capabilities.
          </p>
        </div>

        {/* Gamma Integration Widget for Technology Stack */}
        <div className="mb-12 max-w-md mx-auto">
          <GammaIntegrationWidget
            contentType="infographic"
            title="Technology Stack Infographic"
            description="Create comprehensive visual diagram of the complete AI technology stack with categories, tools, and integration patterns"
            data={technologies}
            autoGenerate={true}
            showInstructions={false}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            
            return (
              <Card key={index} className={`p-8 border-${tech.color}/20 hover:border-${tech.color}/40 transition-colors bg-gradient-to-br from-${tech.color}/5 to-background`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 bg-${tech.color}/10 rounded-lg`}>
                    <IconComponent className={`w-8 h-8 text-${tech.color}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold text-${tech.color} mb-2`}>
                      {tech.category}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tech.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {tech.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 bg-${tech.color} rounded-full`} />
                        <span className="font-medium text-foreground">{item.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center border-genie-primary/20 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">50+</div>
            <div className="text-sm font-medium text-foreground mb-1">Technologies Integrated</div>
            <div className="text-xs text-muted-foreground">Comprehensive stack</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-teal/20 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-genie-teal" />
            </div>
            <div className="text-2xl font-bold text-genie-teal mb-2">94%</div>
            <div className="text-sm font-medium text-foreground mb-1">System Reliability</div>
            <div className="text-xs text-muted-foreground">Enterprise uptime</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-cyan/20 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-6 h-6 text-genie-cyan" />
            </div>
            <div className="text-2xl font-bold text-genie-cyan mb-2">Auto</div>
            <div className="text-sm font-medium text-foreground mb-1">Scaling Capability</div>
            <div className="text-xs text-muted-foreground">Cloud-native design</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-primary/20 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">SOC2</div>
            <div className="text-sm font-medium text-foreground mb-1">Security Compliance</div>
            <div className="text-xs text-muted-foreground">Enterprise-ready</div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Explore the complete journey behind this comprehensive technology stack
          </p>
          <Link to="/journey">
            <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4 text-lg font-semibold">
              View Full Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};