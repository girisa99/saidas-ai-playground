-- Add Cancer Research Organizations to universal knowledge base
INSERT INTO public.universal_knowledge_base (
  domain,
  content_type,
  finding_name,
  description,
  clinical_significance,
  metadata,
  dataset_source,
  quality_score,
  is_approved
) VALUES
(
  'medical_imaging',
  'reference',
  'AACR - American Association for Cancer Research',
  'Leading professional organization dedicated to advancing cancer research through scientific meetings, publications, and educational programs.',
  'Premier cancer research organization providing cutting-edge oncology research and clinical trial data',
  jsonb_build_object(
    'source_url', 'https://www.aacr.org/',
    'organization', 'American Association for Cancer Research',
    'abbreviation', 'AACR',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Cancer Research', 'Clinical Trials', 'Oncology Education']
  ),
  'Cancer Research Organizations',
  95,
  true
),
(
  'medical_imaging',
  'reference',
  'ASCO - American Society of Clinical Oncology',
  'World''s leading professional organization representing physicians who care for people with cancer, providing education, guidelines, and research.',
  'Authoritative source for clinical oncology guidelines, educational resources, and cancer treatment standards',
  jsonb_build_object(
    'source_url', 'https://www.asco.org/',
    'organization', 'American Society of Clinical Oncology',
    'abbreviation', 'ASCO',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Clinical Oncology', 'Treatment Guidelines', 'Patient Care']
  ),
  'Cancer Research Organizations',
  95,
  true
),
(
  'medical_imaging',
  'reference',
  'ASCO GI - Gastrointestinal Cancers Symposium',
  'Annual symposium by American Society of Clinical Oncology focused on gastrointestinal cancers including colorectal, pancreatic, gastric, and liver cancers.',
  'Specialized conference for latest advances in GI cancer treatment and research',
  jsonb_build_object(
    'source_url', 'https://meetings.asco.org/meetings/2024-gastrointestinal-cancers-symposium',
    'organization', 'American Society of Clinical Oncology',
    'abbreviation', 'ASCO GI',
    'organization_type', 'Professional Meeting',
    'focus_areas', ARRAY['Gastrointestinal Cancers', 'Colorectal Cancer', 'Pancreatic Cancer', 'Liver Cancer']
  ),
  'Cancer Research Organizations',
  90,
  true
),
(
  'medical_imaging',
  'reference',
  'ASCO GU - Genitourinary Cancers Symposium',
  'Annual symposium by American Society of Clinical Oncology dedicated to genitourinary cancers including prostate, bladder, kidney, and testicular cancers.',
  'Leading conference for genitourinary oncology advances and clinical research',
  jsonb_build_object(
    'source_url', 'https://meetings.asco.org/meetings/2024-genitourinary-cancers-symposium',
    'organization', 'American Society of Clinical Oncology',
    'abbreviation', 'ASCO GU',
    'organization_type', 'Professional Meeting',
    'focus_areas', ARRAY['Genitourinary Cancers', 'Prostate Cancer', 'Bladder Cancer', 'Kidney Cancer']
  ),
  'Cancer Research Organizations',
  90,
  true
),
(
  'medical_imaging',
  'reference',
  'ASH - American Society of Hematology',
  'World''s largest professional society serving hematologists and related healthcare professionals with focus on blood disorders and hematologic malignancies.',
  'Authoritative resource for hematology research, blood cancer treatment, and hematologic disease management',
  jsonb_build_object(
    'source_url', 'https://www.hematology.org/',
    'organization', 'American Society of Hematology',
    'abbreviation', 'ASH',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Hematology', 'Blood Cancers', 'Leukemia', 'Lymphoma', 'Myeloma']
  ),
  'Cancer Research Organizations',
  95,
  true
),
(
  'medical_imaging',
  'reference',
  'AUA - American Urological Association',
  'Leading urological association providing education, research, and guidelines for urologic conditions including genitourinary cancers.',
  'Professional organization for urologic oncology and genitourinary cancer management',
  jsonb_build_object(
    'source_url', 'https://www.auanet.org/',
    'organization', 'American Urological Association',
    'abbreviation', 'AUA',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Urology', 'Prostate Cancer', 'Bladder Cancer', 'Kidney Cancer']
  ),
  'Cancer Research Organizations',
  90,
  true
),
(
  'medical_imaging',
  'reference',
  'EANM - European Association of Nuclear Medicine',
  'European professional organization dedicated to nuclear medicine and molecular imaging for cancer diagnosis and treatment.',
  'Leading resource for nuclear medicine imaging, PET/CT scans, and theranostics in oncology',
  jsonb_build_object(
    'source_url', 'https://www.eanm.org/',
    'organization', 'European Association of Nuclear Medicine',
    'abbreviation', 'EANM',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Nuclear Medicine', 'Molecular Imaging', 'PET/CT', 'Theranostics']
  ),
  'Cancer Research Organizations',
  90,
  true
),
(
  'medical_imaging',
  'reference',
  'EAU - European Association of Urology',
  'Leading European urological organization providing guidelines and education for urologic cancers and genitourinary conditions.',
  'European authority on urologic oncology guidelines and treatment protocols',
  jsonb_build_object(
    'source_url', 'https://uroweb.org/',
    'organization', 'European Association of Urology',
    'abbreviation', 'EAU',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Urology', 'Prostate Cancer', 'Bladder Cancer', 'Kidney Cancer']
  ),
  'Cancer Research Organizations',
  90,
  true
),
(
  'medical_imaging',
  'reference',
  'EHA - European Hematology Association',
  'European professional organization for hematologists focusing on blood disorders, leukemia, lymphoma, and other hematologic malignancies.',
  'Premier European resource for hematology research and blood cancer treatment',
  jsonb_build_object(
    'source_url', 'https://ehaweb.org/',
    'organization', 'European Hematology Association',
    'abbreviation', 'EHA',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Hematology', 'Leukemia', 'Lymphoma', 'Blood Disorders']
  ),
  'Cancer Research Organizations',
  92,
  true
),
(
  'medical_imaging',
  'reference',
  'EBMT - European Society for Blood and Marrow Transplantation',
  'European organization dedicated to blood and marrow transplantation for hematologic malignancies and blood disorders.',
  'Leading resource for stem cell transplantation and cellular therapy in cancer treatment',
  jsonb_build_object(
    'source_url', 'https://www.ebmt.org/',
    'organization', 'European Society for Blood and Marrow Transplantation',
    'abbreviation', 'EBMT',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Bone Marrow Transplant', 'Stem Cell Therapy', 'Cellular Therapy', 'Hematologic Malignancies']
  ),
  'Cancer Research Organizations',
  90,
  true
),
(
  'medical_imaging',
  'reference',
  'ENETS - European Neuroendocrine Tumor Society',
  'European society dedicated to neuroendocrine tumors providing research, education, and clinical guidelines for NET diagnosis and treatment.',
  'Specialized organization for neuroendocrine tumor research and management',
  jsonb_build_object(
    'source_url', 'https://www.enets.org/',
    'organization', 'European Neuroendocrine Tumor Society',
    'abbreviation', 'ENETS',
    'organization_type', 'Professional Association',
    'focus_areas', ARRAY['Neuroendocrine Tumors', 'Carcinoid Tumors', 'Pancreatic NETs']
  ),
  'Cancer Research Organizations',
  88,
  true
),
(
  'medical_imaging',
  'reference',
  'ESMO/IASLC - European Lung Cancer Congress',
  'Joint congress by European Society for Medical Oncology and International Association for the Study of Lung Cancer focused on lung cancer research and treatment.',
  'Premier European conference for lung cancer research, treatment advances, and clinical trials',
  jsonb_build_object(
    'source_url', 'https://www.esmo.org/meeting-calendar/past-meetings/european-lung-cancer-congress-2024',
    'organization', 'European Society For Medical Oncology / International Association of the Study of Lung Cancer',
    'abbreviation', 'ESMO/IASLC',
    'organization_type', 'Professional Meeting',
    'focus_areas', ARRAY['Lung Cancer', 'Thoracic Oncology', 'NSCLC', 'SCLC']
  ),
  'Cancer Research Organizations',
  92,
  true
),
(
  'medical_imaging',
  'reference',
  'SABCS - San Antonio Breast Cancer Symposium',
  'Premier international scientific conference focused on breast cancer research, prevention, and treatment advances.',
  'Leading annual symposium for breast cancer research and clinical trial results',
  jsonb_build_object(
    'source_url', 'https://www.sabcs.org',
    'organization', 'San Antonio Breast Cancer Symposium',
    'abbreviation', 'SABCS',
    'organization_type', 'Professional Meeting',
    'focus_areas', ARRAY['Breast Cancer', 'Oncology Research', 'Clinical Trials', 'Treatment Advances']
  ),
  'Cancer Research Organizations',
  95,
  true
)
ON CONFLICT DO NOTHING;