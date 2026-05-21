"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm"
      style={{ color: "rgba(255,255,255,0.7)" }}
    >
      Logg ut
    </button>
  );
}
