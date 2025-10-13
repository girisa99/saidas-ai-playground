-- Add BMS Media Library resources to universal knowledge base
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
  'patient_onboarding',
  'reference',
  'Bristol Myers Squibb Media Library',
  'Comprehensive media library providing access to disease state, scientific and corporate resources from Bristol Myers Squibb. Includes fact sheets, infographics, key financial information, and media contacts for press inquiries.',
  'Pharmaceutical company media resources for oncology, immunology, cardiovascular and hematology therapeutic areas',
  jsonb_build_object(
    'source_url', 'https://www.bms.com/media/media-library.html',
    'organization', 'Bristol Myers Squibb',
    'organization_type', 'Pharmaceutical Company',
    'resource_type', 'Media Library',
    'focus_areas', ARRAY['Oncology', 'Immunology', 'Cardiovascular', 'Hematology'],
    'content_types', ARRAY['Fact Sheets', 'Infographics', 'Scientific Materials', 'Corporate Assets'],
    'media_contact', 'media@bms.com'
  ),
  'BMS Media Library',
  90,
  true
),
(
  'patient_onboarding',
  'reference',
  'BMS Scientific Media Resources',
  'Scientific media resources from Bristol Myers Squibb including fact sheets, infographics and other scientific materials covering their research, clinical trials, and therapeutic innovations.',
  'Scientific and clinical research materials for healthcare professionals and researchers',
  jsonb_build_object(
    'source_url', 'https://www.bms.com/media/media-library/scientific-media-resources.html',
    'organization', 'Bristol Myers Squibb',
    'resource_category', 'Scientific Media',
    'content_format', ARRAY['PDF', 'Infographics', 'Fact Sheets'],
    'audience', ARRAY['Healthcare Professionals', 'Researchers', 'Media']
  ),
  'BMS Media Library',
  85,
  true
),
(
  'patient_onboarding',
  'reference',
  'BMS Disease State Resources',
  'Downloadable infographics and fact sheets covering different cancers and disease types from Bristol Myers Squibb. Comprehensive disease state information for various oncology indications and therapeutic areas.',
  'Disease state education materials for oncology, hematology, immunology and cardiovascular conditions',
  jsonb_build_object(
    'source_url', 'https://www.bms.com/media/media-library/disease-state-infographics.html',
    'organization', 'Bristol Myers Squibb',
    'resource_category', 'Disease State Education',
    'therapeutic_areas', ARRAY['Oncology', 'Hematology', 'Immunology', 'Cardiovascular'],
    'content_format', ARRAY['Infographics', 'Fact Sheets', 'Patient Education Materials']
  ),
  'BMS Media Library',
  88,
  true
),
(
  'patient_onboarding',
  'reference',
  'BMS Corporate Resources',
  'Corporate media assets from Bristol Myers Squibb including logos, brand guidelines, executive biographies, and company information for media use.',
  'Corporate and brand materials for media and press use',
  jsonb_build_object(
    'source_url', 'https://www.bms.com/media/media-library/corporate-resources.html',
    'organization', 'Bristol Myers Squibb',
    'resource_category', 'Corporate Media',
    'asset_types', ARRAY['Logos', 'Brand Guidelines', 'Executive Bios', 'Company Information'],
    'usage', 'Media and Press Use'
  ),
  'BMS Media Library',
  80,
  true
),
(
  'patient_onboarding',
  'reference',
  'BMS Key Facts and Financial Information',
  'Key financial information on BMS medicines including revenue and market performance data. Access to critical business metrics and product performance information.',
  'Financial and business performance data for BMS pharmaceutical products',
  jsonb_build_object(
    'source_url', 'https://www.bms.com/media/media-library/key-facts.html',
    'organization', 'Bristol Myers Squibb',
    'resource_category', 'Financial Information',
    'data_types', ARRAY['Revenue', 'Market Performance', 'Product Metrics'],
    'audience', ARRAY['Investors', 'Analysts', 'Media']
  ),
  'BMS Media Library',
  85,
  true
)
ON CONFLICT DO NOTHING;