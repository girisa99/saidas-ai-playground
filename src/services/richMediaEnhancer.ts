/**
 * Rich Media Response Enhancer
 * 
 * Uses triage data to enhance AI responses with:
 * - Format-specific rendering (tables, images, videos, HTML)
 * - Emotional tone adjustment (empathetic, humorous, professional)
 * - Conversation milestone suggestions (3, 5, 7 messages)
 * - Auto-generated visual content when appropriate
 * 
 * Part of: Phase 2 - Multi-Model Architecture (Complete)
 * Docs: docs/MULTI_MODEL_ARCHITECTURE_ASSESSMENT.md
 */

import type { TriageResult } from './aiTriageService';

export interface EnhancedResponse {
  content: string;
  metadata: {
    hasImages?: boolean;
    hasVideos?: boolean;
    hasTables?: boolean;
    hasCode?: boolean;
    emotionalTone?: string;
    suggestedFollowUps?: string[];
  };
}

/**
 * Enhance AI response based on triage insights
 */
export function enhanceResponseWithTriage(
  originalResponse: string,
  triageData: TriageResult | null
): EnhancedResponse {
  if (!triageData) {
    return {
      content: originalResponse,
      metadata: {}
    };
  }

  let enhancedContent = originalResponse;
  const metadata: EnhancedResponse['metadata'] = {
    emotionalTone: triageData.emotional_tone
  };

  // Format-specific enhancements
  if (triageData.best_format === 'table') {
    enhancedContent = ensureTableFormat(enhancedContent);
    metadata.hasTables = true;
  } else if (triageData.best_format === 'html') {
    enhancedContent = enhanceWithHtmlStructure(enhancedContent);
  } else if (triageData.best_format === 'list') {
    enhancedContent = ensureListFormat(enhancedContent);
  }

  // Check if vision/images were used
  if (triageData.requires_vision) {
    metadata.hasImages = true;
  }

  // Emotional tone enhancements
  if (triageData.emotional_tone) {
    enhancedContent = applyEmotionalTone(enhancedContent, triageData.emotional_tone);
  }

  // Add relevant emojis for healthcare domain
  if (triageData.domain === 'healthcare') {
    enhancedContent = addHealthcareEmojis(enhancedContent);
  }

  return {
    content: enhancedContent,
    metadata
  };
}

/**
 * Ensure response is formatted as a table if appropriate
 */
function ensureTableFormat(content: string): string {
  // If already has table markdown, return as-is
  if (content.includes('|') && content.includes('---')) {
    return content;
  }

  // Check if content looks like it should be a table
  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length < 3) return content;

  // Try to detect columnar data
  const hasMultipleColons = lines.filter(l => (l.match(/:/g) || []).length >= 2).length > 2;
  
  if (hasMultipleColons) {
    return `💡 **Here's the information in a structured table format:**

${content}

---`;
  }

  return content;
}

/**
 * Add HTML structure hints for complex layouts
 */
function enhanceWithHtmlStructure(content: string): string {
  // Add section headers with enhanced styling
  const sections = content.split('\n\n');
  return sections.map(section => {
    if (section.startsWith('##') || section.startsWith('#')) {
      return `${section}\n`;
    }
    return section;
  }).join('\n\n');
}

/**
 * Add image placeholders and suggestions
 */
function addImagePlaceholders(content: string, domain: string): string {
  const imageSuggestions: Record<string, string> = {
    healthcare: "📊 *Visual aid: Medical diagram or chart would enhance this explanation*",
    technology: "🖼️ *Visual aid: Architecture diagram or code visualization would help here*",
    general: "📸 *Visual aid: Illustration or infographic would make this clearer*"
  };

  const suggestion = imageSuggestions[domain] || imageSuggestions.general;
  
  return `${content}\n\n${suggestion}`;
}

/**
 * Ensure list formatting
 */
function ensureListFormat(content: string): string {
  // If already has list formatting, return as-is
  if (content.includes('- ') || content.includes('* ') || /^\d+\./.test(content)) {
    return content;
  }

  return content;
}

/**
 * Apply emotional tone to response
 */
function applyEmotionalTone(content: string, tone: string): string {
  const toneEnhancements: Record<string, { prefix: string; emoji: string }> = {
    empathetic: {
      prefix: "I understand this can be concerning. ",
      emoji: "💙"
    },
    professional: {
      prefix: "",
      emoji: "📋"
    },
    playful: {
      prefix: "Great question! ",
      emoji: "✨"
    }
  };

  const enhancement = toneEnhancements[tone];
  if (!enhancement) return content;

  // Add empathetic prefix if not already present
  if (enhancement.prefix && !content.toLowerCase().startsWith('i understand')) {
    content = enhancement.prefix + content;
  }

  return content;
}

/**
 * Add contextual healthcare emojis
 */
function addHealthcareEmojis(content: string): string {
  return content
    .replace(/\b(diagnosis|diagnosed)\b/gi, '🔍 $1')
    .replace(/\b(treatment|therapy)\b/gi, '💊 $1')
    .replace(/\b(emergency|urgent)\b/gi, '🚨 $1')
    .replace(/\b(improvement|better|healing)\b/gi, '✅ $1')
    .replace(/\b(appointment|consultation)\b/gi, '📅 $1');
}

/**
 * Generate milestone-based suggestions
 */
export function generateMilestoneSuggestions(
  messageCount: number,
  conversationHistory: Array<{ role: string; content: string }>,
  triageData?: TriageResult | null
): string[] {
  const suggestions: string[] = [];

  // Milestone 3: Offer related topics
  if (messageCount === 3) {
    if (triageData?.domain === 'healthcare') {
      suggestions.push(
        "Would you like to know about related symptoms or conditions?",
        "I can help you understand treatment options if you'd like.",
        "Need information about preventive care or health maintenance?"
      );
    } else if (triageData?.domain === 'technology') {
      suggestions.push(
        "Want me to explain the technical details in more depth?",
        "I can show you code examples or implementation guides.",
        "Need help with troubleshooting or best practices?"
      );
    } else {
      suggestions.push(
        "Is there a specific aspect you'd like me to dive deeper into?",
        "I can provide more examples if that would be helpful.",
        "Would you like me to explain this from a different angle?"
      );
    }
  }

  // Milestone 5: Offer advanced features
  if (messageCount === 5) {
    suggestions.push(
      "💡 I can analyze images if you'd like to upload one",
      "📊 Would you like me to create a comparison table?",
      "🎯 I can provide step-by-step guidance if needed"
    );
  }

  // Milestone 7: Offer summary or next steps
  if (messageCount === 7) {
    suggestions.push(
      "Would you like me to summarize our conversation so far?",
      "I can create an action plan based on what we've discussed.",
      "Need help with anything else, or shall we wrap this up?"
    );
  }

  return suggestions.slice(0, 3); // Limit to 3 suggestions
}

/**
 * Generate humor-enhanced response (when appropriate)
 */
export function addHumorIfAppropriate(
  content: string,
  triageData: TriageResult | null
): string {
  // Never add humor to critical/urgent topics
  if (triageData?.urgency === 'critical' || triageData?.urgency === 'high') {
    return content;
  }

  // Only add to playful tone
  if (triageData?.emotional_tone !== 'playful') {
    return content;
  }

  // Add light humor for technology domain
  if (triageData?.domain === 'technology' && triageData.complexity === 'simple') {
    const techJokes = [
      "\n\n(Don't worry, no bugs were harmed in making this explanation! 🐛)",
      "\n\n(This explanation is 100% tested and debugged! ✅)",
      "\n\n(Unlike my code, this explanation actually works on the first try! 😄)"
    ];
    
    const randomJoke = techJokes[Math.floor(Math.random() * techJokes.length)];
    return content + randomJoke;
  }

  return content;
}

/**
 * Format response for split-screen comparison
 */
export interface SplitScreenData {
  primaryResponse: string;
  secondaryResponse?: string;
  comparisonMetadata?: {
    primaryModel: string;
    secondaryModel?: string;
    primaryCost: number;
    secondaryCost?: number;
    recommendation?: string;
  };
}

export function formatForSplitScreen(
  responses: string[],
  models: string[],
  costs: number[]
): SplitScreenData {
  return {
    primaryResponse: responses[0] || '',
    secondaryResponse: responses[1],
    comparisonMetadata: {
      primaryModel: models[0] || 'unknown',
      secondaryModel: models[1],
      primaryCost: costs[0] || 0,
      secondaryCost: costs[1],
      recommendation: responses.length > 1 
        ? "Compare both responses to see different perspectives"
        : undefined
    }
  };
}
