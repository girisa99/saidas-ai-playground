import { useState, useEffect } from 'react';
import { searchUniversalKnowledge } from '@/services/universalKnowledgeService';
import type { KnowledgeDomain } from '@/services/universalKnowledgeService';

// Map user-facing contexts to internal knowledge domains
type UserContext = 'healthcare' | 'technology';

function mapContextToDomains(context: UserContext): KnowledgeDomain[] {
  if (context === 'healthcare') {
    return ['medical_imaging', 'patient_onboarding', 'clinical_risk'];
  }
  return ['conversational']; // Technology maps to conversational for now
}

interface TopicSuggestion {
  topic: string;
  category: string;
  icon?: string;
  description?: string;
}

export const useUniversalKnowledgeTopics = (context: UserContext | null) => {
  const [topics, setTopics] = useState<TopicSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!context) return;

    const fetchTopics = async () => {
      setLoading(true);
      try {
        const domains = mapContextToDomains(context);
        const allResults: any[] = [];

        // Fetch from all relevant domains
        for (const domain of domains) {
          const [faqs, templates, protocols, findings] = await Promise.all([
            searchUniversalKnowledge(domain, 'popular topics', 'faq', 3).catch(() => []),
            searchUniversalKnowledge(domain, 'common questions', 'template', 2).catch(() => []),
            searchUniversalKnowledge(domain, 'best practices', 'protocol', 2).catch(() => []),
            searchUniversalKnowledge(domain, 'latest insights', 'finding', 3).catch(() => [])
          ]);
          
          allResults.push(...faqs, ...templates, ...protocols, ...findings);
        }

        // Combine and format topics
        const formattedTopics: TopicSuggestion[] = allResults
          .filter(item => item && (item.finding_name || item.description))
          .map(item => ({
            topic: item.finding_name || item.description?.substring(0, 50) || 'Topic',
            category: getCategoryFromContext(context),
            icon: getIconForContentType(item.content_type || 'finding'),
            description: item.description
          }))
          .slice(0, 15); // Limit to 15 topics

        setTopics(formattedTopics);
      } catch (error) {
        console.error('Failed to fetch topics from universal knowledge base:', error);
        // Fallback to default topics
        setTopics(getDefaultTopics(context));
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [context]);

  return { topics, loading };
};

function getCategoryFromContext(context: UserContext): string {
  return context === 'healthcare' ? 'clinical' : 'technical';
}

function getIconForContentType(contentType: string): string {
  const iconMap: Record<string, string> = {
    'faq': '💡',
    'template': '📋',
    'protocol': '🔬',
    'finding': '🔍',
    'guideline': '📖',
    'case_study': '📊',
    'research': '🧪',
    'dataset': '💾'
  };
  return iconMap[contentType] || '📌';
}

function getDefaultTopics(context: UserContext): TopicSuggestion[] {
  if (context === 'healthcare') {
    return [
      { topic: 'Reimbursement & Coverage', category: 'clinical', icon: '💰' },
      { topic: 'Treatment Options', category: 'clinical', icon: '💊' },
      { topic: 'Clinical Trials', category: 'clinical', icon: '🔬' },
      { topic: 'Patient Assistance Programs', category: 'administrative', icon: '🎟️' },
      { topic: 'Digital Health Solutions', category: 'technical', icon: '📱' }
    ];
  } else {
    return [
      { topic: 'AI & Machine Learning', category: 'technical', icon: '🤖' },
      { topic: 'Cloud Platforms', category: 'technical', icon: '☁️' },
      { topic: 'No-Code Development', category: 'technical', icon: '🛠️' },
      { topic: 'Agentic AI', category: 'technical', icon: '🚀' },
      { topic: 'Open Source Models', category: 'technical', icon: '🌐' }
    ];
  }
}
