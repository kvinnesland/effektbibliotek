export interface MissingInfo {
  forOngoing: string[];
  forCompleted: string[];
  forPresentation: string[];
}

interface CaseFields {
  industry: string | null;
  caseTypes: string[];
  channels: string[];
  problem: string | null;
  solution: string | null;
  resultSummary: string | null;
  learning: string | null;
  customerFacingSummary: string | null;
  ndaRestricted: boolean;
}

export function getMissingInfo(c: CaseFields): MissingInfo {
  const forOngoing: string[] = [];
  const forCompleted: string[] = [];
  const forPresentation: string[] = [];

  if (!c.industry) {
    forOngoing.push("Bransje");
    forCompleted.push("Bransje");
  }
  if (!c.caseTypes?.length) {
    forOngoing.push("Case-type");
    forCompleted.push("Case-type");
  }
  if (!c.channels?.length) {
    forOngoing.push("Kanal");
    forCompleted.push("Kanal");
  }
  if (!c.problem && !c.solution) {
    forOngoing.push("Problem eller løsning");
  }
  if (!c.problem) forCompleted.push("Problem / kontekst");
  if (!c.solution) forCompleted.push("Løsning");
  if (!c.resultSummary && !c.learning) forCompleted.push("Effekt eller læring");

  if (!c.customerFacingSummary) forPresentation.push("Kundevennlig beskrivelse");
  if (c.ndaRestricted) forPresentation.push("NDA er satt — kan ikke brukes i presentasjoner");

  return { forOngoing, forCompleted, forPresentation };
}
