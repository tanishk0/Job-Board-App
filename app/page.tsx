import Link from "next/link";
import { Briefcase, Building2, Search, ArrowRight, CheckCircle2, Users, Sparkles, UserCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#F79256]/20 selection:text-[#F79256]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[#F79256] text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-[#e07e42] transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Talen<span className="text-[#F79256]">try</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="/jobs" className="hover:text-[#F79256] transition-colors">
              Browse Jobs
            </Link>
            <Link href="/candidate" className="hover:text-[#F79256] transition-colors">
              Candidates
            </Link>
            <Link href="/employer/jobs" className="hover:text-[#F79256] transition-colors">
              Employers
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/candidate/login"
              className="text-sm font-medium text-slate-700 hover:text-[#F79256] px-3 py-2 rounded-lg transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link
              href="/jobs"
              className="px-4 py-2 bg-[#F79256] hover:bg-[#e07e42] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5"
            >
              Explore Jobs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F79256]/10 border border-[#F79256]/20 text-[#F79256] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Connecting Talent with Top Opportunities</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Find Your Next Role or Hire <span className="text-[#F79256]">Top Tech Talent</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Discover opportunities across engineering, product, design, and marketing—or post your open listings to reach active job seekers.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F79256] hover:bg-[#e07e42] text-white text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Browse All Jobs</span>
              </Link>

              <Link
                href="/employer/jobs"
                className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-300 hover:border-[#F79256] text-slate-700 hover:text-[#F79256] text-base font-semibold rounded-xl shadow-xs hover:shadow-sm transition-all inline-flex items-center justify-center gap-2"
              >
                <Building2 className="w-5 h-5 text-[#F79256]" />
                <span>Post a Job</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-6 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Verified Employers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Direct Applications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Fast Hiring Pipeline</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="py-16 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Built for Both Job Seekers & Hiring Teams
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Everything you need to navigate your job search or manage open postings efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F79256]/50 shadow-xs hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F79256]/10 text-[#F79256] flex items-center justify-center font-bold">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">For Candidates</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Browse structured job cards complete with salary ranges, experience levels, and direct company profile insights.
                </p>
                <Link
                  href="/candidate"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F79256] hover:text-[#e07e42] pt-2"
                >
                  Candidate Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 2 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F79256]/50 shadow-xs hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F79256]/10 text-[#F79256] flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">For Employers</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Manage company profiles, post job descriptions, track applicants, and discover qualified candidates easily.
                </p>
                <Link
                  href="/employer/jobs"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F79256] hover:text-[#e07e42] pt-2"
                >
                  Employer Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 3 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#F79256]/50 shadow-xs hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#F79256]/10 text-[#F79256] flex items-center justify-center font-bold">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Streamlined Workflow</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Experience a clean interface designed to minimize friction for both job applications and active postings.
                </p>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F79256] hover:text-[#e07e42] pt-2"
                >
                  Explore Listings
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ready to find your next opportunity?
              </h2>
              <p className="text-slate-300 text-base font-normal">
                Join our platform today and connect with employers hiring for immediate openings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F79256] hover:bg-[#e07e42] text-white text-sm font-semibold rounded-xl shadow-md transition-all text-center"
              >
                Search Jobs
              </Link>
              <Link
                href="/auth/candidate/signup"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-sm font-semibold rounded-xl transition-all text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#F79256] text-white flex items-center justify-center font-bold text-xs">
              <Briefcase className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold text-slate-900">Talentry</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/jobs" className="hover:text-[#F79256] transition-colors">Jobs</Link>
            <Link href="/candidate" className="hover:text-[#F79256] transition-colors">Candidate</Link>
            <Link href="/employer/jobs" className="hover:text-[#F79256] transition-colors">Employer</Link>
          </div>

          <p>© {new Date().getFullYear()} Talentry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

