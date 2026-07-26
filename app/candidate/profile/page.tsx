import { requireCandidate } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { candidateProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

import CandidateProfile from "./CandidateProfile";

export default async function ProfilePage() {
    const session = await requireCandidate();

    const profile = await db
        .select()
        .from(candidateProfiles)
        .where(eq(candidateProfiles.userId, session.user.id));

    return <CandidateProfile profile={profile[0] ?? null} />;
}