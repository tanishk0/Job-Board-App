"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
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
        <Link href="/auth" className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto my-auto">
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#6366F1] mx-auto flex items-center justify-center mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A]">Reset Password</h1>
            <p className="text-xs text-[#64748B]">
              Enter your account email address to receive password reset instructions.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-10 h-10 bg-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Check your inbox</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                If an account exists for <span className="font-semibold text-[#0F172A]">{email}</span>, you will receive a reset link shortly.
              </p>
              <Link href="/auth">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
              <Button type="submit" variant="primary" size="md" className="w-full">
                Send Reset Link
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
