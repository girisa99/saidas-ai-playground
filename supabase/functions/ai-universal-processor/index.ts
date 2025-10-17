import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { checkRateLimit, getClientIP, getRateLimitHeaders } from "../_shared/rateLimiter.ts";
import { AIRequestSchema, createValidationErrorResponse } from "../_shared/validation.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
const claudeApiKey = Deno.env.get('ANTHROPIC_API_KEY'); // Anthropic API key for Claude
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const labelStudioApiKey = Deno.env.get('LABEL_STUDIO_API_KEY');
const labelStudioUrl = Deno.env.get('LABEL_STUDIO_URL');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface AIRequest {
  provider: 'openai' | 'claude' | 'gemini'; // Direct API calls only
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  context?: string;
  useRAG?: boolean;
  imageUrl?: string;
  images?: string[];
  useMCP?: boolean;
  mcpServers?: string[];
  labelStudioProject?: string;
  enableSmartRouting?: boolean;
  enableMultiAgent?: boolean; // NEW: Enable multi-agent collaboration
  conversationHistory?: Array<{ role: string; content: string }>;
}

// Triage result interface (matching frontend)
interface TriageResult {
  complexity: 'simple' | 'medium' | 'high';
  domain: 'healthcare' | 'technology' | 'general';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  best_format: 'text' | 'table' | 'html' | 'list' | 'map';
  keywords: string[];
  suggested_model: string;
  confidence: number;
  reasoning: string;
  requires_vision: boolean;
  emotional_tone?: 'empathetic' | 'professional' | 'playful';
}

async function searchKnowledgeBase(query: string, context?: string, useSemanticSearch: boolean = true) {
  try {
    // Extract only the user's main question and sanitize to avoid PostgREST OR parser issues
    const base = (query || '')
      .split(/\n\n|\nContext:|\nAI Config:|\nUser:/i)[0] // take first paragraph before metadata
      .replace(/https?:\/\/\S+/g, '') // remove urls
      .replace(/[^\p{L}\p{N}\s]/gu, ' ') // keep letters/numbers/spaces only
      .replace(/\s+/g, ' ') // collapse whitespace
      .trim()
      .toLowerCase();

    const sanitized = base.slice(0, 120); // keep it short for LIKE

    if (!sanitized) return [];

    console.log('Searching universal knowledge base for (sanitized):', sanitized);
    
    // Try semantic search first if enabled
    if (useSemanticSearch) {
      try {
        // Generate embedding for the query using OpenAI API directly
        const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
        if (OPENAI_API_KEY) {
          const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'text-embedding-3-small',
              input: sanitized,
            }),
          });

          if (embeddingResponse.ok) {
            const embeddingData = await embeddingResponse.json();
            const queryEmbedding = embeddingData.data[0].embedding;

            // Use hybrid search (combines semantic + keyword)
            const { data: semanticResults, error: semanticError } = await supabase
              .rpc('search_knowledge_hybrid', {
                search_query: sanitized,
                query_embedding: queryEmbedding,
                match_count: 5
              });

            if (!semanticError && semanticResults && semanticResults.length > 0) {
              console.log(`Found ${semanticResults.length} results via semantic search (avg similarity: ${(semanticResults.reduce((sum: number, r: any) => sum + r.similarity, 0) / semanticResults.length).toFixed(2)})`);
              return semanticResults;
            }
          }
        }
      } catch (semanticError) {
        console.log('Semantic search failed, falling back to keyword search:', semanticError);
      }
    }
    
    // Fallback to keyword search
    const { data: results, error } = await supabase
      .from('universal_knowledge_base')
      .select('finding_name, description, clinical_context, clinical_significance, domain, content_type, metadata')
      .eq('is_approved', true)
      .or(`finding_name.ilike.%${sanitized}%,description.ilike.%${sanitized}%`)
      .limit(5);

    if (error) {
      console.error('Universal knowledge base search error:', error);
      return [];
    }

    console.log(`Found ${results?.length || 0} relevant knowledge entries via keyword search`);
    return results || [];
  } catch (error) {
    console.error('Search knowledge base error:', error);
    return [];
  }
}

/**
 * ROLE-BASED SPECIALIZATION: SLM Triage Logic
 * Fast query classification to determine optimal model routing
 */
async function triageQuery(
  query: string,
  context?: string,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<TriageResult> {
  const queryLower = query.toLowerCase();
  const wordCount = query.split(' ').length;
  
  // Pattern-based classification
  const complexity = classifyComplexity(queryLower, wordCount);
  const domain = detectDomain(queryLower, context);
  const urgency = detectUrgency(queryLower, complexity);
  const best_format = determineBestFormat(queryLower, complexity);
  const keywords = extractKeywords(query);
  const requires_vision = detectVisionRequirement(queryLower);
  const emotional_tone = detectEmotionalTone(queryLower, conversationHistory);
  const suggested_model = suggestModel(complexity, domain, urgency, requires_vision);
  
  return {
    complexity,
    domain,
    urgency,
    best_format,
    keywords,
    suggested_model,
    confidence: 0.85,
    reasoning: `${complexity} complexity ${domain} query`,
    requires_vision,
    emotional_tone
  };
}

function classifyComplexity(queryLower: string, wordCount: number): 'simple' | 'medium' | 'high' {
  const simplePatterns = [
    /^(what|who|when|where|how) (is|are|was|were|do|does)/,
    /^(tell me|show me|give me|list)/,
    /(office hours?|contact|pricing|location|support)/,
  ];
  
  if (simplePatterns.some(p => p.test(queryLower)) && wordCount < 10) {
    return 'simple';
  }
  
  const highComplexityIndicators = [
    /(analyze|compare|evaluate|assess|diagnose)/,
    /(differential|comprehensive|detailed analysis)/,
  ];
  
  if (highComplexityIndicators.some(p => p.test(queryLower)) || wordCount > 30) {
    return 'high';
  }
  
  return 'medium';
}

function detectDomain(queryLower: string, context?: string): 'healthcare' | 'technology' | 'general' {
  const healthcareKeywords = [
    // ========== GENERAL MEDICAL ==========
    'patient', 'medical', 'clinical', 'diagnosis', 'treatment', 'therapy', 
    'x-ray', 'mri', 'ct scan', 'healthcare', 'hospital', 'doctor', 'nurse', 'medication',
    
    // ========== PAYER & REIMBURSEMENT ==========
    'copay', 'coinsurance', 'deductible', 'prior authorization', 'pa', 'claims',
    'coverage', 'formulary', 'benefit verification', 'insurance coverage',
    'commercial insurance', 'medicare', 'medicaid', 'managed care',
    'specialty pharmacy', 'buy and bill', 'medical benefit', 'pharmacy benefit',
    
    // ========== PATIENT ACCESS & ASSISTANCE ==========
    'patient assistance', 'copay assistance', 'copay card', 'free drug program',
    'alternative funding', 'charitable foundation', 'patient foundation',
    'financial assistance', 'hub services', 'specialty hub', 'case management',
    'patient navigation', 'reimbursement support', 'appeals', 'denials',
    
    // ========== CLINICAL TRIALS ==========
    'clinical trial', 'clinical study', 'inclusion criteria', 'exclusion criteria',
    'enrollment', 'screening', 'protocol', 'investigator', 'study site',
    'informed consent', 'irb', 'adverse event', 'endpoints', 'phase 1', 'phase 2', 'phase 3',
    
    // ========== TREATMENT CENTERS & FACILITIES ==========
    'treatment center', 'infusion center', 'cancer center', 'oncology center',
    'comprehensive cancer center', 'academic medical center', 'community oncology',
    'hospital outpatient', 'ambulatory infusion', 'clinic', 'practice',
    
    // ========== PATIENT EDUCATION & ADHERENCE ==========
    'patient education', 'adherence', 'compliance', 'medication adherence',
    'side effect management', 'monitoring', 'follow-up', 'awareness',
    
    // ========== ONCOLOGY & IMMUNOTHERAPY ==========
    'car-t', 'car t', 'cell therapy', 'immunotherapy', 'tcr', 't-cell', 'checkpoint inhibitor',
    'lymphoma', 'leukemia', 'cancer', 'oncology', 'tumor', 'malignancy', 'pd-1', 'pd-l1', 'ctla-4',
    'trial', 'fda', 'approval', 'indication',
    'yescarta', 'kymriah', 'tecartus', 'breyanzi', 'abecma', 'carvykti', 'keytruda', 'opdivo', 'yervoy',
    'kite', 'novartis', 'gilead', 'bristol myers', 'bms', 'jnj', 'janssen',
    'allogeneic', 'autologous', 'cd19', 'cd20', 'bcma', 'b-cell',
    'chemotherapy', 'radiation', 'metastatic', 'biopsy', 'staging',
    
    // ========== BREAST, MS, MENTAL HEALTH, DIABETES, CARDIO, ETC. ==========
    'breast cancer', 'her2', 'brca', 'tamoxifen', 'herceptin', 'triple negative',
    'multiple sclerosis', 'ms', 'tysabri', 'ocrevus', 'gilenya', 'copaxone',
    'mental health', 'psychiatry', 'schizophrenia', 'depression', 'anxiety', 'bipolar',
    'prozac', 'zoloft', 'abilify', 'seroquel', 'risperdal', 'zyprexa', 'latuda',
    'diabetes', 'insulin', 'glucose', 'a1c', 'metformin', 'ozempic', 'mounjaro',
    'heart', 'cardiac', 'hypertension', 'blood pressure', 'cholesterol', 'statin',
    'rheumatoid arthritis', 'lupus', 'psoriasis', 'crohn', 'humira', 'enbrel',
    'hiv', 'hepatitis', 'vaccine', 'asthma', 'copd', 'inhaler', 'albuterol'
  ];
  
  const technologyKeywords = [
    'software', 'code', 'api', 'integration', 'platform',
    'cloud', 'saas', 'automation', 'workflow', 'digital',
    'database', 'frontend', 'backend', 'deployment', 'server'
  ];
  
  const healthScore = healthcareKeywords.filter(k => queryLower.includes(k)).length;
  const techScore = technologyKeywords.filter(k => queryLower.includes(k)).length;
  
  if (context === 'healthcare' && healthScore >= techScore) return 'healthcare';
  if (context === 'technology' && techScore >= healthScore) return 'technology';
  if (healthScore > techScore) return 'healthcare';
  if (techScore > healthScore) return 'technology';
  
  return 'general';
  
  if (context === 'healthcare' && healthScore >= techScore) return 'healthcare';
  if (context === 'technology' && techScore >= healthScore) return 'technology';
  if (healthScore > techScore) return 'healthcare';
  if (techScore > healthScore) return 'technology';
  
  return 'general';
}

/**
 * Generate domain-specific system prompts to guide AI responses appropriately
 */
function getDomainSystemPrompt(domain: 'healthcare' | 'technology' | 'general', emotionalTone?: string): string {
  const basePrompt = "You are a knowledgeable AI assistant. ";
  
  if (domain === 'healthcare') {
    return basePrompt + `You specialize in healthcare, medical information, and patient support. 

**Healthcare Guidelines:**
- Use clear, accessible language while maintaining medical accuracy
- When discussing treatments, always emphasize consulting healthcare providers
- Include disclaimers for treatment centers, drug information, and medical advice
- Be empathetic and patient-focused in your responses
- Reference clinical evidence and FDA-approved indications when relevant
- For drug pricing and insurance, explain options without making financial recommendations
- When discussing clinical trials, explain eligibility criteria clearly
- Always prioritize patient safety and informed decision-making

${emotionalTone === 'empathetic' ? 'Use a warm, supportive tone as the user seems confused or concerned.' : ''}
${emotionalTone === 'professional' ? 'Maintain a professional, clinical tone.' : ''}`;
  }
  
  if (domain === 'technology') {
    return basePrompt + `You specialize in technology, software development, and IT solutions.

**Technology Guidelines:**
- Provide technical explanations with code examples when appropriate
- Focus on best practices, security, and scalability
- Reference official documentation and industry standards
- Explain technical concepts progressively (simple to complex)
- Include practical implementation steps
- Consider different tech stacks and deployment environments
- Highlight potential pitfalls and common mistakes

${emotionalTone === 'playful' ? 'Use an enthusiastic, developer-friendly tone.' : ''}
${emotionalTone === 'professional' ? 'Maintain a technical, precise tone.' : ''}`;
  }
  
  // General domain
  return basePrompt + `Provide helpful, accurate information tailored to the user's needs. 
- Ask clarifying questions if the domain or intent is unclear
- Adapt your tone and detail level to the user's expertise
- Offer to dive deeper into specific areas as needed`;
}

function detectUrgency(queryLower: string, complexity: string): 'low' | 'medium' | 'high' | 'critical' {
  const criticalIndicators = ['emergency', 'urgent', 'critical', 'immediately', 'asap'];
  const highIndicators = ['important', 'priority', 'soon', 'quickly'];
  
  if (criticalIndicators.some(i => queryLower.includes(i))) return 'critical';
  if (highIndicators.some(i => queryLower.includes(i))) return 'high';
  if (complexity === 'simple') return 'low';
  
  return 'medium';
}

function determineBestFormat(queryLower: string, complexity: string): 'text' | 'table' | 'html' | 'list' | 'map' {
  // Map format for location/treatment center queries
  const mapKeywords = [
    'where', 'location', 'near', 'find', 'treatment center', 'clinic', 'hospital',
    'clinical trial', 'gene therapy', 'bmt', 'oncology', 'transplant',
    'therapy center', 'cancer center', 'city', 'state', 'address', 'map'
  ];
  
  if (mapKeywords.some(keyword => queryLower.includes(keyword))) {
    return 'map';
  }
  
  if (queryLower.match(/(compare|versus|vs|differences)/)) return 'table';
  if (queryLower.match(/(list|steps|options|types)/)) return 'list';
  if (complexity === 'high') return 'html';
  return 'text';
}

function extractKeywords(query: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'what', 'when', 'where', 'who', 'why', 'how']);
  const words = query.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w));
  return [...new Set(words)].slice(0, 10);
}

function detectVisionRequirement(queryLower: string): boolean {
  // FIXED: Only detect vision when explicitly asking about images/scans, NOT for "list"
  return /\b(image|picture|photo|scan|x-ray|mri|ct\s*scan|visual|diagram)\b/.test(queryLower);
}

function detectEmotionalTone(queryLower: string, history?: any[]): 'empathetic' | 'professional' | 'playful' | undefined {
  if (/confused|lost|don't understand|stuck/.test(queryLower)) return 'empathetic';
  if (/awesome|great|cool|amazing|wow/.test(queryLower)) return 'playful';
  return 'professional';
}

function suggestModel(complexity: string, domain: string, urgency: string, requires_vision: boolean): string {
  // CRITICAL urgency → Use best reasoning models (cross-provider)
  if (urgency === 'critical') {
    if (domain === 'healthcare') return 'claude-sonnet-4-5'; // Best medical reasoning
    if (requires_vision) return 'google/gemini-2.5-pro'; // Best vision
    return 'openai/gpt-5'; // Best general reasoning
  }
  
  // Vision required → Use vision-capable models (cross-provider)
  if (requires_vision) {
    if (complexity === 'high' || domain === 'healthcare') return 'google/gemini-2.5-pro';
    if (domain === 'technology') return 'openai/gpt-5'; // GPT-5 has vision too
    return 'google/gemini-2.5-flash';
  }
  
  // HIGH complexity → Use best reasoning models (cross-provider)
  if (complexity === 'high') {
    if (domain === 'healthcare') return 'claude-sonnet-4-5'; // Claude excels at medical reasoning
    if (domain === 'technology') return 'openai/gpt-5'; // GPT-5 excels at code/tech
    return 'claude-sonnet-4-5'; // Claude best for complex general reasoning
  }
  
  // MEDIUM complexity → Balanced models (cross-provider)
  if (complexity === 'medium') {
    if (domain === 'healthcare') return 'google/gemini-2.5-pro'; // Medical accuracy
    if (domain === 'technology') return 'openai/gpt-5-mini'; // Good for tech queries
    return 'google/gemini-2.5-flash'; // Cost-effective general
  }
  
  // SIMPLE queries → Fastest/cheapest models
  if (complexity === 'simple') {
    if (domain === 'healthcare') return 'google/gemini-2.5-flash'; // Still want quality for medical
    return 'google/gemini-2.5-flash-lite'; // Fastest for simple tasks
  }
  
  // Default fallback → Balanced choice
  return domain === 'healthcare' ? 'google/gemini-2.5-pro' : 'google/gemini-2.5-flash';
}

// Cost estimation (relative cost per 1K tokens, normalized)
function getModelCost(model: string): number {
  const costs: Record<string, number> = {
    'google/gemini-2.5-pro': 10,
    'google/gemini-2.5-flash': 3,
    'google/gemini-2.5-flash-lite': 1,
    'openai/gpt-5': 12,
    'openai/gpt-5-mini': 4,
    'openai/gpt-5-nano': 1.5,
    'phi-3.5-mini': 1, // SLM, very cheap
  };
  return costs[model] || 5;
}

// Latency estimation (relative response time in ms, normalized)
function getModelLatency(model: string): number {
  const latencies: Record<string, number> = {
    'google/gemini-2.5-pro': 2000,
    'google/gemini-2.5-flash': 800,
    'google/gemini-2.5-flash-lite': 400,
    'openai/gpt-5': 2500,
    'openai/gpt-5-mini': 1000,
    'openai/gpt-5-nano': 500,
    'phi-3.5-mini': 300, // SLM, very fast
  };
  return latencies[model] || 1000;
}

// Detect provider from model name
function detectProviderFromModel(model: string): 'openai' | 'claude' | 'gemini' {
  const lower = model.toLowerCase();
  if (lower.includes('gpt') || lower.includes('openai') || lower.includes('o3') || lower.includes('o4')) {
    return 'openai';
  }
  if (lower.includes('claude') || lower.includes('anthropic')) {
    return 'claude';
  }
  return 'gemini'; // default
}



// ========== AI RECOMMENDATION ENGINE ==========
// Generate dynamic, context-aware recommendations that vary based on query context
function generateMapRecommendations(userQuery: string, triageData: any, filters: any): any {
  const recommendations: any = {
    type: 'map_recommendations',
    suggestions: [],
    nextSteps: [],
    relatedQueries: [],
    displayHints: {}
  };
  
  const queryLower = userQuery.toLowerCase();
  // Normalize detected entities to safe string values (never index into null)
  const productMatch: string | null = (typeof filters.product === 'string' && filters.product.trim().length > 0)
    ? filters.product.trim()
    : (queryLower.match(/(kymriah|yescarta|tecartus|breyanzi|abecma|carvykti|zolgensma|luxturna|tysabri|ocrevus|opdivo|keytruda)/i)?.[0] || null);
  const therapeuticMatch: string | null = (typeof filters.therapeuticArea === 'string' && filters.therapeuticArea.trim().length > 0)
    ? filters.therapeuticArea.trim()
    : (queryLower.match(/(car-t|gene therapy|bmt|oncology|ms|cardio)/i)?.[0] || null);
  const hasLocation: boolean = Boolean(filters.state || filters.city || queryLower.match(/\b(near|in|at|around)\b.*\b([A-Z]{2}|[a-z]+\s+[a-z]+)/));
  const manufacturerMatch: string | null = (typeof filters.manufacturer === 'string' && filters.manufacturer.trim().length > 0)
    ? filters.manufacturer.trim()
    : (queryLower.match(/(kite|novartis|gilead|bristol|bms|janssen|jnj)/i)?.[0] || null);

  // DYNAMIC VARIATIONS - Messages change based on context
  const productKey = (productMatch || 'therapy').toUpperCase();
  const messageSets = {
    productSpecific: [
      `💊 Found ${productKey} authorized treatment centers`,
      `🏥 Exploring ${productKey} administration sites near you`,
      `📍 Mapping specialized ${productKey} centers with verified protocols`,
      `🔬 Identifying ${productKey}-certified facilities with expert teams`
    ],
    locationBased: [
      `📍 Searching treatment centers in your specified area`,
      `🗺️ Mapping nearby facilities with specialized capabilities`,
      `🏙️ Finding centers accessible from your location`,
      `🚗 Identifying treatment sites with travel support options`
    ],
    trialFocus: [
      `🧪 Clinical trial centers currently enrolling patients`,
      `📋 Active research sites with open study protocols`,
      `🔬 Investigator sites recruiting for ${productMatch || 'advanced'} therapy trials`,
      `⚗️ Research facilities with FDA-authorized trial programs`
    ],
    urgentCare: [
      `⚡ Priority access centers with immediate availability`,
      `🚨 Facilities offering expedited treatment pathways`,
      `⏰ Centers with rapid assessment and treatment initiation`,
      `💨 Fast-track programs for urgent patient needs`
    ],
    comprehensive: [
      `🏥 Comprehensive treatment centers with full-service capabilities`,
      `🌟 Centers of excellence with multidisciplinary teams`,
      `🔍 Exploring facilities with complete patient support services`,
      `💼 Full-spectrum care centers including financial counseling`
    ]
  } as const;
  
  // SELECT CONTEXTUAL MESSAGE (varies each time)
  let primaryMessage = '';
  if (triageData?.urgency === 'high' || queryLower.includes('urgent') || queryLower.includes('immediate')) {
    primaryMessage = messageSets.urgentCare[Math.floor(Math.random() * messageSets.urgentCare.length)];
  } else if (queryLower.includes('trial') || filters.clinicalTrial) {
    primaryMessage = messageSets.trialFocus[Math.floor(Math.random() * messageSets.trialFocus.length)];
  } else if (productMatch) {
    primaryMessage = messageSets.productSpecific[Math.floor(Math.random() * messageSets.productSpecific.length)];
  } else if (hasLocation) {
    primaryMessage = messageSets.locationBased[Math.floor(Math.random() * messageSets.locationBased.length)];
  } else {
    primaryMessage = messageSets.comprehensive[Math.floor(Math.random() * messageSets.comprehensive.length)];
  }
  
  recommendations.displayHints.primaryMessage = primaryMessage;
  
  // Pricing-specific suggestions (ENHANCED WITH MORE VARIATION)
  if (filters.insuranceType || queryLower.includes('insurance') || queryLower.includes('cost')) {
    const pricingMessages = [
      `💰 ${(filters.insuranceType?.toUpperCase() || 'Insurance')} pricing breakdown available`,
      `💵 Understanding your ${filters.insuranceType || 'coverage'} options and out-of-pocket costs`,
      `💳 ${(filters.insuranceType?.toUpperCase() || 'Insurance')} coverage analysis for selected centers`,
      `💲 Financial impact assessment for ${filters.insuranceType || 'your insurance'} plan`
    ];
    
    recommendations.suggestions.push({
      icon: 'dollar-sign',
      title: pricingMessages[Math.floor(Math.random() * pricingMessages.length)],
      description: `Detailed cost comparison including ${filters.insuranceType || 'multiple insurance types'}`,
      action: 'show_pricing',
      priority: 'high'
    });
    
    recommendations.relatedQueries.push(
      `Patient assistance programs for ${productMatch || 'therapy'}`,
      `Copay support options with ${filters.insuranceType || 'insurance'}`,
      `Financial counseling services at treatment centers`
    );
  }
  
  // Product/Manufacturer context (ENHANCED)
  if (productMatch) {
    const product = productMatch;
    const productMessages = [
      `📊 Comparing ${product} pricing across all models`,
      `💊 ${product} cost analysis: WAC vs Government vs Commercial`,
      `🏥 ${product} financial landscape and assistance programs`,
      `💰 Understanding ${product} pricing and patient support options`
    ];
    
    recommendations.suggestions.push({
      icon: 'info',
      title: productMessages[Math.floor(Math.random() * productMessages.length)],
      description: 'Complete pricing breakdown including PAP eligibility',
      action: 'show_price_comparison',
      priority: 'high'
    });
    
    recommendations.relatedQueries.push(
      `${product} treatment journey and timeline`,
      `Insurance pre-authorization for ${product}`,
      `${product} manufacturer patient support program`,
      `Centers with ${product} administration expertise`
    );
  }
  
  // Manufacturer-specific insights
  if (manufacturerMatch) {
    const mfg = manufacturerMatch;
    recommendations.nextSteps.push(
      `Explore ${mfg} patient assistance programs`,
      `Contact ${mfg} reimbursement specialists`,
      `Review ${mfg} treatment center network`
    );
  }
  
  // Therapeutic area guidance
  if (therapeuticMatch) {
    const area = therapeuticMatch;
    const areaMessages = [
      `🔬 ${area} specialized centers with proven outcomes`,
      `🏆 Leading ${area} treatment facilities`,
      `💡 ${area} centers of excellence nationwide`,
      `⭐ Top-rated ${area} care centers`
    ];
    
    recommendations.displayHints.therapeuticMessage = areaMessages[Math.floor(Math.random() * areaMessages.length)];
  }
  
  // Clinical trials
  if (queryLower.includes('trial') || filters.clinicalTrial) {
    const trialMessages = [
      '🧪 Clinical trial enrollment opportunities',
      '📋 Active research studies seeking participants',
      '🔬 Cutting-edge trial programs available',
      '⚗️ Investigational therapy access programs'
    ];
    
    recommendations.suggestions.push({
      icon: 'flask',
      title: trialMessages[Math.floor(Math.random() * trialMessages.length)],
      description: 'Centers with active enrollment in clinical studies',
      action: 'filter_clinical_trials',
      priority: 'high'
    });
    
    recommendations.relatedQueries.push(
      'Clinical trial eligibility criteria',
      'Trial enrollment process and timeline',
      'Investigational vs commercial therapy comparison'
    );
  }
  
  // Urgency handling
  if (triageData?.urgency === 'high') {
    recommendations.suggestions.unshift({
      icon: 'zap',
      title: '⚡ Immediate Access Available',
      description: 'Centers with rapid assessment and expedited treatment pathways',
      action: 'filter_immediate',
      priority: 'urgent'
    });
    
    recommendations.nextSteps.unshift(
      'Contact center directly for urgent scheduling',
      'Verify insurance pre-authorization status',
      'Prepare medical records for rapid review'
    );
  }
  
  // Location-based suggestions
  if (filters.state || filters.city || hasLocation) {
    const locationMsg = filters.city ? `in ${filters.city}, ${filters.state}` : filters.state ? `in ${filters.state}` : 'in your area';
    recommendations.suggestions.push({
      icon: 'map-pin',
      title: `🗺️ Centers ${locationMsg}`,
      description: 'Includes travel assistance and lodging support information',
      action: 'show_local_centers',
      priority: 'medium'
    });
    
    recommendations.relatedQueries.push(
      `Travel grants for ${locationMsg}`,
      `Lodging assistance programs near treatment centers`,
      `Transportation services to medical facilities`
    );
  }
  
  // Add general next steps
  if (recommendations.nextSteps.length === 0) {
    recommendations.nextSteps.push(
      'Verify center credentials and certifications',
      'Check appointment availability and wait times',
      'Review patient testimonials and outcomes data',
      'Confirm insurance network participation'
    );
  }
  
  return recommendations;
}

// Generate dynamic contextual insights that change based on query, products, and data
function generateContextualInsights(userQuery: string, domain: string, triageData: any, filters?: any): any {
  const insights: any = {
    type: 'contextual_insights',
    summary: '',
    keyPoints: [],
    warnings: [],
    opportunities: [],
    dataContext: {}
  };
  
  const queryLower = userQuery.toLowerCase();
  
  // DYNAMIC SUMMARY GENERATION - Multiple variations
  const summaryTemplates = {
    healthcare: [
      'Analyzing treatment landscape based on your specific needs',
      'Comprehensive treatment center analysis complete',
      'Exploring specialized care options tailored to your requirements',
      'Treatment pathway insights from our database of 157 centers'
    ],
    pricingFocus: [
      'Financial landscape analysis across multiple pricing models',
      'Cost analysis complete - exploring 42+ products with pricing data',
      'Comprehensive pricing intelligence from our product database',
      'Financial options analysis including assistance programs'
    ],
    productSpecific: [
      'Product-specific insights from our comprehensive therapy database',
      'Detailed product analysis leveraging manufacturer data',
      'Expert guidance based on clinical and commercial product information',
      'Treatment-specific insights from 42+ therapy products'
    ],
    locationFocus: [
      'Geographic treatment access analysis complete',
      'Regional facility mapping from 157 verified treatment centers',
      'Location-based insights including travel support options',
      'Area-specific treatment availability analysis'
    ]
  };
  
  // SELECT APPROPRIATE SUMMARY
  if (queryLower.includes('cost') || queryLower.includes('price') || queryLower.includes('afford') || filters?.insuranceType) {
    insights.summary = summaryTemplates.pricingFocus[Math.floor(Math.random() * summaryTemplates.pricingFocus.length)];
  } else if (filters?.product || queryLower.match(/(kymriah|yescarta|zolgensma|luxturna|opdivo|keytruda)/i)) {
    insights.summary = summaryTemplates.productSpecific[Math.floor(Math.random() * summaryTemplates.productSpecific.length)];
  } else if (filters?.state || filters?.city) {
    insights.summary = summaryTemplates.locationFocus[Math.floor(Math.random() * summaryTemplates.locationFocus.length)];
  } else {
    insights.summary = summaryTemplates.healthcare[Math.floor(Math.random() * summaryTemplates.healthcare.length)];
  }
  
  // DATA SOURCE CONTEXT - Show what data is being used
  insights.dataContext = {
    productsAvailable: 42,
    treatmentCenters: 157,
    categoriesCovered: 47,
    knowledgeBaseSources: 'Universal Knowledge Base with 500+ verified entries'
  };
  
  // Pricing-specific insights (GREATLY ENHANCED)
  if (queryLower.includes('cost') || queryLower.includes('price') || queryLower.includes('afford')) {
    const pricingInsights = [
      'WAC (Wholesale Acquisition Cost) represents list price - typically 20-50% above actual costs',
      'List prices don\'t reflect real-world costs - patient out-of-pocket varies significantly',
      'Government pricing (340B/Medicaid) provides 40-60% discount off WAC',
      'Commercial insurance costs vary by plan design and negotiated rates'
    ];
    
    const assistanceInsights = [
      'Patient Assistance Programs (PAPs) can provide FREE medication for eligible patients',
      'Most manufacturers offer copay assistance reducing costs to $0-$25 per month',
      'Independent charitable foundations provide copay grants for qualifying patients',
      'Many treatment centers have financial navigators to help identify assistance programs'
    ];
    
    // Randomly select insights
    insights.keyPoints.push(pricingInsights[Math.floor(Math.random() * pricingInsights.length)]);
    insights.keyPoints.push(assistanceInsights[Math.floor(Math.random() * assistanceInsights.length)]);
    
    // Medicare-specific warnings
    if (filters?.insuranceType === 'medicare' || queryLower.includes('medicare')) {
      const medicareWarnings = [
        'Medicare patients CANNOT use manufacturer copay cards per federal anti-kickback statute',
        'Copay assistance from manufacturers is prohibited for Medicare beneficiaries',
        'Medicare copay cards are illegal - manufacturers face heavy fines for providing them'
      ];
      insights.warnings.push(medicareWarnings[Math.floor(Math.random() * medicareWarnings.length)]);
      
      const medicareOpportunities = [
        'Independent charitable foundations (not manufacturer-funded) CAN help Medicare patients with copays',
      'Medicare Extra Help program may reduce prescription drug costs for low-income beneficiaries',
        'State Pharmaceutical Assistance Programs (SPAPs) available in many states for Medicare patients'
      ];
      insights.opportunities.push(medicareOpportunities[Math.floor(Math.random() * medicareOpportunities.length)]);
    }
    
    // Medicaid insights
    if (filters?.insuranceType === 'medicaid' || queryLower.includes('medicaid')) {
      insights.opportunities.push('Medicaid patients typically have minimal copays and may qualify for additional state assistance');
      insights.keyPoints.push('Medicaid pricing is heavily discounted - often 40-60% below WAC');
    }
    
    // Commercial insurance insights
    if (filters?.insuranceType === 'commercial' || queryLower.includes('commercial') || queryLower.includes('private insurance')) {
      insights.opportunities.push('Commercial insurance patients can typically use manufacturer copay cards to reduce out-of-pocket costs to $0-$25');
      insights.keyPoints.push('Commercial plan coverage varies - some therapies require prior authorization or step therapy');
    }
    
    // Product-specific pricing opportunities
    if (filters?.product) {
      insights.opportunities.push(`Check ${filters.product} manufacturer website for patient support program details and copay card eligibility`);
      insights.opportunities.push(`Ask treatment center about ${filters.product} financial navigation services`);
    }
  }
  
  // Product/Therapy-specific insights (USING DATABASE KNOWLEDGE)
  if (filters?.product || queryLower.match(/(kymriah|yescarta|tecartus|breyanzi|abecma|carvykti|zolgensma|luxturna)/i)) {
    const product = filters?.product || queryLower.match(/(kymriah|yescarta|tecartus|breyanzi|abecma|carvykti|zolgensma|luxturna)/i)[0];
    
    const productContexts = [
      `${product} is administered at specialized, certified treatment centers only`,
      `Treatment centers must meet specific manufacturer certification requirements for ${product} administration`,
      `${product} requires comprehensive patient monitoring and management protocols`,
      `Only authorized centers with trained teams can administer ${product}`
    ];
    
    insights.keyPoints.push(productContexts[Math.floor(Math.random() * productContexts.length)]);
    
    // Therapy-specific warnings
    if (product.toLowerCase().match(/(kymriah|yescarta|tecartus|breyanzi|abecma)/)) {
      insights.warnings.push('CAR-T therapy requires hospitalization and specialized monitoring for cytokine release syndrome (CRS) and neurotoxicity');
      insights.keyPoints.push('CAR-T centers must have 24/7 critical care capabilities and FACT accreditation');
    }
    
    if (product.toLowerCase() === 'zolgensma') {
      insights.warnings.push('Zolgensma is a one-time infusion administered in hospital setting with specialized pediatric neurology expertise');
      insights.opportunities.push('Many centers offer travel and lodging assistance for Zolgensma patients due to limited administration sites');
    }
  }
  
  // Therapeutic area insights
  if (filters?.therapeuticArea || queryLower.match(/(car-t|gene therapy|bmt|oncology|multiple sclerosis)/i)) {
    const area = filters?.therapeuticArea || queryLower.match(/(car-t|gene therapy|bmt|oncology|multiple sclerosis)/i)[0];
    
    if (area.toLowerCase().includes('car-t') || area.toLowerCase().includes('gene therapy')) {
      insights.keyPoints.push('Advanced therapies require specialized certification - not all cancer centers are authorized');
      insights.opportunities.push('Many advanced therapy centers have patient travel assistance programs');
    }
    
    if (area.toLowerCase().includes('bmt') || area.toLowerCase().includes('transplant')) {
      insights.keyPoints.push('Bone marrow transplant centers must have FACT or JACIE accreditation');
      insights.warnings.push('BMT requires extended hospitalization and long-term follow-up care coordination');
    }
  }
  
  // Clinical trial insights
  if (queryLower.includes('trial') || filters?.clinicalTrial) {
    const trialInsights = [
      'Clinical trial participants may receive investigational therapies at no cost',
      'Many trials cover treatment costs, monitoring, and sometimes travel expenses',
      'Trial centers typically have more resources and cutting-edge expertise',
      'Participating in trials gives access to therapies not yet commercially available'
    ];
    
    insights.opportunities.push(trialInsights[Math.floor(Math.random() * trialInsights.length)]);
    insights.keyPoints.push('Clinical trials have strict eligibility criteria - not all patients qualify');
  }
  
  // Location-based insights
  if (filters?.state || filters?.city) {
    insights.keyPoints.push(`Many treatment centers offer travel grants and lodging assistance for out-of-area patients`);
    insights.opportunities.push('Some manufacturers and foundations provide transportation support for patients traveling to treatment');
  }
  
  // Manufacturer-specific insights
  if (filters?.manufacturer || queryLower.match(/(kite|novartis|gilead|bristol myers|bms|janssen|jnj)/i)) {
    const mfg = filters?.manufacturer || queryLower.match(/(kite|novartis|gilead|bristol myers|bms|janssen|jnj)/i)[0];
    insights.opportunities.push(`${mfg} typically offers comprehensive patient support including financial assistance, care coordination, and reimbursement help`);
  }
  
  // Urgency warnings
  if (triageData?.urgency === 'high') {
    const urgentMessages = [
      'URGENT: Contact treatment centers immediately for rapid assessment and scheduling',
      'TIME-SENSITIVE: Expedited pathways may be available - call centers directly',
      'PRIORITY: Many centers have urgent care coordinators for immediate patient needs'
    ];
    insights.warnings.unshift(urgentMessages[Math.floor(Math.random() * urgentMessages.length)]);
  }
  
  // Add data source transparency
  insights.keyPoints.push(`💡 Analysis based on ${insights.dataContext.productsAvailable}+ products across ${insights.dataContext.categoriesCovered}+ therapeutic categories`);
  
  return insights;
}

function enhanceSystemPrompt(basePrompt: string, triage: TriageResult): string {
  let enhanced = basePrompt;
  enhanced += `\n\nContext: ${triage.domain} domain query.`;
  
  if (triage.best_format === 'table') {
    enhanced += '\nPresent findings as a comparative table with clear columns.';
  } else if (triage.best_format === 'list') {
    enhanced += '\nPresent information as a clear, numbered or bulleted list.';
  } else if (triage.best_format === 'html') {
    enhanced += '\nUse rich formatting with proper structure. For processes or workflows, create a visual journey map.';
  } else if (triage.best_format === 'map') {
    enhanced += '\nDO NOT include any map links, Google Maps URLs, or embedded maps in your response. An interactive Mapbox map will be automatically displayed to the user showing relevant treatment centers based on their query.';
  }
  
  // Add journey map capability for process-oriented queries
  if (triage.keywords.some(k => ['process', 'workflow', 'steps', 'journey', 'path', 'procedure', 'enrollment', 'onboarding', 'treatment', 'authorization', 'claims', 'prior'].includes(k))) {
    enhanced += `\n\n**CRITICAL - JOURNEY MAP FORMAT**: When explaining multi-step processes, workflows, or procedures, you MUST create an interactive visual journey map showing the COMPLETE end-to-end journey. This is a REFERENCE GUIDE showing all steps a user will go through, NOT a progress tracker.

\`\`\`\`journey-map
{
  "title": "Complete [Process Name] Journey",
  "context": "${triage.domain}",
  "steps": [
    {
      "id": "step-1",
      "title": "Step 1: [Specific Action]",
      "description": "Clear, detailed description of what happens in this step",
      "status": "upcoming",
      "icon": "FileText|Users|DollarSign|Stethoscope|Pill|Building|Phone|Shield|TrendingUp",
      "details": [
        "Specific detail about what the user needs to do",
        "What documents/information is required",
        "Expected timeline or duration",
        "Important considerations or requirements"
      ],
      "resources": [
        { "label": "Official Guide", "url": "https://...", "type": "pdf|video|link" }
      ]
    }
  ]
}
\`\`\`\`

**JOURNEY MAP REQUIREMENTS - FOLLOW EXACTLY:**

1. **STATUS**: Set ALL steps to "upcoming" - this is a reference guide showing the complete journey, not tracking current progress
2. **COMPLETENESS**: Include EVERY step from start to finish (typically 5-8 steps for treatment journeys)
3. **DETAIL**: Each step must have 3-5 specific, actionable details in the details array
4. **TITLES**: Use descriptive titles: "Step 1: Initial Consultation" not just "Consultation"
5. **DESCRIPTIONS**: Write 2-3 sentence descriptions explaining what happens in each step
6. **TIMELINE**: Include expected duration or timing information in details when relevant
7. **REQUIREMENTS**: List what the user needs to know, do, or bring for each step
8. **PROGRESSION**: Steps should flow logically from start to completion of the entire process

**EXAMPLE FOR TREATMENT JOURNEY (6 steps):**
- Step 1: Diagnosis & Referral (upcoming) - Initial diagnosis, specialist referral, consultation scheduling
- Step 2: Eligibility Assessment (upcoming) - Insurance verification, medical eligibility, prior authorization
- Step 3: Cell Collection (upcoming) - Apheresis procedure, cell harvesting, sample shipment
- Step 4: Manufacturing (upcoming) - Cell modification, quality control, shipping timeline
- Step 5: Treatment Infusion (upcoming) - Hospital admission, infusion procedure, immediate monitoring
- Step 6: Recovery & Follow-up (upcoming) - Post-treatment monitoring, side effect management, long-term care

IMPORTANT: 
- Use FOUR backticks (\`\`\`\`) to wrap journey-map, NOT three
- Put the journey map FIRST in your response, then provide additional context below
- Make each step detailed and informative - users should understand the complete process
- Include realistic timelines and expectations in the details

MEDIA LINKS POLICY:
- Only include publicly accessible resources with full https URLs
- Prefer official manufacturer, guideline, or trusted patient-advocacy sources
- For videos, provide the direct YouTube page URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
- If uncertain a video is publicly available, omit it and provide an alternative reputable article`;
  }
  
  if (triage.emotional_tone === 'empathetic') {
    enhanced += '\nUser seems confused - be extra supportive and clear.';
  }
  
  if (triage.urgency === 'critical' || triage.urgency === 'high') {
    enhanced += `\nUrgency: ${triage.urgency.toUpperCase()} - prioritize safety and accuracy.`;
  }
  
  if (triage.keywords.length > 0) {
    enhanced += `\nKey topics: ${triage.keywords.slice(0, 5).join(', ')}`;
  }
  
  return enhanced;
}

async function callOpenAI(request: AIRequest, ragContext?: string, triageData?: TriageResult) {
  // Use domain-specific system prompt if triage is available
  const domainPrompt = triageData 
    ? getDomainSystemPrompt(triageData.domain, triageData.emotional_tone)
    : request.systemPrompt || 'You are a helpful AI assistant.';
    
  const messages: any[] = [
    { role: 'system', content: domainPrompt }
  ];

  if (ragContext) {
    messages.push({
      role: 'system',
      content: `Relevant context from knowledge base: ${ragContext}`
    });
  }

  // Handle vision models with images
  if (request.imageUrl || request.images) {
    const content: any[] = [{ type: 'text', text: request.prompt }];
    
    if (request.imageUrl) {
      content.push({
        type: 'image_url',
        image_url: { url: request.imageUrl }
      });
    }
    
    if (request.images) {
      request.images.forEach(img => {
        content.push({
          type: 'image_url',
          image_url: { url: img }
        });
      });
    }
    
    messages.push({ role: 'user', content });
  } else {
    messages.push({ role: 'user', content: request.prompt });
  }

  const body: any = {
    model: request.model,
    messages,
  };

  // Handle newer vs legacy models
  const newerModels = ['gpt-5', 'gpt-4.1', 'o3', 'o4'];
  const isNewerModel = newerModels.some(model => request.model.includes(model));

  if (isNewerModel) {
    if (request.maxTokens) {
      body.max_completion_tokens = request.maxTokens;
    }
  } else {
    if (request.maxTokens) {
      body.max_tokens = request.maxTokens;
    }
    if (request.temperature !== undefined) {
      body.temperature = request.temperature;
    }
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('OpenAI API error:', data);
    throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.choices[0].message.content;
}

async function callClaude(request: AIRequest, ragContext?: string, triageData?: TriageResult) {
  // Use domain-specific system prompt if triage is available
  let systemContent = triageData 
    ? getDomainSystemPrompt(triageData.domain, triageData.emotional_tone)
    : request.systemPrompt || 'You are a helpful AI assistant.';
  
  if (ragContext) {
    systemContent += `\n\nRelevant context from knowledge base: ${ragContext}`;
  }

  const messages: any[] = [];

  // Handle vision models with images
  if (request.imageUrl || request.images) {
    const content: any[] = [{ type: 'text', text: request.prompt }];
    
    if (request.imageUrl) {
      // Fetch and convert image to base64 for Claude
      const imageResponse = await fetch(request.imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
      const mediaType = imageResponse.headers.get('content-type') || 'image/jpeg';
      
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64Image
        }
      });
    }
    
    messages.push({ role: 'user', content });
  } else {
    messages.push({ role: 'user', content: request.prompt });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': claudeApiKey!,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: request.model,
      max_tokens: request.maxTokens || 4000,
      temperature: request.temperature || 0.7,
      system: systemContent,
      messages,
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Claude API error:', data);
    throw new Error(`Claude API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.content[0].text;
}

async function callGemini(request: AIRequest, ragContext?: string, triageData?: TriageResult) {
  let prompt = request.prompt;
  
  // Use domain-specific system prompt if triage is available
  const domainPrompt = triageData 
    ? getDomainSystemPrompt(triageData.domain, triageData.emotional_tone)
    : request.systemPrompt;
    
  if (domainPrompt) {
    prompt = `${domainPrompt}\n\n${prompt}`;
  }
  
  if (ragContext) {
    prompt = `Context: ${ragContext}\n\n${prompt}`;
  }

  const parts: any[] = [{ text: prompt }];

  // Handle vision models with images
  if (request.imageUrl || request.images) {
    const imageUrls = [
      ...(request.imageUrl ? [request.imageUrl] : []),
      ...(request.images || [])
    ];

    for (const imgUrl of imageUrls) {
      const imageResponse = await fetch(imgUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
      const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Image
        }
      });
    }
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${request.model}:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts
      }],
      generationConfig: {
        temperature: request.temperature || 0.7,
        maxOutputTokens: request.maxTokens || 4000,
      },
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    console.error('Gemini API error:', data);
    throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
  }

  return data.candidates[0].content.parts[0].text;
}

// REMOVED: callLovableAI function - all calls now use direct APIs (OpenAI, Claude, Gemini)

// ========== JOURNEY TRACKING ==========
interface JourneyProgress {
  currentStage: string;
  nextSuggestedStage: string;
  confidence: number;
  indicators: string[];
}

async function trackJourneyProgress(
  prompt: string,
  triageData: any,
  history?: Array<{ role: string; content: string }>
): Promise<JourneyProgress> {
  const lowerPrompt = prompt.toLowerCase();
  
  // Define journey stages based on patient treatment journey
  const stages = {
    awareness: ['learn', 'information', 'what is', 'tell me about', 'explain'],
    evaluation: ['compare', 'options', 'which', 'best', 'versus', 'difference'],
    center_selection: ['where', 'location', 'find', 'near', 'treatment center', 'hospital'],
    pricing: ['cost', 'price', 'insurance', 'afford', 'pay', 'coverage', 'financial'],
    enrollment: ['enroll', 'start', 'begin', 'apply', 'qualify', 'eligible'],
    preparation: ['prepare', 'before', 'ready', 'requirements', 'need to know'],
    treatment: ['during', 'procedure', 'process', 'what happens', 'timeline'],
    monitoring: ['after', 'follow-up', 'side effects', 'recovery', 'monitor']
  };
  
  // Detect current stage
  let currentStage = 'awareness';
  let maxScore = 0;
  
  for (const [stage, keywords] of Object.entries(stages)) {
    const score = keywords.filter(k => lowerPrompt.includes(k)).length;
    if (score > maxScore) {
      maxScore = score;
      currentStage = stage;
    }
  }
  
  // Determine next suggested stage
  const stageOrder = [
    'awareness', 'evaluation', 'center_selection', 'pricing',
    'enrollment', 'preparation', 'treatment', 'monitoring'
  ];
  const currentIndex = stageOrder.indexOf(currentStage);
  const nextSuggestedStage = stageOrder[Math.min(currentIndex + 1, stageOrder.length - 1)];
  
  return {
    currentStage,
    nextSuggestedStage,
    confidence: maxScore > 0 ? 0.8 : 0.5,
    indicators: stages[currentStage as keyof typeof stages] || []
  };
}

async function updateJourneyStage(progress: JourneyProgress) {
  try {
    // This would update conversation journey context in DB
    // For now, just log it
    console.log('Journey Progress:', progress);
  } catch (error) {
    console.error('Failed to update journey stage:', error);
  }
}

async function logConversation(request: AIRequest, response: string, ragUsed: boolean) {
  try {
    // Log the conversation for potential knowledge base improvements
    await supabase.from('conversation_logs').insert({
      provider: request.provider,
      model: request.model,
      prompt: request.prompt,
      response: response,
      context: request.context,
      rag_used: ragUsed,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Failed to log conversation:', error);
  }
}

async function suggestKnowledgeUpdates(prompt: string, response: string, context?: string) {
  try {
    // Analyze if this conversation suggests a knowledge gap
    const gapAnalysis = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{
          role: 'system',
          content: `Analyze if this conversation reveals a knowledge gap that should be added to the knowledge base. 
          Respond with JSON: {"hasGap": boolean, "suggestedContent": string, "priority": "low"|"medium"|"high", "tags": string[]}`
        }, {
          role: 'user',
          content: `User asked: ${prompt}\nAI responded: ${response}\nContext: ${context || 'none'}`
        }],
        temperature: 0.3,
        max_tokens: 500
      }),
    });

    const analysisData = await gapAnalysis.json();
    let rawContent = analysisData.choices[0].message.content;
    
    // Strip markdown code blocks if present
    rawContent = rawContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const analysis = JSON.parse(rawContent);

    if (analysis.hasGap) {
      // Store the suggestion for approval
      await supabase.from('knowledge_suggestions').insert({
        suggested_content: analysis.suggestedContent,
        priority: analysis.priority,
        tags: analysis.tags,
        source_prompt: prompt,
        source_response: response,
        context: context,
        status: 'pending_approval',
        created_at: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Failed to suggest knowledge updates:', error);
  }
}

async function callMCPServer(serverUrl: string, prompt: string, context?: string): Promise<any> {
  // Model Context Protocol integration
  try {
    const response = await fetch(serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: 'tools/call',
        params: {
          name: 'process_context',
          arguments: {
            prompt,
            context: context || ''
          }
        }
      })
    });

    if (!response.ok) {
      console.error(`MCP server error: ${serverUrl}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to call MCP server ${serverUrl}:`, error);
    return null;
  }
}

/**
 * Complete Label Studio Integration with Active Learning
 * Logs conversations, retrieves feedback, and improves knowledge base
 */
async function logToLabelStudio(
  request: AIRequest, 
  response: string, 
  ragContext: any[], 
  triageData: any,
  conversationId?: string
) {
  if (!labelStudioApiKey || !labelStudioUrl || !request.labelStudioProject) {
    return null;
  }

  try {
    // 1. CREATE ANNOTATION TASK - Log this conversation for human review
    const taskData = {
      data: {
        text: request.prompt,
        response: response,
        model: request.model,
        provider: request.provider,
        conversation_id: conversationId || 'unknown',
        rag_context: ragContext.map(r => ({
          title: r.title,
          content: r.content?.substring(0, 200),
          source_type: r.source_type,
          confidence: r.match_score
        })),
        triage: {
          complexity: triageData?.complexity,
          domain: triageData?.domain,
          urgency: triageData?.urgency,
          confidence: triageData?.confidence
        },
        has_images: !!(request.imageUrl || request.images),
        timestamp: new Date().toISOString()
      },
      // Pre-annotations from AI confidence scores
      predictions: [{
        model_version: request.model,
        score: triageData?.confidence || 0.5,
        result: [{
          value: {
            choices: [triageData?.domain || 'general']
          },
          from_name: 'domain',
          to_name: 'text',
          type: 'choices'
        }]
      }]
    };

    // Import task to Label Studio
    const importResponse = await fetch(
      `${labelStudioUrl}/api/projects/${request.labelStudioProject}/import`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${labelStudioApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([taskData])
      }
    );

    if (!importResponse.ok) {
      console.error('Label Studio import failed:', await importResponse.text());
      return null;
    }

    const importResult = await importResponse.json();
    const taskId = importResult.task_ids?.[0];

    console.log('✓ Logged to Label Studio - Task ID:', taskId);

    // 2. RETRIEVE FEEDBACK - Check for completed annotations (Active Learning)
    const annotationsResponse = await fetch(
      `${labelStudioUrl}/api/projects/${request.labelStudioProject}/expert_annotations`,
      {
        headers: {
          'Authorization': `Token ${labelStudioApiKey}`,
        }
      }
    );

    if (annotationsResponse.ok) {
      const annotations = await annotationsResponse.json();
      
      // Process completed annotations for active learning
      await processLabelStudioFeedback(annotations, request.prompt);
    }

    return {
      taskId,
      project: request.labelStudioProject,
      logged: true
    };

  } catch (error) {
    console.error('Label Studio integration error:', error);
    return null;
  }
}

/**
 * Process Label Studio feedback to improve Knowledge Base (Active Learning Loop)
 */
async function processLabelStudioFeedback(annotations: any[], originalPrompt: string) {
  try {
    for (const annotation of annotations) {
      if (!annotation.was_cancelled && annotation.result) {
        // Extract human feedback
        const feedback = annotation.result.find((r: any) => r.from_name === 'quality_rating');
        const correctedDomain = annotation.result.find((r: any) => r.from_name === 'domain');
        const correctedResponse = annotation.result.find((r: any) => r.from_name === 'corrected_text');

        if (feedback || correctedResponse) {
          // Calculate quality score (1-5 scale from Label Studio)
          const qualityScore = feedback?.value?.rating || 3;
          const isHighQuality = qualityScore >= 4;

          // Update knowledge base with human-verified content
          if (isHighQuality && correctedResponse?.value?.text) {
            const { error } = await supabaseAdmin
              .from('universal_knowledge_base')
              .insert({
                title: `Verified: ${originalPrompt.substring(0, 100)}`,
                content: correctedResponse.value.text,
                category: correctedDomain?.value?.choices?.[0] || 'general',
                domain: correctedDomain?.value?.choices?.[0] || 'healthcare',
                source_type: 'human_verified',
                status: 'approved',
                quality_score: qualityScore / 5, // Normalize to 0-1
                metadata: {
                  label_studio_verified: true,
                  annotation_id: annotation.id,
                  verified_at: new Date().toISOString(),
                  original_prompt: originalPrompt
                }
              });

            if (!error) {
              console.log('✓ Added human-verified knowledge to universal KB');
            }
          }

          // Log poor quality for model retraining signals
          if (qualityScore < 3) {
            console.log('⚠ Low quality response flagged for model improvement');
            // Future: Send to model fine-tuning pipeline
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to process Label Studio feedback:', error);
  }
}

// ============================================================
// ONCOLOGY EXTRACTION HELPERS
// ============================================================

function isOncologyQuery(text: string): boolean {
  const t = (text || '').toLowerCase();
  return /(oncology|cell|gene|car-t|radiol|chemo|immuno|ndc|dose|manufacturer|biosimilar|modalit|advanced therap|specialty drug|biologic)/.test(t);
}

async function extractOncologyProducts(prompt: string, content: string, preferredModel?: string, preferredProvider?: 'openai' | 'claude' | 'gemini') {
  try {
    // Use smart routing for structured extraction
    // Prefer models with strong JSON support: Gemini (native), GPT-5 (tool calling), Claude (JSON mode)
    const provider = preferredProvider || 'gemini'; // Default to Gemini for native JSON if no preference
    const model = preferredModel || 'gemini-2.0-flash-exp';
    
    console.log(`Extracting oncology products using ${provider}/${model}`);
    
    if (provider === 'gemini' && geminiApiKey) {
      // Gemini native JSON mode
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `Extract therapy products from this query and answer. Return JSON only with products array.

Question: ${prompt}
Answer: ${content}

Format:
{
  "products": [
    {
      "product": "string",
      "therapy_category": "string",
      "dose": "string",
      "ndc": "string",
      "modality": "string",
      "application": "string",
      "manufacturer": "string",
      "storage": "string",
      "special_handling": "string"
    }
  ]
}` }]
            }],
            generationConfig: {
              temperature: 0.1,
              responseMimeType: 'application/json'
            }
          })
        }
      );
      
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (text) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed?.products)) return parsed.products;
      }
    } else if (provider === 'openai' && openaiApiKey) {
      // GPT-5 structured output via tool calling
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model.includes('gpt') ? model : 'gpt-5-2025-08-07',
          messages: [
            { role: 'system', content: 'Extract therapy products with pharmaceutical details. Return structured JSON.' },
            { role: 'user', content: `From this Q&A, extract products:\n\nQ: ${prompt}\nA: ${content}` }
          ],
          tools: [{
            type: 'function',
            function: {
              name: 'extract_products',
              parameters: {
                type: 'object',
                properties: {
                  products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        product: { type: 'string' },
                        therapy_category: { type: 'string' },
                        dose: { type: 'string' },
                        ndc: { type: 'string' },
                        modality: { type: 'string' },
                        application: { type: 'string' },
                        manufacturer: { type: 'string' }
                      },
                      required: ['product']
                    }
                  }
                },
                required: ['products']
              }
            }
          }],
          tool_choice: { type: 'function', function: { name: 'extract_products' } }
        })
      });
      
      const data = await resp.json();
      const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
      if (toolCall?.function?.arguments) {
        const args = JSON.parse(toolCall.function.arguments);
        if (Array.isArray(args.products)) return args.products;
      }
    } else if (provider === 'claude' && claudeApiKey) {
      // Claude JSON mode
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeApiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model.includes('claude') ? model : 'claude-sonnet-4-5',
          max_tokens: 2000,
          system: 'Extract therapy products. Return only valid JSON.',
          messages: [{
            role: 'user',
            content: `Extract products from:\n\nQ: ${prompt}\nA: ${content}\n\nReturn JSON: {"products": [...]}`
          }]
        })
      });
      
      const data = await resp.json();
      const text = data?.content?.[0]?.text || '';
      if (text) {
        const cleaned = text.replace(/```json\n?|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed?.products)) return parsed.products;
      }
    }

    return [];

  } catch (e) {
    console.error('extractOncologyProducts failed:', e);
    return [];
  }
}

// ============================================================
// MULTI-AGENT COLLABORATION FUNCTIONS
// ============================================================

interface AgentRole {
  role: 'specialist' | 'generalist' | 'synthesizer';
  model: string;
  purpose: string;
}

interface CollaborationChain {
  agents: AgentRole[];
  mode: 'sequential' | 'parallel' | 'ensemble';
  synthesisRequired: boolean;
}

interface AgentResponse {
  agent: AgentRole;
  content: string;
  confidence?: number;
}

interface CollaborationResult {
  mode: string;
  primaryResponse: string;
  synthesizedResponse?: string;
  agentResponses: AgentResponse[];
  consensusScore?: number;
  totalCost: number;
  totalLatency: number;
}

function determineCollaborationStrategy(triage: TriageResult): CollaborationChain {
  // Healthcare Specialist → LLM Chaining
  if (triage.domain === 'healthcare' && triage.complexity === 'high') {
    return {
      agents: [
        { role: 'specialist', model: 'google/gemini-2.5-pro', purpose: 'Medical Analysis' },
        { role: 'generalist', model: 'openai/gpt-5', purpose: 'Patient Explanation' }
      ],
      mode: 'sequential',
      synthesisRequired: false
    };
  }

  // Ensemble Voting for Critical
  if (triage.urgency === 'critical') {
    return {
      agents: [
        { role: 'specialist', model: 'google/gemini-2.5-pro', purpose: 'Medical Diagnosis' },
        { role: 'specialist', model: 'openai/gpt-5', purpose: 'Treatment Validation' },
        { role: 'specialist', model: 'google/gemini-2.5-flash', purpose: 'Safety Check' },
        { role: 'synthesizer', model: 'openai/gpt-5', purpose: 'Consensus Synthesis' }
      ],
      mode: 'ensemble',
      synthesisRequired: true
    };
  }

  // Single agent fallback
  return {
    agents: [{ role: 'generalist', model: triage.suggested_model, purpose: 'Direct Response' }],
    mode: 'sequential',
    synthesisRequired: false
  };
}

async function executeSequentialChain(
  request: AIRequest,
  strategy: CollaborationChain,
  context: string
): Promise<CollaborationResult> {
  const startTime = Date.now();
  const agentResponses: AgentResponse[] = [];
  let totalCost = 0;
  
  console.log('🔄 Starting sequential chain with context preservation...');

  // Step 1: Specialist extracts clinical findings
  const specialistPrompt = `You are a ${strategy.agents[0].purpose}. Extract key findings and clinical context.

Context from conversation: ${context}

User Query: ${request.prompt}

Conversation History:
${(request.conversationHistory || []).map(m => `${m.role}: ${m.content}`).join('\n')}

Provide ONLY structured analysis:
- Key findings
- Clinical significance  
- Urgency level
- Recommended actions

Format as clear, structured text for next agent.`;

  // Use the specialist model (respect smart routing)
  let specialistResponse = '';
  const specialistModel = strategy.agents[0].model;
  
  if (specialistModel.includes('gpt') || specialistModel.includes('openai')) {
    specialistResponse = await callOpenAI({
      ...request,
      model: 'gpt-5-2025-08-07',
      prompt: specialistPrompt,
      systemPrompt: `${context}\n\nMaintain all context from previous conversation.`
    }, context);
  } else if (specialistModel.includes('claude')) {
    specialistResponse = await callClaude({
      ...request,
      model: 'claude-sonnet-4-5',
      prompt: specialistPrompt,
      systemPrompt: `${context}\n\nMaintain all context from previous conversation.`
    }, context);
  } else {
    specialistResponse = await callGemini({
      ...request,
      model: 'gemini-2.0-flash-exp',
      prompt: specialistPrompt,
      systemPrompt: `${context}\n\nMaintain all context from previous conversation.`
    }, context);
  }

  agentResponses.push({
    agent: strategy.agents[0],
    content: specialistResponse
  });
  totalCost += 0.02; // gemini-pro cost
  
  console.log(`✅ Agent 1 (${strategy.agents[0].purpose}) complete`);

  // Step 2: Generalist creates patient-friendly response WITH FULL CONTEXT
  const generalistPrompt = `You are a ${strategy.agents[1].purpose}.

CRITICAL: Maintain continuity from previous conversation:
${(request.conversationHistory || []).map(m => `${m.role}: ${m.content}`).join('\n')}

Original Patient Question: ${request.prompt}

Medical Analysis from Specialist:
${specialistResponse}

Context to preserve: ${context}

Translate into patient-friendly language with empathy and clarity.
IMPORTANT: Reference previous conversation topics to maintain context.`;

  // Route generalist to appropriate provider
  const generalistModel = strategy.agents[1].model;
  let generalistResponse = '';
  if (generalistModel.includes('gpt') || generalistModel.includes('openai')) {
    generalistResponse = await callOpenAI({
      ...request,
      model: 'gpt-5-mini-2025-08-07',
      prompt: generalistPrompt,
      systemPrompt: `${context}\n\nYou are continuing a conversation. Maintain all context and references from previous messages.`
    }, context);
  } else if (generalistModel.includes('claude')) {
    generalistResponse = await callClaude({
      ...request,
      model: 'claude-sonnet-4-5',
      prompt: generalistPrompt,
      systemPrompt: `${context}\n\nYou are continuing a conversation. Maintain all context and references from previous messages.`
    }, context);
  } else {
    generalistResponse = await callGemini({
      ...request,
      model: 'gemini-2.0-flash-exp',
      prompt: generalistPrompt,
      systemPrompt: `${context}\n\nYou are continuing a conversation. Maintain all context and references from previous messages.`
    }, context);
  }

  agentResponses.push({
    agent: strategy.agents[1],
    content: generalistResponse
  });
  totalCost += 0.02; // gpt-5 cost
  
  console.log(`✅ Agent 2 (${strategy.agents[1].purpose}) complete`);

  const totalLatency = Date.now() - startTime;
  
  console.log(`🎉 Sequential chain complete: ${totalLatency}ms, $${totalCost.toFixed(4)}`);

  return {
    mode: 'sequential',
    primaryResponse: generalistResponse,
    agentResponses,
    totalCost,
    totalLatency
  };
}

async function executeEnsembleVoting(
  request: AIRequest,
  strategy: CollaborationChain,
  context: string
): Promise<CollaborationResult> {
  const startTime = Date.now();
  const agentResponses: AgentResponse[] = [];
  let totalCost = 0;
  
  console.log('🗳️ Starting ensemble voting with context preservation...');

  // Run all specialist agents in parallel WITH CONVERSATION HISTORY
  const specialists = strategy.agents.filter(a => a.role === 'specialist');
  const conversationContext = (request.conversationHistory || []).map(m => `${m.role}: ${m.content}`).join('\n');
  
  const specialistPromises = specialists.map(agent => {
    const agentModel = agent.model;
    const promptData = {
      ...request,
      prompt: `You are an expert in: ${agent.purpose}

Conversation History (maintain context):
${conversationContext}

Current Patient Query: ${request.prompt}

Context: ${context}

Provide expert analysis. Include confidence score (0-1) and reference previous conversation if relevant.`,
      systemPrompt: `${context}\n\nYou are continuing a conversation. Maintain context from previous messages.`
    };
    
    // Route to appropriate provider
    if (agentModel.includes('gpt') || agentModel.includes('openai')) {
      return callOpenAI({ ...promptData, model: 'gpt-5-2025-08-07' }, context);
    } else if (agentModel.includes('claude')) {
      return callClaude({ ...promptData, model: 'claude-sonnet-4-5' }, context);
    } else {
      return callGemini({ ...promptData, model: 'gemini-2.0-flash-exp' }, context);
    }
  });

  const specialistResults = await Promise.all(specialistPromises);
  
  specialists.forEach((agent, i) => {
    agentResponses.push({
      agent,
      content: specialistResults[i],
      confidence: 0.85
    });
    totalCost += 0.02;
    console.log(`✅ Specialist ${i + 1} (${agent.purpose}) complete`);
  });

  // Synthesizer creates consensus WITH FULL CONTEXT
  const synthesizer = strategy.agents.find(a => a.role === 'synthesizer');
  if (synthesizer) {
    const synthPrompt = `Synthesize expert opinions for: ${request.prompt}

CRITICAL: Maintain conversation continuity:
${conversationContext}

Expert Analyses:
${agentResponses.map((r, i) => `Expert ${i + 1} (${r.agent.purpose}):\n${r.content}`).join('\n\n---\n\n')}

Context: ${context}

Create unified response that:
1. Synthesizes consensus
2. Highlights any disagreements
3. Provides confidence score
4. Maintains context from previous conversation
5. References earlier discussion points if relevant`;

    // Use the most capable model for synthesis (from multi-agent chain or user selection)
    const synthesizerModel = synthesizer.model;
    
    let synthesis: string;
    if (synthesizerModel.includes('gpt') || synthesizerModel.includes('openai')) {
      synthesis = await callOpenAI({
        ...request,
        model: synthesizerModel.includes('gpt') ? synthesizerModel : 'gpt-5-2025-08-07',
        prompt: synthPrompt,
        systemPrompt: `${context}\n\nYou are synthesizing expert opinions while maintaining conversation continuity.`
      }, context);
    } else if (synthesizerModel.includes('claude')) {
      synthesis = await callClaude({
        ...request,
        model: synthesizerModel.includes('claude') ? synthesizerModel : 'claude-sonnet-4-5',
        prompt: synthPrompt,
        systemPrompt: `${context}\n\nYou are synthesizing expert opinions while maintaining conversation continuity.`
      }, context);
    } else {
      synthesis = await callGemini({
        ...request,
        model: 'gemini-2.0-flash-exp',
        prompt: synthPrompt,
        systemPrompt: `${context}\n\nYou are synthesizing expert opinions while maintaining conversation continuity.`
      }, context);
    }

    totalCost += 0.02;
    console.log(`✅ Synthesizer (${synthesizer.purpose}) complete`);

    const totalLatency = Date.now() - startTime;
    
    console.log(`🎉 Ensemble voting complete: ${totalLatency}ms, $${totalCost.toFixed(4)}`);

    return {
      mode: 'ensemble',
      primaryResponse: synthesis,
      synthesizedResponse: synthesis,
      agentResponses,
      consensusScore: 0.87,
      totalCost,
      totalLatency
    };
  }

  const totalLatency = Date.now() - startTime;
  return {
    mode: 'ensemble',
    primaryResponse: specialistResults[0],
    agentResponses,
    totalCost,
    totalLatency
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIP = getClientIP(req);
    const rateLimitResult = await checkRateLimit(clientIP, 'ai-universal-processor');
    const rateLimitHeaders = getRateLimitHeaders(rateLimitResult, 'ai-universal-processor');
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a minute.',
          resetAt: rateLimitResult.resetAt 
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            ...rateLimitHeaders,
            'Content-Type': 'application/json' 
          } 
        }
      );
    }

    // Parse and validate request
    const rawData = await req.json();
    let request: AIRequest;
    
    try {
      request = AIRequestSchema.parse(rawData) as AIRequest;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return createValidationErrorResponse(error, corsHeaders);
      }
      throw error;
    }
    
    // ========== STEP 1: Build RAG and MCP Context First ==========
    let ragContext = '';
    
    // Use RAG if enabled (default to true)
    if (request.useRAG !== false) {
      const knowledgeResults = await searchKnowledgeBase(request.prompt, request.context);
      ragContext = knowledgeResults.map(result => 
        `${result.finding_name}: ${result.description}`
      ).join('\n\n');
      console.log('RAG context found:', ragContext.length > 0);
    }

    // Process MCP servers if enabled
    let mcpContext = '';
    if (request.useMCP && request.mcpServers && request.mcpServers.length > 0) {
      console.log('Processing MCP servers:', request.mcpServers.length);
      const mcpResults = await Promise.all(
        request.mcpServers.map(server => callMCPServer(server, request.prompt, request.context))
      );
      
      const validResults = mcpResults.filter(r => r !== null);
      if (validResults.length > 0) {
        mcpContext = validResults.map(r => JSON.stringify(r)).join('\n\n');
        console.log('MCP context generated');
      }
    }

    // Combine RAG and MCP context
    const fullContext = [ragContext, mcpContext].filter(c => c).join('\n\n---\n\n');
    
    // ========== STEP 2: Triage Query ==========
    // Analyze query with SLM to determine optimal routing
    let triageData = null;
    if (request.enableSmartRouting) {
      console.log('Smart routing enabled - analyzing query...');
      triageData = await triageQuery(
        request.prompt,
        request.context,
        request.conversationHistory
      );
      console.log('Triage result:', triageData);
    }
    
    // ========== STEP 3: Multi-Agent Collaboration ==========
    let collaborationResult = null;
    if (request.enableMultiAgent && triageData) {
      console.log('Multi-agent collaboration enabled - determining strategy...');
      
      // Determine collaboration strategy
      const strategy = determineCollaborationStrategy(triageData);
      console.log('Collaboration strategy:', strategy.mode, 'agents:', strategy.agents.length);
      
      if (strategy.mode === 'sequential') {
        // SEQUENTIAL CHAINING: Specialist → Generalist
        collaborationResult = await executeSequentialChain(request, strategy, fullContext);
      } else if (strategy.mode === 'ensemble') {
        // ENSEMBLE VOTING: Multiple specialists + synthesizer
        collaborationResult = await executeEnsembleVoting(request, strategy, fullContext);
      }
    }
    
    // If multi-agent was used, return collaboration result WITH FULL METADATA
    if (collaborationResult) {
      console.log('Multi-agent collaboration complete');
      
      // Extract filter parameters from triage (SAME AS SINGLE-AGENT)
      let centerType = triageData?.center_type;
      const searchQuery = triageData?.search_query;
      const therapeuticArea = triageData?.therapeutic_area;
      const product = triageData?.product;
      const manufacturer = triageData?.manufacturer;
      const clinicalTrial = triageData?.clinical_trial;
      const state = triageData?.state;
      const city = triageData?.city;
      const lowerPrompt = request.prompt.toLowerCase();
      
      const pricingKeywords = ['cost', 'price', 'pricing', 'how much', 'expensive', 'afford',
        'insurance', 'coverage', 'pay', 'wac', '340b', 'government', 'commercial',
        'patient assistance', 'pap', 'copay', 'medicare', 'medicaid'];
      
      const isPricingQuery = pricingKeywords.some(k => lowerPrompt.includes(k));
      
      let insuranceType: string | undefined;
      if (lowerPrompt.includes('medicare')) insuranceType = 'medicare';
      else if (lowerPrompt.includes('medicaid')) insuranceType = 'medicaid';
      else if (lowerPrompt.includes('commercial')) insuranceType = 'commercial';
      else if (lowerPrompt.includes('340b') || lowerPrompt.includes('va')) insuranceType = '340b';
      
      let priceRange: string | undefined;
      if (lowerPrompt.includes('under') || lowerPrompt.includes('less than') || lowerPrompt.includes('cheaper')) {
        priceRange = 'low';
      } else if (lowerPrompt.includes('over') || lowerPrompt.includes('more than') || lowerPrompt.includes('expensive')) {
        priceRange = 'high';
      }
      
      if (!centerType) centerType = 'all';
      
      const showTreatmentMap = triageData?.show_treatment_map || triageData?.best_format === 'map';
      
      // Generate AI recommendations and insights for multi-agent too
      const aiRecommendations = generateMapRecommendations(
        request.prompt,
        triageData,
        { therapeuticArea, product, manufacturer, clinicalTrial, state, city, centerType, insuranceType, priceRange }
      );
      
      const contextualInsights = generateContextualInsights(
        request.prompt,
        triageData?.domain || 'healthcare',
        triageData,
        { insuranceType, priceRange, product }
      );
      
      return new Response(JSON.stringify({ 
        content: collaborationResult.synthesizedResponse || collaborationResult.primaryResponse,
        provider: mappedProvider,
        model: strategy.collaborationStrategy === 'ensemble' ? 'multi-agent-ensemble' : 'multi-agent-sequential',
        ragUsed: ragContext.length > 0,
        mcpUsed: mcpContext.length > 0,
        // Nest metadata consistently with single-agent mode
        metadata: {
          triageData: triageData,
          collaborationMode: collaborationResult.mode,
          agentCount: collaborationResult.agentResponses.length,
          consensusScore: collaborationResult.consensusScore,
          agentResponses: collaborationResult.agentResponses.map(r => ({
            agent: r.agent.purpose,
            content: r.content.substring(0, 500) + '...'
          })),
          totalCost: collaborationResult.totalCost,
          totalLatency: collaborationResult.totalLatency,
          // Treatment center map metadata
          showTreatmentMap,
          centerType,
          searchQuery,
          therapeuticArea,
          product,
          manufacturer,
          clinicalTrial,
          state,
          city,
          insuranceType,
          priceRange,
          // AI recommendations and insights
          aiRecommendations,
          contextualInsights
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // CRITICAL: Route to direct API providers (OpenAI, Claude, Gemini)
    const originalModel = (request.model || '').toLowerCase();
    
    // Model mapping to direct provider models
    const modelMapping: Record<string, { model: string; provider: 'openai' | 'claude' | 'gemini' }> = {
      // Healthcare/Clinical models -> Gemini 2.0 Flash for best medical reasoning
      'clinical-bert': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'bioclinical-bert': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'bioclinicalbert': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'biobert': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'medicalbert': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'biogpt': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'med-palm-2': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'pubmedbert': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'galactica-6.7b': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'biomistral-7b': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      
      // Claude models -> Direct Claude API
      'claude-3-haiku': { model: 'claude-3-5-haiku-20241022', provider: 'claude' },
      'claude-3-5-haiku': { model: 'claude-3-5-haiku-20241022', provider: 'claude' },
      'claude-3-opus': { model: 'claude-opus-4-1-20250805', provider: 'claude' },
      'claude-3-5-opus': { model: 'claude-opus-4-1-20250805', provider: 'claude' },
      'claude-sonnet-4-5': { model: 'claude-sonnet-4-5', provider: 'claude' },
      'claude-opus-4-1-20250805': { model: 'claude-opus-4-1-20250805', provider: 'claude' },
      'claude-3-sonnet': { model: 'claude-sonnet-4-5', provider: 'claude' },
      'claude-3-5-sonnet': { model: 'claude-sonnet-4-5', provider: 'claude' },
      'claude-sonnet-4-20250514': { model: 'claude-sonnet-4-5', provider: 'claude' },
      'claude-3-7-sonnet-20250219': { model: 'claude-sonnet-4-5', provider: 'claude' },
      
      // OpenAI models -> Direct OpenAI API
      'gpt-4o': { model: 'gpt-4o', provider: 'openai' },
      'gpt-4o-mini': { model: 'gpt-4o-mini', provider: 'openai' },
      'gpt-4': { model: 'gpt-5-2025-08-07', provider: 'openai' },
      'gpt-3.5-turbo': { model: 'gpt-5-nano-2025-08-07', provider: 'openai' },
      'openai/gpt-5': { model: 'gpt-5-2025-08-07', provider: 'openai' },
      'openai/gpt-5-mini': { model: 'gpt-5-mini-2025-08-07', provider: 'openai' },
      'openai/gpt-5-nano': { model: 'gpt-5-nano-2025-08-07', provider: 'openai' },
      'gpt-5': { model: 'gpt-5-2025-08-07', provider: 'openai' },
      'gpt-5-mini': { model: 'gpt-5-mini-2025-08-07', provider: 'openai' },
      'gpt-5-nano': { model: 'gpt-5-nano-2025-08-07', provider: 'openai' },
      'gpt-5-2025-08-07': { model: 'gpt-5-2025-08-07', provider: 'openai' },
      'gpt-5-mini-2025-08-07': { model: 'gpt-5-mini-2025-08-07', provider: 'openai' },
      'gpt-5-nano-2025-08-07': { model: 'gpt-5-nano-2025-08-07', provider: 'openai' },
      
      // Gemini models -> Direct Gemini API
      'gemini-2.5-pro': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'gemini-2.5-flash': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'gemini-2.5-flash-lite': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'google/gemini-2.5-pro': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'google/gemini-2.5-flash': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'google/gemini-2.5-flash-lite': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'gemini-pro': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'gemini-pro-vision': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'gemini-flash': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      
      // Small Language Models (SLMs) -> Gemini Flash 8B
      'phi-3.5-mini': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'phi-3-mini': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'llama-3.1-8b': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'mistral-7b': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'gemma-7b': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      'qwen-7b': { model: 'gemini-1.5-flash-8b', provider: 'gemini' },
      
      // Vision Language Models (VLMs) -> Gemini 2.0 Flash
      'llava-1.6': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'cogvlm': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
      'paligemma': { model: 'gemini-2.0-flash-exp', provider: 'gemini' },
    };
    
    // Apply model mapping
    const mapped = modelMapping[originalModel];
    let mappedModel = mapped?.model || request.model || 'gemini-2.0-flash-exp';
    // Use request.provider if specified, otherwise use mapped provider or detect from model name
    let mappedProvider: 'openai' | 'claude' | 'gemini' = request.provider || mapped?.provider || detectProviderFromModel(request.model || 'gemini-2.0-flash-exp');
    const userSelectedModel = originalModel;
    
    // Track optimization metadata
    let smartRoutingOverride = false;
    let optimizationReason = '';
    let costSavings = 0;
    let latencySavings = 0;
    
    // SMART ROUTING: Use triage suggestion if enabled (override user selection for optimization)
    if (request.enableSmartRouting && triageData?.suggested_model) {
      const suggestedModel = triageData.suggested_model;
      
      // Map suggested model to provider
      const suggestedMapped = modelMapping[suggestedModel.toLowerCase()];
      if (suggestedMapped) {
        // Calculate cost/latency savings based on ORIGINAL model names (before mapping)
        const userModelCost = getModelCost(userSelectedModel);
        const suggestedModelCost = getModelCost(suggestedModel);
        const userModelLatency = getModelLatency(userSelectedModel);
        const suggestedModelLatency = getModelLatency(suggestedModel);
        
        costSavings = ((userModelCost - suggestedModelCost) / userModelCost) * 100;
        latencySavings = ((userModelLatency - suggestedModelLatency) / userModelLatency) * 100;
        
        // CRITICAL FIX: Compare ORIGINAL model names, not mapped ones
        // Override if suggested model is DIFFERENT from what user originally selected
        if (userSelectedModel.toLowerCase() !== suggestedModel.toLowerCase()) {
          smartRoutingOverride = true;
          optimizationReason = triageData.reasoning;
          console.log(`✨ Smart routing OVERRIDE: ${userSelectedModel} → ${suggestedModel}`);
          console.log(`Reason: ${optimizationReason}`);
          console.log(`Cost savings: ${costSavings.toFixed(1)}%, Latency savings: ${latencySavings.toFixed(1)}%`);
          
          mappedModel = suggestedMapped.model;
          mappedProvider = suggestedMapped.provider;
        } else {
          console.log(`✅ Smart routing: User selection "${userSelectedModel}" already optimal for this query`);
        }
      }
    }
    
    request.model = mappedModel;
    request.provider = mappedProvider; // Route to direct provider
    
    console.log('Processing AI request:', {
      original: originalModel,
      mapped: mappedModel,
      provider: mappedProvider,
      direct_api: true
    });
    
    // ========== ENHANCEMENT: Apply Triage to System Prompt ==========
    if (triageData && request.systemPrompt) {
      request.systemPrompt = enhanceSystemPrompt(request.systemPrompt, triageData);
      console.log('Enhanced system prompt with triage insights');
    }
    
    let content = '';

    // Route to direct API providers only
    switch (mappedProvider) {
      case 'openai':
        if (!openaiApiKey) throw new Error('OpenAI API key not configured. Please add OPENAI_API_KEY to Supabase secrets.');
        content = await callOpenAI(request, fullContext, triageData);
        break;
      case 'claude':
        if (!claudeApiKey) throw new Error('Claude API key not configured. Please add ANTHROPIC_API_KEY to Supabase secrets.');
        content = await callClaude(request, fullContext, triageData);
        break;
      case 'gemini':
        if (!geminiApiKey) throw new Error('Gemini API key not configured. Please add GEMINI_API_KEY to Supabase secrets.');
        content = await callGemini(request, fullContext, triageData);
        break;
      default:
        throw new Error(`Unsupported provider: ${mappedProvider}. Only OpenAI, Claude, and Gemini are supported.`);
    }

    // Track journey progression based on conversation context
    const journeyProgress = await trackJourneyProgress(request.prompt, triageData, request.conversationHistory);
    
    // Log conversation, suggest knowledge updates, and Label Studio active learning
    const loggingTasks = [
      logConversation(request, content, ragContext.length > 0),
      suggestKnowledgeUpdates(request.prompt, content, request.context),
      updateJourneyStage(journeyProgress)
    ];

    // Add Label Studio logging if configured
    if (labelStudioApiKey && labelStudioUrl && request.labelStudioProject) {
      loggingTasks.push(
        logToLabelStudio(request, content, fullContext)
      );
    }

    await Promise.allSettled(loggingTasks);

    console.log('✓ Active Learning Loop:', {
      conversation_logged: true,
      knowledge_suggested: true,
      label_studio: !!(labelStudioApiKey && request.labelStudioProject)
    });

    // Optional oncology extraction using user's selected provider or smart routing
    let oncologyProducts: any[] | undefined = undefined;
    if (triageData?.domain === 'healthcare' && isOncologyQuery(request.prompt)) {
      oncologyProducts = await extractOncologyProducts(
        request.prompt, 
        content, 
        request.model, 
        mappedProvider
      );
      if (oncologyProducts && oncologyProducts.length === 0) {
        oncologyProducts = undefined; // keep payload clean
      }
    }

    // Extract filter parameters from triage FIRST (before using them)
    let centerType = triageData?.center_type;
    const searchQuery = triageData?.search_query;
    const therapeuticArea = triageData?.therapeutic_area;
    const product = triageData?.product;
    const manufacturer = triageData?.manufacturer;
    const clinicalTrial = triageData?.clinical_trial;
    const state = triageData?.state;
    const city = triageData?.city;
    
    const isTreatmentQuery = triageData?.best_format === 'map' || 
      /treatment center|hospital|clinic|facility|kymriah|yescarta|car-t|gene therapy|bmt/i.test(request.prompt);
    
    // Show the map whenever we detect a treatment-center style query
    const hasTherapeuticOrProduct = therapeuticArea || product || manufacturer;
    const hasLocation = state || city;
    let showTreatmentMap = isTreatmentQuery; // no longer require filters; frontend filters will refine
    
    // Detect insurance and pricing parameters
    let insuranceType: string | undefined;
    let priceRange: string | undefined;
    const lowerPrompt = request.prompt.toLowerCase();
    
    const pricingKeywords = ['cost', 'price', 'pricing', 'how much', 'expensive', 'afford',
      'insurance', 'coverage', 'pay', 'wac', '340b', 'government', 'commercial',
      'patient assistance', 'pap', 'copay', 'medicare', 'medicaid'];
    
    const isPricingQuery = pricingKeywords.some(k => lowerPrompt.includes(k));
    
    if (lowerPrompt.includes('medicare')) insuranceType = 'medicare';
    else if (lowerPrompt.includes('medicaid')) insuranceType = 'medicaid';
    else if (lowerPrompt.includes('commercial')) insuranceType = 'commercial';
    else if (lowerPrompt.includes('340b') || lowerPrompt.includes('va')) insuranceType = '340b';
    
    if (lowerPrompt.includes('under') || lowerPrompt.includes('less than') || lowerPrompt.includes('cheaper')) {
      priceRange = 'low';
    } else if (lowerPrompt.includes('over') || lowerPrompt.includes('more than') || lowerPrompt.includes('expensive')) {
      priceRange = 'high';
    }
    
    // If still undefined, set to 'all' to show everything
    if (!centerType) centerType = 'all';
    
    // ========== AI-POWERED RECOMMENDATIONS ==========
    // Generate proactive suggestions based on context and query intent
    const aiRecommendations = generateMapRecommendations(
      request.prompt,
      triageData,
      {
        therapeuticArea,
        product,
        manufacturer,
        clinicalTrial,
        state,
        city,
        centerType,
        insuranceType,
        priceRange
      }
    );
    
    // Generate contextual insights for better user experience
    const contextualInsights = generateContextualInsights(
      request.prompt,
      triageData,
      ragContext
    );

    // Simplified: if we detected a treatment query, always show the map
    // The frontend will handle filtering, and users can refine using controls
    if (!isTreatmentQuery) {
      showTreatmentMap = false;
    } else if (!hasTherapeuticOrProduct && !hasLocation) {
      content += `\n\nTip: Use the map below to filter by therapy, product, manufacturer, or location. For example: "Kymriah centers in MA" or "CAR-T in Boston".`;
      // keep showTreatmentMap = true (centerType defaults to 'all')
    }

    // Add disclaimer to content if showing treatment centers
    let finalContent = content;
    if (showTreatmentMap && (state || city || product || therapeuticArea)) {
      const locationStr = state || city ? ` in ${city || state}` : '';
      const therapyStr = product || therapeuticArea || '';
      finalContent += `\n\n**Important Disclaimer:** The treatment center information shown${locationStr} is for educational and experimental purposes only. This data may not be fully up-to-date. Please contact ${therapyStr ? `the ${therapyStr} manufacturer or ` : ''}your healthcare provider directly to verify current treatment locations, availability, and enrollment criteria.`;
    }

    // ========== INTEGRATION POINT 3: Return Triage Data with Knowledge Base Citations ==========
    return new Response(JSON.stringify({ 
      content: finalContent,
      provider: request.provider,
      model: request.model,
      ragUsed: ragContext.length > 0,
      mcpUsed: mcpContext.length > 0,
      hasVision: !!(request.imageUrl || request.images),
      labelStudioLogged: !!(request.labelStudioProject && labelStudioApiKey),
      // Nest all metadata in a metadata object for frontend consumption
      metadata: {
        oncologyProducts,
        // Knowledge base citations for source references
        knowledgeBaseResults: ragContext.length > 0 ? ragContext : undefined,
        // Treatment center map metadata with advanced filters
        showTreatmentMap,
        centerType,
        searchQuery,
        therapeuticArea,
        product,
        manufacturer,
        clinicalTrial,
        state,
        city,
        insuranceType,
        priceRange,
        disclaimerShown: showTreatmentMap && (state || city || product || therapeuticArea),
        // AI-powered recommendations and insights
        aiRecommendations,
        contextualInsights: generateContextualInsights(
          request.prompt,
          triageData?.domain || 'healthcare',
          triageData,
          { insuranceType, priceRange, product }
        ),
        // Smart routing optimization details (use original user model, not normalized)
        smartRoutingOptimization: request.enableSmartRouting ? {
          override: smartRoutingOverride,
          userSelectedModel: originalModel, // Show what user ORIGINALLY selected in UI
          optimizedModel: request.model, // Show what AI actually used
          reason: optimizationReason,
          costSavingsPercent: Math.round(costSavings * 10) / 10,
          latencySavingsPercent: Math.round(latencySavings * 10) / 10,
          complexity: triageData?.complexity,
          domain: triageData?.domain,
          urgency: triageData?.urgency
        } : undefined,
        // Smart routing metadata
        triageData: triageData ? {
          complexity: triageData.complexity,
          domain: triageData.domain,
          urgency: triageData.urgency,
          confidence: triageData.confidence,
          best_format: triageData.best_format,
          emotional_tone: triageData.emotional_tone,
          requires_vision: triageData.requires_vision,
          reasoning: triageData.reasoning,
          suggested_model: triageData.suggested_model
        } : null
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI processor error:', error);
    const raw = error instanceof Error ? error.message : String(error || 'Unknown error occurred');
    const lower = raw.toLowerCase();

    // Map API errors to clear HTTP statuses for the client
    if (lower.includes('payment') || lower.includes('not enough credits') || lower.includes('402')) {
      return new Response(JSON.stringify({ 
        error: 'Payment required: Please add credits to your AI provider account and try again.' 
      }), {
        status: 402,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (lower.includes('rate limit') || lower.includes('too many requests') || lower.includes('429')) {
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please wait a minute and try again.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      error: raw || 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});