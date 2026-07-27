"use client";

import { useOptimistic, useTransition } from "react";
import { Bookmark } from "lucide-react";
import { toggleSaveJob } from "@/app/candidate/saved/actions";

type SaveJobButtonProps = {
  jobId: string;
  initialIsSaved: boolean;
  compact?: boolean;
};

export default function SaveJobButton({
  jobId,
  initialIsSaved,
  compact = false,
}: SaveJobButtonProps) {
  const [, startTransition] = useTransition();

  const [optimisticIsSaved, setOptimisticIsSaved] = useOptimistic(
    initialIsSaved,
    (_current, nextState: boolean) => nextState
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const nextState = !optimisticIsSaved;

    startTransition(async () => {
      setOptimisticIsSaved(nextState);

      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("isSaved", optimisticIsSaved ? "true" : "false");

      try {
        await toggleSaveJob(formData);
      } catch (error) {
        console.error("Failed to update saved job status:", error);
      }
    });
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        title={optimisticIsSaved ? "Saved" : "Save Job"}
        className={`p-2 rounded-lg border transition-colors flex items-center justify-center cursor-pointer ${
          optimisticIsSaved
            ? "bg-[#008DD5]/10 border-[#008DD5]/30 text-[#008DD5] hover:bg-[#008DD5]/20"
            : "bg-white border-slate-200 hover:border-[#008DD5] text-slate-700 hover:text-[#008DD5]"
        }`}
      >
        <Bookmark
          className={`w-4 h-4 transition-colors ${
            optimisticIsSaved
              ? "fill-[#008DD5] text-[#008DD5]"
              : "text-slate-500"
          }`}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={optimisticIsSaved ? "Unsave Job" : "Save Job"}
      className={`px-4 py-2 border rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm font-medium shadow-xs ${
        optimisticIsSaved
          ? "bg-[#008DD5]/10 border-[#008DD5]/30 text-[#008DD5] hover:bg-[#008DD5]/20"
          : "bg-white border-slate-200 hover:border-[#008DD5] text-slate-700 hover:text-[#008DD5]"
      }`}
    >
      <Bookmark
        className={`w-4 h-4 transition-colors ${
          optimisticIsSaved
            ? "fill-[#008DD5] text-[#008DD5]"
            : "text-slate-600"
        }`}
      />
      <span>{optimisticIsSaved ? "Saved" : "Save Job"}</span>
    </button>
  );
}
