import Link from "next/link";
import { Building2, Search, MapPin, ArrowRight, CheckCircle2, Globe, Briefcase } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { employerProfiles, jobPostings } from "@/db/schema";
import { eq, sql, and, desc, count } from "drizzle-orm";

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const searchTerm = q?.trim() ? `%${q.trim().toLowerCase()}%` : null;

  const conditions = [];
  if (searchTerm) {
    conditions.push(
      sql`(LOWER(${employerProfiles.companyName}) LIKE ${searchTerm} OR LOWER(COALESCE(${employerProfiles.location}, '')) LIKE ${searchTerm} OR LOWER(COALESCE(${employerProfiles.companyDescription}, '')) LIKE ${searchTerm})`
    );
  }

  const companies = await db
    .select({
      id: employerProfiles.id,
      userId: employerProfiles.userId,
      companyName: employerProfiles.companyName,
      companyDescription: employerProfiles.companyDescription,
      companyLogoUrl: employerProfiles.companyLogoUrl,
      website: employerProfiles.website,
      location: employerProfiles.location,
      contactEmail: employerProfiles.contactEmail,
      openRoles: count(jobPostings.id),
    })
    .from(employerProfiles)
    .leftJoin(jobPostings, eq(employerProfiles.userId, jobPostings.employerId))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(employerProfiles.id)
    .orderBy(desc(count(jobPostings.id)), employerProfiles.companyName);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="primary">Verified Hiring Partners</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Explore Tech Companies
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
            Discover verified engineering and product teams hiring active talent on Talentry. Review company profiles, open roles, and locations.
          </p>

          <form method="GET" action="/companies" className="pt-2 max-w-xl flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Search companies by name, location, or description..."
                className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>
            <Button type="submit" variant="primary" size="md">
              Search
            </Button>
            {q && (
              <Link href="/companies">
                <Button variant="ghost" size="md">
                  Clear
                </Button>
              </Link>
            )}
          </form>
        </div>

        {/* Company Cards Grid or Empty State */}
        {companies.length === 0 ? (
          <EmptyState
            icon={Building2}
            title={q ? `No companies found for "${q}"` : "No registered companies yet"}
            description={
              q
                ? "We couldn't find any companies matching your search query. Try searching with a different term."
                : "No employer companies have created their profile on Talentry yet. Check back soon or post a job."
            }
            actionLabel={q ? "View All Companies" : "Browse Open Positions"}
            actionHref={q ? "/companies" : "/jobs"}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => {
              const openRolesCount = Number(company.openRoles) || 0;
              return (
                <Card
                  key={company.id}
                  className="flex flex-col justify-between space-y-4 hover:border-[#6366F1]/50 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      {company.companyLogoUrl ? (
                        <img
                          src={company.companyLogoUrl}
                          alt={company.companyName}
                          className="w-12 h-12 rounded-xl object-contain border border-[#E2E8F0] p-1 bg-white shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold text-lg shrink-0">
                          {company.companyName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <Badge variant="success" className="text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                        <span>Verified</span>
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#0F172A]">{company.companyName}</h3>
                      {company.companyDescription && (
                        <p className="text-xs text-[#64748B] line-clamp-2 mt-1 leading-relaxed">
                          {company.companyDescription}
                        </p>
                      )}
                    </div>

                    {company.location && (
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                        <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                        <span>{company.location}</span>
                      </div>
                    )}

                    {company.website && (
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B] truncate">
                        <Globe className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <a
                          href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-[#6366F1] hover:underline truncate"
                        >
                          {company.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#6366F1] flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{openRolesCount} Open Role{openRolesCount === 1 ? "" : "s"}</span>
                    </span>
                    <Link href={`/jobs?q=${encodeURIComponent(company.companyName)}`}>
                      <Button variant="ghost" size="sm">
                        <span>View Jobs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
