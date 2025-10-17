/**
 * Model Router - Intelligent Model Selection
 * 
 * Determines optimal AI model based on triage results and user preferences.
 * Balances cost, speed, and accuracy while respecting user choices.
 * 
 * Part of: Role-Based Specialization (Phase 2)
 * Docs: docs/ROLE_BASED_SPECIALIZATION_IMPLEMENTATION.md
 */

import type { TriageResult } from '@/services/aiTriageService';
import type { AIConfig } from '@/components/public-genie/AdvancedAISettings';

export interface ModelSelection {
  model: string;
  provider: 'openai' | 'claude' | 'gemini'; // Direct API providers
  reasoning: string;
  estimatedCost: number; // in dollars
  estimatedLatency: number; // in milliseconds
  usedTriage: boolean;
}

/**
 * Select best model based on triage and user config
 */
export function selectBestModel(
  triage: TriageResult,
  userConfig: AIConfig,
  enableSmartRouting: boolean = true
): ModelSelection {
  // RULE 1: ALWAYS respect explicit user model selection in SINGLE mode
  if (userConfig.mode === 'single' && userConfig.selectedModel !== 'auto') {
    const provider = getProviderForModel(userConfig.selectedModel);
    return {
      model: userConfig.selectedModel,
      provider,
      reasoning: 'User explicitly selected this model in Single mode',
      estimatedCost: getModelCost(userConfig.selectedModel),
      estimatedLatency: getModelLatency(userConfig.selectedModel),
      usedTriage: false
    };
  }
  
  // RULE 2: If smart routing disabled, use user's selected model
  if (!enableSmartRouting || userConfig.selectedModel === 'user-choice-only') {
    const model = userConfig.selectedModel || 'google/gemini-2.5-flash';
    const provider = getProviderForModel(model);
    return {
      model,
      provider,
      reasoning: 'Smart routing disabled - using user preference',
      estimatedCost: getModelCost(model),
      estimatedLatency: getModelLatency(model),
      usedTriage: false
    };
  }
  
  // RULE 3: Critical urgency always uses best model
  if (triage.urgency === 'critical') {
    const model = triage.requires_vision 
      ? 'google/gemini-2.5-pro' 
      : 'openai/gpt-5';
    const provider = getProviderForModel(model);
    
    return {
      model,
      provider,
      reasoning: 'CRITICAL urgency detected - using most capable model',
      estimatedCost: getModelCost(model),
      estimatedLatency: getModelLatency(model),
      usedTriage: true
    };
  }
  
  // RULE 4: Use suggested model from triage for DEFAULT/MULTI modes
  if (userConfig.mode === 'default' || userConfig.mode === 'multi') {
    // For simple queries, use fast SLM
    if (triage.complexity === 'simple' && triage.confidence > 0.8) {
      return {
        model: 'google/gemini-2.5-flash-lite',
        provider: 'gemini',
        reasoning: `Simple query detected (confidence: ${(triage.confidence * 100).toFixed(0)}%) - using fast SLM for cost/speed`,
        estimatedCost: 0.0001,
        estimatedLatency: 200,
        usedTriage: true
      };
    }
    
    // For medium/high complexity, use triage suggestion
    const provider = getProviderForModel(triage.suggested_model);
    return {
      model: triage.suggested_model,
      provider,
      reasoning: `Triage recommended ${triage.suggested_model} for ${triage.complexity} complexity ${triage.domain} query`,
      estimatedCost: getModelCost(triage.suggested_model),
      estimatedLatency: getModelLatency(triage.suggested_model),
      usedTriage: true
    };
  }
  
  // FALLBACK: Use user's selected model with triage enhancement
  const model = userConfig.selectedModel || 'google/gemini-2.5-flash';
  const provider = getProviderForModel(model);
  return {
    model,
    provider,
    reasoning: 'Using user-selected model with triage-enhanced prompt',
    estimatedCost: getModelCost(model),
    estimatedLatency: getModelLatency(model),
    usedTriage: true
  };
}

/**
 * Determine provider for a given model
 */
function getProviderForModel(model: string): 'openai' | 'claude' | 'gemini' {
  const lower = model.toLowerCase();
  if (lower.includes('gpt') || lower.includes('openai')) return 'openai';
  if (lower.includes('claude')) return 'claude';
  return 'gemini'; // default to Gemini
}

/**
 * Get estimated cost per request for a model
 * (Approximate values for tracking purposes)
 */
function getModelCost(model?: string): number {
  const costs: Record<string, number> = {
    'google/gemini-2.5-pro': 0.02,
    'google/gemini-2.5-flash': 0.01,
    'google/gemini-2.5-flash-lite': 0.0001,
    'openai/gpt-5': 0.02,
    'openai/gpt-5-mini': 0.01,
    'openai/gpt-5-nano': 0.001,
    'gpt-4o': 0.015,
    'gpt-4o-mini': 0.005,
    'claude-3-opus': 0.025,
    'claude-3-sonnet': 0.015,
    'claude-3-haiku': 0.005,
  };
  
  return costs[model || 'google/gemini-2.5-flash'] || 0.01;
}

/**
 * Get estimated latency for a model (in ms)
 */
function getModelLatency(model?: string): number {
  const latencies: Record<string, number> = {
    'google/gemini-2.5-pro': 2500,
    'google/gemini-2.5-flash': 1200,
    'google/gemini-2.5-flash-lite': 200,
    'openai/gpt-5': 2000,
    'openai/gpt-5-mini': 1000,
    'openai/gpt-5-nano': 400,
    'gpt-4o': 1800,
    'gpt-4o-mini': 800,
    'claude-3-opus': 2500,
    'claude-3-sonnet': 1500,
    'claude-3-haiku': 500,
  };
  
  return latencies[model || 'google/gemini-2.5-flash'] || 1500;
}

/**
 * Calculate potential cost savings from smart routing
 */
export function calculateSavings(
  triageUsed: boolean,
  selectedModel: ModelSelection,
  userConfiguredModel: string
): {
  saved: number;
  savedPercent: number;
  message: string;
} {
  if (!triageUsed) {
    return {
      saved: 0,
      savedPercent: 0,
      message: 'Smart routing not used'
    };
  }
  
  const configuredCost = getModelCost(userConfiguredModel);
  const actualCost = selectedModel.estimatedCost;
  const saved = configuredCost - actualCost;
  const savedPercent = (saved / configuredCost) * 100;
  
  if (saved > 0) {
    return {
      saved,
      savedPercent,
      message: `Saved ${savedPercent.toFixed(0)}% by using ${selectedModel.model} instead of ${userConfiguredModel}`
    };
  }
  
  return {
    saved: 0,
    savedPercent: 0,
    message: 'Using optimal model for quality'
  };
}
