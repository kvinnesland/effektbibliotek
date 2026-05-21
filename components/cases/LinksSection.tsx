"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { caseLinkTypeLabels } from "@/lib/labels";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  type: string | null;
  description: string | null;
}

interface Props {
  caseId: string;
  links: LinkItem[];
  canManage: boolean;
}

export default function LinksSection({ caseId, links: initialLinks, canManage }: Props) {
  const router = useRouter();
  const [links, setLinks] = useState(initialLinks);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title.trim() || !url.trim()) {
      setError("Tittel og URL er påkrevd.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/cases/${caseId}/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, type: type || null, description: description || null }),
      });
      if (!res.ok) { setError((await res.json()).error ?? "Feil"); return; }
      const link = await res.json();
      setLinks((prev) => [...prev, link]);
      setTitle(""); setUrl(""); setType(""); setDescription("");
      setShowForm(false);
      router.refresh();
    } catch {
      setError("Noe gikk galt.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(linkId: string) {
    try {
      await fetch(`/api/cases/${caseId}/links/${linkId}`, { method: "DELETE" });
      setLinks((prev) => prev.filter((l) => l.id !== linkId));
      router.refresh();
    } catch {
      // silent
    }
  }

  if (links.length === 0 && !canManage) return null;

  return (
    <div
      className="rounded-xl p-5 mb-4"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border-subtle)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
          Materiale
        </p>
        {canManage && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm"
            style={{ color: "var(--color-accent)" }}
          >
            + Legg til lenke
          </button>
        )}
      </div>

      {links.length > 0 && (
        <ul className="space-y-2 mb-4">
          {links.map((link) => (
            <li key={link.id} className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:underline"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {link.title}
                  </a>
                  {link.type && (
                    <span
                      className="px-1.5 py-0.5 text-xs rounded"
                      style={{ backgroundColor: "var(--color-surface-muted)", color: "var(--color-text-muted)", border: "1px solid var(--color-border-subtle)" }}
                    >
                      {caseLinkTypeLabels[link.type as keyof typeof caseLinkTypeLabels] ?? link.type}
                    </span>
                  )}
                </div>
                {link.description && (
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {link.description}
                  </p>
                )}
              </div>
              {canManage && (
                <button
                  onClick={() => handleDelete(link.id)}
                  className="text-xs flex-shrink-0"
                  style={{ color: "var(--color-text-muted)" }}
                  title="Slett lenke"
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <form onSubmit={handleAdd} className="space-y-3 pt-3" style={{ borderTop: links.length > 0 ? "1px solid var(--color-border-subtle)" : "none" }}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>
                Tittel <span style={{ color: "var(--color-error-text)" }}>*</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="F.eks. Presentasjon Q4"
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "var(--color-surface-muted)", border: "1px solid var(--color-border-strong)", color: "var(--color-text-primary)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>
                URL <span style={{ color: "var(--color-error-text)" }}>*</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "var(--color-surface-muted)", border: "1px solid var(--color-border-strong)", color: "var(--color-text-primary)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg"
                style={{ backgroundColor: "var(--color-surface-muted)", border: "1px solid var(--color-border-strong)", color: "var(--color-text-secondary)" }}
              >
                <option value="">— Velg type —</option>
                {Object.entries(caseLinkTypeLabels).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-primary)" }}>Beskrivelse</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg outline-none"
                style={{ backgroundColor: "var(--color-surface-muted)", border: "1px solid var(--color-border-strong)", color: "var(--color-text-primary)" }}
              />
            </div>
          </div>
          {error && <p className="text-xs" style={{ color: "var(--color-error-text)" }}>{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 text-sm font-medium text-white rounded-lg disabled:opacity-60"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {saving ? "Lagrer..." : "Legg til"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(""); }}
              className="px-4 py-1.5 text-sm rounded-lg"
              style={{ border: "1px solid var(--color-border-strong)", color: "var(--color-text-secondary)" }}
            >
              Avbryt
            </button>
          </div>
        </form>
      )}

      {links.length === 0 && !showForm && canManage && (
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Ingen lenker lagt til ennå.
        </p>
      )}
    </div>
  );
}
