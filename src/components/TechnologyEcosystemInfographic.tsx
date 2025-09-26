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
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

export const TechnologyEcosystemInfographic = () => {
  const [activePhase, setActivePhase] = useState(0);

  // Technology Ecosystem Categories
  const technologyCategories = [
    {
      title: "Generative AI",
      icon: Brain,
      color: "bg-genie-primary/10 text-genie-primary border-genie-primary/20",
      description: "AI-powered content generation and autonomous reasoning",
      stakeholders: "AI Stakeholders",
      impact: "Accelerates research, automates documentation, enhances decision-making",
      tools: [
        "GPT-4 Turbo",
        "Claude 3 Opus", 
        "Gemini Pro",
        "Custom Models"
      ]
    },
    {
      title: "Agentic Systems",
      icon: Network,
      color: "bg-genie-teal/10 text-genie-teal border-genie-teal/20",
      description: "Self-directed AI systems that can manage multi-step processes",
      stakeholders: "Developers & Researchers", 
      impact: "Autonomous agents for complex workflow orchestration",
      tools: [
        "Multi-Agent Systems",
        "Model Context Protocol",
        "Dynamic Agents",
        "Task Orchestration"
      ]
    },
    {
      title: "RAG & Multi-modal",
      icon: FileText,
      color: "bg-genie-cyan/10 text-genie-cyan border-genie-cyan/20",
      description: "Retrieval-augmented generation for comprehensive information synthesis",
      stakeholders: "Healthcare Providers",
      impact: "Enhanced knowledge processing from diverse data sources",
      tools: [
        "Vector Databases",
        "Embedding Models",
        "Document Processing",
        "Semantic Search"
      ]
    },
    {
      title: "Low-code/No-code",
      icon: Code2,
      color: "bg-genie-accent/10 text-genie-accent border-genie-accent/20",
      description: "Enables rapid prototyping and deployment without coding expertise",
      stakeholders: "Healthcare Providers",
      impact: "Democratizes technology development for non-technical users",
      tools: [
        "Loveable",
        "Bolt AI",
        "Bubble",
        "V0 by Vercel"
      ]
    },
    {
      title: "Cloud Infrastructure",
      icon: Cloud,
      color: "bg-genie-primary/10 text-genie-primary border-genie-primary/20",
      description: "Flexible infrastructure supporting global collaboration and scalability",
      stakeholders: "All Stakeholders",
      impact: "Scalable, secure, and accessible computing resources",
      tools: [
        "Google Cloud",
        "Kubernetes",
        "Docker",
        "Auto-scaling"
      ]
    },
    {
      title: "Conversational AI",
      icon: Bot,
      color: "bg-genie-teal/10 text-genie-teal border-genie-teal/20",
      description: "Intuitive communication between humans and AI systems",
      stakeholders: "Patients & Providers",
      impact: "Natural language interfaces for better user experience",
      tools: [
        "Conversation APIs",
        "Voice Synthesis",
        "Language Models",
        "Chat Interfaces"
      ]
    },
    {
      title: "Document Processing",
      icon: FileText,
      color: "bg-genie-cyan/10 text-genie-cyan border-genie-cyan/20",
      description: "Intelligent document analysis and data extraction capabilities",
      stakeholders: "Regulatory & Payers",
      impact: "Automated processing of complex regulatory submissions",
      tools: [
        "OCR Systems",
        "NLP Processing",
        "Data Extraction",
        "Document AI"
      ]
    },
    {
      title: "Data Analytics",
      icon: BarChart3,
      color: "bg-genie-accent/10 text-genie-accent border-genie-accent/20",
      description: "Sophisticated analytics tools for evidence-based decision making",
      stakeholders: "Pharma & Biotech",
      impact: "Advanced insights from clinical and market data",
      tools: [
        "Analytics Platforms",
        "ML Pipelines",
        "Visualization",
        "Predictive Models"
      ]
    }
  ];

  // Development Journey Phases
  const developmentPhases = [
    {
      phase: "Phase 1",
      title: "Choose Your Platform",
      duration: "Weeks 1-2",
      icon: Target,
      description: "Select the right No-Code/Low-Code AI platform based on your project requirements and team's technical comfort.",
      details: "Evaluate features, scalability, and integration capabilities.",
      tools: ["Platform Evaluation", "Requirements Analysis", "Team Assessment"],
      outcome: "Platform Selection"
    },
    {
      phase: "Phase 2", 
      title: "Build & Prototype",
      duration: "Weeks 3-4",
      icon: Lightbulb,
      description: "Rapidly develop and iterate on your AI application's core features using visual builders.",
      details: "Leverage visual builders to create functional prototypes and gather early feedback.",
      tools: ["Visual Builders", "Rapid Prototyping", "User Testing"],
      outcome: "Working Prototype"
    },
    {
      phase: "Phase 3",
      title: "Scale & Optimize", 
      duration: "Months 2-3",
      icon: TrendingUp,
      description: "Refine your solution, integrate with existing systems, and prepare for wider deployment.",
      details: "Optimize performance and user experience based on real-world usage.",
      tools: ["Performance Optimization", "System Integration", "Deployment"],
      outcome: "Production Ready"
    }
  ];

  // Tech Stack Blueprint Layers
  const techStackLayers = [
    {
      title: "Development Layer",
      icon: Code2,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      components: [
        {
          name: "Developer Tools",
          icon: Code2,
          tools: ["Cursor IDE", "GitHub Copilot", "VS Code", "Replit"]
        },
        {
          name: "Data Labeling",
          icon: Database,
          tools: ["Labeling Studio", "Data Annotation", "Quality Control", "Validation"]
        }
      ]
    },
    {
      title: "Core AI & Infrastructure", 
      icon: Cpu,
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      components: [
        {
          name: "AI Platforms",
          icon: Brain,
          tools: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Meta Llama"]
        },
        {
          name: "Infrastructure & Protocols",
          icon: Network,
          tools: ["Kubernetes", "Docker", "MCP", "API Gateways"]
        }
      ]
    },
    {
      title: "Application & Impact",
      icon: Building,
      color: "bg-green-500/10 text-green-600 border-green-500/20", 
      components: [
        {
          name: "Enterprise Integration",
          icon: Building,
          tools: ["CRM Integration", "ERP Systems", "Business Intelligence", "Workflow"]
        },
        {
          name: "Business Value",
          icon: TrendingUp,
          tools: ["ROI Analytics", "Performance Metrics", "Impact Assessment", "Growth"]
        }
      ]
    }
  ];

  // Best Practices Checklist
  const bestPractices = [
    {
      number: 1,
      title: "Define Clear Business Objectives",
      description: "Ensure AI initiatives directly align with strategic business goals and measurable outcomes."
    },
    {
      number: 2, 
      title: "Prioritize Data Quality & Governance",
      description: "Invest in meticulous data labeling, robust data pipelines, and strict governance to ensure model accuracy and reliability."
    },
    {
      number: 3,
      title: "Adopt Modular & Scalable Architectures", 
      description: "Design AI systems with modular components and cloud-native services to ensure flexibility and future scalability."
    },
    {
      number: 4,
      title: "Implement MLOps Best Practices",
      description: "Utilize automated pipelines for model training, deployment, monitoring, and retraining to ensure continuous performance."
    },
    {
      number: 5,
      title: "Foster Cross-Functional Collaboration",
      description: "Encourage close collaboration between AI developers, data scientists, business stakeholders, and IT operations."
    },
    {
      number: 6,
      title: "Focus on Ethical AI & Explainability", 
      description: "Integrate ethical considerations and model interpretability throughout the development lifecycle to build trust and accountability."
    },
    {
      number: 7,
      title: "Start Small, Iterate Fast, Scale Strategically",
      description: "Begin with pilot projects to demonstrate value, then iterate based on feedback and gradually scale successful solutions across the enterprise."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background via-genie-dark/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Technology Experimentation & Innovation Ecosystem
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            AI Development <span className="text-genie-primary">Technology Stack</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A comprehensive ecosystem of cutting-edge tools and platforms enabling rapid AI experimentation, 
            prototyping, and enterprise deployment without traditional development barriers.
          </p>
        </div>

        {/* Technology Ecosystem Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Technology Innovation Ecosystem</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologyCategories.map((category, index) => (
              <Card key={index} className={`p-6 transition-all duration-300 hover:shadow-lg ${category.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-background rounded-lg">
                    <category.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm">{category.title}</h4>
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="mb-3">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {category.stakeholders}
                  </Badge>
                  <p className="text-xs font-medium text-foreground">
                    {category.impact}
                  </p>
                </div>
                
                <div className="space-y-1">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-current rounded-full opacity-60" />
                      <span className="text-xs text-muted-foreground">{tool}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Development Journey Phases */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">AI Development Journey</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {developmentPhases.map((phase, index) => (
              <Card 
                key={index} 
                className={`p-8 transition-all duration-300 cursor-pointer ${
                  activePhase === index 
                    ? 'border-genie-primary/40 bg-genie-primary/5 shadow-lg' 
                    : 'hover:border-genie-primary/20 hover:shadow-md'
                }`}
                onClick={() => setActivePhase(index)}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-genie-primary/10 rounded-full flex items-center justify-center">
                      <phase.icon className="w-8 h-8 text-genie-primary" />
                    </div>
                  </div>
                  
                  <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-3">
                    {phase.phase}
                  </Badge>
                  
                  <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                  <p className="text-sm text-genie-primary font-medium mb-3">{phase.duration}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {phase.description}
                  </p>
                  <p className="text-xs text-foreground mb-4">{phase.details}</p>
                  
                  <div className="space-y-2 mb-4">
                    {phase.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-genie-primary" />
                        <span className="text-xs text-muted-foreground">{tool}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    Expected: {phase.outcome}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack Blueprint */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Tech Stack Blueprint: Components & Connections</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {techStackLayers.map((layer, index) => (
              <Card key={index} className={`p-8 ${layer.color}`}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
                    <layer.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold">{layer.title}</h4>
                </div>
                
                <div className="space-y-6">
                  {layer.components.map((component, compIndex) => (
                    <div key={compIndex} className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <component.icon className="w-5 h-5 text-current" />
                        <h5 className="font-semibold text-sm">{component.name}</h5>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {component.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="text-xs text-muted-foreground bg-background/50 rounded px-2 py-1">
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Best Practices Checklist */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Best Practices for Advanced AI Development</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-genie-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-genie-primary">{practice.number}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-2">{practice.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {practice.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="p-6 text-center border-genie-primary/20">
            <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-genie-primary" />
            </div>
            <div className="text-2xl font-bold text-genie-primary mb-2">8</div>
            <div className="text-sm font-medium text-foreground mb-1">Technology Categories</div>
            <div className="text-xs text-muted-foreground">Comprehensive ecosystem</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-teal/20">
            <div className="w-12 h-12 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-genie-teal" />
            </div>
            <div className="text-2xl font-bold text-genie-teal mb-2">70%</div>
            <div className="text-sm font-medium text-foreground mb-1">Faster Development</div>
            <div className="text-xs text-muted-foreground">No-code acceleration</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-cyan/20">
            <div className="w-12 h-12 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-genie-cyan" />
            </div>
            <div className="text-2xl font-bold text-genie-cyan mb-2">40%</div>
            <div className="text-sm font-medium text-foreground mb-1">Cost Reduction</div>
            <div className="text-xs text-muted-foreground">Operational efficiency</div>
          </Card>
          
          <Card className="p-6 text-center border-genie-accent/20">
            <div className="w-12 h-12 bg-genie-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-genie-accent" />
            </div>
            <div className="text-2xl font-bold text-genie-accent mb-2">5+</div>
            <div className="text-sm font-medium text-foreground mb-1">Stakeholder Groups</div>
            <div className="text-xs text-muted-foreground">Cross-functional impact</div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to explore the journey behind this technology ecosystem?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/journey">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-teal text-white px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                View Development Journey
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" size="lg" className="px-8 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                See Implementation Results
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};