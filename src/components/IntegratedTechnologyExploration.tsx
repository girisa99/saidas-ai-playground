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

  // Pure Technology Categories Aligned with Gartner Framework
  const technologyEcosystem = {
    "Artificial Intelligence & ML": {
      icon: Brain,
      color: "text-genie-primary",
      bgColor: "bg-genie-primary/10",
      borderColor: "border-genie-primary/20",
      description: "AI models, machine learning frameworks, and intelligent automation",
      journeyPhase: "Envision",
      coreStack: {
        "AI Models": ["GPT-4", "Claude Sonnet", "Gemini Pro", "Small Language Models"],
        "ML Frameworks": ["TensorFlow", "PyTorch", "Scikit-learn", "Vector Databases"],
        "AI Tools": ["LangChain", "LangWatch", "Arize Analytics", "Prompt Engineering"]
      },
      businessOutcomes: ["Healthcare Diagnostics", "Customer Support Automation", "Content Generation", "Predictive Analytics"],
      gartnerValue: ["Innovation Discovery", "Proof of Concept", "AI Strategy Development"]
    },
    
    "Frontend Development": {
      icon: Code2,
      color: "text-genie-secondary",
      bgColor: "bg-genie-secondary/10",
      borderColor: "border-genie-secondary/20",
      description: "Modern web frameworks, UI libraries, and development tools",
      journeyPhase: "Engage",
      coreStack: {
        "Frameworks": ["React", "TypeScript", "Vite", "Next.js"],
        "UI Libraries": ["Tailwind CSS", "Shadcn/UI", "Radix UI", "Lucide Icons"],
        "Tools": ["Loveable", "Cursor IDE", "GitHub Copilot", "ESLint"]
      },
      businessOutcomes: ["Patient Portals", "Customer Onboarding Apps", "Admin Dashboards", "Mobile-First Interfaces"],
      gartnerValue: ["User Experience Optimization", "Rapid Prototyping", "Digital Transformation"]
    },
    
    "Backend Infrastructure": {
      icon: Network,
      color: "text-genie-accent",
      bgColor: "bg-genie-accent/10",
      borderColor: "border-genie-accent/20",
      description: "Server architecture, APIs, microservices, and cloud platforms",
      journeyPhase: "Engage → Scale",
      coreStack: {
        "Platforms": ["Supabase", "Node.js", "Docker", "Kubernetes"],
        "APIs": ["REST APIs", "GraphQL", "WebSocket", "Edge Functions"],
        "Cloud": ["AWS", "Vercel", "Railway", "API Gateways"]
      },
      businessOutcomes: ["Scalable Healthcare Systems", "Real-time Communication", "API Integrations", "Multi-tenant Architecture"],
      gartnerValue: ["Platform Assessment", "Scalability Planning", "Integration Strategy"]
    },
    
    "Data Management": {
      icon: Database,
      color: "text-genie-teal",
      bgColor: "bg-genie-teal/10",
      borderColor: "border-genie-teal/20",
      description: "Database systems, data processing, analytics, and storage solutions",
      journeyPhase: "Engage → Scale",
      coreStack: {
        "Databases": ["PostgreSQL", "Supabase DB", "Vector DBs", "Redis"],
        "Analytics": ["Business Intelligence", "Real-time Dashboards", "ETL Pipelines"],
        "Storage": ["Cloud Storage", "File Management", "Backup Systems", "CDN"]
      },
      businessOutcomes: ["Patient Data Management", "Business Intelligence", "Compliance Reporting", "Performance Analytics"],
      gartnerValue: ["Data Strategy", "Analytics Capabilities", "ROI Measurement"]
    },
    
    "Security & Compliance": {
      icon: Shield,
      color: "text-genie-cyan",
      bgColor: "bg-genie-cyan/10",
      borderColor: "border-genie-cyan/20",
      description: "Security frameworks, compliance tools, and privacy protection",
      journeyPhase: "Scale",
      coreStack: {
        "Security": ["Zero Trust", "Encryption", "Identity Management", "OAuth"],
        "Compliance": ["HIPAA", "GDPR", "SOC2", "Audit Trails"],
        "Monitoring": ["Security Scanning", "Threat Detection", "Access Control"]
      },
      businessOutcomes: ["Healthcare Compliance", "Data Privacy", "Risk Management", "Regulatory Adherence"],
      gartnerValue: ["Risk Mitigation", "Compliance Assurance", "Trust Building"]
    },
    
    "Integration & Communication": {
      icon: Phone,
      color: "text-genie-primary",
      bgColor: "bg-genie-primary/10",
      borderColor: "border-genie-primary/20",
      description: "API integrations, communication platforms, and workflow automation",
      journeyPhase: "Scale",
      coreStack: {
        "Communications": ["Twilio", "SendGrid", "WhatsApp API", "SMS/Voice"],
        "Integrations": ["CMS APIs", "DocuSign", "Insurance APIs", "ERP Connectors"],
        "Automation": ["n8n", "Zapier", "Workflow Engines", "Event Streaming"]
      },
      businessOutcomes: ["Multi-channel Support", "Document Automation", "Customer Communications", "System Integration"],
      gartnerValue: ["Business Process Optimization", "Operational Efficiency", "Value Realization"]
    }
  };

  const gartnerPhases = [
    {
      phase: "Envision",
      color: "bg-blue-500/20 text-blue-700 border-blue-500/30",
      description: "Listen & Sense → Develop Options",
      focus: "AI Strategy, Innovation Discovery, Proof of Concept",
      icon: Brain,
      businessContext: "Healthcare Innovation, AI Experimentation, Strategic Vision"
    },
    {
      phase: "Engage", 
      color: "bg-purple-500/20 text-purple-700 border-purple-500/30",
      description: "Assess Materiality → Trade-Offs",
      focus: "Platform Assessment, Integration Planning, Scalability Design",
      icon: Zap,
      businessContext: "Customer Onboarding, Multi-channel Support, System Integration"
    },
    {
      phase: "Scale",
      color: "bg-emerald-500/20 text-emerald-700 border-emerald-500/30",
      description: "Measure Gap → Adjust & Iterate",
      focus: "Value Realization, ROI Optimization, Continuous Improvement",
      icon: TrendingUp,
      businessContext: "Enterprise Deployment, Compliance Management, Performance Optimization"
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

        {/* Legend: Technology → Gartner Framework → Business Value */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Technology Ecosystem → Gartner Framework → Business Value</h3>
          
          {/* Flow Legend */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-emerald-950/20 p-6 rounded-xl mb-8">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full text-blue-700 font-medium mb-2">
                  <Brain className="w-4 h-4" />
                  Envision Phase
                </div>
                <p className="text-xs text-muted-foreground">Innovation Discovery & Strategic Vision</p>
                <p className="text-xs font-medium text-blue-700 mt-1">AI Strategy & Experimentation</p>
              </div>
              
              <div className="hidden md:flex justify-center items-center">
                <ArrowRight className="w-6 h-6 text-purple-600 animate-pulse" />
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full text-purple-700 font-medium mb-2">
                  <Zap className="w-4 h-4" />
                  Engage Phase
                </div>
                <p className="text-xs text-muted-foreground">Platform Assessment & Integration</p>
                <p className="text-xs font-medium text-purple-700 mt-1">Customer Systems & Support</p>
              </div>
              
              <div className="hidden md:flex justify-center items-center md:col-start-2">
                <ArrowRight className="w-6 h-6 text-emerald-600 animate-pulse" />
              </div>
              
              <div className="text-center md:col-start-3">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full text-emerald-700 font-medium mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Scale Phase
                </div>
                <p className="text-xs text-muted-foreground">Value Realization & ROI Optimization</p>
                <p className="text-xs font-medium text-emerald-700 mt-1">Enterprise & Compliance</p>
              </div>
            </div>
          </div>

          {/* Gartner Framework Alignment */}
          <div className="grid md:grid-cols-3 gap-4">
            {gartnerPhases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <Card key={index} className={`p-4 text-center ${phase.color}`}>
                  <div className="flex items-center justify-center mb-2">
                    <IconComponent className="w-6 h-6 mr-2" />
                    <h4 className="font-bold">{phase.phase}</h4>
                  </div>
                  <p className="text-xs mb-2">{phase.description}</p>
                  <p className="text-xs font-medium">{phase.focus}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology Ecosystem Categories with Business Mapping */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-4">Technology Categories → Business Value Mapping</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Each technology category aligns with Gartner framework phases to deliver measurable business outcomes, 
            creating multi-stakeholder value through strategic implementation.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(technologyEcosystem).map(([category, details]) => {
              const IconComponent = details.icon;
              const isExpanded = expandedCategory === category;
              
              return (
                <Card key={category} className={`${details.borderColor} transition-all duration-300 ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                  <div 
                    className={`p-4 ${details.bgColor} cursor-pointer border-l-4 ${details.borderColor}`}
                    onClick={() => toggleCategoryExpansion(category)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${details.color}`} />
                           <div>
                             <h4 className="font-bold text-sm">{category}</h4>
                             <div className="flex items-center gap-2">
                               <span className={`text-xs px-2 py-1 rounded-full ${
                                 'phaseColor' in details ? details.phaseColor : 
                                 details.journeyPhase.includes('Envision') ? 'bg-blue-500/20 text-blue-700' :
                                 details.journeyPhase.includes('Engage') ? 'bg-purple-500/20 text-purple-700' :
                                 'bg-emerald-500/20 text-emerald-700'
                               }`}>
                                 {details.journeyPhase}
                               </span>
                             </div>
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
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Business Outcomes
                          </h5>
                          <div className="space-y-1">
                            {details.businessOutcomes.map((outcome, index) => (
                              <div key={index} className="text-xs p-2 bg-muted/50 rounded">{outcome}</div>
                            ))}
                          </div>
                        </div>
                        
                         <div>
                           <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                             <Users className="w-3 h-3" />
                             Journey Use Cases
                           </h5>
                           <div className="space-y-1">
                             {(('journeyUseCases' in details ? details.journeyUseCases : details.businessOutcomes) as string[]).map((useCase, index) => (
                               <div key={index} className="text-xs p-2 bg-blue-50 dark:bg-blue-950/20 rounded">{useCase}</div>
                             ))}
                           </div>
                         </div>
                      </div>
                      
                       <div className="mb-4">
                         <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                           <Network className="w-3 h-3" />
                           Integration Blueprint
                         </h5>
                         <div className="text-xs p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded border-l-3 border-primary/30">
                           {('integrationBlueprint' in details ? details.integrationBlueprint : 'Technology Integration → Platform Assessment → Scalability Design → Value Optimization') as string}
                         </div>
                       </div>
                      
                      <div>
                        <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Gartner Value
                        </h5>
                        <div className="space-y-1">
                          {details.gartnerValue.map((value, index) => (
                            <div key={index} className="text-xs p-2 bg-green-50 dark:bg-green-950/20 rounded">{value}</div>
                          ))}
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