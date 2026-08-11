import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`space-y-1.5 pb-4 border-b border-[#F1F5F9] ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: CardProps) {
  return <h3 className={`text-lg font-semibold text-[#0F172A] tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }: CardProps) {
  return <p className={`text-sm text-[#64748B] ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`pt-4 ${className}`}>{children}</div>;
}
