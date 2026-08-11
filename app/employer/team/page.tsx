import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Users2, Plus } from "lucide-react";

export default async function EmployerTeamPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Team Members & Access</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Invite hiring managers and recruiters to collaborate on job postings and applicant review.</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Invite Team Member</span>
        </Button>
      </div>

      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Current Hiring Team</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
            <div>
              <p className="text-sm font-bold text-[#0F172A]">{session.user.name}</p>
              <p className="text-xs text-[#64748B]">{session.user.email}</p>
            </div>
            <Badge variant="brand">Owner / Admin</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
