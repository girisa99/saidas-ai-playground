import React from 'react';

interface ConversationalAIProps {
  message: string;
  context: 'technology' | 'healthcare';
}

export const useConversationalAI = ({ message, context }: ConversationalAIProps) => {
  const addPersonality = (response: string): string => {
    const personalities = {
      technology: {
        humor: ["💡 Ah, the classic tech conundrum!", "🤖 *adjusts digital glasses*", "⚡ Plot twist!"],
        empathy: ["I totally get that feeling", "That's a really thoughtful question", "I can see why that would be confusing"],
        transitions: ["Speaking of which...", "That reminds me...", "Here's something interesting..."]
      },
      healthcare: {
        humor: ["🩺 *in my best doctor voice*", "💊 The prescription for that is...", "🏥 *channels inner therapist*"],
        empathy: ["That's completely understandable", "Many people feel the same way", "You're asking all the right questions"],
        transitions: ["From a wellness perspective...", "Building on that thought...", "Let me share something helpful..."]
      }
    };

    const currentPersonality = personalities[context];
    const randomHumor = currentPersonality.humor[Math.floor(Math.random() * currentPersonality.humor.length)];
    const randomEmpathy = currentPersonality.empathy[Math.floor(Math.random() * currentPersonality.empathy.length)];
    
    // Add personality elements randomly
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
        "Let me process that for a moment... 🤔",
        "Hmm, that's an interesting angle to consider...",
        "I'm thinking through the best way to explain this...",
        "Great question! Let me break this down for you..."
      ],
      healthcare: [
        "That's a really important question... 💭",
        "Let me think about the best approach here...",
        "I want to make sure I give you a thoughtful response...",
        "You've touched on something really significant..."
      ]
    };

    return intermediates[context][Math.floor(Math.random() * intermediates[context].length)];
  };

  return {
    addPersonality,
    generateIntermediateResponse
  };
};