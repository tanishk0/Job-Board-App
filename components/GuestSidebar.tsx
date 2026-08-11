"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LogIn, UserPlus } from "lucide-react";

export default function GuestSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Browse Jobs", href: "/jobs", icon: Briefcase },
    { label: "Sign In", href: "/auth", icon: LogIn },
    { label: "Create Account", href: "/auth", icon: UserPlus },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E2E8F0] shrink-0 min-h-screen flex flex-col">
      <div className="p-5 border-b border-[#F1F5F9]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <span className="text-base font-bold tracking-tight text-[#0F172A]">
            Talentry
          </span>
        </Link>
      </div>

      <nav className="px-3 py-4 space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[#EEF2FF] text-[#6366F1] font-semibold"
                  : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#6366F1]" : "text-[#64748B]"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
