/**
 * Multi-Agent Collaboration Service
 * 
 * Enables true agent collaboration where models work together:
 * - Specialist → Generalist chaining (e.g., medical model → LLM)
 * - Ensemble voting for critical decisions
 * - Consensus synthesis for high-stakes queries
 * 
 * Part of: Phase 2 - Multi-Model Architecture (Complete)
 * Docs: docs/MULTI_MODEL_ARCHITECTURE_ASSESSMENT.md
 */

import type { TriageResult } from './aiTriageService';

export interface AgentRole {
  role: 'specialist' | 'generalist' | 'synthesizer';
  model: string;
  purpose: string;
}

export interface CollaborationChain {
  agents: AgentRole[];
  mode: 'sequential' | 'parallel' | 'ensemble';
  synthesisRequired: boolean;
}

export interface AgentResponse {
  agent: AgentRole;
  content: string;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface CollaborationResult {
  primaryResponse: string;
  agentResponses: AgentResponse[];
  synthesizedResponse?: string;
  consensusScore?: number;
  reasoning: string;
  totalCost: number;
  totalLatency: number;
}

/**
 * Determine optimal collaboration strategy based on triage
 */
export function determineCollaborationStrategy(
  triage: TriageResult
): CollaborationChain {
  // STRATEGY 1: Healthcare Specialist → LLM Chaining (Direct API)
  if (triage.domain === 'healthcare' && triage.complexity === 'high') {
    return {
      agents: [
        {
          role: 'specialist',
          model: 'gemini-2.0-flash-exp', // Medical reasoning via Gemini API
          purpose: 'Extract clinical findings and medical context'
        },
        {
          role: 'generalist',
          model: 'gpt-5-mini-2025-08-07', // Patient-friendly via OpenAI API
          purpose: 'Generate clear, empathetic patient explanation'
        }
      ],
      mode: 'sequential',
      synthesisRequired: false
    };
  }

  // STRATEGY 2: Ensemble Voting for Critical Decisions (Direct API)
  if (triage.urgency === 'critical') {
    return {
      agents: [
        {
          role: 'specialist',
          model: 'gemini-2.0-flash-exp', // Gemini for medical analysis
          purpose: 'Medical analysis and diagnosis'
        },
        {
          role: 'specialist',
          model: 'gpt-5-2025-08-07', // GPT-5 for validation
          purpose: 'Treatment recommendation validation'
        },
        {
          role: 'specialist',
          model: 'claude-sonnet-4-5', // Claude for safety
          purpose: 'Safety check and red flags'
        },
        {
          role: 'synthesizer',
          model: 'gpt-5-2025-08-07', // GPT-5 for synthesis
          purpose: 'Synthesize consensus and highlight disagreements'
        }
      ],
      mode: 'ensemble',
      synthesisRequired: true
    };
  }

  // STRATEGY 3: Technical Specialist → Code Expert (Direct API)
  if (triage.domain === 'technology' && triage.complexity === 'high') {
    return {
      agents: [
        {
          role: 'specialist',
          model: 'gpt-5-mini-2025-08-07', // Fast OpenAI analysis
          purpose: 'Identify tech stack and requirements'
        },
        {
          role: 'generalist',
          model: 'gpt-5-2025-08-07', // Best for code generation
          purpose: 'Generate detailed code solution'
        }
      ],
      mode: 'sequential',
      synthesisRequired: false
    };
  }

  // FALLBACK: Single agent (triage already selected best model)
  return {
    agents: [
      {
        role: 'generalist',
        model: triage.suggested_model,
        purpose: 'Direct response'
      }
    ],
    mode: 'sequential',
    synthesisRequired: false
  };
}

/**
 * Build enhanced prompts for chained agents
 */
export function buildChainPrompts(
  originalQuery: string,
  chain: CollaborationChain,
  previousResponses: AgentResponse[] = []
): Record<string, string> {
  const prompts: Record<string, string> = {};

  if (chain.mode === 'sequential') {
    // First agent: Extract/analyze
    if (chain.agents[0]?.role === 'specialist') {
      prompts[chain.agents[0].model] = `You are a ${chain.agents[0].purpose}.

CRITICAL: Provide ONLY structured analysis. No patient-facing explanations.

User Query: ${originalQuery}

Extract and return:
1. Key findings (bullet points)
2. Clinical significance
3. Urgency level
4. Recommended actions
5. Technical medical terms

Format as JSON for next agent.`;
    }

    // Second agent: Synthesize/explain using first agent's output
    if (chain.agents[1] && previousResponses[0]) {
      prompts[chain.agents[1].model] = `You are a ${chain.agents[1].purpose}.

Original Patient Question: ${originalQuery}

Medical Analysis from Specialist:
${previousResponses[0].content}

Your task:
1. Translate medical findings into patient-friendly language
2. Explain significance without medical jargon
3. Provide empathetic, actionable next steps
4. Maintain accuracy while being compassionate

Remember: The patient asked "${originalQuery}" - answer their actual question clearly.`;
    }
  }

  if (chain.mode === 'ensemble') {
    // All specialist agents get same prompt with different perspectives
    chain.agents
      .filter(a => a.role === 'specialist')
      .forEach(agent => {
        prompts[agent.model] = `You are an expert focused on: ${agent.purpose}

Patient Query: ${originalQuery}

Provide your expert analysis focusing specifically on your area of expertise.
Be thorough but concise. Flag any concerns or red flags.

Include confidence score (0-1) for your assessment.`;
      });

    // Synthesizer gets all responses
    const synthAgent = chain.agents.find(a => a.role === 'synthesizer');
    if (synthAgent && previousResponses.length > 0) {
      const responseSummary = previousResponses
        .map((r, i) => `Expert ${i + 1} (${r.agent.purpose}):\n${r.content}`)
        .join('\n\n---\n\n');

      prompts[synthAgent.model] = `You are synthesizing multiple expert opinions for: ${originalQuery}

Expert Analyses:
${responseSummary}

Your task:
1. Identify areas of consensus (what all experts agree on)
2. Highlight disagreements and explain why they might differ
3. Provide final recommendation based on majority consensus
4. Flag any safety concerns mentioned by any expert
5. Give overall confidence score (0-1)

Format:
**Consensus:** [What experts agree on]
**Disagreements:** [Where they differ and why]
**Recommendation:** [Final advice]
**Safety Notes:** [Any concerns]
**Confidence:** [0-1 score]`;
    }
  }

  return prompts;
}

/**
 * Calculate consensus score from ensemble responses
 */
export function calculateConsensus(responses: AgentResponse[]): number {
  // Simple consensus: compare response similarity
  // In production, use semantic similarity (embeddings)
  
  if (responses.length < 2) return 1.0;

  // Extract confidence scores if available
  const confidences = responses
    .map(r => r.confidence)
    .filter((c): c is number => c !== undefined);

  if (confidences.length > 0) {
    return confidences.reduce((a, b) => a + b, 0) / confidences.length;
  }

  // Fallback: keyword overlap analysis
  const keywords = responses.map(r => 
    r.content.toLowerCase().split(/\s+/).filter(w => w.length > 4)
  );

  let overlapScore = 0;
  for (let i = 0; i < keywords.length; i++) {
    for (let j = i + 1; j < keywords.length; j++) {
      const intersection = keywords[i].filter(k => keywords[j].includes(k));
      const union = new Set([...keywords[i], ...keywords[j]]);
      overlapScore += intersection.length / union.size;
    }
  }

  const pairCount = (keywords.length * (keywords.length - 1)) / 2;
  return pairCount > 0 ? overlapScore / pairCount : 0.5;
}

/**
 * Estimate total cost for collaboration
 */
export function estimateCollaborationCost(chain: CollaborationChain): number {
  const modelCosts: Record<string, number> = {
    'google/gemini-2.5-pro': 0.02,
    'google/gemini-2.5-flash': 0.01,
    'google/gemini-2.5-flash-lite': 0.0001,
    'openai/gpt-5': 0.02,
    'openai/gpt-5-mini': 0.01,
    'openai/gpt-5-nano': 0.001,
  };

  return chain.agents.reduce((total, agent) => {
    return total + (modelCosts[agent.model] || 0.01);
  }, 0);
}

/**
 * Format collaboration result for display
 */
export function formatCollaborationResult(result: CollaborationResult): string {
  if (!result.synthesizedResponse) {
    return result.primaryResponse;
  }

  // For ensemble mode, show synthesis with details
  let output = result.synthesizedResponse;

  if (result.agentResponses.length > 1) {
    output += '\n\n---\n\n**Expert Analysis Details:**\n\n';
    result.agentResponses
      .filter(r => r.agent.role === 'specialist')
      .forEach((r, i) => {
        output += `*${r.agent.purpose}:*\n${r.content.substring(0, 200)}...\n\n`;
      });
  }

  if (result.consensusScore !== undefined) {
    output += `\n**Consensus Confidence:** ${(result.consensusScore * 100).toFixed(0)}%`;
  }

  return output;
}
