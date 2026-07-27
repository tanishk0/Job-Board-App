"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, LogIn, UserPlus } from "lucide-react";

export default function GuestSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Browse Jobs", href: "/jobs", icon: Briefcase },
    { label: "Log In", href: "/auth", icon: LogIn },
    { label: "Sign Up", href: "/auth", icon: UserPlus },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0E103D] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Briefcase className="w-3.5 h-3.5" />
          </div>
          <span className="text-base font-bold tracking-tight text-[#0E103D]">
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
    </aside>
  );
}
