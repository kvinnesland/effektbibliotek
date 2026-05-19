# Rule: Implementation

## Layering Rules
Dependencies flow in one direction only:
API Layer → Service Layer → Repository Layer → Database

Forbidden:
- API layer calling repository directly
- Repository layer containing business logic
- Circular dependencies

## Module Boundaries
Cross-module communication only through defined interfaces.

Forbidden:
- Direct import of another module's internals
- Shared mutable state between modules
- Duplicating logic that exists in another module

## No Silent Architecture Changes
If a decision changes architecture:
1. Stop
2. Document in `sessions/DECISIONS.md`
3. Update `sessions/ARCHITECTURE-STATE.md`
4. Get human approval before proceeding

## Tests Are Not Optional
Every new behavior requires a test. Minimum per change:
- Unit test for each new function with logic
- Integration test for each new API endpoint

## Validate Before Proceeding
After each layer: type checks + linter + unit tests.
Do not proceed if validation fails.
