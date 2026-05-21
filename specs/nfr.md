# nfr.md — Non-Functional Requirements

> Tech stack godkjent 2026-05-21. Se sessions/DECISIONS.md for begrunnelse.

## Tech Stack

| Lag | Valg | Versjon |
|---|---|---|
| Rammeverk | Next.js (App Router) | 14.x |
| Språk | TypeScript | 5.x |
| Styling | Tailwind CSS + shadcn/ui | Tailwind 3.x |
| ORM | Prisma | 5.x |
| Database | PostgreSQL via Neon | PostgreSQL 16 |
| Auth | Custom OTP + iron-session | — |
| E-post | Resend | — |
| Deploy | Vercel (Hobby i fase 1) | — |
| Runtime | Node.js | 20.x |

## Migreringsplan
- **Database**: Neon → Supabase / Railway / self-hosted. Kun connection string i `.env` + `prisma migrate deploy`.
- **Deploy**: Vercel → Railway / Render / self-hosted Node. `next build && next start` fungerer overalt.
- **E-post**: Resend → Postmark / AWS SES. E-postkall er isolert i `lib/email.ts` — bytt adapter der.
- **Auth**: Custom OTP er uten ekstern avhengighet. Ingen migrasjon nødvendig.

## Performance
- API p95 latency: < 500ms (intern tool, lav trafikk)
- Page load (LCP): < 2s på desktop
- Concurrent users: < 50 (internt team)

## Security
- Autentisering: OTP via e-post, kun `@bas.no`-domene
- Sessions: kryptert cookie via iron-session (HttpOnly, Secure, SameSite=Strict)
- OTP gyldig i maks 5 minutter
- Autorisering: enkel rolle-sjekk (user / admin). Ingen tung RBAC.
- Public godkjenningsendepunkt: returnerer kun tillatte felter (se FR-PUB-002)
- Godkjenningstoken: kryptografisk tilfeldig (crypto.randomBytes)
- TLS: påkrevd i produksjon (håndteres av Vercel)
- Rate limiting: sett på `/api/auth/request-code` (maks 5 forsøk/minutt per e-post)

## Availability
- Uptime: best-effort i fase 1 (Vercel Hobby SLA)
- RTO: ikke definert i fase 1
- RPO: ikke definert i fase 1

## Observability (fase 1)
- Logging: `console.error` for server-feil, Vercel logs
- Tracing: ikke i fase 1
- Metrics: ikke i fase 1
- Alerting: ikke i fase 1

## CI/CD
- Fase 1: Vercel auto-deploy fra `master`-branch
- Ingen CI-pipeline i fase 1 (kan legges til med GitHub Actions senere)

## Constraints
- Vercel Hobby: serverless functions maks 10s timeout
- Neon free: 0.5 GB database, 1 compute unit
- Resend free: 3 000 e-poster/mnd, 100/dag
