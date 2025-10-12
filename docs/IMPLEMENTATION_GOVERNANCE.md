# Implementation Governance & Validation Protocol

**Version:** 1.0  
**Last Updated:** 2025-01-11  
**Status:** Root Governance Document  
**Purpose:** Single source of truth validation BEFORE any implementation

---

## 🎯 Purpose

This document serves as the **MANDATORY pre-implementation validation layer** for all Genie AI features across any application within the workspace. It ensures:

1. ✅ **No Duplicate Implementation** - Verify existing before building
2. ✅ **Documentation Alignment** - All 6 docs updated consistently
3. ✅ **Single Source of Truth** - Genie AI remains unified across deployments
4. ✅ **Smart Updates** - Modify existing vs create new when appropriate
5. ✅ **Cross-App Consistency** - Same capabilities work identically everywhere

---

## 📋 Pre-Implementation Validation Checklist

### STEP 1: Verify Current Implementation Status

**BEFORE writing ANY code, run this verification:**

```markdown
## Feature Verification Report

**Feature Name:** [e.g., "Multi-Model Comparison"]  
**Requested By:** [User/Team]  
**Date:** [YYYY-MM-DD]

### 1.1 Database Check
- [ ] Check if tables exist: Run query against production DB
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name LIKE '%[feature_keyword]%';
  ```
- [ ] Document found tables: [List or "NONE"]
- [ ] Check RLS policies: [EXISTS / MISSING]

### 1.2 Code Check
- [ ] Search codebase for related files:
  - Search: `src/services/*[feature]*`
  - Search: `src/hooks/*[feature]*`
  - Search: `src/components/*[feature]*`
  - Search: `supabase/functions/*[feature]*`
- [ ] Document found files: [List or "NONE"]
- [ ] Check if feature is partial/complete/missing: [STATUS]

### 1.3 Documentation Check
Run this query against ALL 6 canonical docs:

**Search in:**
1. ✅ `CONSOLIDATED_DOCUMENTATION_AUDIT.md` - Implementation matrix
2. ✅ `AI_Coverage_Summary.md` - Feature coverage
3. ✅ `AI_Routing_and_UX_Playbook.md` - Logic specification
4. ✅ `DATABASE_IMPLEMENTATION_AUDIT.md` - Database schema
5. ✅ `GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md` - Architecture
6. ✅ `Ops_Runbook_Genie.md` - Operations
7. ✅ `TESTING_AND_IMPLEMENTATION_ROADMAP.md` - Timeline

**Search Results:**
- [ ] Feature mentioned in docs: [YES/NO]
- [ ] Implementation status documented: [STATUS]
- [ ] Conflicting information across docs: [YES/NO - list conflicts]

### 1.4 Implementation Decision

Based on verification above:

**Decision:** [Choose ONE]
- [ ] ❌ **DO NOT IMPLEMENT** - Already exists and working
- [ ] ✏️ **UPDATE EXISTING** - Exists but needs modification
- [ ] ✅ **IMPLEMENT NEW** - Does not exist, proceed with implementation
- [ ] 🔧 **REFACTOR REQUIRED** - Exists but architecture needs redesign

**Justification:** [Explain decision based on findings above]
```

---

## 🔄 Documentation Update Protocol

### STEP 2: Update Documentation BEFORE Implementation

**MANDATORY: All 6 docs must be updated in this order:**

#### 2.1 Update CONSOLIDATED_DOCUMENTATION_AUDIT.md
```markdown
**Action:** Add feature to implementation matrix

**Location:** Section "Implementation Status by Feature Category"

**Update:**
| Category | Feature | Documented | DB Exists | Code Exists | Status |
|----------|---------|-----------|-----------|-------------|--------|
| [Category] | [Feature] | ✅ | ⏳ | ⏳ | 🚧 IN PROGRESS |

**Phase Assignment:** [Phase 1/2/3A/3B/4/5]
```

#### 2.2 Update DATABASE_IMPLEMENTATION_AUDIT.md
```markdown
**If DB changes required:**

**Action:** Add SQL schema to appropriate section

**Sections:**
- ✅ VERIFIED IMPLEMENTATION - If already exists
- ❌ NOT IMPLEMENTED - If documenting planned tables
- 🚧 IN PROGRESS - If currently implementing

**Include:**
- Full CREATE TABLE statements
- RLS policies
- Database functions
- Indexes
- Foreign key relationships
```

#### 2.3 Update AI_Coverage_Summary.md
```markdown
**Action:** Update implementation percentage

**Calculate:**
Total Features = [count all features in playbook]
Implemented = [count ✅ features]
Percentage = (Implemented / Total) * 100

**Update sections:**
- Implementation Status vs Documentation (top)
- Implementation Gaps (by phase)
- Reality Check percentage
```

#### 2.4 Update AI_Routing_and_UX_Playbook.md
```markdown
**If feature affects AI routing/UX:**

**Action:** Add/update logic specification

**Sections to update:**
- Model Categories (if new model type)
- Scenario Coverage (if new usage pattern)
- Prioritization Logic (if affects routing)
- Optimization Strategies (if performance impact)
```

#### 2.5 Update GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md
```markdown
**If feature affects architecture:**

**Action:** Update deployment/multi-tenancy design

**Sections to update:**
- Current State Assessment (if changes existing)
- Multi-Tenancy First (if affects workspace isolation)
- Deployment Configuration (if affects feature flags)
- API-First Approach (if adds new endpoints)
```

#### 2.6 Update Ops_Runbook_Genie.md
```markdown
**If feature affects operations:**

**Action:** Update monitoring/deployment procedures

**Sections to update:**
- SLA/SLO Targets (if performance impact)
- Observability and Telemetry (if adds metrics)
- Deployment Configuration (if feature toggle needed)
- Incident Playbooks (if new failure modes)
```

#### 2.7 Update TESTING_AND_IMPLEMENTATION_ROADMAP.md
```markdown
**Action:** Add to appropriate phase

**Phase Assignment:**
- Phase 1: AI Routing Intelligence (logic only)
- Phase 2: Multi-Model & Split-Screen (UI + logic)
- Phase 3A: User-Scoped Deployment (DB: user_id)
- Phase 3B: MCP & Label Studio (DB: specialized tables)
- Phase 4: Multi-Tenancy (DB: workspace_id migration)
- Phase 5: Production Hardening

**Include:**
- Database migrations (if applicable)
- Files to create/modify
- Testing checklist
- Implementation timeline
```

---

## 🚀 Implementation Execution Protocol

### STEP 3: Implement with Validation

**After docs are updated, follow this implementation order:**

#### 3.1 Database Changes (If Required)
```markdown
**Order:**
1. Create migration SQL file
2. Review against DATABASE_IMPLEMENTATION_AUDIT.md
3. Execute migration via Lovable migration tool
4. Verify tables exist: SELECT * FROM information_schema.tables
5. Test RLS policies: Attempt unauthorized access
6. Update Supabase types: Auto-generated after migration
```

#### 3.2 Backend Implementation (If Required)
```markdown
**Edge Functions:**
1. Create/update function in supabase/functions/
2. Add function to config.toml
3. Configure secrets (via Lovable secrets tool)
4. Test function via Supabase dashboard
5. Add monitoring/logging
6. Update Ops_Runbook with failure modes
```

#### 3.3 Frontend Implementation
```markdown
**Services (src/services/):**
1. Check if service exists
2. If exists: Add new methods (don't duplicate)
3. If new: Create following naming convention
4. Add TypeScript types
5. Add error handling
6. Add usage tracking

**Hooks (src/hooks/):**
1. Check if hook exists (useUniversalAI, useMultiModel, etc.)
2. If exists: Extend with new functionality
3. If new: Create with use[Feature] naming
4. Include loading/error states
5. Add React Query integration if data fetching

**Components (src/components/):**
1. Check existing components for reusability
2. Create in appropriate directory:
   - src/components/public-genie/ - Public facing
   - src/components/admin/ - Admin features
   - src/components/business-cases/ - Use case specific
3. Follow design system (use semantic tokens)
4. Add accessibility (ARIA labels, keyboard nav)
```

#### 3.4 Testing & Validation
```markdown
**Required Tests:**
1. [ ] Database: RLS policies prevent unauthorized access
2. [ ] Backend: Edge function handles errors gracefully
3. [ ] Frontend: UI renders correctly (desktop + mobile)
4. [ ] Integration: Full user flow works end-to-end
5. [ ] Performance: Meets SLA targets from Ops_Runbook
6. [ ] Security: No data leaks, proper auth checks
```

---

## 🔍 Post-Implementation Verification

### STEP 4: Verify and Update Status

**After implementation, update all docs:**

#### 4.1 Update Implementation Status
```markdown
**In CONSOLIDATED_DOCUMENTATION_AUDIT.md:**

Change status from:
| Feature | Status |
|---------|--------|
| [Feature] | ⏳ Planned |

To:
| Feature | Status |
|---------|--------|
| [Feature] | ✅ COMPLETE |

**Update percentage calculation:**
Implemented Features: [count] / [total] = [%]
```

#### 4.2 Update AI_Coverage_Summary.md
```markdown
**Move from "Not Implemented" to "Implemented":**

Before:
### ❌ Not Implemented (60%)
- Multi-Model Comparison

After:
### ✅ Implemented (45%)
- Multi-Model Comparison
```

#### 4.3 Update DATABASE_IMPLEMENTATION_AUDIT.md
```markdown
**If DB changes:**

Move from:
### ❌ NOT IMPLEMENTED
- `[table_name]` - Description

To:
### ✅ VERIFIED IMPLEMENTATION
- `[table_name]` - Description (RLS enabled)
```

#### 4.4 Document Deployment
```markdown
**In Ops_Runbook_Genie.md:**

Add to deployment log:
**[Date] - [Feature] Deployed**
- Environment: [staging/production]
- Feature flags: [enabled/disabled]
- Monitoring: [dashboard link]
- Rollback plan: [documented]
```

---

## 🛡️ Governance Rules

### Rule 1: No Implementation Without Verification
**❌ VIOLATION:** Writing code before running STEP 1 verification  
**✅ CORRECT:** Complete verification checklist, then proceed

### Rule 2: No Code Without Documentation
**❌ VIOLATION:** Implementing feature without updating all 6 docs  
**✅ CORRECT:** Update docs BEFORE writing code

### Rule 3: No Duplicate Implementation
**❌ VIOLATION:** Creating new service when existing one can be extended  
**✅ CORRECT:** Extend `useUniversalAI` instead of creating `useMultiModelAI`

### Rule 4: No Conflicting Information
**❌ VIOLATION:** Architecture doc says "Phase 3A" but Roadmap says "Phase 2"  
**✅ CORRECT:** All docs agree on phase/status/implementation

### Rule 5: No Workspace Silos
**❌ VIOLATION:** Building Genie AI differently for each application  
**✅ CORRECT:** Reuse universal services (`useUniversalAI`, `universal_knowledge_base`)

### Rule 6: Update Percentage After Every Change
**❌ VIOLATION:** Implementing 3 features without updating 40% → 55% status  
**✅ CORRECT:** Recalculate and update percentage in all summary docs

---

## 📊 Implementation Status Tracking

### Current Status (As of 2025-01-11)

**Overall Implementation:** 40%

**By Category:**
- ✅ Multi-User System: 100% (COMPLETE)
- ✅ Basic RAG: 100% (COMPLETE)
- ✅ Public Genie: 100% (COMPLETE)
- ⏳ AI Routing Intelligence: 0% (Phase 1)
- ✅ Multi-Model: 100% (Phase 2 COMPLETE 2025-01-12)
- ⏳ User-Scoped Deployments: 0% (Phase 3A)
- ⏳ MCP & Label Studio: 20% (Phase 3B - skeletons only)
- ⏳ Multi-Tenancy: 0% (Phase 4)

**Implementation Queue:**
1. **Next Up:** Phase 1 - AI Routing Intelligence (Weeks 1-2)
2. **Following:** Phase 2 - Multi-Model & Split-Screen (Weeks 2-3)
3. **Then:** Phase 3A - User-Scoped Deployments (Weeks 3-4)
4. **Then:** Phase 3B - MCP & Label Studio (Weeks 4-5)
5. **Finally:** Phase 4 - Multi-Tenancy Migration (Weeks 6-8)

---

## 🔗 Document Hierarchy

```
ROOT: IMPLEMENTATION_GOVERNANCE.md (this document)
  ↓
  ├── CONSOLIDATED_DOCUMENTATION_AUDIT.md (Master index, implementation matrix)
  │   ↓
  │   ├── AI_Coverage_Summary.md (Feature coverage %, gaps by phase)
  │   ├── AI_Routing_and_UX_Playbook.md (AI logic specification)
  │   ├── DATABASE_IMPLEMENTATION_AUDIT.md (Database schema & gaps)
  │   ├── GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md (Multi-tenant architecture)
  │   ├── Ops_Runbook_Genie.md (Operations, SLAs, monitoring)
  │   └── TESTING_AND_IMPLEMENTATION_ROADMAP.md (Phased implementation plan)
```

**Decision Flow:**
1. User/Team requests feature
2. Run verification against **IMPLEMENTATION_GOVERNANCE.md**
3. Check status in **CONSOLIDATED_DOCUMENTATION_AUDIT.md**
4. Verify details in **relevant specialized doc** (AI/DB/Architecture/Ops/Roadmap)
5. Update all docs before implementation
6. Implement following protocol
7. Update docs post-implementation

---

## 📝 Feature Request Template

**Use this template when requesting new features:**

```markdown
## Feature Request: [Feature Name]

**Requested By:** [Name/Team]  
**Date:** [YYYY-MM-DD]  
**Priority:** [Critical/High/Medium/Low]

### 1. Feature Description
[Describe what you want to build]

### 2. Verification Results (RUN STEP 1 FIRST)

**Database Check:**
- Existing tables: [List or "NONE"]
- RLS policies: [EXISTS/MISSING]

**Code Check:**
- Existing services: [List or "NONE"]
- Existing hooks: [List or "NONE"]
- Existing components: [List or "NONE"]

**Documentation Check:**
- Documented in playbook: [YES/NO]
- Implementation status: [COMPLETE/PARTIAL/MISSING]
- Phase assignment: [1/2/3A/3B/4/5]

### 3. Implementation Decision

**Decision:** [DO NOT IMPLEMENT / UPDATE EXISTING / IMPLEMENT NEW / REFACTOR]

**Justification:**
[Explain based on verification above]

### 4. Documentation Updates Required

- [ ] CONSOLIDATED_DOCUMENTATION_AUDIT.md
- [ ] AI_Coverage_Summary.md
- [ ] AI_Routing_and_UX_Playbook.md
- [ ] DATABASE_IMPLEMENTATION_AUDIT.md
- [ ] GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md
- [ ] Ops_Runbook_Genie.md
- [ ] TESTING_AND_IMPLEMENTATION_ROADMAP.md

### 5. Implementation Checklist

**Database:**
- [ ] Migration SQL written
- [ ] RLS policies defined
- [ ] Migration executed
- [ ] Types regenerated

**Backend:**
- [ ] Edge function created/updated
- [ ] Secrets configured
- [ ] Error handling added
- [ ] Monitoring added

**Frontend:**
- [ ] Service created/updated
- [ ] Hook created/updated
- [ ] Component created/updated
- [ ] Testing completed

### 6. Post-Implementation

- [ ] All docs updated with ✅ status
- [ ] Implementation percentage recalculated
- [ ] Deployment logged in Ops_Runbook
- [ ] Feature tested end-to-end
```

---

## ✅ Success Criteria

**A feature is considered "properly implemented" when:**

1. ✅ Verified against existing implementation (no duplication)
2. ✅ All 6 docs updated BEFORE coding
3. ✅ Database migration executed (if required)
4. ✅ Code follows existing patterns (extends vs creates new)
5. ✅ Tests pass (DB RLS, backend, frontend, integration)
6. ✅ All docs updated POST-implementation with ✅ status
7. ✅ Implementation percentage recalculated
8. ✅ No conflicting information across docs
9. ✅ Feature works identically across workspace/apps
10. ✅ Monitoring and rollback plan documented

---

## 🚨 Violation Response

**If implementation happens without following this protocol:**

1. **HALT DEPLOYMENT** - Do not merge/deploy
2. **RUN VERIFICATION** - Complete STEP 1 checklist
3. **UPDATE DOCS** - All 6 docs must be aligned
4. **REFACTOR CODE** - If duplicates found, consolidate
5. **RE-TEST** - Ensure no regressions
6. **UPDATE GOVERNANCE** - Document what went wrong
7. **DEPLOY** - Only after all checks pass

---

## 📞 Governance Contacts

**Primary Owner:** Development Team Lead  
**Documentation Owner:** Technical Writer  
**Architecture Review:** Solutions Architect  
**Compliance Review:** Security Team

**Before ANY implementation:**
1. Reference this document
2. Complete verification checklist
3. Update all 6 docs
4. Get approval if changes affect architecture/multi-tenancy

---

**Last Reviewed:** 2025-01-11  
**Next Review:** Every major feature implementation  
**Status:** ✅ ACTIVE - Enforce on all Genie AI implementations
