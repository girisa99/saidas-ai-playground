/**
 * Genie Messaging Service - Dynamic, contextual messages with personality
 * 
 * Provides rotating messages themed around Aladdin's Genie with:
 * - Humor, empathy, and intelligence
 * - Health and Tech domain coverage
 * - Magic carpet/lamp/wish metaphors
 * - Never repeating the same message twice in a session
 */

export type MessageContext = 'welcome' | 'thinking' | 'ready' | 'greeting' | 'waiting' | 'analyzing';
export type DomainType = 'health' | 'tech' | 'general';

interface GenieMessage {
  text: string;
  domain: DomainType;
  emoji: string;
}

// Welcome messages when user first opens Genie
const welcomeMessages: GenieMessage[] = [
  { text: "Your wish is my command! 🧞‍♂️ Ready to explore health or tech wisdom?", domain: 'general', emoji: '🧞‍♂️' },
  { text: "Hop on the magic carpet! Let's soar through healthcare and technology together!", domain: 'general', emoji: '🪄' },
  { text: "Fresh from the lamp! What knowledge can I conjure for you today?", domain: 'general', emoji: '🔮' },
  { text: "Three wishes? How about unlimited AI-powered answers instead! ✨", domain: 'general', emoji: '✨' },
  { text: "No rubbing required! I'm here to grant your health & tech curiosities!", domain: 'general', emoji: '💫' },
  { text: "From ancient wisdom to cutting-edge tech - your personal genie awaits!", domain: 'general', emoji: '🌟' },
  { text: "A whole new world of knowledge awaits! Ready to explore?", domain: 'general', emoji: '🌍' },
];

// Thinking/processing messages while AI generates response
const thinkingMessages: GenieMessage[] = [
  { text: "Consulting my crystal ball... 🔮", domain: 'general', emoji: '🔮' },
  { text: "Summoning healthcare wisdom from the lamp...", domain: 'health', emoji: '🏥' },
  { text: "Scanning tech scrolls in my magic library...", domain: 'tech', emoji: '📚' },
  { text: "Weaving answers on my magic carpet...", domain: 'general', emoji: '🪄' },
  { text: "Channeling AI spirits for your query...", domain: 'tech', emoji: '🤖' },
  { text: "Brewing knowledge elixir with a dash of empathy...", domain: 'health', emoji: '💊' },
  { text: "Polishing my lamp for the brightest insights...", domain: 'general', emoji: '✨' },
  { text: "Consulting the Cave of Wonders (aka our database)...", domain: 'tech', emoji: '💎' },
  { text: "Teleporting through medical journals via magic carpet...", domain: 'health', emoji: '📖' },
  { text: "Decoding quantum bits with ancient genie wisdom...", domain: 'tech', emoji: '⚛️' },
];

// Ready/waiting for user input
const readyMessages: GenieMessage[] = [
  { text: "Ready to grant your next wish! What's on your mind?", domain: 'general', emoji: '🧞‍♂️' },
  { text: "The lamp is lit! Ask away about health or tech!", domain: 'general', emoji: '💡' },
  { text: "Your genie is all ears (well, I'm technically cloud-based, but you get it!)", domain: 'tech', emoji: '☁️' },
  { text: "Magic carpet parked! Where shall we fly next?", domain: 'general', emoji: '🪶' },
  { text: "No question too big, no curiosity too small!", domain: 'general', emoji: '🌟' },
  { text: "Standing by with healthcare empathy and tech precision!", domain: 'general', emoji: '💙' },
];

// Greeting messages for returning users
const greetingMessages: GenieMessage[] = [
  { text: "Welcome back! The lamp stayed warm for you! 🔥", domain: 'general', emoji: '🔥' },
  { text: "Ah, a familiar face! Ready for another adventure?", domain: 'general', emoji: '🎭' },
  { text: "The genie remembers you! Let's continue our journey!", domain: 'general', emoji: '🧠' },
  { text: "Back for more wisdom? My favorite kind of repeat customer!", domain: 'general', emoji: '⭐' },
  { text: "The magic carpet missed you! Hop on!", domain: 'general', emoji: '🪄' },
  { text: "Your personal AI djinn reporting for duty!", domain: 'tech', emoji: '🤖' },
];

// Waiting/idle messages
const waitingMessages: GenieMessage[] = [
  { text: "Patiently hovering on my magic carpet, waiting for your next question...", domain: 'general', emoji: '☁️' },
  { text: "Take your time! Even genies need to practice patience (it's in the manual).", domain: 'general', emoji: '📜' },
  { text: "No rush! I've got phenomenal cosmic power and infinite patience!", domain: 'general', emoji: '♾️' },
  { text: "Meditating in my lamp while you think... 🧘‍♂️", domain: 'general', emoji: '🧘‍♂️' },
];

// Analyzing/triage messages
const analyzingMessages: GenieMessage[] = [
  { text: "Hmm, intriguing question! Let me channel the right expertise...", domain: 'general', emoji: '🤔' },
  { text: "Activating smart routing through my genie network...", domain: 'tech', emoji: '🌐' },
  { text: "Matching your needs with the perfect AI oracle...", domain: 'general', emoji: '🎯' },
  { text: "Consulting my council of AI advisors for this one!", domain: 'tech', emoji: '👥' },
  { text: "Sensing healthcare vibes... routing to empathy mode!", domain: 'health', emoji: '💝' },
  { text: "Tech detected! Switching to precision engineering mode...", domain: 'tech', emoji: '⚙️' },
];

class GenieMessagingService {
  private usedMessages: Set<string> = new Set();
  private sessionStartTime: number = Date.now();

  /**
   * Get a random message that hasn't been shown in this session
   */
  private getUniqueMessage(messages: GenieMessage[], domain?: DomainType): GenieMessage {
    // Filter by domain if specified
    let filteredMessages = domain 
      ? messages.filter(m => m.domain === domain || m.domain === 'general')
      : messages;

    // Remove already used messages
    const availableMessages = filteredMessages.filter(m => !this.usedMessages.has(m.text));

    // If all messages used, reset the pool
    if (availableMessages.length === 0) {
      this.usedMessages.clear();
      return this.getUniqueMessage(messages, domain);
    }

    // Select random message
    const message = availableMessages[Math.floor(Math.random() * availableMessages.length)];
    this.usedMessages.add(message.text);
    
    return message;
  }

  /**
   * Get welcome message based on domain context
   */
  getWelcomeMessage(userFirstName?: string, domain?: DomainType): string {
    const message = this.getUniqueMessage(welcomeMessages, domain);
    const greeting = userFirstName ? `Hello ${userFirstName}! ` : '';
    return `${greeting}${message.emoji} ${message.text}`;
  }

  /**
   * Get thinking/processing message
   */
  getThinkingMessage(domain?: DomainType): string {
    const message = this.getUniqueMessage(thinkingMessages, domain);
    return message.text;
  }

  /**
   * Get ready/waiting message
   */
  getReadyMessage(domain?: DomainType): string {
    const message = this.getUniqueMessage(readyMessages, domain);
    return message.text;
  }

  /**
   * Get greeting for returning user
   */
  getGreetingMessage(userFirstName?: string, domain?: DomainType): string {
    const message = this.getUniqueMessage(greetingMessages, domain);
    const greeting = userFirstName ? `${userFirstName}! ` : '';
    return `${greeting}${message.emoji} ${message.text}`;
  }

  /**
   * Get waiting/idle message
   */
  getWaitingMessage(domain?: DomainType): string {
    const message = this.getUniqueMessage(waitingMessages, domain);
    return message.text;
  }

  /**
   * Get analyzing/triage message
   */
  getAnalyzingMessage(domain?: DomainType): string {
    const message = this.getUniqueMessage(analyzingMessages, domain);
    return message.text;
  }

  /**
   * Detect domain from query text
   */
  detectDomain(query: string): DomainType {
    const lower = query.toLowerCase();
    
    // Health keywords
    const healthKeywords = [
      'health', 'medical', 'patient', 'doctor', 'hospital', 'treatment', 'diagnosis',
      'medication', 'symptom', 'therapy', 'clinical', 'disease', 'insurance', 'care'
    ];
    
    // Tech keywords
    const techKeywords = [
      'code', 'software', 'app', 'api', 'database', 'tech', 'programming', 'algorithm',
      'cloud', 'server', 'data', 'ai', 'ml', 'deployment', 'integration'
    ];
    
    const healthScore = healthKeywords.filter(kw => lower.includes(kw)).length;
    const techScore = techKeywords.filter(kw => lower.includes(kw)).length;
    
    if (healthScore > techScore) return 'health';
    if (techScore > healthScore) return 'tech';
    return 'general';
  }

  /**
   * Get contextual message based on message type and domain
   */
  getMessage(context: MessageContext, query?: string, userFirstName?: string): string {
    const domain = query ? this.detectDomain(query) : undefined;
    
    switch (context) {
      case 'welcome':
        return this.getWelcomeMessage(userFirstName, domain);
      case 'thinking':
        return this.getThinkingMessage(domain);
      case 'ready':
        return this.getReadyMessage(domain);
      case 'greeting':
        return this.getGreetingMessage(userFirstName, domain);
      case 'waiting':
        return this.getWaitingMessage(domain);
      case 'analyzing':
        return this.getAnalyzingMessage(domain);
      default:
        return this.getWelcomeMessage(userFirstName, domain);
    }
  }

  /**
   * Reset the session (clear used messages)
   */
  resetSession(): void {
    this.usedMessages.clear();
    this.sessionStartTime = Date.now();
  }

  /**
   * Get session duration in minutes
   */
  getSessionDuration(): number {
    return Math.floor((Date.now() - this.sessionStartTime) / 60000);
  }
}

// Export singleton instance
export const genieMessaging = new GenieMessagingService();
