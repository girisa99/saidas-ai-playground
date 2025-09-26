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
  const [activeJourneyPhase, setActiveJourneyPhase] = useState(0);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  // Integrated Journey Phases with Technology Mapping
  const journeyPhases = [
    {
      timeline: "May 2025",
      title: "From Curiosity to Breakthrough",
      subtitle: "The 45-Day Deep Dive: Building My AI Lab",
      description: "What began as pure curiosity quickly transformed into an all-consuming personal mission. After two decades in the industry, AI felt profoundly different - a fundamental shift demanding deep, hands-on exploration through intensive experimentation and learning.",
      image: techJourneyBg,
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
      }
    },
    
    {
      timeline: "June-July 2025",
      title: "Platform Mastery & Integration",
      subtitle: "Scaling Beyond Experimentation",
      description: "Transitioning from curiosity-driven exploration to systematic platform evaluation and integration. Focus shifted to understanding enterprise-grade capabilities and building robust, scalable solutions that could serve real business needs.",
      image: techJourneyBg,
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
      }
    },
    
    {
      timeline: "August-September 2025",
      title: "Enterprise Transformation",
      subtitle: "Production-Ready AI Ecosystem",
      description: "Achieving enterprise-grade deployment capabilities with comprehensive AI ecosystem. Focus on business value delivery, stakeholder engagement, and sustainable innovation practices that drive measurable organizational impact.",
      image: techJourneyBg,
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
      }
    }
  ];

  // Gartner Value Framework Mapping
  const gartnerFramework = {
    "Envision": {
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      description: "Strategic vision development and innovation discovery",
      focus: "Exploration, Learning, Foundation Building"
    },
    "Engage": {
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20", 
      description: "Platform assessment and strategic alignment",
      focus: "Integration, Optimization, Scaling Preparation"
    },
    "Scale": {
      color: "bg-green-500/10 text-green-600 border-green-500/20",
      description: "Business value realization and optimization",
      focus: "Enterprise Deployment, Value Delivery, Sustainability"
    }
  };

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

        {/* Gartner Framework Overview */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Gartner Value Framework Phases</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(gartnerFramework).map(([phase, details], index) => (
              <Card key={phase} className={`p-6 text-center ${details.color}`}>
                <Badge className="mb-4">{phase}</Badge>
                <h4 className="font-bold mb-2">{details.description}</h4>
                <p className="text-sm text-muted-foreground">{details.focus}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Phase Navigation */}
        <div className="mb-12">
          <div className="flex justify-center space-x-4 mb-8">
            {journeyPhases.map((phase, index) => (
              <Button
                key={index}
                variant={activeJourneyPhase === index ? "default" : "outline"}
                onClick={() => setActiveJourneyPhase(index)}
                className="px-6 py-2"
              >
                {phase.gartnerPhase}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Journey Phase Detail */}
        <div className="mb-16">
          {journeyPhases.map((phase, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                activeJourneyPhase === index ? 'block' : 'hidden'
              }`}
            >
              <Card className="overflow-hidden">
                {/* Phase Header */}
                <div className="relative">
                  <div 
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${phase.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-genie-dark/90 via-genie-primary/80 to-genie-secondary/70" />
                  
                  <div className="absolute inset-0 p-8 flex items-center">
                    <div className="max-w-4xl">
                      <Badge className="bg-white/20 text-white border-white/30 mb-4">
                        {phase.timeline}
                      </Badge>
                      <h3 className="text-3xl font-bold text-white mb-2">{phase.title}</h3>
                      <h4 className="text-xl text-genie-accent mb-4">{phase.subtitle}</h4>
                      <p className="text-white/90 leading-relaxed">{phase.description}</p>
                    </div>
                  </div>
                </div>

                {/* Phase Content */}
                <div className="p-8">
                  {/* Gartner Framework Context */}
                  <div className="mb-8">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${gartnerFramework[phase.gartnerPhase].color} mb-4`}>
                      <Target className="w-5 h-5" />
                      <span className="font-semibold">Gartner Phase: {phase.gartnerPhase}</span>
                    </div>
                    <p className="text-muted-foreground">{phase.valueFramework}</p>
                  </div>

                  {/* Technology Stack Breakdown */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Core Technologies */}
                    <div>
                      <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-genie-primary" />
                        Core Technologies
                      </h5>
                      <div className="space-y-3">
                        {phase.coreCoreTechnologies.map((tech, techIndex) => {
                          const mapping = technologyMapping[tech.category] || { icon: Code2, color: "text-foreground" };
                          const IconComponent = mapping.icon;
                          return (
                            <div key={techIndex} className="flex items-center gap-3 p-3 bg-background rounded-lg border">
                              <IconComponent className={`w-5 h-5 ${mapping.color}`} />
                              <div>
                                <span className="font-medium">{tech.name}</span>
                                <div className="text-xs text-muted-foreground">{tech.category}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Supporting Tools */}
                    <div>
                      <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-genie-teal" />
                        Supporting Tools
                      </h5>
                      <div className="space-y-2">
                        {phase.supportingTools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm font-medium">{tool.name}</span>
                            <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Outcomes Section */}
                  <div className="border-t pt-6">
                    <Button
                      variant="ghost"
                      onClick={() => togglePhaseExpansion(index)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg"
                    >
                      <span className="font-semibold">View Detailed Outcomes & Challenges</span>
                      {expandedPhase === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </Button>
                    
                    {expandedPhase === index && (
                      <div className="mt-6 grid md:grid-cols-2 gap-8">
                        {/* Touch Points */}
                        <div>
                          <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            Touch Points
                          </h5>
                          <div className="space-y-3">
                            {phase.touchPoints.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900/30">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-green-800 dark:text-green-200">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pain Points */}
                        <div>
                          <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-600" />
                            Pain Points
                          </h5>
                          <div className="space-y-3">
                            {phase.painPoints.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900/30">
                                <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-orange-800 dark:text-orange-200">{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Blueprint Mapping */}
                  <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                    <h5 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-genie-primary" />
                      Technology Stack Blueprint
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <h6 className="font-semibold text-sm mb-2">Development Layer</h6>
                        <div className="space-y-1">
                          {phase.blueprint.developmentLayer.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h6 className="font-semibold text-sm mb-2">Core AI & Infrastructure</h6>
                        <div className="space-y-1">
                          {phase.blueprint.coreAI.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h6 className="font-semibold text-sm mb-2">Application & Impact</h6>
                        <div className="space-y-1">
                          {phase.blueprint.application.map((item, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Enhanced Technology Stack Summary */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Enhanced Technology Stack</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(technologyMapping).map(([category, details]) => {
              const IconComponent = details.icon;
              return (
                <Card key={category} className="p-4 text-center hover:shadow-md transition-shadow">
                  <IconComponent className={`w-8 h-8 ${details.color} mx-auto mb-3`} />
                  <h4 className="font-semibold text-sm">{category}</h4>
                </Card>
              );
            })}
          </div>
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