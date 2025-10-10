# Operations Runbook — Genie AI (Current vs Recommended)

Last Updated: 2025-10-10
Status: Consolidated and Implementation-Ready

Scope: Operational guardrails and procedures for AI routing, RAG, streaming, cost/rate limiting, observability, and incident response. This runbook consolidates and replaces docs/Operations_Runbook_Current_vs_Future.md and relevant archived docs.

## 1) Cutover Plan (Phased Rollout)

### CURRENT
- Keep defaults: smart routing disabled; Flash default; Pro for vision/complex
- Internal testers use feature flags selectively

### RECOMMENDED
- Phase 0: Baseline metrics — capture P95 TTFB and total response, model mix, RAG hit rate
- Phase 1 (Internal): enableSmartRouting=true for a small cohort; monitor deltas
- Phase 2 (QA): enableMultiModelComparison for targeted scenarios
- Phase 3 (GA): widen smart routing; enable outcome analytics; enforce token caps by tier
- Exit Criteria: No regressions in latency, error rate, or cost vs budget

## 2) SLA/SLO Targets

### CURRENT TARGETS
- P95 time-to-first-token: Flash ≤ 1.2s, Pro ≤ 2.5s
- P95 total response: Flash ≤ 4s, Pro ≤ 8s
- Non-user failure rate (4xx excluding 402/429, 5xx): < 0.5%

### RECOMMENDED ENHANCEMENTS
- Track per-domain (healthcare/tech) metrics separately
- SLO error budget alerts tied to rollout phases

## 3) Observability and Telemetry

### CURRENT
- Logs from ai-universal-processor include model, cost estimates, and errors
- Client logs streaming issues (stalls, disconnects)

### RECOMMENDED
- Dashboards:
  - Tokens/query, cost/query, model mix, RAG usage (hit/miss, citations count)
  - Latency breakdown: TTFB, stream throughput, total duration
  - Fallback events: upshift/downgrade counts
- Tracing:
  - Decision graph for model selection with inputs (domain, complexity, availability)
  - Confidence and token budget at decision-time

## 4) Rate Limiting & Budgets

### CURRENT
- Surface 429 with exponential backoff; 402 with user-facing toast

### RECOMMENDED
- Per-tenant token budgets with warning thresholds (80/90/100%)
- Queue bursts with user-facing progress UI

## 5) Security & Compliance

### CURRENT
- Input validation with zod; keep secrets server-side

### RECOMMENDED
- PII redaction pre-RAG and domain allowlists
- Audit: retain model, tokens, decision rationale, and sources (when RAG)

## 6) Incident Playbooks

- Streaming stalls
  - Actions: Check client network logs and SSE continuity; if >10s gap, auto-reconnect once; on second failure, fallback to non-stream response
  - Alert: >1% stall rate in 5m window

- RAG returns empty
  - Actions: Return helpful baseline answer; log miss; trigger background indexing job if appropriate; show “no sources” notice
  - Alert: RAG miss rate >20% for 30m

- Provider outage or rate-limit spike
  - Actions: Downgrade to flash-lite; surface notice; enable queueing for bursts
  - Alert: 5xx > 0.5% or 429 spike > 5x baseline

- Payment/Credits (402)
  - Actions: Block or downgrade based on tier; toast with guidance; record event

## 7) Change Management and Feature Flags

### CURRENT
- enableSmartRouting=false, enableMultiModelComparison=false, showOutcomeAnalytics=false

### RECOMMENDED
- Progressive enablement by cohort (internal → QA → GA)
- Rollback switch available for each flag with 1-click or config revert

## 8) Rollback & Recovery

- Rollback Plan: Disable smart routing, multi-model comparison, and outcome analytics; revert to Flash default
- Data Recovery: Ensure logs are exported or retained to compare pre/post change behavior

## 9) Ownership & On-call

- Primary: AI Routing & RAG Team
- Secondary: Frontend UX & Streaming
- Contact Methods: Internal incident channel; Supabase function logs

## 10) References

- Supabase Edge Functions (deploy/logs): Project dashboard → Functions
- Canonical UX & Routing Spec: docs/AI_Routing_and_UX_Playbook.md

---
This runbook supersedes prior operational documents and is the canonical reference for rollout, SLOs, observability, and incident response.
