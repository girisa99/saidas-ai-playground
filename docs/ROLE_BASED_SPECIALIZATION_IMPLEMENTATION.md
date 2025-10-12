# Role-Based Specialization Implementation Guide

**Date:** 2025-01-12  
**Status:** ⏳ IN PROGRESS  
**Phase:** 2 - Multi-Model Enhancement  
**Approach:** Option C from MULTI_MODEL_ARCHITECTURE_ASSESSMENT.md

---

## 🎯 Objective

Implement intelligent model routing where:
- **SLM (Small Language Model)** handles simple queries (80% of traffic)
- **LLM (Large Language Model)** handles complex queries (20% of traffic)
- **Cost savings:** 80% reduction on simple queries
- **Speed improvement:** 10x faster for FAQs
- **User experience:** Unchanged interface, enhanced intelligence

---

## 🏗️ Architecture

### Flow Diagram

```
User Query
    ↓
SLM Triage (phi-3.5-mini - 50ms, $0.0001)
    ↓
Analyze: {
  complexity: simple | medium | high
  domain: healthcare | technology | general
  urgency: low | medium | high | critical
  best_format: text | table | html
  keywords: string[]
}
    ↓
Decision:
    ├─ Simple (80%) → SLM Response ($0.0001, 200ms)
    ├─ Medium (15%) → User's Selected Model ($0.01, 2s)
    └─ High/Critical (5%) → Best Domain Expert ($0.02, 2.5s)
```

---

## 📋 Implementation Checklist

### Phase 2A: Backend Triage (Week 1)

- [x] Update `ai-universal-processor` with SLM triage function
- [x] Add model routing logic based on complexity
- [x] Implement cost tracking per model type
- [ ] Add triage metadata to responses

### Phase 2B: Frontend Enhancement (Week 1-2)

- [ ] Extend `useUniversalAI` with chain mode
- [ ] Add smart routing toggle in AdvancedAISettings
- [ ] Create TriageInsightsBadge component
- [ ] Update PublicGenieInterface with enhanced prompts

### Phase 2C: Analytics & Monitoring (Week 2)

- [ ] Add cost analytics dashboard
- [ ] Track SLM vs LLM usage ratio
- [ ] Monitor routing accuracy
- [ ] A/B test cost savings

---

## 🔧 Technical Implementation

### 1. SLM Triage Service

**File:** `src/services/aiTriageService.ts`

```typescript
export interface TriageResult {
  complexity: 'simple' | 'medium' | 'high';
  domain: 'healthcare' | 'technology' | 'general';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  best_format: 'text' | 'table' | 'html' | 'image';
  keywords: string[];
  suggested_model: string;
  confidence: number;
  reasoning: string;
}

export async function triageQuery(query: string): Promise<TriageResult>
```

### 2. Model Router

**File:** `src/utils/modelRouter.ts`

```typescript
export function selectBestModel(
  triage: TriageResult,
  userSelectedModel: string,
  config: AIConfig
): {
  model: string;
  provider: string;
  reasoning: string;
}
```

### 3. Enhanced useUniversalAI Hook

**File:** `src/hooks/useUniversalAI.ts`

```typescript
interface AIRequestExtended {
  // ... existing fields
  mode?: 'default' | 'single' | 'multi' | 'chain'; // NEW
  enableSmartRouting?: boolean; // NEW
}
```

---

## 📊 Success Metrics

### Cost Optimization
- **Target:** 80% cost reduction on simple queries
- **Baseline:** $0.02 per query (all LLM)
- **Target:** $0.004 per query (80% SLM, 20% LLM)

### Performance
- **Target:** 10x faster for simple queries
- **Baseline:** 2s avg response time
- **Target:** 0.2s for simple, 2s for complex

### Accuracy
- **Target:** >95% correct routing decisions
- **Measure:** User satisfaction, escalation rate

---

## 🧪 Testing Strategy

### Unit Tests
- [ ] Test SLM triage with sample queries
- [ ] Test model router decision logic
- [ ] Test cost calculation accuracy

### Integration Tests
- [ ] Test full chain: triage → route → response
- [ ] Test fallback when SLM unavailable
- [ ] Test user preference override

### User Acceptance Tests
- [ ] 100 sample queries (mix simple/complex)
- [ ] Verify routing matches expectations
- [ ] Measure cost savings vs quality

---

## 🚀 Rollout Plan

### Week 1: Silent Mode
- Enable triage but always use user's selected model
- Log triage results for analysis
- NO user-facing changes

### Week 2: Gradual Rollout
- Enable smart routing for DEFAULT mode only
- 10% of users → monitor metrics
- Add opt-out toggle

### Week 3: Full Deployment
- Enable for all modes (default, single, multi)
- Add triage insights badge (optional display)
- Launch cost analytics dashboard

---

## 🛡️ Safeguards

### Always Honor User Preferences
```typescript
if (config.mode === 'single' || config.selectedModel !== 'auto') {
  // User explicitly chose a model - respect their choice
  // BUT: Enhance prompt with triage insights
}
```

### Escalation for Uncertainty
```typescript
if (triage.confidence < 0.7) {
  // Not confident in classification → use safer LLM
  return userSelectedModel;
}
```

### Quality Monitoring
- Track user feedback per routing decision
- Auto-disable smart routing if satisfaction drops
- A/B test to validate improvements

---

## 📈 Expected Outcomes

### By End of Phase 2

**Cost Impact:**
- Monthly cost: $730 → $149 (80% reduction)
- Per-query cost: $0.02 → $0.004 average

**Performance Impact:**
- Simple queries: 2s → 0.2s (10x faster)
- Complex queries: 2s → 2s (unchanged)
- Overall avg: 2s → 0.6s (3x faster)

**User Experience:**
- Same interface, same controls
- Faster responses for FAQs
- Better structured responses for complex queries
- Enhanced emotional intelligence

---

## 🔗 Related Documentation

- **Architecture:** `docs/MULTI_MODEL_ARCHITECTURE_ASSESSMENT.md`
- **Governance:** `docs/IMPLEMENTATION_GOVERNANCE.md`
- **Roadmap:** `docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md`
- **AI Logic:** `docs/AI_Routing_and_UX_Playbook.md`

---

**Last Updated:** 2025-01-12  
**Implementation Status:** Backend triage implemented, frontend pending  
**Next Steps:** Extend useUniversalAI hook, add smart routing toggle
