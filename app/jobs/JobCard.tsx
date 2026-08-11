import { MapPin, DollarSign, Building2, ArrowRight, Briefcase, Layers } from "lucide-react";
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
    <div className="w-full bg-white text-[#0F172A] rounded-xl border border-[#E2E8F0] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-[#6366F1]/50 hover:shadow-md transition-all group">
      <div className="flex items-start gap-4 flex-1">
        {job.companyLogoUrl ? (
          <img
            src={job.companyLogoUrl}
            alt={job.companyName}
            className="w-12 h-12 rounded-lg border border-[#E2E8F0] object-contain p-1 bg-white shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg border border-[#E2E8F0] bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold text-sm shrink-0">
            {job.companyName?.slice(0, 2).toUpperCase() || "TL"}
          </div>
        )}

        <div className="space-y-2 flex-1">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] group-hover:text-[#6366F1] transition-colors leading-snug">
              {job.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#64748B] mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
              <span>{job.companyName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {job.location && (
              <Badge variant="neutral">
                <MapPin className="w-3 h-3 text-[#6366F1]" />
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
                <Layers className="w-3 h-3 text-[#6366F1]" />
                <span className="capitalize">{job.experienceLevel}</span>
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#F1F5F9]">
        <Badge variant="brand" className="uppercase text-[10px] tracking-wider">
          <Briefcase className="w-3 h-3" />
          <span>{job.jobType || "Full-Time"}</span>
        </Badge>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6366F1] transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );
}
