"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-6 bg-[#F8FAFC] text-[#0F172A] font-sans">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold text-xs">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="font-bold text-[#0F172A] tracking-tight">Talentry</span>
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto my-auto">
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#6366F1] mx-auto flex items-center justify-center mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Create New Password</h1>
            <p className="text-xs text-[#64748B]">
              Enter your new account password below.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-10 h-10 bg-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Password Updated</h3>
              <p className="text-xs text-[#64748B]">
                Your password has been successfully reset.
              </p>
              <Link href="/auth">
                <Button variant="primary" size="md" className="w-full">
                  Sign In to Account
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="New Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Input
                label="Confirm New Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button type="submit" variant="primary" size="md" className="w-full">
                Update Password
              </Button>
            </form>
          )}
        </Card>
      </div>

      <div className="text-center py-2 text-xs text-[#94A3B8]">
        © {new Date().getFullYear()} Talentry Inc. All rights reserved.
      </div>
    </main>
  );
}
