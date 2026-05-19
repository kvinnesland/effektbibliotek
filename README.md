# Claude Project Template

A governed AI-native project template for Claude Code.

## What This Is

A reusable repository structure that gives Claude Code persistent session context, change governance, and architectural guardrails — across multiple sessions.

## How to Use

### Start a new project

```bash
# Clone this template
git clone https://github.com/YOUR-USERNAME/claude-project-template my-new-project
cd my-new-project

# Remove template git history, start fresh
rm -rf .git
git init
git add .
git commit -m "chore: initialize from claude-project-template"
```

### First steps

1. Open the project in Claude Code: `claude` in the terminal
2. Claude reads `.claude/CLAUDE.md` automatically
3. Type `/start-session` — Claude will load state and guide you
4. Fill in `specs/vision.md` with your product description
5. Fill in `specs/requirements.md`
6. Run `/create-cr` to create your first Change Request
7. Start building

### Session workflow

```
Start of session:   /start-session
During session:     /create-cr  →  /implement  →  /review
End of session:     /end-session
```

## Structure

```
.claude/
  CLAUDE.md              ← Claude reads this automatically
  commands/              ← /start-session, /end-session, /create-cr, /review, /implement
  agents/                ← architect, backend, frontend, reviewer, security, qa

specs/                   ← Fill these in before writing code
  vision.md
  requirements.md
  entities.md
  flows.md
  architecture.md
  api.yaml
  ui-spec.md
  nfr.md

change-requests/         ← One file per CR
  CR-TEMPLATE.md

sessions/                ← Updated every session by Claude
  CURRENT-STATE.md
  IMPLEMENTATION-LEDGER.md
  OPEN-ISSUES.md
  DECISIONS.md
  ARCHITECTURE-STATE.md

reviews/                 ← Checklists for review, architecture, security, UX
rules/                   ← Governance rules Claude follows
validation/              ← Validation script scaffolds (implement per project)
generated/               ← AI-generated output (gitignored by default)
```
