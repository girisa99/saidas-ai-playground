import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Circle, 
  AlertCircle,
  FileText,
  Users,
  DollarSign,
  Stethoscope,
  Pill,
  Building,
  Phone,
  Shield,
  TrendingUp
} from 'lucide-react';

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  status?: 'completed' | 'current' | 'upcoming';
  icon?: string;
  details?: string[];
  resources?: { label: string; url: string; type: 'pdf' | 'video' | 'link' }[];
}

interface VisualJourneyMapProps {
  steps: JourneyStep[];
  title?: string;
  context?: 'healthcare' | 'technology';
}

const getIconComponent = (iconName?: string, context?: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'FileText': <FileText className="w-5 h-5" />,
    'Users': <Users className="w-5 h-5" />,
    'DollarSign': <DollarSign className="w-5 h-5" />,
    'Stethoscope': <Stethoscope className="w-5 h-5" />,
    'Pill': <Pill className="w-5 h-5" />,
    'Building': <Building className="w-5 h-5" />,
    'Phone': <Phone className="w-5 h-5" />,
    'Shield': <Shield className="w-5 h-5" />,
    'TrendingUp': <TrendingUp className="w-5 h-5" />,
  };

  if (iconName && iconMap[iconName]) {
    return iconMap[iconName];
  }

  // Default icons based on context
  return context === 'healthcare' ? <Stethoscope className="w-5 h-5" /> : <FileText className="w-5 h-5" />;
};

const getStatusIcon = (status?: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'current':
      return <Circle className="w-4 h-4 text-primary animate-pulse" />;
    case 'upcoming':
      return <Circle className="w-4 h-4 text-muted-foreground" />;
    default:
      return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return '📄';
    case 'video':
      return '🎥';
    default:
      return '🔗';
  }
};

export const VisualJourneyMap: React.FC<VisualJourneyMapProps> = ({ 
  steps, 
  title = "Journey Map",
  context = 'technology'
}) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-background to-muted/20 border-2 border-primary/20">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
          <span className="text-xl">🗺️</span>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Follow these steps to understand the complete process
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-primary/50 to-muted" />
              )}

              {/** Normalize status: never show first 3 steps as "upcoming" */}
              {(() => {
                const asNumber = parseInt(step.id as string, 10);
                const normalizedStatus = (step.status === 'upcoming' && !isNaN(asNumber) && asNumber <= 3)
                  ? (asNumber <= 2 ? 'completed' : 'current')
                  : step.status;
                
                return (
                  <div className="flex gap-3">
                    {/* Icon Circle */}
                    <div className={`
                      flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center
                      ${normalizedStatus === 'completed' ? 'bg-green-500/20 border-2 border-green-500' : 
                        normalizedStatus === 'current' ? 'bg-primary/20 border-2 border-primary animate-pulse' : 
                        'bg-muted border-2 border-muted-foreground/30'}
                    `}>
                      <div className={
                        normalizedStatus === 'completed' ? 'text-green-500' :
                        normalizedStatus === 'current' ? 'text-primary' :
                        'text-muted-foreground'
                      }>
                        {getIconComponent(step.icon, context)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start gap-2 mb-2">
                        {getStatusIcon(normalizedStatus)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">
                            {step.title}
                          </h4>
                          {normalizedStatus && (
                            <Badge 
                              variant={normalizedStatus === 'completed' ? 'default' : 'outline'}
                              className="mt-1 text-xs"
                            >
                              {String(normalizedStatus).charAt(0).toUpperCase() + String(normalizedStatus).slice(1)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>

                  {/* Details */}
                  {step.details && step.details.length > 0 && (
                    <ul className="space-y-1 mb-3">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Resources */}
                  {step.resources && step.resources.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {step.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
                        >
                          <span>{getResourceIcon(resource.type)}</span>
                          <span>{resource.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Step Arrow */}
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <ArrowRight className="w-4 h-4 text-primary" />
        <span>Complete each step to progress through the journey</span>
      </div>
    </Card>
  );
};
