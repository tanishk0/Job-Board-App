import { getJobs } from "./action";
import JobCard from "./JobCard";
import Link from "next/link";
import { Briefcase, Sparkles, ArrowLeft, Search } from "lucide-react";

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 selection:bg-[#F79256]/20 selection:text-[#F79256]">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F79256] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Job<span className="text-[#F79256]">Board</span>
            </span>
          </Link>

          <Link
            href="/candidate/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#F79256] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F79256]/10 text-[#F79256] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Job Openings</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore Opportunities
              </h1>
              <p className="text-sm text-slate-500">
                Discover positions matched with leading top employers.
              </p>
            </div>

            <div className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shrink-0 self-start sm:self-center">
              {jobs.length} Open Position{jobs.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {jobs.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F79256] mx-auto flex items-center justify-center">
              <Briefcase className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">No jobs posted yet</h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              There are currently no active job listings. Please check back later!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id} className="block">
                <JobCard job={job} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
