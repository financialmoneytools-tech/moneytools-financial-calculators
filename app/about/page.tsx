import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About MoneyTools',
  description: 'Learn about MoneyTools — free financial calculators built for accuracy, transparency, and ease of use.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">About MoneyTools</h1>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">
        <p>
          MoneyTools provides free, professional-grade financial calculators for individuals and businesses.
          Whether you are planning an investment, comparing loan options, budgeting for a home purchase,
          or analyzing business metrics, our tools give you clear, accurate numbers to inform your decisions.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f] mt-8">What We Do</h2>
        <p>
          We build financial calculators that are mathematically correct, transparent in their methodology,
          and designed to be immediately useful. Every calculator shows you the formula, the assumptions,
          and a worked example so you understand exactly how the result was produced.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f] mt-8">Who This Is For</h2>
        <p>
          Anyone making financial decisions: savers, borrowers, investors, students, business owners,
          and financial professionals who need a quick calculation without opening a spreadsheet.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f] mt-8">Our Commitment</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Accuracy:</strong> Every calculation engine is unit-tested against independently verified expected values.</li>
          <li><strong>Transparency:</strong> All formulas and assumptions are documented on each calculator page and in our <Link href="/methodology" className="text-[#3182ce] hover:underline">methodology</Link>.</li>
          <li><strong>Privacy:</strong> Calculations run entirely in your browser. No financial data is stored, transmitted, or shared.</li>
          <li><strong>Free access:</strong> All tools are free, with no account required.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#1e3a5f] mt-8">Important Note</h2>
        <p>
          MoneyTools provides educational estimates. Results should not be treated as financial advice.
          Please consult a qualified financial professional before making significant financial decisions.
          See our <Link href="/disclaimer" className="text-[#3182ce] hover:underline">disclaimer</Link> for full details.
        </p>
      </div>
    </div>
  );
}
