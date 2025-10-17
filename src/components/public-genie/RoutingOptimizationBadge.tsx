import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Brain, ChevronDown, ChevronUp, Zap, DollarSign, Clock, Users, TrendingUp, Target, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
  // Enhanced metrics
  estimatedCostDollars?: number;
  estimatedTimeSec?: number;
  accuracyConfidence?: number;
  qualityTier?: 'enterprise' | 'professional' | 'standard' | 'fast';
  qualityDescription?: string;
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
            {/* Tier 1: Always Visible - Concise Summary */}
            {smartRoutingOptimization?.override && (
              <div className="p-2.5 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/30">
                <div className="flex items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-1.5 flex-1">
                    <Zap className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-semibold text-emerald-900 dark:text-emerald-100">Optimized:</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400 truncate">
                      {smartRoutingOptimization.userSelectedModel}
                    </span>
                    <span>→</span>
                    <span className="font-mono text-green-700 dark:text-green-400 truncate">
                      {smartRoutingOptimization.optimizedModel}
                    </span>
                  </div>
                </div>
                
                {/* Quick metrics row */}
                <div className="flex items-center gap-3 mt-2 text-[10px] flex-wrap">
                  {smartRoutingOptimization.estimatedCostDollars !== undefined && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-semibold">
                        ${smartRoutingOptimization.estimatedCostDollars.toFixed(3)}
                      </span>
                    </div>
                  )}
                  
                  {smartRoutingOptimization.estimatedTimeSec !== undefined && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-blue-600" />
                      <span className="font-semibold">
                        ~{smartRoutingOptimization.estimatedTimeSec.toFixed(1)}s
                      </span>
                    </div>
                  )}
                  
                  {smartRoutingOptimization.accuracyConfidence !== undefined && (
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-purple-600" />
                      <span className="font-semibold">
                        {smartRoutingOptimization.accuracyConfidence}% accurate
                      </span>
                    </div>
                  )}
                  
                  {smartRoutingOptimization.qualityTier && (
                    <Badge 
                      variant="outline" 
                      className={`text-[9px] h-4 px-1.5 ${
                        smartRoutingOptimization.qualityTier === 'enterprise' ? 'border-purple-500 text-purple-700 bg-purple-50 dark:bg-purple-950' :
                        smartRoutingOptimization.qualityTier === 'professional' ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-950' :
                        smartRoutingOptimization.qualityTier === 'standard' ? 'border-green-500 text-green-700 bg-green-50 dark:bg-green-950' :
                        'border-yellow-500 text-yellow-700 bg-yellow-50 dark:bg-yellow-950'
                      }`}
                    >
                      {smartRoutingOptimization.qualityTier === 'enterprise' ? '🏆' : 
                       smartRoutingOptimization.qualityTier === 'professional' ? '💼' :
                       smartRoutingOptimization.qualityTier === 'standard' ? '⚡' : '🚀'} 
                      {smartRoutingOptimization.qualityTier}
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            {/* Tier 2: Expandable Details */}
            {smartRoutingOptimization?.override && (
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-[10px] h-6 text-muted-foreground hover:text-foreground"
                  >
                    <Info className="h-3 w-3 mr-1" />
                    View optimization details
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-2 mt-2">
                  {/* Why section */}
                  <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                    <p className="text-[9px] font-semibold text-blue-600 uppercase tracking-wide mb-1">💡 Why</p>
                    <p className="text-[10px] text-muted-foreground">
                      {smartRoutingOptimization.reason}
                    </p>
                  </div>
                  
                  {/* Impact section */}
                  {(smartRoutingOptimization.costSavingsPercent !== 0 || smartRoutingOptimization.latencySavingsPercent !== 0) && (
                    <div className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
                      <p className="text-[9px] font-semibold text-amber-600 uppercase tracking-wide mb-1">📊 Impact</p>
                      <div className="flex flex-wrap gap-2">
                        {smartRoutingOptimization.costSavingsPercent !== 0 && (
                          <div className="text-[10px]">
                            <span className="font-semibold">Cost:</span>
                            <span className={`ml-1 ${smartRoutingOptimization.costSavingsPercent > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                              {smartRoutingOptimization.costSavingsPercent > 0 ? '↓' : '↑'}
                              {Math.abs(smartRoutingOptimization.costSavingsPercent)}%
                              {smartRoutingOptimization.costSavingsPercent < 0 && ' (justified for accuracy)'}
                            </span>
                          </div>
                        )}
                        
                        {smartRoutingOptimization.latencySavingsPercent !== 0 && (
                          <div className="text-[10px]">
                            <span className="font-semibold">Speed:</span>
                            <span className={`ml-1 ${smartRoutingOptimization.latencySavingsPercent > 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                              {smartRoutingOptimization.latencySavingsPercent > 0 ? '↑' : '↓'}
                              {Math.abs(smartRoutingOptimization.latencySavingsPercent)}%
                              {smartRoutingOptimization.latencySavingsPercent < 0 && ' (justified for complexity)'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Quality section */}
                  {smartRoutingOptimization.qualityDescription && (
                    <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                      <p className="text-[9px] font-semibold text-purple-600 uppercase tracking-wide mb-1">🎯 Quality</p>
                      <p className="text-[10px] text-muted-foreground">
                        {smartRoutingOptimization.qualityDescription}
                      </p>
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            )}
            
            {/* Tier 3: Advanced Insights Modal */}
            {smartRoutingOptimization?.override && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-[10px] h-6 border-dashed"
                  >
                    <Brain className="h-3 w-3 mr-1" />
                    Compare models in detail
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-base">Model Comparison Analysis</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {/* User's choice - calculate dynamically */}
                      {(() => {
                        // Calculate metrics for user's original selection (before override)
                        const userCost = smartRoutingOptimization.estimatedCostDollars && smartRoutingOptimization.costSavingsPercent 
                          ? smartRoutingOptimization.estimatedCostDollars / (1 - (smartRoutingOptimization.costSavingsPercent / 100))
                          : 0.020;
                        const userTime = smartRoutingOptimization.estimatedTimeSec && smartRoutingOptimization.latencySavingsPercent
                          ? smartRoutingOptimization.estimatedTimeSec / (1 - (smartRoutingOptimization.latencySavingsPercent / 100))
                          : 1.2;
                        // Estimate user model quality (typically lower tier than optimized)
                        const userQuality = smartRoutingOptimization.qualityTier === 'enterprise' ? 88 :
                                           smartRoutingOptimization.qualityTier === 'professional' ? 82 : 76;
                        
                        return (
                          <div className="p-3 bg-muted rounded-lg border">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Your Selection</p>
                            <p className="font-mono text-sm font-bold mb-3">{smartRoutingOptimization.userSelectedModel}</p>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Estimated Cost:</span>
                                <span className="font-semibold">${userCost.toFixed(3)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Response Time:</span>
                                <span className="font-semibold">~{userTime.toFixed(1)}s</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Accuracy:</span>
                                <span className="font-semibold">{userQuality}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Best For:</span>
                                <span className="text-xs">General queries</span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                      
                      {/* AI's choice - fully dynamic */}
                      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <p className="text-xs font-semibold text-green-600 mb-2">AI Optimization ✓</p>
                        <p className="font-mono text-sm font-bold mb-3">{smartRoutingOptimization.optimizedModel}</p>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Estimated Cost:</span>
                            <span className="font-semibold">
                              ${smartRoutingOptimization.estimatedCostDollars?.toFixed(3)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Response Time:</span>
                            <span className="font-semibold">
                              ~{smartRoutingOptimization.estimatedTimeSec?.toFixed(1)}s
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Accuracy:</span>
                            <span className="font-semibold text-green-600">
                              {smartRoutingOptimization.accuracyConfidence}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Best For:</span>
                            <span className="text-xs capitalize">
                              {smartRoutingOptimization.domain || 'General'}, {smartRoutingOptimization.complexity || 'Medium'} queries
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-xs font-semibold text-blue-600 mb-2">🧠 Why This Matters</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {smartRoutingOptimization.reason} The AI selected a model specialized for your query type, 
                        optimizing for {smartRoutingOptimization.qualityTier === 'enterprise' ? 'maximum accuracy and reliability' : 
                        smartRoutingOptimization.qualityTier === 'professional' ? 'balanced performance and cost' :
                        'speed and efficiency'} in the <strong>{smartRoutingOptimization.domain || 'general'}</strong> domain.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
