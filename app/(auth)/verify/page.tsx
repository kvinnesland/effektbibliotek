"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (!email) router.replace("/login");
  }, [email, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? "Noe gikk galt. Prøv igjen.");
      return;
    }

    router.push("/bibliotek");
  }

  async function handleResend() {
    setResent(false);
    setError("");
    await fetch("/api/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setResent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "var(--color-background)" }}>
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
            Skriv inn engangskoden
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Vi har sendt en engangskode til{" "}
            <span className="font-medium" style={{ color: "var(--color-text-primary)" }}>
              {email}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="code"
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              Engangskode
            </label>
            <input
              id="code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              placeholder="123456"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              required
              className="w-full px-3 py-2.5 text-sm outline-none transition-colors tracking-widest text-center"
              style={{
                backgroundColor: "var(--color-surface)",
                border: `1px solid ${error ? "var(--color-error-text)" : "var(--color-border-strong)"}`,
                borderRadius: "var(--radius-md)",
                color: "var(--color-text-primary)",
                fontSize: "1.25rem",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "var(--color-border-strong)";
              }}
            />
            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
              Koden er gyldig i 5 minutter.
            </p>
            {error && (
              <p className="text-sm" style={{ color: "var(--color-error-text)" }}>
                {error}
              </p>
            )}
            {resent && (
              <p className="text-sm" style={{ color: "var(--color-accent)" }}>
                Ny kode er sendt.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full py-2.5 text-sm font-medium transition-colors disabled:opacity-60"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              border: "none",
              cursor: loading || code.length !== 6 ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = "var(--color-accent-hover)";
            }}
            onMouseLeave={(e) => {
              if (!loading) (e.target as HTMLButtonElement).style.backgroundColor = "var(--color-accent)";
            }}
          >
            {loading ? "Logger inn…" : "Logg inn"}
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-center py-1 transition-opacity hover:opacity-70"
            style={{ color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer" }}
          >
            Send ny kode
          </button>
        </form>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
