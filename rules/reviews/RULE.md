# Rule: Reviews

## Reviews Required Before Merge
No code merges without a completed review.
`reviews/REVIEW-CHECKLIST.md` must be run. All items PASSED or WAIVED with reason.

## Validation Must Pass
Review is not complete until:
- All automated validations pass
- All tests pass
- No open FAILED checklist items

## Architecture Review for Structural Changes
CRs that change module structure, dependencies, or public contracts require a completed `reviews/ARCHITECTURE-REVIEW.md`.

## Security Review for Sensitive Changes
CRs touching auth, authorization, data access, or external integrations require a completed `reviews/SECURITY-REVIEW.md`.

## UX Review for UI Changes
CRs changing user-facing UI require a completed `reviews/UX-REVIEW.md`.

## Regression Review for All Feature Work
Verify existing tests pass before closing any CR.

## Reviews Are Documented
Review reports are appended to the CR file or stored in `/reviews`. Never discarded.
