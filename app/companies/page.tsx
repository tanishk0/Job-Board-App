import Link from "next/link";
import { Building2, Search, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MOCK_COMPANIES = [
  { id: "1", name: "Stripe", industry: "Fintech & Payments", location: "San Francisco, CA / Remote", openRoles: 14, techStack: ["Ruby", "Go", "React", "TypeScript"] },
  { id: "2", name: "Vercel", industry: "Cloud & Developer Tools", location: "San Francisco, CA / Remote", openRoles: 8, techStack: ["Next.js", "TypeScript", "Go", "Rust"] },
  { id: "3", name: "Linear", industry: "Productivity & SaaS", location: "San Francisco, CA / Remote", openRoles: 5, techStack: ["TypeScript", "React", "GraphQL", "Electron"] },
  { id: "4", name: "Figma", industry: "Design & Creative Tools", location: "San Francisco, CA", openRoles: 12, techStack: ["C++", "TypeScript", "React", "WebAssembly"] },
  { id: "5", name: "Supabase", industry: "Database & Open Source", location: "Remote", openRoles: 9, techStack: ["PostgreSQL", "Go", "TypeScript", "Elixir"] },
  { id: "6", name: "Retool", industry: "Low-Code & Enterprise", location: "San Francisco, CA / Hybrid", openRoles: 7, techStack: ["Node.js", "React", "PostgreSQL", "Redux"] },
];

export default async function CompaniesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="primary">Verified Hiring Partners</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Explore Top Tech Companies
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
            Discover leading engineering teams hiring active talent on Talentry. Review tech stacks, company culture, open roles, and location perks.
          </p>

          <div className="pt-2 max-w-xl flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search companies by name, industry, or tech stack..."
                className="w-full h-10 pl-9 pr-3 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
              />
            </div>
            <Button variant="primary" size="md">
              Search
            </Button>
          </div>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COMPANIES.map((company) => (
            <Card key={company.id} className="flex flex-col justify-between space-y-4 hover:border-[#6366F1]/50 transition-all">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center font-bold text-lg">
                    {company.name.slice(0, 2).toUpperCase()}
                  </div>
                  <Badge variant="success" className="text-[10px]">
                    <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                    <span>Verified</span>
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0F172A]">{company.name}</h3>
                  <p className="text-xs text-[#64748B] font-medium">{company.industry}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>{company.location}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {company.techStack.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[11px] font-medium text-[#475569]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6366F1]">{company.openRoles} Open Roles</span>
                <Link href="/jobs">
                  <Button variant="ghost" size="sm">
                    <span>View Jobs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
