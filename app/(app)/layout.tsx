import { requireSession } from "@/lib/session";
import Topbar from "@/components/layout/Topbar";
import SideNav from "@/components/layout/SideNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <div>
      <Topbar userName={session.userName} />
      <SideNav />
      <main
        className="min-h-screen"
        style={{ paddingTop: "56px", paddingLeft: "224px" }}
      >
        <div className="px-8 py-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
