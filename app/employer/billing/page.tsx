import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default async function EmployerBillingPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Billing & Subscription Plans</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Manage employer tier, job posting limits, and candidate search credits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-4 border-2 border-[#6366F1] relative">
          <Badge variant="primary" className="absolute top-4 right-4">Current Plan</Badge>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0F172A]">Growth Employer</h3>
            <p className="text-2xl font-extrabold text-[#6366F1]">₹4,999 <span className="text-xs font-normal text-[#64748B]">/ month</span></p>
          </div>

          <ul className="space-y-2 text-xs text-[#475569]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Up to 10 Active Job Postings</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Unlimited Candidate Applications</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Candidate Search Access</span>
            </li>
          </ul>

          <Button variant="primary" size="sm" className="w-full">
            Manage Subscription
          </Button>
        </Card>
      </div>
    </div>
  );
}
