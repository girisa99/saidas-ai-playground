import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Phone,
  Mail,
  Bot
} from 'lucide-react';

interface ContactCenterOptimizerProps {
  conversationHistory: Array<{ role: string; content: string; timestamp: string }>;
  onOptimizationSuggestion: (suggestion: string) => void;
}

interface ContactCenterMetrics {
  avgResponseTime: number;
  resolutionRate: number;
  escalationRate: number;
  userSatisfaction: number;
  categoryDetection: string[];
  sentimentTrend: 'positive' | 'neutral' | 'negative';
}

interface OptimizationSuggestion {
  type: 'onboarding' | 'support' | 'sales' | 'escalation';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  impact: string;
  icon: string;
}

export const ContactCenterOptimizer: React.FC<ContactCenterOptimizerProps> = ({
  conversationHistory,
  onOptimizationSuggestion
}) => {
  const [metrics, setMetrics] = useState<ContactCenterMetrics>({
    avgResponseTime: 2.3,
    resolutionRate: 89,
    escalationRate: 8,
    userSatisfaction: 4.2,
    categoryDetection: [],
    sentimentTrend: 'positive'
  });

  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);

  useEffect(() => {
    analyzeConversation();
  }, [conversationHistory]);

  const analyzeConversation = () => {
    if (conversationHistory.length === 0) return;

    const userMessages = conversationHistory.filter(m => m.role === 'user');
    const assistantMessages = conversationHistory.filter(m => m.role === 'assistant');
    
    // Analyze conversation patterns
    const categories = detectCategories(userMessages);
    const sentiment = detectSentiment(userMessages);
    const complexity = assessComplexity(userMessages);
    
    setMetrics(prev => ({
      ...prev,
      categoryDetection: categories,
      sentimentTrend: sentiment
    }));

    // Generate optimization suggestions
    const newSuggestions = generateOptimizationSuggestions(categories, sentiment, complexity);
    setSuggestions(newSuggestions);
  };

  const detectCategories = (messages: Array<{ content: string }>): string[] => {
    const categories: string[] = [];
    const allText = messages.map(m => m.content.toLowerCase()).join(' ');

    // Contact Center Categories
    const categoryMap = {
      'Technical Support': ['error', 'bug', 'not working', 'broken', 'issue', 'problem', 'troubleshoot'],
      'Billing & Payments': ['bill', 'payment', 'charge', 'invoice', 'cost', 'price', 'refund'],
      'Account Management': ['account', 'login', 'password', 'profile', 'settings', 'access'],
      'Product Inquiry': ['features', 'how to', 'what is', 'explain', 'demo', 'trial'],
      'Onboarding': ['new', 'start', 'begin', 'setup', 'getting started', 'first time'],
      'Escalation Request': ['speak to', 'manager', 'supervisor', 'urgent', 'complaint', 'frustrated']
    };

    Object.entries(categoryMap).forEach(([category, keywords]) => {
      const matches = keywords.filter(keyword => allText.includes(keyword)).length;
      if (matches > 0) {
        categories.push(category);
      }
    });

    return categories;
  };

  const detectSentiment = (messages: Array<{ content: string }>): 'positive' | 'neutral' | 'negative' => {
    const allText = messages.map(m => m.content.toLowerCase()).join(' ');
    
    const positiveWords = ['good', 'great', 'excellent', 'thank you', 'helpful', 'satisfied', 'happy'];
    const negativeWords = ['bad', 'terrible', 'frustrated', 'angry', 'disappointed', 'useless', 'horrible'];
    
    const positiveCount = positiveWords.filter(word => allText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => allText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  const assessComplexity = (messages: Array<{ content: string }>): 'low' | 'medium' | 'high' => {
    const totalWords = messages.reduce((sum, m) => sum + m.content.split(' ').length, 0);
    const avgWordsPerMessage = totalWords / messages.length;
    
    if (avgWordsPerMessage > 50) return 'high';
    if (avgWordsPerMessage > 20) return 'medium';
    return 'low';
  };

  const generateOptimizationSuggestions = (
    categories: string[], 
    sentiment: string, 
    complexity: string
  ): OptimizationSuggestion[] => {
    const suggestions: OptimizationSuggestion[] = [];

    // Onboarding optimization
    if (categories.includes('Onboarding') || categories.includes('Product Inquiry')) {
      suggestions.push({
        type: 'onboarding',
        priority: 'high',
        title: 'Enhanced Onboarding Flow',
        description: 'Detected new user patterns that could benefit from guided onboarding',
        action: 'Implement step-by-step onboarding wizard with progress tracking',
        impact: 'Reduce support tickets by 40% and improve user activation',
        icon: '🚀'
      });
    }

    // Technical support optimization
    if (categories.includes('Technical Support')) {
      suggestions.push({
        type: 'support',
        priority: 'high',
        title: 'AI-Powered Troubleshooting',
        description: 'Technical issues detected that could be resolved with automated diagnostics',
        action: 'Deploy intelligent troubleshooting bots with step-by-step guidance',
        impact: 'Resolve 70% of technical issues automatically',
        icon: '🔧'
      });
    }

    // Escalation management
    if (categories.includes('Escalation Request') || sentiment === 'negative') {
      suggestions.push({
        type: 'escalation',
        priority: 'high',
        title: 'Smart Escalation System',
        description: 'Negative sentiment or escalation requests detected',
        action: 'Implement priority routing and proactive human agent alerts',
        impact: 'Reduce escalation response time by 60%',
        icon: '⚠️'
      });
    }

    // Sales opportunity
    if (categories.includes('Product Inquiry') && sentiment === 'positive') {
      suggestions.push({
        type: 'sales',
        priority: 'medium',
        title: 'Sales Opportunity Detection',
        description: 'Positive engagement with product features detected',
        action: 'Route to sales team with contextual product interest data',
        impact: 'Increase conversion rate by 25%',
        icon: '💰'
      });
    }

    return suggestions.slice(0, 3); // Limit to top 3 suggestions
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  const handleSuggestionApply = (suggestion: OptimizationSuggestion) => {
    const enhancedPrompt = `Based on contact center analysis, I recommend implementing: **${suggestion.title}**

**Context**: ${suggestion.description}

**Recommended Action**: ${suggestion.action}

**Expected Impact**: ${suggestion.impact}

This optimization aligns with our 3-Phase Framework approach and can be implemented using our proven experimentation methodology. Would you like me to provide a detailed implementation plan?`;

    onOptimizationSuggestion(enhancedPrompt);
  };

  if (conversationHistory.length < 2) {
    return null; // Don't show until we have meaningful conversation
  }

  return (
    <Card className="my-4 p-4 bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-950/10 dark:to-blue-950/10 border-l-4 border-l-purple-500">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold text-purple-700 dark:text-purple-300">
            Contact Center Intelligence
          </h3>
          <Badge variant="outline" className="text-xs">
            AI-Powered
          </Badge>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Clock className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">Response</span>
            </div>
            <div className="text-lg font-bold text-green-600">{metrics.avgResponseTime}s</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <CheckCircle className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">Resolution</span>
            </div>
            <div className="text-lg font-bold text-blue-600">{metrics.resolutionRate}%</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">Escalation</span>
            </div>
            <div className="text-lg font-bold text-orange-600">{metrics.escalationRate}%</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Users className="h-3 w-3" />
              <span className="text-xs text-muted-foreground">Satisfaction</span>
            </div>
            <div className={`text-lg font-bold ${getSentimentColor(metrics.sentimentTrend)}`}>
              {metrics.userSatisfaction}/5
            </div>
          </div>
        </div>

        {/* Category Detection */}
        {metrics.categoryDetection.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Detected Categories</h4>
            <div className="flex flex-wrap gap-2">
              {metrics.categoryDetection.map((category, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Optimization Suggestions */}
        {suggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Smart Optimizations
            </h4>
            
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{suggestion.icon}</span>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{suggestion.title}</span>
                        <Badge variant={getPriorityVariant(suggestion.priority)} className="text-xs">
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                      <p className="text-xs text-green-600">💡 {suggestion.impact}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSuggestionApply(suggestion)}
                      className="text-xs h-8"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cross-Functional Use Cases */}
        <div className="bg-muted/30 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">Cross-Functional Applications</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1">
              <Phone className="h-4 w-4 mx-auto text-blue-500" />
              <span className="text-xs text-muted-foreground">Support</span>
            </div>
            <div className="space-y-1">
              <Users className="h-4 w-4 mx-auto text-green-500" />
              <span className="text-xs text-muted-foreground">Sales</span>
            </div>
            <div className="space-y-1">
              <Bot className="h-4 w-4 mx-auto text-purple-500" />
              <span className="text-xs text-muted-foreground">Onboarding</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};