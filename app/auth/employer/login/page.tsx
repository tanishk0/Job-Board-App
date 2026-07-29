"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function EmployerLoginPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  React.useEffect(() => {
    if (session?.user) {
      router.replace(session.user.role === "employer" ? "/employer/profile" : "/candidate/profile");
    }
  }, [session, router]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (field: string, value: string) => {
    let error = "";
    if (field === "email") {
      if (!value.trim()) {
        error = "Work email address is required";
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
    const emailErr = validateField("email", formData.email);
    const passwordErr = validateField("password", formData.password);

    setErrors({
      email: emailErr || undefined,
      password: passwordErr || undefined,
    });
    setTouched({ email: true, password: true });

    return !emailErr && !passwordErr;
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

    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
      callbackURL: "/employer/profile",
    });

    setIsSubmitting(false);

    if (error) {
      console.log(error);
      return;
    }

    setSubmitSuccess(true);
    router.push("/employer/profile");
    router.refresh();
  };

  if (session?.user) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-slate-50 text-[#313638]">
      {/* Header Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0E103D] text-white flex items-center justify-center font-bold">
            <Briefcase className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0E103D]">Talentry</span>
        </Link>
        <Link href="/auth" className="inline-flex items-center gap-1.5 text-xs font-medium text-[#313638]/70 hover:text-[#008DD5]">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch Account Type</span>
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-xs mx-auto my-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#0E103D]">
            Employer Log In
          </h1>
          <p className="text-xs text-[#313638]/70 mt-1">
            Access your hiring portal & active job postings
          </p>
        </div>

        {submitSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-[#0E103D]">Welcome Back!</h2>
            <p className="text-xs text-[#313638]/70">
              Successfully logged in. Redirecting to your employer dashboard...
            </p>
            <Button onClick={() => router.push("/employer")} variant="secondary" size="md" className="w-full">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <>
            {/* Google OAuth Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg font-medium text-xs text-[#313638] transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.3 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold tracking-wider relative">
                or log in with work email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <Input
                label="Work Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="recruiter@acme.com"
                error={touched.email ? errors.email : undefined}
              />

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-[#0E103D]">
                    Password
                  </label>
                  <a href="#" className="text-xs text-[#008DD5] hover:underline font-medium">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2 text-sm text-[#313638] bg-white border border-slate-200 rounded-lg shadow-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors ${
                      errors.password && touched.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && touched.password && (
                  <p className="text-xs text-red-600 font-medium">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="secondary"
                size="md"
                className="w-full mt-2"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </>
        )}

        <div className="mt-6 text-center text-xs text-[#313638]/70">
          Need an employer account?{" "}
          <Link href="/auth/employer/signup" className="text-[#008DD5] font-semibold hover:underline">
            Register Company
          </Link>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto text-center py-2 text-xs text-slate-400">
        © {new Date().getFullYear()} Talentry. All rights reserved.
      </div>
    </main>
  );
}
