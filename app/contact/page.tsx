import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, Mail, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'How to contact MoneyAtlas for calculator issues, feedback, and privacy-related questions.',
};

const OPERATOR_NAME = 'AVC TRADE LLC';
const OPERATOR_ADDRESS = '30 N Gould St, Ste 82801, Sheridan, WY';
const CONTACT_EMAIL = 'contact@moneyatlas.net';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Contact</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Who Operates MoneyAtlas</h2>
          <p>
            MoneyAtlas is operated by {OPERATOR_NAME}. Email is the best way to reach us.
          </p>
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5" style={{ boxShadow: 'var(--shadow-md)' }}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7fafc] text-[#3182ce]">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Website operator</p>
                <p className="text-base font-semibold text-[#1e3a5f]">{OPERATOR_NAME}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7fafc] text-[#3182ce]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Address</p>
                <p className="text-base font-semibold text-[#1e3a5f]">{OPERATOR_ADDRESS}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7fafc] text-[#3182ce]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Contact email</p>
                <p className="text-base font-semibold text-[#1e3a5f]" suppressHydrationWarning>
                  {CONTACT_EMAIL}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Reasons You May Contact Us</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Reporting a calculator error or unexpected result</li>
            <li>Reporting incorrect or outdated information on the website</li>
            <li>Suggesting a new calculator or feature improvement</li>
            <li>Reporting a broken page, layout issue, or technical bug</li>
            <li>Asking a privacy-related question</li>
            <li>Sharing general feedback or questions about MoneyAtlas</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">No Contact Form at This Time</h2>
          <p>
            The current implementation does not include an active website contact form backend. If you need
            to reach MoneyAtlas, please use the email address above.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Helpful Details for Calculator Error Reports</h2>
          <p>To help reproduce and review a calculation issue, include:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Calculator name and page URL</li>
            <li>Exact input values used</li>
            <li>The result shown on the page</li>
            <li>What you expected instead and why</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Related Pages</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <Link href="/privacy" className="text-[#3182ce] hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[#3182ce] hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-[#3182ce] hover:underline">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/methodology" className="text-[#3182ce] hover:underline">
                Methodology
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
