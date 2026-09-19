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
    <CalculatorPageWrapper slug="cagr-calculator">
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
