"use client";

import { useState } from "react";
import { useJobSearch } from "@/hooks/useJobSearch";
import { Search, MapPin, X, Loader2, IndianRupee, Briefcase, SlidersHorizontal, ChevronDown, ChevronUp, Layers } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  debounceMs?: number;
};

export default function SearchBar({
  placeholder = "Search jobs by title, skills, or company...",
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
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.04)] p-2.5 flex items-center gap-3">
        {isPending ? (
          <Loader2 className="w-4 h-4 text-[#6366F1] animate-spin shrink-0 ml-2" />
        ) : (
          <Search className="w-4 h-4 text-[#64748B] shrink-0 ml-2" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm font-medium text-[#0F172A] bg-transparent focus:outline-none placeholder:text-[#94A3B8]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-[#94A3B8] hover:text-[#0F172A] cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            showFilters || hasFilters
              ? "bg-[#EEF2FF] border-[#C7D2FE] text-[#6366F1]"
              : "bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#F1F5F9]"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filters</span>
          {hasFilters && (
            <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
          )}
          {showFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Input Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Location</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bangalore, Remote, Hybrid..."
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1]"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="absolute right-2.5 text-[#94A3B8] hover:text-[#0F172A]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Salary Range Slider Filter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                <span className="flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Min Salary</span>
                </span>
                <span className="text-[#6366F1] font-bold normal-case text-xs">
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
                  className="w-full h-1.5 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#6366F1]"
                />
                <div className="flex justify-between text-[10px] font-semibold text-[#94A3B8]">
                  <span>₹0</span>
                  <span>₹25 LPA</span>
                  <span>₹50 LPA+</span>
                </div>
              </div>
            </div>

            {/* Experience Level Filter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Experience Level</span>
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] cursor-pointer"
              >
                <option value="">All Experience Levels</option>
                <option value="fresher">Fresher</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>

          {/* Job Type Chips Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F1F5F9]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Type:</span>
              </span>

              {["", "full-time", "part-time", "contract", "internship", "remote"].map((type) => {
                const isSelected = jobType === type;
                const label = type === "" ? "All Types" : type.replace("-", " ");

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setJobType(type)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer capitalize ${
                      isSelected
                        ? "bg-[#6366F1] text-white border-[#6366F1]"
                        : "bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-medium text-[#EF4444] hover:underline cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
