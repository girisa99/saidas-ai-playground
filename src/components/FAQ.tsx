import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Brain, Heart, Lightbulb, Cog, Rocket, Star, Users, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PrivacyDialog } from "./LegalDialogs";
import { FeedbackModal } from "./FeedbackModal";
import { ContactModal } from "./ContactModal";
import { RAGReviewModal } from "./RAGReviewModal";
import { supabase } from "@/integrations/supabase/client";

// Static FAQ data
const faqData = [
  {
    category: "Genie AI Capabilities",
    questions: [
      {
        q: "What is Genie AI and how can it help me?",
        a: "Genie AI is your intelligent assistant with 80+ specialized knowledge contexts, featuring advanced RAG architecture and multi-model intelligence. As one of our 2 live features launched through the Experiment → Validate → Lead to Deploy framework, I help you build AI expertise and position yourself as an AI-proficient professional in your field. I support discussions on AI innovation, Gartner Value Framework, tech stack mapping, experimentation methodologies, and healthcare business use cases."
      },
      {
        q: "What topics can Genie AI discuss?",
        a: "As one of 2 live features from our experimentation framework, I specialize in: • 80+ Knowledge Contexts with advanced RAG • Multi-model AI intelligence (GPT-5, Claude, Gemini) • Split-screen conversations and model comparisons • AI Innovation & Value Creation • Gartner Value Framework mapping • Technology stack architecture • Healthcare business use cases • Digital therapeutics (DTx) • Cell & gene therapies • Personal expertise development • Security and compliance topics • Journey mapping and case studies"
      },
      {
        q: "How does Genie AI adapt to different contexts?",
        a: "I intelligently detect whether you're asking about technology or healthcare topics and adapt my responses accordingly. With 80+ specialized knowledge contexts and advanced RAG architecture, I can switch between formal, casual, or empathetic communication styles. I also offer split-screen conversations, multi-model comparisons, and contextual suggestions to guide our conversation - demonstrating the advanced capabilities achieved through our 3-phase experimentation framework."
      }
    ]
  },
  {
    category: "Technology & AI Innovation",
    questions: [
      {
        q: "How does Genie AI map Gartner's Value Framework to tech stacks?",
        a: "I help you understand how Gartner's AI Value Framework translates into practical technology implementations. This includes mapping value creation to data layers, MLOps platforms, application architectures, and infrastructure components. I can guide you through short-term, medium-term, and long-term value realization strategies with specific KPIs and outcomes."
      },
      {
        q: "What emerging AI technologies should I focus on?",
        a: "Key areas include: • Large Language Models (GPT-5, Claude 3.5, Gemini) • Agentic AI and multi-agent systems • No-code/low-code AI platforms • Edge AI and local model deployment • RAG (Retrieval Augmented Generation) • Model Context Protocol (MCP) • AI observability and monitoring tools"
      },
      {
        q: "How can I implement AI democratization in my organization?",
        a: "I can guide you through personal AI expertise development that positions you as an AI expert: • Open source AI adoption strategies • Individual skill development approaches • Accessible AI tool selection for personal projects • Self-directed learning program design • Personal experimentation frameworks • Cost-effective AI solution implementation for individual growth • Building expertise that influences organizational adoption"
      }
    ]
  },
  {
    category: "Healthcare & Digital Therapeutics",
    questions: [
      {
        q: "What are Digital Therapeutics (DTx) and their reimbursement landscape?",
        a: "DTx are evidence-based therapeutic interventions driven by high-quality software programs. I can explain reimbursement pathways including CPT codes (90834, 90837, 96116), coverage through Medicare Part B and commercial insurance, and specific categories like mental health DTx, chronic disease management, and rehabilitation platforms."
      },
      {
        q: "How do Cell & Gene Therapies work with reimbursement?",
        a: "These revolutionary treatments using patient's own cells face unique reimbursement challenges including high costs, outcome-based contracts, and prior authorization requirements. I can explain CAR-T therapies, gene replacement treatments, Medicare Coverage Advisory Committee (MEDCAC) processes, and manufacturer patient assistance programs."
      },
      {
        q: "What should I know about 340B and healthcare pricing?",
        a: "The 340B Drug Pricing Program requires manufacturers to provide 20-50% discounts to eligible safety-net providers. I can explain eligibility requirements, contract pharmacy arrangements, audit compliance, and how it differs from WAC (Wholesale Acquisition Cost) and GPO (Group Purchasing Organization) pricing."
      }
    ]
  },
  {
    category: "Implementation & Journey Mapping",
    questions: [
      {
        q: "How does the Experimentation Hub journey work?",
        a: "The personal AI expertise development journey follows our proven 3-phase framework demonstrated through 2 live implementations: • EXPERIMENT (Months 1-3): Technology exploration, personal skill development, hands-on learning • VALIDATE (Months 4-9): Building credible expertise, creating case studies, proving capabilities • LEAD TO DEPLOY (Months 10-18): Professional development, influencing adoption, leading implementation. This framework enabled the creation of our GenieAI Hub platform and Genie Conversational AI feature."
      },
      {
        q: "What case studies and success stories can guide my implementation?",
        a: "I have comprehensive case studies including our 2 live feature implementations: • GenieAI Hub Platform: Complete platform built in 2 weeks using the 3-phase framework • Genie Conversational AI: Advanced RAG with 80+ contexts, multi-model intelligence • Healthcare AI transformation case studies (40% reduction in diagnosis time) • Personal expertise development journeys • Technology adoption success stories • Each includes challenges, solutions, technologies used, results achieved, and lessons learned for individual growth"
      },
      {
        q: "How do you handle security and compliance in AI implementations?",
        a: "Security considerations include: • Adversarial attack protection • Data poisoning prevention • Model validation and testing • Privacy-preserving techniques • Bias detection and mitigation • GDPR, HIPAA, and industry-specific compliance • Continuous monitoring and audit trails"
      }
    ]
  },
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I start a conversation with Genie AI?",
        a: "Simply click the floating Genie button on any page! I'll guide you through a privacy agreement, collect your basic information, and then adapt to your interests. You can ask questions about technology or healthcare topics, and I'll provide intelligent, contextual responses with follow-up suggestions."
      },
      {
        q: "Are there conversation limits?",
        a: "Yes, for system protection: 2 conversations per hour and 5 per day for public users. If you need extended access for legitimate research or business use cases, you can request it directly through the interface, and all requests are reviewed personally by our team at genieaiexperimentationhub@gmail.com."
      },
      {
        q: "How is my data protected?",
        a: "We use minimal data collection with strong security measures: • IP-based session isolation • Encrypted data transmission • No cross-user data sharing • Audit logging for sensitive access • Compliance with privacy regulations • Option to request data deletion"
      }
    ]
  },
  {
    category: "Advanced Features",
    questions: [
      {
        q: "What advanced AI modes does Genie offer?",
        a: "As one of my flagship learning experiments where I'm exploring AI capabilities through hands-on development, I support multiple advanced modes: • Split-screen conversations with model comparisons • Multi-model intelligence (GPT-5, Claude, Gemini) • 80+ specialized knowledge contexts • Advanced RAG-enabled responses • Context switching between domains • Single-agent mode for focused expertise • Multi-agent mode for complex analysis • MCP (Model Context Protocol) tool usage • Real-time knowledge base integration. Through experimentation, I've learned about handling high-load scenarios (testing 1,000+ concurrent conversations), optimizing response times (<2.5s targets), and building reliable systems."
      },
      {
        q: "How does the knowledge base integration work?",
        a: "My knowledge base represents one of the most comprehensive AI implementations with: • Complete website content from our experimentation platform • 80+ specialized knowledge contexts • Technology stack documentation • Healthcare business use cases • Gartner Value Framework mappings • Case studies from our 2 live feature launches • Security and compliance guidelines • Real-time updates from ongoing experiments • Advanced RAG architecture for contextual responses"
      },
      {
        q: "Can Genie AI help with specific business decisions?",
        a: "Absolutely! I can help you build expertise and position yourself as an AI expert through: • Personal technology selection guidance • Individual implementation roadmap development • Personal risk assessment and skill building • ROI estimation for personal AI projects • Vendor evaluation frameworks for individual use • Compliance requirement analysis • Personal change management strategies • Building credibility for organizational influence"
      }
    ]
  }
];

export const FAQ = () => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    subscribers: 0,
    likes: 0,
    dislikes: 0
  });
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [dynamicFaqData, setDynamicFaqData] = useState<any[]>([]);
  const [combinedFaqData, setCombinedFaqData] = useState<any[]>(faqData);
  const { toast } = useToast();

  // Fetch dynamic FAQ entries from database
  const fetchDynamicFAQ = async () => {
    try {
      const { data: faqEntries, error } = await supabase
        .from('faq_entries')
        .select('*')
        .eq('is_active', true)
        .order('category_name', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching FAQ entries:', error);
        return;
      }

      // Group FAQ entries by category
      const groupedFAQ = faqEntries?.reduce((acc: any, entry: any) => {
        const category = entry.category_name;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          q: entry.question,
          a: entry.answer,
          fromRAG: entry.created_from_rag
        });
        return acc;
      }, {});

      // Convert to array format expected by component
      const dynamicCategories = Object.entries(groupedFAQ || {}).map(([category, questions]: [string, any]) => ({
        category,
        questions: questions as any[],
        isDynamic: true
      }));

      setDynamicFaqData(dynamicCategories);
      
      // Combine static and dynamic FAQ data
      const staticWithFlags = faqData.map(cat => ({ ...cat, isDynamic: false }));
      setCombinedFaqData([...staticWithFlags, ...dynamicCategories]);
    } catch (error) {
      console.error('Error fetching dynamic FAQ:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchDynamicFAQ();
    
    // Check if user has already voted
    const storedVote = localStorage.getItem('faq-user-vote');
    if (storedVote) {
      setUserVote(storedVote as 'like' | 'dislike');
    }
  }, []);

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('site_stats')
        .select('stat_name, stat_value')
        .in('stat_name', ['total_subscribers', 'total_likes', 'total_dislikes']);

      if (error) {
        console.error('Error fetching stats:', error);
        return;
      }

      const statsObj = data?.reduce((acc: any, stat: any) => {
        switch (stat.stat_name) {
          case 'total_subscribers':
            acc.subscribers = stat.stat_value;
            break;
          case 'total_likes':
            acc.likes = stat.stat_value;
            break;
          case 'total_dislikes':
            acc.dislikes = stat.stat_value;
            break;
        }
        return acc;
      }, {});

      setStats(prev => ({ ...prev, ...statsObj }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (userVote) {
      toast({
        title: "Already voted",
        description: "You've already provided feedback. Thank you!"
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('update-site-stats', {
        body: { 
          statName: voteType === 'like' ? 'total_likes' : 'total_dislikes',
          increment: 1
        }
      });

      if (error) throw error;

      setUserVote(voteType);
      localStorage.setItem('faq-user-vote', voteType);
      
      setStats(prev => ({
        ...prev,
        [voteType === 'like' ? 'likes' : 'dislikes']: prev[voteType === 'like' ? 'likes' : 'dislikes'] + 1
      }));

      toast({
        title: "Thank you!",
        description: `Your ${voteType} has been recorded.`
      });
    } catch (error) {
      console.error('Error recording vote:', error);
      toast({
        title: "Error",
        description: "Failed to record your feedback. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubscribe = async () => {
    if (!firstName || !lastName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { 
          firstName,
          lastName,
          email,
          source: 'faq_section'
        }
      });

      if (error) throw error;

      setIsSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "Welcome to our community! Check your email for confirmation."
      });
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            <Lightbulb className="w-4 h-4 mr-2" />
            FAQ & Knowledge Hub
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive answers about AI innovation, technology implementation, 
            and healthcare transformation. Updated with insights from real conversations.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {combinedFaqData.map((faqCategory, categoryIndex) => {
            const isExpanded = expandedCategories.includes(categoryIndex);
            const Icon = categoryIndex === 0 ? Brain : 
                        categoryIndex === 1 ? Cog : 
                        categoryIndex === 2 ? Heart : 
                        categoryIndex === 3 ? Rocket : 
                        categoryIndex === 4 ? Users : 
                        categoryIndex === 5 ? Lightbulb : Star;
            
            return (
              <Card key={categoryIndex} className="border border-primary/20 bg-gradient-to-r from-background to-primary/5">
                <div 
                  className="p-6 cursor-pointer flex items-center justify-between hover:bg-primary/5 transition-colors"
                  onClick={() => toggleCategory(categoryIndex)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        {faqCategory.category}
                        {faqCategory.isDynamic && (
                          <Badge variant="secondary" className="text-xs">
                            Dynamic
                          </Badge>
                        )}
                      </h3>
                      <p className="text-muted-foreground">
                        {faqCategory.questions.length} questions
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary" />
                  )}
                </div>
                
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <Separator className="mb-6" />
                    <div className="space-y-4">
                      {faqCategory.questions.map((qa: any, qaIndex: number) => (
                        <div key={qaIndex} className="border-l-2 border-primary/30 pl-4">
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            {qa.q}
                            {qa.fromRAG && (
                              <Badge variant="outline" className="text-xs">
                                AI Generated
                              </Badge>
                            )}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                            {qa.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <Separator className="my-16" />

        {/* Community Stats and Voting */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Community Feedback</h3>
          <div className="flex justify-center items-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.subscribers}</div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.likes}</div>
              <div className="text-sm text-muted-foreground">Helpful</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.dislikes}</div>
              <div className="text-sm text-muted-foreground">Needs Work</div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={userVote === 'like' ? 'default' : 'outline'}
              onClick={() => handleVote('like')}
              disabled={!!userVote}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful</span>
            </Button>
            <Button
              variant={userVote === 'dislike' ? 'destructive' : 'outline'}
              onClick={() => handleVote('dislike')}
              disabled={!!userVote}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="w-4 h-4 rotate-180" />
              <span>Needs Work</span>
            </Button>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground">
              Get the latest insights on AI innovation and healthcare transformation
            </p>
          </div>

          {isSubscribed ? (
            <div className="text-center">
              <div className="text-green-600 font-semibold mb-2">🎉 Successfully Subscribed!</div>
              <p className="text-muted-foreground">Check your email for confirmation.</p>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <Input
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe to Updates'}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                By subscribing, you agree to our{' '}
                <PrivacyDialog 
                  trigger={
                    <button className="underline hover:text-primary transition-colors">
                      Privacy Policy
                    </button>
                  }
                />
              </p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <FeedbackModal 
            trigger={
              <Button variant="outline" className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Share Feedback</span>
              </Button>
            }
          />
          <ContactModal 
            trigger={
              <Button variant="outline" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Get in Touch</span>
              </Button>
            }
          />
          <RAGReviewModal 
            trigger={
              <Button variant="outline" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>Review RAG Updates</span>
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};