import Link from "next/link";
import React from "react";
import {
  Building2,
  MapPin,
  Mail,
  Globe,
  Edit3,
  ExternalLink,
} from "lucide-react";

type Props = {
  profile: any;
};

export default function EmployerProfile({ profile }: Props) {
  if (!profile) {
    return (
      <main className="w-full flex justify-center items-center py-10 px-4">
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-md shadow-sm p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F79256]/10 text-[#F79256] mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Profile Found</h2>
          <p className="text-sm text-slate-500">
            You haven't set up your company profile yet. Create one now to start posting jobs.
          </p>
          <div className="pt-2">
            <Link
              href="/employer/profile/edit"
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

  const websiteUrl = profile.website
    ? profile.website.startsWith("http")
      ? profile.website
      : `https://${profile.website}`
    : null;

  return (
    <main className="w-full flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8 text-slate-900 space-y-6">
        
        {/* Header Bar with Logo and Action */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5 gap-4">
          <div className="flex items-center gap-4">
            {profile.companyLogoUrl ? (
              <img
                src={profile.companyLogoUrl}
                alt={profile.companyName}
                className="w-14 h-14 object-contain rounded-md border border-slate-200 bg-white p-1 flex-shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-md bg-[#F79256]/10 text-[#F79256] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-slate-900">
                {profile.companyName}
              </h1>
              {profile.location && (
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F79256]" />
                  {profile.location}
                </p>
              )}
            </div>
          </div>

          <Link
            href="/employer/profile/edit"
            className="px-4 py-2 bg-[#F79256] hover:bg-[#e07e42] text-white text-xs font-medium rounded-md shadow-sm transition-colors inline-flex items-center gap-1.5 flex-shrink-0"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </Link>
        </div>

        {/* Company Description Section */}
        {profile.companyDescription && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">About Company</h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 border border-slate-200 rounded-md whitespace-pre-line">
              {profile.companyDescription}
            </p>
          </div>
        )}

        {/* Core Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Contact Email */}
          {profile.contactEmail && (
            <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-md bg-slate-50/50">
              <div className="p-2 rounded-md bg-[#F79256]/10 text-[#F79256]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Email</p>
                <p className="text-sm font-medium text-slate-900">{profile.contactEmail}</p>
              </div>
            </div>
          )}
        </div>

        {/* Website & External Links */}
        {websiteUrl && (
          <div className="border-t border-slate-200 pt-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:text-[#F79256] hover:border-[#F79256] bg-white transition-colors"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span>Company Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
