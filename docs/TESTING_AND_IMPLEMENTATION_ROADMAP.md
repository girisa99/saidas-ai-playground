# Testing & Implementation Roadmap

**Generated:** 2025-01-11  
**Updated:** 2025-01-11 (After Consolidation Audit)  
**REVISED STATUS:** 40% Implemented | 60% To Build  
**Timeline:** 8-9 weeks for full implementation  
**See Also:** `CONSOLIDATED_DOCUMENTATION_AUDIT.md` for cross-doc alignment

---

## ⚠️ CRITICAL FINDINGS

After auditing the actual codebase + database against playbook/runbook documentation:

### ✅ What IS Implemented (40%)
1. **Multi-User System (100%)** - User roles, per-user agents/conversations, RLS
2. **Basic RAG (100%)** - Keyword search, knowledge base, embeddings
3. **Public Genie (100%)** - Rate limiting, analytics, geolocation
4. **Streaming (100%)** - SSE streaming via edge functions

### ❌ What is NOT Implemented (60%)
- **DOCUMENTED:** Comprehensive AI routing, multi-model, split-screen, proactive recommendations, deployment management
- **ACTUALLY IMPLEMENTED:** Only basic AI calls with hardcoded model mapping
- **GAP:** 60% of documented features are NOT implemented

**Major Missing Features:**
1. ❌ **Multi-Tenancy (Phase 4)** - Workspaces, workspace members, multi-tenant RLS
2. ❌ **Context-based AI routing (Phase 1)** - Domain/task/complexity analysis
3. ❌ **Proactive model recommendations (Phase 1)** - Reasoning and suggestions
4. ❌ **Multi-model comparison (Phase 2)** - Split-screen rendering
5. ❌ **Deployment management (Phase 3A)** - User-scoped deployments, API keys
6. ❌ **MCP & Label Studio (Phase 3B)** - Integration tables (skeleton code only)
7. ❌ **Semantic vector RAG** - Only keyword search exists
8. ❌ **Cost budget enforcement** - Alerts and caps

---

## Implementation Phases (Aligned with All Docs)

**Reference Documents:**
- Architecture: `GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md`
- Database: `DATABASE_IMPLEMENTATION_AUDIT.md`
- AI Features: `AI_Coverage_Summary.md`, `AI_Routing_and_UX_Playbook.md`
- Operations: `Ops_Runbook_Genie.md`
- Consolidation: `CONSOLIDATED_DOCUMENTATION_AUDIT.md`

---

### Phase 1: AI Routing Intelligence (Weeks 1-2)
**Status:** Not started | **DB Changes:** None (logic only)

**Files to Create:**
- `src/services/aiRoutingService.ts` - Context analyzer & model selector
- `src/hooks/useAIRouting.ts` - React hook for routing
- `src/utils/contextAnalyzer.ts` - Domain/complexity detection
- `src/utils/modelDecisionEngine.ts` - Routing logic

**Implementation:** See `AI_Routing_and_UX_Playbook.md` for detailed logic

---

### Phase 2: Role-Based Specialization & Multi-Model (Weeks 2-3)
**Status:** ⏳ IN PROGRESS (Started 2025-01-12) | **DB Changes:** None (logic only)

**Implementation Approach:** Role-Based Specialization (Option C from MULTI_MODEL_ARCHITECTURE_ASSESSMENT.md)

**Files to Update:**
- `src/hooks/useUniversalAI.ts` - Add chain mode support
- `supabase/functions/ai-universal-processor/index.ts` - Add SLM triage logic
- `src/components/public-genie/AdvancedAISettings.tsx` - Add smart routing toggle
- `src/components/public-genie/PublicGenieInterface.tsx` - Enhanced prompts

**New Files to Create:**
- `src/services/aiTriageService.ts` - SLM-based query analysis
- `src/utils/modelRouter.ts` - Intelligent model selection
- `src/components/public-genie/TriageInsightsBadge.tsx` - Show routing decisions

---

### Phase 3A: User-Scoped Deployment Management (Weeks 3-4)
**Status:** Not started | **DB Changes:** Required

**Database Migration (via migration tool):**
```sql
CREATE TABLE genie_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),  -- User-scoped (Phase 3A)
  name TEXT NOT NULL,
  deployment_type TEXT,
  api_key_hash TEXT UNIQUE,
  features JSONB DEFAULT '{}',
  rate_limits JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE POLICY "Users manage own deployments" ON genie_deployments
  FOR ALL USING (auth.uid() = user_id);
```

**Files to Create:**
- `src/services/deploymentService.ts`
- `src/components/admin/DeploymentManager.tsx`

---

### Phase 3B: MCP & Label Studio (Weeks 4-5)
**Status:** Not started | **DB Changes:** Required

**Database Migration:**
```sql
CREATE TABLE mcp_servers (...);
CREATE TABLE agent_mcp_assignments (...);
CREATE TABLE label_studio_projects (...);
CREATE TABLE conversation_annotations (...);
```

See `DATABASE_IMPLEMENTATION_AUDIT.md` for full SQL.

---

### Phase 4: Multi-Tenancy Migration (Weeks 6-8)
**Status:** Not started | **DB Changes:** Major migration

**Database Migration:**
```sql
-- Add workspace tables
CREATE TABLE workspaces (...);
CREATE TABLE workspace_members (...);

-- Migrate existing tables
ALTER TABLE agents ADD COLUMN workspace_id UUID;
ALTER TABLE genie_deployments ADD COLUMN workspace_id UUID;

-- Update all RLS policies to workspace-scoped
```

See `GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md` for full migration strategy.

---

### Phase 5: Production Hardening (Weeks 8-9)
**Status:** Not started

**Tasks:**
- Load testing
- Security audit
- Performance optimization
- Documentation completion

---

## 🧪 Testing: Existing 40% Implementation (Weeks 1-2)

### Public Website Testing Checklist

#### ✅ Genie Popup & Conversation (CRITICAL)
**Database:** `genie_conversations`, `genie_popup_analytics`

- [ ] **Test 1.1:** Popup appears on page load
  - Expected: FloatingGenie component renders
  - Verify: `genie_popup_analytics` logs `popup_click` event
  
- [ ] **Test 1.2:** Privacy acceptance flow
  - Action: Accept privacy policy in popup
  - Expected: Email/name collected, stored in `genie_conversations`
  - Verify: `log_genie_popup_event('privacy_accepted')` called
  
- [ ] **Test 1.3:** Start conversation
  - Action: Type message and send
  - Expected: `genieConversationService.startConversation()` creates record
  - Verify: Conversation ID in `genie_conversations.conversation_id`
  - Check: `session_start` timestamp recorded
  
- [ ] **Test 1.4:** AI response streaming
  - Expected: Uses `ai-universal-processor` edge function
  - Verify: Response streams token-by-token
  - Check: Model used is `google/gemini-2.5-flash` (default)
  
- [ ] **Test 1.5:** Multi-turn conversation
  - Action: Send 3-5 messages back and forth
  - Expected: `messages` array updates in `genie_conversations`
  - Verify: `genieConversationService.updateConversation()` called
  
- [ ] **Test 1.6:** Conversation end
  - Action: Close popup or timeout
  - Expected: `is_active = false`, `session_end` timestamp
  - Verify: `genieConversationService.endConversation()` called

**Fix Required If Failing:**
```typescript
// Check: src/components/FloatingGenie.tsx
// Check: src/services/genieConversationService.ts
// Check: supabase/functions/ai-universal-processor/index.ts
```

---

#### ✅ Rate Limiting (CRITICAL)
**Database:** `genie_rate_limits`, `genie_ip_tracking`

- [ ] **Test 2.1:** IP-based daily limit (5 conversations/day)
  - Action: Start 6 conversations from same IP
  - Expected: 6th conversation blocked
  - Verify: `conversationLimitService.checkConversationLimits()` returns `allowed: false`
  - Check: `restriction_reason: "daily_limit_exceeded"`
  
- [ ] **Test 2.2:** IP-based hourly limit (2 conversations/hour)
  - Action: Start 3 conversations in 1 hour
  - Expected: 3rd conversation blocked
  - Verify: ConversationLimitModal appears
  
- [ ] **Test 2.3:** Email-based limits (10/day, 3/hour)
  - Action: Same email, different IPs
  - Expected: Limits enforced across IPs
  - Verify: `email_daily_count` increments in `genie_rate_limits`
  
- [ ] **Test 2.4:** Limit reset after 24 hours
  - Action: Wait or mock time forward
  - Expected: Limits reset, new conversations allowed
  - Check: `reset_time` field updated
  
- [ ] **Test 2.5:** Returning user detection
  - Action: Return with same email after 1 day
  - Expected: `is_returning_user = true`
  - Verify: Different messaging in UI

**Fix Required If Failing:**
```typescript
// Check: src/services/conversationLimitService.ts
// Check: supabase/functions/conversation-rate-limiter/index.ts
// Verify RLS policies on genie_rate_limits
```

---

#### ✅ Analytics & Geolocation
**Database:** `genie_popup_analytics`, `genie_ip_tracking`

- [ ] **Test 3.1:** Geolocation tracking on popup click
  - Expected: `geo_location` object with country, city, lat/lng
  - Verify: `genieAnalyticsService.getGeoLocation()` called
  - Check: Uses `https://ipapi.co/json/`
  
- [ ] **Test 3.2:** Track all event types
  - Events: `popup_click`, `privacy_accepted`, `user_registered`
  - Expected: All logged to `genie_popup_analytics`
  - Verify: `log_genie_popup_event()` RPC called
  
- [ ] **Test 3.3:** Vision feature tracking
  - Action: Upload medical image (if feature enabled)
  - Events: `vision_enabled`, `image_uploaded`, `dicom_processed`
  - Expected: Metadata includes `image_type`, `file_size`, `dicom_modality`
  
- [ ] **Test 3.4:** Admin analytics dashboard
  - Navigate: Admin dashboard → Genie Analytics
  - Expected: See popup clicks, registrations, conversations
  - Verify: `GeniePopupAnalyticsSection` component loads
  - Check: Charts render with data from last 7/30 days

**Fix Required If Failing:**
```typescript
// Check: src/services/genieAnalyticsService.ts
// Check: src/components/admin/GeniePopupAnalyticsSection.tsx
// Verify: IP geolocation API working
```

---

### Authorized Application Testing Checklist

#### ✅ Agent Builder (CRITICAL)
**Database:** `agents`, `agent_sessions`, `agent_templates`

- [ ] **Test 4.1:** Create new agent from template
  - Action: Select template (e.g., "Patient Onboarding Agent")
  - Expected: `agent_sessions` record created with `template_id`
  - Verify: `current_step = 'basic_info'`
  
- [ ] **Test 4.2:** Fill agent configuration
  - Steps: Basic Info → Knowledge → Actions → Deployment
  - Expected: Each step updates `agent_sessions` JSONB fields
  - Verify: `basic_info`, `knowledge`, `actions`, `deployment` populated
  
- [ ] **Test 4.3:** Save agent (publish)
  - Action: Complete wizard, click "Deploy"
  - Expected: Record moves from `agent_sessions` to `agents`
  - Verify: `status = 'active'`, `created_by = auth.uid()`
  
- [ ] **Test 4.4:** Load draft agent
  - Action: Return to unfinished agent
  - Expected: Session restored from `agent_sessions`
  - Verify: `current_step` resumes where left off
  
- [ ] **Test 4.5:** Delete draft agent (cleanup)
  - Action: Idle draft older than 7 days
  - Expected: `cleanup_old_draft_agents()` function removes
  - Verify: Only affects `status = 'draft'` and `updated_at < 7 days ago`

**Fix Required If Failing:**
```typescript
// Check: Agent builder components in src/components/
// Verify: Agent session save/load logic
// Check: Database triggers on agents/agent_sessions tables
```

---

#### ✅ Universal Knowledge Base (CRITICAL)
**Database:** `universal_knowledge_base`, `knowledge_usage_analytics`

- [ ] **Test 5.1:** Search medical imaging knowledge
  - Query: "CT scan brain findings"
  - Expected: Returns results from `domain = 'medical_imaging'`
  - Verify: `searchUniversalKnowledge('medical_imaging', query)` called
  - Check: Results sorted by `quality_score` DESC
  
- [ ] **Test 5.2:** Search across all domains
  - Query: "patient consent forms"
  - Expected: Returns from multiple domains
  - Verify: `universal_knowledge_base.is_approved = true`
  
- [ ] **Test 5.3:** Add knowledge entry
  - Action: Admin adds new guideline
  - Expected: `addKnowledgeEntry()` creates record
  - Verify: `finding_name`, `description`, `domain`, `content_type` set
  - Check: `quality_score = 75` (default)
  
- [ ] **Test 5.4:** Track knowledge usage
  - Action: Agent uses knowledge in response
  - Expected: `trackKnowledgeUsage()` increments counters
  - Verify: `knowledge_usage_analytics` record created
  - Check: `usage_count` increments on knowledge entry
  
- [ ] **Test 5.5:** Submit feedback
  - Action: User marks response as "helpful" or "not helpful"
  - Expected: `submitKnowledgeFeedback()` updates scores
  - Verify: `conversation_learning_feedback` record created
  - Check: `feedback_ratio` updated on knowledge entry

**Fix Required If Failing:**
```typescript
// Check: src/services/universalKnowledgeService.ts
// Check: src/services/knowledgeBaseService.ts
// Verify: Database functions: search_universal_knowledge, increment_knowledge_usage
```

---

#### ✅ Journey Stage System
**Database:** `agent_conversations`, `agent_template_journey_stages`, `journey_stage_transitions`

- [ ] **Test 6.1:** Initialize journey on conversation start
  - Action: User starts conversation with journey-enabled agent
  - Expected: `initialize_conversation_journey()` sets up stages
  - Verify: `journey_context` populated with `stages` array
  - Check: `current_journey_stage_id` set to first stage
  
- [ ] **Test 6.2:** Progress to next stage
  - Action: Complete stage requirements
  - Expected: `progress_journey_stage()` advances
  - Verify: `journey_stage_transitions` record created
  - Check: `from_stage_id` → `to_stage_id` logged
  
- [ ] **Test 6.3:** Journey completion
  - Action: Reach final stage
  - Expected: `journey_completed_at` timestamp set
  - Verify: No further stage progression possible
  
- [ ] **Test 6.4:** Journey analytics
  - Query: Avg time per stage, completion rate
  - Expected: Calculate from `journey_stage_transitions`
  - Verify: Metrics show bottlenecks

**Fix Required If Failing:**
```sql
-- Verify database functions:
-- initialize_conversation_journey(p_conversation_id, p_agent_id)
-- progress_journey_stage(p_conversation_id, p_next_stage_id, p_reason)
```

---

#### ✅ Compliance Monitoring
**Database:** `agent_compliance_monitoring`

- [ ] **Test 7.1:** Detect HIPAA violations
  - Scenario: Agent shares PHI without consent
  - Expected: Compliance check logs violation
  - Verify: `compliance_check_type = 'hipaa_phi_protection'`
  - Check: `severity_level = 'critical'`
  
- [ ] **Test 7.2:** Auto-remediation
  - Action: Violation detected
  - Expected: `auto_remediation_applied = true`
  - Verify: `remediation_actions` array populated
  
- [ ] **Test 7.3:** Admin review
  - Action: Admin reviews violation
  - Expected: `reviewed_by` set, `reviewed_at` timestamp
  - Verify: Admin notes in `check_result`

**Fix Required If Failing:**
```typescript
// Implement compliance checking logic
// Check: Edge function or service for compliance scans
```

---

#### ✅ Performance Monitoring
**Database:** `agent_performance_metrics`, `agent_health_checks`

- [ ] **Test 8.1:** Track response times
  - Action: Agent responds to query
  - Expected: `metric_type = 'response_time'`, `metric_value` in ms
  - Verify: `measurement_timestamp` recorded
  
- [ ] **Test 8.2:** Track token usage
  - Expected: `metric_type = 'token_usage'`
  - Verify: Input + output tokens counted
  
- [ ] **Test 8.3:** Health check execution
  - Action: Automated health check runs
  - Expected: `agent_health_checks` record created
  - Verify: `health_status` = 'healthy' | 'degraded' | 'unhealthy'
  - Check: `response_time_ms` < 2000 for healthy
  
- [ ] **Test 8.4:** Performance dashboard
  - Navigate: Admin → Agent Performance
  - Expected: Charts show response time trends
  - Verify: Avg, p50, p95, p99 calculated

**Fix Required If Failing:**
```typescript
// Add instrumentation to track metrics
// Check: Performance data collection in edge functions
```

---

## 🚧 PHASE 2: Fix Bugs & Fill Gaps in 80% (Week 2-3)

### Bug Fix Priority Matrix

| Issue | Severity | Table/Service | Fix Complexity |
|-------|----------|---------------|----------------|
| Rate limiting bypass via VPN | HIGH | `genie_rate_limits` | Medium - Add fingerprinting |
| Geolocation fails for some IPs | MEDIUM | `genieAnalyticsService` | Low - Add fallback |
| Journey stage gets stuck | HIGH | `journey_stage_transitions` | Medium - Add timeout logic |
| Knowledge search returns stale data | MEDIUM | `universal_knowledge_base` | Low - Add cache invalidation |
| Compliance check false positives | MEDIUM | `agent_compliance_monitoring` | High - Improve detection logic |
| Performance metrics missing for some agents | LOW | `agent_performance_metrics` | Low - Add error handling |
| Draft agent cleanup doesn't run | LOW | Database cron job | Medium - Verify pg_cron setup |

### Implementation Gaps (Within 80%)

#### Gap 1: Token Usage Tracking UI
**Status:** Database supports, UI missing

**Database Ready:**
```sql
-- Already exists
agent_performance_metrics (
  metric_type = 'token_usage',
  metric_value = <token_count>
)
```

**To Build:**
```typescript
// src/components/admin/TokenUsageDashboard.tsx
- Display total tokens used per agent
- Show cost per conversation
- Alert when approaching budget limits
- Export usage reports
```

**Effort:** 2-3 days

---

#### Gap 2: Journey Stage Templates UI
**Status:** Database fully populated, no UI to manage

**Database Ready:**
```sql
-- Already exists with 20+ templates
agent_template_journey_stages (
  template_id,
  title,
  description,
  tasks_checklist,
  validation_checkpoints
)
```

**To Build:**
```typescript
// src/components/admin/JourneyStageManager.tsx
- List all journey templates
- Create/edit/delete stages
- Reorder stages
- Clone templates
```

**Effort:** 3-4 days

---

#### Gap 3: Compliance Dashboard
**Status:** Data collected, no visualization

**Database Ready:**
```sql
agent_compliance_monitoring (
  compliance_check_type,
  violations,
  severity_level,
  recommendations
)
```

**To Build:**
```typescript
// src/components/admin/ComplianceDashboard.tsx
- List all violations by severity
- Show trends over time
- Export compliance reports
- Filter by agent/date range
```

**Effort:** 3-4 days

---

#### Gap 4: Health Check Automation
**Status:** Table exists, no automated checks

**Database Ready:**
```sql
agent_health_checks (
  agent_id,
  check_type,
  health_status,
  check_result
)
```

**To Build:**
```sql
-- Create pg_cron job
SELECT cron.schedule(
  'agent-health-checks',
  '*/5 * * * *', -- Every 5 minutes
  $$ SELECT run_agent_health_checks(); $$
);
```

```typescript
// supabase/functions/run-health-checks/index.ts
- Ping each active agent
- Record response time
- Update health_status
- Alert if unhealthy
```

**Effort:** 2-3 days

---

## 🏗️ PHASE 3: Build Remaining 20% (Week 3-6)

### Priority 1: MCP (Model Context Protocol) Integration
**Timeline:** Week 3-4 (10 days)  
**Complexity:** HIGH

#### Database Migration
```sql
-- supabase/migrations/YYYYMMDD_add_mcp_support.sql

CREATE TABLE mcp_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  server_name TEXT NOT NULL UNIQUE,
  server_url TEXT NOT NULL,
  api_key_encrypted TEXT,
  provider_type TEXT NOT NULL CHECK (provider_type IN ('filesystem', 'github', 'database', 'api', 'custom')),
  configuration JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  rate_limit INTEGER DEFAULT 100,
  max_concurrent INTEGER DEFAULT 10,
  timeout_seconds INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE agent_mcp_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
  priority INTEGER DEFAULT 1,
  context_scope JSONB DEFAULT '{}'::jsonb,
  filters JSONB DEFAULT '{}'::jsonb,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(agent_id, mcp_server_id)
);

CREATE TABLE mcp_context_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mcp_server_id UUID REFERENCES mcp_servers(id) ON DELETE CASCADE,
  cache_key TEXT NOT NULL,
  cache_value JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_mcp_cache_key ON mcp_context_cache(mcp_server_id, cache_key);
CREATE INDEX idx_mcp_cache_expiry ON mcp_context_cache(expires_at);

-- RLS Policies
ALTER TABLE mcp_servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_mcp_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage MCP servers"
ON mcp_servers FOR ALL
USING (is_admin_user_safe(auth.uid()));

CREATE POLICY "Users can assign MCP to their agents"
ON agent_mcp_assignments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM agents
    WHERE agents.id = agent_mcp_assignments.agent_id
    AND agents.created_by = auth.uid()
  )
);
```

#### Edge Function
```typescript
// supabase/functions/mcp-context-provider/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MCPRequest {
  agent_id: string;
  query: string;
  context_scope?: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { agent_id, query, context_scope }: MCPRequest = await req.json();
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get MCP servers for this agent
    const { data: assignments } = await supabase
      .from("agent_mcp_assignments")
      .select(`
        *,
        mcp_servers!inner(*)
      `)
      .eq("agent_id", agent_id)
      .eq("is_enabled", true)
      .order("priority", { ascending: true });

    if (!assignments || assignments.length === 0) {
      return new Response(JSON.stringify({ context: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch context from each MCP server in parallel
    const contextPromises = assignments.map(async (assignment) => {
      const server = assignment.mcp_servers;
      
      // Check cache first
      const cacheKey = `${server.id}:${query}`;
      const { data: cached } = await supabase
        .from("mcp_context_cache")
        .select("cache_value")
        .eq("mcp_server_id", server.id)
        .eq("cache_key", cacheKey)
        .gt("expires_at", new Date().toISOString())
        .single();
      
      if (cached) {
        console.log(`✅ MCP Cache Hit: ${server.server_name}`);
        return cached.cache_value;
      }

      // Fetch from MCP server
      console.log(`🔍 Fetching from MCP: ${server.server_name}`);
      const response = await fetch(server.server_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(server.api_key_encrypted && {
            "Authorization": `Bearer ${server.api_key_encrypted}`
          }),
        },
        body: JSON.stringify({
          query,
          scope: context_scope || assignment.context_scope,
          filters: assignment.filters,
        }),
        signal: AbortSignal.timeout(server.timeout_seconds * 1000),
      });

      if (!response.ok) {
        console.error(`❌ MCP Error: ${server.server_name}`, response.status);
        return null;
      }

      const data = await response.json();

      // Cache the result
      await supabase
        .from("mcp_context_cache")
        .insert({
          mcp_server_id: server.id,
          cache_key: cacheKey,
          cache_value: data,
          expires_at: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour
        });

      return data;
    });

    const contexts = (await Promise.allSettled(contextPromises))
      .filter((result) => result.status === "fulfilled" && result.value !== null)
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    return new Response(JSON.stringify({ context: contexts }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MCP error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

#### Frontend Components
```typescript
// src/components/admin/MCPServerManager.tsx
// src/services/mcpService.ts
```

**Testing Checklist:**
- [ ] Create MCP server configuration
- [ ] Assign MCP server to agent
- [ ] Verify context fetching during conversation
- [ ] Test cache hit/miss
- [ ] Test timeout handling
- [ ] Test multiple MCP servers aggregation

---

### Priority 2: Label Studio Integration
**Timeline:** Week 4-5 (8 days)  
**Complexity:** MEDIUM-HIGH

#### Database Migration
```sql
CREATE TABLE label_studio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_name TEXT NOT NULL,
  project_api_url TEXT NOT NULL,
  api_token_encrypted TEXT NOT NULL,
  annotation_type TEXT NOT NULL CHECK (annotation_type IN ('conversation_quality', 'medical_image', 'text_classification', 'knowledge_validation')),
  expert_emails TEXT[],
  auto_submit_threshold NUMERIC DEFAULT 0.7,
  is_active BOOLEAN DEFAULT true,
  configuration JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE conversation_annotations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES agent_conversations(id) ON DELETE CASCADE,
  label_studio_project_id UUID REFERENCES label_studio_projects(id),
  label_studio_task_id INTEGER,
  annotation_data JSONB NOT NULL,
  quality_score NUMERIC,
  expert_feedback TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'annotated', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE label_studio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage Label Studio"
ON label_studio_projects FOR ALL
USING (is_admin_user_safe(auth.uid()));
```

**Effort:** 8 days

---

### Priority 3: Deployment Management
**Timeline:** Week 5-6 (6 days)  
**Complexity:** MEDIUM

#### Database Migration
```sql
CREATE TABLE genie_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_name TEXT NOT NULL,
  deployment_type TEXT NOT NULL CHECK (deployment_type IN ('public', 'internal', 'hybrid')),
  embed_code TEXT,
  allowed_domains TEXT[],
  feature_config JSONB DEFAULT '{}'::jsonb,
  rate_limits JSONB DEFAULT '{"daily": 5, "hourly": 2}'::jsonb,
  token_budget_daily INTEGER,
  token_budget_monthly INTEGER,
  cost_budget_daily NUMERIC,
  cost_budget_monthly NUMERIC,
  alert_thresholds JSONB DEFAULT '{"token_80": true, "token_90": true, "cost_80": true}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE deployment_usage_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID REFERENCES genie_deployments(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  total_conversations INTEGER DEFAULT 0,
  total_messages INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  total_cost NUMERIC DEFAULT 0.0,
  unique_users INTEGER DEFAULT 0,
  avg_response_time_ms INTEGER,
  model_usage JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(deployment_id, metric_date)
);
```

**Effort:** 6 days

---

## 📅 IMPLEMENTATION TIMELINE

### Week 1-2: Testing & Bug Fixes
- Test all 80% implemented features
- Fix critical bugs (rate limiting, journey stages)
- Build missing UIs (token usage, compliance dashboard)

### Week 3-4: MCP Integration
- Database migration
- Edge function development
- Frontend components
- Testing & documentation

### Week 5: Label Studio Integration
- Database migration
- API integration
- Annotation workflow
- Testing

### Week 6: Deployment Management
- Database migration
- Embed code generation
- Usage tracking dashboard
- Final testing & deployment

---

## 📊 SUCCESS METRICS

### Phase 1 (Testing)
- ✅ 95%+ test coverage on existing features
- ✅ All critical bugs identified and documented
- ✅ Performance baseline established

### Phase 2 (Bug Fixes)
- ✅ Zero critical bugs remaining
- ✅ All UIs built for existing database tables
- ✅ Documentation updated with actual behavior

### Phase 3 (New Features)
- ✅ MCP integration functional with 3+ providers
- ✅ Label Studio annotations flowing
- ✅ Deployment management live with usage tracking
- ✅ 100% feature parity with documentation

---

## 🎯 FINAL DELIVERABLES

1. **Testing Report** - Results of all 80% tests
2. **Bug Fix Log** - All fixes with before/after
3. **Migration Scripts** - SQL for remaining 20%
4. **Edge Functions** - MCP, Label Studio, Deployment tracking
5. **Frontend Components** - All missing UIs
6. **Updated Documentation** - Aligned with 100% implementation
7. **Deployment Guide** - Step-by-step for production rollout

**Total Effort:** 4-6 weeks (1 developer full-time)  
**Cost:** Minimal (infrastructure already exists)  
**Risk:** LOW (80% already working, remaining 20% is additive)
