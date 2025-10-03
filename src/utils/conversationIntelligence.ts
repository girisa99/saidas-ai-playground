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

  reset() {
    this.messageCount = 0;
    this.lastSuggestionAt = 0;
  }
}

export const conversationIntelligence = new ConversationIntelligence();