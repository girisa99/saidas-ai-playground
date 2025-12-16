import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Users,
  Microscope,
  Pill,
  Activity,
  Globe,
  Zap
} from "lucide-react";

interface ApprovalData {
  product: string;
  manufacturer: string;
  indication: string;
  modality: string;
  approvalDate: string;
  significance: string;
}

interface MergerData {
  acquirer: string;
  target: string;
  value: string;
  date: string;
  rationale: string;
  modality: string;
}

interface ClosureData {
  company: string;
  type: 'shutdown' | 'pivot' | 'layoff' | 'restructure';
  date: string;
  reason: string;
  impact: string;
}

interface TrendData {
  trend: string;
  type: 'opportunity' | 'challenge' | 'watch';
  description: string;
  impact: string;
}

// 2025 FDA Approvals Data
const APPROVALS_2025: ApprovalData[] = [
  // Cell Therapy
  {
    product: "Aucatzyl (obecabtagene autoleucel)",
    manufacturer: "Autolus Therapeutics",
    indication: "Adult r/r B-cell ALL",
    modality: "Cell",
    approvalDate: "Jan 2025",
    significance: "First approval for Autolus, expands CAR-T options in ALL"
  },
  {
    product: "Casgevy (exagamglogene autotemcel)",
    manufacturer: "Vertex/CRISPR",
    indication: "Sickle cell disease, Beta-thalassemia",
    modality: "Gene",
    approvalDate: "2024-2025",
    significance: "First CRISPR-based therapy approved globally"
  },
  {
    product: "Lyfgenia (lovotibeglogene autotemcel)",
    manufacturer: "bluebird bio",
    indication: "Sickle cell disease",
    modality: "Gene",
    approvalDate: "Dec 2023-2025",
    significance: "Gene therapy for SCD, rolling global approvals"
  },
  // Radioligand
  {
    product: "Pluvicto (Lu-177 PSMA)",
    manufacturer: "Novartis",
    indication: "mCRPC (expanded indications)",
    modality: "Radioligand",
    approvalDate: "2024-2025",
    significance: "Label expansions for earlier line treatment"
  },
  {
    product: "Lutathera (Lu-177 dotatate)",
    manufacturer: "Novartis",
    indication: "NETs (expanded)",
    modality: "Radioligand",
    approvalDate: "Ongoing",
    significance: "Continued expansion in neuroendocrine tumors"
  },
  // Advanced Therapies
  {
    product: "Elevidys (delandistrogene moxeparvovec)",
    manufacturer: "Sarepta",
    indication: "Duchenne muscular dystrophy",
    modality: "Advanced",
    approvalDate: "2023-2025",
    significance: "First gene therapy for DMD, post-market commitments ongoing"
  },
  {
    product: "Roctavian (valoctocogene roxaparvovec)",
    manufacturer: "BioMarin",
    indication: "Hemophilia A",
    modality: "Advanced",
    approvalDate: "2023-2025",
    significance: "One-time gene therapy for Hemophilia A"
  },
  // Personalized Medicine
  {
    product: "Autogene Cevumeran",
    manufacturer: "BioNTech/Genentech",
    indication: "Pancreatic cancer (adjuvant)",
    modality: "Personalized",
    approvalDate: "Phase 2/3 (2025)",
    significance: "Individualized neoantigen mRNA vaccine"
  }
];

// 2025 M&A Activity
const MERGERS_2025: MergerData[] = [
  {
    acquirer: "AbbVie",
    target: "Cerevel Therapeutics",
    value: "$8.7B",
    date: "Q1 2025",
    rationale: "Neuroscience pipeline expansion",
    modality: "Advanced"
  },
  {
    acquirer: "Johnson & Johnson",
    target: "Ambrx Biopharma",
    value: "$2B",
    date: "2024-2025",
    rationale: "ADC and engineered antibody capabilities",
    modality: "Advanced"
  },
  {
    acquirer: "Novartis",
    target: "Chinook Therapeutics",
    value: "$3.5B",
    date: "2024-2025",
    rationale: "Kidney disease pipeline",
    modality: "Advanced"
  },
  {
    acquirer: "AstraZeneca",
    target: "Gracell Biotechnologies",
    value: "$1.2B",
    date: "2024",
    rationale: "Next-gen CAR-T and cell therapy",
    modality: "Cell"
  },
  {
    acquirer: "Bristol Myers Squibb",
    target: "RayzeBio",
    value: "$4.1B",
    date: "Q1 2025",
    rationale: "Radiopharmaceutical expansion",
    modality: "Radioligand"
  },
  {
    acquirer: "Eli Lilly",
    target: "Point Biopharma",
    value: "$1.4B",
    date: "2024",
    rationale: "Radioligand therapy capabilities",
    modality: "Radioligand"
  }
];

// 2025 Closures/Pivots
const CLOSURES_2025: ClosureData[] = [
  {
    company: "Graphite Bio",
    type: "pivot",
    date: "2024",
    reason: "Clinical setback in gene editing program",
    impact: "Shifted to become LENZ Therapeutics via merger"
  },
  {
    company: "Rubius Therapeutics",
    type: "shutdown",
    date: "2024",
    reason: "Financial constraints, pipeline failures",
    impact: "Liquidated assets, red blood cell therapy abandoned"
  },
  {
    company: "Poseida Therapeutics",
    type: "restructure",
    date: "2024-2025",
    reason: "Strategic refocus on lead programs",
    impact: "50% workforce reduction"
  },
  {
    company: "Fate Therapeutics",
    type: "restructure",
    date: "2024",
    reason: "Pipeline prioritization, cash runway",
    impact: "Major layoffs, iPSC programs narrowed"
  },
  {
    company: "Precision BioSciences",
    type: "pivot",
    date: "2024",
    reason: "CAR-T development challenges",
    impact: "Focus shift to in vivo gene editing"
  },
  {
    company: "Beam Therapeutics",
    type: "layoff",
    date: "2024",
    reason: "Operational efficiency, R&D focus",
    impact: "15% workforce reduction"
  },
  {
    company: "LogicBio Therapeutics",
    type: "shutdown",
    date: "2024",
    reason: "Failed to secure funding/partnership",
    impact: "Gene editing company ceased operations"
  }
];

// 2026 Projections
const PROJECTIONS_2026 = {
  marketSize: "$52B",
  growth: "18% CAGR",
  approvalsPredicted: "15-20 new therapies",
  keyMilestones: [
    "First allogeneic CAR-T approvals expected",
    "In vivo gene editing Phase 3 readouts",
    "Expanded radioligand indications (PSMA, FAP)",
    "mRNA cancer vaccines Phase 3 data",
    "Base editing therapies advancing to pivotal"
  ]
};

// 2026 Trends
const TRENDS_2026: TrendData[] = [
  {
    trend: "Allogeneic CAR-T Breakthrough",
    type: "opportunity",
    description: "Off-the-shelf CAR-T therapies from multiple companies approaching approval",
    impact: "Could reduce manufacturing time from weeks to days"
  },
  {
    trend: "In Vivo Gene Editing",
    type: "opportunity",
    description: "CRISPR delivered directly to patients without cell extraction",
    impact: "Potential for one-time treatments of genetic diseases"
  },
  {
    trend: "Radioligand Expansion",
    type: "opportunity",
    description: "New targets beyond PSMA (FAP, SSTR, CXCR4)",
    impact: "Market could reach $15B by 2030"
  },
  {
    trend: "Manufacturing Bottlenecks",
    type: "challenge",
    description: "Autologous production capacity limiting patient access",
    impact: "Wait times of 4-8 weeks affecting outcomes"
  },
  {
    trend: "Reimbursement Pressure",
    type: "challenge",
    description: "Payers pushing back on $400K+ therapies",
    impact: "Outcomes-based contracts becoming standard"
  },
  {
    trend: "China Competition",
    type: "watch",
    description: "Chinese biotechs advancing competitive CAR-T and gene therapies",
    impact: "Pricing pressure and global market dynamics"
  },
  {
    trend: "AI-Driven Drug Design",
    type: "opportunity",
    description: "Machine learning accelerating target discovery and optimization",
    impact: "30% faster development timelines predicted"
  },
  {
    trend: "Durability Questions",
    type: "challenge",
    description: "Long-term efficacy data showing some therapies losing effect",
    impact: "Re-treatment strategies and combination approaches needed"
  }
];

const MODALITY_COLORS: Record<string, string> = {
  Cell: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Gene: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Radioligand: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Advanced: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Personalized: "bg-pink-500/20 text-pink-400 border-pink-500/30"
};

const TYPE_ICONS = {
  shutdown: XCircle,
  pivot: ArrowRight,
  layoff: Users,
  restructure: Building2
};

const TYPE_COLORS = {
  shutdown: "text-red-400",
  pivot: "text-amber-400",
  layoff: "text-orange-400",
  restructure: "text-blue-400"
};

export const IndustryOutlook2025 = () => {
  const [selectedModality, setSelectedModality] = useState<string>("all");

  const filteredApprovals = selectedModality === "all" 
    ? APPROVALS_2025 
    : APPROVALS_2025.filter(a => a.modality === selectedModality);

  const filteredMergers = selectedModality === "all"
    ? MERGERS_2025
    : MERGERS_2025.filter(m => m.modality === selectedModality);

  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-genie-accent/20 text-genie-accent border-genie-accent/30">
            <Calendar className="w-3 h-3 mr-1" />
            Industry Outlook 2025-2026
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CGAT Market Intelligence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track approvals, M&A activity, market shifts, and emerging trends shaping 
            Cell & Gene Advanced Therapies
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["all", "Cell", "Gene", "Radioligand", "Advanced", "Personalized"].map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedModality(mod)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedModality === mod
                  ? "bg-genie-primary text-white"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {mod === "all" ? "All Modalities" : mod}
            </button>
          ))}
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="approvals" className="text-xs md:text-sm">
              <CheckCircle2 className="w-4 h-4 mr-1 hidden md:inline" />
              2025 Approvals
            </TabsTrigger>
            <TabsTrigger value="mergers" className="text-xs md:text-sm">
              <Building2 className="w-4 h-4 mr-1 hidden md:inline" />
              M&A Activity
            </TabsTrigger>
            <TabsTrigger value="closures" className="text-xs md:text-sm">
              <XCircle className="w-4 h-4 mr-1 hidden md:inline" />
              Closures
            </TabsTrigger>
            <TabsTrigger value="projections" className="text-xs md:text-sm">
              <Target className="w-4 h-4 mr-1 hidden md:inline" />
              2026 Outlook
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs md:text-sm">
              <TrendingUp className="w-4 h-4 mr-1 hidden md:inline" />
              Trends
            </TabsTrigger>
          </TabsList>

          {/* 2025 Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApprovals.map((approval, idx) => (
                <Card key={idx} className="bg-card/50 border-border/50 hover:border-genie-primary/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base font-semibold text-foreground">
                        {approval.product}
                      </CardTitle>
                      <Badge className={`text-xs shrink-0 ${MODALITY_COLORS[approval.modality]}`}>
                        {approval.modality}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{approval.manufacturer}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Pill className="w-4 h-4 text-genie-accent" />
                      <span className="text-foreground/80">{approval.indication}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {approval.approvalDate}
                    </div>
                    <p className="text-xs text-muted-foreground/80 italic mt-2">
                      {approval.significance}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredApprovals.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No approvals in selected modality
              </p>
            )}
          </TabsContent>

          {/* M&A Tab */}
          <TabsContent value="mergers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMergers.map((merger, idx) => (
                <Card key={idx} className="bg-card/50 border-border/50 hover:border-emerald-500/50 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{merger.acquirer}</p>
                        <p className="text-xs text-muted-foreground">Acquirer</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-genie-accent" />
                      <div className="flex-1 text-right">
                        <p className="font-semibold text-foreground">{merger.target}</p>
                        <p className="text-xs text-muted-foreground">Target</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {merger.value}
                      </Badge>
                      <Badge className={`${MODALITY_COLORS[merger.modality]}`}>
                        {merger.modality}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{merger.rationale}</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">{merger.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredMergers.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No M&A activity in selected modality
              </p>
            )}
          </TabsContent>

          {/* Closures Tab */}
          <TabsContent value="closures" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CLOSURES_2025.map((closure, idx) => {
                const Icon = TYPE_ICONS[closure.type];
                return (
                  <Card key={idx} className="bg-card/50 border-border/50 hover:border-red-500/30 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{closure.company}</h4>
                          <p className="text-xs text-muted-foreground">{closure.date}</p>
                        </div>
                        <div className={`flex items-center gap-1 ${TYPE_COLORS[closure.type]}`}>
                          <Icon className="w-4 h-4" />
                          <span className="text-xs capitalize">{closure.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{closure.reason}</p>
                      <div className="flex items-start gap-2 text-xs">
                        <AlertTriangle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground/80">{closure.impact}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* 2026 Projections Tab */}
          <TabsContent value="projections" className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-genie-primary/20 to-genie-primary/5 border-genie-primary/30">
                <CardContent className="pt-6 text-center">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-genie-primary" />
                  <p className="text-2xl font-bold text-foreground">{PROJECTIONS_2026.marketSize}</p>
                  <p className="text-xs text-muted-foreground">Global Market Size</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border-emerald-500/30">
                <CardContent className="pt-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                  <p className="text-2xl font-bold text-foreground">{PROJECTIONS_2026.growth}</p>
                  <p className="text-xs text-muted-foreground">Expected Growth</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
                <CardContent className="pt-6 text-center">
                  <Microscope className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-2xl font-bold text-foreground">{PROJECTIONS_2026.approvalsPredicted}</p>
                  <p className="text-xs text-muted-foreground">New Approvals</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 border-purple-500/30">
                <CardContent className="pt-6 text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-2xl font-bold text-foreground">5+</p>
                  <p className="text-xs text-muted-foreground">Key Milestones</p>
                </CardContent>
              </Card>
            </div>

            {/* Key Milestones */}
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-genie-accent" />
                  Key 2026 Milestones to Watch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {PROJECTIONS_2026.keyMilestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-genie-primary/20 flex items-center justify-center text-genie-primary text-xs font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-foreground/90">{milestone}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Opportunities */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                  Opportunities
                </h3>
                {TRENDS_2026.filter(t => t.type === 'opportunity').map((trend, idx) => (
                  <Card key={idx} className="bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-foreground mb-2">{trend.trend}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                      <div className="flex items-start gap-2 text-xs text-emerald-400/80">
                        <TrendingUp className="w-3 h-3 mt-0.5 shrink-0" />
                        {trend.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Challenges */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  Challenges
                </h3>
                {TRENDS_2026.filter(t => t.type === 'challenge').map((trend, idx) => (
                  <Card key={idx} className="bg-red-500/5 border-red-500/20 hover:border-red-500/40 transition-all">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-foreground mb-2">{trend.trend}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                      <div className="flex items-start gap-2 text-xs text-red-400/80">
                        <TrendingDown className="w-3 h-3 mt-0.5 shrink-0" />
                        {trend.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Watch List */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-400">
                  <Activity className="w-5 h-5" />
                  Watch List
                </h3>
                {TRENDS_2026.filter(t => t.type === 'watch').map((trend, idx) => (
                  <Card key={idx} className="bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40 transition-all">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold text-foreground mb-2">{trend.trend}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                      <div className="flex items-start gap-2 text-xs text-amber-400/80">
                        <Activity className="w-3 h-3 mt-0.5 shrink-0" />
                        {trend.impact}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-8 max-w-2xl mx-auto">
          Data compiled from FDA approvals, SEC filings, and industry reports. Market projections 
          are estimates based on analyst consensus. Information is for educational purposes only.
        </p>
      </div>
    </section>
  );
};
