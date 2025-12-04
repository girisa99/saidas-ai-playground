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
        name: "vs. Traditional Oncology",
        description: "Unlike conventional chemotherapy or targeted therapies that require repeated dosing, CAR-T and other cell therapies offer one-time treatments. Traditional oncology drugs kill rapidly dividing cells non-specifically, while cell therapies precisely target tumor antigens with living cells that persist and adapt.",
        keyPoints: ["One-time infusion vs. repeated cycles", "Living cells vs. static molecules", "Adaptive immune memory vs. no memory", "Potential cure vs. disease management"]
      },
      {
        name: "vs. Cardiology Treatments",
        description: "Cardiac medications (beta-blockers, ACE inhibitors, statins) manage symptoms and slow progression but cannot regenerate damaged heart tissue. Cell therapy using cardiac stem cells or iPSC-derived cardiomyocytes aims to actually repair and regenerate heart muscle after infarction.",
        keyPoints: ["Regeneration vs. symptom management", "Tissue repair vs. pharmacological support", "Potential reversal vs. disease slowing", "One-time treatment vs. lifelong medication"]
      },
      {
        name: "vs. Infectious Disease Drugs",
        description: "Antibiotics and antivirals target pathogens directly and require full treatment courses. Cell therapies can create lasting immunity or repair immune deficiencies. CAR-T has been explored for HIV, potentially offering functional cure vs. lifelong antiretroviral therapy.",
        keyPoints: ["Immune system enhancement vs. direct pathogen attack", "Durable protection vs. treatment courses", "Addresses chronic infections differently", "Potential functional cures"]
      },
      {
        name: "vs. Autoimmune Treatments",
        description: "Traditional immunosuppressants broadly suppress the immune system, increasing infection risk. CAR-T targeting autoimmune B cells or Treg therapies can selectively reset immune dysregulation, potentially achieving drug-free remission in lupus and other autoimmune diseases.",
        keyPoints: ["Selective immune reset vs. broad suppression", "Drug-free remission potential", "Addresses root cause of autoimmunity", "Lower long-term infection risk"]
      },
      {
        name: "Manufacturing Complexity",
        description: "Unlike pills or injectable biologics made in large batches, cell therapies often require patient-specific manufacturing with strict chain-of-custody, specialized facilities, and rapid turnaround. This creates unique supply chain and cost challenges that traditional pharma doesn't face.",
        keyPoints: ["Patient-specific vs. batch manufacturing", "Living product vs. stable molecules", "Cold chain logistics critical", "Higher manufacturing complexity and cost"]
      }
    ],
    url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products",
    references: [
      { title: "FDA Approved Cellular and Gene Therapy Products", url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/approved-cellular-and-gene-therapy-products", source: "FDA" },
      { title: "Cell Therapy Manufacturing Advances", url: "https://www.nature.com/articles/s41587-022-01571-4", source: "Nature Biotechnology" },
      { title: "CAR-T Cell Therapy Overview", url: "https://www.cancer.gov/about-cancer/treatment/research/car-t-cells", source: "National Cancer Institute" },
      { title: "Cell Therapy in Autoimmune Disease", url: "https://www.nature.com/articles/s41591-023-02536-z", source: "Nature Medicine" },
      { title: "Solid Tumor CAR-T Development", url: "https://www.cell.com/cancer-cell/fulltext/S1535-6108(23)00329-X", source: "Cancer Cell" }
    ],
    attachments: [
      { title: "FDA Guidance: CAR-T Cell Therapy", url: "https://www.fda.gov/media/156894/download", type: "PDF" },
      { title: "Cell Therapy Clinical Trial Database", url: "https://clinicaltrials.gov/search?cond=Cell%20Therapy", type: "Database" },
      { title: "ISCT Cell Therapy Standards", url: "https://isctglobal.org/standards/", type: "Standards" },
      { title: "ARM Gene, Cell & RNA Therapy Landscape", url: "https://alliancerm.org/sector-report/", type: "Report" }
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
        name: "vs. Traditional Oncology",
        description: "Chemotherapy attacks rapidly dividing cells indiscriminately, requiring repeated cycles. Gene therapy can permanently modify cancer cells or immune cells to fight cancer. Oncolytic viruses selectively infect and destroy cancer cells while sparing normal tissue.",
        keyPoints: ["Permanent genetic modification vs. temporary effects", "Selective targeting vs. broad toxicity", "Potential one-time vs. repeated dosing", "Addresses genetic drivers directly"]
      },
      {
        name: "vs. Chronic Disease Medications",
        description: "Conditions like hemophilia require lifelong factor replacement infusions. Gene therapy delivering the missing gene (e.g., Hemgenix for Factor IX) can provide years of endogenous factor production from a single treatment, transforming disease management.",
        keyPoints: ["Endogenous production vs. exogenous replacement", "Single treatment vs. lifelong infusions", "Natural physiological levels", "Freedom from treatment burden"]
      },
      {
        name: "vs. Neurological Drugs",
        description: "Neurodegenerative diseases like Parkinson's are managed with dopamine replacement (L-DOPA) that loses efficacy over time. Gene therapy delivering genes for dopamine production or protective factors could provide sustained benefit without dose-limiting side effects.",
        keyPoints: ["Targeted CNS delivery", "Sustained therapeutic effect", "Addresses progression vs. symptom masking", "Potential disease modification"]
      },
      {
        name: "vs. Rare Disease Treatments",
        description: "Many rare genetic diseases have no treatment or only enzyme replacement therapy requiring frequent infusions. Gene therapy provides the missing gene, enabling the body to produce the enzyme itself continuously.",
        keyPoints: ["Produces missing proteins naturally", "One-time vs. lifelong ERT", "Better tissue penetration", "Potentially curative"]
      },
      {
        name: "Manufacturing & Delivery Complexity",
        description: "Unlike small molecules or even antibodies, gene therapy requires specialized vector manufacturing, complex quality testing, and often specialized administration (intrathecal, subretinal). This creates unique challenges distinct from traditional pharma.",
        keyPoints: ["Vector manufacturing expertise required", "Specialized administration routes", "Complex release testing", "Cold chain and stability challenges"]
      }
    ],
    url: "https://www.genome.gov/genetics-glossary/Gene-Therapy",
    references: [
      { title: "Gene Therapy Clinical Trials Database", url: "https://clinicaltrials.gov/search?cond=Gene%20Therapy", source: "ClinicalTrials.gov" },
      { title: "CRISPR-Cas9 Gene Editing Review", url: "https://www.nature.com/articles/s41576-019-0166-5", source: "Nature Reviews Genetics" },
      { title: "Gene Therapy in Neurology", url: "https://www.nature.com/articles/s41582-021-00588-8", source: "Nature Reviews Neurology" }
    ],
    attachments: [
      { title: "FDA Gene Therapy Guidance Documents", url: "https://www.fda.gov/vaccines-blood-biologics/biologics-guidances/cellular-gene-therapy-guidances", type: "Guidance" },
      { title: "NIH Gene Therapy Resources", url: "https://www.genome.gov/genetics-glossary/Gene-Therapy", type: "Resource" },
      { title: "ASGCT Gene Therapy Pipeline", url: "https://asgct.org/research/news/november-2023/gene-cell-and-rna-therapy-landscape", type: "Database" }
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
        name: "vs. Traditional Surgery",
        description: "Conventional surgery uses prosthetics or donor tissue with rejection risks. Tissue-engineered products using patient's own cells create biocompatible, living replacements that integrate and grow with the body, potentially lasting a lifetime.",
        keyPoints: ["Living tissue vs. synthetic prosthetics", "No rejection risk with autologous", "Grows and adapts with patient", "True biological integration"]
      },
      {
        name: "vs. Transplantation",
        description: "Organ transplants face donor shortages and lifelong immunosuppression. ATMPs like engineered tissues, xenotransplants, and bioprinted organs could provide unlimited supply without immunosuppression, addressing the transplant waiting list crisis.",
        keyPoints: ["Unlimited supply potential", "No donor dependency", "Reduced/eliminated immunosuppression", "Personalized to patient"]
      },
      {
        name: "vs. Regenerative Injections (PRP, etc.)",
        description: "PRP and simple cell injections have limited evidence and passive mechanisms. Advanced tissue engineering provides structured, functional tissue replacements with proven efficacy for cartilage repair, skin grafts, and more.",
        keyPoints: ["Structured tissue vs. cell suspensions", "Proven clinical efficacy", "Regulatory-approved products", "Defined manufacturing processes"]
      },
      {
        name: "vs. Medical Devices",
        description: "Implantable devices have finite lifespans and foreign body responses. Tissue-engineered products integrate biologically, reducing complications like infection, wear, and the need for revision surgeries.",
        keyPoints: ["Biological vs. mechanical function", "Self-healing potential", "Reduced foreign body response", "Potentially permanent solution"]
      },
      {
        name: "Regulatory & Manufacturing Distinction",
        description: "ATMPs require specialized regulatory pathways (EMA's ATMP classification, FDA's RMAT) and manufacturing that combines pharma GMP with tissue processing expertise. This creates unique development and commercial challenges.",
        keyPoints: ["Specialized regulatory pathways", "Combined pharma + tissue expertise", "Hospital exemption considerations", "Complex supply chain requirements"]
      }
    ],
    url: "https://www.ema.europa.eu/en/human-regulatory/overview/advanced-therapy-medicinal-products-overview",
    references: [
      { title: "EMA ATMP Guidelines", url: "https://www.ema.europa.eu/en/human-regulatory/overview/advanced-therapy-medicinal-products-overview", source: "EMA" },
      { title: "3D Bioprinting in Medicine", url: "https://www.nature.com/articles/s41578-019-0099-2", source: "Nature Materials" },
      { title: "Xenotransplantation Progress", url: "https://www.nature.com/articles/s41591-022-01755-6", source: "Nature Medicine" }
    ],
    attachments: [
      { title: "EMA ATMP Classification Procedure", url: "https://www.ema.europa.eu/en/human-regulatory/marketing-authorisation/advanced-therapies/advanced-therapy-classification", type: "Procedure" },
      { title: "FDA RMAT Designation", url: "https://www.fda.gov/vaccines-blood-biologics/cellular-gene-therapy-products/regenerative-medicine-advanced-therapy-designation", type: "Guidance" },
      { title: "ISSCR Guidelines for Stem Cell Research", url: "https://www.isscr.org/guidelines", type: "Guidelines" }
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
        name: "vs. One-Size-Fits-All Medicine",
        description: "Traditional medicine gives the same treatment to all patients with a diagnosis. Precision medicine recognizes that two patients with 'breast cancer' may have completely different molecular drivers requiring different treatments.",
        keyPoints: ["Molecular subtyping guides therapy", "Right drug for right patient", "Avoids ineffective treatments", "Higher response rates"]
      },
      {
        name: "vs. Trial-and-Error Prescribing",
        description: "Conventional prescribing often involves trying multiple drugs until one works. Pharmacogenomics and biomarkers enable selecting the most likely effective therapy upfront, reducing time to effective treatment.",
        keyPoints: ["Evidence-based drug selection", "Reduced treatment failures", "Faster time to response", "Lower healthcare costs"]
      },
      {
        name: "vs. Population-Based Dosing",
        description: "Standard dosing assumes average drug metabolism. Precision dosing accounts for individual variations in drug metabolism (CYP450 variants) to optimize efficacy while minimizing toxicity.",
        keyPoints: ["Individualized dose optimization", "Genetic metabolism prediction", "Reduced adverse events", "Therapeutic drug monitoring"]
      },
      {
        name: "vs. Reactive Medicine",
        description: "Traditional medicine treats disease after it develops. Precision prevention uses genetic risk scores and biomarkers to identify high-risk individuals for proactive intervention before disease onset.",
        keyPoints: ["Predictive risk assessment", "Early intervention opportunity", "Prevention over treatment", "Reduced disease burden"]
      },
      {
        name: "Data & AI Infrastructure Requirements",
        description: "Precision medicine requires robust data infrastructure—genomic databases, EHR integration, AI algorithms, and real-time analytics—that differs significantly from traditional clinical workflows.",
        keyPoints: ["Multi-omic data integration", "AI/ML interpretation tools", "Clinical decision support systems", "Continuous learning systems"]
      }
    ],
    url: "https://www.cancer.gov/about-cancer/treatment/types/precision-medicine",
    references: [
      { title: "All of Us Precision Medicine Initiative", url: "https://allofus.nih.gov/", source: "NIH All of Us" },
      { title: "CPIC Pharmacogenomics Guidelines", url: "https://cpicpgx.org/", source: "CPIC" },
      { title: "Precision Oncology Review", url: "https://www.nature.com/articles/s41571-021-00578-1", source: "Nature Reviews Clinical Oncology" }
    ],
    attachments: [
      { title: "FDA Precision Medicine Resources", url: "https://www.fda.gov/science-research/science-and-research-special-topics/precision-medicine", type: "Resource" },
      { title: "PharmGKB Drug-Gene Interactions", url: "https://www.pharmgkb.org/", type: "Database" },
      { title: "NCCN Biomarker Testing Guidelines", url: "https://www.nccn.org/guidelines/guidelines-detail?category=2&id=1477", type: "Guidelines" }
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
        name: "vs. External Beam Radiation",
        description: "EBRT requires daily hospital visits over weeks and irradiates normal tissue in the beam path. Radioligand therapy is administered in a few infusions, targets only cells expressing the receptor, and can treat metastases throughout the body simultaneously.",
        keyPoints: ["Systemic vs. local treatment", "Fewer treatment sessions", "Targets all metastases at once", "Reduced collateral damage"]
      },
      {
        name: "vs. Chemotherapy",
        description: "Chemotherapy affects all rapidly dividing cells, causing broad toxicity (hair loss, GI issues, myelosuppression). Radioligand therapy targets specific receptors, limiting exposure primarily to tumor cells expressing those targets.",
        keyPoints: ["Receptor-specific targeting", "Reduced systemic toxicity", "Different side effect profile", "Effective after chemo failure"]
      },
      {
        name: "vs. Targeted Therapies",
        description: "Small molecule inhibitors require continuous dosing and often develop resistance. Radioligand therapy delivers radiation that kills cells regardless of downstream pathway resistance, and is given in limited treatment cycles.",
        keyPoints: ["Cell killing vs. pathway inhibition", "Overcomes signaling resistance", "Limited treatment duration", "Different mechanism of action"]
      },
      {
        name: "vs. Immunotherapy",
        description: "Checkpoint inhibitors work by unleashing immune response, which can cause autoimmune side effects. Radioligand therapy directly destroys tumor cells via radiation. The two can be complementary, with radiation potentially enhancing immune recognition.",
        keyPoints: ["Direct cell killing mechanism", "Different toxicity profile", "Potential synergy with immunotherapy", "Effective in immunotherapy-resistant tumors"]
      },
      {
        name: "Theranostic Precision Advantage",
        description: "The theranostic approach—using the same molecule for imaging and therapy—enables confirmation of target expression before treatment. No other modality offers this 'see it, then treat it' capability.",
        keyPoints: ["Pre-treatment target confirmation", "Patient selection optimization", "Response monitoring built-in", "Truly personalized dosimetry"]
      }
    ],
    url: "https://www.snmmi.org/AboutSNMMI/Content.aspx?ItemNumber=35042",
    references: [
      { title: "VISION Trial Results (Lu-177 PSMA)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2107322", source: "NEJM" },
      { title: "Theranostics in Nuclear Medicine", url: "https://jnm.snmjournals.org/content/60/9/1209", source: "JNM" },
      { title: "Alpha Therapy Development", url: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(21)00276-0/fulltext", source: "Lancet Oncology" }
    ],
    attachments: [
      { title: "SNMMI Radioligand Therapy Guidelines", url: "https://www.snmmi.org/ClinicalPractice/content.aspx?ItemNumber=6991", type: "Guidelines" },
      { title: "EANM Dosimetry Guidance", url: "https://www.eanm.org/publications/guidelines/", type: "Guidelines" },
      { title: "Clinical Trials in Radioligand Therapy", url: "https://clinicaltrials.gov/search?cond=radioligand%20therapy", type: "Database" }
    ]
  }
];
