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

### 9. Smart Routing & Optimization

**Location:** `src/services/aiTriageService.ts`, `src/utils/modelRouter.ts`

**Purpose:** Intelligent model selection based on query complexity and requirements

**Features:**
- **Automatic Model Selection** - Analyzes query to select optimal model
- **Cost Optimization** - Uses smaller models for simple queries
- **Performance Optimization** - Routes to faster models when speed matters
- **Vision Detection** - Automatically uses vision-capable models for images

**Routing Logic:**
```typescript
interface RoutingDecision {
  model: string;
  reasoning: string;
  confidence: number;
  fallbackModel?: string;
}

// Example routing decisions:
// Simple FAQ → gemini-2.5-flash-lite (fastest, cheapest)
// Complex reasoning → gemini-2.5-pro (most capable)
// Image analysis → gemini-2.5-pro (vision support)
// Medical imaging → gemini-2.5-pro + specialized processing
```

**Optimization Badge:**
**Location:** `src/components/public-genie/RoutingOptimizationBadge.tsx`

Displays model selection reasoning to users:
- Model selected
- Reason for selection
- Confidence level
- Token usage estimate

### 10. Split-Screen Multi-Model Comparison

**Location:** `src/components/public-genie/SplitScreenRenderer.tsx`

**Purpose:** Compare responses from multiple AI models simultaneously

**Features:**
- Side-by-side comparison (2-4 models)
- Synchronized scrolling
- Performance metrics (speed, tokens, cost)
- Quality comparison
- Copy best response
- Export comparison report

**Supported Configurations:**
- Gemini Flash vs Gemini Pro
- Gemini vs GPT-5
- Multiple model variants
- Custom model combinations

**Use Cases:**
- Quality assurance
- Model evaluation
- Cost-benefit analysis
- Response benchmarking

### 11. Healthcare-Specific Features

#### Treatment Center Integration

**Location:** `src/components/public-genie/InteractiveTreatmentCenterMap.tsx`

**Features:**
- Interactive maps with Mapbox integration
- Treatment center search and filtering
- Distance calculation
- Insurance verification
- Specialization matching
- Real-time availability
- Direct contact integration

**Data Sources:**
- `treatment_centers` table
- `treatment-centers-enhanced.csv`
- Crawled treatment center data

**Treatment Center Display:**
**Location:** `src/components/public-genie/TreatmentCenterDetails.tsx`

Shows detailed center information:
- Name, address, contact
- Services offered
- Insurance accepted
- Specializations
- Ratings and reviews
- Distance from user
- Directions

#### Medical Image Analysis

**Location:** `src/components/public-genie/MedicalImageUploader.tsx`
**Service:** `src/services/medicalImageAnalysisService.ts`
**Edge Function:** `supabase/functions/analyze-medical-image/index.ts`

**Capabilities:**
- DICOM format support
- X-ray analysis
- MRI/CT scan analysis
- Ultrasound analysis
- Report generation
- Annotation support
- Comparison with previous scans

**Vision Model Integration:**
**Location:** `src/components/public-genie/VisionModelIndicator.tsx`

Indicates when vision models are active:
- Model name (gemini-2.5-pro)
- Image processing status
- Confidence level
- Analysis type

#### Product & Pricing Display

**Location:** `src/components/public-genie/ProductPricingOverview.tsx`

**Features:**
- Product catalog display
- Dynamic pricing
- Insurance coverage information
- Price comparison
- Treatment cost estimation
- Financial assistance options

**Pricing Comparison:**
**Location:** `src/components/public-genie/PricingComparisonCard.tsx`

Side-by-side pricing comparison:
- Base prices
- Insurance adjustments
- Out-of-pocket costs
- Payment plans
- Financing options

**Therapeutic Selector:**
**Location:** `src/components/public-genie/ProductTherapeuticSelector.tsx`

Category-based product selection:
- Browse by therapeutic area
- Filter by insurance
- Sort by price
- View alternatives

#### Healthcare Knowledge Base

**Location:** `src/components/public-genie/HealthcareKnowledgeBase.tsx`

Specialized healthcare knowledge:
- Treatment protocols
- Drug interactions
- Insurance policies
- Medical terminology
- Facility information
- Provider networks

### 12. Vision & Multimodal Support

**Vision Model Capabilities:**
- Image upload and analysis
- Medical image interpretation
- Document OCR
- Chart/graph reading
- Handwriting recognition
- Visual question answering

**Supported Image Types:**
- DICOM (medical imaging)
- JPEG, PNG, WebP
- PDF documents
- Scanned documents
- Screenshots

**Image Processing Pipeline:**
```
Upload → Validation → Preprocessing → Model Selection → Analysis → Report
```

### 13. Context Switching

**Location:** `src/components/public-genie/ContextSwitcher.tsx`

**Available Contexts:**

1. **Healthcare Context**
   - Medical terminology
   - Treatment center focus
   - Insurance information
   - Clinical protocols

2. **Technology Context**
   - Technical documentation
   - API references
   - Code examples
   - System architecture

3. **Education Context**
   - Learning resources
   - Course information
   - Certification programs
   - Academic support

4. **Business Context**
   - ROI calculations
   - Business metrics
   - Market analysis
   - Strategic planning

5. **General Context**
   - Broad knowledge base
   - Common questions
   - General assistance

**Context Effects:**
- Changes system prompt
- Adjusts knowledge base filters
- Modifies topic suggestions
- Alters response style

### 14. Topic Suggestions & Contextual Help

**Location:** `src/components/public-genie/ContextualTopicSuggester.tsx`

**Features:**
- Context-aware suggestions
- Popular topics
- Related questions
- Quick actions
- Topic history
- Trending topics

**Suggestion Types:**
- Follow-up questions
- Related topics
- Common workflows
- Quick links
- Helpful resources

**Topic Popover:**
**Location:** `src/components/public-genie/TopicSuggestionPopover.tsx`

Inline topic suggestions while typing:
- Auto-complete
- Suggested queries
- Historical queries
- Popular queries

### 15. RAG (Retrieval Augmented Generation) System

**RAG Knowledge Panel:**
**Location:** `src/components/public-genie/RAGKnowledgePanel.tsx`

**Features:**
- Shows retrieved knowledge sources
- Relevance scores
- Source citations
- Confidence indicators
- Knowledge base health metrics

**Source Citations:**
**Location:** `src/components/public-genie/SourceCitations.tsx`

**Display Format:**
- Source title
- Excerpt
- Relevance score
- Last updated
- Link to full source

**Knowledge Base Service:**
**Location:** `src/services/universalKnowledgeService.ts`

**Capabilities:**
- Vector similarity search
- Semantic retrieval
- Multi-source aggregation
- Real-time updates
- Citation tracking

**RAG Configuration:**
```typescript
interface RAGConfig {
  enabled: boolean;
  topK: number; // Number of sources to retrieve (default: 5)
  minSimilarity: number; // Minimum similarity threshold (0-1)
  includeCategories: string[];
  excludeCategories: string[];
  maxContextLength: number; // Max tokens from RAG
}
```

### 16. AI Intelligence Panel

**Location:** `src/components/public-genie/AIIntelligencePanel.tsx`

**Purpose:** Show AI's reasoning and decision-making process

**Displayed Information:**
- Model selected and why
- Confidence level
- Knowledge sources used
- Processing steps
- Token usage
- Response time
- Cost estimation

**Benefits:**
- Transparency
- Trust building
- Quality assurance
- Debugging support

### 17. AI Recommendations Panel

**Location:** `src/components/public-genie/AIRecommendationsPanel.tsx`

**Purpose:** Proactive suggestions based on conversation context

**Recommendation Types:**

1. **Next Steps**
   - Suggested actions
   - Related resources
   - Follow-up questions

2. **Resources**
   - Documentation links
   - Video tutorials
   - Knowledge articles

3. **Contacts**
   - Treatment centers
   - Support contacts
   - Specialists

4. **Tools**
   - Calculators
   - Forms
   - Assessment tools

### 18. Human Escalation

**Location:** `src/components/public-genie/HumanEscalationForm.tsx`

**Trigger Conditions:**
- Low confidence responses
- Unresolved queries after N turns
- Explicit user request
- Complex medical questions
- Emergency situations

**Escalation Form:**
- Contact information
- Issue summary
- Conversation context
- Urgency level
- Preferred contact method

**Escalation Workflow:**
```
Low Confidence → Suggest Escalation → User Confirms → Form → Ticket Created → Human Notified
```

### 19. Conversation Management

**Session Manager:**
**Location:** `src/components/public-genie/SessionManager.tsx`

**Features:**
- Session persistence
- Auto-save conversations
- Resume conversations
- Export conversation history
- Share conversations
- Delete conversations

**Conversation Limits:**
**Location:** `src/components/public-genie/ConversationLimitModal.tsx`

**Limit Types:**
- Anonymous user limits
- Authenticated user limits
- Rate limiting
- Token limits
- Message limits

**Limit Display:**
- Current usage
- Limit thresholds
- Reset timers
- Upgrade options

### 20. Privacy & Public Features

**Public Privacy Banner:**
**Location:** `src/components/public-genie/PublicPrivacyBanner.tsx`

**Information:**
- Data collection practices
- Privacy policy link
- Cookie usage
- Terms of service
- User rights

**How to Use Guide:**
**Location:** `src/components/public-genie/HowToUseGuide.tsx`

**Content:**
- Getting started
- Basic features
- Advanced features
- Tips and tricks
- Keyboard shortcuts
- FAQ

**Multi-Model Guide:**
**Location:** `src/components/public-genie/MultiModelGuide.tsx`

**Explains:**
- Available models
- Model strengths
- When to use each
- Cost comparison
- Performance comparison

### 21. Journey & Workflow Mapping

**Visual Journey Map:**
**Location:** `src/components/public-genie/VisualJourneyMap.tsx`

**Purpose:** Guide users through complex workflows

**Features:**
- Step-by-step visualization
- Progress tracking
- Interactive stages
- Decision points
- Completion status

**Use Cases:**
- Treatment enrollment
- Insurance verification
- Facility selection
- Care planning

### 22. Launch Readiness

**Launch Readiness Report:**
**Location:** `src/components/public-genie/LaunchReadinessReport.tsx`

**Checks:**
- Knowledge base completeness
- Model configuration
- Rate limits set
- Analytics configured
- Error handling tested
- Performance benchmarks met

**Readiness Score:**
- Knowledge coverage: 0-100%
- Configuration completeness: 0-100%
- Testing coverage: 0-100%
- Overall readiness: 0-100%

### 23. Advanced AI Settings

**Location:** `src/components/public-genie/AdvancedAISettings.tsx`

**Configurable Parameters:**

**Model Settings:**
- Temperature (0.0 - 2.0)
- Max tokens (100 - 32000)
- Top P (0.0 - 1.0)
- Frequency penalty
- Presence penalty

**RAG Settings:**
- Enable/disable RAG
- Number of sources (1-10)
- Minimum similarity
- Knowledge base filters

**Response Settings:**
- Streaming enable/disable
- Response format
- Citation style
- Language preference

**Safety Settings:**
- Content filtering
- PII detection
- Medical disclaimer
- Legal disclaimer

### 24. Contact Center Optimization

**Location:** `src/components/public-genie/ContactCenterOptimizer.tsx`

**Purpose:** Reduce support load through intelligent deflection

**Features:**
- Intent detection
- Auto-resolution suggestions
- Knowledge base search
- FAQ matching
- Ticket creation (when needed)

**Metrics Tracked:**
- Deflection rate
- Resolution rate
- Escalation rate
- Time saved
- Cost savings

### 25. Experimentation & A/B Testing

**Experimentation Banner:**
**Location:** `src/components/public-genie/ExperimentationBanner.tsx`

**Features:**
- Variant testing
- Model comparison
- Feature flags
- Gradual rollout
- Performance tracking

**A/B Test Types:**
- Model variants
- System prompt variants
- UI variations
- Feature toggles

### 26. Message Feedback

**Location:** `src/components/enrollment-genie/MessageFeedback.tsx`

**Feedback Types:**
- Thumbs up/down
- Star rating (1-5)
- Text feedback
- Issue reporting

**Feedback Data Collected:**
- Helpful/not helpful
- Accuracy rating
- Response quality
- Speed satisfaction
- Overall experience

**Feedback Usage:**
- Model improvement
- Knowledge base updates
- Feature prioritization
- Quality metrics

---

## Language Model (LLM) Configuration

### Supported LLM Providers

#### 1. Google Gemini (Primary)

**Models Available:**

**gemini-2.5-pro:**
- **Purpose:** Complex reasoning, multimodal tasks
- **Context Window:** 1M tokens
- **Strengths:** Vision, reasoning, large context
- **Best For:** Medical imaging, complex queries, detailed analysis
- **Cost:** Highest
- **Latency:** Moderate

**gemini-2.5-flash:**
- **Purpose:** Balanced performance (DEFAULT MODEL)
- **Context Window:** 1M tokens
- **Strengths:** Speed, cost, versatility
- **Best For:** General conversations, RAG queries
- **Cost:** Medium
- **Latency:** Low

**gemini-2.5-flash-lite:**
- **Purpose:** High-speed, low-cost
- **Context Window:** 1M tokens
- **Strengths:** Speed, cost-efficiency
- **Best For:** Simple queries, classification, FAQs
- **Cost:** Lowest
- **Latency:** Minimal

**gemini-2.5-flash-image:**
- **Purpose:** Image generation
- **Capabilities:** Text-to-image
- **Best For:** Creating visuals, diagrams, illustrations

**gemini-3-pro-preview:**
- **Purpose:** Next-generation (preview)
- **Features:** Enhanced capabilities
- **Status:** Early access

#### 2. OpenAI GPT (via Gateway)

**Models Available:**

**gpt-5:**
- **Purpose:** Premium reasoning
- **Context Window:** 128K tokens
- **Strengths:** Nuanced understanding, accuracy
- **Best For:** Critical decisions, high-stakes queries
- **Cost:** Highest
- **Latency:** Higher

**gpt-5-mini:**
- **Purpose:** Balanced OpenAI option
- **Context Window:** 128K tokens
- **Strengths:** Good performance, reasonable cost
- **Best For:** When OpenAI specific features needed
- **Cost:** Medium-high
- **Latency:** Moderate

**gpt-5-nano:**
- **Purpose:** Fast OpenAI option
- **Context Window:** 128K tokens
- **Strengths:** Speed, cost
- **Best For:** High-volume simple tasks
- **Cost:** Medium
- **Latency:** Low

### Model Selection Strategy

**Automatic Selection Algorithm:**

```typescript
function selectOptimalModel(query: Query): ModelSelection {
  // Vision required?
  if (query.hasImages) {
    return {
      model: 'google/gemini-2.5-pro',
      reason: 'Vision capabilities required'
    };
  }
  
  // Complexity assessment
  const complexity = assessComplexity(query);
  
  if (complexity === 'high') {
    return {
      model: 'google/gemini-2.5-pro',
      reason: 'Complex reasoning required'
    };
  }
  
  if (complexity === 'low') {
    return {
      model: 'google/gemini-2.5-flash-lite',
      reason: 'Simple query - optimize for speed and cost'
    };
  }
  
  // Default balanced option
  return {
    model: 'google/gemini-2.5-flash',
    reason: 'Balanced performance for general query'
  };
}
```

**Complexity Factors:**
- Query length
- Technical terms
- Medical terminology
- Multiple questions
- Contextual references
- Required reasoning depth

### Small Language Model (SLM) Support

**Purpose:** Efficient processing for specific use cases

**Gemini Flash Lite as SLM:**
- Optimized for simple tasks
- Classification
- Sentiment analysis
- Intent detection
- Quick FAQs
- Simple translations

**Benefits:**
- 10x faster responses
- 5x lower cost
- Sufficient for 60% of queries
- Better user experience

**Use Cases:**
- "What are your hours?"
- "Where are you located?"
- "Do you accept insurance?"
- Simple yes/no questions
- Basic navigation

### Model Configuration per Deployment

**Deployment-Level Settings:**

```typescript
interface ModelConfig {
  // Primary model
  defaultModel: string;
  
  // Fallback chain
  fallbackModels: string[];
  
  // Model-specific settings
  modelSettings: {
    [model: string]: {
      temperature: number;
      maxTokens: number;
      topP: number;
      frequencyPenalty: number;
      presencePenalty: number;
    };
  };
  
  // Routing rules
  routingRules: {
    vision: string; // Model for image queries
    complex: string; // Model for complex queries
    simple: string; // Model for simple queries
  };
  
  // Cost optimization
  costOptimization: {
    enabled: boolean;
    preferCheaperModels: boolean;
    maxCostPerQuery: number;
  };
}
```

### LLM API Integration

**Lovable AI Gateway:**
- Endpoint: `https://ai.gateway.lovable.dev/v1/chat/completions`
- Authentication: `LOVABLE_API_KEY` (auto-provisioned)
- Protocol: OpenAI-compatible API
- Streaming: Server-Sent Events (SSE)

**Request Format:**
```typescript
{
  model: "google/gemini-2.5-flash",
  messages: [
    { role: "system", content: "System prompt" },
    { role: "user", content: "User query" }
  ],
  temperature: 0.7,
  max_tokens: 2000,
  stream: true
}
```

**Response Format (Streaming):**
```
data: {"choices":[{"delta":{"content":"Hello"}}]}
data: {"choices":[{"delta":{"content":" there"}}]}
data: {"choices":[{"delta":{"content":"!"}}]}
data: [DONE]
```

### Token Management

**Token Tracking:**
- Input tokens counted
- Output tokens counted
- Total per conversation
- Total per deployment
- Cost calculation

**Token Optimization:**
- Compress system prompts
- Limit context window
- Truncate old messages
- Summarize long conversations
- Cache common responses

### Error Handling & Fallbacks

**Error Types:**

1. **Rate Limit (429)**
   - Wait and retry
   - Switch to alternate model
   - Queue request

2. **Payment Required (402)**
   - Notify user
   - Suggest credit addition
   - Graceful degradation

3. **Model Unavailable (503)**
   - Fallback to alternate model
   - Retry with backoff
   - Error message to user

4. **Context Too Long (400)**
   - Truncate conversation
   - Summarize history
   - Switch to larger context model

**Fallback Chain Example:**
```
gemini-2.5-pro (primary)
  ↓ (if unavailable)
gemini-2.5-flash
  ↓ (if unavailable)
gpt-5-mini
  ↓ (if unavailable)
Error message + human escalation
```

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

## Additional Components & Utilities

### Products and Centers Hub

**Location:** `src/components/public-genie/ProductsAndCentersHub.tsx`

**Purpose:** Unified interface for products and treatment centers

**Features:**
- Tabbed interface (Products | Centers)
- Search and filter
- Category navigation
- Distance-based sorting
- Insurance filtering
- Quick actions

**Integration:**
- Seamlessly embedded in conversations
- Context-aware recommendations
- Direct booking/contact options

### Product-Centered Flow

**Location:** `src/components/public-genie/ProductCenteredFlow.tsx`

**Purpose:** Guide users through product selection journey

**Steps:**
1. **Need Assessment** - Understand requirements
2. **Product Discovery** - Show relevant products
3. **Comparison** - Side-by-side comparison
4. **Insurance Check** - Coverage verification
5. **Purchase/Enrollment** - Complete transaction

### Knowledge-Powered FAQ

**Location:** `src/components/public-genie/KnowledgePoweredFAQ.tsx`

**Features:**
- Dynamic FAQ generation from knowledge base
- Search functionality
- Category-based organization
- Auto-expanding answers
- Related questions
- Citation sources

**FAQ Categories:**
- Getting Started
- Services & Products
- Insurance & Billing
- Locations & Hours
- Clinical Information
- Technical Support

### Conversation Utilities

**Location:** `src/components/public-genie/ConversationUtils.tsx`

**Utility Functions:**

```typescript
// Message formatting
formatMessage(message: Message): FormattedMessage

// Conversation summary
summarizeConversation(messages: Message[]): Summary

// Export conversations
exportConversation(conversationId: string, format: 'json' | 'pdf' | 'txt'): File

// Search conversations
searchConversations(query: string, filters: SearchFilters): Conversation[]

// Conversation analytics
analyzeConversation(conversationId: string): ConversationAnalytics
```

### Configuration Wizard Advanced Features

**Location:** `src/components/public-genie/ConfigurationWizard.tsx`

**Step 1: RAG & Knowledge Base**
- Knowledge source selection
- Upload documents
- Crawl websites
- Import from databases
- CSV/JSON import
- Embedding generation
- Vector index creation

**Step 2: AI Model Configuration**
- Provider selection (Google/OpenAI)
- Model selection with comparison
- Temperature slider with preview
- Max tokens configuration
- Advanced parameters (Top P, penalties)
- Cost estimation per query
- Performance preview

**Step 3: MCP Server Integration**
- Available servers list
- Server configuration
- Authentication setup
- Endpoint configuration
- Test connection
- Scope settings

**Step 4: System Behavior**
- System prompt editor with templates
- Response style (formal/casual/technical)
- Safety settings
- Content filtering
- PII handling
- Disclaimer configuration

**Step 5: User Experience**
- Theme customization
- Welcome message
- Suggested prompts
- Conversation limits
- Rate limiting rules
- Escalation settings

**Step 6: Review & Deploy**
- Configuration preview
- Validation checks
- Cost estimates
- Performance predictions
- Deployment options (draft/active)
- Generate embed codes

### Typing Indicator

**Location:** `src/components/enrollment-genie/TypingIndicator.tsx`

**Features:**
- Animated dots
- "Genie is thinking..." message
- Processing status
- Model indication (when using specific model)
- Estimated time remaining

### Conversation Message Component

**Location:** `src/components/enrollment-genie/ConversationMessage.tsx`

**Message Types:**
- User messages
- Assistant messages
- System messages
- Error messages
- Information messages

**Message Features:**
- Markdown rendering
- Code syntax highlighting
- Copy to clipboard
- Edit message
- Regenerate response
- Feedback buttons
- Timestamp
- Token count
- Confidence indicator

### Technology Knowledge Base

**Location:** `src/components/public-genie/TechnologyKnowledgeBase.tsx`

**Technical Documentation:**
- API documentation
- SDK references
- Integration guides
- Code examples
- Troubleshooting
- Best practices

**Categories:**
- Getting Started
- API Reference
- SDKs & Libraries
- Integrations
- Deployment
- Security
- Performance

### Pricing Display

**Location:** `src/components/public-genie/PricingDisplay.tsx`

**Display Modes:**
- Simple list view
- Comparison table
- Card grid
- Detailed breakdown

**Pricing Components:**
- Base price
- Insurance coverage
- Out-of-pocket estimate
- Payment plans
- Financial assistance
- Total cost calculator

### Treatment Center Map Component

**Location:** `src/components/public-genie/TreatmentCenterMap.tsx`

**Map Features:**
- Interactive Mapbox GL map
- Cluster markers
- Individual center markers
- Distance circles
- Routing/directions
- Street view integration
- Real-time updates

**Map Controls:**
- Zoom in/out
- Geolocation
- Search by address
- Filter by services
- Sort by distance
- Show/hide clusters

**Map Data:**
- Center locations (lat/lng)
- Service indicators
- Availability status
- Rating indicators
- Distance labels

### Examples & Templates

**Location:** `src/components/examples/UniversalKnowledgeExamples.tsx`

**Example Categories:**

1. **Healthcare Examples:**
   - Treatment inquiry
   - Insurance verification
   - Appointment scheduling
   - Medical records request
   - Prescription refills

2. **Product Examples:**
   - Product search
   - Price comparison
   - Feature questions
   - Availability check
   - Order status

3. **Technical Examples:**
   - API integration
   - Troubleshooting
   - Configuration help
   - Error resolution
   - Best practices

4. **Business Examples:**
   - ROI calculation
   - Cost analysis
   - Market research
   - Competitive analysis
   - Strategic planning

### Conversation State Management

**Hook:** `src/hooks/useConversationState.ts`

**State Management:**
```typescript
interface ConversationState {
  messages: Message[];
  isLoading: boolean;
  error: Error | null;
  conversationId: string;
  metadata: ConversationMetadata;
  context: ConversationContext;
}

// Actions
const {
  sendMessage,
  regenerateResponse,
  editMessage,
  clearConversation,
  loadConversation,
  exportConversation
} = useConversationState();
```

### Universal AI Hook

**Hook:** `src/hooks/useUniversalAI.ts`

**Purpose:** Unified interface for all AI interactions

**Features:**
```typescript
const {
  // Send message
  sendMessage,
  
  // Streaming state
  isStreaming,
  currentResponse,
  
  // Configuration
  setModel,
  setTemperature,
  setMaxTokens,
  
  // RAG
  enableRAG,
  setRAGSources,
  
  // Context
  addContext,
  clearContext,
  
  // Error handling
  error,
  retry
} = useUniversalAI(config);
```

### Universal Knowledge Topics

**Hook:** `src/hooks/useUniversalKnowledgeTopics.ts`

**Purpose:** Manage knowledge base topics dynamically

**Features:**
```typescript
const {
  topics,
  loadTopics,
  searchTopics,
  getPopularTopics,
  getRelatedTopics,
  topicsByCategory
} = useUniversalKnowledgeTopics();
```

### Visitor Tracking

**Hook:** `src/hooks/useVisitorTracking.ts`

**Purpose:** Track anonymous and authenticated visitors

**Tracked Events:**
- Page views
- Conversation starts
- Message sends
- Feature usage
- Time on page
- Exit points

**Privacy Compliant:**
- No PII collection
- Respects DNT
- GDPR compliant
- Cookie consent

### AB Test Milestones

**Hook:** `src/hooks/useABTestMilestones.ts`

**Purpose:** Track experiment variants and outcomes

**Features:**
- Variant assignment
- Event tracking
- Conversion tracking
- Statistical significance
- Export results

---

## Healthcare-Specific Implementation Details

### Treatment Center Data Pipeline

**Data Sources:**
1. **CSV Import** - `treatment-centers-enhanced.csv`
2. **Web Crawling** - Automated center discovery
3. **Manual Entry** - Admin dashboard input
4. **API Integration** - Third-party provider data

**Data Structure:**
```typescript
interface TreatmentCenter {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  services: string[];
  specializations: string[];
  insurance: string[];
  ratings: {
    overall: number;
    cleanliness: number;
    staff: number;
    effectiveness: number;
  };
  availability: {
    beds_available: number;
    accepting_patients: boolean;
    waiting_list: boolean;
  };
  metadata: {
    verified: boolean;
    last_updated: string;
    source: string;
  };
}
```

**Treatment Center Service:**

**Location:** `src/services/treatmentCenterService.ts`

Key functions for treatment center operations including location-based search, service filtering, insurance verification, and availability checking.

**Treatment Center Crawler:**

**Component:** `src/components/admin/TreatmentCenterCrawler.tsx`
**Edge Function:** `supabase/functions/crawl-treatment-centers/index.ts`

Automatically discovers and indexes treatment centers from various sources.

### Medical Image Analysis System

**Supported Modalities:**
- X-Ray, CT Scan, MRI, Ultrasound
- Mammography, PET Scan
- DICOM format support

**Analysis Service:**

**Location:** `src/services/medicalImageAnalysisService.ts`

Provides medical image analysis using vision-capable AI models (Gemini 2.5 Pro).

**DICOM Parser:**

**Utility:** `src/utils/dicomParser.ts`

Handles DICOM medical imaging format parsing and conversion.

### Product Pricing System

**Pricing Service:**

**Location:** `src/services/productPricingService.ts`

Manages product pricing, insurance adjustments, and payment plan calculations.

**Pricing Components:**
- Base pricing
- Insurance coverage calculation
- Out-of-pocket estimation
- Payment plan generation
- Financial assistance matching

**Pricing Data Sync:**

**Component:** `src/components/admin/PricingKnowledgeSyncButton.tsx`
**Edge Function:** `supabase/functions/sync-pricing-to-knowledge/index.ts`

Syncs pricing information to knowledge base for RAG-powered queries.

### Insurance Verification

Comprehensive insurance verification system that:
- Verifies coverage status
- Calculates cost estimates
- Checks pre-authorization requirements
- Generates verification reports

### Healthcare Knowledge Base

**Knowledge Categories:**
- Clinical Information
- Insurance & Billing
- Facility Information
- Patient Resources

**Population:**

**Edge Function:** `supabase/functions/populate-healthcare-knowledge/index.ts`

Automatically populates healthcare-specific knowledge from trusted sources.

### Healthcare Compliance

**HIPAA Compliance:**
- No PHI storage in conversations
- Encrypted transmission
- Audit logging
- Access controls

**Medical Disclaimer:**
Always displayed to inform users that AI provides general information only, not medical advice.

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
