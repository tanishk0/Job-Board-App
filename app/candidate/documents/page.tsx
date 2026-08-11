import { requireCandidate } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FileText, Upload, Trash2, ExternalLink, CheckCircle2 } from "lucide-react";

export default async function CandidateDocumentsPage() {
  const session = await requireCandidate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Resume & Documents</h1>
          <p className="text-xs text-[#64748B] mt-0.5">Manage CV versions, portfolio links, and cover letters attached to job applications.</p>
        </div>
        <Button variant="primary" size="sm">
          <Upload className="w-4 h-4" />
          <span>Upload New Resume</span>
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#0F172A]">Primary_Resume_2026.pdf</h3>
                <Badge variant="success" className="text-[10px]">Active CV</Badge>
              </div>
              <p className="text-xs text-[#64748B]">PDF • 1.2 MB • Updated 3 days ago</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview</span>
            </Button>
            <Button variant="danger" size="sm">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
