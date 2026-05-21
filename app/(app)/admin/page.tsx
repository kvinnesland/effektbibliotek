import { redirect } from "next/navigation";
import { requireSession } from "@/lib/session";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminPage() {
  const session = await requireSession();
  if (!session.isAdmin) redirect("/bibliotek");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2" style={{ color: "var(--color-text-primary)" }}>
        Admin
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-text-secondary)" }}>
        Administrer brukere og admin-tilgang.
      </p>

      <AdminUsersClient currentEmail={session.userEmail} />
    </div>
  );
}
