# Welcome to your Lovable project

---

## ⚠️ IMPLEMENTATION GOVERNANCE - READ FIRST

**BEFORE implementing ANY feature:**

🛑 **STOP & VERIFY:** Read [`docs/GOVERNANCE_QUICK_START.md`](docs/GOVERNANCE_QUICK_START.md) (30 seconds)

**Why?** Prevents duplicate implementations, ensures documentation sync, maintains single source of truth across workspace.

**Quick Checklist:**
1. ✅ Search codebase/DB for existing implementation
2. ✅ Check [`docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md`](docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md) for status (line 9-75)
3. ✅ Update ALL 7 docs BEFORE coding
4. ✅ Implement following existing patterns
5. ✅ Update docs with completion status

**Full Protocol:** [`docs/IMPLEMENTATION_GOVERNANCE.md`](docs/IMPLEMENTATION_GOVERNANCE.md)

---

## Project info

**URL**: https://lovable.dev/projects/7639c023-ce3f-4ad9-b37a-c5f3428488da

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/7639c023-ce3f-4ad9-b37a-c5f3428488da) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7639c023-ce3f-4ad9-b37a-c5f3428488da) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 📚 Documentation Architecture

### Governance & Implementation (START HERE)
- **🛑 Quick Start:** [docs/GOVERNANCE_QUICK_START.md](docs/GOVERNANCE_QUICK_START.md) - Read before ANY implementation
- **🔐 Full Governance:** [docs/IMPLEMENTATION_GOVERNANCE.md](docs/IMPLEMENTATION_GOVERNANCE.md) - Complete validation protocol
- **📊 Status Matrix:** [docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md](docs/CONSOLIDATED_DOCUMENTATION_AUDIT.md) - Master index (40% implemented)

### Specialized Documentation
- **🤖 AI Routing Logic:** [docs/AI_Routing_and_UX_Playbook.md](docs/AI_Routing_and_UX_Playbook.md) - Model selection rules
- **📈 Implementation Status:** [docs/AI_Coverage_Summary.md](docs/AI_Coverage_Summary.md) - Feature coverage %
- **🗄️ Database Schema:** [docs/DATABASE_IMPLEMENTATION_AUDIT.md](docs/DATABASE_IMPLEMENTATION_AUDIT.md) - Tables, RLS, gaps
- **🏗️ Architecture Design:** [docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md](docs/GENIE_UNIVERSAL_SERVICE_ARCHITECTURE.md) - Multi-tenant design
- **⚙️ Operations:** [docs/Ops_Runbook_Genie.md](docs/Ops_Runbook_Genie.md) - SLAs, monitoring, incidents
- **🗓️ Roadmap:** [docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md](docs/TESTING_AND_IMPLEMENTATION_ROADMAP.md) - 5-phase plan (8-9 weeks)

### Document Update Protocol
**When implementing features, update docs in this order:**
1. Run verification via `GOVERNANCE_QUICK_START.md`
2. Update all 7 docs BEFORE coding
3. Implement following governance protocol
4. Update docs with ✅ completion status

### Legacy Documentation
- Archived source documents: [docs/archived/](docs/archived/)
- Old unified docs (deprecated): `Unified_AI_Implementation_and_UX_Flow.md`, `Operations_Runbook_Current_vs_Future.md`

**⚠️ Always reference governance docs to avoid duplicate/conflicting implementations**

