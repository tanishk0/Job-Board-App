import EmployerSidebar from "@/components/EmployerSidebar";
import { requireEmployer } from "@/lib/auth/session";

export default async function EmployerDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await requireEmployer();
    
    return (
        <div className="min-h-screen w-full bg-slate-50 flex text-[#313638]">
            <EmployerSidebar />

            <main className="flex-1 p-6 lg:p-8 max-w-7xl">
                {children}
            </main>
        </div>
    );
}