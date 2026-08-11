import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function CookiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="neutral">Legal Documentation</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Cookie Policy</h1>
          <p className="text-xs text-[#64748B]">Last updated: August 11, 2026</p>
          <div className="border-t border-[#F1F5F9] pt-4 space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
            <p>Talentry uses essential session cookies to authenticate candidate and employer accounts, preserve active session tokens, and ensure secure form submissions.</p>
            <h3 className="font-bold text-[#0F172A]">Essential Cookies</h3>
            <p>Authentication cookies (`better-auth.session_token`) are strictly necessary to maintain secure access across candidate and employer portals.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
