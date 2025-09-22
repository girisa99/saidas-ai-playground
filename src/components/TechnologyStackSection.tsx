import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      category: "Agentic AI & LLMs",
      icon: Brain,
      color: "genie-primary",
      description: "Advanced multi-agent systems with autonomous reasoning and orchestration capabilities",
      items: [
        { name: "GPT-4 Turbo", type: "Large Language Model" },
        { name: "Claude 3 Opus", type: "Anthropic AI" },
        { name: "Gemini Pro", type: "Google AI" },
        { name: "Multi-Agent Orchestration", type: "Custom Framework" },
        { name: "Dynamic Agent Generation", type: "Specialized Roles" },
        { name: "Prompt Engineering", type: "Advanced Techniques" }
      ]
    },
    {
      category: "Development Infrastructure",
      icon: Code2,
      color: "genie-teal",
      description: "Enterprise-grade development ecosystem with AI-assisted coding and rapid prototyping",
      items: [
        { name: "Cursor IDE", type: "AI-Assisted Development" },
        { name: "Replit", type: "Rapid Prototyping" },
        { name: "V0 by Vercel", type: "UI Generation" },
        { name: "TypeScript", type: "Type-Safe Development" },
        { name: "Docker", type: "Containerization" },
        { name: "Kubernetes", type: "Orchestration" }
      ]
    },
    {
      category: "Data & Architecture",
      icon: Database,
      color: "genie-cyan",
      description: "Robust data infrastructure with real-time synchronization and enterprise scalability",
      items: [
        { name: "Supabase", type: "Backend-as-a-Service" },
        { name: "PostgreSQL", type: "Relational Database" },
        { name: "Vector Databases", type: "Embedding Storage" },
        { name: "Redis", type: "Caching & Sessions" },
        { name: "RAG Architecture", type: "Retrieval-Augmented Generation" },
        { name: "Real-time Sync", type: "Data Consistency" }
      ]
    },
    {
      category: "Security & Governance",
      icon: Shield,
      color: "genie-primary",
      description: "Enterprise security frameworks with compliance and governance structures",
      items: [
        { name: "Multi-tenant Isolation", type: "Security Architecture" },
        { name: "Enterprise SSO", type: "Authentication" },
        { name: "Data Governance", type: "Compliance Framework" },
        { name: "Audit Trails", type: "Security Monitoring" },
        { name: "RBAC", type: "Role-Based Access" },
        { name: "Encryption", type: "Data Protection" }
      ]
    },
    {
      category: "Integration & APIs",
      icon: Network,
      color: "genie-teal",
      description: "Comprehensive integration layer with external services and workflow automation",
      items: [
        { name: "DocuSign API", type: "Document Workflows" },
        { name: "Twilio", type: "Communications" },
        { name: "REST & GraphQL", type: "API Standards" },
        { name: "Webhook Architecture", type: "Event-Driven" },
        { name: "Microservices", type: "Service Architecture" },
        { name: "API Gateway", type: "Traffic Management" }
      ]
    },
    {
      category: "Analytics & Monitoring",
      icon: BarChart3,
      color: "genie-cyan",
      description: "Advanced analytics and monitoring for performance optimization and insights",
      items: [
        { name: "Real-time Analytics", type: "Performance Metrics" },
        { name: "Error Tracking", type: "System Monitoring" },
        { name: "Usage Analytics", type: "User Behavior" },
        { name: "Cost Optimization", type: "Resource Management" },
        { name: "A/B Testing", type: "Experimentation" },
        { name: "Health Checks", type: "System Reliability" }
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