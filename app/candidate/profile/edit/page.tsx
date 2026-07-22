import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { candidateProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

import CandidateProfileForm from "./CandidateProfileForm";

export default async function EditCandidateProfile() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Unauthorized</div>;
    }

    if (session.user.role !== "candidate") {
        // throw new Error("Forbidden");
        return <div className="text-black">Forbidden(Account Role Mismatched)</div>
    }

    const profile = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.userId, session.user.id));

    return <CandidateProfileForm profile={profile[0] ?? null} />;
}