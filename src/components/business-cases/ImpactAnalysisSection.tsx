import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, CheckCircle } from "lucide-react";
import { BusinessCase } from "@/data/businessUseCases";

interface ImpactAnalysisSectionProps {
  currentCase: BusinessCase;
}

export const ImpactAnalysisSection = ({ currentCase }: ImpactAnalysisSectionProps) => {
  return (
    <Card className="w-full mx-auto max-w-7xl">
      <CardHeader className="px-4 sm:px-6 lg:px-8">
        <CardTitle className="text-lg sm:text-xl md:text-2xl text-center">Overall Impact Analysis</CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
              Current Issues
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {currentCase.currentIssues.map((issue, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 rounded-lg border border-red-200">
                  <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-red-700 leading-relaxed">{issue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              Expected Improvements
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {currentCase.expectedImprovements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-700 leading-relaxed">{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};