import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { UserCheck, Upload, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function CandidateOnboardingPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <Badge variant="primary">Step 1 of 3</Badge>
        <h1 className="text-2xl font-bold text-[#0F172A]">Complete Candidate Profile</h1>
        <p className="text-xs text-[#64748B]">Set up your role preferences, experience level, and resume to match with employers.</p>
      </div>

      <Card className="space-y-6">
        <form className="space-y-4">
          <Input label="Target Job Title" placeholder="e.g. Senior Frontend Engineer" required />
          <Input label="Location / Preferred Work Setup" placeholder="e.g. Remote, Bangalore, Hybrid" required />
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Experience Level
            </label>
            <select className="w-full h-10 px-3.5 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]">
              <option value="fresher">Fresher (0-1 yrs)</option>
              <option value="junior">Junior (1-3 yrs)</option>
              <option value="mid">Mid-Level (3-5 yrs)</option>
              <option value="senior">Senior (5+ yrs)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
              Short Professional Bio
            </label>
            <textarea
              rows={3}
              placeholder="Highlight technical skills, key frameworks, and accomplishments..."
              className="w-full p-3 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Link href="/candidate/profile">
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
