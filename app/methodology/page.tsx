import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology',
  description: 'How MoneyAtlas calculators work: the inputs they take, the formulas they apply, the assumptions they make, how results are rounded, and where their limits lie.',
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Methodology</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. How MoneyAtlas Calculators Work</h2>
          <p>
            MoneyAtlas provides calculators across investment, loans, mortgage, savings, business, and
            salary topics. Each one applies the standard formula for its own subject, so there is no single
            universal method behind the site. Methodology is specific to each calculator, which is why the
            formula that governs a result is published on the page that produces it.
          </p>
          <p>
            Every calculator works the same way from your side: you enter the figures that describe your
            situation, the calculator applies its formula to them, and the result updates immediately as
            you type. Nothing is submitted, and no result depends on anything beyond the numbers you
            supply.
          </p>
          <p>
            Alongside each calculator you will find the formula written out, an explanation of what it
            does, at least two fully worked examples with every step shown, the assumptions the
            calculation relies on, and the mistakes that most often distort this particular kind of result.
            That material exists so a figure can be checked and understood rather than simply trusted.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. Inputs and User-Provided Information</h2>
          <p>
            Calculator results depend directly on user-provided values such as principal, rate, years,
            payment amount, costs, revenue, churn, or salary period. Changing an input changes the result.
          </p>
          <p>
            Calculators check the values you enter before calculating &mdash; requiring positive loan
            amounts, churn rates within a sensible range, or non-negative balances, depending on the tool.
            When a combination of inputs has no meaningful answer, the calculator shows no result for that
            state rather than returning a figure that would be misleading.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Formulas and Calculations</h2>
          <p>
            The formula applied depends on what is being calculated. Examples used across the site
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
            Some of these produce an answer in a single step. Others are worked out period by period,
            because the figures change as they go: a loan balance falls with every payment, a debt payoff
            plan redirects money as each balance clears, and a contribution schedule compounds each
            deposit for only the time remaining after it is made. Where that is the case, the calculation
            follows the same month-by-month sequence the real arrangement would.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Assumptions</h2>
          <p>
            Assumptions are not identical across calculators. Each calculator states its own on its page,
            and those statements describe exactly what that calculation does and does not account for.
          </p>
          <p>Common examples across the site include:</p>
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
            Calculations are carried out at full precision throughout, and rounding is applied only when a
            figure is displayed. Rounding at every intermediate step would let small errors accumulate
            across a long schedule, so the rounding you see affects presentation rather than the
            underlying arithmetic.
          </p>
          <p>
            Currency is shown to two decimal places and percentages to the precision appropriate for the
            figure. For calculations that run to a final payment, the last payment is adjusted to clear
            exactly the balance that remains, so a schedule ends at zero instead of leaving a fraction of
            a currency unit outstanding.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Currency and Financial Data</h2>
          <p>
            MoneyAtlas calculator math is separate from the homepage Live Financial Snapshot.
          </p>
          <p>
            The homepage currency panel displays a third-party data feed. It is not part of the core
            mathematical methodology of the calculators, and no calculator uses it as an input.
          </p>
          <p>
            The homepage panel draws on a single third-party data source:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <code>api.frankfurter.dev</code>, which serves the European Central Bank euro foreign
              exchange reference rates
            </li>
          </ul>
          <p>
            These are daily reference rates published by the ECB once each business day, not live
            market prices. Cross rates such as GBP/USD are derived arithmetically from the published
            euro-based table. The 30-day change figures are calculated from two published reference-rate
            tables and are not sourced from any separate provider.
          </p>
          <p>
            The homepage displays no equity index, stock, or commodity prices. Such data is licensed by
            the originating exchanges and is not shown here.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Calculator-Specific Differences</h2>
          <p>
            Not all calculators behave the same way, and the differences are deliberate. For example:
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
            Every calculator on this site is covered by an automated test suite. Each test compares what
            the calculator produces against a result worked out independently from the published formula,
            so a change that altered a figure would be caught before it reached the site. The tests cover
            ordinary cases as well as the awkward ones: zero and empty inputs, very large values, very
            short and very long time periods, and rounding at the boundaries.
          </p>
          <p>
            Calculators also validate what you enter before calculating. Where a combination of inputs has
            no meaningful answer &mdash; a loan term of zero, a negative principal, a break-even price
            below the variable cost per unit, or a debt whose minimum payment is smaller than its monthly
            interest &mdash; the calculator declines to produce a figure rather than presenting a
            misleading one. This matters because an impossible scenario can still yield a number, and a
            number that looks ordinary is easy to act on.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">10. Limitations</h2>
          <p>
            MoneyAtlas does not model every real-world variable in every calculator. Depending on the tool,
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
