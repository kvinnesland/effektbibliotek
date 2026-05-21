# CURRENT-STATE.md

> Updated at the end of every session. Read by Claude at startup.

## Current Phase
IN PROGRESS — CR-003 implementert. Klar for CR-004 (Bruksgodkjenning).

## Current Objectives
1. Verifisere CR-002 manuelt i browser
2. Opprette CR-003: Mine caser + Oppfølging
3. Opprette CR-004: Bruksgodkjenning — intern og kundevendt flyt

## Current Branch
master

## Blockers
- Resend sender fra `onboarding@resend.dev` i dev. For produksjon må `FROM_EMAIL` settes til verifisert domene.
- Merk: Resend free tier kan kun sende til verifisert e-post uten domene-verifisering.

## Active Change Requests
- CR-001 (Done) — Auth
- CR-002 (Done) — Case CRUD + Bibliotek
- CR-003 (Done) — Mine caser + Oppfølging
- CR-004 (Ikke opprettet) — Bruksgodkjenning

## Recently Modified Systems
- app/(app)/layout.tsx — App-shell med Topbar og SideNav
- app/(app)/bibliotek/page.tsx — Full bibliotekside med søk og filtre
- app/(app)/case/ny/page.tsx — Skjema for ny case
- app/(app)/case/[id]/page.tsx — Case-detaljside
- app/(app)/case/[id]/rediger/page.tsx — Redigeringsside
- app/api/cases/route.ts — GET (søk) + POST (opprett)
- app/api/cases/[id]/route.ts — GET + PATCH
- components/layout/Topbar.tsx — Logo, "Legg inn case", brukernavn, logg ut
- components/layout/SideNav.tsx — Navigasjon med aktiv-tilstand
- components/layout/LogoutButton.tsx — Klient-komponent for utlogging
- components/cases/StatusBadge.tsx — Status-badge
- components/cases/UsageBadge.tsx — Bruks-badge
- components/cases/CaseCard.tsx — Casekort for biblioteket
- components/cases/EditCaseForm.tsx — Redigeringsskjema (klient)
- lib/labels.ts — Norske labels for alle enum-verdier
- lib/session.ts — requireSession() hjelpefunksjon
- lib/cases.ts — getMissingInfo() beregning
- lib/format.ts — Datoformatering

## Tech Stack Notes (oppdaget under implementering)
- Next.js 16.2.6 bruker `proxy.ts` ikke `middleware.ts`
- Prisma 7 krever driver adapter (`@prisma/adapter-pg`) — ingen URL i constructor
- Tailwind v4: tokens via `@theme inline {}` i CSS, ikke `tailwind.config.ts`
- Prisma client output: `app/generated/prisma/client.ts` (ikke `@prisma/client`)
- Next.js 16: `params` og `searchParams` i page/layout er Promises — må awaites
- EditCaseForm er klient-komponent; rediger-page er server-komponent som sjekker ownership

## Validation Status
- Build: ✓
- TypeScript: ✓ (ingen feil)
- Proxy: ✓ (uautentiserte kall redirectes til /login)

## Next Recommended Actions
1. Manuell test i browser: logg inn, opprett case, rediger, sjekk NDA-badge
2. Opprett CR-003: Mine caser (FR-MINE-*) + Oppfølging (FR-OPPS-*)
3. Opprett CR-004: Bruksgodkjenning — intern flyt (FR-APPR-*) + kundevendt flyt (FR-PUB-*)
4. Vurder: stub-sider for /mine-caser og /oppfolging (tomme men ikke 404)
