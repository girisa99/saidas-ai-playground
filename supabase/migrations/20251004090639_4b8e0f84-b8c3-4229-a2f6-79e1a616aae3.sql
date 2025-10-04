-- Add new authoritative medical imaging datasets to RAG knowledge base
-- Including: MedPix, MedMNIST, NIH Chest X-ray, OpenNeuro, MIDRC

-- MedPix: Medical Image Database with Expert Captions
INSERT INTO medical_imaging_knowledge (
  finding_name, modality, body_part, finding_category, description, clinical_significance, 
  key_features, differential_diagnosis, dataset_source, metadata
) VALUES
  ('MedPix Reference - Normal Chest Anatomy', 'X-Ray', 'Chest', 'Normal Anatomy',
   'Normal chest radiograph demonstrating typical anatomical landmarks and structures with expert-annotated captions',
   'Reference standard for normal chest X-ray interpretation, includes patient demographics and detailed metadata',
   '{"anatomical_landmarks": ["trachea", "carina", "heart_borders", "lung_fields", "diaphragm"], "expert_annotations": true, "patient_metadata": true}'::jsonb,
   ARRAY[]::text[],
   'MedPix Database', 
   '{"validation_status": "peer_reviewed", "url": "https://medpix.nlm.nih.gov/home", "searchable_by": ["symptoms", "diagnosis", "keywords"], "has_patient_demographics": true}'::jsonb),
   
  ('MedPix Reference - Pneumonia Patterns', 'X-Ray', 'Chest', 'Infectious Disease',
   'Collection of pneumonia cases with expert-written captions detailing consolidation patterns, air bronchograms, and distribution',
   'Educational resource for pneumonia recognition with symptom-diagnosis correlation and keyword-searchable metadata',
   '{"consolidation_patterns": true, "air_bronchograms": true, "pleural_effusion": false, "expert_captions": true}'::jsonb,
   ARRAY['Atelectasis', 'Pulmonary Edema', 'Lung Mass'],
   'MedPix Database',
   '{"validation_status": "clinically_validated", "expert_written_captions": true, "organ_system_categorized": true}'::jsonb),

  ('MedPix Reference - Brain MRI Atlas', 'MRI', 'Brain', 'Neuroimaging Atlas',
   'Comprehensive brain MRI atlas with T1, T2, FLAIR sequences and expert annotations of normal and pathological findings',
   'Educational atlas with organ system categorization and pathology-specific metadata for symptom-based searches',
   '{"sequences": ["T1", "T2", "FLAIR", "DWI"], "anatomical_regions": true, "pathology_keywords": true}'::jsonb,
   ARRAY[]::text[],
   'MedPix Database',
   '{"validation_status": "peer_reviewed", "multi_sequence": true, "educational_focus": true}'::jsonb),

  ('MedPix Reference - Abdominal CT Atlas', 'CT', 'Abdomen', 'Normal Anatomy',
   'Comprehensive abdominal CT atlas with contrast phases and organ-specific protocols',
   'Reference for normal abdominal anatomy with searchable organ system and pathology keywords',
   '{"contrast_phases": ["non_contrast", "arterial", "portal_venous", "delayed"], "organs": ["liver", "pancreas", "kidneys", "spleen"]}'::jsonb,
   ARRAY[]::text[],
   'MedPix Database',
   '{"validation_status": "peer_reviewed", "multi_phase_imaging": true}'::jsonb);

-- MedMNIST: Standardized Lightweight Medical Image Datasets
INSERT INTO medical_imaging_knowledge (
  finding_name, modality, body_part, finding_category, description, clinical_significance,
  key_features, differential_diagnosis, dataset_source, metadata
) VALUES
  ('PathMNIST - Colorectal Cancer Histology', 'Microscopy', 'Colon', 'Histopathology',
   '9-class colorectal cancer histology classification from 107,180 images (224x224)',
   'Standardized benchmark for machine learning models in digital pathology, includes adenomas, mucinous adenocarcinoma',
   '{"image_size": "224x224", "classes": 9, "task": "multi_class_classification", "sample_count": 107180}'::jsonb,
   ARRAY['Normal Tissue', 'Benign Polyp', 'Adenocarcinoma'],
   'MedMNIST Collection',
   '{"validation_status": "research_validated", "standardized": true, "lightweight": true, "ml_benchmark": true, "url": "https://medmnist.com"}'::jsonb),

  ('ChestMNIST - Thoracic Disease Detection', 'X-Ray', 'Chest', 'Multi-Disease Classification',
   '14-class chest X-ray disease classification from NIH ChestX-ray14 dataset (28x28 downsampled)',
   'Lightweight benchmark for pneumonia, atelectasis, cardiomegaly, effusion detection in chest radiographs',
   '{"image_size": "28x28", "classes": 14, "multi_label": true, "source": "NIH_ChestX-ray14"}'::jsonb,
   ARRAY['Pneumonia', 'Atelectasis', 'Cardiomegaly', 'Effusion', 'Infiltration'],
   'MedMNIST Collection',
   '{"validation_status": "research_validated", "derived_from": "NIH ChestX-ray14", "FAIR_compliant": true}'::jsonb),

  ('RetinaMNIST - Diabetic Retinopathy Grading', 'Fundus Photography', 'Eye', 'Diabetic Retinopathy',
   '5-class diabetic retinopathy severity grading from 1,600 retinal fundus images',
   'Standardized dataset for automated DR screening with grading levels from no DR to proliferative DR',
   '{"image_size": "28x28", "classes": 5, "task": "ordinal_regression", "sample_count": 1600}'::jsonb,
   ARRAY['No DR', 'Mild DR', 'Moderate DR', 'Severe DR', 'Proliferative DR'],
   'MedMNIST Collection',
   '{"validation_status": "clinically_validated", "ordinal_classification": true, "screening_application": true}'::jsonb),

  ('OrganMNIST3D - Abdominal Organ Segmentation', 'CT', 'Abdomen', '3D Segmentation',
   '11-class 3D organ segmentation from abdominal CT scans (28x28x28)',
   'Standardized 3D medical image benchmark for liver, kidney, spleen, pancreas segmentation',
   '{"image_size": "28x28x28", "classes": 11, "task": "multi_class_segmentation", "modality": "3D_CT"}'::jsonb,
   ARRAY[]::text[],
   'MedMNIST Collection',
   '{"validation_status": "research_validated", "3D_dataset": true, "organ_segmentation": true}'::jsonb);

-- NIH Chest X-ray Dataset (ChestX-ray14)
INSERT INTO medical_imaging_knowledge (
  finding_name, modality, body_part, finding_category, description, clinical_significance,
  key_features, differential_diagnosis, dataset_source, metadata
) VALUES
  ('NIH ChestX-ray14 - Pneumonia Detection', 'X-Ray', 'Chest', 'Infectious Disease',
   'Large-scale chest X-ray dataset with 112,120 frontal-view images from 30,805 unique patients with 14 disease labels',
   'Publicly available benchmark for computer-aided diagnosis of pneumonia and 13 other thoracic diseases',
   '{"total_images": 112120, "patients": 30805, "disease_labels": 14, "multi_label": true, "bounding_boxes": true}'::jsonb,
   ARRAY['Atelectasis', 'Cardiomegaly', 'Effusion', 'Infiltration', 'Mass', 'Nodule', 'Pneumonia', 'Pneumothorax'],
   'NIH Clinical Center',
   '{"validation_status": "clinically_validated", "public_dataset": true, "url": "https://nihcc.app.box.com/v/ChestXray-NIHCC", "FAIR_principles": true}'::jsonb),

  ('NIH ChestX-ray14 - Tuberculosis Screening', 'X-Ray', 'Chest', 'Infectious Disease',
   'Subset focused on tuberculosis detection with characteristic upper lobe infiltrates and cavitation',
   'Public health screening tool development for TB detection in chest radiographs',
   '{"findings": ["upper_lobe_infiltrates", "cavitation", "hilar_lymphadenopathy"], "screening_optimized": true}'::jsonb,
   ARRAY['Pneumonia', 'Lung Cancer', 'Fungal Infection'],
   'NIH Clinical Center',
   '{"validation_status": "peer_reviewed", "public_health_application": true}'::jsonb);

-- OpenNeuro: Neuroimaging Data Platform
INSERT INTO medical_imaging_knowledge (
  finding_name, modality, body_part, finding_category, description, clinical_significance,
  key_features, differential_diagnosis, dataset_source, metadata
) VALUES
  ('OpenNeuro - fMRI Resting State Networks', 'fMRI', 'Brain', 'Functional Connectivity',
   'Open-access resting-state fMRI datasets with preprocessed functional connectivity maps',
   'Research platform for studying brain networks, connectivity patterns, and functional organization',
   '{"modalities": ["fMRI", "sMRI", "DTI"], "preprocessing": "fMRIPrep", "BIDS_format": true}'::jsonb,
   ARRAY[]::text[],
   'OpenNeuro Platform',
   '{"validation_status": "research_validated", "url": "https://openneuro.org", "BIDS_compliant": true, "FAIR_principles": true, "open_access": true}'::jsonb),

  ('OpenNeuro - Structural Brain Development', 'MRI', 'Brain', 'Developmental Neuroscience',
   'Pediatric and adult structural MRI data for studying brain development and aging',
   'Longitudinal neuroimaging data for developmental neuroscience research',
   '{"age_range": "0-85_years", "longitudinal": true, "T1w": true, "T2w": true}'::jsonb,
   ARRAY[]::text[],
   'OpenNeuro Platform',
   '{"validation_status": "peer_reviewed", "longitudinal_data": true, "age_span_coverage": "lifespan"}'::jsonb);

-- MIDRC: Medical Imaging Data Resource Center (COVID-19 focus)
INSERT INTO medical_imaging_knowledge (
  finding_name, modality, body_part, finding_category, description, clinical_significance,
  key_features, differential_diagnosis, dataset_source, metadata
) VALUES
  ('MIDRC - COVID-19 Chest CT Patterns', 'CT', 'Chest', 'Viral Pneumonia',
   'Open-access COVID-19 chest CT scans with ground-glass opacities, consolidation, and clinical outcomes',
   'NIH-funded platform for COVID-19 imaging research with patient outcomes and treatment data',
   '{"covid_findings": ["ground_glass_opacities", "consolidation", "crazy_paving"], "clinical_outcomes": true, "treatment_data": true}'::jsonb,
   ARRAY['Bacterial Pneumonia', 'Interstitial Lung Disease', 'Pulmonary Edema'],
   'MIDRC (NIH)',
   '{"validation_status": "clinically_validated", "url": "https://www.midrc.org", "NIH_funded": true, "clinical_outcomes_linked": true, "FAIR_principles": true}'::jsonb),

  ('MIDRC - COVID-19 Chest X-ray Evolution', 'X-Ray', 'Chest', 'Viral Pneumonia',
   'Serial chest X-rays documenting COVID-19 disease progression and resolution',
   'Longitudinal imaging data for understanding COVID-19 radiographic evolution',
   '{"serial_imaging": true, "disease_stages": ["early", "peak", "recovery"], "severity_scoring": true}'::jsonb,
   ARRAY['Community-Acquired Pneumonia', 'ARDS', 'Viral Pneumonia'],
   'MIDRC (NIH)',
   '{"validation_status": "clinically_validated", "longitudinal": true, "disease_progression_tracking": true}'::jsonb);

-- TCIA Supporting Knowledge Base Data
INSERT INTO medical_imaging_knowledge (
  finding_name, modality, body_part, finding_category, description, clinical_significance,
  key_features, differential_diagnosis, dataset_source, metadata
) VALUES
  ('TCIA - Lung Cancer Clinical Outcomes', 'CT', 'Chest', 'Oncology',
   'Lung cancer imaging with associated patient outcomes, treatment details, and genomic data',
   'Comprehensive knowledge base linking imaging findings to treatment response and survival data',
   '{"patient_outcomes": true, "treatment_details": true, "genomic_data": true, "survival_analysis": true}'::jsonb,
   ARRAY['Benign Nodule', 'Granuloma', 'Metastasis'],
   'TCIA Supporting Data',
   '{"validation_status": "clinically_validated", "multi_modal_data": true, "genomic_correlation": true}'::jsonb),

  ('TCIA - Breast Cancer Treatment Response', 'MRI', 'Breast', 'Oncology',
   'Dynamic contrast-enhanced breast MRI with chemotherapy response and pathology correlation',
   'Multi-parametric imaging correlated with pathological complete response rates',
   '{"DCE_MRI": true, "treatment_response": true, "pathology_correlation": true, "biomarkers": true}'::jsonb,
   ARRAY['Benign Fibroadenoma', 'DCIS', 'Invasive Lobular Carcinoma'],
   'TCIA Supporting Data',
   '{"validation_status": "peer_reviewed", "treatment_outcomes": true, "pathology_correlated": true}'::jsonb);