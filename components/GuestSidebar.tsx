import Link from "next/link";
import { Briefcase, LogIn, UserPlus } from "lucide-react";

export default function GuestSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen">
      <div className="p-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F79256] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Talen<span className="text-[#F79256]">try</span>
          </span>
        </Link>
      </div>

      <nav className="px-4 py-4 space-y-2">
        <Link
          href="/jobs"
          className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
        >
          <Briefcase className="w-5 h-5 mr-2 text-[#F79256]" />
          Browse Jobs
        </Link>
        <Link
          href="/auth"
          className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
        >
          <LogIn className="w-5 h-5 mr-2 text-[#F79256]" />
          Log In
        </Link>
        <Link
          href="/auth"
          className="flex items-center px-3 py-2 rounded-md text-slate-700 hover:bg-slate-100 font-medium text-sm transition-colors"
        >
          <UserPlus className="w-5 h-5 mr-2 text-[#F79256]" />
          Sign Up
        </Link>
      </nav>
    </aside>
  );
}
