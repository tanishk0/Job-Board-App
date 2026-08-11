import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Bell, Users, CheckCircle2 } from "lucide-react";

export default async function EmployerNotificationsPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Employer Notifications</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Real-time alerts for new candidate applications and candidate messages.</p>
      </div>

      <div className="space-y-3">
        <Card className="flex items-start gap-4 p-4">
          <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0F172A]">New Applicant Submitted</h3>
              <span className="text-[10px] text-[#94A3B8]">10 mins ago</span>
            </div>
            <p className="text-xs text-[#64748B]">Alex Morgan applied for Senior Full Stack Engineer.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
