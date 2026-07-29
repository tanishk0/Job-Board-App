import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
    return await auth.api.getSession({
        headers: await headers()
    });
}

export async function requireAuth() {
    const session = await getSession();

    if (!session) {
        redirect("/auth");
    }

    return session;
}

export async function requireEmployer() {
    const session = await getSession();

    if (!session) {
        redirect("/auth/employer/login");
    }

    if (session.user.role !== "employer") {
        redirect("/auth/employer/login");
    }

    return session;
}

export async function requireCandidate() {
    const session = await getSession();

    if (!session) {
        redirect("/auth/candidate/login");
    }

    if (session.user.role !== "candidate") {
        redirect("/auth/candidate/login");
    }

    return session;
}

export async function redirectIfAuthenticated() {
    const session = await getSession();

    if (session?.user) {
        if (session.user.role === "employer") {
            redirect("/employer/profile");
        } else {
            redirect("/candidate/profile");
        }
    }
}