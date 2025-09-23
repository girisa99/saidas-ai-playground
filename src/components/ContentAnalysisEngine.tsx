import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  FileText, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  MapPin,
  GitBranch,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface ContentAnalysis {
  contentType: 'journey' | 'workflow' | 'infographic' | 'timeline' | 'comparison' | 'process';
  confidence: number;
  suggestedVisuals: string[];
  keyEntities: string[];
  actionItems: string[];
  visualComplexity: 'simple' | 'medium' | 'complex';
  recommendedTool: 'gamma' | 'canvas' | 'hybrid';
}

interface ContentAnalysisEngineProps {
  content: string;
  title?: string;
  onAnalysisComplete?: (analysis: ContentAnalysis) => void;
  autoAnalyze?: boolean;
}

export const ContentAnalysisEngine: React.FC<ContentAnalysisEngineProps> = ({
  content,
  title = '',
  onAnalysisComplete,
  autoAnalyze = false
}) => {
  const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const analyzeContent = async (text: string): Promise<ContentAnalysis> => {
    const words = text.toLowerCase();
    
    // Advanced content pattern detection
    const patterns = {
      journey: /\b(journey|path|roadmap|step|phase|stage|progression|evolution|transformation)\b/g,
      workflow: /\b(workflow|process|procedure|method|sequence|flow|operation|system)\b/g,
      infographic: /\b(overview|summary|statistics|data|metrics|comparison|versus|vs)\b/g,
      timeline: /\b(timeline|history|chronology|evolution|development|progression|milestones)\b/g,
      comparison: /\b(compare|versus|vs|difference|alternative|option|choice)\b/g,
      process: /\b(implementation|setup|configuration|installation|deployment|build)\b/g
    };

    const scores = Object.entries(patterns).map(([type, pattern]) => ({
      type: type as ContentAnalysis['contentType'],
      score: (words.match(pattern) || []).length
    }));

    const bestMatch = scores.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );

    // Extract key entities and action items
    const keyEntities = extractKeyEntities(text);
    const actionItems = extractActionItems(text);
    
    // Determine visual complexity
    const complexity = determineComplexity(text, keyEntities.length, actionItems.length);
    
    // Recommend tool based on complexity and content type
    const recommendedTool = recommendTool(bestMatch.type, complexity);

    return {
      contentType: bestMatch.type,
      confidence: Math.min(95, bestMatch.score * 15 + 35),
      suggestedVisuals: getSuggestedVisuals(bestMatch.type),
      keyEntities,
      actionItems,
      visualComplexity: complexity,
      recommendedTool
    };
  };

  const extractKeyEntities = (text: string): string[] => {
    const entities = [];
    const aiTerms = text.match(/\b(AI|artificial intelligence|machine learning|ML|automation|intelligent|smart|neural|algorithm)\b/gi);
    const techTerms = text.match(/\b(API|database|cloud|platform|framework|integration|deployment|development)\b/gi);
    const businessTerms = text.match(/\b(enterprise|business|organization|company|transformation|innovation|efficiency)\b/gi);
    
    if (aiTerms) entities.push(...aiTerms.slice(0, 3));
    if (techTerms) entities.push(...techTerms.slice(0, 3));
    if (businessTerms) entities.push(...businessTerms.slice(0, 3));
    
    return [...new Set(entities)].slice(0, 8);
  };

  const extractActionItems = (text: string): string[] => {
    const actionWords = text.match(/\b(implement|create|build|develop|deploy|configure|setup|integrate|analyze|optimize)\b/gi);
    return [...new Set(actionWords || [])].slice(0, 5);
  };

  const determineComplexity = (text: string, entitiesCount: number, actionsCount: number): 'simple' | 'medium' | 'complex' => {
    const wordCount = text.split(' ').length;
    const complexityScore = wordCount / 100 + entitiesCount * 2 + actionsCount * 3;
    
    if (complexityScore < 10) return 'simple';
    if (complexityScore < 25) return 'medium';
    return 'complex';
  };

  const recommendTool = (contentType: ContentAnalysis['contentType'], complexity: string): 'gamma' | 'canvas' | 'hybrid' => {
    if (complexity === 'simple' && ['infographic', 'comparison'].includes(contentType)) return 'gamma';
    if (complexity === 'complex' || ['workflow', 'process'].includes(contentType)) return 'canvas';
    return 'hybrid';
  };

  const getSuggestedVisuals = (type: ContentAnalysis['contentType']): string[] => {
    const visualMap = {
      journey: ['Customer Journey Map', 'User Flow Diagram', 'Experience Timeline', 'Touchpoint Visualization'],
      workflow: ['Process Flow Chart', 'Swimlane Diagram', 'BPMN Diagram', 'Decision Tree'],
      infographic: ['Data Visualization', 'Icon Grid', 'Statistics Dashboard', 'Comparison Chart'],
      timeline: ['Gantt Chart', 'Milestone Timeline', 'Historical Timeline', 'Project Roadmap'],
      comparison: ['Feature Matrix', 'Pros/Cons Chart', 'Side-by-side Comparison', 'Decision Matrix'],
      process: ['Step-by-step Guide', 'Implementation Flow', 'Setup Wizard', 'Configuration Map']
    };
    return visualMap[type] || [];
  };

  const runAnalysis = async () => {
    if (!content.trim()) {
      toast.error("Please provide content to analyze");
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      const result = await analyzeContent(content + ' ' + title);
      
      setProgress(100);
      setAnalysis(result);
      onAnalysisComplete?.(result);
      
      toast.success("Content analysis complete!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (autoAnalyze && content.trim()) {
      runAnalysis();
    }
  }, [content, autoAnalyze]);

  const getTypeIcon = (type: ContentAnalysis['contentType']) => {
    const icons = {
      journey: MapPin,
      workflow: GitBranch,
      infographic: BarChart3,
      timeline: TrendingUp,
      comparison: Users,
      process: Zap
    };
    return icons[type] || FileText;
  };

  const getComplexityColor = (complexity: string) => {
    const colors = {
      simple: 'bg-green-500',
      medium: 'bg-yellow-500',
      complex: 'bg-red-500'
    };
    return colors[complexity as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Intelligent Content Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis && !isAnalyzing && (
          <div className="text-center py-8">
            <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Ready to analyze your content and suggest optimal visual formats
            </p>
            <Button onClick={runAnalysis} disabled={!content.trim()}>
              <Zap className="w-4 h-4 mr-2" />
              Analyze Content
            </Button>
          </div>
        )}

        {isAnalyzing && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">Analyzing content patterns...</p>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {analysis && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {React.createElement(getTypeIcon(analysis.contentType), { 
                    className: "w-5 h-5 text-primary" 
                  })}
                  <span className="font-semibold capitalize">{analysis.contentType}</span>
                  <Badge variant="secondary">{analysis.confidence}% match</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Complexity:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getComplexityColor(analysis.visualComplexity)}`} />
                    <span className="text-sm capitalize">{analysis.visualComplexity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Recommended:</span>
                  <Badge variant="outline" className="capitalize">
                    {analysis.recommendedTool}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Suggested Visuals</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.suggestedVisuals.slice(0, 3).map((visual, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {visual}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {analysis.keyEntities.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Key Entities</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.keyEntities.map((entity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {analysis.actionItems.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Action Items</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.actionItems.map((action, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" className="flex-1">
                <ArrowRight className="w-4 h-4 mr-2" />
                Generate Visual
              </Button>
              <Button variant="outline" size="sm" onClick={runAnalysis}>
                Re-analyze
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};