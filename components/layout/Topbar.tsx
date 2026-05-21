import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface TopbarProps {
  userName: string;
}

export default function Topbar({ userName }: TopbarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 px-6"
      style={{
        backgroundColor: "var(--color-accent)",
        borderBottom: "1px solid var(--color-accent-hover)",
      }}
    >
      <Link
        href="/bibliotek"
        className="text-white font-semibold text-base tracking-tight"
      >
        Effektbibliotek
      </Link>
      <div className="flex items-center gap-5">
        <Link
          href="/case/ny"
          className="px-4 py-1.5 text-sm font-medium text-white rounded-lg"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          + Legg inn case
        </Link>
        <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
          {userName}
        </span>
        <LogoutButton />
      </div>
    </header>
  );
}
