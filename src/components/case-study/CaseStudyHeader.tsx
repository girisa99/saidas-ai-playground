import { StatusBadge } from "./StatusBadge";
import { CaseStudyData } from "@/data/caseStudies";
import { TrendingUp, Target, DollarSign, Star } from "lucide-react";

interface CaseStudyHeaderProps {
  caseStudyData: CaseStudyData;
}

export const CaseStudyHeader = ({ caseStudyData }: CaseStudyHeaderProps) => {
  const IconComponent = caseStudyData.icon;

  return (
    <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-br from-genie-primary/10 to-genie-secondary/10 border border-genie-primary/20">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-4 bg-genie-primary/20 rounded-xl">
          <IconComponent className="w-8 h-8 text-genie-primary" />
        </div>
        <div>
          <StatusBadge status={caseStudyData.status} />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{caseStudyData.title}</h1>
          <p className="text-xl text-muted-foreground mt-2">{caseStudyData.subtitle}</p>
        </div>
      </div>
      <p className="text-lg text-muted-foreground leading-relaxed">{caseStudyData.description}</p>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
          <TrendingUp className="w-6 h-6 text-genie-primary mx-auto mb-2" />
          <div className="font-bold text-genie-primary">{caseStudyData.metrics.efficiency}</div>
          <div className="text-sm text-muted-foreground">Efficiency Gain</div>
        </div>
        <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
          <Target className="w-6 h-6 text-genie-primary mx-auto mb-2" />
          <div className="font-bold text-genie-primary">{caseStudyData.metrics.accuracy}</div>
          <div className="text-sm text-muted-foreground">Accuracy Rate</div>
        </div>
        <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
          <DollarSign className="w-6 h-6 text-genie-primary mx-auto mb-2" />
          <div className="font-bold text-genie-primary">{caseStudyData.metrics.cost}</div>
          <div className="text-sm text-muted-foreground">Annual Savings</div>
        </div>
        <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-lg border">
          <Star className="w-6 h-6 text-genie-primary mx-auto mb-2" />
          <div className="font-bold text-genie-primary">{caseStudyData.metrics.satisfaction}</div>
          <div className="text-sm text-muted-foreground">Patient Rating</div>
        </div>
      </div>
    </div>
  );
};