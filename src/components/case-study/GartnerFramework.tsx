import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CaseStudyData } from "@/data/caseStudies";
import { ArrowDown, ArrowUp, CheckCircle } from "lucide-react";

interface GartnerFrameworkProps {
  gartnerFramework: CaseStudyData['gartnerFramework'];
}

export const GartnerFramework = ({ gartnerFramework }: GartnerFrameworkProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Value Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <ArrowDown className="w-5 h-5" />
            Value Creation (Give)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Listen & Sense</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueCreation.listen.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Design</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueCreation.design.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Build</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueCreation.build.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Deliver</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueCreation.deliver.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Value Realization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <ArrowUp className="w-5 h-5" />
            Value Realization (Get)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Efficiency</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueRealization.efficiency.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Experience</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueRealization.experience.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Growth</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueRealization.growth.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Innovation</h4>
            <ul className="space-y-1">
              {gartnerFramework.valueRealization.innovation.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};