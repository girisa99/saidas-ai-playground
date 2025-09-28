import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle, BookOpen, Lightbulb, Target, Users, Zap, Trophy, Map, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

interface CTAProps {
  currentPage: "home" | "about" | "journey" | "technology" | "business-cases" | "case-studies" | "contact" | "docs" | "faq";
  variant?: "primary" | "secondary" | "minimal";
}

export const CTASection = ({ currentPage, variant = "primary" }: CTAProps) => {
  // Define logical flow paths for each page
  const getNextSteps = () => {
    switch (currentPage) {
      case "home":
        return {
          primary: {
            title: "Start Your AI Journey",
            description: "Discover how I transformed from curiosity to AI innovation through hands-on experimentation",
            link: "/about",
            icon: Users,
            buttonText: "Meet Sai & His Story"
          },
          secondary: {
            title: "See Real Applications",
            description: "Explore practical AI use cases and their impact on healthcare innovation",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Explore Use Cases"
          },
          tertiary: {
            title: "View Success Stories",
            description: "See detailed case studies of AI implementations with real results",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Case Studies"
          }
        };

      case "about":
        return {
          primary: {
            title: "Experience My AI Journey",
            description: "Follow my 5-phase transformation from healthcare tech leader to AI innovator",
            link: "/journey",
            icon: Map,
            buttonText: "Explore My Journey"
          },
          secondary: {
            title: "See What I Built",
            description: "Discover practical applications and real-world AI implementations",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Case Studies"
          },
          tertiary: {
            title: "Explore Technologies",
            description: "Deep dive into the AI tools and technologies I've tested",
            link: "/technology",
            icon: Zap,
            buttonText: "Technology Stack"
          }
        };

      case "journey":
        return {
          primary: {
            title: "Apply These Insights",
            description: "See how journey insights translate to real business applications",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Business Applications"
          },
          secondary: {
            title: "See Detailed Results",
            description: "Explore specific case studies with metrics and outcomes",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Success Stories"
          },
          tertiary: {
            title: "Learn About Tools",
            description: "Discover the technology stack that powered this transformation",
            link: "/technology",
            icon: Zap,
            buttonText: "Tech Deep Dive"
          }
        };

      case "technology":
        return {
          primary: {
            title: "See Tools in Action",
            description: "Watch how these technologies solve real business challenges",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Business Use Cases"
          },
          secondary: {
            title: "View Implementation",
            description: "See detailed case studies showing technology application",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Case Studies"
          },
          tertiary: {
            title: "Understand My Journey",
            description: "Learn how I discovered and mastered these technologies",
            link: "/journey",
            icon: Map,
            buttonText: "My Learning Path"
          }
        };

      case "business-cases":
        return {
          primary: {
            title: "See Real Implementation",
            description: "Explore detailed case studies with actual results and metrics",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Case Studies"
          },
          secondary: {
            title: "Learn My Process",
            description: "Understand the journey that led to these business insights",
            link: "/journey",
            icon: Map,
            buttonText: "My AI Journey"
          },
          tertiary: {
            title: "Connect & Collaborate",
            description: "Let's discuss how these insights can benefit your projects",
            link: "/contact",
            icon: Users,
            buttonText: "Get in Touch"
          }
        };

      case "case-studies":
        return {
          primary: {
            title: "Apply to Your Business",
            description: "See how these patterns apply to different business scenarios",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Business Applications"
          },
          secondary: {
            title: "Understand My Journey",
            description: "Learn the experimentation process behind these successes",
            link: "/journey",
            icon: Map,
            buttonText: "Learning Journey"
          },
          tertiary: {
            title: "Let's Collaborate",
            description: "Discuss how we can apply these insights to your challenges",
            link: "/contact",
            icon: Users,
            buttonText: "Start a Conversation"
          }
        };

      default:
        return {
          primary: {
            title: "Start Exploring",
            description: "Begin your journey with AI experimentation and innovation",
            link: "/about",
            icon: Users,
            buttonText: "Meet Sai"
          },
          secondary: {
            title: "See My Journey",
            description: "Discover the path from curiosity to AI innovation",
            link: "/journey",
            icon: Map,
            buttonText: "Explore Journey"
          },
          tertiary: {
            title: "View Results",
            description: "See practical applications and real-world outcomes",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Success Stories"
          }
        };
    }
  };

  const nextSteps = getNextSteps();

  if (variant === "minimal") {
    return (
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            {nextSteps.primary.title}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {nextSteps.primary.description}
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to={nextSteps.primary.link}>
              {React.createElement(nextSteps.primary.icon, { className: "w-4 h-4 mr-2" })}
              {nextSteps.primary.buttonText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  if (variant === "secondary") {
    return (
      <section className="py-16 bg-gradient-to-br from-genie-primary/10 to-genie-secondary/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              Next Steps
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Continue Your <span className="text-genie-primary">AI Exploration</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take the next step in your AI journey with curated resources and insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-genie-primary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-genie-primary/10 rounded-lg">
                  {React.createElement(nextSteps.primary.icon, { className: "w-6 h-6 text-genie-primary" })}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {nextSteps.primary.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {nextSteps.primary.description}
                  </p>
                  <Button className="bg-genie-primary hover:bg-genie-primary/90" asChild>
                    <Link to={nextSteps.primary.link}>
                      {nextSteps.primary.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 border-genie-secondary/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-genie-secondary/10 rounded-lg">
                  {React.createElement(nextSteps.secondary.icon, { className: "w-6 h-6 text-genie-secondary" })}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {nextSteps.secondary.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {nextSteps.secondary.description}
                  </p>
                  <Button variant="outline" className="border-genie-secondary text-genie-secondary hover:bg-genie-secondary/10" asChild>
                    <Link to={nextSteps.secondary.link}>
                      {nextSteps.secondary.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Primary variant (full CTA section)
  return (
    <section className="py-20 bg-gradient-to-br from-genie-dark/5 via-genie-primary/5 to-genie-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            What's Next?
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Continue Your <span className="text-genie-primary">AI Exploration</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Follow a clear path through my AI experimentation journey - each step builds upon the last 
            to give you comprehensive insights into practical AI implementation.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Primary CTA */}
          <Card className="lg:col-span-2 p-8 lg:p-12 bg-gradient-to-br from-genie-primary/10 to-genie-primary/5 border-genie-primary/20 hover:border-genie-primary/40 transition-all duration-300">
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-genie-primary/20 rounded-xl">
                {React.createElement(nextSteps.primary.icon, { className: "w-8 h-8 text-genie-primary" })}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {nextSteps.primary.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {nextSteps.primary.description}
                </p>
                <Button size="lg" className="bg-genie-primary hover:bg-genie-primary/90 text-white font-semibold shadow-lg hover:shadow-xl" asChild>
                  <Link to={nextSteps.primary.link}>
                    {nextSteps.primary.buttonText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Secondary CTAs */}
          <div className="space-y-6">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-genie-secondary/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-genie-secondary/10 rounded-lg">
                  {React.createElement(nextSteps.secondary.icon, { className: "w-6 h-6 text-genie-secondary" })}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {nextSteps.secondary.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {nextSteps.secondary.description}
                  </p>
                  <Button variant="outline" size="sm" className="border-genie-secondary text-genie-secondary hover:bg-genie-secondary/10" asChild>
                    <Link to={nextSteps.secondary.link}>
                      {nextSteps.secondary.buttonText}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-genie-teal/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-genie-teal/10 rounded-lg">
                  {React.createElement(nextSteps.tertiary.icon, { className: "w-6 h-6 text-genie-teal" })}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-foreground mb-2">
                    {nextSteps.tertiary.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {nextSteps.tertiary.description}
                  </p>
                  <Button variant="outline" size="sm" className="border-genie-teal text-genie-teal hover:bg-genie-teal/10" asChild>
                    <Link to={nextSteps.tertiary.link}>
                      {nextSteps.tertiary.buttonText}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            🚀 Your AI Journey Progress
          </p>
          <div className="flex justify-center space-x-2 max-w-md mx-auto">
            {["about", "journey", "business-cases", "case-studies"].map((page, index) => (
              <div 
                key={page}
                className={`h-2 flex-1 rounded-full ${
                  currentPage === page ? "bg-genie-primary" : 
                  ["about", "journey", "business-cases", "case-studies"].indexOf(currentPage) > index ? "bg-genie-primary/50" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Follow the logical flow to maximize your learning experience
          </p>
        </div>
      </div>
    </section>
  );
};

// Fix missing React import
import React from "react";