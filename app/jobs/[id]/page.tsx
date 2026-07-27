import { auth } from "@/lib/auth";
import { getJobById, applyAction } from "../action";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { applications, candidateProfiles } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import {
  MapPin,
  Bookmark,
  Share2,
  Briefcase,
  Building2,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  Send,
  FileText,
  ListChecks,
  Sparkles,
  LogIn,
  Users,
} from "lucide-react";
import Link from "next/link";
import ApplicationForm from "@/components/ApplicationForm";
import SaveJobButton from "@/components/SaveJobButton";
import { hasSavedJob } from "@/app/candidate/saved/actions";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-[#313638]">
        <Navbar session={session} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#0E103D]">Job Not Found</h1>
            <p className="text-sm text-[#313638]/70">
              The job listing you are looking for does not exist or may have been removed.
            </p>
            <Link href="/jobs">
              <Button variant="primary" size="md" className="mt-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Browse Jobs
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  let hasApplied = false;
  let appliedApplication: typeof applications.$inferSelect | null = null;
  let prefilledResume = "";
  let isSaved = false;

  if (session && session.user.role === "candidate") {
    isSaved = await hasSavedJob(id);

    const [existingApp] = await db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.jobId, id),
          eq(applications.candidateId, session.user.id)
        )
      );

    if (existingApp) {
      hasApplied = true;
      appliedApplication = existingApp;
    }

    const [profile] = await db
      .select()
      .from(candidateProfiles)
      .where(eq(candidateProfiles.userId, session.user.id));

    if (profile) {
      prefilledResume = profile.resumeUrl || "";
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-[#313638] font-sans selection:bg-[#008DD5]/10 selection:text-[#008DD5]">
      {/* Top Navigation Bar */}
      <Navbar session={session} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#313638]/70 hover:text-[#008DD5] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Jobs</span>
        </Link>

        {/* Main Job Detail Banner */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          {/* Header Row: Title + Logo */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 flex-1">
              <Badge variant="brand" className="uppercase text-[10px] tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>{job.jobType || "Full-Time"}</span>
              </Badge>

              <h1 className="text-2xl sm:text-4xl font-bold text-[#0E103D] tracking-tight leading-tight">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-[#313638] font-medium text-base">
                <Building2 className="w-4 h-4 text-[#008DD5]" />
                <span>{job.companyName}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Company Logo Avatar */}
            {job.companyLogoUrl ? (
              <img
                src={job.companyLogoUrl}
                alt={job.companyName}
                className="w-16 h-16 rounded-lg border border-slate-200 object-contain p-1.5 bg-white shadow-xs shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg border border-slate-200 bg-[#0E103D]/5 text-[#0E103D] flex items-center justify-center font-bold text-xl shrink-0">
                {job.companyName?.slice(0, 2).toUpperCase() || "JB"}
              </div>
            )}
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
            {job.location && (
              <Badge variant="neutral">
                <MapPin className="w-3.5 h-3.5 text-[#008DD5]" />
                <span>{job.location}</span>
              </Badge>
            )}

            {job.jobType && (
              <Badge variant="brand">
                <Briefcase className="w-3.5 h-3.5" />
                <span>{job.jobType}</span>
              </Badge>
            )}

            {job.experienceLevel && (
              <Badge variant="primary">
                <Sparkles className="w-3.5 h-3.5 text-[#008DD5]" />
                <span className="capitalize">{job.experienceLevel}</span>
              </Badge>
            )}

            {job.salary && (
              <Badge variant="success">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>{job.salary}</span>
              </Badge>
            )}
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!session ? (
                <Link href="/auth" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    <LogIn className="w-4 h-4" />
                    <span>Login to apply</span>
                  </Button>
                </Link>
              ) : session.user.role === "employer" ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">You are an employer for this job.</span>
                  <Link href={`/employer/jobs/${job.id}/applicants`}>
                    <Button variant="secondary" size="md">
                      <Users className="w-4 h-4" />
                      <span>View Applicants</span>
                    </Button>
                  </Link>
                </div>
              ) : hasApplied ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-medium text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Application Submitted ({appliedApplication?.status || "Pending"})</span>
                </div>
              ) : (
                <a href="#application-form" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    <span>Apply Now</span>
                  </Button>
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              {session?.user?.role === "candidate" ? (
                <SaveJobButton jobId={job.id} initialIsSaved={isSaved} />
              ) : !session ? (
                <Link href="/auth" title="Login to save job">
                  <Button variant="outline" size="md">
                    <Bookmark className="w-4 h-4" />
                    <span>Save Job</span>
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About this Job */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-[#0E103D]">About this job</h2>
              </div>

              <div className="text-[#313638] text-sm leading-relaxed whitespace-pre-line pt-1">
                {job.description || "No description provided."}
              </div>
            </div>

            {/* Job Requirements */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#0E103D]/10 text-[#0E103D] flex items-center justify-center">
                  <ListChecks className="w-4 h-4 text-[#0E103D]" />
                </div>
                <h2 className="text-lg font-bold text-[#0E103D]">Job Requirements</h2>
              </div>

              <div className="text-[#313638] text-sm leading-relaxed whitespace-pre-line pt-1">
                {job.requirements || "No requirements specified."}
              </div>
            </div>

            {/* Application Section */}
            <div id="application-form">
              {!session ? (
                <div className="bg-[#0E103D] text-white rounded-xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#0E103D]">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-white">Interested in this role?</h3>
                    <p className="text-xs text-slate-300">
                      Log in to your candidate account to submit your application directly to {job.companyName}.
                    </p>
                  </div>
                  <Link href="/auth">
                    <Button variant="primary" size="md">
                      <LogIn className="w-4 h-4" />
                      <span>Login to apply</span>
                    </Button>
                  </Link>
                </div>
              ) : session.user.role === "employer" ? (
                <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 text-[#313638] flex items-center justify-between">
                  <p className="text-xs text-slate-600">You are logged in as an employer.</p>
                  <Link href={`/employer/jobs/${job.id}/applicants`}>
                    <Button variant="secondary" size="sm">
                      <Users className="w-4 h-4" />
                      <span>Manage Applicants</span>
                    </Button>
                  </Link>
                </div>
              ) : hasApplied ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-emerald-950">Application Submitted</h3>
                      <p className="text-xs text-emerald-800">
                        Submitted on{" "}
                        <span className="font-semibold">
                          {appliedApplication?.appliedAt ? new Date(appliedApplication.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "recently"}
                        </span>
                      </p>
                      <p className="text-xs text-emerald-700">
                        Status: <span className="uppercase font-bold tracking-wide px-2 py-0.5 bg-emerald-100 rounded text-emerald-900">{appliedApplication?.status || "pending"}</span>
                      </p>
                    </div>
                  </div>
                  <Link href="/candidate/applications">
                    <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      View My Applications
                    </Button>
                  </Link>
                </div>
              ) : (
                <ApplicationForm
                  jobId={job.id}
                  companyName={job.companyName}
                  prefilledResume={prefilledResume}
                  applyAction={applyAction}
                />
              )}
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6">
            {/* Company Overview Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-[#0E103D] pb-3 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#008DD5]" />
                Company Overview
              </h3>

              <div className="flex items-center gap-3">
                {job.companyLogoUrl ? (
                  <img
                    src={job.companyLogoUrl}
                    alt={job.companyName}
                    className="w-10 h-10 rounded-lg border border-slate-200 object-contain p-1 bg-white"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg border border-slate-200 bg-[#0E103D]/5 text-[#0E103D] flex items-center justify-center font-bold text-sm">
                    {job.companyName?.slice(0, 2).toUpperCase() || "JB"}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-[#0E103D]">{job.companyName}</h4>
                  <p className="text-[11px] text-slate-500">Verified Employer</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-[#313638]">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-[#0E103D]">{job.location || "Remote"}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Job Type</span>
                  <span className="font-medium text-[#0E103D]">{job.jobType || "Full-Time"}</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-medium text-[#0E103D]">{job.experienceLevel || "Not specified"}</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500">Salary</span>
                  <span className="font-bold text-emerald-600">{job.salary || "Competitive"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}