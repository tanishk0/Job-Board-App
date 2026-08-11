import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full h-10 px-3.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg shadow-xs placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-colors disabled:bg-[#F8FAFC] disabled:opacity-60 ${
            error ? "border-[#EF4444] focus:ring-[#EF4444]" : ""
          } ${className}`}
          {...props}
        />
        {helperText && !error && <p className="text-xs text-[#64748B]">{helperText}</p>}
        {error && <p className="text-xs text-[#EF4444] font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
