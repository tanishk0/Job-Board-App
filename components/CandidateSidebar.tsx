import Link from "next/link";
import { UserCircle, Briefcase, FileText } from "lucide-react";

export default function CandidateSidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 shrink-0">
            <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900">Candidate Dashboard</h2>
            </div>

            <nav className="px-4 py-2 space-y-2">
                <Link
                    href="/candidate/profile"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <UserCircle className="w-6 h-6 mr-2" color="#F79256" />
                    Profile
                </Link>
                <Link
                    href="/jobs"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <Briefcase className="w-6 h-6 mr-2" color="#F79256" />
                    Browse Jobs
                </Link>
                <Link
                    href="/candidate/applications"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <FileText className="w-6 h-6 mr-2" color="#F79256" />
                    My Applications
                </Link>
            </nav>
        </aside>
    );
}
