"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function CandidateSignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters long";
      }
    }

    if (field === "email") {
      if (!value.trim()) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address";
      }
    }

    if (field === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number";
      }
    }

    return error;
  };

  const validateForm = () => {
    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const passwordErr = validateField("password", formData.password);

    const newErrors = {
      name: nameErr || undefined,
      email: emailErr || undefined,
      password: passwordErr || undefined,
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    return !nameErr && !emailErr && !passwordErr;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "candidate",
      callbackURL: "/candidate",
    });

    setIsSubmitting(false);

    if (error) {
      console.log(error);
      return;
    }

    setSubmitSuccess(true);
    router.push("/candidate");
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { score: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score === 2 || score === 3) return { score: 2, label: "Medium", color: "bg-yellow-500" };
    return { score: 3, label: "Strong", color: "bg-green-500" };
  };

  const strength = getPasswordStrength();

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white">
      <div className="w-full max-w-md bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl rounded-md p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-[#FF8811]/10 text-[#FF8811] mb-3">
            <svg
              className="w-6 h-6"
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
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create Candidate Account
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Join to discover top career opportunities
          </p>
        </div>

        {submitSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#FF8811]/20 text-[#FF8811] rounded-md flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Account Created!</h2>
            <p className="text-sm text-zinc-400">
              Welcome aboard, <span className="text-white font-medium">{formData.name}</span>. You can now proceed to explore jobs.
            </p>
            <button
              onClick={() => {
                router.push("/candidate");
              }}
              className="mt-4 px-6 py-2 rounded-md bg-[#FF8811] text-white font-medium hover:bg-[#e0770f] transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Google Signup Button */}
            <button
              type="button"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "google",
                  callbackURL: "/candidate",
                });
              }}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/80 rounded-md font-medium text-sm text-zinc-200 transition-all hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#FF8811]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="border-t border-zinc-800 w-full"></div>
              <span className="bg-zinc-900 px-3 text-xs text-zinc-500 uppercase font-semibold tracking-wider relative">
                or sign up with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-2.5 bg-zinc-800/60 border ${errors.name && touched.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700/80 focus:border-[#FF8811] focus:ring-[#FF8811]"
                      } rounded-md text-sm text-white placeholder-zinc-500 outline-none transition-all focus:ring-1`}
                  />
                </div>
                {errors.name && touched.name && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="candidate@example.com"
                    className={`w-full pl-11 pr-4 py-2.5 bg-zinc-800/60 border ${errors.email && touched.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700/80 focus:border-[#FF8811] focus:ring-[#FF8811]"
                      } rounded-md text-sm text-white placeholder-zinc-500 outline-none transition-all focus:ring-1`}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-11 py-2.5 bg-zinc-800/60 border ${errors.password && touched.password
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-700/80 focus:border-[#FF8811] focus:ring-[#FF8811]"
                      } rounded-md text-sm text-white placeholder-zinc-500 outline-none transition-all focus:ring-1`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.018 10.018 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-1.258-1.258a3 3 0 11-4.243-4.243" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </p>
                )}
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Password strength:</span>
                      <span className="font-semibold text-zinc-300">{strength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-md overflow-hidden flex gap-1 p-0.5">
                      <div className={`h-full rounded-md transition-all duration-300 ${strength.score >= 1 ? strength.color : "bg-zinc-800"}`} style={{ width: "33%" }} />
                      <div className={`h-full rounded-md transition-all duration-300 ${strength.score >= 2 ? strength.color : "bg-zinc-800"}`} style={{ width: "33%" }} />
                      <div className={`h-full rounded-md transition-all duration-300 ${strength.score >= 3 ? strength.color : "bg-zinc-800"}`} style={{ width: "34%" }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-3 px-4 bg-[#FF8811] hover:bg-[#e0770f] text-white font-semibold rounded-md shadow-lg shadow-[#FF8811]/25 hover:shadow-[#FF8811]/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8811] focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/candidate/login"
            className="text-[#FF8811] hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
