import Link from 'next/link';
import { Calculator } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f7fafc] mt-16">
      <div className="mx-auto max-w-[1200px] px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-[#1e3a5f]">
              <Calculator className="h-5 w-5 text-[#3182ce]" />
              MoneyTools
            </Link>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed">
              Free educational financial calculators. Results are estimates only and do not constitute financial advice.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Calculators</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/investment" className="hover:text-[#3182ce]">Investment</Link></li>
              <li><Link href="/loans" className="hover:text-[#3182ce]">Loans</Link></li>
              <li><Link href="/mortgage" className="hover:text-[#3182ce]">Mortgage</Link></li>
              <li><Link href="/savings" className="hover:text-[#3182ce]">Savings</Link></li>
              <li><Link href="/business" className="hover:text-[#3182ce]">Business</Link></li>
              <li><Link href="/salary" className="hover:text-[#3182ce]">Salary</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/about" className="hover:text-[#3182ce]">About</Link></li>
              <li><Link href="/methodology" className="hover:text-[#3182ce]">Methodology</Link></li>
              <li><Link href="/contact" className="hover:text-[#3182ce]">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link href="/disclaimer" className="hover:text-[#3182ce]">Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-[#3182ce]">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-[#3182ce]">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          © 2026 MoneyTools. All rights reserved. For educational purposes only.
        </div>
      </div>
    </footer>
  );
}
