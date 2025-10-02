import { MessageCircle, Brain, Code, Database, Zap, Network, Shield, Calendar, CheckCircle, Target, Rocket, User } from "lucide-react";
import { CaseStudyData } from "./caseStudies";

// Case Study 1: Genie AI Experimentation Hub Platform
export const genieHubCaseStudy: CaseStudyData = {
  id: "genie-hub-platform",
  title: "GenieAI Experimentation Hub Platform",
  subtitle: "Personal AI Learning Laboratory - Live Implementation",
  description: "Showcase website built in 2 weeks to demonstrate platform capabilities developed over 80-90 days using Experiment → Validate → Lead to Deploy framework",
  industry: "Personal AI Development",
  status: "live",
  icon: Code,
  overview: {
    challenge: "Need for a comprehensive AI experimentation platform to document and share personal learning journey while building expertise",
    solution: "Platform functionality developed over 80-90 days, then built showcase website in 2 weeks using Lovable + Supabase to demonstrate advanced features: knowledge sharing, case studies, business use cases, and progressive disclosure",
    impact: "Showcase website launched successfully demonstrating comprehensive documentation, interactive features, and real-time content management capabilities",
    timeline: "Platform development: 80-90 days | Showcase website: 2 weeks from concept to production"
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
      description: "Platform capabilities developed over 80-90 days. Showcase website rapid prototyping with Lovable platform, testing various UI/UX approaches and content structures",
      icon: Rocket,
      time: "Platform: 80-90 days | Website: Week 1",
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
    challenge: "Create sophisticated conversational AI that demonstrates advanced capabilities while providing practical value for personal learning and professional development. Need to build production-ready AI that showcases expertise in multi-model orchestration, RAG architecture, and healthcare compliance.",
    solution: "Built comprehensive AI conversation system with 80+ knowledge contexts, multi-model support (Gemini 2.5 Pro/Flash, GPT-5/Mini), split-screen mode, advanced RAG implementation, healthcare compliance, and real-time streaming capabilities using Supabase Edge Functions and vector databases.",
    impact: "Live feature demonstrating advanced AI capabilities with real-world utility: 95%+ response accuracy, sub-second response times, 24/7 availability, HIPAA-compliant architecture, and seamless integration across healthcare workflows including oncology care, patient referral, and contact center transformation.",
    timeline: "3 days rapid development from concept to production feature"
  },
  metrics: {
    efficiency: "80+ knowledge contexts, 5 AI models, 95%+ accuracy",
    accuracy: "Multi-model intelligence with vector search optimization",
    cost: "Personal development investment with enterprise-grade implementation",
    satisfaction: "Live feature with advanced capabilities and healthcare integration"
  },
  businessValue: {
    current: [
      "Advanced AI conversation capabilities with 80+ specialized knowledge contexts",
      "Multi-domain knowledge access across healthcare, technology, business domains",
      "Professional AI demonstration with enterprise-grade architecture",
      "Personal learning enhancement with sophisticated AI assistance",
      "Real-time streaming responses with sub-second performance",
      "Healthcare compliance (HIPAA) with audit trail maintenance"
    ],
    target: [
      "AI expertise validation through production-ready implementation",
      "Professional capability demonstration with multi-model orchestration",
      "Advanced technical skills showcase in RAG architecture and vector databases",
      "Personal AI assistant for career growth with specialized knowledge",
      "Healthcare industry positioning with compliant AI solutions",
      "Thought leadership in conversational AI and healthcare technology"
    ]
  },
  steps: [
    {
      id: 1,
      title: "Experiment Phase - Advanced AI Architecture",
      description: "Research and prototyping of conversational AI architectures with multi-model integration, RAG implementations, vector databases, and healthcare compliance requirements",
      icon: Brain,
      time: "Day 1",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      automationPrimary: false,
      automationTasks: [
        "Supabase Edge Functions infrastructure setup",
        "Vector database configuration and optimization", 
        "Multi-model API integration (Gemini 2.5, GPT-5)",
        "Real-time streaming architecture implementation",
        "Authentication and session management systems"
      ],
      aiTasks: [
        "Advanced conversational intelligence with 80+ knowledge contexts",
        "Intelligent context switching and semantic search optimization",
        "Multi-model orchestration with automatic routing based on query complexity",
        "RAG architecture with hierarchical context management",
        "Healthcare-specific knowledge integration and compliance validation"
      ],
      whyAutomation: "Infrastructure automation ensures consistent performance, scalability, and reliability for production deployment",
      whyAI: "Advanced AI capabilities require sophisticated multi-model orchestration and intelligent context management for optimal user experience",
      phases: [
        "Research multi-model AI architectures and RAG implementations",
        "Prototype conversation systems with vector database integration", 
        "Develop healthcare compliance and security frameworks"
      ],
      currentIssues: [
        "Multi-model integration complexity and performance optimization",
        "Vector database scaling and semantic search accuracy",
        "Healthcare compliance requirements and HIPAA architecture"
      ],
      improvement: "Systematic experimentation with cutting-edge AI technologies enabled sophisticated conversational platform with enterprise-grade capabilities",
      technologyStack: {
        automation: ["Supabase Edge Functions with auto-scaling", "Vector database optimization", "Multi-model API orchestration", "Real-time streaming infrastructure", "Session management and caching"],
        ai: ["Multi-LLM integration (Gemini 2.5 Pro/Flash, GPT-5/Mini/Nano)", "Advanced RAG with vector embeddings", "Semantic search and context ranking", "Intelligent model routing", "Healthcare knowledge specialization"],
        integration: ["Lovable AI Gateway", "Vector databases with semantic search", "Real-time WebSocket connections", "Healthcare compliance frameworks", "Progressive Web App architecture"]
      },
      gartnerValue: {
        give: ["Extensive research and development time", "Technical learning across AI architectures", "Implementation effort for cutting-edge technologies"],
        get: ["Advanced AI knowledge and expertise", "Production-ready conversational platform", "Multi-model orchestration capabilities", "Healthcare AI specialization"]
      }
    },
    {
      id: 2,
      title: "Validate Phase - Production Testing & Optimization",
      description: "Comprehensive testing of conversational flows, knowledge accuracy, multi-model performance, healthcare compliance, and user experience optimization across all 80+ contexts",
      icon: Shield,
      time: "Day 2",
      emotion: "positive",
      emotionIcon: CheckCircle,
      approach: "agentic",
      automationPrimary: false,
      automationTasks: [
        "Automated performance monitoring and alerting systems",
        "Load testing infrastructure with concurrent user simulation",
        "Quality assurance pipelines for response validation",
        "Healthcare compliance testing and audit trail verification",
        "Real-time error tracking and recovery systems"
      ],
      aiTasks: [
        "Advanced conversation quality assessment and optimization",
        "Context accuracy validation across 80+ knowledge domains",
        "Multi-model performance comparison and routing optimization", 
        "Healthcare-specific response validation and safety checks",
        "User experience personalization and adaptation algorithms"
      ],
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
      time: "Day 3",
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