import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export interface RequiredSession {
  userEmail: string;
  userName: string;
  isAdmin: boolean;
}

export async function requireSession(): Promise<RequiredSession> {
  const session = await getSession();
  if (!session.userEmail) redirect("/login");
  return {
    userEmail: session.userEmail,
    userName: session.userName ?? session.userEmail,
    isAdmin: session.isAdmin ?? false,
  };
}
