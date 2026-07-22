"use server"

import { db } from '@/lib/db'
import { candidateProfiles } from '@/db/schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export async function updateCandidateProfile(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    const headline = formData.get("headline") as string;
    const bio = formData.get("bio") as string;
    const location = formData.get("location") as string;
    const phone = formData.get("phone") as string;
    const githubUrl = formData.get("githubUrl") as string;
    const portfolioUrl = formData.get("portfolioUrl") as string;
    const experienceLevel = formData.get("experienceLevel") as string;
    const preferredRole = formData.get("preferredRole") as string;
    const resumeUrl = formData.get("resumeUrl") as string;

    const existingProfile = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.userId, session.user.id));

    if (existingProfile.length === 0) {
        await db
            .insert(candidateProfiles)
            .values({
                userId: session.user.id,
                headline,
                bio,
                location,
                phone,
                githubUrl,
                portfolioUrl,
                experienceLevel,
                preferredRole,
                resumeUrl,
            });
    } else {
        await db
            .update(candidateProfiles)
            .set({
                headline,
                bio,
                location,
                phone,
                githubUrl,
                portfolioUrl,
                experienceLevel,
                preferredRole,
                resumeUrl,
                updatedAt: new Date(),
            })
            .where(eq(candidateProfiles.userId, session.user.id));
    }

    redirect("/candidate/profile");
}