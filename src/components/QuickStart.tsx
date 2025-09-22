import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Target, ArrowRight, Play, BarChart3, TrendingUp, Lightbulb } from "lucide-react";

export const QuickStart = () => {
  const quickStartSteps = [
    {
      step: 1,
      title: "Assessment & Planning",
      duration: "1-2 weeks",
      description: "Evaluate current state, identify AI opportunities, and create implementation roadmap",
      detailedDescription: "Conduct comprehensive analysis of your organization's readiness for AI transformation. Identify high-impact use cases and develop strategic roadmap.",
      deliverables: [
        "Current state analysis", 
        "AI readiness assessment",
        "Priority use cases identification",
        "Implementation timeline & roadmap"
      ],
      difficulty: "Easy",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Target
    },
    {
      step: 2,
      title: "Pilot Project Setup", 
      duration: "4-6 weeks",
      description: "Launch a small-scale AI project to demonstrate value and build confidence",
      detailedDescription: "Design and execute proof-of-concept projects that showcase AI's potential. Focus on quick wins that build organizational confidence.",
      deliverables: [
        "Pilot project selection & scoping",
        "Data preparation & quality assessment", 
        "Tool configuration & integration",
        "Initial training & model setup"
      ],
      difficulty: "Medium",
      color: "bg-yellow-500", 
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      icon: Play
    },
    {
      step: 3,
      title: "Team Training & Support",
      duration: "2-4 weeks", 
      description: "Train your team on AI tools and establish best practices for ongoing success",
      detailedDescription: "Comprehensive knowledge transfer ensuring your team can effectively utilize and maintain AI solutions independently.",
      deliverables: [
        "Customized training materials",
        "Hands-on workshops & sessions",
        "Best practices documentation", 
        "Success metrics & KPIs"
      ],
      difficulty: "Easy",
      color: "bg-blue-500",
      bgColor: "bg-blue-50", 
      borderColor: "border-blue-200",
      icon: Users
    },
    {
      step: 4,
      title: "Scale & Optimize",
      duration: "8-12 weeks",
      description: "Expand successful pilots and optimize for maximum impact across the organization", 
      detailedDescription: "Scale proven AI solutions enterprise-wide while continuously optimizing performance and expanding capabilities.",
      deliverables: [
        "Scaled implementation strategy",
        "Performance optimization & tuning",
        "Advanced feature development",
        "Long-term evolution roadmap"
      ],
      difficulty: "Advanced",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200", 
      icon: TrendingUp
    }
  ];

  const difficultyColors = {
    "Easy": "bg-green-100 text-green-800 border-green-300",
    "Medium": "bg-yellow-100 text-yellow-800 border-yellow-300", 
    "Advanced": "bg-purple-100 text-purple-800 border-purple-300"
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background" id="quick-start">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Quick Start Guide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get started with AI implementation in your organization. Follow this proven 4-step 
            process used by 50+ healthcare organizations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">3-6 Month ROI</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-200">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Full Team Support</span>
            </div>
          </div>
        </div>

        {/* Visual Process Flow */}
        <div className="relative mb-16">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-300 via-yellow-300 via-blue-300 to-purple-300"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {quickStartSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className="relative">
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-16 h-16 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg relative z-10`}>
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Step Card */}
                  <Card className={`p-6 ${step.bgColor} ${step.borderColor} border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 relative`}>
                    <div className="text-center mb-4">
                      <IconComponent className={`w-8 h-8 mx-auto mb-2 ${step.color.replace('bg-', 'text-')}`} />
                      <h3 className="text-xl font-bold text-foreground mb-1">{step.title}</h3>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground font-medium">{step.duration}</span>
                      </div>
                      <Badge className={difficultyColors[step.difficulty as keyof typeof difficultyColors]}>
                        {step.difficulty}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 text-center leading-relaxed">
                      {step.detailedDescription}
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-sm flex items-center justify-center gap-2">
                        <Target className="h-4 w-4" />
                        Key Deliverables
                      </h4>
                      <ul className="space-y-1">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {step.step === 1 && (
                      <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                        <Play className="mr-2 h-4 w-4" />
                        Start Assessment
                      </Button>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center border border-primary/20">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">150-300% ROI</h3>
            <p className="text-sm text-muted-foreground">
              Average return on investment within 12-18 months of strategic AI implementation
            </p>
          </Card>
          
          <Card className="p-6 text-center border border-primary/20">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">60% Automation</h3>
            <p className="text-sm text-muted-foreground">
              Automated inquiries in customer service, reducing support costs significantly
            </p>
          </Card>
          
          <Card className="p-6 text-center border border-primary/20">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">85% Improvement</h3>
            <p className="text-sm text-muted-foreground">
              Response time improvement from 24 hours to 5 minutes with AI implementation
            </p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-primary/5 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Begin Your AI Journey?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The AI landscape is evolving rapidly. Organizations that act now gain competitive advantage 
              and establish market leadership before AI becomes commoditized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.open('https://www.linkedin.com/in/saidas/', '_blank')}
              >
                Start Your Assessment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Download Implementation Guide
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};