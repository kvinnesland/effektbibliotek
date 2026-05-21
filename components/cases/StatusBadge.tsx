import { lifecycleStatusLabels } from "@/lib/labels";

const styles: Record<string, { bg: string; text: string }> = {
  started: {
    bg: "var(--color-status-started-bg)",
    text: "var(--color-status-started-text)",
  },
  ongoing: {
    bg: "var(--color-status-ongoing-bg)",
    text: "var(--color-status-ongoing-text)",
  },
  completed: {
    bg: "var(--color-status-completed-bg)",
    text: "var(--color-status-completed-text)",
  },
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = lifecycleStatusLabels[status as keyof typeof lifecycleStatusLabels] ?? status;
  const s = styles[status] ?? { bg: "var(--color-surface-muted)", text: "var(--color-text-muted)" };

  return (
    <span
      className="inline-block px-2 py-0.5 text-xs font-medium rounded"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {label}
    </span>
  );
}
