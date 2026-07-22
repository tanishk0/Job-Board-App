"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { employerProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function updateEmployerProfile(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    if (session.user.role !== "employer") {
        throw new Error("Forbidden(Account Role Mismatched)");
    }

    const companyName = formData.get("companyName") as string;
    const companyLogoUrl = formData.get("companyLogoUrl") as string;
    const website = formData.get("website") as string;
    const companyDescription = formData.get("companyDescription") as string;
    const location = formData.get("location") as string;
    const contactEmail = formData.get("contactEmail") as string;

    const existingProfile = await db
        .select()
        .from(employerProfiles)
        .where(eq(employerProfiles.userId, session.user.id));

    if (existingProfile.length === 0) {
        await db
            .insert(employerProfiles)
            .values({
                userId: session.user.id,
                companyName,
                companyLogoUrl,
                website,
                companyDescription,
                location,
                contactEmail,
            });
    } else {
        await db
            .update(employerProfiles)
            .set({
                companyName,
                companyLogoUrl,
                website,
                companyDescription,
                location,
                contactEmail,
                updatedAt: new Date(),
            })
            .where(eq(employerProfiles.userId, session.user.id));
    }

    redirect("/employer/profile");
}