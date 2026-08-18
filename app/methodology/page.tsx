import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'How MoneyTools calculators work: formulas, rounding conventions, assumptions, and limitations.',
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Methodology</h1>

      <div className="space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">How Calculations Work</h2>
          <p>
            Each calculator uses standard financial formulas that are documented directly on the calculator page.
            We use iterative computation for amortization schedules (rather than relying solely on closed-form formulas)
            to correctly handle rounding and final-payment reconciliation.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Precision and Rounding</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internal calculations use full floating-point precision. Intermediate values are never rounded.</li>
            <li>Display values for currency are rounded to 2 decimal places.</li>
            <li>Percentage values are displayed to 2–4 decimal places depending on context.</li>
            <li>For financial totals that must reconcile (such as amortization schedules), the final payment is adjusted to eliminate any rounding discrepancy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Compounding Conventions</h2>
          <p>
            Unless stated otherwise, interest compounds at the frequency specified by the user (e.g., monthly, quarterly, annually).
            Contributions are assumed to occur at the end of each period (ordinary annuity) unless the calculator offers a
            beginning-of-period option (annuity due).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Assumptions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Interest rates are assumed to be fixed for the entire period unless the calculator explicitly supports variable rates.</li>
            <li>Loan and mortgage calculators assume equal monthly payments (fully amortizing).</li>
            <li>Inflation adjustment uses a simple annual rate applied uniformly.</li>
            <li>Salary conversions assume consistent hours and weeks. No tax calculations are included in V1.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Limitations</h2>
          <p>
            These calculators provide estimates based on the inputs you provide. Real-world results may differ
            due to variable rates, fees, taxes, market fluctuations, and other factors not modeled here.
            Results should not be used as the sole basis for any financial decision.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#1e3a5f] mb-3">Reporting Errors</h2>
          <p>
            If you believe a calculation is producing incorrect results, please contact us with:
            the calculator name, the inputs you used, the result you received, and the expected result with source.
            We take accuracy seriously and will investigate promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
