import { db } from "@/lib/db";
import { user } from "@/auth-schema";
import { candidateProfiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireEmployer } from "@/lib/auth/session";
import CandidateSearchClient from "./CandidateSearchClient";

export default async function EmployerCandidatesPage() {
  // Ensure authenticated employer
  await requireEmployer();

  // Query all candidates registered on the platform with their profile details
  const candidateRows = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: user.createdAt,
      headline: candidateProfiles.headline,
      bio: candidateProfiles.bio,
      location: candidateProfiles.location,
      phone: candidateProfiles.phone,
      resumeUrl: candidateProfiles.resumeUrl,
      portfolioUrl: candidateProfiles.portfolioUrl,
      githubUrl: candidateProfiles.githubUrl,
      experienceLevel: candidateProfiles.experienceLevel,
      preferredRole: candidateProfiles.preferredRole,
    })
    .from(user)
    .leftJoin(candidateProfiles, eq(user.id, candidateProfiles.userId))
    .where(eq(user.role, "candidate"))
    .orderBy(desc(user.createdAt));

  return <CandidateSearchClient candidates={candidateRows} />;
}
