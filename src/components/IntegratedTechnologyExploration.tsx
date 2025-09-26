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
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import techJourneyBg from "@/assets/journey-phase-02-curiosity-artwork.jpg";

export const IntegratedTechnologyExploration = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  // Integrated Journey Phases with Technology Mapping
  const journeyPhases = [
    {
      timeline: "May 2025",
      title: "From Curiosity to Breakthrough",
      subtitle: "The 45-Day Deep Dive: Building My AI Lab",
      description: "What began as pure curiosity quickly transformed into an all-consuming personal mission. After two decades in the industry, AI felt profoundly different - a fundamental shift demanding deep, hands-on exploration through intensive experimentation and learning.",
      gartnerPhase: "Envision",
      valueFramework: "Strategic Vision & Innovation Discovery",
      
      coreCoreTechnologies: [
        { name: "GPT Series", category: "Generative AI" },
        { name: "Claude", category: "Generative AI" },
        { name: "Gemini", category: "Generative AI" },
        { name: "Loveable", category: "No-Code Platform" }
      ],
      
      supportingTools: [
        { name: "Solid", category: "Framework" },
        { name: "Supabase", category: "Backend" },
        { name: "TypeScript", category: "Language" },
        { name: "PostgreSQL", category: "Database" },
        { name: "Vector Databases", category: "AI Infrastructure" }
      ],
      
      touchPoints: [
        "Established personal AI experimentation hub with systematic comparison",
        "Conducted 45-day intensive deep dive across GPT, Claude, Gemini models",
        "Developed foundational understanding of prompt engineering and model optimization",
        "Built prototypes using Bolt, Loveable, and Solid frameworks with TypeScript",
        "Integrated AI into real-world workflows with GitHub, DocuSign, and Twilio APIs"
      ],
      
      painPoints: [
        "Overwhelming complexity of AI model selection and optimization",
        "Challenges preventing redundancy and ensuring application stability",
        "Steep learning curve requiring methodical experimentation approach",
        "Trial and error process in understanding proper project structures",
        "Frustrating moments of 'why isn't this working?' during foundational learning"
      ],
      
      blueprint: {
        developmentLayer: ["No-Code Platforms", "Developer Tools"],
        coreAI: ["Generative AI", "Conversational AI"],
        application: ["Rapid Prototyping", "Learning Framework"]
      },
      
      gartnerColor: "bg-blue-500/10 text-blue-600 border-blue-500/20"
    },
    
    {
      timeline: "June-July 2025",
      title: "Platform Mastery & Integration",
      subtitle: "Scaling Beyond Experimentation",
      description: "Transitioning from curiosity-driven exploration to systematic platform evaluation and integration. Focus shifted to understanding enterprise-grade capabilities and building robust, scalable solutions that could serve real business needs.",
      gartnerPhase: "Engage", 
      valueFramework: "Platform Assessment & Strategic Alignment",
      
      coreCoreTechnologies: [
        { name: "Bolt AI", category: "Agentic Systems" },
        { name: "Multi-Agent Systems", category: "Agentic Systems" },
        { name: "RAG Architecture", category: "RAG & Multi-modal" },
        { name: "Vector Search", category: "Data Infrastructure" }
      ],
      
      supportingTools: [
        { name: "Kubernetes", category: "Infrastructure" },
        { name: "Docker", category: "Containerization" },
        { name: "API Gateways", category: "Integration" },
        { name: "MLOps Pipelines", category: "Operations" },
        { name: "Security Frameworks", category: "Compliance" }
      ],
      
      touchPoints: [
        "Mastered platform evaluation methodologies following Gartner frameworks",
        "Implemented enterprise-grade security and compliance measures",
        "Developed reusable components and modular architecture patterns",
        "Established MLOps best practices for continuous model improvement",
        "Created comprehensive documentation and knowledge management systems"
      ],
      
      painPoints: [
        "Complex integration challenges between different AI platforms",
        "Performance optimization across multiple technology stacks",
        "Balancing innovation speed with security and compliance requirements",
        "Managing technical debt while rapidly prototyping new capabilities",
        "Coordinating cross-functional requirements and stakeholder expectations"
      ],
      
      blueprint: {
        developmentLayer: ["Advanced Tools", "Integration Platforms"],
        coreAI: ["Agentic Systems", "RAG & Multi-modal"],
        application: ["Enterprise Integration", "Scalable Architecture"]
      },
      
      gartnerColor: "bg-purple-500/10 text-purple-600 border-purple-500/20"
    },
    
    {
      timeline: "August-September 2025",
      title: "Enterprise Transformation",
      subtitle: "Production-Ready AI Ecosystem",
      description: "Achieving enterprise-grade deployment capabilities with comprehensive AI ecosystem. Focus on business value delivery, stakeholder engagement, and sustainable innovation practices that drive measurable organizational impact.",
      gartnerPhase: "Scale",
      valueFramework: "Business Value Realization & Optimization",
      
      coreCoreTechnologies: [
        { name: "Enterprise AI Platforms", category: "Cloud Infrastructure" },
        { name: "Advanced Analytics", category: "Data Analytics" },
        { name: "Document Processing", category: "Document AI" },
        { name: "Compliance AI", category: "Security & Compliance" }
      ],
      
      supportingTools: [
        { name: "Enterprise CRM", category: "Business Systems" },
        { name: "ERP Integration", category: "Business Systems" },
        { name: "Business Intelligence", category: "Analytics" },
        { name: "Governance Frameworks", category: "Compliance" },
        { name: "ROI Analytics", category: "Value Measurement" }
      ],
      
      touchPoints: [
        "Delivered measurable business value with 40% operational cost reduction",
        "Achieved 94% system reliability across enterprise deployments",
        "Established cross-functional collaboration frameworks with 5+ stakeholder groups",
        "Implemented ethical AI and explainability standards organization-wide",
        "Created sustainable innovation practices with continuous improvement cycles"
      ],
      
      painPoints: [
        "Managing change resistance across traditional organizational structures",
        "Balancing innovation pace with regulatory and compliance requirements",
        "Ensuring consistent user experience across diverse stakeholder groups",
        "Measuring and communicating ROI of AI initiatives to executive leadership",
        "Maintaining competitive advantage while ensuring ethical AI practices"
      ],
      
      blueprint: {
        developmentLayer: ["Enterprise Platforms", "Business Intelligence"],
        coreAI: ["Production AI", "Compliance Systems"],
        application: ["Business Value", "Stakeholder Impact"]
      },
      
      gartnerColor: "bg-green-500/10 text-green-600 border-green-500/20"
    }
  ];

  // Technology Category Mapping
  const technologyMapping = {
    "Generative AI": { icon: Brain, color: "text-genie-primary" },
    "Agentic Systems": { icon: Network, color: "text-genie-teal" },
    "RAG & Multi-modal": { icon: FileText, color: "text-genie-cyan" },
    "No-Code Platform": { icon: Code2, color: "text-genie-accent" },
    "Data Infrastructure": { icon: Database, color: "text-genie-primary" },
    "Cloud Infrastructure": { icon: Cloud, color: "text-genie-teal" },
    "Security & Compliance": { icon: Shield, color: "text-genie-cyan" },
    "Data Analytics": { icon: BarChart3, color: "text-genie-accent" }
  };

  const togglePhaseExpansion = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background via-genie-dark/5 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Integrated Technology Exploration
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            AI Journey Through <span className="text-genie-primary">Gartner Value Framework</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A comprehensive exploration mapping technology innovation, development phases, and business value realization 
            following proven enterprise frameworks and best practices.
          </p>
        </div>

        {/* Technology Categories Overview */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-8">Technology Innovation Ecosystem</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(technologyMapping).map(([category, details]) => {
              const IconComponent = details.icon;
              return (
                <Card key={category} className="p-4 text-center hover:shadow-md transition-shadow border-genie-primary/20">
                  <IconComponent className={`w-8 h-8 ${details.color} mx-auto mb-3`} />
                  <h4 className="font-semibold text-sm">{category}</h4>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Journey Flow */}
        <div className="space-y-12 mb-20">
          <h3 className="text-2xl font-bold text-center mb-12">Technology Development Journey</h3>
          
          {journeyPhases.map((phase, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < journeyPhases.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full z-0">
                  <div className="w-px h-12 bg-gradient-to-b from-genie-primary to-genie-teal"></div>
                  <div className="w-3 h-3 bg-genie-accent rounded-full -ml-1.5"></div>
                </div>
              )}
              
              <Card className="overflow-hidden relative z-10">
                {/* Phase Header */}
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${techJourneyBg})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-genie-dark/90 via-genie-primary/80 to-genie-secondary/70" />
                  
                  <div className="absolute inset-0 p-6 flex items-center">
                    <div className="max-w-4xl">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-white/20 text-white border-white/30">
                          {phase.timeline}
                        </Badge>
                        <Badge className={phase.gartnerColor}>
                          Gartner: {phase.gartnerPhase}
                        </Badge>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{phase.title}</h3>
                      <h4 className="text-lg text-genie-accent mb-3">{phase.subtitle}</h4>
                      <p className="text-white/90 leading-relaxed text-sm lg:text-base">{phase.description}</p>
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="p-6 lg:p-8">
                  {/* Value Framework */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${phase.gartnerColor} mb-2`}>
                      <Target className="w-4 h-4" />
                      <span className="font-semibold text-sm">{phase.valueFramework}</span>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    {/* Core Technologies */}
                    <div>
                      <h5 className="font-bold mb-4 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-genie-primary" />
                        Core Technologies
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {phase.coreCoreTechnologies.map((tech, techIndex) => {
                          const mapping = technologyMapping[tech.category] || { icon: Code2, color: "text-foreground" };
                          const IconComponent = mapping.icon;
                          return (
                            <div key={techIndex} className="flex items-center gap-2 p-2 bg-background rounded border">
                              <IconComponent className={`w-4 h-4 ${mapping.color}`} />
                              <div>
                                <div className="font-medium text-xs">{tech.name}</div>
                                <div className="text-xs text-muted-foreground">{tech.category}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Supporting Tools */}
                    <div>
                      <h5 className="font-bold mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-genie-teal" />
                        Supporting Tools
                      </h5>
                      <div className="space-y-1">
                        {phase.supportingTools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                            <span className="font-medium">{tool.name}</span>
                            <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Blueprint Mapping */}
                  <div className="mb-6 p-4 bg-muted/30 rounded-lg">
                    <h5 className="font-bold mb-3 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-genie-primary" />
                      Technology Stack Blueprint
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold text-sm mb-2">Development Layer</h6>
                        <div className="space-y-1">
                          {phase.blueprint.developmentLayer.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs block text-center">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h6 className="font-semibold text-sm mb-2">Core AI & Infrastructure</h6>
                        <div className="space-y-1">
                          {phase.blueprint.coreAI.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs block text-center">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h6 className="font-semibold text-sm mb-2">Application & Impact</h6>
                        <div className="space-y-1">
                          {phase.blueprint.application.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs block text-center">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Outcomes */}
                  <Button
                    variant="ghost"
                    onClick={() => togglePhaseExpansion(index)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg"
                  >
                    <span className="font-semibold">View Detailed Outcomes & Challenges</span>
                    {expandedPhase === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </Button>
                  
                  {expandedPhase === index && (
                    <div className="mt-4 grid lg:grid-cols-2 gap-6">
                      {/* Touch Points */}
                      <div>
                        <h5 className="font-bold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Touch Points
                        </h5>
                        <div className="space-y-2">
                          {phase.touchPoints.map((point, pointIndex) => (
                            <div key={pointIndex} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded border border-green-200 dark:border-green-900/30">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-xs text-green-800 dark:text-green-200">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pain Points */}
                      <div>
                        <h5 className="font-bold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          Pain Points
                        </h5>
                        <div className="space-y-2">
                          {phase.painPoints.map((point, pointIndex) => (
                            <div key={pointIndex} className="flex items-start gap-2 p-2 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-900/30">
                              <AlertTriangle className="w-3 h-3 text-orange-600 mt-1 flex-shrink-0" />
                              <span className="text-xs text-orange-800 dark:text-orange-200">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
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
            <div className="text-2xl font-bold text-genie-accent mb-2">3</div>
            <div className="text-sm font-medium text-foreground mb-1">Gartner Phases</div>
            <div className="text-xs text-muted-foreground">Complete framework</div>
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