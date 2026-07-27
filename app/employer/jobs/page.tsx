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

export default async function Jobs() {
  const jobs = await getEmployerJobs();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (session.user.role !== "employer") {
    throw new Error("Forbidden(Account Role Mismatched)");
  }

  const employerProfile = await db
    .select()
    .from(employerProfiles)
    .where(eq(employerProfiles.userId, session.user.id))
    .limit(1);

  if (employerProfile.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Card className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
            <Briefcase className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-[#0E103D]">
            Complete your employer profile
          </h1>
          <p className="text-xs text-[#313638]/70 max-w-md mx-auto">
            You need to create an employer profile before posting job opportunities.
          </p>
          <div className="pt-2">
            <Link href="/employer/profile">
              <Button variant="primary" size="md">
                Create Employer Profile
              </Button>
            </Link>
          </div>
        </Card>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0E103D] tracking-tight">Your Job Postings</h1>
          <p className="text-xs sm:text-sm text-[#313638]/70 mt-1">Manage active job listings and review applicant candidate pipelines.</p>
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
          <Card className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0E103D] mx-auto flex items-center justify-center border border-slate-200">
              <Briefcase className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#0E103D]">No active job postings</h2>
            <p className="text-xs text-[#313638]/70">You haven't posted any jobs yet. Create your first listing to start receiving applications.</p>
            <div className="pt-2">
              <Link href="/employer/jobs/new">
                <Button variant="primary" size="md">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create First Job</span>
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          jobs.map((job) => {
            const applicantCount = countsMap.get(job.id) || 0;
            return (
              <Card
                key={job.id}
                className="hover:border-[#008DD5]/40 transition-colors space-y-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold text-[#0E103D]">{job.title}</h2>
                    <p className="text-xs text-[#313638]/70 font-medium">{job.location || "Remote"}</p>
                  </div>
                  <Badge variant="brand" className="uppercase text-[10px]">
                    {job.jobType || "Full-Time"}
                  </Badge>
                </div>

                <p className="text-xs text-[#313638]/80 leading-relaxed line-clamp-2">{job.description}</p>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <Link href={`/employer/jobs/${job.id}/applicants`}>
                    <Button variant="secondary" size="sm">
                      <Users className="w-4 h-4 text-[#008DD5]" />
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