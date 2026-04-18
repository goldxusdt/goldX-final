import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SEOHead } from '@/lib/seo';
import { HelpCircle, Shield, Users, Zap, FileText } from 'lucide-react';

const faqData = [
  {
    category: "General Platform",
    icon: HelpCircle,
    questions: [
      {
        q: "What is Gold X Usdt?",
        a: "Gold X Usdt is an elite Multi-Level Marketing (MLM) platform focused on Gold USDT investments, delivering consistent 10% monthly ROI to its members."
      },
      {
        q: "How do I get started?",
        a: "Simply sign up for an account, complete your KYC verification, and make your first deposit of at least 100 USDT to start earning ROI."
      }
    ]
  },
  {
    category: "Security & Access",
    icon: Shield,
    questions: [
      {
        q: "How secure is my account?",
        a: "We use bank-grade encryption, 256-bit SSL, and advanced firewall hardening. Admin accounts are additionally protected by Mandatory One-Time Password (OTP) login flows."
      },
      {
        q: "What is Admin OTP?",
        a: "Admin OTP is an extra security layer for administrative accounts. Every time an admin logs in, they must provide a unique code from their authenticator app to grant access."
      }
    ]
  },
  {
    category: "Investments & ROI",
    icon: Zap,
    questions: [
      {
        q: "How is ROI calculated?",
        a: "ROI is calculated daily at approximately 0.33%, totaling 10% monthly. You can track your real-time earnings on your dashboard."
      },
      {
        q: "When can I withdraw my earnings?",
        a: "Earnings can be withdrawn once you reach the minimum withdrawal limit (currently 50 USDT). All withdrawals are processed through our secure automated system."
      }
    ]
  },
  {
    category: "Referral Program",
    icon: Users,
    questions: [
      {
        q: "How does the 15-tier referral system work?",
        a: "Our powerful referral system allows you to earn commissions from your network's growth up to 15 levels deep. Some levels are unlocked based on your total team performance."
      }
    ]
  },
  {
    category: "Troubleshooting",
    icon: FileText,
    questions: [
      {
        q: "Why did my document upload fail?",
        a: "Common causes include file size exceeding limits (max 10MB), unsupported file formats (use PNG, JPG, or PDF), or network timeout. Ensure your connection is stable and the file meets our requirements."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-20">
      <SEOHead 
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about Gold X Usdt platform, security, investments, and referral program."
      />
      
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-6xl font-black v56-gradient-text tracking-tighter">
            Frequently Asked <span className="text-foreground">Questions</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the Gold X Usdt platform. Can't find the answer you're looking for? Contact our support team.
          </p>
        </div>

        <div className="grid gap-8">
          {faqData.map((category, idx) => (
            <Card key={idx} className="v56-glass premium-border overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl font-bold">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border-b border-white/5 px-6">
                      <AccordionTrigger className="text-left font-bold py-4 hover:no-underline hover:text-primary transition-colors">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="v56-glass premium-border p-10 text-center space-y-6 rounded-3xl bg-primary/5">
          <h2 className="text-2xl font-bold">Still have questions?</h2>
          <p className="text-muted-foreground">
            Our support team is available 24/7 to help you with any inquiries.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/contact" className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity">
              Contact Support
            </a>
            <a href="/support" className="px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/80 transition-colors">
              Submit Ticket
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
