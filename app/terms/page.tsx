import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'MoneyTools terms for using the website and its financial calculators.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="mb-6 text-3xl font-display font-bold tracking-tight text-[#1e3a5f]">Terms</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: August 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. Acceptance of These Terms</h2>
          <p>
            By accessing or using MoneyTools, you agree to these Terms. If you do not agree, please do not
            use the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. Permitted Use</h2>
          <p>
            MoneyTools is provided for lawful personal, educational, and professional reference use. You may
            use the calculators to explore financial scenarios and compare assumptions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Responsible Use of Calculator Results</h2>
          <p>
            You are responsible for how you interpret and apply calculator outputs. Before making material
            financial decisions, verify important inputs and assumptions and, where appropriate, consult a
            qualified professional.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Informational and Educational Nature</h2>
          <p>
            MoneyTools calculators and written content are provided for informational and educational
            purposes. They are designed to assist analysis and planning, not to replace individualized
            professional guidance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">5. No Professional Advice</h2>
          <p>
            MoneyTools does not provide financial, investment, tax, legal, or accounting advice. Nothing on
            this website constitutes a recommendation or endorsement of any specific transaction,
            investment, product, or strategy.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Accuracy and Availability Limitations</h2>
          <p>
            We aim to provide useful and accurate tools, but we do not warrant that all content,
            calculations, or website functions will always be complete, error-free, or continuously
            available.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Real-World Outcomes May Differ</h2>
          <p>
            Calculator outputs are estimates based on provided inputs and assumptions. Actual outcomes may
            differ due to changing rates, fees, taxes, regulations, provider terms, timing effects, market
            conditions, and other real-world factors.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">8. Third-Party Data Sources and Services</h2>
          <p>
            Certain homepage snapshot data is sourced from third-party services, including currency rates,
            market data, and weather APIs. Third-party data may be delayed, incomplete, unavailable, or
            inaccurate, and may change without notice.
          </p>
          <p>
            Current integrations include <code>open.er-api.com</code>,{' '}
            <code>query1.finance.yahoo.com</code>, and <code>api.open-meteo.com</code>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">9. External Links</h2>
          <p>
            MoneyTools may contain links or references to external websites or services. We do not control
            those third-party resources and are not responsible for their content, terms, privacy
            practices, or availability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">10. Intellectual Property</h2>
          <p>
            Unless otherwise stated, website content, text, and calculator presentation on MoneyTools are
            protected by applicable intellectual property laws. You may not copy, republish, or redistribute
            substantial portions of the site for commercial misuse without permission.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">11. Prohibited Misuse</h2>
          <p>You agree not to misuse the website, including by attempting to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Interfere with service operations, security, or availability</li>
            <li>Use automated abuse patterns that overload infrastructure</li>
            <li>Scrape or copy content in a way that violates applicable law</li>
            <li>Misrepresent MoneyTools outputs as guaranteed outcomes</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">12. Service Changes</h2>
          <p>
            MoneyTools may update, suspend, or remove features, calculators, or content at any time as the
            website evolves.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">13. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, MoneyTools is not liable for direct,
            indirect, incidental, consequential, or special losses arising from use of (or inability to use)
            the website, calculator outputs, or third-party data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">14. Relationship to Privacy Policy</h2>
          <p>
            Use of MoneyTools is also subject to the{' '}
            <Link href="/privacy" className="text-[#3182ce] hover:underline">
              Privacy Policy
            </Link>
            , which describes how information is handled in the current implementation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">15. Relationship to Disclaimer</h2>
          <p>
            Additional risk and responsibility information is provided in the{' '}
            <Link href="/disclaimer" className="text-[#3182ce] hover:underline">
              Disclaimer
            </Link>
            , including limitations of estimates and third-party snapshot data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">16. Updates to These Terms</h2>
          <p>
            These Terms may be revised from time to time. Updates take effect when posted on this page,
            and continued use of MoneyTools after updates indicates acceptance of the revised Terms.
          </p>
        </section>
      </div>
    </div>
  );
}
