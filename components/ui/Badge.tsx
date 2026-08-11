import React from "react";

interface BadgeProps {
  variant?: "primary" | "brand" | "neutral" | "success" | "warning" | "danger" | "info";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "primary", children, className = "" }: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border";

  const variantStyles = {
    primary: "bg-[#EEF2FF] text-[#6366F1] border-[#C7D2FE]",
    brand: "bg-[#F5F3FF] text-[#4F46E5] border-[#DDD6FE]",
    neutral: "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]",
    success: "bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]",
    warning: "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]",
    danger: "bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]",
    info: "bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE]",
  };

  return <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</span>;
}
