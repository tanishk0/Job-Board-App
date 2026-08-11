import { getEmployerJobs } from "./actions";
import { deleteJob } from "./actions";
import Link from "next/link";
import { employerProfiles, applications } from "@/db/schema";
import { db } from "@/lib/db";
import { eq, count } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Users, PlusCircle, Briefcase, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function Jobs() {
  const jobs = await getEmployerJobs();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "employer") {
    throw new Error("Forbidden (Account Role Mismatch)");
  }

  const employerProfile = await db
    .select()
    .from(employerProfiles)
    .where(eq(employerProfiles.userId, session.user.id))
    .limit(1);

  if (employerProfile.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <EmptyState
          icon={Briefcase}
          title="Complete Your Company Profile"
          description="Create your employer profile first before publishing open position listings to candidates."
          actionLabel="Create Employer Profile"
          actionHref="/employer/profile"
        />
      </div>
    );
  }

  // Fetch applicant counts for employer's jobs
  const applicantCounts = await db
    .select({
      jobId: applications.jobId,
      applicantCount: count(applications.id),
    })
    .from(applications)
    .groupBy(applications.jobId);

  const countsMap = new Map<string, number>();
  applicantCounts.forEach((row) => {
    countsMap.set(row.jobId, Number(row.applicantCount));
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">Your Job Postings</h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">Manage active listings and applicant candidate pipelines.</p>
        </div>
        <Link href="/employer/jobs/new">
          <Button variant="primary" size="sm">
            <PlusCircle className="w-4 h-4" />
            <span>Post New Job</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No active job postings"
            description="You haven't posted any open positions yet. Create your first listing to start receiving applications."
            actionLabel="Create First Job"
            actionHref="/employer/jobs/new"
          />
        ) : (
          jobs.map((job) => {
            const applicantCount = countsMap.get(job.id) || 0;
            return (
              <Card
                key={job.id}
                className="hover:border-[#6366F1]/40 transition-colors space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-[#0F172A]">{job.title}</h2>
                    <p className="text-xs text-[#64748B] font-medium">{job.location || "Remote"}</p>
                  </div>
                  <Badge variant="brand" className="uppercase text-[10px]">
                    {job.jobType || "Full-Time"}
                  </Badge>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">{job.description}</p>

                <div className="flex items-center gap-2 text-xs text-[#64748B] font-medium">
                  {job.experienceLevel && (
                    <Badge variant="neutral" className="capitalize">
                      Exp: {job.experienceLevel}
                    </Badge>
                  )}
                  {job.salary && (
                    <Badge variant="success">
                      Salary: {job.salary}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#F1F5F9]">
                  <Link href={`/employer/jobs/${job.id}`}>
                    <Button variant="secondary" size="sm">
                      <Users className="w-4 h-4 text-[#6366F1]" />
                      <span>View Applicants ({applicantCount})</span>
                    </Button>
                  </Link>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Link href={`/employer/jobs/${job.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Button>
                    </Link>
                    <form action={deleteJob}>
                      <input type="hidden" name="id" value={job.id} />
                      <Button type="submit" variant="danger" size="sm">
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </Button>
                    </form>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}