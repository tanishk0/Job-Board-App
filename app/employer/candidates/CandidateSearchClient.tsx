"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Award,
  FileText,
  Globe,
  Mail,
  Phone,
  X,
  ExternalLink,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  image: string | null;
  createdAt: Date;
  headline: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  resumeUrl: string | null;
  portfolioUrl: string | null;
  githubUrl: string | null;
  experienceLevel: string | null;
  preferredRole: string | null;
}

interface Props {
  candidates: CandidateData[];
}

export default function CandidateSearchClient({ candidates }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExp, setSelectedExp] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [requireResume, setRequireResume] = useState(false);
  const [requirePortfolio, setRequirePortfolio] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>(null);

  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    candidates.forEach((c) => {
      if (c.preferredRole && c.preferredRole.trim()) {
        roles.add(c.preferredRole.trim());
      }
    });
    return Array.from(roles).sort();
  }, [candidates]);

  const expOptions = ["Junior", "Mid", "Senior", "Lead", "Executive"];

  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = c.name?.toLowerCase().includes(query);
        const matchesEmail = c.email?.toLowerCase().includes(query);
        const matchesHeadline = c.headline?.toLowerCase().includes(query);
        const matchesRole = c.preferredRole?.toLowerCase().includes(query);
        const matchesLocation = c.location?.toLowerCase().includes(query);
        const matchesBio = c.bio?.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesEmail &&
          !matchesHeadline &&
          !matchesRole &&
          !matchesLocation &&
          !matchesBio
        ) {
          return false;
        }
      }

      if (selectedExp !== "all") {
        if (!c.experienceLevel || c.experienceLevel.toLowerCase() !== selectedExp.toLowerCase()) {
          return false;
        }
      }

      if (selectedRole !== "all") {
        if (!c.preferredRole || c.preferredRole.toLowerCase() !== selectedRole.toLowerCase()) {
          return false;
        }
      }

      if (requireResume && !c.resumeUrl) {
        return false;
      }

      if (requirePortfolio && !c.portfolioUrl && !c.githubUrl) {
        return false;
      }

      return true;
    });
  }, [candidates, searchTerm, selectedExp, selectedRole, requireResume, requirePortfolio]);

  const hasActiveFilters =
    searchTerm || selectedExp !== "all" || selectedRole !== "all" || requireResume || requirePortfolio;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedExp("all");
    setSelectedRole("all");
    setRequireResume(false);
    setRequirePortfolio(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
        <div>
          <Badge variant="primary" className="mb-2">
            Employer Talent Search
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Search Candidate Profiles
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Discover and connect with top tech talent matching your open positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#F8FAFC] px-3.5 py-1.5 rounded-lg text-[#0F172A] text-xs font-semibold border border-[#E2E8F0]">
            Total Candidates: <span className="text-[#6366F1]">{candidates.length}</span>
          </div>
        </div>
      </div>

      {/* Search Bar & Filters Card */}
      <Card className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, headline, skills, role, or location..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#0F172A] rounded-full hover:bg-[#E2E8F0]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-[#F1F5F9]">
          {/* Experience Level Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
              Experience Level
            </label>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full py-1.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <option value="all">All Experience Levels</option>
              {expOptions.map((exp) => (
                <option key={exp} value={exp}>
                  {exp}
                </option>
              ))}
            </select>
          </div>

          {/* Preferred Role Filter */}
          <div>
            <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
              Preferred Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full py-1.5 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <option value="all">All Roles</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Checkbox Toggles */}
          <div className="flex flex-col justify-end space-y-1.5 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-4 pt-2 sm:pt-0">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0F172A] select-none">
                <input
                  type="checkbox"
                  checked={requireResume}
                  onChange={(e) => setRequireResume(e.target.checked)}
                  className="w-4 h-4 rounded text-[#6366F1] focus:ring-[#6366F1] border-[#CBD5E1]"
                />
                <span>Has Resume</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#0F172A] select-none">
                <input
                  type="checkbox"
                  checked={requirePortfolio}
                  onChange={(e) => setRequirePortfolio(e.target.checked)}
                  className="w-4 h-4 rounded text-[#6366F1] focus:ring-[#6366F1] border-[#CBD5E1]"
                />
                <span>Has Portfolio / Links</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="ml-auto text-xs text-[#6366F1] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1 text-xs text-[#475569]">
        <p>
          Showing <span className="font-bold text-[#0F172A]">{filteredCandidates.length}</span> of{" "}
          <span className="font-bold text-[#0F172A]">{candidates.length}</span> candidates
        </p>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="hover:border-[#6366F1]/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Avatar & Header */}
                <div className="flex items-start gap-3">
                  {candidate.image ? (
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-lg object-cover border border-[#E2E8F0] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#6366F1] text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {candidate.name
                        ? candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()
                        : "C"}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-[#0F172A] truncate group-hover:text-[#6366F1] transition-colors">
                      {candidate.name}
                    </h3>
                    <p className="text-xs text-[#6366F1] font-semibold truncate">
                      {candidate.preferredRole || candidate.headline || "Candidate"}
                    </p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-1.5 text-xs text-[#64748B]">
                  {candidate.location && (
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                      <span>{candidate.location}</span>
                    </div>
                  )}

                  {candidate.experienceLevel && (
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                      <span className="capitalize">{candidate.experienceLevel} Level</span>
                    </div>
                  )}
                </div>

                {candidate.bio && (
                  <p className="text-xs text-[#475569] line-clamp-2 italic">
                    "{candidate.bio}"
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between gap-2">
                <Button
                  onClick={() => setSelectedCandidate(candidate)}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={User}
          title="No candidates match filters"
          description="We couldn't find any candidate profiles matching your active search criteria. Try adjusting filters or resetting."
          actionLabel="Reset Search Filters"
          onAction={resetFilters}
        />
      )}

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={Boolean(selectedCandidate)}
          onClose={() => setSelectedCandidate(null)}
          title={selectedCandidate.name}
          description={selectedCandidate.preferredRole || selectedCandidate.headline || "Candidate Profile"}
        >
          <div className="space-y-4">
            {selectedCandidate.bio && (
              <div className="space-y-1 text-xs text-[#475569]">
                <span className="font-semibold uppercase tracking-wider text-[#94A3B8]">About</span>
                <p className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">{selectedCandidate.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-0.5">
                <span className="text-[#94A3B8] uppercase font-semibold text-[10px]">Location</span>
                <p className="font-medium text-[#0F172A]">{selectedCandidate.location || "Not specified"}</p>
              </div>

              <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg space-y-0.5">
                <span className="text-[#94A3B8] uppercase font-semibold text-[10px]">Experience Level</span>
                <p className="font-medium text-[#0F172A] capitalize">{selectedCandidate.experienceLevel || "Not specified"}</p>
              </div>
            </div>

            {selectedCandidate.resumeUrl && (
              <a
                href={selectedCandidate.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2 bg-[#EEF2FF] text-[#6366F1] rounded-lg border border-[#C7D2FE] text-xs font-semibold hover:bg-[#E0E7FF]"
              >
                <FileText className="w-4 h-4" />
                <span>View Candidate Resume</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
