"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, Loader2, Send } from "lucide-react";
import { useUploadThing } from "@/src/utils/uploadthing";
import { Button } from "@/components/ui/Button";

type Props = {
  jobId: string;
  companyName: string;
  prefilledResume: string;
  applyAction: (formData: FormData) => Promise<void>;
};

export default function ApplicationForm({
  jobId,
  companyName,
  prefilledResume,
  applyAction,
}: Props) {
  const [resumeUrl, setResumeUrl] = useState<string>(prefilledResume || "");
  const [resumeName, setResumeName] = useState<string>(
    prefilledResume ? "Profile Resume" : ""
  );
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const { startUpload, isUploading } = useUploadThing("resumeUploader", {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        const fileData = res[0];
        const url = (fileData as any).ufsUrl || fileData.url;
        setResumeUrl(url);
        setResumeName(fileData.name);
        setIsUploaded(true);
      }
    },
    onUploadError: (error: Error) => {
      alert(`Upload error: ${error.message}`);
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResumeName(file.name);
    await startUpload([file]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-lg bg-[#008DD5]/10 text-[#008DD5] flex items-center justify-center">
          <Send className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0E103D]">Apply for this Position</h2>
          <p className="text-xs text-[#313638]/70">
            Attach a resume and optional cover letter to submit your application directly to {companyName}.
          </p>
        </div>
      </div>

      <form action={applyAction} className="space-y-5">
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="resumeUrl" value={resumeUrl} />

        {/* Resume Selection & Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-[#0E103D]">
            Resume <span className="text-red-500">*</span>
          </label>

          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  disabled={isUploading}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button type="button" variant="primary" size="sm" disabled={isUploading} className="pointer-events-none">
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? "Uploading file..." : "Upload Local Resume (PDF/DOC)"}</span>
                </Button>
              </label>

              {prefilledResume && !isUploaded && (
                <span className="text-xs text-slate-500 font-medium">
                  Currently using resume from profile
                </span>
              )}
            </div>

            {/* Direct URL input option */}
            <div className="space-y-1 pt-2 border-t border-slate-200">
              <label htmlFor="resumeUrlInput" className="text-xs text-slate-500 font-medium">
                Or enter / edit Resume URL:
              </label>
              <input
                id="resumeUrlInput"
                type="url"
                required
                value={resumeUrl}
                onChange={(e) => {
                  setResumeUrl(e.target.value);
                  setIsUploaded(false);
                }}
                placeholder="https://example.com/my-resume.pdf"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent text-xs text-[#313638] bg-white"
              />
            </div>

            {/* Status indicator */}
            {isUploading && (
              <div className="flex items-center gap-2 text-xs text-[#008DD5] font-medium pt-1">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading file via UploadThing...</span>
              </div>
            )}

            {resumeUrl && !isUploading && (
              <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="truncate flex-1">
                  <span className="font-bold">{resumeName || "Attached Resume"}: </span>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:text-emerald-950"
                  >
                    {resumeUrl}
                  </a>
                </div>
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            )}

            <p className="text-[11px] text-slate-400 italic">
              Note: Uploading or changing a resume here applies to this job application only. It will not modify your saved candidate profile resume.
            </p>
          </div>
        </div>

        {/* Cover Letter Section */}
        <div className="space-y-1.5">
          <label htmlFor="coverLetter" className="block text-sm font-semibold text-[#0E103D]">
            Cover Letter <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={4}
            placeholder="Write a brief cover letter highlighting your experience and why you are a great fit..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#008DD5] focus:border-transparent text-sm text-[#313638] bg-white resize-y"
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={isUploading || !resumeUrl}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          <Send className="w-4 h-4" />
          <span>Apply Now</span>
        </Button>
      </form>
    </div>
  );
}
