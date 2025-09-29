import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
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

  // FLAGSHIP FEATURE - Genie Conversational Feature Launch
  const genieConversationalFeature = {
    title: "🌟 Genie Conversational Feature - LIVE NOW",
    status: "FEATURED LAUNCH",
    description: "The first flagship feature of the Genie AI Experimentation Hub, demonstrating the Experiment → Validate → Lead to Deploy framework in action",
    capabilities: [
      "80+ Knowledge Contexts across healthcare AI domains",
      "Multi-Model Intelligence (GPT-4, Claude, Gemini)",
      "Split-Screen Conversations for model comparison",
      "Advanced RAG Architecture with intelligent context switching",
      "Model Comparison Mode for optimal AI selection",
      "Context Switching between specialized knowledge domains"
    ],
    framework: "Experiment → Validate → Lead to Deploy",
    phase: "LIVE IMPLEMENTATION",
    technicalStack: ["Advanced RAG", "Multi-LLM Orchestration", "Context Management", "Real-time Model Switching"],
    businessValue: "Demonstrates complete framework execution from experimentation to production deployment"
  };

  // Real Business Use Cases aligned with Journey and current implementations
  const businessUseCasesMapping = {
    'Artificial Intelligence & ML': {
      title: '🌟 Genie Conversational Feature - Clinical Intelligence & AI Decision Support',
      gartnerPhase: 'Envision → LIVE DEPLOYMENT',
      giveToGartner: ['Flagship AI Implementation', 'Multi-Model Intelligence', 'Advanced RAG Architecture'],
      getFromGartner: ['Production-Ready Framework', 'Scalable AI Platform', 'Healthcare Innovation Validation'],
      valueCreationSteps: ['🚀 LIVE: 80+ Knowledge Contexts', '🚀 LIVE: Multi-LLM Orchestration', '🚀 LIVE: Split-Screen Conversations'],
      cases: [
        '🌟 Genie Conversational Feature - Advanced RAG with 80+ healthcare contexts',
        'Multi-Model Intelligence (GPT-4, Claude, Gemini) with real-time switching',
        'Split-screen model comparison for optimal AI selection',
        'Context switching between specialized healthcare knowledge domains',
        'Production deployment demonstrating complete Experiment → Validate → Lead to Deploy framework'
      ],
      realWorldExamples: [
        '🌟 LIVE FEATURE: Advanced conversational AI with 80+ specialized healthcare contexts',
        'Multi-model comparison enabling users to select optimal AI for specific healthcare scenarios',
        'Split-screen interface demonstrating real-time model performance differences',
        'Production-ready implementation showcasing the complete framework journey from experimentation to deployment'
      ]
    },
    'MCP (Model Context Protocol)': {
      title: 'Healthcare System Context Integration',
      gartnerPhase: 'Envision → Engage',
      giveToGartner: ['Context Enhancement', 'System Integration', 'Workflow Unification'],
      getFromGartner: ['Platform Assessment', 'Integration Strategy', 'Scalability Planning'],
      valueCreationSteps: ['Assess Context Needs', 'Design Integration Architecture', 'Optimize Cross-System Workflows'],
      cases: [
        'Unified patient view across oncology and genetics systems',
        'Provider, Treatment Center & Referral Network integration',
        'Medical Records Acquisition from multiple healthcare systems',
        'Cross-platform care coordination between specialists',
        'Multi-system data harmonization for complex cases'
      ],
      realWorldExamples: [
        'Robert - Complex Onboarding: Multi-disciplinary coordination between oncology, genetics, and clinical trials',
        'Sarah - Family history integration across mammography and genetic counseling systems',
        'Michael - Complex Case: Coordinated care across multiple specialties with unified data view'
      ]
    },
    'Agentic AI': {
      title: 'Autonomous Healthcare Operations',
      gartnerPhase: 'Engage → Scale',
      giveToGartner: ['Process Automation', 'Autonomous Decision Support', 'Operational Excellence'],
      getFromGartner: ['Value Realization', 'ROI Optimization', 'Continuous Process Improvement'],
      valueCreationSteps: ['Measure Current Care Processes', 'Identify Automation Gaps', 'Deploy Autonomous Systems'],
      cases: [
        'Automated referral tracking and routing optimization',
        'Intelligent specialist matching based on case complexity',
        'Autonomous patient preparation and education systems',
        'Self-optimizing appointment scheduling workflows',
        'Predictive resource allocation for urgent cases'
      ],
      realWorldExamples: [
        'David - Urgent Support: AI immediately flags severe symptoms and routes to specialized care',
        'Maria - Automated same-day specialist scheduling for urgent pancreatic cancer case',
        'AI-generated pre-authorization documentation increases approval rates by 70%'
      ]
    },
    'Frontend Development': {
      title: 'Patient & Provider Digital Experience',
      gartnerPhase: 'Engage',
      giveToGartner: ['User Experience Optimization', 'Digital Transformation', 'Rapid Prototyping'],
      getFromGartner: ['Platform Assessment', 'Interface Design Strategy', 'User Adoption Planning'],
      valueCreationSteps: ['Assess User Journey Pain Points', 'Design Intuitive Interfaces', 'Optimize Digital Experience'],
      cases: [
        'Digital Contact Center Transformation - multi-channel patient interfaces',
        'Patient Portal for oncology appointment scheduling and results',
        'Provider dashboards for referral management and care coordination',
        'Mobile-first patient communication and education apps',
        'Real-time insurance verification and financial assistance interfaces'
      ],
      realWorldExamples: [
        'Jennifer - Treatment Inquiry: Multi-channel communication maintaining context across touchpoints',
        'Patient satisfaction projected to reach 8.7/10 with personalized digital communication',
        'Digital intake form parsing reducing 15% data entry errors to near zero'
      ]
    },
    'Backend Infrastructure': {
      title: 'Healthcare System Architecture & APIs',
      gartnerPhase: 'Engage → Scale',
      giveToGartner: ['Platform Scalability', 'System Integration', 'Performance Optimization'],
      getFromGartner: ['Architecture Assessment', 'Scalability Framework', 'Performance Standards'],
      valueCreationSteps: ['Assess Current Systems', 'Design Scalable Architecture', 'Implement & Scale'],
      cases: [
        'Scalable referral processing infrastructure handling 4-6 hour to 30-minute turnaround',
        'Real-time insurance verification API integration',
        'Multi-tenant healthcare platform supporting multiple specialties',
        'Edge computing for patient communication and case routing',
        'Microservices architecture for care coordination'
      ],
      realWorldExamples: [
        'Staff efficiency increased by 60% through AI-assisted workflow optimization',
        'Real-time insurance verification eliminates approval delays',
        'Unified patient view eliminates 5-8 minute information gathering delays'
      ]
    },
    'Data Management': {
      title: 'Healthcare Data Strategy & Analytics',
      gartnerPhase: 'Engage → Scale',
      giveToGartner: ['Data Strategy', 'Analytics Capabilities', 'ROI Measurement'],
      getFromGartner: ['Data Architecture Framework', 'Analytics Standards', 'Performance Metrics'],
      valueCreationSteps: ['Measure Data Quality', 'Identify Analytics Opportunities', 'Optimize Data-Driven Decisions'],
      cases: [
        'Oncology care workflow analytics and outcome tracking',
        'Patient referral completion rates and bottleneck analysis',
        'Contact center performance metrics and quality assurance',
        'Healthcare provider burnout reduction measurement',
        'Treatment outcome analytics for continuous improvement'
      ],
      realWorldExamples: [
        'Data accuracy improved to 98% with automated validation and AI error detection',
        'Healthcare provider satisfaction increased by 45% due to reduced administrative burden',
        'Predictive resource allocation reducing wait times by 85%'
      ]
    },
    'Security & Compliance': {
      title: 'Healthcare Security & Regulatory Compliance',
      gartnerPhase: 'Scale',
      giveToGartner: ['Risk Mitigation', 'Compliance Assurance', 'Trust Building'],
      getFromGartner: ['Security Framework', 'Compliance Standards', 'Risk Management'],
      valueCreationSteps: ['Assess Security Risks', 'Implement Compliance Controls', 'Monitor & Adjust'],
      cases: [
        'HIPAA-compliant patient data handling across all touchpoints',
        'Secure multi-channel patient communication and identity verification',
        'Audit trails for oncology care decisions and referral processes',
        'Voice biometrics reducing verification time to under 30 seconds',
        'Zero-trust architecture for healthcare system access'
      ],
      realWorldExamples: [
        'Voice biometrics authentication with 99.2% confidence for patient verification',
        'Manual identity verification failure rate reduced from 15% to near zero',
        'Secure genomic data handling for BRCA testing and family history analysis'
      ]
    },
    'Integration & Communication': {
      title: 'Healthcare Communication & Workflow Integration',
      gartnerPhase: 'Scale',
      giveToGartner: ['Business Process Optimization', 'Operational Efficiency', 'Value Realization'],
      getFromGartner: ['Integration Framework', 'Process Excellence', 'Continuous Value'],
      valueCreationSteps: ['Measure Communication Efficiency', 'Identify Integration Bottlenecks', 'Optimize & Scale'],
      cases: [
        'Digital Contact Center with 70% hold time reduction',
        'Automated patient education and preparation systems',
        'Multi-channel patient communication maintaining context',
        'Provider-to-provider coordination for complex cases',
        'Automated insurance and pre-authorization workflows'
      ],
      realWorldExamples: [
        'Jennifer - Seamless multi-channel coordination maintains context across all touchpoints',
        'Smart IVR with NLP reduces hold times by 70% and improves first-call resolution by 85%',
        'Personalized preparation achieves 95% patient readiness with AI-guided education'
      ]
    }
  };

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
      gartnerValue: ["Innovation Discovery", "Proof of Concept", "AI Strategy Development"],
      integrationBlueprint: "AI Model Selection → Training Pipeline → Inference Optimization → Performance Monitoring"
    },

    "MCP (Model Context Protocol)": {
      icon: Network,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "Standardized protocol for AI model context sharing and integration",
      journeyPhase: "Envision → Engage",
      coreStack: {
        "Protocol Stack": ["MCP Server", "Context Bridges", "Tool Integration", "State Management"],
        "Implementation": ["Claude Desktop", "VS Code Extensions", "API Connectors", "Data Sources"],
        "Tools": ["File System Access", "Database Queries", "Web Scraping", "Custom Functions"]
      },
      businessOutcomes: ["Enhanced AI Context", "Cross-Platform Integration", "Tool Orchestration", "Workflow Automation"],
      gartnerValue: ["Context Enhancement", "Tool Unification", "Productivity Acceleration"],
      integrationBlueprint: "MCP Server Setup → Tool Registration → Context Bridge Configuration → AI Model Integration"
    },

    "Agentic AI": {
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      description: "Autonomous AI agents with reasoning, planning, and execution capabilities",
      journeyPhase: "Engage → Scale",
      coreStack: {
        "Agent Frameworks": ["LangGraph", "CrewAI", "AutoGen", "Multi-Agent Systems"],
        "Planning & Reasoning": ["Chain of Thought", "Tree of Thought", "ReAct Framework", "Tool Use"],
        "Orchestration": ["Task Planning", "Agent Coordination", "Workflow Management", "Result Synthesis"]
      },
      businessOutcomes: ["Autonomous Customer Service", "Healthcare Process Automation", "Complex Task Resolution", "Multi-step Workflows"],
      gartnerValue: ["Process Automation", "Decision Support", "Operational Excellence"],
      integrationBlueprint: "Agent Design → Tool Integration → Planning Logic → Execution Monitoring → Feedback Loops"
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
      gartnerValue: ["User Experience Optimization", "Rapid Prototyping", "Digital Transformation"],
      integrationBlueprint: "Component Library → Design System → State Management → Performance Optimization → Testing"
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
      gartnerValue: ["Platform Assessment", "Scalability Planning", "Integration Strategy"],
      integrationBlueprint: "Infrastructure Design → Container Orchestration → Load Balancing → Auto-scaling → Monitoring"
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
      gartnerValue: ["Data Strategy", "Analytics Capabilities", "ROI Measurement"],
      integrationBlueprint: "Data Architecture → ETL Pipeline → Analytics Layer → Visualization → Insights Delivery"
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
      gartnerValue: ["Risk Mitigation", "Compliance Assurance", "Trust Building"],
      integrationBlueprint: "Security Assessment → Identity Management → Encryption Implementation → Compliance Monitoring → Audit Trails"
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
      gartnerValue: ["Business Process Optimization", "Operational Efficiency", "Value Realization"],
      integrationBlueprint: "API Gateway Setup → Service Integration → Communication Channels → Workflow Automation → Performance Optimization"
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
            Genie AI Experimentation Hub - 3-Phase Technology Ecosystem
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-genie-primary">Experiment → Validate → Lead to Deploy</span> Technology Arsenal
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Technology ecosystem powering the <span className="text-genie-primary font-semibold">Genie AI Experimentation Hub</span> framework. 
            From AI models and development tools to scalable infrastructure — each layer designed for healthcare innovation with enterprise-grade reliability.
          </p>

        {/* FLAGSHIP FEATURE - Genie Conversational Feature */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Badge className="bg-genie-accent text-background border-genie-accent mb-4 text-sm font-bold px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              🌟 FLAGSHIP FEATURE - NOW LIVE
            </Badge>
            <h3 className="text-2xl lg:text-4xl font-bold mb-4">
              <span className="text-genie-accent">Genie Conversational Feature</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The first flagship implementation of our Experiment → Validate → Lead to Deploy framework — demonstrating complete journey from experimentation to production deployment.
            </p>
          </div>

          <Card className="max-w-6xl mx-auto border-2 border-genie-accent/30 bg-gradient-to-br from-genie-accent/5 via-background to-genie-primary/5">
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xl text-genie-accent mb-4 flex items-center gap-2">
                    <Brain className="w-6 h-6" />
                    Advanced AI Capabilities
                  </h4>
                  <div className="space-y-3">
                    {genieConversationalFeature.capabilities.map((capability, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-genie-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-foreground">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-xl text-genie-primary mb-4 flex items-center gap-2">
                    <Code2 className="w-6 h-6" />
                    Technical Implementation
                  </h4>
                  <div className="space-y-3 mb-6">
                    {genieConversationalFeature.technicalStack.map((tech, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-genie-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{tech}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-genie-accent/10 to-genie-primary/10 rounded-lg border border-genie-accent/20">
                    <h5 className="font-bold text-genie-accent mb-2 text-sm">Framework Implementation Status</h5>
                    <Badge className="bg-emerald-500 text-white text-xs font-bold px-3 py-1">
                      ✅ LIVE DEPLOYMENT
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">
                      Complete framework execution: Experimentation → Validation → Production Deployment
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-lg text-genie-accent font-semibold mb-4">
                  Experience the Genie AI Experimentation Hub Framework in Action
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-genie-accent hover:bg-genie-accent/90 text-background font-semibold"
                    onClick={() => {
                      console.debug('[IntegratedTechnologyExploration] Opening Genie popup');
                      const event = new CustomEvent('openGeniePopup');
                      window.dispatchEvent(event);
                    }}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Try Genie Conversation Now
                  </Button>
                  <Button variant="outline" className="border-genie-primary text-genie-primary hover:bg-genie-primary/10">
                    <Target className="w-4 h-4 mr-2" />
                    View Technical Case Study
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/case-studies">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                <BarChart3 className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                See Framework Results
                <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/journey">
              <Button variant="outline" size="lg" className="px-8 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                View Complete Journey
              </Button>
            </Link>
          </div>
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
                             <Target className="w-3 h-3 text-genie-primary" />
                             Real Business Use Cases
                           </h5>
                           <div className="space-y-1">
                             {businessUseCasesMapping[category]?.cases.map((useCase, index) => (
                               <div key={index} className="text-xs p-2 bg-genie-primary/5 rounded border border-genie-primary/10">{useCase}</div>
                             )) || details.businessOutcomes.map((outcome, index) => (
                               <div key={index} className="text-xs p-2 bg-muted/50 rounded">{outcome}</div>
                             ))}
                           </div>
                         </div>
                        
                          <div>
                            <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                              <Users className="w-3 h-3 text-genie-teal" />
                              Real-World Examples
                            </h5>
                            <div className="space-y-1">
                              {businessUseCasesMapping[category]?.realWorldExamples.map((example, index) => (
                                <div key={index} className="text-xs p-2 bg-genie-teal/5 rounded border border-genie-teal/10">{example}</div>
                              )) || details.businessOutcomes.slice(0, 3).map((outcome, index) => (
                                <div key={index} className="text-xs p-2 bg-blue-50 dark:bg-blue-950/20 rounded">{outcome}</div>
                              ))}
                            </div>
                          </div>
                      </div>

                       {/* Value Creation Steps */}
                       <div className="mb-4">
                         <h5 className="font-semibold text-xs mb-2 flex items-center gap-1">
                           <CheckCircle className="w-3 h-3 text-emerald-600" />
                           Value Creation Steps
                         </h5>
                         <div className="space-y-2">
                           {businessUseCasesMapping[category]?.valueCreationSteps.map((step, index) => (
                             <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                               <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                 {index + 1}
                               </div>
                               <span className="text-xs text-emerald-700 dark:text-emerald-300">{step}</span>
                             </div>
                           )) || details.gartnerValue.slice(0, 3).map((value, index) => (
                             <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded">
                               <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                 {index + 1}
                               </div>
                               <span className="text-xs text-emerald-700 dark:text-emerald-300">{value}</span>
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Gartner GIVE and GET Framework */}
                       <div className="grid md:grid-cols-2 gap-4 mb-4">
                         <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                           <h5 className="font-semibold text-xs mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-300">
                             <ArrowUp className="w-3 h-3" />
                             GIVE to Gartner Framework
                           </h5>
                           <div className="space-y-2">
                             {businessUseCasesMapping[category]?.giveToGartner.map((give, index) => (
                               <div key={index} className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                 <span className="text-xs text-blue-700 dark:text-blue-300">{give}</span>
                               </div>
                             )) || details.gartnerValue.map((value, index) => (
                               <div key={index} className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                 <span className="text-xs text-blue-700 dark:text-blue-300">{value}</span>
                               </div>
                             ))}
                           </div>
                         </div>

                         <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                           <h5 className="font-semibold text-xs mb-3 flex items-center gap-2 text-green-700 dark:text-green-300">
                             <ArrowDown className="w-3 h-3" />
                             GET from Gartner Framework
                           </h5>
                           <div className="space-y-2">
                             {businessUseCasesMapping[category]?.getFromGartner.map((get, index) => (
                               <div key={index} className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                 <span className="text-xs text-green-700 dark:text-green-300">{get}</span>
                               </div>
                             )) || ['Strategic Alignment', 'Value Optimization', 'Performance Excellence'].map((get, index) => (
                               <div key={index} className="flex items-center gap-2">
                                 <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                 <span className="text-xs text-green-700 dark:text-green-300">{get}</span>
                               </div>
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
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Enhanced Dynamic Technology Integration Blueprint */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-4">Dynamic Technology Integration Blueprint</h3>
          <p className="text-center text-muted-foreground mb-8">
            Integration blueprint adapts based on selected technology category - showing GIVE/GET framework alignment and value creation steps
          </p>
          <Card className="p-6">
            {expandedCategory ? (
              <div className="space-y-6">
                <h4 className="font-bold text-center text-lg mb-4">
                  Integration Blueprint for: <span className="text-genie-primary">{expandedCategory}</span>
                </h4>
                
                {/* Enhanced Integration Flow */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Gartner Framework Alignment */}
                  <div className="space-y-4">
                    <h5 className="font-semibold text-sm flex items-center gap-2 text-genie-primary">
                      <Brain className="w-4 h-4" />
                      Gartner Framework Alignment
                    </h5>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowUp className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-700">GIVE to Framework</span>
                        </div>
                        <div className="space-y-1">
                          {businessUseCasesMapping[expandedCategory]?.giveToGartner.map((give, index) => (
                            <div key={index} className="text-xs text-blue-600">• {give}</div>
                          )) || ['Innovation Discovery', 'Platform Assessment', 'Value Creation'].map((give, index) => (
                            <div key={index} className="text-xs text-blue-600">• {give}</div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowDown className="w-3 h-3 text-green-600" />
                          <span className="text-xs font-semibold text-green-700">GET from Framework</span>
                        </div>
                        <div className="space-y-1">
                          {businessUseCasesMapping[expandedCategory]?.getFromGartner.map((get, index) => (
                            <div key={index} className="text-xs text-green-600">• {get}</div>
                          )) || ['Strategic Vision', 'Technology Assessment', 'Value Optimization'].map((get, index) => (
                            <div key={index} className="text-xs text-green-600">• {get}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Value Creation Steps */}
                  <div className="space-y-4">
                    <h5 className="font-semibold text-sm flex items-center gap-2 text-genie-teal">
                      <Target className="w-4 h-4" />
                      Value Creation Process
                    </h5>
                    
                    <div className="space-y-2">
                      {businessUseCasesMapping[expandedCategory]?.valueCreationSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="text-xs text-emerald-700 dark:text-emerald-300">{step}</span>
                        </div>
                      )) || ['Define Strategy', 'Assess Platforms', 'Implement Solution'].map((step, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="text-xs text-emerald-700 dark:text-emerald-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Technology Integration Blueprint */}
                <div className="p-4 bg-gradient-to-r from-genie-primary/5 to-genie-secondary/5 rounded-lg border-l-4 border-genie-primary">
                  <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    Technical Implementation Path
                  </h5>
                  <p className="text-sm font-medium text-genie-primary">
                    {technologyEcosystem[expandedCategory as keyof typeof technologyEcosystem]?.integrationBlueprint || 'Technology Integration → Platform Assessment → Scalability Design → Value Optimization'}
                  </p>
                </div>
                
                {/* Business Outcomes Preview */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-xs mb-2 text-muted-foreground">Business Applications</h5>
                    <div className="space-y-1">
                      {businessUseCasesMapping[expandedCategory]?.cases.slice(0, 3).map((useCase, index) => (
                        <div key={index} className="text-xs p-2 bg-muted/30 rounded">{useCase}</div>
                      )) || ['Healthcare Innovation', 'Patient Care Enhancement', 'Operational Excellence'].map((useCase, index) => (
                        <div key={index} className="text-xs p-2 bg-muted/30 rounded">{useCase}</div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs mb-2 text-muted-foreground">Real-World Examples</h5>
                    <div className="space-y-1">
                      {businessUseCasesMapping[expandedCategory]?.realWorldExamples.slice(0, 2).map((example, index) => (
                        <div key={index} className="text-xs p-2 bg-muted/30 rounded">{example}</div>
                      )) || ['Clinical workflow optimization', 'Patient communication enhancement'].map((example, index) => (
                        <div key={index} className="text-xs p-2 bg-muted/30 rounded">{example}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Network className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Click on any technology category above to see its specific integration blueprint</p>
                <p className="text-xs mt-2">Each blueprint shows GIVE/GET framework alignment and value creation steps</p>
              </div>
            )}
          </Card>
        </div>

        {/* Implementation Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <Card className="p-4 text-center border-genie-primary/20">
            <div className="w-10 h-10 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Layers className="w-5 h-5 text-genie-primary" />
            </div>
            <div className="text-xl font-bold text-genie-primary mb-1">8</div>
            <div className="text-xs font-medium text-foreground mb-1">Technology Categories</div>
            <div className="text-xs text-muted-foreground">Including MCP & Agentic AI</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-teal/20">
            <div className="w-10 h-10 bg-genie-teal/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-5 h-5 text-genie-teal" />
            </div>
            <div className="text-xl font-bold text-genie-teal mb-1">10+</div>
            <div className="text-xs font-medium text-foreground mb-1">Integrated Tools</div>
            <div className="text-xs text-muted-foreground">Business API integrations</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-cyan/20">
            <div className="w-10 h-10 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-genie-cyan" />
            </div>
            <div className="text-xl font-bold text-genie-cyan mb-1">10+</div>
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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                View 3-Phase Journey
              </Button>
            </Link>
            <Link to="/case-studies">
              <Button variant="outline" size="lg" className="px-8 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                See Framework Impact
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};