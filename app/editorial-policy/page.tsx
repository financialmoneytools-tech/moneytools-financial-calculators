import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How MoneyAtlas maintains accuracy and integrity across all financial calculators.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-12">
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-6">Editorial Policy</h1>

      <div className="space-y-6 leading-relaxed text-slate-600">
        <p>Last updated: September 19, 2026</p>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">1. Purpose and Editorial Standards</h2>
          <p>
            MoneyAtlas publishes two kinds of material: the calculators themselves, and the written
            explanations that accompany them. This page describes how both are prepared, checked, kept
            current, and corrected, so you can judge how much weight to give what you read here.
          </p>
          <p>
            Our standards are deliberately narrow. State the formula, show the arithmetic, name the
            assumptions the calculation depends on, and be explicit about what it does not account for.
            Where a claim cannot be supported, we leave it out rather than soften it. We would rather a
            page say less and be checkable than say more and require trust.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">2. How Explanations Are Prepared</h2>
          <p>
            Each explanation is written around the specific calculation it documents rather than around a
            general topic. That is why the material on a calculator page &mdash; the formula, the worked
            examples, the assumptions, the common mistakes &mdash; refers to that calculation and not to
            finance in the abstract.
          </p>
          <p>
            Every worked example is produced by running the same calculation the page uses, with the inputs
            listed alongside it. The figures shown in an example are what the calculator returns for those
            inputs, not numbers written to illustrate a point. If a calculation changes, its examples change
            with it.
          </p>
          <p>
            Numbers that appear in explanations are illustrative inputs chosen to demonstrate a method. They
            are not current market rates, returns, or prices, and they are not presented as such. We do not
            publish invented statistics, quotations, endorsements, testimonials, or user reviews, and we do
            not attribute claims to sources we have not actually relied on.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">3. Calculation Methodology and Review</h2>
          <p>
            Calculators apply standard, widely documented financial formulas. The formula that governs a
            result is published on the page that produces it, together with an explanation of what each
            term means, so a figure can be checked by hand rather than taken on trust.
          </p>
          <p>
            Every calculator is covered by automated checks that compare what it produces against results
            worked out separately from the published formula. These checks run whenever the site is
            updated. They cover ordinary inputs as well as the awkward ones: zero and empty values, very
            large amounts, very short and very long time periods, and rounding at the boundaries. A change
            that altered a published figure would fail those checks before it reached the site.
          </p>
          <p>
            Where two calculators describe the same underlying relationship, their explanations are written
            to agree and their results are expected to match for equivalent inputs. Where two calculators
            deliberately differ &mdash; in how often interest compounds, or in whether a result is adjusted
            for inflation &mdash; the difference is stated on the page rather than left for you to discover.
          </p>
          <p>
            A fuller account of how the calculations work, including rounding and known limitations, is on
            the{' '}
            <Link href="/methodology" className="font-medium text-[#3182ce] underline underline-offset-2">
              Methodology
            </Link>{' '}
            page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">4. Content Updates and Maintenance</h2>
          <p>
            A page is updated when the calculation behind it changes, when an explanation turns out to be
            unclear or wrong, or when something stated on the page no longer matches what the site actually
            does. Descriptions of features are expected to match the product; if a page claims something the
            site does not do, that is treated as an error to be corrected.
          </p>
          <p>
            We do not operate a fixed publication schedule, and we do not revise pages merely to signal that
            they are recent. Financial formulas do not change often, and a page that remains accurate is
            left as it is. Where a page carries a date, it reflects when the content was last changed in
            substance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">5. Corrections and Error Reporting</h2>
          <p>
            If you believe a result or an explanation is wrong, please tell us. Reader reports are the most
            reliable way errors are found, and we would rather hear about a suspected mistake that turns out
            to be correct behaviour than not hear about a real one.
          </p>
          <p>Reports are most useful when they include:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>The calculator name and the page address</li>
            <li>The exact values entered</li>
            <li>The result the page displayed</li>
            <li>The result you expected instead, and the reasoning behind it</li>
          </ul>
          <p>
            Where a report identifies a genuine error, the page is corrected. We correct pages rather than
            quietly removing them, and where a published figure or explanation changes as a result, the
            corrected version replaces the original. You can reach us through the{' '}
            <Link href="/contact" className="font-medium text-[#3182ce] underline underline-offset-2">
              Contact
            </Link>{' '}
            page.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">6. Editorial Independence</h2>
          <p>
            MoneyAtlas is supported by advertising. Advertising has no influence on the calculations, on the
            explanations written around them, or on which calculators the site offers. A calculator produces
            the same result regardless of what advertising appears next to it.
          </p>
          <p>
            No explanation on this site is paid for, sponsored, or supplied by a third party, and we do not
            accept payment to describe a product favourably, to recommend one tool over another, or to place
            content that reads as editorial. Advertisements are selected and served by a third-party
            advertising service, are visually separate from our content, and are not endorsements by
            MoneyAtlas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-[#1e3a5f]">7. Educational Information, Not Advice</h2>
          <p>
            Everything published on MoneyAtlas is general information about how financial calculations work.
            It is not individualized financial, tax, legal, or investment advice, and it does not take
            account of your circumstances, your obligations, or what you are trying to achieve.
          </p>
          <p>
            A calculator result is the arithmetic consequence of the numbers you entered and the assumptions
            stated on the page. It is not a prediction, a quotation, an offer, or a statement of what any
            provider would actually give you. Real outcomes depend on terms, fees, taxes, and conditions
            that these calculators do not model.
          </p>
          <p>
            Before acting on a figure produced here, consider confirming it with the institution involved,
            and where the decision carries real consequences, consider seeking advice from a qualified
            professional who can take your full situation into account. Further limitations are set out in
            our{' '}
            <Link href="/disclaimer" className="font-medium text-[#3182ce] underline underline-offset-2">
              Disclaimer
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
