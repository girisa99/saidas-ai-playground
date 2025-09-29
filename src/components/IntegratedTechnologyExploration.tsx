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

  // Comprehensive Integration Mapping for all Technology Categories
  const experimentationMapping = {
    'Artificial Intelligence & ML': {
      title: '🌟 Genie Conversational Feature - Multi-Model AI Intelligence',
      gartnerPhase: 'Envision → LIVE DEPLOYMENT',
      experiment: {
        businessScenarios: ['AI model selection research', 'Healthcare context analysis', 'Multi-LLM comparison testing'],
        technologyImplementation: ['GPT-4 API integration', 'Claude model testing', 'Gemini Pro evaluation'],
        integrationMapping: 'Model Selection → Context Architecture → RAG Implementation'
      },
      validate: {
        businessScenarios: ['Real-world healthcare professional testing', 'Context switching validation', 'Performance comparison analysis'],
        technologyImplementation: ['Multi-LLM Orchestration', 'Advanced RAG Architecture', 'Split-Screen Interface'],
        integrationMapping: 'Multi-LLM Orchestration → Context Management → User Interface'
      },
      leadToDeploy: {
        businessScenarios: ['Production deployment', '80+ Knowledge Contexts live', 'Real-time model switching'],
        technologyImplementation: ['Production-Ready AI Platform', 'Real-time Model Switching', 'Scalable Infrastructure'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous Optimization'
      },
      valueCreationSteps: ['🚀 LIVE: 80+ Knowledge Contexts', '🚀 LIVE: Multi-LLM Orchestration', '🚀 LIVE: Split-Screen Conversations', 'Advanced RAG Architecture', 'Real-time Model Switching'],
      businessUseCases: [
        '🌟 Genie Conversational Feature - Advanced RAG with 80+ healthcare contexts',
        'Multi-Model Intelligence (GPT-4, Claude, Gemini) with real-time switching',
        'Split-screen model comparison for optimal AI selection',
        'Context switching between specialized healthcare knowledge domains'
      ],
      scenarios: [
        'Healthcare professional needs specialized AI advice across multiple domains',
        'Comparative analysis between AI models for specific healthcare scenarios',
        'Context-aware conversations switching between clinical specialties'
      ],
      realWorldExamples: [
        '🌟 LIVE FEATURE: Advanced conversational AI with 80+ specialized healthcare contexts',
        'Multi-model comparison enabling users to select optimal AI for specific healthcare scenarios',
        'Split-screen interface demonstrating real-time model performance differences'
      ]
    },
    'MCP (Model Context Protocol)': {
      title: 'Healthcare System Context Integration',
      gartnerPhase: 'Envision → Engage',
      experiment: {
        businessScenarios: ['Healthcare system integration research', 'Context protocol evaluation', 'Multi-system data flow analysis'],
        technologyImplementation: ['MCP Server setup', 'Context Bridges development', 'Tool Integration testing'],
        integrationMapping: 'Context Assessment → MCP Server Setup → Tool Integration'
      },
      validate: {
        businessScenarios: ['Cross-platform care coordination validation', 'Unified patient view testing', 'Multi-system orchestration'],
        technologyImplementation: ['Cross-System Bridges', 'Unified Workflows', 'Multi-System Orchestration'],
        integrationMapping: 'Cross-System Bridges → Unified Workflows → Data Harmonization'
      },
      leadToDeploy: {
        businessScenarios: ['Production healthcare system integration', 'Real-time cross-platform data flows', 'Scalable multi-system coordination'],
        technologyImplementation: ['Production MCP Implementation', 'Enterprise Integration', 'Scalable Architecture'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous Optimization'
      },
      valueCreationSteps: ['Context Protocol Implementation', 'Healthcare System Integration', 'Cross-Platform Data Flows', 'Unified Patient Views', 'Multi-System Orchestration'],
      businessUseCases: [
        'Unified patient view across oncology and genetics systems',
        'Provider, Treatment Center & Referral Network integration',
        'Medical Records Acquisition from multiple healthcare systems',
        'Cross-platform care coordination between specialists'
      ],
      scenarios: [
        'Patient with complex medical history needs unified care across multiple specialists',
        'Healthcare provider needs integrated view of patient data from different systems',
        'Clinical trial coordination requiring data from multiple healthcare platforms'
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
      experiment: {
        businessScenarios: ['Process automation research', 'Autonomous decision support testing', 'Workflow optimization analysis'],
        technologyImplementation: ['Agent Design', 'Workflow Automation', 'Decision Orchestration'],
        integrationMapping: 'Process Analysis → Agent Design → Workflow Automation'
      },
      validate: {
        businessScenarios: ['Automated referral tracking validation', 'Intelligent specialist matching testing', 'Self-optimizing scheduling'],
        technologyImplementation: ['Autonomous Decision Support', 'Workflow Optimization', 'Predictive Resource Allocation'],
        integrationMapping: 'Decision Orchestration → Predictive Analytics → Continuous Optimization'
      },
      leadToDeploy: {
        businessScenarios: ['Production autonomous operations', 'Real-time intelligent routing', 'Scalable automation workflows'],
        technologyImplementation: ['Production Automation', 'Enterprise Orchestration', 'Continuous Learning Systems'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous Learning'
      },
      valueCreationSteps: ['Process Automation Implementation', 'Autonomous Decision Support', 'Workflow Optimization', 'Predictive Resource Allocation', 'Continuous Learning Systems'],
      businessUseCases: [
        'Automated referral tracking and routing optimization',
        'Intelligent specialist matching based on case complexity',
        'Autonomous patient preparation and education systems',
        'Self-optimizing appointment scheduling workflows'
      ],
      scenarios: [
        'Urgent patient case requires immediate specialist routing and resource allocation',
        'Complex patient case needs intelligent specialist matching based on multiple factors',
        'High-volume appointment scheduling requires autonomous optimization'
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
      experiment: {
        businessScenarios: ['User experience research', 'Digital interface prototyping', 'Multi-channel design testing'],
        technologyImplementation: ['User Research', 'Design System', 'Component Architecture'],
        integrationMapping: 'User Research → Design System → Component Architecture'
      },
      validate: {
        businessScenarios: ['Multi-channel patient interface validation', 'Provider dashboard testing', 'Mobile-first optimization'],
        technologyImplementation: ['Responsive Implementation', 'Performance Optimization', 'Accessibility Implementation'],
        integrationMapping: 'Responsive Implementation → Performance Optimization → User Testing'
      },
      leadToDeploy: {
        businessScenarios: ['Production digital interfaces', 'Multi-device patient communication', 'Real-time user experiences'],
        technologyImplementation: ['Production Deployment', 'Scalable Frontend Architecture', 'Continuous UX Optimization'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous UX Improvement'
      },
      valueCreationSteps: ['User Experience Design', 'Digital Interface Development', 'Multi-channel Integration', 'Mobile-first Optimization', 'Accessibility Implementation'],
      businessUseCases: [
        'Digital Contact Center Transformation - multi-channel patient interfaces',
        'Patient Portal for oncology appointment scheduling and results',
        'Provider dashboards for referral management and care coordination',
        'Mobile-first patient communication and education apps'
      ],
      scenarios: [
        'Patient needs seamless experience across web, mobile, and phone interactions',
        'Healthcare provider requires comprehensive dashboard for patient management',
        'Digital transformation of traditional paper-based patient intake processes'
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
      experiment: {
        businessScenarios: ['Scalable architecture research', 'API design experimentation', 'Performance testing'],
        technologyImplementation: ['Architecture Design', 'API Development', 'Microservices Implementation'],
        integrationMapping: 'Architecture Design → API Development → Microservices Implementation'
      },
      validate: {
        businessScenarios: ['Real-time integration validation', 'Multi-tenant platform testing', 'Edge computing deployment'],
        technologyImplementation: ['Load Balancing', 'Auto-scaling Deployment', 'Infrastructure Automation'],
        integrationMapping: 'Load Balancing → Auto-scaling → Infrastructure Automation'
      },
      leadToDeploy: {
        businessScenarios: ['Production infrastructure deployment', 'Enterprise-scale operations', 'Continuous optimization'],
        technologyImplementation: ['Production Infrastructure', 'Enterprise Architecture', 'Continuous Monitoring'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous Optimization'
      },
      valueCreationSteps: ['Scalable Architecture Design', 'API Integration Development', 'Performance Optimization', 'Microservices Implementation', 'Infrastructure Automation'],
      businessUseCases: [
        'Scalable referral processing infrastructure handling 4-6 hour to 30-minute turnaround',
        'Real-time insurance verification API integration',
        'Multi-tenant healthcare platform supporting multiple specialties',
        'Edge computing for patient communication and case routing'
      ],
      scenarios: [
        'High-volume patient referral processing requiring rapid turnaround times',
        'Real-time integration with insurance verification systems',
        'Multi-specialty healthcare platform needing tenant isolation'
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
      experiment: {
        businessScenarios: ['Data architecture research', 'Analytics pipeline experimentation', 'Business intelligence testing'],
        technologyImplementation: ['Data Architecture', 'ETL Pipeline Development', 'Analytics Implementation'],
        integrationMapping: 'Data Architecture → ETL Pipeline Development → Analytics Implementation'
      },
      validate: {
        businessScenarios: ['Care outcome analytics validation', 'Performance metrics testing', 'Predictive analytics deployment'],
        technologyImplementation: ['Visualization', 'Insights Delivery', 'Data-Driven Decision Support'],
        integrationMapping: 'Visualization → Insights Delivery → Decision Support Integration'
      },
      leadToDeploy: {
        businessScenarios: ['Production analytics platform', 'Enterprise data governance', 'Continuous analytics optimization'],
        technologyImplementation: ['Production Data Platform', 'Enterprise Analytics', 'Continuous Intelligence'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous Analytics Optimization'
      },
      valueCreationSteps: ['Data Quality Assessment', 'Analytics Pipeline Development', 'Business Intelligence Implementation', 'Predictive Analytics', 'Data-Driven Decision Support'],
      businessUseCases: [
        'Oncology care workflow analytics and outcome tracking',
        'Patient referral completion rates and bottleneck analysis',
        'Contact center performance metrics and quality assurance',
        'Healthcare provider burnout reduction measurement'
      ],
      scenarios: [
        'Healthcare organization needs comprehensive care outcome analytics',
        'Patient referral bottleneck identification and optimization',
        'Contact center performance monitoring and quality improvement'
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
      experiment: {
        businessScenarios: ['Security risk assessment research', 'Compliance framework testing', 'Identity management experimentation'],
        technologyImplementation: ['Security Assessment', 'Compliance Framework', 'Identity Management'],
        integrationMapping: 'Security Assessment → Compliance Framework → Identity Management'
      },
      validate: {
        businessScenarios: ['HIPAA compliance validation', 'Identity verification testing', 'Audit trail deployment'],
        technologyImplementation: ['Encryption Implementation', 'Audit Systems', 'Zero-trust Architecture'],
        integrationMapping: 'Encryption Implementation → Audit Systems → Zero-trust Deployment'
      },
      leadToDeploy: {
        businessScenarios: ['Production security infrastructure', 'Enterprise compliance monitoring', 'Continuous security optimization'],
        technologyImplementation: ['Production Security', 'Enterprise Compliance', 'Continuous Security Monitoring'],
        integrationMapping: 'Production Deployment → Security Monitoring → Continuous Compliance'
      },
      valueCreationSteps: ['Security Risk Assessment', 'HIPAA Compliance Implementation', 'Identity Verification Systems', 'Data Encryption', 'Audit Trail Development'],
      businessUseCases: [
        'HIPAA-compliant patient data handling across all touchpoints',
        'Secure multi-channel patient communication and identity verification',
        'Audit trails for oncology care decisions and referral processes',
        'Voice biometrics reducing verification time to under 30 seconds'
      ],
      scenarios: [
        'Healthcare system requires comprehensive HIPAA compliance across all touchpoints',
        'Patient identity verification needs to be both secure and user-friendly',
        'Clinical decision audit trails required for regulatory compliance'
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
      experiment: {
        businessScenarios: ['Communication efficiency research', 'Integration architecture experimentation', 'Workflow automation testing'],
        technologyImplementation: ['Communication Assessment', 'Integration Architecture', 'Workflow Automation'],
        integrationMapping: 'Communication Assessment → Integration Architecture → Workflow Automation'
      },
      validate: {
        businessScenarios: ['Digital contact center validation', 'Multi-channel communication testing', 'Provider coordination deployment'],
        technologyImplementation: ['Multi-channel Orchestration', 'Performance Optimization', 'Continuous Process Optimization'],
        integrationMapping: 'Multi-channel Orchestration → Performance Optimization → Process Optimization'
      },
      leadToDeploy: {
        businessScenarios: ['Production communication platform', 'Enterprise workflow integration', 'Continuous optimization'],
        technologyImplementation: ['Production Communication Platform', 'Enterprise Integration', 'Continuous Workflow Optimization'],
        integrationMapping: 'Production Deployment → Monitoring → Continuous Communication Optimization'
      },
      valueCreationSteps: ['Communication Efficiency Analysis', 'Integration Bottleneck Resolution', 'Workflow Automation', 'Multi-channel Coordination', 'Continuous Process Optimization'],
      businessUseCases: [
        'Digital Contact Center with 70% hold time reduction',
        'Automated patient education and preparation systems',
        'Multi-channel patient communication maintaining context',
        'Provider-to-provider coordination for complex cases'
      ],
      scenarios: [
        'High-volume contact center needs intelligent call routing and hold time reduction',
        'Patient preparation workflows require automation for consistency',
        'Multi-channel patient communication needs context preservation'
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
      experimentResults: ["Innovation Discovery", "Proof of Concept", "AI Strategy Development"],
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
      experimentResults: ["Context Enhancement", "Tool Unification", "Productivity Acceleration"],
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
      experimentResults: ["Process Automation", "Decision Support", "Operational Excellence"],
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
      experimentResults: ["User Experience Optimization", "Rapid Prototyping", "Digital Transformation"],
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
      experimentResults: ["Platform Assessment", "Scalability Planning", "Integration Strategy"],
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
      experimentResults: ["Data Strategy", "Analytics Capabilities", "ROI Measurement"],
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
      experimentResults: ["Risk Mitigation", "Compliance Assurance", "Trust Building"],
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
        "APIs": ["REST", "GraphQL", "Webhooks", "Message Queues"],
        "Communication": ["Twilio", "SendGrid", "Slack", "Teams"],
        "Automation": ["Zapier", "N8N", "Workflow Engines", "Event Streaming"]
      },
      businessOutcomes: ["Multi-channel Communication", "Process Automation", "System Integration", "Real-time Coordination"],
      experimentResults: ["Business Process Optimization", "Operational Efficiency", "Value Realization"],
      integrationBlueprint: "API Design → Integration Layer → Workflow Automation → Monitoring → Optimization"
    }
  };

  // Experimentation phases aligned with framework
  const experimentationPhases = [
    {
      phase: "EXPERIMENT",
      icon: Brain,
      description: "Discover & test new technologies",
      focus: "Innovation through experimentation",
      color: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300",
      context: "GPT, Claude, Cursor IDE"
    },
    {
      phase: "VALIDATE", 
      icon: CheckCircle,
      description: "Prove value through real implementation",
      focus: "Real-world validation & refinement",
      color: "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300",
      context: "Loveable, Bolt, TypeScript"
    },
    {
      phase: "LEAD to DEPLOY",
      icon: Target,
      description: "Scale from prototype to production",
      focus: "Production deployment & scaling",
      color: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300",
      context: "Supabase, Docker, CI/CD"
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
            Experimentation-driven technology ecosystem powering the <span className="text-genie-primary font-semibold">Genie AI Experimentation Hub</span>. 
            Every tool, every integration, every decision stems from hands-on experimentation and real learning. See what we discovered, how we built it, and what's coming next.
          </p>

        {/* Progressive Experimentation Updates */}
        <div className="mb-8">
          <Badge className="bg-genie-cyan/20 text-genie-cyan border-genie-cyan/30 mb-4">
            <Calendar className="w-3 h-3 mr-2" />
            🚀 Regular Feature Releases
          </Badge>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            New experiments and features launch every <span className="text-genie-cyan font-semibold">2-3 weeks</span>. 
            Each release shares what we learned, how we built it, and what worked (or didn't!).
          </p>
        </div>

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
        </div>

        {/* Technology Ecosystem → Experimentation → Learning */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-center mb-6">Technology → Experimentation → Learning</h3>
          
          {/* Flow Legend */}
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-emerald-950/20 p-6 rounded-xl mb-8">
            <div className="grid md:grid-cols-3 gap-4 items-center">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full text-blue-700 font-medium mb-2">
                  <Code2 className="w-4 h-4" />
                  Technology Stack
                </div>
                <p className="text-xs text-muted-foreground">Tools & platforms we chose for experimentation</p>
              </div>
              <div className="text-center">
                <ArrowRight className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="inline-flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full text-purple-700 font-medium mb-2">
                  <Brain className="w-4 h-4" />
                  Hands-on Testing
                </div>
                <p className="text-xs text-muted-foreground">Real experiments with real challenges</p>
              </div>
              <div className="text-center">
                <ArrowRight className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full text-emerald-700 font-medium mb-2">
                  <Lightbulb className="w-4 h-4" />
                  Shared Learning
                </div>
                <p className="text-xs text-muted-foreground">What worked, what didn't, and why</p>
              </div>
            </div>
          </div>

          {/* Experimentation Framework Alignment */}
          <div className="grid md:grid-cols-3 gap-4">
            {experimentationPhases.map((phase, index) => {
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

        {/* Technology Categories with Experimentation Mapping */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-4">Technology Categories → Experimentation Results</h3>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Each technology category represents real experiments, trials, and learnings. 
            See what we tried, what worked, and what we learned from hands-on testing.
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
                          <h4 className="font-semibold text-sm">{category}</h4>
                          <p className="text-xs text-muted-foreground">{details.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${details.color} bg-transparent border-current`}>
                          {details.journeyPhase}
                        </Badge>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-6 border-t">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Core Technology Stack */}
                        <div>
                          <h5 className="font-semibold text-sm mb-3 flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            Core Stack & Tools
                          </h5>
                          <div className="space-y-3">
                            {Object.entries(details.coreStack).map(([stackCategory, items]) => (
                              <div key={stackCategory}>
                                <h6 className="text-xs font-medium text-muted-foreground mb-1">{stackCategory}</h6>
                                <div className="flex flex-wrap gap-1">
                                  {items.map((item, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                                      {item}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Gartner Give & Get Framework */}
                        <div>
                          <h5 className="font-semibold text-sm mb-3 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Gartner Framework Mapping
                          </h5>
                          
                          <div className="mb-4">
                            <Badge className={`${details.color} bg-transparent border-current text-xs mb-2`}>
                              Framework Phase: {experimentationMapping[category]?.gartnerPhase || details.journeyPhase}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                              <h6 className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-1">
                                <ArrowUp className="w-3 h-3" />
                                Give to Gartner
                              </h6>
                              <div className="space-y-1">
                                {experimentationMapping[category]?.giveToGartner?.map((item, index) => (
                                  <div key={index} className="flex items-start gap-2">
                                    <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-xs text-green-700 dark:text-green-300">{item}</span>
                                  </div>
                                )) || (
                                  <div className="text-xs text-green-700 dark:text-green-300">
                                    Technology leadership and innovation expertise
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                              <h6 className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-1">
                                <ArrowDown className="w-3 h-3" />
                                Get from Gartner
                              </h6>
                              <div className="space-y-1">
                                {experimentationMapping[category]?.getFromGartner?.map((item, index) => (
                                  <div key={index} className="flex items-start gap-2">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-xs text-blue-700 dark:text-blue-300">{item}</span>
                                  </div>
                                )) || (
                                  <div className="text-xs text-blue-700 dark:text-blue-300">
                                    Framework validation and best practices guidance
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <h5 className="font-semibold text-sm mb-3 flex items-center gap-1">
                            <Network className="w-3 h-3" />
                            Integration Blueprint
                          </h5>
                          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
                            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                              {experimentationMapping[category]?.integrationBlueprint || details.integrationBlueprint}
                            </p>
                          </div>

                          <h5 className="font-semibold text-sm mb-3 flex items-center gap-1">
                            <Target className="w-3 h-3" />
                            Value Creation Steps
                          </h5>
                          <div className="space-y-2 mb-4">
                            {experimentationMapping[category]?.valueCreationSteps?.map((step, index) => (
                              <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded border border-emerald-200 dark:border-emerald-800">
                                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-xs text-emerald-700 dark:text-emerald-300">{step}</span>
                              </div>
                            )) || details.experimentResults.slice(0, 3).map((value, index) => (
                              <div key={index} className="flex items-center gap-3 p-2 bg-emerald-50 dark:bg-emerald-950/20 rounded">
                                <div className="w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span className="text-xs text-emerald-700 dark:text-emerald-300">{value}</span>
                              </div>
                            ))}
                          </div>

                          <h5 className="font-semibold text-sm mb-2 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            Business Use Cases
                          </h5>
                          <div className="space-y-2">
                            {experimentationMapping[category]?.businessUseCases?.map((useCase, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs p-2 bg-background/50 rounded border border-border/50">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{useCase}</span>
                              </div>
                            )) || details.businessOutcomes.map((outcome, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Scenarios & Examples */}
                        <div>
                          <h5 className="font-semibold text-sm mb-3 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            Implementation Scenarios
                          </h5>
                          <div className="space-y-2 mb-4">
                            {experimentationMapping[category]?.scenarios?.map((scenario, index) => (
                              <div key={index} className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                                <p className="text-xs text-orange-700 dark:text-orange-300">{scenario}</p>
                              </div>
                            )) || details.businessOutcomes.slice(0, 2).map((outcome, index) => (
                              <div key={index} className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 rounded-lg">
                                <p className="text-xs text-orange-700 dark:text-orange-300">Scenario: {outcome}</p>
                              </div>
                            ))}
                          </div>

                          <h5 className="font-semibold text-sm mb-2 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Real Implementation Examples
                          </h5>
                          <div className="space-y-2">
                            {experimentationMapping[category]?.realWorldExamples?.map((example, index) => (
                              <div key={index} className="text-xs text-muted-foreground flex items-start gap-2 p-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded border-l-2 border-primary/30">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{example}</span>
                              </div>
                            )) || details.businessOutcomes.slice(0, 3).map((outcome, index) => (
                              <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>Implementation: {outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Experimentation Examples */}
                      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border-l-4 border-primary/30">
                        <h5 className="font-semibold text-sm mb-3 flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          🌟 Genie AI Experimentation Hub Case Study
                        </h5>
                        <div className="mb-3 p-3 bg-gradient-to-r from-genie-accent/10 to-genie-primary/10 rounded border border-genie-accent/30">
                          <p className="text-xs text-genie-accent font-semibold mb-2">
                            Complete Experiment → Validate → Lead to Deploy Framework (2 weeks)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Built this entire experimentation platform using no-code/low-code tools: Lovable + Supabase + AI Integration. 
                            From concept to production deployment in 2 weeks - demonstrating the complete framework in action.
                          </p>
                        </div>
                        <div className="space-y-2">
                          {experimentationMapping[category]?.realWorldExamples?.map((example, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span>{example}</span>
                            </div>
                          )) || details.businessOutcomes.slice(0, 3).map((outcome, index) => (
                            <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                              <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span>Implementation: {outcome}</span>
                            </div>
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

        {/* Updated Experimentation Metrics - Highlighting Both Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-4 text-center border-genie-primary/20">
            <div className="w-10 h-10 bg-genie-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Code2 className="w-5 h-5 text-genie-primary" />
            </div>
            <div className="text-xl font-bold text-genie-primary mb-1">8</div>
            <div className="text-xs font-medium text-foreground mb-1">Tech Categories</div>
            <div className="text-xs text-muted-foreground">Experimentation areas</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-secondary/20">
            <div className="w-10 h-10 bg-genie-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Brain className="w-5 h-5 text-genie-secondary" />
            </div>
            <div className="text-xl font-bold text-genie-secondary mb-1">15+</div>
            <div className="text-xs font-medium text-foreground mb-1">AI Models</div>
            <div className="text-xs text-muted-foreground">Tested & compared</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-cyan/20">
            <div className="w-10 h-10 bg-genie-cyan/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-genie-cyan" />
            </div>
            <div className="text-xl font-bold text-genie-cyan mb-1">10+</div>
            <div className="text-xs font-medium text-foreground mb-1">Live Features</div>
            <div className="text-xs text-muted-foreground">From experiments</div>
          </Card>
          
          <Card className="p-4 text-center border-genie-accent/20">
            <div className="w-10 h-10 bg-genie-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-5 h-5 text-genie-accent" />
            </div>
            <div className="text-xl font-bold text-genie-accent mb-1">3</div>
            <div className="text-xs font-medium text-foreground mb-1">Framework Phases</div>
            <div className="text-xs text-muted-foreground">Experiment-validated</div>
          </Card>
        </div>

        {/* Key Achievements - Genie AI Experimentation Hub & Genie Conversational Feature */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">🌟 Key Achievements</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Genie AI Experimentation Hub */}
            <Card className="border-2 border-genie-primary/30 bg-gradient-to-br from-genie-primary/5 via-background to-genie-secondary/5">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-genie-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-genie-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-genie-primary">Genie AI Experimentation Hub</h4>
                    <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 text-xs">
                      Complete Platform Case Study
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-genie-primary">2-week timeline:</span> Complete Experiment → Validate → Lead to Deploy framework execution
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>No-code/Low-code tools: Lovable + Supabase + AI Integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Full-stack experimentation platform from concept to production</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Demonstrates framework viability for complex healthcare applications</span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/30 text-xs font-bold">
                    ✅ SUCCESS: Framework Proven
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Genie Conversational Feature */}
            <Card className="border-2 border-genie-accent/30 bg-gradient-to-br from-genie-accent/5 via-background to-genie-primary/5">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-genie-accent/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-genie-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-genie-accent">Genie Conversational Feature</h4>
                    <Badge className="bg-genie-accent text-background text-xs font-bold">
                      🌟 FLAGSHIP LIVE FEATURE
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    First flagship implementation demonstrating <span className="font-semibold text-genie-accent">advanced AI capabilities</span> in production
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>80+ Knowledge Contexts with intelligent switching</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Multi-Model Intelligence (GPT-4, Claude, Gemini)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Split-screen comparison & Advanced RAG architecture</span>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-700 border-emerald-500/30 text-xs font-bold">
                    ✅ LIVE: Production Ready
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action - Gartner Framework Focus */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to see how this Gartner-aligned framework translates to real business applications?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/business-use-cases">
              <Button size="lg" className="bg-genie-primary hover:bg-genie-primary/90 text-background px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                <Target className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Apply Framework to Business Cases
              </Button>
            </Link>
            <Link to="/journey">
              <Button variant="outline" size="lg" className="px-8 py-4 border-genie-accent text-genie-accent hover:bg-genie-accent/10">
                <Lightbulb className="w-5 h-5 mr-2" />
                See Framework Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};