// Comprehensive knowledge base for Genie AI - includes ALL site content
export const genieKnowledgeBase = {
  siteOverview: {
    title: "Genie AI Experimentation Hub",
    description: "Personal learning journey in AI-driven development by Saidas, sharing experiments and insights for individual growth",
    creator: "Saidas - AI Innovation Leader and Healthcare Technology Expert",
    purpose: "Systematic exploration of AI technologies through hands-on experimentation, documentation, and knowledge sharing"
  },

  pages: {
    home: {
      title: "Genie AI Experimentation HUB - Learn AI Development & Experimentation",
      description: "Main landing page featuring AI journey overview, trust indicators, value propositions, and quick start guide",
      keyFeatures: ["Multi-hero sections", "Trust indicators", "Gartner value framework", "Quick start journey"]
    },
    about: {
      title: "About Saidas - AI Innovation Leader",
      description: "Background, expertise, and vision for AI experimentation hub",
      expertise: ["Healthcare technology", "AI innovation", "Digital transformation", "System architecture"]
    },
    journey: {
      title: "My AI Journey - 5 Phase Transformation",
      description: "Detailed documentation of AI learning journey from curiosity to innovation",
      phases: [
        "Phase 1: The Spark - Initial curiosity and exploration",
        "Phase 2: Curiosity Ignited - Deep dive into AI fundamentals", 
        "Phase 3: The Breakthrough - First successful implementations",
        "Phase 4: Scalable Innovation - Building robust solutions",
        "Phase 5: The Resilient Hub - Establishing sustainable AI practices"
      ]
    },
    technology: {
      title: "Technology Stack Explored",
      description: "Comprehensive overview of AI tools, platforms, and technologies tested",
      categories: ["LLMs", "AI Platforms", "Development Tools", "Infrastructure", "Security"]
    },
    businessUseCases: {
      title: "Business Use Cases - Automation vs Agentic AI",
      description: "Strategic framework for technology selection in healthcare and business contexts",
      focus: ["Patient onboarding", "Referral processes", "Workflow automation", "Decision frameworks"]
    },
    caseStudies: {
      title: "Case Studies & Success Stories", 
      description: "Detailed analysis of AI implementations with metrics and outcomes",
      examples: ["Healthcare AI transformation", "Financial services automation", "Process optimization"]
    }
  },

  aiCapabilities: {
    specializations: [
      "AI Innovation & Value Creation",
      "Gartner Value Framework mapping", 
      "Technology stack architecture",
      "Healthcare business use cases",
      "Digital therapeutics (DTx)",
      "Cell & gene therapies",
      "Experimentation methodologies",
      "Security and compliance",
      "Journey mapping and case studies"
    ],
    contexts: {
      technology: "Formal, technical discussions about AI implementation, architecture, and best practices",
      healthcare: "Empathetic, detailed explanations of healthcare applications, regulations, and patient impact"
    },
    modes: [
      "Default mode for general conversations",
      "Single-agent mode for focused expertise", 
      "Multi-agent mode for complex analysis",
      "Split-screen comparisons with different AI models",
      "RAG-enabled responses with knowledge base integration"
    ]
  },

  technologyStack: {
    llms: [
      "GPT-5, GPT-4, Claude 3.5, Gemini",
      "Local models (Llama, Mistral)",
      "Specialized models for healthcare"
    ],
    platforms: [
      "OpenAI API, Anthropic Claude",
      "Supabase for backend",
      "React + TypeScript for frontend",
      "Tailwind CSS for styling"
    ],
    infrastructure: [
      "Edge functions for serverless logic",
      "Database management",
      "Authentication systems",
      "File storage and processing"
    ]
  },

  healthcareExpertise: {
    digitalTherapeutics: {
      definition: "Evidence-based therapeutic interventions driven by high-quality software programs",
      reimbursement: ["CPT codes (90834, 90837, 96116)", "Medicare Part B coverage", "Commercial insurance"],
      categories: ["Mental health DTx", "Chronic disease management", "Rehabilitation platforms"]
    },
    cellGeneTherapy: {
      description: "Revolutionary treatments using patient's own cells",
      challenges: ["High costs", "Outcome-based contracts", "Prior authorization requirements"],
      examples: ["CAR-T therapies", "Gene replacement treatments"]
    },
    pricing: {
      "340B": "Drug pricing program requiring 20-50% discounts to safety-net providers",
      "WAC": "Wholesale Acquisition Cost",
      "GPO": "Group Purchasing Organization pricing"
    }
  },

  experimentationFramework: {
    phases: {
      discovery: "Months 1-3: Technology exploration, use case identification, skill development",
      experimentation: "Months 4-9: Hypothesis testing, pilot implementation, user feedback", 
      scale: "Months 10-18: Production deployment, system integration, team scaling"
    },
    methodology: [
      "Start small with specific problems",
      "Document everything - successes and failures",
      "Test with real data (safely)",
      "Iterate based on feedback",
      "Scale only after thorough validation"
    ]
  },

  securityCompliance: {
    considerations: [
      "Adversarial attack protection",
      "Data poisoning prevention", 
      "Model validation and testing",
      "Privacy-preserving techniques",
      "Bias detection and mitigation",
      "GDPR, HIPAA compliance",
      "Continuous monitoring and audit trails"
    ],
    dataProtection: [
      "IP-based session isolation",
      "Encrypted data transmission", 
      "No cross-user data sharing",
      "Audit logging for sensitive access",
      "Option to request data deletion"
    ]
  },

  conversationLimits: {
    public: "2 conversations per hour, 5 per day",
    extendedAccess: "Available for legitimate research or business use cases",
    contact: "genieaiexpermentationhub@gmail.com for access requests"
  },

  gartnerFramework: {
    description: "Mapping AI value creation to practical technology implementations",
    valueRealization: {
      shortTerm: "Quick wins and proof of concepts",
      mediumTerm: "Scaled implementations with measurable ROI",
      longTerm: "Strategic transformation and competitive advantage"
    },
    kpis: ["ROI metrics", "Efficiency gains", "Cost reductions", "Quality improvements"]
  },

  caseStudyExamples: {
    healthcare: {
      challenge: "40% reduction in diagnosis time",
      solution: "AI-powered diagnostic assistance",
      technologies: ["Computer vision", "Natural language processing", "Clinical decision support"],
      outcomes: ["Faster diagnosis", "Improved accuracy", "Reduced clinician workload"]
    },
    financial: {
      challenge: "80% improvement in fraud detection", 
      solution: "Machine learning fraud prevention",
      technologies: ["Anomaly detection", "Pattern recognition", "Real-time processing"],
      outcomes: ["Reduced fraud losses", "Faster detection", "Lower false positives"]
    }
  },

  emergingTechnologies: [
    "Agentic AI and multi-agent systems",
    "No-code/low-code AI platforms", 
    "Edge AI and local model deployment",
    "RAG (Retrieval Augmented Generation)",
    "Model Context Protocol (MCP)",
    "AI observability and monitoring tools"
  ],

  communityGuidelines: {
    approach: "Learning through experimentation and sharing",
    values: ["Transparency", "Practical application", "Continuous learning", "Knowledge sharing"],
    engagement: "Connect on LinkedIn for AI discussions and experiment sharing"
  }
};

// Helper function to search knowledge base
export const searchKnowledgeBase = (query: string): string[] => {
  const results: string[] = [];
  const searchTerm = query.toLowerCase();
  
  // Search through all knowledge base content
  const searchInObject = (obj: any, path: string = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && value.toLowerCase().includes(searchTerm)) {
        results.push(`${currentPath}: ${value}`);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          if (typeof item === 'string' && item.toLowerCase().includes(searchTerm)) {
            results.push(`${currentPath}[${index}]: ${item}`);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        searchInObject(value, currentPath);
      }
    });
  };
  
  searchInObject(genieKnowledgeBase);
  return results.slice(0, 10); // Limit to top 10 results
};

// Function to get contextual knowledge for specific topics
export const getContextualKnowledge = (topic: string): any => {
  const topicMap: { [key: string]: any } = {
    'technology': genieKnowledgeBase.technologyStack,
    'healthcare': genieKnowledgeBase.healthcareExpertise,
    'journey': genieKnowledgeBase.pages.journey,
    'security': genieKnowledgeBase.securityCompliance,
    'gartner': genieKnowledgeBase.gartnerFramework,
    'experiments': genieKnowledgeBase.experimentationFramework,
    'ai': genieKnowledgeBase.aiCapabilities
  };
  
  return topicMap[topic.toLowerCase()] || genieKnowledgeBase.siteOverview;
};