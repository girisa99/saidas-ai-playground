import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface KnowledgeEntry {
  finding_name: string;
  description: string;
  domain: string;
  content_type: string;
  metadata: any;
  clinical_context: any;
  quality_score: number;
  is_approved: boolean;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const knowledgeEntries: KnowledgeEntry[] = [];

    // ============ PRICING ECOSYSTEM ============
    knowledgeEntries.push({
      finding_name: '340B Drug Pricing Program',
      description: `Federal program requiring drug manufacturers to provide discounts to eligible healthcare organizations.

Key Points:
• Discounts of 20-50% off Average Wholesale Price (AWP)
• Eligible entities: FQHCs, DSH hospitals, Ryan White clinics
• Must serve vulnerable populations
• Contract pharmacy arrangements allowed

Challenges:
• Manufacturer restrictions on contract pharmacies
• Audit compliance requirements
• Duplicate discount prevention
• Complex eligibility tracking`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'pricing_models',
        tags: ['340B', 'drug pricing', 'federal program', 'discounts', 'safety net'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['alternative_funding', 'cost_savings', 'access_programs']
      },
      quality_score: 95,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Wholesale Acquisition Cost (WAC)',
      description: `Manufacturer's list price to wholesalers or direct purchasers.

Key Points:
• Published price before any discounts or rebates
• Used as basis for many reimbursement calculations
• Different from Average Wholesale Price (AWP)
• Required reporting to CMS for Medicare Part B

WAC is the starting point for drug pricing negotiations and reimbursement discussions.`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'pricing_models',
        tags: ['WAC', 'drug pricing', 'wholesale', 'list price', 'reimbursement basis'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['pricing', 'reimbursement', 'cost_calculations']
      },
      quality_score: 95,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Government Pricing and Federal Ceiling Price',
      description: `Federal pricing programs for government healthcare entities.

Key Programs:
• Federal Ceiling Price (FCP) - Maximum price federal agencies pay
• Veterans Affairs (VA) pricing - Discounted rates for VA healthcare
• Department of Defense (DoD) pricing
• Public Health Service (PHS) pricing

Benefits:
• Significant discounts for federal healthcare systems
• Standardized pricing across agencies
• Mandatory manufacturer participation
• Price transparency requirements`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'government_pricing',
        tags: ['government pricing', 'FCP', 'VA pricing', 'federal programs', 'DoD'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['federal_pricing', 'government_programs', 'cost_controls']
      },
      quality_score: 90,
      is_approved: true
    });

    // ============ GROUP PURCHASING ORGANIZATIONS (GPO) ============
    knowledgeEntries.push({
      finding_name: 'Group Purchasing Organizations (GPOs)',
      description: `Entities that negotiate contracts with manufacturers on behalf of healthcare providers.

Key Functions:
• Aggregate purchasing power of member organizations
• Negotiate volume discounts and rebates
• Standardize products across health systems
• Provide market intelligence and analytics

Major Players:
• Premier Inc. (largest acute care GPO)
• Vizient (formed from VHA and UHC merger)
• HealthTrust (HCA's GPO)
• MedAssets/Intalere (now part of Vizient)

Benefits:
• Cost savings through volume discounts (typically 10-18%)
• Reduced administrative burden
• Standardized products and processes
• Market intelligence and benchmarking

Challenges:
• Limited flexibility for individual facilities
• Potential conflicts of interest with vendor fees
• May not always achieve best price for specialty items
• Compliance monitoring requirements`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'purchasing_organizations',
        tags: ['GPO', 'group purchasing', 'healthcare procurement', 'volume discounts', 'supply chain'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['procurement', 'cost_savings', 'supply_chain_management']
      },
      quality_score: 92,
      is_approved: true
    });

    // ============ REIMBURSEMENT & CLAIMS ============
    knowledgeEntries.push({
      finding_name: 'Prior Authorization Process',
      description: `Clinical documentation and approval process required before certain treatments.

Process Steps:
1. Clinical documentation review
2. Medical necessity determination
3. Coverage policy alignment
4. Appeal process if denied

Timelines:
• Standard PA: 14 business days
• Expedited PA: 72 hours
• Emergency: 24 hours

Common Requirements:
• Medical records supporting necessity
• Treatment alternatives tried and failed
• Specialist recommendations
• Diagnostic test results`,
      domain: 'conversational',
      content_type: 'protocol',
      metadata: {
        category: 'reimbursement',
        tags: ['prior authorization', 'PA', 'medical necessity', 'insurance approval', 'claims'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['prior_auth', 'insurance_approval', 'utilization_management']
      },
      quality_score: 93,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Claims Submission and Processing',
      description: `Process for submitting and managing healthcare claims for reimbursement.

Required Information:
• Accurate CPT/HCPCS codes (procedure codes)
• ICD-10 diagnostic codes
• Place of service codes
• Modifier usage
• Provider NPI and credentials
• Prior authorization numbers

Digital Health Specific Codes:
• Telehealth modifiers (95, GT, GQ)
• Remote monitoring codes (99453-99458)
• Digital therapeutic specific codes
• Outcome reporting requirements

Common Denial Reasons to Avoid:
• Missing or incorrect patient information
• Lack of prior authorization
• Medical necessity not established
• Coding errors
• Timely filing limits exceeded
• Duplicate submissions`,
      domain: 'conversational',
      content_type: 'protocol',
      metadata: {
        category: 'claims_processing',
        tags: ['claims', 'billing', 'CPT codes', 'ICD-10', 'reimbursement', 'coding'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['claims_submission', 'billing', 'revenue_cycle']
      },
      quality_score: 94,
      is_approved: true
    });

    // ============ COPAY ASSISTANCE & PATIENT SUPPORT ============
    knowledgeEntries.push({
      finding_name: 'Patient Assistance and Copay Programs',
      description: `Financial support programs to help patients afford medications and treatments.

Patient Assistance Programs:
• Copay reduction programs (manufacturer coupons)
• Free drug programs for uninsured/underinsured
• Travel assistance for specialty treatments
• Lodging support for out-of-town care
• Foundation assistance programs

Provider Support Services:
• Prior authorization assistance
• Claims submission support
• Appeal letter templates
• Coverage verification tools
• Reimbursement hotlines

Digital Health Support:
• DTx prescription support
• Patient onboarding assistance
• Outcome data collection
• Provider training programs

Eligibility Typically Based On:
• Income level (often 300-500% of federal poverty level)
• Insurance status
• Specific diagnosis/treatment
• Citizenship/residency requirements`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'patient_assistance',
        tags: ['copay', 'patient assistance', 'financial support', 'free drugs', 'foundation programs'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['patient_access', 'financial_assistance', 'affordability']
      },
      quality_score: 91,
      is_approved: true
    });

    // ============ CLINICAL TRIALS ============
    knowledgeEntries.push({
      finding_name: 'Clinical Trial Inclusion and Exclusion Criteria',
      description: `Guidelines determining patient eligibility for clinical research studies.

Common Inclusion Criteria:
• Specific diagnosis or disease stage
• Age range requirements
• Disease biomarkers or genetic markers
• Performance status (ECOG, Karnofsky)
• Organ function requirements
• Prior treatment history
• Informed consent ability

Common Exclusion Criteria:
• Concurrent serious medical conditions
• Prior cancer or active malignancy
• Pregnancy or breastfeeding
• Recent major surgery
• Active infections
• Organ dysfunction
• Concurrent investigational treatments
• Certain medications or therapies

Screening Process:
1. Initial eligibility assessment
2. Detailed medical history review
3. Laboratory and imaging tests
4. Physical examination
5. Informed consent discussion
6. Final eligibility determination

Coverage and Costs:
• Routine care often covered by insurance
• Investigational treatment typically free
• Some trials provide travel/lodging support`,
      domain: 'conversational',
      content_type: 'protocol',
      metadata: {
        category: 'clinical_trials',
        tags: ['clinical trials', 'inclusion criteria', 'exclusion criteria', 'eligibility', 'research'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['research', 'patient_recruitment', 'trial_access']
      },
      quality_score: 90,
      is_approved: true
    });

    // ============ TREATMENT CENTERS & FACILITIES ============
    knowledgeEntries.push({
      finding_name: 'Treatment Center Types and Capabilities',
      description: `Different healthcare facility types and their specialized services.

Infusion Centers:
• Outpatient infusion therapy
• Chemotherapy administration
• Immunotherapy treatments
• Biologic medications
• IV antibiotics and hydration

Specialty Treatment Centers:
• Cancer centers (oncology)
• Transplant centers (bone marrow, organ)
• Rare disease centers
• Gene therapy centers
• Cell therapy facilities

Accreditations and Certifications:
• Joint Commission accreditation
• NCI Cancer Center designation
• CAR-T certification
• Transplant program certification
• Specialty pharmacy accreditation

Services Provided:
• Treatment administration
• Clinical trials enrollment
• Multidisciplinary care teams
• Patient education
• Financial counseling
• Social work support`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'treatment_facilities',
        tags: ['treatment centers', 'infusion centers', 'specialty care', 'facilities', 'accreditation'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['site_of_care', 'facility_networks', 'care_delivery']
      },
      quality_score: 88,
      is_approved: true
    });

    // ============ THERAPEUTIC AREAS ============
    knowledgeEntries.push({
      finding_name: 'Oncology Treatments and Therapies',
      description: `Comprehensive overview of cancer treatment modalities.

Treatment Categories:
• Chemotherapy (traditional cytotoxic)
• Targeted Therapy (molecular targeted agents)
• Immunotherapy (checkpoint inhibitors, CAR-T)
• Hormone Therapy (breast, prostate cancer)
• Radiation Therapy

Common Immunotherapy Drugs:
• Keytruda (pembrolizumab)
• Opdivo (nivolumab)
• Yervoy (ipilimumab)
• Tecentriq (atezolizumab)

Targeted Therapies:
• Herceptin (trastuzumab) - HER2+ breast cancer
• Gleevec (imatinib) - CML
• Avastin (bevacizumab) - angiogenesis inhibitor

Reimbursement Challenges:
• Biomarker testing requirements
• Companion diagnostic coverage
• Step therapy protocols
• Site of care considerations
• High cost management

Support Programs:
• Oncology Care Model (OCM)
• Enhanced Oncology Model (EOM)
• Patient access programs
• Foundation assistance`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'therapeutics_oncology',
        tags: ['oncology', 'cancer', 'immunotherapy', 'chemotherapy', 'targeted therapy', 'Keytruda', 'Opdivo'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['specialty_pharmacy', 'medical_benefit', 'high_cost_drugs']
      },
      quality_score: 96,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Cell and Gene Therapies',
      description: `Revolutionary treatments using cellular and genetic modification.

CAR-T Cell Therapies:
• Kymriah (tisagenlecleucel) - ALL, DLBCL
• Yescarta (axicabtagene ciloleucel) - LBCL
• Tecartus (brexucabtagene autoleucel) - MCL
• Breyanzi (lisocabtagene maraleucel) - LBCL

Gene Therapies:
• Luxturna (voretigene neparvovec) - inherited retinal disease
• Zolgensma (onasemnogene abeparvovec) - SMA
• Hemgenix (etranacogene dezaparvovec) - Hemophilia B

Treatment Process:
1. Cell collection from patient (apheresis)
2. Laboratory modification/enhancement
3. Quality control and testing
4. Patient conditioning regimen
5. Reinfusion to patient
6. Monitoring and follow-up

Reimbursement Challenges:
• Extremely high cost per treatment ($400K-$2M+)
• Outcome-based contracts
• Prior authorization complexity
• Long-term outcome tracking
• Coverage determination processes

Support Programs:
• Medicare Coverage Advisory Committee (MEDCAC)
• FDA Breakthrough Therapy Designation
• Manufacturer patient assistance
• State Medicaid programs`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'therapeutics_cell_gene',
        tags: ['CAR-T', 'gene therapy', 'cell therapy', 'Kymriah', 'Yescarta', 'personalized medicine'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['high_cost_therapy', 'outcomes_based_contracting', 'specialty_care']
      },
      quality_score: 97,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Multiple Sclerosis (MS) Treatments',
      description: `Disease-modifying therapies and management for multiple sclerosis.

Disease-Modifying Therapies (DMTs):
Injectable:
• Copaxone (glatiramer acetate)
• Betaseron, Avonex, Rebif (interferon beta)

Oral Therapies:
• Tecfidera (dimethyl fumarate)
• Gilenya (fingolimod)
• Mayzent (siponimod)
• Zeposia (ozanimod)
• Vumerity (diroximel fumarate)

Infusion Therapies:
• Tysabri (natalizumab)
• Ocrevus (ocrelizumab)
• Lemtrada (alemtuzumab)
• Kesimpta (ofatumumab)

Treatment Selection Based On:
• MS type (RRMS, SPMS, PPMS)
• Disease activity and progression
• Safety profile and monitoring requirements
• Patient lifestyle and preferences
• Insurance coverage and access

Reimbursement Considerations:
• Specialty pharmacy requirement
• Prior authorization criteria
• Step therapy requirements
• MRI monitoring coverage
• Infusion site of care`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'therapeutics_neurology',
        tags: ['multiple sclerosis', 'MS', 'DMT', 'Ocrevus', 'Tysabri', 'neurology'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['specialty_pharmacy', 'chronic_disease', 'infusion_therapy']
      },
      quality_score: 93,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Breast Cancer Treatments',
      description: `Treatment options for breast cancer across different subtypes.

Hormone Receptor Positive (HR+):
• Tamoxifen (premenopausal, postmenopausal)
• Aromatase inhibitors (letrozole, anastrozole, exemestane)
• Fulvestrant (Faslodex)
• CDK 4/6 inhibitors: Ibrance, Kisqali, Verzenio

HER2 Positive:
• Trastuzumab (Herceptin)
• Pertuzumab (Perjeta)
• Ado-trastuzumab emtansine (Kadcyla)
• Fam-trastuzumab deruxtecan (Enhertu)
• Tucatinib (Tukysa)
• Neratinib (Nerlynx)

Triple Negative Breast Cancer (TNBC):
• Chemotherapy (various regimens)
• Immunotherapy: Keytruda (pembrolizumab)
• PARP inhibitors (for BRCA mutations)
• Trodelvy (sacituzumab govitecan)

Biomarker Testing:
• ER/PR hormone receptor status
• HER2 testing (IHC, FISH)
• Oncotype DX (recurrence score)
• BRCA1/2 mutation testing
• PD-L1 expression

Coverage Considerations:
• Biomarker testing coverage
• Companion diagnostic requirements
• Oral parity laws
• Site of care restrictions`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'therapeutics_oncology_breast',
        tags: ['breast cancer', 'HER2', 'hormone therapy', 'Herceptin', 'Ibrance', 'oncology'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['biomarker_testing', 'specialty_pharmacy', 'oral_oncology']
      },
      quality_score: 94,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Diabetes and Cardiovascular Treatments',
      description: `Medications for diabetes management and cardiovascular disease.

Type 2 Diabetes:
GLP-1 Agonists:
• Ozempic (semaglutide) - once weekly
• Mounjaro (tirzepatide) - dual GIP/GLP-1
• Trulicity (dulaglutide)
• Victoza (liraglutide)

SGLT2 Inhibitors:
• Jardiance (empagliflozin)
• Farxiga (dapagliflozin)
• Invokana (canagliflozin)

Insulin:
• Rapid-acting, short-acting, intermediate, long-acting
• Biosimilar insulin options

Cardiovascular:
Heart Failure:
• Entresto (sacubitril/valsartan)
• SGLT2 inhibitors (also for heart failure)

Cholesterol:
• Statins (atorvastatin, rosuvastatin)
• PCSK9 inhibitors (Repatha, Praluent)
• Leqvio (inclisiran)

Anticoagulation:
• Direct oral anticoagulants (DOACs)
• Warfarin
• Antiplatelet therapy

Coverage Challenges:
• Step therapy for newer agents
• Formulary tier placement
• Quantity limits
• Prior authorization for PCSK9 inhibitors`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'therapeutics_cardio_metabolic',
        tags: ['diabetes', 'cardiovascular', 'GLP-1', 'Ozempic', 'Mounjaro', 'heart failure', 'cholesterol'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['chronic_disease', 'formulary_management', 'utilization_management']
      },
      quality_score: 92,
      is_approved: true
    });

    knowledgeEntries.push({
      finding_name: 'Mental Health and Psychiatry Treatments',
      description: `Medications and therapies for mental health conditions.

Depression and Anxiety:
SSRIs:
• Prozac (fluoxetine)
• Zoloft (sertraline)
• Lexapro (escitalopram)

SNRIs:
• Effexor (venlafaxine)
• Cymbalta (duloxetine)
• Pristiq (desvenlafaxine)

Atypical Antidepressants:
• Wellbutrin (bupropion)
• Trintellix (vortioxetine)
• Spravato (esketamine) - treatment-resistant depression

Bipolar Disorder:
• Lithium
• Lamictal (lamotrigine)
• Depakote (valproic acid)
• Atypical antipsychotics

Schizophrenia:
Typical Antipsychotics:
• Haloperidol
• Chlorpromazine

Atypical Antipsychotics:
• Abilify (aripiprazole)
• Zyprexa (olanzapine)
• Risperdal (risperidone)
• Clozaril (clozapine) - treatment-resistant
• Rexulti (brexpiprazole)

Long-Acting Injectables:
• Invega Sustenna, Trinza
• Abilify Maintena
• Aristada

Digital Therapeutics for Mental Health:
• Prescription DTx for depression
• CBT-based digital interventions
• Addiction recovery apps
• PTSD treatment platforms

Coverage:
• Mental health parity requirements
• Prior authorization for newer agents
• Step therapy protocols
• Medication management codes`,
      domain: 'conversational',
      content_type: 'guideline',
      metadata: {
        category: 'therapeutics_mental_health',
        tags: ['mental health', 'psychiatry', 'depression', 'schizophrenia', 'bipolar', 'antipsychotics', 'SSRIs'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['behavioral_health', 'mental_health_parity', 'digital_therapeutics']
      },
      quality_score: 91,
      is_approved: true
    });

    // ============ EDUCATIONAL AWARENESS ============
    knowledgeEntries.push({
      finding_name: 'Patient Education and Disease Awareness',
      description: `Resources and programs for patient education and disease awareness.

Educational Programs:
• Disease-specific education (cancer, diabetes, heart disease)
• Medication education and adherence programs
• Treatment decision-making tools
• Self-management training
• Caregiver education

Awareness Campaigns:
• National health observances
• Disease awareness months
• Screening campaigns
• Prevention education
• Risk factor awareness

Educational Materials:
• Patient brochures and guides
• Video education content
• Interactive digital tools
• Mobile health apps
• Support group resources

Healthcare Literacy:
• Plain language health information
• Cultural and linguistic adaptation
• Health numeracy skills
• Digital health literacy
• Shared decision-making tools

Provider Education:
• Continuing medical education (CME)
• Clinical guidelines and protocols
• Treatment algorithm tools
• Formulary education
• Prior authorization guidance`,
      domain: 'conversational',
      content_type: 'educational_content',
      metadata: {
        category: 'patient_education',
        tags: ['patient education', 'health literacy', 'awareness', 'disease education', 'self-management'],
        source_type: 'comprehensive_healthcare_knowledge'
      },
      clinical_context: {
        business_operations: ['patient_engagement', 'health_literacy', 'education_programs']
      },
      quality_score: 87,
      is_approved: true
    });

    // Insert all entries
    console.log(`Preparing to insert ${knowledgeEntries.length} healthcare knowledge entries...`);

    const { data, error } = await supabaseClient
      .from('universal_knowledge_base')
      .insert(knowledgeEntries)
      .select('id');

    if (error) {
      console.error('Error inserting knowledge entries:', error);
      throw error;
    }

    console.log(`Successfully inserted ${data?.length || 0} healthcare knowledge entries`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Healthcare knowledge base populated successfully',
        entries_created: data?.length || 0,
        categories: [
          'Pricing Models (340B, WAC, Government Pricing)',
          'Group Purchasing Organizations (GPO)',
          'Reimbursement & Claims Processing',
          'Prior Authorization',
          'Patient Assistance & Copay Programs',
          'Clinical Trials (Inclusion/Exclusion)',
          'Treatment Centers & Facilities',
          'Oncology Therapeutics',
          'Cell & Gene Therapies',
          'Multiple Sclerosis Treatments',
          'Breast Cancer Treatments',
          'Diabetes & Cardiovascular',
          'Mental Health & Psychiatry',
          'Patient Education & Awareness'
        ]
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in populate-healthcare-knowledge:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
