import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Briefcase, User, Users , UserRoundSearch, Building2} from "lucide-react";
import Link from "next/link";

export default async function EmployerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/employer/login");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black bg-slate-50">
      <div className="h-160 w-280 flex flex-col bg-white shadow-lg p-8 rounded-sm">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className="mt-4">
          <Link href="employer/profile">
            <div className="flex items-center h-12 p-2 w-full hover:bg-slate-50 hover:border-1 hover:border-slate-200 rounded-sm">
              <Building2 />
              <p className="ml-2">Profile</p>
            </div>
          </Link>
          <Link href="/employer/jobs">
            <div className="flex items-center h-12 p-2 w-full hover:bg-slate-50 hover:border-1 hover:border-slate-200 rounded-sm">
              <Briefcase />
              <p className="ml-2">Jobs</p>
            </div>
          </Link>
          <Link href="/employer/candidates">
            <div className="flex items-center h-12 p-2 w-full hover:bg-slate-50 hover:border-1 hover:border-slate-200 rounded-sm">
                <UserRoundSearch/>
                <p className="ml-2">Search Talent</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}