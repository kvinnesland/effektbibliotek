export interface ApprovalChoices {
  ndaRestricted: boolean;
  internalUseAllowed: boolean;
  anonymizedUseOnly: boolean;
  presentationUseAllowed: boolean;
  competitionUseAllowed: boolean;
}

export function computeUsageLevel(choices: ApprovalChoices): {
  usageLevel: "not_cleared" | "internal_only" | "presentation_allowed";
  ndaRestricted: boolean;
  anonymizedUseOnly: boolean;
  competitionUseAllowed: boolean;
} {
  if (choices.ndaRestricted) {
    return {
      usageLevel: "not_cleared",
      ndaRestricted: true,
      anonymizedUseOnly: false,
      competitionUseAllowed: false,
    };
  }

  let usageLevel: "not_cleared" | "internal_only" | "presentation_allowed" = "not_cleared";
  if (choices.presentationUseAllowed) usageLevel = "presentation_allowed";
  else if (choices.internalUseAllowed) usageLevel = "internal_only";

  return {
    usageLevel,
    ndaRestricted: false,
    anonymizedUseOnly: choices.anonymizedUseOnly,
    competitionUseAllowed: choices.competitionUseAllowed,
  };
}

export function buildApprovalText(params: {
  ownerName: string;
  ownerEmail: string;
  caseId: string;
  token: string;
  appUrl: string;
}): string {
  const url = `${params.appUrl}/godkjenning/${params.caseId}/${params.token}`;
  return `Hei,

Vi setter pris på godt samarbeid og ønsker gjerne å referere til arbeidet vi har gjort for dere i vår kommunikasjon og i Bas sitt effektbibliotek. For å gjøre dette trenger vi din godkjenning.

Du kan se hva vi ønsker å bruke og gi oss tilbakemelding her:
${url}

Det tar bare et minutt, og du kan velge selv hva vi kan bruke og i hvilken sammenheng.

Ta gjerne kontakt med ${params.ownerName} på ${params.ownerEmail} hvis du har spørsmål.

Vennlig hilsen
${params.ownerName}
Bas Kommunikasjon

---
Effektbiblioteket er foreløpig i betatesting. Gi gjerne beskjed til kontaktpersonen din i Bas hvis noe er uklart, feil eller burde fungere annerledes.`;
}

export const choiceLabels: Record<keyof ApprovalChoices, string> = {
  ndaRestricted: "Casen er NDA-belagt og skal ikke deles med andre",
  internalUseAllowed: "Casen kan presenteres internt i Bas",
  anonymizedUseOnly: "Casen kan kun brukes anonymisert",
  presentationUseAllowed: "Casen kan brukes i presentasjoner",
  competitionUseAllowed: "Casen kan brukes i konkurranse",
};
