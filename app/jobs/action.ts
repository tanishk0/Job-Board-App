import { db } from "@/lib/db"
import { jobPostings, employerProfiles } from "@/db/schema"
import { eq, desc } from "drizzle-orm";

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
        .innerJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
        .orderBy(desc(jobPostings.createdAt))
    return jobs
}