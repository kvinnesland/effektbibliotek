# DECISIONS.md

> Append-only. Document every significant architectural or governance decision.

## Format
```
DATE: YYYY-MM-DD
DECISION: [short title]
CONTEXT: [why was this needed]
DECISION: [what was decided]
ALTERNATIVES CONSIDERED: [what else was evaluated]
RATIONALE: [why this option]
CONSEQUENCES: [what this enables or constrains]
DECIDED BY: human | Claude | both
```

## Decisions

DATE: 2026-05-21
DECISION: Adopt governed AI-native repository structure
CONTEXT: AI-assisted development across multiple sessions requires explicit session continuity, change traceability, and governance to prevent architectural drift.
DECISION: Implement full governance structure with CLAUDE.md, session orchestration, CR system, review system, and agent roles.
ALTERNATIVES CONSIDERED: Ad-hoc prompting; rules-only approach.
RATIONALE: Ad-hoc prompting loses context between sessions. Explicit structure makes AI behavior deterministic and auditable.
CONSEQUENCES: All changes require a CR. Sessions start and end with orchestration file updates.
DECIDED BY: human

---

DATE: 2026-05-21
DECISION: Tech stack for Effektbibliotek v1
CONTEXT: Prosjektet skal utvikles i fase 1 med gratisverktøy, og stacken må være enkel å migrere når produktet går i drift.
DECISION: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Prisma + Neon (PostgreSQL) + Custom OTP + iron-session + Resend + Vercel Hobby.
ALTERNATIVES CONSIDERED: SvelteKit (mindre community, færre shadcn-ressurser). Supabase auth / Clerk (vendor lock-in og kostnad ved skalering). Auth0 (kostnad). Remix (god DX men mer friksjon mot Vercel).
RATIONALE: Next.js gir fullstack i én kodebase. Prisma gjør database-bytte til én linjeskift. Custom OTP har ingen ekstern avhengighet. Resend og Neon er isolert bak adapter-lag. Vercel Hobby er gratis og deployer Next.js uten konfigurasjon.
CONSEQUENCES: Serverless 10s timeout (uproblematisk). E-post og auth er fullt kontrollerbare. Migrering til annen hosting krever ingen kodeendringer i forretningslogikk.
DECIDED BY: human
