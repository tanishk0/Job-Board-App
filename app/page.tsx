import Link from "next/link";
import {
  Building2,
  Search,
  ArrowRight,
  CheckCircle2,
  Users,
  UserCheck,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart2,
  Briefcase,
  FileCheck,
  Layers,
  MapPin,
  DollarSign,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { employerProfiles, jobPostings } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import SearchBar from "@/components/SearchBar";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isEmployer = session?.user?.role === "employer";
  const isCandidate = session?.user?.role === "candidate";

  const employerDashboardHref = isEmployer ? "/employer" : "/auth/employer/login";
  const postJobHref = isEmployer ? "/employer/jobs/new" : "/auth/employer/login";
  const candidateDashboardHref = isCandidate ? "/candidate" : "/auth/candidate/login";

  const verifiedCompanies = await db
    .select({
      id: employerProfiles.id,
      name: employerProfiles.companyName,
      logoUrl: employerProfiles.companyLogoUrl,
    })
    .from(employerProfiles)
    .limit(8);

  const recentJobs = await db
    .select({
      id: jobPostings.id,
      title: jobPostings.title,
      salary: jobPostings.salary,
      jobType: jobPostings.jobType,
      experienceLevel: jobPostings.experienceLevel,
      location: jobPostings.location,
      companyName: employerProfiles.companyName,
      companyLogoUrl: employerProfiles.companyLogoUrl,
    })
    .from(jobPostings)
    .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
    .orderBy(desc(jobPostings.createdAt))
    .limit(3);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Navigation Bar */}
      <Navbar session={session} />

      {/* Main Content Area */}
      <main className="flex-1 space-y-16 sm:space-y-24 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            {/* Eyebrow Badge */}
            <Badge variant="primary" className="py-1 px-3">
              <TrendingUp className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Modern Talent Acquisition Platform</span>
            </Badge>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              Discover Your Next Role or Hire Exceptional Talent
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-[#475569] font-normal leading-relaxed max-w-2xl">
              Talentry connects top engineering, product, and design professionals directly with hiring managers—eliminating friction from job discovery and recruitment pipelines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-6">
                  <Search className="w-4 h-4" />
                  <span>Browse Open Opportunities</span>
                </Button>
              </Link>

              <Link href={postJobHref} className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-6">
                  <Building2 className="w-4 h-4 text-[#475569]" />
                  <span>Post a Job Listing</span>
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs sm:text-sm text-[#64748B] font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Verified Hiring Managers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Direct Application Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                <span>Transparent Compensation</span>
              </div>
            </div>

            {/* Embedded Search Bar */}
            <div className="w-full max-w-3xl pt-6 text-left">
              <SearchBar placeholder="Search job title, skills (e.g. React, Python), or company..." />
            </div>
          </div>
        </section>

        {/* Verified Companies Banner from Database */}
        {verifiedCompanies.length > 0 && (
          <section className="border-y border-[#E2E8F0] bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Hiring partners actively recruiting on Talentry
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                {verifiedCompanies.map((company) => (
                  <Link
                    key={company.id}
                    href={`/jobs?q=${encodeURIComponent(company.name)}`}
                    className="flex items-center gap-2 text-base sm:text-lg font-bold text-[#0F172A] hover:text-[#6366F1] transition-colors"
                  >
                    {company.logoUrl && (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="w-6 h-6 object-contain rounded"
                      />
                    )}
                    <span>{company.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Openings from Database */}
        {recentJobs.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge variant="primary">Latest Opportunities</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight mt-1">
                  Recently Posted Roles
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Verified openings posted directly by hiring teams.
                </p>
              </div>
              <Link href="/jobs">
                <Button variant="ghost" size="sm">
                  <span>Browse All Positions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentJobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="block group">
                  <Card className="h-full flex flex-col justify-between space-y-4 hover:border-[#6366F1]/50 transition-all">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <Badge variant="brand" className="uppercase text-[10px]">
                          {job.jobType || "Full-Time"}
                        </Badge>
                        {job.salary && (
                          <Badge variant="success" className="text-[10px]">
                            {job.salary}
                          </Badge>
                        )}
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#6366F1] transition-colors line-clamp-1">
                          {job.title}
                        </h3>
                        <p className="text-xs text-[#64748B] font-medium mt-0.5">
                          {job.companyName || "Tech Employer"}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#64748B]">
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#6366F1]" />
                            <span>{job.location}</span>
                          </span>
                        )}
                        {job.experienceLevel && (
                          <span className="capitalize">
                            • {job.experienceLevel}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#6366F1]">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* How Talentry Works Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="brand">Streamlined Experience</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              How Talentry Works
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base">
              A transparent 4-step workflow designed to move candidates and hiring teams from application to offer efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Create Profile", desc: "Build your professional candidate profile or verify your employer account in minutes." },
              { step: "02", title: "Explore Roles", desc: "Search structured openings with clear compensation bands, tech stacks, and team details." },
              { step: "03", title: "Direct Connect", desc: "Apply directly or receive candidate recommendations matched by skill benchmarks." },
              { step: "04", title: "Track & Hire", desc: "Follow real-time status updates through stage-by-stage hiring pipelines." },
            ].map((item) => (
              <Card key={item.step} className="space-y-3">
                <div className="text-2xl font-extrabold text-[#6366F1]">{item.step}</div>
                <h3 className="text-base font-semibold text-[#0F172A]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Value Proposition Grid: Candidates vs Employers */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Candidate Box */}
            <Card className="p-8 space-y-6 border-t-4 border-t-[#6366F1]">
              <div className="space-y-2">
                <Badge variant="primary">For Job Seekers</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Empowering Candidate Careers</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Gain complete visibility over your job search. Access salary benchmarks, save opportunities, and track application progress transparently.
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                  <span>Real-time status updates from screening to offer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                  <span>Curated salary benchmarks by role and seniority</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6366F1] shrink-0" />
                  <span>Direct candidate messaging with hiring managers</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href={candidateDashboardHref}>
                  <Button variant="primary" size="md">
                    <span>Explore Candidate Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Employer Box */}
            <Card className="p-8 space-y-6 border-t-4 border-t-[#0F172A]">
              <div className="space-y-2">
                <Badge variant="neutral">For Employers</Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">Accelerating Talent Acquisition</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  Source verified candidates, manage candidate pipelines, and make data-driven hiring decisions with complete team collaboration tools.
                </p>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span>Structured candidate profiles and skill verification tags</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span>Kanban pipeline tracking for active job openings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F172A] shrink-0" />
                  <span>Comprehensive recruitment analytics and view metrics</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href={employerDashboardHref}>
                  <Button variant="secondary" size="md">
                    <span>Employer Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Core Product Features */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Built for Production Hiring
            </h2>
            <p className="text-[#64748B] text-sm sm:text-base">
              Every interface element is crafted for speed, readability, and operational clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">Verified Companies</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                All employer accounts undergo verification to ensure candidates engage only with legitimate job opportunities.
              </p>
            </Card>

            <Card className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] text-[#4F46E5] flex items-center justify-center">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">Compensation Benchmarks</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Access up-to-date market compensation bands across engineering disciplines, experience levels, and locations.
              </p>
            </Card>

            <Card className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">Instant Pipeline Updates</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Automated status changes keep applicants informed, eliminating silent rejections and improving candidate satisfaction.
              </p>
            </Card>
          </div>
        </section>

        {/* Final Conversion CTA Banner */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#0F172A] text-white rounded-2xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Ready to find your next opportunity or top candidate?
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base font-normal">
                Join thousands of tech professionals and hiring managers connected on Talentry.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link href="/jobs" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Browse Open Jobs
                </Button>
              </Link>
              <Link
                href={session ? (isEmployer ? "/employer" : "/candidate") : "/auth"}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent border-[#334155] text-white hover:bg-[#1E293B]"
                >
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
