import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Award, CheckCircle2, Plus } from "lucide-react";

export default async function CandidateSkillsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Skill Verifications</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Showcase verified technical skills on your candidate profile.</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </Button>
      </div>

      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Verified Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {["React.js", "TypeScript", "Next.js", "Node.js", "PostgreSQL", "TailwindCSS"].map((skill) => (
            <Badge key={skill} variant="success" className="py-1 px-3 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>{skill}</span>
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
