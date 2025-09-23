import { GammaIntegrationWidget } from "./GammaIntegrationWidget";

interface ContentAnalysis {
  contentType: "journey" | "workflow" | "timeline" | "infographic" | "case-study";
  confidence: number;
  keywords: string[];
}

interface SmartGammaDetectorProps {
  content: string;
  title: string;
  data?: any;
  autoGenerate?: boolean;
  forceType?: "journey" | "workflow" | "timeline" | "infographic" | "case-study";
}

export const SmartGammaDetector = ({ 
  content, 
  title, 
  data, 
  autoGenerate = false,
  forceType 
}: SmartGammaDetectorProps) => {
  
  const analyzeContent = (text: string): ContentAnalysis => {
    const lowerText = text.toLowerCase();
    
    // Content type detection patterns
    const patterns = {
      journey: {
        keywords: ["journey", "story", "path", "progression", "evolution", "development", "experience", "timeline", "learning", "growth"],
        weight: 0
      },
      workflow: {
        keywords: ["workflow", "process", "steps", "procedure", "method", "implementation", "system", "operation", "automation", "pipeline"],
        weight: 0
      },
      timeline: {
        keywords: ["timeline", "chronology", "history", "dates", "milestones", "sequence", "phases", "roadmap", "schedule", "calendar"],
        weight: 0
      },
      infographic: {
        keywords: ["overview", "statistics", "data", "metrics", "comparison", "technology", "stack", "architecture", "ecosystem", "tools"],
        weight: 0
      },
      "case-study": {
        keywords: ["case", "study", "example", "project", "solution", "results", "impact", "success", "implementation", "outcome"],
        weight: 0
      }
    };

    // Calculate weights based on keyword matches
    Object.keys(patterns).forEach(type => {
      const typePatterns = patterns[type as keyof typeof patterns];
      typePatterns.keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const matches = text.match(regex)?.length || 0;
        typePatterns.weight += matches;
      });
    });

    // Find the type with highest weight
    let bestType: keyof typeof patterns = "infographic";
    let maxWeight = 0;
    let detectedKeywords: string[] = [];

    Object.entries(patterns).forEach(([type, pattern]) => {
      if (pattern.weight > maxWeight) {
        maxWeight = pattern.weight;
        bestType = type as keyof typeof patterns;
        detectedKeywords = pattern.keywords.filter(keyword => 
          new RegExp(`\\b${keyword}\\b`, 'i').test(text)
        );
      }
    });

    // Calculate confidence based on keyword density
    const confidence = Math.min(maxWeight / 3, 1); // Normalize to 0-1

    return {
      contentType: bestType,
      confidence,
      keywords: detectedKeywords
    };
  };

  const generateDescription = (analysis: ContentAnalysis, title: string): string => {
    const { contentType, keywords } = analysis;
    
    const templates = {
      journey: `Create interactive journey visualization of "${title}" showing progression, milestones, and key insights with visual storytelling elements`,
      workflow: `Generate comprehensive workflow diagram for "${title}" with step-by-step processes, decision points, and automation flows`,
      timeline: `Build chronological timeline presentation for "${title}" with dates, phases, and milestone achievements`,
      infographic: `Design professional infographic for "${title}" with statistics, comparisons, and visual data representation`,
      "case-study": `Develop detailed case study presentation for "${title}" showcasing methodology, results, and impact analysis`
    };

    return templates[contentType];
  };

  // Use forced type or analyze content
  const analysis = forceType 
    ? { contentType: forceType, confidence: 1, keywords: [] }
    : analyzeContent(`${title} ${content}`);

  const description = generateDescription(analysis, title);

  return (
    <div className="space-y-3">
      {/* Confidence indicator for manual selections */}
      {!forceType && analysis.confidence > 0.3 && (
        <div className="text-xs text-muted-foreground bg-genie-primary/5 p-2 rounded border-l-2 border-genie-primary/30">
          <span className="font-medium">Auto-detected:</span> {analysis.contentType} 
          <span className="ml-2 text-genie-primary">({Math.round(analysis.confidence * 100)}% confidence)</span>
          {analysis.keywords.length > 0 && (
            <div className="mt-1">
              <span className="font-medium">Keywords:</span> {analysis.keywords.slice(0, 3).join(", ")}
            </div>
          )}
        </div>
      )}
      
      <GammaIntegrationWidget
        contentType={analysis.contentType}
        title={`${analysis.contentType.charAt(0).toUpperCase() + analysis.contentType.slice(1)} - ${title}`}
        description={description}
        data={data}
        autoGenerate={autoGenerate}
        showInstructions={!autoGenerate}
      />
    </div>
  );
};