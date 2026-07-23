import Link from "next/link";

export default function EmployerSidebar() {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 shrink-0">
            <div className="p-6">
                <h2 className="text-xl font-bold text-slate-900">Employer Dashboard</h2>
            </div>

            <nav className="px-4 py-2 space-y-2">
                <Link
                    href="/employer/profile"
                    className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100"
                >
                    Profile
                </Link>
                <Link
                    href="/employer/jobs"
                    className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100"
                >
                    Jobs
                </Link>
                <Link
                    href="/employer/candidates"
                    className="block px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100"
                >
                    Search Talent
                </Link>
            </nav>
        </aside>
    )
}