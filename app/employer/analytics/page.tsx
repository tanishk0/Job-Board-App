import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";

export default async function EmployerAnalyticsPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Recruitment Analytics</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Track listing views, application conversion rates, and time-to-hire metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Total Views</span>
            <Eye className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">3,420</div>
          <p className="text-[11px] text-[#16A34A] font-medium">+14% this month</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Applications Received</span>
            <Users className="w-4 h-4 text-[#6366F1]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">248</div>
          <p className="text-[11px] text-[#16A34A] font-medium">7.2% conversion rate</p>
        </Card>

        <Card className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B]">
            <span>Time to Hire</span>
            <TrendingUp className="w-4 h-4 text-[#16A34A]" />
          </div>
          <div className="text-2xl font-bold text-[#0F172A]">14 Days</div>
          <p className="text-[11px] text-[#64748B]">3 days faster than avg</p>
        </Card>
      </div>
    </div>
  );
}
