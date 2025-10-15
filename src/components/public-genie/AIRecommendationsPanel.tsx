import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Info,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Suggestion {
  icon: string;
  title: string;
  description: string;
  action: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

interface AIRecommendationsPanelProps {
  recommendations: {
    suggestions: Suggestion[];
    nextSteps: string[];
    relatedQueries: string[];
    displayHints: Record<string, any>;
  };
  insights: {
    summary: string;
    keyPoints: string[];
    warnings: string[];
    opportunities: string[];
  };
  onActionClick?: (action: string) => void;
  onRelatedQueryClick?: (query: string) => void;
}

const iconMap: Record<string, any> = {
  'flask': Lightbulb,
  'pill': Target,
  'map-pin': Target,
  'activity': TrendingUp,
  'building': Target,
  'award': CheckCircle2,
  'building-2': Info,
  'zap': Zap,
  'trending-up': TrendingUp
};

const priorityColors = {
  urgent: 'destructive',
  high: 'default',
  medium: 'secondary',
  low: 'outline'
};

export const AIRecommendationsPanel: React.FC<AIRecommendationsPanelProps> = ({
  recommendations,
  insights,
  onActionClick,
  onRelatedQueryClick
}) => {
  return (
    <div className="space-y-4 p-4 bg-gradient-to-b from-primary/5 to-background rounded-lg">
      {/* AI Insights Summary */}
      {insights.summary && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <CardTitle className="text-base">AI Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{insights.summary}</p>
            
            {/* Key Points */}
            {insights.keyPoints.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Key Considerations
                </h4>
                <ul className="space-y-1">
                  {insights.keyPoints.map((point, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Warnings */}
            {insights.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-orange-500">
                  <AlertCircle className="h-4 w-4" />
                  Important Notices
                </h4>
                <ul className="space-y-1">
                  {insights.warnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-orange-600 dark:text-orange-400 flex items-start gap-2">
                      <span className="mt-0.5">⚠️</span>
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Opportunities */}
            {insights.opportunities.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-blue-500">
                  <TrendingUp className="h-4 w-4" />
                  Opportunities
                </h4>
                <ul className="space-y-1">
                  {insights.opportunities.map((opp, idx) => (
                    <li key={idx} className="text-sm text-blue-600 dark:text-blue-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">✨</span>
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Proactive Suggestions */}
      {recommendations.suggestions.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <CardTitle className="text-base">Smart Suggestions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.suggestions.map((suggestion, idx) => {
                const Icon = iconMap[suggestion.icon] || Target;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                      suggestion.priority === 'urgent' && "border-red-500/50 bg-red-50/50 dark:bg-red-950/20",
                      suggestion.priority === 'high' && "border-primary/50 bg-primary/5",
                      suggestion.priority === 'medium' && "border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/10",
                      suggestion.priority === 'low' && "border-border bg-muted/30"
                    )}
                    onClick={() => onActionClick?.(suggestion.action)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "p-2 rounded-lg",
                        suggestion.priority === 'urgent' && "bg-red-500/20",
                        suggestion.priority === 'high' && "bg-primary/20",
                        suggestion.priority === 'medium' && "bg-blue-500/20",
                        suggestion.priority === 'low' && "bg-muted"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold">{suggestion.title}</h4>
                          <Badge variant={priorityColors[suggestion.priority] as any} className="text-xs">
                            {suggestion.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Next Steps */}
      {recommendations.nextSteps.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {recommendations.nextSteps.map((step, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="font-semibold text-primary min-w-[20px]">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
      
      {/* Related Queries */}
      {recommendations.relatedQueries.length > 0 && (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">You Might Also Ask</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recommendations.relatedQueries.map((query, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => onRelatedQueryClick?.(query)}
                >
                  {query}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
