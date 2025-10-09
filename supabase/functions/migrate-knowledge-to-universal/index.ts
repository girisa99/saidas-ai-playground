import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hardcoded knowledge base content (inline since we can't import from src/)
const hardcodedKnowledge = {
  framework: {
    description: "A proven 3-phase methodology for AI experimentation validated through live features",
    phases: {
      experiment: "Rapid prototyping and validation with real users",
      validate: "Measure business impact and user adoption",
      deploy: "Scale proven solutions with confidence"
    },
    metrics: {
      accuracy: "85%+ user satisfaction across both features",
      useCases: "2 live features serving real healthcare workflows",
      timeToValue: "Weeks instead of months with iterative approach"
    }
  },
  gartnerFramework: {
    description: "Value realization framework aligned with Gartner's AI adoption methodology",
    valueRealization: {
      experiment: "Proof of concept with measurable outcomes",
      validate: "Business case validation with real ROI metrics",
      deploy: "Enterprise-grade deployment and scaling"
    },
    kpis: [
      "User Adoption Rate",
      "Task Completion Time",
      "Error Reduction",
      "User Satisfaction Score",
      "Business Value Delivered"
    ]
  },
  healthcareExpertise: {
    digitalTherapeutics: {
      definition: "Evidence-based therapeutic interventions driven by software programs",
      reimbursement: ["FDA approved", "Evidence-based", "Prescription-grade"],
      categories: ["Behavioral health", "Chronic disease management", "Medication adherence"]
    },
    cellGeneTherapy: {
      description: "Advanced therapies using cells and genetic material to treat disease",
      challenges: ["Manufacturing complexity", "Cold chain logistics", "Patient scheduling"],
      examples: ["CAR-T therapy", "Gene editing", "Stem cell treatments"]
    },
    pricing: {
      "340B": "Drug pricing program for covered entities serving vulnerable populations",
      "WAC": "Wholesale Acquisition Cost - manufacturer's list price to wholesalers",
      "GPO": "Group Purchasing Organizations - collective buying power for healthcare"
    }
  },
  technologyStack: {
    llms: ["GPT-4", "Claude", "Gemini"],
    platforms: ["OpenAI", "Anthropic", "Google AI"],
    infrastructure: ["Supabase", "React", "TypeScript", "Tailwind CSS"]
  },
  caseStudyExamples: {
    patientOnboarding: {
      challenge: "Complex patient enrollment process with multiple touchpoints",
      solution: "AI-powered conversational interface for guided onboarding",
      framework: "3-phase approach: Experiment → Validate → Deploy",
      technologies: ["OpenAI GPT-4", "Supabase", "React"],
      outcomes: [
        "Reduced onboarding time by 60%",
        "Improved data accuracy by 40%",
        "85% user satisfaction"
      ]
    }
  },
  securityCompliance: {
    considerations: ["HIPAA compliance", "Data encryption", "Access controls", "Audit logging"],
    dataProtection: ["End-to-end encryption", "Role-based access", "PHI safeguards"]
  },
  aiCapabilities: {
    specializations: ["Healthcare AI", "Conversational AI", "Medical Imaging"],
    modes: ["Interactive chat", "Document analysis", "Image interpretation"]
  },
  emergingTechnologies: ["Agentic AI", "Multi-modal models", "Edge computing", "Federated learning"]
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
      {
        finding_name: "3-Phase AI Framework Overview",
        description: `${hardcodedKnowledge.framework.description}\n\nPhases:\n- Experiment: ${hardcodedKnowledge.framework.phases.experiment}\n- Validate: ${hardcodedKnowledge.framework.phases.validate}\n- Deploy: ${hardcodedKnowledge.framework.phases.deploy}\n\nMetrics:\n- Accuracy: ${hardcodedKnowledge.framework.metrics.accuracy}\n- Use Cases: ${hardcodedKnowledge.framework.metrics.useCases}\n- Time to Value: ${hardcodedKnowledge.framework.metrics.timeToValue}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['framework', 'methodology', 'gartner'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Gartner Value Framework",
        description: `${hardcodedKnowledge.gartnerFramework.description}\n\nValue Realization:\n- Experiment: ${hardcodedKnowledge.gartnerFramework.valueRealization.experiment}\n- Validate: ${hardcodedKnowledge.gartnerFramework.valueRealization.validate}\n- Deploy: ${hardcodedKnowledge.gartnerFramework.valueRealization.deploy}\n\nKPIs: ${hardcodedKnowledge.gartnerFramework.kpis.join(', ')}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['gartner', 'value', 'framework'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Digital Therapeutics (DTx) Overview",
        description: `${hardcodedKnowledge.healthcareExpertise.digitalTherapeutics.definition}\n\nReimbursement: ${hardcodedKnowledge.healthcareExpertise.digitalTherapeutics.reimbursement.join(', ')}\n\nCategories: ${hardcodedKnowledge.healthcareExpertise.digitalTherapeutics.categories.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'dtx', 'digital therapeutics'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Cell & Gene Therapy (CGT)",
        description: `${hardcodedKnowledge.healthcareExpertise.cellGeneTherapy.description}\n\nChallenges: ${hardcodedKnowledge.healthcareExpertise.cellGeneTherapy.challenges.join(', ')}\n\nExamples: ${hardcodedKnowledge.healthcareExpertise.cellGeneTherapy.examples.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'cgt', 'cell therapy', 'gene therapy'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Healthcare Pricing Models (340B, WAC, GPO)",
        description: `340B: ${hardcodedKnowledge.healthcareExpertise.pricing['340B']}\nWAC: ${hardcodedKnowledge.healthcareExpertise.pricing['WAC']}\nGPO: ${hardcodedKnowledge.healthcareExpertise.pricing['GPO']}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'pricing', '340b', 'wac', 'gpo'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "AI Technology Stack",
        description: `LLMs: ${hardcodedKnowledge.technologyStack.llms.join(', ')}\n\nPlatforms: ${hardcodedKnowledge.technologyStack.platforms.join(', ')}\n\nInfrastructure: ${hardcodedKnowledge.technologyStack.infrastructure.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['technology', 'ai', 'llm', 'stack'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Patient Onboarding Case Study",
        description: `Challenge: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.challenge}\n\nSolution: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.solution}\n\nFramework: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.framework}\n\nTechnologies: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.technologies.join(', ')}\n\nOutcomes: ${hardcodedKnowledge.caseStudyExamples.patientOnboarding.outcomes.join(', ')}`,
        domain: 'patient_onboarding',
        content_type: 'template',
        metadata: { tags: ['case study', 'patient onboarding', 'framework validation'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "AI Security & Compliance",
        description: `Security Considerations: ${hardcodedKnowledge.securityCompliance.considerations.join(', ')}\n\nData Protection: ${hardcodedKnowledge.securityCompliance.dataProtection.join(', ')}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['security', 'compliance', 'gdpr', 'hipaa'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Emerging Technologies & AI Capabilities",
        description: `AI Specializations: ${hardcodedKnowledge.aiCapabilities.specializations.join(', ')}\n\nModes: ${hardcodedKnowledge.aiCapabilities.modes.join(', ')}\n\nEmerging Tech: ${hardcodedKnowledge.emergingTechnologies.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['ai', 'technology', 'emerging tech', 'capabilities'], source_type: 'hardcoded_migration' }
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
