import Link from "next/link";
import { Briefcase } from "lucide-react";

interface FooterProps {
  candidateDashboardHref?: string;
  employerDashboardHref?: string;
}

export function Footer({
  candidateDashboardHref = "/auth/candidate/login",
  employerDashboardHref = "/auth/employer/login",
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#313638]/80 font-medium">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#0E103D] text-white flex items-center justify-center font-bold text-xs">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-[#0E103D]">Talentry</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/jobs" className="hover:text-[#008DD5] transition-colors">
            Jobs
          </Link>
          <Link href={candidateDashboardHref} className="hover:text-[#008DD5] transition-colors">
            Candidate
          </Link>
          <Link href={employerDashboardHref} className="hover:text-[#008DD5] transition-colors">
            Employer
          </Link>
        </div>

        <p>© {new Date().getFullYear()} Talentry. All rights reserved.</p>
      </div>
    </footer>
  );
}
