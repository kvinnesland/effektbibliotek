# UX-REVIEW.md

> Required for CRs that change user-facing UI or user flows.

## Checklist

Spec Alignment:
- [ ] UI matches `specs/ui-spec.md`
- [ ] User flows match `specs/flows.md`

Design System:
- [ ] Design tokens used for all colors, spacing, typography
- [ ] No hardcoded values
- [ ] Components consistent with existing patterns

States:
- [ ] Loading state implemented
- [ ] Error state with useful message
- [ ] Empty state implemented
- [ ] Success feedback provided

Accessibility:
- [ ] Semantic HTML
- [ ] Keyboard accessible
- [ ] Images have alt text
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Form inputs have labels

Mobile:
- [ ] Layout works at mobile breakpoints
- [ ] Touch targets large enough
