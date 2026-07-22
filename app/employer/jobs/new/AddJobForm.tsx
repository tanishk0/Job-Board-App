import { createJob } from "../actions";

export default function AddJobForm() {
    return (
        <form action={createJob} className="w-full flex justify-center items-center py-10 px-4">
            <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-md shadow-sm p-6 sm:p-8 text-slate-900 flex flex-col">
                <h1 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6">Post a New Job</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Job Title */}
                    <div className="flex flex-col sm:col-span-2">
                        <label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="e.g. Frontend Developer"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col">
                        <label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="e.g. Delhi / Remote / Hybrid"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    {/* Job Type */}
                    <div className="flex flex-col">
                        <label htmlFor="jobType" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Job Type
                        </label>
                        <select
                            name="jobType"
                            id="jobType"
                            defaultValue="full-time"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        >
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>

                    {/* Experience Level */}
                    <div className="flex flex-col">
                        <label htmlFor="experienceLevel" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Experience Level
                        </label>
                        <select
                            name="experienceLevel"
                            id="experienceLevel"
                            defaultValue="mid"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        >
                            <option value="fresher">Fresher</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>

                    {/* Salary */}
                    <div className="flex flex-col">
                        <label htmlFor="salary" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Salary
                        </label>
                        <input
                            type="text"
                            name="salary"
                            id="salary"
                            placeholder="e.g. ₹6–8 LPA or Negotiable"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256]"
                        />
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Job Description
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            placeholder="What the role is about..."
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256] resize-none"
                        ></textarea>
                    </div>

                    {/* Requirements */}
                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="requirements" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Requirements
                        </label>
                        <textarea
                            name="requirements"
                            id="requirements"
                            rows={4}
                            placeholder="Skills, qualifications, experience required..."
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256] resize-none"
                        ></textarea>
                    </div>

                    {/* Responsibilities */}
                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="responsibilities" className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                            Responsibilities
                        </label>
                        <textarea
                            name="responsibilities"
                            id="responsibilities"
                            rows={4}
                            placeholder="Day-to-day work responsibilities..."
                            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 focus:outline-none focus:border-[#F79256] focus:ring-1 focus:ring-[#F79256] resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2.5 text-white text-sm font-medium bg-[#F79256] hover:bg-[#e07e42] rounded-md shadow-sm transition-colors cursor-pointer"
                    >
                        Post Job
                    </button>
                </div>
            </div>
        </form>
    );
}