import { MapPin, DollarSign, Building2, Briefcase, Sparkles, ArrowRight } from "lucide-react";

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
  return (
    <div className="w-full bg-white text-slate-900 rounded-2xl border border-slate-200/80 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm hover:shadow-md hover:border-[#F79256]/50 transition-all duration-200 group">
      <div className="flex items-start gap-4 flex-1">
        {job.companyLogoUrl ? (
          <img
            src={job.companyLogoUrl}
            alt={job.companyName}
            className="w-14 h-14 rounded-xl border border-slate-200 object-contain p-1.5 bg-white shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-lg shrink-0">
            {job.companyName?.slice(0, 2).toUpperCase() || "JB"}
          </div>
        )}

        <div className="space-y-2 flex-1">
          <div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#F79256] transition-colors leading-snug">
              {job.title}
            </h2>
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 mt-0.5">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{job.companyName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {job.location && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
                <MapPin className="w-3.5 h-3.5 text-[#F79256]" />
                {job.location}
              </span>
            )}

            {job.salary && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                {job.salary}
              </span>
            )}

            {job.experienceLevel && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {job.experienceLevel}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
        <span className="text-xs font-semibold text-[#F79256] bg-[#F79256]/10 px-3.5 py-1.5 rounded-full border border-[#F79256]/20 uppercase tracking-wider">
          {job.jobType || "Full-Time"}
        </span>

        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-[#F79256] transition-colors">
          <span>View Job Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
