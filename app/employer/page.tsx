import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Briefcase, UserRoundSearch, Building2, PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function EmployerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/employer/login");
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-zinc-900 to-slate-900 text-white p-8 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-zinc-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F79256]/20 text-[#F79256] text-xs font-semibold uppercase tracking-wider mb-3">
            Employer Portal
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, <span className="text-[#F79256]">{session.user.name}</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Manage your company profile, publish new job opportunities, and search through candidate profiles.
          </p>
        </div>

        <Link
          href="/employer/jobs/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm shadow-md transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Navigation Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Link
          href="/employer/profile"
          className="bg-white border border-slate-200 hover:border-[#F79256]/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#F79256]/10 text-[#F79256] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#F79256] transition-colors">
                Company Profile
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Update your company details, logo, description, and contact information.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#F79256] pt-4 mt-4 border-t border-slate-100">
            <span>Manage Profile</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* My Job Postings Card */}
        <Link
          href="/employer/jobs"
          className="bg-white border border-slate-200 hover:border-[#F79256]/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                My Job Postings
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                View your active job listings, edit details, and review candidate applicants.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 pt-4 mt-4 border-t border-slate-100">
            <span>View Job Listings</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Search Talent Card */}
        <Link
          href="/employer/candidates"
          className="bg-white border border-slate-200 hover:border-[#F79256]/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <UserRoundSearch className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Search Talent
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Browse candidate profiles, filter by experience level & roles, and reach out directly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-4 mt-4 border-t border-slate-100">
            <span>Search Candidates</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}