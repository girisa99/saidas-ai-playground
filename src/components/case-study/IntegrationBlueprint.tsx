import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CaseStudyData } from "@/data/caseStudies";
import { GitBranch, CheckCircle, ArrowRight } from "lucide-react";

interface IntegrationBlueprintProps {
  integrationBlueprint: CaseStudyData['integrationBlueprint'];
}

export const IntegrationBlueprint = ({ integrationBlueprint }: IntegrationBlueprintProps) => {
  return (
    <div className="space-y-8">
      {/* Phase 1 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-500" />
            Phase 1: Foundation
            <Badge variant="outline" className="ml-2">Core Systems</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {integrationBlueprint.phase1.map((item, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Phase 2 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-500" />
            Phase 2: Enhancement
            <Badge variant="outline" className="ml-2">AI Integration</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {integrationBlueprint.phase2.map((item, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Phase 3 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-green-500" />
            Phase 3: Optimization
            <Badge variant="outline" className="ml-2">Advanced Features</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {integrationBlueprint.phase3.map((item, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};