"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { db } from "@/lib/db"
import { jobPostings } from "@/db/schema"
import { redirect } from "next/navigation"
import { eq, and} from "drizzle-orm"


export async function createJob(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (session.user.role !== "employer") {
        throw new Error("Forbidden(Account Role Mismatched)");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const requirements = formData.get("requirements") as string;
    const responsibilities = formData.get("responsibilities") as string;
    const location = formData.get("location") as string;
    const salary = formData.get("salary") as string;
    const jobType = formData.get("jobType") as string;
    const experienceLevel = formData.get("experienceLevel") as string;

    await db.insert(jobPostings).values({
        employerId: session.user.id,
        title,
        description,
        requirements,
        responsibilities,
        location,
        salary,
        jobType,
        experienceLevel,
    });

    redirect("/employer/jobs");
}

//retrieve jobs
export async function getEmployerJobs() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (session.user.role !== "employer") {
        throw new Error("Forbidden(Account Role Mismatched)");
    }

    const employerId = session.user.id;

    const jobs = await db.select().from(jobPostings).where(eq(jobPostings.employerId, employerId));
    return jobs;
}


//get jobs by id

export async function getEmployerJobById(id:string  ){
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (session.user.role !== "employer") {
        throw new Error("Forbidden(Account Role Mismatched)");
    }

    const employerId = session.user.id;

    const jobs = await db.select().from(jobPostings)
    .where(
        and(
            eq(jobPostings.id, id),
            eq(jobPostings.employerId, employerId)
        )
    );
    return jobs[0] || null;
}

export async function updateJob(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (session.user.role !== "employer") {
        throw new Error("Forbidden(Account Role Mismatched)");
    }

    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const requirements = formData.get("requirements") as string;
    const responsibilities = formData.get("responsibilities") as string;
    const location = formData.get("location") as string;
    const salary = formData.get("salary") as string;
    const jobType = formData.get("jobType") as string;
    const experienceLevel = formData.get("experienceLevel") as string;

    await db
        .update(jobPostings)
        .set({
            title,
            description,
            requirements,
            responsibilities,
            location,
            salary,
            jobType,
            experienceLevel,
            updatedAt: new Date(),
        })
        .where(
            and(
                eq(jobPostings.id, id),
                eq(jobPostings.employerId, session.user.id)
            )
        );

    redirect("/employer/jobs");
}
