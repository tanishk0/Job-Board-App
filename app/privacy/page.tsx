import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PrivacyPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="neutral">Legal Documentation</Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Privacy Policy</h1>
          <p className="text-xs text-[#64748B]">Last updated: August 11, 2026</p>
          <div className="border-t border-[#F1F5F9] pt-4 space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
            <p>At Talentry ("we", "our", "us"), we prioritize candidate and employer privacy. This Privacy Policy outlines how we collect, store, and process personal data when using the Talentry platform.</p>
            <h3 className="font-bold text-[#0F172A]">1. Data Collection</h3>
            <p>We collect information provided directly when creating an account, uploading resumes, creating job postings, or communicating with employers.</p>
            <h3 className="font-bold text-[#0F172A]">2. Use of Data</h3>
            <p>Candidate profile data is shared only with employers when candidates submit applications or opt into talent search matching.</p>
            <h3 className="font-bold text-[#0F172A]">3. Data Protection</h3>
            <p>We implement industry-standard encryption and security protocols to safeguard user documents, resumes, and communications.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
