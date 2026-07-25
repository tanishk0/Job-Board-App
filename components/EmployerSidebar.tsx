import Link from "next/link";
import { UserCircle, Briefcase, PlusCircle, Search } from "lucide-react";

export default function EmployerSidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen">
            <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900">Employer Dashboard</h2>
            </div>

            <nav className="px-4 py-2 space-y-2">
                <Link
                    href="/employer/profile"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <UserCircle className="w-5 h-5 mr-2 text-[#F79256]" />
                    Profile
                </Link>
                <Link
                    href="/employer/jobs"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <Briefcase className="w-5 h-5 mr-2 text-[#F79256]" />
                    My Job Postings
                </Link>
                <Link
                    href="/jobs"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <Search className="w-5 h-5 mr-2 text-[#F79256]" />
                    Browse Jobs
                </Link>
                <Link
                    href="/employer/jobs/new"
                    className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
                >
                    <PlusCircle className="w-5 h-5 mr-2 text-[#F79256]" />
                    Post New Job
                </Link>
            </nav>
        </aside>
    );
}