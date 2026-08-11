"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Briefcase, ArrowLeft, CheckCircle2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CandidateSignupPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  React.useEffect(() => {
    if (session?.user) {
      router.replace(session.user.role === "employer" ? "/employer/profile" : "/candidate/profile");
    }
  }, [session, router]);

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
  const [serverError, setServerError] = useState("");

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
    setServerError("");

    try {
      const { error } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: "candidate",
        callbackURL: "/candidate/profile",
      });

      setIsSubmitting(false);

      if (error) {
        setServerError(error.message || "Failed to create account. Please try again.");
        return;
      }

      setSubmitSuccess(true);
      router.push("/candidate/profile");
      router.refresh();
    } catch (err: any) {
      setIsSubmitting(false);
      setServerError(err.message || "An unexpected error occurred. Please check network connectivity.");
    }
  };

  if (session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-[#F8FAFC] text-[#0F172A] font-sans">
      {/* Header Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] text-white flex items-center justify-center font-bold">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0F172A]">Talentry</span>
        </Link>
        <Link href="/auth" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B] hover:text-[#6366F1]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Account Type</span>
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] mx-auto my-auto space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Create Candidate Account
          </h1>
          <p className="text-xs text-[#64748B]">
            Sign up to discover opportunities, upload your CV, and apply directly.
          </p>
        </div>

        {serverError && (
          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-lg flex items-center gap-2 text-xs text-[#DC2626]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        {submitSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-[#DCFCE7] text-[#16A34A] rounded-xl flex items-center justify-center mx-auto border border-[#BBF7D0]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Account Created!</h2>
            <p className="text-xs text-[#64748B]">
              Redirecting to set up your candidate profile...
            </p>
            <Button onClick={() => router.push("/candidate/profile")} variant="primary" size="md" className="w-full">
              Set Up Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              placeholder="Jane Doe"
              error={touched.name ? errors.name : undefined}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              placeholder="jane@example.com"
              error={touched.email ? errors.email : undefined}
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  placeholder="••••••••"
                  className={`w-full h-10 px-3.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg shadow-xs placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors ${
                    errors.password && touched.password ? "border-[#EF4444]" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#94A3B8] hover:text-[#0F172A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-xs text-[#EF4444] font-medium">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              size="md"
              className="w-full mt-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        )}

        <div className="text-center text-xs text-[#64748B]">
          Already have an account?{" "}
          <Link href="/auth/candidate/login" className="text-[#6366F1] font-semibold hover:underline">
            Log In
          </Link>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto text-center py-2 text-xs text-[#94A3B8]">
        © {new Date().getFullYear()} Talentry Inc. All rights reserved.
      </div>
    </main>
  );
}
