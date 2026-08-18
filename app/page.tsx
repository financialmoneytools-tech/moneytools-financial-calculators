import Link from 'next/link';
import { categories, getFeaturedCalculators, getCalculatorsByCategory } from '@/data/registry';
import { TrendingUp, Landmark, Home, PiggyBank, Briefcase, DollarSign, ArrowRight, Shield, BookOpen, Lock, Calculator } from 'lucide-react';
import { SearchBox } from './search-box';
import { formatNumber, formatPercent } from '@/lib/utils/formatters';
import { getHomepageWidgetsData } from '@/lib/homepage-widgets';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Landmark: <Landmark className="h-6 w-6" />,
  Home: <Home className="h-6 w-6" />,
  PiggyBank: <PiggyBank className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  DollarSign: <DollarSign className="h-6 w-6" />,
};

export default async function HomePage() {
  const featured = getFeaturedCalculators();
  const widgets = await getHomepageWidgetsData();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5282] text-white py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Free Financial Calculators
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Fast, accurate, and easy to use. Make smarter financial decisions with professional-grade tools.
          </p>
          <SearchBox />
        </div>
      </section>

      {/* Category Grid */}
      <section className="mx-auto max-w-[1200px] px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(categories ?? []).map((cat) => {
            const count = getCalculatorsByCategory(cat.slug)?.length ?? 0;
            return (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="group rounded-xl bg-white border border-slate-200 p-4 text-center transition-all hover:border-[#3182ce] hover:shadow-lg"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#f7fafc] text-[#3182ce] mb-3 group-hover:bg-[#ebf5ff] transition-colors">
                  {iconMap[cat.icon] ?? <Calculator className="h-6 w-6" />}
                </div>
                <h2 className="text-sm font-semibold text-[#1e3a5f]">{cat.name}</h2>
                <p className="text-xs text-slate-400 mt-1">{count} tool{count !== 1 ? 's' : ''}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="mx-auto max-w-[1200px] px-4 mt-16">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-6">Popular Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(featured ?? []).map((calc) => (
            <Link
              key={calc.slug}
              href={calc.route}
              className="group rounded-xl bg-white border border-slate-200 p-5 transition-all hover:border-[#3182ce] hover:shadow-lg"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <h3 className="font-semibold text-[#1e3a5f] group-hover:text-[#3182ce] transition-colors flex items-center justify-between">
                {calc.name}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-slate-500 mt-2 line-clamp-2">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Financial Snapshot */}
      <section className="mx-auto max-w-[1200px] px-4 mt-16">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-6">Live Financial Snapshot</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Major FX Rates (USD Base)</h3>
            <div className="space-y-2">
              {widgets.currencyRates.length > 0 ? (
                widgets.currencyRates.map((row) => (
                  <div key={row.pair} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{row.pair}</span>
                    <span className="font-medium text-[#1e3a5f]">{formatNumber(row.rate, 4)}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">Exchange rate feed is temporarily unavailable.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">US Market Indices</h3>
            <div className="space-y-2">
              {widgets.marketSnapshot.length > 0 ? (
                widgets.marketSnapshot.map((row) => {
                  const positive = row.changePct >= 0;
                  return (
                    <div key={row.symbol} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{row.name}</span>
                      <div className="text-right">
                        <div className="font-medium text-[#1e3a5f]">{formatNumber(row.price, 2)}</div>
                        <div className={positive ? 'text-emerald-600 text-xs' : 'text-red-600 text-xs'}>
                          {positive ? '+' : ''}{formatPercent(row.changePct, 2)}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-slate-500">Market feed is temporarily unavailable.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-3">Weather ({widgets.weather.city})</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Condition</span>
                <span className="font-medium text-[#1e3a5f]">{widgets.weather.summary}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Temperature</span>
                <span className="font-medium text-[#1e3a5f]">{formatNumber(widgets.weather.temperatureC, 1)}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Wind</span>
                <span className="font-medium text-[#1e3a5f]">{formatNumber(widgets.weather.windKmh, 1)} km/h</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-3">Data sources: Open Exchange Rates API mirror (open.er-api.com), Yahoo Finance quote API, Open-Meteo.</p>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1200px] px-4 mt-16">
        <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-8 text-center">How MoneyTools Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Choose a Calculator', desc: 'Pick from 20 financial calculators across investment, loans, mortgage, savings, business, and salary categories.' },
            { step: '2', title: 'Enter Your Numbers', desc: 'Input your financial details. Results update in real time as you type — no submit button needed.' },
            { step: '3', title: 'Get Instant Results', desc: 'See detailed breakdowns, charts, and amortization schedules. Share or export your results.' },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1e3a5f] text-white font-bold text-lg mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-[#f7fafc] mt-16 py-12">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-2xl font-display font-bold text-[#1e3a5f] mb-8 text-center">Why Trust MoneyTools</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="h-5 w-5" />, title: 'Verified Accuracy', desc: 'Every calculator engine is unit-tested with independently verified expected values.' },
              { icon: <BookOpen className="h-5 w-5" />, title: 'Transparent Methodology', desc: 'All formulas are documented. See exactly how your results are calculated.' },
              { icon: <Lock className="h-5 w-5" />, title: 'Privacy First', desc: 'Calculations happen in your browser. No financial data is stored or transmitted.' },
              { icon: <Calculator className="h-5 w-5" />, title: 'Always Free', desc: 'Professional-grade financial calculators with no hidden costs or paywalls.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#3182ce] mb-3" style={{ boxShadow: 'var(--shadow-sm)' }}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-[#1e3a5f] text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
