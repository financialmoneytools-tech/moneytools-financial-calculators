'use client';

import { useState, useMemo } from 'react';
import { CalculatorShell } from '@/components/calculators/calculator-shell';
import { CalculatorPageWrapper } from '@/components/calculators/calculator-page-wrapper';
import { InputField } from '@/components/calculators/input-field';
import { ResultCard } from '@/components/calculators/result-card';
import { calculateLtvCac } from '@/lib/calculators/ltv-cac';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';

export function LtvCacPage() {
  const [aov, setAov] = useState('100');
  const [freq, setFreq] = useState('4');
  const [margin, setMargin] = useState('60');
  const [churn, setChurn] = useState('20');
  const [spend, setSpend] = useState('10000');
  const [customers, setCustomers] = useState('100');

  const result = useMemo(() => {
    try {
      return calculateLtvCac({ averageOrderValue: parseFloat(aov) || 0, purchaseFrequency: parseFloat(freq) || 0, grossMarginPercent: parseFloat(margin) || 0, churnRate: parseFloat(churn) || 0, marketingSpend: parseFloat(spend) || 0, newCustomers: parseInt(customers) || 0 });
    } catch { return null; }
  }, [aov, freq, margin, churn, spend, customers]);

  return (
    <CalculatorPageWrapper slug="ltv-cac-calculator">
      <CalculatorShell
        title="LTV:CAC Calculator"
        description="Calculate customer lifetime value, acquisition cost, and the LTV:CAC ratio."
        inputs={<>
          <InputField label="Average Order Value" value={aov} onChange={setAov} prefix="$" min={0} />
          <InputField label="Purchase Frequency (per year)" value={freq} onChange={setFreq} min={0} step={0.5} />
          <InputField label="Gross Margin" value={margin} onChange={setMargin} suffix="%" min={1} max={100} />
          <InputField label="Annual Churn Rate" value={churn} onChange={setChurn} suffix="%" min={1} max={100} />
          <InputField label="Total Marketing Spend" value={spend} onChange={setSpend} prefix="$" min={0} />
          <InputField label="New Customers Acquired" value={customers} onChange={setCustomers} min={1} />
        </>}
        results={
          <div className="space-y-3">
            <ResultCard label="LTV:CAC Ratio" value={`${(result?.ltvCacRatio ?? 0).toFixed(1)}:1`} primary />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Customer LTV" value={formatCurrency(result?.ltv ?? 0)} />
              <ResultCard label="CAC" value={formatCurrency(result?.cac ?? 0)} />
            </div>
            <ResultCard label="Payback Period" value={`${formatNumber(result?.paybackPeriodMonths ?? 0, 1)} months`} />
            {result?.interpretation && (
              <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-600">
                {result.interpretation}
              </div>
            )}
          </div>
        }
      />
    </CalculatorPageWrapper>
  );
}
