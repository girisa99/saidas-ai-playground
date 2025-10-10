# Unified AI Implementation & UX Flow (Production-Ready)

Last Updated: 2025-10-10
Status: Consolidated and Implementation-Ready

Purpose: This single document consolidates and supersedes the following: GENIE_AI_OPTIMIZATION_PLAN.md, GENIE_OPTIMIZATION_IMPLEMENTATION_STRATEGY.md, GENIE_UX_FLOW_MODEL_SELECTION.md, GENIE_UI_IMPROVEMENTS.md, UNIVERSAL_KNOWLEDGE_BASE_GUIDE.md, UNIVERSAL_KNOWLEDGE_BASE_ROUTING.md. See docs/archived/ for originals.

1. Executive Summary
- One routing layer (ai-universal-processor) with optional smart model selection and RAG
- Default model: google/gemini-2.5-flash (fast, free through 2025-10-13), with on-demand routing to gemini-2.5-pro or openai/gpt-5 family when needed
- UX guarantees user control; AI recommends with rationale and cost/time tradeoffs
- Current vs. Future states are clearly labeled, with examples and dates

2. Performance & Capabilities
- Task strengths
  - Current (as of 2025-10-10):
    - General Q&A: google/gemini-2.5-flash
    - Vision + reasoning: google/gemini-2.5-pro
    - Heavy analytical reasoning or comparatives: gemini-2.5-pro; optionally openai/gpt-5 for premium cases
    - Fast summaries/classification: gemini-2.5-flash-lite
  - Future (Q4 2025+):
    - Add cost-aware SLM fallback for high-volume FAQ
    - Expand vision benchmarking set for medical tasks
- Context window
  - Current: Use model defaults; maintain rolling trimmed history
  - Future: Adaptive window with summarized history and deduped context
- Reasoning capabilities
  - Current: Pro for complex, Flash for most; fallback on error/latency
  - Future: Auto-upshift when confidence below threshold

3. Operational Factors
- Latency
  - Current: Use Flash by default; parallel RAG fetch; show typing indicator and model badge
  - Future: Pre-warm embeddings and cache top queries by route
- Cost structure
  - Current: Prefer Gemini 2.5 Flash/Pro (free until 2025-10-13); show estimated token budgets in UI
  - Future: Per-tenant budgets; throttle multi-model comparison when over budget
- Throughput and rate limits
  - Current: Surface 429 (rate limit) and 402 (credits) toasts; exponential backoff on retries
  - Future: Queue with user-facing progress for bursts
- Availability & fallback
  - Current: Route failure → downgrade to flash-lite; display fallback notice
  - Future: Multi-region endpoints and provider redundancy

4. Technical Integration
- API compatibility
  - All requests go through Supabase Edge Function: ai-universal-processor
  - Streaming SSE supported; client parses line-by-line; no secrets on client
- Model switching logic (priority)
  1) User explicit selection
  2) Domain requirement (healthcare/vision/etc.)
  3) Query complexity and cost target
  4) Availability/rate-limit status
  5) Default: google/gemini-2.5-flash
- Consistency across models
  - Single system prompt in edge function; append rationale with model badge in UI

5. Safety & Compliance
- Current
  - Input validation (zod), content filtering at edge if needed
  - Log model used, token estimates, and decision rationale for audit
- Future
  - Fine-grained redaction for PII pre-RAG; per-domain safety allowlists

6. Future-Proofing
- Versioning
  - Keep model map in a single config; include created_at/updated_at
- Vendor lock-in
  - Lovable AI Gateway used as abstraction; consistent request envelope
- Scalability
  - Embeddings index on universal_knowledge_base; hybrid search path

7. UX Flow (Single Source)
- Components
  - PublicGenieInterface: Orchestrates send; shows model badge and rationale
  - SplitScreenRenderer: Multi-model comparison (optional)
  - RichResponseRenderer: Format switching (text/table/visual)
  - TopicSuggestionPopover + Context detection: Suggests domain-appropriate topics
- Scenarios
  - No model selected → AI recommends silently; badge shows choice and "Why"
  - Minor disagreement → gentle toast to switch (user can ignore)
  - Major mismatch (e.g., image but non-vision model) → blocking dialog with recommendation

8. RAG and Knowledge
- Current
  - Universal table: universal_knowledge_base, vector + text search
  - RAG citations listed in responses when used
- Future
  - Confidence scoring, quality weighting, and per-domain ranking signals

9. Implementation Switches (Feature Flags)
- enableSmartRouting: false (default)
- enableMultiModelComparison: false (default)
- showOutcomeAnalytics: false (default)
- Enforcement: All flags are additive; no breaking changes

10. Current vs Future Examples (dated)
- 2025-10-10 (Current)
  - "Compare 2 diabetes treatments" → gemini-2.5-pro + RAG; Table + citations
  - "Quick define ML" → gemini-2.5-flash; Text
  - "Summarize attached chart" → gemini-2.5-pro (vision); Text + visual
- Q4 2025+ (Planned)
  - Auto-upshift to Pro when confidence <0.7
  - Token-aware routing caps per tier; SLM pre-summarization for long docs

Appendix A: Configuration Snippet (Model Priority)
- Priority order: user_selection > domain_requirement > complexity/cost > availability > default

Appendix B: Error Surfacing
- 429 Too Many Requests → toast: "Rate limit hit; retrying"; auto-backoff
- 402 Payment Required → toast: "Workspace credits required"
