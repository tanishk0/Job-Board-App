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
      <main className="min-h-screen w-full flex justify-center items-center bg-slate-50 py-10 px-4">
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-md shadow-sm p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F79256]/10 text-[#F79256] mx-auto flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Profile Found</h2>
          <p className="text-sm text-slate-500">
            You haven't set up your candidate profile yet. Create one now to start applying to jobs.
          </p>
          <div className="pt-2">
            <Link
              href="/candidate/profile/edit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F79256] hover:bg-[#e07e42] text-white text-sm font-medium rounded-md shadow-sm transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Create Profile
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-slate-50 py-10 px-4">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8 text-slate-900 space-y-6">
        
        {/* Header Bar with Action */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">
              {profile.preferredRole || "Candidate Profile"}
            </h1>
            {profile.headline && (
              <p className="text-sm font-medium text-[#F79256]">
                {profile.headline}
              </p>
            )}
          </div>
          <Link
            href="/candidate/profile/edit"
            className="px-4 py-2 bg-[#F79256] hover:bg-[#e07e42] text-white text-xs font-medium rounded-md shadow-sm transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </Link>
        </div>

        {/* Bio Section */}
        {profile.bio && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">About Me</h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 border border-slate-200 rounded-md">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Core Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Experience Level */}
          {profile.experienceLevel && (
            <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-md bg-slate-50/50">
              <div className="p-2 rounded-md bg-[#F79256]/10 text-[#F79256]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Experience</p>
                <p className="text-sm font-medium text-slate-900 capitalize">{profile.experienceLevel}</p>
              </div>
            </div>
          )}

          {/* Preferred Role */}
          {profile.preferredRole && (
            <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-md bg-slate-50/50">
              <div className="p-2 rounded-md bg-[#F79256]/10 text-[#F79256]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Target Role</p>
                <p className="text-sm font-medium text-slate-900">{profile.preferredRole}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {profile.location && (
            <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-md bg-slate-50/50">
              <div className="p-2 rounded-md bg-[#F79256]/10 text-[#F79256]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Location</p>
                <p className="text-sm font-medium text-slate-900">{profile.location}</p>
              </div>
            </div>
          )}

          {/* Phone */}
          {profile.phone && (
            <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-md bg-slate-50/50">
              <div className="p-2 rounded-md bg-[#F79256]/10 text-[#F79256]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</p>
                <p className="text-sm font-medium text-slate-900">{profile.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Links & Documents */}
        {(profile.portfolioUrl || profile.githubUrl || profile.resumeUrl) && (
          <div className="border-t border-slate-200 pt-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links & Documents</h3>
            
            <div className="flex flex-wrap gap-3">
              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl.startsWith("http") ? profile.portfolioUrl : `https://${profile.portfolioUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:text-[#F79256] hover:border-[#F79256] bg-white transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>Portfolio Website</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl.startsWith("http") ? profile.githubUrl : `https://${profile.githubUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:text-[#F79256] hover:border-[#F79256] bg-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-500" />
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              )}

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 border border-emerald-300 rounded-md text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>View Resume</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}