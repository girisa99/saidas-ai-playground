// Therapeutic Comparison Data - CGAT vs Traditional Therapeutics

export interface TherapeuticDifference {
  aspect: string;
  traditional: string;
  cgat: string;
  impact: string;
  reference?: string;
}

export interface MarketTrend {
  title: string;
  description: string;
  growth: string;
  icon: string;
  reference?: string;
  details?: string[];
}

export interface MarketChallenge {
  title: string;
  description: string;
  mitigation: string;
  impact?: string;
  stakeholders?: string[];
  reference?: string;
}

export interface TherapeuticExpansion {
  modality: string;
  currentAreas: string[];
  emergingAreas: string[];
  researchFocus: string[];
  majorManufacturers: string[];
  references?: { name: string; url: string }[];
  orderModel?: OrderModel;
}

export interface OrderModel {
  type: '1:1' | '1:many' | '1:selectmany';
  description: string;
  leadTime: string;
  characteristics: string[];
}

export interface HubServiceProvider {
  name: string;
  services: string[];
  role: string;
  modalities: string[];
  website?: string;
  improvements?: string[];
}

export interface DistributionModel {
  type: string;
  description: string;
  providers: string[];
  modalities: string[];
  characteristics: string[];
  orderTypes: string[];
  leadTimes: { [key: string]: string };
}

export interface EcosystemComponent {
  category: string;
  role: string;
  providers: { name: string; website: string }[];
  services: string[];
  journeyIntegration: string[];
}

export interface ReimbursementInfo {
  pricingModels?: {
    wac?: string;
    pap?: string;
    "340b"?: string;
    government?: string;
    commercial?: string;
  };
  patientAssistance?: {
    program: string;
    provider: string;
    coverage: string;
    eligibility: string;
    website?: string;
  }[];
  copayAssistance?: {
    program: string;
    maxBenefit: string;
    eligibility: string;
    website?: string;
  }[];
  alternativeFunding?: {
    source: string;
    description: string;
    contact?: string;
  }[];
  travelLogistics?: {
    type: string;
    coverage: string;
    provider?: string;
  }[];
  insuranceConsiderations?: string[];
}

export interface JourneyStage {
  id: string;
  name: string;
  phase: 'pre-infusion' | 'infusion' | 'post-infusion';
  duration: string;
  leadTime?: string;
  activities: string[];
  stakeholders: string[];
  criticalFactors: string[];
  icon: string;
  ecosystemConnections?: string[];
  hubServices?: string[];
  distributionRole?: string;
  reimbursement?: ReimbursementInfo;
}

export interface ProcessFlow {
  modality: string;
  orderModel: OrderModel;
  totalLeadTime: string;
  stages: JourneyStage[];
}

export const therapeuticDifferences: TherapeuticDifference[] = [
  {
    aspect: "Treatment Approach",
    traditional: "Symptom management, ongoing dosing, chronic treatment cycles",
    cgat: "Disease modification at cellular/genetic level, addressing root cause",
    impact: "Potential for one-time curative treatment vs lifetime medication",
    reference: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products"
  },
  {
    aspect: "Manufacturing Model",
    traditional: "Mass production, shelf-stable, inventory-based (1:many)",
    cgat: "Patient-specific, living products, made-to-order (1:1 or 1:selectmany)",
    impact: "Complex supply chain, vein-to-vein logistics, 3-4 week lead times",
    reference: "https://ispe.org/pharmaceutical-engineering/ispeak/cell-gene-therapy-manufacturing"
  },
  {
    aspect: "Supply Chain",
    traditional: "Wholesaler → Pharmacy → Patient (ambient storage)",
    cgat: "Manufacturer → Specialty → Hub → Treatment Center (cryogenic chain)",
    impact: "Specialized 3PL, cold chain logistics, chain of custody tracking",
    reference: "https://www.pharmaceuticalcommerce.com/view/the-cell-and-gene-therapy-supply-chain"
  },
  {
    aspect: "Order to Treatment",
    traditional: "Same-day to 1 week (stock-based)",
    cgat: "3-6 weeks minimum (made-to-order manufacturing)",
    impact: "Bridging therapy needs, patient coordination, slot scheduling",
    reference: "https://www.cellandgene.org/resources"
  },
  {
    aspect: "Administration",
    traditional: "Self-administered or outpatient, standard clinics",
    cgat: "Specialized certified centers, intensive monitoring, ICU access",
    impact: "FACT-certified centers, REMS programs, geographic access challenges",
    reference: "https://www.factwebsite.org/"
  },
  {
    aspect: "Cost Structure",
    traditional: "Ongoing medication costs ($10K-$100K/year)",
    cgat: "High upfront ($300K-$3.5M), potential lifetime benefit",
    impact: "WAC, 340B, PAP programs, outcomes-based and annuity contracts",
    reference: "https://www.drugchannels.net/2024/02/cell-and-gene-therapy-pricing.html"
  },
  {
    aspect: "Hub Services Role",
    traditional: "Limited patient support programs",
    cgat: "Comprehensive hub services: PA, benefits verification, logistics coordination",
    impact: "Dedicated hub programs essential for patient access and adherence",
    reference: "https://www.drugchannels.net/2023/05/specialty-pharmacy-hub-services.html"
  },
  {
    aspect: "Distribution Channel",
    traditional: "Standard pharmacy distribution, PBM-managed",
    cgat: "Specialty pharmacy, 3PL cold chain, direct manufacturer coordination",
    impact: "Limited distribution networks, exclusive specialty pharmacy relationships",
    reference: "https://www.mckesson.com/Biopharma/Specialty-Networks/"
  },
  {
    aspect: "Safety Profile",
    traditional: "Well-characterized, predictable side effects",
    cgat: "Novel risks (CRS, ICANS, insertional mutagenesis)",
    impact: "REMS programs, tocilizumab access, specialized training requirements",
    reference: "https://www.fda.gov/drugs/drug-safety-and-availability/risk-evaluation-and-mitigation-strategies-rems"
  },
  {
    aspect: "Patient Selection",
    traditional: "Broad eligibility criteria",
    cgat: "Specific biomarkers, disease staging, organ function requirements",
    impact: "Precision medicine approach, companion diagnostics required",
    reference: "https://www.nature.com/articles/s41573-023-00772-9"
  },
  {
    aspect: "Durability",
    traditional: "Treatment-dependent response, stops when medication stops",
    cgat: "Potential for durable/permanent response from single treatment",
    impact: "Long-term follow-up requirements (15 years), registry participation",
    reference: "https://clinicaltrials.gov/"
  },
  {
    aspect: "Healthcare Infrastructure",
    traditional: "Standard pharmacy distribution, any hospital",
    cgat: "Specialized cell processing facilities, certified treatment centers",
    impact: "Network of FACT-certified centers, limited geographic access",
    reference: "https://www.factwebsite.org/Standards/"
  }
];

export const marketTrends: MarketTrend[] = [
  {
    title: "Expanding Indications",
    description: "Moving from hematologic cancers to solid tumors, autoimmune diseases, and genetic disorders",
    growth: "CAGR 35%+",
    icon: "TrendingUp",
    reference: "https://www.grandviewresearch.com/industry-analysis/cell-gene-therapy-market",
    details: [
      "CAR-T expanding to solid tumors (lung, breast, ovarian)",
      "Gene therapy for cardiovascular and metabolic diseases",
      "Cell therapy for autoimmune conditions (lupus, MS)",
      "Neurological applications (Parkinson's, ALS)"
    ]
  },
  {
    title: "Off-the-Shelf Products",
    description: "Allogeneic therapies reducing manufacturing time from weeks to days",
    growth: "60+ active trials",
    icon: "Package",
    reference: "https://www.evaluate.com/vantage/articles/news/snippets/allogeneic-car-t-therapies",
    details: [
      "Allogeneic CAR-T from healthy donor cells",
      "iPSC-derived cell therapies",
      "Reduced costs and faster availability",
      "Eliminates patient-specific manufacturing"
    ]
  },
  {
    title: "In-Vivo Gene Editing",
    description: "Direct gene editing without cell extraction using CRISPR/Cas9",
    growth: "New paradigm",
    icon: "Dna",
    reference: "https://www.nature.com/articles/s41573-022-00610-w",
    details: [
      "Single administration potential",
      "Liver-directed therapies leading",
      "CNS applications emerging",
      "Reduced manufacturing complexity"
    ]
  },
  {
    title: "Global Manufacturing Expansion",
    description: "Manufacturing facilities expanding beyond US/EU to Asia-Pacific",
    growth: "Asia-Pacific 40%+ growth",
    icon: "Globe",
    reference: "https://www.mckinsey.com/industries/life-sciences/our-insights/the-global-cell-and-gene-therapy-industry",
    details: [
      "China, Japan, South Korea expanding capacity",
      "Decentralized manufacturing models",
      "Regional specialty pharmacy networks",
      "Regulatory harmonization efforts"
    ]
  },
  {
    title: "Outcomes-Based Pricing",
    description: "Pay-for-performance, annuity models, and milestone-based payments",
    growth: "Industry standard",
    icon: "DollarSign",
    reference: "https://www.healthaffairs.org/doi/10.1377/hlthaff.2022.00469",
    details: [
      "Pay only if therapy works",
      "Annuity payments over 5 years",
      "Milestone-based reimbursement",
      "Re-treatment guarantees"
    ]
  },
  {
    title: "AI & Automation Integration",
    description: "AI-driven target identification, manufacturing optimization, and supply chain management",
    growth: "Accelerating",
    icon: "Brain",
    reference: "https://www.nature.com/articles/s41587-023-01664-0",
    details: [
      "Predictive manufacturing QC",
      "AI-optimized patient matching",
      "Supply chain orchestration",
      "Real-time logistics tracking"
    ]
  },
  {
    title: "Hub Services Evolution",
    description: "Comprehensive patient support from diagnosis through long-term follow-up",
    growth: "Essential infrastructure",
    icon: "Building2",
    reference: "https://www.drugchannels.net/2023/05/specialty-pharmacy-hub-services.html",
    details: [
      "End-to-end case management",
      "Financial navigation and PAP enrollment",
      "Logistics coordination with treatment centers",
      "Caregiver support and education"
    ]
  }
];

export const marketChallenges: MarketChallenge[] = [
  {
    title: "Manufacturing Complexity",
    description: "Patient-specific production with strict GMP requirements, low batch sizes, and living product constraints",
    mitigation: "Automation, standardization, allogeneic approaches, point-of-care manufacturing",
    impact: "3-4 week manufacturing times, 5-10% failure rates",
    stakeholders: ["CMOs", "Manufacturers", "Quality Teams"],
    reference: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7920970/"
  },
  {
    title: "High Treatment Costs",
    description: "Treatment costs ranging from $300K to $3.5M+ per patient",
    mitigation: "Value-based contracts, outcomes-based pricing, 340B program, PAP programs",
    impact: "Budget impact concerns, access limitations",
    stakeholders: ["Payers", "Health Systems", "PBMs", "Patients"],
    reference: "https://www.healthaffairs.org/doi/10.1377/hlthaff.2022.00469"
  },
  {
    title: "Access & Equity",
    description: "Treatment limited to specialized centers, creating geographic and socioeconomic barriers",
    mitigation: "Network expansion, telehealth integration, mobile apheresis, decentralized models",
    impact: "Only ~150 FACT-certified centers in US",
    stakeholders: ["Treatment Centers", "Regulators", "Patient Advocacy"],
    reference: "https://www.factwebsite.org/Search/Centers/"
  },
  {
    title: "Reimbursement Uncertainty",
    description: "Payer uncertainty about long-term value, budget impact concerns, coding challenges",
    mitigation: "Real-world evidence, registry data, CMS coverage decisions, outcomes guarantees",
    impact: "Payment delays, prior authorization barriers",
    stakeholders: ["CMS", "Commercial Payers", "Health Systems"],
    reference: "https://www.cms.gov/medicare/coverage/coverage-with-evidence-development"
  },
  {
    title: "Cold Chain Logistics",
    description: "Cryogenic storage and transport requirements (-196°C), time-sensitive delivery",
    mitigation: "Specialized 3PL networks, real-time monitoring, redundant systems",
    impact: "Vein-to-vein time constraints, storage facility requirements",
    stakeholders: ["3PL Providers", "Treatment Centers", "Manufacturers"],
    reference: "https://www.pharmaceutical-technology.com/features/cold-chain-logistics-cell-gene-therapy/"
  },
  {
    title: "Long-term Safety",
    description: "Unknown durability, late effects, insertional mutagenesis concerns",
    mitigation: "15-year follow-up studies, mandatory registries, secondary malignancy screening",
    impact: "Regulatory requirements, patient monitoring burden",
    stakeholders: ["FDA", "EMA", "Academic Centers", "Registries"],
    reference: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/long-term-follow-recommendations"
  },
  {
    title: "Workforce Training",
    description: "Specialized skills required for administration, toxicity management, and patient care",
    mitigation: "REMS certification programs, center of excellence model, fellowship training",
    impact: "Limited provider capacity, training time requirements",
    stakeholders: ["Medical Education", "Treatment Centers", "Manufacturers"],
    reference: "https://www.astct.org/education"
  },
  {
    title: "Supply Chain Coordination",
    description: "Complex multi-stakeholder coordination between manufacturers, 3PL, hubs, and treatment centers",
    mitigation: "Integrated hub services, digital platforms, predictive scheduling",
    impact: "Slot scheduling conflicts, patient timing challenges",
    stakeholders: ["Hub Services", "3PL", "Treatment Centers", "Manufacturers"],
    reference: "https://www.mckesson.com/Biopharma/Cell-and-Gene-Therapy/"
  }
];

export const therapeuticExpansions: TherapeuticExpansion[] = [
  {
    modality: "Cell & Gene Therapy",
    currentAreas: ["B-cell lymphomas", "Multiple myeloma", "ALL", "Hemophilia A/B", "SMA", "Beta-thalassemia"],
    emergingAreas: ["Solid tumors", "Heart failure", "Type 1 diabetes", "Parkinson's", "Alzheimer's", "Autoimmune diseases"],
    researchFocus: ["NK cell therapies", "TCR therapies", "Gene editing (CRISPR)", "iPSC-derived cells", "In-vivo delivery"],
    majorManufacturers: ["Novartis", "Bristol-Myers Squibb", "Gilead/Kite", "Vertex", "Legend/J&J"],
    references: [
      { name: "FDA Approved CGT Products", url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products" },
      { name: "Alliance for Regenerative Medicine", url: "https://alliancerm.org/" },
      { name: "ASGCT", url: "https://www.asgct.org/" }
    ],
    orderModel: {
      type: '1:1',
      description: "Autologous: Patient's own cells collected, manufactured, and returned",
      leadTime: "3-6 weeks from apheresis to infusion",
      characteristics: ["Patient-specific product", "Vein-to-vein logistics", "Single-use manufacturing"]
    }
  },
  {
    modality: "Advanced Therapies",
    currentAreas: ["Rare diseases", "Inherited retinal dystrophy", "DMD", "Thalassemia", "Sickle cell disease"],
    emergingAreas: ["Cystic fibrosis", "Huntington's", "ALS", "Aging-related conditions", "Lysosomal storage"],
    researchFocus: ["AAV optimization", "Non-viral delivery", "Base editing", "Prime editing", "LNP delivery"],
    majorManufacturers: ["Spark Therapeutics", "BioMarin", "Sarepta", "Ultragenyx", "Bluebird Bio"],
    references: [
      { name: "BioMarin Gene Therapy", url: "https://www.biomarin.com/our-treatments/gene-therapy/" },
      { name: "Sarepta Pipeline", url: "https://www.sarepta.com/pipeline" },
      { name: "ASGCT Gene Therapy 101", url: "https://www.asgct.org/gene-therapy-101" }
    ],
    orderModel: {
      type: '1:selectmany',
      description: "Gene therapy with patient-specific dosing based on weight/genotype",
      leadTime: "2-4 weeks for product preparation and patient workup",
      characteristics: ["Batch manufacturing possible", "Patient-specific dosing", "AAV antibody screening required"]
    }
  },
  {
    modality: "Personalized Medicine",
    currentAreas: ["Oncology (tumor-specific)", "Pharmacogenomics", "Companion diagnostics", "Targeted therapies"],
    emergingAreas: ["Microbiome-based", "Digital biomarkers", "Predictive prevention", "Neoantigen vaccines"],
    researchFocus: ["Multi-omics integration", "AI-driven treatment selection", "Liquid biopsy", "ctDNA monitoring"],
    majorManufacturers: ["Foundation Medicine", "Guardant Health", "Exact Sciences", "Tempus", "Illumina"],
    references: [
      { name: "Foundation Medicine", url: "https://www.foundationmedicine.com/" },
      { name: "Guardant Health", url: "https://guardanthealth.com/" },
      { name: "Tempus AI", url: "https://www.tempus.com/" }
    ],
    orderModel: {
      type: '1:many',
      description: "Diagnostic-driven treatment selection from approved therapies",
      leadTime: "1-3 weeks for genomic testing and treatment matching",
      characteristics: ["Diagnostic dependent", "Standard drug manufacturing", "Personalized selection"]
    }
  },
  {
    modality: "Radioligand Therapy",
    currentAreas: ["Neuroendocrine tumors", "Prostate cancer (mCRPC)", "Thyroid cancer", "Lymphoma"],
    emergingAreas: ["Breast cancer", "Colorectal cancer", "Brain tumors", "Pediatric cancers", "Pancreatic"],
    researchFocus: ["Novel targets (FAP, HER2, PSMA)", "Alpha emitters (Actinium-225)", "Theranostic pairs", "Combination therapies"],
    majorManufacturers: ["Novartis (Pluvicto, Lutathera)", "Bayer", "Lantheus", "RayzeBio", "ITM Isotope Technologies"],
    references: [
      { name: "Novartis RLT", url: "https://www.novartis.com/research-development/technology-platforms/radioligand-therapy" },
      { name: "Society of Nuclear Medicine", url: "https://www.snmmi.org/" },
      { name: "Theranostics Journal", url: "https://www.thno.org/" }
    ],
    orderModel: {
      type: '1:selectmany',
      description: "Patient-specific dosimetry with manufactured radiopharmaceuticals",
      leadTime: "1-2 weeks for slot scheduling and isotope production",
      characteristics: ["Radioactive decay constraints", "Nuclear pharmacy distribution", "Repeat dosing (4-6 cycles)"]
    }
  }
];

export const hubServiceProviders: HubServiceProvider[] = [
  {
    name: "Patient Hub Services",
    services: [
      "Benefits investigation & prior authorization",
      "Patient financial assistance enrollment",
      "Copay assistance and foundation support",
      "Insurance appeals management",
      "Patient education and counseling"
    ],
    role: "Central coordination point for patient access and financial navigation",
    modalities: ["Cell & Gene Therapy", "Advanced Therapies", "Personalized Medicine", "Radioligand Therapy"],
    website: "https://www.drugchannels.net/2023/05/specialty-pharmacy-hub-services.html",
    improvements: [
      "Digital intake and consent platforms",
      "Real-time eligibility verification",
      "AI-powered prior authorization",
      "Integrated caregiver support apps"
    ]
  },
  {
    name: "3PL/Specialty Distribution",
    services: [
      "Cryogenic storage and transport (-196°C)",
      "Chain of custody tracking",
      "Temperature monitoring and excursion alerts",
      "Just-in-time delivery to treatment centers",
      "Returns and disposal management"
    ],
    role: "Specialized logistics ensuring product integrity from manufacturer to patient",
    modalities: ["Cell & Gene Therapy", "Advanced Therapies"],
    website: "https://www.mckesson.com/Biopharma/Cell-and-Gene-Therapy/",
    improvements: [
      "Real-time GPS and temperature monitoring",
      "Predictive routing algorithms",
      "Blockchain chain of custody",
      "Automated scheduling integration"
    ]
  },
  {
    name: "Specialty Pharmacy",
    services: [
      "High-touch patient management",
      "Refill coordination and adherence support",
      "Adverse event monitoring and reporting",
      "REMS compliance administration",
      "Outcomes data collection"
    ],
    role: "Dispensing and patient support for complex specialty medications",
    modalities: ["Personalized Medicine", "Radioligand Therapy", "Oral oncolytics"],
    website: "https://www.nacds.org/topics/specialty-pharmacy/",
    improvements: [
      "Integrated EHR connectivity",
      "Predictive adherence analytics",
      "Telehealth-enabled consultations",
      "Automated REMS documentation"
    ]
  },
  {
    name: "Treatment Center Coordination",
    services: [
      "Slot scheduling and capacity management",
      "Apheresis coordination",
      "Product receipt and chain of custody",
      "Clinical team readiness verification",
      "Post-infusion monitoring protocols"
    ],
    role: "Healthcare facility operations ensuring safe and effective treatment delivery",
    modalities: ["Cell & Gene Therapy", "Advanced Therapies", "Radioligand Therapy"],
    website: "https://www.factwebsite.org/",
    improvements: [
      "Centralized scheduling platforms",
      "Predictive capacity modeling",
      "Integrated safety monitoring systems",
      "Real-time inventory visibility"
    ]
  },
  {
    name: "Nuclear Pharmacy",
    services: [
      "Radiopharmaceutical compounding",
      "Patient-specific dosimetry",
      "Isotope procurement and inventory",
      "Regulatory compliance (NRC, state)",
      "Waste management and disposal"
    ],
    role: "Specialized pharmacy services for radioactive therapeutic agents",
    modalities: ["Radioligand Therapy"],
    website: "https://www.snmmi.org/AboutSNMMI/Content.aspx?ItemNumber=6433",
    improvements: [
      "Just-in-time isotope production",
      "Extended isotope half-life formulations",
      "Automated dose calibration",
      "Digital compliance tracking"
    ]
  }
];

export const distributionModels: DistributionModel[] = [
  {
    type: "Made-to-Order (1:1)",
    description: "Patient's own cells collected, manufactured individually, and returned for infusion",
    providers: ["Cryoport", "World Courier", "Marken", "FedEx Custom Critical"],
    modalities: ["Autologous CAR-T", "Autologous Gene Therapy"],
    characteristics: [
      "Patient-specific chain of custody",
      "Vein-to-vein logistics coordination",
      "Cryogenic transport (-196°C LN2)",
      "Single-use manufacturing",
      "3-6 week turnaround"
    ],
    orderTypes: ["Apheresis scheduling", "Manufacturing slot", "Infusion slot"],
    leadTimes: {
      "Apheresis to Ship": "1-2 days",
      "Manufacturing": "17-28 days",
      "QC Release": "5-7 days",
      "Ship to Treatment Center": "1-2 days",
      "Total Vein-to-Vein": "4-6 weeks"
    }
  },
  {
    type: "Made-to-Stock Customized (1:SelectMany)",
    description: "Manufactured product inventory with patient-specific dosing or selection criteria",
    providers: ["McKesson Specialty", "Cardinal Health SP", "AmerisourceBergen/Cencora"],
    modalities: ["Allogeneic Cell Therapy", "Gene Therapy (AAV)", "Radioligand Therapy"],
    characteristics: [
      "Batch manufacturing to inventory",
      "Patient-specific dosing based on weight/genotype",
      "Requires pre-screening (AAV antibodies, biomarkers)",
      "Shorter lead times than 1:1",
      "Cold chain distribution"
    ],
    orderTypes: ["Patient screening", "Dose calculation", "Treatment scheduling"],
    leadTimes: {
      "Patient Screening": "1-2 weeks",
      "Dose Preparation": "3-5 days",
      "Ship to Treatment Center": "1-2 days",
      "Total": "2-4 weeks"
    }
  },
  {
    type: "Standard Distribution (1:Many)",
    description: "Traditional pharmaceutical distribution with standard dosing for all patients",
    providers: ["McKesson", "Cardinal Health", "AmerisourceBergen", "Specialty Pharmacies"],
    modalities: ["Companion Diagnostics", "Oral Targeted Therapies", "Small Molecule CGT Support"],
    characteristics: [
      "Mass manufacturing",
      "Standard inventory management",
      "Broad distribution network",
      "Room temperature or refrigerated storage",
      "Same-day to 1-week availability"
    ],
    orderTypes: ["Standard prescription", "Specialty pharmacy order"],
    leadTimes: {
      "Order to Ship": "Same day - 3 days",
      "Ship to Pharmacy/Patient": "1-3 days",
      "Total": "1-7 days"
    }
  }
];

export const ecosystemComponents: EcosystemComponent[] = [
  {
    category: "Manufacturers & CMOs",
    role: "Develop, manufacture, and release cell and gene therapy products",
    providers: [
      { name: "Novartis Gene Therapies", website: "https://www.novartis.com/research-development/technology-platforms/gene-therapy" },
      { name: "Bristol-Myers Squibb", website: "https://www.bms.com/researchers-and-partners/cell-therapy.html" },
      { name: "Gilead/Kite Pharma", website: "https://www.kitepharma.com/" },
      { name: "Lonza", website: "https://www.lonza.com/cell-and-gene" },
      { name: "Catalent", website: "https://www.catalent.com/cell-gene-therapy/" }
    ],
    services: ["Product development", "GMP manufacturing", "Quality control & release", "Regulatory submissions"],
    journeyIntegration: ["Manufacturing", "Quality release", "Product shipment"]
  },
  {
    category: "Hub Service Providers",
    role: "Patient access, financial navigation, and care coordination",
    providers: [
      { name: "Eversana", website: "https://www.eversana.com/" },
      { name: "Lash Group (AmerisourceBergen)", website: "https://www.lashgroup.com/" },
      { name: "McKesson Patient Support", website: "https://www.mckesson.com/Biopharma/Patient-Access-Solutions/" },
      { name: "IQVIA Patient Services", website: "https://www.iqvia.com/solutions/commercialization/patient-engagement" }
    ],
    services: ["Benefits verification", "Prior authorization", "Financial assistance", "Caregiver support", "Care coordination"],
    journeyIntegration: ["Patient identification", "Insurance authorization", "Treatment coordination", "Follow-up support"]
  },
  {
    category: "3PL & Cold Chain Logistics",
    role: "Specialized transportation and storage maintaining product integrity",
    providers: [
      { name: "Cryoport", website: "https://www.cryoport.com/" },
      { name: "World Courier", website: "https://www.worldcourier.com/" },
      { name: "Marken", website: "https://www.marken.com/" },
      { name: "FedEx Custom Critical", website: "https://www.fedex.com/en-us/custom-critical.html" }
    ],
    services: ["Cryogenic transport", "Temperature monitoring", "Chain of custody", "Last-mile delivery"],
    journeyIntegration: ["Apheresis shipment", "Product delivery", "Temperature monitoring throughout"]
  },
  {
    category: "Specialty Pharmacies",
    role: "Dispensing, patient education, and adherence support for complex therapies",
    providers: [
      { name: "CVS Specialty", website: "https://www.cvsspecialty.com/" },
      { name: "Optum Specialty Pharmacy", website: "https://www.optumrx.com/content/specialty-pharmacy" },
      { name: "Accredo", website: "https://www.accredo.com/" },
      { name: "AllianceRx Walgreens", website: "https://www.alliancerxwp.com/" }
    ],
    services: ["REMS compliance", "Patient counseling", "Adverse event monitoring", "Outcomes reporting"],
    journeyIntegration: ["Supportive medications", "REMS enrollment", "Post-treatment support"]
  },
  {
    category: "Treatment Centers",
    role: "Certified facilities providing safe and effective treatment administration",
    providers: [
      { name: "MD Anderson", website: "https://www.mdanderson.org/" },
      { name: "Memorial Sloan Kettering", website: "https://www.mskcc.org/" },
      { name: "Fred Hutchinson Cancer Center", website: "https://www.fredhutch.org/" },
      { name: "City of Hope", website: "https://www.cityofhope.org/" }
    ],
    services: ["Patient evaluation", "Apheresis collection", "Treatment administration", "Toxicity management", "Long-term follow-up"],
    journeyIntegration: ["Patient workup", "Apheresis", "Conditioning", "Infusion", "Monitoring", "Follow-up"]
  },
  {
    category: "Payers & PBMs",
    role: "Reimbursement, coverage decisions, and outcomes-based contracting",
    providers: [
      { name: "CMS (Medicare)", website: "https://www.cms.gov/" },
      { name: "United Healthcare", website: "https://www.uhc.com/" },
      { name: "CVS Caremark", website: "https://www.cvshealth.com/services/pharmacy-benefit-management" },
      { name: "Express Scripts", website: "https://www.express-scripts.com/" }
    ],
    services: ["Coverage determinations", "Prior authorization", "Outcomes-based contracts", "Payment processing"],
    journeyIntegration: ["Pre-authorization", "Payment", "Outcomes tracking"]
  }
];

export const industryShiftReasons = [
  {
    reason: "Curative Potential",
    description: "Unlike traditional treatments that manage symptoms, CGAT offers the potential to cure diseases at their genetic or cellular source",
    evidence: "90%+ complete remission rates in certain hematologic cancers, functional cures for inherited diseases",
    reference: "https://www.nejm.org/doi/full/10.1056/NEJMoa2116425",
    details: [
      "Single treatment vs. lifetime medication",
      "Addresses root cause rather than symptoms",
      "Potential elimination of disease",
      "Quality of life transformation"
    ]
  },
  {
    reason: "Precision Medicine Evolution",
    description: "Advances in genomics, gene editing, and cell engineering enable targeting specific disease mechanisms with unprecedented precision",
    evidence: "CRISPR gene editing approved (Casgevy, 2023), targeted CAR constructs for specific antigens",
    reference: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapies-treat-patients-sickle-cell-disease",
    details: [
      "Patient-specific treatments",
      "Targeted genetic corrections",
      "Biomarker-driven patient selection",
      "Reduced off-target effects"
    ]
  },
  {
    reason: "Unmet Medical Needs",
    description: "Many diseases have no effective treatments available, creating massive unmet need that CGAT can address",
    evidence: "7,000+ rare diseases, most without approved treatment; 600,000+ US patients with relapsed/refractory cancers annually",
    reference: "https://rarediseases.org/rare-diseases-faq/",
    details: [
      "Rare disease treatment gaps",
      "Refractory cancer populations",
      "Pediatric genetic conditions",
      "Inherited blood disorders"
    ]
  },
  {
    reason: "Regulatory & Policy Support",
    description: "FDA breakthrough designations, accelerated approvals, and supportive policies enable faster development",
    evidence: "50+ CGT approvals since 2017; RMAT (Regenerative Medicine Advanced Therapy) designation pathway",
    reference: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/regenerative-medicine-advanced-therapy-designation",
    details: [
      "Accelerated approval pathways",
      "Priority review designations",
      "Breakthrough therapy status",
      "Surrogate endpoint acceptance"
    ]
  },
  {
    reason: "Investment Influx",
    description: "Massive private and public investment accelerating R&D, manufacturing capacity, and commercialization",
    evidence: "$20B+ annual investment in cell and gene therapy; 1,500+ CGT clinical trials active globally",
    reference: "https://alliancerm.org/sector-report/",
    details: [
      "Venture capital growth",
      "Pharma M&A activity",
      "Government R&D funding",
      "Manufacturing capacity expansion"
    ]
  },
  {
    reason: "Technology Convergence",
    description: "AI, manufacturing automation, delivery technologies, and supply chain innovations maturing simultaneously",
    evidence: "10x efficiency improvements in manufacturing; AI-optimized target identification reducing timelines",
    reference: "https://www.nature.com/articles/s41587-023-01664-0",
    details: [
      "AI/ML for drug discovery",
      "Automated manufacturing",
      "Advanced delivery vectors",
      "Digital supply chain"
    ]
  },
  {
    reason: "Hub Services Ecosystem Maturation",
    description: "Comprehensive patient support infrastructure enabling access and coordination for complex therapies",
    evidence: "Dedicated CGT hub programs at all major manufacturers; integrated digital platforms for patient journey",
    reference: "https://www.drugchannels.net/2023/05/specialty-pharmacy-hub-services.html",
    details: [
      "End-to-end case management",
      "Financial navigation expertise",
      "Treatment center coordination",
      "Long-term follow-up programs"
    ]
  }
];

export const patientJourneyStages: ProcessFlow[] = [
  {
    modality: "CAR-T Cell Therapy",
    orderModel: {
      type: '1:1',
      description: "Autologous: Patient's own T-cells collected and manufactured into personalized CAR-T product",
      leadTime: "4-6 weeks vein-to-vein",
      characteristics: ["Patient-specific manufacturing", "Cryogenic logistics", "Single-use batches", "FACT-certified centers only"]
    },
    totalLeadTime: "6-10 weeks from referral to infusion",
    stages: [
      {
        id: "cart-1",
        name: "Patient Identification & Referral",
        phase: "pre-infusion",
        duration: "1-2 weeks",
        leadTime: "Day 0-14",
        activities: [
          "Diagnosis confirmation and disease staging",
          "Biomarker testing (CD19, BCMA, CD22)",
          "Prior treatment history review",
          "ECOG performance status assessment",
          "Referral to FACT-certified treatment center",
          "Insurance notification and pre-authorization initiation"
        ],
        stakeholders: ["Oncologist", "Pathologist", "Case Manager", "Hub Services", "Insurance"],
        criticalFactors: ["Disease staging", "Biomarker eligibility", "Performance status", "Insurance coverage"],
        icon: "Search",
        ecosystemConnections: ["Hub Services", "Treatment Centers"],
        hubServices: ["Benefits verification", "Prior authorization initiation", "Treatment center matching"],
        distributionRole: "None - patient identification phase"
      },
      {
        id: "cart-2",
        name: "Evaluation & Workup",
        phase: "pre-infusion",
        duration: "1-2 weeks",
        leadTime: "Day 14-28",
        activities: [
          "Comprehensive health assessment at treatment center",
          "Cardiac evaluation (ECHO, ECG)",
          "Pulmonary function tests",
          "Infectious disease screening (HIV, HBV, HCV)",
          "CNS assessment if indicated",
          "Baseline labs and organ function",
          "Patient/caregiver education and informed consent",
          "Financial counseling and copay assistance"
        ],
        stakeholders: ["CAR-T Team", "Cardiologist", "Infectious Disease", "Social Worker", "Financial Counselor"],
        criticalFactors: ["Organ function adequacy", "Infection clearance", "Caregiver availability", "Financial clearance"],
        icon: "Stethoscope",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Specialty Pharmacy"],
        hubServices: ["Financial assistance enrollment", "Copay program setup", "Caregiver support resources"],
        distributionRole: "Specialty pharmacy may provide supportive medications"
      },
      {
        id: "cart-3",
        name: "Leukapheresis Collection",
        phase: "pre-infusion",
        duration: "1 day procedure",
        leadTime: "Day 28-35 (apheresis date = Day 0 of manufacturing)",
        activities: [
          "Central venous access placement if needed",
          "Peripheral blood mononuclear cell collection (10-15L blood processed)",
          "T-cell isolation and viability verification",
          "Sample quality verification (cell count, viability >70%)",
          "Chain of identity/custody documentation",
          "Cryopreservation of apheresis product",
          "Shipment coordination with manufacturer"
        ],
        stakeholders: ["Apheresis Team", "Lab Technicians", "Logistics Coordinator", "3PL Provider"],
        criticalFactors: ["Cell viability and yield", "Collection timing", "Cold chain integrity", "Documentation accuracy"],
        icon: "Droplets",
        ecosystemConnections: ["Treatment Centers", "3PL Logistics", "Manufacturer"],
        hubServices: ["Apheresis scheduling coordination", "Logistics tracking"],
        distributionRole: "3PL: Cryogenic shipment to manufacturing facility (1-2 days)"
      },
      {
        id: "cart-4",
        name: "Manufacturing & QC",
        phase: "pre-infusion",
        duration: "17-28 days",
        leadTime: "Manufacturing Day 1-28 (from apheresis receipt)",
        activities: [
          "Apheresis product receipt and verification",
          "T-cell activation and expansion",
          "Viral vector transduction (CAR gene insertion)",
          "Cell expansion to therapeutic dose (typically 10^6-10^8 cells)",
          "Quality control testing (sterility, potency, identity)",
          "Product cryopreservation",
          "Batch record review and release",
          "COA (Certificate of Analysis) generation"
        ],
        stakeholders: ["Manufacturing Team", "QA/QC", "Regulatory", "Supply Chain"],
        criticalFactors: ["Manufacturing success rate (90-95%)", "Product quality specifications", "Timeline adherence"],
        icon: "Factory",
        ecosystemConnections: ["Manufacturer", "Treatment Centers"],
        hubServices: ["Manufacturing status updates", "Treatment center coordination"],
        distributionRole: "Manufacturer holds product until slot confirmation"
      },
      {
        id: "cart-5",
        name: "Bridging Therapy",
        phase: "pre-infusion",
        duration: "Variable (concurrent with manufacturing)",
        leadTime: "During manufacturing period",
        activities: [
          "Disease control chemotherapy if needed",
          "Tumor debulking consideration",
          "Weekly disease monitoring",
          "Performance status maintenance",
          "Infection prevention",
          "Slot scheduling confirmation",
          "Caregiver preparation"
        ],
        stakeholders: ["Oncologist", "Pharmacist", "Nursing", "Social Worker"],
        criticalFactors: ["Disease progression risk", "Patient stability maintenance", "Treatment slot timing"],
        icon: "Activity",
        ecosystemConnections: ["Treatment Centers", "Specialty Pharmacy"],
        hubServices: ["Ongoing care coordination", "Treatment scheduling"],
        distributionRole: "Specialty pharmacy for bridging chemotherapy"
      },
      {
        id: "cart-6",
        name: "Lymphodepletion Conditioning",
        phase: "pre-infusion",
        duration: "3-5 days",
        leadTime: "Day -5 to Day -2 (relative to infusion Day 0)",
        activities: [
          "Admit to treatment center",
          "Fludarabine + Cyclophosphamide chemotherapy",
          "Aggressive hydration protocol",
          "Tumor lysis syndrome prophylaxis",
          "Infection prophylaxis (antiviral, antifungal)",
          "Daily lab monitoring",
          "Product shipment confirmation",
          "REMS enrollment completion"
        ],
        stakeholders: ["Oncologist", "Pharmacist", "Nursing", "Lab", "Hub Services"],
        criticalFactors: ["Timing coordination with product delivery", "Toxicity management", "REMS compliance"],
        icon: "Pill",
        ecosystemConnections: ["Treatment Centers", "Specialty Pharmacy", "3PL"],
        hubServices: ["REMS compliance tracking", "Product delivery coordination"],
        distributionRole: "3PL: Product shipment from manufacturer (1-2 days, cryogenic)"
      },
      {
        id: "cart-7",
        name: "CAR-T Cell Infusion",
        phase: "infusion",
        duration: "1 day",
        leadTime: "Day 0 (Infusion Day)",
        activities: [
          "Product receipt and chain of custody verification",
          "Product thaw (bedside, ~30 minutes)",
          "Final patient assessment and pre-medications",
          "CAR-T cell infusion (15-30 minutes IV)",
          "Vital sign monitoring (q15min x 1hr, then q30min x 2hr)",
          "Immediate post-infusion observation (4-6 hours)",
          "Documentation and lot number recording",
          "REMS dose documentation"
        ],
        stakeholders: ["CAR-T Team", "Nursing", "Pharmacy", "Physician", "REMS Coordinator"],
        criticalFactors: ["Product integrity verification", "Infusion reaction readiness", "Emergency equipment access", "REMS compliance"],
        icon: "Syringe",
        ecosystemConnections: ["Treatment Centers", "Manufacturer"],
        hubServices: ["REMS documentation", "Infusion confirmation"],
        distributionRole: "Product delivered and administered"
      },
      {
        id: "cart-8",
        name: "Acute Monitoring Period",
        phase: "post-infusion",
        duration: "14-28 days",
        leadTime: "Day +1 to Day +28",
        activities: [
          "Daily CRS monitoring and grading (fever, hypotension, hypoxia)",
          "Twice-daily ICANS assessment (ICE score)",
          "Tocilizumab/dexamethasone protocol if CRS/ICANS develops",
          "Fever and infection workup",
          "Daily labs (CBC, CMP, ferritin, CRP)",
          "ICU transfer criteria monitoring",
          "Caregiver education and support",
          "REMS adverse event reporting"
        ],
        stakeholders: ["CAR-T Team", "ICU", "Neurology", "Pharmacy", "Nursing", "REMS Coordinator"],
        criticalFactors: ["Early CRS/ICANS detection", "Intervention timing", "Tocilizumab availability"],
        icon: "HeartPulse",
        ecosystemConnections: ["Treatment Centers", "Specialty Pharmacy", "Hub Services"],
        hubServices: ["Adverse event tracking", "Tocilizumab coordination", "REMS reporting"],
        distributionRole: "Specialty pharmacy for supportive care medications"
      },
      {
        id: "cart-9",
        name: "Recovery & Discharge",
        phase: "post-infusion",
        duration: "2-4 weeks",
        leadTime: "Day +28 to Day +56",
        activities: [
          "Clinical stabilization monitoring",
          "Blood count recovery tracking (ANC recovery)",
          "Infection monitoring and prophylaxis",
          "IVIG initiation if B-cell aplasia",
          "Discharge planning and home care setup",
          "Caregiver competency verification",
          "Follow-up appointment scheduling",
          "Registry enrollment completion"
        ],
        stakeholders: ["Care Team", "Case Manager", "Social Worker", "Home Health", "Registry"],
        criticalFactors: ["Cytopenias management", "Infection prevention", "Caregiver support adequacy"],
        icon: "Home",
        ecosystemConnections: ["Treatment Centers", "Specialty Pharmacy", "Hub Services"],
        hubServices: ["Discharge coordination", "Home health setup", "IVIG coordination"],
        distributionRole: "Specialty pharmacy for IVIG and prophylactic medications"
      },
      {
        id: "cart-10",
        name: "Long-term Follow-up",
        phase: "post-infusion",
        duration: "15 years (REMS requirement)",
        leadTime: "Month 3 onwards (scheduled assessments)",
        activities: [
          "Response assessment (Day +30, +90, +180, yearly)",
          "B-cell aplasia and hypogammaglobulinemia management",
          "Monthly IVIG replacement if needed",
          "Secondary malignancy screening",
          "Late neurologic effects monitoring",
          "Quality of life assessment",
          "Registry data submission",
          "REMS annual follow-up reporting"
        ],
        stakeholders: ["Oncologist", "Primary Care", "Registry", "Hub Services", "REMS Program"],
        criticalFactors: ["Response durability", "Late effects detection", "Compliance with follow-up"],
        icon: "Calendar",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Registry", "Primary Care"],
        hubServices: ["Long-term follow-up coordination", "Registry compliance", "IVIG management"],
        distributionRole: "Ongoing specialty pharmacy support for IVIG"
      }
    ]
  },
  {
    modality: "Gene Therapy",
    orderModel: {
      type: '1:selectmany',
      description: "Vector-based gene therapy with patient-specific dosing based on weight and/or genotype",
      leadTime: "2-4 weeks from eligibility confirmation to treatment",
      characteristics: ["Batch manufactured vectors", "Patient-specific dosing", "AAV antibody screening", "Single administration"]
    },
    totalLeadTime: "4-8 weeks from referral to infusion",
    stages: [
      {
        id: "gene-1",
        name: "Diagnosis & Genetic Testing",
        phase: "pre-infusion",
        duration: "2-4 weeks",
        leadTime: "Day 0-28",
        activities: [
          "Clinical diagnosis confirmation",
          "Genetic testing and mutation analysis confirmation",
          "Gene therapy eligibility assessment",
          "Genetic counseling for patient and family",
          "Family cascade screening if applicable",
          "Referral to specialized treatment center"
        ],
        stakeholders: ["Geneticist", "Genetic Counselor", "Disease Specialist", "Hub Services"],
        criticalFactors: ["Mutation type eligibility", "Disease stage assessment", "Age and weight criteria"],
        icon: "Dna",
        ecosystemConnections: ["Diagnostic Labs", "Hub Services", "Treatment Centers"],
        hubServices: ["Genetic test coordination", "Eligibility verification", "Treatment center referral"],
        distributionRole: "Diagnostic sample logistics"
      },
      {
        id: "gene-2",
        name: "Pre-treatment Evaluation & Screening",
        phase: "pre-infusion",
        duration: "2-3 weeks",
        leadTime: "Day 28-49",
        activities: [
          "Baseline disease function assessment",
          "AAV neutralizing antibody testing (critical exclusion criterion)",
          "Liver function evaluation",
          "Cardiac assessment if applicable",
          "Immunosuppression planning",
          "Weight-based dose calculation",
          "Informed consent process",
          "Insurance authorization completion"
        ],
        stakeholders: ["Disease Specialist Team", "Immunologist", "Hepatologist", "Hub Services", "Financial Counselor"],
        criticalFactors: ["Pre-existing AAV antibodies (exclusion if positive)", "Liver function adequacy", "Weight stability"],
        icon: "ClipboardList",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Specialty Pharmacy"],
        hubServices: ["Prior authorization", "Financial assistance", "Dose verification"],
        distributionRole: "3PL preparation for product delivery"
      },
      {
        id: "gene-3",
        name: "Gene Therapy Administration",
        phase: "infusion",
        duration: "1-2 days",
        leadTime: "Treatment Day 0",
        activities: [
          "Hospital admission and final assessments",
          "Pre-medication administration",
          "IV infusion of gene therapy vector (dose per kg)",
          "Immunosuppression initiation (steroids)",
          "Continuous vital sign monitoring",
          "Acute infusion reaction management if needed",
          "Lot documentation and chain of custody",
          "REMS documentation completion"
        ],
        stakeholders: ["Disease Specialist", "Nursing", "Pharmacy", "Anesthesia (if needed)", "REMS Coordinator"],
        criticalFactors: ["Accurate weight-based dosing", "Infusion rate adherence", "Immune reaction monitoring"],
        icon: "Syringe",
        ecosystemConnections: ["Treatment Centers", "3PL Logistics", "Manufacturer"],
        hubServices: ["Product delivery coordination", "Infusion confirmation", "REMS compliance"],
        distributionRole: "3PL: Temperature-controlled delivery to treatment center"
      },
      {
        id: "gene-4",
        name: "Acute Monitoring & Immunosuppression",
        phase: "post-infusion",
        duration: "4-8 weeks",
        leadTime: "Day +1 to Week +8",
        activities: [
          "Weekly liver enzyme monitoring (ALT/AST)",
          "Immune response assessment",
          "Steroid taper management per protocol",
          "Efficacy biomarker monitoring",
          "Adverse event documentation",
          "Vector shedding monitoring",
          "Caregiver education on warning signs"
        ],
        stakeholders: ["Disease Specialist", "Hepatologist", "Lab", "Pharmacy", "Hub Services"],
        criticalFactors: ["Transaminitis detection and management", "Steroid taper timing", "Efficacy signals"],
        icon: "Activity",
        ecosystemConnections: ["Treatment Centers", "Specialty Pharmacy", "Hub Services"],
        hubServices: ["Lab monitoring coordination", "Steroid management", "Adverse event tracking"],
        distributionRole: "Specialty pharmacy for immunosuppression medications"
      },
      {
        id: "gene-5",
        name: "Long-term Follow-up",
        phase: "post-infusion",
        duration: "15+ years",
        leadTime: "Month 3 onwards",
        activities: [
          "Quarterly/semi-annual efficacy assessments (Year 1-2)",
          "Annual function testing thereafter",
          "Durability of gene expression monitoring",
          "Secondary malignancy screening (insertional mutagenesis risk)",
          "Quality of life measures",
          "Registry participation and data submission",
          "Late-onset adverse event monitoring"
        ],
        stakeholders: ["Disease Specialist", "Primary Care", "Registry", "Hub Services"],
        criticalFactors: ["Expression durability", "Integration site analysis", "Late safety signals"],
        icon: "Calendar",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Registry", "Primary Care"],
        hubServices: ["Long-term follow-up coordination", "Registry compliance", "Care transitions"],
        distributionRole: "Minimal - long-term monitoring phase"
      }
    ]
  },
  {
    modality: "Radioligand Therapy",
    orderModel: {
      type: '1:selectmany',
      description: "Radiopharmaceutical with patient-specific dosimetry and repeat dosing cycles",
      leadTime: "1-2 weeks from treatment decision to first dose",
      characteristics: ["Isotope decay constraints", "Nuclear pharmacy compounding", "Multiple cycles (4-6)", "q6-8 week dosing intervals"]
    },
    totalLeadTime: "2-4 weeks from referral to first infusion; 6-12 months for full treatment course",
    stages: [
      {
        id: "rlt-1",
        name: "Patient Selection & Imaging",
        phase: "pre-infusion",
        duration: "1-2 weeks",
        leadTime: "Day 0-14",
        activities: [
          "Prior treatment history review",
          "Theranostic imaging (PSMA-PET, SSTR-PET, etc.)",
          "Target expression confirmation and quantification",
          "Disease staging and extent assessment",
          "Insurance pre-authorization initiation",
          "Treatment center slot inquiry"
        ],
        stakeholders: ["Nuclear Medicine Physician", "Oncologist", "Radiologist", "Hub Services"],
        criticalFactors: ["Target expression level (SUV threshold)", "Disease extent", "Prior EBRT exposure"],
        icon: "Target",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Imaging Centers"],
        hubServices: ["Prior authorization", "Slot scheduling", "Imaging coordination"],
        distributionRole: "Diagnostic radiopharmaceutical delivery for PET imaging"
      },
      {
        id: "rlt-2",
        name: "Pre-treatment Workup",
        phase: "pre-infusion",
        duration: "1 week",
        leadTime: "Day 14-21",
        activities: [
          "Complete blood counts (baseline hematologic reserve)",
          "Kidney function assessment (GFR > 30-40 mL/min required)",
          "Liver function tests",
          "Salivary gland baseline imaging",
          "Bone marrow biopsy if indicated",
          "Patient education on radiation safety",
          "Treatment slot confirmation",
          "Isotope ordering (timing critical due to decay)"
        ],
        stakeholders: ["Nuclear Medicine", "Lab", "Nursing", "Nuclear Pharmacy", "Radiation Safety"],
        criticalFactors: ["Renal function adequacy", "Hematologic reserve", "Isotope availability"],
        icon: "TestTube",
        ecosystemConnections: ["Treatment Centers", "Nuclear Pharmacy", "Hub Services"],
        hubServices: ["Lab coordination", "Isotope ordering", "Patient education"],
        distributionRole: "Nuclear pharmacy: Isotope procurement and dose preparation"
      },
      {
        id: "rlt-3",
        name: "Radioligand Administration",
        phase: "infusion",
        duration: "1 day",
        leadTime: "Treatment Day 0 (each cycle)",
        activities: [
          "Patient admission to nuclear medicine suite",
          "IV access placement",
          "Radioligand infusion (typically 30-60 minutes)",
          "Radiation safety monitoring and patient containment",
          "Hydration protocol for renal protection",
          "Amino acid infusion for kidney/salivary protection",
          "Post-infusion dosimetry imaging",
          "Radiation safety discharge counseling"
        ],
        stakeholders: ["Nuclear Medicine Physician", "Radiation Safety Officer", "Nursing", "Nuclear Pharmacy"],
        criticalFactors: ["Accurate dose delivery", "Radiation exposure limits", "Hydration compliance"],
        icon: "Radiation",
        ecosystemConnections: ["Treatment Centers", "Nuclear Pharmacy"],
        hubServices: ["Treatment confirmation", "Patient tracking"],
        distributionRole: "Nuclear pharmacy: Same-day radiopharmaceutical delivery (isotope half-life constraints)"
      },
      {
        id: "rlt-4",
        name: "Post-infusion Monitoring",
        phase: "post-infusion",
        duration: "6-8 weeks (between cycles)",
        leadTime: "Day +1 to Week +6 (each cycle)",
        activities: [
          "Weekly blood count monitoring (nadir ~Week 4-6)",
          "Kidney function tracking",
          "Fatigue and nausea management",
          "Radiation contact precautions education",
          "Response assessment (PSA, imaging if indicated)",
          "Next cycle planning and slot scheduling",
          "Transfusion support if needed",
          "Quality of life assessment"
        ],
        stakeholders: ["Nuclear Medicine", "Oncologist", "Lab", "Hub Services", "Nursing"],
        criticalFactors: ["Hematologic toxicity (Grade 3-4)", "Cumulative bone marrow suppression", "Response signals"],
        icon: "Activity",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Lab"],
        hubServices: ["Lab monitoring", "Next cycle scheduling", "Supportive care coordination"],
        distributionRole: "Specialty pharmacy for supportive medications"
      },
      {
        id: "rlt-5",
        name: "Repeat Cycles & Long-term Follow-up",
        phase: "post-infusion",
        duration: "6-12 months treatment; 5+ years follow-up",
        leadTime: "Cycles 2-6 at q6-8 week intervals",
        activities: [
          "Repeat dosing (4-6 cycles typical)",
          "Cumulative toxicity monitoring",
          "Response imaging (q2-3 cycles)",
          "Treatment discontinuation decisions",
          "Long-term hematologic monitoring",
          "Secondary malignancy screening",
          "Quality of life assessment",
          "Post-treatment imaging and response confirmation"
        ],
        stakeholders: ["Multidisciplinary Team", "Hub Services", "Registry"],
        criticalFactors: ["Cumulative bone marrow toxicity", "Response durability", "Treatment completion"],
        icon: "RefreshCw",
        ecosystemConnections: ["Treatment Centers", "Hub Services", "Registry"],
        hubServices: ["Cycle coordination", "Long-term follow-up", "Registry compliance"],
        distributionRole: "Ongoing nuclear pharmacy coordination for each cycle"
      }
    ]
  }
];

export const marketSegments = [
  {
    segment: "Oncology (Hematologic)",
    percentage: 45,
    description: "CAR-T therapies for B-cell malignancies and multiple myeloma - largest current commercial market",
    keyPlayers: ["Novartis (Kymriah)", "BMS (Breyanzi, Abecma)", "Gilead/Kite (Yescarta, Tecartus)", "J&J/Legend (Carvykti)"],
    reference: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products"
  },
  {
    segment: "Oncology (Solid Tumor & RLT)",
    percentage: 20,
    description: "Radioligand therapies and emerging solid tumor cell therapies",
    keyPlayers: ["Novartis (Pluvicto, Lutathera)", "Bayer", "Lantheus", "RayzeBio"],
    reference: "https://www.novartis.com/research-development/technology-platforms/radioligand-therapy"
  },
  {
    segment: "Rare/Genetic Diseases",
    percentage: 20,
    description: "Gene therapies for inherited disorders including hemophilia, SMA, and metabolic diseases",
    keyPlayers: ["Vertex (Casgevy)", "Novartis (Zolgensma)", "BioMarin (Roctavian)", "Sarepta (Elevidys)"],
    reference: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products"
  },
  {
    segment: "Ophthalmology",
    percentage: 8,
    description: "Gene therapies for inherited retinal dystrophies",
    keyPlayers: ["Spark (Luxturna)", "AGTC", "Nanoscope"],
    reference: "https://sparktx.com/luxturna/"
  },
  {
    segment: "Other Emerging",
    percentage: 7,
    description: "Cardiovascular, neurological, autoimmune, and other emerging applications",
    keyPlayers: ["Various early-stage companies", "Academic medical centers"],
    reference: "https://alliancerm.org/sector-report/"
  }
];
