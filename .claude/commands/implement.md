# /implement

Execute these steps before writing any code.

## 1. Verify Prerequisites

Confirm:
- [ ] Approved CR exists
- [ ] Affected specs updated
- [ ] Architecture review complete (if structural change)
- [ ] Implementation plan approved this session

If anything is missing: stop and resolve first.

## 2. Read Context

Read in order:
1. Active CR from `/change-requests`
2. All specs in the CR impact analysis
3. `sessions/ARCHITECTURE-STATE.md`
4. Relevant agent file from `.claude/agents/`

## 3. Implement Layer by Layer

Order:
1. Types and interfaces
2. Database schema / migrations
3. Repository / data access layer
4. Service / business logic layer
5. API layer
6. Frontend (if applicable)
7. Tests
8. CI configuration (if changed)

Validate after each layer before proceeding.

## 4. Validate Continuously

After each layer:
- Type checks
- Linter
- Unit tests for that layer

Do not proceed if validation fails.

## 5. Update Traceability

After implementation:
- Reference CR in modified files
- Update `sessions/IMPLEMENTATION-LEDGER.md`
- Run `/review` before marking CR as Done
