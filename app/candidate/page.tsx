import Link from "next/link";
import { UserCircle, Briefcase, FileText, Bookmark, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default async function CandidateDashboardPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0E103D] tracking-tight">Candidate Overview</h1>
        <p className="text-[#313638]/70 text-sm mt-1">Welcome back! Manage your candidate profile and active job applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <Link href="/candidate/profile" className="block">
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center">
                <UserCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-[#0E103D] group-hover:text-[#008DD5] transition-colors">Profile & Resume</h2>
                <p className="text-xs text-[#313638]/70 mt-1">View and edit your resume, bio, and skills</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#008DD5] inline-flex items-center gap-1">
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Card>
        </Link>

        <Link href="/jobs" className="block">
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0E103D]/10 text-[#0E103D] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-[#0E103D] group-hover:text-[#008DD5] transition-colors">Browse Jobs</h2>
                <p className="text-xs text-[#313638]/70 mt-1">Search and filter active position listings</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#008DD5] inline-flex items-center gap-1">
              <span>Explore Listings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Card>
        </Link>

        <Link href="/candidate/applications" className="block">
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-[#0E103D] group-hover:text-[#008DD5] transition-colors">My Applications</h2>
                <p className="text-xs text-[#313638]/70 mt-1">Track application status and responses</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#008DD5] inline-flex items-center gap-1">
              <span>Track Status</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Card>
        </Link>
      </div>
    </div>
  );
}