import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'MoneyAtlas disclaimer — financial calculators and live snapshot data are provided for informational and educational use.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Disclaimer</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Purpose of MoneyAtlas</h2>
          <p>
            MoneyAtlas provides financial calculators and educational tools for general informational use.
            The content and calculator outputs are intended to help users explore scenarios, not to replace
            professional judgment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">No Professional Advice</h2>
          <p>
            MoneyAtlas does not provide financial, investment, tax, accounting, legal, or other professional
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
            MoneyAtlas does not guarantee that calculator results will match actual offers, contracts,
            taxes, investment returns, loan terms, or any other real-world outcomes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Third-Party Services and Data</h2>
          <p>
            The homepage currency panel uses one third-party data source:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              European Central Bank euro foreign exchange reference rates, retrieved via{' '}
              <code>api.frankfurter.dev</code>
            </li>
          </ul>
          <p>
            These are reference rates published once each business day, not live market prices. They are
            shown for general information only and are not suitable for trading, settlement, accounting,
            or any transaction where an exact rate matters.
          </p>
          <p>
            Third-party data may be delayed, unavailable, incomplete, or inaccurate. MoneyAtlas does not
            guarantee the accuracy, completeness, timeliness, or availability of third-party data. When
            the source is unavailable the panel says so rather than showing an estimated or previously
            cached value.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">External Links and External Services</h2>
          <p>
            This website may reference or link to external websites or services. MoneyAtlas does not control
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
            interpreted as an endorsement, financial recommendation, or suitability statement by MoneyAtlas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, MoneyAtlas is not responsible for losses,
            damages, or costs that result from reliance on calculator outputs, third-party snapshot data,
            or other informational content on this website.
          </p>
          <p>
            Your use of MoneyAtlas is at your own discretion, and you remain responsible for decisions
            based on the information provided.
          </p>
        </section>
      </div>
    </div>
  );
}
