import EmployerSidebar from "@/components/EmployerSidebar";
import { requireEmployer } from "@/lib/auth/session";

export default async function EmployerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireEmployer()
    
    return (
        <div className="min-h-screen w-full bg-slate-50 flex">
            <EmployerSidebar />

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}