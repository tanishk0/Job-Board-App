"use client";

import { useState } from "react";
import { Upload, Loader2, Link as LinkIcon, CheckCircle } from "lucide-react";
import { useUploadThing } from "@/src/utils/uploadthing";
import { updateEmployerProfile } from "../actions";

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
        <form className="w-full flex justify-center items-center py-10 px-4" action={updateEmployerProfile}>
            <input type="hidden" name="companyLogoUrl" value={logoUrl} />

            <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8 text-slate-900 flex flex-col">
                <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6">Edit Profile</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col sm:col-span-2">
                        <label htmlFor="companyName" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            id="companyName"
                            defaultValue={profile?.companyName}
                            placeholder="e.g. Acme Corp"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    {/* Company Logo Section (Direct URL or File Upload) */}
                    <div className="sm:col-span-2 flex flex-col">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Company Logo
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            {/* Direct URL Input */}
                            <div className="relative flex-1 w-full">
                                <input
                                    type="text"
                                    value={logoUrl}
                                    onChange={(e) => setLogoUrl(e.target.value)}
                                    placeholder="Paste image URL (https://example.com/logo.png)"
                                    className="w-full px-3 py-2 pr-9 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                                />
                                <LinkIcon className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                            </div>

                            <span className="text-xs text-slate-400 font-medium self-center">OR</span>

                            {/* Image File Upload */}
                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-md border border-slate-300 transition-colors flex-shrink-0">
                                <Upload className="w-3.5 h-3.5 text-slate-600" />
                                <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    disabled={isUploading}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        {/* Upload Status / Preview */}
                        {isUploading && (
                            <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 animate-pulse">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#F79256]" />
                                Uploading image...
                            </div>
                        )}

                        {logoUrl && !isUploading && (
                            <div className="mt-2.5 flex items-center gap-3 p-2 border border-slate-200 bg-slate-50 rounded-md max-w-md">
                                <img
                                    src={logoUrl}
                                    alt="Company logo preview"
                                    className="w-10 h-10 object-contain rounded border border-slate-200 bg-white p-0.5"
                                    onError={(e) => {
                                        (e.target as HTMLElement).style.display = "none";
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-slate-800 truncate">{logoUrl}</p>
                                    <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Logo URL set
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setLogoUrl("")}
                                    className="text-xs text-slate-400 hover:text-red-500 font-medium px-2 py-1"
                                >
                                    Clear
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="website" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Website
                        </label>
                        <input
                            type="text"
                            name="website"
                            id="website"
                            defaultValue={profile?.website}
                            placeholder="www.company.com"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            defaultValue={profile?.location}
                            placeholder="e.g. San Francisco, CA"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="contact" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            name="contactEmail"
                            id="contact"
                            defaultValue={profile?.contactEmail}
                            placeholder="contact@company.com"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="companyDescription" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Company Description
                        </label>
                        <textarea
                            name="companyDescription"
                            id="companyDescription"
                            rows={4}
                            defaultValue={profile?.companyDescription}
                            placeholder="Tell us about your company..."
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256] resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="px-6 py-2.5 text-white text-sm font-medium bg-[#F79256] hover:bg-[#e07e42] disabled:opacity-50 rounded-md shadow-sm transition-colors cursor-pointer"
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </form>
    );
}