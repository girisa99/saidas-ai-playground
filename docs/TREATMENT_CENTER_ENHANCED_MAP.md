# Enhanced Treatment Center Map Integration

## Overview
The treatment center map now supports advanced filtering based on therapeutic areas, products, manufacturers, clinical trials, providers, and location—all automatically extracted from user queries by Genie AI.

## Database Schema Enhancements

### New Columns Added to `treatment_centers`
```sql
- key_providers TEXT[]          -- Specialists and their expertise
- therapeutic_areas TEXT[]      -- CAR-T, Gene Therapy, Stem Cell, etc.
- products_drugs TEXT[]         -- Kymriah, Yescarta, Breyanzi, etc.
- manufacturers TEXT[]          -- Novartis, Gilead, BMS, Janssen, etc.
- clinical_trials TEXT          -- Active clinical trials
- trial_sponsors TEXT[]         -- Trial sponsors
- capacity_info TEXT            -- Bed count, patient volume
- nci_designated TEXT           -- NCI designation status
- fact_accredited BOOLEAN       -- FACT accreditation
- patient_services TEXT[]       -- Financial aid, housing, navigation, etc.
- country TEXT                  -- USA, Canada, International
```

### Performance Indexes
- GIN index on `therapeutic_areas` for fast array searches
- Full-text search index on center names
- Composite index on latitude/longitude for geospatial queries

## 500+ Treatment Centers Database

### Geographic Coverage
- **All 50 US States**: Major academic centers, community hospitals, regional cancer centers
- **International**: Canada, UK, Germany, France, Australia, New Zealand, Singapore, South Korea, Brazil, Puerto Rico, Guam, Hawaii, Alaska

### Therapeutic Areas Covered
1. **Oncology & CAR-T** (300+ centers)
   - NCI-Designated Comprehensive Cancer Centers
   - Regional cancer centers with CAR-T programs
   - Community hospitals offering cellular therapy
   - Pediatric cancer centers (St. Jude, CHOP, Seattle Children's)

2. **Multiple Sclerosis** (15+ specialized centers)
   - HSCT for aggressive MS
   - Progressive MS trials
   - Neuroprotection and remyelination studies

3. **Cardiology** (15+ heart centers)
   - Advanced heart failure programs
   - Cardio-oncology (managing CAR-T cardiotoxicity)
   - Stem cell therapy for heart disease

4. **Gene Therapy & CRISPR** (50+ centers/manufacturers)
   - Sickle cell disease gene therapy
   - Beta-thalassemia treatment
   - Hemophilia A & B gene therapy
   - CRISPR-edited therapies

### Complete Information Per Center
✅ Full address with city, state, ZIP code
✅ Phone numbers and contact information
✅ Website URLs
✅ Email/contact information
✅ Named specialists and their expertise areas
✅ Specific therapeutic areas
✅ Products/drugs used (with brand names)
✅ Manufacturers/sponsors
✅ Clinical trials being conducted
✅ Trial sponsors
✅ Capacity/bed information
✅ NCI designation status
✅ FACT accreditation status
✅ Patient services (financial aid, housing, navigation, language services)

## AI-Driven Filter Detection

### Automatic Extraction from User Queries

Genie AI automatically detects and extracts:

1. **Therapeutic Area**
   - Keywords: CAR-T, Gene Therapy, Stem Cell Transplant, Multiple Myeloma, Lymphoma, Leukemia, Immunotherapy, Precision Medicine, CRISPR
   - Example: "Show me CAR-T centers" → `therapeuticArea: "CAR-T"`

2. **Product Names**
   - Kymriah, Yescarta, Breyanzi, Abecma, Tecartus, Carvykti, Pluvicto, Lutathera, Lyfgenia, Zolgensma
   - Example: "Where can I get Kymriah?" → `product: "Kymriah"`

3. **Manufacturers**
   - Novartis, Gilead, Kite, BMS, Bristol Myers Squibb, Janssen, Bluebird Bio, CRISPR Therapeutics, Vertex
   - Example: "Novartis centers near me" → `manufacturer: "Novartis"`

4. **Clinical Trials**
   - Keywords: clinical trial, trial, study, research
   - Example: "Find gene therapy clinical trials" → `clinicalTrial: "active"`

5. **Location**
   - State (2-letter codes): MA, NY, CA, etc.
   - City: Boston, New York, San Francisco, etc.
   - Example: "CAR-T centers in Boston, MA" → `city: "Boston"`, `state: "MA"`

6. **Center Type**
   - gene_therapy, bmt, oncology, general
   - Auto-detected based on keywords

## User Experience Features

### Interactive Map Display
- **Color-coded markers** by center type:
  - 🟣 Purple: Gene Therapy
  - 🔴 Pink: BMT/Transplant
  - 🟠 Amber: Oncology
  - 🔵 Blue: General Healthcare

- **Smart zoom** based on filter results
- **Click markers** to view detailed center information
- **Fullscreen mode** for better visibility

### Rich Detail Cards
When a center is selected, users see:
- Complete contact information (phone, website, email, address)
- NCI designation and FACT accreditation badges
- Capacity information (bed count, patient volume)
- Therapeutic areas with color-coded badges
- Products/drugs offered
- Manufacturers/sponsors
- Key providers and specialists
- Clinical trials information
- Trial sponsors
- Patient services available

### Active Filter Display
Visual badges show all active filters:
- Therapeutic Area
- Product
- Manufacturer
- Clinical Trial
- State
- City

## Example User Queries

### Query 1: Product-Specific Search
**User**: "Where can I get Yescarta CAR-T treatment?"

**AI Detection**:
- `product: "Yescarta"`
- `therapeuticArea: "CAR-T"`
- `centerType: "gene_therapy"`

**Result**: Map shows only centers offering Yescarta, color-coded purple

### Query 2: Location + Therapeutic Area
**User**: "Gene therapy centers in Boston"

**AI Detection**:
- `therapeuticArea: "Gene Therapy"`
- `city: "Boston"`
- `centerType: "gene_therapy"`

**Result**: Map zooms to Boston showing gene therapy centers

### Query 3: Clinical Trial Search
**User**: "Where are CRISPR clinical trials being conducted?"

**AI Detection**:
- `therapeuticArea: "CRISPR"`
- `clinicalTrial: "active"`

**Result**: Map shows centers with active CRISPR trials

### Query 4: Manufacturer-Specific
**User**: "Show me all Novartis treatment centers"

**AI Detection**:
- `manufacturer: "Novartis"`

**Result**: Map shows all centers partnered with Novartis

### Query 5: Multi-Filter Search
**User**: "CAR-T centers in California with clinical trials"

**AI Detection**:
- `therapeuticArea: "CAR-T"`
- `state: "CA"`
- `clinicalTrial: "active"`

**Result**: Map shows California CAR-T centers with active trials

## Import Process

### Admin Dashboard Integration
1. Navigate to **Admin Dashboard → Settings tab**
2. Click "Import 500+ Treatment Centers"
3. **Automatic geocoding** using OpenStreetMap (respects 1 req/sec rate limit)
4. **Import takes 5-10 minutes** (geocodes all 500+ centers)
5. Data immediately available in Genie AI and map

### Data Processing
- CSV parsing with all 18 columns
- Automatic center type classification
- Country detection (USA, Canada, International)
- Geographic coordinate lookup
- Metadata enrichment

## Technical Architecture

### Frontend Components
- `InteractiveTreatmentCenterMap.tsx` - Main map component with Mapbox GL
- `TreatmentCenterDetails.tsx` - Rich detail card component
- `TreatmentCenterImporter.tsx` - Admin import UI

### Backend Services
- `treatmentCenterService.ts` - Enhanced search with 12+ filter parameters
- `import-treatment-centers` edge function - CSV import with geocoding
- `ai-universal-processor` edge function - AI detection and filtering

### Database Layer
- `treatment_centers` table with 25+ columns
- GIN and full-text search indexes
- RLS policies for secure access

## Performance Optimizations
- Batch inserts (50 centers per batch)
- Rate-limited geocoding (1 req/sec)
- Indexed array searches
- Client-side map clustering for 500+ markers
- Lazy loading of detail cards

## Security & Privacy
- RLS policies protect data
- Public geocoding service (no API key required)
- Mapbox token stored in localStorage or database
- No sensitive patient data exposed

## Future Enhancements
- Real-time availability status
- Insurance acceptance filtering
- Distance-based sorting
- Multi-center comparison
- Patient reviews and ratings
- Appointment scheduling integration

---

**Last Updated**: 2025-01-11
**Status**: Fully Operational
**Import Status**: Ready for 500+ centers
