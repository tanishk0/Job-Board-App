import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Bell, CheckCircle2, Clock, XCircle, AlertCircle, Building2, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { applications, jobPostings, employerProfiles } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Link from "next/link";

export default async function CandidateNotificationsPage() {
  const session = await requireCandidate();

  const userApplications = await db
    .select({
      id: applications.id,
      status: applications.status,
      appliedAt: applications.appliedAt,
      jobId: jobPostings.id,
      jobTitle: jobPostings.title,
      companyName: employerProfiles.companyName,
      companyLogoUrl: employerProfiles.companyLogoUrl,
    })
    .from(applications)
    .innerJoin(jobPostings, eq(sql`${applications.jobId}::text`, sql`${jobPostings.id}::text`))
    .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
    .where(eq(applications.candidateId, session.user.id))
    .orderBy(desc(applications.appliedAt));

  const getStatusNotification = (status: string, companyName: string, jobTitle: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
      case "hired":
        return {
          title: "Application Accepted",
          message: `${companyName || "Employer"} marked your application for ${jobTitle} as accepted.`,
          variant: "success" as const,
          icon: CheckCircle2,
          iconColor: "text-[#16A34A]",
          iconBg: "bg-[#DCFCE7]",
        };
      case "shortlisted":
      case "interviewing":
        return {
          title: "Application Shortlisted",
          message: `${companyName || "Employer"} shortlisted your profile for ${jobTitle}.`,
          variant: "primary" as const,
          icon: CheckCircle2,
          iconColor: "text-[#6366F1]",
          iconBg: "bg-[#EEF2FF]",
        };
      case "reviewed":
        return {
          title: "Application Viewed",
          message: `${companyName || "Employer"} has reviewed your application for ${jobTitle}.`,
          variant: "primary" as const,
          icon: AlertCircle,
          iconColor: "text-[#3B82F6]",
          iconBg: "bg-[#DBEAFE]",
        };
      case "rejected":
        return {
          title: "Application Decision",
          message: `${companyName || "Employer"} decided not to move forward with your application for ${jobTitle}.`,
          variant: "danger" as const,
          icon: XCircle,
          iconColor: "text-[#EF4444]",
          iconBg: "bg-[#FEE2E2]",
        };
      default:
        return {
          title: "Application Received",
          message: `Your application for ${jobTitle} at ${companyName || "Employer"} has been received and is pending review.`,
          variant: "warning" as const,
          icon: Clock,
          iconColor: "text-[#D97706]",
          iconBg: "bg-[#FEF3C7]",
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Notifications</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time status updates and employer activity on your submitted applications.
          </p>
        </div>
        <Link href="/candidate/applications">
          <Button variant="outline" size="sm">
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {userApplications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="You will receive real-time updates here when hiring teams review, shortlist, or update the status of your applications."
          actionLabel="Find Opportunities to Apply"
          actionHref="/jobs"
        />
      ) : (
        <div className="space-y-3">
          {userApplications.map((app) => {
            const notif = getStatusNotification(
              app.status || "pending",
              app.companyName || "Employer",
              app.jobTitle || "Job Position"
            );
            const Icon = notif.icon;

            return (
              <Card key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:border-[#6366F1]/40 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${notif.iconBg} ${notif.iconColor} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0F172A]">{notif.title}</h3>
                      <Badge variant={notif.variant} className="text-[10px] capitalize">
                        {app.status || "Pending"}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">{notif.message}</p>
                    <p className="text-[11px] text-[#94A3B8]">
                      Submitted {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "recently"}
                    </p>
                  </div>
                </div>

                <Link href={`/jobs/${app.jobId}`} className="shrink-0 self-end sm:self-center">
                  <Button variant="ghost" size="sm">
                    <span>View Role</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
