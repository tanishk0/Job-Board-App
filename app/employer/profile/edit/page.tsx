import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { employerProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmployerProfileForm from "./EmployerProfileForm";

export default async function EmployerEditPage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return <div>Unauthorized</div>;
    }

    if (session.user.role !== "employer") {
        throw new Error("Forbidden");
        return <div>Forbidden(Account Role Mismatched)</div>
    }

    const profile = await db
        .select()
        .from(employerProfiles)
        .where(eq(employerProfiles.userId, session.user.id));

    return (
        <div>
            <EmployerProfileForm profile={profile[0] ?? null} />
        </div>
    );
}