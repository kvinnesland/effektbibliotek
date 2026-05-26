# /review

Run the full review checklist before any merge.

## Traceability
- [ ] Change covered by approved CR
- [ ] Specs updated before code
- [ ] Commits reference CR

## Architecture
- [ ] Module boundaries respected
- [ ] No forbidden imports
- [ ] No circular dependencies
- [ ] Layering rules followed

## Type Safety
- [ ] No untyped inputs/outputs
- [ ] No `any` without justification

## Testing
- [ ] Unit tests for all new logic
- [ ] Integration tests for new endpoints
- [ ] Existing tests pass

## Security
- [ ] All new endpoints require auth
- [ ] Inputs validated
- [ ] No secrets in code

## Performance
- [ ] No N+1 queries
- [ ] NFR targets not violated

## Observability
- [ ] Structured logging for new flows
- [ ] Errors logged with context

## UX (if applicable)
- [ ] Matches ui-spec.md
- [ ] Design tokens used
- [ ] Loading/error/empty states handled

## Output

```
REVIEW REPORT — [Date] — CR-XXX
PASSED: [list]
FAILED: [list]
WARNINGS: [list]
RECOMMENDATION: Approve / Request Changes / Reject
```
