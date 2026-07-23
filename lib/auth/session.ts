import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export async function requireAuth(){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/login")
    }

    return session
}

export async function requireEmployer(){
    const session = await requireAuth()
    
    if(session.user.role !== "employer"){
        throw new Error("Not an employer"); 
    }
        
    return session
}

export async function requireCandidate(){
    const session = await requireAuth()
    
    if(session.user.role !== "candidate"){
        throw new Error("Not a candidate"); 
    }
        
    return session
}