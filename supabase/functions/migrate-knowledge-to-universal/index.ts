import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hardcoded knowledge base content (comprehensive - matches genieKnowledgeBase.ts)
const hardcodedKnowledge = {
  siteOverview: {
    title: "Genie AI Experimentation Hub",
    description: "3-Phase AI Framework validation journey by Sai Das, following Gartner methodology - sharing structured learning for individual growth and business transformation",
    creator: "Sai Das - AI Innovation Leader and Healthcare Technology Expert",
    purpose: "Systematic exploration of AI technologies through the Experiment → Validate → Lead to Deploy framework, with Gartner value methodology integration"
  },
  framework: {
    title: "3-Phase AI Framework (Experiment → Validate → Lead to Deploy)",
    description: "Structured approach to AI implementation following Gartner value methodology",
    phases: {
      experiment: "Rapid prototyping, hypothesis testing, and proof-of-concept development",
      validate: "Real-world testing, accuracy measurement, and stakeholder feedback integration",
      deploy: "Production implementation, scaling, and continuous improvement"
    },
    gartnerAlignment: "Framework aligns with Gartner's strategic technology adoption lifecycle for measurable business value",
    metrics: {
      accuracy: "94% framework validation accuracy achieved",
      useCases: "10+ validated business use cases implemented",
      timeToValue: "3 days average from concept to validated prototype"
    }
  },
  pages: {
    home: {
      title: "Genie AI Experimentation HUB - 3-Phase AI Framework Learning",
      description: "Main landing page featuring AI framework journey, Gartner value methodology, trust indicators, and quick start guide",
      keyFeatures: ["3-Phase framework overview", "Gartner value integration", "Trust indicators", "Framework journey guide"]
    },
    about: {
      title: "About Sai Das - AI Innovation Leader",
      description: "Background, expertise, and vision for structured AI experimentation using proven methodologies",
      expertise: ["Healthcare technology", "AI innovation", "3-phase framework validation", "Gartner methodology implementation"]
    },
    journey: {
      title: "AI Development Journey - Framework Evolution",
      description: "Detailed documentation of AI learning journey from curiosity to structured 3-phase framework implementation",
      approach: "Personal learning journey demonstrating framework development and validation over time"
    },
    technology: {
      title: "3-Phase Tech Framework",
      description: "Comprehensive technology stack organized by framework phases: Experiment → Validate → Lead to Deploy",
      categories: ["Experimentation tools", "Validation platforms", "Deployment infrastructure", "Gartner-aligned technologies"]
    },
    businessUseCases: {
      title: "Gartner Business Solutions",
      description: "Strategic framework for technology selection using Gartner value methodology in healthcare and business contexts",
      focus: ["3-phase case implementations", "Gartner value realization", "Healthcare workflow automation", "Business decision frameworks"]
    },
    caseStudies: {
      title: "Validated Case Studies - Framework Results",
      description: "Detailed analysis of 3-phase framework implementations with Gartner-aligned metrics and outcomes",
      examples: ["Patient onboarding (94% accuracy in 3 days)", "Healthcare AI transformation", "Framework validation studies"]
    }
  },
  aiCapabilities: {
    specializations: [
      "3-Phase AI Framework (Experiment → Validate → Lead to Deploy)",
      "Gartner Value Framework implementation",
      "Technology stack architecture and validation",
      "Healthcare business use cases with proven ROI",
      "Digital therapeutics (DTx) implementation",
      "Cell & gene therapy technology solutions",
      "Structured experimentation methodologies",
      "AI security and compliance frameworks",
      "Framework validation and case study development"
    ],
    contexts: {
      technology: "Formal, technical discussions about 3-phase AI implementation, architecture, and Gartner-aligned best practices",
      healthcare: "Empathetic, detailed explanations of healthcare applications, proven framework results, and patient impact validation"
    },
    modes: [
      "3-Phase framework guidance for structured AI implementation",
      "Gartner methodology consultation for business value realization",
      "Validation mode for testing framework applications",
      "Case study analysis with measurable outcomes",
      "RAG-enabled responses with validated knowledge base integration"
    ]
  },
  technologyStack: {
    llms: ["GPT-5, GPT-4, Claude 3.5, Gemini", "Local models (Llama, Mistral)", "Specialized models for healthcare"],
    platforms: ["OpenAI API, Anthropic Claude", "Supabase for backend", "React + TypeScript for frontend", "Tailwind CSS for styling"],
    infrastructure: ["Edge functions for serverless logic", "Database management", "Authentication systems", "File storage and processing"]
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
    coreFramework: {
      experiment: "Rapid prototyping journey - Test ideas quickly with minimal viable implementations",
      validate: "Real-world testing phase - Measure accuracy, gather feedback, validate business value",
      deploy: "Production implementation - Scale successful experiments into robust, measurable solutions"
    },
    gartnerMethodology: {
      valueRealization: "Structured approach to technology adoption with measurable business outcomes",
      riskMitigation: "Phased implementation reduces risk while maximizing learning and value creation",
      timeline: "3-day average from concept to validated prototype, following proven methodologies"
    },
    successMetrics: [
      "94% framework accuracy across multiple use cases",
      "10+ validated business implementations",
      "3-day average development cycle time",
      "Gartner-aligned value realization tracking",
      "Continuous feedback integration and improvement"
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
    contact: "genieaiexperimentationhub@gmail.com for access requests"
  },
  gartnerFramework: {
    description: "3-Phase AI Framework aligned with Gartner methodology for practical technology implementations with measurable business value",
    valueRealization: {
      experiment: "Quick proof-of-concept validation with minimal resource investment",
      validate: "Measured implementations with accuracy tracking and stakeholder feedback",
      deploy: "Strategic transformation with competitive advantage and sustainable ROI"
    },
    kpis: ["94% accuracy metrics", "3-day implementation cycles", "10+ validated use cases", "Continuous value measurement"],
    businessAlignment: "Framework ensures technology initiatives align with business objectives and deliver measurable outcomes"
  },
  caseStudyExamples: {
    patientOnboarding: {
      challenge: "Complex healthcare patient enrollment process requiring 94% accuracy",
      solution: "3-Phase AI Framework implementation: Experiment → Validate → Lead to Deploy",
      framework: "Built in 3 days using structured methodology with real-world validation",
      technologies: ["Multi-agent AI systems", "Natural language processing", "Clinical decision support"],
      outcomes: ["94% accuracy achieved", "3-day development cycle", "Gartner methodology validated", "Scalable framework proven"]
    },
    frameworkValidation: {
      challenge: "Prove 3-Phase Framework effectiveness across multiple use cases",
      solution: "Systematic validation across 10+ business scenarios with Gartner alignment",
      technologies: ["Structured experimentation", "Outcome measurement", "Stakeholder feedback integration"],
      outcomes: ["Framework validated", "Methodology proven", "Replicable process established", "Business value demonstrated"]
    }
  },
  emergingTechnologies: [
    "3-Phase Framework methodology for AI implementation",
    "Gartner-aligned value realization tracking",
    "Agentic AI and multi-agent systems validation",
    "Structured experimentation platforms",
    "Outcome-based AI development cycles",
    "RAG (Retrieval Augmented Generation) with framework integration",
    "Framework-driven AI observability and monitoring"
  ],
  communityGuidelines: {
    approach: "Structured learning through 3-Phase Framework validation and Gartner methodology implementation",
    values: ["Framework-driven transparency", "Measurable outcomes", "Structured learning", "Validated knowledge sharing"],
    engagement: "Connect on LinkedIn to discuss 3-Phase AI Framework implementation and share validated experiments"
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    console.log('Starting knowledge base migration to universal_knowledge_base...');

    let migratedCount = 0;
    const errors: string[] = [];

    // ===== Step 1: Migrate hardcoded knowledge content =====
    console.log('Migrating hardcoded Genie knowledge...');
    
    const hardcodedEntries = [
      // Site Overview
      {
        finding_name: "Genie AI Experimentation Hub Overview",
        description: `${hardcodedKnowledge.siteOverview.description}\n\nCreator: ${hardcodedKnowledge.siteOverview.creator}\n\nPurpose: ${hardcodedKnowledge.siteOverview.purpose}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['overview', 'genie', 'framework'], source_type: 'hardcoded_migration' }
      },
      // Framework
      {
        finding_name: "3-Phase AI Framework Overview",
        description: `${hardcodedKnowledge.framework.title}\n\n${hardcodedKnowledge.framework.description}\n\nPhases:\n- Experiment: ${hardcodedKnowledge.framework.phases.experiment}\n- Validate: ${hardcodedKnowledge.framework.phases.validate}\n- Deploy: ${hardcodedKnowledge.framework.phases.deploy}\n\nGartner Alignment: ${hardcodedKnowledge.framework.gartnerAlignment}\n\nMetrics:\n- Accuracy: ${hardcodedKnowledge.framework.metrics.accuracy}\n- Use Cases: ${hardcodedKnowledge.framework.metrics.useCases}\n- Time to Value: ${hardcodedKnowledge.framework.metrics.timeToValue}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['framework', 'methodology', 'gartner', '3-phase'], source_type: 'hardcoded_migration' }
      },
      // Pages
      {
        finding_name: "Site Pages & Navigation",
        description: `Home Page: ${hardcodedKnowledge.pages.home.description}\n\nAbout Page: ${hardcodedKnowledge.pages.about.description}\n\nJourney Page: ${hardcodedKnowledge.pages.journey.description}\n\nTechnology Page: ${hardcodedKnowledge.pages.technology.description}\n\nBusiness Use Cases: ${hardcodedKnowledge.pages.businessUseCases.description}\n\nCase Studies: ${hardcodedKnowledge.pages.caseStudies.description}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['navigation', 'pages', 'site structure'], source_type: 'hardcoded_migration' }
      },
      // AI Capabilities
      {
        finding_name: "AI Capabilities & Specializations",
        description: `Specializations:\n${hardcodedKnowledge.aiCapabilities.specializations.join('\n- ')}\n\nContexts:\n- Technology: ${hardcodedKnowledge.aiCapabilities.contexts.technology}\n- Healthcare: ${hardcodedKnowledge.aiCapabilities.contexts.healthcare}\n\nModes:\n${hardcodedKnowledge.aiCapabilities.modes.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['ai', 'capabilities', 'specializations'], source_type: 'hardcoded_migration' }
      },
      // Technology Stack
      {
        finding_name: "AI Technology Stack",
        description: `LLMs:\n${hardcodedKnowledge.technologyStack.llms.join('\n- ')}\n\nPlatforms:\n${hardcodedKnowledge.technologyStack.platforms.join('\n- ')}\n\nInfrastructure:\n${hardcodedKnowledge.technologyStack.infrastructure.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['technology', 'ai', 'llm', 'stack'], source_type: 'hardcoded_migration' }
      },
      // Healthcare DTx
      {
        finding_name: "Digital Therapeutics (DTx) Overview",
        description: `${hardcodedKnowledge.healthcareExpertise.digitalTherapeutics.definition}\n\nReimbursement:\n${hardcodedKnowledge.healthcareExpertise.digitalTherapeutics.reimbursement.join('\n- ')}\n\nCategories:\n${hardcodedKnowledge.healthcareExpertise.digitalTherapeutics.categories.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'dtx', 'digital therapeutics'], source_type: 'hardcoded_migration' }
      },
      // Cell & Gene Therapy
      {
        finding_name: "Cell & Gene Therapy (CGT)",
        description: `${hardcodedKnowledge.healthcareExpertise.cellGeneTherapy.description}\n\nChallenges:\n${hardcodedKnowledge.healthcareExpertise.cellGeneTherapy.challenges.join('\n- ')}\n\nExamples:\n${hardcodedKnowledge.healthcareExpertise.cellGeneTherapy.examples.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'cgt', 'cell therapy', 'gene therapy'], source_type: 'hardcoded_migration' }
      },
      // Healthcare Pricing
      {
        finding_name: "Healthcare Pricing Models (340B, WAC, GPO)",
        description: `340B: ${hardcodedKnowledge.healthcareExpertise.pricing['340B']}\n\nWAC: ${hardcodedKnowledge.healthcareExpertise.pricing['WAC']}\n\nGPO: ${hardcodedKnowledge.healthcareExpertise.pricing['GPO']}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'pricing', '340b', 'wac', 'gpo'], source_type: 'hardcoded_migration' }
      },
      // Experimentation Framework
      {
        finding_name: "Experimentation Framework Details",
        description: `Core Framework:\n- Experiment: ${hardcodedKnowledge.experimentationFramework.coreFramework.experiment}\n- Validate: ${hardcodedKnowledge.experimentationFramework.coreFramework.validate}\n- Deploy: ${hardcodedKnowledge.experimentationFramework.coreFramework.deploy}\n\nGartner Methodology:\n- Value Realization: ${hardcodedKnowledge.experimentationFramework.gartnerMethodology.valueRealization}\n- Risk Mitigation: ${hardcodedKnowledge.experimentationFramework.gartnerMethodology.riskMitigation}\n- Timeline: ${hardcodedKnowledge.experimentationFramework.gartnerMethodology.timeline}\n\nSuccess Metrics:\n${hardcodedKnowledge.experimentationFramework.successMetrics.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['framework', 'experimentation', 'methodology'], source_type: 'hardcoded_migration' }
      },
      // Security & Compliance
      {
        finding_name: "AI Security & Compliance",
        description: `Security Considerations:\n${hardcodedKnowledge.securityCompliance.considerations.join('\n- ')}\n\nData Protection:\n${hardcodedKnowledge.securityCompliance.dataProtection.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['security', 'compliance', 'gdpr', 'hipaa'], source_type: 'hardcoded_migration' }
      },
      // Conversation Limits
      {
        finding_name: "Conversation Limits & Access",
        description: `Public Access: ${hardcodedKnowledge.conversationLimits.public}\n\nExtended Access: ${hardcodedKnowledge.conversationLimits.extendedAccess}\n\nContact: ${hardcodedKnowledge.conversationLimits.contact}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['limits', 'access', 'public'], source_type: 'hardcoded_migration' }
      },
      // Gartner Framework
      {
        finding_name: "Gartner Value Framework",
        description: `${hardcodedKnowledge.gartnerFramework.description}\n\nValue Realization:\n- Experiment: ${hardcodedKnowledge.gartnerFramework.valueRealization.experiment}\n- Validate: ${hardcodedKnowledge.gartnerFramework.valueRealization.validate}\n- Deploy: ${hardcodedKnowledge.gartnerFramework.valueRealization.deploy}\n\nKPIs:\n${hardcodedKnowledge.gartnerFramework.kpis.join('\n- ')}\n\nBusiness Alignment: ${hardcodedKnowledge.gartnerFramework.businessAlignment}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['gartner', 'value', 'framework', 'kpis'], source_type: 'hardcoded_migration' }
      },
      // Case Studies
      {
        finding_name: "Patient Onboarding Case Study",
        description: `Challenge: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.challenge}\n\nSolution: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.solution}\n\nFramework: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.framework}\n\nTechnologies:\n${hardcodedKnowledge.caseStudyExamples.patientOnboarding.technologies.join('\n- ')}\n\nOutcomes:\n${hardcodedKnowledge.caseStudyExamples.patientOnboarding.outcomes.join('\n- ')}`,
        domain: 'patient_onboarding',
        content_type: 'template',
        metadata: { tags: ['case study', 'patient onboarding', 'framework validation'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Framework Validation Case Study",
        description: `Challenge: ${hardcodedKnowledge.caseStudyExamples.frameworkValidation.challenge}\n\nSolution: ${hardcodedKnowledge.caseStudyExamples.frameworkValidation.solution}\n\nTechnologies:\n${hardcodedKnowledge.caseStudyExamples.frameworkValidation.technologies.join('\n- ')}\n\nOutcomes:\n${hardcodedKnowledge.caseStudyExamples.frameworkValidation.outcomes.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'template',
        metadata: { tags: ['case study', 'framework', 'validation'], source_type: 'hardcoded_migration' }
      },
      // Emerging Technologies
      {
        finding_name: "Emerging Technologies & Innovations",
        description: `Emerging Technologies:\n${hardcodedKnowledge.emergingTechnologies.join('\n- ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['emerging', 'technology', 'innovation'], source_type: 'hardcoded_migration' }
      },
      // Community Guidelines
      {
        finding_name: "Community Guidelines & Values",
        description: `Approach: ${hardcodedKnowledge.communityGuidelines.approach}\n\nValues:\n${hardcodedKnowledge.communityGuidelines.values.join('\n- ')}\n\nEngagement: ${hardcodedKnowledge.communityGuidelines.engagement}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['community', 'values', 'engagement'], source_type: 'hardcoded_migration' }
      },
      // Treatment Center Resources
      {
        finding_name: "Resources for Finding Treatment Centers",
        description: `GENE THERAPY CENTERS:\n\n1. American Society of Gene & Cell Therapy (ASGCT): Online "Gene Therapy Centers" resource with specialized medical facilities list, detailing location and disease focus areas.\n\n2. FDA-approved product websites: FDA maintains public list of approved cellular and gene therapy products. Manufacturers provide qualified treatment center lists on product websites.\n\n3. Genetic disease advocacy groups: Crucial resource for patients seeking access to approved gene therapies and clinical trials information. CMS actively works with treatment centers and state programs to improve access to gene therapy for sickle cell disease.\n\nCELL THERAPY (CAR T-CELL THERAPY) CENTERS:\n\n1. Atrium Health Wake Forest Baptist: Comprehensive Cancer Center designated to offer CAR T-cell therapy, specialized cellular immunotherapy for specific blood cancers.\n\n2. NCI-designated centers: Duke Cancer Institute, Wake Forest Baptist Comprehensive Cancer Center, UNC Lineberger Comprehensive Cancer Center provide advanced cellular therapies.\n\n3. FACT-accredited centers: CAR T-cell and approved cell therapies available only at limited specialized centers accredited by Foundation for Accreditation of Cellular Therapy (FACT).\n\nRADIOLIGAND THERAPY (RLT) CENTERS:\n\n1. Summit Cancer Centers: Offers radioligand therapies with precision tumor targeting.\n\n2. American Oncology Network (AON): Expanded RLT access across U.S. network, including Summit Cancer Centers, Cancer & Blood Specialists of Arizona, Messino Cancer Centers.\n\n3. Advanced Radiation Centers of New York: FDA-approved RLTs for advanced prostate cancer and non-Hodgkin lymphoma.\n\nACCESS CHALLENGES:\n- Limited availability: FDA-approved treatments at small number of specialized, credentialed academic medical centers\n- High costs: Very expensive therapies leading to Medicaid and insurance coverage challenges\n- Extensive monitoring: Intensive, long-term monitoring and follow-up care required\n- Logistical barriers: Travel and temporary relocation near treatment facility needed\n- Payer networks: Insurance companies (e.g., Aetna) establish "Designated Networks" for coverage\n\nHOW TO USE:\n1. Identify therapy type (cell, gene, or radioligand)\n2. Consult relevant resources for specialized centers\n3. Confirm center eligibility and verify insurance coverage\n4. Evaluate travel, accommodation, and long-term follow-up care feasibility`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'treatment-centers', 'gene-therapy', 'car-t', 'rlt', 'cell-therapy'], source_type: 'hardcoded_migration' }
      },
      // Cardio-Oncology Knowledge
      {
        finding_name: "Cardio-Oncology Clinical Knowledge Base",
        description: `OVERVIEW:\nCardio-oncology is an emerging field addressing cardiovascular needs of cancer patients and survivors. Cancer treatments can increase risk of heart disease, requiring specialized monitoring and care.\n\nCLINICAL GUIDELINES & RESEARCH:\n\n1. Journal of the American College of Cardiology: CardioOncology (JACC:CardioOncology): Dedicated journal advancing cardiovascular care of cancer patients through innovative research and evidence-based knowledge.\n\n2. European Society of Cardiology (ESC): Recommends assessing and monitoring cancer patients for potential heart complications during and after treatment.\n\n3. Global Cardio-Oncology Registry (G-COR): Multicenter registry collecting data on cardiovascular toxicity related to cancer therapy from diverse patient populations to inform practice.\n\nKEY KNOWLEDGE AREAS:\n\n• Cardiotoxicity: Broad spectrum of heart-related side effects including heart failure, arrhythmias, and hypertension occurring during or after cancer treatment.\n\n• Cardioprotective strategies: Methods to minimize cardiovascular damage and avoid interrupting cancer therapy.\n\n• Diagnostic imaging: Use of echocardiography, cardiac MRI, and other modalities to assess cardiovascular function in cancer patients.\n\n• Survivorship care: Long-term follow-up of cancer survivors, as heart problems can appear years after therapy, particularly after chest radiation.\n\nPROFESSIONAL RESOURCES:\n\n• American College of Cardiology (ACC) Cardio-Oncology Member Section: Offers networking, educational opportunities, and resources for professionals.\n\n• International Cardio-Oncology Society (IC-OS): Organization collaborating with major medical societies to advance the field.\n\nREFERENCE: https://www.acc.org/Membership/Sections-and-Councils/Fellows-in-Training-Section/Section-Updates/2019/12/15/24/42/Introduction-to-Cardio-Oncology`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['cardio-oncology', 'cardiovascular', 'cancer', 'cardiotoxicity', 'survivorship'], source_type: 'hardcoded_migration' }
      },
      // Oncology and Cancer Survivorship
      {
        finding_name: "Oncology and Cancer Survivorship Care",
        description: `OVERVIEW:\nOncology knowledge bases focus on cancer treatment, research, and long-term care for survivors.\n\nCLINICAL GUIDELINES & RESOURCES:\n\n1. American Society of Clinical Oncology (ASCO): Provides guidelines, patient education materials through Cancer.Net website, and Survivorship Compendium for healthcare professionals.\n\n2. American Cancer Society (ACS): Offers extensive resources for cancer survivors, including living well during and after treatment, managing side effects, and long-term health concerns.\n\n3. Cancer Survivorship Care Plans: Documents designed to help survivors and primary care physicians manage long-term care and potential side effects after treatment.\n\nKEY KNOWLEDGE AREAS:\n\n• Cancer prognosis: Understanding likely outcome of cancer, influencing treatment goals.\n\n• Side effects: Knowledge of treatment-related side effects, both acute and long-term, critical for coordinated care.\n\n• Clinical trials: Information on ongoing research available through professional organizations and cancer centers to stay informed on new therapies.\n\n• Long-term health monitoring: Tracking late effects of cancer treatment including secondary cancers, organ dysfunction, and psychosocial impacts.\n\n• Quality of life: Addressing physical, emotional, and social well-being of cancer survivors.\n\n• Care coordination: Facilitating transition from active treatment to survivorship care with primary care providers.`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['oncology', 'cancer', 'survivorship', 'asco', 'care-plans'], source_type: 'hardcoded_migration' }
      },
      // Multiple Sclerosis Knowledge
      {
        finding_name: "Multiple Sclerosis (MS) Clinical Knowledge Base",
        description: `OVERVIEW:\nMS knowledge bases provide information on diagnosis, treatment, and management of MS, a progressive neurological disease.\n\nCLINICAL & RESEARCH RESOURCES:\n\n1. National Multiple Sclerosis Society: Offers tools and resources for professionals including educational programs like ECHO MS Learning Network, research funding, and training.\n\n2. Multiple Sclerosis International Federation (MSIF): Global network linking national MS societies, coordinating research, and compiling Atlas of MS to track disease worldwide.\n\n3. Consortium of Multiple Sclerosis Centers (CMSC): Provides educational opportunities including Fundamentals of Multiple Sclerosis Care course offering multidisciplinary overview of MS.\n\nKEY KNOWLEDGE AREAS:\n\n• Diagnosis and monitoring: MS diagnosed through neurological exams, MRI scans of central nervous system, and cerebrospinal fluid analysis. Tools like Expanded Disability Status Scale (EDSS) monitor disability.\n\n• Pathophysiology: Understanding disease including role of myelin loss, genetics, and microbiome helps inform treatment strategies.\n\n• Disease-modifying therapies (DMTs): Essential knowledge for slowing disease progression and managing relapses.\n\n• Symptom management: Addressing common MS symptoms including fatigue, numbness, visual disturbances, cognitive changes, and mobility issues.\n\n• Patient-centered research: Initiatives like iConquerMS allow patients to participate in and influence research, helping address relevant questions.\n\n• Multidisciplinary care: Coordination between neurology, physical therapy, occupational therapy, and mental health services.\n\n• Rehabilitation: Evidence-based approaches to maintain function and independence.`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['multiple-sclerosis', 'neurology', 'dmt', 'disability', 'autoimmune'], source_type: 'hardcoded_migration' }
      },
      // Core Topics in Cardio-Oncology
      {
        finding_name: "Core Topics in Cardiology Oncology - Comprehensive Clinical Guide",
        description: `CARDIOTOXICITY OF CANCER THERAPIES:\n\nMany knowledge base articles focus on cardiovascular side effects of various cancer treatments. These toxicities result from:\n\n• Anthracyclines (e.g., doxorubicin): Oldest recognized cardiotoxicity, often causing myocardial injury and cardiomyopathy.\n\n• HER2 inhibitors (e.g., trastuzumab): Can cause cancer therapy-related cardiac dysfunction (CTRCD).\n\n• Immune checkpoint inhibitors: Increasingly linked to cardiovascular events, including myocarditis.\n\n• Radiation therapy: Can damage heart and carotid arteries, potentially leading to inflammation, fibrosis, and stenosis.\n\nRISK ASSESSMENT AND MONITORING:\n\nMajor theme identifying and monitoring patients at risk for cardiotoxicity:\n\n• Baseline cardiovascular evaluation: Prior to cancer treatment, patients with risk factors undergo thorough cardiovascular workup.\n\n• Biomarkers: Use of cardiac troponin and natriuretic peptides to predict or detect cardiac damage.\n\n• Advanced imaging: Including 2D/3D echocardiography with strain imaging and cardiac MRI to detect early signs of cardiac dysfunction.\n\nPREVENTION AND MANAGEMENT OF CARDIOTOXICITY:\n\nStrategies to minimize cardiac damage and manage complications:\n\n• Protective therapies: Using medications like dexrazoxane with anthracyclines or high-dose atorvastatin to reduce heart damage.\n\n• Medication management: Adjusting chemotherapy regimens or initiating cardioprotective drugs like beta-blockers and ACE inhibitors.\n\n• Multidisciplinary care: Emphasizing collaborative care between cardiologists, oncologists, nurses, and other specialists.\n\nCARDIOVASCULAR DISEASE IN CANCER SURVIVORS:\n\nAs cancer treatment improves, focus on long-term cardiovascular health of survivors who face higher risk of heart disease and stroke. Managing traditional cardiovascular risk factors heightened by cancer treatment.\n\nKEY RESOURCES AND ARTICLE TYPES:\n\nJOURNALS - Leading sources for cardio-oncology research and state-of-the-art reviews:\n• JACC: CardioOncology\n• Cardio-Oncology (BioMed Central)\n• Circulation and European Heart Journal with specific cardio-oncology publications\n\nGUIDELINES AND CONSENSUS DOCUMENTS - Major professional societies:\n• European Society of Cardiology (ESC): Published first comprehensive cardio-oncology guidelines in 2022\n• American College of Cardiology (ACC) and American Heart Association (AHA): Incorporate cardio-oncology guidance into broader guidelines\n\nEXPERT ANALYSIS: Articles providing in-depth analysis of specific clinical issues, emerging therapies, and illustrative patient cases.\n\nEDUCATIONAL MATERIALS: Resources for continuous medical education, summaries of recent advances and clinical perspectives.`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['cardio-oncology', 'cardiotoxicity', 'cancer-treatment', 'risk-assessment', 'imaging', 'biomarkers', 'survivorship'], source_type: 'hardcoded_migration' }
      },
      // External Document References
      {
        finding_name: "Regulatory Knowledge Guide for Cell and Gene Therapies",
        description: `REFERENCE DOCUMENT: NIH SEED Regulatory Knowledge Guide for Cell and Gene Therapies\n\nThis comprehensive regulatory guide from the NIH provides essential knowledge for navigating the regulatory landscape of cell and gene therapies.\n\nSOURCE URL: https://seed.nih.gov/sites/default/files/2024-04/Regulatory-Knowledge-Guide-for-Cell-and-Gene-Therapies.pdf\n\nKEY TOPICS COVERED:\n• FDA regulatory pathways for cell and gene therapies\n• Clinical trial requirements and phases\n• Manufacturing and quality control standards\n• Post-market surveillance and reporting\n• Compliance with 21 CFR regulations\n• IND (Investigational New Drug) application process\n• BLA (Biologics License Application) requirements\n\nTARGET AUDIENCE: Researchers, clinicians, regulatory professionals, and industry stakeholders involved in cell and gene therapy development.\n\nPUBLISHED: April 2024 by NIH SEED Program`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['regulatory', 'cell-therapy', 'gene-therapy', 'fda', 'compliance', 'nih'], source_type: 'url', source_url: 'https://seed.nih.gov/sites/default/files/2024-04/Regulatory-Knowledge-Guide-for-Cell-and-Gene-Therapies.pdf' }
      },
      {
        finding_name: "Cell and Gene Therapy Patient and Caregiver Journey",
        description: `REFERENCE DOCUMENT: NPC White Paper - Cell and Gene Therapy Patient and Caregiver Odyssey\n\nThis white paper documents the patient and caregiver experience navigating cell and gene therapy treatments, highlighting access challenges, support needs, and care coordination.\n\nSOURCE URL: https://www.npcnow.org/sites/default/files/2025-01/Cell%20and%20Gene%20Therapy_Patient%20and%20Caregiver%20Odyssey_NPC%20White%20Paper.pdf\n\nKEY INSIGHTS:\n• Patient journey from diagnosis to treatment access\n• Caregiver burden and support needs\n• Financial and logistical barriers to treatment\n• Coordination of care across multiple specialists\n• Long-term monitoring and follow-up requirements\n• Quality of life considerations\n• Healthcare system navigation challenges\n• Patient advocacy and empowerment strategies\n\nTARGET AUDIENCE: Healthcare providers, patient advocates, policymakers, and payers involved in cell and gene therapy care delivery.\n\nPUBLISHED: January 2025 by National Pharmaceutical Council (NPC)`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['patient-journey', 'caregiver', 'cell-therapy', 'gene-therapy', 'access', 'npc'], source_type: 'url', source_url: 'https://www.npcnow.org/sites/default/files/2025-01/Cell%20and%20Gene%20Therapy_Patient%20and%20Caregiver%20Odyssey_NPC%20White%20Paper.pdf' }
      },
      // Copay and Financial Assistance Programs
      {
        finding_name: "Copay and General Financial Assistance for Advanced Therapies",
        description: `NATIONAL FOUNDATIONS:\n\n• The Assistance Fund: Financial assistance for patients facing high out-of-pocket costs for 70+ conditions including oncology and cardiology.\n\n• Patient Advocate Foundation (PAF) Co-Pay Relief Program: Direct payments for copayments, coinsurance, and deductibles for prescription drugs and treatments.\n\n• HealthWell Foundation: Assists insured patients with out-of-pocket healthcare costs including copayments, premiums, and other expenses.\n\n• Patient Access Network (PAN) Foundation: Disease-specific assistance programs covering out-of-pocket medication costs.\n\n• CancerCare Co-Payment Assistance Foundation: Immediate copay assistance for eligible cancer patients.\n\n• Accessia Health: Nonprofit providing financial assistance for copayments, medical treatments, and travel for rare and chronic conditions.\n\nMANUFACTURER PROGRAMS:\n\nPharmaceutical companies offer patient assistance programs for specific medications, including copay savings cards and free drug programs:\n\n• BMS Access Support: Access and reimbursement support for eligible patients taking Bristol Myers Squibb medications.\n\n• Genentech Access Solutions: Financial assistance programs including copay assistance for Genentech products.\n\n• Gilead Patient Support: Medication access and copay savings for specific products.\n\nADVANCED THERAPY FINANCIAL AND TRAVEL ASSISTANCE:\n\nCell and gene therapies have patient support programs tailored to unique treatment journeys:\n\n• NMDP (formerly National Marrow Donor Program): Financial grants for patients undergoing cell therapy and families, including travel, lodging, and out-of-pocket medical expenses.\n\n• Blood Cancer United (formerly Leukemia & Lymphoma Society): Susan Lang Pre-CAR T-cell Therapy Travel Assistance Program provides grants for travel and lodging during CAR T evaluation.\n\n• OIG Advisory Opinion: 2024 advisory opinion approved manufacturer plan to provide travel, lodging, and meals for eligible gene therapy patients, enabling similar programs.\n\nTRAVEL AND LODGING ASSISTANCE:\n\nAmerican Cancer Society Programs:\n• Hope Lodge®: Network of free lodging facilities across United States for cancer patients and caregivers traveling for treatment.\n• Patient Lodging Programs: Discounted or free hotel stays through partnerships with Extended Stay America and other chains.\n• Road to Recovery: Free rides to cancer-related medical appointments with volunteer drivers.\n\nOther Travel Resources:\n• Mercy Medical Angels: Transportation assistance including commercial airline tickets, volunteer pilots, and gas cards for patients traveling for medical care.\n• Joe's House: Online database helping patients find lodging near cancer treatment centers with discounted rates.\n• Healthcare Hospitality Network: Directory of hospitality houses providing free or low-cost lodging for patients receiving medical care far from home.\n• Corporate Angel Network: Arranges free travel for cancer patients using empty seats on corporate jets.\n• Air Charity Network: Free air transportation for patients traveling to distant medical centers.\n\nARTICLES FOR FURTHER KNOWLEDGE:\n\nOncology Resources:\n• OncoLink: Insurance and Co-Pay Assistance - Articles and organization lists offering financial aid for cancer patients with high copayments.\n• NIH: Copay Foundation Assistance Support Program for Patients with Cancer - Analyzes copay assistance program impact on patient affordability.\n• Cancer Support Community: Traveling for Treatment? Get Help With Common Concerns - Resources for patients needing to travel for cancer care.\n\nCardio-Oncology and Advanced Therapies:\n• Avalere Health: Cell and Gene Therapy Pipeline Patient Affordability Opportunities - Strategies and solutions addressing high cost burden for advanced therapies including travel costs.\n• NIH: Financial considerations in expanded access policy for gene therapies - Explores innovative reimbursement models and patient assistance programs.\n• ASHP Center for Next-Generation Therapeutics: Clinical resources and practice tools for pharmacists including financial aspects of next-generation therapies.\n\nGeneral Medical Financial Resources:\n• EveryLife Foundation for Rare Diseases: Resources and support for patients with rare and chronic conditions including financial aid information.\n• NeedyMeds: Nonprofit with comprehensive database of patient assistance programs for medications, diagnostics, and healthcare costs.\n• The Center for Advanced Medicine: Information on funding advanced medical treatments including crowdfunding and specific grants.`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['financial-assistance', 'copay', 'patient-assistance', 'travel', 'lodging', 'foundations', 'manufacturer-programs', 'car-t', 'gene-therapy'], source_type: 'hardcoded_migration' }
      },
      // Alternative Funding Sources and Logistics
      {
        finding_name: "Alternative Funding Sources for Advanced Therapies",
        description: `PHARMACEUTICAL MANUFACTURER PROGRAMS:\n\nMany biopharmaceutical companies provide patient assistance programs (PAPs) for high-cost medications and advanced therapies.\n\n• Cell Therapy 360® (Bristol Myers Squibb): Copay assistance program for commercially insured patients receiving CAR T-cell therapy products. Covers out-of-pocket costs for specific product but not other treatment-related expenses.\n\n• Medicine Assistance Tool (MAT): Search engine created by PhRMA helping individuals locate financial assistance resources from various biopharma companies.\n\n• Other manufacturers: Astellas, AstraZeneca, Genentech, and Pfizer have patient support programs found through MAT or company websites.\n\nINDEPENDENT CHARITABLE FOUNDATIONS:\n\nOrganizations providing grants and copay assistance for cancer-related costs:\n\n• CancerCare Co-Payment Assistance Foundation: Helps eligible insured patients with copayments, coinsurance, and deductibles for prescribed cancer treatments. Funds are disease-specific.\n\n• Patient Access Network (PAN) Foundation: Assists underinsured patients with life-threatening, chronic, and rare diseases by covering out-of-pocket costs.\n\n• HealthWell Foundation: Financial assistance for copays, deductibles, and health-related expenses including travel.\n\n• The Assistance Fund: Helps patients with high medical costs by providing assistance for copayments, coinsurance, deductibles, and health-related expenses.\n\nCOMMUNITY-BASED AND NETWORKING:\n\n• Crowdfunding: Websites like GoFundMe allow patients and families to raise funds from personal networks and public.\n\n• Alternative funding programs (AFPs): For-profit vendors target self-funded health plans to reduce healthcare costs by shifting specialty drug coverage to PAPs. Can add complexity for patients.\n\nGOVERNMENT AND PUBLIC PROGRAMS:\n\n• Medicaid: State and federal programs for qualified patients to cover cancer treatment costs.\n\n• Clinical trials: May cover medication and treatment costs, though travel and living expenses typically not included.\n\n• ARPA-H ADAPT Program: Government funding for innovative cancer care research, including therapy response prediction.\n\nTRAVEL AND LOGISTICS SUPPORT:\n\nPATIENT SUPPORT NAVIGATORS:\n• Oncology social workers and financial navigators from hospitals and organizations like Cancer Support Community.\n• Pharmaceutical manufacturer support (e.g., Bristol Myers Squibb) providing dedicated navigators for treatment logistics.\n\nAIRLINE AND FLIGHT ASSISTANCE:\n• Air Charity Network: Free air travel for patients needing specialized healthcare.\n• Corporate Angel Network: Free travel on corporate jets for cancer patients.\n• Miracle Flights: Free commercial airline tickets for specialized medical care.\n\nGROUND TRANSPORTATION:\n• American Cancer Society's Road To Recovery: Free volunteer rides to/from medical appointments.\n• Mercy Medical Angels: Ground travel assistance including gas cards, bus/train tickets.\n• Ride-sharing programs: Partnerships with Lyft Concierge and Uber Health for non-emergency medical transportation.\n\nLODGING ASSISTANCE:\n• American Cancer Society Patient Lodging Program: Overnight accommodations for patients traveling for outpatient treatment.\n• Joe's House: Online database for discounted lodging near treatment centers.\n• Hope Lodge: Free accommodation for cancer patients and caregivers near treatment centers.\n\nADVANCED THERAPY-SPECIFIC TRAVEL SUPPORT:\n• CAR T-cell therapy programs: International Myeloma Foundation and Blood Cancer United (Susan Lang programs) covering travel and lodging during CAR T evaluation.\n• Cigna Healthcare Gene Therapy Program: Travel benefit for patients needing designated center care.\n• ASGCT advocacy: Supporting better assistance for Medicaid patients traveling across state lines for specialized treatment.\n\nSUPPLY CHAIN AND DELIVERY LOGISTICS:\n\nAdvanced therapies require specialized handling for time-sensitive, fragile biological material:\n\n• Complex logistics challenges: Strict temperature controls (cold chain logistics) and precise delivery windows. Failed logistics can render therapy unusable.\n\n• Specialized couriers: World Courier and Cryoport transport temperature-sensitive therapies, maintaining chain of custody and regulatory compliance.\n\n• Technology and data management: Modern logistics utilize data tracking throughout complex supply chain, coordinating manufacturers, clinicians, and logistics providers.\n\n• Patient-centric logistics: Patient at center of supply chain requiring careful orchestration and collaboration between stakeholders for timely, safe delivery.`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['funding', 'financial-assistance', 'travel-support', 'logistics', 'patient-assistance', 'car-t', 'gene-therapy', 'transportation'], source_type: 'hardcoded_migration' }
      }
      {
        finding_name: "Clinical and Translational Research in Cell and Gene Therapy",
        description: `REFERENCE ARTICLE: ScienceDirect - Clinical and Translational Research in Cell and Gene Therapy\n\nThis peer-reviewed article provides in-depth analysis of current clinical and translational research approaches in cell and gene therapy.\n\nSOURCE URL: https://www.sciencedirect.com/science/article/pii/S2666636723014689\n\nRESEARCH FOCUS:\n• Translational medicine approaches\n• Clinical trial design and methodology\n• Biomarker development and validation\n• Therapeutic efficacy assessment\n• Safety monitoring and adverse event management\n• Precision medicine applications\n• Novel delivery mechanisms\n• Emerging therapeutic targets\n\nTARGET AUDIENCE: Researchers, clinicians, and translational scientists in regenerative medicine and advanced therapeutics.\n\nNOTE: Full access may require institutional subscription to ScienceDirect.`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['research', 'clinical-trials', 'translational-medicine', 'cell-therapy', 'gene-therapy', 'biomarkers'], source_type: 'url', source_url: 'https://www.sciencedirect.com/science/article/pii/S2666636723014689' }
      }
    ];

    for (const entry of hardcodedEntries) {
      try {
        const { error } = await supabase.from('universal_knowledge_base').insert({
          ...entry,
          quality_score: 90,
          is_approved: true,
          clinical_context: {}
        });

        if (error) {
          // Check if it's a duplicate error
          if (error.code === '23505') {
            console.log(`Skipping duplicate: ${entry.finding_name}`);
          } else {
            console.error('Error migrating hardcoded entry:', error);
            errors.push(`Hardcoded: ${entry.finding_name} - ${error.message}`);
          }
        } else {
          migratedCount++;
          console.log(`Migrated: ${entry.finding_name}`);
        }
      } catch (err) {
        console.error('Exception migrating entry:', err);
        errors.push(`Exception: ${entry.finding_name}`);
      }
    }

    // ===== Step 2: Migrate from old knowledge_base table (if exists) =====
    console.log('Checking for knowledge_base table...');
    
    try {
      const { data: oldKnowledge, error: kbError } = await supabase
        .from('knowledge_base')
        .select('*')
        .limit(100);

      if (!kbError && oldKnowledge && oldKnowledge.length > 0) {
        console.log(`Found ${oldKnowledge.length} entries in knowledge_base table`);
        for (const item of oldKnowledge) {
          const { error } = await supabase.from('universal_knowledge_base').insert({
            finding_name: item.name || item.title || 'Untitled',
            description: item.description || item.content || '',
            domain: 'conversational',
            content_type: item.content_type || 'faq',
            metadata: {
              ...item.metadata,
              old_id: item.id,
              source_type: 'knowledge_base_migration',
              category: item.category
            },
            quality_score: item.quality_score || 75,
            is_approved: item.status === 'approved',
            clinical_context: {}
          });

          if (!error) {
            migratedCount++;
          } else if (error.code !== '23505') {
            errors.push(`knowledge_base: ${item.id} - ${error.message}`);
          }
        }
      }
    } catch (err) {
      console.log('knowledge_base table not found or error:', err);
    }

    const result = {
      success: true,
      summary: {
        total_migrated: migratedCount,
        hardcoded_entries: hardcodedEntries.length,
        errors: errors.length
      },
      errors: errors.slice(0, 10),
      message: `Successfully migrated ${migratedCount} knowledge entries to universal_knowledge_base`
    };

    console.log('Migration completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Migration error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
