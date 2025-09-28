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
        humor: [
          "💡 Ah, the classic tech challenge!", 
          "🤖 *adjusts digital parameters*", 
          "⚡ Here's the fascinating part!",
          "🚀 *activates knowledge engines*",
          "🎯 This is where it gets interesting!",
          "🔥 Now we're getting into the good stuff!",
          "⚙️ *processes through AI neurons*"
        ],
        empathy: [
          "I totally understand that perspective", 
          "That's a really insightful question", 
          "I can see why that would be important",
          "That resonates with many developers",
          "You're thinking like a true innovator",
          "That's exactly the right mindset",
          "I appreciate your technical curiosity"
        ],
        transitions: [
          "Speaking of which...", 
          "That reminds me of something from our experiments...", 
          "Here's what we've learned...",
          "Building on that foundation...",
          "This connects beautifully to...",
          "Let me share a related insight...",
          "Here's where it gets even more exciting..."
        ],
        contextual: [
          "From our 3-Phase Framework experience...",
          "Based on our Gartner methodology validation...",
          "Our experimentation hub insights show...",
          "Through our structured learning approach..."
        ]
      },
      healthcare: {
        humor: [
          "🩺 *in my most caring AI voice*", 
          "💊 The prescription for that insight is...", 
          "🏥 *channels healthcare expertise*",
          "🫀 *with genuine healthcare concern*",
          "🌡️ Let me check my clinical knowledge...",
          "💉 *drawing from healthcare wisdom*",
          "🔬 *accessing medical database*"
        ],
        empathy: [
          "That's completely understandable", 
          "Many people have similar concerns", 
          "You're asking exactly the right questions",
          "I hear the concern in your question",
          "That's a very human worry to have",
          "Your health journey matters to me",
          "I want to make sure you feel supported"
        ],
        transitions: [
          "From a patient care perspective...", 
          "Building on that healthcare context...", 
          "Let me share something valuable...",
          "In my experience helping patients...",
          "What's important to understand is...",
          "Here's what can bring peace of mind...",
          "Let me walk you through this gently..."
        ],
        contextual: [
          "From our healthcare case studies...",
          "Based on our DTx expertise...",
          "Our cell & gene therapy knowledge shows...",
          "Through our patient-centered approach..."
        ]
      },
      general: {
        humor: [
          "🧞‍♂️ *emerges from the knowledge lamp*", 
          "✨ Let me illuminate that for you!", 
          "🎯 Excellent question!",
          "🎭 *puts on thinking cap*",
          "🎪 Welcome to the show!",
          "🎨 *paints a picture of understanding*",
          "🎵 That's music to my AI ears!"
        ],
        empathy: [
          "I appreciate you asking that", 
          "That's a thoughtful inquiry", 
          "Great way to think about it",
          "I can sense your curiosity",
          "That shows real insight",
          "You're asking the important questions",
          "I'm here to help you understand"
        ],
        transitions: [
          "Let me guide you through this...", 
          "Here's what I've learned...", 
          "Based on our experiments...",
          "From my perspective...",
          "What's fascinating is...",
          "Let me break this down...",
          "Here's something cool..."
        ],
        contextual: [
          "From our experimentation hub...",
          "Based on our 3-phase approach...",
          "Our structured methodology reveals...",
          "Through our innovation journey..."
        ]
      }
    };

    const currentPersonality = personalities[context as keyof typeof personalities] || personalities.general;
    
    // Enhanced personality injection with more variety
    const personalityChance = Math.random();
    
    if (personalityChance > 0.6) {
      const humor = currentPersonality.humor[Math.floor(Math.random() * currentPersonality.humor.length)];
      response = `${humor} ${response}`;
    } else if (personalityChance > 0.3) {
      const empathy = currentPersonality.empathy[Math.floor(Math.random() * currentPersonality.empathy.length)];
      response = `${empathy}. ${response}`;
    }
    
    // Add contextual framework references (30% chance)
    if (Math.random() > 0.7) {
      const contextual = currentPersonality.contextual[Math.floor(Math.random() * currentPersonality.contextual.length)];
      response = `${contextual} ${response}`;
    }
    
    // Add smooth transitions (20% chance)
    if (Math.random() > 0.8) {
      const transition = currentPersonality.transitions[Math.floor(Math.random() * currentPersonality.transitions.length)];
      response = response.replace(/\. /, `. ${transition} `);
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