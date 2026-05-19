# REVIEW-CHECKLIST.md

> Run via `/review` before any merge. Every item must be PASSED, FAILED, or WAIVED (with reason).

## Traceability
- [ ] Change covered by approved CR
- [ ] Specs updated before code
- [ ] Commits reference CR

## Spec Alignment
- [ ] Implementation matches specs — no undocumented behavior
- [ ] No new entities or API fields introduced outside specs

## Architecture
- [ ] Module boundaries respected
- [ ] No forbidden imports
- [ ] No circular dependencies
- [ ] Layering rules followed (API → Service → Repository)

## Type Safety
- [ ] No untyped inputs or outputs
- [ ] No `any` without justification

## Testing
- [ ] Unit tests for all new logic
- [ ] Integration tests for all new endpoints
- [ ] Edge cases covered
- [ ] All existing tests pass

## Security
- [ ] All new endpoints require auth (unless explicitly public)
- [ ] All inputs validated
- [ ] No secrets in code
- [ ] No sensitive data in logs

## Performance
- [ ] No N+1 queries
- [ ] NFR targets not violated

## Observability
- [ ] Structured logging for new flows
- [ ] Errors logged with context

## Maintainability
- [ ] Code is readable
- [ ] Functions have single responsibilities

## UX (if applicable)
- [ ] Matches `specs/ui-spec.md`
- [ ] Design tokens used
- [ ] Loading, error, and empty states handled
- [ ] Accessible markup
