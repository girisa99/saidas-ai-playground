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
- Key Components: PublicGenieInterface (orchestration), SplitScreenRenderer (optional multi-model), RichResponseRenderer (formatting), TopicSuggestionPopover + context detection
- Scenarios:
  - No model selected → AI recommends silently; badge shows choice + "Why"
  - Minor mismatch → gentle toast suggesting switch
  - Major mismatch (e.g., image on non-vision model) → blocking dialog with recommended model

### RECOMMENDED
- Outcome analytics surfaced (opt-in)
- Confidence-aware recommendations; auto-upshift when very low confidence

### UX Flow Diagram
```
flowchart TD
    A[User input] --> B{User selected model?}
    B -- Yes --> C[Route to selected model]
    B -- No --> D[Analyze domain/complexity/cost]
    D --> E{Needs vision/healthcare?}
    E -- Yes --> F[Route to gemini-2.5-pro]
    E -- No --> G[Route to gemini-2.5-flash]
    C --> H[Invoke RAG in parallel if enabled]
    F --> H
    G --> H
    H --> I[Stream tokens + show model badge]
    I --> J{Confidence low?}
    J -- Yes --> K[Offer switch or auto-upshift]
    J -- No --> L[Render Rich Response + citations]
```

## 8) Feature Flags and Behavior
- enableSmartRouting: false (default)
- enableMultiModelComparison: false (default)
- showOutcomeAnalytics: false (default)
- Enforcement: All flags are additive; switching on any feature must not break base flow

## 9) Implementation Guide (Step-by-Step)

1. Preconditions
   - All client calls go through Supabase Edge Function: ai-universal-processor (no secrets on client)
   - Keep a single system prompt in the Edge Function; attach a short "routing rationale" to responses for UI badge

2. Centralize Model Map
   - Store model identifiers and priorities in one map within ai-universal-processor with created_at/updated_at metadata
   - Priority: user_selection > domain_requirement > complexity/cost > availability > default

3. Smart Routing Switch (Incremental)
   - Phase 1 (default off): keep manual selection and basic recommendation UI
   - Phase 2 (flag on): enable domain + complexity analysis and auto-upshift fallback on errors
   - Phase 3: add confidence thresholding and token-aware caps

4. Client Integration Points
   - Hook: src/hooks/useUniversalAI.ts
     - Request envelope properties already supported: provider, model, prompt, images, useRAG, knowledgeBase, context
     - Show model badge and (optional) rationale in PublicGenieInterface

5. RAG Controls
   - When useRAG=true, display citations; log hit/miss and source counts
   - Add basic confidence display when available

6. UX Instrumentation
   - Always show typing indicator while streaming
   - Surface 429 → "Rate limit hit; retrying" toast with backoff
   - Surface 402 → "Workspace credits required" toast
   - On auto-fallback, show a subtle notice

7. Rollout (tie-in with Ops Runbook)
   - Start with defaults; progressively enable flags for internal, QA, then GA

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
