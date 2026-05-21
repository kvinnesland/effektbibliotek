# IMPLEMENTATION-LEDGER.md

> Append-only audit log. Never delete rows.

| Date | Session | Area | Changes | Related CR | Validation Status |
|---|---|---|---|---|---|
| 2026-05-21 | Bootstrap | All | Repository initialized from template | — | Not run |
| 2026-05-21 | Session 1 | specs/ | Populated specs/vision.md and specs/requirements.md from 8 product documents (docs/01–08) | — | Not applicable |
| 2026-05-21 | Session 1 | app/, lib/, prisma/ | CR-001: Auth — Next.js 16 + Prisma 7 + iron-session OTP-flyt. Login/verify-sider, 4 API-routes, proxy.ts, Prisma-skjema med alle modeller pushed til Neon. | CR-001 | Build ✓, domain-validering ✓, OTP-sending ✓, auth-redirect ✓ |
| 2026-05-21 | Session 2 | app/, lib/, components/ | CR-002: Case CRUD + Bibliotek — App-shell (Topbar + SideNav), bibliotekside med søk og filtre, case-oppretting, case-detaljside, redigeringsside. Nye lib/: labels.ts, session.ts, cases.ts, format.ts. Nye components/: StatusBadge, UsageBadge, CaseCard, EditCaseForm, LogoutButton. API-routes: GET/POST /api/cases, GET/PATCH /api/cases/[id]. | CR-002 | Build ✓, proxy 307 på uautentiserte kall ✓ |
| 2026-05-21 | Session 2 | app/, components/ | CR-003: Mine caser + Oppfølging — Mine caser med 3 grupper (ansvarlig, opprettet, trenger oppfølging). Oppfølging med 6 grupper (effekt, godkjenning, kundevennlig beskrivelse, pitchtekst, klassifisering, foreldede). CaseRow-komponent for kompakt listevisning. | CR-003 | Build ✓ |
