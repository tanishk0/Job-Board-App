import { getJobs } from "./action";
import JobCard from "./JobCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { Briefcase, Sparkles, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    location?: string;
    minSalary?: string;
    experienceLevel?: string;
    jobType?: string;
  }>;
}) {
  const { q, location, minSalary, experienceLevel, jobType } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const dashboardHref =
    session?.user?.role === "employer"
      ? "/employer"
      : session?.user?.role === "candidate"
      ? "/candidate"
      : "/";

  const dashboardLabel =
    session?.user?.role === "employer"
      ? "Employer Dashboard"
      : session?.user?.role === "candidate"
      ? "Candidate Dashboard"
      : "Home";

  const jobs = await getJobs({
    q,
    location,
    minSalary,
    experienceLevel,
    jobType,
  });

  const hasActiveFilters = Boolean(
    q || location || (minSalary && Number(minSalary) > 0) || experienceLevel || jobType
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#313638] font-sans selection:bg-[#008DD5]/10 selection:text-[#008DD5]">
      {/* Top Header / Navigation Bar */}
      <Navbar session={session} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Job Openings</span>
              </Badge>
              <h1 className="text-3xl font-bold text-[#0E103D] tracking-tight">
                Explore Opportunities
              </h1>
              <p className="text-sm text-[#313638]/70">
                Discover positions matched with top hiring teams and employers.
              </p>
            </div>

            <div className="px-3.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-[#0E103D] shrink-0 self-start sm:self-center">
              {jobs.length} Position{jobs.length === 1 ? "" : "s"} Found
            </div>
          </div>

          {/* Search Bar & Filters */}
          <SearchBar />
        </div>

        {/* Active Search Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#313638] px-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Showing results for:</span>
              {q && (
                <Badge variant="neutral">
                  Keyword: "{q}"
                </Badge>
              )}
              {location && (
                <Badge variant="neutral">
                  Location: "{location}"
                </Badge>
              )}
              {minSalary && Number(minSalary) > 0 && (
                <Badge variant="success">
                  Min Salary: ₹{minSalary} LPA+
                </Badge>
              )}
              {experienceLevel && (
                <Badge variant="primary">
                  Exp: {experienceLevel}
                </Badge>
              )}
              {jobType && (
                <Badge variant="brand">
                  Type: {jobType}
                </Badge>
              )}
            </div>

            <Link href="/jobs" className="text-xs font-semibold text-[#008DD5] hover:underline">
              Reset Filters
            </Link>
          </div>
        )}

        {/* Jobs List / Empty State */}
        {jobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0E103D] mx-auto flex items-center justify-center border border-slate-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#0E103D]">No matching jobs found</h2>
            <p className="text-sm text-[#313638]/70 max-w-md mx-auto">
              We couldn't find any job listings matching your search criteria. Try adjusting your query or resetting filters.
            </p>
            {hasActiveFilters && (
              <Link href="/jobs" className="inline-block pt-2">
                <Button variant="primary" size="sm">
                  Clear Search Filters
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                <JobCard job={job} />
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
