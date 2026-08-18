import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About MoneyTools',
  description:
    'Learn what MoneyTools provides, who the calculators are for, and how we approach clear and transparent financial estimation tools.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">About MoneyTools</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. What MoneyTools Is</h2>
          <p>
            MoneyTools is a free financial calculator website. It is built to help people quickly run
            practical financial calculations and better understand how common money decisions can play out
            under different assumptions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. What This Website Provides</h2>
          <p>
            The site provides calculators across topics such as borrowing, savings, investing, mortgage,
            business metrics, and income planning. Each tool is designed to turn user inputs into a clear
            computed result that can be used for scenario exploration.
          </p>
          <p>
            MoneyTools also includes supporting explanations so users can understand assumptions and
            interpret outputs responsibly instead of relying on a number without context.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Who the Calculators Are Designed For</h2>
          <p>
            MoneyTools is intended for a broad audience, including students, households, borrowers,
            savers, investors, founders, operators, and anyone who wants quick, structured financial
            estimates without building their own spreadsheet from scratch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Why the Calculators Are Free</h2>
          <p>
            The goal is to make financial estimation tools widely accessible. Free calculators help more
            people evaluate options, compare scenarios, and prepare better questions before making
            meaningful financial decisions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">5. Our Approach</h2>
          <p>
            MoneyTools focuses on clarity, transparency, and practical usefulness. Outputs are presented in
            straightforward language and formatting, with calculator-specific methodology details documented
            in the product.
          </p>
          <p>
            Calculator results are estimates generated from user inputs, calculator logic, and stated
            assumptions. They are intended for informational and educational use.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Accuracy and Methodology</h2>
          <p>
            Different calculators use different formulas and assumptions based on the type of problem being
            modeled. For details about how inputs, formulas, assumptions, rounding, and limitations are
            handled, please review the{' '}
            <Link href="/methodology" className="text-[#3182ce] hover:underline">
              Methodology page
            </Link>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Related Policies and Important Notices</h2>
          <p>
            To understand how information is handled, what limitations apply, and how to use the website
            responsibly, please review:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <Link href="/privacy" className="text-[#3182ce] hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="text-[#3182ce] hover:underline">
                Disclaimer
              </Link>
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">8. Transparency and Continuous Improvement</h2>
          <p>
            MoneyTools aims to keep trust pages aligned with the live implementation. As calculators,
            integrations, or policies evolve, these pages should be reviewed and updated so they remain
            accurate, clear, and useful.
          </p>
        </section>
      </div>
    </div>
  );
}
