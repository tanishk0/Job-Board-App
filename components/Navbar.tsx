"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, LayoutDashboard, ArrowRight, Menu, X, Building2, DollarSign } from "lucide-react";
import { Button } from "./ui/Button";

interface NavbarProps {
  session?: {
    user?: {
      role?: string;
    };
  } | null;
}

export function Navbar({ session }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEmployer = session?.user?.role === "employer";
  const isCandidate = session?.user?.role === "candidate";

  const employerDashboardHref = isEmployer ? "/employer" : "/auth/employer/login";
  const candidateDashboardHref = isCandidate ? "/candidate" : "/auth/candidate/login";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#5558E8] transition-colors">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0F172A]">
            Talentry
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#475569]">
          <Link href="/jobs" className="hover:text-[#6366F1] transition-colors">
            Find Jobs
          </Link>
          <Link href="/companies" className="hover:text-[#6366F1] transition-colors">
            Companies
          </Link>
          <Link href="/salaries" className="hover:text-[#6366F1] transition-colors">
            Salaries
          </Link>
          <Link href={candidateDashboardHref} className="hover:text-[#6366F1] transition-colors">
            For Candidates
          </Link>
          <Link href={employerDashboardHref} className="hover:text-[#6366F1] transition-colors">
            For Employers
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {session ? (
            <Link href={isEmployer ? "/employer" : "/candidate"}>
              <Button variant="outline" size="sm">
                <LayoutDashboard className="w-4 h-4 text-[#6366F1]" />
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : (
            <Link href="/auth">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          <Link href="/jobs">
            <Button variant="primary" size="sm">
              <span>Explore Jobs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#475569] hover:bg-[#F1F5F9] cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1 text-sm font-medium text-[#475569]">
            <Link
              href="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#6366F1]"
            >
              <Briefcase className="w-4 h-4" />
              <span>Find Jobs</span>
            </Link>
            <Link
              href="/companies"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#6366F1]"
            >
              <Building2 className="w-4 h-4" />
              <span>Companies</span>
            </Link>
            <Link
              href="/salaries"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#6366F1]"
            >
              <DollarSign className="w-4 h-4" />
              <span>Salaries</span>
            </Link>
            <Link
              href={candidateDashboardHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#6366F1]"
            >
              <span>For Candidates</span>
            </Link>
            <Link
              href={employerDashboardHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] hover:text-[#6366F1]"
            >
              <span>For Employers</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-2">
            {session ? (
              <Link href={isEmployer ? "/employer" : "/candidate"} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  <LayoutDashboard className="w-4 h-4 text-[#6366F1]" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            ) : (
              <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/jobs" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="sm" className="w-full">
                Explore Jobs
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
