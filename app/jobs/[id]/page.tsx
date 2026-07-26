import { auth } from "@/lib/auth";
import { getJobById, applyAction } from "../action"
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
  Heart,
} from "lucide-react";
import Link from "next/link";
import ApplicationForm from "@/components/ApplicationForm";
import SaveJobButton from "@/components/SaveJobButton";
import { hasSavedJob } from "@/app/candidate/saved/actions";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const job = await getJobById(id);

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
        <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 mx-auto flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Job Not Found</h1>
          <p className="text-sm text-slate-500">
            The job listing you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse Jobs
          </Link>
        </div>
      </main>
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
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 selection:bg-[#F79256]/20 selection:text-[#F79256]">
      {/* Top Header / Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#F79256] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Jobs</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F79256] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Talen<span className="text-[#F79256]">try</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Main Job Card Banner */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-6">
          {/* Header Row: Title + Logo */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F79256]/10 border border-[#F79256]/20 text-[#F79256] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{job.jobType || "Full-Time"}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-600 font-medium text-base sm:text-lg">
                <Building2 className="w-5 h-5 text-[#F79256]" />
                <span>{job.companyName}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Company Logo Avatar */}
            {job.companyLogoUrl ? (
              <img
                src={job.companyLogoUrl}
                alt={job.companyName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-slate-200 object-contain p-2 bg-white shadow-xs shrink-0"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xl sm:text-2xl shrink-0">
                {job.companyName?.slice(0, 2).toUpperCase() || "JB"}
              </div>
            )}
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            {job.location && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                <MapPin className="w-4 h-4 text-[#F79256]" />
                <span>{job.location}</span>
              </div>
            )}

            {job.jobType && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F79256]/10 text-[#F79256] border border-[#F79256]/20">
                <Briefcase className="w-4 h-4" />
                <span>{job.jobType}</span>
              </div>
            )}

            {job.experienceLevel && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>{job.experienceLevel}</span>
              </div>
            )}

            {job.salary && (
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>{job.salary}</span>
              </div>
            )}
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!session ? (
                <Link href="/auth" className="px-8 py-3.5 bg-[#F79257] hover:bg-[#e07e42] text-white font-medium rounded-xl shadow-md transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer">
                  <LogIn className="w-5 h-5" />
                  <span>Login to apply</span>
                </Link>
              ) : session.user.role === "employer" ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500">You are an employer for this job.</span>
                  <Link
                    href={`/employer/jobs/${job.id}/applicants`}
                    className="px-6 py-2.5 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>View Applicants</span>
                  </Link>
                </div>
              ) : hasApplied ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Application Submitted ({appliedApplication?.status || "Pending"})</span>
                </div>
              ) : (
                <a
                  href="#application-form"
                  className="px-8 py-3.5 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold rounded-xl shadow-md transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Apply Now</span>
                </a>
              )}
            </div>

            <div className="flex items-center gap-2">
              {session?.user?.role === "candidate" ? (
                <SaveJobButton jobId={job.id} initialIsSaved={isSaved} />
              ) : !session ? (
                <Link
                  href="/auth"
                  title="Login to save job"
                  className="p-3 bg-white border border-slate-300 hover:border-amber-400 text-slate-700 hover:text-amber-600 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-semibold shadow-xs"
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="hidden sm:inline">Save Job</span>
                </Link>
              ) : null}

              <button
                title="Share Job"
                className="p-3 bg-white border border-slate-300 hover:border-[#F79256] text-slate-700 hover:text-[#F79256] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold shadow-xs"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About this Job */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#F79256]/10 text-[#F79256] flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">About this job</h2>
              </div>

              <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line pt-2">
                {job.description || "No description provided."}
              </div>
            </div>

            {/* Job Requirements */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-[#F79256]/10 text-[#F79256] flex items-center justify-center">
                  <ListChecks className="w-4 h-4" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Job Requirements</h2>
              </div>

              <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line pt-2">
                {job.requirements || "No requirements specified."}
              </div>
            </div>

            {/* Application Section */}
            <div id="application-form">
              {!session ? (
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-white">Interested in this role?</h3>
                    <p className="text-sm text-slate-400">
                      Log in to your candidate account to submit your application directly to {job.companyName}.
                    </p>
                  </div>
                  <Link href="/auth" className="px-8 py-3.5 bg-[#F79257] hover:bg-[#e07e42] text-white font-medium rounded-xl shadow-md transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer">
                    <LogIn className="w-5 h-5" />
                    <span>Login to apply</span>
                  </Link>
                </div>
              ) : session.user.role === "employer" ? (
                <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 text-slate-600 flex items-center justify-between">
                  <p className="text-sm">You are logged in as an employer.</p>
                  <Link
                    href={`/employer/jobs/${job.id}/applicants`}
                    className="px-5 py-2.5 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl transition-all shadow-xs inline-flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Manage Applicants</span>
                  </Link>
                </div>
              ) : hasApplied ? (
                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-emerald-950">Application Submitted</h3>
                      <p className="text-sm text-emerald-800">
                        You submitted your application on{" "}
                        <span className="font-semibold">
                          {appliedApplication?.appliedAt ? new Date(appliedApplication.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "recently"}
                        </span>
                        .
                      </p>
                      <p className="text-xs text-emerald-700">
                        Current Status: <span className="uppercase font-bold tracking-wide px-2 py-0.5 bg-emerald-100 rounded text-emerald-900">{appliedApplication?.status || "pending"}</span>
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/candidate/applications"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shrink-0 shadow-sm"
                  >
                    View My Applications
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
            <div className="bg-[#ffffff] border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#F79256]" />
                Company Overview
              </h3>

              <div className="flex items-center gap-3">
                {job.companyLogoUrl ? (
                  <img
                    src={job.companyLogoUrl}
                    alt={job.companyName}
                    className="w-12 h-12 rounded-lg border border-slate-200 object-contain p-1 bg-white"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg border border-slate-200 bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-base">
                    {job.companyName?.slice(0, 2).toUpperCase() || "JB"}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900">{job.companyName}</h4>
                  <p className="text-xs text-slate-500">Verified Employer</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-sm text-slate-600">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-slate-900">{job.location || "Remote"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Job Type</span>
                  <span className="font-medium text-slate-900">{job.jobType || "Full-Time"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-medium text-slate-900">{job.experienceLevel || "Not specified"}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-500">Salary</span>
                  <span className="font-semibold text-emerald-600">{job.salary || "Competitive"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}