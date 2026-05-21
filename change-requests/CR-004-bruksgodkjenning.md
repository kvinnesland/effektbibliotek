# CR-004: Bruksgodkjenning

**Status:** Approved
**Created:** 2026-05-21

## Business Goal
Bas-person skal kunne sende en unik godkjenningslenke til kunde, og kunden skal
kunne gi tillatelse til bruk av casen via en kundevendt side uten innlogging.

## Proposed Solution
Intern seksjon på case-detaljsiden for å kopiere godkjenningstekst og se status.
Public godkjenningsside (/godkjenning/:caseId/:token) for kunden.
API-ruter for å markere som åpen, låse opp og sende inn godkjenning.

## Acceptance Criteria
- [ ] Case-detaljsiden viser bruksgodkjenningsseksjon med status
- [ ] "Kopier godkjenningstekst" setter status til Åpen og kopierer ferdig tekst med unik lenke
- [ ] Innsendt godkjenning viser: innsender, tidspunkt, valg, kommentar
- [ ] Caseeier/admin kan låse opp med bekreftelsesmodal (ny token genereres)
- [ ] Public side viser: kundenavn, tittel, kundevennlig beskrivelse, Bas-kontakt, skjema, beta-notat
- [ ] NDA-valg deaktiverer alle andre valg
- [ ] Minst ett valg er påkrevd
- [ ] Innsendt bruksgodkjenning låser skjemaet (FR-PUB-006)
- [ ] Bekreftelsesmail sendes til kunde og kopi til caseeier (FR-EMAIL-002/003)
- [ ] Bruksnivå oppdateres basert på kundens valg (FR-PUB-009)

## Affected Specs
- specs/requirements.md (FR-APPR-*, FR-PUB-*, FR-EMAIL-002/003, NFR-002/004/005/006)

## Dependencies
- CR-002 (Done)
