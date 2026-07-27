import React from "react";

interface BadgeProps {
  variant?: "primary" | "brand" | "neutral" | "success" | "warning" | "danger";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "primary", children, className = "" }: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border";

  const variantStyles = {
    primary: "bg-[#008DD5]/10 text-[#008DD5] border-[#008DD5]/20",
    brand: "bg-[#0E103D]/10 text-[#0E103D] border-[#0E103D]/20",
    neutral: "bg-slate-100 text-[#313638] border-slate-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    danger: "bg-red-50 text-red-700 border-red-200",
  };

  return <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</span>;
}
