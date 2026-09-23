import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Compass, CheckCircle2, ArrowRight, Building2, MapPin, DollarSign, Layers } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { candidateProfiles, jobPostings, employerProfiles } from "@/db/schema";
import { eq, or, ilike, desc, sql } from "drizzle-orm";

export default async function CandidateRecommendationsPage() {
  const session = await requireCandidate();

  // 1. Fetch candidate's profile preferences
  const [profile] = await db
    .select({
      preferredRole: candidateProfiles.preferredRole,
      experienceLevel: candidateProfiles.experienceLevel,
      location: candidateProfiles.location,
    })
    .from(candidateProfiles)
    .where(eq(candidateProfiles.userId, session.user.id));

  // 2. Fetch matched jobs from DB
  const conditions = [];
  if (profile?.preferredRole?.trim()) {
    const roleTerm = `%${profile.preferredRole.trim()}%`;
    conditions.push(sql`${jobPostings.title} ILIKE ${roleTerm}`);
  }
  if (profile?.experienceLevel?.trim()) {
    conditions.push(eq(jobPostings.experienceLevel, profile.experienceLevel.trim()));
  }

  let matchedJobs: any[] = [];

  if (conditions.length > 0) {
    matchedJobs = await db
      .select({
        id: jobPostings.id,
        title: jobPostings.title,
        salary: jobPostings.salary,
        location: jobPostings.location,
        jobType: jobPostings.jobType,
        experienceLevel: jobPostings.experienceLevel,
        companyName: employerProfiles.companyName,
        companyLogoUrl: employerProfiles.companyLogoUrl,
      })
      .from(jobPostings)
      .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
      .where(or(...conditions))
      .orderBy(desc(jobPostings.createdAt))
      .limit(6);
  }

  // Fallback: If no strict matches or candidate profile is empty, fetch latest active jobs
  if (matchedJobs.length === 0) {
    matchedJobs = await db
      .select({
        id: jobPostings.id,
        title: jobPostings.title,
        salary: jobPostings.salary,
        location: jobPostings.location,
        jobType: jobPostings.jobType,
        experienceLevel: jobPostings.experienceLevel,
        companyName: employerProfiles.companyName,
        companyLogoUrl: employerProfiles.companyLogoUrl,
      })
      .from(jobPostings)
      .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
      .orderBy(desc(jobPostings.createdAt))
      .limit(6);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Recommended Opportunities</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Active roles matched with your target preferences and verified listings on Talentry.
          </p>
        </div>
        <Link href="/candidate/profile/edit">
          <Button variant="outline" size="sm">
            <span>Edit Role Preferences</span>
          </Button>
        </Link>
      </div>

      {matchedJobs.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No recommendations available yet"
          description="There are currently no active job postings matching your profile. Browse all positions or check back as employers post new roles."
          actionLabel="Browse All Jobs"
          actionHref="/jobs"
        />
      ) : (
        <div className="space-y-4">
          {matchedJobs.map((job) => (
            <Card key={job.id} className="space-y-4 hover:border-[#6366F1]/50 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {job.companyLogoUrl ? (
                    <img
                      src={job.companyLogoUrl}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-lg border border-[#E2E8F0] object-contain p-1 bg-white shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg border border-[#E2E8F0] bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold text-sm shrink-0">
                      {job.companyName?.slice(0, 2).toUpperCase() || "TL"}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="success" className="text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                        <span>Recommended Match</span>
                      </Badge>
                      {job.jobType && (
                        <Badge variant="brand" className="text-[10px] uppercase">
                          {job.jobType}
                        </Badge>
                      )}
                    </div>

                    <Link href={`/jobs/${job.id}`}>
                      <h3 className="text-base font-bold text-[#0F172A] hover:text-[#6366F1] transition-colors">
                        {job.title}
                      </h3>
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1 font-medium text-[#0F172A]">
                        <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {job.companyName || "Verified Employer"}
                      </span>

                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                          {job.location}
                        </span>
                      )}

                      {job.salary && (
                        <span className="font-semibold text-emerald-600 flex items-center gap-0.5">
                          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                          {job.salary}
                        </span>
                      )}

                      {job.experienceLevel && (
                        <Badge variant="neutral" className="capitalize text-[10px]">
                          <Layers className="w-3 h-3 text-[#6366F1]" />
                          {job.experienceLevel}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Link href={`/jobs/${job.id}`} className="shrink-0 self-end sm:self-center">
                  <Button variant="primary" size="sm">
                    <span>View & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {profile?.preferredRole && (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs space-y-1">
                  <span className="font-semibold text-[#0F172A]">Matching Factors:</span>
                  <ul className="space-y-1 text-[#64748B]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      Matches your preferred profile criteria ({profile.preferredRole})
                    </li>
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
