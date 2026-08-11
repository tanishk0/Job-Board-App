import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookmarkCheck, UserRoundSearch, Mail } from "lucide-react";
import Link from "next/link";

export default async function EmployerTalentPoolPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Saved Talent Pool</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Bookmarked candidates saved for future open roles and passive outreach.</p>
        </div>
        <Link href="/employer/candidates">
          <Button variant="primary" size="sm">
            <UserRoundSearch className="w-4 h-4" />
            <span>Search Candidate Directory</span>
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#0F172A]">Alex Morgan</h3>
              <Badge variant="primary">Senior Frontend Engineer</Badge>
            </div>
            <p className="text-xs text-[#64748B]">Bangalore / Remote • 6 years exp • React, Next.js, TypeScript</p>
          </div>
          <Button variant="outline" size="sm">
            <Mail className="w-3.5 h-3.5" />
            <span>Reach Out</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}
