import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  Briefcase,
  UserRoundSearch,
  Building2,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { db } from "@/lib/db";
import { jobPostings, applications } from "@/db/schema";
import { eq, desc, count } from "drizzle-orm";

export default async function EmployerDashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/employer/login");
  }

  const userId = session.user.id;

  let activeJobs: any[] = [];
  let recentApplicants: any[] = [];
  let activeJobsCount = 0;
  let totalApplicantsCount = 0;
  let inReviewCount = 0;
  let hiresCount = 0;

  if (userId) {
    // 1. Total jobs count
    const [jobsCountRow] = await db
      .select({ count: count(jobPostings.id) })
      .from(jobPostings)
      .where(eq(jobPostings.employerId, userId));
    activeJobsCount = Number(jobsCountRow?.count) || 0;

    // 2. Active recent job postings
    activeJobs = await db
      .select()
      .from(jobPostings)
      .where(eq(jobPostings.employerId, userId))
      .orderBy(desc(jobPostings.createdAt))
      .limit(5);

    // 3. Total applicants count
    const [totalAppsRow] = await db
      .select({ count: count(applications.id) })
      .from(applications)
      .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
      .where(eq(jobPostings.employerId, userId));
    totalApplicantsCount = Number(totalAppsRow?.count) || 0;

    // 4. In review & hires breakdown
    const allEmployerApps = await db
      .select({ status: applications.status })
      .from(applications)
      .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
      .where(eq(jobPostings.employerId, userId));

    inReviewCount = allEmployerApps.filter(
      (a) => a.status === "reviewed" || a.status === "shortlisted" || a.status === "interviewing"
    ).length;

    hiresCount = allEmployerApps.filter(
      (a) => a.status === "hired" || a.status === "accepted"
    ).length;

    // 5. Recent applicants
    recentApplicants = await db
      .select({
        id: applications.id,
        status: applications.status,
        appliedAt: applications.appliedAt,
        jobTitle: jobPostings.title,
      })
      .from(applications)
      .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
      .where(eq(jobPostings.employerId, userId))
      .orderBy(desc(applications.appliedAt))
      .limit(5);
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Good morning, {session.user.name || "Employer"}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
            Real-time pipeline metrics and applicant updates across your active positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/employer/jobs/new">
            <Button variant="primary" size="sm">
              <PlusCircle className="w-4 h-4" />
              <span>Post New Position</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Real KPI Metrics Cards from DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Active Job Openings</span>
            <Briefcase className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{activeJobsCount}</div>
          <p className="text-[11px] text-[#64748B] font-medium">
            {activeJobsCount > 0 ? "Published on Talentry" : "No active postings"}
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Total Applicants</span>
            <Users className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{totalApplicantsCount}</div>
          <p className="text-[11px] text-[#64748B] font-medium">
            Across all open positions
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Under Active Review</span>
            <Clock className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{inReviewCount}</div>
          <p className="text-[11px] text-[#64748B] font-medium">
            Shortlisted or reviewed
          </p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Hires Completed</span>
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">{hiresCount}</div>
          <p className="text-[11px] text-[#64748B] font-medium">
            {hiresCount > 0 ? "Offers accepted" : "No offers accepted yet"}
          </p>
        </Card>
      </div>

      {/* Main Employer Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2-Cols: Active Postings Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <h2 className="text-base font-bold text-[#0F172A]">Active Job Listings</h2>
              <Link href="/employer/jobs" className="text-xs font-semibold text-[#6366F1] hover:underline">
                Manage All Postings →
              </Link>
            </div>

            {activeJobs.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <Briefcase className="w-8 h-8 text-[#94A3B8] mx-auto" />
                <p className="text-xs text-[#64748B]">You haven't posted any open positions yet.</p>
                <Link href="/employer/jobs/new">
                  <Button variant="primary" size="sm">
                    Create First Listing
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 rounded-lg border border-[#E2E8F0] hover:border-[#6366F1]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <Link href={`/employer/jobs/${job.id}`} className="text-sm font-semibold text-[#0F172A] hover:text-[#6366F1]">
                        {job.title}
                      </Link>
                      <p className="text-xs text-[#64748B]">
                        {job.location || "Remote"} • {job.jobType || "Full-Time"} • {job.salary || "Competitive"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge variant="primary">Active</Badge>
                      <Link href={`/employer/jobs/${job.id}`}>
                        <Button variant="outline" size="sm">
                          <span>View Pipeline</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1-Col: Quick Employer Tools */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-base font-bold text-[#0F172A] pb-3 border-b border-[#F1F5F9]">
              Hiring Operations
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/employer/candidates"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]"
              >
                <span>Search Candidate Database</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/employer/applications"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]"
              >
                <span>Central Applicant Pipeline</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/employer/analytics"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]"
              >
                <span>Recruitment Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/employer/profile"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F8FAFC] font-medium text-[#475569] hover:text-[#6366F1]"
              >
                <span>Company Brand Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}