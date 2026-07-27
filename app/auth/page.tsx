import Link from "next/link";
import { Briefcase, Building2, UserCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-[#313638] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#008DD5]/10 selection:text-[#008DD5]">
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#0E103D] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#008DD5] transition-colors">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0E103D]">
            Talentry
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#313638]/70 hover:text-[#0E103D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Choice Section */}
      <div className="max-w-4xl w-full mx-auto my-auto py-8 text-center space-y-8">
        <div className="space-y-3 max-w-xl mx-auto">
          <Badge variant="primary">
            <span>Portal Access</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0E103D] leading-tight">
            Select Your Account Type
          </h1>
          <p className="text-sm sm:text-base text-[#313638]/80">
            Choose how you would like to continue to your Talentry portal.
          </p>
        </div>

        {/* 2 Options Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {/* Candidate Card */}
          <Card className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center font-bold">
                <UserCheck className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold text-[#008DD5] uppercase tracking-wider">
                  For Job Seekers
                </span>
                <h2 className="text-xl font-bold text-[#0E103D] mt-1">Candidate</h2>
                <p className="text-sm text-[#313638]/70 leading-relaxed mt-1.5">
                  Browse open positions, submit direct job applications, and manage your professional profile.
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
                  className="text-xs text-[#313638]/70 hover:text-[#008DD5] transition-colors"
                >
                  Don&apos;t have an account? <span className="text-[#008DD5] font-semibold hover:underline">Sign Up</span>
                </Link>
              </div>
            </div>
          </Card>

          {/* Employer Card */}
          <Card className="hover:border-[#0E103D]/50 transition-colors flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0E103D]/10 text-[#0E103D] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-semibold text-[#0E103D] uppercase tracking-wider">
                  For Hiring Teams
                </span>
                <h2 className="text-xl font-bold text-[#0E103D] mt-1">Employer</h2>
                <p className="text-sm text-[#313638]/70 leading-relaxed mt-1.5">
                  Post job openings, track applicant pipelines, and manage your company profile.
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
                  className="text-xs text-[#313638]/70 hover:text-[#0E103D] transition-colors"
                >
                  New employer? <span className="text-[#0E103D] font-semibold hover:underline">Register Company</span>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-[#313638]/60 font-medium">
        © {new Date().getFullYear()} Talentry. All rights reserved.
      </div>
    </main>
  );
}