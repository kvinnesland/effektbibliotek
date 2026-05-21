"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/format";

interface User {
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

export default function AdminUsersClient({ currentEmail }: { currentEmail: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => { setUsers(data); setLoading(false); });
  }, []);

  async function toggleAdmin(email: string, current: boolean) {
    setToggling(email);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, isAdmin: !current }),
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers((prev) => prev.map((u) => (u.email === email ? { ...u, isAdmin: updated.isAdmin } : u)));
      }
    } finally {
      setToggling(null);
    }
  }

  if (loading) {
    return <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Laster...</p>;
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--color-border-subtle)" }}
    >
      <table className="w-full text-sm">
        <thead>
          <tr style={{ backgroundColor: "var(--color-surface-muted)", borderBottom: "1px solid var(--color-border-subtle)" }}>
            <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-secondary)" }}>Navn</th>
            <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-secondary)" }}>E-post</th>
            <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-secondary)" }}>Siste innlogging</th>
            <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--color-text-secondary)" }}>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr
              key={u.email}
              style={{
                backgroundColor: i % 2 === 0 ? "var(--color-surface)" : "var(--color-surface-muted)",
                borderBottom: "1px solid var(--color-border-subtle)",
              }}
            >
              <td className="px-4 py-3" style={{ color: "var(--color-text-primary)" }}>{u.name}</td>
              <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{u.email}</td>
              <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>
                {u.lastLoginAt ? formatDate(u.lastLoginAt) : "—"}
              </td>
              <td className="px-4 py-3">
                {u.email === currentEmail ? (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: "var(--color-accent-soft)", color: "var(--color-accent)" }}>
                    Deg
                  </span>
                ) : (
                  <button
                    onClick={() => toggleAdmin(u.email, u.isAdmin)}
                    disabled={toggling === u.email}
                    className="text-xs px-2.5 py-1 rounded-lg disabled:opacity-50"
                    style={{
                      backgroundColor: u.isAdmin ? "var(--color-accent-soft)" : "var(--color-surface-muted)",
                      border: `1px solid ${u.isAdmin ? "var(--color-accent)" : "var(--color-border-strong)"}`,
                      color: u.isAdmin ? "var(--color-accent)" : "var(--color-text-secondary)",
                    }}
                  >
                    {toggling === u.email ? "..." : u.isAdmin ? "Admin ✓" : "Gjør til admin"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
