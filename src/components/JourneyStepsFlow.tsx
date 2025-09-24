import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JourneyStep {
  id: number;
  title: string;
  icon: LucideIcon;
  time: string;
  emotion: string;
  emotionIcon: LucideIcon;
  approach: string;
  description: string;
  roi: string;
  automationTasks: string[];
  aiTasks: string[];
  whyAutomation: string;
  whyAI: string;
  currentIssues: string[];
  improvement: string;
}

interface JourneyStepsFlowProps {
  steps: JourneyStep[];
  selectedStep: number | null;
  onStepClick: (stepId: number) => void;
}

export const JourneyStepsFlow = ({ steps, selectedStep, onStepClick }: JourneyStepsFlowProps) => {
  const getApproachColor = (approach: string) => {
    switch (approach) {
      case "automation":
        return "bg-blue-500/20 text-blue-700 border-blue-300";
      case "agentic":
        return "bg-purple-500/20 text-purple-700 border-purple-300";
      case "hybrid":
        return "bg-green-500/20 text-green-700 border-green-300";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-300";
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "positive":
        return "text-green-600";
      case "critical":
        return "text-red-600";
      case "neutral":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="w-full">
      {/* Step Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const EmotionIcon = step.emotionIcon;
          const isSelected = selectedStep === step.id;
          
          return (
            <Card 
              key={step.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onStepClick(step.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                      <StepIcon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {step.id}
                    </span>
                  </div>
                  <EmotionIcon className={`h-4 w-4 ${getEmotionColor(step.emotion)}`} />
                </div>
                
                <h4 className="font-semibold text-sm mb-2 line-clamp-2">
                  {step.title}
                </h4>
                
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getApproachColor(step.approach)}`}
                  >
                    {step.approach}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {step.time}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {step.description}
                </p>
                
                <div className="text-xs font-medium text-green-600">
                  {step.roi}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Step Details */}
      {selectedStep && (
        <div className="mt-8">
          {(() => {
            const step = steps.find(s => s.id === selectedStep);
            if (!step) return null;
            
            const StepIcon = step.icon;
            const EmotionIcon = step.emotionIcon;
            
            return (
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <StepIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={getApproachColor(step.approach)}
                        >
                          {step.approach}
                        </Badge>
                        <EmotionIcon className={`h-5 w-5 ${getEmotionColor(step.emotion)}`} />
                      </div>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">⏱️ {step.time}</span>
                        <span className="text-green-600 font-medium">📈 {step.roi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        🤖 Automation Tasks
                      </h4>
                      <ul className="space-y-2">
                        {step.automationTasks.map((task, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        💡 {step.whyAutomation}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                        🧠 AI Tasks
                      </h4>
                      <ul className="space-y-2">
                        {step.aiTasks.map((task, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-purple-500 mt-1">•</span>
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        💡 {step.whyAI}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                        ⚠️ Current Issues
                      </h4>
                      <ul className="space-y-2">
                        {step.currentIssues.map((issue, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                        🎯 Expected Improvement
                      </h4>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">{step.improvement}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })()}
        </div>
      )}
    </div>
  );
};