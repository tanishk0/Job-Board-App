import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function CandidateRecommendationsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Recommended Opportunities</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Matched roles based on your experience level, skills, and target job preferences.</p>
      </div>

      <div className="space-y-4">
        <Card className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="success">94% Skill Match</Badge>
                <Badge variant="brand">Full-Time</Badge>
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Senior React / Next.js Engineer</h3>
              <p className="text-xs text-[#64748B]">Vercel • Remote • ₹28 LPA - ₹40 LPA</p>
            </div>
            <Link href="/jobs">
              <Button variant="primary" size="sm">
                <span>View & Apply</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 text-xs space-y-1">
            <span className="font-semibold text-[#0F172A]">Why this matches:</span>
            <ul className="space-y-1 text-[#64748B]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                Matches your preferred role (Frontend / Full Stack)
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                Matches your listed skills (React, TypeScript, Next.js)
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
