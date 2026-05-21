"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Noe gikk galt. Prøv igjen.");
      return;
    }

    router.push(`/verify?email=${encodeURIComponent(email)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
            Effektbibliotek
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Logg inn med Bas-eposten din for å se og registrere caser.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              E-post
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="navn@bas.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2.5 text-sm outline-none transition-colors"
              style={{
                backgroundColor: "var(--color-surface)",
                border: `1px solid ${error ? "var(--color-error-text)" : "var(--color-border-strong)"}`,
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-primary)",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "var(--color-border-strong)";
              }}
            />
            {error && (
              <p className="text-sm" style={{ color: "var(--color-error-text)" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 text-sm font-medium transition-colors disabled:opacity-60"
            style={{
              backgroundColor: loading ? "var(--color-accent-hover)" : "var(--color-accent)",
              color: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = "var(--color-accent-hover)";
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = "var(--color-accent)";
            }}
          >
            {loading ? "Sender…" : "Send engangskode"}
          </button>
        </form>
      </div>
    </div>
  );
}
