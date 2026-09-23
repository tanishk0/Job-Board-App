import Link from "next/link";
import {
  UserCircle,
  Briefcase,
  FileText,
  Bookmark,
  ArrowRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  Compass,
  Bell,
  Award,
  BookmarkCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { applications, jobPostings, candidateProfiles, savedJobs, employerProfiles } from "@/db/schema";
import { eq, desc, inArray, count } from "drizzle-orm";

export default async function CandidateDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  let myApplications: any[] = [];
  let totalAppsCount = 0;
  let inReviewCount = 0;
  let savedJobsCount = 0;
  let profileCompleteness = 0;

  if (userId) {
    // 1. Fetch recent applications with employer profile details
    myApplications = await db
      .select({
        id: applications.id,
        status: applications.status,
        appliedAt: applications.appliedAt,
        jobId: applications.jobId,
        jobTitle: jobPostings.title,
        companyName: employerProfiles.companyName,
        companyLogoUrl: employerProfiles.companyLogoUrl,
        location: jobPostings.location,
        salary: jobPostings.salary,
      })
      .from(applications)
      .leftJoin(jobPostings, eq(applications.jobId, jobPostings.id))
      .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
      .where(eq(applications.candidateId, userId))
      .orderBy(desc(applications.appliedAt))
      .limit(5);

    // 2. Total applications count
    const [totalApps] = await db
      .select({ count: count(applications.id) })
      .from(applications)
      .where(eq(applications.candidateId, userId));
    totalAppsCount = Number(totalApps?.count) || 0;

    // 3. Applications under review / interviewing
    const [inReview] = await db
      .select({ count: count(applications.id) })
      .from(applications)
      .where(
        eq(applications.candidateId, userId)
      );
    // Calculate in-review or active
    const allCandidateApps = await db
      .select({ status: applications.status })
      .from(applications)
      .where(eq(applications.candidateId, userId));
    
    inReviewCount = allCandidateApps.filter(
      (a) => a.status === "reviewed" || a.status === "shortlisted" || a.status === "interviewing"
    ).length;

    // 4. Saved jobs count
    const [savedCountRow] = await db
      .select({ count: count(savedJobs.id) })
      .from(savedJobs)
      .where(eq(savedJobs.userId, userId));
    savedJobsCount = Number(savedCountRow?.count) || 0;

    // 5. Profile completeness calculation
    const [profile] = await db
      .select()
      .from(candidateProfiles)
      .where(eq(candidateProfiles.userId, userId));

    if (profile) {
      const fields = [
        profile.headline,
        profile.bio,
        profile.location,
        profile.phone,
        profile.resumeUrl,
        profile.portfolioUrl,
        profile.githubUrl,
        profile.experienceLevel,
        profile.preferredRole,
      ];
      const filledCount = fields.filter((f) => Boolean(f && String(f).trim().length > 0)).length;
      profileCompleteness = Math.round((filledCount / fields.length) * 100);
    }
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F1F5F9] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Candidate Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Welcome back, {session?.user?.name || "Candidate"}! Track your job applications and career progress.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/jobs">
            <Button variant="primary" size="sm">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Browse Jobs</span>
            </Button>
          </Link>
          <Link href="/candidate/profile">
            <Button variant="outline" size="sm">
              <UserCircle className="w-3.5 h-3.5" />
              <span>View Profile</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Dynamic KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Total Applications</span>
            <FileText className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{totalAppsCount}</div>
          <p className="text-[11px] text-[#64748B] font-medium flex items-center gap-1">
            <span>Submitted across all roles</span>
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>In Review / Interview</span>
            <Clock className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{inReviewCount}</div>
          <p className="text-[11px] text-[#64748B]">
            {inReviewCount > 0 ? "Under active recruiter review" : "No active reviews currently"}
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Saved Jobs</span>
            <Bookmark className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{savedJobsCount}</div>
          <p className="text-[11px] text-[#64748B]">
            <Link href="/candidate/saved-jobs" className="text-[#6366F1] hover:underline">
              View saved bookmarked jobs &rarr;
            </Link>
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Profile Completeness</span>
            <Award className="w-4 h-4 text-[#16A34A]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{profileCompleteness}%</div>
          <p className="text-[11px] text-[#64748B]">
            {profileCompleteness < 100 ? (
              <Link href="/candidate/profile" className="text-[#6366F1] hover:underline font-medium">
                Complete profile details (+{100 - profileCompleteness}%)
              </Link>
            ) : (
              <span className="text-[#16A34A] font-medium">Profile 100% complete</span>
            )}
          </p>
        </Card>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h2 className="text-base font-bold text-[#0F172A]">Recent Applications</h2>
              <Link href="/candidate/applications" className="text-xs font-semibold text-[#6366F1] hover:underline">
                View All →
              </Link>
            </div>

            {myApplications.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <FileText className="w-8 h-8 text-[#94A3B8] mx-auto" />
                <p className="text-xs text-[#64748B]">You haven't submitted any job applications yet.</p>
                <Link href="/jobs">
                  <Button variant="primary" size="sm">
                    Browse Positions
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-lg border border-[#E2E8F0] hover:border-[#6366F1]/40 flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-[#0F172A]">{app.jobTitle || "Engineering Position"}</h3>
                      <p className="text-xs text-[#64748B] flex items-center gap-2">
                        <span>{app.companyName || "Verified Employer"}</span>
                        <span>•</span>
                        <span>Applied {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "recently"}</span>
                      </p>
                    </div>
                    <Badge variant={app.status === "hired" ? "success" : app.status === "rejected" ? "danger" : "primary"}>
                      {app.status || "Applied"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quick Navigation */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-[#0F172A] pb-3 border-b border-[#F1F5F9]">Quick Navigation</h3>
            <div className="space-y-2 text-xs">
              <Link href="/candidate/applications" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]">
                <span>Application Tracking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/candidate/saved-jobs" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]">
                <span>Saved Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/candidate/documents" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]">
                <span>Resume & Documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/candidate/recommendations" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]">
                <span>Recommended Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link href="/candidate/insights" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]">
                <span>Market Insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}