# 🛑 STOP - READ BEFORE IMPLEMENTING ANYTHING

## This File Exists to Prevent Implementation Drift

**You found this file because you're about to implement a feature.**

**MANDATORY: Run this 3-step verification (takes 30 seconds):**

---

## Step 1: Check if Feature Already Exists

### Search Codebase
```bash
# Does the service/hook/component already exist?
src/services/*[feature-name]*
src/hooks/*[feature-name]*
src/components/*[feature-name]*
supabase/functions/*[feature-name]*
```

### Check Database
```sql
-- Does the table already exist?
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%[feature_keyword]%';
```

### Search Documentation
```bash
# Is it documented?
grep -r "[feature-name]" docs/
```

---

## Step 2: Check Implementation Status

**Open:** [`docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md`](docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md)

**Look at lines 9-75 (Implementation Matrix)**

**Current Status as of 2025-01-11:**

| Category | Status | Action |
|----------|--------|--------|
| Multi-User System | ✅ 100% | Use existing, don't recreate |
| Basic RAG | ✅ 100% | Use `universal_knowledge_base` |
| Public Genie | ✅ 100% | Use existing rate limiting |
| AI Routing | ⏳ 0% | Follow Phase 1 in roadmap |
| Multi-Model | ⏳ 0% | Follow Phase 2 in roadmap |
| Deployments | ⏳ 0% | Follow Phase 3A in roadmap |
| Multi-Tenancy | ⏳ 0% | Follow Phase 4 in roadmap |

---

## Step 3: Make Decision

### If Feature EXISTS ✅
**Action:** DO NOT IMPLEMENT  
**Instead:** Use/extend existing implementation  
**Example:** Don't create `useMultiModelAI`, extend `useUniversalAI`

### If Feature PARTIAL ⚠️
**Action:** UPDATE EXISTING  
**Instead:** Add to existing service/hook/component  
**Example:** Add multi-model to `ai-universal-processor`, don't create new function

### If Feature MISSING ❌
**Action:** IMPLEMENT NEW  
**Process:**
1. Read [`docs/GOVERNANCE_QUICK_START.md`](docs/GOVERNANCE_QUICK_START.md)
2. Update ALL 7 docs (see list below)
3. Implement following existing patterns
4. Update docs with completion status

---

## Documents That MUST Be Updated (All 7)

**Before writing any code, update these in order:**

1. ✅ [`docs/IMPLEMENTATION_GOVERNANCE.md`](docs/IMPLEMENTATION_GOVERNANCE.md) - Add to tracking
2. ✅ [`docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md`](docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md) - Update matrix
3. ✅ [`docs/AI_Coverage_Summary.md`](docs/AI_Coverage_Summary.md) - Update percentage
4. ✅ [`docs/DATABASE_IMPLEMENTATION_AUDIT.md`](docs/DATABASE_IMPLEMENTATION_AUDIT.md) - Add SQL
5. ✅ [`docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md`](docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md) - Add architecture
6. ✅ [`docs/Ops_Runbook_Genie.md`](docs/Ops_Runbook_Genie.md) - Add operations
7. ✅ [`docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md`](docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md) - Assign phase

---

## Why This Matters

### Without Governance ❌
- Duplicate implementations (e.g., 3 different AI hooks)
- Conflicting database schemas
- Documentation drift (docs say 80%, reality is 40%)
- Features work differently across workspace apps
- Technical debt accumulates

### With Governance ✅
- Single source of truth (`useUniversalAI` everywhere)
- Consistent schemas (`universal_knowledge_base`)
- Accurate documentation (40% implemented, 60% planned)
- Features work identically in all apps
- Clean, maintainable codebase

---

## Quick Reference

**Governance Docs:**
- 🚀 Quick Start: [`docs/GOVERNANCE_QUICK_START.md`](docs/GOVERNANCE_QUICK_START.md)
- 📋 Full Protocol: [`docs/IMPLEMENTATION_GOVERNANCE.md`](docs/IMPLEMENTATION_GOVERNANCE.md)
- 📊 Status Matrix: [`docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md`](docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md)

**Specialized Docs:**
- 🤖 AI Logic: [`docs/AI_Routing_and_UX_Playbook.md`](docs/AI_Routing_and_UX_Playbook.md)
- 🗄️ Database: [`docs/DATABASE_IMPLEMENTATION_AUDIT.md`](docs/DATABASE_IMPLEMENTATION_AUDIT.md)
- 🏗️ Architecture: [`docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md`](docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md)
- ⚙️ Operations: [`docs/Ops_Runbook_Genie.md`](docs/Ops_Runbook_Genie.md)
- 🗓️ Roadmap: [`docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md`](docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md)

---

## Examples of Correct Behavior

### Example 1: User Asks for Multi-Model Comparison

**❌ WRONG Response:**
> "I'll create a new multi-model service and hook for you..."

**✅ CORRECT Response:**
> "Let me first verify if this exists...
> [searches codebase]
> Found: `useUniversalAI` supports multi-model via config
> Found: `ai-universal-processor` has multi-model skeleton
> Status: Phase 2 (not implemented yet)
> 
> Before implementing, I need to:
> 1. Update all 7 governance docs
> 2. Extend existing `useUniversalAI` (not create new)
> 3. Complete `ai-universal-processor` multi-model logic
> 
> Shall I proceed with updating docs first?"

### Example 2: User Asks for Deployment Management

**❌ WRONG Response:**
> "I'll create a deployments table and API key system..."

**✅ CORRECT Response:**
> "Let me verify current status...
> [checks docs]
> Status: Phase 3A - Documented but not implemented
> Found: Schema defined in GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md
> Decision: User-scoped first (Phase 3A), workspace-scoped later (Phase 4)
> 
> Before implementing, I'll:
> 1. Update governance docs
> 2. Create migration for `genie_deployments` (user-scoped)
> 3. Add RLS policies
> 4. Create deployment management UI
> 
> This aligns with Phase 3A in the roadmap. Proceed?"

---

**Last Updated:** 2025-01-11  
**Status:** ✅ ACTIVE - Check this EVERY time before coding  
**Enforcement:** Required for all Genie AI features across workspace
