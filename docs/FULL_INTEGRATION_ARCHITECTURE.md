# Full Integration Architecture: Treatment Centers, Pricing & Journey Tracking

## Overview
This document explains how treatment centers, pricing data, and customer journey tracking are fully integrated across default, single, and multi-agent AI modes.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER CONVERSATION                           │
│  (via PublicGenieInterface - works in all AI modes)             │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│               AI-UNIVERSAL-PROCESSOR                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 1. TRIAGE QUERY                                           │  │
│  │    - Detect: map, pricing, journey stage                  │  │
│  │    - Extract: therapeutic area, product, manufacturer     │  │
│  │    - Classify: complexity, domain, urgency                │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 2. SEARCH KNOWLEDGE BASE (RAG)                            │  │
│  │    - Treatment centers (from treatment_centers table)     │  │
│  │    - Pricing data (from universal_knowledge_base)         │  │
│  │    - Journey phases (from synced CSV data)                │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 3. TRACK JOURNEY PROGRESS                                 │  │
│  │    Stages: awareness → evaluation → center_selection →   │  │
│  │            pricing → enrollment → preparation →           │  │
│  │            treatment → monitoring                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 4. ROUTE TO AI MODE                                       │  │
│  │    ├─ Default: Single model (gemini-2.5-flash)           │  │
│  │    ├─ Single: User-selected model                        │  │
│  │    └─ Multi-Agent: Sequential or Ensemble                │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 5. GENERATE RESPONSE WITH CONTEXT                         │  │
│  │    - Journey stage awareness                              │  │
│  │    - Pricing data citations                               │  │
│  │    - Treatment center details                             │  │
│  │    - Next step recommendations                            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND RENDERING                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ InteractiveTreatmentCenterMap                             │  │
│  │  - Filters: therapeutic area, manufacturer, product       │  │
│  │  - Clustering for 313 centers                             │  │
│  │  - Auto-shown when best_format = 'map'                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ TreatmentCenterDetails                                    │  │
│  │  - Center information                                     │  │
│  │  - Related product pricing (matched by product name)      │  │
│  │  - Journey timeline visualization                         │  │
│  │  - Insurance coverage details                             │  │
│  │  - Patient assistance programs                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ AI Response                                                │  │
│  │  - Journey-aware recommendations                          │  │
│  │  - Pricing insights with citations                        │  │
│  │  - Next steps based on current stage                      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Treatment Center Discovery

**User Query:** "Where can I get CAR-T therapy in California?"

```typescript
// AI Processor detects map intent
triageData.best_format = 'map'
triageData.therapeutic_area = 'CAR-T'
triageData.state = 'CA'

// Returns metadata for frontend
response = {
  content: "I found several CAR-T treatment centers in California...",
  showTreatmentMap: true,
  centerType: 'gene_therapy',
  state: 'CA',
  therapeuticArea: 'CAR-T'
}

// Frontend renders InteractiveTreatmentCenterMap
// - Filters automatically applied
// - Centers clustered on map
// - User clicks center → TreatmentCenterDetails opens
```

### 2. Pricing Integration

**When center selected:**
```typescript
// TreatmentCenterDetails.tsx loads pricing
const relatedPricing = await parseProductPricingCSV();
const matched = allPricing.filter(pricing => 
  center.products_drugs?.some(drug => 
    pricing.product_name.toLowerCase().includes(drug.toLowerCase())
  )
);

// Displays:
// - WAC / Government / Commercial prices
// - PAP and Copay assistance
// - Journey phases (pre-infusion → manufacturing → infusion → post-infusion)
// - Insurance requirements
```

**AI Pricing Awareness:**
```typescript
// After running sync-pricing-to-knowledge edge function
// AI can answer: "What's the cost of Kymriah?"

searchKnowledgeBase("kymriah cost") 
  → Returns: WAC: $475,000, Government: $356,250, PAP: Yes

// AI Response:
"Kymriah (tisagenlecleucel) pricing:
- WAC Price: $475,000
- Government (340B) Price: $356,250 (25% discount)
- Patient Assistance Program: Available
Timeline: 29-41 days from enrollment to treatment"
```

### 3. Journey Progression

**Stage Detection:**
```typescript
const stages = {
  awareness: ['learn', 'what is', 'explain'],
  evaluation: ['compare', 'options', 'which is best'],
  center_selection: ['where', 'find', 'near me'],
  pricing: ['cost', 'insurance', 'afford'],
  enrollment: ['enroll', 'qualify', 'start'],
  preparation: ['prepare', 'requirements'],
  treatment: ['during', 'procedure'],
  monitoring: ['after', 'side effects']
};

// Example progression:
1. "What is CAR-T therapy?" → awareness
2. "Compare Kymriah vs Yescarta" → evaluation  
3. "Where can I get it?" → center_selection (MAP SHOWN)
4. "How much does it cost?" → pricing (PRICING DATA SHOWN)
5. "How do I enroll?" → enrollment
```

**AI Adapts Response:**
```typescript
if (journeyStage === 'awareness') {
  // Educational, empathetic tone
  "CAR-T therapy is a personalized cancer treatment..."
}
else if (journeyStage === 'pricing') {
  // Financial focus, show assistance programs
  "Pricing varies by insurance. Patient assistance programs can help..."
}
else if (journeyStage === 'enrollment') {
  // Action-oriented, next steps
  "To enroll, contact the treatment center. Requirements include..."
}
```

## AI Mode Compatibility

### Default Mode (Single Model)
```typescript
// Uses google/gemini-2.5-flash
// Full integration works:
✅ Journey tracking
✅ Pricing knowledge
✅ Map display
✅ RAG citations
```

### Single Mode (User-Selected Model)
```typescript
// User chooses model (e.g., gemini-2.5-pro, gpt-5)
// Full integration works:
✅ Journey tracking
✅ Pricing knowledge
✅ Map display
✅ RAG citations
```

### Multi-Agent Mode
```typescript
// Sequential chain or Ensemble voting
// Full integration works:
✅ Journey tracking (maintained across agents)
✅ Pricing knowledge (all agents access same KB)
✅ Map display (synthesizer includes map metadata)
✅ RAG citations (shared context)

// Example Sequential:
Specialist Agent → Medical analysis with pricing
  ↓
Generalist Agent → Patient-friendly response + journey guidance
  ↓
Final Response → Includes map, pricing, next steps
```

## Data Pipeline

### Setup (Admin Dashboard)

1. **Import Treatment Centers**
   - Upload CSV with 500+ centers
   - Background geocoding
   - Stored in `treatment_centers` table

2. **Sync Pricing to Knowledge Base**
   - Click "Sync Pricing Data" button
   - Runs `sync-pricing-to-knowledge` edge function
   - Imports into `universal_knowledge_base` table
   - Domain: `pricing_journey`
   - Content includes: WAC, Government, Commercial prices, PAP, journey phases

3. **Configure Mapbox Token** (optional)
   - Admin sets token for centralized management
   - Falls back to user's localStorage token

### Runtime (User Interaction)

```
User Query
  ↓
Triage (detect intent)
  ↓
Search Knowledge Base (RAG)
  ↓
Track Journey Stage
  ↓
Generate Response (AI model)
  ↓
Return Metadata (map, pricing, journey)
  ↓
Frontend Renders:
  - Map (if showTreatmentMap)
  - Pricing (in center details)
  - Journey guidance (in AI response)
```

## Key Features

### 1. Intelligent Filtering
```typescript
// User: "Find Kymriah treatment centers in Texas"
// Auto-filters map:
filter = {
  product: 'Kymriah',
  state: 'TX',
  therapeuticArea: 'CAR-T Cell Therapy'
}
```

### 2. Pricing Transparency
```typescript
// Shows all pricing models:
- WAC: $475,000
- Government (340B): $356,250 (25% discount)
- Commercial: $475,000
- PAP: Yes (income-qualified)
- Copay Assistance: Yes
```

### 3. Journey Awareness
```typescript
// AI adjusts tone and recommendations:
if (stage === 'awareness') {
  tone = 'educational';
  include = ['what it is', 'how it works', 'benefits'];
}
if (stage === 'pricing') {
  tone = 'transparent';
  include = ['all costs', 'insurance', 'assistance'];
}
if (stage === 'enrollment') {
  tone = 'actionable';
  include = ['requirements', 'steps', 'timeline'];
}
```

### 4. Contextual Citations
```typescript
// AI response includes sources:
"Based on the 2025 pricing data from our knowledge base:
- Kymriah WAC: $475,000
- Manufacturing time: 22 days
- Patient Assistance Program: Available

[Citation: Kymriah - Complete Pricing & Journey from universal_knowledge_base]"
```

## Testing the Integration

### Test 1: Map Display
```
Query: "Where can I get gene therapy?"
Expected:
✅ showTreatmentMap = true
✅ InteractiveTreatmentCenterMap renders
✅ Filters show therapeutic areas, manufacturers, products
✅ Clustering handles 313 centers
```

### Test 2: Pricing Awareness
```
Query: "How much does Yescarta cost with Medicare?"
Expected:
✅ AI searches pricing knowledge base
✅ Returns: WAC $373,000, Medicare coverage details
✅ Mentions PAP and copay assistance
✅ Includes timeline (17-24 days)
```

### Test 3: Journey Progression
```
Conversation:
1. "What is CAR-T?" → awareness stage
2. "Compare products" → evaluation stage
3. "Find centers near me" → center_selection stage (MAP SHOWN)
4. "How much?" → pricing stage (PRICING SHOWN)
5. "How do I start?" → enrollment stage (NEXT STEPS)

Expected:
✅ AI recognizes stage transitions
✅ Adapts tone and content
✅ Shows relevant UI (map, pricing)
✅ Provides stage-appropriate guidance
```

### Test 4: Multi-Agent Consistency
```
Enable Multi-Agent Mode (Sequential)
Query: "Find Kymriah centers in NY with pricing"

Expected:
✅ Specialist analyzes medical aspects
✅ Generalist creates patient-friendly response
✅ Both agents access same pricing KB
✅ Final response includes map + pricing
✅ Journey stage maintained across agents
```

## Admin Workflows

### Initial Setup
1. Go to Admin Dashboard → Settings
2. Click "Import 500+ Treatment Centers"
3. Click "Sync Pricing Data" (syncs CSV → knowledge base)
4. (Optional) Set Mapbox token for centralized management

### Ongoing Maintenance
- Treatment centers update: Re-import CSV
- Pricing updates: Re-sync pricing data
- Knowledge base: Auto-updated from conversations

## Database Schema

### Treatment Centers
```sql
treatment_centers (
  id, name, center_type, address, city, state, zip_code,
  latitude, longitude, phone, website, email,
  therapeutic_areas[], products_drugs[], manufacturers[],
  key_providers[], clinical_trials, capacity_info,
  nci_designated, fact_accredited
)
```

### Pricing Knowledge Base
```sql
universal_knowledge_base (
  id, finding_name, description, clinical_significance,
  domain: 'pricing_journey',
  content_type: 'pricing',
  metadata: {
    product_name, manufacturer, therapeutic_area,
    wac_price, government_price, commercial_price,
    pap_available, copay_assistance, days_to_treatment
  }
)
```

### Journey Tracking (Conversation-level)
```sql
agent_conversations (
  id, user_id, agent_id, conversation_data,
  journey_context: {
    stages[], current_stage, progress{},
    initialized_at, journey_started_at
  },
  current_journey_stage_id
)
```

## Future Enhancements

1. **Real-time Pricing Updates**
   - Webhook from pricing service → auto-sync

2. **Journey Analytics**
   - Track stage progression rates
   - Identify drop-off points
   - Optimize guidance

3. **Personalized Recommendations**
   - Based on insurance type
   - Geographic proximity
   - Treatment urgency

4. **Multi-Tenancy (Phase 4)**
   - Workspace-scoped centers
   - Custom pricing tiers
   - Branded journey flows

## Conclusion

**The full integration is now complete:**
- ✅ Treatment center map with intelligent filtering
- ✅ Pricing data synced to AI knowledge base
- ✅ Journey stage tracking and progression
- ✅ Works in all AI modes (default, single, multi-agent)
- ✅ Contextual UI rendering (map, pricing details)
- ✅ RAG-powered citations and recommendations

**Users get:**
- Treatment center discovery with filters
- Transparent pricing information
- Journey-aware guidance
- Consistent experience across all AI modes
