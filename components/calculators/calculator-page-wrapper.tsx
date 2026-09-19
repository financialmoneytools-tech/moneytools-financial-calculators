import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav';
import { FaqSection } from '@/components/calculators/faq-section';
import { RelatedCalculators } from '@/components/calculators/related-calculators';
import { AdSlot } from '@/components/ad-slot';
import {
  getCalculatorBySlug,
  getRelatedCalculators,
  getCategoryBySlug,
  getCalculatorContent,
} from '@/data/registry';
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd } from '@/lib/seo/structured-data';
import Link from 'next/link';

interface CalculatorPageWrapperProps {
  slug: string;
  children: React.ReactNode;
}

export function CalculatorPageWrapper({ slug, children }: CalculatorPageWrapperProps) {
  const calc = getCalculatorBySlug(slug);
  const category = getCategoryBySlug(calc?.categorySlug ?? '');
  const related = getRelatedCalculators(slug);
  const content = getCalculatorContent(slug);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moneyatlas.net';

  const breadcrumbItems = [
    { label: category?.name ?? '', href: `/${calc?.categorySlug ?? ''}` },
    { label: calc?.name ?? '' },
  ];

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: baseUrl },
    { name: category?.name ?? '', url: `${baseUrl}/${calc?.categorySlug ?? ''}` },
    { name: calc?.name ?? '', url: `${baseUrl}${calc?.route ?? ''}` },
  ]);

  const faqs = content?.faqs ?? [];
  const faqLd = faqs.length ? faqJsonLd(faqs) : null;
  const appLd = softwareApplicationJsonLd({
    name: calc?.name ?? '',
    description: calc?.seo?.description ?? '',
    url: `${baseUrl}${calc?.route ?? ''}`,
  });

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <BreadcrumbNav items={breadcrumbItems} />

      {/* Calculator widget */}
      {children}

      {content && (
        <>
          {/* Detailed introduction */}
          <section className="mt-12">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Overview</h2>
            <div className="space-y-4">
              {content.longIntro.map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Formula */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Formula</h2>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 font-mono text-sm text-slate-700 overflow-x-auto whitespace-pre-line">
              {content.formula}
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">{content.formulaExplanation}</p>
          </section>

          {/* How it works */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">How It Works</h2>
            <div className="space-y-4">
              {content.howItWorks.map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Worked examples */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Worked Examples</h2>
            <div className="space-y-5">
              {content.workedExamples.map((example, i: number) => (
                <div
                  key={i}
                  className="rounded-lg bg-white border border-slate-200 p-5"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <h3 className="font-semibold text-[#1e3a5f] mb-1">{example.title}</h3>
                  <p className="text-sm text-slate-500 mb-4">{example.scenario}</p>
                  <ol className="space-y-1 mb-4 rounded-md bg-slate-50 border border-slate-200 p-4 font-mono text-xs text-slate-700 overflow-x-auto">
                    {example.steps.map((step: string, s: number) => (
                      <li key={s}>{step}</li>
                    ))}
                  </ol>
                  <p className="text-sm text-slate-700 leading-relaxed mb-2">
                    <strong className="text-[#1e3a5f]">Result:</strong> {example.result}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    <strong className="text-[#1e3a5f]">What this shows:</strong> {example.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* In-content ad */}
          <AdSlot format="leaderboard" className="mt-10" />

          {/* When to use */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">
              When to Use This Calculator
            </h2>
            <div className="space-y-4">
              {content.whenToUse.map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Important factors */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Important Factors</h2>
            <div className="space-y-4">
              {content.factors.map((factor, i: number) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-[#1e3a5f] mb-1">{factor.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{factor.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Assumptions */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Important Assumptions</h2>
            <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
              {content.assumptions.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>

          {/* Common Mistakes */}
          <section className="mt-10">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">
              Common Mistakes to Avoid
            </h2>
            <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
              {content.commonMistakes.map((m: string, i: number) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* Related */}
      <RelatedCalculators calculators={related} />

      {/* Methodology note */}
      <div className="mt-12 rounded-lg bg-[#f7fafc] border border-slate-200 p-4 text-xs text-slate-500">
        <strong>Methodology:</strong> This calculator uses standard financial formulas documented above.
        All calculation engines are unit-tested for accuracy.
        <Link href="/methodology" className="text-[#3182ce] hover:underline ml-1">View full methodology</Link>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 text-xs text-slate-400">
        <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only.
        Results do not constitute financial advice.
        <Link href="/disclaimer" className="text-[#3182ce] hover:underline ml-1">Full disclaimer</Link>
      </div>
    </div>
  );
}
