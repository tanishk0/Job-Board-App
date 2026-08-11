import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, BarChart2, DollarSign } from "lucide-react";

export default async function CandidateInsightsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Career Insights & Market Trends</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Explore compensation benchmarks and in-demand tech skills in your domain.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#6366F1]" />
            <h3 className="text-base font-bold text-[#0F172A]">In-Demand Frameworks</h3>
          </div>
          <p className="text-xs text-[#64748B]">Next.js, TypeScript, Go, and PostgreSQL show 35% higher applicant callback rates this quarter.</p>
        </Card>

        <Card className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#16A34A]" />
            <h3 className="text-base font-bold text-[#0F172A]">Senior Salary Growth</h3>
          </div>
          <p className="text-xs text-[#64748B]">Average senior full stack engineering offers in India range between ₹28 LPA - ₹45 LPA.</p>
        </Card>
      </div>
    </div>
  );
}
