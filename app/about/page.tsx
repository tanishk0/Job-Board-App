import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Briefcase, Target, ShieldCheck, Users } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AboutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="primary">About Talentry</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Building the Transparent Talent Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-3xl leading-relaxed">
            Talentry was built to solve candidate ghosting and hiring pipeline opacity. We empower job seekers with direct application tracking and give hiring teams structured candidate insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] text-[#6366F1] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Our Mission</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              To connect verified talent with ambitious hiring managers through clear compensation benchmarks and real-time application pipelines.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F5F3FF] text-[#4F46E5] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Verified Companies</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Every job posting on Talentry comes from verified employer accounts, preventing spam and phantom listings.
            </p>
          </Card>

          <Card className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#0F172A]">Human-Centric UX</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Designed according to strict product design principles—clarity first, zero sparkle gimmicks, and complete transparency.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
