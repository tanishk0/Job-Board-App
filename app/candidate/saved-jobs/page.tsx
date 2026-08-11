import { requireCandidate } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { savedJobs, jobPostings, employerProfiles } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import { toggleSaveJob } from "../saved/actions";
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
import { EmptyState } from "@/components/ui/EmptyState";

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Saved Jobs
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Bookmarked positions saved for review or quick application.
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
        <EmptyState
          icon={Bookmark}
          title="No saved jobs yet"
          description="Click the bookmark icon on any job listing to add it to your saved jobs list for quick access."
          actionLabel="Explore Positions"
          actionHref="/jobs"
        />
      ) : (
        <div className="space-y-3">
          {userSavedJobs.map((item) => (
            <div
              key={item.savedId}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-[#6366F1]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              {/* Left Column */}
              <div className="flex items-start gap-4 flex-1">
                {item.companyLogoUrl ? (
                  <img
                    src={item.companyLogoUrl}
                    alt={item.companyName}
                    className="w-12 h-12 rounded-lg border border-[#E2E8F0] object-contain p-1 bg-white shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg border border-[#E2E8F0] bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold text-sm shrink-0">
                    {item.companyName?.slice(0, 2).toUpperCase() || "TL"}
                  </div>
                )}

                <div className="space-y-1">
                  <Link
                    href={`/jobs/${item.jobId}`}
                    className="text-base font-semibold text-[#0F172A] hover:text-[#6366F1] transition-colors line-clamp-1"
                  >
                    {item.title}
                  </Link>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1 font-medium text-[#0F172A]">
                      <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                      {item.companyName}
                    </span>

                    {item.location && (
                      <Badge variant="neutral">
                        <MapPin className="w-3 h-3 text-[#6366F1]" />
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

              {/* Right Column Actions */}
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
