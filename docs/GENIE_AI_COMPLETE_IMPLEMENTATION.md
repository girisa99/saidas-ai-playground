# Genie AI - Complete Implementation Documentation

## Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Core Components](#core-components)
3. [Services Layer](#services-layer)
4. [Database Schema](#database-schema)
5. [Edge Functions](#edge-functions)
6. [Features & Capabilities](#features--capabilities)
7. [Deployment System](#deployment-system)
8. [Configuration & Settings](#configuration--settings)
9. [Data Flow & Integration](#data-flow--integration)
10. [Security & Authentication](#security--authentication)

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer (React)                    │
├─────────────────────────────────────────────────────────────┤
│  Public Interface  │  Admin Dashboard  │  Configuration UI  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Services Layer                          │
├─────────────────────────────────────────────────────────────┤
│  Conversation  │  Analytics  │  Knowledge  │  Deployment    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Edge Functions (Backend)                   │
├─────────────────────────────────────────────────────────────┤
│  AI Processing  │  RAG  │  Rate Limiting  │  Deployment API │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (Supabase)                       │
├─────────────────────────────────────────────────────────────┤
│  Conversations  │  Knowledge Base  │  Deployments  │  Users │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                External AI Models (Lovable AI)               │
├─────────────────────────────────────────────────────────────┤
│  Gemini 2.5 Flash  │  Gemini 2.5 Pro  │  GPT-5 Models      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18.3.1
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Query (TanStack Query)
- React Router DOM

**Backend:**
- Supabase (PostgreSQL + Edge Functions)
- Deno Runtime for Edge Functions
- Row Level Security (RLS)

**AI Integration:**
- Lovable AI Gateway
- Google Gemini Models (2.5 Flash, 2.5 Pro)
- OpenAI GPT-5 Models (via gateway)

**Storage & Data:**
- PostgreSQL (via Supabase)
- Real-time subscriptions
- Vector embeddings for RAG

---

## Core Components

### 1. Public Genie Interface

**Location:** `src/components/public-genie/PublicGenieInterface.tsx`

**Purpose:** Main conversational AI interface for end users

**Key Features:**
- Multi-turn conversations
- Real-time streaming responses
- Context-aware suggestions
- Rich media support
- Rate limiting protection

**Props:**
```typescript
interface PublicGenieInterfaceProps {
  deploymentId?: string;
  initialContext?: any;
  onConversationStart?: (conversationId: string) => void;
  onConversationEnd?: () => void;
}
```

### 2. Enhanced Conversational AI

**Location:** `src/components/public-genie/EnhancedConversationalAI.tsx`

**Purpose:** Advanced AI conversation engine with multimodal support

**Features:**
- Vision model integration
- Medical image analysis
- Document processing
- Sentiment analysis
- Multi-language support

### 3. Deployment Manager

**Location:** `src/components/admin/DeploymentManager.tsx`

**Purpose:** Manage, version, and deploy Genie AI configurations

**Features:**
- Create/edit/delete deployments
- Version control
- Embed code generation
- API key management
- Rollback capability

### 4. Deployment Configuration Wizard

**Location:** `src/components/admin/DeploymentConfigurationWizard.tsx`

**Purpose:** Step-by-step deployment setup

**Steps:**
1. **RAG & Knowledge Base** - Select knowledge sources
2. **AI Model Configuration** - Choose model, set temperature/tokens
3. **MCP Servers** - Integrate external tools
4. **Review & Deploy** - Finalize and activate

### 5. Deployment Version History

**Location:** `src/components/admin/DeploymentVersionHistory.tsx`

**Purpose:** Track deployment changes and enable rollbacks

**Features:**
- Timeline view of versions
- Changelog tracking
- Performance metrics per version
- One-click rollback
- Version comparison

### 6. Deployment Tester

**Location:** `src/components/admin/DeploymentTester.tsx`

**Purpose:** Test deployments before going live

**Features:**
- Real-time chat testing
- Configuration preview
- Message history
- Error handling

### 7. Deployment Analytics

**Location:** `src/components/admin/DeploymentAnalytics.tsx`

**Purpose:** Monitor deployment performance

**Metrics:**
- Total conversations
- Token usage
- Average confidence scores
- Usage trends (30-day)
- Top performing deployments

---

## Services Layer

### 1. Conversation Service

**Location:** `src/services/genieConversationService.ts`

**Key Functions:**

```typescript
// Create new conversation
createConversation(
  agentId: string,
  sessionId: string,
  userId?: string,
  deploymentId?: string
): Promise<AgentConversation>

// Add message to conversation
addMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  metadata?: any
): Promise<void>

// Get conversation history
getConversationHistory(
  conversationId: string
): Promise<AgentConversation>

// Update conversation status
updateConversationStatus(
  conversationId: string,
  status: 'active' | 'completed' | 'abandoned'
): Promise<void>
```

### 2. Analytics Service

**Location:** `src/services/genieAnalyticsService.ts`

**Key Functions:**

```typescript
// Track conversation events
trackConversationEvent(
  conversationId: string,
  eventType: string,
  eventData: any
): Promise<void>

// Get deployment analytics
getDeploymentAnalytics(
  deploymentId: string,
  startDate?: Date,
  endDate?: Date
): Promise<AnalyticsData>

// Get user engagement metrics
getUserEngagementMetrics(
  userId?: string
): Promise<EngagementMetrics>
```

### 3. Knowledge Base Service

**Location:** `src/services/universalKnowledgeService.ts`

**Key Functions:**

```typescript
// Search knowledge base
searchKnowledgeBase(
  query: string,
  filters?: {
    category?: string;
    tags?: string[];
    status?: 'approved' | 'pending';
  }
): Promise<KnowledgeEntry[]>

// Add knowledge entry
addKnowledgeEntry(
  entry: {
    title: string;
    content: string;
    category: string;
    tags?: string[];
  }
): Promise<string>

// Get RAG context
getRAGContext(
  query: string,
  limit?: number
): Promise<KnowledgeEntry[]>
```

### 4. Deployment Service

**Location:** `src/services/deploymentService.ts`

**Key Functions:**

```typescript
// Get user deployments
getUserDeployments(
  status?: 'draft' | 'active' | 'archived'
): Promise<GenieDeployment[]>

// Create deployment
createDeployment(
  deployment: {
    name: string;
    description?: string;
    configuration: any;
    knowledge_base_snapshot?: any;
    mcp_servers_snapshot?: any;
    model_config?: any;
  }
): Promise<GenieDeployment>

// Activate deployment
activateDeployment(
  deploymentId: string
): Promise<boolean>

// Create deployment version
createDeploymentVersion(
  parentId: string,
  name: string,
  configuration: any,
  changelog?: string
): Promise<string>

// Get version history
getDeploymentVersionHistory(
  deploymentName: string
): Promise<GenieDeployment[]>

// Clone deployment
cloneDeployment(
  deploymentId: string,
  newName: string
): Promise<GenieDeployment>
```

### 5. Deployment Embed Service

**Location:** `src/services/deploymentEmbedService.ts`

**Key Functions:**

```typescript
// Generate embed code (HTML/JavaScript)
generateEmbedCode(
  deployment: GenieDeployment,
  options: EmbedOptions
): string

// Generate React component
generateReactComponent(
  deployment: GenieDeployment,
  options: EmbedOptions
): string

// Generate API documentation
generateAPIDocumentation(
  deployment: GenieDeployment
): string

// Generate API key
generateDeploymentAPIKey(
  deploymentId: string
): Promise<string>
```

### 6. Multi-Agent Service

**Location:** `src/services/multiAgentService.ts`

**Purpose:** Orchestrate multiple AI agents for complex workflows

**Key Functions:**

```typescript
// Create agent workflow
createAgentWorkflow(
  agents: AgentConfig[],
  workflow: WorkflowDefinition
): Promise<string>

// Execute workflow
executeWorkflow(
  workflowId: string,
  input: any
): Promise<WorkflowResult>
```

### 7. AI Triage Service

**Location:** `src/services/aiTriageService.ts`

**Purpose:** Route conversations to appropriate handlers based on intent

**Key Functions:**

```typescript
// Analyze user intent
analyzeIntent(
  message: string,
  context: any
): Promise<IntentAnalysis>

// Route to appropriate handler
routeConversation(
  intent: IntentAnalysis,
  conversationId: string
): Promise<RoutingDecision>
```

---

## Database Schema

### Core Tables

#### 1. `agents`
Stores agent configurations and metadata

```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  agent_type TEXT,
  configuration JSONB,
  system_prompt TEXT,
  model_provider TEXT,
  model_name TEXT,
  temperature DECIMAL,
  max_tokens INTEGER,
  status TEXT DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 2. `agent_conversations`
Stores conversation history

```sql
CREATE TABLE agent_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES agents(id),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT NOT NULL,
  deployment_id UUID REFERENCES genie_deployments(id),
  conversation_data JSONB DEFAULT '[]',
  metadata JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 3. `genie_deployments`
Stores deployment configurations and versions

```sql
CREATE TABLE genie_deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  version INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT false,
  is_enabled BOOLEAN DEFAULT true,
  api_key TEXT,
  configuration JSONB,
  knowledge_base_snapshot JSONB,
  mcp_servers_snapshot JSONB,
  model_config JSONB,
  deployment_status TEXT DEFAULT 'draft',
  deployed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,
  parent_deployment_id UUID REFERENCES genie_deployments(id),
  changelog TEXT,
  total_conversations INTEGER DEFAULT 0,
  avg_confidence_score DECIMAL,
  total_tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 4. `universal_knowledge_base`
Unified knowledge base for RAG

```sql
CREATE TABLE universal_knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  source_type TEXT,
  source_url TEXT,
  embedding VECTOR(1536),
  metadata JSONB,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id),
  citation_count INTEGER DEFAULT 0,
  last_cited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 5. `genie_conversation_analytics`
Analytics and metrics

```sql
CREATE TABLE genie_conversation_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES agent_conversations(id),
  deployment_id UUID REFERENCES genie_deployments(id),
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT,
  message_count INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  avg_response_time_ms INTEGER,
  confidence_score DECIMAL,
  satisfaction_rating INTEGER,
  feedback_text TEXT,
  knowledge_base_hits INTEGER DEFAULT 0,
  mcp_calls_count INTEGER DEFAULT 0,
  error_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 6. `genie_rate_limits`
Rate limiting for conversations

```sql
CREATE TABLE genie_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  identifier_type TEXT NOT NULL,
  conversation_count INTEGER DEFAULT 0,
  last_conversation_at TIMESTAMPTZ,
  limit_exceeded_at TIMESTAMPTZ,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### 7. `mcp_servers`
MCP server configurations

```sql
CREATE TABLE mcp_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  config JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Database Functions

#### 1. `activate_genie_deployment`
Activates a deployment and deactivates others

```sql
CREATE OR REPLACE FUNCTION activate_genie_deployment(
  p_deployment_id UUID,
  p_user_id UUID
)
RETURNS JSONB AS $$
BEGIN
  -- Deactivate all other deployments for this user
  UPDATE genie_deployments
  SET is_active = false
  WHERE user_id = p_user_id AND id != p_deployment_id;
  
  -- Activate the specified deployment
  UPDATE genie_deployments
  SET 
    is_active = true,
    deployment_status = 'active',
    deployed_at = now()
  WHERE id = p_deployment_id AND user_id = p_user_id;
  
  RETURN jsonb_build_object('success', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### 2. `create_deployment_version`
Creates a new version of a deployment

```sql
CREATE OR REPLACE FUNCTION create_deployment_version(
  p_parent_id UUID,
  p_name TEXT,
  p_configuration JSONB,
  p_changelog TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_new_id UUID;
  v_user_id UUID;
  v_new_version INTEGER;
BEGIN
  -- Get parent deployment info
  SELECT user_id, version + 1 
  INTO v_user_id, v_new_version
  FROM genie_deployments
  WHERE id = p_parent_id;
  
  -- Create new version
  INSERT INTO genie_deployments (
    user_id,
    name,
    version,
    configuration,
    parent_deployment_id,
    changelog,
    deployment_status
  ) VALUES (
    v_user_id,
    p_name,
    v_new_version,
    p_configuration,
    p_parent_id,
    p_changelog,
    'draft'
  )
  RETURNING id INTO v_new_id;
  
  RETURN v_new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Row Level Security (RLS) Policies

All tables have RLS enabled with policies like:

```sql
-- Users can view their own deployments
CREATE POLICY "Users can view own deployments"
ON genie_deployments FOR SELECT
USING (auth.uid() = user_id);

-- Users can create deployments
CREATE POLICY "Users can create deployments"
ON genie_deployments FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own deployments
CREATE POLICY "Users can update own deployments"
ON genie_deployments FOR UPDATE
USING (auth.uid() = user_id);
```

---

## Edge Functions

### 1. `ai-universal-processor`

**Location:** `supabase/functions/ai-universal-processor/index.ts`

**Purpose:** Main AI processing endpoint with RAG integration

**Features:**
- Multi-model support (Gemini, GPT-5)
- RAG knowledge retrieval
- Streaming responses
- Context management
- Error handling

**Request Format:**
```typescript
{
  messages: Array<{role: 'user' | 'assistant', content: string}>,
  deploymentId?: string,
  conversationId?: string,
  context?: any,
  modelConfig?: {
    provider: string,
    model: string,
    temperature: number,
    maxTokens: number
  }
}
```

**Response:** Server-Sent Events (SSE) stream

### 2. `deployment-chat`

**Location:** `supabase/functions/deployment-chat/index.ts`

**Purpose:** Handle chat for specific deployments

**Features:**
- Deployment-specific configuration
- API key authentication
- Rate limiting
- Analytics tracking

**Request Format:**
```typescript
{
  deploymentId: string,
  message: string,
  conversationId?: string,
  apiKey?: string
}
```

### 3. `conversation-rate-limiter`

**Location:** `supabase/functions/conversation-rate-limiter/index.ts`

**Purpose:** Rate limiting for conversations

**Features:**
- IP-based limiting
- User-based limiting
- Session-based limiting
- Configurable thresholds

**Limits:**
- Anonymous users: 10 conversations/day
- Authenticated users: 100 conversations/day
- Can be customized per deployment

### 4. `generate-knowledge-embeddings`

**Location:** `supabase/functions/generate-knowledge-embeddings/index.ts`

**Purpose:** Generate embeddings for RAG

**Features:**
- Batch processing
- Vector embedding generation
- Knowledge base indexing

### 5. `analyze-medical-image`

**Location:** `supabase/functions/analyze-medical-image/index.ts`

**Purpose:** Medical image analysis using vision models

**Features:**
- DICOM support
- Image preprocessing
- AI-powered analysis
- Report generation

---

## Features & Capabilities

### 1. Conversational AI

**Capabilities:**
- Multi-turn conversations
- Context awareness
- Intent recognition
- Sentiment analysis
- Multi-language support

**Models:**
- Default: `google/gemini-2.5-flash`
- Advanced: `google/gemini-2.5-pro`
- Alternative: `openai/gpt-5`

### 2. RAG (Retrieval Augmented Generation)

**Features:**
- Vector similarity search
- Semantic knowledge retrieval
- Source citation
- Confidence scoring
- Real-time knowledge updates

**Knowledge Sources:**
- User-uploaded documents
- Crawled websites
- Treatment center data
- Pricing information
- Product catalogs

### 3. Multi-Modal Support

**Supported Formats:**
- Text conversations
- Image analysis (medical imaging, documents)
- Video analysis (via thumbnails)
- Audio transcription
- Document processing (PDF, DOCX)

### 4. Smart Routing

**Routing Logic:**
- Intent-based routing
- Complexity assessment
- Model selection
- Fallback handling

**Example:**
```typescript
if (requiresVision) {
  model = 'google/gemini-2.5-pro';
} else if (simpleQuery) {
  model = 'google/gemini-2.5-flash-lite';
} else {
  model = 'google/gemini-2.5-flash';
}
```

### 5. Active Learning

**Location:** `src/services/activeLearningService.ts`

**Features:**
- User feedback collection
- Confidence threshold monitoring
- Model improvement suggestions
- A/B testing support

### 6. Context Switching

**Location:** `src/components/public-genie/ContextSwitcher.tsx`

**Contexts:**
- Healthcare
- Technology
- Education
- Business
- General

### 7. Topic Suggestions

**Location:** `src/components/public-genie/ContextualTopicSuggester.tsx`

**Features:**
- Context-aware suggestions
- Dynamic topic generation
- Popular topics
- Related topics

### 8. Rich Response Rendering

**Location:** `src/components/public-genie/RichResponseRenderer.tsx`

**Supported Formats:**
- Markdown
- Code blocks with syntax highlighting
- Tables
- Lists
- Links
- Images
- Treatment center cards
- Product cards
- Pricing comparisons

---

## Deployment System

### Deployment Lifecycle

```
Draft → Configuration → Testing → Active → Versioned → Archived
```

### Deployment States

1. **Draft** - Initial creation, not publicly accessible
2. **Active** - Currently serving requests
3. **Archived** - No longer serving requests, retained for history

### Deployment Configuration

**Structure:**
```typescript
interface DeploymentConfiguration {
  // AI Model Configuration
  modelConfig: {
    provider: 'google' | 'openai';
    model: string;
    temperature: number;
    maxTokens: number;
  };
  
  // Knowledge Base Snapshot
  knowledgeBaseSnapshot: {
    entries: KnowledgeEntry[];
    timestamp: string;
  };
  
  // MCP Servers
  mcpServersSnapshot: {
    servers: MCPServer[];
    configurations: Record<string, any>;
  };
  
  // System Configuration
  systemConfig: {
    systemPrompt: string;
    contextWindow: number;
    ragEnabled: boolean;
    ragTopK: number;
    streamingEnabled: boolean;
  };
  
  // Rate Limiting
  rateLimits: {
    conversationsPerDay: number;
    messagesPerConversation: number;
    tokensPerMessage: number;
  };
}
```

### Versioning Strategy

- **Semantic Versioning:** v1, v2, v3...
- **Parent-Child Relationship:** Tracks version lineage
- **Changelog:** Required for each version
- **Rollback:** One-click rollback to any previous version

### Embed Options

**1. HTML/JavaScript Embed:**
```html
<script src="https://yourdomain.com/genie-embed.js"></script>
<script>
  GenieAI.init({
    deploymentId: 'your-deployment-id',
    theme: 'auto',
    position: 'bottom-right'
  });
</script>
```

**2. React Component:**
```tsx
import { GenieChat } from '@genie-ai/react';

function App() {
  return (
    <GenieChat
      deploymentId="your-deployment-id"
      theme="auto"
    />
  );
}
```

**3. API Integration:**
```typescript
const response = await fetch('https://api.yourdomain.com/deployment-chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    deploymentId: 'your-deployment-id',
    message: 'Hello, Genie!'
  })
});
```

---

## Configuration & Settings

### Admin Dashboard

**Location:** `src/pages/AdminDashboard.tsx`

**Tabs:**
1. **Overview** - System statistics and health
2. **Deployments** - Manage deployments
3. **Testing** - Test deployments
4. **Analytics** - View metrics
5. **Knowledge Base** - Manage knowledge entries
6. **MCP Servers** - Configure integrations
7. **Settings** - System configuration

### Genie Configuration

**useGeniePreferences Hook**
**Location:** `src/hooks/useGeniePreferences.ts`

```typescript
interface GeniePreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  streamingEnabled: boolean;
  ragEnabled: boolean;
  multiModalEnabled: boolean;
  voiceEnabled: boolean;
  defaultContext: string;
}
```

### Model Configuration

**Available Models:**
```typescript
const MODELS = {
  // Gemini Models
  'google/gemini-2.5-pro': { /* ... */ },
  'google/gemini-2.5-flash': { /* ... */ },
  'google/gemini-2.5-flash-lite': { /* ... */ },
  
  // GPT Models
  'openai/gpt-5': { /* ... */ },
  'openai/gpt-5-mini': { /* ... */ },
  'openai/gpt-5-nano': { /* ... */ }
};
```

**Model Selection Logic:**
```typescript
function selectModel(requirements: ModelRequirements): string {
  if (requirements.vision) {
    return 'google/gemini-2.5-pro';
  }
  if (requirements.complexity === 'high') {
    return 'google/gemini-2.5-pro';
  }
  if (requirements.latency === 'low') {
    return 'google/gemini-2.5-flash-lite';
  }
  return 'google/gemini-2.5-flash'; // Default
}
```

---

## Data Flow & Integration

### Conversation Flow

```
User Input
    ↓
[Rate Limit Check]
    ↓
[Intent Analysis]
    ↓
[RAG Knowledge Retrieval]
    ↓
[Context Assembly]
    ↓
[AI Model Selection]
    ↓
[Lovable AI Gateway]
    ↓
[Stream Response]
    ↓
[Analytics Tracking]
    ↓
[Store Conversation]
    ↓
User Display
```

### RAG Pipeline

```
User Query
    ↓
[Query Embedding]
    ↓
[Vector Similarity Search]
    ↓
[Top-K Results (default: 5)]
    ↓
[Relevance Filtering]
    ↓
[Context Injection]
    ↓
[AI Processing with Context]
    ↓
[Response with Citations]
```

### Deployment Request Flow

```
External Request
    ↓
[API Key Validation]
    ↓
[Deployment Lookup]
    ↓
[Load Configuration]
    ↓
[Rate Limit Check]
    ↓
[Process Message]
    ↓
[Update Metrics]
    ↓
[Return Response]
```

---

## Security & Authentication

### Authentication Methods

1. **User Authentication** - Supabase Auth
2. **API Key Authentication** - For external deployments
3. **Session Management** - Temporary sessions for anonymous users

### Security Features

1. **Row Level Security (RLS)** - All database access controlled
2. **API Key Encryption** - Keys stored securely
3. **Rate Limiting** - Prevent abuse
4. **Input Validation** - Sanitize all inputs
5. **CORS Configuration** - Restrict origins
6. **Content Security Policy** - XSS protection

### RLS Policies Example

```sql
-- Only deployment owner can view analytics
CREATE POLICY "Deployment analytics access"
ON genie_conversation_analytics FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM genie_deployments
    WHERE genie_deployments.id = deployment_id
    AND genie_deployments.user_id = auth.uid()
  )
);
```

### Rate Limiting Rules

**Anonymous Users:**
- 10 conversations per day per IP
- 20 messages per conversation
- 1000 tokens per message

**Authenticated Users:**
- 100 conversations per day
- 50 messages per conversation
- 4000 tokens per message

**Custom Deployments:**
- Configurable limits per deployment
- Can be increased based on plan

---

## API Reference

### REST Endpoints

#### POST `/functions/v1/deployment-chat`
Chat with a specific deployment

**Request:**
```json
{
  "deploymentId": "uuid",
  "message": "Hello, how can you help?",
  "conversationId": "uuid (optional)",
  "apiKey": "string (optional)"
}
```

**Response:** SSE Stream
```
data: {"delta": "Hello"}
data: {"delta": "! I can"}
data: {"delta": " help you"}
data: [DONE]
```

#### POST `/functions/v1/ai-universal-processor`
Universal AI processing with RAG

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "What are your services?"}
  ],
  "deploymentId": "uuid (optional)",
  "context": {
    "category": "healthcare",
    "location": "CA"
  }
}
```

#### POST `/functions/v1/generate-knowledge-embeddings`
Generate embeddings for knowledge entries

**Request:**
```json
{
  "entries": [
    {
      "id": "uuid",
      "content": "Text to embed"
    }
  ]
}
```

---

## Performance & Optimization

### Caching Strategy

1. **Knowledge Base Cache** - Redis cache for frequently accessed entries
2. **Model Response Cache** - Cache common queries
3. **Deployment Config Cache** - Cache active deployment configurations

### Database Optimization

1. **Indexes:**
   - `idx_conversations_deployment_id`
   - `idx_knowledge_embedding` (Vector index)
   - `idx_analytics_deployment_id`

2. **Partitioning:**
   - Conversations partitioned by created_at (monthly)
   - Analytics partitioned by created_at (weekly)

### Edge Function Optimization

1. **Connection Pooling** - Reuse database connections
2. **Lazy Loading** - Load knowledge on demand
3. **Batch Processing** - Process multiple requests together
4. **Streaming** - Return tokens as they arrive

---

## Monitoring & Observability

### Metrics Tracked

1. **Conversation Metrics:**
   - Total conversations
   - Average message count
   - Completion rate

2. **Performance Metrics:**
   - Response time (p50, p95, p99)
   - Token throughput
   - Error rate

3. **Business Metrics:**
   - Active deployments
   - Daily active users
   - Token usage
   - Cost per conversation

### Error Handling

```typescript
try {
  // Process request
} catch (error) {
  if (error.status === 429) {
    return {
      error: 'Rate limit exceeded',
      retryAfter: 60
    };
  } else if (error.status === 402) {
    return {
      error: 'Insufficient credits',
      action: 'Add credits to continue'
    };
  } else {
    // Log error
    console.error('Processing error:', error);
    return {
      error: 'Internal server error',
      requestId: generateRequestId()
    };
  }
}
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Configure RAG knowledge base
- [ ] Set up AI model configuration
- [ ] Configure MCP servers (if needed)
- [ ] Test with Deployment Tester
- [ ] Review analytics setup
- [ ] Set rate limits
- [ ] Generate API keys

### Deployment

- [ ] Activate deployment
- [ ] Generate embed code
- [ ] Test external embed
- [ ] Monitor initial metrics
- [ ] Verify rate limiting
- [ ] Check error handling

### Post-Deployment

- [ ] Monitor analytics dashboard
- [ ] Track user feedback
- [ ] Review conversation logs
- [ ] Optimize based on metrics
- [ ] Create new version if needed

---

## Future Enhancements

### Planned Features

1. **Multi-Agent Orchestration** - Complex workflows with multiple agents
2. **Voice Integration** - Speech-to-text and text-to-speech
3. **Workspace Multi-Tenancy** - Team collaboration
4. **Advanced Analytics** - Deeper insights and reporting
5. **Custom Training** - Fine-tune models on specific data
6. **Webhook Integration** - Real-time event notifications
7. **A/B Testing** - Compare deployment variants
8. **Cost Optimization** - Automatic model selection based on cost
9. **Compliance Tools** - HIPAA, GDPR compliance helpers
10. **White-Label Options** - Complete customization

---

## Troubleshooting

### Common Issues

**Issue:** Deployment not responding
**Solution:** Check deployment is_enabled status, verify API key

**Issue:** RAG not returning relevant results
**Solution:** Regenerate embeddings, check knowledge base status

**Issue:** Rate limit exceeded
**Solution:** Wait for reset, or upgrade limits in deployment config

**Issue:** High token usage
**Solution:** Reduce max_tokens, optimize system prompt, use smaller model

**Issue:** Slow responses
**Solution:** Switch to faster model (gemini-2.5-flash-lite), enable caching

---

## Support & Resources

### Documentation
- [Genie AI Architecture](./GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md)
- [Database Implementation](./DATABASE_IMPLEMENTATION_AUDIT.md)
- [Operations Runbook](./Ops_Runbook_Genie.md)
- [Testing Roadmap](./TESTING_AND_IMPLEMENTATION_ROADMAP.md)

### Contact
- Technical Support: support@yourdomain.com
- Sales: sales@yourdomain.com
- Documentation: https://docs.yourdomain.com

---

**Last Updated:** 2025-01-11  
**Version:** 1.0  
**Status:** Active Production System
