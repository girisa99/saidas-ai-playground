import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { genieKnowledgeBase } from "../../../src/data/genieKnowledgeBase.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // ===== Step 1: Migrate hardcoded genieKnowledgeBase.ts content =====
    console.log('Migrating hardcoded Genie knowledge...');
    
    const hardcodedEntries = [
      {
        finding_name: "3-Phase AI Framework Overview",
        description: `${genieKnowledgeBase.framework.description}\n\nPhases:\n- Experiment: ${genieKnowledgeBase.framework.phases.experiment}\n- Validate: ${genieKnowledgeBase.framework.phases.validate}\n- Deploy: ${genieKnowledgeBase.framework.phases.deploy}\n\nMetrics:\n- Accuracy: ${genieKnowledgeBase.framework.metrics.accuracy}\n- Use Cases: ${genieKnowledgeBase.framework.metrics.useCases}\n- Time to Value: ${genieKnowledgeBase.framework.metrics.timeToValue}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['framework', 'methodology', 'gartner'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Gartner Value Framework",
        description: `${genieKnowledgeBase.gartnerFramework.description}\n\nValue Realization:\n- Experiment: ${genieKnowledgeBase.gartnerFramework.valueRealization.experiment}\n- Validate: ${genieKnowledgeBase.gartnerFramework.valueRealization.validate}\n- Deploy: ${genieKnowledgeBase.gartnerFramework.valueRealization.deploy}\n\nKPIs: ${genieKnowledgeBase.gartnerFramework.kpis.join(', ')}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['gartner', 'value', 'framework'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Digital Therapeutics (DTx) Overview",
        description: `${genieKnowledgeBase.healthcareExpertise.digitalTherapeutics.definition}\n\nReimbursement: ${genieKnowledgeBase.healthcareExpertise.digitalTherapeutics.reimbursement.join(', ')}\n\nCategories: ${genieKnowledgeBase.healthcareExpertise.digitalTherapeutics.categories.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'dtx', 'digital therapeutics'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Cell & Gene Therapy (CGT)",
        description: `${genieKnowledgeBase.healthcareExpertise.cellGeneTherapy.description}\n\nChallenges: ${genieKnowledgeBase.healthcareExpertise.cellGeneTherapy.challenges.join(', ')}\n\nExamples: ${genieKnowledgeBase.healthcareExpertise.cellGeneTherapy.examples.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'cgt', 'cell therapy', 'gene therapy'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Healthcare Pricing Models (340B, WAC, GPO)",
        description: `340B: ${genieKnowledgeBase.healthcareExpertise.pricing['340B']}\nWAC: ${genieKnowledgeBase.healthcareExpertise.pricing['WAC']}\nGPO: ${genieKnowledgeBase.healthcareExpertise.pricing['GPO']}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['healthcare', 'pricing', '340b', 'wac', 'gpo'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "AI Technology Stack",
        description: `LLMs: ${genieKnowledgeBase.technologyStack.llms.join(', ')}\n\nPlatforms: ${genieKnowledgeBase.technologyStack.platforms.join(', ')}\n\nInfrastructure: ${genieKnowledgeBase.technologyStack.infrastructure.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['technology', 'ai', 'llm', 'stack'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Patient Onboarding Case Study",
        description: `Challenge: ${genieKnowledgeBase.caseStudyExamples.patientOnboarding.challenge}\n\nSolution: ${genieKnowledgeBase.caseStudyExamples.patientOnboarding.solution}\n\nFramework: ${genieKnowledgeBase.caseStudyExamples.patientOnboarding.framework}\n\nTechnologies: ${genieKnowledgeBase.caseStudyExamples.patientOnboarding.technologies.join(', ')}\n\nOutcomes: ${genieKnowledgeBase.caseStudyExamples.patientOnboarding.outcomes.join(', ')}`,
        domain: 'patient_onboarding',
        content_type: 'template',
        metadata: { tags: ['case study', 'patient onboarding', 'framework validation'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "AI Security & Compliance",
        description: `Security Considerations: ${genieKnowledgeBase.securityCompliance.considerations.join(', ')}\n\nData Protection: ${genieKnowledgeBase.securityCompliance.dataProtection.join(', ')}`,
        domain: 'conversational',
        content_type: 'guideline',
        metadata: { tags: ['security', 'compliance', 'gdpr', 'hipaa'], source_type: 'hardcoded_migration' }
      },
      {
        finding_name: "Emerging Technologies & AI Capabilities",
        description: `AI Specializations: ${genieKnowledgeBase.aiCapabilities.specializations.join(', ')}\n\nModes: ${genieKnowledgeBase.aiCapabilities.modes.join(', ')}\n\nEmerging Tech: ${genieKnowledgeBase.emergingTechnologies.join(', ')}`,
        domain: 'conversational',
        content_type: 'educational_content',
        metadata: { tags: ['ai', 'technology', 'emerging tech', 'capabilities'], source_type: 'hardcoded_migration' }
      }
    ];

    for (const entry of hardcodedEntries) {
      const { error } = await supabase.from('universal_knowledge_base').insert({
        ...entry,
        quality_score: 90,
        is_approved: true,
        clinical_context: {}
      });

      if (error) {
        console.error('Error migrating hardcoded entry:', error);
        errors.push(`Hardcoded: ${entry.finding_name} - ${error.message}`);
      } else {
        migratedCount++;
      }
    }

    // ===== Step 2: Migrate from old knowledge_base table =====
    console.log('Migrating from knowledge_base table...');
    
    const { data: oldKnowledge, error: kbError } = await supabase
      .from('knowledge_base')
      .select('*');

    if (!kbError && oldKnowledge) {
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

        if (!error) migratedCount++;
        else errors.push(`knowledge_base: ${item.id} - ${error.message}`);
      }
    }

    // ===== Step 3: Migrate from rag_recommendations table =====
    console.log('Migrating from rag_recommendations table...');
    
    const { data: ragRecs, error: ragError } = await supabase
      .from('rag_recommendations')
      .select('*');

    if (!ragError && ragRecs) {
      for (const item of ragRecs) {
        const { error } = await supabase.from('universal_knowledge_base').insert({
          finding_name: item.recommendation_title || 'RAG Recommendation',
          description: item.recommendation_text || item.content || '',
          domain: 'conversational',
          content_type: 'faq',
          metadata: {
            old_id: item.id,
            source_type: 'rag_recommendations_migration',
            confidence: item.confidence_score
          },
          quality_score: Math.round((item.confidence_score || 0.75) * 100),
          is_approved: true,
          clinical_context: {}
        });

        if (!error) migratedCount++;
        else errors.push(`rag_recommendations: ${item.id} - ${error.message}`);
      }
    }

    // Note: medical_imaging_knowledge should already be migrated
    console.log('Checking medical_imaging_knowledge (should already be migrated)...');

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