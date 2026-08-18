import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How MoneyTools maintains accuracy and integrity across all financial calculators.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Editorial Policy</h1>

      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          MoneyTools is committed to providing accurate, unbiased financial calculators.
          This policy outlines how we develop, review, and maintain our tools.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Calculator Development</h2>
        <p>
          Each calculator is built from standard financial formulas sourced from academic
          finance textbooks and industry references. Every formula is documented on the calculator page itself.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Testing and Verification</h2>
        <p>
          Every calculator engine has automated unit tests that verify results against independently
          calculated expected values. Tests cover standard cases, edge cases (zero inputs, large values),
          and rounding verification.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">No Fabricated Content</h2>
        <p>
          MoneyTools does not fabricate interest rates, expert endorsements, user reviews, or financial advice.
          We present tools and let the numbers speak for themselves.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Independence</h2>
        <p>
          Calculator results are not influenced by advertising or partnerships.
          Tools produce the same results regardless of any ads displayed on the page.
        </p>
      </div>
    </div>
  );
}
