import cellTherapyImg from "@/assets/cellgene-cell-therapy.jpg";
import geneTherapyImg from "@/assets/cellgene-gene-therapy.jpg";
import advancedTherapyImg from "@/assets/cellgene-advanced-therapy.jpg";
import personalizedTherapyImg from "@/assets/cellgene-personalized-therapy.jpg";
import radioligandTherapyImg from "@/assets/cellgene-radioligand-therapy.jpg";

export interface TherapyType {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  image: string;
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
    image: cellTherapyImg,
    shortDescription: "Living cells engineered to treat diseases by replacing, repairing, or enhancing cellular function.",
    fullDescription: "Cell therapy represents a revolutionary approach to medicine where living cells are used as therapeutic agents. These therapies harness the body's own cellular machinery to combat diseases that were previously untreatable. From CAR-T cells targeting cancer to stem cell treatments for degenerative conditions, cell therapy is transforming the landscape of modern medicine.",
    highlights: ["CAR-T Cell Therapy", "Stem Cell Treatments", "NK Cell Therapy", "TIL Therapy", "Mesenchymal Stem Cells", "iPSC-derived Therapies"],
    applications: ["Hematological malignancies (leukemia, lymphoma)", "Solid tumor immunotherapy", "Autoimmune disease modulation", "Tissue regeneration and repair", "Cardiac repair post-infarction", "Neurodegenerative disease treatment"],
    differentiators: ["Living drugs that adapt and persist in the body", "Potential for one-time curative treatments", "Personalized therapy from patient's own cells", "AI-optimized manufacturing processes", "Real-time potency and quality monitoring"],
    url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products",
    references: [
      { title: "FDA Approved Cellular and Gene Therapy Products", url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products", source: "FDA" },
      { title: "Cell Therapy Manufacturing Advances", url: "https://www.nature.com/articles/s41587-022-01571-4", source: "Nature Biotechnology" },
      { title: "CAR-T Cell Therapy Overview", url: "https://www.cancer.gov/about-cancer/treatment/research/car-t-cells", source: "National Cancer Institute" }
    ],
    attachments: [
      { title: "FDA Guidance: CAR-T Cell Therapy", url: "https://www.fda.gov/media/156894/download", type: "PDF" },
      { title: "Cell Therapy Clinical Trial Database", url: "https://clinicaltrials.gov/search?cond=Cell%20Therapy", type: "Database" }
    ]
  },
  {
    id: "gene-therapy",
    title: "Gene Therapy",
    icon: "Dna",
    gradient: "from-blue-500 to-cyan-600",
    image: geneTherapyImg,
    shortDescription: "Modifying genes to treat or prevent disease by correcting genetic defects or introducing therapeutic genes.",
    fullDescription: "Gene therapy offers the unprecedented ability to address diseases at their genetic root. By delivering functional copies of genes, editing defective sequences, or silencing harmful genes, these therapies can provide lasting cures for previously incurable genetic disorders.",
    highlights: ["Gene Replacement", "Gene Editing (CRISPR)", "Gene Silencing", "Viral Vectors (AAV, Lentivirus)", "Non-viral Delivery", "Base Editing"],
    applications: ["Inherited retinal dystrophies", "Spinal muscular atrophy (SMA)", "Hemophilia A and B", "Sickle cell disease", "Beta-thalassemia", "Duchenne muscular dystrophy"],
    differentiators: ["One-time treatment with potential lifelong benefits", "Addresses root cause of genetic diseases", "Precision medicine with targeted delivery", "AI-guided vector design and optimization", "Reduced immunogenicity through engineering"],
    url: "https://www.genome.gov/genetics-glossary/Gene-Therapy",
    references: [
      { title: "Gene Therapy Clinical Trials Database", url: "https://clinicaltrials.gov/search?cond=Gene%20Therapy", source: "ClinicalTrials.gov" },
      { title: "CRISPR-Cas9 Gene Editing Review", url: "https://www.nature.com/articles/s41576-019-0166-5", source: "Nature Reviews Genetics" }
    ],
    attachments: [
      { title: "FDA Gene Therapy Guidance Documents", url: "https://www.fda.gov/vaccines-blood-biologics/biologics-guidances/cellular-gene-therapy-guidances", type: "Guidance" },
      { title: "NIH Gene Therapy Resources", url: "https://www.genome.gov/genetics-glossary/Gene-Therapy", type: "Resource" }
    ]
  },
  {
    id: "advanced-therapy",
    title: "Advanced Therapy",
    icon: "Atom",
    gradient: "from-purple-500 to-violet-600",
    image: advancedTherapyImg,
    shortDescription: "Cutting-edge medicinal products including gene therapy, somatic cell therapy, and tissue-engineered products.",
    fullDescription: "Advanced Therapy Medicinal Products (ATMPs) represent the frontier of pharmaceutical innovation. These complex biologics encompass gene therapies, cell therapies, and tissue-engineered products that offer transformative treatment options.",
    highlights: ["ATMPs Classification", "Combined Products", "Tissue Engineering", "3D Bioprinting", "Organoids", "Xenotransplantation"],
    applications: ["Skin grafts for burn victims", "Cartilage repair and regeneration", "Corneal reconstruction", "Bone tissue engineering", "Vascular grafts", "Organ-on-chip drug testing"],
    differentiators: ["Combines multiple modalities for enhanced efficacy", "Personalized tissue and organ solutions", "AI-driven bioprinting optimization", "Real-time quality assessment", "Scalable manufacturing innovations"],
    url: "https://www.ema.europa.eu/en/human-regulatory/overview/advanced-therapy-medicinal-products-overview",
    references: [
      { title: "EMA ATMP Guidelines", url: "https://www.ema.europa.eu/en/human-regulatory/overview/advanced-therapy-medicinal-products-overview", source: "EMA" },
      { title: "3D Bioprinting in Medicine", url: "https://www.nature.com/articles/s41578-019-0099-2", source: "Nature Materials" }
    ],
    attachments: [
      { title: "EMA ATMP Classification Procedure", url: "https://www.ema.europa.eu/en/human-regulatory/marketing-authorisation/advanced-therapies/advanced-therapy-classification", type: "Procedure" }
    ]
  },
  {
    id: "personalized-therapy",
    title: "Personalized Therapy",
    icon: "Target",
    gradient: "from-emerald-500 to-teal-600",
    image: personalizedTherapyImg,
    shortDescription: "Tailored treatments based on individual genetic, molecular, and clinical profiles for optimal outcomes.",
    fullDescription: "Personalized therapy represents the convergence of genomics, proteomics, and AI to deliver treatments uniquely suited to each patient. By analyzing comprehensive biomarker profiles, genetic variants, and clinical data, these therapies maximize efficacy while minimizing adverse effects.",
    highlights: ["Pharmacogenomics", "Companion Diagnostics", "Biomarker-driven Selection", "Neoantigen Vaccines", "Digital Twins", "Predictive Analytics"],
    applications: ["Oncology precision medicine", "Rare disease treatment optimization", "Drug dosing personalization", "Immunotherapy patient selection", "Preventive health interventions", "Treatment resistance prediction"],
    differentiators: ["Individual patient molecular profiling", "AI-powered outcome prediction", "Continuous treatment optimization", "Reduced adverse events through precision", "Cost-effective targeted interventions"],
    url: "https://www.cancer.gov/about-cancer/treatment/types/precision-medicine",
    references: [
      { title: "All of Us Precision Medicine Initiative", url: "https://allofus.nih.gov/", source: "NIH All of Us" },
      { title: "CPIC Pharmacogenomics Guidelines", url: "https://cpicpgx.org/", source: "CPIC" }
    ],
    attachments: [
      { title: "FDA Precision Medicine Resources", url: "https://www.fda.gov/science-research/science-and-research-special-topics/precision-medicine", type: "Resource" }
    ]
  },
  {
    id: "radioligand-therapy",
    title: "Radioligand Therapy",
    icon: "Radiation",
    gradient: "from-amber-500 to-orange-600",
    image: radioligandTherapyImg,
    shortDescription: "Targeted radiation delivery using molecules that bind specifically to cancer cells for precise tumor destruction.",
    fullDescription: "Radioligand therapy (RLT) combines the targeting precision of molecular medicine with the cell-killing power of radiation. By linking radioactive isotopes to molecules that specifically bind tumor cells, RLT delivers radiation directly to cancer sites while sparing healthy tissue.",
    highlights: ["Lutetium-177 Therapies", "Actinium-225 Alpha Therapy", "PSMA-targeted Treatment", "Somatostatin Receptor Targeting", "Theranostics", "Dosimetry Optimization"],
    applications: ["Metastatic castration-resistant prostate cancer", "Neuroendocrine tumors", "Thyroid cancer", "Neuroblastoma", "Non-Hodgkin lymphoma", "Bone metastases palliation"],
    differentiators: ["Systemic treatment reaching all metastases", "Theranostic approach (diagnose and treat)", "AI-optimized dosimetry calculations", "Minimal damage to healthy tissue", "Applicable to treatment-resistant cancers"],
    url: "https://www.snmmi.org/AboutSNMMI/Content.aspx?ItemNumber=35042",
    references: [
      { title: "VISION Trial Results (Lu-177 PSMA)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2107322", source: "NEJM" },
      { title: "Theranostics in Nuclear Medicine", url: "https://jnm.snmjournals.org/content/60/9/1209", source: "JNM" }
    ],
    attachments: [
      { title: "SNMMI Radioligand Therapy Guidelines", url: "https://www.snmmi.org/ClinicalPractice/content.aspx?ItemNumber=6991", type: "Guidelines" }
    ]
  }
];
