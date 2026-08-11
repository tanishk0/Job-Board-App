import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Bell, CheckCircle2, Clock } from "lucide-react";

export default async function CandidateNotificationsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Notifications</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Application status updates, interview requests, and employer responses.</p>
      </div>

      <div className="space-y-3">
        <Card className="flex items-start gap-4 p-4">
          <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0F172A]">Application Shortlisted</h3>
              <span className="text-[10px] text-[#94A3B8]">2 hours ago</span>
            </div>
            <p className="text-xs text-[#64748B]">Stripe reviewed your application for Senior Full Stack Engineer and moved it to Interviewing.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
