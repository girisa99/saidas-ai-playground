import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Mail,
  MessageSquare,
  BookOpen,
  Users,
  Lightbulb,
  Zap,
  Shield,
  Target,
  TrendingUp,
  Brain
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      console.log("Subscribed email:", email);
    }
  };

  const faqCategories = [
    {
      category: "Getting Started",
      icon: Lightbulb,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      questions: [
        {
          question: "What is an AI Experimentation Hub and how does it work?",
          answer: "An AI Experimentation Hub is a structured approach to exploring and implementing AI solutions. It provides a systematic methodology for organizations to experiment with AI technologies, validate use cases, and scale successful implementations. The hub combines strategic planning, hands-on experimentation, and knowledge sharing to accelerate AI adoption.",
          learnMoreLink: "/about"
        },
        {
          question: "How quickly can I see results from AI implementation?",
          answer: "Most organizations see initial results within 4-6 weeks during the pilot phase. Measurable ROI typically becomes evident within 3-6 months, with many achieving 150-300% ROI within 12-18 months of strategic implementation.",
          learnMoreLink: "/case-studies"
        }
      ]
    },
    {
      category: "Technology & Tools",
      icon: Brain,
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      questions: [
        {
          question: "What AI technologies and tools are covered in the experimentation process?",
          answer: "We cover the complete AI ecosystem including Large Language Models (GPT-4, Claude, Gemini), No-Code/Low-Code platforms (Loveable, Bubble), Agentic AI systems, Vector databases, and enterprise integration tools. The focus is on practical, production-ready technologies.",
          learnMoreLink: "/technology-stack"
        },
        {
          question: "Do I need technical expertise to benefit from AI experimentation?",
          answer: "No! The experimentation hub is designed for both technical and non-technical users. We provide No-Code/Low-Code solutions for business users while offering advanced technical frameworks for developers. Our methodology accommodates all skill levels.",
          learnMoreLink: "/journey"
        }
      ]
    },
    {
      category: "Implementation & Support",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      questions: [
        {
          question: "What kind of support is available during implementation?",
          answer: "Comprehensive support includes strategic guidance, hands-on training, documentation, best practices sharing, and ongoing consultation. We provide both technical assistance and business strategy alignment throughout your AI journey.",
          learnMoreLink: "/about"
        },
        {
          question: "How do you ensure data privacy and security in AI implementations?",
          answer: "We follow enterprise-grade security frameworks including multi-tenant isolation, GDPR compliance, SOC 2 standards, and comprehensive data governance. All implementations include audit trails and ethical AI guidelines.",
          learnMoreLink: "/privacy"
        }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary/5" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Know About AI Experimentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about AI implementation, technology choices, and best practices
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className={`${category.bgColor} ${category.borderColor} border-2 rounded-lg p-6`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 bg-white rounded-lg ${category.borderColor} border`}>
                    <IconComponent className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{category.category}</h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const itemIndex = categoryIndex * 10 + index;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <Card key={index} className="bg-white border border-border/50">
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full p-6 text-left hover:bg-background/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-lg font-semibold text-foreground pr-4">
                              {faq.question}
                            </h4>
                            {isOpen ? (
                              <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-muted-foreground leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            <Link to={faq.learnMoreLink}>
                              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10">
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter Subscription CTA */}
        <div className="mt-16">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Stay Updated with AI Innovations
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Subscribe to receive the latest insights, case studies, and AI implementation strategies 
                directly in your inbox. Join 1000+ professionals already learning with us.
              </p>
            </div>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-primary hover:bg-primary/90 px-6">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  No spam, unsubscribe at any time. Read our <Link to="/privacy" className="underline">Privacy Policy</Link>
                </p>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Thank you for subscribing!
                </h4>
                <p className="text-muted-foreground">
                  You'll receive our latest AI insights and updates soon.
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-primary/20">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Weekly Insights</h4>
                <p className="text-sm text-muted-foreground">AI implementation case studies and best practices</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Community Access</h4>
                <p className="text-sm text-muted-foreground">Join our exclusive AI practitioners community</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-1">Early Access</h4>
                <p className="text-sm text-muted-foreground">Be first to access new tools and resources</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Support Options */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Have More Questions?</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Connect with our AI experts for personalized guidance and support
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Contact Expert
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Enterprise Solutions</h4>
                <p className="text-muted-foreground text-sm mb-4">
                  Custom AI implementation strategies for large organizations
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Learn More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};