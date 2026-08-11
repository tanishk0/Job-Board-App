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
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";

type Props = {
  profile: any;
};

export default function CandidateProfile({ profile }: Props) {
  if (!profile) {
    return (
      <div className="w-full max-w-xl mx-auto py-12">
        <EmptyState
          icon={User}
          title="Candidate Profile Not Found"
          description="You haven't set up your candidate profile yet. Build your profile to share work experience and start applying."
          actionLabel="Create Profile"
          actionHref="/candidate/profile/edit"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="space-y-6">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-[#F1F5F9] pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#0F172A]">
                {profile.preferredRole || "Candidate Profile"}
              </h1>
              <Badge variant="success" className="text-[10px]">
                <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                <span>Verified</span>
              </Badge>
            </div>
            {profile.headline && (
              <p className="text-sm font-semibold text-[#6366F1]">
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">About Me</h3>
            <p className="text-sm text-[#0F172A] leading-relaxed bg-[#F8FAFC] p-4 border border-[#E2E8F0] rounded-lg">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Core Profile Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.experienceLevel && (
            <div className="flex items-center gap-3 p-3.5 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
              <div className="p-2 rounded-lg bg-[#EEF2FF] text-[#6366F1]">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Experience</p>
                <p className="text-sm font-medium text-[#0F172A] capitalize">{profile.experienceLevel}</p>
              </div>
            </div>
          )}

          {profile.preferredRole && (
            <div className="flex items-center gap-3 p-3.5 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
              <div className="p-2 rounded-lg bg-[#F5F3FF] text-[#4F46E5]">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Target Role</p>
                <p className="text-sm font-medium text-[#0F172A]">{profile.preferredRole}</p>
              </div>
            </div>
          )}

          {profile.location && (
            <div className="flex items-center gap-3 p-3.5 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
              <div className="p-2 rounded-lg bg-[#EEF2FF] text-[#6366F1]">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Location</p>
                <p className="text-sm font-medium text-[#0F172A]">{profile.location}</p>
              </div>
            </div>
          )}

          {profile.phone && (
            <div className="flex items-center gap-3 p-3.5 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
              <div className="p-2 rounded-lg bg-[#EEF2FF] text-[#6366F1]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Phone</p>
                <p className="text-sm font-medium text-[#0F172A]">{profile.phone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Links & Documents */}
        {(profile.portfolioUrl || profile.githubUrl || profile.resumeUrl) && (
          <div className="border-t border-[#F1F5F9] pt-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Links & Attachments</h3>

            <div className="flex flex-wrap gap-2.5">
              {profile.portfolioUrl && (
                <a
                  href={profile.portfolioUrl.startsWith("http") ? profile.portfolioUrl : `https://${profile.portfolioUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:text-[#6366F1] hover:border-[#6366F1] bg-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>Portfolio Website</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              )}

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#6366F1] rounded-lg text-xs font-medium text-[#6366F1] bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>View Uploaded Resume</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}