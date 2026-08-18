'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateCagr } from '@/lib/calculators/cagr';
import { formatCurrency, formatPercent } from '@/lib/utils/formatters';

export function CagrPage() {
  const [startVal, setStartVal] = useState('10000');
  const [endVal, setEndVal] = useState('25000');
  const [years, setYears] = useState('5');

  const result = useMemo(() => {
    try {
      return calculateCagr({ startValue: parseFloat(startVal) || 0, endValue: parseFloat(endVal) || 0, years: parseFloat(years) || 0 });
    } catch { return null; }
  }, [startVal, endVal, years]);

  return (
    <CalculatorPageWrapper
      slug="cagr-calculator"
      formula="CAGR = (End Value / Start Value)^(1/Years) - 1"
      formulaExplanation="CAGR represents the constant annual growth rate that would take the start value to the end value over the specified period. It smooths out volatility into a single rate."
      workedExample={`Start Value: $10,000\nEnd Value: $25,000\nPeriod: 5 years\n\nCAGR = (25000/10000)^(1/5) - 1 = 2.5^0.2 - 1 = 0.2011 = 20.11%`}
      whenToUse="Use CAGR when you need a single annualized growth rate to describe historical performance. It is widely used for comparing investment returns, revenue growth, and other metrics over different time spans."
      assumptions={['Growth is smoothed to a constant rate — actual year-to-year returns may vary significantly.', 'No cash flows (contributions or withdrawals) during the period.']}
      commonMistakes={['Assuming CAGR means the investment grew by that percentage every year — it is an average that accounts for compounding.', 'Using CAGR for short periods (under 1 year) where it may not be meaningful.']}
      faqs={[
        { question: 'What is CAGR?', answer: 'Compound Annual Growth Rate (CAGR) is the annualized rate of return that takes an investment from its beginning value to its ending value, assuming profits are reinvested each year.' },
        { question: 'Is CAGR the same as average return?', answer: 'No. A simple average of annual returns ignores compounding. CAGR accounts for the compounding effect, giving a more accurate picture of long-term growth.' },
      ]}
    >
      <CalculatorShell
        title="CAGR Calculator"
        description="Find the compound annual growth rate between two values over a time period."
        inputs={
          <>
            <InputField label="Start Value" value={startVal} onChange={setStartVal} prefix="$" min={0} />
            <InputField label="End Value" value={endVal} onChange={setEndVal} prefix="$" min={0} />
            <InputField label="Number of Years" value={years} onChange={setYears} min={0} step={0.5} />
          </>
        }
        results={
          <div className="space-y-3">
            <ResultCard label="CAGR" value={formatPercent(result?.cagr ?? 0)} primary />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Absolute Growth" value={formatCurrency(result?.absoluteGrowth ?? 0)} />
              <ResultCard label="Growth %" value={formatPercent(result?.absoluteGrowthPercent ?? 0)} />
            </div>
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
