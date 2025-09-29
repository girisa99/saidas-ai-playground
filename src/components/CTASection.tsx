import React from "react";
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
            description: "Discover how to build AI capabilities that position you as a change agent in your organization",
            link: "/about",
            icon: Users,
            buttonText: "Meet Your Guide"
          },
          secondary: {
            title: "Learn Through Real Cases",
            description: "See how 4+ documented business cases validate AI solutions through systematic experimentation",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "View Business Cases"
          },
          tertiary: {
            title: "See Proven Results",
            description: "Study 2 complete case studies showing real implementations and outcomes",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Success Stories"
          }
        };

      case "about":
        return {
          primary: {
            title: "Follow My Learning Journey",
            description: "See how I transformed from healthcare tech leader to AI change agent through systematic experimentation",
            link: "/journey",
            icon: Map,
            buttonText: "Explore My Journey"
          },
          secondary: {
            title: "See What I Built",
            description: "Discover practical applications and real-world AI implementations that demonstrate the approach",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Case Studies"
          },
          tertiary: {
            title: "Explore the Tools",
            description: "Learn about the AI technologies and frameworks I tested during my experimentation",
            link: "/technology",
            icon: Zap,
            buttonText: "Technology Stack"
          }
        };

      case "journey":
        return {
          primary: {
            title: "Apply the Framework",
            description: "See how the Experiment → Validate → Deploy methodology translates to real business applications and healthcare solutions",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Business Applications"
          },
          secondary: {
            title: "See Framework Results",
            description: "Explore detailed case studies showing the 3-phase methodology delivering measurable outcomes and enterprise-grade solutions",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Success Stories"
          },
          tertiary: {
            title: "Explore the Tech Stack",
            description: "Discover the AI tools, technologies, and infrastructure that powered each phase of this transformation journey",
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
            title: "See Framework Journey",
            description: "Understand the 3-phase methodology that led to these business insights and real-world applications",
            link: "/journey",
            icon: Map,
            buttonText: "Framework Journey"
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
            title: "Apply Framework Patterns",
            description: "See how these validated framework results apply to different business scenarios and healthcare implementations",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Business Applications"
          },
          secondary: {
            title: "See Framework Journey",
            description: "Learn the 3-phase experimentation methodology behind these validated results and business outcomes",
            link: "/journey",
            icon: Map,
            buttonText: "Framework Journey"
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
      <section className="py-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {nextSteps.primary.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            {nextSteps.primary.description}
          </p>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link to={nextSteps.primary.link}>
              {React.createElement(nextSteps.primary.icon, { className: "w-3 h-3 mr-1" })}
              {nextSteps.primary.buttonText}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  if (variant === "secondary") {
    return (
      <section className="py-8 bg-gradient-to-br from-genie-primary/5 to-genie-secondary/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-2">
              <Rocket className="w-3 h-3 mr-1" />
              Next Steps
            </Badge>
            <h2 className="text-xl font-bold mb-2">
              Continue Your <span className="text-genie-primary">AI Exploration</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 hover:shadow-md transition-all duration-300 border-genie-primary/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-genie-primary/10 rounded-lg flex-shrink-0">
                  {React.createElement(nextSteps.primary.icon, { className: "w-4 h-4 text-genie-primary" })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {nextSteps.primary.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {nextSteps.primary.description}
                  </p>
                  <Button size="sm" className="bg-genie-primary hover:bg-genie-primary/90 text-xs" asChild>
                    <Link to={nextSteps.primary.link}>
                      {nextSteps.primary.buttonText}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-all duration-300 border-genie-secondary/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-genie-secondary/10 rounded-lg flex-shrink-0">
                  {React.createElement(nextSteps.secondary.icon, { className: "w-4 h-4 text-genie-secondary" })}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {nextSteps.secondary.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {nextSteps.secondary.description}
                  </p>
                  <Button variant="outline" size="sm" className="border-genie-secondary text-genie-secondary hover:bg-genie-secondary/10 text-xs" asChild>
                    <Link to={nextSteps.secondary.link}>
                      {nextSteps.secondary.buttonText}
                      <ArrowRight className="w-3 h-3 ml-1" />
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

  // Primary variant - compact CTA section
  return (
    <section className="py-10 bg-gradient-to-br from-genie-dark/5 via-genie-primary/5 to-genie-secondary/5">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-2">
            <Rocket className="w-3 h-3 mr-1" />
            What's Next?
          </Badge>
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Continue Building Your <span className="text-genie-primary">AI Expertise</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Take the next step in developing AI capabilities that position you as a change agent
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Primary CTA */}
          <Card className="lg:col-span-2 p-5 bg-gradient-to-br from-genie-primary/10 to-genie-primary/5 border-genie-primary/20 hover:border-genie-primary/40 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-genie-primary/20 rounded-lg flex-shrink-0">
                {React.createElement(nextSteps.primary.icon, { className: "w-5 h-5 text-genie-primary" })}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {nextSteps.primary.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {nextSteps.primary.description}
                </p>
                <Button className="bg-genie-primary hover:bg-genie-primary/90 text-white text-sm" asChild>
                  <Link to={nextSteps.primary.link}>
                    {nextSteps.primary.buttonText}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Secondary CTAs */}
          <div className="space-y-4">
            <Card className="p-4 hover:shadow-md transition-all duration-300 border-genie-secondary/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-genie-secondary/10 rounded-lg flex-shrink-0">
                  {React.createElement(nextSteps.secondary.icon, { className: "w-4 h-4 text-genie-secondary" })}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {nextSteps.secondary.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {nextSteps.secondary.description}
                  </p>
                  <Button variant="outline" size="sm" className="border-genie-secondary text-genie-secondary hover:bg-genie-secondary/10 text-xs" asChild>
                    <Link to={nextSteps.secondary.link}>
                      {nextSteps.secondary.buttonText}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-all duration-300 border-genie-teal/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-genie-teal/10 rounded-lg flex-shrink-0">
                  {React.createElement(nextSteps.tertiary.icon, { className: "w-4 h-4 text-genie-teal" })}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {nextSteps.tertiary.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {nextSteps.tertiary.description}
                  </p>
                  <Button variant="outline" size="sm" className="border-genie-teal text-genie-teal hover:bg-genie-teal/10 text-xs" asChild>
                    <Link to={nextSteps.tertiary.link}>
                      {nextSteps.tertiary.buttonText}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Compact Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-1 max-w-xs mx-auto mb-2">
            {["about", "journey", "business-cases", "case-studies"].map((page, index) => (
              <div 
                key={page}
                className={`h-1.5 flex-1 rounded-full ${
                  currentPage === page ? "bg-genie-primary" : 
                  ["about", "journey", "business-cases", "case-studies"].indexOf(currentPage) > index ? "bg-genie-primary/50" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Journey Progress
          </p>
        </div>
      </div>
    </section>
  );
};