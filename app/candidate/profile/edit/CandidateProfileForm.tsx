"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { updateCandidateProfile } from "../actions";
import { useUploadThing } from "@/src/utils/uploadthing";

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
        <form className="min-h-screen w-full flex justify-center items-center bg-slate-50 py-10 px-4" action={updateCandidateProfile}>
            <input type="hidden" name="resumeUrl" value={resumeUrl} />

            <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8 text-slate-900 flex flex-col">
                <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6">Edit Profile</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="headline" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Headline</label>
                        <input type="text" name="headline" id="headline" defaultValue={profile?.headline} className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]" />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="preferredRole" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Role</label>
                        <input type="text" name="preferredRole" id="preferredRole" defaultValue={profile?.preferredRole} className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="experience" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Experience</label>
                        <select name="experienceLevel" id="experience" defaultValue={profile?.experienceLevel} className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]">
                            <option value="">Fresher</option>
                            <option value="junior">Junior (1-2 Years)</option>
                            <option value="mid">Mid (3-4 Years)</option>
                            <option value="senior">Senior (2-3 Years)</option>
                            <option value="veteran">Veteran (4+ Years)</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Phone</label>
                        <input type="text" name="phone" id="phone" defaultValue={profile?.phone} className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Location</label>
                        <input type="text" name="location" id="location" defaultValue={profile?.location} className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]" />
                    </div>

                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="resume" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Resume</label>
                        <div className="flex flex-wrap items-center gap-3 border border-slate-300 border-dashed rounded-md p-3 bg-slate-50/50">
                            <Upload className="w-5 h-5 text-slate-400 flex-shrink-0" />
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    disabled={isUploading}
                                    onChange={handleResumeSelect}
                                    className="hidden"
                                />
                                <span className="inline-block py-1.5 px-3 rounded-md bg-[#F79256] hover:bg-[#e07e42] text-white text-xs font-medium transition-colors">
                                    {isUploading ? "Uploading..." : "Choose File"}
                                </span>
                            </label>

                            {isUploading && (
                                <span className="text-xs text-slate-500 flex items-center gap-1.5 animate-pulse">
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#F79256]" />
                                    Uploading resume...
                                </span>
                            )}

                            {resumeUrl && !isUploading && (
                                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                                    <a href={resumeUrl} target="_blank" rel="noreferrer" className="underline hover:text-emerald-900">
                                        {resumeName || "Uploaded Resume"}
                                    </a>
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 ml-1" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="sm:col-span-2 flex flex-col">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Add links</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="text" name="githubUrl" defaultValue={profile?.githubUrl} placeholder="www.github.com/yourprofile" className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]" />
                            <input type="text" name="portfolioUrl" defaultValue={profile?.portfolioUrl} placeholder="www.portfolio.com" className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]" />
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <label htmlFor="bio" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 block">Bio</label>
                    <textarea name="bio" id="bio" rows={3} placeholder="Tell us about yourself" defaultValue={profile?.bio} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"></textarea>
                </div>

                <div className="mt-8 flex justify-end">
                    <button disabled={isUploading} className="px-6 py-2.5 text-white text-sm font-medium bg-[#F79256] hover:bg-[#e07e42] disabled:opacity-50 rounded-md shadow-sm transition-colors cursor-pointer">
                        Save Profile
                    </button>
                </div>

            </div>
        </form>
    );
}