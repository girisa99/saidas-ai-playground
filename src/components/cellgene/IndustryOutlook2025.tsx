import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  TrendingUp, 
  Calendar,
  Building2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Filter,
  Target,
  Microscope,
  Dna,
  HeartPulse,
  Atom,
  Radiation,
  ExternalLink,
  DollarSign,
  Users,
  Pill,
  Activity,
  FileText,
  Clock,
  MapPin,
  Info
} from 'lucide-react';

type Modality = 'all' | 'car-t' | 'gene' | 'personalized' | 'advanced' | 'radioligand';

interface TimelineItem {
  year: number;
  name: string;
  company: string;
  modality: Modality;
  type: 'approval' | 'closure' | 'merger';
  description?: string;
  indication?: string;
  price?: string;
  mechanism?: string;
  milestone?: string;
  url?: string;
  patients?: string;
  status?: string;
}

const modalityConfig: Record<Modality, { label: string; color: string; icon: React.ReactNode; bgClass: string; marker: string }> = {
  'all': { label: 'All', color: 'text-foreground', icon: <Filter className="w-4 h-4" />, bgClass: 'bg-muted', marker: '●' },
  'car-t': { label: 'CAR-T Cell', color: 'text-green-500', icon: <Microscope className="w-4 h-4" />, bgClass: 'bg-green-500/20', marker: '▲' },
  'gene': { label: 'Gene Therapy', color: 'text-blue-500', icon: <Dna className="w-4 h-4" />, bgClass: 'bg-blue-500/20', marker: '▼' },
  'personalized': { label: 'Personalized', color: 'text-purple-500', icon: <HeartPulse className="w-4 h-4" />, bgClass: 'bg-purple-500/20', marker: '◆' },
  'advanced': { label: 'Advanced', color: 'text-amber-500', icon: <Atom className="w-4 h-4" />, bgClass: 'bg-amber-500/20', marker: '★' },
  'radioligand': { label: 'Radioligand', color: 'text-red-500', icon: <Radiation className="w-4 h-4" />, bgClass: 'bg-red-500/20', marker: '◉' }
};

const timelineData: TimelineItem[] = [
  // Approvals
  { year: 2010, name: 'PROVENGE', company: 'Dendreon Corp', modality: 'car-t', type: 'approval', indication: 'Metastatic Castration-Resistant Prostate Cancer', mechanism: 'Autologous cellular immunotherapy', price: '$93,000', milestone: 'First FDA-approved cancer vaccine' },
  { year: 2015, name: 'IMLYGIC', company: 'Amgen (Biovex)', modality: 'gene', type: 'approval', indication: 'Melanoma', mechanism: 'Oncolytic viral therapy (HSV-1)', price: '$65,000', milestone: 'First oncolytic virus therapy' },
  { year: 2017, name: 'KYMRIAH', company: 'Novartis', modality: 'car-t', type: 'approval', indication: 'r/r B-cell ALL, DLBCL', mechanism: 'CD19-directed CAR-T', price: '$475,000', milestone: 'First CAR-T therapy approved', patients: '10,000+ treated globally' },
  { year: 2017, name: 'YESCARTA', company: 'Kite Pharma (Gilead)', modality: 'car-t', type: 'approval', indication: 'r/r Large B-Cell Lymphoma', mechanism: 'CD19-directed CAR-T', price: '$373,000', milestone: 'Second CAR-T approval' },
  { year: 2017, name: 'LUXTURNA', company: 'Spark Therapeutics', modality: 'gene', type: 'approval', indication: 'Inherited Retinal Dystrophy (RPE65)', mechanism: 'AAV2-hRPE65 gene therapy', price: '$850,000', milestone: 'First gene therapy for genetic disease' },
  { year: 2019, name: 'ZOLGENSMA', company: 'Novartis', modality: 'gene', type: 'approval', indication: 'Spinal Muscular Atrophy (SMA)', mechanism: 'AAV9-SMN1 gene replacement', price: '$2,125,000', milestone: 'Most expensive drug ever at approval', patients: '3,000+ patients treated' },
  { year: 2020, name: 'TECARTUS', company: 'Kite Pharma (Gilead)', modality: 'car-t', type: 'approval', indication: 'Mantle Cell Lymphoma', mechanism: 'CD19-directed CAR-T', price: '$373,000' },
  { year: 2021, name: 'ABECMA', company: 'Bristol Myers Squibb', modality: 'car-t', type: 'approval', indication: 'r/r Multiple Myeloma', mechanism: 'BCMA-directed CAR-T', price: '$419,500', milestone: 'First BCMA CAR-T' },
  { year: 2021, name: 'BREYANZI', company: 'Bristol Myers Squibb', modality: 'car-t', type: 'approval', indication: 'r/r Large B-Cell Lymphoma', mechanism: 'CD19-directed CAR-T', price: '$410,300' },
  { year: 2022, name: 'CARVYKTI', company: 'Janssen (J&J)', modality: 'car-t', type: 'approval', indication: 'r/r Multiple Myeloma', mechanism: 'BCMA-directed CAR-T', price: '$465,000', milestone: 'Second BCMA CAR-T' },
  { year: 2022, name: 'HEMGENIX', company: 'CSL Behring', modality: 'gene', type: 'approval', indication: 'Hemophilia B', mechanism: 'AAV5-Padua FIX gene therapy', price: '$3,500,000', milestone: 'New most expensive drug' },
  { year: 2022, name: 'SKYSONA', company: 'bluebird bio', modality: 'gene', type: 'approval', indication: 'Cerebral Adrenoleukodystrophy', mechanism: 'Lentiviral ABCD1 gene therapy', price: '$3,000,000' },
  { year: 2022, name: 'ZYNTEGLO', company: 'bluebird bio', modality: 'gene', type: 'approval', indication: 'Beta-Thalassemia', mechanism: 'Lentiviral beta-globin gene therapy', price: '$2,800,000' },
  { year: 2022, name: 'ADSTILADRIN', company: 'Ferring Pharma', modality: 'gene', type: 'approval', indication: 'Non-muscle Invasive Bladder Cancer', mechanism: 'Adenoviral IFN-alpha gene therapy', price: '$150,000' },
  { year: 2022, name: 'PLUVICTO', company: 'Novartis', modality: 'radioligand', type: 'approval', indication: 'mCRPC (PSMA+)', mechanism: 'Lu-177 PSMA radioligand', price: '$42,500/dose', milestone: 'Blockbuster radioligand therapy', patients: '50,000+ patients treated' },
  { year: 2023, name: 'CASGEVY', company: 'Vertex/CRISPR', modality: 'gene', type: 'approval', indication: 'Sickle Cell Disease, Beta-Thalassemia', mechanism: 'CRISPR/Cas9 gene editing', price: '$2,200,000', milestone: 'First CRISPR therapy approved' },
  { year: 2023, name: 'ELEVIDYS', company: 'Sarepta', modality: 'gene', type: 'approval', indication: 'Duchenne Muscular Dystrophy', mechanism: 'AAVrh74-micro-dystrophin', price: '$3,200,000', status: 'Accelerated approval' },
  { year: 2023, name: 'LYFGENIA', company: 'bluebird bio', modality: 'gene', type: 'approval', indication: 'Sickle Cell Disease', mechanism: 'Lentiviral gene therapy', price: '$3,100,000' },
  { year: 2023, name: 'ROCTAVIAN', company: 'BioMarin', modality: 'gene', type: 'approval', indication: 'Hemophilia A', mechanism: 'AAV5-FVIII gene therapy', price: '$2,900,000' },
  { year: 2023, name: 'VYJUVEK', company: 'Krystal Biotech', modality: 'gene', type: 'approval', indication: 'Dystrophic Epidermolysis Bullosa', mechanism: 'HSV-1 COL7A1 gene therapy', price: '$24,250/vial' },
  { year: 2024, name: 'AMTAGVI', company: 'Iovance', modality: 'car-t', type: 'approval', indication: 'Unresectable/Metastatic Melanoma', mechanism: 'Tumor-infiltrating lymphocyte (TIL) therapy', price: '$515,000', milestone: 'First TIL therapy approved' },
  { year: 2024, name: 'AUCATZYL', company: 'Autolus', modality: 'car-t', type: 'approval', indication: 'r/r B-cell ALL (Adult)', mechanism: 'CD19-directed CAR-T with fast-off rate', price: '$469,000' },
  { year: 2024, name: 'BEQVEZ', company: 'Pfizer', modality: 'gene', type: 'approval', indication: 'Hemophilia B', mechanism: 'AAV-Spark100 FIX gene therapy', price: '$3,500,000' },
  { year: 2024, name: 'KEBILIDI', company: 'PTC Therapeutics', modality: 'gene', type: 'approval', indication: 'AADC Deficiency', mechanism: 'AAV2-hAADC gene therapy', price: '$3,000,000' },
  { year: 2024, name: 'LENMELDY', company: 'Orchard Therapeutics', modality: 'gene', type: 'approval', indication: 'Metachromatic Leukodystrophy', mechanism: 'Lentiviral ARSA gene therapy', price: '$4,250,000', milestone: 'Most expensive drug (2024)' },
  { year: 2024, name: 'TECELRA', company: 'Adaptimmune', modality: 'car-t', type: 'approval', indication: 'Synovial Sarcoma', mechanism: 'MAGE-A4 TCR therapy', price: '$727,000', milestone: 'First TCR therapy approved' },
  { year: 2024, name: 'LOCIBEP', company: 'Novartis', modality: 'radioligand', type: 'approval', indication: 'GEP-NET', mechanism: 'Lu-177 DOTATATE', price: '$45,000/dose' },
  { year: 2025, name: 'ITVISMA', company: 'Novartis', modality: 'car-t', type: 'approval', indication: 'Follicular Lymphoma', mechanism: 'CD19-directed CAR-T', price: '$450,000' },
  { year: 2025, name: 'ANITO-CEL', company: 'Arcellx', modality: 'car-t', type: 'approval', indication: 'r/r Multiple Myeloma', mechanism: 'BCMA-directed CAR-T (D-Domain)', price: '$482,000', milestone: 'Novel BCMA binding domain' },
  { year: 2025, name: 'ZEVASKYN', company: 'Abeona Therapeutics', modality: 'gene', type: 'approval', indication: 'Epidermolysis Bullosa', mechanism: 'Autologous gene-corrected cells', price: '$2,500,000' },
  { year: 2025, name: 'WASKYRA', company: 'Fondazione Telethon', modality: 'gene', type: 'approval', indication: 'Wiskott-Aldrich Syndrome', mechanism: 'Lentiviral WAS gene therapy', price: '$2,100,000' },
  
  // Closures & M&A integrated
  { year: 2023, name: 'Graphite Bio', company: 'Pivoted → LENZ Therapeutics', modality: 'gene', type: 'closure', description: 'Abandoned gene editing after clinical hold', indication: 'Sickle Cell Disease' },
  { year: 2023, name: 'Rubius Therapeutics', company: 'Liquidated', modality: 'advanced', type: 'closure', description: 'Red blood cell engineering failed to reach market' },
  { year: 2023, name: 'Poseida → Roche', company: '$1.5B acquisition', modality: 'car-t', type: 'merger', description: 'Allogeneic CAR-T platform acquired', indication: 'Off-the-shelf cell therapy' },
  { year: 2024, name: 'Lyell Immunopharma', company: '60% workforce reduction', modality: 'car-t', type: 'closure', description: 'Restructured T-cell reprogramming programs' },
  { year: 2024, name: 'Mustang Bio', company: 'Ceased operations', modality: 'gene', type: 'closure', description: 'Gene therapy programs discontinued' },
  { year: 2024, name: 'Athenex', company: 'Filed bankruptcy', modality: 'car-t', type: 'closure', description: 'Cell therapy and oncology programs terminated' },
  { year: 2024, name: 'Century Therapeutics', company: 'Strategic alternatives', modality: 'car-t', type: 'closure', description: 'iPSC-derived allogeneic programs under review' },
  { year: 2024, name: 'Mirus Bio → Revvity', company: '$600M acquisition', modality: 'gene', type: 'merger', description: 'Gene delivery technology platform' },
  { year: 2024, name: 'Replimune → J&J', company: '$590M acquisition', modality: 'gene', type: 'merger', description: 'Oncolytic immunotherapy pipeline' },
  { year: 2024, name: 'RayzeBio → BMS', company: '$4.1B acquisition', modality: 'radioligand', type: 'merger', description: 'Radiopharmaceutical platform expansion', milestone: 'Major radioligand M&A' },
  { year: 2025, name: '2seventy → AbbVie', company: '$2.1B acquisition', modality: 'car-t', type: 'merger', description: 'CAR-T manufacturing capabilities' },
  { year: 2025, name: 'Fate Therapeutics', company: 'Exploring strategic options', modality: 'car-t', type: 'closure', description: 'iPSC platform facing challenges' },
  { year: 2025, name: 'Karuna → BMS', company: '$14B acquisition', modality: 'personalized', type: 'merger', description: 'CNS-focused therapies', milestone: 'Largest 2025 biopharma deal' },
];

const outlook2026 = [
  { category: 'Market Size', value: '$52B', trend: 'up', description: 'Global CGAT market' },
  { category: 'New Approvals', value: '15-20', trend: 'up', description: 'Expected FDA approvals' },
  { category: 'CAGR', value: '18%', trend: 'up', description: 'Annual growth rate' },
  { category: 'Allogeneic', value: '5+', trend: 'up', description: 'Off-the-shelf products' },
];

const trends = {
  opportunities: [
    { title: 'Allogeneic CAR-T', desc: 'Off-the-shelf therapies reducing wait from weeks to days' },
    { title: 'In-Vivo Gene Editing', desc: 'Direct CRISPR delivery without cell extraction' },
    { title: 'Radioligand Expansion', desc: 'New targets: FAP, SSTR, CXCR4 → $15B by 2030' },
    { title: 'AI-Driven Design', desc: '30% faster development timelines predicted' },
    { title: 'Base & Prime Editing', desc: 'Next-gen precision with fewer off-target effects' }
  ],
  challenges: [
    { title: 'Manufacturing Scalability', desc: '4-8 week wait times, capacity constraints' },
    { title: 'Pricing Pressure', desc: '$400K+ therapies facing reimbursement hurdles' },
    { title: 'Durability Questions', desc: 'Long-term efficacy data still maturing' },
    { title: 'Supply Chain Complexity', desc: 'Vein-to-vein logistics remain challenging' },
    { title: 'Regulatory Uncertainty', desc: 'Evolving guidelines for novel modalities' }
  ]
};

export const IndustryOutlook2025 = () => {
  const [selectedModality, setSelectedModality] = useState<Modality>('all');
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [showOutlook, setShowOutlook] = useState(false);

  const filterByModality = (items: TimelineItem[]) => {
    if (selectedModality === 'all') return items;
    return items.filter(item => item.modality === selectedModality);
  };

  const groupByYear = (items: TimelineItem[]) => {
    return items.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push(item);
      return acc;
    }, {} as Record<number, TimelineItem[]>);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'approval': return { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', icon: '✓' };
      case 'merger': return { bg: 'bg-blue-500/20', border: 'border-blue-500/30', icon: '🤝' };
      case 'closure': return { bg: 'bg-red-500/20', border: 'border-red-500/30', icon: '⚠️' };
      default: return { bg: 'bg-muted', border: 'border-muted', icon: '●' };
    }
  };

  const renderTimeline = () => {
    const data = filterByModality(timelineData);
    const grouped = groupByYear(data);
    const years = Object.keys(grouped).map(Number).sort((a, b) => a - b);

    return (
      <div className="relative py-8">
        {/* Central timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-genie-primary via-genie-accent to-genie-secondary h-full rounded-full opacity-50" />
        
        {years.map((year) => {
          const approvals = grouped[year].filter(i => i.type === 'approval');
          const events = grouped[year].filter(i => i.type !== 'approval');
          
          return (
            <div key={year} className="relative mb-16">
              {/* Year marker */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-r from-genie-primary to-genie-accent text-white px-8 py-3 rounded-full font-bold text-2xl shadow-lg z-10 relative">
                  {year}
                </div>
              </div>
              
              {/* Two column layout */}
              <div className="grid md:grid-cols-2 gap-6 relative">
                {/* Left side - Approvals */}
                <div className="space-y-3 md:pr-8">
                  {approvals.length > 0 && (
                    <div className="text-right mb-2">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        <Target className="w-3 h-3 mr-1" />
                        FDA Approvals
                      </Badge>
                    </div>
                  )}
                  {approvals.map((item, idx) => {
                    const config = modalityConfig[item.modality];
                    return (
                      <div
                        key={`${item.name}-${idx}`}
                        onClick={() => setSelectedItem(item)}
                        className={`
                          p-4 rounded-xl cursor-pointer transition-all duration-300
                          ${config.bgClass} border border-white/10 hover:border-white/30
                          hover:scale-[1.02] hover:shadow-xl text-right
                        `}
                      >
                        <div className="flex items-center justify-end gap-3">
                          <div>
                            <div className="flex items-center justify-end gap-2">
                              <span className="font-bold text-lg text-foreground">{item.name}</span>
                              <span className={`${config.color} text-xl`}>{config.marker}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.company}</p>
                            {item.indication && (
                              <p className="text-xs text-muted-foreground/70 mt-1">{item.indication}</p>
                            )}
                            {item.price && (
                              <Badge variant="outline" className="mt-2 text-xs">
                                <DollarSign className="w-3 h-3 mr-1" />
                                {item.price}
                              </Badge>
                            )}
                          </div>
                        </div>
                        {item.milestone && (
                          <div className="mt-2 text-xs text-genie-accent font-medium flex items-center justify-end gap-1">
                            <Sparkles className="w-3 h-3" />
                            {item.milestone}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Right side - M&A / Closures */}
                <div className="space-y-3 md:pl-8">
                  {events.length > 0 && (
                    <div className="text-left mb-2">
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        <Building2 className="w-3 h-3 mr-1" />
                        M&A / Market Changes
                      </Badge>
                    </div>
                  )}
                  {events.map((item, idx) => {
                    const typeStyles = getTypeStyles(item.type);
                    const config = modalityConfig[item.modality];
                    return (
                      <div
                        key={`${item.name}-${idx}`}
                        onClick={() => setSelectedItem(item)}
                        className={`
                          p-4 rounded-xl cursor-pointer transition-all duration-300
                          ${typeStyles.bg} border ${typeStyles.border} hover:border-white/30
                          hover:scale-[1.02] hover:shadow-xl text-left
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{typeStyles.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-foreground">{item.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.company}</p>
                            {item.description && (
                              <p className="text-xs text-muted-foreground/70 mt-1">{item.description}</p>
                            )}
                          </div>
                        </div>
                        {item.milestone && (
                          <div className="mt-2 text-xs text-blue-400 font-medium flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            {item.milestone}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderOutlook = () => (
    <div className="space-y-8 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {outlook2026.map((item, index) => (
          <Card key={index} className="p-6 bg-gradient-to-br from-genie-primary/10 to-genie-accent/10 border-genie-primary/20 text-center hover:scale-105 transition-transform">
            <div className="flex justify-center mb-3">
              <TrendingUp className="w-8 h-8 text-genie-primary" />
            </div>
            <p className="text-4xl font-bold text-genie-primary mb-1">{item.value}</p>
            <p className="font-semibold text-foreground">{item.category}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/5 border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h4 className="font-bold text-xl text-emerald-400">2026 Opportunities</h4>
          </div>
          <div className="space-y-4">
            {trends.opportunities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                <ChevronRight className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <h4 className="font-bold text-xl text-amber-400">Critical Challenges</h4>
          </div>
          <div className="space-y-4">
            {trends.challenges.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                <ChevronRight className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 border-genie-primary/50 text-genie-primary text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Interactive Industry Timeline
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            History of <span className="text-transparent bg-clip-text bg-gradient-to-r from-genie-primary to-genie-accent">CGAT</span> FDA Approvals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click any item for detailed information • Approvals, M&A, and closures shown together by year
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setShowOutlook(false)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
              !showOutlook 
                ? 'bg-gradient-to-r from-genie-primary to-genie-accent text-white shadow-lg' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Timeline View
          </button>
          <button
            onClick={() => setShowOutlook(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
              showOutlook 
                ? 'bg-gradient-to-r from-genie-primary to-genie-accent text-white shadow-lg' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            2026 Outlook
          </button>
        </div>

        {/* Modality Filters */}
        {!showOutlook && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {(Object.keys(modalityConfig) as Modality[]).map((modality) => {
              const config = modalityConfig[modality];
              return (
                <button
                  key={modality}
                  onClick={() => setSelectedModality(modality)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all
                    ${selectedModality === modality 
                      ? `${config.bgClass} ${config.color} ring-2 ring-offset-2 ring-offset-background shadow-md`
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'}
                  `}
                >
                  {config.icon}
                  {config.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Legend */}
        {!showOutlook && (
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10">
              <span className="text-emerald-400">✓</span>
              <span className="text-muted-foreground">FDA Approval</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10">
              <span>🤝</span>
              <span className="text-muted-foreground">Merger / Acquisition</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10">
              <span>⚠️</span>
              <span className="text-muted-foreground">Closure / Restructure</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {showOutlook ? renderOutlook() : renderTimeline()}
        </div>

        {/* Stats Footer */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {[
            { label: '30+', sublabel: 'FDA Approvals Since 2010', color: 'from-green-500/20 to-green-500/5', textColor: 'text-green-400', icon: <Pill className="w-5 h-5" /> },
            { label: '$20B+', sublabel: 'M&A Activity', color: 'from-blue-500/20 to-blue-500/5', textColor: 'text-blue-400', icon: <Building2 className="w-5 h-5" /> },
            { label: '10+', sublabel: 'Market Exits', color: 'from-amber-500/20 to-amber-500/5', textColor: 'text-amber-400', icon: <AlertTriangle className="w-5 h-5" /> },
            { label: '5', sublabel: 'Active Modalities', color: 'from-purple-500/20 to-purple-500/5', textColor: 'text-purple-400', icon: <Activity className="w-5 h-5" /> },
            { label: '18%', sublabel: 'CAGR Growth', color: 'from-genie-primary/20 to-genie-primary/5', textColor: 'text-genie-primary', icon: <TrendingUp className="w-5 h-5" /> },
          ].map((stat, index) => (
            <div key={index} className={`text-center p-5 rounded-xl bg-gradient-to-br ${stat.color} border border-white/10 hover:scale-105 transition-transform`}>
              <div className={`flex justify-center mb-2 ${stat.textColor}`}>{stat.icon}</div>
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-10 max-w-2xl mx-auto">
          Data compiled from FDA approvals, SEC filings, and industry reports. Prices shown are list prices at approval and may vary. 
          Information is for educational purposes only.
        </p>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-lg">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${modalityConfig[selectedItem.modality].bgClass}`}>
                    {modalityConfig[selectedItem.modality].icon}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedItem.name}</DialogTitle>
                    <p className="text-muted-foreground">{selectedItem.company}</p>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={modalityConfig[selectedItem.modality].bgClass}>
                    {modalityConfig[selectedItem.modality].label}
                  </Badge>
                  <Badge variant="outline">{selectedItem.year}</Badge>
                  <Badge variant={selectedItem.type === 'approval' ? 'default' : selectedItem.type === 'merger' ? 'secondary' : 'destructive'}>
                    {selectedItem.type === 'approval' ? 'FDA Approved' : selectedItem.type === 'merger' ? 'M&A' : 'Closure'}
                  </Badge>
                </div>

                {selectedItem.indication && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Indication</p>
                    <p className="font-medium">{selectedItem.indication}</p>
                  </div>
                )}

                {selectedItem.mechanism && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Mechanism of Action</p>
                    <p className="font-medium">{selectedItem.mechanism}</p>
                  </div>
                )}

                {selectedItem.description && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Details</p>
                    <p className="font-medium">{selectedItem.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {selectedItem.price && (
                    <div className="p-3 rounded-lg bg-genie-primary/10 border border-genie-primary/20">
                      <div className="flex items-center gap-2 text-genie-primary mb-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wide">Price</span>
                      </div>
                      <p className="font-bold text-lg">{selectedItem.price}</p>
                    </div>
                  )}
                  
                  {selectedItem.patients && (
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-2 text-blue-400 mb-1">
                        <Users className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-wide">Patients</span>
                      </div>
                      <p className="font-bold text-lg">{selectedItem.patients}</p>
                    </div>
                  )}
                </div>

                {selectedItem.milestone && (
                  <div className="p-3 rounded-lg bg-gradient-to-r from-genie-accent/20 to-genie-primary/20 border border-genie-accent/30">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-genie-accent" />
                      <span className="font-semibold text-genie-accent">{selectedItem.milestone}</span>
                    </div>
                  </div>
                )}

                {selectedItem.status && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{selectedItem.status}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default IndustryOutlook2025;
