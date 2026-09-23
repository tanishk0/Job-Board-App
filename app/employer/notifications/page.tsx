import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Bell, Users, ArrowRight, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { applications, jobPostings } from "@/db/schema";
import { user } from "@/auth-schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export default async function EmployerNotificationsPage() {
  const session = await requireEmployer();

  const recentApplicantNotifications = await db
    .select({
      id: applications.id,
      candidateName: user.name,
      candidateEmail: user.email,
      jobTitle: jobPostings.title,
      jobId: jobPostings.id,
      appliedAt: applications.appliedAt,
      status: applications.status,
    })
    .from(applications)
    .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
    .innerJoin(user, eq(applications.candidateId, user.id))
    .where(eq(jobPostings.employerId, session.user.id))
    .orderBy(desc(applications.appliedAt))
    .limit(20);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Employer Notifications</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time candidate submission alerts across all your active job postings.
          </p>
        </div>
        <Link href="/employer/applications">
          <Button variant="outline" size="sm">
            <span>Central Pipeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {recentApplicantNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="You will receive alerts here whenever candidates apply to your job listings or update their submissions."
          actionLabel="Manage Job Postings"
          actionHref="/employer/jobs"
        />
      ) : (
        <div className="space-y-3">
          {recentApplicantNotifications.map((notif) => (
            <Card
              key={notif.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:border-[#6366F1]/40 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0F172A]">New Applicant Submitted</h3>
                    <Badge variant={notif.status === "hired" ? "success" : notif.status === "rejected" ? "danger" : "primary"}>
                      {notif.status || "Pending"}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    <span className="font-semibold text-[#0F172A]">{notif.candidateName}</span> applied for{" "}
                    <span className="font-medium text-[#0F172A]">{notif.jobTitle}</span>.
                  </p>
                  <p className="text-[11px] text-[#94A3B8] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Applied {notif.appliedAt ? new Date(notif.appliedAt).toLocaleDateString() : "recently"}</span>
                    <span>•</span>
                    <span>{notif.candidateEmail}</span>
                  </p>
                </div>
              </div>

              <Link href={`/employer/jobs/${notif.jobId}/applicants`} className="shrink-0 self-end sm:self-center">
                <Button variant="primary" size="sm">
                  <span>Review Candidate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
