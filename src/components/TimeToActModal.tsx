import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

interface TimeToActModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: "home" | "about" | "journey" | "technology" | "business-cases" | "case-studies" | "contact" | "docs" | "faq";
}

export const TimeToActModal = ({ open, onOpenChange, context }: TimeToActModalProps) => {
  const getContextualContent = () => {
    switch (context) {
      case "home":
        return {
          title: "Time to Act is Now",
          subtitle: "AI Transformation Window is Closing",
          questions: [
            {
              stakeholder: "Business Leaders",
              question: "How do we build AI capabilities without massive investment?",
              icon: Users,
              color: "primary"
            },
            {
              stakeholder: "Technology Teams",
              question: "Where do we even begin with AI integration?",
              icon: Target,
              color: "secondary"
            }
          ],
          cta: {
            text: "Explore the Framework",
            link: "/journey",
            description: "See the proven 90-day methodology"
          }
        };

      case "about":
        return {
          title: "Why Personal Experimentation Matters",
          subtitle: "Building Expertise That Drives Change",
          questions: [
            {
              stakeholder: "Individual Contributors",
              question: "How can I become an AI change agent in my organization?",
              icon: Lightbulb,
              color: "accent"
            },
            {
              stakeholder: "Department Heads",
              question: "Can individual learning really impact our organization?",
              icon: TrendingUp,
              color: "primary"
            }
          ],
          cta: {
            text: "View My Journey",
            link: "/journey",
            description: "From curiosity to capability"
          }
        };

      case "journey":
        return {
          title: "The 90-Day Transformation",
          subtitle: "Guardrails to Results",
          questions: [
            {
              stakeholder: "Risk & Compliance",
              question: "How do we ensure safe AI experimentation while moving fast?",
              icon: AlertCircle,
              color: "destructive"
            },
            {
              stakeholder: "Innovation Teams",
              question: "What's the path from learning to production deployment?",
              icon: Rocket,
              color: "success"
            }
          ],
          cta: {
            text: "See Business Applications",
            link: "/business-use-cases",
            description: "Framework in action"
          }
        };

      case "business-cases":
        return {
          title: "Real-World Applications",
          subtitle: "From Theory to Practice",
          questions: [
            {
              stakeholder: "Product Managers",
              question: "How do we translate AI experimentation into our product roadmap?",
              icon: Target,
              color: "primary"
            },
            {
              stakeholder: "Operations Leaders",
              question: "What's the real cost of not experimenting with AI now?",
              icon: TrendingUp,
              color: "secondary"
            }
          ],
          cta: {
            text: "View Implementation Details",
            link: "/case-studies",
            description: "Complete case studies with metrics"
          }
        };

      case "case-studies":
        return {
          title: "Validated Results",
          subtitle: "Proof Through Documentation",
          questions: [
            {
              stakeholder: "Executive Leadership",
              question: "What happens if we wait for AI to mature before we start?",
              icon: CheckCircle,
              color: "success"
            },
            {
              stakeholder: "Partners & Consultants",
              question: "How do we help clients build AI capabilities they can own?",
              icon: TrendingUp,
              color: "primary"
            }
          ],
          cta: {
            text: "Start Your Transformation",
            link: "/contact",
            description: "Let's discuss your AI journey"
          }
        };

      case "technology":
        return {
          title: "Technology Selection Matters",
          subtitle: "Building on Proven Foundations",
          questions: [
            {
              stakeholder: "Architecture Teams",
              question: "Are we building AI capabilities or just using AI tools?",
              icon: Lightbulb,
              color: "accent"
            },
            {
              stakeholder: "Security Teams",
              question: "Can we experiment with AI without compromising security?",
              icon: AlertCircle,
              color: "destructive"
            }
          ],
          cta: {
            text: "See Technology in Action",
            link: "/business-use-cases",
            description: "Real-world implementations"
          }
        };

      default:
        return {
          title: "Time to Act is Now",
          subtitle: "AI Transformation Opportunity",
          questions: [],
          cta: {
            text: "Explore Framework",
            link: "/journey",
            description: "Start your journey"
          }
        };
    }
  };

  const content = getContextualContent();
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return "bg-genie-primary/10 text-genie-primary border-genie-primary/20";
      case "secondary": return "bg-genie-secondary/10 text-genie-secondary border-genie-secondary/20";
      case "accent": return "bg-genie-accent/10 text-genie-accent border-genie-accent/20";
      case "success": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "destructive": return "bg-red-500/10 text-red-600 border-red-500/20";
      default: return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-background">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-genie-accent animate-pulse" />
            <Badge className="bg-genie-accent/20 text-genie-accent border-genie-accent/30">
              Urgent
            </Badge>
          </div>
          <DialogTitle className="text-2xl lg:text-3xl font-bold">
            {content.title}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {content.subtitle} — Questions to reflect on with your team, partners, or consultants.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {content.questions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index} 
                className={`p-6 border-2 ${getColorClasses(item.color)} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg flex-shrink-0 ${getColorClasses(item.color)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Badge variant="outline" className="mb-3 text-xs">
                      {item.stakeholder}
                    </Badge>
                    <h3 className="font-semibold text-foreground text-lg leading-relaxed">
                      {item.question}
                    </h3>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-genie-primary/10 to-genie-accent/10 rounded-lg p-6 border border-genie-primary/20">
            <div className="text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Ready to Explore Further?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {content.cta.description}
              </p>
              <Button 
                className="bg-genie-primary hover:bg-genie-primary/90 text-white"
                asChild
                onClick={() => onOpenChange(false)}
              >
                <Link to={content.cta.link}>
                  {content.cta.text}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
