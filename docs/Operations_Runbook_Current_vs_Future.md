# Operations Runbook — AI + UX Consolidation

Last Updated: 2025-10-10
Scope: Day-2 ops, cutover steps, audits, and living checklist for the consolidated AI/UX flow

1) Ownership & Contacts
- Product Owner: TBD
- Tech Owner (Edge Functions): TBD
- UX Owner (Public Genie): TBD
- On-call Escalation: TBD

2) Cutover Plan (No Breaking Changes)
- Today (2025-10-10)
  - Keep defaults: enableSmartRouting=false, enableMultiModelComparison=false
  - Ensure ai-universal-processor streaming OK; surface 429/402 toasts
- Week +1
  - Enable enableSmartRouting for internal testers
  - Log model decisions, token budgets, RAG usage
- Week +2
  - Enable enableMultiModelComparison for QA routes only
  - Add OutcomeSummary to end of conversation view (flagged)
- Week +3
  - Roll out smart routing to 10% traffic; monitor costs/latency
- Week +4
  - General availability; document final settings

3) SLA/SLO Targets
- P95 time-to-first-token: ≤1.5s (Flash), ≤2.5s (Pro)
- P95 total response: ≤4.0s (Flash), ≤6.0s (Pro)
- Failure rate (non-user): <1%

4) Rate Limits & Credits
- 429 Too Many Requests: Backoff 1s→2s→4s; show toast and countdown
- 402 Payment Required: Show actionable toast and disable multi-model until resolved

5) Observability
- Logs to check
  - Edge: ai-universal-processor (model, cost estimate, errors)
  - Client: streaming parse warnings, partial JSON retries
- Dashboards (TBD)
  - Avg tokens/query, cost estimate, model mix, RAG usage

6) Configuration Source of Truth
- All model maps and flags reside in code (single config/module)
- Document changes in CHANGELOG (below) with date/time

7) Security & Compliance
- No secrets on client; LOVABLE_API_KEY is backend-only
- Audit fields captured: model_used, rationale, rag_used, token_budget_estimate
- Add privacy note when image uploads are processed (vision)

8) Incident Playbooks
- Streaming stalls
  - Action: Abort controller; retry once; fallback to non-streamed
- RAG returns empty
  - Action: Skip RAG; proceed LLM; log miss; raise low-signal alert if >20%/day
- Provider outage
  - Action: Switch to Flash-lite or alternate provider via gateway

9) Current vs. Future Examples (dated)
- Current (2025-10-10)
  - Healthcare explanatory: gemini-2.5-pro + RAG + citations
  - Simple definitional: gemini-2.5-flash (no RAG)
  - Vision ask: gemini-2.5-pro vision path
- Future (Q4 2025+)
  - Budget-aware routing (free/paid tiers)
  - Confidence-triggered upshift/downgrade

10) Checklists
- Pre-release
  - [ ] Flags set correctly (see Section 2)
  - [ ] Error toasts verified (402/429)
  - [ ] RAG citations visible when used
- Weekly ops
  - [ ] Review model mix and costs
  - [ ] Inspect RAG miss rate
  - [ ] Confirm latency SLOs

CHANGELOG
- 2025-10-10: Created consolidated runbook; established cutover; documented examples
