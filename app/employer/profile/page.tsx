import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { employerProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmployerProfile from "./EmployerProfile";

export default async function EmployerProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Unauthorized</div>;
    }

    if (session.user.role !== "employer") {
        return <div className="text-black">Forbidden (Account Role Mismatch)</div>;
    }

    const profile = await db
        .select()
        .from(employerProfiles)
        .where(eq(employerProfiles.userId, session.user.id));

    return <EmployerProfile profile={profile[0] ?? null} />;
}