import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Brain,
  Database,
  Zap,
  Code2,
  Network,
  Shield,
  Layers,
  Cloud,
  Building,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Cpu,
  Bot,
  FileText,
  BarChart3,
  Users,
  Workflow,
  GitBranch,
  Lock,
  Lightbulb,
  Target,
  Calendar,
  Settings,
  AlertTriangle,
  Star,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import techJourneyBg from "@/assets/journey-phase-02-curiosity-artwork.jpg";

export const IntegratedTechnologyExploration = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Comprehensive Technology Ecosystem with Journey Integration
  const technologyEcosystem = {
    "Healthcare Innovation": {
      icon: Brain,
      color: "text-genie-primary",
      bgColor: "bg-genie-primary/10",
      borderColor: "border-genie-primary/20",
      description: "AI-driven healthcare transformation and patient care optimization",
      journeyPhase: "Envision → Scale",
      coreStack: {
        "AI Models": ["GPT-4", "Claude Sonnet", "Gemini Pro", "Healthcare LLMs"],
        "Development": ["React + TypeScript", "Supabase", "Tailwind CSS", "Vite"],
        "Integrations": ["CMS APIs", "DocuSign", "Insurance APIs", "ICD/FDA", "Twilio"]
      },
      useCases: ["Patient Onboarding", "Clinical Workflows", "Provider Verification", "Insurance Processing"],
      bestPractices: ["HIPAA Compliance", "Data Privacy", "Audit Trails", "Secure APIs"]
    },
    
    "Customer Onboarding": {
      icon: Users,
      color: "text-genie-secondary",
      bgColor: "bg-genie-secondary/10",
      borderColor: "border-genie-secondary/20",
      description: "Intelligent customer acquisition and engagement automation",
      journeyPhase: "Engage → Scale",
      coreStack: {
        "AI Tools": ["LLM APIs", "Small Language Models", "MCP", "n8n Automation"],
        "Development": ["React + TypeScript", "PostgreSQL", "API Middleware", "Real-time Validation"],
        "Integrations": ["Experian API", "CMS Verification", "Twilio SMS/Email", "Data Import Tools"]
      },
      useCases: ["Welcome Sequences", "Data Validation", "Automated Verification", "Progress Tracking"],
      bestPractices: ["Progressive Disclosure", "Error Handling", "Accessibility", "Mobile-First"]
    },
    
    "Customer Support": {
      icon: Phone,
      color: "text-genie-accent",
      bgColor: "bg-genie-accent/10",
      borderColor: "border-genie-accent/20",
      description: "Multi-channel AI-powered support with intelligent routing",
      journeyPhase: "Engage → Scale",
      coreStack: {
        "AI Systems": ["Natural Language IVR", "AI Gateway", "Arize Analytics", "LangWatch"],
        "Development": ["React Components", "Real-time APIs", "WebSocket", "Event Streaming"],
        "Integrations": ["Twilio Voice/SMS/WhatsApp", "Case Management", "Identity Verification"]
      },
      useCases: ["Smart IVR", "Case Routing", "Multi-channel Support", "Automated Resolution"],
      bestPractices: ["Response Time SLAs", "Escalation Paths", "Quality Monitoring", "Customer Feedback"]
    },
    
    "No-Code Platforms": {
      icon: Code2,
      color: "text-genie-teal",
      bgColor: "bg-genie-teal/10",
      borderColor: "border-genie-teal/20",
      description: "Rapid prototyping and development acceleration platforms",
      journeyPhase: "Envision → Engage",
      coreStack: {
        "Platforms": ["Loveable", "Bolt AI", "Bubble", "Cursor IDE"],
        "Development": ["TypeScript", "Modern Frameworks", "Component Libraries", "Design Systems"],
        "Integrations": ["GitHub", "API Connectors", "Database ORM", "Authentication"]
      },
      useCases: ["Rapid Prototyping", "MVP Development", "Component Libraries", "Design Systems"],
      bestPractices: ["Code Quality", "Scalability Planning", "Testing Strategy", "Documentation"]
    },
    
    "Data & Analytics": {
      icon: Database,
      color: "text-genie-cyan",
      bgColor: "bg-genie-cyan/10",
      borderColor: "border-genie-cyan/20",
      description: "Advanced data processing and business intelligence",
      journeyPhase: "Engage → Scale",
      coreStack: {
        "Storage": ["PostgreSQL", "Vector Databases", "Supabase", "Cloud Storage"],
        "Analytics": ["Business Intelligence", "ROI Analytics", "Real-time Dashboards", "Labeling Studio"],
        "Processing": ["ETL Pipelines", "Data Validation", "Batch Processing", "Stream Processing"]
      },
      useCases: ["Business Intelligence", "Predictive Analytics", "Data Visualization", "Performance Monitoring"],
      bestPractices: ["Data Governance", "Privacy Protection", "Backup Strategies", "Performance Optimization"]
    },
    
    "Enterprise Systems": {
      icon: Building,
      color: "text-genie-primary",
      bgColor: "bg-genie-primary/10",
      borderColor: "border-genie-primary/20",
      description: "Enterprise-grade infrastructure and compliance frameworks",
      journeyPhase: "Scale",
      coreStack: {
        "Infrastructure": ["Kubernetes", "Docker", "Cloud Platforms", "API Gateways"],
        "Security": ["Identity Management", "Encryption", "Audit Logging", "Compliance Frameworks"],
        "Integration": ["ERP Systems", "CRM Platforms", "Legacy System Connectors", "Microservices"]
      },
      useCases: ["System Integration", "Compliance Management", "Security Auditing", "Performance Scaling"],
      bestPractices: ["Zero Trust Security", "Disaster Recovery", "Change Management", "Monitoring"]
    }
  };

  const gartnerPhases = [
    {
      phase: "Envision",
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      description: "Strategic vision and innovation discovery",
      focus: "Learning, Experimentation, Proof of Concept"
    },
    {
      phase: "Engage", 
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      description: "Platform assessment and strategic alignment",
      focus: "Integration, Scalability, Performance Optimization"
    },
    {
      phase: "Scale",
      color: "bg-green-500/10 text-green-600 border-green-500/20",
      description: "Business value realization and optimization",
      focus: "Enterprise Deployment, ROI Measurement, Sustainability"
    }
  ];

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };


  return (
    <section className="py-16 bg-gradient-to-b from-background via-genie-dark/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Comprehensive Technology Ecosystem
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Technology Stack <span className="text-genie-primary">Blueprint & Journey</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Complete technology ecosystem mapping across healthcare innovation, customer systems, and enterprise platforms 
            following Gartner value framework implementation.
          </p>
        </div>

        {/* Gartner Framework Overview */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Gartner Value Framework Phases</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {gartnerPhases.map((phase, index) => (
              <Card key={index} className={`p-4 text-center ${phase.color}`}>
                <h4 className="font-bold mb-2">{phase.phase}</h4>
                <p className="text-xs mb-2">{phase.description}</p>
                <p className="text-xs font-medium">{phase.focus}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Compact Technology Ecosystem Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Technology Ecosystem Categories</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(technologyEcosystem).map(([category, details]) => {
              const IconComponent = details.icon;
              const isExpanded = expandedCategory === category;
              
              return (
                <Card key={category} className={`${details.borderColor} transition-all duration-300 ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                  <div 
                    className={`p-4 ${details.bgColor} cursor-pointer`}
                    onClick={() => toggleCategoryExpansion(category)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${details.color}`} />
                        <div>
                          <h4 className="font-bold text-sm">{category}</h4>
                          <p className="text-xs text-muted-foreground">{details.journeyPhase}</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">{details.description}</p>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-4 border-t">
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        {Object.entries(details.coreStack).map(([stackType, technologies]) => (
                          <div key={stackType}>
                            <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                              <Cpu className="w-3 h-3" />
                              {stackType}
                            </h5>
                            <div className="space-y-1">
                              {technologies.map((tech, index) => (
                                <Badge key={index} variant="outline" className="text-xs mr-1 mb-1">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Use Cases
                          </h5>
                          <div className="space-y-1">
                            {details.useCases.map((useCase, index) => (
                              <div key={index} className="text-xs p-2 bg-muted/50 rounded">{useCase}</div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Best Practices
                          </h5>
                          <div className="space-y-1">
                            {details.bestPractices.map((practice, index) => (
                              <div key={index} className="text-xs p-2 bg-green-50 dark:bg-green-950/20 rounded">{practice}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Integration Matrix */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Technology Integration Blueprint</h3>
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Core Development Stack */}
              <div className="space-y-4">
                <h4 className="font-bold text-center flex items-center justify-center gap-2">
                  <Code2 className="w-5 h-5 text-genie-primary" />
                  Core Development
                </h4>
                <div className="space-y-2">
                  {["React + TypeScript", "Supabase + PostgreSQL", "Tailwind CSS + Vite", "API Middleware"].map((tech, i) => (
                    <div key={i} className="p-2 bg-genie-primary/10 rounded text-center text-sm">{tech}</div>
                  ))}
                </div>
              </div>
              
              {/* AI & Intelligence Layer */}
              <div className="space-y-4">
                <h4 className="font-bold text-center flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5 text-genie-accent" />
                  AI & Intelligence
                </h4>
                <div className="space-y-2">
                  {["GPT-4 / Claude / Gemini", "Prompt Engineering", "Vector Databases", "Analytics & Monitoring"].map((tech, i) => (
                    <div key={i} className="p-2 bg-genie-accent/10 rounded text-center text-sm">{tech}</div>
                  ))}
                </div>
              </div>
              
              {/* Business Integration */}
              <div className="space-y-4">
                <h4 className="font-bold text-center flex items-center justify-center gap-2">
                  <Network className="w-5 h-5 text-genie-teal" />
                  Business Systems
                </h4>
                <div className="space-y-2">
                  {["CMS/Healthcare APIs", "DocuSign Integration", "Twilio Communications", "Security & Compliance"].map((tech, i) => (
                    <div key={i} className="p-2 bg-genie-teal/10 rounded text-center text-sm">{tech}</div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Implementation Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <Card className="p-4 text-center border-genie-primary/20">
            <div className="w-10 h-10 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Layers className="w-5 h-5 text-genie-primary" />
            </div>
            <div className="text-xl font-bold text-genie-primary mb-1">6</div>
            <div className="text-xs font-medium text-foreground mb-1">Technology Categories</div>
            <div className="text-xs text-muted-foreground">Complete ecosystem</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-teal/20">
            <div className="w-10 h-10 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-5 h-5 text-genie-teal" />
            </div>
            <div className="text-xl font-bold text-genie-teal mb-1">50+</div>
            <div className="text-xs font-medium text-foreground mb-1">Integrated Tools</div>
            <div className="text-xs text-muted-foreground">Proven stack</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-cyan/20">
            <div className="w-10 h-10 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-genie-cyan" />
            </div>
            <div className="text-xl font-bold text-genie-cyan mb-1">15+</div>
            <div className="text-xs font-medium text-foreground mb-1">Use Cases</div>
            <div className="text-xs text-muted-foreground">Real implementations</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-accent/20">
            <div className="w-10 h-10 bg-genie-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-5 h-5 text-genie-accent" />
            </div>
            <div className="text-xl font-bold text-genie-accent mb-1">3</div>
            <div className="text-xs font-medium text-foreground mb-1">Gartner Phases</div>
            <div className="text-xs text-muted-foreground">Framework aligned</div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to explore the complete journey and its business impact?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/journey">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                View Complete Journey
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" size="lg" className="px-8 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                See Business Impact
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};