import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav';
import { FaqSection } from '@/components/calculators/faq-section';
import { RelatedCalculators } from '@/components/calculators/related-calculators';
import { getCalculatorBySlug, getRelatedCalculators, getCategoryBySlug } from '@/data/registry';
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd } from '@/lib/seo/structured-data';
import Link from 'next/link';

interface FaqItem { question: string; answer: string; }

interface CalculatorPageWrapperProps {
  slug: string;
  children: React.ReactNode;
  formula: string;
  formulaExplanation: string;
  workedExample: string;
  whenToUse: string;
  assumptions: string[];
  commonMistakes: string[];
  faqs: FaqItem[];
}

export function CalculatorPageWrapper({
  slug, children, formula, formulaExplanation, workedExample,
  whenToUse, assumptions, commonMistakes, faqs,
}: CalculatorPageWrapperProps) {
  const calc = getCalculatorBySlug(slug);
  const category = getCategoryBySlug(calc?.categorySlug ?? '');
  const related = getRelatedCalculators(slug);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://moneytools.com';

  const breadcrumbItems = [
    { label: category?.name ?? '', href: `/${calc?.categorySlug ?? ''}` },
    { label: calc?.name ?? '' },
  ];

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: baseUrl },
    { name: category?.name ?? '', url: `${baseUrl}/${calc?.categorySlug ?? ''}` },
    { name: calc?.name ?? '', url: `${baseUrl}${calc?.route ?? ''}` },
  ]);

  const faqLd = faqs?.length ? faqJsonLd(faqs) : null;
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

      {/* Formula */}
      <section className="mt-12">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Formula</h2>
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 font-mono text-sm text-slate-700 overflow-x-auto">
          {formula}
        </div>
        <p className="text-sm text-slate-600 mt-3 leading-relaxed">{formulaExplanation}</p>
      </section>

      {/* Worked Example */}
      <section className="mt-10">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Worked Example</h2>
        <div className="rounded-lg bg-white border border-slate-200 p-5 text-sm text-slate-600 leading-relaxed whitespace-pre-line" style={{ boxShadow: 'var(--shadow-sm)' }}>
          {workedExample}
        </div>
      </section>

      {/* When to use */}
      <section className="mt-10">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">When to Use This Calculator</h2>
        <p className="text-sm text-slate-600 leading-relaxed">{whenToUse}</p>
      </section>

      {/* Assumptions */}
      <section className="mt-10">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Important Assumptions</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
          {(assumptions ?? []).map((a: string, i: number) => <li key={i}>{a}</li>)}
        </ul>
      </section>

      {/* Common Mistakes */}
      <section className="mt-10">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">Common Mistakes to Avoid</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
          {(commonMistakes ?? []).map((m: string, i: number) => <li key={i}>{m}</li>)}
        </ul>
      </section>

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
