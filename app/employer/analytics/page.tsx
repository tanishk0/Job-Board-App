import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { BarChart3, Briefcase, Users, CheckCircle2, Clock, XCircle, AlertCircle, PlusCircle } from "lucide-react";
import { db } from "@/lib/db";
import { jobPostings, applications } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";
import Link from "next/link";

export default async function EmployerAnalyticsPage() {
  const session = await requireEmployer();

  // 1. Total jobs posted
  const [jobsCountRow] = await db
    .select({ count: count(jobPostings.id) })
    .from(jobPostings)
    .where(eq(jobPostings.employerId, session.user.id));
  const totalJobs = Number(jobsCountRow?.count) || 0;

  // 2. Total applications received
  const [appsCountRow] = await db
    .select({ count: count(applications.id) })
    .from(applications)
    .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
    .where(eq(jobPostings.employerId, session.user.id));
  const totalApplications = Number(appsCountRow?.count) || 0;

  // 3. Applications status breakdown
  const allApps = await db
    .select({
      id: applications.id,
      status: applications.status,
    })
    .from(applications)
    .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
    .where(eq(jobPostings.employerId, session.user.id));

  const pendingCount = allApps.filter((a) => (a.status || "pending").toLowerCase() === "pending").length;
  const reviewedCount = allApps.filter((a) => (a.status || "").toLowerCase() === "reviewed").length;
  const shortlistedCount = allApps.filter((a) => (a.status || "").toLowerCase() === "shortlisted").length;
  const hiredCount = allApps.filter((a) => ["hired", "accepted"].includes((a.status || "").toLowerCase())).length;
  const rejectedCount = allApps.filter((a) => (a.status || "").toLowerCase() === "rejected").length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Recruitment Analytics</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time pipeline metrics and applicant conversion data across your active positions.
          </p>
        </div>
        <Link href="/employer/jobs/new">
          <Button variant="primary" size="sm">
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Button>
        </Link>
      </div>

      {totalJobs === 0 && totalApplications === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No analytics recorded yet"
          description="Publish job listings and begin receiving candidate submissions to view applicant volume and stage conversion statistics."
          actionLabel="Create First Job Posting"
          actionHref="/employer/jobs/new"
        />
      ) : (
        <div className="space-y-6">
          {/* Top KPI Cards from DB */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Total Jobs Posted</span>
                <Briefcase className="w-4 h-4 text-[#6366F1]" />
              </div>
              <div className="text-2xl font-bold text-[#0F172A]">{totalJobs}</div>
              <p className="text-[11px] text-[#64748B] font-medium">Published listings</p>
            </Card>

            <Card className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Applications Received</span>
                <Users className="w-4 h-4 text-[#6366F1]" />
              </div>
              <div className="text-2xl font-bold text-[#0F172A]">{totalApplications}</div>
              <p className="text-[11px] text-[#64748B] font-medium">
                {totalJobs > 0
                  ? `${(totalApplications / totalJobs).toFixed(1)} avg per position`
                  : "Total applicants"}
              </p>
            </Card>

            <Card className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
                <span>Offers / Hires</span>
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              </div>
              <div className="text-2xl font-bold text-[#0F172A]">{hiredCount}</div>
              <p className="text-[11px] text-[#16A34A] font-medium">
                {totalApplications > 0
                  ? `${Math.round((hiredCount / totalApplications) * 100)}% conversion rate`
                  : "No hires yet"}
              </p>
            </Card>
          </div>

          {/* Pipeline Stage Breakdown from DB */}
          <Card className="space-y-4">
            <h2 className="text-base font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">
              Application Pipeline Distribution
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-[#FEF3C7] rounded-lg border border-[#FDE68A] text-center space-y-1">
                <span className="text-[11px] font-semibold text-[#92400E] uppercase">Pending</span>
                <div className="text-xl font-bold text-[#B45309]">{pendingCount}</div>
              </div>

              <div className="p-3 bg-[#DBEAFE] rounded-lg border border-[#BFDBFE] text-center space-y-1">
                <span className="text-[11px] font-semibold text-[#1E40AF] uppercase">Reviewed</span>
                <div className="text-xl font-bold text-[#2563EB]">{reviewedCount}</div>
              </div>

              <div className="p-3 bg-[#EEF2FF] rounded-lg border border-[#C7D2FE] text-center space-y-1">
                <span className="text-[11px] font-semibold text-[#3730A3] uppercase">Shortlisted</span>
                <div className="text-xl font-bold text-[#6366F1]">{shortlistedCount}</div>
              </div>

              <div className="p-3 bg-[#DCFCE7] rounded-lg border border-[#BBF7D0] text-center space-y-1">
                <span className="text-[11px] font-semibold text-[#166534] uppercase">Accepted</span>
                <div className="text-xl font-bold text-[#16A34A]">{hiredCount}</div>
              </div>

              <div className="p-3 bg-[#FEE2E2] rounded-lg border border-[#FECACA] text-center space-y-1">
                <span className="text-[11px] font-semibold text-[#991B1B] uppercase">Rejected</span>
                <div className="text-xl font-bold text-[#EF4444]">{rejectedCount}</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
