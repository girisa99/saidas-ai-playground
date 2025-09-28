import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Brain, Settings, Layers, Zap, Heart, FileText, Pill, Cpu } from 'lucide-react';
import { getReimbursementInfo } from './HealthcareKnowledgeBase';

interface CapabilitiesPromptProps {
  onModeSelect: (mode: 'default' | 'single' | 'multi') => void;
  onFeatureToggle: (feature: string) => void;
  currentConfig: any;
}

export const CapabilitiesPrompt: React.FC<CapabilitiesPromptProps> = ({
  onModeSelect,
  onFeatureToggle,
  currentConfig
}) => {
  return (
    <Card className="p-4 my-2 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h4 className="font-semibold">Configure My Capabilities</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={currentConfig.mode === 'default' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('default')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Zap className="h-4 w-4" />
            <span className="text-xs">Default</span>
          </Button>
          <Button
            variant={currentConfig.mode === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('single')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Settings className="h-4 w-4" />
            <span className="text-xs">Single Agent</span>
          </Button>
          <Button
            variant={currentConfig.mode === 'multi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onModeSelect('multi')}
            className="flex flex-col gap-1 h-auto p-2"
          >
            <Layers className="h-4 w-4" />
            <span className="text-xs">Multi-Agent</span>
          </Button>
        </div>

        <div className="flex flex-wrap gap-1">
          {['RAG', 'Knowledge Base', 'MCP Tools', 'Split Screen'].map(feature => (
            <Badge
              key={feature}
              variant={currentConfig[feature.toLowerCase().replace(' ', '')] ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => onFeatureToggle(feature)}
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

interface TopicSuggestionsProps {
  context: 'technology' | 'healthcare';
  topics: string[];
  onTopicSelect: (topic: string) => void;
}

export const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({
  context,
  topics,
  onTopicSelect
}) => {
  
  const handleTopicClick = (topic: string) => {
    // Provide specific information for healthcare reimbursement topics
    if (context === 'healthcare' && topic.toLowerCase().includes('reimbursement')) {
      const reimbursementInfo = getReimbursementInfo(topic);
      if (reimbursementInfo) {
        const detailedResponse = `🏥 **${topic} Support**

**Available Therapies & Products:**
- Digital Therapeutics (DTx) with CPT codes 90834, 90837
- Cell & Gene Therapies with outcome-based contracts
- Oncology treatments with biomarker testing
- Chronic disease management platforms

**Reimbursement Process Support:**
- Prior authorization assistance (14-day standard, 72-hour expedited)
- Claims submission with proper CPT/HCPCS codes
- Appeal process guidance
- Coverage verification tools

**Supported Payers:**
- Medicare Part B (telehealth services, RPM codes)
- Medicaid (state-specific programs)
- Commercial insurance (value-based contracts)

**Patient Assistance Programs:**
- Copay reduction programs
- Travel & lodging assistance
- Free drug programs
- Provider support services

Would you like me to explain any specific aspect of reimbursement support?`;

        onTopicSelect(detailedResponse);
      } else {
        onTopicSelect(`Selected topic: ${topic}. How can I help you with this healthcare area?`);
      }
    } else if (context === 'healthcare' && (topic.toLowerCase().includes('digital') || topic.toLowerCase().includes('dtx'))) {
      const digitalInfo = `🔬 **Digital Health & Therapeutics Support**

**Covered Digital Therapeutics:**
- Mental Health DTx (Depression, PTSD, Addiction)
- Chronic Disease Management (Diabetes, Hypertension, COPD)
- Rehabilitation DTx (Physical Therapy, Stroke Recovery)

**Reimbursement Codes:**
- Remote Patient Monitoring: 99453-99458
- Telehealth: Modifiers 95, GT, GQ
- Cognitive Behavioral Therapy: 90834, 90837
- Care Management: CCM codes

**Coverage Status:**
- FDA-approved DTx with established pathways
- Pilot programs with major insurers
- Value-based outcome contracts
- Employer-sponsored wellness programs

**Implementation Support:**
- Provider training and certification
- Patient onboarding assistance
- Outcome data collection
- Technical integration support

What specific digital health solution can I help you with?`;

      onTopicSelect(digitalInfo);
    } else {
      onTopicSelect(`Selected topic: ${topic}. What would you like to know about this?`);
    }
  };

  return (
    <Card className="p-3 my-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {context === 'technology' ? <Zap className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
          <h4 className="text-sm font-medium">
            Suggested {context} topics:
          </h4>
        </div>
        
        {context === 'healthcare' && (
          <div className="mb-2 p-2 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Pill className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Reimbursement & Product Support Available</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Get specific info on supported therapies, digital therapeutics, and reimbursement processes
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1">
          {topics.map(topic => (
            <Button
              key={topic}
              variant="outline"
              size="sm"
              onClick={() => handleTopicClick(topic)}
              className="text-xs h-auto py-1 px-2 relative"
            >
              <div className="flex items-center gap-1">
                {context === 'healthcare' && topic.toLowerCase().includes('reimbursement') && (
                  <FileText className="h-3 w-3 text-green-500" />
                )}
                {context === 'healthcare' && topic.toLowerCase().includes('digital') && (
                  <Cpu className="h-3 w-3 text-blue-500" />
                )}
                <span>{topic}</span>
              </div>
            </Button>
          ))}
        </div>
        
        {context === 'healthcare' && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              💡 <strong>Note:</strong> This is a technology demonstration. Always consult with your healthcare provider for medical decisions and verify coverage with your insurance.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};