import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.99]";

  const sizeStyles = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#6366F1] text-white hover:bg-[#5558E8] active:bg-[#4F46E5] shadow-xs",
    secondary:
      "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] active:bg-[#F1F5F9] shadow-xs",
    outline:
      "bg-transparent text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A] shadow-xs",
    danger:
      "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] shadow-xs",
    ghost:
      "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
