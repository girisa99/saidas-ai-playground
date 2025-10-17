/**
 * Active Learning Service
 * 
 * Manages the continuous improvement loop:
 * 1. Label Studio → Human feedback on AI responses
 * 2. Universal Knowledge Base → Store verified knowledge
 * 3. RAG System → Use improved knowledge in future queries
 * 4. Multi-Agent → Benefit from higher quality training data
 * 
 * Part of: Label Studio Integration (Complete)
 * Works with: All AI modes (Default, Single, Multi, Split-Screen)
 */

import { supabase } from '@/integrations/supabase/client';

export interface FeedbackData {
  taskId: string;
  conversationId: string;
  userQuery: string;
  aiResponse: string;
  qualityRating: number; // 1-5 scale
  correctedResponse?: string;
  domain?: string;
  isUsefulForTraining: boolean;
}

export interface KnowledgeImprovement {
  entriesAdded: number;
  entriesUpdated: number;
  averageQuality: number;
  domains: string[];
}

/**
 * Submit user feedback on AI response for active learning
 */
export async function submitResponseFeedback(
  feedback: FeedbackData
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Log feedback for analysis
    console.log('📊 Active Learning Feedback:', {
      quality: feedback.qualityRating,
      domain: feedback.domain,
      useful: feedback.isUsefulForTraining
    });

    // 2. If high quality (4-5 stars) and corrected/verified, add to knowledge base
    if (feedback.qualityRating >= 4 && feedback.isUsefulForTraining) {
      const knowledgeEntry = {
        finding_name: `User-Verified: ${feedback.userQuery.substring(0, 100)}`,
        description: feedback.correctedResponse || feedback.aiResponse,
        finding_category: feedback.domain || 'general',
        domain: feedback.domain || 'healthcare',
        content_type: 'user_feedback',
        quality_score: feedback.qualityRating / 5, // Normalize to 0-1
        is_approved: true,
        metadata: {
          user_verified: true,
          conversation_id: feedback.conversationId,
          label_studio_task_id: feedback.taskId,
          verified_at: new Date().toISOString(),
          original_query: feedback.userQuery,
          quality_rating: feedback.qualityRating
        }
      };

      const { error } = await supabase
        .from('universal_knowledge_base')
        .insert(knowledgeEntry);

      if (error) {
        console.error('Failed to add verified knowledge:', error);
        return { success: false, error: error.message };
      }

      console.log('✓ High-quality response added to Universal Knowledge Base');
    }

    // 3. If low quality (1-2 stars), flag for model improvement
    if (feedback.qualityRating <= 2) {
      console.log('⚠ Low-quality response flagged for model retraining');
      // Future: Send to fine-tuning pipeline
      // For now, just log for manual review
    }

    return { success: true };
  } catch (error) {
    console.error('Active learning feedback error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Get knowledge base improvements from active learning
 */
export async function getActiveLearningStats(
  daysBack: number = 30
): Promise<KnowledgeImprovement> {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysBack);

    const { data, error } = await supabase
      .from('universal_knowledge_base')
      .select('domain, quality_score, content_type')
      .in('content_type', ['user_feedback', 'human_verified', 'label_studio'])
      .gte('created_at', cutoffDate.toISOString());

    if (error) throw error;

    const entries = data || [];
    const domains = [...new Set(entries.map(e => e.domain))];
    const avgQuality = entries.reduce((sum, e) => sum + (e.quality_score || 0), 0) / 
                      (entries.length || 1);

    return {
      entriesAdded: entries.length,
      entriesUpdated: 0, // Future: track updates
      averageQuality: avgQuality,
      domains: domains
    };
  } catch (error) {
    console.error('Failed to get active learning stats:', error);
    return {
      entriesAdded: 0,
      entriesUpdated: 0,
      averageQuality: 0,
      domains: []
    };
  }
}

/**
 * Check if knowledge base is improving over time (continuous learning)
 */
export async function analyzeKnowledgeQuality(): Promise<{
  trending: 'improving' | 'stable' | 'declining';
  qualityScore: number;
  recommendations: string[];
}> {
  try {
    // Get recent entries vs older entries
    const recentStats = await getActiveLearningStats(7);
    const olderStats = await getActiveLearningStats(30);

    const recentQuality = recentStats.averageQuality;
    const olderQuality = olderStats.averageQuality;

    let trending: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentQuality > olderQuality * 1.1) trending = 'improving';
    else if (recentQuality < olderQuality * 0.9) trending = 'declining';

    const recommendations: string[] = [];
    
    if (trending === 'declining') {
      recommendations.push('Review recent low-quality responses in Label Studio');
      recommendations.push('Consider adjusting triage rules for better model selection');
    }
    
    if (recentStats.entriesAdded < 10) {
      recommendations.push('Increase user feedback collection');
      recommendations.push('Enable Label Studio for more conversations');
    }

    return {
      trending,
      qualityScore: recentQuality,
      recommendations
    };
  } catch (error) {
    console.error('Failed to analyze knowledge quality:', error);
    return {
      trending: 'stable',
      qualityScore: 0.5,
      recommendations: ['Unable to analyze - check data availability']
    };
  }
}
