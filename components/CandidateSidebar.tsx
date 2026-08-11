"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  Bell,
  Compass,
  UserCircle,
  FolderDown,
  TrendingUp,
  Award,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function CandidateSidebar() {
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
      title: "Core Portal",
      items: [
        { label: "Dashboard", href: "/candidate", icon: LayoutDashboard },
        { label: "Find Opportunities", href: "/jobs", icon: Briefcase },
        { label: "My Applications", href: "/candidate/applications", icon: FileText },
        { label: "Saved Jobs", href: "/candidate/saved-jobs", icon: Bookmark },
        { label: "Job Alerts", href: "/candidate/alerts", icon: Bell },
        { label: "Recommended", href: "/candidate/recommendations", icon: Compass },
      ],
    },
    {
      title: "Career & Profile",
      items: [
        { label: "Candidate Profile", href: "/candidate/profile", icon: UserCircle },
        { label: "Resume & Documents", href: "/candidate/documents", icon: FolderDown },
        { label: "Career Insights", href: "/candidate/insights", icon: TrendingUp },
        { label: "Skill Verifications", href: "/candidate/skills", icon: Award },
        { label: "Notifications", href: "/candidate/notifications", icon: Bell },
        { label: "Account Settings", href: "/candidate/settings", icon: Settings },
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
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#6366F1] border border-[#C7D2FE]">
            Candidate
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
                  pathname === item.href || (item.href !== "/jobs" && item.href !== "/candidate" && pathname.startsWith(item.href));

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

      {/* Logout Action Footer */}
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
