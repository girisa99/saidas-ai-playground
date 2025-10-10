# AI Routing & UX Playbook (Production-Ready)

Last Updated: 2025-10-10
Status: Consolidated and Implementation-Ready

Purpose: This playbook consolidates and supersedes the following: docs/Unified_AI_Implementation_and_UX_Flow.md, docs/Operations_Runbook_Current_vs_Future.md, and all items in docs/archived/*. It clearly differentiates what is CURRENT vs RECOMMENDED, and integrates the implementation guide, strategy, and UX flow in one place.

— This document is now the single source of truth for AI routing, RAG, UX behavior, and rollout. —

## 1) Models & Routing

### CURRENT (as of 2025-10-10)
- Default model: google/gemini-2.5-flash
- Vision + reasoning: google/gemini-2.5-pro
- Heavy analytical/comparatives: gemini-2.5-pro; optionally openai/gpt-5 for premium cases
- Fast summaries/classification: gemini-2.5-flash-lite
- Model switching logic priority:
  1) User explicit selection
  2) Domain requirement (e.g., healthcare/vision)
  3) Query complexity & cost target
  4) Availability/rate-limit status
  5) Default fallback: gemini-2.5-flash
- Single system prompt enforced in Edge Function (ai-universal-processor)

### RECOMMENDED (Target)
- Auto-upshift when confidence < threshold (e.g., 0.7)
- Cost-aware SLM fallback for high-volume FAQ
- Adaptive context window with summarized history and deduped context
- Multi-region endpoints and provider redundancy for availability
- Central model map with versioning (created_at/updated_at)

## 2) Context, Memory, and Tokens

### CURRENT
- Use model defaults; maintain rolling trimmed history
- Fallback path on error/latency: downgrade to flash-lite with notice

### RECOMMENDED
- Adaptive windowing (summaries of history, deduped context)
- Token-aware routing caps by plan tier

## 3) Operational Factors

### CURRENT
- Latency: Prefer Flash by default; parallel RAG fetch; show typing indicator & model badge
- Costs: Prefer Gemini 2.5 Flash/Pro (free until 2025-10-13 where applicable); display estimated token budgets in UI
- Throughput/Rate limits: Surface 429 and 402 with toasts; exponential backoff on retries
- Availability: Failure → fallback to flash-lite with user notice

### RECOMMENDED
- Pre-warm embeddings and cache top queries
- Queueing with user-facing progress for bursts
- Multi-region, provider redundancy

## 4) API Integration

### CURRENT
- All requests flow through Supabase Edge Function: ai-universal-processor
- Streaming SSE supported; client parses line-by-line; no secrets on client
- Log model used, token estimates, and decision rationale for auditability

### RECOMMENDED
- Maintain a single request envelope to the Lovable AI Gateway
- Telemetry enrichment: decision graph (why model was picked), latency breakdown, RAG hit/miss

## 5) Safety & Compliance

### CURRENT
- Input validation (zod) and optional content filtering at the edge
- Audit logs include model used, token estimates, and routing rationale

### RECOMMENDED
- Fine-grained PII redaction pre-RAG
- Domain-specific allowlists/controls

## 6) RAG & Knowledge

### CURRENT
- Universal table: universal_knowledge_base with vector + text search
- RAG citations shown in responses when used

### RECOMMENDED
- Confidence scoring and quality weighting
- Per-domain ranking signals for healthcare/tech

## 7) UX Flow (Single Source)

### CURRENT
- Key Components: PublicGenieInterface (orchestration), SplitScreenRenderer (optional multi-model), RichResponseRenderer (formatting), TopicSuggestionPopover + context detection
- Scenarios:
  - No model selected → AI recommends silently; badge shows choice + “Why”
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
   - Keep a single system prompt in the Edge Function; attach a short “routing rationale” to responses for UI badge

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
   - Surface 429 → “Rate limit hit; retrying” toast with backoff
   - Surface 402 → “Workspace credits required” toast
   - On auto-fallback, show a subtle notice

7. Rollout (tie-in with Ops Runbook)
   - Start with defaults; progressively enable flags for internal, QA, then GA

## 10) Strategy & Roadmap
- Near-term: keep Flash default, Pro for vision/complex; instrument routing rationale and latency
- Mid-term: confidence-triggered upshift, token-aware caps, SLM pre-summarization
- Long-term: provider redundancy, multi-region, adaptive memory

## 11) Appendices

### A. Model Priority (authoritative)
user_selection > domain_requirement > complexity/cost > availability > default

### B. Error Surfacing (authoritative)
- 429 Too Many Requests → toast: “Rate limit hit; retrying”; auto-backoff
- 402 Payment Required → toast: “Workspace credits required”

---
This playbook supersedes prior documents and is the canonical reference for AI routing, RAG, UX behavior, and phased rollout.
