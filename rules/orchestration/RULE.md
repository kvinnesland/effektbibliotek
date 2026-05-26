# Rule: Session Orchestration

## Session Startup Is Mandatory
Claude MUST read before any implementation:
- `sessions/CURRENT-STATE.md`
- `sessions/OPEN-ISSUES.md`
- `sessions/ARCHITECTURE-STATE.md`
- All active CRs in `/change-requests`

If files are missing: stop and flag it.

## Session Shutdown Is Mandatory
Claude MUST update at session end:
- `sessions/CURRENT-STATE.md`
- `sessions/IMPLEMENTATION-LEDGER.md`
- `sessions/OPEN-ISSUES.md`

## Append-Only Logs
`IMPLEMENTATION-LEDGER.md` and `DECISIONS.md` are append-only. Never delete past entries.

## Plan Before Implementing
Present an explicit implementation plan and receive human approval before writing code.

## Flag, Don't Guess
If context is missing or ambiguous: stop and ask. Do not guess and proceed.
