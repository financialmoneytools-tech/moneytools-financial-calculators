'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { SelectField } from '@/components/calculators/select-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateApy } from '@/lib/calculators/apy';
import { formatPercent } from '@/lib/utils/formatters';

export function ApyPage() {
  const [apr, setApr] = useState('5');
  const [freq, setFreq] = useState('12');

  const result = useMemo(() => {
    try { return calculateApy({ apr: parseFloat(apr) || 0, compoundingFrequency: parseInt(freq) || 1 }); }
    catch { return null; }
  }, [apr, freq]);

  return (
    <CalculatorPageWrapper slug="apy-calculator">
      <CalculatorShell
        title="APY Calculator"
        description="Convert between APR and APY, and compare compounding frequencies."
        inputs={<>
          <InputField label="Annual Percentage Rate (APR)" value={apr} onChange={setApr} suffix="%" step={0.1} />
          <SelectField label="Compounding Frequency" value={freq} onChange={setFreq} options={[
            { value: '1', label: 'Annually' }, { value: '2', label: 'Semi-Annually' },
            { value: '4', label: 'Quarterly' }, { value: '12', label: 'Monthly' }, { value: '365', label: 'Daily' },
          ]} />
        </>}
        results={<>
          <div className="space-y-3">
            <ResultCard label="APY" value={formatPercent(result?.apy ?? 0, 3)} primary />
          </div>
          {result?.comparisonTable && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-[#1e3a5f] mb-2">APY by Compounding Frequency</h3>
              <div className="space-y-1">
                {result.comparisonTable.map((row) => (
                  <div key={row.frequency} className="flex justify-between text-xs p-2 rounded bg-white border border-slate-100">
                    <span>{row.frequency}</span>
                    <span className="font-mono">{formatPercent(row.apy, 3)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>}
      />
    </CalculatorPageWrapper>
  );
}
