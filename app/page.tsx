import Link from "next/link";
import { Building2, Search, ArrowRight, CheckCircle2, Users, Sparkles, UserCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isEmployer = session?.user?.role === "employer";
  const isCandidate = session?.user?.role === "candidate";

  const employerDashboardHref = isEmployer ? "/employer" : "/auth/employer/login";
  const postJobHref = isEmployer ? "/employer/jobs/new" : "/auth/employer/login";
  const candidateDashboardHref = isCandidate ? "/candidate" : "/auth/candidate/login";

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#313638] font-sans selection:bg-[#008DD5]/10 selection:text-[#008DD5]">
      {/* Top Navigation Bar */}
      <Navbar session={session} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
            {/* Pill Badge */}
            <Badge variant="primary">
              <Sparkles className="w-3.5 h-3.5 text-[#008DD5]" />
              <span>Connecting Talent with Top Opportunities</span>
            </Badge>

            {/* Main Page Title */}
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0E103D] leading-tight">
              Find Your Next Role or Hire Top Tech Talent
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#313638]/80 font-normal leading-relaxed max-w-2xl">
              Discover verified opportunities across engineering, product, design, and marketing—or post open listings to connect directly with active candidates.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  <Search className="w-4 h-4" />
                  <span>Browse All Jobs</span>
                </Button>
              </Link>

              <Link href={postJobHref} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Building2 className="w-4 h-4 text-[#313638]/70" />
                  <span>Post a Job</span>
                </Button>
              </Link>
            </div>

            {/* Enterprise Trust Highlights */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs sm:text-sm text-[#313638]/70 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#008DD5]" />
                <span>Verified Employers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#008DD5]" />
                <span>Direct Applications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#008DD5]" />
                <span>Streamlined Hiring Pipeline</span>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-12 sm:py-16 bg-slate-50/60 border-y border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#0E103D]">
                Built for Both Job Seekers & Hiring Teams
              </h2>
              <p className="text-[#313638]/80 text-sm sm:text-base">
                Everything you need to navigate your job search or manage open postings efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1: Candidate Portal */}
              <Card className="hover:border-[#008DD5]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center font-medium">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0E103D]">For Candidates</h3>
                  <p className="text-[#313638]/80 text-sm leading-relaxed">
                    Browse structured job cards complete with salary ranges, experience levels, and direct company profile insights.
                  </p>
                </div>
                <Link
                  href={candidateDashboardHref}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#008DD5] hover:underline transition-colors pt-2"
                >
                  Candidate Portal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>

              {/* Feature 2: Employer Dashboard */}
              <Card className="hover:border-[#008DD5]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0E103D]/10 text-[#0E103D] flex items-center justify-center font-medium">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0E103D]">For Employers</h3>
                  <p className="text-[#313638]/80 text-sm leading-relaxed">
                    Manage company profiles, post job descriptions, track applicants, and discover qualified candidates easily.
                  </p>
                </div>
                <Link
                  href={employerDashboardHref}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#008DD5] hover:underline transition-colors pt-2"
                >
                  Employer Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>

              {/* Feature 3: Streamlined Workflow */}
              <Card className="hover:border-[#008DD5]/40 transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center font-medium">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0E103D]">Streamlined Workflow</h3>
                  <p className="text-[#313638]/80 text-sm leading-relaxed">
                    Experience a clean interface designed to minimize friction for both job applications and active postings.
                  </p>
                </div>
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#008DD5] hover:underline transition-colors pt-2"
                >
                  Explore Listings
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Action Banner */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#0E103D] text-white rounded-xl p-8 sm:p-10 border border-[#0E103D] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Ready to find your next opportunity?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-normal">
                Join our platform today and connect with employers hiring for immediate openings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                  Search Jobs
                </Button>
              </Link>
              <Link
                href={session ? (isEmployer ? "/employer" : "/candidate") : "/auth"}
                className="w-full sm:w-auto"
              >
                <Button variant="ghost" size="md" className="w-full sm:w-auto text-slate-200 border border-slate-700 hover:bg-[#008DD5]/20 hover:text-white">
                  {session ? "Go to Dashboard" : "Create Account"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        candidateDashboardHref={candidateDashboardHref}
        employerDashboardHref={employerDashboardHref}
      />
    </div>
  );
}
