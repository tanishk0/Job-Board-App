import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { candidateProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

import CandidateProfile from "./CandidateProfile";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Unauthorized</div>;
    }

    const profile = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.userId, session.user.id));

    return <CandidateProfile profile={profile[0] ?? null} />;
}