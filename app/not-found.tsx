import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { categories } from '@/data/registry';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found on MoneyAtlas.',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[800px] px-4 py-16">
      <p className="mb-3 font-mono text-sm font-medium tracking-wide text-[#3182ce]">404</p>

      <h1 className="mb-4 text-3xl font-display font-bold tracking-tight text-[#1e3a5f] md:text-4xl">
        Page not found
      </h1>

      <div className="space-y-4 leading-relaxed text-slate-600">
        <p>
          The page you were looking for does not exist. The address may have been mistyped, or the page may
          have been moved or removed since you last visited.
        </p>
        <p>
          Nothing is wrong with your calculation &mdash; only this address. You can head back to the
          homepage or pick a category below to find the calculator you need.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d5282]"
        >
          <Home className="h-4 w-4" />
          Back to homepage
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#1e3a5f] transition-colors hover:border-[#3182ce] hover:text-[#3182ce]"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          Report a broken link
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-display font-bold text-[#1e3a5f]">Browse calculators</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(categories ?? []).map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-[#3182ce] hover:shadow-lg"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="flex items-center justify-between font-semibold text-[#1e3a5f] transition-colors group-hover:text-[#3182ce]">
                {cat.name}
                <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              </h3>
              <p className="mt-1 text-sm text-slate-500">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
