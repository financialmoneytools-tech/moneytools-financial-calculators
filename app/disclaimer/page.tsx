import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'MoneyTools disclaimer — financial calculators and live snapshot data are provided for informational and educational use.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Disclaimer</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Purpose of MoneyTools</h2>
          <p>
            MoneyTools provides financial calculators and educational tools for general informational use.
            The content and calculator outputs are intended to help users explore scenarios, not to replace
            professional judgment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">No Professional Advice</h2>
          <p>
            MoneyTools does not provide financial, investment, tax, accounting, legal, or other professional
            advice. Nothing on this website should be interpreted as a recommendation to take (or avoid)
            any specific financial action.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Calculator Results and Assumptions</h2>
          <p>
            Calculator results are estimates or computed outputs based on the information entered by the
            user and the formulas/assumptions used by each calculator.
          </p>
          <p>
            You are responsible for reviewing your inputs and evaluating whether a calculator&apos;s
            assumptions are appropriate for your specific situation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Independent Verification</h2>
          <p>
            Before making important financial decisions, you should independently verify key numbers,
            terms, and assumptions using qualified sources or professional advisors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Real-World Variability</h2>
          <p>
            Actual outcomes can vary significantly depending on country, jurisdiction, lender policies,
            tax rules, fees, interest rates, inflation assumptions, market conditions, and other real-world
            factors.
          </p>
          <p>
            MoneyTools does not guarantee that calculator results will match actual offers, contracts,
            taxes, investment returns, loan terms, or any other real-world outcomes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Third-Party Services and Data</h2>
          <p>
            The homepage Live Financial Snapshot uses third-party data sources, including:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Foreign exchange rates from <code>open.er-api.com</code>
            </li>
            <li>
              Market data from the Yahoo Finance quote API (<code>query1.finance.yahoo.com</code>)
            </li>
            <li>
              Weather data from <code>api.open-meteo.com</code>
            </li>
          </ul>
          <p>
            Third-party data may be delayed, unavailable, incomplete, or inaccurate. MoneyTools does not
            guarantee the accuracy, completeness, timeliness, or availability of third-party data.
          </p>
          <p>
            Live market, weather, and currency information is provided for informational purposes only.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">External Links and External Services</h2>
          <p>
            This website may reference or link to external websites or services. MoneyTools does not control
            those external services and is not responsible for their content, terms, privacy practices, or
            service availability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Advertising</h2>
          <p>
            Advertising services (including Google AdSense) are not currently active in the present
            implementation.
          </p>
          <p>
            If advertisements are enabled in the future, ad placement or ad presence should not be
            interpreted as an endorsement, financial recommendation, or suitability statement by MoneyTools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, MoneyTools is not responsible for losses,
            damages, or costs that result from reliance on calculator outputs, third-party snapshot data,
            or other informational content on this website.
          </p>
          <p>
            Your use of MoneyTools is at your own discretion, and you remain responsible for decisions
            based on the information provided.
          </p>
        </section>
      </div>
    </div>
  );
}
