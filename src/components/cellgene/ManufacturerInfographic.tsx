import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Building2, TrendingUp, Beaker, DollarSign, 
  Globe, Microscope, Factory, FlaskConical, Dna,
  Award, MapPin, Zap, Atom, HeartPulse,
  Sparkles, Filter, ChevronDown, AlertTriangle,
  TrendingDown, XCircle, ArrowRightLeft, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ManufacturerData {
  name: string;
  type: 'pharma' | 'biotech' | 'technology' | 'cro' | 'healthcare' | 'research' | 'vc' | 'cdmo';
  headquarters: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Middle East';
  revenue?: string;
  revenueNum?: number;
  products: number;
  pipeline: number;
  modalities: string[];
  focus: string[];
  logoInitials?: string;
  founded?: string;
  employees?: string;
  commercialProducts?: string[];
  clinicalStage?: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Approved' | 'Pre-clinical';
}

interface ChallengeData {
  name: string;
  status: 'shutdown' | 'struggling' | 'acquired' | 'pivoted' | 'layoffs';
  year: string;
  reason: string;
  details: string;
  modality: string;
  previousValuation?: string;
  employees?: string;
  logoInitials: string;
}

// Companies that have shut down, been acquired, or are struggling
const SHUTDOWNS_AND_CHALLENGES: ChallengeData[] = [
  { name: "Graphite Bio", status: "shutdown", year: "2023", reason: "Clinical Hold", details: "Shut down after FDA clinical hold on lead gene therapy program for sickle cell disease due to safety concerns", modality: "Gene Therapy", previousValuation: "$1.2B (peak)", employees: "120 laid off", logoInitials: "GRPH" },
  { name: "Rubius Therapeutics", status: "shutdown", year: "2023", reason: "Clinical Failures", details: "Ceased operations after multiple clinical disappointments in red cell therapeutics platform", modality: "Cell Therapy", previousValuation: "$800M (IPO)", employees: "170 laid off", logoInitials: "RUBY" },
  { name: "LogicBio Therapeutics", status: "acquired", year: "2023", reason: "Cash Runway", details: "Acquired by Alexion/AstraZeneca for $68M after running low on cash; originally valued at $400M+", modality: "Gene Therapy", previousValuation: "$400M", logoInitials: "LOGC" },
  { name: "Athenex", status: "shutdown", year: "2023", reason: "FDA Rejection", details: "Filed for bankruptcy after FDA rejected lead cancer drug; closed CGT operations", modality: "Cell Therapy", previousValuation: "$2B (peak)", employees: "600+ laid off", logoInitials: "ATNX" },
  { name: "Puma Biotechnology", status: "struggling", year: "2024", reason: "Commercial Challenges", details: "Significant layoffs and restructuring due to disappointing commercial performance", modality: "Personalized Medicine", employees: "50% reduction", logoInitials: "PBYI" },
  { name: "Solid Biosciences", status: "struggling", year: "2023", reason: "Clinical Setbacks", details: "Multiple clinical holds and safety concerns in DMD gene therapy program; major workforce reduction", modality: "Gene Therapy", employees: "40% reduction", logoInitials: "SLDB" },
  { name: "Passage Bio", status: "pivoted", year: "2023", reason: "Strategic Shift", details: "Discontinued multiple gene therapy programs; pivoting to focus on fewer assets", modality: "Gene Therapy", employees: "35% reduction", logoInitials: "PASG" },
  { name: "Taysha Gene Therapies", status: "struggling", year: "2023", reason: "Cash Constraints", details: "Major restructuring and program prioritization due to funding challenges", modality: "Gene Therapy", employees: "60% reduction", logoInitials: "TSHA" },
  { name: "Genprex", status: "struggling", year: "2024", reason: "Funding Issues", details: "Struggling to advance gene therapy programs due to limited cash runway", modality: "Gene Therapy", previousValuation: "$500M (peak)", logoInitials: "GNPX" },
  { name: "Cellectis", status: "layoffs", year: "2024", reason: "Cost Reduction", details: "Major workforce reduction to extend runway; focusing on key allogeneic CAR-T programs", modality: "Cell Therapy", employees: "30% reduction", logoInitials: "CLLS" },
  { name: "Tmunity Therapeutics", status: "acquired", year: "2023", reason: "Strategic Exit", details: "Acquired by Gilead; couldn't sustain as independent company despite strong science", modality: "Cell Therapy", logoInitials: "TMUN" },
  { name: "Vor Biopharma", status: "struggling", year: "2024", reason: "Clinical Delays", details: "Workforce reduction and program prioritization amid challenging CGT market", modality: "Cell Therapy", employees: "25% reduction", logoInitials: "VOR" },
  { name: "Lyell Immunopharma", status: "layoffs", year: "2024", reason: "Strategic Refocus", details: "Significant restructuring to focus resources on lead programs", modality: "Cell Therapy", employees: "35% reduction", logoInitials: "LYEL" },
  { name: "Compass Pathways", status: "struggling", year: "2024", reason: "Regulatory Uncertainty", details: "Facing challenges in psychedelic-assisted therapy regulatory pathway", modality: "Personalized Medicine", logoInitials: "CMPS" },
];

// Market pressure trends and statistics
const MARKET_TRENDS = [
  { metric: "CGT Biotech Shutdowns (2023-2024)", value: "15+", change: "+200%", trend: "up", description: "Companies ceased operations vs 2021-2022" },
  { metric: "Industry Layoffs (2023)", value: "8,000+", change: "+150%", trend: "up", description: "CGT sector job cuts across all companies" },
  { metric: "VC Funding Decline", value: "-45%", change: "vs 2021", trend: "down", description: "Year-over-year decrease in CGT investments" },
  { metric: "Clinical Holds (2023)", value: "25+", change: "+80%", trend: "up", description: "FDA clinical holds on CGT programs" },
  { metric: "M&A Activity", value: "12", change: "-30%", trend: "down", description: "Major CGT acquisitions completed" },
  { metric: "Average Time to Market", value: "12+ years", change: "+2 years", trend: "up", description: "From discovery to FDA approval" },
];

const INDUSTRY_PRESSURES = [
  { title: "Manufacturing Complexity", severity: "high", description: "High costs and technical challenges in viral vector and cell processing production", impact: "60% of CGT companies cite manufacturing as top challenge" },
  { title: "Reimbursement Uncertainty", severity: "high", description: "Payers struggling with $1M+ one-time therapy pricing models", impact: "Only 40% of approved CGTs have broad payer coverage" },
  { title: "Clinical Safety Concerns", severity: "medium", description: "Increased FDA scrutiny following adverse events in multiple trials", impact: "25+ clinical holds issued in 2023" },
  { title: "Talent Shortage", severity: "medium", description: "Limited pool of experienced CGT researchers and manufacturing specialists", impact: "Average time-to-fill for CGT roles: 6+ months" },
  { title: "Supply Chain Fragility", severity: "medium", description: "Dependency on limited raw material suppliers and CDMOs", impact: "Single-source dependencies for 70% of critical materials" },
  { title: "Regulatory Complexity", severity: "medium", description: "Evolving global regulatory frameworks create uncertainty", impact: "Average 18-month delay for international approvals" },
];

const COMPREHENSIVE_MANUFACTURERS: ManufacturerData[] = [
  // Major Pharma
  { name: "Novartis", type: "pharma", headquarters: "Basel, Switzerland", country: "Switzerland", region: "Europe", revenue: "$51.6B", revenueNum: 51.6, products: 2, pipeline: 45, modalities: ["Cell Therapy", "Gene Therapy", "Radioligand Therapy"], focus: ["CAR-T", "Oncology", "Immunology", "NETs"], logoInitials: "NVS", founded: "1996", employees: "108,000", commercialProducts: ["Kymriah", "Lutathera", "Pluvicto"], clinicalStage: "Approved" },
  { name: "Bristol-Myers Squibb", type: "pharma", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$46.2B", revenueNum: 46.2, products: 2, pipeline: 52, modalities: ["Cell Therapy"], focus: ["CAR-T", "Immuno-Oncology", "Multiple Myeloma"], logoInitials: "BMS", founded: "1989", employees: "34,000", commercialProducts: ["Breyanzi", "Abecma"], clinicalStage: "Approved" },
  { name: "Johnson & Johnson", type: "pharma", headquarters: "New Brunswick, USA", country: "USA", region: "North America", revenue: "$85.2B", revenueNum: 85.2, products: 1, pipeline: 28, modalities: ["Cell Therapy"], focus: ["BCMA CAR-T", "Multiple Myeloma"], logoInitials: "JNJ", founded: "1886", employees: "152,000", commercialProducts: ["Carvykti"], clinicalStage: "Approved" },
  { name: "Gilead Sciences", type: "pharma", headquarters: "Foster City, USA", country: "USA", region: "North America", revenue: "$27.1B", revenueNum: 27.1, products: 2, pipeline: 38, modalities: ["Cell Therapy"], focus: ["CAR-T", "Lymphoma", "Leukemia"], logoInitials: "GILD", founded: "1987", employees: "17,000", commercialProducts: ["Yescarta", "Tecartus"], clinicalStage: "Approved" },
  { name: "Roche", type: "pharma", headquarters: "Basel, Switzerland", country: "Switzerland", region: "Europe", revenue: "$63.3B", revenueNum: 63.3, products: 0, pipeline: 35, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Hemophilia", "Ophthalmology"], logoInitials: "ROG", founded: "1896", employees: "100,000", clinicalStage: "Phase 3" },
  { name: "Pfizer", type: "pharma", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$58.5B", revenueNum: 58.5, products: 0, pipeline: 22, modalities: ["Gene Therapy"], focus: ["Hemophilia", "DMD", "Rare Diseases"], logoInitials: "PFE", founded: "1849", employees: "83,000", clinicalStage: "Phase 3" },
  { name: "AstraZeneca", type: "pharma", headquarters: "Cambridge, UK", country: "UK", region: "Europe", revenue: "$44.4B", revenueNum: 44.4, products: 0, pipeline: 18, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Oncology", "Autoimmune"], logoInitials: "AZN", founded: "1999", employees: "83,000", clinicalStage: "Phase 2" },
  { name: "Bayer", type: "pharma", headquarters: "Leverkusen, Germany", country: "Germany", region: "Europe", revenue: "$52.8B", revenueNum: 52.8, products: 0, pipeline: 25, modalities: ["Gene Therapy", "Radioligand Therapy"], focus: ["Oncology", "Ophthalmology"], logoInitials: "BAYN", founded: "1863", employees: "100,000", clinicalStage: "Phase 3" },
  { name: "Takeda", type: "pharma", headquarters: "Tokyo, Japan", country: "Japan", region: "Asia Pacific", revenue: "$30.3B", revenueNum: 30.3, products: 0, pipeline: 15, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Rare Diseases", "Oncology"], logoInitials: "TAK", founded: "1781", employees: "50,000", clinicalStage: "Phase 2" },
  { name: "Sanofi", type: "pharma", headquarters: "Paris, France", country: "France", region: "Europe", revenue: "$46.4B", revenueNum: 46.4, products: 0, pipeline: 12, modalities: ["Gene Therapy"], focus: ["Rare Blood Disorders", "Immunology"], logoInitials: "SNY", founded: "2004", employees: "91,000", clinicalStage: "Phase 3" },

  // Leading Biotechs
  { name: "Regeneron", type: "biotech", headquarters: "Tarrytown, USA", country: "USA", region: "North America", revenue: "$13.2B", revenueNum: 13.2, products: 0, pipeline: 32, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Ophthalmology", "Oncology", "Autoimmune"], logoInitials: "REGN", founded: "1988", employees: "12,000", clinicalStage: "Phase 3" },
  { name: "Vertex Pharmaceuticals", type: "biotech", headquarters: "Boston, USA", country: "USA", region: "North America", revenue: "$8.9B", revenueNum: 8.9, products: 1, pipeline: 28, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Sickle Cell", "Thalassemia", "CRISPR"], logoInitials: "VRTX", founded: "1989", employees: "5,000", commercialProducts: ["Casgevy"], clinicalStage: "Approved" },
  { name: "BioMarin", type: "biotech", headquarters: "San Rafael, USA", country: "USA", region: "North America", revenue: "$2.4B", revenueNum: 2.4, products: 1, pipeline: 15, modalities: ["Gene Therapy"], focus: ["Hemophilia A", "Rare Diseases"], logoInitials: "BMRN", founded: "1997", employees: "3,500", commercialProducts: ["Roctavian"], clinicalStage: "Approved" },
  { name: "Bluebird Bio", type: "biotech", headquarters: "Somerville, USA", country: "USA", region: "North America", revenue: "$78M", revenueNum: 0.078, products: 2, pipeline: 8, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Beta-Thalassemia", "Sickle Cell", "Cerebral ALD"], logoInitials: "BLUE", founded: "2010", employees: "700", commercialProducts: ["Zynteglo", "Skysona"], clinicalStage: "Approved" },
  { name: "Sarepta Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$1.1B", revenueNum: 1.1, products: 1, pipeline: 22, modalities: ["Gene Therapy"], focus: ["DMD", "LGMD", "Neuromuscular"], logoInitials: "SRPT", founded: "1980", employees: "3,500", commercialProducts: ["Elevidys"], clinicalStage: "Approved" },
  { name: "Legend Biotech", type: "biotech", headquarters: "Somerset, USA", country: "USA", region: "North America", revenue: "$478M", revenueNum: 0.478, products: 1, pipeline: 18, modalities: ["Cell Therapy"], focus: ["BCMA CAR-T", "Multiple Myeloma"], logoInitials: "LEGN", founded: "2014", employees: "2,500", commercialProducts: ["Carvykti (partner)"], clinicalStage: "Approved" },
  { name: "Iovance Biotherapeutics", type: "biotech", headquarters: "San Carlos, USA", country: "USA", region: "North America", revenue: "$0", revenueNum: 0, products: 1, pipeline: 12, modalities: ["Cell Therapy"], focus: ["TIL Therapy", "Solid Tumors"], logoInitials: "IOVA", founded: "2007", employees: "1,200", commercialProducts: ["Amtagvi"], clinicalStage: "Approved" },
  { name: "Allogene Therapeutics", type: "biotech", headquarters: "South San Francisco, USA", country: "USA", region: "North America", revenue: "$0", revenueNum: 0, products: 0, pipeline: 15, modalities: ["Cell Therapy"], focus: ["Allogeneic CAR-T", "Off-the-Shelf"], logoInitials: "ALLO", founded: "2018", employees: "650", clinicalStage: "Phase 2" },
  { name: "Fate Therapeutics", type: "biotech", headquarters: "San Diego, USA", country: "USA", region: "North America", revenue: "$23M", revenueNum: 0.023, products: 0, pipeline: 10, modalities: ["Cell Therapy"], focus: ["iPSC-derived", "NK Cells"], logoInitials: "FATE", founded: "2007", employees: "400", clinicalStage: "Phase 2" },
  { name: "Orca Bio", type: "biotech", headquarters: "Menlo Park, USA", country: "USA", region: "North America", revenue: "$0", revenueNum: 0, products: 0, pipeline: 5, modalities: ["Cell Therapy"], focus: ["High-Precision Cell Therapy", "Transplant"], logoInitials: "ORCA", founded: "2016", employees: "200", clinicalStage: "Phase 3" },
  { name: "Cabaletta Bio", type: "biotech", headquarters: "Philadelphia, USA", country: "USA", region: "North America", revenue: "$0", revenueNum: 0, products: 0, pipeline: 4, modalities: ["Cell Therapy"], focus: ["Autoimmune CAR-T", "Lupus", "MS"], logoInitials: "CABA", founded: "2017", employees: "150", clinicalStage: "Phase 2" },
  { name: "CRISPR Therapeutics", type: "biotech", headquarters: "Zug, Switzerland", country: "Switzerland", region: "Europe", revenue: "$0", revenueNum: 0, products: 1, pipeline: 12, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Gene Editing", "Sickle Cell"], logoInitials: "CRSP", founded: "2013", employees: "1,200", commercialProducts: ["Casgevy"], clinicalStage: "Approved" },
  { name: "Intellia Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$96M", revenueNum: 0.096, products: 0, pipeline: 10, modalities: ["Gene Therapy"], focus: ["In-vivo Gene Editing", "ATTR"], logoInitials: "NTLA", founded: "2014", employees: "700", clinicalStage: "Phase 3" },
  { name: "Beam Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$38M", revenueNum: 0.038, products: 0, pipeline: 6, modalities: ["Gene Therapy"], focus: ["Base Editing", "Sickle Cell"], logoInitials: "BEAM", founded: "2017", employees: "500", clinicalStage: "Phase 2" },
  { name: "Autolus Therapeutics", type: "biotech", headquarters: "London, UK", country: "UK", region: "Europe", revenue: "$0", revenueNum: 0, products: 1, pipeline: 8, modalities: ["Cell Therapy"], focus: ["CAR-T", "Next-Gen Platforms"], logoInitials: "AUTL", founded: "2014", employees: "600", commercialProducts: ["Aucatzyl"], clinicalStage: "Approved" },
  { name: "Kite (Gilead)", type: "biotech", headquarters: "Santa Monica, USA", country: "USA", region: "North America", revenue: "Part of Gilead", revenueNum: 0, products: 2, pipeline: 15, modalities: ["Cell Therapy"], focus: ["CAR-T", "TCR"], logoInitials: "KITE", founded: "2009", employees: "2,000", commercialProducts: ["Yescarta", "Tecartus"], clinicalStage: "Approved" },

  // Radioligand Leaders
  { name: "Telix Pharmaceuticals", type: "biotech", headquarters: "Melbourne, Australia", country: "Australia", region: "Asia Pacific", revenue: "$85M", revenueNum: 0.085, products: 1, pipeline: 12, modalities: ["Radioligand Therapy"], focus: ["Kidney Cancer", "Prostate", "Brain Cancer"], logoInitials: "TLX", founded: "2015", employees: "800", commercialProducts: ["Illuccix"], clinicalStage: "Approved" },
  { name: "Lantheus Holdings", type: "biotech", headquarters: "Bedford, USA", country: "USA", region: "North America", revenue: "$1.2B", revenueNum: 1.2, products: 2, pipeline: 8, modalities: ["Radioligand Therapy", "Personalized Medicine"], focus: ["Diagnostics", "PSMA Imaging"], logoInitials: "LNTH", founded: "1956", employees: "1,000", commercialProducts: ["Pylarify", "Definity"], clinicalStage: "Approved" },

  // Personalized Medicine / Diagnostics
  { name: "Foundation Medicine", type: "technology", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$575M", revenueNum: 0.575, products: 4, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Genomic Profiling", "Companion Dx"], logoInitials: "FMI", founded: "2010", employees: "2,000", commercialProducts: ["FoundationOne CDx"], clinicalStage: "Approved" },
  { name: "Guardant Health", type: "technology", headquarters: "Redwood City, USA", country: "USA", region: "North America", revenue: "$523M", revenueNum: 0.523, products: 3, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Liquid Biopsy", "ctDNA"], logoInitials: "GH", founded: "2012", employees: "2,200", commercialProducts: ["Guardant360"], clinicalStage: "Approved" },
  { name: "Illumina", type: "technology", headquarters: "San Diego, USA", country: "USA", region: "North America", revenue: "$4.5B", revenueNum: 4.5, products: 10, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Sequencing", "Genomics Platform"], logoInitials: "ILMN", founded: "1998", employees: "10,000", commercialProducts: ["NovaSeq", "NextSeq"], clinicalStage: "Approved" },
  { name: "Exact Sciences", type: "technology", headquarters: "Madison, USA", country: "USA", region: "North America", revenue: "$2.1B", revenueNum: 2.1, products: 3, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Cancer Screening", "Genomics"], logoInitials: "EXAS", founded: "1995", employees: "7,000", commercialProducts: ["Cologuard"], clinicalStage: "Approved" },

  // CROs
  { name: "IQVIA", type: "cro", headquarters: "Durham, USA", country: "USA", region: "North America", revenue: "$14.9B", revenueNum: 14.9, products: 0, pipeline: 200, modalities: ["All Modalities"], focus: ["Clinical Trials", "Regulatory"], logoInitials: "IQV", founded: "2016", employees: "88,000", clinicalStage: "Phase 3" },
  { name: "PPD (Thermo Fisher)", type: "cro", headquarters: "Wilmington, USA", country: "USA", region: "North America", revenue: "$7.3B", revenueNum: 7.3, products: 0, pipeline: 150, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CGT Trials", "Lab Services"], logoInitials: "PPD", founded: "1985", employees: "30,000", clinicalStage: "Phase 3" },
  { name: "Parexel", type: "cro", headquarters: "Durham, USA", country: "USA", region: "North America", revenue: "$2.8B", revenueNum: 2.8, products: 0, pipeline: 80, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Regulatory Strategy", "CGT Expertise"], logoInitials: "PRXL", founded: "1982", employees: "20,000", clinicalStage: "Phase 3" },

  // Contract Manufacturing (CDMOs)
  { name: "Lonza", type: "cdmo", headquarters: "Basel, Switzerland", country: "Switzerland", region: "Europe", revenue: "$6.2B", revenueNum: 6.2, products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Manufacturing", "Viral Vectors"], logoInitials: "LONN", founded: "1897", employees: "17,000" },
  { name: "Catalent", type: "cdmo", headquarters: "Somerset, USA", country: "USA", region: "North America", revenue: "$4.8B", revenueNum: 4.8, products: 0, pipeline: 0, modalities: ["Gene Therapy"], focus: ["AAV Manufacturing", "Fill/Finish"], logoInitials: "CTLT", founded: "2007", employees: "19,000" },
  { name: "Thermo Fisher Scientific", type: "cdmo", headquarters: "Waltham, USA", country: "USA", region: "North America", revenue: "$44.9B", revenueNum: 44.9, products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Viral Vectors", "Cell Culture Media"], logoInitials: "TMO", founded: "2006", employees: "130,000" },
  { name: "WuXi AppTec", type: "cdmo", headquarters: "Shanghai, China", country: "China", region: "Asia Pacific", revenue: "$5.9B", revenueNum: 5.9, products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CGT CDMO", "R&D Services"], logoInitials: "WX", founded: "2000", employees: "44,000" },

  // Research Institutions
  { name: "MD Anderson Cancer Center", type: "research", headquarters: "Houston, USA", country: "USA", region: "North America", revenue: "N/A", revenueNum: 0, products: 0, pipeline: 85, modalities: ["Cell Therapy"], focus: ["CAR-T Research", "Clinical Trials"], logoInitials: "MDA", founded: "1941" },
  { name: "Memorial Sloan Kettering", type: "research", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "N/A", revenueNum: 0, products: 0, pipeline: 75, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR Development", "Oncology"], logoInitials: "MSK", founded: "1884" },
  { name: "Fred Hutchinson Cancer Center", type: "research", headquarters: "Seattle, USA", country: "USA", region: "North America", revenue: "N/A", revenueNum: 0, products: 0, pipeline: 65, modalities: ["Cell Therapy"], focus: ["BMT", "CAR-T", "Immunotherapy"], logoInitials: "FHCC", founded: "1975" },
  { name: "University of Pennsylvania", type: "research", headquarters: "Philadelphia, USA", country: "USA", region: "North America", revenue: "N/A", revenueNum: 0, products: 0, pipeline: 55, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR-T Pioneering", "Gene Editing"], logoInitials: "UPENN", founded: "1740" },

  // VC/Tech Investors Active in CGAT
  { name: "ARCH Venture Partners", type: "vc", headquarters: "Chicago, USA", country: "USA", region: "North America", revenue: "$4.5B AUM", revenueNum: 4.5, products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Early-Stage Biotech", "Platform Tech"], logoInitials: "ARCH", founded: "1986" },
  { name: "Flagship Pioneering", type: "vc", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$8B AUM", revenueNum: 8, products: 0, pipeline: 0, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Novel Platforms", "Gene Editing"], logoInitials: "FP", founded: "2000" },
  { name: "OrbiMed", type: "vc", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$18B AUM", revenueNum: 18, products: 0, pipeline: 0, modalities: ["All Modalities"], focus: ["Healthcare Investment", "CGT Growth"], logoInitials: "OM", founded: "1989" },
];

const TYPE_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  pharma: { label: 'Pharma', icon: Building2, color: 'text-genie-primary', bg: 'bg-genie-primary/20' },
  biotech: { label: 'Biotech', icon: Dna, color: 'text-genie-teal', bg: 'bg-genie-teal/20' },
  technology: { label: 'Technology', icon: Microscope, color: 'text-genie-cyan', bg: 'bg-genie-cyan/20' },
  cro: { label: 'CRO', icon: FlaskConical, color: 'text-warning', bg: 'bg-warning/20' },
  research: { label: 'Research', icon: Beaker, color: 'text-genie-accent', bg: 'bg-genie-accent/20' },
  vc: { label: 'VC/Investor', icon: TrendingUp, color: 'text-destructive', bg: 'bg-destructive/20' },
  cdmo: { label: 'CDMO', icon: Factory, color: 'text-success', bg: 'bg-success/20' },
};

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  shutdown: { label: 'Shutdown', icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/20' },
  struggling: { label: 'Struggling', icon: TrendingDown, color: 'text-warning', bg: 'bg-warning/20' },
  acquired: { label: 'Acquired', icon: ArrowRightLeft, color: 'text-genie-primary', bg: 'bg-genie-primary/20' },
  pivoted: { label: 'Pivoted', icon: ArrowRightLeft, color: 'text-genie-cyan', bg: 'bg-genie-cyan/20' },
  layoffs: { label: 'Major Layoffs', icon: TrendingDown, color: 'text-warning', bg: 'bg-warning/20' },
};

const MODALITY_CONFIG = {
  'Cell Therapy': { icon: Dna, color: 'text-genie-teal', bg: 'bg-genie-teal/15', barColor: 'bg-genie-teal' },
  'Gene Therapy': { icon: Atom, color: 'text-genie-primary', bg: 'bg-genie-primary/15', barColor: 'bg-genie-primary' },
  'Radioligand Therapy': { icon: Zap, color: 'text-warning', bg: 'bg-warning/15', barColor: 'bg-warning' },
  'Personalized Medicine': { icon: HeartPulse, color: 'text-genie-cyan', bg: 'bg-genie-cyan/15', barColor: 'bg-genie-cyan' },
  'All Modalities': { icon: Sparkles, color: 'text-genie-accent', bg: 'bg-genie-accent/15', barColor: 'bg-genie-accent' },
};

export const ManufacturerInfographic: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [expandedSection, setExpandedSection] = useState<string | null>('revenue');
  
  const filteredManufacturers = COMPREHENSIVE_MANUFACTURERS.filter(m => {
    const typeMatch = selectedType === 'all' || m.type === selectedType;
    const modalityMatch = selectedModality === 'all' || m.modalities.includes(selectedModality);
    return typeMatch && modalityMatch;
  });
  
  const stats = {
    totalManufacturers: COMPREHENSIVE_MANUFACTURERS.length,
    totalProducts: COMPREHENSIVE_MANUFACTURERS.reduce((sum, m) => sum + m.products, 0),
    totalPipeline: COMPREHENSIVE_MANUFACTURERS.reduce((sum, m) => sum + m.pipeline, 0),
    byType: Object.fromEntries(
      Object.keys(TYPE_CONFIG).map(type => [
        type,
        COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === type).length
      ])
    ),
    byModality: Object.fromEntries(
      Object.keys(MODALITY_CONFIG).slice(0, 4).map(mod => [
        mod,
        COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes(mod)).length
      ])
    ),
  };

  // Get top companies for different metrics
  const topByRevenue = COMPREHENSIVE_MANUFACTURERS
    .filter(m => m.revenueNum && m.revenueNum > 1 && !m.revenue?.includes('AUM'))
    .sort((a, b) => (b.revenueNum || 0) - (a.revenueNum || 0))
    .slice(0, 10);

  const topByProducts = COMPREHENSIVE_MANUFACTURERS
    .filter(m => m.products > 0)
    .sort((a, b) => b.products - a.products)
    .slice(0, 10);

  const topByPipeline = COMPREHENSIVE_MANUFACTURERS
    .filter(m => m.pipeline > 0)
    .sort((a, b) => b.pipeline - a.pipeline)
    .slice(0, 10);

  const maxRevenue = Math.max(...topByRevenue.map(m => m.revenueNum || 0));
  const maxProducts = Math.max(...topByProducts.map(m => m.products));
  const maxPipeline = Math.max(...topByPipeline.map(m => m.pipeline));

  const renderCompanyLogo = (company: ManufacturerData) => {
    const config = TYPE_CONFIG[company.type];
    return (
      <div className={`w-12 h-12 rounded-full ${config.bg} border border-border/50 flex items-center justify-center font-bold ${config.color} text-sm shadow-sm`}>
        {company.logoInitials?.slice(0, 3) || company.name.slice(0, 2).toUpperCase()}
      </div>
    );
  };

  const renderHorizontalBarChart = (
    data: ManufacturerData[],
    valueKey: 'revenueNum' | 'products' | 'pipeline',
    maxValue: number,
    formatValue: (m: ManufacturerData) => string,
    barColor: string = 'bg-genie-primary'
  ) => (
    <div className="space-y-3">
      {data.map((company, idx) => {
        const value = company[valueKey] || 0;
        const percentage = (value / maxValue) * 100;
        const config = TYPE_CONFIG[company.type];
        
        return (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center gap-3"
          >
            {/* Logo */}
            {renderCompanyLogo(company)}
            
            {/* Bar and Value */}
            <div className="flex-1 flex items-center gap-3">
              <div className="flex-1 h-8 bg-muted/50 rounded-md overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.05 }}
                  className={`h-full ${barColor} rounded-md`}
                />
                <span className="absolute inset-0 flex items-center pl-3 text-sm font-medium text-foreground truncate">
                  {company.name}
                </span>
              </div>
              <span className="text-sm font-bold text-genie-primary min-w-[80px] text-right">
                {formatValue(company)}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/10 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Badge className="mb-4 bg-genie-primary/10 text-genie-primary border-genie-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Industry Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            CGAT Industry Landscape
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Global organizations ranked by market presence in Cell & Gene Advanced Therapies
          </p>
        </motion.div>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Organizations', value: stats.totalManufacturers, icon: Building2, suffix: '+' },
            { label: 'Approved Products', value: stats.totalProducts, icon: Award, suffix: '' },
            { label: 'Pipeline Programs', value: stats.totalPipeline, icon: FlaskConical, suffix: '+' },
            { label: 'Countries', value: 25, icon: Globe, suffix: '+' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-card border-border/50 hover:border-genie-primary/30 transition-all">
                <CardContent className="p-4 text-center">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-genie-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}{stat.suffix}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filter Section */}
        <Card className="bg-card border-border/50 mb-8">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter:</span>
              
              <div className="flex flex-wrap gap-1.5">
                <Badge 
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedType('all')}
                >
                  All Types
                </Badge>
                {Object.entries(TYPE_CONFIG).map(([type, config]) => {
                  const Icon = config.icon;
                  return (
                    <Badge 
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      className={`cursor-pointer text-xs ${selectedType !== type ? config.bg + ' ' + config.color + ' border-transparent' : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="rankings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="rankings" className="data-[state=active]:bg-genie-primary/10 data-[state=active]:text-genie-primary text-xs">
              Rankings
            </TabsTrigger>
            <TabsTrigger value="challenges" className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="modalities" className="data-[state=active]:bg-genie-primary/10 data-[state=active]:text-genie-primary text-xs">
              Modalities
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-genie-primary/10 data-[state=active]:text-genie-primary text-xs">
              Geography
            </TabsTrigger>
            <TabsTrigger value="explore" className="data-[state=active]:bg-genie-primary/10 data-[state=active]:text-genie-primary text-xs">
              Explore
            </TabsTrigger>
          </TabsList>
          
          {/* Rankings Tab - Horizontal Bar Charts */}
          <TabsContent value="rankings" className="space-y-6">
            {/* Revenue Leaders */}
            <Card className="bg-card border-border/50">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedSection(expandedSection === 'revenue' ? null : 'revenue')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                      <DollarSign className="h-5 w-5 text-genie-primary" />
                      Top CGAT Companies by Revenue
                    </CardTitle>
                    <CardDescription>Global organizations ranked by annual revenue</CardDescription>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSection === 'revenue' ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSection === 'revenue' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="pt-0">
                      {renderHorizontalBarChart(
                        topByRevenue,
                        'revenueNum',
                        maxRevenue,
                        (m) => m.revenue || '$0',
                        'bg-genie-primary'
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Products Leaders */}
            <Card className="bg-card border-border/50">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedSection(expandedSection === 'products' ? null : 'products')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                      <Award className="h-5 w-5 text-genie-teal" />
                      Top CGAT Companies by Approved Products
                    </CardTitle>
                    <CardDescription>Organizations with commercial CGT therapies</CardDescription>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSection === 'products' ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSection === 'products' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="pt-0">
                      {renderHorizontalBarChart(
                        topByProducts,
                        'products',
                        maxProducts,
                        (m) => `${m.products} products`,
                        'bg-genie-teal'
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Pipeline Leaders */}
            <Card className="bg-card border-border/50">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedSection(expandedSection === 'pipeline' ? null : 'pipeline')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                      <FlaskConical className="h-5 w-5 text-genie-accent" />
                      Top CGAT Companies by Pipeline
                    </CardTitle>
                    <CardDescription>Organizations with most active clinical programs</CardDescription>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSection === 'pipeline' ? 'rotate-180' : ''}`} />
                </div>
              </CardHeader>
              <AnimatePresence>
                {expandedSection === 'pipeline' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="pt-0">
                      {renderHorizontalBarChart(
                        topByPipeline,
                        'pipeline',
                        maxPipeline,
                        (m) => `${m.pipeline} programs`,
                        'bg-genie-accent'
                      )}
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </TabsContent>
          
          {/* Market Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            {/* Market Pressure Statistics */}
            <Card className="bg-card border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <TrendingDown className="h-5 w-5 text-destructive" />
                  CGAT Market Pressure Indicators (2023-2024)
                </CardTitle>
                <CardDescription>Key metrics showing industry challenges and market sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {MARKET_TRENDS.map((trend, idx) => (
                    <motion.div
                      key={trend.metric}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div className="text-xs text-muted-foreground mb-1">{trend.metric}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">{trend.value}</span>
                        <span className={`text-sm font-medium ${trend.trend === 'up' ? 'text-destructive' : 'text-warning'}`}>
                          {trend.change}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{trend.description}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Pressures */}
            <Card className="bg-card border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Key Industry Pressures
                </CardTitle>
                <CardDescription>Major challenges affecting CGAT companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {INDUSTRY_PRESSURES.map((pressure, idx) => (
                    <motion.div
                      key={pressure.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={`text-xs ${pressure.severity === 'high' ? 'bg-destructive/20 text-destructive border-destructive/30' : 'bg-warning/20 text-warning border-warning/30'}`}>
                          {pressure.severity === 'high' ? 'High Impact' : 'Medium Impact'}
                        </Badge>
                        <span className="font-medium text-foreground text-sm">{pressure.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{pressure.description}</p>
                      <div className="text-xs text-genie-primary font-medium">{pressure.impact}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shutdowns & Struggling Companies */}
            <Card className="bg-card border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Company Shutdowns, Pivots & Layoffs
                </CardTitle>
                <CardDescription>Organizations that have closed, been acquired, or significantly restructured</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {SHUTDOWNS_AND_CHALLENGES.map((company, idx) => {
                      const statusConfig = STATUS_CONFIG[company.status];
                      const StatusIcon = statusConfig.icon;
                      
                      return (
                        <motion.div
                          key={company.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-destructive/30 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-12 h-12 rounded-full ${statusConfig.bg} border border-border/50 flex items-center justify-center font-bold ${statusConfig.color} text-sm`}>
                              {company.logoInitials.slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-foreground">{company.name}</span>
                                <Badge variant="outline" className={`${statusConfig.bg} ${statusConfig.color} border-transparent text-[10px]`}>
                                  <StatusIcon className="h-2.5 w-2.5 mr-1" />
                                  {statusConfig.label}
                                </Badge>
                                <Badge variant="secondary" className="text-[10px]">
                                  <Clock className="h-2.5 w-2.5 mr-1" />
                                  {company.year}
                                </Badge>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <span className="font-medium text-warning">{company.reason}</span> • {company.modality}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">{company.details}</p>
                              <div className="flex gap-3 mt-2">
                                {company.previousValuation && (
                                  <span className="text-xs text-destructive">Peak: {company.previousValuation}</span>
                                )}
                                {company.employees && (
                                  <span className="text-xs text-warning">{company.employees}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Modalities Tab */}
          <TabsContent value="modalities">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(MODALITY_CONFIG).slice(0, 4).map(([modality, config]) => {
                const companies = COMPREHENSIVE_MANUFACTURERS
                  .filter(m => m.modalities.includes(modality))
                  .sort((a, b) => (b.revenueNum || 0) - (a.revenueNum || 0))
                  .slice(0, 6);
                const Icon = config.icon;
                const maxRev = Math.max(...companies.map(c => c.revenueNum || 0.1));
                
                return (
                  <Card key={modality} className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className={`h-5 w-5 ${config.color}`} />
                        {modality}
                      </CardTitle>
                      <CardDescription>
                        {COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes(modality)).length} organizations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {companies.map((company, idx) => {
                          const percentage = ((company.revenueNum || 0.1) / maxRev) * 100;
                          return (
                            <div key={company.name} className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center text-xs font-bold ${config.color}`}>
                                {company.logoInitials?.slice(0, 2)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-foreground">{company.name}</span>
                                  <span className="text-xs text-muted-foreground">{company.products > 0 ? `${company.products} products` : `${company.pipeline} pipeline`}</span>
                                </div>
                                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className={`h-full ${config.barColor} rounded-full`}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          {/* Geography Tab */}
          <TabsContent value="geography">
            <div className="grid md:grid-cols-3 gap-6">
              {['North America', 'Europe', 'Asia Pacific'].map((region, idx) => {
                const regionCompanies = COMPREHENSIVE_MANUFACTURERS.filter(m => m.region === region);
                const countries = [...new Set(regionCompanies.map(c => c.country))];
                const colors = ['bg-genie-primary', 'bg-genie-teal', 'bg-warning'];
                
                return (
                  <Card key={region} className="bg-card border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <MapPin className={`h-5 w-5 ${colors[idx].replace('bg-', 'text-')}`} />
                        {region}
                      </CardTitle>
                      <CardDescription>{regionCompanies.length} organizations • {countries.length} countries</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {countries.slice(0, 5).map(country => {
                          const count = regionCompanies.filter(c => c.country === country).length;
                          const percentage = (count / regionCompanies.length) * 100;
                          return (
                            <div key={country} className="flex items-center gap-2">
                              <span className="text-xs text-foreground w-24 truncate">{country}</span>
                              <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                                <div className={`h-full ${colors[idx]} rounded-full`} style={{ width: `${percentage}%` }} />
                              </div>
                              <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="pt-3 border-t border-border/50">
                        <div className="text-xs text-muted-foreground mb-2">Key Players:</div>
                        <div className="flex flex-wrap gap-1">
                          {regionCompanies.slice(0, 4).map(company => (
                            <Badge key={company.name} variant="secondary" className="text-xs">
                              {company.name.split(' ')[0]}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          {/* Explore All Tab */}
          <TabsContent value="explore">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">All Organizations ({filteredManufacturers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredManufacturers.map((company) => {
                      const config = TYPE_CONFIG[company.type];
                      const Icon = config.icon;
                      return (
                        <div key={company.name} className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-genie-primary/30 transition-all">
                          <div className="flex items-start gap-3">
                            {renderCompanyLogo(company)}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm truncate">{company.name}</div>
                              <Badge variant="outline" className={`${config.bg} ${config.color} border-transparent text-[10px] mt-1`}>
                                <Icon className="h-2.5 w-2.5 mr-1" />
                                {config.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">{company.headquarters}</div>
                          <div className="flex gap-2 mt-2">
                            {company.products > 0 && (
                              <span className="text-xs text-genie-teal">{company.products} products</span>
                            )}
                            {company.pipeline > 0 && (
                              <span className="text-xs text-genie-accent">{company.pipeline} pipeline</span>
                            )}
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
