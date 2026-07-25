"use server";

import { db } from "@/lib/db";
import { savedJobs } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { requireCandidate } from "@/lib/auth/session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function saveJob(jobId: string) {
  const session = await requireCandidate();

  const [existing] = await db
    .select()
    .from(savedJobs)
    .where(
      and(
        eq(savedJobs.jobId, jobId),
        eq(savedJobs.userId, session.user.id)
      )
    );

  if (!existing) {
    await db.insert(savedJobs).values({
      userId: session.user.id,
      jobId: jobId,
      savedAt: new Date(),
    });
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/candidate/saved");
  revalidatePath("/candidate/saved-jobs");
}

export async function unsaveJob(jobId: string) {
  const session = await requireCandidate();

  await db
    .delete(savedJobs)
    .where(
      and(
        eq(savedJobs.jobId, jobId),
        eq(savedJobs.userId, session.user.id)
      )
    );

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/candidate/saved");
  revalidatePath("/candidate/saved-jobs");
}

export async function toggleSaveJob(formData: FormData) {
  const jobId = formData.get("jobId") as string;
  const isSaved = formData.get("isSaved") === "true";

  if (!jobId) {
    throw new Error("Job ID is required.");
  }

  if (isSaved) {
    await unsaveJob(jobId);
  } else {
    await saveJob(jobId);
  }
}

export async function hasSavedJob(jobId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "candidate") {
    return false;
  }

  const [existing] = await db
    .select()
    .from(savedJobs)
    .where(
      and(
        eq(savedJobs.jobId, jobId),
        eq(savedJobs.userId, session.user.id)
      )
    );

  return !!existing;
}
