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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#313638]/70 hover:text-[#008DD5] transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Jobs</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0E103D] tracking-tight">
            Applicants for {job.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#313638]/70">
            {applicantsList.length} candidate{applicantsList.length === 1 ? "" : "s"} applied for this position
          </p>
        </div>

        <Link href={`/jobs/${job.id}`}>
          <Button variant="outline" size="sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>View Listing</span>
          </Button>
        </Link>
      </div>

      {/* Applicants List */}
      {applicantsList.length === 0 ? (
        <Card className="text-center py-12 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0E103D] mx-auto flex items-center justify-center border border-slate-200">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#0E103D]">No applicants yet</h2>
          <p className="text-xs text-[#313638]/70 max-w-md mx-auto">
            No candidates have submitted applications for this job post yet. Check back soon!
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {applicantsList.map((applicant) => (
            <Card
              key={applicant.id}
              className="space-y-5 hover:border-[#008DD5]/40 transition-colors"
            >
              {/* Top Row: Candidate Header + Status Form */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  {applicant.candidateImage ? (
                    <img
                      src={applicant.candidateImage}
                      alt={applicant.candidateName}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#0E103D] text-white font-bold text-base flex items-center justify-center shrink-0">
                      {applicant.candidateName?.slice(0, 2).toUpperCase() || "CN"}
                    </div>
                  )}

                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-[#0E103D] flex items-center gap-2">
                      {applicant.candidateName}
                      {applicant.experienceLevel && (
                        <Badge variant="primary" className="capitalize text-[10px]">
                          <Sparkles className="w-3 h-3 text-[#008DD5]" />
                          {applicant.experienceLevel}
                        </Badge>
                      )}
                    </h2>

                    {applicant.headline && (
                      <p className="text-xs font-semibold text-[#008DD5]">{applicant.headline}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#313638]/70 pt-0.5">
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
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-[#0E103D] uppercase tracking-wider">Status:</span>
                  <form action={updateApplicationStatus} className="flex items-center gap-2">
                    <input type="hidden" name="applicationId" value={applicant.id} />
                    <input type="hidden" name="jobId" value={job.id} />
                    <select
                      name="status"
                      defaultValue={applicant.status}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5]"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <Button type="submit" variant="primary" size="sm">
                      Update
                    </Button>
                  </form>
                </div>
              </div>

              {/* Middle Section: Cover Letter & Details */}
              {applicant.coverLetter ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#008DD5]" />
                    Cover Letter
                  </span>
                  <p className="text-xs text-[#313638] whitespace-pre-line leading-relaxed">
                    {applicant.coverLetter}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No cover letter provided by applicant.</p>
              )}

              {/* Bottom Actions Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <div className="flex items-center gap-3">
                  {applicant.resumeUrl ? (
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm">
                        <FileText className="w-4 h-4" />
                        <span>View Resume</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
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
                      className="inline-flex items-center gap-1 text-[#313638] hover:text-[#008DD5] font-medium"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {applicant.portfolioUrl && (
                    <a
                      href={applicant.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#313638] hover:text-[#008DD5] font-medium"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#008DD5]" />
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
