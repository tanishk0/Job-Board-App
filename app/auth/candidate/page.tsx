import React from "react";
import Link from "next/link";

export default function CandidatePortalPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white">
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-md p-8 shadow-2xl text-center">
        {/* Header Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-md bg-[#FF8811]/10 text-[#FF8811] mb-4">
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Candidate Portal
        </h1>
        <p className="text-sm text-zinc-400 mb-8">
          Welcome! Please choose an option below to continue.
        </p>

        {/* 2 Clean Buttons */}
        <div className="space-y-4">
          <Link
            href="/auth/candidate/login"
            className="w-full py-3.5 px-4 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-[#FF8811] text-white hover:text-[#FF8811] font-semibold rounded-md transition-all duration-200 flex items-center justify-center gap-2.5 group"
          >
            <svg
              className="w-5 h-5 text-zinc-400 group-hover:text-[#FF8811] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Log In</span>
          </Link>

          <Link
            href="/auth/candidate/signup"
            className="w-full py-3.5 px-4 bg-[#FF8811] hover:bg-[#e0770f] text-white font-semibold rounded-md shadow-lg shadow-[#FF8811]/25 hover:shadow-[#FF8811]/40 transition-all duration-200 flex items-center justify-center gap-2.5"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </main>
  );
}