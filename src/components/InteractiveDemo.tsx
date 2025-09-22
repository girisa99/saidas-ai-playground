import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, Brain, Target, CheckCircle, ArrowRight } from "lucide-react";

export const InteractiveDemo = () => {
  const [currentDemo, setCurrentDemo] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState("");

  const demos = [
    {
      id: 0,
      title: "Healthcare Data Analysis",
      description: "Analyze patient data patterns",
      icon: Brain,
      inputPlaceholder: "Enter patient symptoms (e.g., fever, headache, nausea)",
      mockProcessing: () => {
        return "Analysis: Potential viral infection (85% confidence). Recommended: Hydration, rest, monitor temperature. Consult physician if symptoms persist >48 hours.";
      }
    },
    {
      id: 1,
      title: "Risk Assessment",
      description: "Evaluate healthcare intervention risks",
      icon: Target,
      inputPlaceholder: "Enter patient profile (age, conditions, medications)",
      mockProcessing: () => {
        return "Risk Score: Medium (6/10). Key factors: Age-related complications (40%), drug interactions (30%), chronic conditions (30%). Mitigation strategies identified.";
      }
    },
    {
      id: 2,
      title: "Treatment Optimization",
      description: "Optimize treatment protocols",
      icon: Zap,
      inputPlaceholder: "Enter current treatment plan",
      mockProcessing: () => {
        return "Optimization: 3 improvements identified. Dosage adjustment (+15% efficacy), timing modification (+20% patient compliance), alternative medication option available.";
      }
    }
  ];

  const handleRunDemo = async () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    setResult("");
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const demoResult = demos[currentDemo].mockProcessing();
    setResult(demoResult);
    setIsProcessing(false);
  };

  const resetDemo = () => {
    setUserInput("");
    setResult("");
    setIsProcessing(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background" id="interactive-demo">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Try AI in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience how AI can transform healthcare decision-making. Choose a scenario and see real-time analysis.
          </p>
          
          {/* Demo Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {demos.map((demo, index) => {
              const IconComponent = demo.icon;
              return (
                <Button
                  key={demo.id}
                  variant={currentDemo === index ? "default" : "outline"}
                  onClick={() => {
                    setCurrentDemo(index);
                    resetDemo();
                  }}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {demo.title}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 border border-primary/20">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {(() => {
                  const IconComponent = demos[currentDemo].icon;
                  return <IconComponent className="h-6 w-6 text-primary" />;
                })()}
                <h3 className="text-2xl font-bold text-foreground">
                  {demos[currentDemo].title}
                </h3>
                <Badge variant="secondary">Demo</Badge>
              </div>
              <p className="text-muted-foreground mb-6">
                {demos[currentDemo].description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Input Section */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Input Data
                </label>
                <Textarea
                  placeholder={demos[currentDemo].inputPlaceholder}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleRunDemo}
                  disabled={isProcessing || !userInput.trim()}
                  className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      Run AI Analysis
                    </>
                  )}
                </Button>
              </div>

              {/* Results Section */}
              {result && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">AI Analysis Complete</h4>
                  </div>
                  <p className="text-green-700">{result}</p>
                </div>
              )}

              {/* Call to Action */}
              <div className="text-center pt-6 border-t border-border">
                <p className="text-muted-foreground mb-4">
                  Want to implement similar AI solutions in your organization?
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Learn Implementation Strategy
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Benefits Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center border border-primary/20">
            <Brain className="h-8 w-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Smart Analysis</h4>
            <p className="text-sm text-muted-foreground">AI processes complex data patterns humans might miss</p>
          </Card>
          <Card className="p-6 text-center border border-primary/20">
            <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Real-time Results</h4>
            <p className="text-sm text-muted-foreground">Instant insights for faster decision making</p>
          </Card>
          <Card className="p-6 text-center border border-primary/20">
            <Target className="h-8 w-8 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Precise Outcomes</h4>
            <p className="text-sm text-muted-foreground">Data-driven recommendations with confidence scores</p>
          </Card>
        </div>
      </div>
    </section>
  );
};