import Link from "next/link";
import { Briefcase, Building2, UserCheck, ArrowRight, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#F79256]/30 selection:text-[#F79256]">
      {/* Top Navigation */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#F79256] text-white flex items-center justify-center font-bold shadow-md group-hover:bg-[#e07e42] transition-colors">
            <Briefcase className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Job<span className="text-[#F79256]">Board</span>
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Choice Section */}
      <div className="max-w-4xl w-full mx-auto my-auto py-12 px-2 text-center space-y-10">
        <div className="space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F79256]/10 border border-[#F79256]/20 text-[#F79256] text-xs font-semibold uppercase tracking-wider">
            Portal Access
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How would you like to continue?
          </h1>
          <p className="text-base sm:text-lg text-zinc-400">
            Select your role to log in or create a new account on JobBoard.
          </p>
        </div>

        {/* 2 Options Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          {/* Candidate Card */}
          <div className="bg-zinc-900/90 border border-zinc-800 hover:border-[#F79256]/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-6 group hover:shadow-xl hover:shadow-[#F79256]/5">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F79256]/10 text-[#F79256] flex items-center justify-center font-bold border border-[#F79256]/20 group-hover:scale-105 transition-transform">
                <UserCheck className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-semibold text-[#F79256] uppercase tracking-wider">
                  For Job Seekers
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">Candidate</h2>
                <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                  Browse open positions, submit applications, and manage your candidate profile.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/auth/candidate/login"
                className="w-full py-3.5 px-4 bg-[#F79256] hover:bg-[#e07e42] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#F79256]/20"
              >
                <span>Log In as Candidate</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <Link
                  href="/auth/candidate/signup"
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Don&apos;t have an account? <span className="text-[#F79256] font-medium hover:underline">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Employer Card */}
          <div className="bg-zinc-900/90 border border-zinc-800 hover:border-blue-500/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-6 group hover:shadow-xl hover:shadow-blue-500/5">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold border border-blue-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  For Hiring Teams
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">Employer</h2>
                <p className="text-sm text-zinc-400 leading-relaxed mt-2">
                  Post job openings, manage candidate applications, and showcase your company.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/auth/employer/login"
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-600/20"
              >
                <span>Log In as Employer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <Link
                  href="/auth/employer/signup"
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  New employer? <span className="text-blue-400 font-medium hover:underline">Register Company</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-zinc-500">
        © {new Date().getFullYear()} JobBoard. All rights reserved.
      </div>
    </main>
  );
}