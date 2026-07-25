import { requireCandidate } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { savedJobs, jobPostings, employerProfiles } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import { toggleSaveJob } from "./actions";
import {
  Bookmark,
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Trash2,
  ExternalLink,
  Heart,
} from "lucide-react";

export default async function SavedJobsPage() {
  const session = await requireCandidate();

  const userSavedJobs = await db
    .select({
      savedId: savedJobs.id,
      jobId: jobPostings.id,
      savedAt: savedJobs.savedAt,
      title: jobPostings.title,
      description: jobPostings.description,
      location: jobPostings.location,
      jobType: jobPostings.jobType,
      salary: jobPostings.salary,
      experienceLevel: jobPostings.experienceLevel,
      companyName: employerProfiles.companyName,
      companyLogoUrl: employerProfiles.companyLogoUrl,
    })
    .from(savedJobs)
    .innerJoin(
      jobPostings,
      eq(sql`${savedJobs.jobId}::text`, sql`${jobPostings.id}::text`)
    )
    .innerJoin(
      employerProfiles,
      eq(jobPostings.employerId, employerProfiles.userId)
    )
    .where(eq(savedJobs.userId, session.user.id))
    .orderBy(desc(savedJobs.savedAt));

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Jobs you have bookmarked to apply or review later.
          </p>
        </div>
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-sm shrink-0"
        >
          <Briefcase className="w-4 h-4" />
          <span>Browse Jobs</span>
        </Link>
      </div>

      {userSavedJobs.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F79256] mx-auto flex items-center justify-center">
            <Bookmark className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No saved jobs yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Click the "Save Job" button on any job listing to add it to your saved jobs list.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            Explore Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userSavedJobs.map((item) => (
            <div
              key={item.savedId}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              {/* Left Column: Company logo + Info */}
              <div className="flex items-start gap-4 flex-1">
                {item.companyLogoUrl ? (
                  <img
                    src={item.companyLogoUrl}
                    alt={item.companyName}
                    className="w-14 h-14 rounded-xl border border-slate-200 object-contain p-1.5 bg-white shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-lg shrink-0">
                    {item.companyName?.slice(0, 2).toUpperCase() || "JB"}
                  </div>
                )}

                <div className="space-y-1.5">
                  <Link
                    href={`/jobs/${item.jobId}`}
                    className="text-lg font-bold text-slate-900 hover:text-[#F79256] transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {item.companyName}
                    </span>

                    {item.location && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-4 h-4 text-[#F79256]" />
                        {item.location}
                      </span>
                    )}

                    {item.salary && (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-xs">
                        <DollarSign className="w-3.5 h-3.5" />
                        {item.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <form action={toggleSaveJob}>
                  <input type="hidden" name="jobId" value={item.jobId} />
                  <input type="hidden" name="isSaved" value="true" />
                  <button
                    type="submit"
                    title="Remove from saved"
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 font-semibold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </form>

                <Link
                  href={`/jobs/${item.jobId}`}
                  className="px-5 py-2 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 shadow-xs"
                >
                  <span>View Job</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
