# CR-001: Auth — innlogging for Bas-brukere

**Status:** Approved
**Created:** 2026-05-21

---

## Business Goal
Bas-ansatte skal kunne logge inn i Effektbiblioteket med Bas-eposten sin. Ingen tung brukerkonto-flyt — bare e-post + engangskode.

## Problem Statement
Systemet trenger en enkel, sikker innloggingsmekanisme som kun tillater `@bas.no`-adresser. Ingen ekstern auth-leverandør skal brukes for å unngå lock-in og kostnad.

## Proposed Solution
Enkel OTP-flyt (engangskode via e-post):
1. Bruker skriver inn `@bas.no`-epost på `/login`
2. Systemet genererer 6-sifret kode, lagrer hashet i DB med utløpstid (5 min)
3. Kode sendes via Resend til brukerens e-post
4. Bruker skriver inn kode på `/verify`
5. Systemet validerer og oppretter session via iron-session
6. Bruker redirectes til `/bibliotek`

Navn utledes fra e-post: `fornavn.etternavn@bas.no` → `Fornavn Etternavn`.

---

## Impact Analysis

### Affected Specs
- [x] specs/requirements.md (FR-AUTH-001 til FR-AUTH-005)
- [x] specs/nfr.md (auth-seksjon)
- [ ] specs/entities.md (User-modell, OtpCode-modell)
- [ ] specs/api.yaml (auth-endepunkter)

### Affected Components
- `app/(auth)/login/page.tsx` — Login-skjerm
- `app/(auth)/verify/page.tsx` — Verifiseringsskjerm
- `app/api/auth/request-code/route.ts` — Send OTP
- `app/api/auth/verify-code/route.ts` — Valider OTP, opprett session
- `app/api/auth/logout/route.ts` — Avslutt session
- `app/api/auth/me/route.ts` — Hent innlogget bruker
- `lib/auth.ts` — OTP-generering, hashing, session-config
- `lib/email.ts` — Resend-adapter
- `prisma/schema.prisma` — User + OtpCode modeller
- `middleware.ts` — Beskytt interne routes

### Database Impact
To nye tabeller:
- `User` (email, name, isAdmin, createdAt, lastLoginAt)
- `OtpCode` (id, email, codeHash, expiresAt, usedAt)

### API Impact
Nye endepunkter:
- `POST /api/auth/request-code` — mottar e-post, sender OTP
- `POST /api/auth/verify-code` — validerer kode, setter session
- `POST /api/auth/logout` — sletter session
- `GET /api/auth/me` — returnerer innlogget bruker

### UX Impact
To nye sider:
- `/login` — e-postfelt + knapp
- `/verify` — kodefelt + logg inn + send ny kode

### Security Impact
- OTP lagres kun som bcrypt-hash i DB (aldri klartekst)
- OTP utløper etter 5 minutter
- Rate limiting på `request-code`: maks 5 forespørsler/minutt per e-post
- Kun `@bas.no`-adresser aksepteres
- Session: kryptert HttpOnly-cookie via iron-session
- Middleware blokkerer alle interne routes for uinnloggede brukere

### Performance Impact
Minimal. Auth-kall er sjeldne.

---

## Acceptance Criteria
- [ ] Bruker med `@bas.no`-epost kan sende seg en engangskode
- [ ] Kode leveres på e-post innen rimelig tid (< 30 sek)
- [ ] Kode er gyldig i 5 minutter
- [ ] Utløpt kode gir feilmelding: "Koden er feil eller har utløpt."
- [ ] Feil e-postdomene gir feilmelding: "Effektbiblioteket er foreløpig bare tilgjengelig for Bas-epostadresser."
- [ ] Etter vellykket innlogging: redirect til `/bibliotek`
- [ ] Uinnlogget bruker som prøver intern route: redirect til `/login`
- [ ] Logout avslutter session og redirecter til `/login`
- [ ] `/api/auth/me` returnerer innlogget bruker eller 401
- [ ] OTP lagres aldri i klartekst i databasen
- [ ] Navn utledes korrekt fra e-post (`ida.marlene@bas.no` → `Ida Marlene`)

## Required Tests
- [ ] Unit: OTP-generering og hashing (`lib/auth.ts`)
- [ ] Unit: Navneutledning fra e-post
- [ ] Unit: Domenevalidering (`@bas.no`)
- [ ] Integration: `POST /api/auth/request-code` — gyldig og ugyldig input
- [ ] Integration: `POST /api/auth/verify-code` — gyldig kode, utløpt kode, feil kode
- [ ] Integration: Middleware blokkerer uinnlogget tilgang til intern route

## Rollback Strategy
Slett `User`- og `OtpCode`-tabeller via Prisma migration rollback. Ingen andre systemer påvirkes.

## Migration Strategy
Ny installasjon — ingen eksisterende data å migrere.

## Risks
- Resend kan ha forsinkelse på e-post i visse miljøer: akseptabelt i fase 1
- iron-session krever `IRON_SESSION_SECRET` i env — må settes på Vercel før deploy

## Dependencies
- Neon DB må være provisjonert og `DATABASE_URL` satt
- Resend-konto og `RESEND_API_KEY` satt
- `IRON_SESSION_SECRET` (min 32 tegn) generert og satt

## Validation Notes
Kjør `prisma migrate dev` og verifiser at begge tabeller opprettes korrekt.
