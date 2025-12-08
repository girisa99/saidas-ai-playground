import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  Building2, TrendingUp, Beaker, DollarSign, Users, 
  Globe, Microscope, Factory, FlaskConical, Dna,
  Target, Award, Activity, BarChart3, PieChart,
  MapPin, ChevronRight, Zap, Atom, HeartPulse,
  Sparkles, ExternalLink, Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ManufacturerData {
  name: string;
  type: 'pharma' | 'biotech' | 'technology' | 'cro' | 'healthcare' | 'research' | 'vc' | 'cdmo';
  headquarters: string;
  country: string;
  region: 'North America' | 'Europe' | 'Asia Pacific' | 'Middle East';
  revenue?: string;
  products: number;
  pipeline: number;
  modalities: string[];
  focus: string[];
  website?: string;
  logoInitials?: string;
  founded?: string;
  employees?: string;
  commercialProducts?: string[];
  clinicalStage?: 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Approved' | 'Pre-clinical';
}

const COMPREHENSIVE_MANUFACTURERS: ManufacturerData[] = [
  // Major Pharma
  { name: "Novartis", type: "pharma", headquarters: "Basel, Switzerland", country: "Switzerland", region: "Europe", revenue: "$51.6B", products: 2, pipeline: 45, modalities: ["Cell Therapy", "Gene Therapy", "Radioligand Therapy"], focus: ["CAR-T", "Oncology", "Immunology", "NETs"], logoInitials: "NVS", founded: "1996", employees: "108,000", commercialProducts: ["Kymriah", "Lutathera", "Pluvicto"], clinicalStage: "Approved" },
  { name: "Bristol-Myers Squibb", type: "pharma", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$46.2B", products: 2, pipeline: 52, modalities: ["Cell Therapy"], focus: ["CAR-T", "Immuno-Oncology", "Multiple Myeloma"], logoInitials: "BMS", founded: "1989", employees: "34,000", commercialProducts: ["Breyanzi", "Abecma"], clinicalStage: "Approved" },
  { name: "Gilead Sciences", type: "pharma", headquarters: "Foster City, USA", country: "USA", region: "North America", revenue: "$27.1B", products: 2, pipeline: 38, modalities: ["Cell Therapy"], focus: ["CAR-T", "Lymphoma", "Leukemia"], logoInitials: "GILD", founded: "1987", employees: "17,000", commercialProducts: ["Yescarta", "Tecartus"], clinicalStage: "Approved" },
  { name: "Johnson & Johnson", type: "pharma", headquarters: "New Brunswick, USA", country: "USA", region: "North America", revenue: "$85.2B", products: 1, pipeline: 28, modalities: ["Cell Therapy"], focus: ["BCMA CAR-T", "Multiple Myeloma"], logoInitials: "JNJ", founded: "1886", employees: "152,000", commercialProducts: ["Carvykti"], clinicalStage: "Approved" },
  { name: "Roche", type: "pharma", headquarters: "Basel, Switzerland", country: "Switzerland", region: "Europe", revenue: "$63.3B", products: 0, pipeline: 35, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Hemophilia", "Ophthalmology"], logoInitials: "ROG", founded: "1896", employees: "100,000", clinicalStage: "Phase 3" },
  { name: "Pfizer", type: "pharma", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$58.5B", products: 0, pipeline: 22, modalities: ["Gene Therapy"], focus: ["Hemophilia", "DMD", "Rare Diseases"], logoInitials: "PFE", founded: "1849", employees: "83,000", clinicalStage: "Phase 3" },
  { name: "AstraZeneca", type: "pharma", headquarters: "Cambridge, UK", country: "UK", region: "Europe", revenue: "$44.4B", products: 0, pipeline: 18, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Oncology", "Autoimmune"], logoInitials: "AZN", founded: "1999", employees: "83,000", clinicalStage: "Phase 2" },
  { name: "Bayer", type: "pharma", headquarters: "Leverkusen, Germany", country: "Germany", region: "Europe", revenue: "$52.8B", products: 0, pipeline: 25, modalities: ["Gene Therapy", "Radioligand Therapy"], focus: ["Oncology", "Ophthalmology"], logoInitials: "BAYN", founded: "1863", employees: "100,000", clinicalStage: "Phase 3" },
  { name: "Takeda", type: "pharma", headquarters: "Tokyo, Japan", country: "Japan", region: "Asia Pacific", revenue: "$30.3B", products: 0, pipeline: 15, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Rare Diseases", "Oncology"], logoInitials: "TAK", founded: "1781", employees: "50,000", clinicalStage: "Phase 2" },
  { name: "Sanofi", type: "pharma", headquarters: "Paris, France", country: "France", region: "Europe", revenue: "$46.4B", products: 0, pipeline: 12, modalities: ["Gene Therapy"], focus: ["Rare Blood Disorders", "Immunology"], logoInitials: "SNY", founded: "2004", employees: "91,000", clinicalStage: "Phase 3" },

  // Leading Biotechs
  { name: "Regeneron", type: "biotech", headquarters: "Tarrytown, USA", country: "USA", region: "North America", revenue: "$13.2B", products: 0, pipeline: 32, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Ophthalmology", "Oncology", "Autoimmune"], logoInitials: "REGN", founded: "1988", employees: "12,000", clinicalStage: "Phase 3" },
  { name: "Vertex Pharmaceuticals", type: "biotech", headquarters: "Boston, USA", country: "USA", region: "North America", revenue: "$8.9B", products: 1, pipeline: 28, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Sickle Cell", "Thalassemia", "CRISPR"], logoInitials: "VRTX", founded: "1989", employees: "5,000", commercialProducts: ["Casgevy"], clinicalStage: "Approved" },
  { name: "BioMarin", type: "biotech", headquarters: "San Rafael, USA", country: "USA", region: "North America", revenue: "$2.4B", products: 1, pipeline: 15, modalities: ["Gene Therapy"], focus: ["Hemophilia A", "Rare Diseases"], logoInitials: "BMRN", founded: "1997", employees: "3,500", commercialProducts: ["Roctavian"], clinicalStage: "Approved" },
  { name: "Bluebird Bio", type: "biotech", headquarters: "Somerville, USA", country: "USA", region: "North America", revenue: "$78M", products: 2, pipeline: 8, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Beta-Thalassemia", "Sickle Cell", "Cerebral ALD"], logoInitials: "BLUE", founded: "2010", employees: "700", commercialProducts: ["Zynteglo", "Skysona"], clinicalStage: "Approved" },
  { name: "Sarepta Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$1.1B", products: 1, pipeline: 22, modalities: ["Gene Therapy"], focus: ["DMD", "LGMD", "Neuromuscular"], logoInitials: "SRPT", founded: "1980", employees: "3,500", commercialProducts: ["Elevidys"], clinicalStage: "Approved" },
  { name: "Ultragenyx", type: "biotech", headquarters: "Novato, USA", country: "USA", region: "North America", revenue: "$430M", products: 0, pipeline: 12, modalities: ["Gene Therapy"], focus: ["Rare Metabolic", "Lysosomal Storage"], logoInitials: "RARE", founded: "2010", employees: "1,500", clinicalStage: "Phase 3" },
  { name: "Legend Biotech", type: "biotech", headquarters: "Somerset, USA", country: "USA", region: "North America", revenue: "$478M", products: 1, pipeline: 18, modalities: ["Cell Therapy"], focus: ["BCMA CAR-T", "Multiple Myeloma"], logoInitials: "LEGN", founded: "2014", employees: "2,500", commercialProducts: ["Carvykti (partner)"], clinicalStage: "Approved" },
  { name: "Iovance Biotherapeutics", type: "biotech", headquarters: "San Carlos, USA", country: "USA", region: "North America", revenue: "$0", products: 1, pipeline: 12, modalities: ["Cell Therapy"], focus: ["TIL Therapy", "Solid Tumors"], logoInitials: "IOVA", founded: "2007", employees: "1,200", commercialProducts: ["Amtagvi"], clinicalStage: "Approved" },
  { name: "Allogene Therapeutics", type: "biotech", headquarters: "South San Francisco, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 15, modalities: ["Cell Therapy"], focus: ["Allogeneic CAR-T", "Off-the-Shelf"], logoInitials: "ALLO", founded: "2018", employees: "650", clinicalStage: "Phase 2" },
  { name: "Fate Therapeutics", type: "biotech", headquarters: "San Diego, USA", country: "USA", region: "North America", revenue: "$23M", products: 0, pipeline: 10, modalities: ["Cell Therapy"], focus: ["iPSC-derived", "NK Cells"], logoInitials: "FATE", founded: "2007", employees: "400", clinicalStage: "Phase 2" },
  { name: "Orca Bio", type: "biotech", headquarters: "Menlo Park, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 5, modalities: ["Cell Therapy"], focus: ["High-Precision Cell Therapy", "Transplant"], logoInitials: "ORCA", founded: "2016", employees: "200", clinicalStage: "Phase 3" },
  { name: "Cabaletta Bio", type: "biotech", headquarters: "Philadelphia, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 4, modalities: ["Cell Therapy"], focus: ["Autoimmune CAR-T", "Lupus", "MS"], logoInitials: "CABA", founded: "2017", employees: "150", clinicalStage: "Phase 2" },
  { name: "Poseida Therapeutics", type: "biotech", headquarters: "San Diego, USA", country: "USA", region: "North America", revenue: "$52M", products: 0, pipeline: 8, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Allogeneic CAR-T", "Gene Editing"], logoInitials: "PSTX", founded: "2015", employees: "300", clinicalStage: "Phase 2" },
  { name: "CRISPR Therapeutics", type: "biotech", headquarters: "Zug, Switzerland", country: "Switzerland", region: "Europe", revenue: "$0", products: 1, pipeline: 12, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Gene Editing", "Sickle Cell"], logoInitials: "CRSP", founded: "2013", employees: "1,200", commercialProducts: ["Casgevy"], clinicalStage: "Approved" },
  { name: "Editas Medicine", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$12M", products: 0, pipeline: 8, modalities: ["Gene Therapy"], focus: ["CRISPR Gene Editing", "Ophthalmology"], logoInitials: "EDIT", founded: "2013", employees: "350", clinicalStage: "Phase 2" },
  { name: "Intellia Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$96M", products: 0, pipeline: 10, modalities: ["Gene Therapy"], focus: ["In-vivo Gene Editing", "ATTR"], logoInitials: "NTLA", founded: "2014", employees: "700", clinicalStage: "Phase 3" },
  { name: "Beam Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$38M", products: 0, pipeline: 6, modalities: ["Gene Therapy"], focus: ["Base Editing", "Sickle Cell"], logoInitials: "BEAM", founded: "2017", employees: "500", clinicalStage: "Phase 2" },
  { name: "Prime Medicine", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 4, modalities: ["Gene Therapy"], focus: ["Prime Editing"], logoInitials: "PRME", founded: "2019", employees: "300", clinicalStage: "Pre-clinical" },
  { name: "Compass Therapeutics", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 5, modalities: ["Cell Therapy"], focus: ["NK Cells", "Oncology"], logoInitials: "CMPX", founded: "2014", employees: "100", clinicalStage: "Phase 1" },
  { name: "Autolus Therapeutics", type: "biotech", headquarters: "London, UK", country: "UK", region: "Europe", revenue: "$0", products: 1, pipeline: 8, modalities: ["Cell Therapy"], focus: ["CAR-T", "Next-Gen Platforms"], logoInitials: "AUTL", founded: "2014", employees: "600", commercialProducts: ["Aucatzyl"], clinicalStage: "Approved" },
  { name: "Mustang Bio", type: "biotech", headquarters: "Worcester, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 6, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR-T", "Bubble Boy Disease"], logoInitials: "MBIO", founded: "2015", employees: "100", clinicalStage: "Phase 2" },
  { name: "Precision BioSciences", type: "biotech", headquarters: "Durham, USA", country: "USA", region: "North America", revenue: "$23M", products: 0, pipeline: 5, modalities: ["Gene Therapy"], focus: ["ARCUS Genome Editing"], logoInitials: "DTIL", founded: "2006", employees: "250", clinicalStage: "Phase 2" },
  { name: "Caribou Biosciences", type: "biotech", headquarters: "Berkeley, USA", country: "USA", region: "North America", revenue: "$15M", products: 0, pipeline: 4, modalities: ["Cell Therapy"], focus: ["Allogeneic CAR-T", "chRDNA"], logoInitials: "CRBU", founded: "2011", employees: "200", clinicalStage: "Phase 1" },
  { name: "Arcellx", type: "biotech", headquarters: "Redwood City, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 5, modalities: ["Cell Therapy"], focus: ["D-Domain CAR-T", "Multiple Myeloma"], logoInitials: "ACLX", founded: "2015", employees: "400", clinicalStage: "Phase 2" },
  { name: "2seventy bio", type: "biotech", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$0", products: 1, pipeline: 4, modalities: ["Cell Therapy"], focus: ["CAR-T", "Oncology"], logoInitials: "TSVT", founded: "2021", employees: "200", commercialProducts: ["Abecma (partner)"], clinicalStage: "Approved" },
  { name: "Kite (Gilead)", type: "biotech", headquarters: "Santa Monica, USA", country: "USA", region: "North America", revenue: "Part of Gilead", products: 2, pipeline: 15, modalities: ["Cell Therapy"], focus: ["CAR-T", "TCR"], logoInitials: "KITE", founded: "2009", employees: "2,000", commercialProducts: ["Yescarta", "Tecartus"], clinicalStage: "Approved" },
  { name: "Juno (BMS)", type: "biotech", headquarters: "Seattle, USA", country: "USA", region: "North America", revenue: "Part of BMS", products: 2, pipeline: 10, modalities: ["Cell Therapy"], focus: ["CAR-T", "TCR"], logoInitials: "JUNO", founded: "2013", employees: "1,500", commercialProducts: ["Breyanzi"], clinicalStage: "Approved" },

  // Radioligand Leaders
  { name: "Telix Pharmaceuticals", type: "biotech", headquarters: "Melbourne, Australia", country: "Australia", region: "Asia Pacific", revenue: "$85M", products: 1, pipeline: 12, modalities: ["Radioligand Therapy"], focus: ["Kidney Cancer", "Prostate", "Brain Cancer"], logoInitials: "TLX", founded: "2015", employees: "800", commercialProducts: ["Illuccix"], clinicalStage: "Approved" },
  { name: "Point Biopharma", type: "biotech", headquarters: "Indianapolis, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 5, modalities: ["Radioligand Therapy"], focus: ["Prostate Cancer", "PSMA"], logoInitials: "PNT", founded: "2019", employees: "200", clinicalStage: "Phase 3" },
  { name: "RayzeBio", type: "biotech", headquarters: "San Diego, USA", country: "USA", region: "North America", revenue: "$0", products: 0, pipeline: 4, modalities: ["Radioligand Therapy"], focus: ["Actinium-225", "Solid Tumors"], logoInitials: "RYZB", founded: "2020", employees: "150", clinicalStage: "Phase 2" },
  { name: "Lantheus Holdings", type: "biotech", headquarters: "Bedford, USA", country: "USA", region: "North America", revenue: "$1.2B", products: 2, pipeline: 8, modalities: ["Radioligand Therapy", "Personalized Medicine"], focus: ["Diagnostics", "PSMA Imaging"], logoInitials: "LNTH", founded: "1956", employees: "1,000", commercialProducts: ["Pylarify", "Definity"], clinicalStage: "Approved" },
  { name: "Fusion Pharmaceuticals", type: "biotech", headquarters: "Hamilton, Canada", country: "Canada", region: "North America", revenue: "$0", products: 0, pipeline: 4, modalities: ["Radioligand Therapy"], focus: ["Alpha Emitters", "Solid Tumors"], logoInitials: "FUSN", founded: "2014", employees: "200", clinicalStage: "Phase 2" },

  // Personalized Medicine / Diagnostics
  { name: "Foundation Medicine", type: "technology", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$575M", products: 4, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Genomic Profiling", "Companion Dx"], logoInitials: "FMI", founded: "2010", employees: "2,000", commercialProducts: ["FoundationOne CDx"], clinicalStage: "Approved" },
  { name: "Guardant Health", type: "technology", headquarters: "Redwood City, USA", country: "USA", region: "North America", revenue: "$523M", products: 3, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Liquid Biopsy", "ctDNA"], logoInitials: "GH", founded: "2012", employees: "2,200", commercialProducts: ["Guardant360"], clinicalStage: "Approved" },
  { name: "Tempus", type: "technology", headquarters: "Chicago, USA", country: "USA", region: "North America", revenue: "$531M", products: 5, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["AI/ML", "Genomics", "Clinical Data"], logoInitials: "TEM", founded: "2015", employees: "3,000", commercialProducts: ["Tempus xT"], clinicalStage: "Approved" },
  { name: "Exact Sciences", type: "technology", headquarters: "Madison, USA", country: "USA", region: "North America", revenue: "$2.1B", products: 3, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Cancer Screening", "Genomics"], logoInitials: "EXAS", founded: "1995", employees: "7,000", commercialProducts: ["Cologuard"], clinicalStage: "Approved" },
  { name: "Illumina", type: "technology", headquarters: "San Diego, USA", country: "USA", region: "North America", revenue: "$4.5B", products: 10, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["Sequencing", "Genomics Platform"], logoInitials: "ILMN", founded: "1998", employees: "10,000", commercialProducts: ["NovaSeq", "NextSeq"], clinicalStage: "Approved" },
  { name: "Natera", type: "technology", headquarters: "Austin, USA", country: "USA", region: "North America", revenue: "$871M", products: 4, pipeline: 0, modalities: ["Personalized Medicine"], focus: ["MRD Detection", "Prenatal"], logoInitials: "NTRA", founded: "2004", employees: "5,500", commercialProducts: ["Signatera"], clinicalStage: "Approved" },
  { name: "Grail (Illumina)", type: "technology", headquarters: "Menlo Park, USA", country: "USA", region: "North America", revenue: "$100M", products: 1, pipeline: 2, modalities: ["Personalized Medicine"], focus: ["Multi-Cancer Early Detection"], logoInitials: "GRAL", founded: "2016", employees: "1,000", commercialProducts: ["Galleri"], clinicalStage: "Approved" },

  // CROs
  { name: "IQVIA", type: "cro", headquarters: "Durham, USA", country: "USA", region: "North America", revenue: "$14.9B", products: 0, pipeline: 200, modalities: ["All Modalities"], focus: ["Clinical Trials", "Regulatory"], logoInitials: "IQV", founded: "2016", employees: "88,000", clinicalStage: "Phase 3" },
  { name: "PPD (Thermo Fisher)", type: "cro", headquarters: "Wilmington, USA", country: "USA", region: "North America", revenue: "$7.3B", products: 0, pipeline: 150, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CGT Trials", "Lab Services"], logoInitials: "PPD", founded: "1985", employees: "30,000", clinicalStage: "Phase 3" },
  { name: "Syneos Health", type: "cro", headquarters: "Morrisville, USA", country: "USA", region: "North America", revenue: "$5.4B", products: 0, pipeline: 100, modalities: ["All Modalities"], focus: ["Clinical Development", "Commercialization"], logoInitials: "SYNH", founded: "2017", employees: "29,000", clinicalStage: "Phase 3" },
  { name: "Parexel", type: "cro", headquarters: "Durham, USA", country: "USA", region: "North America", revenue: "$2.8B", products: 0, pipeline: 80, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Regulatory Strategy", "CGT Expertise"], logoInitials: "PRXL", founded: "1982", employees: "20,000", clinicalStage: "Phase 3" },
  { name: "Medpace", type: "cro", headquarters: "Cincinnati, USA", country: "USA", region: "North America", revenue: "$1.9B", products: 0, pipeline: 60, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Oncology Trials", "Rare Disease"], logoInitials: "MEDP", founded: "1992", employees: "5,500", clinicalStage: "Phase 3" },

  // Contract Manufacturing (CDMOs)
  { name: "Lonza", type: "cdmo", headquarters: "Basel, Switzerland", country: "Switzerland", region: "Europe", revenue: "$6.2B", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Manufacturing", "Viral Vectors"], logoInitials: "LONN", founded: "1897", employees: "17,000" },
  { name: "Catalent", type: "cdmo", headquarters: "Somerset, USA", country: "USA", region: "North America", revenue: "$4.8B", products: 0, pipeline: 0, modalities: ["Gene Therapy"], focus: ["AAV Manufacturing", "Fill/Finish"], logoInitials: "CTLT", founded: "2007", employees: "19,000" },
  { name: "Samsung Biologics", type: "cdmo", headquarters: "Incheon, South Korea", country: "South Korea", region: "Asia Pacific", revenue: "$2.1B", products: 0, pipeline: 0, modalities: ["Cell Therapy"], focus: ["Manufacturing", "CMO Services"], logoInitials: "SB", founded: "2011", employees: "7,000" },
  { name: "WuXi AppTec", type: "cdmo", headquarters: "Shanghai, China", country: "China", region: "Asia Pacific", revenue: "$5.9B", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CGT CDMO", "R&D Services"], logoInitials: "WX", founded: "2000", employees: "44,000" },
  { name: "WuXi Advanced Therapies", type: "cdmo", headquarters: "Philadelphia, USA", country: "USA", region: "North America", revenue: "$800M", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Viral Vectors", "Cell Processing"], logoInitials: "WXAT", founded: "2019", employees: "3,000" },
  { name: "Thermo Fisher Scientific", type: "cdmo", headquarters: "Waltham, USA", country: "USA", region: "North America", revenue: "$44.9B", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Viral Vectors", "Cell Culture Media"], logoInitials: "TMO", founded: "2006", employees: "130,000" },

  // Research Institutions
  { name: "MD Anderson Cancer Center", type: "research", headquarters: "Houston, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 85, modalities: ["Cell Therapy"], focus: ["CAR-T Research", "Clinical Trials"], logoInitials: "MDA", founded: "1941" },
  { name: "Memorial Sloan Kettering", type: "research", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 75, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR Development", "Oncology"], logoInitials: "MSK", founded: "1884" },
  { name: "Fred Hutchinson Cancer Center", type: "research", headquarters: "Seattle, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 65, modalities: ["Cell Therapy"], focus: ["BMT", "CAR-T", "Immunotherapy"], logoInitials: "FHCC", founded: "1975" },
  { name: "Dana-Farber Cancer Institute", type: "research", headquarters: "Boston, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 60, modalities: ["Cell Therapy"], focus: ["CAR-T", "Gene Therapy"], logoInitials: "DFCI", founded: "1947" },
  { name: "St. Jude Children's Research", type: "research", headquarters: "Memphis, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 40, modalities: ["Gene Therapy"], focus: ["Pediatric Gene Therapy", "Sickle Cell"], logoInitials: "SJCRH", founded: "1962" },
  { name: "NIH Clinical Center", type: "research", headquarters: "Bethesda, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 90, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Federal Research", "Clinical Trials"], logoInitials: "NIH", founded: "1953" },
  { name: "University of Pennsylvania", type: "research", headquarters: "Philadelphia, USA", country: "USA", region: "North America", revenue: "N/A", products: 0, pipeline: 55, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["CAR-T Pioneering", "Gene Editing"], logoInitials: "UPENN", founded: "1740" },

  // VC/Tech Investors Active in CGAT
  { name: "ARCH Venture Partners", type: "vc", headquarters: "Chicago, USA", country: "USA", region: "North America", revenue: "$4.5B AUM", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Early-Stage Biotech", "Platform Tech"], logoInitials: "ARCH", founded: "1986" },
  { name: "Flagship Pioneering", type: "vc", headquarters: "Cambridge, USA", country: "USA", region: "North America", revenue: "$8B AUM", products: 0, pipeline: 0, modalities: ["Gene Therapy", "Cell Therapy"], focus: ["Novel Platforms", "Gene Editing"], logoInitials: "FP", founded: "2000" },
  { name: "OrbiMed", type: "vc", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$18B AUM", products: 0, pipeline: 0, modalities: ["All Modalities"], focus: ["Healthcare Investment", "CGT Growth"], logoInitials: "OM", founded: "1989" },
  { name: "RA Capital Management", type: "vc", headquarters: "Boston, USA", country: "USA", region: "North America", revenue: "$12B AUM", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["Crossover Investment", "CGT"], logoInitials: "RAC", founded: "2001" },
  { name: "Deerfield Management", type: "vc", headquarters: "New York, USA", country: "USA", region: "North America", revenue: "$15B AUM", products: 0, pipeline: 0, modalities: ["All Modalities"], focus: ["Healthcare Investment"], logoInitials: "DF", founded: "1994" },
  { name: "Sofinnova Partners", type: "vc", headquarters: "Paris, France", country: "France", region: "Europe", revenue: "$3B AUM", products: 0, pipeline: 0, modalities: ["Cell Therapy", "Gene Therapy"], focus: ["European Biotech", "CGT"], logoInitials: "SOFI", founded: "1972" },
];

const TYPE_COLORS: Record<string, string> = {
  pharma: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  biotech: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  technology: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  cro: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  healthcare: 'bg-red-500/20 text-red-300 border-red-500/40',
  research: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
  vc: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
  cdmo: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
};

const TYPE_GRADIENTS: Record<string, string> = {
  pharma: 'from-blue-500/30 to-blue-600/10',
  biotech: 'from-emerald-500/30 to-emerald-600/10',
  technology: 'from-purple-500/30 to-purple-600/10',
  cro: 'from-amber-500/30 to-amber-600/10',
  healthcare: 'from-red-500/30 to-red-600/10',
  research: 'from-cyan-500/30 to-cyan-600/10',
  vc: 'from-pink-500/30 to-pink-600/10',
  cdmo: 'from-orange-500/30 to-orange-600/10',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  pharma: Building2,
  biotech: Dna,
  technology: Microscope,
  cro: FlaskConical,
  healthcare: Activity,
  research: Beaker,
  vc: TrendingUp,
  cdmo: Factory,
};

const MODALITY_CONFIG = {
  'Cell Therapy': { icon: Dna, color: 'text-emerald-400', bg: 'bg-emerald-500/20', gradient: 'from-emerald-500 to-teal-500' },
  'Gene Therapy': { icon: Atom, color: 'text-purple-400', bg: 'bg-purple-500/20', gradient: 'from-purple-500 to-violet-500' },
  'Radioligand Therapy': { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/20', gradient: 'from-amber-500 to-orange-500' },
  'Personalized Medicine': { icon: HeartPulse, color: 'text-pink-400', bg: 'bg-pink-500/20', gradient: 'from-pink-500 to-rose-500' },
  'All Modalities': { icon: Sparkles, color: 'text-blue-400', bg: 'bg-blue-500/20', gradient: 'from-blue-500 to-cyan-500' },
};

const REGION_COLORS = {
  'North America': 'bg-blue-500',
  'Europe': 'bg-emerald-500',
  'Asia Pacific': 'bg-amber-500',
  'Middle East': 'bg-purple-500',
};

export const ManufacturerInfographic: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'landscape'>('landscape');
  
  const filteredManufacturers = COMPREHENSIVE_MANUFACTURERS.filter(m => {
    const typeMatch = selectedType === 'all' || m.type === selectedType;
    const modalityMatch = selectedModality === 'all' || m.modalities.includes(selectedModality);
    const regionMatch = selectedRegion === 'all' || m.region === selectedRegion;
    return typeMatch && modalityMatch && regionMatch;
  });
  
  const stats = {
    totalManufacturers: COMPREHENSIVE_MANUFACTURERS.length,
    totalProducts: COMPREHENSIVE_MANUFACTURERS.reduce((sum, m) => sum + m.products, 0),
    totalPipeline: COMPREHENSIVE_MANUFACTURERS.reduce((sum, m) => sum + m.pipeline, 0),
    byType: Object.fromEntries(
      ['pharma', 'biotech', 'technology', 'cro', 'research', 'vc', 'cdmo'].map(type => [
        type,
        COMPREHENSIVE_MANUFACTURERS.filter(m => m.type === type).length
      ])
    ),
    byModality: Object.fromEntries(
      ['Cell Therapy', 'Gene Therapy', 'Radioligand Therapy', 'Personalized Medicine'].map(mod => [
        mod,
        COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes(mod)).length
      ])
    ),
    byRegion: Object.fromEntries(
      ['North America', 'Europe', 'Asia Pacific'].map(region => [
        region,
        COMPREHENSIVE_MANUFACTURERS.filter(m => m.region === region).length
      ])
    ),
    commercialLeaders: COMPREHENSIVE_MANUFACTURERS.filter(m => m.products > 0).sort((a, b) => b.products - a.products).slice(0, 8),
    pipelineLeaders: COMPREHENSIVE_MANUFACTURERS.filter(m => m.pipeline > 0).sort((a, b) => b.pipeline - a.pipeline).slice(0, 8),
  };

  const renderCompanyLogo = (company: ManufacturerData, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-12 h-12 text-sm',
      lg: 'w-16 h-16 text-base',
    };
    
    return (
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${TYPE_GRADIENTS[company.type]} border border-white/10 flex items-center justify-center font-bold text-white shadow-lg`}>
        {company.logoInitials?.slice(0, 2) || company.name.slice(0, 2).toUpperCase()}
      </div>
    );
  };

  const renderModalityBadges = (modalities: string[]) => (
    <div className="flex flex-wrap gap-1">
      {modalities.slice(0, 3).map(mod => {
        const config = MODALITY_CONFIG[mod as keyof typeof MODALITY_CONFIG] || MODALITY_CONFIG['All Modalities'];
        const Icon = config.icon;
        return (
          <Badge key={mod} variant="outline" className={`${config.bg} ${config.color} border-transparent text-[10px] px-1.5 py-0`}>
            <Icon className="h-2.5 w-2.5 mr-0.5" />
            {mod.split(' ')[0]}
          </Badge>
        );
      })}
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-genie-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-genie-primary/20 text-genie-primary border-genie-primary/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Interactive Industry Map
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-genie-primary via-purple-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            CGAT Industry Landscape
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore {stats.totalManufacturers}+ organizations shaping the future of Cell & Gene Therapy across {stats.totalProducts}+ approved products and {stats.totalPipeline}+ pipeline programs
          </p>
        </motion.div>
        
        {/* Hero Stats with Visual Appeal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Organizations', value: stats.totalManufacturers, icon: Building2, color: 'genie-primary', suffix: '+' },
            { label: 'Approved Products', value: stats.totalProducts, icon: Award, color: 'emerald-400', suffix: '' },
            { label: 'Pipeline Programs', value: stats.totalPipeline, icon: FlaskConical, color: 'purple-400', suffix: '+' },
            { label: 'Countries', value: 25, icon: Globe, color: 'amber-400', suffix: '+' },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:border-genie-primary/30 transition-all group overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardContent className="p-5 text-center relative">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 text-${stat.color} group-hover:scale-110 transition-transform`} />
                  <div className="text-3xl font-bold text-foreground">{stat.value}{stat.suffix}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Interactive Filters */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm mb-8">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Filters:</span>
              </div>
              
              {/* Type Filter */}
              <div className="flex flex-wrap gap-1.5">
                <Badge 
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer transition-all hover:scale-105"
                  onClick={() => setSelectedType('all')}
                >
                  All Types
                </Badge>
                {Object.entries(stats.byType).map(([type, count]) => {
                  const Icon = TYPE_ICONS[type] || Building2;
                  return (
                    <Badge 
                      key={type}
                      variant={selectedType === type ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all hover:scale-105 ${selectedType !== type ? TYPE_COLORS[type] : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {type.charAt(0).toUpperCase() + type.slice(1)} ({count})
                    </Badge>
                  );
                })}
              </div>
            </div>
            
            {/* Modality Filter */}
            <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">Modality:</span>
              <div className="flex flex-wrap gap-1.5">
                <Badge 
                  variant={selectedModality === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedModality('all')}
                >
                  All Modalities
                </Badge>
                {Object.entries(MODALITY_CONFIG).slice(0, 4).map(([mod, config]) => {
                  const Icon = config.icon;
                  return (
                    <Badge 
                      key={mod}
                      variant={selectedModality === mod ? 'default' : 'outline'}
                      className={`cursor-pointer transition-all ${selectedModality !== mod ? `${config.bg} ${config.color} border-transparent` : ''}`}
                      onClick={() => setSelectedModality(mod)}
                    >
                      <Icon className="h-3 w-3 mr-1" />
                      {mod.split(' ')[0]}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">Region:</span>
              <div className="flex flex-wrap gap-1.5">
                <Badge 
                  variant={selectedRegion === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedRegion('all')}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  Global
                </Badge>
                {Object.entries(stats.byRegion).map(([region, count]) => (
                  <Badge 
                    key={region}
                    variant={selectedRegion === region ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedRegion(region)}
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {region} ({count})
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredManufacturers.length}</span> organizations
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={activeView === 'landscape' ? 'default' : 'outline'}
                  onClick={() => setActiveView('landscape')}
                >
                  Landscape
                </Button>
                <Button
                  size="sm"
                  variant={activeView === 'grid' ? 'default' : 'outline'}
                  onClick={() => setActiveView('grid')}
                >
                  Grid
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="leaders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1">
            <TabsTrigger value="leaders" className="data-[state=active]:bg-genie-primary/20">
              <Award className="h-4 w-4 mr-2" />
              Leaders
            </TabsTrigger>
            <TabsTrigger value="modalities" className="data-[state=active]:bg-genie-primary/20">
              <Dna className="h-4 w-4 mr-2" />
              Modalities
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="data-[state=active]:bg-genie-primary/20">
              <FlaskConical className="h-4 w-4 mr-2" />
              Pipeline
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-genie-primary/20">
              <Globe className="h-4 w-4 mr-2" />
              Geography
            </TabsTrigger>
            <TabsTrigger value="explore" className="data-[state=active]:bg-genie-primary/20">
              <Target className="h-4 w-4 mr-2" />
              Explore All
            </TabsTrigger>
          </TabsList>
          
          {/* Leaders Tab */}
          <TabsContent value="leaders">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Commercial Leaders */}
              <Card className="bg-card/50 border-emerald-500/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-emerald-400" />
                    Commercial Leaders
                  </CardTitle>
                  <CardDescription>Organizations with approved CGT products</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {stats.commercialLeaders.map((company, idx) => (
                      <motion.div
                        key={company.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-transparent border border-border/50 hover:border-emerald-500/30 transition-all cursor-pointer group"
                        onMouseEnter={() => setHoveredCompany(company.name)}
                        onMouseLeave={() => setHoveredCompany(null)}
                      >
                        <span className="text-2xl font-bold text-emerald-400/50 w-8">#{idx + 1}</span>
                        {renderCompanyLogo(company, 'md')}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{company.name}</span>
                            <Badge variant="outline" className={`${TYPE_COLORS[company.type]} text-[10px]`}>
                              {company.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">{company.headquarters}</div>
                          {renderModalityBadges(company.modalities)}
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-400">{company.products}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">products</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Revenue Leaders */}
              <Card className="bg-card/50 border-amber-500/20 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500/10 to-transparent">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-amber-400" />
                    Revenue Leaders
                  </CardTitle>
                  <CardDescription>Largest organizations by market cap/revenue</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
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
                      .slice(0, 8)
                      .map((company, idx) => (
                        <motion.div
                          key={company.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-transparent to-muted/50 border border-border/50 hover:border-amber-500/30 transition-all cursor-pointer"
                        >
                          <span className="text-2xl font-bold text-amber-400/50 w-8">#{idx + 1}</span>
                          {renderCompanyLogo(company, 'md')}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-foreground">{company.name}</span>
                              <Badge variant="outline" className={`${TYPE_COLORS[company.type]} text-[10px]`}>
                                {company.type}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">{company.country}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-amber-400">{company.revenue}</div>
                            <div className="text-[10px] text-muted-foreground">{company.employees} employees</div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Modalities Tab */}
          <TabsContent value="modalities">
            <div className="grid lg:grid-cols-4 gap-4 mb-6">
              {Object.entries(MODALITY_CONFIG).slice(0, 4).map(([modality, config], idx) => {
                const companies = COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes(modality));
                const Icon = config.icon;
                return (
                  <motion.div
                    key={modality}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className={`bg-gradient-to-br ${config.bg} border-transparent hover:scale-105 transition-transform cursor-pointer overflow-hidden relative`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-20`} />
                      <CardContent className="p-6 text-center relative">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-background/80 flex items-center justify-center`}>
                          <Icon className={`h-8 w-8 ${config.color}`} />
                        </div>
                        <h3 className="font-bold text-foreground mb-1">{modality}</h3>
                        <div className="text-3xl font-bold text-foreground mb-1">{companies.length}</div>
                        <div className="text-xs text-muted-foreground">Organizations</div>
                        <div className="text-sm text-muted-foreground mt-2">
                          {companies.filter(c => c.products > 0).length} with approved products
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Companies by Modality */}
            <div className="grid lg:grid-cols-2 gap-6">
              {Object.entries(MODALITY_CONFIG).slice(0, 4).map(([modality, config]) => {
                const companies = COMPREHENSIVE_MANUFACTURERS.filter(m => m.modalities.includes(modality)).slice(0, 6);
                const Icon = config.icon;
                return (
                  <Card key={modality} className="bg-card/50 border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Icon className={`h-4 w-4 ${config.color}`} />
                        {modality}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {companies.map(company => (
                          <div
                            key={company.name}
                            className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/50 hover:border-genie-primary/30 transition-all"
                          >
                            {renderCompanyLogo(company, 'sm')}
                            <div>
                              <div className="text-xs font-medium text-foreground">{company.name}</div>
                              <div className="text-[10px] text-muted-foreground">{company.products > 0 ? `${company.products} products` : `${company.pipeline} pipeline`}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          {/* Pipeline Tab */}
          <TabsContent value="pipeline">
            <Card className="bg-card/50 border-purple-500/20">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent">
                <CardTitle className="flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-purple-400" />
                  Pipeline Leaders
                </CardTitle>
                <CardDescription>Organizations with most active clinical programs</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.pipelineLeaders.map((company, idx) => (
                    <motion.div
                      key={company.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="relative"
                    >
                      <Card className="bg-muted/30 border-border/50 hover:border-purple-500/30 transition-all overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-500" style={{ width: `${Math.min(100, (company.pipeline / 200) * 100)}%` }} />
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            {renderCompanyLogo(company, 'md')}
                            <span className="text-3xl font-bold text-purple-400">{company.pipeline}</span>
                          </div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{company.name}</h4>
                          <div className="text-xs text-muted-foreground mb-2">{company.type}</div>
                          {renderModalityBadges(company.modalities)}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Geography Tab */}
          <TabsContent value="geography">
            <div className="grid lg:grid-cols-3 gap-6">
              {Object.entries(stats.byRegion).map(([region, count], idx) => {
                const regionCompanies = COMPREHENSIVE_MANUFACTURERS.filter(m => m.region === region);
                const countries = [...new Set(regionCompanies.map(c => c.country))];
                
                return (
                  <motion.div
                    key={region}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-card/50 border-border/50 h-full">
                      <CardHeader className={`bg-gradient-to-r ${region === 'North America' ? 'from-blue-500/10' : region === 'Europe' ? 'from-emerald-500/10' : 'from-amber-500/10'} to-transparent`}>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className={`h-5 w-5 ${region === 'North America' ? 'text-blue-400' : region === 'Europe' ? 'text-emerald-400' : 'text-amber-400'}`} />
                          {region}
                        </CardTitle>
                        <CardDescription>{count} organizations across {countries.length} countries</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        {/* Countries breakdown */}
                        <div className="space-y-2 mb-4">
                          {countries.slice(0, 5).map(country => {
                            const countryCount = regionCompanies.filter(c => c.country === country).length;
                            const percentage = Math.round((countryCount / count) * 100);
                            return (
                              <div key={country} className="flex items-center gap-2">
                                <span className="text-xs text-foreground w-24 truncate">{country}</span>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${region === 'North America' ? 'bg-blue-500' : region === 'Europe' ? 'bg-emerald-500' : 'bg-amber-500'} rounded-full`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground w-8">{countryCount}</span>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Top companies */}
                        <div className="pt-3 border-t border-border/50">
                          <div className="text-xs text-muted-foreground mb-2">Top Organizations:</div>
                          <div className="flex flex-wrap gap-1">
                            {regionCompanies.slice(0, 6).map(company => (
                              <div key={company.name} className="flex items-center gap-1 px-2 py-1 rounded bg-muted/30 text-xs">
                                {renderCompanyLogo(company, 'sm')}
                                <span className="text-foreground">{company.name.split(' ')[0]}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
          
          {/* Explore All Tab */}
          <TabsContent value="explore">
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <ScrollArea className="h-[600px]">
                  <AnimatePresence mode="wait">
                    {activeView === 'landscape' ? (
                      <motion.div
                        key="landscape"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        {filteredManufacturers.map((company, idx) => (
                          <motion.div
                            key={company.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.02 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent border border-border/50 hover:border-genie-primary/30 transition-all"
                          >
                            {renderCompanyLogo(company, 'md')}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-foreground">{company.name}</span>
                                <Badge variant="outline" className={`${TYPE_COLORS[company.type]} text-[10px]`}>
                                  {company.type}
                                </Badge>
                                {company.clinicalStage && (
                                  <Badge variant="secondary" className="text-[10px]">
                                    {company.clinicalStage}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {company.headquarters}
                                </span>
                                {company.founded && (
                                  <span>Est. {company.founded}</span>
                                )}
                              </div>
                              <div className="mt-2">{renderModalityBadges(company.modalities)}</div>
                            </div>
                            <div className="flex gap-6 text-center">
                              {company.products > 0 && (
                                <div>
                                  <div className="text-xl font-bold text-emerald-400">{company.products}</div>
                                  <div className="text-[10px] text-muted-foreground">Products</div>
                                </div>
                              )}
                              {company.pipeline > 0 && (
                                <div>
                                  <div className="text-xl font-bold text-purple-400">{company.pipeline}</div>
                                  <div className="text-[10px] text-muted-foreground">Pipeline</div>
                                </div>
                              )}
                              {company.revenue && company.revenue !== 'N/A' && (
                                <div>
                                  <div className="text-sm font-bold text-amber-400">{company.revenue}</div>
                                  <div className="text-[10px] text-muted-foreground">Revenue</div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                      >
                        {filteredManufacturers.map((company, idx) => (
                          <motion.div
                            key={company.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.02 }}
                          >
                            <Card className="bg-muted/30 border-border/50 hover:border-genie-primary/30 transition-all h-full">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3 mb-3">
                                  {renderCompanyLogo(company, 'md')}
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-foreground text-sm">{company.name}</div>
                                    <Badge variant="outline" className={`${TYPE_COLORS[company.type]} text-[10px] mt-1`}>
                                      {company.type}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground mb-2">{company.headquarters}</div>
                                <div className="flex gap-3 mb-2">
                                  {company.products > 0 && (
                                    <span className="text-xs text-emerald-400">{company.products} products</span>
                                  )}
                                  {company.pipeline > 0 && (
                                    <span className="text-xs text-purple-400">{company.pipeline} pipeline</span>
                                  )}
                                </div>
                                {renderModalityBadges(company.modalities)}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
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
