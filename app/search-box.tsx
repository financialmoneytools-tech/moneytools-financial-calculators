'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { calculators, type CalculatorEntry } from '@/data/registry';

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!query?.trim()) return [];
    const q = query.toLowerCase();
    return (calculators ?? []).filter((c: CalculatorEntry) =>
      c.name?.toLowerCase()?.includes(q) ||
      c.description?.toLowerCase()?.includes(q) ||
      (c.seo?.keywords ?? []).some((k: string) => k?.toLowerCase()?.includes(q))
    ).slice(0, 6);
  }, [query]);

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search calculators..."
          className="w-full rounded-xl bg-white/10 backdrop-blur border border-white/20 pl-12 pr-4 py-3.5 text-white placeholder:text-blue-200 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20"
          aria-label="Search calculators"
        />
      </div>
      {focused && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white border border-slate-200 overflow-hidden z-50" style={{ boxShadow: 'var(--shadow-lg)' }}>
          {results.map((calc: CalculatorEntry) => (
            <Link
              key={calc.slug}
              href={calc.route}
              className="block px-4 py-3 hover:bg-[#f7fafc] transition-colors border-b border-slate-100 last:border-0"
            >
              <div className="font-medium text-sm text-[#1e3a5f]">{calc.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{calc.description}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
