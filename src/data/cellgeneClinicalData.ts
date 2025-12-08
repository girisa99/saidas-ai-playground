// Clinical Trials, Commercial Products, and Manufacturers data for CGAT modalities

export interface ClinicalTrial {
  id: string;
  title: string;
  nctNumber: string;
  phase: string;
  status: string;
  sponsor: string;
  cro?: string;
  therapyName: string;
  treatment: string;
  disease: string;
  locations: string[];
  url: string;
  startDate?: string;
  expectedCompletion?: string;
}

export interface CommercialProduct {
  id: string;
  brandName: string;
  genericName: string;
  manufacturer: string;
  ndcCode: string;
  approvalDate: string;
  indication: string;
  disease: string;
  therapyType: string;
  icdCodes: string[];
  url: string;
  price?: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  type: 'pharma' | 'biotech' | 'technology' | 'cro' | 'healthcare' | 'research';
  headquarters: string;
  specializations: string[];
  therapeuticAreas: string[];
  website: string;
  products?: string[];
  clinicalTrials?: number;
}

export interface ExperimentationArea {
  area: string;
  description: string;
  organizations: string[];
  status: string;
}

// ==================== CELL THERAPY DATA ====================
export const cellTherapyClinicalTrials: ClinicalTrial[] = [
  {
    id: "ct-cell-001",
    title: "CAR-T Cell Therapy for Relapsed/Refractory B-Cell Lymphoma",
    nctNumber: "NCT04531046",
    phase: "Phase 3",
    status: "Recruiting",
    sponsor: "Novartis",
    cro: "IQVIA",
    therapyName: "Kymriah (tisagenlecleucel)",
    treatment: "CAR-T Cell Infusion",
    disease: "Diffuse Large B-Cell Lymphoma",
    locations: ["United States", "Europe", "Japan"],
    url: "https://clinicaltrials.gov/study/NCT04531046",
    startDate: "2020-09",
    expectedCompletion: "2025-12"
  },
  {
    id: "ct-cell-002",
    title: "Allogeneic CAR-T Cells for Multiple Myeloma",
    nctNumber: "NCT04093596",
    phase: "Phase 1/2",
    status: "Active",
    sponsor: "Allogene Therapeutics",
    cro: "PPD",
    therapyName: "ALLO-715",
    treatment: "Allogeneic BCMA CAR-T",
    disease: "Multiple Myeloma",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT04093596",
    startDate: "2019-11",
    expectedCompletion: "2025-06"
  },
  {
    id: "ct-cell-003",
    title: "TIL Therapy for Advanced Melanoma",
    nctNumber: "NCT03610490",
    phase: "Phase 2",
    status: "Completed",
    sponsor: "Iovance Biotherapeutics",
    cro: "Syneos Health",
    therapyName: "Lifileucel (Amtagvi)",
    treatment: "Tumor Infiltrating Lymphocytes",
    disease: "Unresectable or Metastatic Melanoma",
    locations: ["United States", "Canada", "Europe"],
    url: "https://clinicaltrials.gov/study/NCT03610490",
    startDate: "2018-08",
    expectedCompletion: "2024-03"
  },
  {
    id: "ct-cell-004",
    title: "NK Cell Therapy for Acute Myeloid Leukemia",
    nctNumber: "NCT04074746",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "Fate Therapeutics",
    therapyName: "FT516",
    treatment: "iPSC-derived NK Cells",
    disease: "Acute Myeloid Leukemia",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT04074746",
    startDate: "2019-08",
    expectedCompletion: "2025-09"
  },
  {
    id: "ct-cell-005",
    title: "MSC Therapy for Graft-versus-Host Disease",
    nctNumber: "NCT02336230",
    phase: "Phase 3",
    status: "Active",
    sponsor: "Mesoblast",
    cro: "Covance",
    therapyName: "Remestemcel-L",
    treatment: "Mesenchymal Stem Cell Infusion",
    disease: "Steroid-Refractory Acute GvHD",
    locations: ["United States", "Australia", "Europe"],
    url: "https://clinicaltrials.gov/study/NCT02336230",
    startDate: "2015-01",
    expectedCompletion: "2025-12"
  },
  {
    id: "ct-cell-006",
    title: "CAR-T for Lupus and Autoimmune Diseases",
    nctNumber: "NCT05030779",
    phase: "Phase 1/2",
    status: "Recruiting",
    sponsor: "Cabaletta Bio",
    therapyName: "CABA-201",
    treatment: "CD19-targeted CAR-T",
    disease: "Systemic Lupus Erythematosus",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT05030779",
    startDate: "2022-03",
    expectedCompletion: "2026-06"
  }
];

export const cellTherapyCommercialProducts: CommercialProduct[] = [
  {
    id: "cp-cell-001",
    brandName: "Kymriah",
    genericName: "Tisagenlecleucel",
    manufacturer: "Novartis",
    ndcCode: "0078-0845-19",
    approvalDate: "2017-08-30",
    indication: "B-cell ALL, DLBCL, Follicular Lymphoma",
    disease: "Hematological Malignancies",
    therapyType: "CAR-T Cell Therapy",
    icdCodes: ["C91.00", "C83.30", "C82.90"],
    url: "https://www.novartis.com/us-en/products/kymriah",
    price: "$475,000"
  },
  {
    id: "cp-cell-002",
    brandName: "Yescarta",
    genericName: "Axicabtagene ciloleucel",
    manufacturer: "Kite Pharma (Gilead)",
    ndcCode: "71287-227-01",
    approvalDate: "2017-10-18",
    indication: "Large B-cell Lymphoma, Follicular Lymphoma",
    disease: "Non-Hodgkin Lymphoma",
    therapyType: "CAR-T Cell Therapy",
    icdCodes: ["C83.30", "C82.90"],
    url: "https://www.yescarta.com",
    price: "$424,000"
  },
  {
    id: "cp-cell-003",
    brandName: "Tecartus",
    genericName: "Brexucabtagene autoleucel",
    manufacturer: "Kite Pharma (Gilead)",
    ndcCode: "71287-231-01",
    approvalDate: "2020-07-24",
    indication: "Mantle Cell Lymphoma, B-cell ALL",
    disease: "Hematological Malignancies",
    therapyType: "CAR-T Cell Therapy",
    icdCodes: ["C83.10", "C91.00"],
    url: "https://www.tecartus.com",
    price: "$373,000"
  },
  {
    id: "cp-cell-004",
    brandName: "Breyanzi",
    genericName: "Lisocabtagene maraleucel",
    manufacturer: "Bristol-Myers Squibb",
    ndcCode: "0003-5740-11",
    approvalDate: "2021-02-05",
    indication: "Large B-cell Lymphoma",
    disease: "Non-Hodgkin Lymphoma",
    therapyType: "CAR-T Cell Therapy",
    icdCodes: ["C83.30", "C83.80"],
    url: "https://www.breyanzi.com",
    price: "$410,300"
  },
  {
    id: "cp-cell-005",
    brandName: "Abecma",
    genericName: "Idecabtagene vicleucel",
    manufacturer: "Bristol-Myers Squibb / 2seventy bio",
    ndcCode: "0003-5866-11",
    approvalDate: "2021-03-26",
    indication: "Multiple Myeloma",
    disease: "Multiple Myeloma",
    therapyType: "BCMA CAR-T Cell Therapy",
    icdCodes: ["C90.00"],
    url: "https://www.abecma.com",
    price: "$419,500"
  },
  {
    id: "cp-cell-006",
    brandName: "Carvykti",
    genericName: "Ciltacabtagene autoleucel",
    manufacturer: "Janssen (Johnson & Johnson) / Legend Biotech",
    ndcCode: "57894-150-01",
    approvalDate: "2022-02-28",
    indication: "Multiple Myeloma",
    disease: "Multiple Myeloma",
    therapyType: "BCMA CAR-T Cell Therapy",
    icdCodes: ["C90.00"],
    url: "https://www.carvykti.com",
    price: "$465,000"
  },
  {
    id: "cp-cell-007",
    brandName: "Amtagvi",
    genericName: "Lifileucel",
    manufacturer: "Iovance Biotherapeutics",
    ndcCode: "73607-700-01",
    approvalDate: "2024-02-16",
    indication: "Unresectable or Metastatic Melanoma",
    disease: "Melanoma",
    therapyType: "TIL Therapy",
    icdCodes: ["C43.9"],
    url: "https://www.amtagvi.com",
    price: "$515,000"
  }
];

export const cellTherapyManufacturers: Manufacturer[] = [
  {
    id: "mfr-cell-001",
    name: "Novartis",
    type: "pharma",
    headquarters: "Basel, Switzerland",
    specializations: ["CAR-T Cell Therapy", "Oncology", "Immunology"],
    therapeuticAreas: ["Hematological Malignancies", "Solid Tumors"],
    website: "https://www.novartis.com",
    products: ["Kymriah"],
    clinicalTrials: 45
  },
  {
    id: "mfr-cell-002",
    name: "Kite Pharma (Gilead)",
    type: "biotech",
    headquarters: "Santa Monica, CA, USA",
    specializations: ["CAR-T Cell Therapy", "Cell Engineering"],
    therapeuticAreas: ["Lymphoma", "Leukemia", "Solid Tumors"],
    website: "https://www.kitepharma.com",
    products: ["Yescarta", "Tecartus"],
    clinicalTrials: 38
  },
  {
    id: "mfr-cell-003",
    name: "Bristol-Myers Squibb",
    type: "pharma",
    headquarters: "New York, NY, USA",
    specializations: ["CAR-T Cell Therapy", "Immuno-Oncology"],
    therapeuticAreas: ["Lymphoma", "Multiple Myeloma"],
    website: "https://www.bms.com",
    products: ["Breyanzi", "Abecma"],
    clinicalTrials: 52
  },
  {
    id: "mfr-cell-004",
    name: "Legend Biotech",
    type: "biotech",
    headquarters: "Somerset, NJ, USA",
    specializations: ["CAR-T Cell Therapy", "Cell Engineering"],
    therapeuticAreas: ["Multiple Myeloma", "Solid Tumors"],
    website: "https://www.legendbiotech.com",
    products: ["Carvykti"],
    clinicalTrials: 18
  },
  {
    id: "mfr-cell-005",
    name: "Iovance Biotherapeutics",
    type: "biotech",
    headquarters: "San Carlos, CA, USA",
    specializations: ["TIL Therapy", "Tumor Immunology"],
    therapeuticAreas: ["Melanoma", "Solid Tumors"],
    website: "https://www.iovance.com",
    products: ["Amtagvi"],
    clinicalTrials: 12
  },
  {
    id: "mfr-cell-006",
    name: "Allogene Therapeutics",
    type: "biotech",
    headquarters: "South San Francisco, CA, USA",
    specializations: ["Allogeneic CAR-T", "Off-the-Shelf Cell Therapy"],
    therapeuticAreas: ["Hematological Malignancies"],
    website: "https://www.allogene.com",
    clinicalTrials: 15
  },
  {
    id: "mfr-cell-007",
    name: "Fate Therapeutics",
    type: "biotech",
    headquarters: "San Diego, CA, USA",
    specializations: ["iPSC-derived Cell Therapy", "NK Cell Therapy"],
    therapeuticAreas: ["Cancer", "Autoimmune"],
    website: "https://www.fatetherapeutics.com",
    clinicalTrials: 10
  },
  {
    id: "mfr-cell-008",
    name: "IQVIA",
    type: "cro",
    headquarters: "Durham, NC, USA",
    specializations: ["Clinical Trial Management", "Regulatory Support"],
    therapeuticAreas: ["All Therapeutic Areas"],
    website: "https://www.iqvia.com",
    clinicalTrials: 200
  },
  {
    id: "mfr-cell-009",
    name: "PPD (Thermo Fisher)",
    type: "cro",
    headquarters: "Wilmington, NC, USA",
    specializations: ["Clinical Development", "Laboratory Services"],
    therapeuticAreas: ["Cell Therapy", "Gene Therapy"],
    website: "https://www.ppd.com",
    clinicalTrials: 150
  },
  {
    id: "mfr-cell-010",
    name: "MD Anderson Cancer Center",
    type: "research",
    headquarters: "Houston, TX, USA",
    specializations: ["Cancer Research", "Clinical Trials", "CAR-T Development"],
    therapeuticAreas: ["Oncology"],
    website: "https://www.mdanderson.org",
    clinicalTrials: 85
  }
];

export const cellTherapyExperimentationAreas: ExperimentationArea[] = [
  { area: "Solid Tumor CAR-T", description: "Adapting CAR-T success from blood cancers to solid tumors", organizations: ["Novartis", "BMS", "Kite"], status: "Phase 1/2 Trials" },
  { area: "Allogeneic (Off-the-Shelf)", description: "Creating universal donor cell therapies", organizations: ["Allogene", "CRISPR Therapeutics", "Caribou"], status: "Phase 1/2 Trials" },
  { area: "iPSC-derived Cells", description: "Manufacturing cells from induced pluripotent stem cells", organizations: ["Fate Therapeutics", "Cynata"], status: "Phase 1 Trials" },
  { area: "Autoimmune CAR-T", description: "Using CAR-T to reset immune system in autoimmune diseases", organizations: ["Cabaletta", "Kyverna"], status: "Phase 1/2 Trials" }
];

// ==================== GENE THERAPY DATA ====================
export const geneTherapyClinicalTrials: ClinicalTrial[] = [
  {
    id: "ct-gene-001",
    title: "CRISPR Gene Editing for Sickle Cell Disease",
    nctNumber: "NCT03745287",
    phase: "Phase 3",
    status: "Completed",
    sponsor: "Vertex Pharmaceuticals / CRISPR Therapeutics",
    cro: "Syneos Health",
    therapyName: "Casgevy (exagamglogene autotemcel)",
    treatment: "CRISPR/Cas9 Gene Editing",
    disease: "Sickle Cell Disease",
    locations: ["United States", "Europe", "Middle East"],
    url: "https://clinicaltrials.gov/study/NCT03745287",
    startDate: "2018-11",
    expectedCompletion: "2023-12"
  },
  {
    id: "ct-gene-002",
    title: "AAV Gene Therapy for Hemophilia B",
    nctNumber: "NCT03569891",
    phase: "Phase 3",
    status: "Completed",
    sponsor: "CSL Behring / uniQure",
    cro: "Parexel",
    therapyName: "Hemgenix (etranacogene dezaparvovec)",
    treatment: "AAV5 Factor IX Gene Therapy",
    disease: "Hemophilia B",
    locations: ["United States", "Europe"],
    url: "https://clinicaltrials.gov/study/NCT03569891",
    startDate: "2018-06",
    expectedCompletion: "2023-06"
  },
  {
    id: "ct-gene-003",
    title: "Gene Therapy for Duchenne Muscular Dystrophy",
    nctNumber: "NCT03375164",
    phase: "Phase 3",
    status: "Recruiting",
    sponsor: "Sarepta Therapeutics",
    cro: "PPD",
    therapyName: "Elevidys (delandistrogene moxeparvovec)",
    treatment: "AAV Micro-dystrophin Gene Transfer",
    disease: "Duchenne Muscular Dystrophy",
    locations: ["United States", "Canada", "Europe", "Japan"],
    url: "https://clinicaltrials.gov/study/NCT03375164",
    startDate: "2018-01",
    expectedCompletion: "2026-03"
  },
  {
    id: "ct-gene-004",
    title: "In Vivo CRISPR for Transthyretin Amyloidosis",
    nctNumber: "NCT04601051",
    phase: "Phase 1",
    status: "Active",
    sponsor: "Intellia Therapeutics",
    therapyName: "NTLA-2001",
    treatment: "In Vivo CRISPR Gene Editing",
    disease: "Transthyretin Amyloidosis",
    locations: ["United States", "United Kingdom", "New Zealand"],
    url: "https://clinicaltrials.gov/study/NCT04601051",
    startDate: "2020-11",
    expectedCompletion: "2025-09"
  },
  {
    id: "ct-gene-005",
    title: "Gene Therapy for X-linked Retinitis Pigmentosa",
    nctNumber: "NCT04671433",
    phase: "Phase 1/2",
    status: "Recruiting",
    sponsor: "AGTC (Applied Genetic Technologies)",
    therapyName: "AGTC-501",
    treatment: "AAV Gene Replacement",
    disease: "X-linked Retinitis Pigmentosa",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT04671433",
    startDate: "2021-01",
    expectedCompletion: "2025-12"
  },
  {
    id: "ct-gene-006",
    title: "Base Editing for Familial Hypercholesterolemia",
    nctNumber: "NCT05398029",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "Verve Therapeutics",
    therapyName: "VERVE-101",
    treatment: "Base Editing PCSK9 Gene",
    disease: "Heterozygous Familial Hypercholesterolemia",
    locations: ["United Kingdom", "New Zealand"],
    url: "https://clinicaltrials.gov/study/NCT05398029",
    startDate: "2022-07",
    expectedCompletion: "2026-06"
  }
];

export const geneTherapyCommercialProducts: CommercialProduct[] = [
  {
    id: "cp-gene-001",
    brandName: "Luxturna",
    genericName: "Voretigene neparvovec",
    manufacturer: "Spark Therapeutics (Roche)",
    ndcCode: "71394-415-01",
    approvalDate: "2017-12-19",
    indication: "RPE65 Mutation-Associated Retinal Dystrophy",
    disease: "Inherited Retinal Dystrophy",
    therapyType: "AAV Gene Replacement",
    icdCodes: ["H35.50", "H35.52"],
    url: "https://www.luxturna.com",
    price: "$850,000 (both eyes)"
  },
  {
    id: "cp-gene-002",
    brandName: "Zolgensma",
    genericName: "Onasemnogene abeparvovec",
    manufacturer: "Novartis Gene Therapies",
    ndcCode: "71932-100-01",
    approvalDate: "2019-05-24",
    indication: "Spinal Muscular Atrophy",
    disease: "Spinal Muscular Atrophy",
    therapyType: "AAV9 Gene Replacement",
    icdCodes: ["G12.0", "G12.1"],
    url: "https://www.zolgensma.com",
    price: "$2,125,000"
  },
  {
    id: "cp-gene-003",
    brandName: "Hemgenix",
    genericName: "Etranacogene dezaparvovec",
    manufacturer: "CSL Behring",
    ndcCode: "44206-501-01",
    approvalDate: "2022-11-22",
    indication: "Hemophilia B",
    disease: "Hemophilia B",
    therapyType: "AAV5 Gene Therapy",
    icdCodes: ["D67"],
    url: "https://www.hemgenix.com",
    price: "$3,500,000"
  },
  {
    id: "cp-gene-004",
    brandName: "Casgevy",
    genericName: "Exagamglogene autotemcel",
    manufacturer: "Vertex Pharmaceuticals / CRISPR Therapeutics",
    ndcCode: "To be assigned",
    approvalDate: "2023-12-08",
    indication: "Sickle Cell Disease, Beta-Thalassemia",
    disease: "Sickle Cell Disease",
    therapyType: "CRISPR/Cas9 Gene Editing",
    icdCodes: ["D57.1", "D56.1"],
    url: "https://www.vertex.com",
    price: "$2,200,000"
  },
  {
    id: "cp-gene-005",
    brandName: "Lyfgenia",
    genericName: "Lovotibeglogene autotemcel",
    manufacturer: "bluebird bio",
    ndcCode: "To be assigned",
    approvalDate: "2023-12-08",
    indication: "Sickle Cell Disease",
    disease: "Sickle Cell Disease",
    therapyType: "Lentiviral Gene Addition",
    icdCodes: ["D57.1"],
    url: "https://www.bluebirdbio.com",
    price: "$3,100,000"
  },
  {
    id: "cp-gene-006",
    brandName: "Elevidys",
    genericName: "Delandistrogene moxeparvovec",
    manufacturer: "Sarepta Therapeutics",
    ndcCode: "60923-284-01",
    approvalDate: "2023-06-22",
    indication: "Duchenne Muscular Dystrophy",
    disease: "Duchenne Muscular Dystrophy",
    therapyType: "AAV Micro-dystrophin",
    icdCodes: ["G71.01"],
    url: "https://www.elevidys.com",
    price: "$3,200,000"
  },
  {
    id: "cp-gene-007",
    brandName: "Roctavian",
    genericName: "Valoctocogene roxaparvovec",
    manufacturer: "BioMarin",
    ndcCode: "68135-400-01",
    approvalDate: "2023-06-29",
    indication: "Hemophilia A",
    disease: "Hemophilia A",
    therapyType: "AAV5 Gene Therapy",
    icdCodes: ["D66"],
    url: "https://www.roctavian.com",
    price: "$2,900,000"
  }
];

export const geneTherapyManufacturers: Manufacturer[] = [
  {
    id: "mfr-gene-001",
    name: "Vertex Pharmaceuticals",
    type: "pharma",
    headquarters: "Boston, MA, USA",
    specializations: ["CRISPR Gene Editing", "Small Molecules"],
    therapeuticAreas: ["Sickle Cell Disease", "Cystic Fibrosis", "Beta-Thalassemia"],
    website: "https://www.vertex.com",
    products: ["Casgevy"],
    clinicalTrials: 35
  },
  {
    id: "mfr-gene-002",
    name: "CRISPR Therapeutics",
    type: "biotech",
    headquarters: "Zug, Switzerland",
    specializations: ["CRISPR/Cas9 Gene Editing"],
    therapeuticAreas: ["Hemoglobinopathies", "Oncology", "Regenerative Medicine"],
    website: "https://www.crisprtx.com",
    products: ["Casgevy"],
    clinicalTrials: 12
  },
  {
    id: "mfr-gene-003",
    name: "bluebird bio",
    type: "biotech",
    headquarters: "Somerville, MA, USA",
    specializations: ["Lentiviral Gene Therapy", "Gene Addition"],
    therapeuticAreas: ["Sickle Cell Disease", "Cerebral Adrenoleukodystrophy"],
    website: "https://www.bluebirdbio.com",
    products: ["Lyfgenia", "Skysona"],
    clinicalTrials: 18
  },
  {
    id: "mfr-gene-004",
    name: "Spark Therapeutics (Roche)",
    type: "biotech",
    headquarters: "Philadelphia, PA, USA",
    specializations: ["AAV Gene Therapy", "Ophthalmology"],
    therapeuticAreas: ["Inherited Retinal Diseases", "Hemophilia"],
    website: "https://www.sparktx.com",
    products: ["Luxturna"],
    clinicalTrials: 15
  },
  {
    id: "mfr-gene-005",
    name: "Sarepta Therapeutics",
    type: "biotech",
    headquarters: "Cambridge, MA, USA",
    specializations: ["Gene Therapy", "RNA-targeted Therapeutics"],
    therapeuticAreas: ["Duchenne Muscular Dystrophy", "Limb-Girdle"],
    website: "https://www.sarepta.com",
    products: ["Elevidys", "Exondys 51"],
    clinicalTrials: 28
  },
  {
    id: "mfr-gene-006",
    name: "Intellia Therapeutics",
    type: "biotech",
    headquarters: "Cambridge, MA, USA",
    specializations: ["In Vivo CRISPR Gene Editing"],
    therapeuticAreas: ["Transthyretin Amyloidosis", "Hemophilia"],
    website: "https://www.intelliatx.com",
    clinicalTrials: 8
  },
  {
    id: "mfr-gene-007",
    name: "BioMarin",
    type: "biotech",
    headquarters: "San Rafael, CA, USA",
    specializations: ["Gene Therapy", "Enzyme Replacement"],
    therapeuticAreas: ["Hemophilia A", "Rare Genetic Diseases"],
    website: "https://www.biomarin.com",
    products: ["Roctavian"],
    clinicalTrials: 22
  },
  {
    id: "mfr-gene-008",
    name: "Syneos Health",
    type: "cro",
    headquarters: "Morrisville, NC, USA",
    specializations: ["Clinical Development", "Commercialization"],
    therapeuticAreas: ["Gene Therapy", "Cell Therapy"],
    website: "https://www.syneoshealth.com",
    clinicalTrials: 180
  }
];

export const geneTherapyExperimentationAreas: ExperimentationArea[] = [
  { area: "In Vivo Gene Editing", description: "Editing genes directly in the body without cell extraction", organizations: ["Intellia", "Verve", "Beam"], status: "Phase 1 Trials" },
  { area: "Base/Prime Editing", description: "Precise single-base changes without double-strand breaks", organizations: ["Beam Therapeutics", "Prime Medicine"], status: "Phase 1 Trials" },
  { area: "Neurological Gene Therapy", description: "Treating CNS disorders with gene delivery", organizations: ["Passage Bio", "Prevail (Lilly)"], status: "Phase 1/2 Trials" },
  { area: "Cardiac Gene Therapy", description: "Gene therapy for heart failure and cardiomyopathy", organizations: ["Rocket Pharma", "Renovacor"], status: "Phase 1/2 Trials" }
];

// ==================== ADVANCED THERAPY DATA ====================
export const advancedTherapyClinicalTrials: ClinicalTrial[] = [
  {
    id: "ct-adv-001",
    title: "3D Bioprinted Liver Tissue for Drug Testing",
    nctNumber: "NCT04724603",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "Organovo",
    therapyName: "ExVive3D Liver",
    treatment: "Bioprinted Hepatic Tissue",
    disease: "Drug Development Platform",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT04724603",
    startDate: "2021-02",
    expectedCompletion: "2025-06"
  },
  {
    id: "ct-adv-002",
    title: "Tissue-Engineered Trachea Replacement",
    nctNumber: "NCT04926389",
    phase: "Phase 1/2",
    status: "Active",
    sponsor: "Regentis Biomaterials",
    cro: "Medpace",
    therapyName: "GelrinC Tracheal Scaffold",
    treatment: "Decellularized Scaffold + Cells",
    disease: "Tracheal Stenosis",
    locations: ["Europe", "Israel"],
    url: "https://clinicaltrials.gov/study/NCT04926389",
    startDate: "2021-06",
    expectedCompletion: "2025-12"
  },
  {
    id: "ct-adv-003",
    title: "Pig-to-Human Kidney Xenotransplantation",
    nctNumber: "NCT05616026",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "eGenesis",
    therapyName: "EGEN-2784",
    treatment: "Gene-Edited Pig Kidney Transplant",
    disease: "End-Stage Renal Disease",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT05616026",
    startDate: "2023-03",
    expectedCompletion: "2027-06"
  },
  {
    id: "ct-adv-004",
    title: "Organoid-Based Personalized Cancer Treatment",
    nctNumber: "NCT05201781",
    phase: "Phase 2",
    status: "Recruiting",
    sponsor: "Hubrecht Organoid Technology",
    therapyName: "Patient-Derived Organoids",
    treatment: "Organoid Drug Sensitivity Testing",
    disease: "Colorectal Cancer",
    locations: ["Netherlands", "Germany"],
    url: "https://clinicaltrials.gov/study/NCT05201781",
    startDate: "2022-01",
    expectedCompletion: "2026-06"
  }
];

export const advancedTherapyCommercialProducts: CommercialProduct[] = [
  {
    id: "cp-adv-001",
    brandName: "Holoclar",
    genericName: "Ex vivo expanded autologous human corneal epithelial cells",
    manufacturer: "Holostem Terapie Avanzate (Chiesi)",
    ndcCode: "EU Only",
    approvalDate: "2015-02-17",
    indication: "Limbal Stem Cell Deficiency",
    disease: "Corneal Burns",
    therapyType: "Tissue Engineered Product",
    icdCodes: ["H18.89", "T26.1"],
    url: "https://www.ema.europa.eu/en/medicines/human/EPAR/holoclar",
    price: "€80,000"
  },
  {
    id: "cp-adv-002",
    brandName: "MACI",
    genericName: "Autologous cultured chondrocytes on porcine collagen membrane",
    manufacturer: "Vericel Corporation",
    ndcCode: "71390-100-01",
    approvalDate: "2016-12-13",
    indication: "Cartilage Defects of the Knee",
    disease: "Knee Cartilage Injury",
    therapyType: "Matrix-Assisted ACI",
    icdCodes: ["M94.26", "S83.3"],
    url: "https://www.maci.com",
    price: "$40,000"
  },
  {
    id: "cp-adv-003",
    brandName: "Epicel",
    genericName: "Cultured Epidermal Autografts",
    manufacturer: "Vericel Corporation",
    ndcCode: "71390-110-01",
    approvalDate: "1988 (HDE)",
    indication: "Severe Burns",
    disease: "Deep Dermal or Full Thickness Burns",
    therapyType: "Cultured Skin Graft",
    icdCodes: ["T31.90", "L98.493"],
    url: "https://www.vcel.com/epicel",
    price: "$15,000-$150,000"
  },
  {
    id: "cp-adv-004",
    brandName: "Stratagraft",
    genericName: "Allogeneic Cellularized Scaffold Product",
    manufacturer: "Stratatech (Mallinckrodt)",
    ndcCode: "67386-302-01",
    approvalDate: "2021-06-15",
    indication: "Adult Patients with Thermal Burns",
    disease: "Thermal Burns",
    therapyType: "Bioengineered Skin Substitute",
    icdCodes: ["T30.0", "T31.0"],
    url: "https://www.stratagraft.com",
    price: "$45,000"
  }
];

export const advancedTherapyManufacturers: Manufacturer[] = [
  {
    id: "mfr-adv-001",
    name: "Vericel Corporation",
    type: "biotech",
    headquarters: "Cambridge, MA, USA",
    specializations: ["Tissue Engineering", "Cell Therapy"],
    therapeuticAreas: ["Orthopedics", "Burns", "Sports Medicine"],
    website: "https://www.vcel.com",
    products: ["MACI", "Epicel"],
    clinicalTrials: 8
  },
  {
    id: "mfr-adv-002",
    name: "Organovo",
    type: "biotech",
    headquarters: "San Diego, CA, USA",
    specializations: ["3D Bioprinting", "Liver Tissue"],
    therapeuticAreas: ["Drug Discovery", "Organ Repair"],
    website: "https://www.organovo.com",
    clinicalTrials: 5
  },
  {
    id: "mfr-adv-003",
    name: "eGenesis",
    type: "biotech",
    headquarters: "Cambridge, MA, USA",
    specializations: ["Xenotransplantation", "Gene Editing"],
    therapeuticAreas: ["Organ Transplantation", "End-Stage Organ Disease"],
    website: "https://www.egenesisbio.com",
    clinicalTrials: 4
  },
  {
    id: "mfr-adv-004",
    name: "United Therapeutics",
    type: "biotech",
    headquarters: "Silver Spring, MD, USA",
    specializations: ["Xenotransplantation", "Organ Manufacturing"],
    therapeuticAreas: ["Pulmonary Hypertension", "Organ Transplant"],
    website: "https://www.unither.com",
    clinicalTrials: 12
  },
  {
    id: "mfr-adv-005",
    name: "Wake Forest Institute for Regenerative Medicine",
    type: "research",
    headquarters: "Winston-Salem, NC, USA",
    specializations: ["Organ Bioengineering", "3D Bioprinting"],
    therapeuticAreas: ["Urology", "Wound Healing"],
    website: "https://www.wakehealth.edu/wfirm",
    clinicalTrials: 20
  }
];

export const advancedTherapyExperimentationAreas: ExperimentationArea[] = [
  { area: "Organ Bioprinting", description: "Creating functional organs using 3D bioprinting", organizations: ["Organovo", "BICO", "Cellink"], status: "Preclinical/Phase 1" },
  { area: "Xenotransplantation", description: "Gene-edited pig organs for human transplant", organizations: ["eGenesis", "United Therapeutics", "Revivicor"], status: "Phase 1 Trials" },
  { area: "Organ-on-Chip", description: "Microfluidic devices mimicking organ function", organizations: ["Emulate", "Mimetas", "TissUse"], status: "Commercial/Research" },
  { area: "Whole Organ Engineering", description: "Decellularized scaffolds recellularized with patient cells", organizations: ["Harvard WFIRM", "MIT"], status: "Preclinical" }
];

// ==================== PERSONALIZED THERAPY DATA ====================
export const personalizedTherapyClinicalTrials: ClinicalTrial[] = [
  {
    id: "ct-pers-001",
    title: "Neoantigen Cancer Vaccine + Pembrolizumab",
    nctNumber: "NCT03289962",
    phase: "Phase 2",
    status: "Active",
    sponsor: "BioNTech",
    cro: "ICON",
    therapyName: "BNT122 (Autogene cevumeran)",
    treatment: "Personalized mRNA Cancer Vaccine",
    disease: "Pancreatic Cancer",
    locations: ["United States", "Europe"],
    url: "https://clinicaltrials.gov/study/NCT03289962",
    startDate: "2019-04",
    expectedCompletion: "2025-12"
  },
  {
    id: "ct-pers-002",
    title: "Tumor-Informed ctDNA Monitoring for Colorectal Cancer",
    nctNumber: "NCT04264702",
    phase: "Phase 3",
    status: "Recruiting",
    sponsor: "Natera",
    therapyName: "Signatera",
    treatment: "Personalized ctDNA Monitoring",
    disease: "Colorectal Cancer",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT04264702",
    startDate: "2020-03",
    expectedCompletion: "2026-06"
  },
  {
    id: "ct-pers-003",
    title: "Pharmacogenomic-Guided Dosing in Depression",
    nctNumber: "NCT03150238",
    phase: "Phase 4",
    status: "Completed",
    sponsor: "Myriad Genetics",
    therapyName: "GeneSight",
    treatment: "PGx-Guided Antidepressant Selection",
    disease: "Major Depressive Disorder",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT03150238",
    startDate: "2017-06",
    expectedCompletion: "2022-12"
  },
  {
    id: "ct-pers-004",
    title: "AI-Guided Treatment Selection for NSCLC",
    nctNumber: "NCT05078866",
    phase: "Phase 2",
    status: "Recruiting",
    sponsor: "Tempus",
    therapyName: "Tempus xT + AI Platform",
    treatment: "AI-Matched Therapy Selection",
    disease: "Non-Small Cell Lung Cancer",
    locations: ["United States"],
    url: "https://clinicaltrials.gov/study/NCT05078866",
    startDate: "2021-11",
    expectedCompletion: "2025-12"
  }
];

export const personalizedTherapyCommercialProducts: CommercialProduct[] = [
  {
    id: "cp-pers-001",
    brandName: "FoundationOne CDx",
    genericName: "Comprehensive Genomic Profiling",
    manufacturer: "Foundation Medicine (Roche)",
    ndcCode: "N/A (Diagnostic)",
    approvalDate: "2017-11-30",
    indication: "Solid Tumor Profiling",
    disease: "Multiple Solid Tumors",
    therapyType: "Companion Diagnostic",
    icdCodes: ["Z15.01", "Z85.89"],
    url: "https://www.foundationmedicine.com",
    price: "$3,200-$5,800"
  },
  {
    id: "cp-pers-002",
    brandName: "Signatera",
    genericName: "Tumor-Informed ctDNA Test",
    manufacturer: "Natera",
    ndcCode: "N/A (Diagnostic)",
    approvalDate: "2019 (LDT)",
    indication: "MRD Detection and Monitoring",
    disease: "Multiple Cancer Types",
    therapyType: "Personalized ctDNA Monitoring",
    icdCodes: ["Z85.89", "Z12.11"],
    url: "https://www.signatera.com",
    price: "$2,500-$4,000"
  },
  {
    id: "cp-pers-003",
    brandName: "GeneSight",
    genericName: "Pharmacogenomic Test",
    manufacturer: "Myriad Genetics",
    ndcCode: "N/A (Diagnostic)",
    approvalDate: "2010 (LDT)",
    indication: "Psychiatric Medication Selection",
    disease: "Depression, Anxiety, ADHD",
    therapyType: "Pharmacogenomics",
    icdCodes: ["F32.9", "F41.1"],
    url: "https://www.genesight.com",
    price: "$2,000"
  },
  {
    id: "cp-pers-004",
    brandName: "Oncotype DX",
    genericName: "21-Gene Breast Cancer Assay",
    manufacturer: "Exact Sciences",
    ndcCode: "N/A (Diagnostic)",
    approvalDate: "2004 (LDT)",
    indication: "Breast Cancer Recurrence Risk",
    disease: "ER-positive Breast Cancer",
    therapyType: "Prognostic Test",
    icdCodes: ["C50.919", "Z85.3"],
    url: "https://www.oncotypeiq.com",
    price: "$4,175"
  }
];

export const personalizedTherapyManufacturers: Manufacturer[] = [
  {
    id: "mfr-pers-001",
    name: "Foundation Medicine (Roche)",
    type: "biotech",
    headquarters: "Cambridge, MA, USA",
    specializations: ["Genomic Profiling", "Companion Diagnostics"],
    therapeuticAreas: ["Oncology"],
    website: "https://www.foundationmedicine.com",
    products: ["FoundationOne CDx", "FoundationOne Liquid CDx"],
    clinicalTrials: 45
  },
  {
    id: "mfr-pers-002",
    name: "BioNTech",
    type: "biotech",
    headquarters: "Mainz, Germany",
    specializations: ["mRNA Technology", "Personalized Cancer Vaccines"],
    therapeuticAreas: ["Oncology", "Infectious Disease"],
    website: "https://www.biontech.de",
    clinicalTrials: 28
  },
  {
    id: "mfr-pers-003",
    name: "Tempus",
    type: "technology",
    headquarters: "Chicago, IL, USA",
    specializations: ["AI-Driven Precision Medicine", "Genomic Sequencing"],
    therapeuticAreas: ["Oncology", "Cardiology", "Psychiatry"],
    website: "https://www.tempus.com",
    clinicalTrials: 15
  },
  {
    id: "mfr-pers-004",
    name: "Natera",
    type: "biotech",
    headquarters: "Austin, TX, USA",
    specializations: ["Cell-Free DNA Analysis", "Personalized Diagnostics"],
    therapeuticAreas: ["Oncology", "Women's Health"],
    website: "https://www.natera.com",
    products: ["Signatera", "Panorama"],
    clinicalTrials: 20
  },
  {
    id: "mfr-pers-005",
    name: "Illumina",
    type: "technology",
    headquarters: "San Diego, CA, USA",
    specializations: ["DNA Sequencing", "Genomic Analysis"],
    therapeuticAreas: ["All Therapeutic Areas"],
    website: "https://www.illumina.com",
    clinicalTrials: 100
  }
];

export const personalizedTherapyExperimentationAreas: ExperimentationArea[] = [
  { area: "Personalized Cancer Vaccines", description: "mRNA/peptide vaccines targeting patient-specific neoantigens", organizations: ["BioNTech", "Moderna", "Gritstone"], status: "Phase 2 Trials" },
  { area: "Digital Twins in Medicine", description: "Computational models of individual patients", organizations: ["Siemens Healthineers", "Dassault", "GE Healthcare"], status: "Research/Pilots" },
  { area: "AI Treatment Selection", description: "Machine learning for optimal therapy matching", organizations: ["Tempus", "Flatiron", "Foundation Medicine"], status: "Commercial/Research" },
  { area: "N-of-1 Therapies", description: "Custom treatments for individual rare disease patients", organizations: ["Boston Children's", "NIH", "n-Lorem"], status: "Compassionate Use" }
];

// ==================== RADIOLIGAND THERAPY DATA ====================
export const radioligandTherapyClinicalTrials: ClinicalTrial[] = [
  {
    id: "ct-radio-001",
    title: "177Lu-PSMA-617 for Metastatic Castration-Resistant Prostate Cancer",
    nctNumber: "NCT03511664",
    phase: "Phase 3",
    status: "Completed",
    sponsor: "Novartis (Advanced Accelerator Applications)",
    cro: "IQVIA",
    therapyName: "Pluvicto (lutetium Lu 177 vipivotide tetraxetan)",
    treatment: "PSMA-Targeted Radioligand Therapy",
    disease: "Metastatic Castration-Resistant Prostate Cancer",
    locations: ["Global"],
    url: "https://clinicaltrials.gov/study/NCT03511664",
    startDate: "2018-06",
    expectedCompletion: "2021-10"
  },
  {
    id: "ct-radio-002",
    title: "177Lu-DOTATATE for Neuroendocrine Tumors",
    nctNumber: "NCT01578239",
    phase: "Phase 3",
    status: "Completed",
    sponsor: "Novartis (Advanced Accelerator Applications)",
    therapyName: "Lutathera (lutetium Lu 177 dotatate)",
    treatment: "Somatostatin Receptor-Targeted RLT",
    disease: "Gastroenteropancreatic Neuroendocrine Tumors",
    locations: ["United States", "Europe"],
    url: "https://clinicaltrials.gov/study/NCT01578239",
    startDate: "2012-09",
    expectedCompletion: "2016-01"
  },
  {
    id: "ct-radio-003",
    title: "225Ac-PSMA-617 for Advanced Prostate Cancer",
    nctNumber: "NCT04597411",
    phase: "Phase 1",
    status: "Recruiting",
    sponsor: "Fusion Pharmaceuticals",
    therapyName: "FPI-1434",
    treatment: "Alpha-Emitting PSMA-Targeted RLT",
    disease: "Metastatic Prostate Cancer",
    locations: ["United States", "Canada"],
    url: "https://clinicaltrials.gov/study/NCT04597411",
    startDate: "2020-11",
    expectedCompletion: "2025-12"
  },
  {
    id: "ct-radio-004",
    title: "177Lu-FAP-2286 for Solid Tumors",
    nctNumber: "NCT04939610",
    phase: "Phase 1/2",
    status: "Recruiting",
    sponsor: "Clovis Oncology",
    therapyName: "FAP-2286",
    treatment: "FAP-Targeted Radioligand Therapy",
    disease: "Advanced Solid Tumors",
    locations: ["United States", "Europe"],
    url: "https://clinicaltrials.gov/study/NCT04939610",
    startDate: "2021-07",
    expectedCompletion: "2026-06"
  }
];

export const radioligandTherapyCommercialProducts: CommercialProduct[] = [
  {
    id: "cp-radio-001",
    brandName: "Pluvicto",
    genericName: "Lutetium Lu 177 vipivotide tetraxetan",
    manufacturer: "Novartis (Advanced Accelerator Applications)",
    ndcCode: "69945-177-01",
    approvalDate: "2022-03-23",
    indication: "PSMA-positive mCRPC",
    disease: "Metastatic Castration-Resistant Prostate Cancer",
    therapyType: "PSMA-Targeted Radioligand Therapy",
    icdCodes: ["C61", "C79.82"],
    url: "https://www.pluvicto.com",
    price: "$42,500 per dose (6 doses)"
  },
  {
    id: "cp-radio-002",
    brandName: "Lutathera",
    genericName: "Lutetium Lu 177 dotatate",
    manufacturer: "Novartis (Advanced Accelerator Applications)",
    ndcCode: "69945-091-40",
    approvalDate: "2018-01-26",
    indication: "Somatostatin Receptor-Positive GEP-NETs",
    disease: "Gastroenteropancreatic Neuroendocrine Tumors",
    therapyType: "Somatostatin Receptor-Targeted RLT",
    icdCodes: ["C25.4", "C17.9"],
    url: "https://www.lutathera.com",
    price: "$47,600 per dose (4 doses)"
  },
  {
    id: "cp-radio-003",
    brandName: "Azedra",
    genericName: "Iobenguane I 131",
    manufacturer: "Progenics Pharmaceuticals (Lantheus)",
    ndcCode: "69945-131-10",
    approvalDate: "2018-07-30",
    indication: "MIBG-Avid Pheochromocytoma/Paraganglioma",
    disease: "Pheochromocytoma/Paraganglioma",
    therapyType: "MIBG-Targeted Radiotherapy",
    icdCodes: ["C74.10", "C75.5"],
    url: "https://www.azedra.com",
    price: "$800,000 (2 doses)"
  },
  {
    id: "cp-radio-004",
    brandName: "Xofigo",
    genericName: "Radium Ra 223 dichloride",
    manufacturer: "Bayer",
    ndcCode: "50419-208-01",
    approvalDate: "2013-05-15",
    indication: "CRPC with Bone Metastases",
    disease: "Prostate Cancer with Bone Metastases",
    therapyType: "Alpha-Emitting Bone-Targeted Therapy",
    icdCodes: ["C61", "C79.51"],
    url: "https://www.xofigo.com",
    price: "$12,000 per dose (6 doses)"
  }
];

export const radioligandTherapyManufacturers: Manufacturer[] = [
  {
    id: "mfr-radio-001",
    name: "Novartis (Advanced Accelerator Applications)",
    type: "pharma",
    headquarters: "Basel, Switzerland",
    specializations: ["Radioligand Therapy", "Nuclear Medicine"],
    therapeuticAreas: ["Prostate Cancer", "Neuroendocrine Tumors"],
    website: "https://www.novartis.com",
    products: ["Pluvicto", "Lutathera"],
    clinicalTrials: 35
  },
  {
    id: "mfr-radio-002",
    name: "Bayer",
    type: "pharma",
    headquarters: "Leverkusen, Germany",
    specializations: ["Targeted Alpha Therapy", "Radiology"],
    therapeuticAreas: ["Oncology", "Cardiology"],
    website: "https://www.bayer.com",
    products: ["Xofigo"],
    clinicalTrials: 28
  },
  {
    id: "mfr-radio-003",
    name: "Lantheus Holdings",
    type: "biotech",
    headquarters: "Bedford, MA, USA",
    specializations: ["Diagnostic Imaging", "Radioligand Therapy"],
    therapeuticAreas: ["Prostate Cancer", "Cardiology"],
    website: "https://www.lantheus.com",
    products: ["Pylarify", "Azedra"],
    clinicalTrials: 15
  },
  {
    id: "mfr-radio-004",
    name: "Fusion Pharmaceuticals",
    type: "biotech",
    headquarters: "Hamilton, Canada",
    specializations: ["Targeted Alpha Therapy", "Actinium-225"],
    therapeuticAreas: ["Solid Tumors", "Prostate Cancer"],
    website: "https://www.fusionpharma.com",
    clinicalTrials: 8
  },
  {
    id: "mfr-radio-005",
    name: "Point Biopharma",
    type: "biotech",
    headquarters: "Indianapolis, IN, USA",
    specializations: ["Radioligand Therapy", "Theranostics"],
    therapeuticAreas: ["Prostate Cancer", "Neuroendocrine"],
    website: "https://www.pointbiopharma.com",
    clinicalTrials: 6
  },
  {
    id: "mfr-radio-006",
    name: "Telix Pharmaceuticals",
    type: "biotech",
    headquarters: "Melbourne, Australia",
    specializations: ["Molecularly Targeted Radiation", "Theranostics"],
    therapeuticAreas: ["Renal Cancer", "Prostate Cancer", "Glioblastoma"],
    website: "https://www.telixpharma.com",
    clinicalTrials: 12
  }
];

export const radioligandTherapyExperimentationAreas: ExperimentationArea[] = [
  { area: "Targeted Alpha Therapy", description: "Alpha-emitting isotopes for higher potency with less off-target damage", organizations: ["Fusion", "Actinium Pharma", "RadioMedix"], status: "Phase 1/2 Trials" },
  { area: "FAP-Targeted RLT", description: "Fibroblast Activation Protein targeting for broad solid tumor applicability", organizations: ["Clovis", "Novartis", "3B Pharma"], status: "Phase 1/2 Trials" },
  { area: "Theranostic Pairs", description: "Companion diagnostics matching imaging and therapy isotopes", organizations: ["Lantheus", "Novartis", "Telix"], status: "Commercial/Expanding" },
  { area: "Brain Tumor RLT", description: "Crossing blood-brain barrier with radioligands", organizations: ["Y-mAbs", "Telix"], status: "Preclinical/Phase 1" }
];

// ==================== AGGREGATE DATA BY MODALITY ====================
export const clinicalDataByModality = {
  'cell-therapy': {
    clinicalTrials: cellTherapyClinicalTrials,
    commercialProducts: cellTherapyCommercialProducts,
    manufacturers: cellTherapyManufacturers,
    experimentationAreas: cellTherapyExperimentationAreas
  },
  'gene-therapy': {
    clinicalTrials: geneTherapyClinicalTrials,
    commercialProducts: geneTherapyCommercialProducts,
    manufacturers: geneTherapyManufacturers,
    experimentationAreas: geneTherapyExperimentationAreas
  },
  'advanced-therapy': {
    clinicalTrials: advancedTherapyClinicalTrials,
    commercialProducts: advancedTherapyCommercialProducts,
    manufacturers: advancedTherapyManufacturers,
    experimentationAreas: advancedTherapyExperimentationAreas
  },
  'personalized-therapy': {
    clinicalTrials: personalizedTherapyClinicalTrials,
    commercialProducts: personalizedTherapyCommercialProducts,
    manufacturers: personalizedTherapyManufacturers,
    experimentationAreas: personalizedTherapyExperimentationAreas
  },
  'radioligand-therapy': {
    clinicalTrials: radioligandTherapyClinicalTrials,
    commercialProducts: radioligandTherapyCommercialProducts,
    manufacturers: radioligandTherapyManufacturers,
    experimentationAreas: radioligandTherapyExperimentationAreas
  }
};
