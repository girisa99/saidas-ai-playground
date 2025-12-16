import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
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
  XCircle,
  ArrowRightLeft
} from 'lucide-react';

type Modality = 'all' | 'car-t' | 'gene' | 'personalized' | 'advanced' | 'radioligand';
type ViewMode = 'approvals' | 'closures' | 'outlook';

interface TimelineItem {
  year: number;
  name: string;
  company: string;
  modality: Modality;
  type: 'approval' | 'closure' | 'merger';
  description?: string;
}

const modalityConfig: Record<Modality, { label: string; color: string; icon: React.ReactNode; bgClass: string; marker: string }> = {
  'all': { label: 'All', color: 'text-foreground', icon: <Filter className="w-4 h-4" />, bgClass: 'bg-muted', marker: '●' },
  'car-t': { label: 'CAR-T Cell', color: 'text-green-500', icon: <Microscope className="w-4 h-4" />, bgClass: 'bg-green-500/20', marker: '▲' },
  'gene': { label: 'Gene Therapy', color: 'text-blue-500', icon: <Dna className="w-4 h-4" />, bgClass: 'bg-blue-500/20', marker: '▼' },
  'personalized': { label: 'Personalized', color: 'text-purple-500', icon: <HeartPulse className="w-4 h-4" />, bgClass: 'bg-purple-500/20', marker: '◆' },
  'advanced': { label: 'Advanced', color: 'text-amber-500', icon: <Atom className="w-4 h-4" />, bgClass: 'bg-amber-500/20', marker: '★' },
  'radioligand': { label: 'Radioligand', color: 'text-red-500', icon: <Radiation className="w-4 h-4" />, bgClass: 'bg-red-500/20', marker: '◉' }
};

const approvalsTimeline: TimelineItem[] = [
  { year: 2010, name: 'PROVENGE', company: 'Dendreon Corp', modality: 'car-t', type: 'approval' },
  { year: 2015, name: 'IMLYGIC', company: 'Amgen (Biovex)', modality: 'gene', type: 'approval' },
  { year: 2017, name: 'KYMRIAH', company: 'Novartis', modality: 'car-t', type: 'approval' },
  { year: 2017, name: 'YESCARTA', company: 'Kite Pharma', modality: 'car-t', type: 'approval' },
  { year: 2017, name: 'LUXTURNA', company: 'Spark Tx', modality: 'gene', type: 'approval' },
  { year: 2019, name: 'ZOLGENSMA', company: 'Novartis', modality: 'gene', type: 'approval' },
  { year: 2020, name: 'TECARTUS', company: 'Kite Pharma', modality: 'car-t', type: 'approval' },
  { year: 2021, name: 'ABECMA', company: 'Celgene/BMS', modality: 'car-t', type: 'approval' },
  { year: 2021, name: 'BREYANZI', company: 'Juno/BMS', modality: 'car-t', type: 'approval' },
  { year: 2022, name: 'CARVYKTI', company: 'Janssen/J&J', modality: 'car-t', type: 'approval' },
  { year: 2022, name: 'HEMGENIX', company: 'CSL Behring', modality: 'gene', type: 'approval' },
  { year: 2022, name: 'SKYSONA', company: 'bluebird bio', modality: 'gene', type: 'approval' },
  { year: 2022, name: 'ZYNTEGLO', company: 'bluebird bio', modality: 'gene', type: 'approval' },
  { year: 2022, name: 'ADSTILADRIN', company: 'Ferring Pharma', modality: 'gene', type: 'approval' },
  { year: 2022, name: 'PLUVICTO', company: 'Novartis', modality: 'radioligand', type: 'approval' },
  { year: 2023, name: 'CASGEVY', company: 'Vertex', modality: 'gene', type: 'approval', description: 'First CRISPR therapy' },
  { year: 2023, name: 'ELEVIDYS', company: 'Sarepta', modality: 'gene', type: 'approval' },
  { year: 2023, name: 'LYFGENIA', company: 'bluebird bio', modality: 'gene', type: 'approval' },
  { year: 2023, name: 'ROCTAVIAN', company: 'BioMarin', modality: 'gene', type: 'approval' },
  { year: 2023, name: 'VYJUVEK', company: 'Krystal Biotech', modality: 'gene', type: 'approval' },
  { year: 2024, name: 'AMTAGVI', company: 'Iovance', modality: 'car-t', type: 'approval', description: 'First TIL therapy' },
  { year: 2024, name: 'AUCATZYL', company: 'Autolus', modality: 'car-t', type: 'approval' },
  { year: 2024, name: 'BEQVEZ', company: 'Pfizer', modality: 'gene', type: 'approval' },
  { year: 2024, name: 'KEBILIDI', company: 'PTC Tx', modality: 'gene', type: 'approval' },
  { year: 2024, name: 'LENMELDY', company: 'Orchard Tx', modality: 'gene', type: 'approval' },
  { year: 2024, name: 'TECELRA', company: 'Adaptimmune', modality: 'car-t', type: 'approval', description: 'First TCR therapy' },
  { year: 2024, name: 'LOCIBEP', company: 'Novartis', modality: 'radioligand', type: 'approval' },
  { year: 2025, name: 'ITVISMA', company: 'Novartis', modality: 'car-t', type: 'approval' },
  { year: 2025, name: 'PAPZIMEOS', company: 'Precigen', modality: 'gene', type: 'approval' },
  { year: 2025, name: 'ZEVASKYN', company: 'Abeona Tx', modality: 'gene', type: 'approval' },
  { year: 2025, name: 'ENCELTO', company: 'Neurotech', modality: 'advanced', type: 'approval' },
  { year: 2025, name: 'WASKYRA', company: 'Fondazione Telethon', modality: 'gene', type: 'approval' },
  { year: 2025, name: 'ANITO-CEL', company: 'Arcellx', modality: 'car-t', type: 'approval', description: 'Multiple Myeloma' },
];

const closuresAndMergers: TimelineItem[] = [
  { year: 2023, name: 'Graphite Bio', company: 'Pivoted → LENZ', modality: 'gene', type: 'closure' },
  { year: 2023, name: 'Rubius Therapeutics', company: 'Liquidated', modality: 'advanced', type: 'closure' },
  { year: 2023, name: 'Poseida → Roche', company: '$1.5B', modality: 'car-t', type: 'merger' },
  { year: 2024, name: 'Lyell Immunopharma', company: '60% layoffs', modality: 'car-t', type: 'closure' },
  { year: 2024, name: 'Mustang Bio', company: 'Ceased operations', modality: 'gene', type: 'closure' },
  { year: 2024, name: 'Athenex', company: 'Bankruptcy', modality: 'car-t', type: 'closure' },
  { year: 2024, name: 'Century Therapeutics', company: 'Strategic review', modality: 'car-t', type: 'closure' },
  { year: 2024, name: 'Mirus Bio → Revvity', company: '$600M', modality: 'gene', type: 'merger' },
  { year: 2024, name: 'Replimune → J&J', company: '$590M', modality: 'gene', type: 'merger' },
  { year: 2024, name: 'BMS → RayzeBio', company: '$4.1B', modality: 'radioligand', type: 'merger' },
  { year: 2025, name: '2seventy → AbbVie', company: '$2.1B', modality: 'car-t', type: 'merger' },
  { year: 2025, name: 'Fate Therapeutics', company: 'Exploring options', modality: 'car-t', type: 'closure' },
  { year: 2025, name: 'Karuna → BMS', company: '$14B', modality: 'personalized', type: 'merger' },
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
  const [viewMode, setViewMode] = useState<ViewMode>('approvals');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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

  const renderTimeline = () => {
    const data = viewMode === 'approvals' 
      ? filterByModality(approvalsTimeline)
      : filterByModality(closuresAndMergers);

    const grouped = groupByYear(data);
    const years = Object.keys(grouped).map(Number).sort((a, b) => a - b);

    return (
      <div className="relative py-8">
        {/* Central timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-genie-primary via-genie-accent to-genie-secondary h-full rounded-full opacity-50" />
        
        {years.map((year) => (
          <div key={year} className="relative mb-12">
            {/* Year marker */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-genie-primary to-genie-accent text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg z-10 relative">
                {year}
              </div>
            </div>
            
            {/* Items for this year - alternating sides */}
            <div className="relative">
              {grouped[year].map((item, itemIndex) => {
                const isLeft = itemIndex % 2 === 0;
                const config = modalityConfig[item.modality];
                const isHovered = hoveredItem === `${item.name}-${year}`;
                
                return (
                  <div
                    key={`${item.name}-${itemIndex}`}
                    className={`flex items-center mb-4 ${isLeft ? 'justify-end pr-[52%]' : 'justify-start pl-[52%]'}`}
                    onMouseEnter={() => setHoveredItem(`${item.name}-${year}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {/* Connector dot on timeline */}
                    <div 
                      className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${config.bgClass} border-2 border-background z-10`}
                      style={{ top: `${itemIndex * 60 + 20}px` }}
                    />
                    
                    <div 
                      className={`
                        inline-flex items-center gap-3 p-4 rounded-xl transition-all duration-300 cursor-pointer
                        ${config.bgClass} border border-transparent backdrop-blur-sm
                        ${isHovered ? 'scale-105 shadow-xl border-white/30 ring-2 ring-white/20' : 'hover:scale-102 hover:shadow-lg'}
                        ${isLeft ? 'flex-row-reverse text-right' : 'flex-row text-left'}
                      `}
                    >
                      <span className={`${config.color} text-2xl font-bold`}>
                        {item.type === 'merger' ? '🤝' : item.type === 'closure' ? '⚠️' : config.marker}
                      </span>
                      <div>
                        <p className="font-bold text-lg text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                        {isHovered && item.description && (
                          <p className="text-xs text-genie-accent mt-1 animate-fade-in font-medium">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderOutlook = () => (
    <div className="space-y-8 py-8">
      {/* 2026 Projections */}
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

      {/* Trends Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Opportunities */}
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

        {/* Challenges */}
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
            Industry Timeline
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            History of <span className="text-transparent bg-clip-text bg-gradient-to-r from-genie-primary to-genie-accent">CGAT</span> FDA Approvals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive timeline of Cell & Gene Therapy milestones, market dynamics, and future outlook
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { mode: 'approvals' as ViewMode, label: 'FDA Approvals', icon: <Target className="w-4 h-4" /> },
            { mode: 'closures' as ViewMode, label: 'M&A / Closures', icon: <Building2 className="w-4 h-4" /> },
            { mode: 'outlook' as ViewMode, label: '2026 Outlook', icon: <TrendingUp className="w-4 h-4" /> }
          ].map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all
                ${viewMode === mode 
                  ? 'bg-gradient-to-r from-genie-primary to-genie-accent text-white shadow-lg shadow-genie-primary/30' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'}
              `}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Modality Filters (for approvals and closures) */}
        {viewMode !== 'outlook' && (
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
        {viewMode !== 'outlook' && (
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            {viewMode === 'approvals' ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-green-500 text-lg">▲</span>
                  <span className="text-muted-foreground">CAR-T / Cell Therapy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-lg">▼</span>
                  <span className="text-muted-foreground">Gene Therapy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg">◉</span>
                  <span className="text-muted-foreground">Radioligand</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-lg">★</span>
                  <span className="text-muted-foreground">Advanced</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤝</span>
                  <span className="text-muted-foreground">Merger / Acquisition</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  <span className="text-muted-foreground">Closure / Restructure</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {viewMode === 'outlook' ? renderOutlook() : renderTimeline()}
        </div>

        {/* Stats Footer */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {[
            { label: '30+', sublabel: 'FDA Approvals Since 2017', color: 'from-green-500/20 to-green-500/5', textColor: 'text-green-400' },
            { label: '$20B+', sublabel: 'M&A Activity', color: 'from-blue-500/20 to-blue-500/5', textColor: 'text-blue-400' },
            { label: '10+', sublabel: 'Market Exits', color: 'from-amber-500/20 to-amber-500/5', textColor: 'text-amber-400' },
            { label: '5', sublabel: 'Active Modalities', color: 'from-purple-500/20 to-purple-500/5', textColor: 'text-purple-400' },
            { label: '18%', sublabel: 'CAGR Growth', color: 'from-genie-primary/20 to-genie-primary/5', textColor: 'text-genie-primary' },
          ].map((stat, index) => (
            <div key={index} className={`text-center p-5 rounded-xl bg-gradient-to-br ${stat.color} border border-white/10 hover:scale-105 transition-transform`}>
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-10 max-w-2xl mx-auto">
          Data compiled from FDA approvals, SEC filings, and industry reports. Market projections 
          are estimates based on analyst consensus. Information is for educational purposes only.
        </p>
      </div>
    </section>
  );
};

export default IndustryOutlook2025;
