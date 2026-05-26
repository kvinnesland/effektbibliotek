# architecture.md — System Architecture

> Defines module structure, dependency rules, and architectural decisions.
> Claude reads this to understand what is allowed and forbidden.

## Layering Model

API Layer        — Routes, request validation, response mapping
Service Layer    — Business logic, orchestration
Repository Layer — Data access, queries
Database Layer   — Persistence

Rule: Dependencies flow downward only. No layer may import from a layer above it.

## Module Map

[Module name]: [Responsibility]

## Forbidden Imports

[Module A] must not import from [Module B].

## External Dependencies

[Dependency]: [Version] — [Why it is used]

## Architectural Decisions

See sessions/DECISIONS.md for the full log.
