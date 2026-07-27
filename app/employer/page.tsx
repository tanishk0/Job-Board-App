import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Briefcase, UserRoundSearch, Building2, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default async function EmployerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/employer/login");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-[#0E103D] text-white p-8 rounded-xl border border-[#0E103D] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="primary">
            Employer Portal
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-[#008DD5]">{session.user.name}</span>
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Manage your company profile, publish open position listings, track applicants, and discover qualified candidates.
          </p>
        </div>

        <Link href="/employer/jobs/new">
          <Button variant="primary" size="md" className="shrink-0">
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Button>
        </Link>
      </div>

      {/* Navigation Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Link href="/employer/profile" className="block">
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0E103D]/10 text-[#0E103D] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0E103D] group-hover:text-[#008DD5] transition-colors">
                  Company Profile
                </h2>
                <p className="text-xs text-[#313638]/70 mt-1">
                  Update company details, logo, overview description, and website.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#008DD5] pt-3 border-t border-slate-100">
              <span>Manage Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* My Job Postings Card */}
        <Link href="/employer/jobs" className="block">
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0E103D] group-hover:text-[#008DD5] transition-colors">
                  Job Postings & Applicants
                </h2>
                <p className="text-xs text-[#313638]/70 mt-1">
                  View active job listings, edit positions, and review applicants.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#008DD5] pt-3 border-t border-slate-100">
              <span>View Postings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>

        {/* Search Talent Card */}
        <Link href="/employer/candidates" className="block">
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0E103D]/10 text-[#0E103D] flex items-center justify-center">
                <UserRoundSearch className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#0E103D] group-hover:text-[#008DD5] transition-colors">
                  Search Talent Directory
                </h2>
                <p className="text-xs text-[#313638]/70 mt-1">
                  Browse candidates by skills, experience, and target roles.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#008DD5] pt-3 border-t border-slate-100">
              <span>Search Candidates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}