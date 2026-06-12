# CR-007: Redirect til mine-caser etter innlogging, med støtte for dyplenker

**Status:** Approved
**Created:** 2026-06-12

## Business Goal
Etter innlogging skal brukeren landes på en meningsfull side. Standard skal være `/mine-caser`. Når en bruker følger en dyplenke (f.eks. fra en e-post om en bestemt case), skal de landes direkte på riktig side etter innlogging — ikke på en generisk startside.

## Problem Statement
I dag redirectes alle brukere til `/bibliotek` etter innlogging, uavhengig av hvor de kom fra. Dette er spesielt problematisk når vi sender e-post med lenker til spesifikke caser for oppdatering — brukeren havner feil sted og må navigere manuelt.

## Proposed Solution
1. `proxy.ts` — ved redirect til `/login` for uautoriserte requests, bevar opprinnelig URL som `?redirectTo=<path>`
2. `app/(auth)/login/page.tsx` — send `redirectTo` videre til `/verify`
3. `app/(auth)/verify/page.tsx` — etter vellykket innlogging, redirect til `redirectTo` hvis satt og gyldig (kun relative paths), ellers `/mine-caser`

Sikkerhetstiltak: `redirectTo` valideres til å kun akseptere paths som starter med `/` (ingen external redirects).

## Impact Analysis

**Affected Specs:**
- [ ] specs/flows.md — innloggingsflyten må oppdateres

**Affected Components:**
- `proxy.ts`
- `app/(auth)/login/page.tsx`
- `app/(auth)/verify/page.tsx`

**Database Impact:** Ingen

**API Impact:** Ingen

**UX Impact:** Brukere lander på `/mine-caser` som standard i stedet for `/bibliotek`. Dyplenker fungerer som forventet.

**Security Impact:** Lav — `redirectTo` må valideres til relative paths for å forhindre open redirect-angrep.

**Performance Impact:** Ingen

## Acceptance Criteria
- [ ] Etter innlogging uten dyplenke: bruker landes på `/mine-caser`
- [ ] Etter innlogging med dyplenke (f.eks. `/case/abc`): bruker landes på `/case/abc`
- [ ] `redirectTo` med ekstern URL (f.eks. `https://evil.com`) ignoreres — bruker landes på `/mine-caser`
- [ ] `redirectTo` med relativ path som ikke starter med `/` ignoreres

## Required Tests
- [ ] Manuell: logg inn uten dyplenke → verifiser landing på `/mine-caser`
- [ ] Manuell: åpne `/case/[id]` uten å være innlogget → logg inn → verifiser landing på riktig case
- [ ] Manuell: forsøk `?redirectTo=https://evil.com` → verifiser at bruker landes på `/mine-caser`

## Rollback Strategy
Reverter endringer i `proxy.ts`, `login/page.tsx` og `verify/page.tsx`.

## Migration Strategy
Ingen datamigrasjon nødvendig.

## Risks
- Lav: brukere som er vant til å lande på `/bibliotek` vil nå lande på `/mine-caser`

## Dependencies
- CR-001 (Done) — Auth-infrastruktur
- CR-003 (Done) — Mine caser-side eksisterer
