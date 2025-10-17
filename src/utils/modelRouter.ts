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
  
  // RULE 2: If smart routing disabled, use user's selected model OR best available
  if (!enableSmartRouting || userConfig.selectedModel === 'user-choice-only') {
    // If no model selected, use triage to pick best instead of defaulting
    const model = userConfig.selectedModel || triage.suggested_model;
    const provider = getProviderForModel(model);
    return {
      model,
      provider,
      reasoning: userConfig.selectedModel 
        ? 'Smart routing disabled - using user preference'
        : 'No model selected - using triage-recommended model',
      estimatedCost: getModelCost(model),
      estimatedLatency: getModelLatency(model),
      usedTriage: !userConfig.selectedModel
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
    // Always use triage suggested model for optimal routing
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
  
  // FALLBACK: Use triage-suggested model as intelligent default
  const model = userConfig.selectedModel || triage.suggested_model;
  const provider = getProviderForModel(model);
  return {
    model,
    provider,
    reasoning: userConfig.selectedModel 
      ? 'Using user-selected model with triage-enhanced prompt'
      : 'Using triage-recommended model as intelligent fallback',
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
  if (lower.includes('claude') || lower.includes('anthropic')) return 'claude';
  if (lower.includes('gemini') || lower.includes('google')) return 'gemini';
  
  // No hardcoded default - throw error if provider unknown
  throw new Error(`Unable to determine provider for model: ${model}`);
}

/**
 * Get estimated cost per request for a model
 * (Approximate values for tracking purposes)
 */
function getModelCost(model?: string): number {
  const costs: Record<string, number> = {
    // Gemini models
    'google/gemini-2.5-pro': 0.02,
    'google/gemini-2.5-flash': 0.01,
    'google/gemini-2.5-flash-lite': 0.0001,
    'gemini-2.0-flash-exp': 0.01,
    'gemini-1.5-flash-8b': 0.0001,
    // OpenAI models
    'openai/gpt-5': 0.02,
    'openai/gpt-5-mini': 0.01,
    'openai/gpt-5-nano': 0.001,
    'gpt-5-2025-08-07': 0.02,
    'gpt-5-mini-2025-08-07': 0.01,
    'gpt-4o': 0.015,
    'gpt-4o-mini': 0.005,
    // Claude models
    'claude-sonnet-4-5': 0.025,
    'claude-3-opus': 0.025,
    'claude-3-sonnet': 0.015,
    'claude-3-haiku': 0.005,
  };
  
  // No hardcoded default - return average if unknown
  return costs[model || ''] || 0.01;
}

/**
 * Get estimated latency for a model (in ms)
 */
function getModelLatency(model?: string): number {
  const latencies: Record<string, number> = {
    // Gemini models
    'google/gemini-2.5-pro': 2500,
    'google/gemini-2.5-flash': 1200,
    'google/gemini-2.5-flash-lite': 200,
    'gemini-2.0-flash-exp': 1200,
    'gemini-1.5-flash-8b': 400,
    // OpenAI models
    'openai/gpt-5': 2000,
    'openai/gpt-5-mini': 1000,
    'openai/gpt-5-nano': 400,
    'gpt-5-2025-08-07': 2000,
    'gpt-5-mini-2025-08-07': 1000,
    'gpt-4o': 1800,
    'gpt-4o-mini': 800,
    // Claude models
    'claude-sonnet-4-5': 1800,
    'claude-3-opus': 2500,
    'claude-3-sonnet': 1500,
    'claude-3-haiku': 500,
  };
  
  // No hardcoded default - return average if unknown
  return latencies[model || ''] || 1500;
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
