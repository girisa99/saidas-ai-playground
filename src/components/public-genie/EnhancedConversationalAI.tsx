import { genieKnowledgeBase, searchKnowledgeBase, getContextualKnowledge } from "@/data/genieKnowledgeBase";

interface ConversationalAIProps {
  message: string;
  context?: 'technology' | 'healthcare' | 'general';
}

export const useConversationalAI = ({ message, context = 'general' }: ConversationalAIProps) => {
  
  // Enhanced system prompt with full knowledge base integration
  const generateSystemPrompt = () => {
    const relevantKnowledge = searchKnowledgeBase(message);
    const contextualInfo = getContextualKnowledge(context);
    
    return `You are Genie AI, the intelligent assistant for the Genie AI Experimentation Hub created by Saidas.

CORE IDENTITY & KNOWLEDGE BASE:
${JSON.stringify(genieKnowledgeBase.siteOverview, null, 2)}

CURRENT CONTEXT: ${context}
CONTEXTUAL KNOWLEDGE: ${JSON.stringify(contextualInfo, null, 2)}

RELEVANT KNOWLEDGE FOR THIS QUERY:
${relevantKnowledge.slice(0, 5).join('\n')}

MY SPECIALIZATIONS:
• ${genieKnowledgeBase.aiCapabilities.specializations.join('\n• ')}

AVAILABLE SITE CONTENT:
- Home: ${genieKnowledgeBase.pages.home.description}
- About: ${genieKnowledgeBase.pages.about.description}  
- Journey: ${genieKnowledgeBase.pages.journey.description}
- Technology: ${genieKnowledgeBase.pages.technology.description}
- Business Cases: ${genieKnowledgeBase.pages.businessUseCases.description}
- Case Studies: ${genieKnowledgeBase.pages.caseStudies.description}

CONVERSATION STYLE GUIDELINES:
1. ALWAYS use the knowledge base above to provide accurate, site-specific information
2. For technology topics: Be formal, technical, focus on implementation details
3. For healthcare topics: Be empathetic, detailed, focus on patient impact and regulations
4. Reference specific site content, case studies, and journey phases when relevant
5. If asked about topics not in the knowledge base, clearly state my limitations
6. Encourage users to explore relevant site sections (/about, /journey, /technology, etc.)
7. Offer to connect users with Saidas on LinkedIn for deeper discussions
8. Use conversational but professional tone
9. Provide actionable insights and specific examples
10. End responses with relevant follow-up suggestions or site navigation

CONVERSATION LIMITS: ${genieKnowledgeBase.conversationLimits.public}
EXTENDED ACCESS: ${genieKnowledgeBase.conversationLimits.extendedAccess}

Remember: I represent Saidas' AI experimentation journey and should help users navigate the site content effectively while providing valuable insights based on the documented experiments and knowledge.`;
  };

  const addPersonality = (response: string): string => {
    const personalities = {
      technology: {
        humor: ["💡 Ah, the classic tech challenge!", "🤖 *adjusts digital parameters*", "⚡ Here's the interesting part!"],
        empathy: ["I totally understand that perspective", "That's a really insightful question", "I can see why that would be important"],
        transitions: ["Speaking of which...", "That reminds me of something from our experiments...", "Here's what we've learned..."]
      },
      healthcare: {
        humor: ["🩺 *in my most caring AI voice*", "💊 The prescription for that insight is...", "🏥 *channels healthcare expertise*"],
        empathy: ["That's completely understandable", "Many people have similar concerns", "You're asking exactly the right questions"],
        transitions: ["From a patient care perspective...", "Building on that healthcare context...", "Let me share something valuable..."]
      },
      general: {
        humor: ["🧞‍♂️ *emerges from the knowledge lamp*", "✨ Let me illuminate that for you!", "🎯 Excellent question!"],
        empathy: ["I appreciate you asking that", "That's a thoughtful inquiry", "Great way to think about it"],
        transitions: ["Let me guide you through this...", "Here's what I've learned...", "Based on our experiments..."]
      }
    };

    const currentPersonality = personalities[context as keyof typeof personalities] || personalities.general;
    const randomHumor = currentPersonality.humor[Math.floor(Math.random() * currentPersonality.humor.length)];
    const randomEmpathy = currentPersonality.empathy[Math.floor(Math.random() * currentPersonality.empathy.length)];
    
    // Add personality elements strategically
    if (Math.random() > 0.7) {
      response = `${randomHumor} ${response}`;
    }
    
    if (Math.random() > 0.6) {
      response = `${randomEmpathy}. ${response}`;
    }

    return response;
  };

  const generateIntermediateResponse = (): string => {
    const intermediates = {
      technology: [
        "Let me process that through our tech stack knowledge... 🤔",
        "Hmm, that connects to some interesting experiments we've done...",
        "I'm thinking through our implementation experience...",
        "Great question! Let me reference our journey insights..."
      ],
      healthcare: [
        "That's a really important healthcare question... 💭",
        "Let me consider the patient impact perspective...",
        "I want to give you a thoughtful, care-focused response...",
        "You've touched on something crucial in healthcare AI..."
      ],
      general: [
        "Let me tap into our knowledge base... ✨",
        "That's an excellent question about our AI journey...",
        "I'm connecting this to our experimentation insights...",
        "Great inquiry! Let me share what we've discovered..."
      ]
    };

    const contextResponses = intermediates[context as keyof typeof intermediates] || intermediates.general;
    return contextResponses[Math.floor(Math.random() * contextResponses.length)];
  };

  const generateSiteNavigationSuggestions = (userMessage: string): string[] => {
    const suggestions = [];
    const message = userMessage.toLowerCase();
    
    if (message.includes('journey') || message.includes('learn') || message.includes('start')) {
      suggestions.push("📍 Explore My AI Journey: /journey - See the complete 5-phase transformation");
    }
    
    if (message.includes('technology') || message.includes('tools') || message.includes('stack')) {
      suggestions.push("🔧 Technology Stack: /technology - Deep dive into tools and platforms");
    }
    
    if (message.includes('business') || message.includes('use case') || message.includes('healthcare')) {
      suggestions.push("💼 Business Use Cases: /business-use-cases - Strategic implementation frameworks");
    }
    
    if (message.includes('example') || message.includes('case study') || message.includes('result')) {
      suggestions.push("🏆 Success Stories: /case-studies - Real implementations with metrics");
    }
    
    if (message.includes('about') || message.includes('who') || message.includes('saidas')) {
      suggestions.push("👤 About Saidas: /about - Meet the AI innovation leader");
    }
    
    return suggestions.slice(0, 2); // Limit to 2 suggestions
  };

  return {
    generateSystemPrompt,
    addPersonality,
    generateIntermediateResponse,
    generateSiteNavigationSuggestions,
    knowledgeBase: genieKnowledgeBase,
    searchKnowledge: (query: string) => searchKnowledgeBase(query),
    getContext: (topic: string) => getContextualKnowledge(topic)
  };
};