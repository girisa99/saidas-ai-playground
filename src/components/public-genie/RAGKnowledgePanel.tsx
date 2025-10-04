import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Database, ExternalLink } from 'lucide-react';

interface RAGKnowledgePanelProps {
  ragContext?: {
    retrievedCount: number;
    datasets: string[];
    topFindings: string[];
  };
}

export const RAGKnowledgePanel: React.FC<RAGKnowledgePanelProps> = ({ ragContext }) => {
  if (!ragContext || ragContext.retrievedCount === 0) {
    return null;
  }

  return (
    <Card className="p-4 bg-primary/5 dark:bg-primary/10 border-primary/20">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Brain className="h-4 w-4 text-primary" />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Database className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium">
              RAG-Enhanced Analysis
            </span>
            <Badge variant="outline" className="text-[10px]">
              {ragContext.retrievedCount} sources
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              This analysis leverages authoritative medical imaging datasets:
            </p>
            
            <div className="flex flex-wrap gap-1">
              {ragContext.datasets.map((dataset, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-[9px] font-mono"
                >
                  {dataset}
                </Badge>
              ))}
            </div>
            
            {ragContext.topFindings.length > 0 && (
              <div className="space-y-1 pt-2 border-t border-border/50">
                <p className="text-[10px] font-medium text-muted-foreground">
                  Referenced Findings:
                </p>
                <ul className="space-y-0.5">
                  {ragContext.topFindings.map((finding, index) => (
                    <li key={index} className="text-[10px] text-muted-foreground flex items-start gap-1">
                      <span className="text-primary">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <a
              href="https://www.grand-challenge.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline mt-2"
            >
              Learn about medical imaging datasets
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};
