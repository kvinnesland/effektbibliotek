# /start-session

Execute these steps in order at the start of every session.

## 1. Load Orchestration Files

Read:
- `sessions/CURRENT-STATE.md`
- `sessions/OPEN-ISSUES.md`
- `sessions/DECISIONS.md`
- `sessions/ARCHITECTURE-STATE.md`
- `sessions/IMPLEMENTATION-LEDGER.md`

If any file is missing: stop and flag it.

## 2. Summarize Project State

Output:
- Current phase
- Last completed milestone
- Active CRs (ID + title)
- Open blockers

## 3. Identify Next Recommended Task

Based on active CRs and current state, recommend the single most important next task and explain why.

## 4. Generate Execution Plan

Produce a step-by-step plan:
1. What will be done
2. Which specs will be read
3. Which modules will be touched
4. What validation will be run
5. Expected output

Present the plan. Wait for human approval before proceeding.
