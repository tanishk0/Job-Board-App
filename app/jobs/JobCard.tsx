import { MapPin, DollarSign, Bookmark, Building2 } from "lucide-react";

type JobCardProps = {
    job: {
        id: string;
        title: string;
        salary: string | null;
        experienceLevel: string | null;
        location: string | null;
        jobType: string | null;
        companyName: string;
        companyLogoUrl: string | null;
    };
};

export default function JobCard({ job }: JobCardProps) {
    console.log(job.companyLogoUrl);
    return (
        <div className="jobCard h-60 w-full md:w-[80%] mt-4 bg-white text-slate-900 rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6 shadow-sm hover:shadow-md hover:border-[#F79256]/60 transition-all duration-200">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-200 text-slate-900 flex p-2 flex-shrink-0 items-center justify-center font-bold border border-slate-300">
                    <img
                        src={job.companyLogoUrl ?? "/default-company-logo.png"}
                        alt={job.companyName}
                        
                    />

                </div>
                <div className="space-y-3 flex flex-col justify-between h-full">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-slate-900">{job.title}</h1>
                        <p className="text-slate-500 text-sm font-medium">{job.companyName}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
                            <MapPin className="w-4 h-4 text-[#F79256]" />
                            <p className="ml-1">{job.location}</p>
                        </div>
                        <div className="flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                            <DollarSign className="w-4 h-4 text-emerald-600" />
                            <p className="ml-0.5">{job.salary}</p>
                        </div>
                    </div>
                    <div className="flex items-center text-sm font-medium text-slate-900">
                        <p className="ml-1">{job.experienceLevel}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-start flex-col justify-between">
                <p className="text-xs font-semibold text-[#F79256] bg-[#F79256]/10 px-3 py-1.5 rounded-full border border-[#F79256]/20 uppercase tracking-wider">
                    {job.jobType}
                </p>
                <div className="flex items-center cursor-pointer hover:bg-slate-100/80 transition-colors pt-1">
                    <Bookmark color="#F79256" size={24} />
                    <p className="ml-1 text-sm text-slate-500">Save this job</p>
                </div>
            </div>
        </div>
    );
}
