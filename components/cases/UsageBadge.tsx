import { usageLevelLabels } from "@/lib/labels";

const styles: Record<string, { bg: string; text: string }> = {
  not_cleared: {
    bg: "var(--color-usage-unclear-bg)",
    text: "var(--color-usage-unclear-text)",
  },
  internal_only: {
    bg: "var(--color-usage-internal-bg)",
    text: "var(--color-usage-internal-text)",
  },
  presentation_allowed: {
    bg: "var(--color-usage-presentation-bg)",
    text: "var(--color-usage-presentation-text)",
  },
};

interface UsageBadgeProps {
  level: string;
}

export default function UsageBadge({ level }: UsageBadgeProps) {
  const label = usageLevelLabels[level as keyof typeof usageLevelLabels] ?? level;
  const s = styles[level] ?? { bg: "var(--color-surface-muted)", text: "var(--color-text-muted)" };

  return (
    <span
      className="inline-block px-2 py-0.5 text-xs font-medium rounded"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {label}
    </span>
  );
}
