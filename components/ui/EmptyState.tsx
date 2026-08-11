import React from "react";
import { LucideIcon, Inbox } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.04)] max-w-md mx-auto my-6 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
        <p className="text-xs sm:text-sm text-[#64748B] max-w-xs leading-relaxed">{description}</p>
      </div>

      {actionLabel && (onAction || actionHref) && (
        <div className="pt-2">
          {actionHref ? (
            <a href={actionHref}>
              <Button variant="primary" size="sm">
                {actionLabel}
              </Button>
            </a>
          ) : (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
