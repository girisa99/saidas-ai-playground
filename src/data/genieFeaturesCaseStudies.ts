import { MessageCircle, Brain, Code, Database, Zap, Network, Shield, Calendar, CheckCircle, Target, Rocket, User } from "lucide-react";
import { CaseStudyData } from "./caseStudies";

// Case Study 1: Genie AI Experimentation Hub Platform
export const genieHubCaseStudy: CaseStudyData = {
  id: "genie-hub-platform",
  title: "GenieAI Experimentation Hub Platform",
  subtitle: "Personal AI Learning Laboratory - Live Implementation",
  description: "Complete platform built using Experiment → Validate → Lead to Deploy framework - from concept to production in 2 weeks",
  industry: "Personal AI Development",
  status: "live",
  icon: Code,
  overview: {
    challenge: "Need for a comprehensive AI experimentation platform to document and share personal learning journey while building expertise",
    solution: "Built full-stack platform using Lovable + Supabase with advanced features: knowledge sharing, case studies, business use cases, and progressive disclosure",
    impact: "Platform launched successfully with comprehensive documentation, interactive features, and real-time content management",
    timeline: "2 weeks from concept to production deployment"
  },
  metrics: {
    efficiency: "100% framework adherence",
    accuracy: "Complete feature implementation",
    cost: "Personal learning investment",
    satisfaction: "Live platform demonstrating capabilities"
  },
  businessValue: {
    current: [
      "Personal knowledge documentation",
      "Learning journey sharing",
      "Capability demonstration",
      "Professional positioning"
    ],
    target: [
      "AI expertise validation",
      "Thought leadership establishment",
      "Career advancement opportunities",
      "Personal brand development"
    ]
  },
  steps: [
    {
      id: 1,
      title: "Experiment Phase",
      description: "Rapid prototyping with Lovable platform, testing various UI/UX approaches and content structures",
      icon: Rocket,
      time: "Week 1",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      automationPrimary: true,
      automationTasks: ["Code generation", "Component creation", "Styling automation"],
      aiTasks: ["Content optimization", "User experience enhancement", "Feature suggestions"],
      whyAutomation: "Rapid development and consistent implementation",
      whyAI: "Content enhancement and user experience optimization",
      phases: ["Concept", "Prototype", "Iteration"],
      currentIssues: ["Time constraints", "Feature complexity", "Content organization"],
      improvement: "Systematic experimentation approach enabled rapid progress",
      technologyStack: {
        automation: ["Lovable platform", "Component libraries", "Automated deployments"],
        ai: ["AI-assisted development", "Content optimization", "User experience enhancement"],
        integration: ["React/TypeScript", "Tailwind CSS", "Modern web standards"]
      },
      gartnerValue: {
        give: ["Time investment", "Learning commitment", "Experimentation effort"],
        get: ["Rapid prototyping capability", "Modern development skills", "Platform foundation"]
      }
    },
    {
      id: 2,
      title: "Validate Phase",
      description: "Testing platform functionality, content quality, user experience, and performance optimization",
      icon: Target,
      time: "Week 2",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      automationPrimary: false,
      automationTasks: ["Performance testing", "Automated deployments", "Quality assurance"],
      aiTasks: ["Content validation", "User flow optimization", "Feature refinement"],
      whyAutomation: "Consistent quality and performance testing",
      whyAI: "Enhanced user experience and content quality",
      phases: ["Testing", "Optimization", "Refinement"],
      currentIssues: ["Performance optimization", "Content organization", "Feature completion"],
      improvement: "Validation phase ensured production-ready quality",
      technologyStack: {
        automation: ["Automated testing", "CI/CD pipelines", "Performance monitoring"],
        ai: ["Content validation", "UX optimization", "Quality enhancement"],
        integration: ["Supabase backend", "Real-time features", "Responsive design"]
      },
      gartnerValue: {
        give: ["Quality assurance effort", "Testing time", "Optimization work"],
        get: ["Production-ready platform", "Validated functionality", "Professional quality"]
      }
    },
    {
      id: 3,
      title: "Lead to Deploy Phase",
      description: "Production deployment with full feature set, content management, and live platform operation",
      icon: Zap,
      time: "Week 2",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "hybrid",
      automationPrimary: true,
      automationTasks: ["Automated deployment", "Content management", "Platform maintenance"],
      aiTasks: ["Performance optimization", "User experience monitoring", "Content enhancement"],
      whyAutomation: "Reliable deployment and maintenance processes",
      whyAI: "Continuous improvement and optimization",
      phases: ["Deployment", "Launch", "Operation"],
      currentIssues: ["Launch coordination", "Performance monitoring", "User feedback"],
      improvement: "Successful live deployment demonstrating complete framework",
      technologyStack: {
        automation: ["Production deployment", "Monitoring systems", "Automated maintenance"],
        ai: ["Performance optimization", "User analytics", "Continuous improvement"],
        integration: ["Full-stack platform", "Real-time capabilities", "Professional hosting"]
      },
      gartnerValue: {
        give: ["Deployment effort", "Ongoing maintenance", "Platform operation"],
        get: ["Live demonstration platform", "Professional credibility", "Expertise validation"]
      }
    }
  ],
  gartnerFramework: {
    valueCreation: {
      listen: ["Personal learning needs", "Professional development goals", "Industry trends", "Technology opportunities"],
      design: ["Platform architecture", "Content structure", "User experience", "Feature roadmap"],
      build: ["Full-stack development", "Content creation", "Feature implementation", "Quality assurance"],
      deliver: ["Production deployment", "Live platform operation", "Content management", "Continuous updates"]
    },
    valueRealization: {
      efficiency: ["Rapid development process", "Streamlined content management", "Automated deployments"],
      experience: ["Professional platform presence", "Comprehensive documentation", "Interactive features"],
      growth: ["AI expertise demonstration", "Career positioning", "Professional development"],
      innovation: ["Modern development practices", "AI-assisted development", "Personal brand building"]
    }
  },
  integrationBlueprint: {
    phase1: ["Platform foundation", "Core features", "Basic content"],
    phase2: ["Enhanced features", "Content expansion", "User experience optimization"],
    phase3: ["Advanced capabilities", "Community features", "Continuous improvement"]
  },
  lessonsLearned: [
    "Framework adherence enables rapid, high-quality development",
    "Personal projects can demonstrate professional capabilities",
    "Modern development tools dramatically accelerate individual productivity",
    "Systematic approach ensures complete, production-ready solutions"
  ],
  nextSteps: [
    "Expand platform capabilities",
    "Add community features",
    "Integrate advanced AI capabilities",
    "Scale personal expertise sharing"
  ]
};

// Case Study 2: Genie Conversational AI Feature
export const genieConversationCaseStudy: CaseStudyData = {
  id: "genie-conversation-ai",
  title: "Genie Conversational AI Feature",
  subtitle: "Advanced RAG with 80+ Knowledge Contexts - Live Implementation",
  description: "Flagship conversational AI feature with multi-model intelligence, split-screen conversations, and advanced RAG architecture",
  industry: "Personal AI Development",
  status: "live",
  icon: MessageCircle,
  overview: {
    challenge: "Create sophisticated conversational AI that demonstrates advanced capabilities while providing practical value for personal learning and professional development",
    solution: "Built comprehensive AI conversation system with 80+ knowledge contexts, multi-model support, split-screen mode, and advanced RAG implementation",
    impact: "Live feature demonstrating advanced AI capabilities with real-world utility for learning and professional development",
    timeline: "3 weeks from concept to production feature"
  },
  metrics: {
    efficiency: "80+ knowledge contexts active",
    accuracy: "Multi-model AI intelligence",
    cost: "Personal development investment",
    satisfaction: "Live feature with advanced capabilities"
  },
  businessValue: {
    current: [
      "Advanced AI conversation capabilities",
      "Multi-domain knowledge access",
      "Professional AI demonstration",
      "Personal learning enhancement"
    ],
    target: [
      "AI expertise validation",
      "Professional capability demonstration",
      "Advanced technical skills showcase",
      "Personal AI assistant for career growth"
    ]
  },
  steps: [
    {
      id: 1,
      title: "Experiment Phase",
      description: "Research and prototyping of conversational AI architectures, RAG implementations, and multi-model approaches",
      icon: Brain,
      time: "Week 1-2",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      automationPrimary: false,
      automationTasks: ["Model integration", "Context management", "Response processing"],
      aiTasks: ["Conversation intelligence", "Context switching", "Multi-model orchestration"],
      whyAutomation: "Efficient context management and response processing",
      whyAI: "Advanced conversational capabilities and intelligent responses",
      phases: ["Research", "Architecture", "Prototyping"],
      currentIssues: ["Model integration complexity", "Context management", "Performance optimization"],
      improvement: "Systematic experimentation enabled sophisticated AI implementation",
      technologyStack: {
        automation: ["Context management", "Model routing", "Response processing"],
        ai: ["Multi-LLM integration", "RAG architecture", "Conversation intelligence"],
        integration: ["Supabase AI", "Vector databases", "Real-time processing"]
      },
      gartnerValue: {
        give: ["Research time", "Technical learning", "Implementation effort"],
        get: ["Advanced AI knowledge", "Technical expertise", "Conversation capabilities"]
      }
    },
    {
      id: 2,
      title: "Validate Phase",
      description: "Testing conversational flows, knowledge accuracy, multi-model performance, and user experience optimization",
      icon: Shield,
      time: "Week 2-3",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      automationPrimary: false,
      automationTasks: ["Performance monitoring", "Quality assurance", "Response validation"],
      aiTasks: ["Conversation quality", "Context accuracy", "Response optimization"],
      whyAutomation: "Consistent performance and quality monitoring",
      whyAI: "Intelligent conversation management and optimization",
      phases: ["Testing", "Validation", "Optimization"],
      currentIssues: ["Response quality", "Context switching", "Performance tuning"],
      improvement: "Validation ensured high-quality conversational experience",
      technologyStack: {
        automation: ["Quality monitoring", "Performance testing", "Response validation"],
        ai: ["Conversation optimization", "Context management", "Multi-model coordination"],
        integration: ["Advanced RAG", "Vector search", "Real-time optimization"]
      },
      gartnerValue: {
        give: ["Testing effort", "Quality assurance", "Performance optimization"],
        get: ["Validated AI capabilities", "High-quality conversations", "Professional feature"]
      }
    },
    {
      id: 3,
      title: "Lead to Deploy Phase",
      description: "Production deployment with full conversational AI capabilities, 80+ contexts, and advanced features live",
      icon: Network,
      time: "Week 3",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      automationPrimary: true,
      automationTasks: ["Production deployment", "Scaling infrastructure", "Monitoring systems"],
      aiTasks: ["Conversation intelligence", "Context optimization", "Continuous learning"],
      whyAutomation: "Scalable deployment and reliable operation",
      whyAI: "Intelligent conversation management and continuous improvement",
      phases: ["Deployment", "Launch", "Operation"],
      currentIssues: ["Scaling challenges", "Performance monitoring", "Feature expansion"],
      improvement: "Successful deployment of advanced AI conversational capabilities",
      technologyStack: {
        automation: ["Production infrastructure", "Scaling systems", "Automated monitoring"],
        ai: ["Multi-model AI", "Advanced RAG", "Conversation intelligence"],
        integration: ["Full-stack AI platform", "Real-time capabilities", "Professional deployment"]
      },
      gartnerValue: {
        give: ["Deployment complexity", "Infrastructure management", "Ongoing optimization"],
        get: ["Live AI demonstration", "Advanced capabilities", "Professional credibility"]
      }
    }
  ],
  gartnerFramework: {
    valueCreation: {
      listen: ["AI conversation needs", "Learning requirements", "Professional development", "Technical challenges"],
      design: ["Conversation architecture", "Multi-model approach", "Context management", "User experience"],
      build: ["AI implementation", "RAG architecture", "Multi-model integration", "Advanced features"],
      deliver: ["Production AI system", "Live conversations", "Continuous optimization", "Feature expansion"]
    },
    valueRealization: {
      efficiency: ["Advanced AI conversations", "Multi-context intelligence", "Automated responses"],
      experience: ["Sophisticated AI interaction", "Professional demonstration", "Learning enhancement"],
      growth: ["AI expertise showcase", "Technical skill demonstration", "Career advancement"],
      innovation: ["Advanced AI implementation", "Multi-model orchestration", "Personal AI assistant"]
    }
  },
  integrationBlueprint: {
    phase1: ["Basic conversation", "Core AI integration", "Initial contexts"],
    phase2: ["Advanced features", "Multi-model support", "Enhanced contexts"],
    phase3: ["Professional capabilities", "Advanced RAG", "Full feature set"]
  },
  lessonsLearned: [
    "Advanced AI features require systematic approach and thorough testing",
    "Multi-model AI orchestration provides superior conversation quality",
    "RAG architecture enables sophisticated knowledge integration",
    "Personal AI projects can demonstrate professional-level capabilities"
  ],
  nextSteps: [
    "Expand knowledge contexts",
    "Add specialized AI models",
    "Enhance conversation intelligence",
    "Integrate advanced AI capabilities"
  ]
};

export const genieLiveCaseStudies = [genieHubCaseStudy, genieConversationCaseStudy];