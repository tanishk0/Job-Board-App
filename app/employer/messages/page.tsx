import { requireEmployer } from "@/lib/auth/session";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Send } from "lucide-react";

export default async function EmployerMessagesPage() {
  const session = await requireEmployer();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="pb-4 border-b border-[#E2E8F0]">
        <h1 className="text-2xl font-bold text-[#0F172A]">Candidate Communications</h1>
        <p className="text-xs text-[#64748B] mt-0.5">Direct messaging portal for candidate inquiries and interview scheduling notes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">Active Conversations</h3>
          <div className="p-3 bg-[#EEF2FF] border border-[#C7D2FE] rounded-lg space-y-1 cursor-pointer">
            <h4 className="text-xs font-bold text-[#0F172A]">Alex Morgan</h4>
            <p className="text-[11px] text-[#6366F1] truncate">Regarding Senior Frontend role interview...</p>
          </div>
        </Card>

        <Card className="md:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-3 pb-4 border-b border-[#F1F5F9]">
            <h3 className="text-base font-bold text-[#0F172A]">Alex Morgan</h3>
            <p className="text-xs text-[#64748B]">Applying for Senior Frontend Engineer</p>
          </div>

          <div className="space-y-3 py-4 min-h-[200px]">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs max-w-sm">
              <p className="font-semibold text-[#0F172A]">Candidate:</p>
              <p className="text-[#475569]">Hi! I've submitted my application and portfolio. Looking forward to discussing the role.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#F1F5F9]">
            <input
              type="text"
              placeholder="Type message or interview invite..."
              className="flex-1 h-10 px-3.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            />
            <Button variant="primary" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
