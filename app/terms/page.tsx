import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'MoneyTools terms of use.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Terms of Use</h1>

      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>By using MoneyTools, you agree to the following terms.</p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Use of Calculators</h2>
        <p>
          MoneyTools provides free financial calculators for educational purposes.
          You may use the tools for personal or professional reference, but results
          are estimates and should not be the sole basis for financial decisions.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">No Financial Advice</h2>
        <p>
          Nothing on this site constitutes financial, legal, tax, or investment advice.
          Consult a qualified professional for personalized guidance.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Limitation of Liability</h2>
        <p>
          MoneyTools is provided &ldquo;as is&rdquo; without warranty of any kind. We are not
          liable for any losses or damages arising from use of these tools.
        </p>

        <h2 className="text-xl font-semibold text-[#1e3a5f]">Changes</h2>
        <p>
          We may update these terms at any time. Continued use of MoneyTools after changes
          constitutes acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
}
