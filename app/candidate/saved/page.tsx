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
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0E103D] tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-xs sm:text-sm text-[#313638]/70 mt-1">
            Jobs you have bookmarked to apply or review later.
          </p>
        </div>
        <Link href="/jobs">
          <Button variant="primary" size="sm">
            <Briefcase className="w-4 h-4" />
            <span>Browse Jobs</span>
          </Button>
        </Link>
      </div>

      {userSavedJobs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0E103D] mx-auto flex items-center justify-center border border-slate-200">
            <Bookmark className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#0E103D]">No saved jobs yet</h2>
          <p className="text-xs text-[#313638]/70 max-w-md mx-auto">
            Click the "Save Job" button on any job listing to add it to your saved jobs list.
          </p>
          <Link href="/jobs">
            <Button variant="primary" size="md">
              Explore Jobs
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {userSavedJobs.map((item) => (
            <div
              key={item.savedId}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs hover:border-[#008DD5]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              {/* Left Column: Company logo + Info */}
              <div className="flex items-start gap-4 flex-1">
                {item.companyLogoUrl ? (
                  <img
                    src={item.companyLogoUrl}
                    alt={item.companyName}
                    className="w-12 h-12 rounded-lg border border-slate-200 object-contain p-1 bg-white shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg border border-slate-200 bg-[#0E103D]/5 text-[#0E103D] flex items-center justify-center font-bold text-sm shrink-0">
                    {item.companyName?.slice(0, 2).toUpperCase() || "JB"}
                  </div>
                )}

                <div className="space-y-1">
                  <Link
                    href={`/jobs/${item.jobId}`}
                    className="text-base font-semibold text-[#0E103D] hover:text-[#008DD5] transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#313638]">
                    <span className="flex items-center gap-1 font-medium text-[#313638]">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {item.companyName}
                    </span>

                    {item.location && (
                      <Badge variant="neutral">
                        <MapPin className="w-3 h-3 text-[#008DD5]" />
                        {item.location}
                      </Badge>
                    )}

                    {item.salary && (
                      <Badge variant="success">
                        <DollarSign className="w-3 h-3 text-emerald-600" />
                        {item.salary}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <form action={toggleSaveJob}>
                  <input type="hidden" name="jobId" value={item.jobId} />
                  <input type="hidden" name="isSaved" value="true" />
                  <Button type="submit" variant="danger" size="sm">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </Button>
                </form>

                <Link href={`/jobs/${item.jobId}`}>
                  <Button variant="primary" size="sm">
                    <span>View Job</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
