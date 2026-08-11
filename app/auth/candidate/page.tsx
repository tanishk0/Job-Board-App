import React from "react";
import Link from "next/link";
import { UserCheck, LogIn, UserPlus, ArrowLeft, Briefcase } from "lucide-react";
import { redirectIfAuthenticated } from "@/lib/auth/session";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export default async function CandidatePortalPage() {
  await redirectIfAuthenticated();

  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-6 bg-[#F8FAFC] text-[#0F172A] font-sans">
      <div className="max-w-md w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="font-bold text-[#0F172A] tracking-tight">Talentry</span>
        </Link>
        <Link href="/auth" className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Role</span>
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        <Card className="p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] text-[#6366F1] mx-auto flex items-center justify-center font-bold shadow-xs">
            <UserCheck className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <Badge variant="primary">Job Seeker Portal</Badge>
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Candidate Workspace
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Log in to your account or create a new candidate profile to start applying.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link href="/auth/candidate/login" className="block w-full">
              <Button variant="primary" size="lg" className="w-full">
                <LogIn className="w-4 h-4" />
                <span>Log In as Candidate</span>
              </Button>
            </Link>

            <Link href="/auth/candidate/signup" className="block w-full">
              <Button variant="outline" size="lg" className="w-full">
                <UserPlus className="w-4 h-4" />
                <span>Create Candidate Profile</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="text-center py-4 text-xs text-[#94A3B8]">
        © {new Date().getFullYear()} Talentry Inc. All rights reserved.
      </div>
    </main>
  );
}