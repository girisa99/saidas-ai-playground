import cellTherapyImg from "@/assets/cellgene-cell-therapy.jpg";
import geneTherapyImg from "@/assets/cellgene-gene-therapy.jpg";
import advancedTherapyImg from "@/assets/cellgene-advanced-therapy.jpg";
import personalizedTherapyImg from "@/assets/cellgene-personalized-therapy.jpg";
import radioligandTherapyImg from "@/assets/cellgene-radioligand-therapy.jpg";

export interface DetailItem {
  name: string;
  description: string;
  keyPoints?: string[];
}

export interface TherapyType {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  highlights: DetailItem[];
  applications: DetailItem[];
  differentiators: DetailItem[];
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
    highlights: [
      {
        name: "CAR-T Cell Therapy",
        description: "Chimeric Antigen Receptor T-cell therapy involves genetically modifying a patient's T cells to express receptors that recognize and attack cancer cells. The T cells are extracted, engineered in a lab to express CARs targeting specific tumor antigens, then infused back into the patient.",
        keyPoints: ["FDA-approved for B-cell malignancies", "Personalized treatment from patient's own cells", "Can achieve complete remission in some patients", "Emerging applications in solid tumors"]
      },
      {
        name: "Stem Cell Treatments",
        description: "Stem cell therapy uses undifferentiated cells with the potential to develop into many different cell types. These can be sourced from bone marrow, adipose tissue, umbilical cord blood, or created from adult cells (iPSCs).",
        keyPoints: ["Hematopoietic stem cells for blood disorders", "Mesenchymal stem cells for tissue repair", "Neural stem cells for neurological conditions", "Cardiac stem cells for heart regeneration"]
      },
      {
        name: "NK Cell Therapy",
        description: "Natural Killer cell therapy harnesses the innate immune system's first-line defenders. NK cells can recognize and destroy cancer cells without prior sensitization, making them powerful anti-cancer agents.",
        keyPoints: ["Can be used allogeneically (from donors)", "Lower risk of graft-versus-host disease", "Effective against various cancer types", "Can be combined with CAR technology (CAR-NK)"]
      },
      {
        name: "TIL Therapy",
        description: "Tumor-Infiltrating Lymphocyte therapy extracts T cells that have naturally invaded a patient's tumor, expands them in the lab, and reinfuses them in large numbers to mount a powerful anti-tumor response.",
        keyPoints: ["Naturally tumor-reactive T cells", "Approved for advanced melanoma", "Personalized to patient's specific tumor", "Can induce durable responses"]
      },
      {
        name: "Mesenchymal Stem Cells",
        description: "MSCs are multipotent stromal cells that can differentiate into various cell types and have powerful immunomodulatory properties. They're being explored for autoimmune diseases, tissue repair, and reducing inflammation.",
        keyPoints: ["Anti-inflammatory properties", "Promote tissue regeneration", "Low immunogenicity allows allogeneic use", "Applications in GvHD, Crohn's disease, osteoarthritis"]
      },
      {
        name: "iPSC-derived Therapies",
        description: "Induced Pluripotent Stem Cells are adult cells reprogrammed to an embryonic-like state, capable of becoming any cell type. This enables creation of patient-specific cells without embryonic stem cells.",
        keyPoints: ["Unlimited cell source potential", "Patient-specific to avoid rejection", "Can generate any cell type needed", "Platform for drug discovery and disease modeling"]
      }
    ],
    applications: [
      {
        name: "Hematological Malignancies",
        description: "Cell therapies have revolutionized treatment for blood cancers including leukemia, lymphoma, and multiple myeloma. CAR-T cells targeting CD19 and BCMA have shown remarkable efficacy in patients who failed multiple prior therapies.",
        keyPoints: ["CAR-T for B-ALL, DLBCL, follicular lymphoma", "BCMA-targeting for multiple myeloma", "Complete response rates of 50-90%", "Potential for long-term remission"]
      },
      {
        name: "Solid Tumor Immunotherapy",
        description: "Extending cell therapy success to solid tumors presents challenges including tumor microenvironment, antigen heterogeneity, and T cell trafficking. Novel approaches include TIL therapy, armored CAR-T cells, and combination strategies.",
        keyPoints: ["TIL therapy for melanoma", "GD2-targeting for neuroblastoma", "Mesothelin-targeting for mesothelioma", "Combination with checkpoint inhibitors"]
      },
      {
        name: "Autoimmune Disease Modulation",
        description: "Cell therapies can reset or modulate the immune system in autoimmune conditions. Regulatory T cells (Tregs) and MSCs can suppress aberrant immune responses while CAR-T targeting autoimmune B cells shows promise.",
        keyPoints: ["CAR-T for lupus showing complete remission", "Treg therapy for type 1 diabetes", "MSCs for multiple sclerosis", "Tolerogenic dendritic cells"]
      },
      {
        name: "Tissue Regeneration and Repair",
        description: "Stem cells and progenitor cells can regenerate damaged tissues, offering hope for conditions with limited treatment options. Applications span orthopedic injuries, wound healing, and organ repair.",
        keyPoints: ["Cartilage repair with chondrocytes", "Skin grafts for burns", "Bone regeneration", "Wound healing acceleration"]
      },
      {
        name: "Cardiac Repair Post-Infarction",
        description: "After heart attack, cell therapies aim to regenerate damaged cardiac tissue. Various cell types including cardiac progenitor cells, MSCs, and iPSC-derived cardiomyocytes are being investigated.",
        keyPoints: ["Improve heart function post-MI", "Reduce scar tissue formation", "Promote angiogenesis", "Multiple ongoing clinical trials"]
      },
      {
        name: "Neurodegenerative Disease Treatment",
        description: "Cell therapies offer hope for conditions like Parkinson's, ALS, and Alzheimer's where neurons are progressively lost. Dopaminergic neurons from stem cells can potentially replace those lost in Parkinson's.",
        keyPoints: ["Dopamine neuron replacement for Parkinson's", "Oligodendrocyte progenitors for MS", "Neural stem cells for ALS", "Retinal cells for macular degeneration"]
      }
    ],
    differentiators: [
      {
        name: "Living Drugs That Adapt",
        description: "Unlike traditional drugs, cell therapies are living entities that can sense their environment, proliferate when needed, and adapt their response. CAR-T cells can expand in vivo when encountering tumor cells and persist as memory cells.",
        keyPoints: ["Dynamic response to disease", "In vivo proliferation and persistence", "Memory cell formation for long-term protection", "Self-amplifying therapeutic effect"]
      },
      {
        name: "Potential for Curative Treatment",
        description: "Cell therapies offer the possibility of one-time treatments that can cure disease rather than managing symptoms. Patients achieving complete remission from CAR-T therapy may never need additional treatment.",
        keyPoints: ["Single infusion treatment paradigm", "Durable complete responses possible", "Eliminates need for chronic therapy", "Cost-effective over patient lifetime"]
      },
      {
        name: "Personalized From Patient's Cells",
        description: "Autologous cell therapies use the patient's own cells, eliminating rejection risk and ensuring perfect HLA matching. This personalization maximizes safety and efficacy for each individual.",
        keyPoints: ["No risk of rejection", "Patient-specific tumor targeting", "Personalized neoantigen recognition", "Optimal safety profile"]
      },
      {
        name: "AI-Optimized Manufacturing",
        description: "Artificial intelligence enhances cell therapy manufacturing through process optimization, quality prediction, and real-time monitoring. AI algorithms can predict cell product potency and optimize expansion protocols.",
        keyPoints: ["Predictive quality control", "Process parameter optimization", "Automated cell counting and viability", "Reduced manufacturing failures"]
      },
      {
        name: "Real-Time Quality Monitoring",
        description: "Advanced analytics enable continuous monitoring of cell therapy products throughout manufacturing. This ensures consistent quality and allows intervention before batch failures.",
        keyPoints: ["Continuous process monitoring", "Early detection of deviations", "Release testing automation", "Digital batch records"]
      }
    ],
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
    highlights: [
      {
        name: "Gene Replacement",
        description: "Gene replacement therapy delivers a functional copy of a defective gene to cells. This is particularly effective for recessive disorders where adding one working copy can restore normal function.",
        keyPoints: ["Delivers functional gene copy", "Does not remove defective gene", "Uses viral vectors for delivery", "FDA-approved examples: Luxturna, Zolgensma"]
      },
      {
        name: "Gene Editing (CRISPR)",
        description: "CRISPR-Cas9 and related technologies enable precise editing of DNA sequences. Unlike gene addition, editing can correct mutations in place, disable harmful genes, or insert new genetic material at specific locations.",
        keyPoints: ["Precise DNA cutting and editing", "Can correct point mutations", "Base editing for single nucleotide changes", "Prime editing for insertions/deletions"]
      },
      {
        name: "Gene Silencing",
        description: "RNA interference (RNAi) and antisense oligonucleotides can silence harmful genes without editing DNA. These approaches reduce expression of disease-causing proteins.",
        keyPoints: ["siRNA for targeted gene knockdown", "Antisense oligonucleotides (ASOs)", "FDA-approved: Onpattro, Spinraza", "Reversible compared to gene editing"]
      },
      {
        name: "Viral Vectors (AAV, Lentivirus)",
        description: "Viral vectors are the workhorses of gene delivery. Adeno-associated virus (AAV) and lentivirus are engineered to safely deliver therapeutic genes to target cells.",
        keyPoints: ["AAV: Non-integrating, many serotypes", "Lentivirus: Integrating, large cargo capacity", "Tropism engineering for tissue targeting", "Manufacturing advances reducing costs"]
      },
      {
        name: "Non-viral Delivery",
        description: "Lipid nanoparticles, polymer systems, and physical methods offer alternatives to viral vectors. These approaches can reduce immunogenicity and enable repeat dosing.",
        keyPoints: ["Lipid nanoparticles for mRNA/siRNA", "Electroporation for cell therapy", "Lower immunogenicity than viruses", "Enables redosing strategies"]
      },
      {
        name: "Base Editing",
        description: "Base editors enable precise single-nucleotide changes without double-strand DNA breaks. This reduces off-target effects and enables correction of point mutations.",
        keyPoints: ["C-to-T and A-to-G conversions", "No double-strand breaks", "Lower off-target editing", "Clinical trials beginning"]
      }
    ],
    applications: [
      {
        name: "Inherited Retinal Dystrophies",
        description: "Luxturna was the first FDA-approved gene therapy for genetic disease, treating RPE65-associated retinal dystrophy. Subretinal injection delivers AAV carrying functional RPE65 gene to restore vision.",
        keyPoints: ["Luxturna approved 2017", "Single subretinal injection", "Restores functional vision", "Model for other eye disorders"]
      },
      {
        name: "Spinal Muscular Atrophy (SMA)",
        description: "Zolgensma delivers the SMN1 gene via AAV9, providing a one-time treatment for this devastating neuromuscular disease. Early treatment before symptom onset yields best outcomes.",
        keyPoints: ["Single IV infusion treatment", "AAV9 crosses blood-brain barrier", "Best outcomes with early treatment", "Newborn screening enables early intervention"]
      },
      {
        name: "Hemophilia A and B",
        description: "Gene therapy can provide sustained clotting factor production, potentially freeing patients from frequent infusions. Multiple products in development showing multi-year factor expression.",
        keyPoints: ["AAV delivery of Factor VIII or IX", "Sustained factor expression", "Reduces/eliminates bleeding episodes", "Hemgenix approved for Hemophilia B"]
      },
      {
        name: "Sickle Cell Disease",
        description: "Gene therapy and gene editing approaches can increase fetal hemoglobin or correct the sickle cell mutation. Recent approvals mark breakthrough treatments for this painful disease.",
        keyPoints: ["Casgevy: First CRISPR therapy approved", "Lyfgenia: Lentiviral gene addition", "Increases fetal hemoglobin production", "Eliminates vaso-occlusive crises"]
      },
      {
        name: "Beta-Thalassemia",
        description: "Similar approaches to sickle cell disease can treat beta-thalassemia by boosting fetal hemoglobin or correcting mutations. Patients may achieve transfusion independence.",
        keyPoints: ["Zynteglo approved in EU", "Reduces/eliminates transfusion need", "CRISPR approaches in development", "Improves quality of life significantly"]
      },
      {
        name: "Duchenne Muscular Dystrophy",
        description: "Gene therapy for DMD delivers shortened but functional dystrophin genes (micro-dystrophin) due to the large size of the full gene. Exon skipping approaches also show promise.",
        keyPoints: ["Micro-dystrophin gene delivery", "AAV vectors for muscle targeting", "Exon skipping ASOs approved", "Multiple clinical trials ongoing"]
      }
    ],
    differentiators: [
      {
        name: "One-Time Lifelong Treatment",
        description: "Gene therapy can provide lasting benefits from a single treatment by permanently adding or editing genes. This contrasts with chronic therapies requiring lifelong administration.",
        keyPoints: ["Single administration paradigm", "Durable gene expression", "Reduces treatment burden", "Potential lifetime cost savings"]
      },
      {
        name: "Addresses Root Cause",
        description: "Rather than treating symptoms, gene therapy corrects the underlying genetic defect. This can prevent disease progression and complications.",
        keyPoints: ["Corrects genetic mutations", "Prevents disease progression", "May reverse existing damage", "True disease modification"]
      },
      {
        name: "Precision Targeted Delivery",
        description: "Vector engineering enables targeting specific tissues and cell types. AAV serotypes and engineered capsids direct therapy to where it's needed.",
        keyPoints: ["Tissue-specific promoters", "Engineered capsids for targeting", "Reduced off-target effects", "Optimized biodistribution"]
      },
      {
        name: "AI-Guided Vector Design",
        description: "Machine learning accelerates vector optimization, predicting capsid properties, tropism, and immunogenicity. This speeds development and improves safety.",
        keyPoints: ["Capsid library screening", "Immunogenicity prediction", "Tissue targeting optimization", "Manufacturing optimization"]
      },
      {
        name: "Reduced Immunogenicity",
        description: "Engineering approaches reduce immune responses to vectors, potentially enabling redosing or treatment of patients with pre-existing antibodies.",
        keyPoints: ["Capsid engineering to evade antibodies", "Immunosuppression protocols", "Alternative delivery routes", "Next-generation vectors"]
      }
    ],
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
    highlights: [
      {
        name: "ATMPs Classification",
        description: "The European Medicines Agency classifies ATMPs into four categories: gene therapy, somatic cell therapy, tissue-engineered products, and combined ATMPs. Each has specific regulatory requirements.",
        keyPoints: ["Gene therapy medicinal products", "Somatic cell therapy products", "Tissue-engineered products", "Combined ATMPs with medical devices"]
      },
      {
        name: "Combined Products",
        description: "Combined ATMPs integrate cells or tissues with medical devices or scaffolds. These create functional constructs that can replace or regenerate damaged tissues.",
        keyPoints: ["Cells plus scaffold combinations", "Device-tissue integration", "Enhanced functional outcomes", "Complex regulatory pathway"]
      },
      {
        name: "Tissue Engineering",
        description: "Tissue engineering combines cells, scaffolds, and bioactive molecules to create functional tissue replacements. Applications range from skin grafts to complex organ structures.",
        keyPoints: ["Scaffold-based approaches", "Decellularized matrix use", "Growth factor incorporation", "Vascularization strategies"]
      },
      {
        name: "3D Bioprinting",
        description: "Bioprinting deposits cells and biomaterials in precise patterns to create complex 3D structures. This technology enables fabrication of tissues with physiologically relevant architecture.",
        keyPoints: ["Layer-by-layer construction", "Multiple cell type printing", "Vascular network creation", "Personalized implant design"]
      },
      {
        name: "Organoids",
        description: "Organoids are self-organizing 3D structures derived from stem cells that recapitulate organ function. They serve as disease models, drug testing platforms, and potential transplant sources.",
        keyPoints: ["Self-organizing structures", "Recapitulate organ function", "Drug screening applications", "Personalized medicine models"]
      },
      {
        name: "Xenotransplantation",
        description: "Xenotransplantation uses organs, tissues, or cells from animals (typically pigs) for human transplantation. Gene editing reduces rejection and eliminates zoonotic risks.",
        keyPoints: ["Genetically modified pig organs", "CRISPR removes rejection antigens", "Addresses organ shortage crisis", "Recent breakthrough transplants"]
      }
    ],
    applications: [
      {
        name: "Skin Grafts for Burn Victims",
        description: "Cultured epidermal autografts and tissue-engineered skin products provide coverage for burn patients. These can be grown from small biopsies to cover large burn areas.",
        keyPoints: ["Cultured keratinocyte sheets", "Dermal substitutes", "Bilayer skin constructs", "Reduces scarring and infection"]
      },
      {
        name: "Cartilage Repair and Regeneration",
        description: "Autologous chondrocyte implantation and matrix-assisted approaches repair damaged cartilage. These treatments can restore joint function and delay or prevent joint replacement.",
        keyPoints: ["ACI and MACI procedures", "Scaffold-based implants", "MSC-based approaches", "Delays joint replacement surgery"]
      },
      {
        name: "Corneal Reconstruction",
        description: "Limbal stem cell therapy and tissue-engineered corneal constructs can restore vision in patients with corneal damage. Holoclar was the first ATMP approved in Europe.",
        keyPoints: ["Limbal stem cell transplant", "Holoclar for burns/injury", "Amniotic membrane scaffolds", "Restores corneal surface"]
      },
      {
        name: "Bone Tissue Engineering",
        description: "Bone grafts combining cells, growth factors, and scaffolds promote healing of critical-size defects. These approaches reduce need for autograft harvest.",
        keyPoints: ["Ceramic and polymer scaffolds", "BMP growth factors", "MSC-seeded constructs", "Large defect reconstruction"]
      },
      {
        name: "Vascular Grafts",
        description: "Tissue-engineered blood vessels provide alternatives to synthetic grafts, particularly for smaller diameter vessels where synthetics fail. These can be created from patient cells.",
        keyPoints: ["Cell-seeded scaffolds", "Decellularized vessels", "3D printed vasculature", "Improved patency rates"]
      },
      {
        name: "Organ-on-Chip Drug Testing",
        description: "Microfluidic devices with human cells recreate organ function for drug testing. These reduce animal testing and better predict human responses.",
        keyPoints: ["Lung, liver, heart on chip", "Multi-organ systems", "Personalized drug testing", "Accelerates drug development"]
      }
    ],
    differentiators: [
      {
        name: "Multi-Modality Combination",
        description: "ATMPs can combine multiple therapeutic approaches - cells, genes, scaffolds, and devices - for enhanced efficacy that single modalities cannot achieve.",
        keyPoints: ["Synergistic therapeutic effects", "Addresses multiple disease aspects", "Customizable combinations", "Enhanced functional outcomes"]
      },
      {
        name: "Personalized Tissue Solutions",
        description: "ATMPs can be manufactured from patient's own cells, ensuring immunological compatibility and personalized fit for the patient's specific anatomy.",
        keyPoints: ["Autologous cell sourcing", "Patient-specific design", "Perfect immunological match", "Customized to anatomy"]
      },
      {
        name: "AI-Driven Bioprinting",
        description: "Artificial intelligence optimizes bioprinting parameters, predicts printability, and designs complex structures. This accelerates development and improves outcomes.",
        keyPoints: ["Print parameter optimization", "Structure design automation", "Quality prediction", "Process monitoring"]
      },
      {
        name: "Real-Time Quality Assessment",
        description: "Advanced imaging and sensing technologies enable non-destructive quality assessment of ATMPs during and after manufacturing.",
        keyPoints: ["Non-destructive testing", "Live/dead cell assessment", "Structural integrity analysis", "Release criteria automation"]
      },
      {
        name: "Scalable Manufacturing",
        description: "Innovations in bioreactor design, automation, and process control are enabling scale-up of ATMP manufacturing from bench to commercial production.",
        keyPoints: ["Automated bioreactors", "Closed system processing", "Process analytical technology", "Cost reduction strategies"]
      }
    ],
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
    highlights: [
      {
        name: "Pharmacogenomics",
        description: "Pharmacogenomics studies how genetic variations affect drug response. Testing for these variants enables selection of the right drug and dose for each patient's genetic makeup.",
        keyPoints: ["CYP450 enzyme variants", "Drug metabolism prediction", "Dosing optimization", "Adverse event prevention"]
      },
      {
        name: "Companion Diagnostics",
        description: "Companion diagnostics are tests that identify patients likely to benefit from specific therapies. They're often required for targeted cancer drugs and biologics.",
        keyPoints: ["Required for drug approval", "Identifies responders", "Guides treatment selection", "Examples: HER2, EGFR, PD-L1 testing"]
      },
      {
        name: "Biomarker-driven Selection",
        description: "Biomarkers guide treatment selection by identifying molecular characteristics that predict response. This moves beyond one-size-fits-all to stratified medicine.",
        keyPoints: ["Predictive biomarkers", "Prognostic markers", "Treatment monitoring", "Resistance detection"]
      },
      {
        name: "Neoantigen Vaccines",
        description: "Personalized cancer vaccines target neoantigens - unique mutations in a patient's tumor. These train the immune system to recognize and attack the specific cancer.",
        keyPoints: ["Tumor sequencing identifies targets", "Individualized vaccine production", "Combined with checkpoint inhibitors", "Clinical trials showing promise"]
      },
      {
        name: "Digital Twins",
        description: "Digital twins are computational models that simulate individual patient biology. These enable virtual testing of treatments to predict outcomes before real administration.",
        keyPoints: ["Patient-specific simulations", "Treatment outcome prediction", "Dosing optimization", "Side effect prediction"]
      },
      {
        name: "Predictive Analytics",
        description: "Machine learning algorithms analyze patient data to predict treatment outcomes, disease progression, and optimal intervention timing.",
        keyPoints: ["Outcome prediction models", "Risk stratification", "Treatment sequence optimization", "Real-time decision support"]
      }
    ],
    applications: [
      {
        name: "Oncology Precision Medicine",
        description: "Cancer treatment has been transformed by molecular profiling. Targeted therapies matched to tumor mutations achieve better outcomes with fewer side effects than traditional chemotherapy.",
        keyPoints: ["Next-generation sequencing", "Targeted therapy matching", "Basket and umbrella trials", "Pan-cancer approaches"]
      },
      {
        name: "Rare Disease Treatment",
        description: "Precision medicine is particularly powerful for rare diseases, where individual patients may have unique mutations requiring tailored approaches including n-of-1 therapies.",
        keyPoints: ["Individual mutation targeting", "N-of-1 antisense therapies", "Gene therapy customization", "Accelerated development pathways"]
      },
      {
        name: "Drug Dosing Personalization",
        description: "Genetic testing and therapeutic drug monitoring enable personalized dosing to achieve optimal drug levels while avoiding toxicity.",
        keyPoints: ["Pharmacogenomic testing", "Therapeutic drug monitoring", "Model-informed dosing", "Reduced adverse events"]
      },
      {
        name: "Immunotherapy Patient Selection",
        description: "Biomarkers like PD-L1 expression, tumor mutational burden, and microsatellite instability help identify patients most likely to respond to checkpoint inhibitors.",
        keyPoints: ["PD-L1 expression testing", "TMB assessment", "MSI-H/dMMR testing", "Composite biomarker scores"]
      },
      {
        name: "Preventive Health Interventions",
        description: "Genetic risk assessment enables proactive interventions before disease develops. Examples include BRCA testing for cancer risk and polygenic risk scores for common diseases.",
        keyPoints: ["Hereditary cancer testing", "Polygenic risk scores", "Lifestyle modification guidance", "Screening recommendations"]
      },
      {
        name: "Treatment Resistance Prediction",
        description: "Liquid biopsy and molecular monitoring can detect emerging resistance mutations, enabling proactive therapy switches before clinical progression.",
        keyPoints: ["Circulating tumor DNA monitoring", "Resistance mutation detection", "Early therapy switching", "Improved long-term outcomes"]
      }
    ],
    differentiators: [
      {
        name: "Individual Molecular Profiling",
        description: "Comprehensive molecular analysis of each patient's disease provides the foundation for truly personalized treatment. This includes genomics, transcriptomics, proteomics, and metabolomics.",
        keyPoints: ["Multi-omic profiling", "Tumor and germline analysis", "Pathway activation mapping", "Dynamic monitoring"]
      },
      {
        name: "AI-Powered Prediction",
        description: "Artificial intelligence synthesizes complex patient data to predict optimal treatments and outcomes with accuracy beyond human capability.",
        keyPoints: ["Machine learning models", "Integration of diverse data", "Continuous learning", "Clinical decision support"]
      },
      {
        name: "Continuous Optimization",
        description: "Treatment is continuously optimized based on response monitoring and evolving understanding of the patient's disease, not fixed at initial diagnosis.",
        keyPoints: ["Real-time monitoring", "Adaptive therapy", "Response-guided changes", "Learning health systems"]
      },
      {
        name: "Reduced Adverse Events",
        description: "By matching treatments to patients most likely to respond, precision medicine reduces exposure to ineffective therapies and their associated side effects.",
        keyPoints: ["Avoiding ineffective treatments", "Pharmacogenomic safety", "Better risk-benefit ratio", "Improved quality of life"]
      },
      {
        name: "Cost-Effective Targeting",
        description: "Despite higher upfront testing costs, precision medicine can be more cost-effective by avoiding ineffective treatments and complications.",
        keyPoints: ["Reduced failed therapy costs", "Earlier effective treatment", "Prevention of complications", "Value-based healthcare alignment"]
      }
    ],
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
    highlights: [
      {
        name: "Lutetium-177 Therapies",
        description: "Lutetium-177 is a beta-emitting radioisotope ideal for therapy due to its range (penetrates ~2mm of tissue) and half-life (6.7 days). It's used in Pluvicto for prostate cancer and Lutathera for NETs.",
        keyPoints: ["Beta particle emission", "Optimal tissue penetration", "FDA-approved products available", "Suitable for bulky tumors"]
      },
      {
        name: "Actinium-225 Alpha Therapy",
        description: "Actinium-225 emits alpha particles that cause dense DNA damage over short distances. This makes it highly effective for micrometastatic disease while sparing surrounding tissue.",
        keyPoints: ["High linear energy transfer", "Short range limits collateral damage", "Effective for micrometastases", "Overcomes some resistance mechanisms"]
      },
      {
        name: "PSMA-targeted Treatment",
        description: "Prostate-Specific Membrane Antigen (PSMA) is highly expressed on prostate cancer cells. PSMA-targeted radioligands can diagnose and treat prostate cancer (theranostic approach).",
        keyPoints: ["Highly specific for prostate cancer", "Same target for imaging and therapy", "Pluvicto FDA-approved 2022", "Multiple agents in development"]
      },
      {
        name: "Somatostatin Receptor Targeting",
        description: "Neuroendocrine tumors express somatostatin receptors that can be targeted with radioligands. Lutathera targets SSTR2 to treat gastroenteropancreatic NETs.",
        keyPoints: ["SSTR2 targeting", "Lutathera FDA-approved 2018", "Also used for diagnosis (Ga-68)", "Significant survival benefit"]
      },
      {
        name: "Theranostics",
        description: "Theranostics combines diagnostics and therapeutics using the same targeting molecule with different isotopes. Diagnostic scans confirm target presence before therapeutic treatment.",
        keyPoints: ["Diagnose before treating", "Patient selection optimization", "Response monitoring", "Personalized dosimetry"]
      },
      {
        name: "Dosimetry Optimization",
        description: "Personalized dosimetry uses imaging to calculate radiation dose to tumors and organs for each patient. This enables maximizing tumor dose while protecting critical organs.",
        keyPoints: ["Patient-specific dose calculation", "Organ-at-risk protection", "Treatment planning optimization", "AI-enhanced dose prediction"]
      }
    ],
    applications: [
      {
        name: "Metastatic Prostate Cancer",
        description: "PSMA-targeted radioligand therapy (Pluvicto) has shown significant survival benefit in metastatic castration-resistant prostate cancer after prior treatments. It represents a major advance for this common cancer.",
        keyPoints: ["Pluvicto for mCRPC", "VISION trial showed survival benefit", "Post-taxane and anti-androgen", "Growing earlier-line studies"]
      },
      {
        name: "Neuroendocrine Tumors",
        description: "Lutathera has transformed treatment of gastroenteropancreatic neuroendocrine tumors expressing somatostatin receptors. It provides significant progression-free survival benefit.",
        keyPoints: ["Lutathera for GEP-NETs", "NETTER-1 trial success", "4 doses, 8 weeks apart", "Quality of life improvement"]
      },
      {
        name: "Thyroid Cancer",
        description: "Radioactive iodine (I-131) therapy for thyroid cancer is one of the oldest and most successful radioligand therapies. Thyroid cells naturally take up iodine, enabling targeted treatment.",
        keyPoints: ["I-131 for differentiated thyroid cancer", "Post-surgical ablation", "Metastatic disease treatment", "Decades of clinical experience"]
      },
      {
        name: "Neuroblastoma",
        description: "MIBG (meta-iodobenzylguanidine) labeled with I-131 targets norepinephrine transporters on neuroblastoma cells. Azedra is FDA-approved for unresectable pheochromocytoma/paraganglioma.",
        keyPoints: ["I-131 MIBG therapy", "Targets norepinephrine uptake", "Pediatric neuroblastoma trials", "Azedra for pheochromocytoma"]
      },
      {
        name: "Non-Hodgkin Lymphoma",
        description: "Radioimmunotherapy combines antibodies with radioisotopes to treat lymphoma. Zevalin (Y-90 ibritumomab) targets CD20 on B-cell lymphomas.",
        keyPoints: ["CD20-targeted radioimmunotherapy", "Zevalin approved 2002", "Single dose treatment", "High response rates"]
      },
      {
        name: "Bone Metastases Palliation",
        description: "Radium-223 (Xofigo) targets bone metastases in prostate cancer, providing both survival benefit and pain relief. Its alpha particles effectively treat bone lesions.",
        keyPoints: ["Alpha emitter for bone", "Radium-223 FDA-approved", "Survival and pain benefit", "Bone-seeking mechanism"]
      }
    ],
    differentiators: [
      {
        name: "Systemic Metastasis Treatment",
        description: "Unlike external beam radiation, radioligand therapy is administered systemically and seeks out metastases throughout the body. This enables treatment of widespread disease.",
        keyPoints: ["Treats all sites simultaneously", "Reaches microscopic disease", "No need to identify all lesions", "Whole-body treatment approach"]
      },
      {
        name: "Theranostic Approach",
        description: "The same targeting molecule can be used for both diagnosis and therapy by changing the radioisotope. This enables patient selection and response monitoring.",
        keyPoints: ["Confirm target expression first", "Select likely responders", "Monitor treatment response", "Personalized treatment planning"]
      },
      {
        name: "AI-Optimized Dosimetry",
        description: "Artificial intelligence enhances dosimetry calculations, predicting organ doses and optimizing treatment plans for maximum efficacy and safety.",
        keyPoints: ["Automated dose calculation", "Organ dose prediction", "Treatment optimization", "Safety monitoring"]
      },
      {
        name: "Minimal Healthy Tissue Damage",
        description: "Targeted delivery concentrates radiation at tumor sites while limiting exposure to healthy organs. This is especially true for alpha emitters with their short range.",
        keyPoints: ["Tumor-selective accumulation", "Limited bystander damage", "Alpha particles: high precision", "Manageable side effect profile"]
      },
      {
        name: "Treatment-Resistant Cancer",
        description: "Radioligand therapy can be effective in cancers that have become resistant to other treatments. The mechanism of cell killing differs from chemotherapy or targeted agents.",
        keyPoints: ["Alternative mechanism of action", "Overcomes some resistance", "Effective after multiple prior therapies", "Option when others fail"]
      }
    ],
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
