import Link from "next/link";
import { DollarSign, MapPin, Briefcase, Layers, ArrowRight, Building2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobPostings, employerProfiles } from "@/db/schema";
import { isNotNull, and, ne, desc, eq } from "drizzle-orm";

export default async function SalariesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const jobsWithSalary = await db
    .select({
      id: jobPostings.id,
      title: jobPostings.title,
      salary: jobPostings.salary,
      experienceLevel: jobPostings.experienceLevel,
      location: jobPostings.location,
      jobType: jobPostings.jobType,
      companyName: employerProfiles.companyName,
    })
    .from(jobPostings)
    .leftJoin(employerProfiles, eq(jobPostings.employerId, employerProfiles.userId))
    .where(and(isNotNull(jobPostings.salary), ne(jobPostings.salary, "")))
    .orderBy(desc(jobPostings.createdAt));

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="success">Market Compensation Benchmarks</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Tech Salary Explorer
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
            Real compensation data benchmarked directly from active job postings on Talentry. Explore verified compensation ranges across engineering roles, seniority, and work setups.
          </p>
        </div>

        {jobsWithSalary.length === 0 ? (
          <EmptyState
            icon={DollarSign}
            title="No compensation benchmarks available"
            description="Salary data is benchmarked dynamically from active job postings. As employers publish positions with transparent compensation bands, salary insights will populate here."
            actionLabel="Browse Open Opportunities"
            actionHref="/jobs"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsWithSalary.map((item) => (
              <Card key={item.id} className="space-y-4 flex flex-col justify-between hover:border-[#6366F1]/40 transition-all">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="primary" className="text-xs truncate max-w-[200px]">
                      {item.title}
                    </Badge>
                    {item.jobType && (
                      <Badge variant="neutral" className="text-[10px]">
                        {item.jobType}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#16A34A]">{item.salary}</h3>
                    {item.companyName && (
                      <p className="text-xs font-medium text-[#475569] flex items-center gap-1.5 mt-1">
                        <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>{item.companyName}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9] text-xs text-[#64748B]">
                    {item.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    {item.experienceLevel && (
                      <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#6366F1]" />
                        <span className="capitalize">{item.experienceLevel} Tier</span>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/jobs/${item.id}`}
                  className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-semibold text-[#6366F1] hover:underline"
                >
                  <span>View Position Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
