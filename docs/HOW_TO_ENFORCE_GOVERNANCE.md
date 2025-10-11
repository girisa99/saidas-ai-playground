# How to Enforce Implementation Governance in Lovable

## Problem
How do we ensure Lovable AI ALWAYS checks governance docs before implementing features?

## Solution: Multi-Layer Enforcement

We've created **5 enforcement mechanisms** that work together:

---

## 1️⃣ Visible Root File (Immediate)

**File:** `BEFORE_YOU_CODE.md` (project root)

**Why it works:**
- Placed at project root (highly visible)
- Clear 🛑 STOP warning at top
- Shows up when browsing project files
- Contains 30-second quick checklist

**Usage:**
When Lovable AI or developer starts work, they'll see this file immediately.

---

## 2️⃣ README.md Integration (Always Read)

**File:** `README.md` (updated)

**Why it works:**
- README is the first file AI/developers read
- Added governance section at TOP (lines 3-23)
- Links to all governance docs
- Clear warning before project info

**Usage:**
Lovable AI reads README when starting new conversation or reviewing project.

---

## 3️⃣ Lovable Project Knowledge (Persistent)

**How to Add (You MUST do this manually):**

1. Click **Project Settings** (top left)
2. Go to **Manage Knowledge**
3. Click **Add Custom Instructions**
4. Copy/paste this:

```markdown
# Genie AI Implementation Governance

BEFORE implementing ANY feature:

1. ✅ Read docs/GOVERNANCE_QUICK_START.md
2. ✅ Search codebase/DB for existing implementation
3. ✅ Check docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md (lines 9-75)
4. ✅ Decision: REUSE existing / UPDATE existing / IMPLEMENT new
5. ✅ Update ALL 7 docs BEFORE coding
6. ✅ Implement following existing patterns
7. ✅ Update docs with completion status

EXISTING PATTERNS (ALWAYS USE):
- useUniversalAI hook (don't create new AI hooks)
- universal_knowledge_base table (don't create new)
- ai-universal-processor function (don't create new)

CURRENT STATUS (2025-01-11):
- ✅ 40% Implemented (Multi-user, RAG, Public Genie)
- ⏳ 60% Pending (Multi-tenancy, AI Routing, Deployments)

VIOLATION RESPONSE:
- Refuse to implement until governance protocol followed
- Always ask: "Let me first verify if this exists..."

GOVERNANCE DOCS:
- Quick Start: docs/GOVERNANCE_QUICK_START.md
- Full Protocol: docs/IMPLEMENTATION_GOVERNANCE.md
- Status Matrix: docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md
```

5. Click **Save**

**Why it works:**
- Lovable AI sees this on EVERY conversation
- Persistent across all workspace apps
- Always enforced, never forgotten

---

## 4️⃣ Pull Request Template (GitHub)

**File:** `.github/PULL_REQUEST_TEMPLATE.md` (created)

**Why it works:**
- Forces governance checklist on every PR
- Reviewer must verify compliance
- Prevents merging non-compliant code
- Works for team collaboration

**Usage:**
When creating PR on GitHub, template auto-fills with governance checklist.

---

## 5️⃣ Documentation Cross-References (Network Effect)

**All docs now link to governance:**

- `README.md` → Points to governance at top
- `BEFORE_YOU_CODE.md` → Quick checklist
- `GOVERNANCE_QUICK_START.md` → 30-second version
- `IMPLEMENTATION_GOVERNANCE.md` → Full protocol
- `CONSOLIDATED_DOCUMENTATION_AUDIT.md` → Master index
- All 6 specialized docs → Cross-reference each other

**Why it works:**
- No matter which doc you open, governance is visible
- Creates reinforcement through repetition
- Hard to miss the pattern

---

## Enforcement Workflow

### For Lovable AI (When User Requests Feature)

**Expected Behavior:**

```
User: "Add multi-model comparison"

AI: "Let me first verify if this already exists...

[Searches codebase]
Found: useUniversalAI (can be extended)
Found: ai-universal-processor (has skeleton)

[Checks docs]
Status: Phase 2, documented but not implemented (0%)

Decision: IMPLEMENT NEW by extending existing

Before implementing, I need to:
1. Update all 7 governance docs
2. Extend useUniversalAI (not create new hook)
3. Complete ai-universal-processor multi-model logic

Shall I proceed with updating docs first?"
```

**If AI tries to skip governance:**

User should respond:
> "Stop. Read BEFORE_YOU_CODE.md and follow the governance protocol."

---

### For Developers (Manual Code Edits)

**Expected Workflow:**

1. Developer opens project
2. Sees `BEFORE_YOU_CODE.md` in root
3. Reads 30-second checklist
4. Searches for existing implementation
5. Checks status in `CONSOLIDATED_DOCUMENTATION_AUDIT.md`
6. Updates all 7 docs
7. Implements following patterns
8. Creates PR with governance checklist
9. Reviewer verifies compliance

---

## How to Train Lovable AI on Governance

### Method 1: First Message (Every Session)

When starting new conversation:
```
Before we start, please read:
1. BEFORE_YOU_CODE.md
2. docs/GOVERNANCE_QUICK_START.md
3. docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md (lines 9-75)

Always verify existing implementation before creating new.
Always update all 7 docs before coding.
```

### Method 2: Use Project Knowledge (RECOMMENDED)

**See Section 3 above** - Add custom instructions to project knowledge.

This is the BEST method because:
- Persists across all conversations
- Works in all workspace apps
- AI sees it automatically
- No need to remind every time

### Method 3: Reference in Every Request

When requesting features:
```
Following governance protocol (BEFORE_YOU_CODE.md):
1. First verify if [feature] exists
2. Check implementation status
3. Update all docs
4. Then implement

Can you do this for [feature]?
```

---

## Verification: Is Governance Working?

**Test the AI:**

```
User: "Create a new AI chat service"

✅ CORRECT AI Response:
"Let me first check if an AI service already exists...
[searches]
Found: useUniversalAI hook in src/hooks/
Found: ai-universal-processor edge function
Status: Already implemented (40%)
Decision: REUSE existing, don't create new

Should I show you how to use the existing service instead?"

❌ WRONG AI Response:
"I'll create a new AI service for you..."
[proceeds without checking]
```

**If AI skips governance:**
1. Stop the AI: "Read BEFORE_YOU_CODE.md first"
2. Verify project knowledge is added (Section 3)
3. Remind: "Always verify existing before implementing"

---

## Maintenance

**Update these when governance changes:**

1. `BEFORE_YOU_CODE.md` - Quick reference
2. `README.md` - Top section
3. **Project Knowledge** - Custom instructions (most important!)
4. `.github/PULL_REQUEST_TEMPLATE.md` - PR checklist

**Update implementation % when features completed:**

1. Count total features in playbook
2. Count implemented features
3. Calculate: (implemented / total) * 100
4. Update in all docs:
   - `CONSOLIDATED_DOCUMENTATION_AUDIT.md` (line 9)
   - `AI_Coverage_Summary.md` (line 7)
   - `BEFORE_YOU_CODE.md` (status table)
   - Project Knowledge (custom instructions)

---

## For Multi-App Workspace

**If deploying Genie AI to multiple apps in same workspace:**

### Setup Each App
1. Copy these files to each app:
   - `BEFORE_YOU_CODE.md`
   - All `docs/` governance files
   - `.github/PULL_REQUEST_TEMPLATE.md`

2. Update each app's README.md with governance section

3. **Add SAME project knowledge to each app:**
   - Project Settings → Manage Knowledge
   - Add identical custom instructions
   - Ensures consistency across workspace

### Shared Documentation
- Consider hosting governance docs in ONE app
- Other apps link to canonical source
- Or duplicate docs to each app (safer)

### Cross-App Consistency Rules
- SAME `useUniversalAI` implementation everywhere
- SAME `universal_knowledge_base` schema everywhere
- SAME `ai-universal-processor` edge function everywhere
- SAME RLS policies everywhere
- SAME feature flags everywhere

**Never allow app-specific Genie implementations** - always use universal patterns.

---

## Troubleshooting

### Problem: AI ignores governance docs

**Solutions:**
1. ✅ Add to Project Knowledge (Section 3) - **MOST IMPORTANT**
2. ✅ Start conversation with "Read BEFORE_YOU_CODE.md first"
3. ✅ Reference governance in every request
4. ✅ Stop AI when it skips: "Follow governance protocol"

### Problem: Documentation gets out of sync

**Solutions:**
1. ✅ Use pull request template (enforces doc updates)
2. ✅ Update all 7 docs in SAME commit/PR
3. ✅ Review CONSOLIDATED_DOCUMENTATION_AUDIT.md after each feature
4. ✅ Recalculate implementation % regularly

### Problem: Team members skip governance

**Solutions:**
1. ✅ PR template forces checklist completion
2. ✅ Reviewer must verify compliance
3. ✅ Add pre-commit hook (optional):
```bash
# .git/hooks/pre-commit
#!/bin/bash
echo "Reminder: Update all 7 governance docs!"
echo "See BEFORE_YOU_CODE.md"
```

---

## Success Metrics

**Governance is working when:**

✅ **AI always verifies before implementing**
- Searches codebase first
- Checks documentation
- Proposes reuse/update/implement decision

✅ **No duplicate implementations**
- Only one `useUniversalAI` (not multiple AI hooks)
- Only one `universal_knowledge_base` (not per-domain tables)
- Only one `ai-universal-processor` (not per-feature functions)

✅ **Documentation stays aligned**
- All 7 docs show same implementation status
- No conflicting information
- Implementation % accurate

✅ **Features work identically across apps**
- Same behavior in app A and app B
- Same database schema
- Same API contracts

---

## Quick Start Checklist

**To enforce governance TODAY:**

- [ ] Add custom instructions to Project Knowledge (Section 3) ⭐ **MOST IMPORTANT**
- [ ] Verify `BEFORE_YOU_CODE.md` exists in project root
- [ ] Verify `README.md` has governance section at top
- [ ] Verify `.github/PULL_REQUEST_TEMPLATE.md` exists
- [ ] Test AI by requesting a feature (see "Verification" section)
- [ ] If multi-app workspace, repeat for each app

**Time to set up:** ~5 minutes  
**Benefit:** Permanent governance enforcement

---

**Last Updated:** 2025-01-11  
**Status:** ✅ Ready for deployment  
**Next Action:** Add custom instructions to Project Knowledge (Section 3)
