import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CaseStudyStep } from "@/data/caseStudies";
import { 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  Brain, 
  ArrowRight,
  AlertTriangle,
  ThumbsUp,
  Network
} from "lucide-react";

interface JourneyStepsProps {
  steps: CaseStudyStep[];
}

export const JourneySteps = ({ steps }: JourneyStepsProps) => {
  const [activeStep, setActiveStep] = useState<number>(-1);

  const getEmotionStyle = (emotion: string) => {
    switch (emotion) {
      case 'critical':
        return 'text-red-500 bg-red-50';
      case 'positive':
        return 'text-green-500 bg-green-50';
      case 'neutral':
        return 'text-blue-500 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getApproachStyle = (approach: string) => {
    switch (approach) {
      case 'automation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'agentic':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hybrid':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const EmotionIcon = step.emotionIcon;
        
        return (
          <Card key={step.id} className={`relative overflow-hidden ${activeStep === index ? 'ring-2 ring-genie-primary' : ''}`}>
            {/* Progress Connector */}
            {index < steps.length - 1 && (
              <div className="absolute left-8 top-20 w-0.5 h-16 bg-genie-primary/30 z-10"></div>
            )}
            
            <CardHeader 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setActiveStep(activeStep === index ? -1 : index)}
            >
              <div className="flex items-start gap-4">
                {/* Step Number & Icon */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-genie-primary/10 border-2 border-genie-primary/20">
                    <StepIcon className="w-8 h-8 text-genie-primary" />
                  </div>
                  <div className="text-xs font-bold text-genie-primary bg-genie-primary/10 px-2 py-1 rounded-full">
                    Step {step.id}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <div className={`p-1 rounded-full ${getEmotionStyle(step.emotion)}`}>
                      <EmotionIcon className="w-4 h-4" />
                    </div>
                    <Badge className={getApproachStyle(step.approach)}>
                      {step.approach.charAt(0).toUpperCase() + step.approach.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {step.time}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                </div>
                
                {/* Expansion Indicator */}
                <div className="text-muted-foreground">
                  {activeStep === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>
            </CardHeader>
            
            {/* Expanded Content */}
            {activeStep === index && (
              <CardContent className="pt-0">
                {/* Current Issues */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <h4 className="font-semibold text-red-700">Current Issues</h4>
                  </div>
                  <ul className="space-y-2">
                    {step.currentIssues.map((issue, issueIndex) => (
                      <li key={issueIndex} className="text-sm text-red-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Stack */}
                {step.technologyStack && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-4 h-4 text-blue-500" />
                      <h4 className="font-semibold">Technology Stack</h4>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h6 className="text-sm font-medium text-blue-600">Automation</h6>
                        <div className="flex flex-wrap gap-1">
                          {step.technologyStack.automation.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h6 className="text-sm font-medium text-purple-600">AI/ML</h6>
                        <div className="flex flex-wrap gap-1">
                          {step.technologyStack.ai.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h6 className="text-sm font-medium text-green-600">Integration</h6>
                        <div className="flex flex-wrap gap-1">
                          {step.technologyStack.integration.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs bg-green-100 text-green-700 hover:bg-green-200">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Improvement Achieved */}
                <div className="mb-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Improvement Achieved
                    </h5>
                    <p className="text-sm text-green-700">{step.improvement}</p>
                  </div>
                </div>

                {/* Gartner Value Exchange */}
                {step.gartnerValue && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Network className="w-4 h-4 text-genie-primary" />
                      <h4 className="font-semibold">Gartner Value Exchange</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                        <h6 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                          <ArrowRight className="w-4 h-4 rotate-180" />
                          Value Creation (Give)
                        </h6>
                        <ul className="space-y-2">
                          {step.gartnerValue.give.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-red-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h6 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                          <ArrowRight className="w-4 h-4" />
                          Value Realization (Get)
                        </h6>
                        <ul className="space-y-2">
                          {step.gartnerValue.get.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-green-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Strategy Reasoning */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="w-4 h-4 text-blue-600" />
                      <h5 className="font-semibold text-blue-800">Why Automation?</h5>
                    </div>
                    <p className="text-sm text-blue-700">{step.whyAutomation}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-600" />
                      <h5 className="font-semibold text-purple-800">Why AI?</h5>
                    </div>
                    <p className="text-sm text-purple-700">{step.whyAI}</p>
                  </div>
                </div>

                {/* Detailed Tasks */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Automation Tasks */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-blue-500" />
                      Automation Tasks
                    </h4>
                    <ul className="space-y-2">
                      {step.automationTasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* AI Tasks */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      AI Tasks
                    </h4>
                    <ul className="space-y-2">
                      {step.aiTasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Implementation Phases */}
                <div className="mb-4">
                  <h5 className="font-semibold mb-2">Implementation Phases</h5>
                  <ul className="space-y-1">
                    {step.phases.map((phase, phaseIndex) => (
                      <li key={phaseIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 mt-1 text-genie-primary flex-shrink-0" />
                        {phase}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};