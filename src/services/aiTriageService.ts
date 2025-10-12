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
  best_format: 'text' | 'table' | 'html' | 'list';
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
    'patient', 'medical', 'clinical', 'diagnosis', 'treatment', 'therapy',
    'healthcare', 'hospital', 'doctor', 'nurse', 'pharmacy', 'drug',
    'x-ray', 'mri', 'ct scan', 'imaging', 'radiology', 'dicom',
    'icd', 'cpt', 'billing', 'insurance', 'reimbursement', 'claim'
  ];
  
  const technologyKeywords = [
    'ai', 'software', 'code', 'api', 'integration', 'platform',
    'algorithm', 'model', 'llm', 'neural', 'machine learning',
    'cloud', 'saas', 'automation', 'workflow', 'digital'
  ];
  
  const healthScore = healthcareKeywords.filter(k => queryLower.includes(k)).length;
  const techScore = technologyKeywords.filter(k => queryLower.includes(k)).length;
  
  if (context === 'healthcare' && healthScore >= techScore) return 'healthcare';
  if (context === 'technology' && techScore >= healthScore) return 'technology';
  
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
): 'text' | 'table' | 'html' | 'list' {
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
  
  // Route based on complexity
  if (complexity === 'simple') {
    return 'google/gemini-2.5-flash-lite'; // Fastest, cheapest
  }
  
  if (complexity === 'medium') {
    if (domain === 'healthcare') {
      return 'google/gemini-2.5-pro'; // Healthcare needs accuracy
    }
    return 'google/gemini-2.5-flash'; // Balanced
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
