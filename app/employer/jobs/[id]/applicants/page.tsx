import { requireEmployer } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { applications, jobPostings, candidateProfiles } from "@/db/schema";
import { user } from "@/auth-schema";
import { eq, and, desc } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateApplicationStatus } from "./actions";
import {
  ArrowLeft,
  Users,
  Briefcase,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Code,
  Globe,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default async function EmployerApplicantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireEmployer();
  const { id } = await params;

  // Fetch job and verify ownership
  const [job] = await db
    .select()
    .from(jobPostings)
    .where(
      and(
        eq(jobPostings.id, id),
        eq(jobPostings.employerId, session.user.id)
      )
    );

  if (!job) {
    notFound();
  }

  // Fetch applicants
  const applicantsList = await db
    .select({
      id: applications.id,
      status: applications.status,
      resumeUrl: applications.resumeUrl,
      coverLetter: applications.coverLetter,
      appliedAt: applications.appliedAt,
      candidateId: applications.candidateId,
      candidateName: user.name,
      candidateEmail: user.email,
      candidateImage: user.image,
      headline: candidateProfiles.headline,
      phone: candidateProfiles.phone,
      location: candidateProfiles.location,
      githubUrl: candidateProfiles.githubUrl,
      portfolioUrl: candidateProfiles.portfolioUrl,
      experienceLevel: candidateProfiles.experienceLevel,
    })
    .from(applications)
    .innerJoin(user, eq(applications.candidateId, user.id))
    .leftJoin(candidateProfiles, eq(applications.candidateId, candidateProfiles.userId))
    .where(eq(applications.jobId, id))
    .orderBy(desc(applications.appliedAt));

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Navigation header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <Link
            href="/employer/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Jobs</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Applicants for {job.title}
          </h1>
          <p className="text-sm text-slate-500">
            {applicantsList.length} candidate{applicantsList.length === 1 ? "" : "s"} applied for this position
          </p>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all shrink-0"
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>View Public Job Listing</span>
        </Link>
      </div>

      {/* Applicants List */}
      {applicantsList.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 text-[#F79256] mx-auto flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No applicants yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            No candidates have submitted applications for this job post yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {applicantsList.map((applicant) => (
            <div
              key={applicant.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              {/* Top Row: Candidate Header + Status Form */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  {applicant.candidateImage ? (
                    <img
                      src={applicant.candidateImage}
                      alt={applicant.candidateName}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white font-bold text-xl flex items-center justify-center shadow-xs shrink-0">
                      {applicant.candidateName?.slice(0, 2).toUpperCase() || "CN"}
                    </div>
                  )}

                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      {applicant.candidateName}
                      {applicant.experienceLevel && (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          {applicant.experienceLevel}
                        </span>
                      )}
                    </h2>

                    {applicant.headline && (
                      <p className="text-sm font-medium text-slate-700">{applicant.headline}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {applicant.candidateEmail}
                      </span>

                      {applicant.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {applicant.phone}
                        </span>
                      )}

                      {applicant.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {applicant.location}
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        Applied {applicant.appliedAt ? new Date(applicant.appliedAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status selector form */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Status:</span>
                  <form action={updateApplicationStatus} className="flex items-center gap-2">
                    <input type="hidden" name="applicationId" value={applicant.id} />
                    <input type="hidden" name="jobId" value={job.id} />
                    <select
                      name="status"
                      defaultValue={applicant.status}
                      className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F79256]"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#F79256] hover:bg-[#e07e42] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>

              {/* Middle Section: Cover Letter & Details */}
              {applicant.coverLetter ? (
                <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-5 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#F79256]" />
                    Cover Letter
                  </span>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {applicant.coverLetter}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No cover letter provided by applicant.</p>
              )}

              {/* Bottom Actions Row: Resume & Candidate Links */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  {applicant.resumeUrl ? (
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-xs rounded-xl shadow-xs transition-all"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Resume</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No resume attached</span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  {applicant.githubUrl && (
                    <a
                      href={applicant.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                    >
                      <Code className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {applicant.portfolioUrl && (
                    <a
                      href={applicant.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                    >
                      <Globe className="w-4 h-4 text-[#F79256]" />
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
