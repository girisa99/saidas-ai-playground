import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown, ChevronUp, Zap, DollarSign, Clock, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TriageData {
  complexity?: 'simple' | 'medium' | 'high';
  domain?: 'healthcare' | 'technology' | 'general';
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  best_format?: 'text' | 'table' | 'html' | 'list' | 'map';
  emotional_tone?: 'empathetic' | 'professional' | 'playful';
  reasoning?: string;
  confidence?: number;
  requires_vision?: boolean;
}

interface SmartRoutingOptimization {
  override: boolean;
  userSelectedModel: string;
  optimizedModel: string;
  reason: string;
  costSavingsPercent: number;
  latencySavingsPercent: number;
  complexity?: string;
  domain?: string;
  urgency?: string;
}

interface RoutingOptimizationBadgeProps {
  triageData?: TriageData;
  routingReasoning?: string;
  estimatedCost?: number;
  estimatedLatency?: number;
  modelUsed?: string;
  collaborationMode?: 'single' | 'sequential' | 'ensemble';
  agentCount?: number;
  consensusScore?: number;
  smartRoutingOptimization?: SmartRoutingOptimization;
}

export const RoutingOptimizationBadge: React.FC<RoutingOptimizationBadgeProps> = ({
  triageData,
  routingReasoning,
  estimatedCost,
  estimatedLatency,
  modelUsed,
  collaborationMode,
  agentCount,
  consensusScore,
  smartRoutingOptimization
}) => {
  const [isOpen, setIsOpen] = useState(smartRoutingOptimization?.override ? true : false);

  if (!triageData && !collaborationMode && !smartRoutingOptimization) return null;

  const complexityColors = {
    simple: 'bg-green-500/10 text-green-600 border-green-500/20',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    high: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
  };

  const urgencyColors = {
    low: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    high: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    critical: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  const formatEmojis: Record<string, string> = {
    table: '📊',
    html: '🌐',
    text: '📝',
    list: '📋',
    image: '🖼️',
    map: '🗺️'
  };

  const toneEmojis: Record<string, string> = {
    empathetic: '💙',
    professional: '💼',
    playful: '✨'
  };

  const modeIcons = {
    single: <Brain className="h-3 w-3" />,
    sequential: <TrendingUp className="h-3 w-3" />,
    ensemble: <Users className="h-3 w-3" />
  };

  const modeLabels = {
    single: 'Single Model',
    sequential: 'Sequential Chain',
    ensemble: 'Ensemble Voting'
  };

  return (
    <Card className="border-primary/20 bg-primary/5 mt-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-3 hover:bg-primary/10"
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Smart Routing Optimization</span>
              {collaborationMode && collaborationMode !== 'single' && (
                <Badge variant="secondary" className="ml-2 text-[10px] h-5">
                  {modeIcons[collaborationMode]}
                  <span className="ml-1">{modeLabels[collaborationMode]}</span>
                </Badge>
              )}
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 pb-3 px-3 space-y-3">
            {/* Smart Routing Override Alert */}
            {smartRoutingOptimization?.override && (
              <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/30">
                <div className="flex items-start gap-2 mb-2">
                  <Zap className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-green-700">Smart Routing Optimized Your Query</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Your selection: <span className="font-mono text-orange-600">{smartRoutingOptimization.userSelectedModel}</span>
                      {' → '}
                      AI recommendation: <span className="font-mono text-green-600">{smartRoutingOptimization.optimizedModel}</span>
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {smartRoutingOptimization.costSavingsPercent !== 0 && (
                    <div className="flex items-center gap-1 text-[10px]">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-semibold">
                        {smartRoutingOptimization.costSavingsPercent > 0 ? '↓' : '↑'}
                        {Math.abs(smartRoutingOptimization.costSavingsPercent)}% cost
                      </span>
                    </div>
                  )}
                  
                  {smartRoutingOptimization.latencySavingsPercent !== 0 && (
                    <div className="flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="font-semibold">
                        {smartRoutingOptimization.latencySavingsPercent > 0 ? '↓' : '↑'}
                        {Math.abs(smartRoutingOptimization.latencySavingsPercent)}% faster
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-[10px] text-muted-foreground italic mt-2">
                  💡 <span className="font-medium">Why:</span> {smartRoutingOptimization.reason}
                </p>
              </div>
            )}
            
            {/* Quick Stats Row */}
            <div className="flex flex-wrap gap-2">
              {triageData?.complexity && (
                <Badge className={`text-[10px] h-6 ${complexityColors[triageData.complexity]}`}>
                  <Brain className="h-2.5 w-2.5 mr-1" />
                  {triageData.complexity}
                </Badge>
              )}
              
              {triageData?.urgency && (
                <Badge className={`text-[10px] h-6 ${urgencyColors[triageData.urgency]}`}>
                  <Zap className="h-2.5 w-2.5 mr-1" />
                  {triageData.urgency}
                </Badge>
              )}
              
              {triageData?.domain && (
                <Badge variant="outline" className="text-[10px] h-6">
                  {triageData.domain === 'healthcare' ? '🏥' : triageData.domain === 'technology' ? '💻' : '🌐'}
                  <span className="ml-1">{triageData.domain}</span>
                </Badge>
              )}
              
              {estimatedCost !== undefined && (
                <Badge variant="outline" className="text-[10px] h-6">
                  <DollarSign className="h-2.5 w-2.5 mr-0.5" />
                  ${estimatedCost.toFixed(4)}
                </Badge>
              )}
              
              {estimatedLatency !== undefined && (
                <Badge variant="outline" className="text-[10px] h-6">
                  <Clock className="h-2.5 w-2.5 mr-1" />
                  {estimatedLatency < 1000 ? `${estimatedLatency}ms` : `${(estimatedLatency / 1000).toFixed(1)}s`}
                </Badge>
              )}
            </div>

            {/* Multi-Agent Info */}
            {collaborationMode && collaborationMode !== 'single' && (
              <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1">
                  {modeIcons[collaborationMode]}
                  <span className="text-xs font-semibold text-purple-600">
                    {modeLabels[collaborationMode]} Active
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground space-y-0.5">
                  {agentCount && <p>• {agentCount} specialist model{agentCount > 1 ? 's' : ''} analyzed your query</p>}
                  {consensusScore !== undefined && (
                    <p>• Consensus Score: {Math.round(consensusScore * 100)}%</p>
                  )}
                  {collaborationMode === 'sequential' && (
                    <p>• Specialist analyzed → Generalist explained</p>
                  )}
                  {collaborationMode === 'ensemble' && (
                    <p>• Multiple experts voted → Synthesizer combined insights</p>
                  )}
                </div>
              </div>
            )}

            {/* Format & Tone */}
            {(triageData?.best_format || triageData?.emotional_tone) && (
              <div className="flex gap-2">
                {triageData.best_format && (
                  <div className="flex-1 p-2 bg-muted/50 rounded text-[10px]">
                    <span className="font-medium">Format:</span>
                    <span className="ml-1">
                      {formatEmojis[triageData.best_format]} {triageData.best_format}
                      {triageData.best_format === 'map' && ' (Interactive Treatment Centers)'}
                    </span>
                  </div>
                )}
                
                {triageData.emotional_tone && (
                  <div className="flex-1 p-2 bg-muted/50 rounded text-[10px]">
                    <span className="font-medium">Tone:</span>
                    <span className="ml-1">{toneEmojis[triageData.emotional_tone]} {triageData.emotional_tone}</span>
                  </div>
                )}
              </div>
            )}

            {/* Model Used */}
            {modelUsed && (
              <div className="p-2 bg-muted/50 rounded text-[10px]">
                <span className="font-medium">Model Selected:</span>
                <span className="ml-1 font-mono">{modelUsed}</span>
              </div>
            )}

            {/* Reasoning */}
            {(triageData?.reasoning || routingReasoning) && (
              <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                <p className="text-xs font-semibold text-blue-600 mb-1">💡 Routing Reasoning</p>
                <p className="text-[10px] text-muted-foreground italic">
                  {triageData?.reasoning || routingReasoning}
                </p>
              </div>
            )}

            {/* Confidence */}
            {triageData?.confidence !== undefined && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">AI Confidence:</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all"
                    style={{ width: `${triageData.confidence * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium">
                  {Math.round(triageData.confidence * 100)}%
                </span>
              </div>
            )}

            {/* Vision Indicator */}
            {triageData?.requires_vision && (
              <Badge variant="outline" className="text-[10px] h-6">
                👁️ Vision Analysis Enabled
              </Badge>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
