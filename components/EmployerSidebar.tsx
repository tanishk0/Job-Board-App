"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Building2,
  Briefcase,
  Users,
  UserRoundSearch,
  PlusCircle,
  BarChart3,
  UserCircle,
  Users2,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
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

  const navSections = [
    {
      title: "Hiring Pipeline",
      items: [
        { label: "Dashboard Overview", href: "/employer", icon: Building2 },
        { label: "Job Postings", href: "/employer/jobs", icon: Briefcase },
        { label: "Post New Job", href: "/employer/jobs/new", icon: PlusCircle },
        { label: "All Applicants", href: "/employer/applications", icon: Users },
        { label: "Search Candidates", href: "/employer/candidates", icon: UserRoundSearch },
      ],
    },
    {
      title: "Company Management",
      items: [
        { label: "Hiring Analytics", href: "/employer/analytics", icon: BarChart3 },
        { label: "Company Profile", href: "/employer/profile", icon: UserCircle },
        { label: "Team Members", href: "/employer/team", icon: Users2 },
        { label: "Billing & Plans", href: "/employer/billing", icon: CreditCard },
        { label: "Notifications", href: "/employer/notifications", icon: Bell },
        { label: "Company Settings", href: "/employer/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] shrink-0 min-h-screen flex flex-col justify-between">
      <div>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="font-bold text-[#0F172A] tracking-tight">Talentry</span>
          </Link>
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#F5F3FF] text-[#4F46E5] border border-[#DDD6FE]">
            Employer
          </span>
        </div>

        {/* Navigation Groups */}
        <div className="p-3 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href !== "/employer" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#EEF2FF] text-[#6366F1] font-semibold"
                        : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#6366F1]" : "text-[#64748B]"}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#6366F1]" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Logout Footer */}
      <div className="p-3 border-t border-[#E2E8F0]">
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#EF4444] hover:bg-[#FEE2E2]/60 hover:text-[#DC2626] transition-colors disabled:opacity-50 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#EF4444]" />
          <span>{isLoggingOut ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>
    </aside>
  );
}