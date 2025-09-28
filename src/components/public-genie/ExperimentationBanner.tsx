import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Users, 
  Lightbulb, 
  Shield, 
  Clock, 
  X, 
  ExternalLink,
  GitBranch,
  Zap,
  Target
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ExperimentationBannerProps {
  context: 'technology' | 'healthcare';
  onDismiss: () => void;
}

export const ExperimentationBanner: React.FC<ExperimentationBannerProps> = ({
  context,
  onDismiss
}) => {
  const [currentTip, setCurrentTip] = useState(0);

  const developmentTips = {
    technology: [
      {
        icon: <Code className="w-4 h-4" />,
        title: "Rate Limiting Implementation",
        description: "Use IP-based throttling with database functions for scalable conversation limits",
        code: "supabase.rpc('check_conversation_limits', { p_ip_address, p_user_email })"
      },
      {
        icon: <GitBranch className="w-4 h-4" />,
        title: "Context Detection",
        description: "Implement keyword matching algorithms to automatically detect conversation topics",
        code: "const context = detectContextFromMessage(userInput)"
      },
      {
        icon: <Zap className="w-4 h-4" />,
        title: "Real-time Updates",
        description: "Use WebSocket connections or server-sent events for live conversation updates",
        code: "supabase.channel('conversations').on('UPDATE', handleUpdate)"
      },
      {
        icon: <Shield className="w-4 h-4" />,
        title: "Security Best Practices",
        description: "Always validate inputs, sanitize outputs, and implement proper authentication",
        code: "const validated = conversationSchema.parse(userInput)"
      }
    ],
    healthcare: [
      {
        icon: <Shield className="w-4 h-4" />,
        title: "HIPAA Compliance",
        description: "Ensure all patient data is encrypted and access is properly logged",
        code: "const encrypted = await encrypt(patientData, hipaaKey)"
      },
      {
        icon: <Users className="w-4 h-4" />,
        title: "Role-Based Access",
        description: "Implement granular permissions based on healthcare roles and responsibilities",
        code: "if (hasRole('physician')) { allowDiagnosticAccess() }"
      },
      {
        icon: <BookOpen className="w-4 h-4" />,
        title: "Clinical Decision Support",
        description: "Integrate evidence-based guidelines and drug interaction databases",
        code: "const interactions = await checkDrugInteractions(medications)"
      },
      {
        icon: <Target className="w-4 h-4" />,
        title: "Patient Journey Mapping",
        description: "Track patient progress through treatment phases with automated triggers",
        code: "await progressJourneyStage(patientId, 'treatment_phase_2')"
      }
    ]
  };

  const tips = developmentTips[context];

  const experimentationGuidelines = [
    {
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      title: "Responsible Innovation",
      description: "This platform encourages learning and experimentation with conversational AI technologies"
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      title: "Rate Limiting Education",
      description: "Experience real-world rate limiting patterns used in production AI systems"
    },
    {
      icon: <Users className="w-5 h-5 text-green-500" />,
      title: "Knowledge Sharing",
      description: "Learn from implementation examples and contribute to the community knowledge base"
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      title: "Security Awareness",
      description: "Understand security considerations when building conversational interfaces"
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4"
      >
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Conversational AI Experimentation Platform
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn • Build • Share - Educational platform for AI conversation development
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onDismiss}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Guidelines */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Platform Purpose</span>
                </h4>
                <div className="space-y-3">
                  {experimentationGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-background/50 rounded-lg">
                      {guideline.icon}
                      <div>
                        <h5 className="font-medium text-sm text-foreground">{guideline.title}</h5>
                        <p className="text-xs text-muted-foreground">{guideline.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Tips */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Implementation Tips - {context === 'technology' ? 'Tech Focus' : 'Healthcare Focus'}</span>
                </h4>
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {tips[currentTip].icon}
                      <h5 className="font-medium text-sm text-foreground">{tips[currentTip].title}</h5>
                    </div>
                    <div className="flex space-x-1">
                      {tips.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTip(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentTip ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{tips[currentTip].description}</p>
                  <div className="bg-muted/50 rounded p-2">
                    <code className="text-xs font-mono text-foreground">
                      {tips[currentTip].code}
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  Educational Use
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Open Source
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Community Driven
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Documentation
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <GitBranch className="w-3 h-3 mr-1" />
                  Source Code
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};