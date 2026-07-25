"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function useJobSearch(delay = 350) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minSalary, setMinSalary] = useState(searchParams.get("minSalary") || "0");
  const [experienceLevel, setExperienceLevel] = useState(searchParams.get("experienceLevel") || "");
  const [jobType, setJobType] = useState(searchParams.get("jobType") || "");

  // Debounced URL search parameter update
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQ = searchParams.get("q") || "";
      const currentLoc = searchParams.get("location") || "";
      const currentSalary = searchParams.get("minSalary") || "0";
      const currentExp = searchParams.get("experienceLevel") || "";
      const currentType = searchParams.get("jobType") || "";

      // Skip if values match current URL state
      if (
        query.trim() === currentQ &&
        location.trim() === currentLoc &&
        minSalary === currentSalary &&
        experienceLevel === currentExp &&
        jobType === currentType
      ) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");

      if (location.trim()) params.set("location", location.trim());
      else params.delete("location");

      if (minSalary && Number(minSalary) > 0) params.set("minSalary", minSalary);
      else params.delete("minSalary");

      if (experienceLevel) params.set("experienceLevel", experienceLevel);
      else params.delete("experienceLevel");

      if (jobType) params.set("jobType", jobType);
      else params.delete("jobType");

      const targetPath = pathname.startsWith("/jobs") ? pathname : "/jobs";
      const newUrl = `${targetPath}?${params.toString()}`;

      startTransition(() => {
        router.replace(newUrl, { scroll: false });
      });
    }, delay);

    return () => clearTimeout(handler);
  }, [query, location, minSalary, experienceLevel, jobType, delay, pathname, router, searchParams]);

  // Sync state if searchParams change externally (e.g. back button or clear filters)
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
    setLocation(searchParams.get("location") || "");
    setMinSalary(searchParams.get("minSalary") || "0");
    setExperienceLevel(searchParams.get("experienceLevel") || "");
    setJobType(searchParams.get("jobType") || "");
  }, [searchParams]);

  const clearFilters = () => {
    setQuery("");
    setLocation("");
    setMinSalary("0");
    setExperienceLevel("");
    setJobType("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("location");
    params.delete("minSalary");
    params.delete("experienceLevel");
    params.delete("jobType");

    const targetPath = pathname.startsWith("/jobs") ? pathname : "/jobs";
    startTransition(() => {
      router.replace(targetPath, { scroll: false });
    });
  };

  const hasFilters =
    query.trim().length > 0 ||
    location.trim().length > 0 ||
    Number(minSalary) > 0 ||
    experienceLevel.length > 0 ||
    jobType.length > 0;

  return {
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
  };
}
