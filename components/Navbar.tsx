import Link from "next/link";
import { Briefcase, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

interface NavbarProps {
  session?: {
    user?: {
      role?: string;
    };
  } | null;
}

export function Navbar({ session }: NavbarProps) {
  const isEmployer = session?.user?.role === "employer";
  const isCandidate = session?.user?.role === "candidate";

  const employerDashboardHref = isEmployer ? "/employer" : "/auth/employer/login";
  const candidateDashboardHref = isCandidate ? "/candidate" : "/auth/candidate/login";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#0E103D] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#008DD5] transition-colors">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0E103D]">
            Talentry
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#313638]">
          <Link href="/jobs" className="hover:text-[#008DD5] transition-colors">
            Browse Jobs
          </Link>
          <Link href={candidateDashboardHref} className="hover:text-[#008DD5] transition-colors">
            Candidates
          </Link>
          <Link href={employerDashboardHref} className="hover:text-[#008DD5] transition-colors">
            Employers
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {session ? (
            <Link
              href={isEmployer ? "/employer" : "/candidate"}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0E103D] hover:text-[#008DD5] px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/70 border border-slate-200 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-[#008DD5]" />
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/auth"
              className="text-sm font-medium text-[#313638] hover:text-[#008DD5] px-3 py-2 rounded-lg transition-colors hidden sm:block"
            >
              Sign In
            </Link>
          )}

          <Link href="/jobs">
            <Button variant="primary" size="md">
              <span>Explore Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
