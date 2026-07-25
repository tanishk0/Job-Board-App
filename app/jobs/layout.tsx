import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CandidateSidebar from "@/components/CandidateSidebar";
import EmployerSidebar from "@/components/EmployerSidebar";
import GuestSidebar from "@/components/GuestSidebar";

export default async function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen w-full bg-slate-50 flex">
      {session?.user?.role === "employer" ? (
        <EmployerSidebar />
      ) : session?.user?.role === "candidate" ? (
        <CandidateSidebar />
      ) : (
        <GuestSidebar />
      )}

      <main className="flex-1 overflow-x-hidden min-w-0">
        {children}
      </main>
    </div>
  );
}
