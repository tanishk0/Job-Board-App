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
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008DD5] focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-[#008DD5] text-white hover:bg-[#0076b3] active:bg-[#006093] shadow-xs",
    secondary: "bg-[#0E103D] text-white hover:bg-[#191d5a] active:bg-[#080927] shadow-xs",
    outline: "bg-white text-[#313638] border border-slate-200 hover:bg-slate-50 hover:text-[#0E103D] active:bg-slate-100 shadow-xs",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-xs",
    ghost: "text-[#313638] hover:bg-slate-100 hover:text-[#0E103D] active:bg-slate-200/70",
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
