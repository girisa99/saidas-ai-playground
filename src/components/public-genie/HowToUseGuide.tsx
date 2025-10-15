import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Stethoscope, Calculator, MapPin, DollarSign, FileText } from "lucide-react";

export const HowToUseGuide = () => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">How to Use This Information</h3>
        </div>

        <Tabs defaultValue="patient" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patient" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="provider" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="counselor" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Counselors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patient" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Find Your Drug & Check Pricing</h4>
                  <p className="text-sm text-muted-foreground">
                    Search for your specific medication to see which pricing models apply to your insurance type.
                    Compare WAC (list price) vs. your actual cost.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Review Treatment Journey</h4>
                  <p className="text-sm text-muted-foreground">
                    Understand the complete timeline from enrollment to treatment and post-care monitoring.
                    See what to expect at each phase.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Financial Assistance Programs</h4>
                  <p className="text-sm text-muted-foreground">
                    Look up Patient Assistance Program (PAP) availability for free or reduced-cost medication.
                    Contact the manufacturer's patient support program listed.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium mb-2">💡 Pro Tip:</p>
                <p className="text-xs text-muted-foreground">
                  Ask Genie: "What's the cost of [drug name] with my [insurance type]?"
                  or "Show me treatment centers near me that offer [drug name]"
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="provider" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Reference NDC Codes</h4>
                  <p className="text-sm text-muted-foreground">
                    Use National Drug Codes for accurate ordering and billing.
                    Each product listing includes complete NDC information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Care Coordination</h4>
                  <p className="text-sm text-muted-foreground">
                    Review treatment journey phases to coordinate patient care effectively.
                    Understand pre-infusion requirements, manufacturing timelines, and post-treatment monitoring.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Prior Authorization Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Check PA requirements before prescribing to avoid delays.
                    Understand insurance coverage patterns for different payers.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium mb-2">💡 Quick Access:</p>
                <p className="text-xs text-muted-foreground">
                  Ask Genie: "What are the PA requirements for [drug name]?"
                  or "Show me the treatment timeline for [therapeutic area]"
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="counselor" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calculator className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Compare Pricing Models</h4>
                  <p className="text-sm text-muted-foreground">
                    Compare WAC, Government (340B), Commercial, and PAP pricing side-by-side.
                    Estimate patient out-of-pocket costs based on insurance type.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Identify Assistance Programs</h4>
                  <p className="text-sm text-muted-foreground">
                    Find applicable Patient Assistance Programs, copay cards, and foundation support.
                    Understand which programs patients qualify for based on insurance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Navigate Coverage Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Guide patients through PA requirements and appeal processes.
                    Optimize timing for benefit year considerations (deductibles, out-of-pocket max).
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium mb-2">💡 Counseling Tool:</p>
                <p className="text-xs text-muted-foreground">
                  Ask Genie: "Compare costs for [drug name] across all insurance types"
                  or "What financial assistance is available for Medicare patients on [drug name]?"
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 bg-accent/20 rounded-lg mt-4">
          <p className="text-sm font-medium mb-2">🗺️ Interactive Map Features:</p>
          <ul className="text-xs text-muted-foreground space-y-1 ml-4">
            <li>• Search treatment centers by drug/product availability</li>
            <li>• Filter by therapeutic area, manufacturer, or clinical trials</li>
            <li>• View center details including pricing support programs</li>
            <li>• Find NCI-designated and FACT-accredited centers</li>
            <li>• Access provider contact information and patient services</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
