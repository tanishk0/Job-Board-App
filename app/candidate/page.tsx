"use-client"

import Link from "next/link";
import { UserCircle, Building, Workflow} from "lucide-react";

export default async function CandidateDashboardPage() {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <div className="w-4/5 h-4/5 flex flex-col">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <div className="w-1/5 mt-10 p-2">
                    <div className="flex items-center gap-2 mb-5 cursor-pointer">
                        <Link href="/candidate/profile/edit"><UserCircle size={24} color="white"></UserCircle></Link>
                        <Link href="/candidate/profile/edit"><p className="text-xl text-white">Profile</p></Link>
                    </div>
                    <div className="flex items-center gap-2 mb-5 cursor-pointer">
                        <Building size={24} color="white"></Building><p className="text-xl text-white">Applications</p>
                    </div> 
                    <div className="flex items-center gap-2 mb-5 cursor-pointer">
                        <Workflow size={24} color="white"></Workflow><p className="text-xl text-white">Explore Jobs</p>
                    </div>
                </div>
            </div>
        </div>
    );
}