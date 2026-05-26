# Claude Project Template

A governed, AI-native repository structure for building software with Claude Code across multiple sessions.

## What this is

A project scaffold that gives you:
- Session continuity across Claude Code sessions
- Change request (CR) governance
- Spec-driven development
- Traceability (CR → spec → code → test)
- Agent role definitions
- Review checklists

## Getting started

1. Clone or fork this template
2. Run `/interview-and-define` to sharpen your domain language and populate `CONTEXT.md`
3. Populate `specs/vision.md` and `specs/requirements.md`
4. Run `/create-cr` to create your first change request
5. Run `/implement` to begin implementation

## Session workflow

| Command | Purpose |
|---|---|
| `/start-session` | Load state, identify blockers, generate plan |
| `/end-session` | Summarize work, update all orchestration files |
| `/interview-and-define` | Interview plan, sharpen domain language, update CONTEXT.md |
| `/create-cr` | Create a new change request with impact analysis |
| `/review` | Run full review checklist |
| `/implement` | Begin implementation from an approved CR |

## Structure

```
.claude/            — Claude Code configuration, agents, commands
sessions/           — Session state (read/updated every session)
specs/              — Living specifications
change-requests/    — One file per CR
reviews/            — Review checklists
rules/              — Governance rules
validation/         — Validation scripts (scaffold, not yet implemented)
```
