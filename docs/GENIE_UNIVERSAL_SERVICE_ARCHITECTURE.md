# Genie Universal AI Service - Plug & Play Architecture

**Version:** 1.0  
**Last Updated:** 2025-01-11  
**Status:** Architecture Design Document

---

## 🎯 Executive Summary

**Vision:** Transform Genie AI system into a standalone, reusable, plug-and-play service that can be deployed across ANY application (multi-tenant, multi-user, with/without authentication) as easily as embedding a JavaScript snippet.

**Current State:** ✅ Multi-user application with per-user data isolation (implemented)
- User roles system with RLS
- Per-user agents, conversations, sessions
- Organization/facility grouping
- **NOT multi-tenant** - no workspace isolation

**Target State:** Microservice architecture with:
- Multi-tenant data isolation
- Authentication-agnostic design
- API-first approach
- Zero-config deployment options
- Horizontal scalability
- Complete modularity

---

## 🏗️ Architecture Principles

### 0. Current State: Multi-User (Implemented)

**What EXISTS now:**
```sql
-- User roles with RLS
CREATE TABLE roles (
  id UUID PRIMARY KEY,
  name user_role NOT NULL  -- superAdmin, onboardingTeam, patientCaregiver, demoUser
);

CREATE TABLE user_roles (
  user_id UUID REFERENCES auth.users(id),
  role_id UUID REFERENCES roles(id)
);

-- Per-user agents
CREATE TABLE agents (
  id UUID PRIMARY KEY,
  created_by UUID,  -- User isolation
  organization_id UUID,  -- Organization grouping
  facility_id UUID  -- Facility grouping
);

-- RLS enforces per-user access
CREATE POLICY "Users can view their own agents" ON agents
  FOR SELECT USING (auth.uid() = created_by);
```

**Migration Path to Multi-Tenancy:**
- Phase 3A: Add user-scoped `genie_deployments` (no workspace)
- Phase 4: Add `workspace_id` to all tables, migrate to workspace-scoped RLS

### 1. Multi-Tenancy First (Phase 4 - Future State)
Every data table MUST support workspace/organization isolation:
```sql
-- ALL tables follow this pattern
CREATE TABLE <table_name> (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  -- ... other columns
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Multi-tenant RLS policy pattern
CREATE POLICY "Users can access their workspace data"
ON <table_name>
FOR ALL
USING (
  workspace_id IN (
    SELECT workspace_id FROM workspace_members 
    WHERE user_id = auth.uid()
  )
);

-- Public deployment RLS policy pattern (no auth required)
CREATE POLICY "Public deployments accessible by API key"
ON <table_name>
FOR SELECT
USING (
  workspace_id = (
    SELECT workspace_id FROM deployment_api_keys
    WHERE key_hash = encode(digest(current_setting('request.headers')::json->>'x-api-key', 'sha256'), 'hex')
    AND is_active = true
  )
);
```

### 2. Authentication-Agnostic
Support 4 authentication modes:
1. **Authenticated User** - Full features, user-specific data
2. **API Key Only** - Public deployments, rate-limited by key
3. **Anonymous** - IP-based limits, no persistence
4. **Hybrid** - Optional auth with enhanced features when logged in

### 3. Workspace Isolation
```sql
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'free', -- free, starter, professional, enterprise
  subscription_status TEXT DEFAULT 'active',
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- owner, admin, member, viewer
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- Enable RLS
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their workspaces"
ON workspaces FOR SELECT
USING (id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()));

CREATE POLICY "Users can view workspace members"
ON workspace_members FOR SELECT
USING (workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()));
```

### 4. Deployment Configuration

**PHASE 3A: User-Scoped Deployments (First Implementation)**
```sql
-- No workspace required yet - user-scoped only
CREATE TABLE genie_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  deployment_type TEXT,
  api_key_hash TEXT UNIQUE,
  features JSONB DEFAULT '{}',
  rate_limits JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE POLICY "Users manage own deployments" ON genie_deployments
  FOR ALL USING (auth.uid() = user_id);
```

**PHASE 4: Multi-Tenant Deployments (Full Architecture)**
```sql
-- Add workspace support to existing table
ALTER TABLE genie_deployments ADD COLUMN workspace_id UUID REFERENCES workspaces(id);

-- Update RLS to workspace-scoped
CREATE TABLE genie_deployments_v2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  deployment_type TEXT NOT NULL, -- 'public_embed', 'internal_app', 'api_only', 'hybrid'
  
  -- API Keys for authentication
  api_key_hash TEXT UNIQUE, -- Hashed API key for secure access
  api_key_prefix TEXT, -- First 8 chars for display (e.g., "genie_pk_abcd1234...")
  
  -- Feature Configuration (À La Carte)
  features JSONB NOT NULL DEFAULT '{
    "core": {
      "ai_chat": true,
      "streaming": true,
      "model_selection": "auto"
    },
    "context_enhancement": {
      "rag": false,
      "knowledge_base": false,
      "mcp": false,
      "label_studio": false
    },
    "multimodal": {
      "vision": false,
      "voice": false,
      "image_generation": false
    },
    "quality": {
      "multi_model_comparison": false,
      "split_screen": false,
      "confidence_tracking": false
    },
    "monitoring": {
      "analytics": true,
      "usage_tracking": true,
      "performance_metrics": false
    }
  }'::jsonb,
  
  -- Rate Limits
  rate_limits JSONB NOT NULL DEFAULT '{
    "requests_per_minute": 10,
    "requests_per_hour": 100,
    "requests_per_day": 500,
    "tokens_per_day": 50000,
    "cost_per_day": 5.00
  }'::jsonb,
  
  -- Domain Restrictions
  allowed_domains TEXT[], -- NULL = all domains allowed
  allowed_ips INET[], -- NULL = all IPs allowed
  
  -- Customization
  branding JSONB DEFAULT '{
    "primary_color": "#3b82f6",
    "logo_url": null,
    "custom_css": null
  }'::jsonb,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  deployment_url TEXT, -- e.g., https://example.com
  
  -- Usage Tracking
  total_conversations INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  total_cost NUMERIC DEFAULT 0.0,
  
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(workspace_id, name)
);

-- Enable RLS
ALTER TABLE genie_deployments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their workspace deployments"
ON genie_deployments FOR ALL
USING (workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()));
```

### 5. Usage Metrics (Multi-Tenant)
```sql
CREATE TABLE deployment_usage_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES genie_deployments(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  
  -- Time Bucket
  metric_date DATE NOT NULL,
  metric_hour INTEGER, -- 0-23, NULL for daily aggregates
  
  -- Conversation Metrics
  total_conversations INTEGER DEFAULT 0,
  total_messages INTEGER DEFAULT 0,
  unique_users INTEGER DEFAULT 0,
  
  -- AI Metrics
  total_tokens INTEGER DEFAULT 0,
  total_cost NUMERIC DEFAULT 0.0,
  avg_response_time_ms INTEGER,
  
  -- Model Usage
  model_usage JSONB DEFAULT '{}'::jsonb, -- {"gpt-5": 10, "gemini-2.5-flash": 50}
  
  -- Feature Usage
  feature_usage JSONB DEFAULT '{}'::jsonb, -- {"rag": 5, "vision": 2}
  
  -- Quality Metrics
  avg_confidence_score NUMERIC,
  multi_model_requests INTEGER DEFAULT 0,
  
  -- Errors
  error_count INTEGER DEFAULT 0,
  error_details JSONB DEFAULT '[]'::jsonb,
  
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(deployment_id, metric_date, metric_hour)
);

-- Enable RLS
ALTER TABLE deployment_usage_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their workspace metrics"
ON deployment_usage_metrics FOR SELECT
USING (workspace_id IN (SELECT workspace_id FROM workspace_members WHERE user_id = auth.uid()));
```

---

## 🔌 Deployment Methods (Plug & Play)

### 1. JavaScript Embed (Public Website)
```html
<!-- Zero Config - Auto-detects domain -->
<script src="https://genie-ai.service.com/embed.js" 
        data-api-key="genie_pk_abc123xyz"></script>

<!-- With Options -->
<script src="https://genie-ai.service.com/embed.js" 
        data-api-key="genie_pk_abc123xyz"
        data-position="bottom-right"
        data-theme="auto"
        data-primary-color="#3b82f6"
        data-enable-voice="true"
        data-enable-vision="true"></script>

<!-- Advanced Configuration -->
<script>
window.GenieConfig = {
  apiKey: 'genie_pk_abc123xyz',
  position: 'bottom-right',
  features: {
    rag: true,
    multiModel: false,
    voice: true,
    vision: true
  },
  rateLimits: {
    requestsPerMinute: 5
  },
  branding: {
    primaryColor: '#3b82f6',
    logoUrl: 'https://example.com/logo.png'
  },
  onReady: () => console.log('Genie loaded'),
  onError: (error) => console.error('Genie error', error)
};
</script>
<script src="https://genie-ai.service.com/embed.js"></script>
```

### 2. React Component (Internal App)
```bash
npm install @genie-ai/react
```

```tsx
import { GenieChat, GenieProvider } from '@genie-ai/react';

function App() {
  return (
    <GenieProvider
      apiKey="genie_sk_abc123xyz" // Secret key for server-side
      workspaceId="ws_123"
      userId="user_456" // Optional for authenticated users
      features={{
        rag: true,
        multiModel: true,
        voice: true
      }}
    >
      <YourApp />
      <GenieChat />
    </GenieProvider>
  );
}
```

### 3. REST API (Any Platform)
```bash
# Create Deployment
curl -X POST https://api.genie-ai.service.com/v1/deployments \
  -H "Authorization: Bearer genie_sk_abc123xyz" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Website Chat",
    "deployment_type": "public_embed",
    "features": {
      "rag": true,
      "voice": false
    },
    "rate_limits": {
      "requests_per_day": 1000
    },
    "allowed_domains": ["example.com"]
  }'

# Chat Request (Public)
curl -X POST https://api.genie-ai.service.com/v1/chat \
  -H "X-API-Key: genie_pk_abc123xyz" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your services?",
    "session_id": "session_789",
    "context": {
      "page_url": "https://example.com/pricing"
    }
  }'

# Chat Request (Authenticated)
curl -X POST https://api.genie-ai.service.com/v1/chat \
  -H "Authorization: Bearer genie_sk_abc123xyz" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Analyze this medical image",
    "user_id": "user_456",
    "features": {
      "vision": true,
      "rag": true
    },
    "images": ["https://example.com/image.jpg"]
  }'
```

### 4. Python SDK
```bash
pip install genie-ai-sdk
```

```python
from genie_ai import GenieClient

# Initialize client
client = GenieClient(
    api_key="genie_sk_abc123xyz",
    workspace_id="ws_123"
)

# Create deployment
deployment = client.deployments.create(
    name="My App Chat",
    deployment_type="api_only",
    features={
        "rag": True,
        "multi_model": True
    }
)

# Chat
response = client.chat.send(
    message="Hello!",
    user_id="user_456",
    deployment_id=deployment.id,
    features={"rag": True}
)

print(response.content)
print(response.model_used)
print(response.tokens_used)
```

---

## 🔐 Security & Authentication Modes

### Mode 1: Public Deployment (No Auth Required)
```typescript
// Edge Function: ai-universal-processor
const deployment = await getDeploymentByApiKey(apiKey);

if (!deployment) {
  return new Response('Invalid API key', { status: 401 });
}

// Check rate limits by API key
const rateLimit = await checkRateLimit(deployment.id, 'api_key');
if (!rateLimit.allowed) {
  return new Response('Rate limit exceeded', { status: 429 });
}

// Process request with deployment features
const response = await processAIRequest({
  ...request,
  features: deployment.features,
  workspaceId: deployment.workspace_id
});
```

### Mode 2: Authenticated User
```typescript
// Edge Function: ai-universal-processor
const user = await getUser(authToken);

if (!user) {
  return new Response('Unauthorized', { status: 401 });
}

// Check workspace access
const workspace = await getUserWorkspace(user.id, workspaceId);

if (!workspace) {
  return new Response('Forbidden', { status: 403 });
}

// Check rate limits by user + workspace
const rateLimit = await checkRateLimit(user.id, 'user', workspace.id);

// Process with full features
const response = await processAIRequest({
  ...request,
  userId: user.id,
  workspaceId: workspace.id,
  features: workspace.plan_features
});
```

### Mode 3: Hybrid (API Key + Optional Auth)
```typescript
// Edge Function: ai-universal-processor
const deployment = await getDeploymentByApiKey(apiKey);

// Check if user is authenticated
const user = authToken ? await getUser(authToken) : null;

if (user) {
  // Enhanced features for authenticated users
  features = {
    ...deployment.features,
    ...workspace.premium_features
  };
  rateLimits = workspace.plan_rate_limits;
} else {
  // Basic features for anonymous users
  features = deployment.features;
  rateLimits = deployment.rate_limits;
}
```

---

## 📊 Data Isolation & RLS Patterns

### Pattern 1: Workspace-Scoped Data
```sql
-- User's conversations are scoped to their workspace
CREATE POLICY "Users can access workspace conversations"
ON agent_conversations FOR ALL
USING (
  agent_id IN (
    SELECT id FROM agents 
    WHERE workspace_id IN (
      SELECT workspace_id FROM workspace_members 
      WHERE user_id = auth.uid()
    )
  )
);
```

### Pattern 2: Public Deployment Access (No Auth)
```sql
-- Public deployments accessible via API key verification
CREATE POLICY "Public deployments accessible by API key"
ON genie_conversations FOR SELECT
USING (
  deployment_id IN (
    SELECT id FROM genie_deployments
    WHERE workspace_id = (
      SELECT workspace_id FROM deployment_api_keys
      WHERE key_hash = encode(digest(current_setting('request.headers')::json->>'x-api-key', 'sha256'), 'hex')
      AND is_active = true
      AND expires_at > now()
    )
  )
);
```

### Pattern 3: Cross-Workspace Sharing (Optional)
```sql
-- Allow deployments to be shared across workspaces
CREATE TABLE deployment_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES genie_deployments(id) ON DELETE CASCADE,
  shared_with_workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  permissions JSONB DEFAULT '{"read_only": true}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(deployment_id, shared_with_workspace_id)
);
```

---

## 🚀 Service Modularity

### Core Services (Required)
1. **AI Routing Service** - Context analysis, model selection
2. **Conversation Service** - Message handling, history
3. **Rate Limiting Service** - Multi-level limits (IP, API key, user, workspace)
4. **Analytics Service** - Usage tracking, metrics
5. **Deployment Service** - Configuration management

### Optional Services (Plugin Architecture)
1. **RAG Service** - Knowledge base search
2. **MCP Service** - External context providers
3. **Voice Service** - TTS/STT integration
4. **Vision Service** - Image analysis
5. **Label Studio Service** - Quality feedback
6. **Multi-Model Service** - Parallel processing

### Service Interface Pattern
```typescript
// Base Service Interface
interface GenieService {
  name: string;
  version: string;
  isEnabled(workspaceId: string, deploymentId: string): Promise<boolean>;
  initialize(config: ServiceConfig): Promise<void>;
  shutdown(): Promise<void>;
}

// Example: RAG Service
class RAGService implements GenieService {
  name = 'rag';
  version = '1.0.0';
  
  async isEnabled(workspaceId: string, deploymentId: string): Promise<boolean> {
    const deployment = await getDeployment(deploymentId);
    return deployment.features.context_enhancement?.rag === true;
  }
  
  async search(query: string, workspaceId: string): Promise<SearchResult[]> {
    // Multi-tenant search - only searches workspace's knowledge base
    const results = await supabase
      .from('universal_knowledge_base')
      .select('*')
      .eq('workspace_id', workspaceId)
      .eq('is_approved', true)
      .textSearch('content', query)
      .limit(5);
    
    return results.data || [];
  }
}
```

---

## 🌐 API-First Design

### REST API Endpoints

#### Deployments
```
POST   /v1/deployments                 # Create deployment
GET    /v1/deployments                 # List deployments
GET    /v1/deployments/:id             # Get deployment
PATCH  /v1/deployments/:id             # Update deployment
DELETE /v1/deployments/:id             # Delete deployment
POST   /v1/deployments/:id/regenerate-key  # Regenerate API key
```

#### Chat
```
POST   /v1/chat                        # Send message
POST   /v1/chat/stream                 # Streaming chat
GET    /v1/conversations               # List conversations
GET    /v1/conversations/:id           # Get conversation
DELETE /v1/conversations/:id           # Delete conversation
```

#### Analytics
```
GET    /v1/analytics/usage             # Usage metrics
GET    /v1/analytics/performance       # Performance metrics
GET    /v1/analytics/costs             # Cost breakdown
GET    /v1/analytics/models            # Model usage stats
```

#### Features
```
GET    /v1/features                    # Available features
POST   /v1/features/toggle             # Enable/disable feature
GET    /v1/features/usage              # Feature usage stats
```

### WebSocket API (Real-Time)
```javascript
const ws = new WebSocket('wss://api.genie-ai.service.com/v1/ws');

ws.send(JSON.stringify({
  type: 'authenticate',
  apiKey: 'genie_pk_abc123xyz'
}));

ws.send(JSON.stringify({
  type: 'chat',
  message: 'Hello!',
  sessionId: 'session_789',
  features: {
    rag: true,
    streaming: true
  }
}));

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'token') {
    console.log(data.content); // Stream tokens
  }
};
```

---

## 📦 Migration Strategy (Current App → Universal Service)

### Phase 1: Add Multi-Tenancy Layer (Week 1)
1. Create `workspaces` and `workspace_members` tables
2. Add `workspace_id` to ALL existing tables
3. Create migration script to assign default workspace to existing data
4. Update ALL RLS policies to include workspace isolation

### Phase 2: Refactor Authentication (Week 2)
1. Implement API key system (`deployment_api_keys` table)
2. Create public/private key pairs for deployments
3. Update edge functions to support both auth modes
4. Implement rate limiting by API key vs user

### Phase 3: Service Modularization (Week 3-4)
1. Extract AI routing into standalone service
2. Create plugin system for optional services
3. Implement feature toggle system
4. Build deployment configuration UI

### Phase 4: API Gateway (Week 5-6)
1. Create REST API endpoints
2. Implement WebSocket server
3. Build SDK libraries (JS, React, Python)
4. Generate embed code snippets

### Phase 5: Testing & Documentation (Week 7-8)
1. Multi-tenant isolation testing
2. Performance testing (concurrent workspaces)
3. API documentation
4. Migration guides

---

## 🎯 Success Metrics

### Technical
- ✅ Zero-config deployment in <5 minutes
- ✅ Multi-tenant data isolation (100% RLS coverage)
- ✅ Horizontal scalability (10,000+ workspaces)
- ✅ <100ms API response time (p95)
- ✅ 99.9% uptime SLA

### Business
- ✅ Deploy across 100+ customer applications
- ✅ Support 1M+ conversations/day
- ✅ $0.001 cost per conversation
- ✅ 10x faster time-to-deploy vs custom builds

---

## 📚 Related Documents
- `docs/AI_Routing_and_UX_Playbook.md` - AI routing logic
- `docs/Ops_Runbook_Genie.md` - Operations guide
- `docs/DATABASE_IMPLEMENTATION_AUDIT.md` - Current state audit
- `docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md` - Implementation plan
