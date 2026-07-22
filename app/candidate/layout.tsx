import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CandidateDashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/candidate/login");
    }

    return(
        <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center">
            {children}
        </div>
    )
}