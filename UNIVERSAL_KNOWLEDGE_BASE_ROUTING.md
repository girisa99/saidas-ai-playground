# Universal Knowledge Base Routing Guide

## Overview
All knowledge base operations across the entire application now route through the **universal_knowledge_base** table. This eliminates duplicates, consolidates data sources, and provides a single source of truth for all knowledge.

## Consolidated Architecture

### Single Entry Point
```
All Knowledge Sources → Universal Knowledge Base → RAG/Agents/Analytics
```

### Supported Input Sources
All these sources now feed into `universal_knowledge_base`:

1. **Manual Entry** - Admin dashboard and forms
2. **URL Crawling** - Website content extraction
3. **Document Upload** - PDF, DOCX, TXT, etc.
4. **API Integration** - External API responses
5. **Kaggle Datasets** - Automated weekly sync
6. **re3data.org** - Research repository metadata

## Updated Service Layer

### New Unified Service: `knowledgeBaseService.ts`

This service provides a single interface for all knowledge operations:

```typescript
import { 
  addKnowledgeEntry,
  addKnowledgeFromUrl,
  addKnowledgeFromDocument,
  addKnowledgeFromApi,
  searchKnowledgeWithRag,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  trackKnowledgeUsageSimple
} from '@/services/knowledgeBaseService';

// Add from any source
await addKnowledgeEntry({
  title: 'Example Entry',
  content: 'Content here',
  domain: 'conversational',
  contentType: 'faq',
  tags: ['ai', 'healthcare'],
  sourceType: 'manual_entry'
});

// Add from URL
await addKnowledgeFromUrl(
  'https://example.com/article',
  'conversational',
  'educational_content',
  ['web', 'external']
);

// Add from document
await addKnowledgeFromDocument(
  pdfFile,
  'Document Title',
  'medical_imaging',
  'guideline',
  ['medical', 'imaging']
);

// Search with RAG
const results = await searchKnowledgeWithRag(
  'patient onboarding',
  'patient_onboarding',
  'template',
  10
);
```

## Database Schema

### Primary Table: `universal_knowledge_base`

```sql
CREATE TABLE universal_knowledge_base (
  id UUID PRIMARY KEY,
  finding_name TEXT NOT NULL,
  description TEXT NOT NULL,
  domain TEXT NOT NULL, -- medical_imaging, patient_onboarding, clinical_risk, conversational
  content_type TEXT NOT NULL, -- finding, guideline, template, protocol, faq, educational_content
  source_repository_id UUID,
  quality_score INTEGER DEFAULT 75,
  usage_count INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  embedding VECTOR(1536),
  clinical_context JSONB,
  metadata JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Metadata Structure

```json
{
  "source_type": "url|document|pdf|api|crawl|manual_entry",
  "source_url": "https://...",
  "file_name": "document.pdf",
  "file_type": "application/pdf",
  "tags": ["tag1", "tag2"],
  "created_via": "admin_dashboard|genie_popup|api|automation",
  "api_response": true,
  "updated_at": "2025-10-04T09:00:00Z"
}
```

## RAG Integration

### All RAG Operations Use Universal Knowledge Base

1. **AI Universal Processor** (`ai-universal-processor`)
   - Uses `universal_knowledge_base` for RAG context
   - Vector similarity search via `search_universal_knowledge_vector()`
   - Full-text search support

2. **Medical Image Analysis** (`analyze-medical-image`)
   - Medical imaging knowledge from `universal_knowledge_base`
   - Domain: `medical_imaging`
   - Content Type: `finding`

3. **Conversational AI** (Public Genie)
   - FAQ and educational content
   - Domain: `conversational`
   - Content Types: `faq`, `educational_content`

4. **Agent Workflows**
   - All agents access unified knowledge
   - Cross-domain knowledge sharing
   - Consistent RAG responses

## Analytics Integration

### Knowledge Usage Tracking

```typescript
import { trackKnowledgeUsageSimple } from '@/services/knowledgeBaseService';

// Track when knowledge is used
await trackKnowledgeUsageSimple(
  knowledgeId,
  'conversational',
  'genie_conversation',
  userId,
  sessionId
);
```

### Analytics Tables

1. **knowledge_usage_analytics** - Tracks every use
2. **conversation_learning_feedback** - User feedback
3. **universal_knowledge_repositories** - Source repositories

## Removed/Deprecated Tables

The following tables are **DEPRECATED** and migrated to `universal_knowledge_base`:

- ❌ `knowledge_base` - Migrated
- ❌ `rag_recommendations` - Migrated
- ❌ `medical_imaging_knowledge` - Migrated

## Updated Components

### Admin Dashboard
- `EnhancedGenieDashboard.tsx` - Now adds to `universal_knowledge_base`
- `GeniePopupAnalyticsSection.tsx` - Routes through universal service

### Search Functions
All search operations use `search_universal_knowledge()` RPC:

```sql
search_universal_knowledge(
  query_domain TEXT,
  query_content_type TEXT,
  query_text TEXT,
  limit_count INT
)
```

## Automated Sync Jobs

### Weekly Kaggle Sync (Saturdays 3 AM UTC)
```sql
SELECT cron.schedule(
  'weekly-kaggle-sync',
  '0 3 * * 6',
  $$ SELECT net.http_post(...) $$
);
```

### Manual Sync Triggers
```typescript
import { syncRe3DataRepositories } from '@/services/universalKnowledgeService';

// Admins can trigger manual sync
await syncRe3DataRepositories();
```

## Search Capabilities

### Vector Similarity Search
```typescript
// Uses embeddings for semantic search
const results = await supabase.rpc('search_universal_knowledge_vector', {
  query_embedding: embedding,
  query_domain: 'conversational',
  limit_count: 5
});
```

### Full-Text Search
```typescript
// PostgreSQL full-text search
const results = await supabase
  .from('universal_knowledge_base')
  .select('*')
  .textSearch('description', 'patient onboarding');
```

### Hybrid Search
Combines vector similarity + full-text for best results:

```typescript
const results = await searchUniversalKnowledge(
  'conversational',
  'How to handle patient consent',
  'guideline',
  10
);
```

## Benefits

### 1. Single Source of Truth
- No duplicate knowledge entries
- Consistent data across all features
- Easier maintenance and updates

### 2. Unified RAG Pipeline
- All agents/conversations use same knowledge
- Better context quality
- Consistent responses

### 3. Cross-Domain Learning
- Medical knowledge can inform conversational AI
- Shared insights across domains
- Improved accuracy

### 4. Simplified Analytics
- Unified tracking
- Better insights
- Easier reporting

### 5. Automated Quality
- Continuous learning from feedback
- Auto-sync from external sources
- Quality scoring system

## Migration Status

✅ **Completed**
- Database schema consolidated
- Data migrated from old tables
- Services updated to use universal table
- RAG integration updated
- Admin dashboards updated
- Edge functions updated
- Automated sync configured

## Next Steps for Usage

1. **Use the new service layer**
   ```typescript
   import { addKnowledgeEntry } from '@/services/knowledgeBaseService';
   ```

2. **Track all usage**
   ```typescript
   import { trackKnowledgeUsageSimple } from '@/services/knowledgeBaseService';
   ```

3. **Search with RAG**
   ```typescript
   import { searchKnowledgeWithRag } from '@/services/knowledgeBaseService';
   ```

4. **Monitor quality**
   - Check `quality_score` field
   - Review `helpful_count` vs `not_helpful_count`
   - Analyze `usage_count`

## Security

All operations respect RLS policies:
- Authenticated users can read approved knowledge
- Admins can manage all knowledge
- Usage tracking is automatic
- Feedback is user-specific

## Support

For questions or issues:
- Check database logs
- Review edge function logs
- Monitor analytics dashboard
- Check Supabase dashboard for data integrity
