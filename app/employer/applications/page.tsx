import { requireEmployer } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { applications, jobPostings, candidateProfiles } from "@/db/schema";
import { user } from "@/auth-schema";
import { eq, desc } from "drizzle-orm";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Users, FileText, CheckCircle2, XCircle, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function EmployerApplicationsPage() {
  const session = await requireEmployer();

  const allApplications = await db
    .select({
      id: applications.id,
      status: applications.status,
      appliedAt: applications.appliedAt,
      candidateName: user.name,
      candidateEmail: user.email,
      jobTitle: jobPostings.title,
      jobId: jobPostings.id,
      resumeUrl: applications.resumeUrl,
    })
    .from(applications)
    .innerJoin(jobPostings, eq(applications.jobId, jobPostings.id))
    .innerJoin(user, eq(applications.candidateId, user.id))
    .where(eq(jobPostings.employerId, session.user.id))
    .orderBy(desc(applications.appliedAt));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Central Hiring Pipeline</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Review all active candidate applications across open positions.</p>
        </div>
        <Link href="/employer/jobs/new">
          <Button variant="primary" size="sm">
            <span>Post New Job</span>
          </Button>
        </Link>
      </div>

      {allApplications.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No candidate applications received"
          description="Candidates applying to your posted positions will appear in this centralized pipeline."
          actionLabel="View Active Job Postings"
          actionHref="/employer/jobs"
        />
      ) : (
        <div className="space-y-4">
          {allApplications.map((app) => (
            <Card key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0F172A]">{app.candidateName}</h3>
                  <Badge variant={app.status === "hired" ? "success" : app.status === "rejected" ? "danger" : "primary"}>
                    {app.status || "Applied"}
                  </Badge>
                </div>
                <p className="text-xs text-[#64748B]">
                  Applied for <span className="font-semibold text-[#0F172A]">{app.jobTitle}</span> • {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : "Recently"}
                </p>
                <p className="text-xs text-[#94A3B8]">{app.candidateEmail}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {app.resumeUrl && (
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    <Button variant="outline" size="sm">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Resume</span>
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </a>
                )}
                <Link href={`/employer/jobs/${app.jobId}`}>
                  <Button variant="primary" size="sm">
                    Manage Candidate
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
