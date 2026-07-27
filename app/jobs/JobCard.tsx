import { MapPin, DollarSign, Building2, Sparkles, ArrowRight, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

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
    <div className="w-full bg-white text-[#313638] rounded-xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-xs hover:border-[#008DD5]/50 transition-colors group">
      <div className="flex items-start gap-4 flex-1">
        {job.companyLogoUrl ? (
          <img
            src={job.companyLogoUrl}
            alt={job.companyName}
            className="w-12 h-12 rounded-lg border border-slate-200 object-contain p-1 bg-white shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg border border-slate-200 bg-[#0E103D]/5 text-[#0E103D] flex items-center justify-center font-bold text-sm shrink-0">
            {job.companyName?.slice(0, 2).toUpperCase() || "JB"}
          </div>
        )}

        <div className="space-y-2 flex-1">
          <div>
            <h2 className="text-lg font-semibold text-[#0E103D] group-hover:text-[#008DD5] transition-colors leading-snug">
              {job.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#313638]/70 mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{job.companyName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {job.location && (
              <Badge variant="neutral">
                <MapPin className="w-3 h-3 text-[#008DD5]" />
                <span>{job.location}</span>
              </Badge>
            )}

            {job.salary && (
              <Badge variant="success">
                <DollarSign className="w-3 h-3 text-emerald-600" />
                <span>{job.salary}</span>
              </Badge>
            )}

            {job.experienceLevel && (
              <Badge variant="primary">
                <Sparkles className="w-3 h-3 text-[#008DD5]" />
                <span className="capitalize">{job.experienceLevel}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
        <Badge variant="brand" className="uppercase text-[10px] tracking-wider">
          <Briefcase className="w-3 h-3" />
          <span>{job.jobType || "Full-Time"}</span>
        </Badge>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#008DD5] transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
