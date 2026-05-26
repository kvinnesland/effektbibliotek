# Rule: Change Management

## No Undocumented Changes
Every change must be covered by an approved CR. No exceptions.
If no CR exists: create one first.

## Specs Update Before Code
Order: CR approved → spec updated → code written → tests written → review → merge.
Reversing this is a violation.

## Impact Analysis Required
Every CR must include completed impact analysis:
- Affected specs and modules
- Database, API, UX, security, and performance impact
- Required tests

A CR without completed impact analysis cannot be approved.

## Traceability Required
Every change must trace from:
Business goal → Spec → Implementation → Tests → Review

## Architectural Changes Require Documentation
Any change affecting module structure or public contracts must:
1. Trigger an architecture review
2. Be documented in `sessions/DECISIONS.md`
3. Update `sessions/ARCHITECTURE-STATE.md`
4. Update `specs/architecture.md`
