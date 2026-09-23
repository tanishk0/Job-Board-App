import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { TrendingUp, Briefcase, MapPin, Layers, DollarSign } from "lucide-react";
import { db } from "@/lib/db";
import { jobPostings } from "@/db/schema";
import { count, isNotNull, desc, sql } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function CandidateInsightsPage() {
  await requireCandidate();

  const [totalJobsRow] = await db
    .select({ count: count(jobPostings.id) })
    .from(jobPostings);
  const totalJobs = Number(totalJobsRow?.count) || 0;

  // Breakdown by job type
  const jobTypes = await db
    .select({
      type: jobPostings.jobType,
      count: count(jobPostings.id),
    })
    .from(jobPostings)
    .where(isNotNull(jobPostings.jobType))
    .groupBy(jobPostings.jobType)
    .orderBy(desc(count(jobPostings.id)))
    .limit(4);

  // Breakdown by experience level
  const experienceLevels = await db
    .select({
      level: jobPostings.experienceLevel,
      count: count(jobPostings.id),
    })
    .from(jobPostings)
    .where(isNotNull(jobPostings.experienceLevel))
    .groupBy(jobPostings.experienceLevel)
    .orderBy(desc(count(jobPostings.id)))
    .limit(4);

  // Top hiring locations
  const topLocations = await db
    .select({
      location: jobPostings.location,
      count: count(jobPostings.id),
    })
    .from(jobPostings)
    .where(isNotNull(jobPostings.location))
    .groupBy(jobPostings.location)
    .orderBy(desc(count(jobPostings.id)))
    .limit(4);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Career Insights & Market Trends</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time market analytics derived directly from active listings on Talentry.
          </p>
        </div>
        <Link href="/jobs">
          <Button variant="primary" size="sm">
            <Briefcase className="w-4 h-4" />
            <span>Explore Open Roles</span>
          </Button>
        </Link>
      </div>

      {totalJobs === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title="No market insights available yet"
          description="Career trends and market benchmarks are computed dynamically from active job postings. As employers publish positions, live metrics will populate here."
          actionLabel="Browse Job Directory"
          actionHref="/jobs"
        />
      ) : (
        <div className="space-y-6">
          {/* Platform Snapshot KPI */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="space-y-1">
              <span className="text-xs font-semibold text-[#64748B]">Active Job Postings</span>
              <div className="text-2xl font-bold text-[#0F172A]">{totalJobs}</div>
              <p className="text-[11px] text-[#16A34A] font-medium">Live opportunities on Talentry</p>
            </Card>

            <Card className="space-y-1">
              <span className="text-xs font-semibold text-[#64748B]">Top Work Setup</span>
              <div className="text-2xl font-bold text-[#6366F1] capitalize">
                {jobTypes[0]?.type || "Full-Time"}
              </div>
              <p className="text-[11px] text-[#64748B]">
                {jobTypes[0] ? `${jobTypes[0].count} active listings` : "Various schedules"}
              </p>
            </Card>

            <Card className="space-y-1">
              <span className="text-xs font-semibold text-[#64748B]">Primary Seniority Tier</span>
              <div className="text-2xl font-bold text-[#0F172A] capitalize">
                {experienceLevels[0]?.level || "Mid-Level"}
              </div>
              <p className="text-[11px] text-[#64748B]">
                {experienceLevels[0] ? `${experienceLevels[0].count} positions open` : "All tiers"}
              </p>
            </Card>
          </div>

          {/* Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Work Type */}
            <Card className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
                <Briefcase className="w-4 h-4 text-[#6366F1]" />
                <h3 className="text-sm font-bold text-[#0F172A]">Openings by Job Type</h3>
              </div>
              <div className="space-y-2">
                {jobTypes.map((item) => (
                  <div key={item.type} className="flex items-center justify-between text-xs">
                    <span className="capitalize text-[#475569] font-medium">{item.type}</span>
                    <Badge variant="primary">{item.count} role{Number(item.count) === 1 ? "" : "s"}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* By Location */}
            <Card className="space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#F1F5F9]">
                <MapPin className="w-4 h-4 text-[#6366F1]" />
                <h3 className="text-sm font-bold text-[#0F172A]">Top Hiring Locations</h3>
              </div>
              <div className="space-y-2">
                {topLocations.map((item) => (
                  <div key={item.location} className="flex items-center justify-between text-xs">
                    <span className="text-[#475569] font-medium truncate max-w-[200px]">{item.location}</span>
                    <Badge variant="neutral">{item.count} listing{Number(item.count) === 1 ? "" : "s"}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
