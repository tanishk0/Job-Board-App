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
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm hover:shadow-md transition-all p-3 flex items-center gap-3">
        {isPending ? (
          <Loader2 className="w-5 h-5 text-[#F79256] animate-spin shrink-0 ml-1" />
        ) : (
          <Search className="w-5 h-5 text-[#F79256] shrink-0 ml-1" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm sm:text-base font-medium text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
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
          className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            showFilters || hasFilters
              ? "bg-[#F79256]/10 border-[#F79256]/30 text-[#F79256]"
              : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-[#F79256]" />
          )}
          {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Location Input Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F79256]" />
                <span>Location</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Delhi, Remote, Hybrid..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="absolute right-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Salary Range Slider Filter (in Rs LPA) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Min Salary</span>
                </span>
                <span className="text-[#F79256] font-extrabold normal-case text-xs">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#F79256]"
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
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Experience Level</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256] cursor-pointer"
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#F79256]" />
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    jobType === type.value
                      ? "bg-[#F79256] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
                className="text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer shrink-0 self-end sm:self-center"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
