import { getJobs } from "./action";
import JobCard from "./JobCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { Briefcase, Layers, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Top Header / Navigation Bar */}
      <Navbar session={session} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Header Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="primary">
                <Layers className="w-3.5 h-3.5" />
                <span>Verified Opportunities</span>
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                Explore Tech Roles
              </h1>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Discover verified positions matched with leading hiring managers and companies.
              </p>
            </div>

            <div className="px-3.5 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#0F172A] shrink-0 self-start sm:self-center">
              {jobs.length} Position{jobs.length === 1 ? "" : "s"} Found
            </div>
          </div>

          {/* Search Bar & Filters */}
          <SearchBar />
        </div>

        {/* Active Search Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#0F172A] px-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-[#64748B]">Showing results for:</span>
              {q && <Badge variant="neutral">Keyword: "{q}"</Badge>}
              {location && <Badge variant="neutral">Location: "{location}"</Badge>}
              {minSalary && Number(minSalary) > 0 && (
                <Badge variant="success">Min Salary: ₹{minSalary} LPA+</Badge>
              )}
              {experienceLevel && <Badge variant="primary">Exp: {experienceLevel}</Badge>}
              {jobType && <Badge variant="brand">Type: {jobType}</Badge>}
            </div>

            <Link href="/jobs" className="text-xs font-semibold text-[#6366F1] hover:underline">
              Reset Filters
            </Link>
          </div>
        )}

        {/* Jobs List / Empty State */}
        {jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No matching opportunities found"
            description="We couldn't find any job listings matching your search criteria. Try adjusting your query or resetting filters."
            actionLabel="Reset Search Filters"
            actionHref="/jobs"
          />
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
