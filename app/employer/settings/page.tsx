import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings, Building2 } from "lucide-react";

export default async function EmployerSettingsPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Company & Account Settings</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Manage recruitment pipeline preferences, team permissions, and account credentials.</p>
      </div>

      <Card className="space-y-6">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">Company Admin Details</h3>
        <form className="space-y-4">
          <Input label="Company Name" defaultValue={session.user.name || ""} required />
          <Input label="Work Email" defaultValue={session.user.email || ""} disabled helperText="Email address associated with company billing" />
          <div className="pt-2">
            <Button variant="primary" size="md">
              Save Settings
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
