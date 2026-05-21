# ARCHITECTURE-STATE.md

> Describes current system architecture. Updated on every structural change.
> Read by Claude at session startup.

## Current Phase
BOOTSTRAP — Tech stack valgt, ingen kode skrevet ennå.

## Stack
| Lag | Valg |
|---|---|
| Rammeverk | Next.js 14 (App Router) |
| Språk | TypeScript 5 |
| Styling | Tailwind CSS + shadcn/ui |
| ORM | Prisma 5 |
| Database | PostgreSQL (Neon i fase 1) |
| Auth | Custom OTP + iron-session |
| E-post | Resend |
| Deploy | Vercel (Hobby i fase 1) |

## Module Map
Ingen moduler implementert ennå. Planlagt struktur:

```
app/                        # Next.js App Router
  (auth)/
    login/
    verify/
  (app)/
    bibliotek/
    case/
      ny/
      [id]/
      [id]/rediger/
    mine-caser/
    oppfolging/
    admin/
  godkjenning/
    [caseId]/
      [token]/

lib/
  auth.ts                   # OTP-logikk, session
  email.ts                  # Resend-adapter (isolert)
  prisma.ts                 # Prisma-klient singleton
  case-validation.ts        # Status/missing-info-logikk
  usage-approval.ts         # Bruksgodkjenning-logikk

prisma/
  schema.prisma             # Datamodell
  migrations/

components/
  ui/                       # shadcn-komponenter
  cases/                    # Case-spesifikke komponenter
  approval/                 # Bruksgodkjenning-komponenter
```

## Dependency Rules
```
app/ (route handlers) → lib/ → prisma/
lib/ har ingen avhengighet til app/
components/ kan bruke lib/ via server actions eller API
```

Ingen sirkulære avhengigheter. Ingen direkte kryss-modul-tilgang.

## Key Architectural Decisions
- Public route `/godkjenning/:caseId/:token` bruker egen shell — ingen intern navigasjon
- E-postkall isolert i `lib/email.ts` for enkel provider-bytte
- OTP lagres hashet i database, aldri i klartekst
- Bruksgodkjenning-historikk er append-only, aldri overskriv

## External Dependencies
- Neon (PostgreSQL) — connection string i `DATABASE_URL`
- Resend — API-nøkkel i `RESEND_API_KEY`
- Vercel — deployment

## Last Structural Change
2026-05-21 — Tech stack valgt og dokumentert.
