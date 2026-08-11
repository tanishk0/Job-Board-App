import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ContactPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans">
      <Navbar session={session} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-[0_1px_3px_rgba(15,23,42,0.04)] space-y-4">
          <Badge variant="primary">Get in Touch</Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Contact Talentry Support
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
            Have questions about candidate accounts, employer billing, or platform features? Our support team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="e.g. Alex Morgan" required />
                <Input label="Email Address" type="email" placeholder="alex@company.com" required />
              </div>
              <Input label="Subject" placeholder="Inquiry regarding employer plans or candidate support" required />
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569]">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your inquiry or feedback..."
                  className="w-full p-3 text-sm bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                  required
                />
              </div>
              <Button variant="primary" size="md" type="submit">
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="space-y-4">
              <h3 className="text-base font-bold text-[#0F172A] border-b border-[#F1F5F9] pb-3">Contact Details</h3>
              <div className="space-y-3 text-xs text-[#475569]">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#6366F1]" />
                  <span>support@talentry.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#6366F1]" />
                  <span>+1 (800) 555-TALENT</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#6366F1]" />
                  <span>San Francisco, CA & Remote</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
