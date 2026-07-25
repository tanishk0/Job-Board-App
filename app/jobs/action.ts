"use server"

import { db } from "@/lib/db"
import { jobPostings, employerProfiles, applications, candidateProfiles } from "@/db/schema"
import { eq, desc, and } from "drizzle-orm";
import { requireCandidate } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

import { sql } from "drizzle-orm";

export async function getJobs() {
    const jobs = await db
        .select({
            id: jobPostings.id,
            title: jobPostings.title,
            salary: jobPostings.salary,
            experienceLevel: jobPostings.experienceLevel,
            location: jobPostings.location,
            jobType: jobPostings.jobType,
            companyName: employerProfiles.companyName,
            companyLogoUrl: employerProfiles.companyLogoUrl,
        })
        .from(jobPostings)
        .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
        .orderBy(desc(jobPostings.createdAt));

    return jobs.map((job) => ({
        ...job,
        companyName: job.companyName || "Verified Employer",
    }));
}

export async function getJobById(id: string) {
    const [job] = await db
        .select({
            id: jobPostings.id,
            title: jobPostings.title,
            salary: jobPostings.salary,
            experienceLevel: jobPostings.experienceLevel,
            location: jobPostings.location,
            description: jobPostings.description,
            requirements: jobPostings.requirements,
            jobType: jobPostings.jobType,
            companyName: employerProfiles.companyName,
            companyLogoUrl: employerProfiles.companyLogoUrl,
        })
        .from(jobPostings)
        .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
        .where(eq(sql`${jobPostings.id}::text`, id));

    if (!job) return null;

    return {
        ...job,
        companyName: job.companyName || "Verified Employer",
    };
}

// Applications

export async function applyToJob(jobId: string, resumeUrl: string, coverLetter?: string) {
    const session = await requireCandidate();

    const [existing] = await db
    .select()
    .from(applications)
    .where(
        and(
            eq(applications.jobId, jobId),
            eq(applications.candidateId, session.user.id)
        )
    );

    if (existing) {
        throw new Error("You have already applied to this job.");
    }

    await db.insert(applications).values({
        jobId: jobId,
        candidateId: session.user.id,
        resumeUrl: resumeUrl,
        coverLetter: coverLetter || null,
        status: "pending",
        appliedAt: new Date(),
    });
}

export async function applyAction(formData: FormData) {
    const session = await requireCandidate();

    const jobId = formData.get("jobId") as string;
    const resumeUrl = formData.get("resumeUrl") as string;
    const coverLetter = formData.get("coverLetter") as string;

    if (!jobId) {
        throw new Error("Job ID is required.");
    }

    if (!resumeUrl || resumeUrl.trim() === "") {
        throw new Error("Resume URL is required.");
    }

    const [existing] = await db
        .select()
        .from(applications)
        .where(
            and(
                eq(applications.jobId, jobId),
                eq(applications.candidateId, session.user.id)
            )
        );

    if (existing) {
        throw new Error("You have already applied to this job.");
    }

    await db.insert(applications).values({
        jobId: jobId,
        candidateId: session.user.id,
        resumeUrl: resumeUrl.trim(),
        coverLetter: coverLetter ? coverLetter.trim() : null,
        status: "pending",
        appliedAt: new Date(),
    });

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/candidate/applications");
    revalidatePath("/applications");
}