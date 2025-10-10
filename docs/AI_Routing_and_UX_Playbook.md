# AI Routing & UX Playbook (Production-Ready)

Last Updated: 2025-10-10
Status: Consolidated and Implementation-Ready

Purpose: This playbook consolidates and supersedes the following: docs/Unified_AI_Implementation_and_UX_Flow.md, docs/Operations_Runbook_Current_vs_Future.md, and all items in docs/archived/*. It clearly differentiates what is CURRENT vs RECOMMENDED, and integrates the implementation guide, strategy, and UX flow in one place.

— This document is now the single source of truth for AI routing, RAG, UX behavior, and rollout. —

## 1) Models & Routing

### CURRENT (as of 2025-10-10)

**Model Assignments:**
- Default model: google/gemini-2.5-flash (balanced performance/cost)
- Vision + reasoning: google/gemini-2.5-pro (multimodal capabilities)
- Heavy analytical/comparatives: gemini-2.5-pro; optionally openai/gpt-5 for premium cases
- Fast summaries/classification: gemini-2.5-flash-lite (optimized for speed)
- Image generation: google/gemini-2.5-flash-image-preview

**Task-Specific Model Selection:**
- General conversation: gemini-2.5-flash
- Domain-specific (healthcare/clinical): gemini-2.5-pro (better accuracy)
- Code generation: gemini-2.5-flash (adequate for most cases)
- Creative writing: gemini-2.5-pro (better nuance)
- Analytical reasoning: openai/gpt-5 or gemini-2.5-pro
- Multilingual: All Gemini models support multilingual

**Context Window Management:**
- Gemini models: Up to 2M tokens (practical limit: use model defaults)
- Current implementation: Rolling trimmed history without summarization
- No adaptive context window yet

**Model Switching Logic Priority:**
1. User explicit selection (always honored)
2. Domain requirement (healthcare → Pro; tech → Flash)
3. Query complexity & cost target
4. Availability/rate-limit status
5. Default fallback: gemini-2.5-flash

**Integration:**
- Single system prompt enforced in Edge Function (ai-universal-processor)
- All requests through Lovable AI Gateway
- Streaming SSE supported; no secrets on client

### RECOMMENDED (Target)

**Intelligent Model Selection:**
- Auto-upshift when confidence < threshold (e.g., 0.7)
- Task-specific routing matrix (code → Flash, creative → Pro, analysis → GPT-5)
- Cost-aware SLM fallback for high-volume FAQ
- Multi-model orchestration for comparison scenarios

**Context & Memory:**
- Adaptive context window with summarized history and deduped context
- Context window optimization per model type
- Better reasoning with extended context for complex queries

**Infrastructure:**
- Multi-region endpoints and provider redundancy for availability
- Central model map with versioning (created_at/updated_at)
- Fallback chains: Primary → Secondary → Lite

**Consistency:**
- Unified system prompt across models
- Tone and personality alignment
- Response format standardization

## 2) Context, Memory, and Tokens

### CURRENT
- Use model defaults; maintain rolling trimmed history
- Fallback path on error/latency: downgrade to flash-lite with notice
- Fixed 4000 token limit (not adaptive)

### RECOMMENDED
- Adaptive windowing (summaries of history, deduped context)
- Token-aware routing caps by plan tier
- Dynamic token allocation:
  - Simple queries: 1500 tokens
  - Medium queries: 3000 tokens
  - Complex queries: 6000 tokens
- Context compression for large conversations

## 3) Operational Factors

### CURRENT

**Latency:**
- Prefer Flash by default (1.2s P95 TTFB target)
- Parallel RAG fetch to minimize wait
- Show typing indicator & model badge during streaming
- Pro model: 2.5s P95 TTFB target

**Costs:**
- Prefer Gemini 2.5 Flash/Pro (free until 2025-10-13)
- Display estimated token budgets in UI
- No cost optimization per tier yet
- Fixed 4000 token limit (not adaptive)

**Throughput & Rate Limits:**
- Surface 429 (rate limit) with toast + exponential backoff
- Surface 402 (payment required) with toast + guidance
- No request queuing for bursts
- No per-tenant token budgets

**Availability & Reliability:**
- Single provider (Lovable AI Gateway)
- Failure → fallback to flash-lite with user notice
- No multi-region support
- No provider redundancy

### RECOMMENDED

**Latency Optimization:**
- Pre-warm embeddings for popular queries
- Cache top queries with TTL
- Smaller models for simple tasks (flash-lite < 1s)
- Parallel model invocation for comparison mode

**Cost Structure:**
- Token budget allocation by user tier (free/pro)
- Mix models: cheap for simple, premium for complex
- Monitor cost per session/user
- Alert at 80/90/100% of budget thresholds

**Throughput:**
- Queue bursts with user-facing progress UI
- Per-tenant rate limiting with warnings
- Throttling strategies for high-volume users
- Concurrent request handling optimization

**Availability:**
- Multi-region endpoints (US, EU, APAC)
- Provider redundancy (Lovable AI + direct OpenAI fallback)
- Health checks and automatic failover
- SLA: 99.9% uptime target

## 4) API Integration & Technical Architecture

### CURRENT

**API Compatibility:**
- All requests through Supabase Edge Function: ai-universal-processor
- Lovable AI Gateway (OpenAI-compatible API)
- Streaming SSE supported; client parses line-by-line
- No secrets exposed on client
- Function calling supported (tool use)

**Model Switching Logic:**
- Basic static mapping in ai-universal-processor
- Priority: user_selection > domain > complexity > availability > default
- No dynamic complexity analysis yet
- No confidence-based routing

**Consistency Across Models:**
- Single system prompt enforced server-side
- No tone/personality variations tracked
- Manual markdown formatting (not model-specific)

**Auditability:**
- Log model used, token estimates, routing rationale
- Basic error tracking
- No decision graph visualization

### RECOMMENDED

**Enhanced API Integration:**
- Maintain single request envelope to Lovable AI Gateway
- Support for structured outputs (tool calling)
- Streaming optimization with chunk batching
- Request/response compression for large contexts

**Intelligent Model Switching:**
- Query analyzer to determine optimal model
- Confidence thresholds trigger upshift/downshift
- Decision graph: log why each model was chosen
- A/B testing framework for model comparison

**Cross-Model Consistency:**
- Unified response formatting across models
- Tone/personality alignment system
- Consistent error handling and user messaging
- Standardized citation format from RAG

**Telemetry & Observability:**
- Decision graph (model selection reasoning)
- Latency breakdown (TTFB, streaming, total)
- RAG hit/miss, source counts, confidence scores
- Cost tracking per session/model/user

## 5) Safety & Compliance

### CURRENT

**Safety Filters & Guardrails:**
- Input validation with zod schemas
- Optional content filtering at edge (basic)
- No PII detection/redaction
- No domain-specific content controls

**Data Privacy:**
- No conversation data stored long-term (unless user opts in)
- Secrets stored server-side only
- No custom data retention policies
- GDPR compliance: manual user data deletion

**Auditability:**
- Logs include: model used, token estimates, routing rationale
- Basic error tracking in Supabase logs
- No request replay capability
- No compliance reporting dashboard

### RECOMMENDED

**Enhanced Safety:**
- Fine-grained PII redaction pre-RAG and pre-model
- Domain-specific allowlists (e.g., healthcare terminology only)
- Custom content moderation rules per context
- Automated safety layer for sensitive queries

**Advanced Privacy:**
- Configurable data retention per tenant
- Automated PII scrubbing in logs
- End-to-end encryption for sensitive contexts
- GDPR/HIPAA compliance tooling

**Comprehensive Audit Trail:**
- Full request/response logging with model selection reasoning
- Compliance reporting dashboard
- Request replay for debugging
- Tracking: which model, when, why, for which user/session

## 6) RAG & Knowledge

### CURRENT
- Universal table: universal_knowledge_base with vector + text search
- RAG citations shown in responses when used
- Keyword-based search (ILIKE)
- No confidence scoring

### RECOMMENDED
- Semantic embeddings with vector similarity search
- Confidence scoring and quality weighting
- Per-domain ranking signals for healthcare/tech
- RAG hit/miss tracking and analytics

## 7) UX Flow (Single Source)

### CURRENT

**Key Components:**
- PublicGenieInterface (orchestration)
- SplitScreenRenderer (optional multi-model)
- RichResponseRenderer (formatting)
- TopicSuggestionPopover + context detection
- Model badge showing which model was used

**Model Selection Flow:**

1. **User Selects Model + AI Analyzes Query:**
   - ✅ **Match**: Proceed silently with model badge confirmation
   - 💡 **Minor difference**: Gentle toast suggestion, auto-proceed with user choice
   - ⚠️ **Major difference**: Blocking dialog requiring approval (e.g., image on non-vision model)
   - 🤖 **No selection**: AI chooses automatically, badge shows choice + "Why?" tooltip

2. **Current Scenarios:**
   - No model selected → AI recommends silently; badge shows choice + "Why"
   - Minor mismatch (e.g., using Flash for heavy reasoning) → gentle toast: "Pro recommended for complex analysis" + continue
   - Major mismatch (e.g., image on Flash Lite) → blocking dialog: "Flash Lite doesn't support images. Switch to Gemini Pro?"
   - Match → silent proceed with badge

**User Control (Basic):**
- Can manually select any model
- Can override AI recommendations
- No automation level settings yet
- No learning from user choices yet

**Transparency (Basic):**
- Model badge shows which model was used
- No cost/token metrics displayed yet
- No "Why this model?" reasoning visible by default
- No post-response comparison option

### RECOMMENDED

**Enhanced Model Selection Flow:**

```
User Input → [User Selected Model?]
     ↓ YES                    ↓ NO
AI Analyzes Query      AI Analyzes Query
     ↓                        ↓
Compare User vs AI      AI Selects Model
     ↓                        ↓
Match? Minor? Major?    Auto-Select + Show Badge
     ↓                        ↓
[Decision Tree]         User Sees Reasoning
```

**Decision Tree for User-Selected Models:**

| Scenario | AI Recommendation | User Selection | Action | UI Feedback |
|----------|-------------------|----------------|--------|-------------|
| ✅ Match | Flash | Flash | Proceed silently | Green badge: "Gemini Flash (optimal)" |
| 💡 Minor Diff | Pro | Flash | Toast + Auto-proceed | Orange toast: "Pro recommended for better results. Continuing with Flash..." |
| ⚠️ Major Diff | Pro (vision) | Flash Lite | Block + Require approval | Dialog: "Flash Lite doesn't support images. Switch to Pro?" |
| 🤖 No Selection | - | - | AI auto-selects | Badge: "Gemini Flash (auto-selected)" + "Why?" tooltip |

**User Automation Control (Settings):**

Three automation levels users can configure:

1. **Manual Mode** (User always chooses):
   - No AI suggestions
   - User picks model every time
   - AI shows post-response what it would have chosen

2. **Smart Assist** (Default - AI suggests, user controls):
   - AI analyzes and suggests
   - Gentle toasts for minor differences
   - Blocking dialogs for major mismatches
   - User can override any suggestion
   - System learns from overrides

3. **Auto-Optimize** (AI chooses, user monitors):
   - AI auto-selects optimal model
   - Silent model switching
   - Badge shows reasoning
   - User can manually override on next query
   - System learns from manual overrides

**System Learning (Recommended):**
- Track user model preferences per query type
- Learn patterns: "User prefers Pro for medical queries despite Flash being suggested"
- Adjust AI suggestions based on user history
- Privacy: Learning stored per-user session only

**Enhanced Transparency (Every Response):**

Display in response footer or expandable card:
```
┌─────────────────────────────────────────────────┐
│ 🤖 Model: Gemini 2.5 Flash                     │
│ 💡 Why: Balanced speed + quality for general Q  │
│ 💰 Cost: ~$0.006 (estimated)                    │
│ 🎯 Tokens: 1,523 / 3,000 budget                │
│ ⚡ Speed: 1.8s response time                    │
│ 📊 [Compare with other models]                  │
└─────────────────────────────────────────────────┘
```

**Post-Response Comparison (Recommended):**
- "Compare with other models" button
- Side-by-side: Flash vs Pro vs GPT-5
- Shows quality difference, cost difference, speed difference
- Helps user learn which model to prefer
- Enable `enableMultiModelComparison` flag

**Example Flow:**

```
User: [Uploads medical scan] "What does this show?"
User Selection: Flash Lite (trying to save costs)
     ↓
AI Analysis: 
- Detects image
- Requires vision capability
- Flash Lite doesn't support vision
     ↓
⚠️ Blocking Dialog:
"Flash Lite doesn't support images. 
Switch to Gemini Pro for image analysis?
Estimated cost: $0.02 vs $0.005"
     ↓
User: [Approves switch]
     ↓
Response Badge:
"🤖 Gemini Pro (switched from Flash Lite)
💡 Why: Image analysis requires vision capability
💰 Cost: $0.02 | ⚡ 2.3s"
```

### UX Flow Diagram (Enhanced)

```
flowchart TD
    A[User input + optional model selection] --> B{User selected model?}
    B -- Yes --> C[AI analyzes query requirements]
    B -- No --> D[AI analyzes + auto-selects]
    
    C --> E{Compare user vs AI choice}
    E -- Match --> F[✅ Proceed silently + badge]
    E -- Minor diff --> G[💡 Toast suggestion + auto-proceed]
    E -- Major diff --> H[⚠️ Blocking dialog + require approval]
    
    D --> I[Show auto-selected model + reasoning badge]
    
    F --> J[Invoke RAG if enabled]
    G --> J
    H --> K{User approves?}
    K -- Yes --> J
    K -- No --> L[Use user's original choice]
    I --> J
    L --> J
    
    J --> M[Stream response + show metrics]
    M --> N[Display: Model badge, cost, tokens, speed]
    N --> O{Show outcome analytics?}
    O -- Yes --> P[Compare with other models option]
    O -- No --> Q[End]
    P --> Q
```

**Settings UI (Recommended):**
```typescript
interface GeniePreferences {
  automationLevel: 'manual' | 'smart-assist' | 'auto-optimize';
  showCostMetrics: boolean;
  showPerformanceMetrics: boolean;
  enablePostResponseComparison: boolean;
  defaultModel?: string; // User's preferred default
  learnFromChoices: boolean; // Privacy toggle
}
```

## 8) Feature Flags and Behavior

**Current Flags:**
- enableSmartRouting: false (default)
- enableMultiModelComparison: false (default)
- showOutcomeAnalytics: false (default)
- Enforcement: All flags are additive; switching on any feature must not break base flow

**Recommended New Flags:**
- automationLevel: 'smart-assist' (default) | 'manual' | 'auto-optimize'
- showCostMetrics: false (default, enable in Phase 4)
- showPerformanceMetrics: false (default, enable in Phase 4)
- enableSystemLearning: false (default, enable in Phase 6)
- enablePostResponseComparison: false (default, enable with multi-model)


## 9) Implementation Guide (Step-by-Step)

### Phase 1: Query Intelligence (Week 1-2)
**Goal:** Understand what users are asking

**Files to Create:**
- `supabase/functions/ai-query-analyzer/index.ts` - Analyzes complexity, domain, intent, required capabilities
- `src/services/queryAnalysisService.ts` - Frontend query preprocessing
- `src/types/aiQuery.ts` - Type definitions

**Features:**
1. Intent classification (research, clinical, general, technical)
2. Domain detection (healthcare, tech, multi-domain)
3. Complexity scoring (0-100)
4. Required capabilities detection (vision, RAG, multi-model)
5. Cost estimation

**No user-facing changes** - collect data and log analysis results only.

### Phase 2: Model Selection Enhancement (Week 2-3)
**Goal:** Smart routing with user control and transparency

**Files to Modify:**
- `supabase/functions/ai-universal-processor/index.ts` - Add intelligent routing with comparison logic
- `src/components/public-genie/ModelSelectionDialog.tsx` - Create blocking dialog for major mismatches
- `src/components/public-genie/ModelBadge.tsx` - Enhanced badge with reasoning tooltip

**Decision Matrix Implementation:**
```typescript
interface ModelComparisonResult {
  userChoice: string;
  aiRecommendation: string;
  matchLevel: 'perfect' | 'minor' | 'major';
  reasoning: string;
  action: 'proceed' | 'suggest' | 'block';
}

function compareUserVsAIChoice(
  userModel: string | undefined,
  aiAnalysis: QueryAnalysis
): ModelComparisonResult {
  // Implementation of match/minor/major logic
}
```

**UX Components:**
- ✅ Match: Silent proceed with green badge
- 💡 Minor: Toast with suggestion, auto-proceed
- ⚠️ Major: Blocking dialog requiring approval
- 🤖 No selection: Auto-select with reasoning badge

**Feature flag:** `enableSmartRouting=false` (test internally first)

### Phase 3: User Preferences & Automation Levels (Week 3-4)
**Goal:** Give users control over automation

**Files to Create:**
- `src/components/public-genie/GenieSettings.tsx` - Settings panel
- `src/hooks/useGeniePreferences.ts` - Preference management hook
- Database table: `genie_user_preferences`

**Automation Levels:**
1. **Manual Mode**: User always chooses, AI shows what it would have picked
2. **Smart Assist** (default): AI suggests with toasts/dialogs, user controls
3. **Auto-Optimize**: AI chooses automatically, user can monitor

**Settings Schema:**
```typescript
interface GeniePreferences {
  user_id: string;
  automation_level: 'manual' | 'smart-assist' | 'auto-optimize';
  show_cost_metrics: boolean;
  show_performance_metrics: boolean;
  enable_post_response_comparison: boolean;
  default_model?: string;
  learn_from_choices: boolean;
}
```

### Phase 4: Transparency & Metrics Display (Week 4-5)
**Goal:** Show users cost, tokens, performance for every response

**Files to Create:**
- `src/components/public-genie/ResponseMetrics.tsx` - Metrics card component
- `src/utils/costCalculator.ts` - Calculate cost estimates

**Metrics to Display:**
```
┌─────────────────────────────────────────────────┐
│ 🤖 Model: Gemini 2.5 Flash                     │
│ 💡 Why: Balanced speed + quality for general Q  │
│ 💰 Cost: ~$0.006 (estimated)                    │
│ 🎯 Tokens: 1,523 / 3,000 budget                │
│ ⚡ Speed: 1.8s response time                    │
│ 📊 [Compare with other models]                  │
└─────────────────────────────────────────────────┘
```

**Feature flags:**
- `showCostMetrics=true`
- `showPerformanceMetrics=true`

### Phase 5: Post-Response Comparison (Week 5-6)
**Goal:** Let users compare how different models would have responded

**Files to Create:**
- `src/components/public-genie/ModelComparisonView.tsx` - Side-by-side comparison UI
- `supabase/functions/ai-multi-model-comparison/index.ts` - Invoke multiple models in parallel

**Features:**
- "Compare with other models" button on each response
- Side-by-side view: Flash vs Pro vs GPT-5
- Show quality, cost, speed differences
- Help users learn which model to prefer

**Feature flag:** `enableMultiModelComparison=true`

### Phase 6: System Learning (Week 6-7)
**Goal:** Learn from user choices to improve recommendations

**Files to Create:**
- Database table: `genie_model_choices` - Log user selections vs AI recommendations
- `src/utils/modelLearning.ts` - Pattern detection and preference learning

**Learning Logic:**
```typescript
interface UserModelPattern {
  user_id: string;
  query_type: string;
  ai_recommended: string;
  user_chose: string;
  frequency: number;
  last_seen: timestamp;
}

// Example: User always picks Pro for medical queries despite AI suggesting Flash
// → Future medical queries: AI auto-suggests Pro
```

**Privacy:**
- Learning stored per-user session only
- Can be disabled via `learn_from_choices` setting
- No cross-user learning (privacy-preserving)

**Feature flag:** `enableSystemLearning=false` (enable after testing)

### Client Integration Points
- Hook: `src/hooks/useUniversalAI.ts`
  - Add model comparison logic
  - Track user choices vs AI recommendations
  - Show model badge with reasoning
- Component: `PublicGenieInterface`
  - Integrate settings panel
  - Show metrics card
  - Handle blocking dialogs

### UX Instrumentation (Enhanced)
- Always show typing indicator while streaming
- Model badge with reasoning tooltip on every response
- Toast notifications for suggestions (minor mismatches)
- Blocking dialogs for major mismatches
- Metrics card (expandable/collapsible)
- Settings accessible from Genie UI
- Surface 429 → "Rate limit hit; retrying" toast with backoff
- Surface 402 → "Workspace credits required" toast
- On auto-fallback, show subtle notice badge

### Rollout Coordination
- Phase 1-2: Internal testing (baseline + smart routing)
- Phase 3-4: QA with user preferences + transparency
- Phase 5: Limited beta for multi-model comparison
- Phase 6: GA with all features, learning disabled by default
- See Ops Runbook (docs/Ops_Runbook_Genie.md) for SLO targets and monitoring

## 10) Strategy & Roadmap

### Near-term
- Keep Flash default, Pro for vision/complex; instrument routing rationale and latency
- Enable query intelligence with intent classification, domain detection, complexity scoring
- Add basic token optimization: dynamic allocation based on query complexity

### Mid-term
- Confidence-triggered upshift, token-aware caps, SLM pre-summarization
- RAG enhancement with semantic embeddings and confidence scoring
- Response format intelligence with auto-detection and tool calling
- Multi-model orchestration for side-by-side comparison

### Long-term
- Provider redundancy, multi-region endpoints for availability
- Adaptive memory with summarized history and deduped context
- Advanced cost optimization per tier
- Interactive response components (charts, diagrams, tables)

### Expected Performance Impact
| Metric | Current | After Optimization | Improvement |
|--------|---------|-------------------|-------------|
| Avg Response Time | 3-5s | 1.5-3s | 40-50% faster |
| Token Usage (Simple) | 4000 | 1500 | 62% reduction |
| Token Usage (Complex) | 4000 | 6000 | Better quality |
| RAG Accuracy | ~60% | ~85% | 25% improvement |
| Cost per Query (Simple) | $0.02 | $0.006 | 70% reduction |
| User Satisfaction | Baseline | +40% | Smarter responses |

## 11) Future-Proofing & Scalability

### CURRENT
- Single provider (Lovable AI Gateway)
- No model versioning strategy
- No abstraction layer for provider swapping
- Manual model updates in code

### RECOMMENDED

**Model Versioning Strategy:**
- Central model registry with versions and deprecation dates
- Gradual rollout: test new models on small cohort first
- Backward compatibility: maintain old model endpoints during migration
- Feature flags per model version

**Vendor Lock-in Mitigation:**
- Abstraction layer: unified interface for multiple providers
- Provider fallback chains (Lovable AI → OpenAI direct → Anthropic)
- Standard request/response envelope across providers
- Easy provider swapping via configuration

**Scalability:**
- Horizontal scaling: add models/providers without code changes
- Auto-scaling based on request volume
- Model load balancing across regions
- Caching layer for repeated queries

## 12) Appendices

### A. Model Priority (authoritative)
user_selection > domain_requirement > complexity/cost > availability > default

### B. Task-Specific Model Recommendations

| Task Type | Primary Model | Fallback | Reasoning |
|-----------|---------------|----------|-----------|
| General conversation | gemini-2.5-flash | flash-lite | Balanced cost/quality |
| Healthcare/Clinical | gemini-2.5-pro | flash | Domain accuracy critical |
| Code generation | gemini-2.5-flash | gpt-5-mini | Adequate for most code |
| Creative writing | gemini-2.5-pro | gpt-5 | Nuance matters |
| Analytical reasoning | openai/gpt-5 | gemini-2.5-pro | Complex multi-step |
| Quick classification | gemini-2.5-flash-lite | flash | Speed over precision |
| Vision tasks | gemini-2.5-pro | N/A | Multimodal required |

### C. Context Window Guidelines

| Model | Max Context | Practical Limit | Use Case |
|-------|-------------|-----------------|----------|
| Gemini 2.5 Pro | 2M tokens | 100K tokens | Long documents, extensive history |
| Gemini 2.5 Flash | 1M tokens | 50K tokens | Standard conversations |
| Gemini 2.5 Flash Lite | 1M tokens | 20K tokens | Quick queries |
| OpenAI GPT-5 | 200K tokens | 100K tokens | Complex reasoning |

### D. Error Surfacing (authoritative)
- 429 Too Many Requests → toast: "Rate limit hit; retrying"; auto-backoff
- 402 Payment Required → toast: "Workspace credits required"
- Model unavailable → silent fallback + subtle notice badge
- Confidence low → optional model switch suggestion

---
This playbook supersedes prior documents and is the canonical reference for AI routing, RAG, UX behavior, and phased rollout.
