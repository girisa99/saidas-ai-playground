import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, Zap, Split, TrendingUp, DollarSign, Clock } from 'lucide-react';

export const MultiModelGuide: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            Multi-Model Intelligence Guide
          </CardTitle>
          <CardDescription className="text-xs">
            Understanding how Split-Screen, Sequential Chaining, and Ensemble Voting work together
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Split-Screen Multi-Model */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Split className="h-4 w-4 text-blue-500" />
              <h4 className="text-xs font-semibold">1. Split-Screen Comparison</h4>
              <Badge variant="outline" className="text-[10px]">Multi Mode</Badge>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-[10px] text-muted-foreground">
                <strong>When:</strong> You select "Multi" mode + enable "Split-Screen"
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>What:</strong> Both models respond to your query simultaneously
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Display:</strong> Side-by-side comparison of responses
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Use case:</strong> Compare different models' perspectives on the same question
              </p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="text-[9px] h-5">
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  ~4s
                </Badge>
                <Badge variant="secondary" className="text-[9px] h-5">
                  <DollarSign className="h-2.5 w-2.5 mr-1" />
                  $0.04
                </Badge>
              </div>
            </div>
          </div>

          {/* Sequential Chaining */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <h4 className="text-xs font-semibold">2. Sequential Chaining</h4>
              <Badge variant="outline" className="text-[10px]">Multi-Agent</Badge>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-[10px] text-muted-foreground">
                <strong>When:</strong> Enable "Multi-Agent" + healthcare queries + high complexity
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>What:</strong> Specialist model analyzes → Generalist explains findings
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Display:</strong> Single synthesized response (not split-screen)
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Use case:</strong> Medical analysis that needs expert insight + patient-friendly explanation
              </p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="text-[9px] h-5">
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  ~4s
                </Badge>
                <Badge variant="secondary" className="text-[9px] h-5">
                  <DollarSign className="h-2.5 w-2.5 mr-1" />
                  $0.03
                </Badge>
              </div>
            </div>
          </div>

          {/* Ensemble Voting */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <h4 className="text-xs font-semibold">3. Ensemble Voting</h4>
              <Badge variant="outline" className="text-[10px]">Multi-Agent</Badge>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-[10px] text-muted-foreground">
                <strong>When:</strong> Enable "Multi-Agent" + critical urgency detected
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>What:</strong> 3 specialist models analyze in parallel → Synthesizer combines insights
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Display:</strong> Single consensus response with confidence scores
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Use case:</strong> Critical medical decisions requiring multiple expert opinions
              </p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="text-[9px] h-5">
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  ~5s
                </Badge>
                <Badge variant="secondary" className="text-[9px] h-5">
                  <DollarSign className="h-2.5 w-2.5 mr-1" />
                  $0.07
                </Badge>
              </div>
            </div>
          </div>

          {/* Smart Routing */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <h4 className="text-xs font-semibold">4. Smart Routing (Auto)</h4>
              <Badge variant="outline" className="text-[10px]">Always Active</Badge>
            </div>
            <div className="ml-6 space-y-1">
              <p className="text-[10px] text-muted-foreground">
                <strong>When:</strong> All modes, every query
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>What:</strong> SLM triages query → Routes to best model based on complexity
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Display:</strong> Normal response (routing is invisible)
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Use case:</strong> Cost optimization - uses cheap SLM for simple queries, LLM for complex
              </p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary" className="text-[9px] h-5">
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  0.2s-2s
                </Badge>
                <Badge variant="secondary" className="text-[9px] h-5">
                  <DollarSign className="h-2.5 w-2.5 mr-1" />
                  $0.0001-$0.02
                </Badge>
              </div>
            </div>
          </div>

          {/* Decision Matrix */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg space-y-2">
            <h4 className="text-xs font-semibold mb-2">🎯 Decision Flow</h4>
            <div className="space-y-1 text-[10px]">
              <p className="font-mono">
                <span className="text-blue-500">mode: 'multi'</span> + 
                <span className="text-blue-500"> splitScreen: true</span> 
                → Split-Screen Comparison
              </p>
              <p className="font-mono">
                <span className="text-green-500">multiAgent: true</span> + 
                <span className="text-green-500"> healthcare + high complexity</span> 
                → Sequential Chaining
              </p>
              <p className="font-mono">
                <span className="text-purple-500">multiAgent: true</span> + 
                <span className="text-purple-500"> critical urgency</span> 
                → Ensemble Voting
              </p>
              <p className="font-mono">
                <span className="text-yellow-500">All other queries</span> 
                → Smart Routing (SLM triage)
              </p>
            </div>
          </div>

          {/* Integration Points */}
          <div className="mt-4 p-3 bg-primary/5 rounded-lg space-y-2">
            <h4 className="text-xs font-semibold mb-2">🔗 How They Connect</h4>
            <div className="space-y-1.5 text-[10px]">
              <div>
                <strong>useUniversalAI:</strong> Sends mode + enableMultiAgent flags
              </div>
              <div>
                <strong>ai-universal-processor:</strong> Routes to appropriate strategy
              </div>
              <div>
                <strong>multiAgentService:</strong> Orchestrates collaboration
              </div>
              <div>
                <strong>SplitScreenRenderer:</strong> Displays side-by-side results
              </div>
              <div>
                <strong>modelRouter:</strong> Selects best models via triage
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
