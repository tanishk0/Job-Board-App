import Link from "next/link";
import { BookOpen, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const RESOURCES = [
  { title: "Software Engineer Resume Guide 2026", category: "Resume Tips", readTime: "5 min read", desc: "How to structure technical experience, projects, and metrics to pass recruiter screens." },
  { title: "Cracking System Design Interviews", category: "Interview Prep", readTime: "8 min read", desc: "Core architectural patterns, caching strategies, and database scalability topics." },
  { title: "Negotiating Engineering Offers", category: "Compensation", readTime: "6 min read", desc: "Frameworks for evaluating base salary, equity grants, and remote benefits." },
  { title: "Employer Guide: Technical Screening", category: "Employer", readTime: "7 min read", desc: "How top engineering teams evaluate active candidates efficiently without 5-stage interviews." },
];

export default async function ResourcesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="brand">Career & Hiring Knowledge Base</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Talentry Resources & Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
            Actionable guides for job seekers and hiring managers navigating modern tech recruitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESOURCES.map((item) => (
            <Card key={item.title} className="space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="neutral">{item.category}</Badge>
                  <span className="text-xs text-[#94A3B8] font-medium">{item.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-[#F1F5F9] flex justify-end">
                <span className="text-xs font-semibold text-[#6366F1] flex items-center gap-1 hover:underline cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
