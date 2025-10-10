# Universal Knowledge Base System - Implementation Guide

## Overview

The Universal Knowledge Base is a **domain-agnostic, continuously learning RAG system** that powers ALL use cases across your application:
- 🖼️ **Medical Imaging Analysis** - Vision AI with authoritative dataset knowledge
- 👥 **Patient Onboarding** - Forms, consent, intake processes
- ⚕️ **Clinical Risk Assessment** - Risk scores, outcomes, protocols
- 💬 **GenieAI Conversations** - Conversational AI with feedback learning
- 💊 **Reimbursement** - 340B, GPO, billing codes
- 📋 **Compliance** - HIPAA, regulations, guidelines

## Architecture

```
┌─────────────────────────────────────────────────────┐
│         Universal Knowledge Base System             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📚 Knowledge Repositories (Multi-Source)           │
│  ├─ re3data.org (10,000+ repos)                    │
│  ├─ Kaggle Datasets                                │
│  ├─ Data.gov                                       │
│  └─ Manual Curation                                │
│                                                     │
│  🧠 Universal Knowledge Base                        │
│  ├─ Medical Imaging Findings                       │
│  ├─ Clinical Guidelines                            │
│  ├─ Patient Forms & Templates                      │
│  ├─ Risk Assessment Protocols                      │
│  └─ Conversational FAQs                            │
│                                                     │
│  🔄 Continuous Learning                             │
│  ├─ User Feedback Collection                       │
│  ├─ Usage Analytics                                │
│  ├─ Quality Scoring                                │
│  └─ Knowledge Improvement Loop                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Database Schema

### 1. `universal_knowledge_repositories`
Stores metadata about data sources (re3data, Kaggle, etc.)

**Key Fields:**
- `source_platform` - Where the data comes from
- `domain` - Which use case it applies to
- `quality_score` - FAIR compliance score (0-100)
- `fair_compliant` - Boolean for easy filtering

**Domains:**
- `medical_imaging`
- `patient_onboarding`
- `clinical_risk`
- `conversational`

### 2. `universal_knowledge_base`
Unified storage for all knowledge entries

**Key Fields:**
- `domain` - Filters by use case
- `content_type` - 'finding', 'guideline', 'template', 'protocol', 'faq'
- `embedding` - Vector for RAG similarity search
- `usage_count` - How many times used
- `positive_feedback_count` - Thumbs up from users
- `negative_feedback_count` - Thumbs down from users

### 3. `conversation_learning_feedback`
Captures user feedback for continuous improvement

**Feedback Types:**
- `helpful` - Content was useful
- `not_helpful` - Content wasn't useful
- `inaccurate` - Information was wrong
- `outdated` - Information needs updating
- `suggestion` - User has improvement idea

### 4. `knowledge_usage_analytics`
Tracks how knowledge is used across domains

## How to Use Across Different Use Cases

### Use Case 1: Medical Image Analysis (Vision AI)

```typescript
// In your medical imaging analysis
const queryText = `${modality} ${bodyPart} ${clinicalContext}`;

// Search universal knowledge base
const { data: knowledge } = await supabase.rpc(
  'search_universal_knowledge',
  {
    query_domain: 'medical_imaging',
    query_content_type: 'finding',
    query_text: queryText,
    limit_count: 5
  }
);

// Track usage
await supabase.from('knowledge_usage_analytics').insert({
  knowledge_base_id: knowledge[0].id,
  domain: 'medical_imaging',
  use_case: 'image_analysis',
  user_id: userId,
  session_id: sessionId,
  query_text: queryText
});

// Increment usage count
await supabase.rpc('increment_knowledge_usage', {
  knowledge_id: knowledge[0].id
});
```

### Use Case 2: Patient Onboarding

```typescript
// Get onboarding templates and guidelines
const { data: onboardingKnowledge } = await supabase.rpc(
  'search_universal_knowledge',
  {
    query_domain: 'patient_onboarding',
    query_content_type: 'template', // or 'guideline'
    query_text: 'consent form',
    limit_count: 10
  }
);

// Example: Consent form templates
// finding_name: "HIPAA Consent Form Template"
// description: "Standard HIPAA-compliant consent form for patient data..."
// key_features: { "language_options": ["English", "Spanish"], "required_fields": [...] }
```

### Use Case 3: Clinical Risk Assessment

```typescript
// Get risk assessment protocols
const { data: riskProtocols } = await supabase.rpc(
  'search_universal_knowledge',
  {
    query_domain: 'clinical_risk',
    query_content_type: 'protocol',
    query_text: 'diabetes risk score',
    limit_count: 5
  }
);

// Example entries:
// - "HbA1c Risk Stratification Protocol"
// - "Cardiovascular Risk Calculator"
// - "Fall Risk Assessment Tool"
```

### Use Case 4: GenieAI Conversations

```typescript
// Get conversational knowledge (FAQs, guidelines)
const { data: conversationalKnowledge } = await supabase.rpc(
  'search_universal_knowledge',
  {
    query_domain: 'conversational',
    query_content_type: 'faq',
    query_text: userQuestion,
    limit_count: 3
  }
);

// Use in GenieAI system prompt
const systemPrompt = `
You are GenieAI, a helpful healthcare assistant.

Relevant Knowledge:
${conversationalKnowledge.map(k => `- ${k.finding_name}: ${k.description}`).join('\n')}

Use this knowledge to provide accurate, helpful responses.
`;
```

## Continuous Learning Implementation

### 1. Collect Feedback in Your UI

```typescript
// Add feedback buttons to responses
const handleFeedback = async (
  conversationId: string,
  messageIndex: number,
  feedbackType: 'helpful' | 'not_helpful' | 'inaccurate',
  knowledgeBaseIds: string[]
) => {
  await supabase.from('conversation_learning_feedback').insert({
    conversation_id: conversationId,
    user_id: userId,
    message_index: messageIndex,
    feedback_type: feedbackType,
    knowledge_base_ids: knowledgeBaseIds,
    domain: currentDomain, // 'medical_imaging', 'patient_onboarding', etc.
    metadata: {
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    }
  });
  
  // Update knowledge base feedback scores
  for (const kbId of knowledgeBaseIds) {
    await supabase.rpc('update_knowledge_feedback', {
      knowledge_id: kbId,
      is_positive: feedbackType === 'helpful'
    });
  }
};
```

### 2. Display Feedback UI

```tsx
// React component for feedback
const FeedbackButtons = ({ knowledgeIds, conversationId, messageIndex }) => {
  return (
    <div className="flex gap-2 mt-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleFeedback(conversationId, messageIndex, 'helpful', knowledgeIds)}
      >
        👍 Helpful
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleFeedback(conversationId, messageIndex, 'not_helpful', knowledgeIds)}
      >
        👎 Not Helpful
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleFeedback(conversationId, messageIndex, 'inaccurate', knowledgeIds)}
      >
        ⚠️ Inaccurate
      </Button>
    </div>
  );
};
```

### 3. Analytics Dashboard

```typescript
// Get top performing knowledge by domain
const { data: topKnowledge } = await supabase.rpc(
  'get_top_knowledge_by_domain',
  {
    query_domain: 'medical_imaging',
    limit_count: 10
  }
);

// Display usage stats
topKnowledge.forEach(k => {
  console.log(`
    ${k.finding_name}
    Usage: ${k.usage_count}
    Positive: ${k.positive_feedback}
    Negative: ${k.negative_feedback}
    Score: ${k.quality_score}
  `);
});
```

## Adding New Data Sources

### Example: Kaggle Dataset Integration

```typescript
// Similar pattern to re3data sync
const syncKaggleDatasets = async () => {
  // Fetch datasets from Kaggle API
  const datasets = await fetchKaggleAPI({
    tags: ['healthcare', 'medical', 'clinical'],
    min_usability: 0.7
  });
  
  for (const dataset of datasets) {
    await supabase.from('universal_knowledge_repositories').upsert({
      source_platform: 'kaggle',
      source_id: `kaggle_${dataset.id}`,
      repository_name: dataset.title,
      repository_url: `https://www.kaggle.com/datasets/${dataset.ref}`,
      description: dataset.description,
      domain: determineKaggleDomain(dataset.tags), // Auto-classify
      quality_score: dataset.usability * 100,
      access_type: 'open',
      is_active: true,
      metadata: {
        download_count: dataset.downloadCount,
        vote_count: dataset.voteCount
      }
    });
  }
};
```

## Syncing Data from re3data.org

### Automated Weekly Sync

Use the edge function we created:

```bash
# Manual trigger
curl -X POST \
  https://ithspbabhmdntioslfqe.supabase.co/functions/v1/sync-re3data-repositories \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY"
```

### Setup Cron Job (Weekly)

```sql
SELECT cron.schedule(
  're3data-weekly-sync',
  '0 0 * * 0', -- Every Sunday at midnight
  $$
  SELECT net.http_post(
    url := 'https://ithspbabhmdntioslfqe.supabase.co/functions/v1/sync-re3data-repositories',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.service_role_key')
    )
  );
  $$
);
```

## Quality Improvement Loop

### 1. Identify Low-Performing Knowledge

```sql
SELECT 
  finding_name,
  usage_count,
  positive_feedback_count,
  negative_feedback_count,
  ROUND(
    positive_feedback_count::NUMERIC / 
    NULLIF(positive_feedback_count + negative_feedback_count, 0), 
    2
  ) as feedback_ratio
FROM universal_knowledge_base
WHERE domain = 'medical_imaging'
  AND usage_count > 10
  AND (positive_feedback_count::NUMERIC / 
       NULLIF(positive_feedback_count + negative_feedback_count, 0)) < 0.5
ORDER BY usage_count DESC;
```

### 2. Review Feedback Suggestions

```sql
SELECT 
  clf.feedback_text,
  clf.suggested_correction,
  ukb.finding_name,
  COUNT(*) as suggestion_count
FROM conversation_learning_feedback clf
JOIN universal_knowledge_base ukb ON ukb.id = ANY(clf.knowledge_base_ids)
WHERE clf.feedback_type = 'suggestion'
  AND clf.domain = 'medical_imaging'
GROUP BY clf.feedback_text, clf.suggested_correction, ukb.finding_name
ORDER BY suggestion_count DESC;
```

### 3. Update Knowledge Based on Feedback

```sql
-- Admin reviews and updates knowledge
UPDATE universal_knowledge_base
SET 
  description = 'Updated description based on user feedback...',
  clinical_significance = 'Revised clinical significance...',
  updated_at = NOW()
WHERE id = 'knowledge-id-to-update';
```

## Best Practices

### 1. **Always Track Usage**
Every time you retrieve knowledge, increment the usage count:
```typescript
await supabase.rpc('increment_knowledge_usage', { knowledge_id });
```

### 2. **Implement Feedback Everywhere**
Add feedback buttons to every AI response that uses knowledge base data.

### 3. **Monitor Quality Scores**
Regularly review knowledge with low feedback ratios and update or remove them.

### 4. **Domain-Specific Content Types**
Use appropriate content types for each domain:
- `medical_imaging` → 'finding'
- `patient_onboarding` → 'template', 'guideline'
- `clinical_risk` → 'protocol', 'scoring_system'
- `conversational` → 'faq', 'educational_content'

### 5. **Leverage RAG with Embeddings**
For best results, generate embeddings for all knowledge entries and use vector similarity search.

## Example: End-to-End Flow

```typescript
// 1. User asks GenieAI a question
const userQuestion = "What does ground-glass opacity on chest CT mean?";

// 2. Search universal knowledge base
const { data: knowledge } = await supabase.rpc(
  'search_universal_knowledge',
  {
    query_domain: 'medical_imaging',
    query_text: 'ground-glass opacity chest CT',
    limit_count: 3
  }
);

// 3. Build AI prompt with knowledge
const systemPrompt = `
You are a medical AI assistant. Use this knowledge to answer:

${knowledge.map(k => `
**${k.finding_name}**
${k.description}
Clinical Significance: ${k.clinical_significance}
`).join('\n\n')}
`;

// 4. Get AI response
const aiResponse = await callLovableAI(systemPrompt, userQuestion);

// 5. Track usage
await Promise.all(knowledge.map(k => 
  supabase.from('knowledge_usage_analytics').insert({
    knowledge_base_id: k.id,
    domain: 'medical_imaging',
    use_case: 'conversational_ai',
    query_text: userQuestion
  })
));

// 6. Collect feedback
<FeedbackButtons 
  knowledgeIds={knowledge.map(k => k.id)} 
  conversationId={conversationId}
  messageIndex={messageIndex}
/>

// 7. Continuous improvement
// System automatically updates quality scores based on feedback
```

## Next Steps

1. ✅ **Database Schema Created** - Universal knowledge base is ready
2. ✅ **re3data Sync Function Created** - Can pull from 10,000+ repositories
3. ⏳ **Add Kaggle Integration** - Pull datasets from Kaggle
4. ⏳ **Implement Feedback UI** - Add to GenieAI conversations
5. ⏳ **Create Analytics Dashboard** - Monitor knowledge performance
6. ⏳ **Setup Automated Sync** - Weekly cron job for re3data
7. ⏳ **Generate Embeddings** - Enable vector similarity search

This system is now ready to power ALL your use cases with a single, continuously improving knowledge base!