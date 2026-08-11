import Link from "next/link";
import { Briefcase, Building2, UserCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { redirectIfAuthenticated } from "@/lib/auth/session";

export default async function AuthPage() {
  await redirectIfAuthenticated();

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#5558E8] transition-colors">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0F172A]">
            Talentry
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Choice Section */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8 text-center space-y-8">
        <div className="space-y-3 max-w-xl mx-auto">
          <Badge variant="primary">
            <span>Talentry Access</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
            Select Your Account Role
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Choose your account role to continue to your candidate workspace or employer hiring dashboard.
          </p>
        </div>

        {/* 2 Options Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {/* Candidate Card */}
          <Card className="hover:border-[#6366F1]/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold text-[#6366F1] uppercase tracking-wider">
                  For Job Seekers
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] mt-1">Candidate</h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-1.5">
                  Browse open positions, submit direct job applications, track status updates, and manage your profile.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/auth/candidate/login" className="block w-full">
                <Button variant="primary" size="md" className="w-full">
                  <span>Log In as Candidate</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="text-center">
                <Link
                  href="/auth/candidate/signup"
                  className="text-xs text-[#64748B] hover:text-[#6366F1] transition-colors"
                >
                  Don&apos;t have an account? <span className="text-[#6366F1] font-semibold hover:underline">Sign Up</span>
                </Link>
              </div>
            </div>
          </Card>

          {/* Employer Card */}
          <Card className="hover:border-[#0F172A]/50 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold text-[#0F172A] uppercase tracking-wider">
                  For Hiring Teams
                </span>
                <h2 className="text-xl font-bold text-[#0F172A] mt-1">Employer</h2>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mt-1.5">
                  Post job openings, track applicant pipelines, search talent, and manage company branding.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link href="/auth/employer/login" className="block w-full">
                <Button variant="secondary" size="md" className="w-full">
                  <span>Log In as Employer</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <div className="text-center">
                <Link
                  href="/auth/employer/signup"
                  className="text-xs text-[#64748B] hover:text-[#0F172A] transition-colors"
                >
                  New employer? <span className="text-[#0F172A] font-semibold hover:underline">Register Company</span>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-[#94A3B8] font-medium">
        © {new Date().getFullYear()} Talentry Inc. All rights reserved.
      </div>
    </main>
  );
}