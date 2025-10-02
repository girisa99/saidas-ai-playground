import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BusinessCase } from "@/data/businessUseCases";

interface ExperimentStatusCardsProps {
  businessCases: Record<string, BusinessCase>;
  selectedBusinessCase: string;
  onBusinessCaseSelect: (key: string) => void;
}

const phaseMapping: Record<string, { label: string; color: string }> = {
  oncology: { label: "Validate", color: "bg-blue-100 text-blue-700 border-blue-300" },
  referral: { label: "Lead to Deploy", color: "bg-green-100 text-green-700 border-green-300" },
  contact: { label: "Experiment", color: "bg-purple-100 text-purple-700 border-purple-300" }
};

export const ExperimentStatusCards = ({ 
  businessCases, 
  selectedBusinessCase, 
  onBusinessCaseSelect 
}: ExperimentStatusCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {Object.entries(businessCases).map(([key, businessCase]) => {
        const phase = phaseMapping[key] || { label: "Experiment", color: "bg-purple-100 text-purple-700 border-purple-300" };
        
        return (
          <Card 
            key={key} 
            className={`cursor-pointer transition-all duration-200 ${
              selectedBusinessCase === key 
                ? 'ring-2 ring-primary shadow-lg scale-105' 
                : 'hover:shadow-md hover:scale-102'
            } border-purple-200 bg-gradient-to-br from-purple-50/50 to-blue-50/30`}
            onClick={() => onBusinessCaseSelect(key)}
          >
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <businessCase.icon className="w-12 h-12 text-primary mr-3" />
                <Badge className={phase.color}>
                  {phase.label}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2">{businessCase.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{businessCase.description}</p>
              <div className="text-xs text-purple-600 font-medium">
                {selectedBusinessCase === key ? 'Currently Selected' : 'Click to Explore'}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};