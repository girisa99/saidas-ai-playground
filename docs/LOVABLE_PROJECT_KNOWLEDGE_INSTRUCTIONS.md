# ADD THIS TO LOVABLE PROJECT KNOWLEDGE

## How to Add (Step-by-Step)

1. **Click** your project name (top left) 
2. **Select** "Settings"
3. **Click** "Manage Knowledge" tab
4. **Click** "Add Custom Instructions" button
5. **Copy** the text below (between the lines)
6. **Paste** into the custom instructions field
7. **Click** "Save"

---

## COPY THIS TEXT (START) ↓

```markdown
# Genie AI Implementation Governance Protocol

## 🛑 MANDATORY: Check Before ANY Implementation

**BEFORE implementing, modifying, or creating ANY feature:**

### Step 1: Verification (ALWAYS DO THIS FIRST)
1. Search codebase: `src/**/*[feature-name]*`
2. Check database: Look for tables related to feature
3. Search docs: Check if feature documented
4. Read: `docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md` (lines 9-75)

### Step 2: Status Check
**Current Implementation Status (2025-01-11):**
- ✅ Multi-User System: 100% COMPLETE
- ✅ Basic RAG: 100% COMPLETE (keyword search)
- ✅ Public Genie: 100% COMPLETE (rate limiting, analytics)
- ❌ AI Routing Intelligence: 0% (Phase 1 - Weeks 1-2)
- ❌ Multi-Model Comparison: 0% (Phase 2 - Weeks 2-3)
- ❌ User-Scoped Deployments: 0% (Phase 3A - Weeks 3-4)
- ❌ MCP & Label Studio: 20% skeleton only (Phase 3B - Weeks 4-5)
- ❌ Multi-Tenancy: 0% (Phase 4 - Weeks 6-8)

**Overall: 40% Implemented | 60% Pending**

### Step 3: Decision Rules

| If Feature... | Then... |
|--------------|---------|
| EXISTS and works | ❌ DO NOT IMPLEMENT - Reuse existing code |
| EXISTS but incomplete | ✏️ UPDATE EXISTING - Don't create duplicate |
| DOCUMENTED but missing | ✅ IMPLEMENT - Update all 7 docs first |
| NOT DOCUMENTED | 📝 DOCUMENT FIRST - Get approval, then implement |

### Step 4: ALWAYS Use Existing Patterns

**✅ CORRECT (Extend existing):**
- Use `useUniversalAI` hook (in `src/hooks/useUniversalAI.ts`)
- Use `universal_knowledge_base` table (already exists)
- Use `ai-universal-processor` edge function (in `supabase/functions/`)
- Use `genieConversationService` (in `src/services/`)
- Use `genieAnalyticsService` (in `src/services/`)

**❌ WRONG (Create duplicates):**
- Don't create `useMultiModelAI` (extend `useUniversalAI` instead)
- Don't create `multi_model_knowledge` table (use existing)
- Don't create `multi-model-processor` function (extend existing)
- Don't create `multiModelService` (extend existing services)

### Step 5: Documentation Update Protocol

**BEFORE writing ANY code, update ALL 7 docs:**

1. `docs/IMPLEMENTATION_GOVERNANCE.md` - Add to feature tracking
2. `docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md` - Update implementation matrix (lines 9-75)
3. `docs/AI_Coverage_Summary.md` - Update implementation percentage
4. `docs/DATABASE_IMPLEMENTATION_AUDIT.md` - Add SQL schema if DB changes
5. `docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md` - Add architecture details
6. `docs/Ops_Runbook_Genie.md` - Add operations/monitoring
7. `docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md` - Assign to phase (1/2/3A/3B/4/5)

### Step 6: Response Template

**When user requests a feature, ALWAYS respond like this:**

"Let me first verify if this already exists...

[Search codebase for existing implementation]
[Check database for related tables]
[Search documentation for feature status]

Findings:
- Codebase: [FOUND: list files | NOT FOUND]
- Database: [FOUND: list tables | NOT FOUND]
- Documentation: [Phase X, Y% implemented | Not documented]

Decision: [REUSE existing | UPDATE existing | IMPLEMENT new]

Justification: [Explain based on findings]

Before implementing, I need to:
1. Update all 7 governance docs (or explain which existing code to use)
2. [List specific changes needed]

Shall I proceed?"

**NEVER skip verification. NEVER create duplicates. ALWAYS check docs first.**

### Step 7: Database Changes Protocol

**If feature requires new database tables:**

1. Show user the SQL schema FIRST
2. Ask: "Should this extend existing table or create new?"
3. Check if table exists: `SELECT table_name FROM information_schema.tables WHERE table_name = '[name]'`
4. Include RLS policies in schema
5. Use migration tool (NEVER edit schema.sql manually)
6. Update `docs/DATABASE_IMPLEMENTATION_AUDIT.md` with new schema

**Example - Checking for existing:**
```typescript
// Before creating genie_deployments table:
// 1. Search: "Does genie_deployments already exist?"
// 2. Check docs: "Is it in DATABASE_IMPLEMENTATION_AUDIT.md?"
// 3. If missing: "Phase 3A - user-scoped version first (no workspace_id)"
```

### Step 8: Multi-Tenancy Rules

**Current State:** User-scoped (no workspace isolation)
**Future State:** Workspace-scoped (Phase 4)

**NEVER implement workspace features yet:**
- No `workspace_id` columns (Phase 4 only)
- No `workspaces` table (Phase 4 only)
- No `workspace_members` table (Phase 4 only)

**Instead, use current user-scoped pattern:**
- `agents.created_by` for user isolation
- `agent_conversations.user_id` for user data
- RLS: `WHERE auth.uid() = created_by`

### Step 9: Post-Implementation Updates

**After implementation, update docs with:**
- ✅ Change status from ⏳ to ✅
- Recalculate percentage: (implemented / total) * 100
- Update matrix in `CONSOLIDATED_DOCUMENTATION_AUDIT.md`
- Log deployment in `Ops_Runbook_Genie.md`

### Step 10: Workspace Consistency

**Genie AI must work identically across ALL apps in workspace:**
- Same `useUniversalAI` implementation
- Same `universal_knowledge_base` schema  
- Same `ai-universal-processor` edge function
- Same RLS policies
- Same feature behavior

**NEVER create app-specific Genie implementations.**

## Quick Reference Docs

**Governance:**
- Quick Start: `docs/GOVERNANCE_QUICK_START.md`
- Full Protocol: `docs/IMPLEMENTATION_GOVERNANCE.md`
- Root Warning: `BEFORE_YOU_CODE.md`

**Status & Planning:**
- Implementation Matrix: `docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md` (lines 9-75)
- Feature Coverage: `docs/AI_Coverage_Summary.md`
- Roadmap: `docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md`

**Technical Specs:**
- AI Logic: `docs/AI_Routing_and_UX_Playbook.md`
- Database Schema: `docs/DATABASE_IMPLEMENTATION_AUDIT.md`
- Architecture: `docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md`
- Operations: `docs/Ops_Runbook_Genie.md`

## Common Scenarios

### Scenario 1: User asks "Add multi-model comparison"
**Response:**
"Let me verify if this exists...
Found: `useUniversalAI` has multi-model config option
Found: `ai-universal-processor` has multi-model skeleton (incomplete)
Status: Phase 2, documented but 0% implemented
Decision: IMPLEMENT by completing existing skeleton

Before implementing:
1. Update all 7 docs (multi-model → Phase 2)
2. Complete `ai-universal-processor` multi-model logic
3. Add split-screen UI component
4. Extend `useUniversalAI` config

Proceed with doc updates first?"

### Scenario 2: User asks "Create deployment manager"
**Response:**
"Let me verify...
Checked: No `genie_deployments` table exists
Found: Schema documented in `GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md`
Status: Phase 3A (user-scoped), Phase 4 (workspace-scoped)
Decision: IMPLEMENT Phase 3A version (user-scoped first)

Before implementing:
1. Update all 7 docs
2. Create `genie_deployments` table (WITHOUT workspace_id)
3. Add RLS: `WHERE auth.uid() = user_id`
4. Create deployment manager UI

Note: Phase 4 will add workspace_id later.
Proceed?"

### Scenario 3: User asks "Build new AI chat"
**Response:**
"Let me verify...
Found: `useUniversalAI` hook already exists
Found: `ai-universal-processor` edge function exists
Found: `genieConversationService` handles chat lifecycle
Status: 100% implemented (Basic AI complete)
Decision: REUSE existing - do not create new

I'll show you how to use the existing AI chat system:
[Show example using useUniversalAI]

No new implementation needed!"

## Violation Response

**If I try to implement without verification:**
User should respond: "Stop. Follow governance protocol from BEFORE_YOU_CODE.md"

**If I try to create duplicate:**
User should respond: "Check if this exists first. Don't create duplicates."

**If I skip doc updates:**
User should respond: "Update all 7 docs before implementing."

## Success Criteria

**Governance working correctly when:**
✅ I always search before implementing
✅ I always check documentation status
✅ I always propose REUSE/UPDATE/IMPLEMENT decision
✅ I always update docs before coding
✅ I never create duplicate services/hooks/tables
✅ I follow existing patterns
✅ Features work identically across workspace

---

**Last Updated:** 2025-01-11
**Status:** ACTIVE - Enforce on EVERY conversation
**Enforcement Level:** MANDATORY - Refuse to implement if protocol not followed
```

## COPY THIS TEXT (END) ↑

---

## What This Will Do

**Lovable AI will now AUTOMATICALLY:**

1. ✅ **Always verify first** - Search codebase/DB/docs before implementing
2. ✅ **Never create duplicates** - Extend existing instead of creating new
3. ✅ **Always update docs** - All 7 docs before writing code
4. ✅ **Follow existing patterns** - Use `useUniversalAI`, `universal_knowledge_base`, etc.
5. ✅ **Check implementation status** - Know what's 40% done vs 60% pending
6. ✅ **Maintain consistency** - Same behavior across workspace apps
7. ✅ **Refuse violations** - Won't implement if governance skipped

**Example Interaction After Adding:**

```
You: "Add multi-model AI comparison"

AI: "Let me first verify if this exists...

[Searches codebase]
Found: useUniversalAI in src/hooks/useUniversalAI.ts
Found: ai-universal-processor in supabase/functions/

[Checks docs]
Status: Phase 2, documented but 0% implemented
Current: 40% overall implementation

Decision: IMPLEMENT by extending existing (not creating new)

Before implementing, I need to:
1. Update all 7 governance docs
2. Complete ai-universal-processor multi-model logic
3. Add split-screen comparison UI
4. Extend useUniversalAI hook

Shall I proceed with updating docs first?"
```

**Without this knowledge, AI might do:**
```
You: "Add multi-model AI comparison"

AI: "I'll create a new multi-model service for you..."
[Creates duplicate implementation without checking]
```

---

## Verification

**Test if it's working:**

After adding to Project Knowledge, start new conversation:

```
You: "Create a new AI chat service"

Expected Response:
"Let me verify if this exists...
[searches]
Found: useUniversalAI already exists
Decision: REUSE existing, don't create new
[Shows how to use existing]"

Wrong Response:
"I'll create a new service..."
[If this happens, knowledge not added correctly]
```

---

## Important Notes

1. **This is persistent** - AI will remember across ALL conversations
2. **Works in all workspace apps** - If you clone/remix, add to each app
3. **Can be updated** - Edit custom instructions anytime
4. **Most important enforcement** - Better than README or files
5. **Update when status changes** - When features implemented, update the 40% percentage

---

**Action Required:** Add this to Project Knowledge NOW for immediate enforcement
