import Link from "next/link";
import React from "react";
import {
  MapPin,
  Phone,
  Briefcase,
  Globe,
  FileText,
  Edit3,
  ExternalLink,
  Award,
  User,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

type Props = {
  profile: any;
};

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function CandidateProfile({ profile }: Props) {
  if (!profile) {
    return (
      <div className="w-full max-w-xl mx-auto py-12">
        <Card className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0E103D] mx-auto flex items-center justify-center border border-slate-200">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#0E103D]">No Profile Found</h2>
          <p className="text-xs text-[#313638]/70">
            You haven't set up your candidate profile yet. Create one now to start applying to jobs.
          </p>
          <div className="pt-2">
            <Link href="/candidate/profile/edit">
              <Button variant="primary" size="md">
                <Edit3 className="w-4 h-4" />
                <span>Create Profile</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="space-y-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-[#0E103D]">
              {profile.preferredRole || "Candidate Profile"}
            </h1>
            {profile.headline && (
              <p className="text-sm font-semibold text-[#008DD5]">
                {profile.headline}
              </p>
            )}
          </div>
          <Link href="/candidate/profile/edit">
            <Button variant="primary" size="sm">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
          </Link>
        </div>

        {/* Bio Section */}
        {profile.bio && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">About Me</h3>
            <p className="text-sm text-[#313638] leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-lg">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Core Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.experienceLevel && (
            <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="p-2 rounded-lg bg-[#008DD5]/10 text-[#008DD5]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Experience</p>
                <p className="text-sm font-medium text-[#0E103D] capitalize">{profile.experienceLevel}</p>
              </div>
            </div>
          )}

          {profile.preferredRole && (
            <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="p-2 rounded-lg bg-[#0E103D]/10 text-[#0E103D]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Target Role</p>
                <p className="text-sm font-medium text-[#0E103D]">{profile.preferredRole}</p>
              </div>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="p-2 rounded-lg bg-[#008DD5]/10 text-[#008DD5]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Location</p>
                <p className="text-sm font-medium text-[#0E103D]">{profile.location}</p>
              </div>
            </div>
          )}

          {profile.phone && (
            <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="p-2 rounded-lg bg-[#008DD5]/10 text-[#008DD5]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</p>
                <p className="text-sm font-medium text-[#0E103D]">{profile.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Links & Documents */}
        {(profile.portfolioUrl || profile.githubUrl || profile.resumeUrl) && (
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links & Documents</h3>

            <div className="flex flex-wrap gap-2.5">
              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl.startsWith("http") ? profile.portfolioUrl : `https://${profile.portfolioUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] hover:text-[#008DD5] hover:border-[#008DD5] bg-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>Portfolio Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl.startsWith("http") ? profile.githubUrl : `https://${profile.githubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] hover:text-[#008DD5] hover:border-[#008DD5] bg-white transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <span>View Resume</span>
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                </a>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}