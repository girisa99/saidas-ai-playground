# re3data.org API Integration Strategy for Medical Imaging RAG

## Overview

This document outlines the strategy for integrating the re3data.org API (Registry of Research Data Repositories) into the medical imaging knowledge base to dynamically discover and incorporate authoritative datasets.

**re3data.org API Documentation**: https://www.re3data.org/api/doc/

## Why re3data.org?

re3data.org is the world's largest registry of research data repositories, providing:
- **10,000+ repositories** across all research disciplines
- **Metadata standards**: DataCite, Dublin Core, DDI
- **FAIR principles**: Findable, Accessible, Interoperable, Reusable
- **Certification info**: CoreTrustSeal, ISO certifications
- **Subject classification**: Medical imaging, radiology, pathology

## API Capabilities

### 1. List Repositories
```
GET https://www.re3data.org/api/v1/repositories
```
Returns list of all repository IDs

### 2. Repository Details
```
GET https://www.re3data.org/api/v1/repository/{id}
```
Returns comprehensive metadata:
- Repository name and description
- Subject areas (controlled vocabulary)
- Content types (images, clinical data, genomics)
- Access conditions (open, restricted, embargoed)
- Certificates and standards compliance
- Data upload/download mechanisms
- Software used
- Database access methods

### 3. Beta Endpoints
```
GET https://www.re3data.org/api/beta/repositories
GET https://www.re3data.org/api/beta/repository/{id}
```
Returns JSON format (easier parsing)

## Integration Architecture

### Phase 1: Static Seeding (Current State)
✅ **COMPLETED**: Manual curation of high-priority datasets
- MedPix, MedMNIST, NIH ChestX-ray14, TCIA, ADNI, etc.
- Vector embeddings generated for RAG retrieval
- Stored in `medical_imaging_knowledge` table

### Phase 2: Dynamic Discovery (Recommended Next Step)

#### 2.1 Create Repository Metadata Table
```sql
CREATE TABLE medical_data_repositories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  re3data_id TEXT UNIQUE NOT NULL,
  repository_name TEXT NOT NULL,
  repository_url TEXT,
  description TEXT,
  subject_areas TEXT[],
  content_types TEXT[],
  access_type TEXT, -- 'open', 'restricted', 'closed'
  certificates TEXT[],
  data_upload_types TEXT[],
  database_access_types TEXT[],
  software_used TEXT[],
  metadata JSONB,
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_medical_imaging BOOLEAN DEFAULT FALSE,
  quality_score INTEGER, -- 0-100 based on FAIR compliance
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for efficient filtering
CREATE INDEX idx_repositories_medical_imaging ON medical_data_repositories(is_medical_imaging) WHERE is_medical_imaging = true;
CREATE INDEX idx_repositories_quality ON medical_data_repositories(quality_score DESC);
```

#### 2.2 Create Edge Function for Sync
```typescript
// supabase/functions/sync-re3data-repositories/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RE3DATA_API = "https://www.re3data.org/api/beta";
const MEDICAL_IMAGING_SUBJECTS = [
  "Medical Imaging",
  "Radiology", 
  "Pathology",
  "Diagnostic Imaging",
  "Biomedical Engineering",
  "Clinical Medicine"
];

serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Step 1: Fetch all repository IDs
    const listResponse = await fetch(`${RE3DATA_API}/repositories`);
    const repositoryList = await listResponse.json();
    
    let processedCount = 0;
    let medicalImagingCount = 0;

    // Step 2: Process each repository
    for (const repoId of repositoryList.data) {
      const detailsResponse = await fetch(`${RE3DATA_API}/repository/${repoId}`);
      const repoDetails = await detailsResponse.json();
      
      // Step 3: Filter for medical imaging repositories
      const isMedicalImaging = repoDetails.subjects?.some((subject: string) => 
        MEDICAL_IMAGING_SUBJECTS.some(ms => subject.includes(ms))
      );
      
      if (!isMedicalImaging) continue;
      
      // Step 4: Calculate quality score
      const qualityScore = calculateQualityScore(repoDetails);
      
      // Step 5: Upsert to database
      await supabase.from('medical_data_repositories').upsert({
        re3data_id: repoId,
        repository_name: repoDetails.name,
        repository_url: repoDetails.repositoryURL,
        description: repoDetails.description,
        subject_areas: repoDetails.subjects,
        content_types: repoDetails.contentTypes,
        access_type: repoDetails.dataAccess?.type,
        certificates: repoDetails.certificates,
        data_upload_types: repoDetails.dataUpload,
        database_access_types: repoDetails.databaseAccess,
        software_used: repoDetails.software,
        metadata: repoDetails,
        is_medical_imaging: true,
        quality_score: qualityScore,
        last_synced_at: new Date().toISOString()
      }, { onConflict: 're3data_id' });
      
      medicalImagingCount++;
      processedCount++;
    }

    return new Response(JSON.stringify({
      success: true,
      processed: processedCount,
      medical_imaging_repositories: medicalImagingCount
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('re3data sync error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

function calculateQualityScore(repo: any): number {
  let score = 0;
  
  // FAIR principles compliance
  if (repo.dataAccess?.type === 'open') score += 30;
  if (repo.certificates?.includes('CoreTrustSeal')) score += 20;
  if (repo.metadataStandards?.length > 0) score += 20;
  if (repo.pidSystems?.includes('DOI')) score += 15;
  if (repo.databaseAccess?.length > 0) score += 10;
  if (repo.apiType?.length > 0) score += 5;
  
  return Math.min(score, 100);
}
```

#### 2.3 Scheduled Sync (Weekly)
Use Supabase Cron Jobs to run weekly:
```sql
SELECT cron.schedule(
  're3data-sync',
  '0 0 * * 0', -- Every Sunday at midnight
  $$
  SELECT net.http_post(
    url := 'https://[project-ref].supabase.co/functions/v1/sync-re3data-repositories',
    headers := '{"Authorization": "Bearer [service-role-key]"}'::jsonb
  );
  $$
);
```

### Phase 3: Enhanced RAG Retrieval

#### 3.1 Multi-Source RAG Strategy
When analyzing medical images:

1. **Primary RAG**: Query `medical_imaging_knowledge` (curated findings)
   - Fast, high-quality, pre-validated
   - Specific findings with clinical significance
   
2. **Secondary RAG**: Query `medical_data_repositories` (dynamic discovery)
   - Find relevant repositories for rare/novel findings
   - Provide links to additional resources
   - Suggest datasets for further research

#### 3.2 Enhanced System Prompt
```typescript
const systemPrompt = `
You are an educational medical imaging AI with access to:

1. **Curated Knowledge Base**: ${retrievedFindings.length} validated findings from:
   ${datasets.join(', ')}

2. **Research Data Repositories**: ${relevantRepositories.length} additional resources:
   ${repositories.map(r => `${r.name} (${r.url})`).join(', ')}

When analyzing images:
- Cite specific datasets for findings
- Suggest additional repositories for rare cases
- Link to FAIR-compliant data sources
- Provide educational context with research references
`;
```

## Implementation Roadmap

### Immediate (Week 1)
- ✅ Add MedPix, MedMNIST, NIH ChestX-ray14, OpenNeuro, MIDRC to knowledge base
- ✅ Update reference documentation
- ⏳ Create this integration strategy document

### Short-term (Weeks 2-4)
- [ ] Create `medical_data_repositories` table
- [ ] Build `sync-re3data-repositories` edge function
- [ ] Test API integration with 100 repositories
- [ ] Implement quality scoring algorithm
- [ ] Set up weekly sync cron job

### Medium-term (Months 2-3)
- [ ] Enhance RAG to query both tables
- [ ] Add repository suggestions to image analysis
- [ ] Create admin dashboard for repository curation
- [ ] Implement manual approval workflow for high-quality repos
- [ ] Generate embeddings for repository descriptions

### Long-term (Months 4-6)
- [ ] Auto-generate knowledge base entries from repository metadata
- [ ] Implement dataset version tracking
- [ ] Add citation generation for used datasets
- [ ] Create repository usage analytics
- [ ] Build dataset recommendation engine

## FAIR Principles Alignment

### Findable
- Repository metadata indexed and searchable
- Unique re3data IDs for each repository
- Subject-based categorization

### Accessible
- API access documented and stable
- Open vs. restricted access clearly marked
- Authentication requirements specified

### Interoperable
- Standard metadata formats (DataCite, Dublin Core)
- JSON API responses
- Compatible with existing RAG architecture

### Reusable
- License information in metadata
- Clear usage terms
- Citation requirements documented

## Benefits of re3data.org Integration

1. **Dynamic Discovery**: Automatically find new datasets as they're registered
2. **Quality Assurance**: Filter by certifications and FAIR compliance
3. **Comprehensive Coverage**: Access to 10,000+ repositories globally
4. **Standardized Metadata**: Consistent structure for all datasets
5. **Reduced Manual Curation**: Automated discovery of relevant repositories
6. **User Education**: Direct links to authoritative data sources
7. **Research Support**: Help users find datasets for their specific needs

## Example Query Workflow

```typescript
// User uploads chest X-ray with suspected pneumonia

// 1. RAG retrieves from curated knowledge base
const curatedFindings = await searchMedicalKnowledge("pneumonia chest x-ray");
// Returns: NIH ChestX-ray14 pneumonia patterns, MedPix references

// 2. Query repositories for additional resources
const repositories = await supabase
  .from('medical_data_repositories')
  .select('*')
  .contains('subject_areas', ['Medical Imaging', 'Radiology'])
  .contains('content_types', ['Images'])
  .eq('access_type', 'open')
  .gte('quality_score', 70)
  .limit(3);

// 3. Enhanced response
return {
  analysis: "...",
  curatedFindings: curatedFindings,
  additionalResources: repositories.map(r => ({
    name: r.repository_name,
    url: r.repository_url,
    description: r.description,
    accessType: r.access_type
  }))
};
```

## Monitoring & Maintenance

### Weekly Tasks
- Review sync logs for errors
- Check for new medical imaging repositories
- Update subject area filters if needed

### Monthly Tasks
- Audit quality scores
- Review repository access status changes
- Update FAIR compliance criteria

### Quarterly Tasks
- Comprehensive review of integrated repositories
- User feedback analysis
- Update integration strategy

## Conclusion

Integrating re3data.org API provides a scalable, automated approach to maintaining an up-to-date knowledge base of medical imaging datasets. This complements the curated knowledge base with dynamic discovery capabilities, ensuring users always have access to the most current and relevant research data resources.