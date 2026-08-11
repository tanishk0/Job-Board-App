import { requireCandidate } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { applications, jobPostings, employerProfiles } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";
import {
  FileText,
  Briefcase,
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function CandidateApplicationsPage() {
  const session = await requireCandidate();

  const userApplications = await db
    .select({
      id: applications.id,
      status: applications.status,
      resumeUrl: applications.resumeUrl,
      coverLetter: applications.coverLetter,
      appliedAt: applications.appliedAt,
      jobId: jobPostings.id,
      jobTitle: jobPostings.title,
      jobLocation: jobPostings.location,
      jobType: jobPostings.jobType,
      salary: jobPostings.salary,
      companyName: employerProfiles.companyName,
      companyLogoUrl: employerProfiles.companyLogoUrl,
    })
    .from(applications)
    .innerJoin(jobPostings, eq(sql`${applications.jobId}::text`, sql`${jobPostings.id}::text`))
    .innerJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
    .where(eq(applications.candidateId, session.user.id))
    .orderBy(desc(applications.appliedAt));

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
      case "hired":
        return (
          <Badge variant="success">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Accepted</span>
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="danger">
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected</span>
          </Badge>
        );
      case "reviewed":
      case "shortlisted":
      case "interviewing":
        return (
          <Badge variant="primary">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="capitalize">{status}</span>
          </Badge>
        );
      default:
        return (
          <Badge variant="warning">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            My Applications
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Track real-time stage progress across all your submitted applications.
          </p>
        </div>
        <Link href="/jobs">
          <Button variant="primary" size="sm">
            <Briefcase className="w-4 h-4" />
            <span>Browse More Jobs</span>
          </Button>
        </Link>
      </div>

      {userApplications.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No applications submitted yet"
          description="You haven't submitted any job applications yet. Discover verified positions and apply directly today."
          actionLabel="Explore Job Openings"
          actionHref="/jobs"
        />
      ) : (
        <div className="space-y-4">
          {userApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4 hover:border-[#6366F1]/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {app.companyLogoUrl ? (
                    <img
                      src={app.companyLogoUrl}
                      alt={app.companyName}
                      className="w-12 h-12 rounded-lg border border-[#E2E8F0] object-contain p-1 bg-white shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg border border-[#E2E8F0] bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold text-sm shrink-0">
                      {app.companyName?.slice(0, 2).toUpperCase() || "TL"}
                    </div>
                  )}

                  <div className="space-y-1">
                    <Link
                      href={`/jobs/${app.jobId}`}
                      className="text-base font-semibold text-[#0F172A] hover:text-[#6366F1] transition-colors"
                    >
                      {app.jobTitle}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1 font-medium text-[#0F172A]">
                        <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                        {app.companyName}
                      </span>

                      {app.jobLocation && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                          {app.jobLocation}
                        </span>
                      )}

                      {app.jobType && (
                        <Badge variant="neutral" className="text-[10px]">
                          {app.jobType}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                  {getStatusBadge(app.status)}
                  <span className="flex items-center gap-1 text-[11px] text-[#94A3B8]">
                    <Calendar className="w-3.5 h-3.5" />
                    Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : ""}
                  </span>
                </div>
              </div>

              {app.coverLetter && (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs text-[#0F172A] space-y-1">
                  <span className="font-semibold text-[#0F172A]">Submitted Note:</span>
                  <p className="line-clamp-2 italic text-[#64748B]">{app.coverLetter}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] text-xs text-[#64748B]">
                {app.resumeUrl ? (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#6366F1] hover:underline font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Submitted Resume</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-[#94A3B8]">No resume attached</span>
                )}

                <Link
                  href={`/jobs/${app.jobId}`}
                  className="inline-flex items-center gap-1 text-[#0F172A] hover:text-[#6366F1] font-semibold transition-colors"
                >
                  View Job Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
