import type { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the MoneyTools team.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Contact</h1>

      <div className="rounded-xl bg-white border border-slate-200 p-8" style={{ boxShadow: 'var(--shadow-md)' }}>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#f7fafc] flex items-center justify-center text-[#3182ce] shrink-0">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1e3a5f] mb-2">Get in Touch</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Have a question, found a bug, or want to suggest a new calculator?
              We would love to hear from you.
            </p>
            <p className="text-sm text-slate-600">
              Email us at: <span className="font-medium text-[#3182ce]" suppressHydrationWarning>contact@moneytools.com</span>
            </p>
            <p className="text-xs text-slate-400 mt-4">
              For calculation errors, please include: the calculator name, your inputs,
              the result you received, and the expected result with your source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
