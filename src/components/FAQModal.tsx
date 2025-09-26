import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Lightbulb,
  Brain,
  Target,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FAQModalProps {
  trigger: React.ReactNode;
}

export const FAQModal = ({ trigger }: FAQModalProps) => {
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
          answer: "An AI Experimentation Hub is my personal approach to systematically exploring AI technologies. It's about hands-on learning, testing different tools, documenting what works and what doesn't, and sharing those insights. Think of it as a lab notebook for AI experiments where I try new models, platforms, and techniques to see their real-world applicability."
        },
        {
          question: "How do you decide which AI tools to experiment with?",
          answer: "I focus on tools that solve real problems I encounter or that show potential for healthcare applications. I start with free tiers, test specific use cases, and evaluate based on ease of use, accuracy, cost, and integration capabilities. Failed experiments are just as valuable as successful ones - they teach us what doesn't work."
        },
        {
          question: "What should I expect from my first AI experiments?",
          answer: "Expect a mix of excitement and frustration! Start small - maybe automate a simple task or try prompt engineering with ChatGPT. Document everything: what you tried, what worked, what failed, and why. Most importantly, don't expect perfection on the first try. Learning AI is iterative."
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
          answer: "I maintain detailed experiment logs including objectives, tools used, prompts tried, results achieved, and lessons learned. I share both successes and failures because learning what doesn't work is just as valuable. My goal is to help others avoid the same pitfalls I encountered."
        },
        {
          question: "What's the best way to learn AI practically?",
          answer: "Start by identifying a real problem you want to solve, then experiment with AI tools to address it. Don't just read about AI - actually use it. Try different approaches, compare results, and iterate. Join communities where people share their experiments and learn from their experiences."
        },
        {
          question: "How can I contribute to this knowledge sharing community?",
          answer: "Share your own experiments! Whether successful or failed, your experiences help others learn. Connect with me on LinkedIn to discuss what you're working on. The more we share our real-world AI experiences, the better we all become at practical AI implementation."
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
          answer: "Starting too complex, not documenting failures, expecting perfect results immediately, and not testing with real data. Also, focusing only on the latest hyped tools without understanding fundamentals. I've made all these mistakes - learning from them is part of the journey."
        },
        {
          question: "How do you handle data privacy and security in experiments?",
          answer: "Always start with dummy or anonymized data for experiments. Never put sensitive information into public AI models. For healthcare applications, I ensure HIPAA compliance from the beginning. Security isn't an afterthought - it's built into every experiment from day one."
        },
        {
          question: "What's your approach to scaling successful experiments?",
          answer: "I validate experiments thoroughly before scaling. This means testing edge cases, evaluating performance under load, and ensuring the solution is maintainable. Not every successful experiment should be scaled - sometimes the learning is the main value."
        }
      ]
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
              Knowledge Base
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              AI Experimentation Questions & Insights
            </h2>
            <p className="text-base text-muted-foreground font-normal">
              Real questions and practical insights from my AI experimentation journey.
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className={`${category.bgColor} ${category.borderColor} border rounded-lg p-4`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-white rounded-lg ${category.borderColor} border`}>
                    <IconComponent className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{category.category}</h3>
                </div>

                <div className="space-y-3">
                  {category.questions.map((faq, index) => {
                    const itemIndex = categoryIndex * 10 + index;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <Card key={index} className="bg-white border border-border/50">
                        <button
                          onClick={() => toggleItem(itemIndex)}
                          className="w-full p-4 text-left hover:bg-background/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold text-foreground pr-4">
                              {faq.question}
                            </h4>
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-primary flex-shrink-0" />
                            )}
                          </div>
                        </button>
                        
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
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
        <div className="mt-8">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                Have a Question Not Listed Here?
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                I'm always learning and experimenting. Connect with me to discuss AI tools and share experiments!
              </p>
              <Button 
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
              >
                Connect & Discuss
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};