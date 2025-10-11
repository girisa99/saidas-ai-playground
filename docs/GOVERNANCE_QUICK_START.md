# ⚠️ STOP - READ BEFORE IMPLEMENTING ANYTHING

## Mandatory Pre-Implementation Protocol

**Before implementing ANY feature in Genie AI (this app or any workspace app):**

### 1️⃣ READ THIS FIRST
📄 **`docs/IMPLEMENTATION_GOVERNANCE.md`** - Full governance protocol

### 2️⃣ RUN VERIFICATION (30 seconds)
```bash
# Check if feature already exists
1. Search codebase: src/**/*[feature-name]*
2. Check database: SELECT table_name FROM information_schema.tables WHERE table_name LIKE '%[feature]%';
3. Search docs: grep -r "[feature-name]" docs/
```

### 3️⃣ CHECK IMPLEMENTATION STATUS
📄 **`docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md`** - Line 9-75 (Implementation Matrix)

**Current Status (2025-01-11):**
- ✅ 40% Implemented (Multi-user, Basic RAG, Public Genie)
- ⏳ 60% Pending (Multi-tenancy, AI Routing, Deployments)

### 4️⃣ DECISION MATRIX

| Verification Result | Action |
|-------------------|--------|
| ✅ Feature exists and works | **DO NOT IMPLEMENT** - Use existing |
| ⚠️ Feature exists but incomplete | **UPDATE EXISTING** - Don't create new |
| ❌ Feature missing | **IMPLEMENT NEW** - Update docs first |

### 5️⃣ IF IMPLEMENTING NEW

**Update ALL 7 docs BEFORE coding:**
1. `IMPLEMENTATION_GOVERNANCE.md` - Add to tracking
2. `CONSOLIDATED_DOCUMENTATION_AUDIT.md` - Update matrix
3. `AI_Coverage_Summary.md` - Update percentage
4. `DATABASE_IMPLEMENTATION_AUDIT.md` - Add SQL if needed
5. `GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md` - Add architecture
6. `Ops_Runbook_Genie.md` - Add operations
7. `TESTING_AND_IMPLEMENTATION_ROADMAP.md` - Assign phase

### 6️⃣ IMPLEMENT

**Follow existing patterns:**
- Extend `useUniversalAI` (don't create new AI hooks)
- Use `universal_knowledge_base` (don't create new tables)
- Update `ai-universal-processor` (don't create new edge functions)

### 7️⃣ POST-IMPLEMENTATION

**Update docs with ✅ status and recalculate %**

---

## 🚨 Common Violations

❌ **WRONG:** "Let me create a new multi-model service"  
✅ **RIGHT:** "Let me first check if useUniversalAI supports multi-model... [searches code]"

❌ **WRONG:** "I'll add a new deployment table"  
✅ **RIGHT:** "Let me verify if genie_deployments exists... [checks DB]"

❌ **WRONG:** Implementing without updating docs  
✅ **RIGHT:** Update all 7 docs, THEN implement

---

## 📋 Quick Decision Tree

```
Feature Request Received
  ↓
Does it exist? (Search code/DB/docs)
  ↓
YES → Can we extend it?
  ↓     ↓
  ↓    YES → UPDATE existing (update docs → modify code → update status)
  ↓     ↓
  ↓    NO → REFACTOR required (document decision → plan → implement)
  ↓
NO → Is it documented?
  ↓     ↓
  ↓    YES → Which phase? (Roadmap) → Update docs → Implement
  ↓     ↓
  ↓    NO → Document first → Get approval → Update all docs → Implement
```

---

## 🔗 Quick Links

- **Full Governance:** `docs/IMPLEMENTATION_GOVERNANCE.md`
- **Status Matrix:** `docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md` (line 9-75)
- **What's Implemented:** `docs/AI_Coverage_Summary.md` (line 9-18)
- **What's Missing:** `docs/DATABASE_IMPLEMENTATION_AUDIT.md` (line 9-11)
- **Implementation Plan:** `docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md` (phases)

---

**Last Updated:** 2025-01-11  
**Status:** ✅ ACTIVE - Enforce on every feature implementation
