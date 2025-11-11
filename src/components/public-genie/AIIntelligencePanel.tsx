import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Gauge, Coins, TrendingUp } from 'lucide-react';
import {
  getQueryAnalysisHistory,
  getConfidenceScores,
  getTokenBudget,
  QueryAnalysis,
  ResponseConfidence,
  TokenBudget,
} from '@/services/aiIntelligenceService';

interface AIIntelligencePanelProps {
  conversationId: string;
  className?: string;
}

export const AIIntelligencePanel: React.FC<AIIntelligencePanelProps> = ({
  conversationId,
  className,
}) => {
  const [queryHistory, setQueryHistory] = useState<QueryAnalysis[]>([]);
  const [confidenceScores, setConfidenceScores] = useState<ResponseConfidence[]>([]);
  const [tokenBudget, setTokenBudget] = useState<TokenBudget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [queries, scores, budget] = await Promise.all([
          getQueryAnalysisHistory(conversationId),
          getConfidenceScores(conversationId),
          getTokenBudget(conversationId),
        ]);

        setQueryHistory(queries);
        setConfidenceScores(scores);
        setTokenBudget(budget);
      } catch (error) {
        console.error('Error loading AI intelligence data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [conversationId]);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading intelligence data...</p>
        </CardContent>
      </Card>
    );
  }

  const avgConfidence =
    confidenceScores.reduce((sum, s) => sum + s.confidence_score, 0) /
      (confidenceScores.length || 1) || 0;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Intelligence Metrics
        </CardTitle>
        <CardDescription>
          Advanced analytics for query analysis, confidence scoring, and token usage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="confidence">Confidence</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Gauge className="w-4 h-4 text-primary" />
                  Avg. Confidence
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={avgConfidence * 100} className="flex-1" />
                  <span className="text-sm font-bold">{(avgConfidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Coins className="w-4 h-4 text-primary" />
                  Token Budget
                </div>
                {tokenBudget ? (
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(tokenBudget.used_tokens / tokenBudget.allocated_tokens) * 100}
                      className="flex-1"
                    />
                    <span className="text-sm font-bold">
                      {tokenBudget.remaining_tokens} left
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No budget set</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recent Queries ({queryHistory.length})
              </h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {queryHistory.slice(0, 5).map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex-1 truncate text-sm">
                      {query.query_text.substring(0, 60)}...
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {query.detected_domain}
                      </Badge>
                      <Badge
                        variant={
                          query.complexity_score < 0.4
                            ? 'default'
                            : query.complexity_score < 0.7
                            ? 'secondary'
                            : 'destructive'
                        }
                        className="text-xs"
                      >
                        {query.complexity_score < 0.4
                          ? 'Simple'
                          : query.complexity_score < 0.7
                          ? 'Medium'
                          : 'Complex'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="queries" className="space-y-3">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {queryHistory.map((query, index) => (
                <Card key={query.id}>
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <p className="text-sm flex-1">{query.query_text}</p>
                      <span className="text-xs text-muted-foreground ml-2">
                        #{queryHistory.length - index}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        Domain: {query.detected_domain}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Intent: {query.detected_intent}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Model: {query.recommended_model}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Est. tokens: {query.token_estimate}
                      </Badge>
                    </div>
                    {query.requires_rag && (
                      <Badge variant="secondary" className="text-xs">
                        RAG Enhanced
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="confidence" className="space-y-3">
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {confidenceScores.map((score) => (
                <Card key={score.id}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Message #{score.message_index + 1}</span>
                      <Badge
                        variant={
                          score.confidence_score >= 0.8
                            ? 'default'
                            : score.confidence_score >= 0.6
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {(score.confidence_score * 100).toFixed(0)}% confident
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Reasoning</span>
                          <span className="font-medium">
                            {(score.reasoning_quality * 100).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={score.reasoning_quality * 100} className="h-1" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Accuracy</span>
                          <span className="font-medium">
                            {(score.factual_accuracy * 100).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={score.factual_accuracy * 100} className="h-1" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Completeness</span>
                          <span className="font-medium">
                            {(score.completeness_score * 100).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={score.completeness_score * 100} className="h-1" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Model</span>
                          <span className="font-medium">{score.model_used}</span>
                        </div>
                      </div>
                    </div>

                    {score.sources_used && (
                      <div className="flex gap-2 text-xs">
                        {score.sources_used.rag && <Badge variant="outline">RAG</Badge>}
                        {score.sources_used.mcp && <Badge variant="outline">MCP</Badge>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tokens" className="space-y-4">
            {tokenBudget ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Allocated</span>
                    <span className="text-sm font-bold">{tokenBudget.allocated_tokens}</span>
                  </div>
                  <Progress
                    value={(tokenBudget.used_tokens / tokenBudget.allocated_tokens) * 100}
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Used: {tokenBudget.used_tokens}</span>
                    <span>Remaining: {tokenBudget.remaining_tokens}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold">
                        {((tokenBudget.used_tokens / tokenBudget.allocated_tokens) * 100).toFixed(
                          1
                        )}
                        %
                      </div>
                      <p className="text-xs text-muted-foreground">Usage Rate</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold">{tokenBudget.budget_period}</div>
                      <p className="text-xs text-muted-foreground">Budget Period</p>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(tokenBudget.updated_at).toLocaleString()}
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <Coins className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No token budget configured</p>
                <p className="text-xs text-muted-foreground mt-1">
                  A budget will be created automatically when you send messages
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
