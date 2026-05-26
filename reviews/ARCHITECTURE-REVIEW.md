# ARCHITECTURE-REVIEW.md

> Required for CRs that change module structure, add services, or change data flow.

## Trigger Conditions
- Adds or removes a module or service
- Changes dependency direction between layers
- Introduces a new external dependency
- Changes database schema non-additively
- Changes public API contracts

## Checklist

Module Boundaries:
- [ ] New module has a single, clearly defined responsibility
- [ ] No existing abstraction duplicated
- [ ] Module interface is explicitly defined

Dependency Rules:
- [ ] Dependencies flow in correct direction
- [ ] No new circular dependencies
- [ ] No direct cross-module access

External Dependencies:
- [ ] Dependency is necessary — no existing alternative
- [ ] Dependency is actively maintained
- [ ] No known security vulnerabilities

## Output
Document findings in `sessions/DECISIONS.md` before approving.
