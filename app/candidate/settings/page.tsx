import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Settings, Shield, Bell } from "lucide-react";

export default async function CandidateSettingsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Candidate Settings</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Manage your account email, password, and privacy preferences.</p>
      </div>

      <Card className="space-y-6">
        <h3 className="text-base font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">Account Information</h3>
        <form className="space-y-4">
          <Input label="Full Name" defaultValue={session.user.name || ""} required />
          <Input label="Email Address" defaultValue={session.user.email || ""} disabled helperText="Email address linked to your account" />
          <div className="pt-2">
            <Button variant="primary" size="md">
              Save Account Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
