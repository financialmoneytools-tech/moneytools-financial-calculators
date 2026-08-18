import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'How MoneyTools calculators work: inputs, formulas, assumptions, precision, and limitations based on the current implementation.',
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Methodology</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. How MoneyTools Calculators Work</h2>
          <p>
            MoneyTools currently includes multiple calculator engines across investment, loans, mortgage,
            savings, business, and salary categories. Each calculator page is connected to a specific
            calculation engine in the codebase, so methodology is calculator-specific rather than one
            universal formula for all tools.
          </p>
          <p>
            In the current implementation, each calculator page takes user inputs, runs the matching
            TypeScript calculation function, and displays the computed output. Formula, assumptions,
            and worked-example content are also shown on each calculator page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. Inputs and User-Provided Information</h2>
          <p>
            Calculator results depend directly on user-provided values such as principal, rate, years,
            payment amount, costs, revenue, churn, or salary period. Changing an input changes the result.
          </p>
          <p>
            The calculator engines include input validation (for example, requiring positive loan amounts,
            valid churn ranges, or non-negative balances where appropriate). If inputs are invalid,
            the engine throws an error and the page does not render a result for that calculation state.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Formulas and Calculations</h2>
          <p>
            MoneyTools uses formula logic that varies by calculator type. Examples from the current engines
            include:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Compound-interest and savings-family tools using future-value style compounding logic with
              periodic contributions
            </li>
            <li>
              Loan and mortgage tools using amortization payment formulas and month-by-month schedules
            </li>
            <li>
              ROI/CAGR/APY tools using percentage-return and compounding-rate formulas
            </li>
            <li>
              Business tools such as break-even, markup/margin, ROAS, and LTV:CAC using their respective
              financial ratio formulas
            </li>
            <li>
              Salary conversion using pay-period conversion rules (hourly, daily, weekly, bi-weekly,
              semi-monthly, monthly, annual)
            </li>
          </ul>
          <p>
            Some engines are closed-form, while others use iterative period-by-period calculations
            (for example, amortization schedules, debt payoff sequencing, and contribution-based growth
            projections).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Assumptions</h2>
          <p>
            Assumptions are not identical across calculators. Each calculator has its own assumptions shown
            on its page, and the underlying engine reflects that scope.
          </p>
          <p>Examples present in the current implementation include:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Fixed-rate assumptions in many growth and amortization scenarios unless otherwise modeled</li>
            <li>Periodic contribution timing (end-of-period or beginning-of-period depending on the tool)</li>
            <li>Salary conversion assumptions such as user-entered hours/week and weeks/year</li>
            <li>Business metric assumptions based on provided margin, churn, spend, and customer values</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">5. Rounding and Precision</h2>
          <p>
            In the calculator engines, intermediate steps are generally computed using JavaScript numeric
            precision without forced rounding at every step. Display formatting is applied when showing
            output values in the UI.
          </p>
          <p>
            Currency and numeric display formatting is handled by utility formatters, including configured
            decimal places for currency and percentages. Some amortization-style engines also apply final
            payment reconciliation so remaining balance does not persist due to tiny residual values.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Currency and Financial Data</h2>
          <p>
            MoneyTools calculator math is separate from the homepage Live Financial Snapshot.
          </p>
          <p>
            The Live Financial Snapshot displays third-party data feeds (currency rates, market quotes,
            and weather). These feeds are not the core mathematical methodology of the calculators.
          </p>
          <p>
            Third-party snapshot sources in the current implementation are:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <code>open.er-api.com</code> (foreign exchange rates)
            </li>
            <li>
              Yahoo Finance quote API at <code>query1.finance.yahoo.com</code> (market data)
            </li>
            <li>
              <code>api.open-meteo.com</code> (weather data)
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Calculator-Specific Differences</h2>
          <p>
            Not all calculators behave the same way. The current engines include materially different logic,
            for example:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Debt Payoff compares avalanche vs snowball ordering and simulates monthly payoff flow
            </li>
            <li>
              Personal Loan computes an effective APR adjustment when origination fees are included
            </li>
            <li>
              Mortgage Amortization models optional extra monthly principal payments and payoff acceleration
            </li>
            <li>
              Investment includes inflation-adjusted value outputs in addition to nominal growth
            </li>
            <li>
              APY includes APR↔APY conversion logic and compounding-frequency comparisons
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">8. Examples and Interpretation</h2>
          <p>
            Each calculator page includes formula notes and a worked example to help interpretation.
            These examples are illustrative only.
          </p>
          <p>
            Practical interpretation guidance: treat results as scenario calculations, then stress-test with
            alternative inputs (for example different rates, contribution amounts, fees, or time horizons)
            before making financial decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">9. Validation and Quality Checks</h2>
          <p>
            The repository includes unit tests for calculator engines under
            <code> lib/calculators/__tests__/</code>, configured through Vitest.
          </p>
          <p>
            In addition, calculator engines use explicit input checks and error handling to prevent invalid
            numeric scenarios from being shown as normal results.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">10. Limitations</h2>
          <p>
            MoneyTools does not model every real-world variable in every calculator. Depending on the tool,
            omitted variables may include taxes, changing rates, transaction costs, penalties,
            contract-specific rules, or jurisdiction-specific regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">11. When Results May Differ From Real-World Results</h2>
          <p>Calculated outputs may differ from actual outcomes due to factors such as:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Rate changes over time (interest, yield, borrowing cost, inflation)</li>
            <li>Fees, taxes, penalties, and closing or servicing costs</li>
            <li>Lender underwriting criteria and product-specific contract terms</li>
            <li>Country/jurisdiction differences in legal and tax treatment</li>
            <li>Timing differences (payment dates, compounding intervals, settlement timing)</li>
            <li>Data timing and availability constraints for third-party snapshot feeds</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">12. Reporting an Error</h2>
          <p>
            If you suspect a calculation issue, report it through the Contact page and include:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>The calculator name and page URL</li>
            <li>The exact input values used</li>
            <li>The displayed result and what you expected instead</li>
            <li>The basis for comparison (for example a manual calculation or source reference)</li>
          </ul>
          <p>
            Providing reproducible input/output details helps isolate whether the issue is input-related,
            interpretation-related, or a calculation defect.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">13. Methodology Updates</h2>
          <p>
            This page is intended to track the active implementation. When calculator logic, assumptions,
            or data integrations change, methodology text should be reviewed and updated to stay aligned
            with shipped behavior.
          </p>
        </section>
      </div>
    </div>
  );
}
