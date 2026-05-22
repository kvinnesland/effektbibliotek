# CURRENT-STATE.md

> Updated at the end of every session. Read by Claude at startup.

## Current Phase
DEPLOYED — CR-001 gjennom CR-006 er ferdig. Appen er i produksjon på Vercel.

## Current Objectives
Ingen aktive CRs. Appen er i betatesting.

## Current Branch
master

## Blockers
Ingen kjente blokkere.

## Active Change Requests
- CR-001 (Done) — Auth
- CR-002 (Done) — Case CRUD + Bibliotek
- CR-003 (Done) — Mine caser + Oppfølging
- CR-004 (Done) — Bruksgodkjenning (intern + kundevendt)
- CR-005 (Done) — Materiale/lenker
- CR-006 (Done) — Admin

## Production URL
https://effektbibliotek.vercel.app

## Recently Modified Systems
- lib/usage-approval.ts — Godkjenningstekst oppdatert (starter med "[navn] har registrert casen...")
- app/api/cases/[id]/copy-approval-text/route.ts — Bruker nå request.url.origin (fikset port-bug)
- package.json — prisma generate lagt til i build-script for Vercel
- components/cases/ApprovalSection.tsx — Intern godkjenningsseksjon
- app/godkjenning/[caseId]/[token]/page.tsx — Offentlig kundevendt godkjenningsside
- app/godkjenning/[caseId]/[token]/ApprovalForm.tsx — Kundevendt skjema
- app/api/godkjenning/[caseId]/[token]/route.ts — Public API, e-postutsending
- app/api/cases/[id]/unlock-approval/route.ts — Gjenåpne godkjenning
- components/cases/LinksSection.tsx — Legg til/slett lenker på case-detalj
- app/api/cases/[id]/links/route.ts — POST ny lenke
- app/api/cases/[id]/links/[linkId]/route.ts — DELETE lenke
- app/(app)/admin/page.tsx — Admin-side (server)
- app/(app)/admin/AdminUsersClient.tsx — Brukertabell med isAdmin-toggle
- app/api/admin/users/route.ts — GET/PATCH brukere
- app/api/admin/users/list/route.ts — GET brukerliste for owner-dropdown
- components/cases/EditCaseForm.tsx — isAdmin: owner-change select
- components/layout/SideNav.tsx — Admin-lenke for admin-brukere
- proxy.ts — /api/godkjenning lagt til PUBLIC_PATHS

## Tech Stack Notes (oppdaget under implementering)
- Next.js 16.2.6 bruker `proxy.ts` ikke `middleware.ts`
- Prisma 7 krever driver adapter (`@prisma/adapter-pg`) — ingen URL i constructor
- Tailwind v4: tokens via `@theme inline {}` i CSS, ikke `tailwind.config.ts`
- Prisma client output: `app/generated/prisma/client.ts` (ikke `@prisma/client`)
- Next.js 16: `params` og `searchParams` i page/layout er Promises — må awaites
- Godkjenningslenke bruker alltid `new URL(request.url).origin` — ikke NEXT_PUBLIC_APP_URL
- `crypto.randomUUID().replace(/-/g, "")` brukes for token-generering (ingen @paralleldrive/cuid2)
- E-post sendes via Nodemailer + Gmail SMTP, ikke Resend
- `Promise.allSettled()` for e-postutsending (feil i e-post stopper ikke godkjenning)
- Vercel deploy: `prisma generate && next build` i build-script

## Validation Status
- Build (lokal): ✓
- Build (Vercel prod): ✓
- TypeScript: ✓ (ingen feil)
- Proxy: ✓
- Deploy: ✓ — https://effektbibliotek.vercel.app

## Next Recommended Actions
1. Manuell test på prod: logg inn, opprett case, test godkjenningsflyt end-to-end
2. Verifiser at Gmail-e-post leveres fra produksjon (sjekk spam-filter)
3. Opprett admin-bruker i Neon direkte eller via første login + manuell `isAdmin`-sett i DB
4. Vurder om `docs_extracted.txt` skal gitignores (sensitiv prod-dokumentasjon)
5. Vurder domene-oppsett på Vercel hvis ønsket (effektbibliotek.bas.no e.l.)
