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
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      case "reviewed":
      case "shortlisted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Applications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track the status of your submitted job applications.
          </p>
        </div>
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-sm shrink-0"
        >
          <Briefcase className="w-4 h-4" />
          <span>Browse More Jobs</span>
        </Link>
      </div>

      {userApplications.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F79256] mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No applications yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            You haven't submitted any job applications yet. Find an open position and apply today!
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            Explore Job Openings
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  {app.companyLogoUrl ? (
                    <img
                      src={app.companyLogoUrl}
                      alt={app.companyName}
                      className="w-14 h-14 rounded-xl border border-slate-200 object-contain p-1.5 bg-white shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-lg shrink-0">
                      {app.companyName?.slice(0, 2).toUpperCase() || "JB"}
                    </div>
                  )}

                  <div className="space-y-1">
                    <Link
                      href={`/jobs/${app.jobId}`}
                      className="text-lg font-bold text-slate-900 hover:text-[#F79256] transition-colors"
                    >
                      {app.jobTitle}
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="flex items-center gap-1 font-medium">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {app.companyName}
                      </span>

                      {app.jobLocation && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {app.jobLocation}
                        </span>
                      )}

                      {app.jobType && (
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                          {app.jobType}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                  {getStatusBadge(app.status)}
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : ""}
                  </span>
                </div>
              </div>

              {app.coverLetter && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs text-slate-600 space-y-1">
                  <span className="font-semibold text-slate-700">Submitted Cover Letter:</span>
                  <p className="line-clamp-2 italic">{app.coverLetter}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                {app.resumeUrl ? (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#F79256] hover:underline font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Submitted Resume</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">No resume attached</span>
                )}

                <Link
                  href={`/jobs/${app.jobId}`}
                  className="inline-flex items-center gap-1 text-slate-700 hover:text-[#F79256] font-semibold transition-colors"
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
