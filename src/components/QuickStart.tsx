import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, Target, ArrowRight, Play } from "lucide-react";

export const QuickStart = () => {
  const quickStartSteps = [
    {
      step: 1,
      title: "Assessment & Planning",
      duration: "1-2 weeks",
      description: "Evaluate current state, identify AI opportunities, and create implementation roadmap",
      deliverables: ["Current state analysis", "AI readiness assessment", "Priority use cases", "Implementation timeline"],
      difficulty: "Easy"
    },
    {
      step: 2,
      title: "Pilot Project Setup",
      duration: "4-6 weeks",
      description: "Launch a small-scale AI project to demonstrate value and build confidence",
      deliverables: ["Pilot project selection", "Data preparation", "Tool configuration", "Initial training"],
      difficulty: "Medium"
    },
    {
      step: 3,
      title: "Team Training & Support",
      duration: "2-4 weeks",
      description: "Train your team on AI tools and establish best practices for ongoing success",
      deliverables: ["Training materials", "Hands-on workshops", "Support documentation", "Success metrics"],
      difficulty: "Easy"
    },
    {
      step: 4,
      title: "Scale & Optimize",
      duration: "8-12 weeks",
      description: "Expand successful pilots and optimize for maximum impact across the organization",
      deliverables: ["Scaled implementation", "Performance optimization", "Advanced features", "Long-term strategy"],
      difficulty: "Advanced"
    }
  ];

  const difficultyColors = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Advanced": "bg-blue-100 text-blue-800"
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background" id="quick-start">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Quick Start Guide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get started with AI implementation in your organization. Follow this proven 4-step process used by 50+ healthcare organizations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">95% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">3-6 Month ROI</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Full Team Support</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {quickStartSteps.map((step, index) => (
              <Card key={step.step} className="p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                      <Badge className={difficultyColors[step.difficulty as keyof typeof difficultyColors]}>
                        {step.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {step.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>

                {step.step === 1 && (
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Play className="mr-2 h-4 w-4" />
                    Start Assessment
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-primary/5 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Begin Your AI Journey?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join 50+ organizations that have successfully implemented AI using this proven methodology. 
                Get personalized guidance for your specific use case.
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
                  View Success Stories
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};