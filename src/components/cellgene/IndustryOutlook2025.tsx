import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Target,
  Calendar,
  DollarSign,
  Microscope,
  Pill,
  Activity,
  Globe,
  Zap,
  Users,
  Rocket,
  Lightbulb,
  BarChart3
} from "lucide-react";

export const IndustryOutlook2025 = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-genie-accent/20 text-genie-accent border-genie-accent/30">
            <Calendar className="w-3 h-3 mr-1" />
            Industry Intelligence 2025-2026
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            CGAT <span className="text-genie-primary">Market Pulse</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time intelligence on approvals, market dynamics, and emerging opportunities 
            shaping the future of Cell & Gene Advanced Therapies
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - 2025 Highlights */}
          <Card className="p-8 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="h-8 w-8 text-genie-accent" />
              <h3 className="text-2xl font-bold">2025 Breakthrough Year</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  2025 marks a pivotal year for CGAT with landmark approvals, strategic consolidation, 
                  and unprecedented investment in next-generation modalities transforming the therapeutic landscape.
                </p>
              </div>
              
              <Separator />
              
              {/* Key Approvals */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-400" />
                  Landmark Approvals
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">Aucatzyl (obecabtagene)</p>
                        <p className="text-xs text-muted-foreground">Autolus • CAR-T for r/r B-ALL</p>
                      </div>
                      <Badge className="bg-blue-500/20 text-blue-400 text-xs">Cell</Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">Casgevy (CRISPR)</p>
                        <p className="text-xs text-muted-foreground">Vertex/CRISPR • First gene editing therapy</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 text-xs">Gene</Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">Pluvicto Expansion</p>
                        <p className="text-xs text-muted-foreground">Novartis • Earlier line mCRPC</p>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-400 text-xs">Radioligand</Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* M&A Activity */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-blue-400" />
                  Strategic Consolidation
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-lg font-bold text-foreground">$8.7B</p>
                    <p className="text-xs text-muted-foreground">AbbVie → Cerevel</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-lg font-bold text-foreground">$4.1B</p>
                    <p className="text-xs text-muted-foreground">BMS → RayzeBio</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-lg font-bold text-foreground">$3.5B</p>
                    <p className="text-xs text-muted-foreground">Novartis → Chinook</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-lg font-bold text-foreground">$1.4B</p>
                    <p className="text-xs text-muted-foreground">Lilly → Point Bio</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Big pharma consolidating radiopharmaceutical and advanced therapy capabilities
                </p>
              </div>
            </div>
          </Card>

          {/* Right Column - Cards Stack */}
          <div className="space-y-6">
            {/* Market Pressure Card */}
            <Card className="p-6 bg-gradient-to-r from-red-500/10 to-amber-500/10 border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-red-400" />
                <div>
                  <h4 className="font-bold text-xl text-red-400">Market Headwinds</h4>
                  <p className="text-sm text-muted-foreground">Closures, Pivots & Restructuring</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded bg-red-500/20">
                    <p className="text-xl font-bold text-red-400">7+</p>
                    <p className="text-xs text-muted-foreground">Shutdowns</p>
                  </div>
                  <div className="p-2 rounded bg-amber-500/20">
                    <p className="text-xl font-bold text-amber-400">$2B+</p>
                    <p className="text-xs text-muted-foreground">VC Decline</p>
                  </div>
                  <div className="p-2 rounded bg-orange-500/20">
                    <p className="text-xl font-bold text-orange-400">40%</p>
                    <p className="text-xs text-muted-foreground">Layoffs</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-3 w-3 text-red-400" />
                      Rubius Therapeutics
                    </span>
                    <span className="text-xs text-muted-foreground">Liquidated</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                    <span className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-amber-400" />
                      Graphite Bio
                    </span>
                    <span className="text-xs text-muted-foreground">Pivoted → LENZ</span>
                  </div>
                  <div className="flex items-center justify-between text-sm p-2 rounded bg-muted/30">
                    <span className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-orange-400" />
                      Fate Therapeutics
                    </span>
                    <span className="text-xs text-muted-foreground">Major restructure</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* 2026 Projections Card */}
            <Card className="p-6 bg-gradient-to-r from-genie-primary/10 to-genie-accent/10 border-genie-primary/20">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-genie-primary" />
                2026 Market Outlook
              </h4>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 rounded-lg bg-genie-primary/20">
                  <Globe className="h-5 w-5 mx-auto mb-1 text-genie-primary" />
                  <p className="text-lg font-bold">$52B</p>
                  <p className="text-xs text-muted-foreground">Market Size</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-emerald-500/20">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-emerald-400" />
                  <p className="text-lg font-bold">18%</p>
                  <p className="text-xs text-muted-foreground">CAGR</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-500/20">
                  <Microscope className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                  <p className="text-lg font-bold">15-20</p>
                  <p className="text-xs text-muted-foreground">New Approvals</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Key Milestones to Watch:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">Allogeneic CAR-T Approvals</Badge>
                  <Badge variant="secondary" className="text-xs">In Vivo Gene Editing P3</Badge>
                  <Badge variant="secondary" className="text-xs">mRNA Vaccines P3</Badge>
                  <Badge variant="secondary" className="text-xs">Base Editing Pivotal</Badge>
                </div>
              </div>
            </Card>
            
            {/* Trends Card */}
            <Card className="p-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-emerald-400" />
                Emerging Opportunities
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Allogeneic CAR-T</p>
                    <p className="text-xs text-muted-foreground">Off-the-shelf therapies reducing wait from weeks to days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">In Vivo Gene Editing</p>
                    <p className="text-xs text-muted-foreground">Direct CRISPR delivery without cell extraction</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Radioligand Expansion</p>
                    <p className="text-xs text-muted-foreground">New targets: FAP, SSTR, CXCR4 → $15B by 2030</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-4 w-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">AI-Driven Design</p>
                    <p className="text-xs text-muted-foreground">30% faster development timelines predicted</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Challenges Card */}
            <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-red-500/10 border-amber-500/20">
              <h4 className="font-bold text-lg mb-4 flex items-center">
                <TrendingDown className="h-6 w-6 mr-2 text-amber-400" />
                Critical Challenges
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-2">Manufacturing:</p>
                  <div className="space-y-1 text-muted-foreground text-xs">
                    <p>• 4-8 week wait times</p>
                    <p>• Capacity constraints</p>
                    <p>• Vein-to-vein complexity</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-2">Market Access:</p>
                  <div className="space-y-1 text-muted-foreground text-xs">
                    <p>• $400K+ pricing pressure</p>
                    <p>• Outcomes-based contracts</p>
                    <p>• Durability questions</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20">
            <Pill className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <p className="text-2xl font-bold">8+</p>
            <p className="text-sm text-muted-foreground">2025 Approvals</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
            <p className="text-2xl font-bold">$20B+</p>
            <p className="text-sm text-muted-foreground">M&A Volume</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
            <Activity className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Modalities Growing</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-genie-accent/20 to-genie-accent/5 border border-genie-accent/20">
            <Rocket className="h-8 w-8 mx-auto mb-2 text-genie-accent" />
            <p className="text-2xl font-bold">18%</p>
            <p className="text-sm text-muted-foreground">Projected Growth</p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-8 max-w-2xl mx-auto">
          Data compiled from FDA approvals, SEC filings, and industry reports. Market projections 
          are estimates based on analyst consensus. Information is for educational purposes only.
        </p>
      </div>
    </section>
  );
};
