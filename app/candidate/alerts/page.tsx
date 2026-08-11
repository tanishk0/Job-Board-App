import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Bell, Plus, Trash2, Sliders } from "lucide-react";

export default async function CandidateAlertsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Job Alerts</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Set up notification preferences for newly posted positions matching your target criteria.</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Create New Alert</span>
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#0F172A]">Senior Full Stack Engineer (Remote)</h3>
              <Badge variant="primary">Daily Digest</Badge>
            </div>
            <p className="text-xs text-[#64748B]">Keywords: React, Node.js, Next.js • Min Salary: ₹25 LPA+</p>
          </div>
          <Button variant="danger" size="sm">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
