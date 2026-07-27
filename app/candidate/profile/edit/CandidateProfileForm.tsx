"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { updateCandidateProfile } from "../actions";
import { useUploadThing } from "@/src/utils/uploadthing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type Props = {
  profile: any;
};

export default function EditCandidateProfile({ profile }: Props) {
  const [resumeUrl, setResumeUrl] = useState<string>(profile?.resumeUrl ?? "");
  const [resumeName, setResumeName] = useState<string>("");

  const { startUpload, isUploading } = useUploadThing("resumeUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        const fileData = res[0];
        const url = (fileData as any).ufsUrl || fileData.url;
        setResumeUrl(url);
        setResumeName(fileData.name);
      }
    },
    onUploadError: (error: Error) => {
      alert(`Upload error: ${error.message}`);
    },
  });

  const handleResumeSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
    await startUpload([file]);
  };

  return (
    <form className="w-full max-w-4xl mx-auto py-4" action={updateCandidateProfile}>
      <input type="hidden" name="resumeUrl" value={resumeUrl} />

      <Card className="space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-[#0E103D]">Edit Candidate Profile</h1>
          <p className="text-xs text-[#313638]/70 mt-1">
            Update your professional summary, preferred job role, resume, and links.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            label="Headline"
            type="text"
            name="headline"
            id="headline"
            defaultValue={profile?.headline}
            placeholder="e.g. Senior Full-Stack Engineer"
          />

          <Input
            label="Target Role"
            type="text"
            name="preferredRole"
            id="preferredRole"
            defaultValue={profile?.preferredRole}
            placeholder="e.g. Full Stack Developer"
          />

          <div className="space-y-1.5 w-full">
            <label htmlFor="experience" className="block text-sm font-medium text-[#0E103D]">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              id="experience"
              defaultValue={profile?.experienceLevel}
              className="w-full px-3.5 py-2 text-sm text-[#313638] bg-white border border-slate-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors"
            >
              <option value="">Fresher</option>
              <option value="junior">Junior (1-2 Years)</option>
              <option value="mid">Mid (3-4 Years)</option>
              <option value="senior">Senior (2-3 Years)</option>
              <option value="veteran">Veteran (4+ Years)</option>
            </select>
          </div>

          <Input
            label="Phone Number"
            type="text"
            name="phone"
            id="phone"
            defaultValue={profile?.phone}
            placeholder="+1 (555) 000-0000"
          />

          <div className="sm:col-span-2">
            <Input
              label="Location"
              type="text"
              name="location"
              id="location"
              defaultValue={profile?.location}
              placeholder="e.g. San Francisco, CA or Remote"
            />
          </div>

          {/* Resume Upload Box */}
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="resume" className="block text-sm font-medium text-[#0E103D]">
              Resume
            </label>
            <div className="flex flex-wrap items-center gap-3 border border-slate-200 border-dashed rounded-lg p-4 bg-slate-50/50">
              <Upload className="w-5 h-5 text-slate-400 shrink-0" />
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  disabled={isUploading}
                  onChange={handleResumeSelect}
                  className="hidden"
                />
                <Button type="button" variant="primary" size="sm" disabled={isUploading} className="pointer-events-none">
                  {isUploading ? "Uploading..." : "Upload Resume (PDF/DOC)"}
                </Button>
              </label>

              {isUploading && (
                <span className="text-xs text-[#008DD5] font-medium flex items-center gap-1.5 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Uploading resume...
                </span>
              )}

              {resumeUrl && !isUploading && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                  <FileText className="w-3.5 h-3.5 text-emerald-600" />
                  <a href={resumeUrl} target="_blank" rel="noreferrer" className="underline hover:text-emerald-950">
                    {resumeName || "Uploaded Resume"}
                  </a>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-[#0E103D]">
              Professional Links
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                name="githubUrl"
                defaultValue={profile?.githubUrl}
                placeholder="github.com/yourprofile"
              />
              <Input
                type="text"
                name="portfolioUrl"
                defaultValue={profile?.portfolioUrl}
                placeholder="portfolio.com"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5 pt-2">
          <label htmlFor="bio" className="block text-sm font-medium text-[#0E103D]">
            Bio & Professional Summary
          </label>
          <textarea
            name="bio"
            id="bio"
            rows={4}
            placeholder="Tell recruiters about your background, achievements, and technical expertise..."
            defaultValue={profile?.bio}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors resize-y"
          ></textarea>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <Button type="submit" disabled={isUploading} variant="primary" size="md">
            Save Profile
          </Button>
        </div>
      </Card>
    </form>
  );
}