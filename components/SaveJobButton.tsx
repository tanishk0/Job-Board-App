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
        className={`p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-center cursor-pointer ${
          optimisticIsSaved
            ? "bg-[#F79256]/10 border-[#F79256]/30 text-[#F79256] hover:bg-[#F79256]/20"
            : "bg-white border-slate-200 hover:border-[#F79256] text-slate-700 hover:text-[#F79256]"
        }`}
      >
        <Bookmark
          className={`w-4 h-4 transition-all duration-150 ${
            optimisticIsSaved
              ? "fill-[#F79256] text-[#F79256]"
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
      className={`p-3 border rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold shadow-xs ${
        optimisticIsSaved
          ? "bg-[#F79256]/10 border-[#F79256]/30 text-[#F79256] hover:bg-[#F79256]/20"
          : "bg-white border-slate-300 hover:border-[#F79256] text-slate-700 hover:text-[#F79256]"
      }`}
    >
      <Bookmark
        className={`w-5 h-5 transition-all duration-150 ${
          optimisticIsSaved
            ? "fill-[#F79256] text-[#F79256]"
            : "text-slate-700"
        }`}
      />
      <span className="hidden sm:inline">
        {optimisticIsSaved ? "Saved" : "Save Job"}
      </span>
    </button>
  );
}
