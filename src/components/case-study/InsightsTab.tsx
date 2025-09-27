import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseStudyData } from "@/data/caseStudies";
import { Lightbulb, AlertTriangle, TrendingUp } from "lucide-react";

interface InsightsTabProps {
  lessonsLearned: string[];
  nextSteps: string[];
}

export const InsightsTab = ({ lessonsLearned, nextSteps }: InsightsTabProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Lessons Learned */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <Lightbulb className="w-5 h-5" />
            Lessons Learned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {lessonsLearned.map((lesson, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                {lesson}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <TrendingUp className="w-5 h-5" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {nextSteps.map((step, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                {step}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};