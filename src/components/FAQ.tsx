import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail,
  MessageSquare,
  BookOpen,
  Users,
  Lightbulb,
  Zap,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Heart
} from "lucide-react";
import { useState, useEffect } from "react";
import { PrivacyDialog } from "@/components/LegalDialogs";
import { FeedbackModal } from "@/components/FeedbackModal";
import { ContactModal } from "@/components/ContactModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const faqData = [
  {
    category: "Genie AI Capabilities",
    questions: [
      {
        q: "What is Genie AI and how can it help me?",
        a: "Genie AI is your intelligent assistant specializing in Technology and Healthcare concepts. I can support discussions on AI innovation, Gartner Value Framework, tech stack mapping, experimentation hub methodologies, and healthcare business use cases. I'm designed to guide users through complex topics with personalized insights and practical recommendations."
      },
      {
        q: "What topics can Genie AI discuss?",
        a: "I specialize in: • AI Innovation & Value Creation • Gartner Value Framework mapping • Technology stack architecture • Healthcare business use cases • Digital therapeutics (DTx) • Cell & gene therapies • Experimentation methodologies • Security and compliance topics • Journey mapping and case studies"
      },
      {
        q: "How does Genie AI adapt to different contexts?",
        a: "I intelligently detect whether you're asking about technology or healthcare topics and adapt my responses accordingly. I can switch between formal, casual, or empathetic communication styles based on your needs and provide contextual suggestions to guide our conversation."
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
        a: "I can guide you through: • Open source AI adoption strategies • Community-driven development approaches • Accessible AI tool selection • Educational program design • Collaborative research frameworks • Cost-effective AI solution implementation"
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
        a: "The journey follows three phases: • Discovery & Learning (Months 1-3): Technology exploration, use case identification, skill development • Experimentation & Validation (Months 4-9): Hypothesis testing, pilot implementation, user feedback • Scale & Integration (Months 10-18): Production deployment, system integration, team scaling"
      },
      {
        q: "What case studies and success stories can guide my implementation?",
        a: "I have comprehensive case studies covering healthcare AI transformation (40% reduction in diagnosis time), financial services automation (80% fraud detection improvement), and various industry implementations. Each includes challenges, solutions, technologies used, results achieved, and lessons learned."
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
        a: "Yes, for system protection: 2 conversations per hour and 5 per day for public users. If you need extended access for legitimate research or business use cases, you can request it directly through the interface, and all requests are reviewed personally by our team at genieaiexpermentationhub@gmail.com."
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
        a: "I support multiple modes: • Default mode for general conversations • Single-agent mode for focused expertise • Multi-agent mode for complex analysis • Split-screen comparisons with different AI models • RAG-enabled responses with knowledge base integration • MCP (Model Context Protocol) tool usage"
      },
      {
        q: "How does the knowledge base integration work?",
        a: "My knowledge base includes: • Complete website content and topics • Technology stack documentation • Healthcare business use cases • Gartner Value Framework mappings • Case studies and journey examples • Security and compliance guidelines • Real-time updates from experimentation results"
      },
      {
        q: "Can Genie AI help with specific business decisions?",
        a: "Absolutely! I can provide: • Technology selection guidance • Implementation roadmap development • Risk assessment and mitigation • ROI estimation and KPI definition • Vendor evaluation frameworks • Compliance requirement analysis • Change management strategies"
      }
    ]
  }
];

export const FAQ = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Genie AI Capabilities']);
  const [stats, setStats] = useState({
    total_subscribers: 0,
    total_likes: 0,
    total_dislikes: 0
  });
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
    // Check if user has already voted
    const existingVote = localStorage.getItem('genie-hub-vote');
    if (existingVote === 'like' || existingVote === 'dislike') {
      setUserVote(existingVote);
    }
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('site_stats')
        .select('stat_name, stat_value');

      if (error) throw error;

      const statsObj = {
        total_subscribers: 0,
        total_likes: 0,
        total_dislikes: 0
      };

      data?.forEach((stat) => {
        if (stat.stat_name in statsObj) {
          statsObj[stat.stat_name as keyof typeof statsObj] = stat.stat_value;
        }
      });

      setStats(statsObj);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (userVote) {
      toast({
        title: "Already Voted",
        description: "You've already shared your feedback. Thank you!",
        variant: "destructive"
      });
      return;
    }

    setIsVoting(true);

    try {
      const { error } = await supabase.functions.invoke('update-site-stats', {
        body: { statName: voteType === 'like' ? 'total_likes' : 'total_dislikes' }
      });

      if (error) throw error;

      localStorage.setItem('genie-hub-vote', voteType);
      setUserVote(voteType);

      setStats(prev => ({
        ...prev,
        [voteType === 'like' ? 'total_likes' : 'total_dislikes']: 
          prev[voteType === 'like' ? 'total_likes' : 'total_dislikes'] + 1
      }));

      toast({
        title: "Thank you!",
        description: `Your ${voteType} has been recorded. We appreciate your feedback!`,
      });
    } catch (error: any) {
      console.error('Error recording vote:', error);
      toast({
        title: "Error",
        description: "Unable to record your vote. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsVoting(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your first name, last name, and email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { 
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          source: 'website_faq'
        }
      });

      if (error) throw error;

      setIsSubscribed(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      toast({
        title: "Welcome aboard! 🧞‍♂️",
        description: "You've successfully subscribed to our newsletter. Check your email for a welcome message!",
      });
    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Unable to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* FAQ Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold genie-gradient-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="genie-tagline text-lg mb-2">Everything you need to know about Genie AI</p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive answers about AI innovation, healthcare concepts, technology implementation, and experimentation methodologies
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border border-primary/20">
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {category.category}
                </h3>
                <ArrowRight 
                  className={`w-5 h-5 text-primary transition-transform ${
                    expandedCategories.includes(category.category) ? 'rotate-90' : ''
                  }`} 
                />
              </button>
              
              {expandedCategories.includes(category.category) && (
                <div className="px-6 pb-6 space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {faq.q}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
        
        {/* Community Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold genie-gradient-text mb-2">
            Join Our Growing Community
          </h2>
          <p className="genie-tagline text-lg">I am your Technology Navigator</p>
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {stats.total_subscribers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Subscribers</div>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => handleVote('like')}
                disabled={isVoting || !!userVote}
                size="sm"
                variant={userVote === 'like' ? 'default' : 'outline'}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="w-4 h-4" />
                {stats.total_likes}
              </Button>
              <Button
                onClick={() => handleVote('dislike')}
                disabled={isVoting || !!userVote}
                size="sm"
                variant={userVote === 'dislike' ? 'destructive' : 'outline'}
                className="flex items-center gap-2"
              >
                <ThumbsDown className="w-4 h-4" />
                {stats.total_dislikes}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Newsletter Subscription CTA */}
        <div className="max-w-xl mx-auto">
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold genie-gradient-text mb-2">
                Join the GENIE AI Journey
              </h3>
              <p className="genie-tagline mb-2 text-sm">I am your Technology Navigator</p>
              <p className="text-muted-foreground text-sm">
                Subscribe to receive insights from my AI experiments, successful implementations, failed attempts, 
                and lessons learned. Join fellow AI experimenters exploring what works and what doesn't.
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-sm mx-auto">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="text-sm"
                    />
                    <Input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="text-sm"
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-sm"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                    size="sm"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  No spam, unsubscribe at any time. Read my <PrivacyDialog trigger={<button className="underline text-muted-foreground hover:text-foreground">Privacy Policy</button>} />
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Thank you for joining the journey!
                </h4>
                <p className="text-muted-foreground">
                  You'll receive my latest AI experiments and insights soon.
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-primary/20">
              <div className="text-center">
                <BookOpen className="w-5 h-5 text-primary mx-auto mb-1" />
                <h4 className="font-semibold text-foreground mb-1 text-xs">Experiment Insights</h4>
                <p className="text-xs text-muted-foreground">Real results from AI tools testing and implementation attempts</p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                <h4 className="font-semibold text-foreground mb-1 text-xs">Connect and Share</h4>
                <p className="text-xs text-muted-foreground">Connect with other AI experimenters and share discoveries</p>
              </div>
              <div className="text-center">
                <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                <h4 className="font-semibold text-foreground mb-1 text-xs">Early Access</h4>
                <p className="text-xs text-muted-foreground">Be first to try new tools and techniques I discover</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-2 mt-4">
              <ContactModal 
                trigger={
                  <Button variant="default" size="sm" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Connect & Learn
                  </Button>
                }
              />
              <FeedbackModal 
                trigger={
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Share Feedback
                  </Button>
                }
              />
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};