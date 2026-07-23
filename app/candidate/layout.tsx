import CandidateSidebar from "@/components/CandidateSidebar";
import { requireCandidate } from "@/lib/auth/session";

export default async function CandidateDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireCandidate()
    return (
        <div className="min-h-screen w-full bg-slate-50 flex">
            <CandidateSidebar />

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
