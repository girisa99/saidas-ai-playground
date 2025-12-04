export interface TherapyType {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  applications: string[];
  differentiators: string[];
  url: string;
  references: { title: string; url: string; source: string }[];
  attachments: { title: string; url: string; type: string }[];
}

export const therapyData: TherapyType[] = [
  {
    id: "cell-therapy",
    title: "Cell Therapy",
    icon: "HeartPulse",
    gradient: "from-rose-500 to-pink-600",
    shortDescription: "Living cells engineered to treat diseases by replacing, repairing, or enhancing cellular function.",
    fullDescription: "Cell therapy represents a revolutionary approach to medicine where living cells are used as therapeutic agents. These therapies harness the body's own cellular machinery to combat diseases that were previously untreatable. From CAR-T cells targeting cancer to stem cell treatments for degenerative conditions, cell therapy is transforming the landscape of modern medicine. AI-powered analysis enables precise cell characterization, quality control, and patient matching for optimal outcomes.",
    highlights: [
      "CAR-T Cell Therapy",
      "Stem Cell Treatments",
      "NK Cell Therapy",
      "TIL Therapy",
      "Mesenchymal Stem Cells",
      "iPSC-derived Therapies"
    ],
    applications: [
      "Hematological malignancies (leukemia, lymphoma)",
      "Solid tumor immunotherapy",
      "Autoimmune disease modulation",
      "Tissue regeneration and repair",
      "Cardiac repair post-infarction",
      "Neurodegenerative disease treatment"
    ],
    differentiators: [
      "Living drugs that adapt and persist in the body",
      "Potential for one-time curative treatments",
      "Personalized therapy from patient's own cells",
      "AI-optimized manufacturing processes",
      "Real-time potency and quality monitoring"
    ],
    url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products",
    references: [
      { title: "FDA Approved Cellular and Gene Therapy Products", url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products", source: "FDA" },
      { title: "Cell Therapy Manufacturing Advances", url: "https://www.nature.com/articles/s41587-022-01571-4", source: "Nature Biotechnology" },
      { title: "CAR-T Cell Therapy Overview", url: "https://www.cancer.gov/about-cancer/treatment/research/car-t-cells", source: "National Cancer Institute" }
    ],
    attachments: [
      { title: "Cell Therapy Clinical Guidelines 2024", url: "#", type: "PDF" },
      { title: "Manufacturing Quality Standards", url: "#", type: "PDF" },
      { title: "Patient Selection Criteria", url: "#", type: "Document" }
    ]
  },
  {
    id: "gene-therapy",
    title: "Gene Therapy",
    icon: "Dna",
    gradient: "from-blue-500 to-cyan-600",
    shortDescription: "Modifying genes to treat or prevent disease by correcting genetic defects or introducing therapeutic genes.",
    fullDescription: "Gene therapy offers the unprecedented ability to address diseases at their genetic root. By delivering functional copies of genes, editing defective sequences, or silencing harmful genes, these therapies can provide lasting cures for previously incurable genetic disorders. Advanced AI algorithms assist in identifying optimal gene targets, designing delivery vectors, and predicting treatment outcomes with remarkable precision.",
    highlights: [
      "Gene Replacement",
      "Gene Editing (CRISPR)",
      "Gene Silencing",
      "Viral Vectors (AAV, Lentivirus)",
      "Non-viral Delivery",
      "Base Editing"
    ],
    applications: [
      "Inherited retinal dystrophies",
      "Spinal muscular atrophy (SMA)",
      "Hemophilia A and B",
      "Sickle cell disease",
      "Beta-thalassemia",
      "Duchenne muscular dystrophy"
    ],
    differentiators: [
      "One-time treatment with potential lifelong benefits",
      "Addresses root cause of genetic diseases",
      "Precision medicine with targeted delivery",
      "AI-guided vector design and optimization",
      "Reduced immunogenicity through engineering"
    ],
    url: "https://www.genome.gov/genetics-glossary/Gene-Therapy",
    references: [
      { title: "Gene Therapy Clinical Trials Database", url: "https://clinicaltrials.gov", source: "ClinicalTrials.gov" },
      { title: "CRISPR-Cas9 Gene Editing", url: "https://www.nature.com/articles/s41576-019-0166-5", source: "Nature Reviews" },
      { title: "AAV Vector Development", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7076378/", source: "NCBI" }
    ],
    attachments: [
      { title: "Gene Therapy Safety Guidelines", url: "#", type: "PDF" },
      { title: "Vector Manufacturing Protocols", url: "#", type: "PDF" },
      { title: "Regulatory Pathway Overview", url: "#", type: "Document" }
    ]
  },
  {
    id: "advanced-therapy",
    title: "Advanced Therapy",
    icon: "Atom",
    gradient: "from-purple-500 to-violet-600",
    shortDescription: "Cutting-edge medicinal products including gene therapy, somatic cell therapy, and tissue-engineered products.",
    fullDescription: "Advanced Therapy Medicinal Products (ATMPs) represent the frontier of pharmaceutical innovation. These complex biologics encompass gene therapies, cell therapies, and tissue-engineered products that offer transformative treatment options. AI integration enables sophisticated analysis of these complex products, from development through manufacturing and patient monitoring, ensuring safety and efficacy at every stage.",
    highlights: [
      "ATMPs Classification",
      "Combined Products",
      "Tissue Engineering",
      "3D Bioprinting",
      "Organoids",
      "Xenotransplantation"
    ],
    applications: [
      "Skin grafts for burn victims",
      "Cartilage repair and regeneration",
      "Corneal reconstruction",
      "Bone tissue engineering",
      "Vascular grafts",
      "Organ-on-chip drug testing"
    ],
    differentiators: [
      "Combines multiple modalities for enhanced efficacy",
      "Personalized tissue and organ solutions",
      "AI-driven bioprinting optimization",
      "Real-time quality assessment",
      "Scalable manufacturing innovations"
    ],
    url: "https://www.ema.europa.eu/en/human-regulatory/overview/advanced-therapy-medicinal-products-overview",
    references: [
      { title: "EMA ATMP Guidelines", url: "https://www.ema.europa.eu/en/human-regulatory/overview/advanced-therapy-medicinal-products-overview", source: "EMA" },
      { title: "Tissue Engineering Advances", url: "https://www.science.org/doi/10.1126/science.aav9051", source: "Science" },
      { title: "3D Bioprinting Review", url: "https://www.nature.com/articles/s41578-019-0099-2", source: "Nature Materials" }
    ],
    attachments: [
      { title: "ATMP Classification Framework", url: "#", type: "PDF" },
      { title: "Quality Control Standards", url: "#", type: "PDF" },
      { title: "Manufacturing Requirements", url: "#", type: "Document" }
    ]
  },
  {
    id: "personalized-therapy",
    title: "Personalized Therapy",
    icon: "Target",
    gradient: "from-emerald-500 to-teal-600",
    shortDescription: "Tailored treatments based on individual genetic, molecular, and clinical profiles for optimal outcomes.",
    fullDescription: "Personalized therapy represents the convergence of genomics, proteomics, and AI to deliver treatments uniquely suited to each patient. By analyzing comprehensive biomarker profiles, genetic variants, and clinical data, these therapies maximize efficacy while minimizing adverse effects. AI algorithms continuously learn from patient outcomes to refine treatment predictions and improve therapeutic protocols.",
    highlights: [
      "Pharmacogenomics",
      "Companion Diagnostics",
      "Biomarker-driven Selection",
      "Neoantigen Vaccines",
      "Digital Twins",
      "Predictive Analytics"
    ],
    applications: [
      "Oncology precision medicine",
      "Rare disease treatment optimization",
      "Drug dosing personalization",
      "Immunotherapy patient selection",
      "Preventive health interventions",
      "Treatment resistance prediction"
    ],
    differentiators: [
      "Individual patient molecular profiling",
      "AI-powered outcome prediction",
      "Continuous treatment optimization",
      "Reduced adverse events through precision",
      "Cost-effective targeted interventions"
    ],
    url: "https://www.cancer.gov/about-cancer/treatment/types/precision-medicine",
    references: [
      { title: "Precision Medicine Initiative", url: "https://allofus.nih.gov/", source: "NIH All of Us" },
      { title: "Pharmacogenomics Guidelines", url: "https://cpicpgx.org/", source: "CPIC" },
      { title: "AI in Precision Oncology", url: "https://www.nature.com/articles/s41591-019-0712-x", source: "Nature Medicine" }
    ],
    attachments: [
      { title: "Biomarker Testing Guidelines", url: "#", type: "PDF" },
      { title: "Patient Stratification Protocols", url: "#", type: "PDF" },
      { title: "Outcome Tracking Framework", url: "#", type: "Document" }
    ]
  },
  {
    id: "radioligand-therapy",
    title: "Radioligand Therapy",
    icon: "Radiation",
    gradient: "from-amber-500 to-orange-600",
    shortDescription: "Targeted radiation delivery using molecules that bind specifically to cancer cells for precise tumor destruction.",
    fullDescription: "Radioligand therapy (RLT) combines the targeting precision of molecular medicine with the cell-killing power of radiation. By linking radioactive isotopes to molecules that specifically bind tumor cells, RLT delivers radiation directly to cancer sites while sparing healthy tissue. AI enhances patient selection, dosimetry calculations, and treatment response monitoring for optimized therapeutic outcomes.",
    highlights: [
      "Lutetium-177 Therapies",
      "Actinium-225 Alpha Therapy",
      "PSMA-targeted Treatment",
      "Somatostatin Receptor Targeting",
      "Theranostics",
      "Dosimetry Optimization"
    ],
    applications: [
      "Metastatic castration-resistant prostate cancer",
      "Neuroendocrine tumors",
      "Thyroid cancer",
      "Neuroblastoma",
      "Non-Hodgkin lymphoma",
      "Bone metastases palliation"
    ],
    differentiators: [
      "Systemic treatment reaching all metastases",
      "Theranostic approach (diagnose and treat)",
      "AI-optimized dosimetry calculations",
      "Minimal damage to healthy tissue",
      "Applicable to treatment-resistant cancers"
    ],
    url: "https://www.snmmi.org/AboutSNMMI/Content.aspx?ItemNumber=35042",
    references: [
      { title: "VISION Trial Results", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2107322", source: "NEJM" },
      { title: "Theranostics in Nuclear Medicine", url: "https://jnm.snmjournals.org/content/60/9/1209", source: "JNM" },
      { title: "Alpha Particle Therapy Review", url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(21)00089-7/fulltext", source: "Lancet Oncology" }
    ],
    attachments: [
      { title: "Radioligand Therapy Protocols", url: "#", type: "PDF" },
      { title: "Radiation Safety Guidelines", url: "#", type: "PDF" },
      { title: "Patient Monitoring Standards", url: "#", type: "Document" }
    ]
  }
];
