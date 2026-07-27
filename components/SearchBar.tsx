"use client";

import { useState } from "react";
import { useJobSearch } from "@/hooks/useJobSearch";
import { Search, MapPin, X, Loader2, IndianRupee, Sparkles, Briefcase, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  debounceMs?: number;
};

export default function SearchBar({
  placeholder = "Search job title, keywords, or company...",
  className = "",
  debounceMs = 350,
}: SearchBarProps) {
  const {
    query,
    location,
    minSalary,
    experienceLevel,
    jobType,
    setQuery,
    setLocation,
    setMinSalary,
    setExperienceLevel,
    setJobType,
    clearFilters,
    isPending,
    hasFilters,
  } = useJobSearch(debounceMs);

  const [showFilters, setShowFilters] = useState<boolean>(true);

  const salaryDisplay = Number(minSalary) > 0 ? `₹${Number(minSalary)} LPA+` : "Any Salary";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-2.5 flex items-center gap-3">
        {isPending ? (
          <Loader2 className="w-4 h-4 text-[#008DD5] animate-spin shrink-0 ml-2" />
        ) : (
          <Search className="w-4 h-4 text-[#313638]/70 shrink-0 ml-2" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm font-medium text-[#313638] bg-transparent focus:outline-none placeholder:text-slate-400"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            showFilters || hasFilters
              ? "bg-[#008DD5]/10 border-[#008DD5]/30 text-[#008DD5]"
              : "bg-slate-100 border-slate-200 text-[#313638] hover:bg-slate-200"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filters</span>
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-[#008DD5]" />
          )}
          {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Input Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0E103D] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#008DD5]" />
                <span>Location</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Delhi, Remote, Hybrid..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] focus:outline-none focus:border-[#008DD5] focus:ring-1 focus:ring-[#008DD5]"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Salary Range Slider Filter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0E103D]">
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Min Salary</span>
                </span>
                <span className="text-[#008DD5] font-bold normal-case text-xs">
                  {salaryDisplay}
                </span>
              </div>
              <div className="pt-2 px-1 space-y-1">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="2"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#008DD5]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                  <span>₹0</span>
                  <span>₹25 LPA</span>
                  <span>₹50 LPA+</span>
                </div>
              </div>
            </div>

            {/* Experience Level Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0E103D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#008DD5]" />
                <span>Experience Level</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] focus:outline-none focus:border-[#008DD5] focus:ring-1 focus:ring-[#008DD5] cursor-pointer"
              >
                <option value="">All Experience Levels</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          {/* Job Type Pills & Clear Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500 mr-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#0E103D]" />
                Job Type:
              </span>
              {[
                { label: "All Types", value: "" },
                { label: "Full-time", value: "full-time" },
                { label: "Part-time", value: "part-time" },
                { label: "Internship", value: "internship" },
                { label: "Contract", value: "contract" },
              ].map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setJobType(type.value)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    jobType === type.value
                      ? "bg-[#008DD5] text-white shadow-xs"
                      : "bg-slate-100 text-[#313638] hover:bg-slate-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-[#008DD5] hover:underline transition-colors cursor-pointer shrink-0 self-end sm:self-center"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
