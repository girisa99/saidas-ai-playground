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

## 10) Deployment Configuration & Monitoring

### CURRENT STATE (As-Implemented)
- Single internal application deployment (no multi-deployment support)
- User-scoped data (via `agents.created_by`, `agent_sessions.user_id`)
- Manual feature flags in code
- Basic console logging via edge functions
- No `genie_deployments` table (planned for Phase 3A)
- No deployment-level usage tracking

### PLANNED (See Architecture & Roadmap Docs)

**Phase 3A:** User-scoped deployment management (no workspace)
**Phase 4:** Full multi-tenant workspace architecture

For detailed schema and migration plan, see:
- `docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md`
- `docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md`

### RECOMMENDED (Future State)

#### 10.1 Multi-Deployment Management

**Deployment Types**
- `public`: External embeds, rate-limited, anonymous/basic auth
- `internal`: Full features, stricter auth, higher quotas
- `hybrid`: Mixed mode with role-based feature access

**Configuration Storage**

> **NOTE:** This schema is planned but NOT YET IMPLEMENTED.
> See `docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md` for phase-based implementation.

```sql
-- See GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md for:
-- - Phase 3A: User-scoped schema (without workspace_id)
-- - Phase 4: Multi-tenant schema (with workspace_id)
```

For the canonical, detailed schema with migration strategy, refer to the Architecture document.

#### 10.2 Feature Configuration Matrix

**Mandatory Features** (Always enabled)
- `provider: 'lovable'` - Lovable AI Gateway
- `usageTrackingEnabled: true` - Always track usage
- `rateLimitingEnabled: true` - Always enforce limits

**Optional Features** (À la carte)
```typescript
{
  // Model Selection
  "smartRouting": boolean,
  "multiModelComparison": boolean,
  "modelPreference": string[],
  
  // Context Enhancement
  "ragEnabled": boolean,
  "knowledgeBaseEnabled": boolean,
  "mcpEnabled": boolean,
  "mcpServers": string[],
  
  // Multimodal
  "visionEnabled": boolean,
  "medicalImagingEnabled": boolean,
  "imageGenerationEnabled": boolean,
  "ttsEnabled": boolean,
  "sttEnabled": boolean,
  
  // Quality
  "labelStudioEnabled": boolean,
  "labelStudioProject": string,
  
  // UI
  "splitScreenEnabled": boolean,
  "streamingEnabled": boolean,
  "feedbackEnabled": boolean,
  
  // Analytics
  "analyticsEnabled": boolean
}
```

#### 10.3 Monitoring & Observability

**Real-Time Dashboards**
- Active deployments count
- Requests/min per deployment
- Token usage by deployment
- Rate limit status (OK/Warning/Exceeded)
- Feature usage heatmap
- Model selection distribution
- Error rates per deployment
- Average latency per model/deployment

**Edge Function: Monitor Deployment Usage**
```typescript
// supabase/functions/track-deployment-usage/index.ts
serve(async (req) => {
  const { deploymentId, metrics } = await req.json();
  
  // Record metrics
  await supabase.from('deployment_usage_metrics').insert({
    deployment_id: deploymentId,
    requests_count: metrics.requests,
    tokens_used: metrics.tokens,
    models_used: metrics.models,
    avg_latency_ms: metrics.latency,
    error_count: metrics.errors,
    features_used: metrics.features
  });
  
  // Check rate limits
  const usage = await getRateLimitStatus(deploymentId);
  if (usage.exceeded) {
    return new Response(JSON.stringify({
      error: 'Rate limit exceeded',
      retryAfter: usage.resetIn
    }), { status: 429 });
  }
  
  // Check alert thresholds
  const config = await getDeploymentConfig(deploymentId);
  if (config.monitoring.alertThresholds) {
    checkAlerts(metrics, config.monitoring.alertThresholds);
  }
  
  return new Response(JSON.stringify({ success: true }));
});
```

#### 10.4 Rate Limiting Strategy

**Per-Deployment Limits**
```typescript
interface RateLimits {
  requestsPerMinute?: number;   // Rolling window
  requestsPerHour?: number;     // Rolling window
  requestsPerDay?: number;      // Daily reset at midnight UTC
  tokensPerRequest?: number;    // Max per request
  tokensPerDay?: number;        // Daily budget
}

// Default limits by deployment type
const DEFAULT_LIMITS = {
  public: {
    requestsPerMinute: 10,
    requestsPerHour: 100,
    requestsPerDay: 1000,
    tokensPerRequest: 4000,
    tokensPerDay: 50000
  },
  internal: {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
    requestsPerDay: 10000,
    tokensPerRequest: 16000,
    tokensPerDay: 500000
  },
  hybrid: {
    // Role-based: compute per request based on user tier
  }
};
```

**Edge Function: Rate Limit Check**
```typescript
// supabase/functions/check-rate-limit/index.ts
serve(async (req) => {
  const { deploymentId, userId, sessionId } = await req.json();
  
  const config = await getDeploymentConfig(deploymentId);
  const limits = config.rateLimits || DEFAULT_LIMITS[config.deploymentType];
  
  // Check minute window
  const minuteKey = `rate:${deploymentId}:minute:${currentMinute}`;
  const minuteCount = await redis.incr(minuteKey);
  await redis.expire(minuteKey, 60);
  
  if (minuteCount > limits.requestsPerMinute) {
    return { allowed: false, reason: 'minute_limit', retryAfter: 60 };
  }
  
  // Check daily token budget
  const dailyKey = `tokens:${deploymentId}:${currentDay}`;
  const tokensToday = await redis.get(dailyKey) || 0;
  
  if (tokensToday > limits.tokensPerDay) {
    return { allowed: false, reason: 'daily_token_budget', retryAfter: secondsUntilMidnight };
  }
  
  return { allowed: true };
});
```

#### 10.5 Usage Analytics & Reporting

**Daily Summary Report**
```typescript
interface DailySummary {
  date: string;
  deployments: {
    deploymentId: string;
    deploymentName: string;
    requests: number;
    tokensUsed: number;
    costEstimate: number;
    avgLatency: number;
    errorRate: number;
    topModels: { model: string; usage: number }[];
    topFeatures: { feature: string; usage: number }[];
  }[];
  totals: {
    totalRequests: number;
    totalTokens: number;
    totalCost: number;
    avgErrorRate: number;
  };
}
```

**Edge Function: Generate Daily Report**
```typescript
// Scheduled via cron: 0 1 * * * (1 AM daily)
serve(async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const summary = await generateDailySummary(yesterday);
  
  // Store report
  await supabase.from('daily_reports').insert({
    report_date: yesterday,
    summary
  });
  
  // Send alerts if thresholds exceeded
  if (summary.totals.totalCost > COST_ALERT_THRESHOLD) {
    await sendAdminAlert({
      type: 'cost_threshold',
      message: `Daily cost exceeded $${COST_ALERT_THRESHOLD}`,
      data: summary
    });
  }
  
  return new Response(JSON.stringify(summary));
});
```

#### 10.6 Feature Toggle Management

**Real-Time Feature Updates**
```typescript
// Admin dashboard: toggle features without redeployment
const toggleFeature = async (deploymentId: string, feature: string, enabled: boolean) => {
  // Update config
  const { error } = await supabase
    .from('genie_deployments')
    .update({
      features: {
        ...existingFeatures,
        [feature]: enabled
      },
      updated_at: new Date()
    })
    .eq('deployment_id', deploymentId);
  
  // Broadcast to all active clients via Realtime
  await supabase.channel('deployment-updates').send({
    type: 'broadcast',
    event: 'feature_toggle',
    payload: { deploymentId, feature, enabled }
  });
  
  // Log the change
  await supabase.from('audit_logs').insert({
    action: 'feature_toggle',
    deployment_id: deploymentId,
    details: { feature, enabled, userId: auth.uid() }
  });
};
```

**Feature Presets**
```typescript
const PRESETS = {
  minimal: { smartRouting: false, ragEnabled: false, splitScreenEnabled: false },
  standard: { smartRouting: true, ragEnabled: true, visionEnabled: true },
  premium: { /* all features enabled */ },
  healthcare: { /* healthcare-optimized */ }
};

// Apply preset
await applyPreset(deploymentId, 'healthcare');
```

#### 10.7 Deployment Embed Management

**JavaScript Snippet Generation**
```typescript
// Admin generates embed code for public deployments
const generateEmbedCode = (deploymentId: string, features: OptionalFeatures) => {
  return `
<script src="https://genie-ai.app/embed.js"></script>
<script>
  GenieAI.init({
    deploymentId: '${deploymentId}',
    apiKey: 'pk_live_${generatePublicKey(deploymentId)}',
    features: ${JSON.stringify(features, null, 2)}
  });
</script>
<div id="genie-chat"></div>
  `.trim();
};
```

**SDK Configuration**
```typescript
// Generate SDK config for internal apps
const generateSDKConfig = (deploymentId: string) => {
  return {
    apiKey: generatePrivateKey(deploymentId),
    deploymentId,
    endpoint: 'https://api.genie-ai.app/v1',
    features: getDeploymentFeatures(deploymentId)
  };
};
```

#### 10.8 Alert Policies

**Alert Conditions**
- Error rate > 5% (5min window) → Page on-call
- Avg latency > 3s (5min window) → Slack alert
- Token budget > 80% → Email alert to admin
- Token budget > 100% → Rate limit triggered + escalation
- Rate limit exceeded on >10 deployments → Investigate capacity
- Any 429 (rate limit) on internal deployments → Urgent alert

**Notification Channels**
- Critical: PagerDuty
- Warning: Slack #genie-alerts
- Info: Email daily summary

## 11) References

- Supabase Edge Functions (deploy/logs): Project dashboard → Functions
- Canonical UX & Routing Spec: docs/AI_Routing_and_UX_Playbook.md
- AI Coverage Summary: docs/AI_Coverage_Summary.md
- Deployment Configuration: Genie Deployments table
- Real-Time Monitoring: Admin Dashboard → Deployments

---
This runbook supersedes prior operational documents and is the canonical reference for rollout, SLOs, observability, incident response, and deployment management.
