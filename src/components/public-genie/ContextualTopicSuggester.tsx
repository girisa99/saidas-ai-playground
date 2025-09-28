import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ArrowRight, Brain, Sparkles } from 'lucide-react';
import { HealthcareKnowledgeBase } from './HealthcareKnowledgeBase';

interface ContextualTopicSuggesterProps {
  conversationHistory: Array<{ role: string; content: string; timestamp: string }>;
  currentContext: 'technology' | 'healthcare' | null;
  onTopicSelect: (topic: string, isFollowUp?: boolean) => void;
  onContextSwitch: (newContext: 'technology' | 'healthcare') => void;
}

interface TopicSuggestion {
  topic: string;
  reason: string;
  category: 'immediate' | 'related' | 'followup' | 'deeper';
  confidence: number;
  icon: string;
}

export const ContextualTopicSuggester: React.FC<ContextualTopicSuggesterProps> = ({
  conversationHistory,
  currentContext,
  onTopicSelect,
  onContextSwitch
}) => {
  const [suggestions, setSuggestions] = useState<TopicSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lastAnalyzedLength, setLastAnalyzedLength] = useState(0);

  // Healthcare keyword mappings for intelligent detection
  const healthcareKeywords = {
    pricing: ['340b', 'wac', 'price', 'cost', 'reimbursement', 'payment', 'coverage'],
    claims: ['claim', 'denial', 'prior auth', 'authorization', 'billing', 'coding', 'cpt', 'icd'],
    infusion: ['infusion', 'iv', 'treatment', 'therapy', 'pre-med', 'post-infusion'],
    digital: ['digital', 'app', 'dtx', 'therapeutics', 'telehealth', 'remote'],
    oncology: ['cancer', 'oncology', 'chemotherapy', 'immunotherapy', 'tumor'],
    gpo: ['gpo', 'purchasing', 'contract', 'negotiation', 'volume'],
    assistance: ['copay', 'assistance', 'discount', 'coupon', 'support', 'help']
  };

  const analyzeConversationContext = () => {
    if (conversationHistory.length <= lastAnalyzedLength) return;

    const recentMessages = conversationHistory.slice(lastAnalyzedLength);
    const allText = recentMessages.map(m => m.content.toLowerCase()).join(' ');
    
    const detectedTopics: TopicSuggestion[] = [];

    // Analyze for healthcare topics
    if (currentContext === 'healthcare' || !currentContext) {
      Object.entries(healthcareKeywords).forEach(([category, keywords]) => {
        const matchCount = keywords.filter(keyword => allText.includes(keyword)).length;
        if (matchCount > 0) {
          const suggestions = generateHealthcareSuggestions(category, matchCount, allText);
          detectedTopics.push(...suggestions);
        }
      });
    }

    // Add follow-up questions based on recent topics
    const followUps = generateFollowUpSuggestions(allText);
    detectedTopics.push(...followUps);

    // Sort by confidence and category priority
    const sortedSuggestions = detectedTopics
      .sort((a, b) => {
        const categoryOrder = { immediate: 0, related: 1, followup: 2, deeper: 3 };
        return categoryOrder[a.category] - categoryOrder[b.category] || b.confidence - a.confidence;
      })
      .slice(0, 6); // Limit to 6 suggestions

    setSuggestions(sortedSuggestions);
    setLastAnalyzedLength(conversationHistory.length);

    // Auto-show suggestions if we have good ones
    if (sortedSuggestions.length > 0 && sortedSuggestions[0].confidence > 0.7) {
      setShowSuggestions(true);
    }
  };

  const generateHealthcareSuggestions = (category: string, matchCount: number, text: string): TopicSuggestion[] => {
    const confidence = Math.min(matchCount * 0.3, 1.0);
    
    switch (category) {
      case 'pricing':
        return [
          {
            topic: '340B Drug Pricing Program',
            reason: 'I noticed you mentioned pricing - want to explore 340B savings opportunities?',
            category: 'immediate',
            confidence: confidence + 0.1,
            icon: '💰'
          },
          {
            topic: 'WAC vs Government Pricing',
            reason: 'Understanding different pricing tiers could help your situation',
            category: 'related',
            confidence: confidence,
            icon: '📊'
          }
        ];
        
      case 'claims':
        return [
          {
            topic: 'Claims Processing (Inpatient/Outpatient)',
            reason: 'Let me help you navigate the claims process more effectively',
            category: 'immediate',
            confidence: confidence + 0.15,
            icon: '📋'
          },
          {
            topic: 'Denial Prevention & Appeals',
            reason: 'Want to avoid common denial pitfalls?',
            category: 'related',
            confidence: confidence,
            icon: '✅'
          }
        ];
        
      case 'infusion':
        return [
          {
            topic: 'Infusion Process & Support',
            reason: 'I can walk you through the complete infusion journey',
            category: 'immediate',
            confidence: confidence + 0.2,
            icon: '💉'
          },
          {
            topic: 'Pre-Infusion Preparation',
            reason: 'Knowing what to expect can reduce anxiety',
            category: 'followup',
            confidence: confidence,
            icon: '📋'
          }
        ];
        
      case 'digital':
        return [
          {
            topic: 'Digital Therapeutics (DTx)',
            reason: 'Digital health solutions might be perfect for your needs',
            category: 'immediate',
            confidence: confidence + 0.1,
            icon: '📱'
          },
          {
            topic: 'Reimbursement for Digital Health',
            reason: 'Many digital solutions are now covered by insurance',
            category: 'related',
            confidence: confidence,
            icon: '💳'
          }
        ];
        
      default:
        return [];
    }
  };

  const generateFollowUpSuggestions = (text: string): TopicSuggestion[] => {
    const followUps: TopicSuggestion[] = [];

    // Smart follow-up based on conversation patterns
    if (text.includes('confused') || text.includes('complicated') || text.includes('help')) {
      followUps.push({
        topic: 'Step-by-Step Process Guide',
        reason: 'Let me break this down into simple, manageable steps',
        category: 'immediate',
        confidence: 0.8,
        icon: '🎯'
      });
    }

    if (text.includes('cost') || text.includes('expensive') || text.includes('afford')) {
      followUps.push({
        topic: 'Patient Financial Assistance Programs',
        reason: 'There are many programs that can help reduce costs',
        category: 'immediate',
        confidence: 0.9,
        icon: '🎟️'
      });
    }

    if (text.includes('insurance') || text.includes('coverage')) {
      followUps.push({
        topic: 'Insurance Coverage Verification',
        reason: 'Let me help you understand your coverage options',
        category: 'related',
        confidence: 0.7,
        icon: '🛡️'
      });
    }

    return followUps;
  };

  // Run analysis when conversation changes
  useEffect(() => {
    const timer = setTimeout(() => {
      analyzeConversationContext();
    }, 1000); // Debounce to avoid too frequent analysis

    return () => clearTimeout(timer);
  }, [conversationHistory, currentContext]);

  const handleTopicSelect = (suggestion: TopicSuggestion) => {
    const enhancedResponse = `Based on our conversation, I think you'd find this helpful: **${suggestion.topic}**

${suggestion.reason} Let me share some targeted information that might be exactly what you need! 🎯`;

    onTopicSelect(enhancedResponse, true);
    setShowSuggestions(false);
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'immediate': return 'default';
      case 'related': return 'secondary';
      case 'followup': return 'outline';
      default: return 'outline';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'immediate': return 'Recommended';
      case 'related': return 'Related';
      case 'followup': return 'Follow-up';
      case 'deeper': return 'Deep Dive';
      default: return '';
    }
  };

  if (!showSuggestions || suggestions.length === 0) {
    // Show a subtle hint button when suggestions are available but not displayed
    if (suggestions.length > 0) {
      return (
        <div className="flex justify-center my-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(true)}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            <Lightbulb className="h-3 w-3 mr-1" />
            💡 I have some suggestions based on our conversation
          </Button>
        </div>
      );
    }
    return null;
  }

  return (
    <Card className="my-3 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10 border-l-4 border-l-primary">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-medium text-primary">Smart Suggestions</h4>
          <Sparkles className="h-3 w-3 text-yellow-500" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(false)}
            className="ml-auto h-6 w-6 p-0 text-muted-foreground"
          >
            ×
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Based on our conversation, here are some topics that might interest you:
        </p>

        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleTopicSelect(suggestion)}
              className="h-auto p-3 text-left justify-start flex-col items-start space-y-1 hover:bg-muted/50"
            >
              <div className="flex items-center gap-2 w-full">
                <span className="text-sm">{suggestion.icon}</span>
                <span className="font-medium text-sm flex-1">{suggestion.topic}</span>
                <Badge variant={getCategoryBadgeVariant(suggestion.category)} className="text-xs">
                  {getCategoryLabel(suggestion.category)}
                </Badge>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground text-left">
                {suggestion.reason}
              </p>
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            💡 These suggestions are AI-generated based on context
          </p>
          {!currentContext && (
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContextSwitch('healthcare')}
                className="text-xs h-6"
              >
                🏥 Healthcare
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onContextSwitch('technology')}
                className="text-xs h-6"
              >
                🚀 Tech
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};