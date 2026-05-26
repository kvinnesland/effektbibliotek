# /create-cr

Execute these steps to create a new Change Request.

> If the problem space is unclear or the domain model is involved, consider running `/grill-with-docs` first.

## 1. Gather Information

Ask:
1. Business goal — what problem does this solve?
2. Proposed solution — high-level, what changes?
3. Which specs are affected?
4. Is this a breaking change?

## 2. Perform Impact Analysis

Analyze and document:
- Affected modules
- Specs that must update before code
- Database impact
- API impact
- UX impact
- Security impact
- Performance impact
- Required tests

## 3. Create CR File

Create `/change-requests/CR-XXX-short-title.md` using the template below.
Assign the next available CR number.

## 4. CR Template

```
# CR-XXX: [Title]

Status: Draft
Created: YYYY-MM-DD

## Business Goal
## Problem Statement
## Proposed Solution

## Impact Analysis

Affected Specs:
- [ ] specs/entities.md
- [ ] specs/api.yaml
- [ ] specs/flows.md
- [ ] specs/architecture.md
- [ ] specs/nfr.md
- [ ] specs/ui-spec.md

Affected Components:
Database Impact:
API Impact:
UX Impact:
Security Impact:
Performance Impact:

## Acceptance Criteria
- [ ]

## Required Tests
- [ ] Unit:
- [ ] Integration:

## Rollback Strategy
## Migration Strategy
## Risks
## Dependencies
```
