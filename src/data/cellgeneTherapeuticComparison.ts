// Therapeutic Comparison Data - CGAT vs Traditional Therapeutics

export interface TherapeuticDifference {
  aspect: string;
  traditional: string;
  cgat: string;
  impact: string;
}

export interface MarketTrend {
  title: string;
  description: string;
  growth: string;
  icon: string;
}

export interface MarketChallenge {
  title: string;
  description: string;
  mitigation: string;
}

export interface TherapeuticExpansion {
  modality: string;
  currentAreas: string[];
  emergingAreas: string[];
  researchFocus: string[];
  majorManufacturers: string[];
}

export interface JourneyStage {
  id: string;
  name: string;
  phase: 'pre-infusion' | 'infusion' | 'post-infusion';
  duration: string;
  activities: string[];
  stakeholders: string[];
  criticalFactors: string[];
  icon: string;
}

export interface ProcessFlow {
  modality: string;
  stages: JourneyStage[];
}

export const therapeuticDifferences: TherapeuticDifference[] = [
  {
    aspect: "Treatment Approach",
    traditional: "Symptom management, ongoing dosing",
    cgat: "Disease modification at cellular/genetic level",
    impact: "Potential for one-time curative treatment"
  },
  {
    aspect: "Manufacturing",
    traditional: "Mass production, shelf-stable",
    cgat: "Patient-specific, living products",
    impact: "Complex supply chain, vein-to-vein logistics"
  },
  {
    aspect: "Administration",
    traditional: "Self-administered or outpatient",
    cgat: "Specialized centers, intensive monitoring",
    impact: "Requires certified treatment centers"
  },
  {
    aspect: "Cost Structure",
    traditional: "Ongoing medication costs",
    cgat: "High upfront, potential lifetime benefit",
    impact: "Value-based and outcomes-based contracts"
  },
  {
    aspect: "Safety Profile",
    traditional: "Well-characterized, predictable",
    cgat: "Novel risks (CRS, neurotoxicity)",
    impact: "REMS programs, specialized training"
  },
  {
    aspect: "Patient Selection",
    traditional: "Broad eligibility criteria",
    cgat: "Specific biomarkers, disease staging",
    impact: "Precision medicine approach"
  },
  {
    aspect: "Durability",
    traditional: "Treatment-dependent response",
    cgat: "Potential for durable/permanent response",
    impact: "Long-term follow-up requirements"
  },
  {
    aspect: "Healthcare Infrastructure",
    traditional: "Standard pharmacy distribution",
    cgat: "Specialized cell processing facilities",
    impact: "Network of certified centers"
  }
];

export const marketTrends: MarketTrend[] = [
  {
    title: "Expanding Indications",
    description: "Moving from hematologic cancers to solid tumors, autoimmune diseases, and genetic disorders",
    growth: "CAGR 35%+",
    icon: "TrendingUp"
  },
  {
    title: "Off-the-Shelf Products",
    description: "Allogeneic therapies reducing manufacturing time and costs",
    growth: "60+ trials",
    icon: "Package"
  },
  {
    title: "In-Vivo Gene Editing",
    description: "Direct gene editing without cell extraction",
    growth: "New paradigm",
    icon: "Dna"
  },
  {
    title: "Global Access Expansion",
    description: "Manufacturing facilities expanding beyond US/EU",
    growth: "Asia-Pacific growth",
    icon: "Globe"
  },
  {
    title: "Outcomes-Based Pricing",
    description: "Pay-for-performance and annuity models gaining traction",
    growth: "Industry standard",
    icon: "DollarSign"
  },
  {
    title: "AI Integration",
    description: "AI-driven target identification and manufacturing optimization",
    growth: "Accelerating",
    icon: "Brain"
  }
];

export const marketChallenges: MarketChallenge[] = [
  {
    title: "Manufacturing Complexity",
    description: "Patient-specific production with strict quality requirements",
    mitigation: "Automation, standardization, allogeneic approaches"
  },
  {
    title: "High Costs",
    description: "Treatment costs ranging from $300K to $3M+",
    mitigation: "Value-based contracts, outcomes-based pricing"
  },
  {
    title: "Access & Equity",
    description: "Limited to specialized centers, geographic barriers",
    mitigation: "Network expansion, telehealth integration"
  },
  {
    title: "Reimbursement",
    description: "Payer uncertainty, budget impact concerns",
    mitigation: "Real-world evidence, registry data"
  },
  {
    title: "Long-term Safety",
    description: "Unknown durability, late effects",
    mitigation: "15-year follow-up studies, registries"
  },
  {
    title: "Workforce Training",
    description: "Specialized skills for administration and monitoring",
    mitigation: "Certification programs, center of excellence model"
  }
];

export const therapeuticExpansions: TherapeuticExpansion[] = [
  {
    modality: "Cell & Gene Therapy",
    currentAreas: ["B-cell lymphomas", "Multiple myeloma", "ALL", "Hemophilia", "SMA"],
    emergingAreas: ["Solid tumors", "Heart failure", "Type 1 diabetes", "Parkinson's", "Alzheimer's"],
    researchFocus: ["NK cell therapies", "TCR therapies", "Gene editing (CRISPR)", "iPSC-derived cells"],
    majorManufacturers: ["Novartis", "Bristol-Myers Squibb", "Gilead/Kite", "bluebird bio", "Vertex"]
  },
  {
    modality: "Advanced Therapies",
    currentAreas: ["Rare diseases", "Inherited retinal dystrophy", "DMD", "Thalassemia"],
    emergingAreas: ["Cystic fibrosis", "Huntington's", "ALS", "Aging-related conditions"],
    researchFocus: ["AAV optimization", "Non-viral delivery", "Base editing", "Prime editing"],
    majorManufacturers: ["Spark Therapeutics", "BioMarin", "Sarepta", "Ultragenyx", "Solid Biosciences"]
  },
  {
    modality: "Personalized Medicine",
    currentAreas: ["Oncology (tumor-specific)", "Pharmacogenomics", "Companion diagnostics"],
    emergingAreas: ["Microbiome-based", "Digital biomarkers", "Predictive prevention"],
    researchFocus: ["Multi-omics integration", "AI-driven treatment selection", "Liquid biopsy"],
    majorManufacturers: ["Foundation Medicine", "Guardant Health", "Exact Sciences", "Tempus", "Illumina"]
  },
  {
    modality: "Radioligand Therapy",
    currentAreas: ["Neuroendocrine tumors", "Prostate cancer", "Thyroid cancer"],
    emergingAreas: ["Breast cancer", "Colorectal cancer", "Brain tumors", "Pediatric cancers"],
    researchFocus: ["Novel targets (FAP, HER2)", "Alpha emitters", "Theranostic pairs"],
    majorManufacturers: ["Novartis", "Bayer", "Lantheus", "RayzeBio", "ITM Isotope Technologies"]
  }
];

export const industryShiftReasons = [
  {
    reason: "Curative Potential",
    description: "Unlike traditional treatments that manage symptoms, CGAT offers the potential to cure diseases at their source",
    evidence: "90%+ complete remission rates in certain cancers"
  },
  {
    reason: "Precision Medicine Evolution",
    description: "Advances in genomics enable targeting specific disease mechanisms",
    evidence: "CRISPR and gene editing technologies"
  },
  {
    reason: "Unmet Medical Needs",
    description: "Many diseases have no effective treatments available",
    evidence: "7,000+ rare diseases, most without treatment"
  },
  {
    reason: "Regulatory Support",
    description: "FDA breakthrough designations and accelerated approvals",
    evidence: "50+ CGT approvals since 2017"
  },
  {
    reason: "Investment Influx",
    description: "Massive private and public investment in cell and gene therapy",
    evidence: "$20B+ annual investment"
  },
  {
    reason: "Technology Convergence",
    description: "AI, manufacturing automation, and delivery technologies maturing",
    evidence: "10x efficiency improvements"
  }
];

export const patientJourneyStages: ProcessFlow[] = [
  {
    modality: "CAR-T Cell Therapy",
    stages: [
      {
        id: "cart-1",
        name: "Patient Identification & Referral",
        phase: "pre-infusion",
        duration: "1-2 weeks",
        activities: [
          "Diagnosis confirmation",
          "Biomarker testing (CD19, BCMA)",
          "Treatment history review",
          "Insurance pre-authorization",
          "Referral to certified center"
        ],
        stakeholders: ["Oncologist", "Pathologist", "Case Manager", "Insurance"],
        criticalFactors: ["Disease staging", "Prior therapies", "Performance status"],
        icon: "Search"
      },
      {
        id: "cart-2",
        name: "Evaluation & Workup",
        phase: "pre-infusion",
        duration: "1-2 weeks",
        activities: [
          "Comprehensive health assessment",
          "Cardiac evaluation",
          "Infectious disease screening",
          "CNS assessment",
          "Patient education & consent"
        ],
        stakeholders: ["CAR-T Team", "Cardiologist", "Infectious Disease", "Social Worker"],
        criticalFactors: ["Organ function", "Infection status", "Caregiver availability"],
        icon: "Stethoscope"
      },
      {
        id: "cart-3",
        name: "Leukapheresis",
        phase: "pre-infusion",
        duration: "1 day",
        activities: [
          "Peripheral blood collection",
          "T-cell isolation",
          "Sample quality verification",
          "Chain of custody documentation",
          "Shipment to manufacturing"
        ],
        stakeholders: ["Apheresis Team", "Lab Technicians", "Logistics Coordinator"],
        criticalFactors: ["Cell viability", "Timing coordination", "Cold chain"],
        icon: "Droplets"
      },
      {
        id: "cart-4",
        name: "Manufacturing",
        phase: "pre-infusion",
        duration: "3-4 weeks",
        activities: [
          "T-cell activation",
          "CAR gene transduction",
          "Cell expansion",
          "Quality testing",
          "Cryopreservation & release"
        ],
        stakeholders: ["Manufacturing Team", "QA/QC", "Regulatory"],
        criticalFactors: ["Manufacturing success rate", "Product quality", "Timeline"],
        icon: "Factory"
      },
      {
        id: "cart-5",
        name: "Bridging Therapy",
        phase: "pre-infusion",
        duration: "Variable",
        activities: [
          "Disease control measures",
          "Chemotherapy if needed",
          "Symptom management",
          "Weekly monitoring",
          "Schedule coordination"
        ],
        stakeholders: ["Oncologist", "Pharmacist", "Nursing"],
        criticalFactors: ["Disease progression", "Patient stability"],
        icon: "Activity"
      },
      {
        id: "cart-6",
        name: "Lymphodepletion",
        phase: "pre-infusion",
        duration: "3-5 days",
        activities: [
          "Conditioning chemotherapy",
          "Flu/Cy regimen administration",
          "Hydration & supportive care",
          "Lab monitoring",
          "Infection prophylaxis"
        ],
        stakeholders: ["Oncologist", "Pharmacist", "Nursing", "Lab"],
        criticalFactors: ["Timing before infusion", "Toxicity management"],
        icon: "Pill"
      },
      {
        id: "cart-7",
        name: "CAR-T Infusion",
        phase: "infusion",
        duration: "1 day",
        activities: [
          "Product thaw & preparation",
          "Pre-medications",
          "Cell infusion (15-30 min)",
          "Vital sign monitoring",
          "Documentation"
        ],
        stakeholders: ["CAR-T Team", "Nursing", "Pharmacy", "Physician"],
        criticalFactors: ["Product integrity", "Patient stability", "Emergency readiness"],
        icon: "Syringe"
      },
      {
        id: "cart-8",
        name: "Acute Monitoring",
        phase: "post-infusion",
        duration: "14-28 days",
        activities: [
          "CRS monitoring & grading",
          "ICANS assessment",
          "Tocilizumab/steroid management",
          "Fever & infection management",
          "ICU transfer if needed"
        ],
        stakeholders: ["CAR-T Team", "ICU", "Neurology", "Pharmacy"],
        criticalFactors: ["Early CRS/ICANS detection", "Intervention timing"],
        icon: "HeartPulse"
      },
      {
        id: "cart-9",
        name: "Recovery & Discharge",
        phase: "post-infusion",
        duration: "2-4 weeks",
        activities: [
          "Stabilization",
          "Blood count recovery",
          "Infection monitoring",
          "Discharge planning",
          "Caregiver education"
        ],
        stakeholders: ["Care Team", "Case Manager", "Social Worker"],
        criticalFactors: ["Cytopenias", "Infection risk", "Support system"],
        icon: "Home"
      },
      {
        id: "cart-10",
        name: "Long-term Follow-up",
        phase: "post-infusion",
        duration: "15 years",
        activities: [
          "Response assessment",
          "B-cell aplasia management",
          "IVIG replacement",
          "Secondary malignancy screening",
          "Quality of life monitoring"
        ],
        stakeholders: ["Oncologist", "Primary Care", "Registry"],
        criticalFactors: ["Durability", "Late effects", "Data collection"],
        icon: "Calendar"
      }
    ]
  },
  {
    modality: "Gene Therapy",
    stages: [
      {
        id: "gene-1",
        name: "Diagnosis & Genetic Testing",
        phase: "pre-infusion",
        duration: "2-4 weeks",
        activities: [
          "Clinical diagnosis confirmation",
          "Genetic testing & mutation analysis",
          "Eligibility assessment",
          "Genetic counseling",
          "Family screening if applicable"
        ],
        stakeholders: ["Geneticist", "Genetic Counselor", "Specialist"],
        criticalFactors: ["Mutation type", "Disease stage", "Age considerations"],
        icon: "Dna"
      },
      {
        id: "gene-2",
        name: "Pre-treatment Evaluation",
        phase: "pre-infusion",
        duration: "2-3 weeks",
        activities: [
          "Baseline function assessment",
          "AAV antibody testing",
          "Liver function evaluation",
          "Immunosuppression planning",
          "Informed consent"
        ],
        stakeholders: ["Specialist Team", "Immunologist", "Hepatologist"],
        criticalFactors: ["Pre-existing antibodies", "Organ function"],
        icon: "ClipboardList"
      },
      {
        id: "gene-3",
        name: "Gene Therapy Administration",
        phase: "infusion",
        duration: "1-2 days",
        activities: [
          "IV infusion or local delivery",
          "Immunosuppression initiation",
          "Vital monitoring",
          "Acute reaction management",
          "Documentation"
        ],
        stakeholders: ["Specialist", "Nursing", "Pharmacy", "Anesthesia (if needed)"],
        criticalFactors: ["Delivery route", "Dose", "Immune response"],
        icon: "Syringe"
      },
      {
        id: "gene-4",
        name: "Acute Monitoring Period",
        phase: "post-infusion",
        duration: "4-8 weeks",
        activities: [
          "Liver enzyme monitoring",
          "Immune response assessment",
          "Steroid taper management",
          "Efficacy markers",
          "Adverse event management"
        ],
        stakeholders: ["Specialist", "Hepatologist", "Lab"],
        criticalFactors: ["Transaminitis", "Immune reactions", "Vector shedding"],
        icon: "Activity"
      },
      {
        id: "gene-5",
        name: "Long-term Follow-up",
        phase: "post-infusion",
        duration: "15+ years",
        activities: [
          "Durability assessment",
          "Function testing",
          "Secondary malignancy screening",
          "Quality of life measures",
          "Registry participation"
        ],
        stakeholders: ["Specialist", "Primary Care", "Registry"],
        criticalFactors: ["Expression durability", "Integration site analysis"],
        icon: "Calendar"
      }
    ]
  },
  {
    modality: "Radioligand Therapy",
    stages: [
      {
        id: "rlt-1",
        name: "Patient Selection",
        phase: "pre-infusion",
        duration: "1-2 weeks",
        activities: [
          "Target expression confirmation (PSMA/SSTR PET)",
          "Disease staging",
          "Prior treatment review",
          "Organ function assessment",
          "Insurance authorization"
        ],
        stakeholders: ["Nuclear Medicine", "Oncologist", "Radiologist"],
        criticalFactors: ["Target expression level", "Bone marrow reserve"],
        icon: "Target"
      },
      {
        id: "rlt-2",
        name: "Pre-treatment Workup",
        phase: "pre-infusion",
        duration: "1 week",
        activities: [
          "Complete blood counts",
          "Kidney function (GFR)",
          "Liver function tests",
          "Salivary gland baseline",
          "Patient education"
        ],
        stakeholders: ["Nuclear Medicine", "Lab", "Nursing"],
        criticalFactors: ["Renal function", "Hematologic parameters"],
        icon: "TestTube"
      },
      {
        id: "rlt-3",
        name: "Radioligand Infusion",
        phase: "infusion",
        duration: "1 day",
        activities: [
          "IV administration",
          "Radiation safety measures",
          "Hydration protocol",
          "Vital monitoring",
          "Post-infusion imaging"
        ],
        stakeholders: ["Nuclear Medicine Physician", "Radiation Safety", "Nursing"],
        criticalFactors: ["Dose delivery", "Radiation exposure"],
        icon: "Radiation"
      },
      {
        id: "rlt-4",
        name: "Post-infusion Monitoring",
        phase: "post-infusion",
        duration: "6-8 weeks",
        activities: [
          "Blood count monitoring",
          "Kidney function tracking",
          "Fatigue management",
          "Response assessment",
          "Next cycle planning"
        ],
        stakeholders: ["Nuclear Medicine", "Oncologist", "Lab"],
        criticalFactors: ["Hematologic toxicity", "Response evaluation"],
        icon: "Activity"
      },
      {
        id: "rlt-5",
        name: "Repeat Cycles & Follow-up",
        phase: "post-infusion",
        duration: "4-6 cycles over 6-12 months",
        activities: [
          "Repeat dosing (q6-8 weeks)",
          "Cumulative toxicity monitoring",
          "Response imaging",
          "Quality of life assessment",
          "Long-term follow-up"
        ],
        stakeholders: ["Multidisciplinary Team"],
        criticalFactors: ["Cumulative bone marrow toxicity", "Durability"],
        icon: "RefreshCw"
      }
    ]
  }
];

export const marketSegments = [
  {
    segment: "Oncology",
    percentage: 65,
    description: "Largest segment driven by CAR-T and emerging solid tumor therapies",
    keyPlayers: ["Novartis", "BMS", "Gilead", "J&J", "AbbVie"]
  },
  {
    segment: "Rare Diseases",
    percentage: 20,
    description: "Gene therapies for inherited disorders",
    keyPlayers: ["Vertex", "bluebird bio", "BioMarin", "Sarepta"]
  },
  {
    segment: "Cardiovascular",
    percentage: 8,
    description: "Emerging applications in heart failure and cardiomyopathies",
    keyPlayers: ["Rocket Pharma", "Lexeo Therapeutics"]
  },
  {
    segment: "Neurological",
    percentage: 5,
    description: "Growing focus on CNS disorders",
    keyPlayers: ["Novartis (Zolgensma)", "Passage Bio", "Prevail"]
  },
  {
    segment: "Other",
    percentage: 2,
    description: "Ophthalmology, autoimmune, infectious disease",
    keyPlayers: ["Spark", "CRISPR Therapeutics"]
  }
];
