-- Expand medical imaging knowledge base with additional authoritative datasets
-- Adding entries from TCIA, FastMRI, Pap Smear databases, BCNB, etc.

INSERT INTO public.medical_imaging_knowledge (modality, body_part, finding_category, finding_name, description, clinical_significance, key_features, dataset_source, metadata) VALUES

-- Additional Breast Imaging from BCDR and specialized datasets
('Mammography', 'Breast', 'pathology', 'Architectural Distortion', 'Disruption of normal breast architecture without definite mass', 'Requires further investigation, possible malignancy', '{"appearance": "radial spiculation", "mass": "absent", "distortion": "focal", "asymmetry": true}', 'BCDR', '{"birads": "4", "prevalence": "uncommon but significant"}'),
('Mammography', 'Breast', 'pathology', 'Asymmetry', 'Unilateral area of increased density compared to corresponding area in opposite breast', 'May be normal variant or early sign of malignancy', '{"density": "asymmetric", "mass": "not forming", "location": "focal or global", "change_over_time": "important"}', 'DDSM', '{"birads": "0-3 depending on features"}'),

-- Ultrasound findings from BreastScreening datasets
('Ultrasound', 'Breast', 'pathology', 'Solid Breast Mass', 'Solid hypoechoic mass with irregular borders', 'Suspicious for malignancy if with posterior shadowing and irregular margins', '{"echogenicity": "hypoechoic", "borders": "irregular or spiculated", "shadowing": "posterior acoustic", "orientation": "taller than wide"}', 'UTA4 MIMBCD-UI', '{"birads": "4-5", "requires_biopsy": true}'),
('Ultrasound', 'Breast', 'pathology', 'Simple Cyst', 'Anechoic round structure with posterior acoustic enhancement', 'Benign finding, no intervention needed', '{"echogenicity": "anechoic", "shape": "round or oval", "enhancement": "posterior acoustic", "walls": "imperceptible"}', 'UTA7 MIMBCD-UI', '{"birads": "2", "benign": true}'),

-- MRI findings from FastMRI and ADNI
('MRI', 'Knee', 'pathology', 'Meniscal Tear', 'Linear signal abnormality extending to articular surface of meniscus', 'Common cause of knee pain and mechanical symptoms', '{"signal": "linear hyperintensity", "location": "extends to surface", "types": ["horizontal", "vertical", "complex"], "associated": "joint effusion"}', 'Facebook AI + NYU FastMRI', '{"common_sports_injury": true}'),
('MRI', 'Knee', 'pathology', 'Anterior Cruciate Ligament Tear (FastMRI)', 'Discontinuity or abnormal signal in ACL fibers on MRI', 'Requires orthopedic evaluation for surgical reconstruction', '{"signal": "increased T2", "continuity": "disrupted", "secondary_signs": ["bone bruise", "Segond fracture"], "orientation": "abnormal"}', 'FastMRI Knee Dataset', '{"sports_injury": true, "surgery_often_needed": true}'),

('MRI', 'Brain', 'pathology', 'Alzheimer Disease Atrophy', 'Disproportionate atrophy of hippocampus and medial temporal lobes', 'Characteristic pattern in Alzheimer disease', '{"atrophy": "hippocampal predominant", "white_matter": "periventricular hyperintensities", "enlargement": "temporal horns", "pattern": "medial temporal"}', 'ADNI', '{"neurodegenerative": true, "progressive": true}'),
('MRI', 'Brain', 'normal_anatomy', 'Age-Related White Matter Changes', 'T2/FLAIR hyperintensities in periventricular and deep white matter', 'Normal aging changes, correlate with vascular risk factors', '{"distribution": "periventricular", "signal": "T2/FLAIR hyperintense", "progression": "with age", "location": "deep white matter"}', 'OASIS', '{"age_related": true, "not_pathologic_if_mild": true}'),

-- CT findings from TCIA Collections
('CT', 'Colon', 'pathology', 'Colorectal Polyp', 'Focal mucosal protrusion into colonic lumen', 'Precancerous lesion requiring removal', '{"size": ">6mm significant", "shape": "pedunculated or sessile", "enhancement": "mucosal", "location": "any colon segment"}', 'TCIA CT Colonography', '{"screening_target": true, "precancerous": true}'),
('CT', 'Colon', 'pathology', 'Colorectal Cancer', 'Irregular focal wall thickening with luminal narrowing', 'Malignant tumor requiring staging and treatment', '{"wall_thickening": ">3mm", "pattern": "irregular", "obstruction": "possible", "lymph_nodes": "may be enlarged"}', 'TCIA CT Colonography', '{"malignant": true, "urgency": "high"}'),

('CT', 'Lung', 'pathology', 'Pulmonary Nodule', 'Focal rounded opacity <3cm in lung parenchyma', 'Requires follow-up or biopsy based on size and characteristics', '{"size": "<3cm", "shape": "round or irregular", "calcification": "pattern matters", "growth": "indicates malignancy"}', 'TCIA Lung Cancer', '{"lung_screening_finding": true, "follow_up_critical": true}'),
('CT', 'Lung', 'pathology', 'Ground Glass Opacity', 'Hazy increased lung attenuation with preserved bronchial and vascular margins', 'Can represent infection, inflammation, or early adenocarcinoma', '{"density": "ground glass", "margins": "preserved vessels", "distribution": "focal or diffuse", "differential": "broad"}', 'TCIA Collections', '{"covid19_finding": true, "nonspecific": true}'),

-- Microscopy and Histopathology from TCGA, ICGC, Pap Smear databases
('Microscopy', 'Cervix', 'pathology', 'High-Grade Squamous Intraepithelial Lesion', 'Abnormal squamous cells with nuclear atypia involving >2/3 of epithelium', 'Precancerous lesion requiring treatment', '{"nuclear_enlargement": "marked", "chromatin": "coarse", "maturation": "absent", "depth": ">2/3 epithelium"}', 'SIPAKMed Pap Smear DB', '{"precancerous": true, "hpv_related": true}'),
('Microscopy', 'Cervix', 'pathology', 'Low-Grade Squamous Intraepithelial Lesion', 'Abnormal squamous cells with koilocytotic atypia', 'HPV-related changes, often regresses spontaneously', '{"koilocytes": "present", "nuclear_atypia": "mild", "depth": "<1/3 epithelium", "halo": "perinuclear"}', 'Pap Smear Database #2', '{"hpv_related": true, "watch_and_wait": "possible"}'),

('Microscopy', 'Breast', 'pathology', 'Invasive Ductal Carcinoma', 'Malignant epithelial cells invading beyond basement membrane into stroma', 'Most common type of breast cancer', '{"architecture": "infiltrative", "cells": "pleomorphic", "stroma": "desmoplastic", "tubules": "poorly formed"}', 'TCGA Breast Cancer', '{"malignant": true, "most_common_breast_ca": true}'),
('Microscopy', 'Breast', 'pathology', 'Ductal Carcinoma In Situ', 'Malignant epithelial proliferation confined to ducts without stromal invasion', 'Non-invasive cancer with excellent prognosis if treated', '{"location": "intraductal", "invasion": "absent", "necrosis": "may be present", "calcifications": "often associated"}', 'BCNB Dataset', '{"non_invasive": true, "precursor": "to invasive cancer"}'),

('Microscopy', 'Breast', 'pathology', 'Mitotic Figures', 'Cells undergoing division with condensed chromatin and visible spindle apparatus', 'Indicator of tumor proliferation rate and grade', '{"chromatin": "condensed", "stages": "prophase to telophase", "count": "per 10 HPF", "significance": "grading parameter"}', 'MITOS Dataset', '{"prognostic_marker": true, "grading_criterion": true}'),

-- Additional modalities
('Endoscopy', 'GI Tract', 'pathology', 'Esophageal Varices', 'Dilated submucosal veins in esophagus', 'Complication of portal hypertension, risk of bleeding', '{"appearance": "tortuous veins", "location": "distal esophagus", "risk": "rupture and hemorrhage", "grading": "size based"}', 'El Salvador GI Atlas', '{"urgency": "high if bleeding", "portal_hypertension": true}'),
('Endoscopy', 'GI Tract', 'pathology', 'Gastric Ulcer', 'Mucosal defect in stomach with visible depth', 'Can be benign or malignant, requires biopsy', '{"depth": "beyond mucosa", "margins": "may be irregular", "location": "any stomach region", "complications": ["bleeding", "perforation"]}', 'El Salvador GI Atlas', '{"biopsy_required": true, "h_pylori_testing": true}'),

-- Specialized imaging from research datasets
('fMRI', 'Brain', 'normal_anatomy', 'Default Mode Network', 'Network of brain regions active during rest and self-referential thinking', 'Normal resting-state brain network', '{"regions": ["posterior cingulate", "medial prefrontal", "inferior parietal"], "correlation": "high at rest", "deactivation": "during tasks"}', '1000 Functional Connectomes', '{"resting_state_network": true, "altered_in_disease": true}'),

('Fluorescence Microscopy', 'Cell', 'normal_anatomy', 'Protein Localization Patterns', 'Subcellular distribution of fluorescently-tagged proteins', 'Reveals protein function and cellular organization', '{"patterns": ["nuclear", "cytoplasmic", "membrane", "organelle"], "dynamics": "can be time-lapse", "markers": "specific proteins"}', 'Human Protein Atlas', '{"research_tool": true, "cell_biology": true}'),

-- Whole Slide Imaging
('WSI', 'Multiple', 'quality_issue', 'Out of Focus Areas', 'Regions of whole slide image with poor focus quality', 'Technical artifact affecting diagnostic quality', '{"appearance": "blurred", "cause": "scanning artifact", "impact": "diagnostic uncertainty", "solution": "rescan"}', 'DPA WSI Repository', '{"technical_qc": true, "scanning_artifact": true}'),

-- Developmental biology
('Microscopy', 'Embryo', 'normal_anatomy', 'Developmental Stage Patterns', 'Characteristic gene expression patterns during embryonic development', NULL, '{"stages": "embryonic stages E1-E23", "patterns": "spatiotemporal", "markers": "gene expression", "species": "mouse model"}', 'CIVM Duke Embryonic Atlas', '{"developmental_biology": true, "model_organism": true}')

ON CONFLICT (id) DO NOTHING;

-- Create helper function to search by dataset source
CREATE OR REPLACE FUNCTION search_knowledge_by_dataset(
  dataset_name TEXT,
  limit_count INT DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  modality TEXT,
  finding_name TEXT,
  description TEXT,
  dataset_source TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT
    id,
    modality,
    finding_name,
    description,
    dataset_source
  FROM medical_imaging_knowledge
  WHERE dataset_source ILIKE '%' || dataset_name || '%'
  ORDER BY created_at DESC
  LIMIT limit_count;
$$;

-- Create function to get dataset statistics
CREATE OR REPLACE FUNCTION get_dataset_statistics()
RETURNS JSONB
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT jsonb_build_object(
    'total_findings', COUNT(*),
    'datasets', COUNT(DISTINCT dataset_source),
    'modalities', COUNT(DISTINCT modality),
    'by_modality', (
      SELECT jsonb_object_agg(modality, cnt)
      FROM (
        SELECT modality, COUNT(*) as cnt
        FROM medical_imaging_knowledge
        GROUP BY modality
      ) m
    ),
    'by_dataset', (
      SELECT jsonb_object_agg(dataset_source, cnt)
      FROM (
        SELECT dataset_source, COUNT(*) as cnt
        FROM medical_imaging_knowledge
        GROUP BY dataset_source
        ORDER BY cnt DESC
        LIMIT 20
      ) d
    ),
    'last_updated', MAX(updated_at)
  )
  FROM medical_imaging_knowledge;
$$;

COMMENT ON FUNCTION search_knowledge_by_dataset IS 'Search medical imaging knowledge by dataset name';
COMMENT ON FUNCTION get_dataset_statistics IS 'Get statistics about the medical imaging knowledge base';