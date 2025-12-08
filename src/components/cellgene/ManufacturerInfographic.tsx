import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Building2, TrendingUp, Beaker, DollarSign, Users, 
  Globe, Microscope, Factory, FlaskConical, Dna,
  Target, Award, Activity, BarChart3, PieChart
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ManufacturerData {
  name: string;
  type: 'pharma' | 'biotech' | 'technology' | 'cro' | 'healthcare' | 'research' | 'vc';
  headquarters: string;
  revenue?: string;
  products: number;
  pipeline: number;
  modalities: string[];
  focus: string[];
  website?: string;
}

const COMPREHENSIVE_MANUFACTURERS: ManufacturerData[] = [
  // Major Pharma
  { name: "Novartis", type: "pharma", headquarters: "Basel, Switzerland", revenue: "$51.6B", products: 2, pipeline: 45, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR-T", "Oncology", "Immunology"] },
  { name: "Bristol-Myers Squibb", type: "pharma", headquarters: "New York, USA", revenue: "$46.2B", products: 2, pipeline: 52, modalities: ["Cell Therapy"], focus: ["CAR-T", "Immuno-Oncology", "Multiple Myeloma"] },
  { name: "Gilead Sciences", type: "pharma", headquarters: "Foster City, USA", revenue: "$27.1B", products: 2, pipeline: 38, modalities: ["Cell Therapy"], focus: ["CAR-T", "Lymphoma", "Leukemia"] },
  { name: "Johnson & Johnson", type: "pharma", headquarters: "New Brunswick, USA", revenue: "$85.2B", products: 1, pipeline: 28, modalities: ["Cell Therapy"], focus: ["BCMA CAR-T", "Multiple Myeloma"] },
  { name: "Roche", type: "pharma", headquarters: "Basel, Switzerland", revenue: "$63.3B", products: 0, pipeline: 35, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Hemophilia", "Ophthalmology"] },
  { name: "Pfizer", type: "pharma", headquarters: "New York, USA", revenue: "$58.5B", products: 0, pipeline: 22, modalities: ["Gene Therapy"], focus: ["Hemophilia", "DMD", "Rare Diseases"] },
  { name: "AstraZeneca", type: "pharma", headquarters: "Cambridge, UK", revenue: "$44.4B", products: 0, pipeline: 18, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Oncology", "Autoimmune"] },
  { name: "Bayer", type: "pharma", headquarters: "Leverkusen, Germany", revenue: "$52.8B", products: 0, pipeline: 25, modalities: ["Gene Therapy", "Radioligand"], focus: ["Oncology", "Ophthalmology"] },

  // Leading Biotechs
  { name: "Regeneron", type: "biotech", headquarters: "Tarrytown, USA", revenue: "$13.2B", products: 0, pipeline: 32, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Ophthalmology", "Oncology", "Autoimmune"] },
  { name: "Vertex Pharmaceuticals", type: "biotech", headquarters: "Boston, USA", revenue: "$8.9B", products: 1, pipeline: 28, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Sickle Cell", "Thalassemia", "CRISPR"] },
  { name: "BioMarin", type: "biotech", headquarters: "San Rafael, USA", revenue: "$2.4B", products: 1, pipeline: 15, modalities: ["Gene Therapy"], focus: ["Hemophilia A", "Rare Diseases"] },
  { name: "Bluebird Bio", type: "biotech", headquarters: "Somerville, USA", revenue: "$78M", products: 2, pipeline: 8, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Beta-Thalassemia", "Sickle Cell", "Cerebral ALD"] },
  { name: "Sarepta Therapeutics", type: "biotech", headquarters: "Cambridge, USA", revenue: "$1.1B", products: 1, pipeline: 22, modalities: ["Gene Therapy"], focus: ["DMD", "LGMD", "Neuromuscular"] },
  { name: "Ultragenyx", type: "biotech", headquarters: "Novato, USA", revenue: "$430M", products: 0, pipeline: 12, modalities: ["Gene Therapy"], focus: ["Rare Metabolic", "Lysosomal Storage"] },
  { name: "Legend Biotech", type: "biotech", headquarters: "Somerset, USA", revenue: "$478M", products: 1, pipeline: 18, modalities: ["Cell Therapy"], focus: ["BCMA CAR-T", "Multiple Myeloma"] },
  { name: "Iovance Biotherapeutics", type: "biotech", headquarters: "San Carlos, USA", revenue: "$0", products: 1, pipeline: 12, modalities: ["Cell Therapy"], focus: ["TIL Therapy", "Solid Tumors"] },
  { name: "Allogene Therapeutics", type: "biotech", headquarters: "South San Francisco, USA", revenue: "$0", products: 0, pipeline: 15, modalities: ["Cell Therapy"], focus: ["Allogeneic CAR-T", "Off-the-Shelf"] },
  { name: "Fate Therapeutics", type: "biotech", headquarters: "San Diego, USA", revenue: "$23M", products: 0, pipeline: 10, modalities: ["Cell Therapy"], focus: ["iPSC-derived", "NK Cells"] },
  { name: "Orca Bio", type: "biotech", headquarters: "Menlo Park, USA", revenue: "$0", products: 0, pipeline: 5, modalities: ["Cell Therapy"], focus: ["High-Precision Cell Therapy", "Transplant"] },
  { name: "Cabaletta Bio", type: "biotech", headquarters: "Philadelphia, USA", revenue: "$0", products: 0, pipeline: 4, modalities: ["Cell Therapy"], focus: ["Autoimmune CAR-T", "Lupus", "MS"] },
  { name: "Poseida Therapeutics", type: "biotech", headquarters: "San Diego, USA", revenue: "$52M", products: 0, pipeline: 8, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Allogeneic CAR-T", "Gene Editing"] },
  { name: "CRISPR Therapeutics", type: "biotech", headquarters: "Zug, Switzerland", revenue: "$0", products: 1, pipeline: 12, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Gene Editing", "Sickle Cell"] },
  { name: "Editas Medicine", type: "biotech", headquarters: "Cambridge, USA", revenue: "$12M", products: 0, pipeline: 8, modalities: ["Gene Therapy"], focus: ["CRISPR Gene Editing", "Ophthalmology"] },
  { name: "Intellia Therapeutics", type: "biotech", headquarters: "Cambridge, USA", revenue: "$96M", products: 0, pipeline: 10, modalities: ["Gene Therapy"], focus: ["In-vivo Gene Editing", "ATTR"] },
  { name: "Beam Therapeutics", type: "biotech", headquarters: "Cambridge, USA", revenue: "$38M", products: 0, pipeline: 6, modalities: ["Gene Therapy"], focus: ["Base Editing", "Sickle Cell"] },
  { name: "Prime Medicine", type: "biotech", headquarters: "Cambridge, USA", revenue: "$0", products: 0, pipeline: 4, modalities: ["Gene Therapy"], focus: ["Prime Editing"] },
  { name: "Graphite Bio", type: "biotech", headquarters: "South San Francisco, USA", revenue: "$0", products: 0, pipeline: 3, modalities: ["Gene Therapy"], focus: ["Gene Correction", "Sickle Cell"] },
  { name: "Compass Therapeutics", type: "biotech", headquarters: "Cambridge, USA", revenue: "$0", products: 0, pipeline: 5, modalities: ["Cell Therapy"], focus: ["NK Cells", "Oncology"] },
  { name: "Autolus Therapeutics", type: "biotech", headquarters: "London, UK", revenue: "$0", products: 0, pipeline: 8, modalities: ["Cell Therapy"], focus: ["CAR-T", "Next-Gen Platforms"] },
  { name: "Mustang Bio", type: "biotech", headquarters: "Worcester, USA", revenue: "$0", products: 0, pipeline: 6, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR-T", "Bubble Boy Disease"] },
  { name: "Precision BioSciences", type: "biotech", headquarters: "Durham, USA", revenue: "$23M", products: 0, pipeline: 5, modalities: ["Gene Therapy"], focus: ["ARCUS Genome Editing"] },
  { name: "Caribou Biosciences", type: "biotech", headquarters: "Berkeley, USA", revenue: "$15M", products: 0, pipeline: 4, modalities: ["Cell Therapy"], focus: ["Allogeneic CAR-T", "chRDNA"] },
  
  // Radioligand Leaders
  { name: "Novartis (AAA)", type: "pharma", headquarters: "Basel, Switzerland", revenue: "Part of $51.6B", products: 2, pipeline: 15, modalities: ["Radioligand Therapy"], focus: ["NETs", "Prostate Cancer", "Theranostics"] },
  { name: "Telix Pharmaceuticals", type: "biotech", headquarters: "Melbourne, Australia", revenue: "$85M", products: 1, pipeline: 12, modalities: ["Radioligand Therapy"], focus: ["Kidney Cancer", "Prostate", "Brain Cancer"] },
  { name: "Point Biopharma", type: "biotech", headquarters: "Indianapolis, USA", revenue: "$0", products: 0, pipeline: 5, modalities: ["Radioligand Therapy"], focus: ["Prostate Cancer", "PSMA"] },
  { name: "RayzeBio", type: "biotech", headquarters: "San Diego, USA", revenue: "$0", products: 0, pipeline: 4, modalities: ["Radioligand Therapy"], focus: ["Actinium-225", "Solid Tumors"] },
  { name: "Lantheus Holdings", type: "biotech", headquarters: "Bedford, USA", revenue: "$1.2B", products: 2, pipeline: 8, modalities: ["Radioligand Therapy"], focus: ["Diagnostics", "PSMA Imaging"] },
  
  // Personalized Medicine / Diagnostics
  { name: "Foundation Medicine", type: "technology", headquarters: "Cambridge, USA", revenue: "$575M", products: 4, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Genomic Profiling", "Companion Dx"] },
  { name: "Guardant Health", type: "technology", headquarters: "Redwood City, USA", revenue: "$523M", products: 3, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Liquid Biopsy", "ctDNA"] },
  { name: "Tempus", type: "technology", headquarters: "Chicago, USA", revenue: "$531M", products: 5, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["AI/ML", "Genomics", "Clinical Data"] },
  { name: "Exact Sciences", type: "technology", headquarters: "Madison, USA", revenue: "$2.1B", products: 3, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Cancer Screening", "Genomics"] },
  { name: "Illumina", type: "technology", headquarters: "San Diego, USA", revenue: "$4.5B", products: 10, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Sequencing", "Genomics Platform"] },
  { name: "Natera", type: "technology", headquarters: "Austin, USA", revenue: "$871M", products: 4, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["MRD Detection", "Prenatal"] },
  
  // CROs
  { name: "IQVIA", type: "cro", headquarters: "Durham, USA", revenue: "$14.9B", products: 0, pipeline: 200, modalities: ["All Modalities"], focus: ["Clinical Trials", "Regulatory"] },
  { name: "PPD (Thermo Fisher)", type: "cro", headquarters: "Wilmington, USA", revenue: "$7.3B", products: 0, pipeline: 150, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CGT Trials", "Lab Services"] },
  { name: "Syneos Health", type: "cro", headquarters: "Morrisville, USA", revenue: "$5.4B", products: 0, pipeline: 100, modalities: ["All Modalities"], focus: ["Clinical Development", "Commercialization"] },
  { name: "Parexel", type: "cro", headquarters: "Durham, USA", revenue: "$2.8B", products: 0, pipeline: 80, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Regulatory Strategy", "CGT Expertise"] },
  
  // Contract Manufacturing (CDMOs)
  { name: "Lonza", type: "biotech", headquarters: "Basel, Switzerland", revenue: "$6.2B", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Manufacturing", "Viral Vectors"] },
  { name: "Catalent", type: "biotech", headquarters: "Somerset, USA", revenue: "$4.8B", products: 0, pipeline: 0, modalities: ["Gene Therapy"], focus: ["AAV Manufacturing", "Fill/Finish"] },
  { name: "Samsung Biologics", type: "biotech", headquarters: "Incheon, South Korea", revenue: "$2.1B", products: 0, pipeline: 0, modalities: ["Cell Therapy"], focus: ["Manufacturing", "CMO Services"] },
  { name: "WuXi AppTec", type: "biotech", headquarters: "Shanghai, China", revenue: "$5.9B", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CGT CDMO", "R&D Services"] },
  
  // Research Institutions
  { name: "MD Anderson Cancer Center", type: "research", headquarters: "Houston, USA", revenue: "N/A", products: 0, pipeline: 85, modalities: ["Cell Therapy"], focus: ["CAR-T Research", "Clinical Trials"] },
  { name: "Memorial Sloan Kettering", type: "research", headquarters: "New York, USA", revenue: "N/A", products: 0, pipeline: 75, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR Development", "Oncology"] },
  { name: "Fred Hutchinson Cancer Center", type: "research", headquarters: "Seattle, USA", revenue: "N/A", products: 0, pipeline: 65, modalities: ["Cell Therapy"], focus: ["BMT", "CAR-T", "Immunotherapy"] },
  { name: "Dana-Farber Cancer Institute", type: "research", headquarters: "Boston, USA", revenue: "N/A", products: 0, pipeline: 60, modalities: ["Cell Therapy"], focus: ["CAR-T", "Gene Therapy"] },
  { name: "St. Jude Children's Research", type: "research", headquarters: "Memphis, USA", revenue: "N/A", products: 0, pipeline: 40, modalities: ["Gene Therapy"], focus: ["Pediatric Gene Therapy", "Sickle Cell"] },
  
  // VC/Tech Investors Active in CGAT
  { name: "ARCH Venture Partners", type: "vc", headquarters: "Chicago, USA", revenue: "$4.5B AUM", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Early-Stage Biotech", "Platform Tech"] },
  { name: "Flagship Pioneering", type: "vc", headquarters: "Cambridge, USA", revenue: "$8B AUM", products: 0, pipeline: 0, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Novel Platforms", "Gene Editing"] },
  { name: "OrbiMed", type: "vc", headquarters: "New York, USA", revenue: "$18B AUM", products: 0, pipeline: 0, modalities: ["All Modalities"], focus: ["Healthcare Investment", "CGT Growth"] },
  { name: "RA Capital Management", type: "vc", headquarters: "Boston, USA", revenue: "$12B AUM", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Crossover Investment", "CGT"] },
  { name: "Deerfield Management", type: "vc", headquarters: "New York, USA", revenue: "$15B AUM", products: 0, pipeline: 0, modalities: ["All Modalities"], focus: ["Healthcare Investment"] },
];

const TYPE_COLORS: Record<string, string> = {
  pharma: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  biotech: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  technology: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  cro: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  healthcare: 'bg-red-500/20 text-red-400 border-red-500/30',
  research: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  vc: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  pharma: Building2,
  biotech: Dna,
  technology: Microscope,
  cro: FlaskConical,
  healthcare: Activity,
  research: Beaker,
  vc: TrendingUp,
};

export const ManufacturerInfographic: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const filteredManufacturers = selectedType === 'all' 
    ? COMPREHENSIVE_MANUFACTURERS 
    : COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === selectedType);
  
  const stats = {
    totalManufacturers: COMPREHENSIVE_MANUFACTURERS.length,
    totalProducts: COMPREHENSIVE_MANUFACTURERS.reduce((sum, m) => sum + m.products, 0),
    totalPipeline: COMPREHENSIVE_MANUFACTURERS.reduce((sum, m) => sum + m.pipeline, 0),
    byType: {
      pharma: COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === 'pharma').length,
      biotech: COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === 'biotech').length,
      technology: COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === 'technology').length,
      cro: COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === 'cro').length,
      research: COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === 'research').length,
      vc: COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === 'vc').length,
    }
  };
  
  const topByProducts = [...COMPREHENSIVE_MANUFACTURERS]
    .filter(m => m.products > 0)
    .sort((a, b) => b.products - a.products)
    .slice(0, 10);
    
  const topByPipeline = [...COMPREHENSIVE_MANUFACTURERS]
    .filter(m => m.pipeline > 0)
    .sort((a, b) => b.pipeline - a.pipeline)
    .slice(0, 10);

  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">
            CGAT Industry Landscape
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive overview of {stats.totalManufacturers}+ organizations driving Cell & Gene Therapy innovation
          </p>
        </motion.div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 border-genie-primary/20">
            <CardContent className="p-4 text-center">
              <Building2 className="h-8 w-8 mx-auto mb-2 text-genie-primary" />
              <div className="text-2xl font-bold text-foreground">{stats.totalManufacturers}</div>
              <div className="text-xs text-muted-foreground">Organizations</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-emerald-500/20">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
              <div className="text-2xl font-bold text-foreground">{stats.totalProducts}</div>
              <div className="text-xs text-muted-foreground">Approved Products</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <FlaskConical className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-foreground">{stats.totalPipeline}</div>
              <div className="text-xs text-muted-foreground">Pipeline Programs</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 border-amber-500/20">
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-amber-400" />
              <div className="text-2xl font-bold text-foreground">25+</div>
              <div className="text-xs text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leaders">Top Leaders</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="all">All Companies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* By Organization Type */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <PieChart className="h-5 w-5 text-genie-primary" />
                    By Organization Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(stats.byType).map(([type, count]) => {
                    const Icon = TYPE_ICONS[type] || Building2;
                    const percentage = Math.round((count / stats.totalManufacturers) * 100);
                    return (
                      <div key={type} className="flex items-center gap-3">
                        <Badge variant="outline" className={TYPE_COLORS[type]}>
                          <Icon className="h-3 w-3 mr-1" />
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Badge>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-genie-primary/60 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
              
              {/* By Modality */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5 text-genie-primary" />
                    By Therapeutic Modality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: 'Cell Therapy', count: COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes('Cell Therapy')).length },
                    { name: 'Gene Therapy', count: COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes('Gene Therapy')).length },
                    { name: 'Personalized Medicine', count: COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes('Personalized Medicine')).length },
                    { name: 'Radioligand Therapy', count: COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes('Radioligand Therapy')).length },
                    { name: 'All Modalities', count: COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes('All Modalities')).length },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <span className="text-sm text-foreground w-40">{item.name}</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500/60 rounded-full"
                          style={{ width: `${Math.round((item.count / stats.totalManufacturers) * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">{item.count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="leaders">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Top by Approved Products */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-emerald-400" />
                    Top by Approved Products
                  </CardTitle>
                  <CardDescription>Leaders with commercial CGT products</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {topByProducts.map((m, idx) => {
                        const Icon = TYPE_ICONS[m.type] || Building2;
                        return (
                          <div key={m.name} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                            <span className="text-lg font-bold text-genie-primary w-6">{idx + 1}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground truncate">{m.name}</span>
                                <Badge variant="outline" className={`${TYPE_COLORS[m.type]} text-xs`}>
                                  <Icon className="h-2.5 w-2.5 mr-1" />
                                  {m.type}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground">{m.focus.slice(0, 2).join(', ')}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-emerald-400">{m.products}</div>
                              <div className="text-xs text-muted-foreground">products</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              {/* Top by Revenue */}
              <Card className="bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-amber-400" />
                    Top by Revenue
                  </CardTitle>
                  <CardDescription>Largest organizations in CGAT space</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {COMPREHENSIVE_MANUFACTURERS
                        .filter(m => m.revenue && !m.revenue.includes('AUM') && m.revenue !== 'N/A')
                        .sort((a, b) => {
                          const parseRev = (r?: string) => {
                            if (!r) return 0;
                            const num = parseFloat(r.replace(/[^0-9.]/g, ''));
                            if (r.includes('B')) return num * 1000;
                            return num;
                          };
                          return parseRev(b.revenue) - parseRev(a.revenue);
                        })
                        .slice(0, 10)
                        .map((m, idx) => {
                          const Icon = TYPE_ICONS[m.type] || Building2;
                          return (
                            <div key={m.name} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                              <span className="text-lg font-bold text-genie-primary w-6">{idx + 1}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-foreground truncate">{m.name}</span>
                                  <Badge variant="outline" className={`${TYPE_COLORS[m.type]} text-xs`}>
                                    <Icon className="h-2.5 w-2.5 mr-1" />
                                    {m.type}
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">{m.headquarters}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-amber-400">{m.revenue}</div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="pipeline">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FlaskConical className="h-5 w-5 text-purple-400" />
                  Pipeline Leaders
                </CardTitle>
                <CardDescription>Organizations with most active clinical programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {topByPipeline.map((m, idx) => {
                    const Icon = TYPE_ICONS[m.type] || Building2;
                    return (
                      <div key={m.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                        <span className="text-xl font-bold text-genie-primary w-8">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{m.name}</span>
                            <Badge variant="outline" className={`${TYPE_COLORS[m.type]} text-xs`}>
                              <Icon className="h-2.5 w-2.5 mr-1" />
                              {m.type}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {m.modalities.slice(0, 2).map(mod => (
                              <Badge key={mod} variant="secondary" className="text-xs">
                                {mod}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-400">{m.pipeline}</div>
                          <div className="text-xs text-muted-foreground">programs</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>All Organizations</CardTitle>
                <CardDescription>
                  Filter by type:
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge 
                      variant={selectedType === 'all' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setSelectedType('all')}
                    >
                      All ({COMPREHENSIVE_MANUFACTURERS.length})
                    </Badge>
                    {Object.entries(stats.byType).map(([type, count]) => (
                      <Badge 
                        key={type}
                        variant={selectedType === type ? 'default' : 'outline'}
                        className={`cursor-pointer ${selectedType === type ? '' : TYPE_COLORS[type]}`}
                        onClick={() => setSelectedType(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)} ({count})
                      </Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredManufacturers.map((m) => {
                      const Icon = TYPE_ICONS[m.type] || Building2;
                      return (
                        <div key={m.name} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                          <div className="flex items-start justify-between mb-2">
                            <span className="font-medium text-foreground text-sm">{m.name}</span>
                            <Badge variant="outline" className={`${TYPE_COLORS[m.type]} text-xs`}>
                              <Icon className="h-2.5 w-2.5 mr-1" />
                              {m.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mb-2">{m.headquarters}</div>
                          <div className="flex gap-3 text-xs">
                            {m.products > 0 && (
                              <span className="text-emerald-400">{m.products} products</span>
                            )}
                            {m.pipeline > 0 && (
                              <span className="text-purple-400">{m.pipeline} pipeline</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {m.modalities.slice(0, 2).map(mod => (
                              <Badge key={mod} variant="secondary" className="text-[10px] px-1.5 py-0">
                                {mod}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ManufacturerInfographic;
