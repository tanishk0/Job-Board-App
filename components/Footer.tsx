import Link from "next/link";
import { Briefcase } from "lucide-react";

interface FooterProps {
  candidateDashboardHref?: string;
  employerDashboardHref?: string;
}

export function Footer({
  candidateDashboardHref = "/auth/candidate/login",
  employerDashboardHref = "/auth/employer/login",
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] pt-12 pb-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-[#0F172A]">Talentry</span>
            </div>
            <p className="text-xs text-[#64748B] leading-relaxed max-w-xs">
              The modern hiring platform connecting tech candidates with top opportunities and streamlined recruitment pipelines.
            </p>
          </div>

          {/* For Candidates */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">For Candidates</h4>
            <ul className="space-y-1.5 text-xs text-[#475569]">
              <li>
                <Link href="/jobs" className="hover:text-[#6366F1] transition-colors">Browse Jobs</Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-[#6366F1] transition-colors">Explore Companies</Link>
              </li>
              <li>
                <Link href="/salaries" className="hover:text-[#6366F1] transition-colors">Salary Calculator</Link>
              </li>
              <li>
                <Link href={candidateDashboardHref} className="hover:text-[#6366F1] transition-colors">Candidate Portal</Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">For Employers</h4>
            <ul className="space-y-1.5 text-xs text-[#475569]">
              <li>
                <Link href={employerDashboardHref} className="hover:text-[#6366F1] transition-colors">Post a Job</Link>
              </li>
              <li>
                <Link href="/employer/candidates" className="hover:text-[#6366F1] transition-colors">Candidate Database</Link>
              </li>
              <li>
                <Link href={employerDashboardHref} className="hover:text-[#6366F1] transition-colors">Employer Dashboard</Link>
              </li>
              <li>
                <Link href="/employer/billing" className="hover:text-[#6366F1] transition-colors">Pricing & Plans</Link>
              </li>
            </ul>
          </div>

          {/* Platform & Legal */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F172A]">Platform & Legal</h4>
            <ul className="space-y-1.5 text-xs text-[#475569]">
              <li>
                <Link href="/about" className="hover:text-[#6366F1] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#6366F1] transition-colors">Career Guides</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#6366F1] transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#6366F1] transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#6366F1] transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[#6366F1] transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F1F5F9] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} Talentry Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#6366F1]">Privacy</Link>
            <Link href="/terms" className="hover:text-[#6366F1]">Terms</Link>
            <Link href="/cookies" className="hover:text-[#6366F1]">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
