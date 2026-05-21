# CR-002: Case CRUD + Bibliotek

**Status:** Approved
**Created:** 2026-05-21

## Business Goal
Brukere skal kunne legge inn caser, se dem i et bibliotek og åpne og redigere detaljer.

## Proposed Solution
App-shell med topbar og sidenavigasjon. Bibliotekside med søk og filtre. Skjema for ny case. Case-detaljside. Redigeringsside.

## Acceptance Criteria
- [ ] Innlogget bruker ser app-shell med navigasjon
- [ ] Biblioteket viser alle caser som casekort
- [ ] Søk filtrerer på tvers av tittel, kunde, beskrivelse, effekt m.m.
- [ ] Filtre for status, bruk, bransje og kanal fungerer
- [ ] Ny case kan opprettes med kun kundenavn, tittel og beskrivelse
- [ ] Default-verdier settes korrekt ved opprettelse
- [ ] Case-detaljside viser alt innhold og hva som mangler
- [ ] Case kan redigeres og lagres med statusovergang
- [ ] NDA-badge vises tydelig der det er satt

## Affected Specs
- specs/requirements.md (FR-CASE-*, FR-LIB-*, FR-STATUS-*, FR-USAGE-*)

## Dependencies
- CR-001 (Done)
