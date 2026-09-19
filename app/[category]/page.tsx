import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  categories,
  getCalculatorsByCategory,
  getCategoryBySlug,
  getCategoryContent,
  getCalculatorBySlug,
  type CalculatorEntry,
} from '@/data/registry';
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav';
import { FaqSection } from '@/components/calculators/faq-section';
import { AdSlot } from '@/components/ad-slot';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/seo/structured-data';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return (categories ?? []).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return {};
  return {
    title: `${cat.name} Calculators`,
    description: cat.description,
    alternates: { canonical: `/${cat.slug}` },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return notFound();

  const calcs = getCalculatorsByCategory(params.category);
  const otherCategories = (categories ?? []).filter((c) => c.slug !== params.category);
  const content = getCategoryContent(params.category);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moneyatlas.net';

  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: baseUrl },
    { name: cat.name, url: `${baseUrl}/${cat.slug}` },
  ]);

  const faqs = content?.faqs ?? [];
  const faqLd = faqs.length ? faqJsonLd(faqs) : null;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <BreadcrumbNav items={[{ label: cat.name }]} />
      <h1 className="text-3xl font-display font-bold text-[#1e3a5f] tracking-tight mb-3">
        {cat.name} Calculators
      </h1>
      <p className="text-slate-600 mb-8 max-w-2xl">{cat.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {(calcs ?? []).map((calc: CalculatorEntry) => (
          <Link
            key={calc.slug}
            href={calc.route}
            className="group rounded-xl bg-white border border-slate-200 p-5 transition-all hover:border-[#3182ce] hover:shadow-lg"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <h2 className="font-semibold text-[#1e3a5f] group-hover:text-[#3182ce] transition-colors flex items-center justify-between">
              {calc.name}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>
            <p className="text-sm text-slate-500 mt-2">{calc.description}</p>
          </Link>
        ))}
      </div>

      {/* In-content ad */}
      <AdSlot format="leaderboard" className="mb-12" />

      {content && (
        <>
          {/* Category introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">
              About {cat.name} Calculations
            </h2>
            <div className="space-y-4 max-w-3xl">
              {content.longIntro.map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* What each calculator does */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">
              What Each Calculator Does
            </h2>
            <div className="space-y-4">
              {content.calculatorGuide.map((guide) => {
                const target = getCalculatorBySlug(guide.slug);
                if (!target) return null;
                return (
                  <div
                    key={guide.slug}
                    className="rounded-xl bg-white border border-slate-200 p-5"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <h3 className="font-semibold text-[#1e3a5f] mb-2">
                      <Link href={target.route} className="hover:text-[#3182ce] transition-colors">
                        {target.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{guide.useWhen}</p>
                    {guide.details && (
                      <div className="mt-4 space-y-4 max-w-3xl">
                        {guide.details.map((paragraph: string, i: number) => (
                          <p key={i} className="text-sm text-slate-600 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                    <Link
                      href={target.route}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#3182ce] hover:underline"
                    >
                      Open the {target.name}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Which calculator guidance */}
          <div
            className="rounded-xl bg-[#f7fafc] border border-slate-200 p-6 mb-12"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <h2 className="text-lg font-semibold text-[#1e3a5f] mb-3">Which calculator should I use?</h2>
            <div className="space-y-3 max-w-3xl">
              {content.whichCalculator.map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Methodology and context */}
          <section className="mb-12">
            <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-4">
              How These Calculators Work
            </h2>
            <div className="space-y-4 max-w-3xl">
              {content.methodology.map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <div className="mb-12">
            <FaqSection faqs={content.faqs} />
          </div>
        </>
      )}

      {/* Related categories */}
      <h2 className="text-xl font-display font-bold text-[#1e3a5f] mb-4">Other Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {otherCategories.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="rounded-lg bg-white border border-slate-200 p-3 text-center text-sm font-medium text-slate-600 hover:border-[#3182ce] hover:text-[#3182ce] transition-all"
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-12 text-xs text-slate-400">
        <strong>Disclaimer:</strong> These calculators provide estimates for educational purposes only.
        Results do not constitute financial advice.
        <Link href="/disclaimer" className="text-[#3182ce] hover:underline ml-1">Full disclaimer</Link>
      </div>
    </div>
  );
}
