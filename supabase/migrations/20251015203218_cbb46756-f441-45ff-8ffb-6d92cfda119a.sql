-- Enhance treatment_centers table to support comprehensive data
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS key_providers TEXT[];
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS therapeutic_areas TEXT[];
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS products_drugs TEXT[];
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS manufacturers TEXT[];
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS clinical_trials TEXT;
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS trial_sponsors TEXT[];
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS capacity_info TEXT;
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS nci_designated TEXT;
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS fact_accredited BOOLEAN DEFAULT false;
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS patient_services TEXT[];
ALTER TABLE treatment_centers ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'USA';

-- Create index for therapeutic areas search
CREATE INDEX IF NOT EXISTS idx_treatment_centers_therapeutic_areas ON treatment_centers USING GIN (therapeutic_areas);

-- Create index for text search on center name
CREATE INDEX IF NOT EXISTS idx_treatment_centers_name_search ON treatment_centers USING GIN (to_tsvector('english', name));

-- Create index for lat/lon lookups
CREATE INDEX IF NOT EXISTS idx_treatment_centers_lat_lon ON treatment_centers (latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Add comment for documentation
COMMENT ON TABLE treatment_centers IS 'Comprehensive database of 500+ treatment centers covering CAR-T, gene therapy, BMT, MS, cardiology, and other specialized therapies across US and international locations';