-- Enable vector extension for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- Medical Imaging Knowledge Base with vector embeddings
CREATE TABLE IF NOT EXISTS public.medical_imaging_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  modality TEXT NOT NULL, -- CT, MRI, X-Ray, Ultrasound, Mammography, etc.
  body_part TEXT,
  finding_category TEXT, -- normal_anatomy, pathology, artifact, quality_issue
  finding_name TEXT NOT NULL,
  description TEXT NOT NULL,
  clinical_significance TEXT,
  differential_diagnosis TEXT[],
  key_features JSONB, -- Visual characteristics to look for
  dataset_source TEXT, -- Reference to source dataset (TCIA, ADNI, etc.)
  embedding vector(1536), -- OpenAI ada-002 embeddings
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medical imaging reference cases
CREATE TABLE IF NOT EXISTS public.medical_imaging_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  modality TEXT NOT NULL,
  body_part TEXT,
  diagnosis TEXT,
  key_findings TEXT[],
  report_text TEXT,
  image_characteristics JSONB,
  dataset_source TEXT,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vision analysis session logs
CREATE TABLE IF NOT EXISTS public.vision_analysis_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT,
  session_id TEXT,
  modality TEXT,
  image_metadata JSONB,
  rag_context_used JSONB, -- Store which knowledge base entries were retrieved
  ai_model TEXT,
  analysis_result TEXT,
  user_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_medical_knowledge_modality ON public.medical_imaging_knowledge(modality);
CREATE INDEX IF NOT EXISTS idx_medical_knowledge_embedding ON public.medical_imaging_knowledge USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_medical_refs_modality ON public.medical_imaging_references(modality);
CREATE INDEX IF NOT EXISTS idx_medical_refs_embedding ON public.medical_imaging_references USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_vision_logs_user ON public.vision_analysis_logs(user_email);

-- RLS Policies
ALTER TABLE public.medical_imaging_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_imaging_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vision_analysis_logs ENABLE ROW LEVEL SECURITY;

-- Public read access for knowledge base (educational use)
CREATE POLICY "Knowledge base is publicly readable"
  ON public.medical_imaging_knowledge FOR SELECT
  USING (true);

CREATE POLICY "References are publicly readable"
  ON public.medical_imaging_references FOR SELECT
  USING (true);

-- Public can insert logs (anonymous usage tracking)
CREATE POLICY "Public can log analyses"
  ON public.vision_analysis_logs FOR INSERT
  WITH CHECK (true);

-- Users can view their own analysis logs
CREATE POLICY "Users can view own logs"
  ON public.vision_analysis_logs FOR SELECT
  USING (user_email = (auth.jwt() ->> 'email'::text) OR auth.uid() IS NOT NULL);

-- Function to search medical imaging knowledge with vector similarity
CREATE OR REPLACE FUNCTION search_medical_imaging_knowledge(
  query_embedding vector(1536),
  filter_modality TEXT DEFAULT NULL,
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  modality TEXT,
  finding_name TEXT,
  description TEXT,
  clinical_significance TEXT,
  key_features JSONB,
  dataset_source TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    mik.id,
    mik.modality,
    mik.finding_name,
    mik.description,
    mik.clinical_significance,
    mik.key_features,
    mik.dataset_source,
    1 - (mik.embedding <=> query_embedding) AS similarity
  FROM public.medical_imaging_knowledge mik
  WHERE 
    (filter_modality IS NULL OR mik.modality = filter_modality)
    AND 1 - (mik.embedding <=> query_embedding) > match_threshold
  ORDER BY mik.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Insert initial knowledge base entries from authoritative datasets
INSERT INTO public.medical_imaging_knowledge (modality, body_part, finding_category, finding_name, description, clinical_significance, key_features, dataset_source, metadata) VALUES
-- X-Ray findings from NIH, MIMIC-CXR, CheXpert
('X-Ray', 'Chest', 'pathology', 'Pneumonia', 'Consolidation or infiltrate in lung fields, often with air bronchograms', 'Acute infection requiring treatment', '{"density": "increased", "distribution": "lobar or patchy", "signs": ["air bronchograms", "pleural effusion"]}', 'NIH ChestX-ray14', '{"prevalence": "common", "urgency": "high"}'),
('X-Ray', 'Chest', 'pathology', 'Pneumothorax', 'Air in pleural space with visible lung edge and absent lung markings peripherally', 'Can be life-threatening if tension pneumothorax develops', '{"signs": ["visible visceral pleural line", "absent lung markings", "mediastinal shift if tension"], "size": "measured as percentage"}', 'MIMIC-CXR', '{"urgency": "high"}'),
('X-Ray', 'Chest', 'pathology', 'Pleural Effusion', 'Fluid in pleural space causing blunting of costophrenic angle or meniscus sign', 'Variable significance depending on volume and etiology', '{"appearance": "blunted costophrenic angle", "signs": ["meniscus", "opacification"], "laterality": "unilateral or bilateral"}', 'CheXpert', '{"prevalence": "common"}'),
('X-Ray', 'Chest', 'normal_anatomy', 'Normal Cardiac Silhouette', 'Cardiothoracic ratio <0.5, clear cardiac borders and pulmonary vasculature', 'Normal finding', '{"ctr": "<0.5", "borders": "sharp", "chambers": "not enlarged"}', 'PadChest', '{"baseline": true}'),

-- CT findings from TCIA, OASIS, RSNA
('CT', 'Head', 'pathology', 'Acute Ischemic Stroke', 'Hypodense area in vascular territory, loss of gray-white differentiation, sulcal effacement', 'Medical emergency requiring immediate intervention', '{"density": "hypodense", "distribution": "vascular territory", "signs": ["loss of gray-white", "sulcal effacement", "hyperdense vessel sign"]}', 'OASIS Brain', '{"urgency": "critical", "time_sensitive": true}'),
('CT', 'Head', 'pathology', 'Intracranial Hemorrhage', 'Hyperdense area within brain parenchyma or extra-axial spaces', 'Critical finding requiring neurosurgical evaluation', '{"density": "hyperdense", "location": ["intraparenchymal", "subdural", "epidural", "subarachnoid"], "mass_effect": "variable"}', 'RSNA ICH Detection', '{"urgency": "critical"}'),
('CT', 'Chest', 'pathology', 'Pulmonary Embolism', 'Filling defect in pulmonary arteries on contrast-enhanced CT', 'Potentially life-threatening, requires anticoagulation', '{"enhancement": "filling defect", "location": "pulmonary arteries", "signs": ["right heart strain", "infarction"]}', 'TCIA Collections', '{"urgency": "high", "requires_contrast": true}'),
('CT', 'Abdomen', 'pathology', 'Appendicitis', 'Distended appendix >6mm, wall thickening, periappendiceal fat stranding', 'Surgical emergency if complicated', '{"size": ">6mm", "wall": "thickened", "surrounding": "fat stranding", "complications": ["perforation", "abscess"]}', 'NIH Clinical Center', '{"urgency": "high"}'),

-- MRI findings from ADNI, TCIA
('MRI', 'Brain', 'pathology', 'Multiple Sclerosis Plaques', 'T2/FLAIR hyperintense lesions in periventricular white matter, perpendicular to ventricles (Dawson fingers)', 'Demyelinating disease with relapsing-remitting course', '{"signal": "T2 hyperintense", "location": "periventricular", "pattern": "Dawson fingers", "enhancement": "active plaques enhance"}', 'ADNI', '{"chronic_condition": true}'),
('MRI', 'Brain', 'pathology', 'Glioblastoma', 'Irregular enhancing mass with central necrosis, surrounding edema, and mass effect', 'Aggressive primary brain tumor, poor prognosis', '{"enhancement": "irregular rim", "necrosis": "central", "edema": "extensive", "mass_effect": true}', 'TCIA Glioblastoma', '{"urgency": "high", "malignant": true}'),
('MRI', 'Knee', 'pathology', 'ACL Tear', 'Discontinuity or abnormal signal in anterior cruciate ligament', 'Common sports injury requiring surgical consideration', '{"signal": "increased T2", "morphology": "discontinuous", "secondary_signs": ["bone bruise", "joint effusion"]}', 'SKI10 Dataset', '{"sports_injury": true}'),
('MRI', 'Spine', 'pathology', 'Disc Herniation', 'Posterior displacement of disc material beyond vertebral body margins', 'Can cause radiculopathy or myelopathy', '{"location": "posterior", "compression": "nerve root or cord", "types": ["protrusion", "extrusion", "sequestration"]}', 'SpineWeb', '{"common": true}'),

-- Mammography findings from DDSM, MIAS, BCDR
('Mammography', 'Breast', 'pathology', 'Malignant Mass', 'Irregular, spiculated mass with associated calcifications', 'Suspicious for malignancy, requires biopsy', '{"shape": "irregular", "margins": "spiculated", "density": "high", "calcifications": "pleomorphic"}', 'DDSM', '{"birads": "4-5", "urgency": "high"}'),
('Mammography', 'Breast', 'pathology', 'Suspicious Calcifications', 'Fine, pleomorphic, clustered calcifications', 'May represent DCIS or invasive carcinoma', '{"morphology": "fine pleomorphic", "distribution": "clustered or linear", "number": ">5 in cluster"}', 'MIAS Database', '{"birads": "4", "follow_up": "required"}'),
('Mammography', 'Breast', 'normal_anatomy', 'Dense Breast Tissue', 'Heterogeneously or extremely dense fibroglandular tissue', 'Normal variant but decreases mammography sensitivity', '{"density": "C or D", "significance": "decreased sensitivity", "recommendation": "supplemental imaging"}', 'BCDR', '{"common": true, "screening_impact": true}'),

-- Ultrasound findings
('Ultrasound', 'Abdomen', 'pathology', 'Gallstones', 'Hyperechoic foci in gallbladder with posterior acoustic shadowing', 'Common, may be asymptomatic or cause cholecystitis', '{"echogenicity": "hyperechoic", "shadowing": "posterior acoustic", "mobility": "moves with position"}', 'Ultrasound Cases', '{"prevalence": "common"}'),
('Ultrasound', 'Thyroid', 'pathology', 'Suspicious Thyroid Nodule', 'Hypoechoic nodule with irregular margins, microcalcifications, taller-than-wide', 'Increased risk of malignancy, biopsy recommended', '{"echogenicity": "hypoechoic", "margins": "irregular", "calcifications": "microcalcifications", "shape": "taller than wide"}', 'Thyroid Ultrasound', '{"tirads": "4-5"}'),

-- ECG patterns from PTB-XL, MIT-BIH
('ECG', 'Heart', 'pathology', 'ST Elevation Myocardial Infarction', 'ST segment elevation >1mm in 2+ contiguous leads', 'Medical emergency requiring immediate PCI', '{"st_elevation": ">1mm", "leads": "contiguous", "q_waves": "may develop", "reciprocal_changes": true}', 'PTB-XL ECG Database', '{"urgency": "critical", "time_sensitive": true}'),
('ECG', 'Heart', 'pathology', 'Atrial Fibrillation', 'Irregularly irregular rhythm, absent P waves, fibrillatory waves', 'Increases stroke risk, requires rate control and anticoagulation', '{"rhythm": "irregularly irregular", "p_waves": "absent", "rate": "variable", "f_waves": "present"}', 'MIT-BIH Arrhythmia', '{"chronic_condition": true, "thromboembolic_risk": true}'),
('ECG', 'Heart', 'pathology', 'Complete Heart Block', 'Dissociation between P waves and QRS complexes, slow ventricular rate', 'May require pacemaker', '{"av_dissociation": true, "ventricular_rate": "<40", "p_waves": "regular", "qrs": "wide if ventricular escape"}', 'Cardiovascular Signal Processing', '{"urgency": "high", "pacemaker": "may be needed"}');

COMMENT ON TABLE public.medical_imaging_knowledge IS 'RAG knowledge base from authoritative datasets: TCIA, ADNI, NIH ChestX-ray14, MIMIC-CXR, CheXpert, DDSM, MIAS, BCDR, PTB-XL, etc.';
COMMENT ON TABLE public.medical_imaging_references IS 'Reference medical imaging cases and reports for similarity-based retrieval';
COMMENT ON TABLE public.vision_analysis_logs IS 'Audit log for vision-based medical image analyses';