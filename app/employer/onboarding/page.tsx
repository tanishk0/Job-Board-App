import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function EmployerOnboardingPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <Badge variant="brand">Employer Setup</Badge>
        <h1 className="text-2xl font-bold text-[#0F172A]">Set Up Company Profile</h1>
        <p className="text-xs text-[#64748B]">Provide your company details, logo, and website to start posting open positions.</p>
      </div>

      <Card className="space-y-6">
        <form className="space-y-4">
          <Input label="Company Name" placeholder="e.g. Acme Inc." defaultValue={session.user.name || ""} required />
          <Input label="Company Website" placeholder="https://company.com" required />
          <Input label="Industry" placeholder="e.g. Fintech / Cloud Services" required />
          <Input label="HQ Location" placeholder="e.g. San Francisco, CA / Remote" required />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Company Overview & Culture
            </label>
            <textarea
              rows={4}
              placeholder="Describe your company mission, team size, work culture, and key benefits..."
              className="w-full p-3 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Link href="/employer/profile">
              <Button variant="primary" size="md">
                <span>Save & Continue to Profile</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
