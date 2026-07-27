"use client";

import { useState } from "react";
import { Upload, Loader2, Link as LinkIcon, CheckCircle } from "lucide-react";
import { useUploadThing } from "@/src/utils/uploadthing";
import { updateEmployerProfile } from "../actions";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function EmployerProfileForm({ profile }: { profile?: any }) {
  const [logoUrl, setLogoUrl] = useState<string>(profile?.companyLogoUrl ?? "");

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        const fileData = res[0];
        const url = (fileData as any).ufsUrl || fileData.url;
        setLogoUrl(url);
      }
    },
    onUploadError: (error: Error) => {
      alert(`Upload error: ${error.message}`);
    },
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await startUpload([file]);
  };

  return (
    <form className="w-full max-w-4xl mx-auto py-4" action={updateEmployerProfile}>
      <input type="hidden" name="companyLogoUrl" value={logoUrl} />

      <Card className="space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h1 className="text-2xl font-bold text-[#0E103D]">Edit Employer Profile</h1>
          <p className="text-xs text-[#313638]/70 mt-1">
            Update your company information, branding logo, website, and overview description.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Input
              label="Company Name"
              type="text"
              name="companyName"
              id="companyName"
              defaultValue={profile?.companyName}
              placeholder="e.g. Acme Corp"
              required
            />
          </div>

          {/* Company Logo Section */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-sm font-medium text-[#0E103D]">
              Company Logo
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="Paste image URL (https://example.com/logo.png)"
                  className="w-full px-3.5 py-2 text-sm text-[#313638] bg-white border border-slate-200 rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors"
                />
                <LinkIcon className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              </div>

              <span className="text-xs text-slate-400 font-semibold uppercase self-center">OR</span>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button type="button" variant="outline" size="sm" disabled={isUploading} className="pointer-events-none">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
                </Button>
              </label>
            </div>

            {isUploading && (
              <div className="mt-2 text-xs text-[#008DD5] font-medium flex items-center gap-1.5 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Uploading image...
              </div>
            )}

            {logoUrl && !isUploading && (
              <div className="mt-2.5 flex items-center gap-3 p-2.5 border border-slate-200 bg-slate-50 rounded-lg max-w-md">
                <img
                  src={logoUrl}
                  alt="Company logo preview"
                  className="w-10 h-10 object-contain rounded border border-slate-200 bg-white p-0.5"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[#313638] truncate">{logoUrl}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Logo URL set
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setLogoUrl("")}
                  className="text-xs text-slate-400 hover:text-red-500 font-medium px-2 py-1 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <Input
            label="Company Website"
            type="text"
            name="website"
            id="website"
            defaultValue={profile?.website}
            placeholder="www.company.com"
          />

          <Input
            label="Location"
            type="text"
            name="location"
            id="location"
            defaultValue={profile?.location}
            placeholder="e.g. San Francisco, CA"
          />

          <div className="sm:col-span-2">
            <Input
              label="Contact Email"
              type="email"
              name="contactEmail"
              id="contact"
              defaultValue={profile?.contactEmail}
              placeholder="contact@company.com"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="companyDescription" className="block text-sm font-medium text-[#0E103D]">
              Company Description
            </label>
            <textarea
              name="companyDescription"
              id="companyDescription"
              rows={4}
              defaultValue={profile?.companyDescription}
              placeholder="Tell job seekers about your company culture, mission, and team..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-[#313638] focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent transition-colors resize-y"
            ></textarea>
          </div>
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