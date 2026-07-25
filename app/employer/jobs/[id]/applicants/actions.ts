"use server";

import { db } from "@/lib/db";
import { applications, jobPostings } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { requireEmployer } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export async function updateApplicationStatus(formData: FormData) {
  const session = await requireEmployer();

  const applicationId = formData.get("applicationId") as string;
  const status = formData.get("status") as string;
  const jobId = formData.get("jobId") as string;

  if (!applicationId || !status || !jobId) {
    throw new Error("Missing required parameters.");
  }

  // Verify that the job belongs to the current employer
  const [job] = await db
    .select()
    .from(jobPostings)
    .where(
      and(
        eq(jobPostings.id, jobId),
        eq(jobPostings.employerId, session.user.id)
      )
    );

  if (!job) {
    throw new Error("Unauthorized to update applications for this job.");
  }

  await db
    .update(applications)
    .set({ status })
    .where(eq(applications.id, applicationId));

  revalidatePath(`/employer/jobs/${jobId}/applicants`);
  revalidatePath(`/jobs/${jobId}/applicants`);
  revalidatePath(`/candidate/applications`);
}
