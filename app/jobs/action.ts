"use server"

import { db } from "@/lib/db"
import { jobPostings, employerProfiles, applications, candidateProfiles } from "@/db/schema"
import { eq, desc, and, ilike, or, sql } from "drizzle-orm";
import { requireCandidate } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export type JobFilterOptions = {
  q?: string;
  location?: string;
  minSalary?: string;
  experienceLevel?: string;
  jobType?: string;
};

export async function getJobs(filters?: JobFilterOptions | string, legacyLocation?: string) {
    let q: string | undefined;
    let location: string | undefined;
    let minSalary: string | undefined;
    let experienceLevel: string | undefined;
    let jobType: string | undefined;

    if (typeof filters === "object" && filters !== null) {
      q = filters.q;
      location = filters.location;
      minSalary = filters.minSalary;
      experienceLevel = filters.experienceLevel;
      jobType = filters.jobType;
    } else {
      q = filters;
      location = legacyLocation;
    }

    const conditions = [];

    if (q && q.trim()) {
        const term = `%${q.trim()}%`;
        conditions.push(
            sql`(
                coalesce(${jobPostings.title}, '') ILIKE ${term} OR
                coalesce(${jobPostings.description}, '') ILIKE ${term} OR
                coalesce(${employerProfiles.companyName}, '') ILIKE ${term}
            )`
        );
    }

    if (location && location.trim()) {
        const locTerm = `%${location.trim()}%`;
        conditions.push(
            sql`coalesce(${jobPostings.location}, '') ILIKE ${locTerm}`
        );
    }

    if (experienceLevel && experienceLevel.trim()) {
        const expTerm = `%${experienceLevel.trim()}%`;
        conditions.push(
            sql`coalesce(${jobPostings.experienceLevel}, '') ILIKE ${expTerm}`
        );
    }

    if (jobType && jobType.trim()) {
        const typeTerm = `%${jobType.trim()}%`;
        conditions.push(
            sql`coalesce(${jobPostings.jobType}, '') ILIKE ${typeTerm}`
        );
    }

    if (minSalary && Number(minSalary) > 0) {
        const salaryValLPA = Number(minSalary);
        const salaryValRupees = salaryValLPA * 100000;
        conditions.push(
            sql`(
                CASE
                  WHEN ${jobPostings.salary} IS NULL THEN TRUE
                  WHEN NULLIF(regexp_replace(${jobPostings.salary}, '[^0-9]', '', 'g'), '') IS NULL THEN TRUE
                  WHEN NULLIF(regexp_replace(${jobPostings.salary}, '[^0-9]', '', 'g'), '')::numeric < 100 THEN NULLIF(regexp_replace(${jobPostings.salary}, '[^0-9]', '', 'g'), '')::numeric >= ${salaryValLPA}
                  ELSE NULLIF(regexp_replace(${jobPostings.salary}, '[^0-9]', '', 'g'), '')::numeric >= ${salaryValRupees}
                END
            )`
        );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

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
        .where(whereClause)
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