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

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

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

  // Extract unique roles from actual candidates
  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    candidates.forEach((c) => {
      if (c.preferredRole && c.preferredRole.trim()) {
        roles.add(c.preferredRole.trim());
      }
    });
    return Array.from(roles).sort();
  }, [candidates]);

  // Extract unique experience levels
  const expOptions = ["Junior", "Mid", "Senior", "Lead", "Executive"];

  // Filter candidates based on search & filters
  const filteredCandidates = useMemo(() => {
    return candidates.filter((c) => {
      // Text Search
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

      // Experience Level Filter
      if (selectedExp !== "all") {
        if (!c.experienceLevel || c.experienceLevel.toLowerCase() !== selectedExp.toLowerCase()) {
          return false;
        }
      }

      // Preferred Role Filter
      if (selectedRole !== "all") {
        if (!c.preferredRole || c.preferredRole.toLowerCase() !== selectedRole.toLowerCase()) {
          return false;
        }
      }

      // Require Resume
      if (requireResume && !c.resumeUrl) {
        return false;
      }

      // Require Portfolio
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <Badge variant="primary" className="mb-2">
            Employer Talent Search
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0E103D] tracking-tight">
            Search Candidate Profiles
          </h1>
          <p className="text-xs sm:text-sm text-[#313638]/70 mt-1">
            Discover and connect with top tech talent matching your open positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 px-3.5 py-1.5 rounded-lg text-[#0E103D] text-xs font-semibold border border-slate-200">
            Total Candidates: <span className="text-[#008DD5]">{candidates.length}</span>
          </div>
        </div>
      </div>

      {/* Search Bar & Filters Card */}
      <Card className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidates by name, headline, skills, role, or location..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {/* Experience Level Filter */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Experience Level
            </label>
            <select
              value={selectedExp}
              onChange={(e) => setSelectedExp(e.target.value)}
              className="w-full py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5]"
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
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Preferred Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5]"
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
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#313638] select-none">
                <input
                  type="checkbox"
                  checked={requireResume}
                  onChange={(e) => setRequireResume(e.target.checked)}
                  className="w-4 h-4 rounded text-[#008DD5] focus:ring-[#008DD5] border-slate-300"
                />
                <span>Has Resume</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#313638] select-none">
                <input
                  type="checkbox"
                  checked={requirePortfolio}
                  onChange={(e) => setRequirePortfolio(e.target.checked)}
                  className="w-4 h-4 rounded text-[#008DD5] focus:ring-[#008DD5] border-slate-300"
                />
                <span>Has Portfolio / GitHub</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="ml-auto text-xs text-[#008DD5] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
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
      <div className="flex items-center justify-between px-1 text-xs text-[#313638]">
        <p>
          Showing <span className="font-bold text-[#0E103D]">{filteredCandidates.length}</span> of{" "}
          <span className="font-bold text-[#0E103D]">{candidates.length}</span> candidates
        </p>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="hover:border-[#008DD5]/50 transition-colors flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Candidate Avatar & Header */}
                <div className="flex items-start gap-3">
                  {candidate.image ? (
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-[#0E103D] text-white font-bold text-sm flex items-center justify-center shrink-0">
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
                    <h3 className="text-base font-bold text-[#0E103D] truncate group-hover:text-[#008DD5] transition-colors">
                      {candidate.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#008DD5] truncate">
                      {candidate.headline || candidate.preferredRole || "Candidate"}
                    </p>
                    {candidate.location && (
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{candidate.location}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {candidate.experienceLevel && (
                    <Badge variant="primary" className="capitalize text-[10px]">
                      <Award className="w-3 h-3 text-[#008DD5]" />
                      {candidate.experienceLevel}
                    </Badge>
                  )}

                  {candidate.preferredRole && (
                    <Badge variant="brand" className="text-[10px]">
                      <Briefcase className="w-3 h-3" />
                      {candidate.preferredRole}
                    </Badge>
                  )}
                </div>

                {/* Bio Preview */}
                {candidate.bio && (
                  <p className="text-xs text-[#313638]/70 line-clamp-2 leading-relaxed">
                    {candidate.bio}
                  </p>
                )}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  onClick={() => setSelectedCandidate(candidate)}
                  variant="outline"
                  size="sm"
                >
                  View Profile
                </Button>

                <div className="flex items-center gap-1">
                  {candidate.resumeUrl && (
                    <a
                      href={candidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-[#008DD5] hover:bg-slate-100 rounded-md transition-colors"
                      title="Download Resume"
                    >
                      <FileText className="w-4 h-4" />
                    </a>
                  )}

                  {candidate.portfolioUrl && (
                    <a
                      href={candidate.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-[#008DD5] hover:bg-slate-100 rounded-md transition-colors"
                      title="Portfolio Link"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}

                  {candidate.githubUrl && (
                    <a
                      href={candidate.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-500 hover:text-[#008DD5] hover:bg-slate-100 rounded-md transition-colors"
                      title="GitHub Profile"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={`mailto:${candidate.email}`}
                    className="p-1.5 text-white bg-[#008DD5] hover:bg-[#0076b3] rounded-md transition-colors"
                    title={`Contact ${candidate.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="text-center py-12 space-y-4">
          <div className="w-12 h-12 bg-slate-100 text-[#0E103D] rounded-xl flex items-center justify-center mx-auto border border-slate-200">
            <User className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#0E103D]">No candidate profiles found</h3>
            <p className="text-xs text-[#313638]/70 max-w-md mx-auto">
              No registered candidates match your selected search query or filter options.
            </p>
          </div>
          {hasActiveFilters && (
            <Button onClick={resetFilters} variant="primary" size="sm">
              Clear All Filters
            </Button>
          )}
        </Card>
      )}

      {/* Detailed Candidate Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-[#0E103D] text-white flex items-start justify-between">
              <div className="flex items-center gap-4">
                {selectedCandidate.image ? (
                  <img
                    src={selectedCandidate.image}
                    alt={selectedCandidate.name}
                    className="w-14 h-14 rounded-lg object-cover border-2 border-[#008DD5]"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-[#008DD5] text-white font-bold text-lg flex items-center justify-center border border-white/20">
                    {selectedCandidate.name
                      ? selectedCandidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : "C"}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedCandidate.name}</h2>
                  <p className="text-xs text-slate-300">
                    {selectedCandidate.headline || selectedCandidate.preferredRole || "Candidate"}
                  </p>
                  {selectedCandidate.location && (
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#008DD5]" />
                      {selectedCandidate.location}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {selectedCandidate.experienceLevel && (
                  <Badge variant="primary" className="capitalize">
                    Experience: {selectedCandidate.experienceLevel}
                  </Badge>
                )}
                {selectedCandidate.preferredRole && (
                  <Badge variant="brand">
                    Role: {selectedCandidate.preferredRole}
                  </Badge>
                )}
              </div>

              {/* Bio */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  About Candidate
                </h4>
                <p className="text-xs text-[#313638] leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                  {selectedCandidate.bio || "No summary biography provided by candidate yet."}
                </p>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <Mail className="w-4 h-4 text-[#008DD5]" />
                    <span className="text-[#313638] truncate">{selectedCandidate.email}</span>
                  </div>

                  {selectedCandidate.phone && (
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <Phone className="w-4 h-4 text-[#008DD5]" />
                      <span className="text-[#313638]">{selectedCandidate.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Links & Attachments */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                  Links & Attachments
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.resumeUrl ? (
                    <a
                      href={selectedCandidate.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm">
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Resume</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400 italic">No resume uploaded</span>
                  )}

                  {selectedCandidate.portfolioUrl && (
                    <a
                      href={selectedCandidate.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <Globe className="w-3.5 h-3.5 text-[#008DD5]" />
                        <span>Portfolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  )}

                  {selectedCandidate.githubUrl && (
                    <a
                      href={selectedCandidate.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <Button onClick={() => setSelectedCandidate(null)} variant="outline" size="sm">
                Close
              </Button>
              <a href={`mailto:${selectedCandidate.email}`}>
                <Button variant="primary" size="sm">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Candidate</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
