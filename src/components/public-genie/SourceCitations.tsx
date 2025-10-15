import { ExternalLink, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface CitationSource {
  id: string;
  title: string;
  url?: string;
  sourceName?: string;
  domain?: string;
  credibilityScore?: number;
  citationCount?: number;
  lastCited?: string;
}

interface SourceCitationsProps {
  sources: CitationSource[];
  conversationId?: string;
  onCitationClick?: (sourceId: string) => void;
}

export const SourceCitations = ({ sources, conversationId, onCitationClick }: SourceCitationsProps) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  const getCredibilityBadge = (score?: number) => {
    if (!score) return null;
    
    if (score >= 80) {
      return <Badge variant="default" className="text-xs">High Credibility</Badge>;
    } else if (score >= 60) {
      return <Badge variant="secondary" className="text-xs">Verified</Badge>;
    }
    return null;
  };

  const getDomainIcon = (domain?: string) => {
    switch (domain) {
      case 'medical_imaging':
      case 'patient_onboarding':
      case 'clinical_risk':
        return <Award className="h-3 w-3" />;
      default:
        return <BookOpen className="h-3 w-3" />;
    }
  };

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">
          Sources ({sources.length})
        </span>
      </div>
      
      <div className="space-y-2">
        {sources.map((source, index) => (
          <Card 
            key={source.id}
            className="hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => onCitationClick?.(source.id)}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <div className="mt-1 text-muted-foreground flex-shrink-0">
                    {getDomainIcon(source.domain)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-medium text-primary flex-shrink-0">
                        [{index + 1}]
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {source.title}
                        </p>
                        {source.sourceName && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {source.sourceName}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {getCredibilityBadge(source.credibilityScore)}
                      
                      {source.citationCount !== undefined && source.citationCount > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="text-xs flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                Cited {source.citationCount}x
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This source has been referenced {source.citationCount} times</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}

                      {source.url && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Source
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-3 italic">
        Information sourced from verified healthcare databases and treatment center directories. 
        Always verify critical medical information with healthcare professionals.
      </p>
    </div>
  );
};
