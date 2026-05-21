# CR-003: Mine caser + Oppfølging

**Status:** Approved
**Created:** 2026-05-21

## Business Goal
Brukere skal enkelt finne sine egne caser og se hva som trenger oppmerksomhet,
uten å måtte søke gjennom hele biblioteket.

## Proposed Solution
Mine caser-side med tre grupper: ansvarlig, opprettet, trenger oppfølging.
Oppfølgingsside som grupperer caser etter hva som mangler.

## Acceptance Criteria
- [ ] Mine caser viser caser der bruker er ansvarlig
- [ ] Mine caser viser caser der bruker har opprettet (men ikke er ansvarlig)
- [ ] Mine caser viser caser der bruker er ansvarlig og noe mangler (trenger oppfølging)
- [ ] Hvert innslag viser: kunde, tittel, status, bruksnivå, hva som mangler, sist oppdatert
- [ ] Oppfølging grupperer caser etter: mangler effekt/læring, mangler bruksgodkjenning, mangler kundevennlig beskrivelse, mangler pitchtekst, mangler kanal/case-type, ikke oppdatert på lenge
- [ ] Fra oppfølging kan man åpne og redigere caser direkte

## Affected Specs
- specs/requirements.md (FR-MINE-*, FR-OPPS-*, FR-MISS-*)

## Dependencies
- CR-002 (Done)

## Out of Scope
- Kopiere godkjenningstekst fra oppfølging (avhenger av CR-004)
