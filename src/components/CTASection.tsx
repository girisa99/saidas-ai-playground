import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, PlayCircle, BookOpen, Lightbulb, Target, Users, Zap, Trophy, Map, Rocket, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { TimeToActModal } from "@/components/TimeToActModal";

interface CTAProps {
  currentPage: "home" | "about" | "journey" | "technology" | "business-cases" | "case-studies" | "contact" | "docs" | "faq";
  variant?: "primary" | "secondary" | "minimal";
}

export const CTASection = ({ currentPage, variant = "primary" }: CTAProps) => {
  const [showTimeToAct, setShowTimeToAct] = useState(false);
  // Define logical flow paths for each page
  const getNextSteps = () => {
    switch (currentPage) {
      case "home":
        return {
          primary: {
            title: "Explore What I Learned",
            description: "See my personal AI experimentation journey - adapt what resonates with your context and needs",
            link: "/about",
            icon: Users,
            buttonText: "Explore My Story"
          },
          secondary: {
            title: "Browse My Experiments",
            description: "8+ validated business cases and 2 live features showing what I built. Use what fits your situation, modify what doesn't.",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Browse Experiments"
          },
          tertiary: {
            title: "See What Worked",
            description: "2 complete implementations documented openly - learn from what worked in my context",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Implementations"
          }
        };

      case "about":
        return {
          primary: {
            title: "See How I Learned",
            description: "My path from curiosity to building 2 live features and 8+ validated experiments. Adapt the approach to fit your own learning style.",
            link: "/journey",
            icon: Map,
            buttonText: "View My Journey"
          },
          secondary: {
            title: "Browse What I Built",
            description: "Practical implementations I tested - use them as inspiration for your own projects",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Browse Implementations"
          },
          tertiary: {
            title: "Explore Technologies I Used",
            description: "AI tools and frameworks I experimented with - choose what suits your needs",
            link: "/technology",
            icon: Zap,
            buttonText: "View Tech Stack"
          }
        };

      case "journey":
        return {
          primary: {
            title: "Explore My 90-Day Framework Applications",
            description: "See how I applied the Day 0-90 experimentation approach across 8+ validated healthcare scenarios",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "View Day 0-90 Applications"
          },
          secondary: {
            title: "Browse Implementation Results",
            description: "2 live features and 8+ validated experiments showing what worked for me. Use as reference points for your own implementations.",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Browse Results"
          },
          tertiary: {
            title: "Explore Technologies I Chose",
            description: "Tools and infrastructure I used at each phase - select what fits your requirements",
            link: "/technology",
            icon: Zap,
            buttonText: "View Technologies"
          }
        };

      case "technology":
        return {
          primary: {
            title: "See Technologies Applied",
            description: "How I used these tools in my experiments - adapt the stack to your needs",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "Browse Applications"
          },
          secondary: {
            title: "View Technology Usage",
            description: "Detailed examples showing how I applied these technologies",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Examples"
          },
          tertiary: {
            title: "See My Learning Path",
            description: "How I discovered and experimented with these technologies",
            link: "/journey",
            icon: Map,
            buttonText: "View Journey"
          }
        };

      case "business-cases":
        return {
          primary: {
            title: "View Detailed Examples",
            description: "Full implementations with metrics from my experiments - use as references for your projects",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "Browse Examples"
          },
          secondary: {
            title: "See My Approach",
            description: "The experimentation methodology I followed - adapt it to suit your situation",
            link: "/journey",
            icon: Map,
            buttonText: "View Approach"
          },
          tertiary: {
            title: "Share Your Learning",
            description: "Let's exchange insights and learning from our experiences",
            link: "/contact",
            icon: Users,
            buttonText: "Connect"
          }
        };

      case "case-studies":
        return {
          primary: {
            title: "Explore More Experiments",
            description: "See these patterns applied across different scenarios - adapt them for your context",
            link: "/business-use-cases",
            icon: Target,
            buttonText: "View More Experiments"
          },
          secondary: {
            title: "Understand My Process",
            description: "The experimentation methodology behind these results - modify to fit your needs",
            link: "/journey",
            icon: Map,
            buttonText: "View Process"
          },
          tertiary: {
            title: "Exchange Insights",
            description: "Share your learnings and experiences with experimentation",
            link: "/contact",
            icon: Users,
            buttonText: "Let's Connect"
          }
        };

      default:
        return {
          primary: {
            title: "Start Exploring",
            description: "Browse my AI experimentation journey - take what's useful for you",
            link: "/about",
            icon: Users,
            buttonText: "Explore"
          },
          secondary: {
            title: "See My Path",
            description: "How I learned through experimentation - adapt to your own style",
            link: "/journey",
            icon: Map,
            buttonText: "View Journey"
          },
          tertiary: {
            title: "Browse Implementations",
            description: "Practical examples from my experiments - use as references",
            link: "/case-studies",
            icon: Trophy,
            buttonText: "View Examples"
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
    <>
      <TimeToActModal 
        open={showTimeToAct} 
        onOpenChange={setShowTimeToAct}
        context={currentPage}
      />
      
      <section className="py-10 bg-gradient-to-br from-genie-dark/5 via-genie-primary/5 to-genie-secondary/5">
        <div className="max-w-5xl mx-auto px-4">
          {/* Time to Act Banner */}
          <div className="mb-6 text-center">
            <Button
              onClick={() => setShowTimeToAct(true)}
              className="bg-genie-accent hover:bg-genie-accent/90 text-genie-dark font-semibold shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
              size="lg"
            >
              <Clock className="w-4 h-4 mr-2" />
              Time to Act is Now - See Why
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="text-center mb-8">
            <Badge className="bg-genie-primary/20 text-genie-primary border-genie-primary/30 mb-2">
              <Rocket className="w-3 h-3 mr-1" />
              What's Next?
            </Badge>
            <h2 className="text-xl lg:text-2xl font-bold mb-3">
              Explore What Resonates <span className="text-genie-primary">With You</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Browse my experiments and learnings - use what fits, adapt what doesn't, enhance based on your needs
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
    </>
  );
};