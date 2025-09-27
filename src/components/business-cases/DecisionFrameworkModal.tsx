import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, Bot } from "lucide-react";

interface DecisionFrameworkModalProps {
  showDecisionFramework: boolean;
  onClose: () => void;
}

export const DecisionFrameworkModal = ({ 
  showDecisionFramework, 
  onClose 
}: DecisionFrameworkModalProps) => {
  if (!showDecisionFramework) return null;

  return (
    <Card className="max-w-7xl mx-auto m-4 border-2 border-genie-accent/20 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-genie-primary/10 to-genie-accent/10 border-b border-genie-accent/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl font-bold text-genie-primary flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Strategic Analysis Framework
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-genie-primary hover:text-genie-accent"
          >
            <Lightbulb className="w-4 h-4" />
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-genie-primary">Decision Matrix</h3>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Choose Automation When:
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• High-volume, repetitive tasks</li>
                  <li>• Well-defined, standardized processes</li>
                  <li>• Minimal decision complexity</li>
                  <li>• Immediate ROI requirements</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Choose Agentic AI When:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Complex decision-making required</li>
                  <li>• Variable, personalized processes</li>
                  <li>• Continuous learning benefits</li>
                  <li>• Long-term optimization goals</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-genie-primary">Implementation Strategy</h3>
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">Hybrid Approach Benefits:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Best of both worlds integration</li>
                  <li>• Gradual complexity scaling</li>
                  <li>• Risk mitigation through phases</li>
                  <li>• Flexible adaptation to needs</li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">Key Success Factors:</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Clear success metrics definition</li>
                  <li>• Stakeholder alignment and training</li>
                  <li>• Iterative implementation approach</li>
                  <li>• Continuous monitoring and optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};