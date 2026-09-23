import { requireCandidate } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { candidateProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { FileText, Upload, ExternalLink, CheckCircle2, Edit3 } from "lucide-react";
import Link from "next/link";

export default async function CandidateDocumentsPage() {
  const session = await requireCandidate();

  const [profile] = await db
    .select({
      id: candidateProfiles.id,
      resumeUrl: candidateProfiles.resumeUrl,
      updatedAt: candidateProfiles.updatedAt,
      preferredRole: candidateProfiles.preferredRole,
    })
    .from(candidateProfiles)
    .where(eq(candidateProfiles.userId, session.user.id));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Resume & Documents</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Manage your active resume attached to job applications submitted on Talentry.
          </p>
        </div>
        <Link href="/candidate/profile/edit">
          <Button variant="primary" size="sm">
            <Upload className="w-4 h-4" />
            <span>Update Resume</span>
          </Button>
        </Link>
      </div>

      {!profile?.resumeUrl ? (
        <EmptyState
          icon={FileText}
          title="No resume uploaded yet"
          description="You haven't uploaded a resume document yet. Add your resume to your profile to apply quickly to open positions."
          actionLabel="Add Resume to Profile"
          actionHref="/candidate/profile/edit"
        />
      ) : (
        <div className="space-y-4">
          <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {profile.preferredRole ? `${profile.preferredRole.replace(/\s+/g, "_")}_Resume.pdf` : "Primary_Resume.pdf"}
                  </h3>
                  <Badge variant="success" className="text-[10px]">
                    <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                    <span>Active CV</span>
                  </Badge>
                </div>
                <p className="text-xs text-[#64748B]">
                  Attached to candidate profile • Last updated {profile.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : "recently"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Document</span>
                </Button>
              </a>
              <Link href="/candidate/profile/edit">
                <Button variant="primary" size="sm">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Replace</span>
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
