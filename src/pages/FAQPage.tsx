import { NavigationHeader } from "@/components/NavigationHeader";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ArrowLeft,
  Lightbulb,
  Brain,
  Target,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      category: "Getting Started with AI Experiments",
      icon: Lightbulb,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      questions: [
        {
          question: "What is an AI Experimentation Hub and how does it work?",
          answer: "An AI Experimentation Hub is my personal approach to systematically exploring AI technologies. It's about hands-on learning, testing different tools, documenting what works and what doesn't, and sharing those insights. Think of it as a lab notebook for AI experiments where I try new models, platforms, and techniques to see their real-world applicability.",
          learnMoreLink: "/about"
        },
        {
          question: "How do you decide which AI tools to experiment with?",
          answer: "I focus on tools that solve real problems I encounter or that show potential for healthcare applications. I start with free tiers, test specific use cases, and evaluate based on ease of use, accuracy, cost, and integration capabilities. Failed experiments are just as valuable as successful ones - they teach us what doesn't work.",
          learnMoreLink: "/journey"
        },
        {
          question: "What should I expect from my first AI experiments?",
          answer: "Expect a mix of excitement and frustration! Start small - maybe automate a simple task or try prompt engineering with ChatGPT. Document everything: what you tried, what worked, what failed, and why. Most importantly, don't expect perfection on the first try. Learning AI is iterative.",
          learnMoreLink: "/technology-stack"
        }
      ]
    },
    {
      category: "Learning & Knowledge Sharing",
      icon: Brain,
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      questions: [
        {
          question: "How do you document and share your AI experiments?",
          answer: "I maintain detailed experiment logs including objectives, tools used, prompts tried, results achieved, and lessons learned. I share both successes and failures because learning what doesn't work is just as valuable. My goal is to help others avoid the same pitfalls I encountered.",
          learnMoreLink: "/journey"
        },
        {
          question: "What's the best way to learn AI practically?",
          answer: "Start by identifying a real problem you want to solve, then experiment with AI tools to address it. Don't just read about AI - actually use it. Try different approaches, compare results, and iterate. Join communities where people share their experiments and learn from their experiences.",
          learnMoreLink: "/about"
        },
        {
          question: "How can I contribute to this knowledge sharing community?",
          answer: "Share your own experiments! Whether successful or failed, your experiences help others learn. Connect with me on LinkedIn to discuss what you're working on. The more we share our real-world AI experiences, the better we all become at practical AI implementation.",
          learnMoreLink: "/about"
        }
      ]
    },
    {
      category: "Practical Implementation Tips",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50", 
      borderColor: "border-purple-200",
      questions: [
        {
          question: "What are common mistakes in AI experimentation?",
          answer: "Starting too complex, not documenting failures, expecting perfect results immediately, and not testing with real data. Also, focusing only on the latest hyped tools without understanding fundamentals. I've made all these mistakes - learning from them is part of the journey.",
          learnMoreLink: "/journey"
        },
        {
          question: "How do you handle data privacy and security in experiments?",
          answer: "Always start with dummy or anonymized data for experiments. Never put sensitive information into public AI models. For healthcare applications, I ensure HIPAA compliance from the beginning. Security isn't an afterthought - it's built into every experiment from day one.",
          learnMoreLink: "/privacy"
        },
        {
          question: "What's your approach to scaling successful experiments?",
          answer: "I validate experiments thoroughly before scaling. This means testing edge cases, evaluating performance under load, and ensuring the solution is maintainable. Not every successful experiment should be scaled - sometimes the learning is the main value.",
          learnMoreLink: "/technology-stack"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12">
              <Link to="/">
                <Button variant="ghost" className="mb-6">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
                Knowledge Base
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                AI Experimentation Questions & Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real questions and practical insights from my AI experimentation journey. 
                Learn from my successes, failures, and everything in between.
              </p>
            </div>

            {/* FAQ Categories */}
            <div className="max-w-4xl mx-auto space-y-8">
              {faqCategories.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <div key={categoryIndex} className={`${category.bgColor} ${category.borderColor} border-2 rounded-lg p-6`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 bg-white rounded-lg ${category.borderColor} border`}>
                        <IconComponent className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">{category.category}</h2>
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
                                <h3 className="text-lg font-semibold text-foreground pr-4">
                                  {faq.question}
                                </h3>
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

            {/* Bottom CTA */}
            <div className="mt-16 max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Have a Question Not Listed Here?
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    I'm always learning and experimenting. If you have a specific question about AI tools, 
                    implementation challenges, or want to share your own experiments, let's connect!
                  </p>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
                  >
                    Connect & Discuss
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQPage;