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
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Props = {
  profile: any;
};

export default function EmployerProfile({ profile }: Props) {
  if (!profile) {
    return (
      <div className="w-full max-w-xl mx-auto py-8">
        <Card className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0E103D] mx-auto flex items-center justify-center border border-slate-200">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#0E103D]">No Profile Found</h2>
          <p className="text-xs text-[#313638]/70">
            You haven't set up your company profile yet. Create one now to start posting jobs.
          </p>
          <div className="pt-2">
            <Link href="/employer/profile/edit">
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

  const websiteUrl = profile.website
    ? profile.website.startsWith("http")
      ? profile.website
      : `https://${profile.website}`
    : null;

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="space-y-6">
        {/* Header Bar with Logo and Action */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-5 gap-4">
          <div className="flex items-center gap-4">
            {profile.companyLogoUrl ? (
              <img
                src={profile.companyLogoUrl}
                alt={profile.companyName}
                className="w-14 h-14 object-contain rounded-lg border border-slate-200 bg-white p-1 shrink-0"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-[#0E103D]/5 text-[#0E103D] flex items-center justify-center shrink-0 font-bold text-lg">
                <Building2 className="w-6 h-6" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[#0E103D]">
                {profile.companyName}
              </h1>
              {profile.location && (
                <p className="text-xs font-medium text-[#313638]/70 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#008DD5]" />
                  {profile.location}
                </p>
              )}
            </div>
          </div>

          <Link href="/employer/profile/edit">
            <Button variant="primary" size="sm">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Button>
          </Link>
        </div>

        {/* Company Description Section */}
        {profile.companyDescription && (
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">About Company</h3>
            <p className="text-sm text-[#313638] leading-relaxed bg-slate-50 p-4 border border-slate-200 rounded-lg whitespace-pre-line">
              {profile.companyDescription}
            </p>
          </div>
        )}

        {/* Core Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Location */}
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

          {/* Contact Email */}
          {profile.contactEmail && (
            <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
              <div className="p-2 rounded-lg bg-[#0E103D]/10 text-[#0E103D]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contact Email</p>
                <p className="text-sm font-medium text-[#0E103D]">{profile.contactEmail}</p>
              </div>
            </div>
          )}
        </div>

        {/* Website & External Links */}
        {websiteUrl && (
          <div className="border-t border-slate-100 pt-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Links</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-lg text-xs font-medium text-[#313638] hover:text-[#008DD5] hover:border-[#008DD5] bg-white transition-colors"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span>Company Website</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
