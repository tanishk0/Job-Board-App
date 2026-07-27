import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-6 shadow-xs ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`space-y-1.5 pb-4 border-b border-slate-100 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: CardProps) {
  return <h3 className={`text-lg font-semibold text-[#0E103D] tracking-tight ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }: CardProps) {
  return <p className={`text-sm text-[#313638]/70 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`pt-4 ${className}`}>{children}</div>;
}
