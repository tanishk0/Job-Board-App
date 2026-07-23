import Link from "next/link";
import { UserCircle, Briefcase, FileText } from "lucide-react";

export default async function CandidateDashboardPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Candidate Dashboard</h1>
                <p className="text-slate-500 text-sm">Welcome back! Manage your profile and applications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <Link
                    href="/candidate/profile"
                    className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#F79256]/50 transition-all flex flex-col gap-3 group"
                >
                    <div className="w-10 h-10 rounded-lg bg-[#F79256]/10 text-[#F79256] flex items-center justify-center">
                        <UserCircle className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 group-hover:text-[#F79256] transition-colors">Profile</h2>
                        <p className="text-xs text-slate-500 mt-1">View and edit your candidate profile</p>
                    </div>
                </Link>

                <Link
                    href="/jobs"
                    className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#F79256]/50 transition-all flex flex-col gap-3 group"
                >
                    <div className="w-10 h-10 rounded-lg bg-[#F79256]/10 text-[#F79256] flex items-center justify-center">
                        <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 group-hover:text-[#F79256] transition-colors">Browse Jobs</h2>
                        <p className="text-xs text-slate-500 mt-1">Explore and search latest job openings</p>
                    </div>
                </Link>

                <Link
                    href="/candidate/applications"
                    className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#F79256]/50 transition-all flex flex-col gap-3 group"
                >
                    <div className="w-10 h-10 rounded-lg bg-[#F79256]/10 text-[#F79256] flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900 group-hover:text-[#F79256] transition-colors">My Applications</h2>
                        <p className="text-xs text-slate-500 mt-1">Track status of submitted applications</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}