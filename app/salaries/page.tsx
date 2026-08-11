import Link from "next/link";
import { DollarSign, TrendingUp, Briefcase, MapPin, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const SALARY_DATA = [
  { role: "Senior Full Stack Engineer", avgSalary: "₹28 LPA - ₹45 LPA", Junior: "₹12-18L", Mid: "₹18-28L", Senior: "₹28-45L+", location: "Bangalore / Remote" },
  { role: "Backend Engineer (Go/Python)", avgSalary: "₹25 LPA - ₹42 LPA", Junior: "₹10-16L", Mid: "₹16-25L", Senior: "₹25-42L+", location: "Delhi NCR / Hybrid" },
  { role: "Frontend Engineer (React/Next)", avgSalary: "₹22 LPA - ₹38 LPA", Junior: "₹9-14L", Mid: "₹14-22L", Senior: "₹22-38L+", location: "Remote" },
  { role: "DevOps & Cloud Engineer", avgSalary: "₹26 LPA - ₹44 LPA", Junior: "₹11-17L", Mid: "₹17-26L", Senior: "₹26-44L+", location: "Mumbai / Remote" },
  { role: "Product Manager", avgSalary: "₹24 LPA - ₹40 LPA", Junior: "₹12-18L", Mid: "₹18-26L", Senior: "₹26-40L+", location: "Bangalore" },
  { role: "UI/UX Designer", avgSalary: "₹18 LPA - ₹30 LPA", Junior: "₹8-12L", Mid: "₹12-18L", Senior: "₹18-30L+", location: "Remote" },
];

export default async function SalariesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
            Real compensation data benchmarked across tech roles, experience tiers, and work setups on Talentry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALARY_DATA.map((item) => (
            <Card key={item.role} className="space-y-4">
              <div className="space-y-1">
                <Badge variant="primary">{item.role}</Badge>
                <h3 className="text-xl font-bold text-[#16A34A] pt-1">{item.avgSalary}</h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>{item.location}</span>
                </p>
              </div>

              <div className="border-t border-[#F1F5F9] pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-[#475569]">
                  <span>Junior (1-3 yrs):</span>
                  <span className="font-semibold text-[#0F172A]">{item.Junior}</span>
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>Mid-Level (3-5 yrs):</span>
                  <span className="font-semibold text-[#0F172A]">{item.Mid}</span>
                </div>
                <div className="flex justify-between text-[#475569]">
                  <span>Senior (5+ yrs):</span>
                  <span className="font-semibold text-[#0F172A]">{item.Senior}</span>
                </div>
              </div>

              <Link href="/jobs" className="block text-center text-xs font-semibold text-[#6366F1] hover:underline pt-2">
                View Open Jobs for this Role →
              </Link>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
