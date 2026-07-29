"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, Briefcase, PlusCircle, UserRoundSearch, Building2, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function EmployerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
          router.refresh();
        },
      },
    });
  };

  const navItems = [
    { label: "Overview", href: "/employer", icon: Building2 },
    { label: "Company Profile", href: "/employer/profile", icon: UserCircle },
    { label: "Job Postings", href: "/employer/jobs", icon: Briefcase },
    { label: "Search Talent", href: "/employer/candidates", icon: UserRoundSearch },
    { label: "Post New Job", href: "/employer/jobs/new", icon: PlusCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-[#0E103D] tracking-tight">Employer Portal</h2>
      </div>

      <nav className="px-3 py-4 space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/employer" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#008DD5]/10 text-[#008DD5] border-l-4 border-[#008DD5] font-semibold"
                  : "text-[#313638] hover:bg-slate-100 hover:text-[#0E103D]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#008DD5]" : "text-[#313638]/70"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200 mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>
    </aside>
  );
}