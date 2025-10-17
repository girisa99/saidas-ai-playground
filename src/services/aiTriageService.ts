/**
 * AI Triage Service - SLM-based Query Classification
 * 
 * Analyzes user queries using a fast, cheap Small Language Model
 * to determine optimal routing strategy before calling expensive LLMs.
 * 
 * Part of: Role-Based Specialization (Phase 2)
 * Docs: docs/ROLE_BASED_SPECIALIZATION_IMPLEMENTATION.md
 */

export interface TriageResult {
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

/**
 * Perform fast query analysis to determine routing strategy
 */
export async function triageQuery(
  query: string,
  context?: string,
  conversationHistory?: Array<{ role: string; content: string }>
): Promise<TriageResult> {
  const queryLower = query.toLowerCase();
  const queryLength = query.split(' ').length;
  
  // Fast pattern-based classification (< 10ms)
  const classification = classifyQuery(queryLower, queryLength);
  
  // Detect domain
  const domain = detectDomain(queryLower, context);
  
  // Detect urgency
  const urgency = detectUrgency(queryLower, classification.complexity);
  
  // Determine best format
  const best_format = determineBestFormat(queryLower, classification.complexity);
  
  // Extract keywords
  const keywords = extractKeywords(query);
  
  // Detect vision requirement
  const requires_vision = detectVisionRequirement(queryLower);
  
  // Detect emotional tone
  const emotional_tone = detectEmotionalTone(
    queryLower, 
    conversationHistory
  );
  
  // Suggest optimal model
  const suggested_model = suggestModel(
    classification.complexity,
    domain,
    urgency,
    requires_vision
  );
  
  return {
    complexity: classification.complexity,
    domain,
    urgency,
    best_format,
    keywords,
    suggested_model,
    confidence: classification.confidence,
    reasoning: classification.reasoning,
    requires_vision,
    emotional_tone
  };
}

/**
 * Classify query complexity using pattern matching
 */
function classifyQuery(
  queryLower: string,
  wordCount: number
): { complexity: 'simple' | 'medium' | 'high'; confidence: number; reasoning: string } {
  // Simple queries (80% of traffic)
  const simplePatterns = [
    /^(what|who|when|where|how) (is|are|was|were|do|does)/,
    /^(tell me|show me|give me|list)/,
    /(office hours?|contact|pricing|location|support)/,
    /^(yes|no|ok|thanks|thank you)/i,
  ];
  
  if (simplePatterns.some(p => p.test(queryLower)) && wordCount < 10) {
    return {
      complexity: 'simple',
      confidence: 0.9,
      reasoning: 'Short FAQ-style query with common pattern'
    };
  }
  
  // High complexity queries
  const highComplexityIndicators = [
    /(analyze|compare|evaluate|assess|diagnose)/,
    /(differential|comprehensive|detailed analysis)/,
    /(explain why|how does.*work|reasoning behind)/,
    /(strategy|implementation|architecture|design)/,
  ];
  
  if (highComplexityIndicators.some(p => p.test(queryLower)) || wordCount > 30) {
    return {
      complexity: 'high',
      confidence: 0.85,
      reasoning: 'Requires deep analysis or complex reasoning'
    };
  }
  
  // Medium complexity (default)
  return {
    complexity: 'medium',
    confidence: 0.7,
    reasoning: 'Standard query requiring domain knowledge'
  };
}

/**
 * Detect query domain
 */
function detectDomain(
  queryLower: string,
  context?: string
): 'healthcare' | 'technology' | 'general' {
  const healthcareKeywords = [
    // ========== GENERAL MEDICAL ==========
    'patient', 'medical', 'clinical', 'diagnosis', 'treatment', 'therapy',
    'healthcare', 'hospital', 'doctor', 'nurse', 'pharmacy', 'drug', 'medication',
    'x-ray', 'mri', 'ct scan', 'imaging', 'radiology', 'dicom',
    'icd', 'cpt', 'billing', 'insurance', 'reimbursement', 'claim',
    
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
    'car-t', 'car t', 'cell therapy', 'immunotherapy', 'tcr', 't-cell',
    'lymphoma', 'leukemia', 'cancer', 'oncology', 'tumor', 'malignancy',
    'trial', 'fda', 'approval', 'indication',
    'yescarta', 'kymriah', 'tecartus', 'breyanzi', 'abecma', 'carvykti',
    'kite', 'novartis', 'gilead', 'bristol myers', 'bms', 'jnj', 'janssen',
    'allogeneic', 'autologous', 'cd19', 'cd20', 'bcma', 'b-cell',
    'chemotherapy', 'radiation', 'metastatic', 'biopsy', 'staging',
    'checkpoint inhibitor', 'keytruda', 'opdivo', 'yervoy', 'pd-1', 'pd-l1', 'ctla-4',
    
    // ========== BREAST CANCER ==========
    'breast cancer', 'mammogram', 'mastectomy', 'lumpectomy', 'her2',
    'estrogen receptor', 'progesterone receptor', 'brca', 'tamoxifen',
    'herceptin', 'perjeta', 'kadcyla', 'enhertu', 'triple negative',
    
    // ========== NEUROLOGY & MULTIPLE SCLEROSIS ==========
    'multiple sclerosis', 'ms', 'relapsing remitting', 'progressive ms',
    'lesion', 'demyelination', 'tysabri', 'ocrevus', 'gilenya', 'tecfidera',
    'copaxone', 'rebif', 'avonex', 'betaseron', 'mavenclad', 'kesimpta',
    'neurology', 'neurological', 'seizure', 'epilepsy', 'parkinson',
    'alzheimer', 'dementia', 'stroke', 'migraine', 'neuropathy',
    
    // ========== PSYCHIATRY & MENTAL HEALTH ==========
    'mental health', 'psychiatry', 'psychiatric', 'schizophrenia', 'psychosis',
    'depression', 'anxiety', 'bipolar', 'ptsd', 'ocd', 'adhd',
    'antidepressant', 'antipsychotic', 'ssri', 'snri', 'benzodiazepine',
    'prozac', 'zoloft', 'lexapro', 'abilify', 'seroquel', 'risperdal',
    'zyprexa', 'latuda', 'vraylar', 'rexulti', 'lithium', 'lamictal',
    'therapy', 'counseling', 'behavioral health', 'substance abuse',
    
    // ========== DIABETES & ENDOCRINE ==========
    'diabetes', 'diabetic', 'insulin', 'glucose', 'blood sugar', 'a1c',
    'metformin', 'glipizide', 'lantus', 'humalog', 'novolog', 'ozempic',
    'mounjaro', 'trulicity', 'jardiance', 'farxiga', 'continuous glucose',
    'cgm', 'pump', 'type 1', 'type 2', 'hyperglycemia', 'hypoglycemia',
    'thyroid', 'hypothyroid', 'hyperthyroid', 'synthroid', 'levothyroxine',
    
    // ========== CARDIOVASCULAR ==========
    'heart', 'cardiac', 'cardiovascular', 'cardio', 'hypertension',
    'blood pressure', 'cholesterol', 'statin', 'beta blocker', 'ace inhibitor',
    'arb', 'lisinopril', 'metoprolol', 'atorvastatin', 'lipitor', 'crestor',
    'plavix', 'eliquis', 'xarelto', 'warfarin', 'afib', 'arrhythmia',
    'myocardial infarction', 'angioplasty', 'stent', 'cabg',
    
    // ========== RHEUMATOLOGY & AUTOIMMUNE ==========
    'rheumatoid arthritis', 'ra', 'lupus', 'sle', 'autoimmune',
    'psoriasis', 'psoriatic arthritis', 'crohn', 'ulcerative colitis',
    'ibd', 'humira', 'enbrel', 'remicade', 'stelara', 'cosentyx',
    'rinvoq', 'xeljanz', 'otezla', 'skyrizi', 'tremfya',
    'methotrexate', 'prednisone', 'biologics', 'dmard',
    
    // ========== INFECTIOUS DISEASE ==========
    'hiv', 'aids', 'antiretroviral', 'prep', 'biktarvy', 'descovy',
    'hepatitis', 'hep c', 'mavyret', 'epclusa', 'harvoni',
    'antibiotic', 'antimicrobial', 'vaccine', 'vaccination', 'immunization',
    'covid', 'coronavirus', 'pandemic', 'infection',
    
    // ========== RESPIRATORY ==========
    'asthma', 'copd', 'inhaler', 'nebulizer', 'albuterol', 'advair',
    'symbicort', 'spiriva', 'trelegy', 'breo', 'dupixent',
    'pulmonary', 'respiratory', 'lung', 'bronchitis', 'pneumonia',
    
    // ========== GASTROINTESTINAL ==========
    'gastroenterology', 'gi', 'gerd', 'reflux', 'ibs', 'irritable bowel',
    'nexium', 'prilosec', 'protonix', 'ppi', 'h2 blocker',
    'colonoscopy', 'endoscopy', 'inflammatory bowel',
    
    // ========== NEPHROLOGY ==========
    'kidney', 'renal', 'dialysis', 'ckd', 'chronic kidney disease',
    'nephrology', 'nephrologist', 'creatinine', 'gfr',
    
    // ========== HEMATOLOGY ==========
    'hematology', 'anemia', 'hemoglobin', 'iron deficiency',
    'sickle cell', 'thalassemia', 'clotting disorder', 'hemophilia',
    
    // ========== DERMATOLOGY ==========
    'dermatology', 'eczema', 'atopic dermatitis', 'acne', 'rosacea',
    'melanoma', 'skin cancer', 'basal cell', 'squamous cell',
    
    // ========== PAIN MANAGEMENT ==========
    'pain', 'chronic pain', 'opioid', 'morphine', 'oxycodone',
    'fentanyl', 'tramadol', 'gabapentin', 'lyrica', 'cymbalta',
    
    // ========== WOMEN'S HEALTH ==========
    'pregnancy', 'prenatal', 'obstetrics', 'gynecology', 'ob-gyn',
    'menopause', 'hormone replacement', 'contraception', 'birth control'
  ];
  
  const technologyKeywords = [
    'software', 'code', 'api', 'integration', 'platform',
    'cloud', 'saas', 'automation', 'workflow', 'digital',
    'database', 'frontend', 'backend', 'deployment', 'server'
  ];
  
  const healthScore = healthcareKeywords.filter(k => queryLower.includes(k)).length;
  const techScore = technologyKeywords.filter(k => queryLower.includes(k)).length;
  
  // Context bias: if context provided, weight it heavily
  if (context === 'healthcare' && healthScore >= techScore) return 'healthcare';
  if (context === 'technology' && techScore >= healthScore) return 'technology';
  
  // Direct comparison with threshold
  if (healthScore > techScore) return 'healthcare';
  if (techScore > healthScore) return 'technology';
  
  return 'general';
}

/**
 * Detect query urgency
 */
function detectUrgency(
  queryLower: string,
  complexity: 'simple' | 'medium' | 'high'
): 'low' | 'medium' | 'high' | 'critical' {
  const criticalIndicators = [
    'emergency', 'urgent', 'critical', 'immediately', 'asap',
    'unresponsive', 'severe', 'life-threatening', 'stat'
  ];
  
  const highIndicators = [
    'important', 'priority', 'soon', 'quickly',
    'deteriorating', 'worsening', 'concerning'
  ];
  
  if (criticalIndicators.some(i => queryLower.includes(i))) {
    return 'critical';
  }
  
  if (highIndicators.some(i => queryLower.includes(i))) {
    return 'high';
  }
  
  // Simple queries are usually low urgency
  if (complexity === 'simple') return 'low';
  
  return 'medium';
}

/**
 * Determine best response format
 */
function determineBestFormat(
  queryLower: string,
  complexity: 'simple' | 'medium' | 'high'
): 'text' | 'table' | 'html' | 'list' | 'map' {
  // Map format for location/treatment center queries
  const mapKeywords = [
    'where', 'location', 'near', 'find', 'treatment center', 'clinic', 'hospital',
    'clinical trial', 'gene therapy', 'bmt', 'oncology', 'transplant',
    'therapy center', 'cancer center', 'city', 'state', 'address', 'map'
  ];
  
  if (mapKeywords.some(keyword => queryLower.includes(keyword))) {
    return 'map';
  }
  
  if (queryLower.match(/(compare|versus|vs|differences|similarities)/)) {
    return 'table';
  }
  
  if (queryLower.match(/(list|steps|options|types|categories)/)) {
    return 'list';
  }
  
  if (complexity === 'high' && queryLower.match(/(analyze|comprehensive)/)) {
    return 'html'; // Rich formatting with sections
  }
  
  return 'text';
}

/**
 * Extract key terms from query
 */
function extractKeywords(query: string): string[] {
  // Remove common words and extract meaningful terms
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were',
    'what', 'when', 'where', 'who', 'why', 'how', 'can', 'could', 'would',
    'should', 'do', 'does', 'did', 'have', 'has', 'had', 'will', 'shall'
  ]);
  
  const words = query
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
  
  // Return unique keywords, limit to 10
  return [...new Set(words)].slice(0, 10);
}

/**
 * Detect if query requires vision model
 */
function detectVisionRequirement(queryLower: string): boolean {
  const visionKeywords = [
    'image', 'picture', 'photo', 'visual', 'scan', 'x-ray', 'xray',
    'mri', 'ct scan', 'ultrasound', 'dicom', 'radiology', 'imaging',
    'look at', 'show me', 'analyze this', 'what do you see',
    'screenshot', 'diagram', 'chart', 'graph'
  ];
  
  return visionKeywords.some(k => queryLower.includes(k));
}

/**
 * Detect emotional tone needed in response
 */
function detectEmotionalTone(
  queryLower: string,
  conversationHistory?: Array<{ role: string; content: string }>
): 'empathetic' | 'professional' | 'playful' | undefined {
  // Check for confusion/frustration
  if (queryLower.match(/(confused|lost|don't understand|not sure|help|stuck)/)) {
    return 'empathetic';
  }
  
  // Check for excitement
  if (queryLower.match(/(awesome|great|cool|amazing|wow|!)/)) {
    return 'playful';
  }
  
  // Check conversation history for patterns
  if (conversationHistory && conversationHistory.length > 3) {
    const recentUserMessages = conversationHistory
      .filter(m => m.role === 'user')
      .slice(-3)
      .map(m => m.content.toLowerCase())
      .join(' ');
    
    if (recentUserMessages.match(/(confused|lost|stuck)/)) {
      return 'empathetic';
    }
  }
  
  return 'professional';
}

/**
 * Suggest optimal model based on triage
 */
function suggestModel(
  complexity: 'simple' | 'medium' | 'high',
  domain: 'healthcare' | 'technology' | 'general',
  urgency: 'low' | 'medium' | 'high' | 'critical',
  requires_vision: boolean
): string {
  // Critical queries always use best model
  if (urgency === 'critical') {
    return requires_vision ? 'google/gemini-2.5-pro' : 'openai/gpt-5';
  }
  
  // Vision queries need vision models
  if (requires_vision) {
    if (complexity === 'high' || domain === 'healthcare') {
      return 'google/gemini-2.5-pro'; // Best for medical imaging
    }
    return 'gpt-4o'; // Good general vision
  }
  
  // Intelligent routing based on complexity, domain, and capabilities
  if (complexity === 'simple') {
    // Simple queries: use fastest small model
    return 'gemini-1.5-flash-8b';
  }
  
  if (complexity === 'medium') {
    // Healthcare with vision needs Gemini
    if (domain === 'healthcare' && requires_vision) {
      return 'gemini-2.0-flash-exp';
    }
    // Medium complexity: balanced models
    return domain === 'healthcare' ? 'gemini-2.0-flash-exp' : 'gpt-5-mini-2025-08-07';
  }
  
  // High complexity
  if (domain === 'healthcare') {
    return 'google/gemini-2.5-pro'; // Best medical reasoning
  }
  
  return 'openai/gpt-5'; // Best general reasoning
}

/**
 * Enhance system prompt with triage insights
 */
export function enhanceSystemPrompt(
  basePrompt: string,
  triage: TriageResult
): string {
  let enhanced = basePrompt;
  
  // Add domain context
  enhanced += `\n\nContext: ${triage.domain} domain query.`;
  
  // Add format guidance
  if (triage.best_format === 'table') {
    enhanced += '\nPresent findings as a comparative table with clear columns.';
  } else if (triage.best_format === 'list') {
    enhanced += '\nPresent information as a clear, numbered or bulleted list.';
  } else if (triage.best_format === 'html') {
    enhanced += '\nUse rich formatting with headings, sections, and emphasis.';
  } else if (triage.best_format === 'map') {
    enhanced += '\nInclude location information. An interactive map will be displayed to show treatment centers.';
  }
  
  // Add emotional tone
  if (triage.emotional_tone === 'empathetic') {
    enhanced += '\nUser seems confused - be extra supportive and clear.';
  } else if (triage.emotional_tone === 'playful') {
    enhanced += '\nUser is engaged and enthusiastic - match their energy!';
  }
  
  // Add urgency
  if (triage.urgency === 'critical' || triage.urgency === 'high') {
    enhanced += `\nUrgency: ${triage.urgency.toUpperCase()} - prioritize safety and accuracy.`;
  }
  
  // Add keywords for context
  if (triage.keywords.length > 0) {
    enhanced += `\nKey topics: ${triage.keywords.slice(0, 5).join(', ')}`;
  }
  
  return enhanced;
}
