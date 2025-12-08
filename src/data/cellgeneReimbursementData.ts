// Reimbursement and Financial Support Data for CGAT Modalities

export interface PricingModel {
  type: string;
  description: string;
  pros: string[];
  cons: string[];
  eligibility: string;
  trends: string[];
  supportedCenters: string[];
  reference?: string;
}

export interface ManufacturerProgram {
  manufacturer: string;
  program: string;
  coverage: string;
  eligibility: string;
  services: string[];
  contact: string;
  website?: string;
}

export interface CopayProgram {
  name: string;
  sponsor: string;
  maxBenefit: string;
  eligibility: string;
  enrollment: string;
  website?: string;
}

export interface AlternativeFunding {
  source: string;
  type: string;
  description: string;
  coverage: string;
  eligibility: string;
  contact?: string;
  website?: string;
}

export interface TravelSupport {
  program: string;
  sponsor: string;
  coverage: string[];
  eligibility: string;
  services: string[];
  website?: string;
}

export interface ModalityReimbursement {
  modality: string;
  averageCost: string;
  pricingModels: {
    wac: PricingModel;
    pap: PricingModel;
    "340b": PricingModel;
  };
  manufacturerPrograms: ManufacturerProgram[];
  copayPrograms: CopayProgram[];
  alternativeFunding: AlternativeFunding[];
  travelSupport: TravelSupport[];
  insuranceConsiderations: string[];
  reimbursementChallenges: string[];
  reimbursementTrends: string[];
}

// Pricing Model Educational Content
export const pricingModelEducation = {
  wac: {
    fullName: "Wholesale Acquisition Cost (WAC)",
    definition: "The manufacturer's list price to wholesalers/direct purchasers before any rebates, discounts, or reductions",
    keyPoints: [
      "Serves as benchmark for drug pricing negotiations",
      "Does not reflect actual transaction prices",
      "Used as starting point for payer negotiations",
      "Published in pricing databases (RED BOOK, First Databank)"
    ],
    cgSpecifics: [
      "CGT WAC typically ranges from $300K to $3.5M",
      "Reflects manufacturing complexity and R&D investment",
      "Often subject to outcomes-based contracting",
      "May include value-based pricing models"
    ],
    reference: "https://www.drugchannels.net/2024/02/cell-and-gene-therapy-pricing.html"
  },
  pap: {
    fullName: "Patient Assistance Programs (PAP)",
    definition: "Manufacturer-sponsored programs providing free or reduced-cost medications to eligible patients who lack adequate insurance or financial resources",
    keyPoints: [
      "Income-based eligibility (typically <400% FPL)",
      "Available to uninsured and underinsured patients",
      "Cannot be used with government insurance (Medicare/Medicaid)",
      "Administered through hub services or foundations"
    ],
    cgSpecifics: [
      "All major CGT manufacturers offer PAPs",
      "May cover full product cost ($0 to patient)",
      "Comprehensive support beyond just drug cost",
      "Often includes ancillary cost support"
    ],
    reference: "https://www.needymeds.org/"
  },
  "340b": {
    fullName: "340B Drug Pricing Program",
    definition: "Federal program requiring drug manufacturers to provide outpatient drugs to eligible healthcare organizations at significantly reduced prices",
    keyPoints: [
      "Discounts typically 25-50% off WAC",
      "Eligible entities: DSH hospitals, FQHCs, Ryan White clinics",
      "Covers outpatient drugs for all patients at covered entity",
      "Savings reinvested in patient care programs"
    ],
    cgSpecifics: [
      "CGT 340B eligibility varies by administration setting",
      "Outpatient vs inpatient administration affects eligibility",
      "Many treatment centers qualify as 340B covered entities",
      "Complex compliance requirements for CGT"
    ],
    reference: "https://www.hrsa.gov/opa"
  }
};

// Detailed Reimbursement Data by Modality
export const modalityReimbursementData: ModalityReimbursement[] = [
  {
    modality: "CAR-T Cell Therapy",
    averageCost: "$373,000 - $475,000 (product only); $1M+ total episode of care",
    pricingModels: {
      wac: {
        type: "WAC",
        description: "List price for CAR-T products: Kymriah ~$475K, Yescarta ~$424K, Tecartus ~$373K, Breyanzi ~$410K, Abecma ~$419K, Carvykti ~$465K",
        pros: [
          "Transparent benchmark pricing",
          "Consistent reference for negotiations",
          "Published in pricing databases"
        ],
        cons: [
          "Does not reflect actual costs to payers",
          "No volume discounts available",
          "Excludes hospital/supportive care costs"
        ],
        eligibility: "All purchasers/payers as baseline",
        trends: [
          "Outcomes-based contracting increasing",
          "Annuity payment models emerging",
          "Value-based arrangements growing"
        ],
        supportedCenters: ["All FACT-certified treatment centers"],
        reference: "https://www.drugchannels.net/2024/02/cell-and-gene-therapy-pricing.html"
      },
      pap: {
        type: "PAP",
        description: "Manufacturer patient assistance programs for uninsured/underinsured patients meeting income criteria",
        pros: [
          "Full product cost coverage possible",
          "Comprehensive support services",
          "No cost to eligible patients",
          "Includes case management"
        ],
        cons: [
          "Income-based restrictions",
          "Cannot combine with Medicare/Medicaid",
          "Complex enrollment process",
          "Limited slots may be available"
        ],
        eligibility: "Typically <400% Federal Poverty Level, uninsured or underinsured, US residents",
        trends: [
          "Expanded eligibility criteria",
          "Faster approval processes",
          "Digital enrollment options",
          "Bridge funding during appeals"
        ],
        supportedCenters: ["All participating treatment centers"],
        reference: "https://www.novartis.com/us-en/patient-assistance"
      },
      "340b": {
        type: "340B",
        description: "Federal drug discount program providing 25-50% discounts to eligible safety-net healthcare organizations",
        pros: [
          "Significant cost reduction (25-50% off WAC)",
          "Savings reinvested in patient programs",
          "Available for all patients at covered entity",
          "No income restrictions for patients"
        ],
        cons: [
          "Limited to covered entities",
          "Complex compliance requirements",
          "Outpatient administration typically required",
          "Audit and oversight burdens"
        ],
        eligibility: "DSH hospitals, teaching hospitals, FQHCs, Ryan White HIV/AIDS Program grantees",
        trends: [
          "Increased manufacturer scrutiny",
          "Contract pharmacy restrictions",
          "Evolving CGT-specific guidance",
          "340B ceiling price negotiations"
        ],
        supportedCenters: ["340B-enrolled hospitals and clinics", "Many academic medical centers", "Safety-net healthcare systems"],
        reference: "https://www.hrsa.gov/opa"
      }
    },
    manufacturerPrograms: [
      {
        manufacturer: "Novartis (Kymriah)",
        program: "Novartis Patient Assistance Foundation + KYMRIAH Support",
        coverage: "Product cost, copays, case management, travel/lodging",
        eligibility: "<400% FPL, US resident, medical criteria met",
        services: ["Benefits investigation", "Prior authorization", "Financial assistance", "Travel coordination", "Caregiver support"],
        contact: "1-844-4-KYMRIAH (1-844-459-6742)",
        website: "https://www.us.kymriah.com/support-and-resources/"
      },
      {
        manufacturer: "Kite/Gilead (Yescarta, Tecartus)",
        program: "Kite Konnect",
        coverage: "Product cost, copays, travel/lodging, case management",
        eligibility: "Insurance status and income criteria",
        services: ["Benefits verification", "Prior auth support", "Copay assistance", "Travel program", "Care coordination"],
        contact: "1-844-454-KITE (1-844-454-5483)",
        website: "https://www.yescarta.com/support/"
      },
      {
        manufacturer: "Bristol Myers Squibb (Breyanzi, Abecma)",
        program: "BMS Access Support + Patient Assistance Foundation",
        coverage: "Full product cost for eligible patients, copay support",
        eligibility: "Income-based, US resident, medical eligibility",
        services: ["Access navigation", "Financial counseling", "Travel assistance", "Caregiver resources"],
        contact: "1-800-861-0048",
        website: "https://www.breyanzi.com/patient-resources"
      },
      {
        manufacturer: "Janssen (Carvykti)",
        program: "Janssen CarePath",
        coverage: "Product cost assistance, copay support, supplemental funding",
        eligibility: "Insurance and income criteria",
        services: ["Benefits investigation", "Financial assistance", "Treatment coordination", "Travel support"],
        contact: "1-833-CARVYKTI",
        website: "https://www.carvykti.com/resources"
      }
    ],
    copayPrograms: [
      {
        name: "KYMRIAH Co-Pay Program",
        sponsor: "Novartis",
        maxBenefit: "Up to $25,000/year for commercially insured patients",
        eligibility: "Commercial insurance, meet medical criteria",
        enrollment: "Through KYMRIAH Support",
        website: "https://www.us.kymriah.com/support-and-resources/"
      },
      {
        name: "Kite Konnect Copay Assistance",
        sponsor: "Kite/Gilead",
        maxBenefit: "Up to $25,000/year",
        eligibility: "Commercial insurance holders",
        enrollment: "1-844-454-KITE",
        website: "https://www.yescarta.com/support/"
      },
      {
        name: "HealthWell Foundation CAR-T Copay",
        sponsor: "Independent Foundation",
        maxBenefit: "Variable based on fund availability",
        eligibility: "<500% FPL, commercially or government insured",
        enrollment: "https://www.healthwellfoundation.org",
        website: "https://www.healthwellfoundation.org"
      },
      {
        name: "Leukemia & Lymphoma Society Copay Program",
        sponsor: "LLS",
        maxBenefit: "Up to $10,000/year",
        eligibility: "Blood cancer diagnosis, meet income criteria",
        enrollment: "https://www.lls.org/support-resources/financial-support",
        website: "https://www.lls.org/support-resources/financial-support"
      }
    ],
    alternativeFunding: [
      {
        source: "PAN Foundation",
        type: "Non-profit foundation",
        description: "Assistance for underinsured patients with specific disease funds",
        coverage: "Variable - based on disease fund availability",
        eligibility: "<400% FPL, specific disease diagnosis",
        website: "https://www.panfoundation.org"
      },
      {
        source: "Cancer Financial Assistance Coalition (CFAC)",
        type: "Coalition of organizations",
        description: "Database of financial assistance programs for cancer patients",
        coverage: "Multiple programs for treatment and ancillary costs",
        eligibility: "Cancer diagnosis",
        website: "https://www.cancerfac.org"
      },
      {
        source: "Good Days Foundation",
        type: "Non-profit foundation",
        description: "Copay assistance for chronic illness medications",
        coverage: "Copays and premium assistance",
        eligibility: "Income criteria and diagnosis specific",
        website: "https://www.mygooddays.org"
      },
      {
        source: "State Pharmaceutical Assistance Programs (SPAP)",
        type: "State government programs",
        description: "State-specific programs supplementing Medicare coverage",
        coverage: "Varies by state - some cover CGT",
        eligibility: "State residency and income requirements",
        website: "https://www.medicare.gov/plan-compare/"
      }
    ],
    travelSupport: [
      {
        program: "KYMRIAH Travel Support",
        sponsor: "Novartis",
        coverage: ["Airfare/mileage", "Lodging near treatment center", "Meal per diem", "Caregiver travel"],
        eligibility: "KYMRIAH patients meeting program criteria",
        services: ["Booking assistance", "Direct payment to vendors", "Care coordination"],
        website: "https://www.us.kymriah.com/support-and-resources/"
      },
      {
        program: "Kite Konnect Travel Program",
        sponsor: "Kite/Gilead",
        coverage: ["Transportation costs", "Hotel accommodations", "Per diem allowance"],
        eligibility: "Yescarta/Tecartus patients",
        services: ["Travel coordination", "Lodging arrangements", "Ground transportation"],
        website: "https://www.yescarta.com/support/"
      },
      {
        program: "Corporate Angel Network",
        sponsor: "Non-profit",
        coverage: ["Free flights on corporate jets for cancer treatment"],
        eligibility: "Cancer patients traveling for treatment, medically stable",
        services: ["Flight coordination with corporate partners"],
        website: "https://www.corpangelnetwork.org"
      },
      {
        program: "Joe's House",
        sponsor: "Non-profit",
        coverage: ["Discounted lodging near treatment centers"],
        eligibility: "Cancer patients receiving outpatient treatment",
        services: ["Lodging database", "Booking assistance"],
        website: "https://www.joeshouse.org"
      }
    ],
    insuranceConsiderations: [
      "Prior authorization required for all commercial and Medicare coverage",
      "Medicare covers CAR-T under Part B (outpatient) or Part A (inpatient DRG)",
      "MS-DRG 016/017 used for CAR-T with CMS add-on payment (~$300K+ for product)",
      "New Technology Add-on Payment (NTAP) may supplement inpatient reimbursement",
      "Many Medicaid programs now cover CAR-T therapies",
      "Most commercial plans cover CAR-T but with high out-of-pocket costs",
      "Centers of Excellence networks may be required by some insurers",
      "Appeals commonly needed for denials (40-50% initial approval rate)"
    ],
    reimbursementChallenges: [
      "High upfront cost with delayed outcomes visibility",
      "Hospital cost vs reimbursement gap (often $100K+ loss per case)",
      "Lack of dedicated DRG adequate for CGT",
      "Site-of-care arbitrage pressure from payers",
      "Administrative complexity of billing multiple components",
      "Long-term follow-up cost allocation"
    ],
    reimbursementTrends: [
      "Outcomes-based/pay-for-performance contracts increasing",
      "CMS establishing CGT-specific payment pathways",
      "Medicare Part B vs Part A site-of-care considerations",
      "Value-based arrangements with milestone payments",
      "Annuity/installment payment models emerging",
      "International reference pricing discussions"
    ]
  },
  {
    modality: "Gene Therapy",
    averageCost: "$350,000 - $3,500,000 (product); varies significantly by indication",
    pricingModels: {
      wac: {
        type: "WAC",
        description: "Gene therapy WAC ranges: Zolgensma ~$2.1M, Luxturna ~$850K, Hemgenix ~$3.5M, Elevidys ~$3.2M",
        pros: [
          "One-time treatment cost vs lifetime therapy",
          "Transparent manufacturer pricing",
          "Basis for outcomes-based contracts"
        ],
        cons: [
          "Highest single-therapy costs in medicine",
          "Budget impact challenging for payers",
          "Long-term value demonstration pending"
        ],
        eligibility: "All purchasers/payers",
        trends: [
          "Pay-over-time models",
          "Outcomes-based refund guarantees",
          "Cross-payer risk pooling",
          "International pricing pressure"
        ],
        supportedCenters: ["Specialized gene therapy treatment centers"],
        reference: "https://www.drugchannels.net/2024/02/cell-and-gene-therapy-pricing.html"
      },
      pap: {
        type: "PAP",
        description: "Manufacturer programs for uninsured/underinsured patients - particularly critical given extreme costs",
        pros: [
          "Full cost coverage for eligible patients",
          "Includes comprehensive support services",
          "Genetic testing coverage often included"
        ],
        cons: [
          "Strict eligibility requirements",
          "Limited availability/slots",
          "Long enrollment timelines"
        ],
        eligibility: "Income criteria, medical eligibility, US residency",
        trends: [
          "Earlier access programs during approval",
          "Expanded definitions of underinsured",
          "Foundation partnerships"
        ],
        supportedCenters: ["All program-participating centers"],
        reference: "https://www.needymeds.org/"
      },
      "340b": {
        type: "340B",
        description: "340B discounts for gene therapies administered in outpatient settings at covered entities",
        pros: [
          "Substantial savings for safety-net providers",
          "Enables access for underserved populations",
          "No patient income restrictions"
        ],
        cons: [
          "Narrow eligible provider base for rare disease gene therapies",
          "Complex compliance for high-cost drugs",
          "Manufacturer 340B restrictions increasing"
        ],
        eligibility: "340B covered entities; may be limited by manufacturer restrictions",
        trends: [
          "Increased manufacturer 340B contract pharmacy restrictions",
          "Evolving interpretations for CGT",
          "Potential legislative changes"
        ],
        supportedCenters: ["340B enrolled academic medical centers", "Children's hospitals", "Safety-net systems"],
        reference: "https://www.hrsa.gov/opa"
      }
    },
    manufacturerPrograms: [
      {
        manufacturer: "Novartis (Zolgensma)",
        program: "Zolgensma oneGENE + Novartis Patient Assistance Foundation",
        coverage: "Full product cost, genetic testing, travel, case management",
        eligibility: "SMA Type 1 diagnosis, <2 years old typically, meet medical criteria",
        services: ["Genetic testing coordination", "Benefits investigation", "Travel/lodging", "Ongoing support"],
        contact: "1-855-441-GENE (1-855-441-4363)",
        website: "https://www.zolgensma.com/how-to-start/financial-support"
      },
      {
        manufacturer: "Spark/Roche (Luxturna)",
        program: "Spark Therapeutics Patient Support",
        coverage: "Product cost assistance, genetic testing, travel support",
        eligibility: "RPE65-mediated inherited retinal dystrophy, vision criteria met",
        services: ["Genetic test coverage", "Benefits verification", "Travel assistance"],
        contact: "1-855-SPARKTX",
        website: "https://luxturna.com/getting-luxturna/"
      },
      {
        manufacturer: "CSL Behring (Hemgenix)",
        program: "CSL Patient Support Services",
        coverage: "Product cost assistance for eligible hemophilia B patients",
        eligibility: "Hemophilia B diagnosis, factor IX deficiency criteria",
        services: ["Benefits investigation", "Financial assistance", "Infusion coordination"],
        contact: "1-877-275-4782",
        website: "https://www.hemgenix.com/support"
      },
      {
        manufacturer: "Sarepta (Elevidys)",
        program: "SarepCare",
        coverage: "Product assistance, genetic testing, family support",
        eligibility: "DMD diagnosis, ambulatory, age and mutation criteria",
        services: ["Genetic counseling", "Benefits verification", "Care coordination"],
        contact: "1-888-727-3782",
        website: "https://www.sarepta.com/sarepta-cares"
      }
    ],
    copayPrograms: [
      {
        name: "Zolgensma Copay Support",
        sponsor: "Novartis",
        maxBenefit: "Significant copay assistance for commercially insured",
        eligibility: "Commercial insurance, meet medical criteria",
        enrollment: "Through oneGENE program",
        website: "https://www.zolgensma.com/how-to-start/financial-support"
      },
      {
        name: "Cure SMA Financial Assistance",
        sponsor: "Cure SMA Foundation",
        maxBenefit: "Variable grants and emergency assistance",
        eligibility: "SMA diagnosis, demonstrated need",
        enrollment: "https://www.curesma.org",
        website: "https://www.curesma.org/financial-assistance/"
      },
      {
        name: "National Hemophilia Foundation",
        sponsor: "NHF",
        maxBenefit: "Emergency assistance grants",
        eligibility: "Bleeding disorder diagnosis",
        enrollment: "https://www.hemophilia.org",
        website: "https://www.hemophilia.org/community-resources/for-patients-and-families/financial-assistance"
      }
    ],
    alternativeFunding: [
      {
        source: "Medicaid Gene Therapy Access Programs",
        type: "State Medicaid initiatives",
        description: "State-level programs specifically addressing gene therapy coverage and access",
        coverage: "Full or partial coverage depending on state",
        eligibility: "Medicaid eligibility and medical criteria",
        website: "https://www.medicaid.gov"
      },
      {
        source: "Multi-Payer Gene Therapy Risk Pools",
        type: "Innovative payment model",
        description: "Emerging models where multiple payers share risk of high-cost gene therapies",
        coverage: "Shared funding across payers",
        eligibility: "Varies by program design"
      },
      {
        source: "Research/Clinical Trial Access",
        type: "Clinical research",
        description: "Access to gene therapies through ongoing clinical trials",
        coverage: "Product and some care costs covered by trial",
        eligibility: "Meet trial inclusion criteria",
        website: "https://clinicaltrials.gov"
      }
    ],
    travelSupport: [
      {
        program: "oneGENE Travel Support",
        sponsor: "Novartis",
        coverage: ["Airfare", "Lodging", "Ground transportation", "Caregiver travel"],
        eligibility: "Zolgensma patients meeting program criteria",
        services: ["Comprehensive travel coordination", "Extended stay support", "Family accommodations"],
        website: "https://www.zolgensma.com/how-to-start/financial-support"
      },
      {
        program: "Ronald McDonald House",
        sponsor: "RMHC",
        coverage: ["Free or low-cost lodging near children's hospitals"],
        eligibility: "Pediatric patients and families",
        services: ["Housing", "Meals", "Family support services"],
        website: "https://www.rmhc.org"
      },
      {
        program: "Miracle Flights",
        sponsor: "Non-profit",
        coverage: ["Free commercial airline tickets for medical treatment"],
        eligibility: "Children needing medical treatment away from home",
        services: ["Flight booking", "Coordination with treatment centers"],
        website: "https://www.miracleflights.org"
      }
    ],
    insuranceConsiderations: [
      "All gene therapies require extensive prior authorization",
      "Medical necessity reviews often involve external review organizations",
      "Medicare coverage varies by therapy and indication",
      "Commercial coverage increasingly available but with high OOP",
      "Some gene therapies have CMS National Coverage Determinations (NCDs)",
      "Step therapy requirements may delay access",
      "Re-administration policies being developed (most gene therapies are one-time)"
    ],
    reimbursementChallenges: [
      "Extreme upfront costs ($2M-$3.5M) challenging payer budgets",
      "Patient mobility between payers after costly treatment",
      "Pediatric patients with decades of potential benefit",
      "Long-term outcomes data still accumulating",
      "Manufacturing complexity and supply constraints"
    ],
    reimbursementTrends: [
      "Outcomes-based contracts with money-back guarantees",
      "Multi-year installment payment models",
      "Federal reinsurance discussions for high-cost therapies",
      "Medicaid state supplemental rebate negotiations",
      "International collaborative purchasing"
    ]
  },
  {
    modality: "Radioligand Therapy",
    averageCost: "$47,000 - $80,000 per cycle; $200,000 - $500,000 total treatment course",
    pricingModels: {
      wac: {
        type: "WAC",
        description: "Pluvicto ~$47K/dose x6 doses (~$280K total); Lutathera ~$50K/dose x4 doses (~$200K total)",
        pros: [
          "More manageable per-dose costs than CGT",
          "Multiple doses allow for response monitoring",
          "Traditional drug distribution model"
        ],
        cons: [
          "Total treatment cost still significant",
          "Isotope decay requires just-in-time manufacturing",
          "Nuclear pharmacy coordination adds cost"
        ],
        eligibility: "All purchasers/payers",
        trends: [
          "Expanding indications increasing utilization",
          "Manufacturing capacity investments",
          "Competitive products entering market"
        ],
        supportedCenters: ["Nuclear medicine certified facilities"],
        reference: "https://www.novartis.com/us-en/products/product-list"
      },
      pap: {
        type: "PAP",
        description: "Manufacturer assistance programs covering multiple treatment cycles",
        pros: [
          "Multi-cycle coverage available",
          "Includes ancillary support",
          "Case management throughout treatment"
        ],
        cons: [
          "Income restrictions apply",
          "Cannot use with Medicare/Medicaid",
          "Must qualify for each cycle"
        ],
        eligibility: "Income criteria, US resident, medical eligibility",
        trends: [
          "Comprehensive multi-cycle enrollment",
          "Digital enrollment options",
          "Foundation partnerships"
        ],
        supportedCenters: ["All participating nuclear medicine centers"],
        reference: "https://www.needymeds.org/"
      },
      "340b": {
        type: "340B",
        description: "340B pricing available for radioligand therapies at covered entities",
        pros: [
          "Per-cycle savings multiply over treatment course",
          "All doses covered at 340B pricing",
          "Applicable to all patients at covered entity"
        ],
        cons: [
          "Must be administered at 340B-enrolled facility",
          "Compliance complexity for radiopharmaceuticals",
          "Limited nuclear medicine certified 340B sites"
        ],
        eligibility: "340B covered entities with nuclear medicine capability",
        trends: [
          "Increasing 340B radioligand utilization",
          "Network expansion for access",
          "Compliance program development"
        ],
        supportedCenters: ["340B eligible hospitals with nuclear medicine", "Academic medical centers", "Cancer centers"],
        reference: "https://www.hrsa.gov/opa"
      }
    },
    manufacturerPrograms: [
      {
        manufacturer: "Novartis (Pluvicto, Lutathera)",
        program: "Novartis Oncology Patient Assistance + RLT Support",
        coverage: "Product cost for eligible patients across all cycles",
        eligibility: "<400% FPL, meet medical criteria, US resident",
        services: ["Benefits verification", "Prior authorization", "Financial counseling", "Treatment coordination"],
        contact: "1-800-282-7630",
        website: "https://www.pluvicto.com/support-resources/"
      }
    ],
    copayPrograms: [
      {
        name: "Novartis Copay Assistance",
        sponsor: "Novartis",
        maxBenefit: "Up to $25,000/year for commercially insured",
        eligibility: "Commercial insurance with valid prescription",
        enrollment: "Through Novartis Oncology Support",
        website: "https://www.pluvicto.com/support-resources/"
      },
      {
        name: "CancerCare Co-Pay Assistance",
        sponsor: "CancerCare",
        maxBenefit: "Limited grants for cancer treatment costs",
        eligibility: "Cancer diagnosis, income criteria",
        enrollment: "https://www.cancercare.org",
        website: "https://www.cancercare.org/financial_assistance"
      },
      {
        name: "The Carcinoid Cancer Foundation",
        sponsor: "Non-profit",
        maxBenefit: "Financial assistance for NET patients",
        eligibility: "Neuroendocrine tumor diagnosis",
        enrollment: "https://www.carcinoid.org",
        website: "https://www.carcinoid.org/for-patients/financial-assistance/"
      }
    ],
    alternativeFunding: [
      {
        source: "Prostate Cancer Foundation",
        type: "Non-profit foundation",
        description: "Financial assistance and resource navigation for prostate cancer patients",
        coverage: "Variable based on fund availability",
        eligibility: "Prostate cancer diagnosis",
        website: "https://www.pcf.org"
      },
      {
        source: "NET Research Foundation",
        type: "Non-profit foundation",
        description: "Support for neuroendocrine tumor patients including financial assistance",
        coverage: "Limited financial support",
        eligibility: "NET diagnosis",
        website: "https://www.netrf.org"
      }
    ],
    travelSupport: [
      {
        program: "RLT Treatment Travel Support",
        sponsor: "Novartis",
        coverage: ["Travel to certified treatment centers", "Lodging assistance", "Caregiver support"],
        eligibility: "Pluvicto/Lutathera patients meeting criteria",
        services: ["Multiple cycle travel coordination", "Extended treatment planning"],
        website: "https://www.pluvicto.com/support-resources/"
      },
      {
        program: "American Cancer Society Road to Recovery",
        sponsor: "ACS",
        coverage: ["Free rides to treatment appointments"],
        eligibility: "Cancer patients needing transportation",
        services: ["Volunteer driver network", "Treatment transportation"],
        website: "https://www.cancer.org/support-programs-and-services/road-to-recovery.html"
      }
    ],
    insuranceConsiderations: [
      "Prior authorization required for each treatment cycle",
      "Medicare Part B covers outpatient radioligand therapy",
      "J-codes assigned for billing (e.g., J9370 for Pluvicto)",
      "Nuclear medicine facility certification required",
      "PSMA PET imaging often required prior to treatment",
      "Commercial coverage generally good with standard oncology benefits",
      "Site-of-care restrictions may apply (hospital outpatient only)"
    ],
    reimbursementChallenges: [
      "Isotope decay creates just-in-time manufacturing constraints",
      "Limited number of certified administration sites",
      "Multiple cycles require repeated authorizations",
      "PSMA PET scan access and coverage varies",
      "Radiation safety requirements add operational complexity"
    ],
    reimbursementTrends: [
      "Expanding PSMA PET imaging access improving patient selection",
      "New indications driving market growth",
      "Competitive products expected to enter market",
      "Manufacturing capacity expansion underway",
      "Earlier line therapy positioning increasing utilization"
    ]
  }
];

// Stage-specific reimbursement considerations
export const stageReimbursementConsiderations = {
  "pre-infusion": {
    title: "Pre-Infusion Financial Considerations",
    activities: [
      "Benefits verification and insurance check",
      "Prior authorization submission",
      "Financial counseling and PAP enrollment",
      "Copay program enrollment",
      "Travel/lodging arrangements",
      "Alternative funding applications"
    ],
    keyContacts: [
      "Hub Services Case Manager",
      "Hospital Financial Counselor",
      "Manufacturer PAP team",
      "Social Worker"
    ],
    timeline: "Start immediately upon referral; 2-4 weeks typical"
  },
  "infusion": {
    title: "Infusion Financial Considerations",
    activities: [
      "Final authorization confirmation",
      "Copay collection (if applicable)",
      "J-code documentation for billing",
      "REMS compliance documentation",
      "Chain of custody verification"
    ],
    keyContacts: [
      "Treatment Center Finance",
      "Pharmacy Billing",
      "REMS Coordinator"
    ],
    timeline: "Day of treatment"
  },
  "post-infusion": {
    title: "Post-Infusion Financial Considerations",
    activities: [
      "Claims submission and monitoring",
      "Appeal preparation if denied",
      "Ongoing copay assistance for supportive care",
      "Long-term follow-up cost planning",
      "IVIG/supportive medication coverage",
      "Secondary insurance coordination"
    ],
    keyContacts: [
      "Insurance Appeals Team",
      "Hub Services",
      "Primary Care Financial Counselor"
    ],
    timeline: "Ongoing - 15+ years for long-term follow-up"
  }
};
