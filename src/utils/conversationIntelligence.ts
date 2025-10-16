interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface MoodAnalysis {
  mood: 'helpful' | 'playful' | 'empathetic' | 'excited';
  confidence: number;
  reason: string;
}

interface SuggestionTrigger {
  shouldShow: boolean;
  type: 'topic' | 'context-switch' | 'insight' | 'encouragement';
  message: string;
  suggestions: Array<{ label: string; emoji?: string; description?: string }>;
  mood: 'helpful' | 'playful' | 'empathetic' | 'excited';
}

export class ConversationIntelligence {
  private messageCount = 0;
  private lastSuggestionAt = 0;

  /**
   * Analyze conversation mood based on user's language and tone
   */
  analyzeMood(messages: ConversationMessage[]): MoodAnalysis {
    const recentUserMessages = messages
      .filter(m => m.role === 'user')
      .slice(-3)
      .map(m => m.content.toLowerCase());

    const allUserText = recentUserMessages.join(' ');

    // Detect frustration/confusion
    if (
      allUserText.match(/(?:confused|lost|don't understand|not sure|help|stuck)/i) ||
      recentUserMessages.some(msg => msg.includes('?') && msg.split('?').length > 2)
    ) {
      return {
        mood: 'empathetic',
        confidence: 0.8,
        reason: 'User seems confused or needs guidance'
      };
    }

    // Detect excitement/enthusiasm
    if (allUserText.match(/(?:awesome|great|cool|amazing|interesting|love|wow)/i) || allUserText.includes('!')) {
      return {
        mood: 'excited',
        confidence: 0.7,
        reason: 'User is engaged and enthusiastic'
      };
    }

    // Detect casual/playful tone
    if (allUserText.match(/(?:haha|lol|😊|😄|👍|thanks)/i) || allUserText.length < 20) {
      return {
        mood: 'playful',
        confidence: 0.6,
        reason: 'User has a casual, friendly tone'
      };
    }

    return {
      mood: 'helpful',
      confidence: 0.5,
      reason: 'Standard professional tone'
    };
  }

  /**
   * Detect if conversation involves images or visual content
   */
  detectVisionRequirement(messages: ConversationMessage[]): boolean {
    const recentContent = messages
      .slice(-3)
      .map(m => m.content.toLowerCase())
      .join(' ');

    // Only trigger vision for explicit image analysis requests
    // NOT for general queries that happen to contain words like "list"
    const explicitVisionKeywords = [
      'analyze image', 'analyze this image', 'analyze the image',
      'what\'s in this image', 'what do you see in',
      'describe image', 'describe this image', 'describe the image',
      'medical image', 'scan analysis', 'x-ray analysis', 'mri analysis',
      'ct scan analysis', 'ultrasound analysis', 'dicom analysis',
      'radiograph analysis', 'mammogram analysis',
      'uploaded image', 'image i uploaded', 'picture i shared',
      'look at this image', 'analyze this scan', 'what does this show'
    ];

    return explicitVisionKeywords.some(keyword => recentContent.includes(keyword));
  }

  /**
   * Detect topic patterns to suggest related areas
   */
  detectTopicPatterns(messages: ConversationMessage[]): string[] {
    const recentContent = messages
      .slice(-5)
      .map(m => m.content.toLowerCase())
      .join(' ');

    const topics: string[] = [];

    // Healthcare topics
    if (recentContent.match(/(?:icd|cpt|billing|claim|insurance|reimbursement)/i)) {
      topics.push('healthcare-billing');
    }
    if (recentContent.match(/(?:therapy|treatment|patient|clinical|medical)/i)) {
      topics.push('healthcare-treatment');
    }
    
    // Medical imaging topics
    if (recentContent.match(/(?:image|imaging|scan|x-?ray|mri|ct|ultrasound|dicom|radiology|radiograph)/i)) {
      topics.push('healthcare-imaging');
    }

    // Technology topics
    if (recentContent.match(/(?:ai|ml|model|llm|algorithm|neural)/i)) {
      topics.push('technology-ai');
    }
    if (recentContent.match(/(?:code|api|integration|sdk|platform)/i)) {
      topics.push('technology-integration');
    }

    return topics;
  }

  /**
   * Determine if we should show a contextual suggestion
   */
  shouldShowSuggestion(
    messages: ConversationMessage[],
    currentContext: string | null,
    selectedTopic: string
  ): SuggestionTrigger | null {
    this.messageCount = messages.filter(m => m.role === 'user').length;

    // Don't show suggestions too frequently (at least 3 messages apart)
    if (this.messageCount - this.lastSuggestionAt < 3) {
      return null;
    }

    const mood = this.analyzeMood(messages);
    const topics = this.detectTopicPatterns(messages);

    // After 3 messages, offer topic exploration
    if (this.messageCount === 3 && !selectedTopic) {
      this.lastSuggestionAt = this.messageCount;
      return {
        shouldShow: true,
        type: 'topic',
        message: mood.mood === 'excited' 
          ? "🎯 You're on fire! Want to dive deeper into any of these?"
          : "I'm picking up on some interesting threads here. Want to explore one of these?",
        suggestions: this.getTopicSuggestions(topics, currentContext),
        mood: mood.mood
      };
    }

    // After 5 messages, offer context switch if appropriate
    if (this.messageCount === 5 && topics.length > 1) {
      this.lastSuggestionAt = this.messageCount;
      return {
        shouldShow: true,
        type: 'context-switch',
        message: mood.mood === 'playful'
          ? "Hey! I notice you're bouncing between topics. Want to switch gears? 🔄"
          : "I'm noticing connections across different areas. Shall we explore another angle?",
        suggestions: [
          { label: 'Technology Angle', emoji: '💻', description: 'Technical implementation' },
          { label: 'Healthcare Angle', emoji: '🏥', description: 'Clinical applications' }
        ],
        mood: mood.mood
      };
    }

    // After 7 messages, provide insights or encouragement
    if (this.messageCount === 7) {
      this.lastSuggestionAt = this.messageCount;
      return mood.mood === 'empathetic' 
        ? {
            shouldShow: true,
            type: 'encouragement',
            message: "You're doing great! 💪 These are complex topics, and you're asking all the right questions. Want to clarify anything?",
            suggestions: [
              { label: 'Summarize what we covered', emoji: '📝' },
              { label: 'Dive deeper', emoji: '🔍' },
              { label: 'See related topics', emoji: '🔗' }
            ],
            mood: mood.mood
          }
        : {
            shouldShow: true,
            type: 'insight',
            message: "💡 Quick insight: Based on our chat, you might also be interested in...",
            suggestions: this.getRelatedSuggestions(topics),
            mood: mood.mood
          };
    }

    return null;
  }

  private getTopicSuggestions(
    topics: string[],
    currentContext: string | null
  ): Array<{ label: string; emoji?: string }> {
    const suggestions = [];

    if (topics.includes('healthcare-billing')) {
      suggestions.push(
        { label: 'Billing Workflows', emoji: '💰' },
        { label: 'Insurance Claims', emoji: '📋' }
      );
    }

    if (topics.includes('healthcare-treatment')) {
      suggestions.push(
        { label: 'Treatment Plans', emoji: '🩺' },
        { label: 'Clinical Protocols', emoji: '📊' }
      );
    }

    if (topics.includes('healthcare-imaging')) {
      suggestions.push(
        { label: 'Medical Imaging', emoji: '🔬' },
        { label: 'DICOM Analysis', emoji: '📸' },
        { label: 'Radiology Insights', emoji: '🏥' }
      );
    }

    if (topics.includes('technology-ai')) {
      suggestions.push(
        { label: 'AI Models', emoji: '🤖' },
        { label: 'RAG Systems', emoji: '🧠' }
      );
    }

    if (topics.includes('technology-integration')) {
      suggestions.push(
        { label: 'API Integration', emoji: '🔌' },
        { label: 'Platform Setup', emoji: '⚙️' }
      );
    }

    return suggestions.slice(0, 3);
  }

  private getRelatedSuggestions(topics: string[]): Array<{ label: string; emoji?: string }> {
    const allSuggestions = [
      { label: 'Implementation Best Practices', emoji: '✨' },
      { label: 'Cost Optimization', emoji: '💵' },
      { label: 'Compliance Requirements', emoji: '📜' },
      { label: 'Real-world Examples', emoji: '🎯' },
      { label: 'Integration Patterns', emoji: '🔗' }
    ];

    return allSuggestions.slice(0, 3);
  }

  /**
   * Detect if user's intent has shifted to a different domain
   */
  detectContextShift(
    messages: ConversationMessage[], 
    currentContext: 'technology' | 'healthcare' | null
  ): { 
    shifted: boolean; 
    newContext: 'technology' | 'healthcare' | null;
    confidence: number;
  } {
    if (!currentContext || messages.length < 4) {
      return { shifted: false, newContext: null, confidence: 0 };
    }

    // Analyze last 3 messages for context
    const recentMessages = messages.slice(-3);
    const recentText = recentMessages
      .filter(m => m.role === 'user')
      .map(m => m.content.toLowerCase())
      .join(' ');

    const techKeywords = [
      'ai', 'technology', 'software', 'programming', 'code', 'automation', 
      'llm', 'model', 'api', 'cloud', 'platform', 'digital transformation', 
      'innovation', 'stack', 'framework', 'algorithm', 'data science', 
      'machine learning', 'neural', 'computer', 'system', 'application'
    ];
    
    const healthKeywords = [
      'health', 'medical', 'patient', 'clinical', 'wellness', 'treatment', 
      'diagnosis', 'healthcare', 'medicine', 'therapy', 'infusion', 'oncology', 
      'cardiology', 'reimbursement', 'insurance', 'coverage', 'drug', 'physician', 
      'hospital', 'doctor', 'nurse', 'disease', 'symptom', 'care'
    ];

    const techScore = techKeywords.filter(kw => recentText.includes(kw)).length;
    const healthScore = healthKeywords.filter(kw => recentText.includes(kw)).length;

    // Calculate confidence based on keyword density
    const totalWords = recentText.split(' ').length;
    const techConfidence = Math.min((techScore / Math.max(totalWords, 1)) * 10, 1);
    const healthConfidence = Math.min((healthScore / Math.max(totalWords, 1)) * 10, 1);

    // Only consider it a shift if:
    // 1. Strong keyword presence in opposite context (confidence > 0.15)
    // 2. Clear difference between scores (at least 2 keyword difference)
    if (currentContext === 'technology' && healthScore > techScore && healthScore - techScore >= 2 && healthConfidence > 0.15) {
      return { shifted: true, newContext: 'healthcare', confidence: healthConfidence };
    }

    if (currentContext === 'healthcare' && techScore > healthScore && techScore - healthScore >= 2 && techConfidence > 0.15) {
      return { shifted: true, newContext: 'technology', confidence: techConfidence };
    }

    return { shifted: false, newContext: null, confidence: 0 };
  }

  reset() {
    this.messageCount = 0;
    this.lastSuggestionAt = 0;
  }
}

export const conversationIntelligence = new ConversationIntelligence();