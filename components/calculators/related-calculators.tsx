import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type CalculatorEntry } from '@/data/registry';

export function RelatedCalculators({ calculators }: { calculators: CalculatorEntry[] }) {
  if (!calculators?.length) return null;
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-6">Related Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calc: CalculatorEntry) => (
          <Link
            key={calc.slug}
            href={calc.route}
            className="group rounded-lg bg-white border border-slate-200 p-4 transition-all hover:border-[#3182ce] hover:shadow-md"
          >
            <h3 className="font-semibold text-[#1e3a5f] group-hover:text-[#3182ce] transition-colors flex items-center gap-1">
              {calc.name}
              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{calc.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
