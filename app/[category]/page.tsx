import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories, getCalculatorsByCategory, getCategoryBySlug, type CalculatorEntry } from '@/data/registry';
import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav';
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
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return notFound();

  const calcs = getCalculatorsByCategory(params.category);
  const otherCategories = (categories ?? []).filter((c) => c.slug !== params.category);

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8">
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

      {/* Which calculator guidance */}
      <div className="rounded-xl bg-[#f7fafc] border border-slate-200 p-6 mb-12" style={{ boxShadow: 'var(--shadow-sm)' }}>
        <h2 className="text-lg font-semibold text-[#1e3a5f] mb-3">Which calculator should I use?</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          If you are unsure which tool fits your situation, start with the most general calculator in this category.
          Each calculator page includes a &ldquo;When to use this calculator&rdquo; section to help you choose the right tool.
        </p>
      </div>

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
    </div>
  );
}
